import { Node } from '../parts/Node.ts';
import { SetNodePropertyCommand } from '../undo/commands.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for rotating nodes around their center via the rotation handle.
 */
export class RotatingTool extends Tool {
  private _isRotating = false;
  private _node: Node | null = null;
  private _startAngle = 0;

  /** Whether a rotation drag is in progress. */
  get isRotating(): boolean {
    return this._isRotating;
  }

  /** The node being rotated. */
  get rotatingNode(): Node | null {
    return this._node;
  }

  /**
   * Find the rotation handle position for a node (above the top-center).
   */
  getRotationHandlePoint(node: Node): { x: number; y: number } {
    return {
      x: node.bounds.x + node.bounds.width / 2,
      y: node.bounds.y - 20,
    };
  }

  /**
   * Check if a point is on the rotation handle of a node.
   */
  isOnRotationHandle(node: Node, point: { x: number; y: number }): boolean {
    const handle = this.getRotationHandlePoint(node);
    const threshold = 8;
    return Math.abs(point.x - handle.x) <= threshold && Math.abs(point.y - handle.y) <= threshold;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;
    if (this.diagram && (this.diagram.isEnabled === false || this.diagram.isReadOnly === true))
      return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    if (part instanceof Node && part.isSelected && this.isOnRotationHandle(part, point)) {
      this._isRotating = true;
      this._node = part;
      this._startAngle = this.angleOf(part, point);
    }
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this._isRotating || !this._node) return;

    const point = this.getDiagramPoint(e);
    const currentAngle = this.angleOf(this._node, point);
    const delta = currentAngle - this._startAngle;

    this._node.angle = (this._node.angle + delta) % 360;
    if (this._node.angle < 0) this._node.angle += 360;

    this.diagram?.invalidate();
  }

  override doMouseUp(_e: MouseEvent): void {
    if (!this._isRotating || !this._node) return;

    const node = this._node;
    const diagram = this.diagram;

    // Persist angle to model as an undoable command
    if (diagram) {
      const model = diagram.getModel();
      if (model.containsNode(node.key)) {
        diagram
          .getUndoManager()
          .execute(new SetNodePropertyCommand(model, node.key, 'angle', node.angle));
      }
    }

    this._isRotating = false;
    this._node = null;

    // Fire PartRotated event
    if (diagram) {
      diagram.fireDiagramEvent('PartRotated', node, { angle: node.angle });
    }
  }

  private angleOf(node: Node, point: { x: number; y: number }): number {
    const cx = node.bounds.x + node.bounds.width / 2;
    const cy = node.bounds.y + node.bounds.height / 2;
    const angle = (Math.atan2(point.y - cy, point.x - cx) * 180) / Math.PI;
    return angle;
  }
}
