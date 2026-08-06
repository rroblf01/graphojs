import { Link } from '../parts/Link.ts';
import { ReshapeLinkCommand } from '../undo/commands.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for reshaping a link path by dragging its intermediate points.
 * GoJS-compatible: works on links whose `reshapable` flag is true.
 */
export class LinkReshapingTool extends Tool {
  private _link: Link | null = null;
  private _segmentIndex = 0;
  private _isReshaping = false;
  private _originalPoints: Array<{ x: number; y: number }> = [];
  private _originalHasManualReshape = false;

  /** GoJS-compatible: The link being reshaped. */
  get currentLink(): Link | null {
    return this._link;
  }

  /** GoJS-compatible: The segment index of the point being dragged. */
  get segmentIndex(): number {
    return this._segmentIndex;
  }

  /** Whether a reshape drag is in progress. */
  get isReshaping(): boolean {
    return this._isReshaping;
  }

  /** GoJS-compatible: start reshaping when pressing on a link that is reshapable. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    if (e.button !== 0) return false;
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    return part instanceof Link && part.reshapable;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    if (!(part instanceof Link) || !part.reshapable) return;

    this._link = part;
    this._segmentIndex = this.findNearestSegment(part, point);
    this._isReshaping = true;
    this._originalPoints = part.pathPoints.map((p) => ({ ...p }));
    this._originalHasManualReshape = part.hasManualReshape;
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this._isReshaping || !this._link || !this.diagram) return;

    const point = this.getDiagramPoint(e);
    const points = this._link.pathPoints.slice();
    if (points.length < 2) return;

    // Replace the point at the dragged segment boundary with the current position.
    const idx = Math.min(Math.max(this._segmentIndex, 1), points.length - 2);
    points[idx] = { ...point };
    this._link.setPathPoints(points);
    this._link.hasManualReshape = true;
    this._link.updateBounds();
    this.diagram.invalidate();
  }

  override doMouseUp(_e: MouseEvent): void {
    if (!this._isReshaping || !this._link) {
      this._isReshaping = false;
      this._link = null;
      return;
    }

    const link = this._link;
    const diagram = this.diagram;
    const changed =
      link.pathPoints.length !== this._originalPoints.length ||
      link.pathPoints.some((p, i) => {
        const o = this._originalPoints[i];
        return !o || p.x !== o.x || p.y !== o.y;
      });

    if (changed && diagram) {
      diagram
        .getUndoManager()
        .execute(
          new ReshapeLinkCommand(
            link,
            link.pathPoints,
            this._originalPoints,
            this._originalHasManualReshape,
          ),
        );
      diagram.fireDiagramEvent('LinkReshaped', link);
    }

    this._isReshaping = false;
    this._link = null;
    this._originalPoints = [];
  }

  /** Find the segment index whose endpoint is nearest to the given point. */
  private findNearestSegment(link: Link, point: { x: number; y: number }): number {
    const points = link.pathPoints;
    if (points.length < 2) return 1;
    let best = 1;
    let bestDist = Infinity;
    for (let i = 1; i < points.length - 1; i++) {
      const p = points[i];
      if (!p) continue;
      const d = (p.x - point.x) ** 2 + (p.y - point.y) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  }
}
