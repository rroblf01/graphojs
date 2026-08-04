import { Node } from '../parts/Node.ts';
import { ResizeNodeCommand } from '../undo/commands.ts';
import { Tool } from './Tool.ts';

export type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w';

/**
 * Tool for resizing nodes by dragging their edge/corner handles.
 */
export class ResizingTool extends Tool {
  private _isResizing = false;
  private _node: Node | null = null;
  private _handle: ResizeHandle | null = null;
  private _startPoint = { x: 0, y: 0 };
  private _startBounds = { x: 0, y: 0, width: 0, height: 0 };
  private _minWidth = 20;
  private _minHeight = 20;

  /** Whether a resize drag is in progress. */
  get isResizing(): boolean {
    return this._isResizing;
  }

  /** The node being resized. */
  get resizingNode(): Node | null {
    return this._node;
  }

  /** The handle being dragged. */
  get handle(): ResizeHandle | null {
    return this._handle;
  }

  /** The minimum width for resized nodes. */
  get minWidth(): number {
    return this._minWidth;
  }

  set minWidth(value: number) {
    this._minWidth = value;
  }

  /** The minimum height for resized nodes. */
  get minHeight(): number {
    return this._minHeight;
  }

  set minHeight(value: number) {
    this._minHeight = value;
  }

  /**
   * Find which resize handle (if any) is under a point for a selected node.
   */
  getHandleAt(node: Node, point: { x: number; y: number }): ResizeHandle | null {
    const { x, y, width, height } = node.bounds;
    const handleSize = 8;
    const half = handleSize / 2;

    // Corner handles
    const corners: Array<[ResizeHandle, number, number]> = [
      ['nw', x, y],
      ['ne', x + width, y],
      ['sw', x, y + height],
      ['se', x + width, y + height],
    ];
    for (const [name, hx, hy] of corners) {
      if (Math.abs(point.x - hx) <= half && Math.abs(point.y - hy) <= half) {
        return name;
      }
    }

    // Edge handles
    if (Math.abs(point.y - y) <= half && point.x > x + half && point.x < x + width - half) {
      return 'n';
    }
    if (
      Math.abs(point.y - (y + height)) <= half &&
      point.x > x + half &&
      point.x < x + width - half
    ) {
      return 's';
    }
    if (Math.abs(point.x - x) <= half && point.y > y + half && point.y < y + height - half) {
      return 'w';
    }
    if (
      Math.abs(point.x - (x + width)) <= half &&
      point.y > y + half &&
      point.y < y + height - half
    ) {
      return 'e';
    }

    return null;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;
    if (this.diagram && (this.diagram.isEnabled === false || this.diagram.isReadOnly === true))
      return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    if (part instanceof Node && part.isSelected) {
      const handle = this.getHandleAt(part, point);
      if (handle) {
        this._isResizing = true;
        this._node = part;
        this._handle = handle;
        this._startPoint = point;
        this._startBounds = {
          x: part.bounds.x,
          y: part.bounds.y,
          width: part.bounds.width,
          height: part.bounds.height,
        };
      }
    }
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this._isResizing || !this._node || !this._handle) return;

    const point = this.getDiagramPoint(e);
    const dx = point.x - this._startPoint.x;
    const dy = point.y - this._startPoint.y;

    let { x, y, width, height } = this._startBounds;
    const handle = this._handle;

    if (handle.includes('w')) {
      x = this._startBounds.x + dx;
      width = this._startBounds.width - dx;
    }
    if (handle.includes('e')) {
      width = this._startBounds.width + dx;
    }
    if (handle.includes('n')) {
      y = this._startBounds.y + dy;
      height = this._startBounds.height - dy;
    }
    if (handle.includes('s')) {
      height = this._startBounds.height + dy;
    }

    // Enforce minimum size
    if (width < this._minWidth) {
      if (handle.includes('w')) x = this._startBounds.x + this._startBounds.width - this._minWidth;
      width = this._minWidth;
    }
    if (height < this._minHeight) {
      if (handle.includes('n'))
        y = this._startBounds.y + this._startBounds.height - this._minHeight;
      height = this._minHeight;
    }

    this._node.bounds = { x, y, width, height } as never;
    this.diagram?.invalidate();
  }

  override doMouseUp(_e: MouseEvent): void {
    if (!this._isResizing || !this._node) return;

    const node = this._node;
    const diagram = this.diagram;

    // Persist new bounds to the model as an undoable command
    if (diagram) {
      const model = diagram.getModel();
      if (model.containsNode(node.key)) {
        diagram
          .getUndoManager()
          .execute(
            new ResizeNodeCommand(
              model,
              node.key,
              node.bounds.x,
              node.bounds.y,
              node.bounds.width,
              node.bounds.height,
            ),
          );
      }
    }

    this._isResizing = false;
    this._node = null;
    this._handle = null;

    // Fire PartResized event
    if (diagram) {
      diagram.fireDiagramEvent('PartResized', node, {
        x: node.bounds.x,
        y: node.bounds.y,
        width: node.bounds.width,
        height: node.bounds.height,
      });
    }
  }
}
