import type { Diagram } from '../diagram/Diagram.ts';
import type { NodeKey } from '../model/Model.ts';
import { Group } from '../parts/Group.ts';
import { Node } from '../parts/Node.ts';
import { MoveNodeCommand } from '../undo/commands.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for dragging nodes.
 */
export class DraggingTool extends Tool {
  private dragOrigin = { x: 0, y: 0 };
  private nodeOrigin = new Map<NodeKey, { x: number; y: number }>();
  private _isDragging = false;
  private primaryPart: Node | Group | null = null;

  /**
   * GoJS-compatible ("GuidedDraggingTool" extension style): when true, dragging
   * a single part snaps to, and shows dashed guidelines for, the edges/centers
   * of nearby parts. Ignored while `Diagram.isSnapToGridEnabled()` is true.
   */
  isGuidedDraggingEnabled = false;

  /** Maximum distance (in document units) at which an alignment guideline snaps. */
  guidelineSnapDistance = 6;

  get isDragging(): boolean {
    return this._isDragging;
  }

  override doActivate(): void {
    super.doActivate();
  }

  /** GoJS-compatible: start dragging when the primary button is on a movable node. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    if (e.button !== 0) return false;
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowMove === false)
    )
      return false;
    const part = this.findPartAt(this.getDiagramPoint(e).x, this.getDiagramPoint(e).y);
    return (part instanceof Node || part instanceof Group) && (part as Node).draggable;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;
    // GoJS-compatible: respect isEnabled, read-only and allowMove flags
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowMove === false)
    )
      return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    if (part instanceof Node || part instanceof Group) {
      this.dragOrigin = point;
      this.nodeOrigin.clear();
      this.primaryPart = part;

      // Store original positions of selected parts (or the clicked part)
      const diagram = this.diagram;
      if (!diagram) return;

      const selectedParts = diagram
        .getSelectedParts()
        .filter((p): p is Node | Group => p instanceof Node || p instanceof Group);
      if (selectedParts.length === 0 || !selectedParts.includes(part)) {
        // If clicked part is not selected, select only it
        diagram.select(part);
        if (part.draggable) this.addPartToDrag(part);
      } else {
        // Store positions of all selected, draggable parts — a non-draggable
        // part within a multi-selection stays put while the rest moves.
        for (const p of selectedParts) {
          if (p.draggable) this.addPartToDrag(p);
        }
      }

      if (this.nodeOrigin.size === 0) return;

      this._isDragging = true;
      const canvas = this.diagram?.getRenderer().getCanvas();
      if (canvas) canvas.style.cursor = 'move';
    }
  }

  /** Register a part (and, for groups, its member nodes) for dragging. */
  private addPartToDrag(part: Node | Group): void {
    this.nodeOrigin.set(part.key, { x: part.bounds.x, y: part.bounds.y });
    if (part instanceof Group) {
      for (const member of part.getAllParts()) {
        if (member instanceof Node || member instanceof Group) {
          this.nodeOrigin.set(member.key, { x: member.bounds.x, y: member.bounds.y });
        }
      }
    }
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this._isDragging) return;

    const point = this.getDiagramPoint(e);
    let dx = point.x - this.dragOrigin.x;
    let dy = point.y - this.dragOrigin.y;

    const diagram = this.diagram;
    if (!diagram) return;

    // Guided dragging: snap the primary dragged part to nearby edges/centers
    // and show alignment guidelines (skipped while grid snapping is active).
    if (this.isGuidedDraggingEnabled && !diagram.isSnapToGridEnabled() && this.primaryPart) {
      const origin = this.nodeOrigin.get(this.primaryPart.key);
      if (origin) {
        const dragged = {
          x: origin.x + dx,
          y: origin.y + dy,
          width: this.primaryPart.bounds.width,
          height: this.primaryPart.bounds.height,
        };
        const snap = this.computeAlignmentSnap(diagram, dragged);
        if (snap.dx !== null) dx += snap.dx;
        if (snap.dy !== null) dy += snap.dy;
        diagram.showAlignmentGuidelines(snap.guidelines);
      }
    } else if (this.isGuidedDraggingEnabled) {
      diagram.hideAlignmentGuidelines();
    }

    // Move all dragged nodes visually
    for (const [key, origin] of this.nodeOrigin) {
      const node = this.getNodeByKey(key);
      if (node) {
        let newX = origin.x + dx;
        let newY = origin.y + dy;
        // Snap to grid if enabled
        if (diagram.isSnapToGridEnabled()) {
          newX = diagram.snapValue(newX);
          newY = diagram.snapValue(newY);
        }
        node.bounds.x = newX;
        node.bounds.y = newY;
      }
    }

    // Recompute connected link paths so links follow nodes while dragging
    for (const [key] of this.nodeOrigin) {
      diagram.invalidateLinksForNode(key);
    }

