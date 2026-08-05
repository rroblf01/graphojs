import { Tool } from './Tool.ts';

/**
 * Tool for selecting multiple parts by dragging a rubber-band rectangle.
 * Parts intersecting the selection rectangle become selected.
 */
export class DragSelectingTool extends Tool {
  private _isSelecting = false;
  private _startPoint = { x: 0, y: 0 };
  private _isPartialInclusion = true;

  /** GoJS-compatible: Whether partially-enclosed parts are selected too. */
  get isPartialInclusion(): boolean {
    return this._isPartialInclusion;
  }

  set isPartialInclusion(value: boolean) {
    this._isPartialInclusion = value;
  }

  /** Whether a rubber-band selection is in progress. */
  get isSelecting(): boolean {
    return this._isSelecting;
  }

  /** GoJS-compatible: start rubber-band selection on empty background with primary button. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    if (e.button !== 0) return false;
    const point = this.getDiagramPoint(e);
    return this.findPartAt(point.x, point.y) === null;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;

    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    if (part) return; // Only start rubber-band on empty background

    const diagram = this.diagram;
    if (!diagram) return;

    // Clear selection unless adding
    if (!e.ctrlKey && !e.metaKey) {
      diagram.clearSelection();
    }

    this._isSelecting = true;
    this._startPoint = point;
    diagram.showSelectionRect({ x: point.x, y: point.y, width: 0, height: 0 });
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this._isSelecting) return;

    const point = this.getDiagramPoint(e);
    const diagram = this.diagram;
    if (!diagram) return;

    const x = Math.min(this._startPoint.x, point.x);
    const y = Math.min(this._startPoint.y, point.y);
    const width = Math.abs(point.x - this._startPoint.x);
    const height = Math.abs(point.y - this._startPoint.y);

    diagram.showSelectionRect({ x, y, width, height });
  }

  override doMouseUp(e: MouseEvent): void {
    if (!this._isSelecting) return;

    this._isSelecting = false;
    const diagram = this.diagram;
    if (!diagram) return;

    const point = this.getDiagramPoint(e);
    const x = Math.min(this._startPoint.x, point.x);
    const y = Math.min(this._startPoint.y, point.y);
    const width = Math.abs(point.x - this._startPoint.x);
    const height = Math.abs(point.y - this._startPoint.y);

    diagram.hideSelectionRect();

    // Only select if the drag was large enough to be a box (not a click)
    if (width > 3 || height > 3) {
      diagram.selectPartsInRect({ x, y, width, height }, this._isPartialInclusion);
    }
  }
}
