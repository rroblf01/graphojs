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
  private _origAngle = 0;

  /** Whether a rotation drag is in progress. */
  get isRotating(): boolean {
    return this._isRotating;
  }

  /** The node being rotated. */
  get rotatingNode(): Node | null {
    return this._node;
  }

  /**
   * Find the rotation handle's actual screen (diagram-space) position for a
   * node — above its top-center, then rotated around the node's center by
   * its current angle, matching how the renderer draws the handle.
   */
  getRotationHandlePoint(node: Node): { x: number; y: number } {
    const cx = node.bounds.x + node.bounds.width / 2;
    const cy = node.bounds.y + node.bounds.height / 2;
    const localX = cx;
    const localY = node.bounds.y - 20;
    if (node.angle === 0) return { x: localX, y: localY };
    const rad = (node.angle * Math.PI) / 180;
    const dx = localX - cx;
    const dy = localY - cy;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return { x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos };
  }

  /**
   * Check if a point is on the rotation handle of a node.
   */
  isOnRotationHandle(node: Node, point: { x: number; y: number }): boolean {
    const handle = this.getRotationHandlePoint(node);
    const threshold = 8;
    return Math.abs(point.x - handle.x) <= threshold && Math.abs(point.y - handle.y) <= threshold;
  }

  /** Find a selected node whose rotation handle is under the point (handle is outside bounds). */
  private findNodeOnRotationHandle(point: { x: number; y: number }): Node | null {
    const diagram = this.diagram;
    if (!diagram) return null;
    for (const node of diagram.getSelectedParts()) {
      if (node instanceof Node && node.rotatable && this.isOnRotationHandle(node, point)) {
        return node;
      }
    }
    return null;
  }

  /** GoJS-compatible: start rotating when pressing on the rotation handle of a selected node. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    if (e.button !== 0) return false;
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowRotate === false)
    )
      return false;
    return this.findNodeOnRotationHandle(this.getDiagramPoint(e)) !== null;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowRotate === false)
    )
      return;

    const point = this.getDiagramPoint(e);
    const part = this.findNodeOnRotationHandle(point);

    if (part) {
      this._isRotating = true;
      this._node = part;
      this._startAngle = this.angleOf(part, point);
      this._origAngle = part.angle;
    }
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this._isRotating || !this._node) return;

    const point = this.getDiagramPoint(e);
    const currentAngle = this.angleOf(this._node, point);
    const delta = currentAngle - this._startAngle;

    // Set absolute angle from the original, not accumulate deltas
    this._node.angle = (this._origAngle + delta) % 360;
    if (this._node.angle < 0) this._node.angle += 360;

    this.diagram?.invalidate();
  }

  override doMouseUp(_e: MouseEvent): void {
    if (!this._isRotating || !this._node) return;

    const node = this._node;
    const diagram = this.diagram;

    // Persist angle to model as an undoable command (only if changed)
    if (diagram) {
      const model = diagram.getModel();
      if (model.containsNode(node.key)) {
        if (node.angle !== this._origAngle) {
          diagram
            .getUndoManager()
            .execute(new SetNodePropertyCommand(model, node.key, 'angle', node.angle));
        }
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
