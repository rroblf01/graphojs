import { Node } from '../parts/Node.ts';
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

    // Move all dragged nodes
    for (const [keyStr] of this.nodeOrigin) {
      const nodeData = diagram
        .getModel()
        .getNodeDataArray()
        .find((n) => {
          const k = diagram.getModel().getNodeKey(n);
          return String(k) === keyStr;
        });

      if (nodeData) {
        const node = diagram.getPart(diagram.getModel().getNodeKey(nodeData));
        if (node) {
          node.bounds = node.bounds.offset(dx, dy);
        }
      }
    }

    // Update positions in model
    this.updateModelPositions(dx, dy);

    diagram.invalidate();
  }

  override doMouseUp(_e: MouseEvent): void {
    if (!this._isDragging) return;

    this._isDragging = false;
    this.nodeOrigin.clear();
    const canvas = this.diagram?.getRenderer().getCanvas();
    if (canvas) canvas.style.cursor = 'default';
  }

  private updateModelPositions(dx: number, dy: number): void {
    const diagram = this.diagram;
    if (!diagram) return;

    const model = diagram.getModel();

    for (const [keyStr, origin] of this.nodeOrigin) {
      const key = Number(keyStr) || keyStr;
      const newX = origin.x + dx;
      const newY = origin.y + dy;

      // Update model data
      for (const nodeData of model.getNodeDataArray()) {
        if (model.getNodeKey(nodeData) === key) {
          nodeData.x = newX;
          nodeData.y = newY;
          break;
        }
      }
    }
  }
}
