import { Rect } from '../geometry/Rect.ts';
import type { NodeKey } from '../model/Model.ts';
import type { Spot } from '../geometry/Spot.ts';
import { Part } from './Part.ts';

export type LinkRouting = 'straight' | 'orthogonal' | 'curved';
export type ArrowheadStyle = 'triangle' | 'openArrow' | 'diamond' | 'circle' | 'none';

/**
 * A visual link between two nodes.
 */
export class Link extends Part {
  private _fromKey: NodeKey;
  private _toKey: NodeKey;
  private _routing: LinkRouting = 'straight';
  private _fromPort = { x: 0, y: 0 };
  private _toPort = { x: 0, y: 0 };
  private _fromPortName: string | undefined = undefined;
  private _toPortName: string | undefined = undefined;
  private _fromSpot: Spot | null = null;
  private _toSpot: Spot | null = null;
  private _pathPoints: Array<{ x: number; y: number }> = [];
  private _arrowhead: ArrowheadStyle = 'triangle';
  private _arrowheadSize = 10;
  private _label = '';
  private _labelColor = '#333333';
  private _labelFont = '11px sans-serif';
  private _corner = 0;

  constructor(key: NodeKey, fromKey: NodeKey, toKey: NodeKey) {
    super(key, Rect.zero());
    this._fromKey = fromKey;
    this._toKey = toKey;
    this.strokeWidth = 2;
    this.fill = 'none';
  }

  get fromKey(): NodeKey {
    return this._fromKey;
  }

  get toKey(): NodeKey {
    return this._toKey;
  }

  get routing(): LinkRouting {
    return this._routing;
  }

  set routing(value: LinkRouting) {
    this._routing = value;
  }

  get fromPort(): { x: number; y: number } {
    return this._fromPort;
  }

  set fromPort(value: { x: number; y: number }) {
    this._fromPort = value;
  }

  get toPort(): { x: number; y: number } {
    return this._toPort;
  }

  set toPort(value: { x: number; y: number }) {
    this._toPort = value;
  }

  /** The name of the source port on the from-node. */
  get fromPortName(): string | undefined {
    return this._fromPortName;
  }

  set fromPortName(value: string | undefined) {
    this._fromPortName = value;
  }

  /** The name of the target port on the to-node. */
  get toPortName(): string | undefined {
    return this._toPortName;
  }

  set toPortName(value: string | undefined) {
    this._toPortName = value;
  }

  /** The spot on the from-node where this link connects. */
  get fromSpot(): Spot | null {
    return this._fromSpot;
  }

  set fromSpot(value: Spot | null) {
    this._fromSpot = value;
  }

  /** The spot on the to-node where this link connects. */
  get toSpot(): Spot | null {
    return this._toSpot;
  }

  set toSpot(value: Spot | null) {
    this._toSpot = value;
  }

  /** The computed path points for this link. */
  get pathPoints(): Array<{ x: number; y: number }> {
    return this._pathPoints;
  }

  /** Set the computed path points. */
  setPathPoints(points: Array<{ x: number; y: number }>): void {
    this._pathPoints = points;
  }

  /** The arrowhead style at the target end. */
  get arrowhead(): ArrowheadStyle {
    return this._arrowhead;
  }

  set arrowhead(value: ArrowheadStyle) {
    this._arrowhead = value;
  }

  /** The size of the arrowhead. */
  get arrowheadSize(): number {
    return this._arrowheadSize;
  }

  set arrowheadSize(value: number) {
    this._arrowheadSize = value;
  }

  /** The label text shown on the link. */
  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  /** The color of the link label. */
  get labelColor(): string {
    return this._labelColor;
  }

  set labelColor(value: string) {
    this._labelColor = value;
  }

  /** The font of the link label. */
  get labelFont(): string {
    return this._labelFont;
  }

  set labelFont(value: string) {
    this._labelFont = value;
  }

  /** The corner rounding radius for orthogonal routing. */
  get corner(): number {
    return this._corner;
  }

  set corner(value: number) {
    this._corner = value;
  }

  /** Update the bounds based on all path points. */
  updateBounds(): void {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    const points = this._pathPoints.length > 0 ? this._pathPoints : [this._fromPort, this._toPort];

    for (const p of points) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }

    if (minX === Infinity) {
      this.bounds = Rect.zero();
      return;
    }

    this.bounds = new Rect(minX, minY, maxX - minX || 1, maxY - minY || 1);
  }

  /** Get the center point of the link. */
  override get center(): { x: number; y: number } {
    return this.bounds.center;
  }

  /** Check if a point is near the link path. */
  override containsPoint(point: { x: number; y: number }): boolean {
    const points = this._pathPoints.length > 0 ? this._pathPoints : [this._fromPort, this._toPort];
    const threshold = Math.max(4, this.strokeWidth);

    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) continue;
      const dist = this.distanceToSegment(point.x, point.y, a.x, a.y, b.x, b.y);
      if (dist <= threshold) return true;
    }
    return false;
  }

  private distanceToSegment(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(px - x1, py - y1);

    let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    const cx = x1 + t * dx;
    const cy = y1 + t * dy;
    return Math.hypot(px - cx, py - cy);
  }
}
