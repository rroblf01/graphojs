import type { Link } from '../parts/Link.ts';
import { SetLinkLabelPositionCommand } from '../undo/commands.ts';
import { Tool } from './Tool.ts';

/**
 * GoJS-compatible ("LinkLabelDraggingTool" extension style): drag a link's
 * label to reposition it along the route (`labelSegmentIndex`/
 * `labelSegmentFraction`) and perpendicular to it (`labelOffset`), tracking
 * the mouse continuously via `labelSide: 'auto'`.
 */
export class LinkLabelDraggingTool extends Tool {
  private _link: Link | null = null;
  private _isDragging = false;
  private _originalSegmentIndex = -1;
  private _originalSegmentFraction = 0.5;
  private _originalOffset = 0;
  private _originalSide: Link['labelSide'] = 'auto';

  /** Whether a label drag is in progress. */
  get isDragging(): boolean {
    return this._isDragging;
  }

  /** GoJS-compatible: the link whose label is being dragged. */
  get currentLink(): Link | null {
    return this._link;
  }

  /** GoJS-compatible: start dragging when pressing on a link's rendered label. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    if (e.button !== 0) return false;
    if (
      this.diagram &&
      (this.diagram.isEnabled === false ||
        this.diagram.isReadOnly === true ||
        this.diagram.allowMove === false)
    )
      return false;
    return this.findLabelLinkAt(this.getDiagramPoint(e)) !== null;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;
    const link = this.findLabelLinkAt(this.getDiagramPoint(e));
    if (!link) return;

    this._link = link;
    this._isDragging = true;
    this._originalSegmentIndex = link.labelSegmentIndex;
    this._originalSegmentFraction = link.labelSegmentFraction;
    this._originalOffset = link.labelOffset;
    this._originalSide = link.labelSide;
  }

  override doMouseMove(e: MouseEvent): void {
    if (!this._isDragging || !this._link) return;
    const points = this._link.pathPoints;
    if (points.length < 2) return;

    const point = this.getDiagramPoint(e);
    const { segmentIndex, fraction, offset } = this.projectOntoPath(points, point);
    this._link.labelSegmentIndex = segmentIndex;
    this._link.labelSegmentFraction = fraction;
    this._link.labelOffset = offset;
    this._link.labelSide = 'auto';

    this.diagram?.invalidate();
  }

  override doMouseUp(_e: MouseEvent): void {
    const link = this._link;
    this._isDragging = false;
    this._link = null;
    if (!link) return;

    const diagram = this.diagram;
    if (!diagram) return;

    const changed =
      link.labelSegmentIndex !== this._originalSegmentIndex ||
      link.labelSegmentFraction !== this._originalSegmentFraction ||
      link.labelOffset !== this._originalOffset ||
      link.labelSide !== this._originalSide;
    if (!changed) return;

    const undoManager = diagram.getUndoManager();
    undoManager.beginTransaction('Move link label');
    undoManager.execute(
      new SetLinkLabelPositionCommand(
        link,
        {
          segmentIndex: link.labelSegmentIndex,
          segmentFraction: link.labelSegmentFraction,
          offset: link.labelOffset,
          side: link.labelSide,
        },
        {
          segmentIndex: this._originalSegmentIndex,
          segmentFraction: this._originalSegmentFraction,
          offset: this._originalOffset,
          side: this._originalSide,
        },
      ),
    );
    undoManager.commitTransaction();
  }

  /** Finds the link whose rendered label bounds contain `point`, if any. */
  private findLabelLinkAt(point: { x: number; y: number }): Link | null {
    const diagram = this.diagram;
    if (!diagram) return null;
    for (const link of diagram.links.values()) {
      if (link.getLabelBounds()?.containsPoint(point)) return link;
    }
    return null;
  }

  /**
   * Projects `point` onto the nearest segment of `points`, returning the
   * segment index, the fraction along it (0-1), and the signed perpendicular
   * distance from the path to `point` (what `labelOffset` should become so
   * the label tracks the mouse under `labelSide: 'auto'`).
   */
  private projectOntoPath(
    points: Array<{ x: number; y: number }>,
    point: { x: number; y: number },
  ): { segmentIndex: number; fraction: number; offset: number } {
    let best = { segmentIndex: 0, fraction: 0.5, offset: 0, distSq: Number.POSITIVE_INFINITY };

    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) continue;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const lenSq = dx * dx + dy * dy;
      let t = lenSq > 0 ? ((point.x - a.x) * dx + (point.y - a.y) * dy) / lenSq : 0;
      t = Math.max(0, Math.min(1, t));

      const projX = a.x + dx * t;
      const projY = a.y + dy * t;
      const distSq = (point.x - projX) ** 2 + (point.y - projY) ** 2;

      if (distSq < best.distSq) {
        const segAngle = Math.atan2(dy, dx);
        const normalAngle = segAngle + Math.PI / 2;
        const toPointX = point.x - projX;
        const toPointY = point.y - projY;
        const offset = toPointX * Math.cos(normalAngle) + toPointY * Math.sin(normalAngle);
        best = { segmentIndex: i, fraction: t, offset, distSq };
      }
    }

    return { segmentIndex: best.segmentIndex, fraction: best.fraction, offset: best.offset };
  }
}