    // A group not itself being dragged must resize to keep containing a
    // member that's being dragged within/out of it (a group that IS being
    // dragged already moves in lockstep with its members via the loop above).
    const groupsToResize = new Set<Group>();
    for (const [key] of this.nodeOrigin) {
      const node = this.getNodeByKey(key);
      const group = node?.containingGroup;
      if (group instanceof Group && !this.nodeOrigin.has(group.key)) {
        groupsToResize.add(group);
      }
    }
    for (const group of groupsToResize) {
      group.updateBoundsFromMembers();
    }

    diagram.invalidate();
  }

  /**
   * Finds the closest edge/center alignment (within `guidelineSnapDistance`)
   * between `dragged` and every other visible node/group in the diagram, and
   * returns the delta needed to snap onto it plus the guideline(s) to draw.
   */
  private computeAlignmentSnap(
    diagram: Diagram,
    dragged: { x: number; y: number; width: number; height: number },
  ): {
    dx: number | null;
    dy: number | null;
    guidelines: Array<{ x1: number; y1: number; x2: number; y2: number }>;
  } {
    const threshold = this.guidelineSnapDistance;
    const draggedXs = [dragged.x, dragged.x + dragged.width / 2, dragged.x + dragged.width];
    const draggedYs = [dragged.y, dragged.y + dragged.height / 2, dragged.y + dragged.height];

    let bestX: {
      diff: number;
      alignedX: number;
      other: { x: number; y: number; width: number; height: number };
    } | null = null;
    let bestY: {
      diff: number;
      alignedY: number;
      other: { x: number; y: number; width: number; height: number };
    } | null = null;

    const others: Array<Node | Group> = [
      ...Array.from(diagram.nodes.values()),
      ...Array.from(diagram.groups.values()),
    ];

    for (const other of others) {
      if (this.nodeOrigin.has(other.key) || !other.visible) continue;
      const b = other.bounds;
      const otherXs = [b.x, b.x + b.width / 2, b.x + b.width];
      const otherYs = [b.y, b.y + b.height / 2, b.y + b.height];

      for (const dxCandidate of draggedXs) {
        for (const ox of otherXs) {
          const diff = ox - dxCandidate;
          if (Math.abs(diff) <= threshold && (!bestX || Math.abs(diff) < Math.abs(bestX.diff))) {
            bestX = { diff, alignedX: ox, other: b };
          }
        }
      }
      for (const dyCandidate of draggedYs) {
        for (const oy of otherYs) {
          const diff = oy - dyCandidate;
          if (Math.abs(diff) <= threshold && (!bestY || Math.abs(diff) < Math.abs(bestY.diff))) {
            bestY = { diff, alignedY: oy, other: b };
          }
        }
      }
    }

    const guidelines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
    let resultDx: number | null = null;
    let resultDy: number | null = null;

    if (bestX) {
      resultDx = bestX.diff;
      const minY = Math.min(dragged.y, bestX.other.y);
      const maxY = Math.max(dragged.y + dragged.height, bestX.other.y + bestX.other.height);
      guidelines.push({ x1: bestX.alignedX, y1: minY, x2: bestX.alignedX, y2: maxY });
    }
    if (bestY) {
      resultDy = bestY.diff;
      const minX = Math.min(dragged.x, bestY.other.x);
      const maxX = Math.max(dragged.x + dragged.width, bestY.other.x + bestY.other.width);
      guidelines.push({ x1: minX, y1: bestY.alignedY, x2: maxX, y2: bestY.alignedY });
    }

    return { dx: resultDx, dy: resultDy, guidelines };
  }

  override doMouseUp(_e: MouseEvent): void {
    if (!this._isDragging) return;

    this._isDragging = false;
    this.primaryPart = null;
    this.diagram?.hideAlignmentGuidelines();

    const diagram = this.diagram;
    let movedCount = 0;

    // Persist positions to the model as undoable commands
    if (diagram) {
      const model = diagram.getModel();
      const undoManager = diagram.getUndoManager();
      const moved: Array<{ key: NodeKey; origin: { x: number; y: number } }> = [];

      for (const [key, origin] of this.nodeOrigin) {
        const node = this.getNodeByKey(key);
        if (node) {
          const dx = node.bounds.x - origin.x;
          const dy = node.bounds.y - origin.y;
          if (dx !== 0 || dy !== 0) {
            moved.push({ key, origin });
          }
        }
      }

      if (moved.length > 0) {
        undoManager.beginTransaction('Drag nodes');
        for (const { key } of moved) {
          const node = this.getNodeByKey(key);
          if (node) {
            undoManager.execute(new MoveNodeCommand(model, key, node.bounds.x, node.bounds.y));
          }
        }
        undoManager.commitTransaction();
        movedCount = moved.length;
      }
    }

    this.nodeOrigin.clear();
    const canvas = this.diagram?.getRenderer().getCanvas();
    if (canvas) canvas.style.cursor = 'default';

    // Fire SelectionMoved event
    if (diagram && movedCount > 0) {
      diagram.fireDiagramEvent('SelectionMoved', null, { movedCount });
    }
  }

  private getNodeByKey(key: NodeKey): Node | Group | null {
    const diagram = this.diagram;
    if (!diagram) return null;
    return diagram.findNodeForKey(key) ?? diagram.findGroupForKey(key);
  }
}
