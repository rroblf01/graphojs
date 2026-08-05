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

  /** GoJS-compatible: The minimum size for resized parts. */
  get minSize(): { width: number; height: number } {
    return { width: this._minWidth, height: this._minHeight };
  }

  set minSize(value: { width: number; height: number }) {
    this._minWidth = value.width;
    this._minHeight = value.height;
  }

  private _maxWidth = Infinity;
  private _maxHeight = Infinity;

  /** GoJS-compatible: The maximum size for resized parts. */
  get maxSize(): { width: number; height: number } {
    return { width: this._maxWidth, height: this._maxHeight };
  }

  set maxSize(value: { width: number; height: number }) {
    this._maxWidth = value.width;
    this._maxHeight = value.height;
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

  /** GoJS-compatible: start resizing when pressing on a resize handle of a selected node. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    if (e.button !== 0) return false;
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowResize === false)
    )
      return false;
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    return part instanceof Node && part.isSelected && this.getHandleAt(part, point) !== null;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowResize === false)
    )
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

    this._node.bounds.x = x;
    this._node.bounds.y = y;
    this._node.bounds.width = width;
    this._node.bounds.height = height;
    this.diagram?.invalidate();
  }

  override doMouseUp(_e: MouseEvent): void {
    if (!this._isResizing || !this._node) return;

    const node = this._node;
    const diagram = this.diagram;

    // Persist new bounds to the model as an undoable command (only if changed)
    if (diagram) {
      const model = diagram.getModel();
      if (model.containsNode(node.key)) {
        const start = this._startBounds;
        const b = node.bounds;
        const changed =
          b.x !== start.x ||
          b.y !== start.y ||
          b.width !== start.width ||
          b.height !== start.height;
        if (changed) {
          diagram
            .getUndoManager()
            .execute(new ResizeNodeCommand(model, node.key, b.x, b.y, b.width, b.height));
        }
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
