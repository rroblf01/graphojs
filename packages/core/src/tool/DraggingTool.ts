import { Node } from '../parts/Node.ts';
import { MoveNodeCommand } from '../undo/commands.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for dragging nodes.
 */
export class DraggingTool extends Tool {
  private dragOrigin = { x: 0, y: 0 };
  private nodeOrigin = new Map<string, { x: number; y: number }>();
  private _isDragging = false;

  get isDragging(): boolean {
    return this._isDragging;
  }

  override doActivate(): void {
    super.doActivate();
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    if (part instanceof Node) {
      this.dragOrigin = point;
      this.nodeOrigin.clear();

      // Store original positions of selected nodes (or the clicked node)
      const diagram = this.diagram;
      if (!diagram) return;

      const selectedNodes = diagram.getSelectedParts().filter((p): p is Node => p instanceof Node);
      if (selectedNodes.length === 0 || !selectedNodes.includes(part)) {
        // If clicked node is not selected, select only it
        diagram.clearSelection();
        part.isSelected = true;
        this.nodeOrigin.set(String(part.key), { x: part.bounds.x, y: part.bounds.y });
      } else {
        // Store positions of all selected nodes
        for (const node of selectedNodes) {
          this.nodeOrigin.set(String(node.key), { x: node.bounds.x, y: node.bounds.y });
        }
      }

      this._isDragging = true;
      const canvas = this.diagram?.getRenderer().getCanvas();
      if (canvas) canvas.style.cursor = 'move';
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
    for (const [keyStr, origin] of this.nodeOrigin) {
      const node = this.getNodeByKeyStr(keyStr);
      if (node) {
        let newX = origin.x + dx;
        let newY = origin.y + dy;
        // Snap to grid if enabled
        if (diagram.isSnapToGridEnabled()) {
          newX = diagram.snapValue(newX);
          newY = diagram.snapValue(newY);
        }
        node.bounds = {
          x: newX,
          y: newY,
          width: node.bounds.width,
          height: node.bounds.height,
        } as never;
      }
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
      const moved: Array<{ keyStr: string; origin: { x: number; y: number } }> = [];

      for (const [keyStr, origin] of this.nodeOrigin) {
        const node = this.getNodeByKeyStr(keyStr);
        if (node) {
          const dx = node.bounds.x - origin.x;
          const dy = node.bounds.y - origin.y;
          if (dx !== 0 || dy !== 0) {
            moved.push({ keyStr, origin });
          }
        }
      }

      if (moved.length > 0) {
        undoManager.beginTransaction('Drag nodes');
        for (const { keyStr } of moved) {
          const node = this.getNodeByKeyStr(keyStr);
          if (node) {
            const key = Number(keyStr) || keyStr;
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

  private getNodeByKeyStr(keyStr: string): Node | null {
    const diagram = this.diagram;
    if (!diagram) return null;
    const key = Number(keyStr) || keyStr;
    const part = diagram.getPart(key);
    return part instanceof Node ? part : null;
  }
}
