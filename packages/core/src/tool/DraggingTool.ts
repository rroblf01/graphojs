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
    const dx = point.x - this.dragOrigin.x;
    const dy = point.y - this.dragOrigin.y;

    const diagram = this.diagram;
    if (!diagram) return;

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

  override doMouseUp(_e: MouseEvent): void {
    if (!this._isDragging) return;

    this._isDragging = false;

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
