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
  // GoJS-compatible routing constants
  static readonly Straight = 'straight';
  static readonly Orthogonal = 'orthogonal';
  static readonly Curved = 'curved';

  // GoJS-compatible arrowhead constants
  static readonly None = 'none';
  static readonly TriangleArrowHead = 'triangle';
  static readonly OpenTriangleArrowHead = 'openArrow';
  static readonly StandardArrowHead = 'triangle';
  static readonly DiamondArrowHead = 'diamond';
  static readonly CircleArrowHead = 'circle';

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
  private _labelOffset = 7;
  private _labelSegmentIndex = -1;
  private _labelSide: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
  private _labelAlignment: 'start' | 'middle' | 'end' = 'middle';
  private _curviness = 0;
  private _avoidObstacles = false;
  private _jumpOver = false;

  // GoJS-compatible properties
  private _fromEndSegmentLength = 10;
  private _toEndSegmentLength = 10;
  private _relinkableFrom = false;
  private _relinkableTo = false;
  private _reshapable = false;
  private _pathPattern: string | null = null;

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

  /** GoJS-compatible alias for fromKey. */
  get fromNode(): NodeKey {
    return this._fromKey;
  }

  set fromNode(value: NodeKey) {
    this._fromKey = value;
  }

  get toKey(): NodeKey {
    return this._toKey;
  }

  /** GoJS-compatible alias for toKey. */
  get toNode(): NodeKey {
    return this._toKey;
  }

  set toNode(value: NodeKey) {
    this._toKey = value;
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

  /** The perpendicular offset of the link label from the path. */
  get labelOffset(): number {
    return this._labelOffset;
  }

  set labelOffset(value: number) {
    this._labelOffset = value;
  }

  /** The segment index to place the label on (-1 = middle segment). */
  get labelSegmentIndex(): number {
    return this._labelSegmentIndex;
  }

  set labelSegmentIndex(value: number) {
    this._labelSegmentIndex = value;
  }

  /** Which side of the link to place the label on. */
  get labelSide(): 'top' | 'bottom' | 'left' | 'right' | 'auto' {
    return this._labelSide;
  }

  set labelSide(value: 'top' | 'bottom' | 'left' | 'right' | 'auto') {
    this._labelSide = value;
  }

  /** Horizontal alignment of the label along its segment. */
  get labelAlignment(): 'start' | 'middle' | 'end' {
    return this._labelAlignment;
  }

  set labelAlignment(value: 'start' | 'middle' | 'end') {
    this._labelAlignment = value;
  }

  /** Controls the tightness of curved routing. 0 = default, positive = tighter, negative = looser. */
  get curviness(): number {
    return this._curviness;
  }

  set curviness(value: number) {
    this._curviness = value;
  }

  /** Whether this link should route around obstacles (nodes). */
  get avoidObstacles(): boolean {
    return this._avoidObstacles;
  }

  set avoidObstacles(value: boolean) {
    this._avoidObstacles = value;
  }

  /** Whether this link should jump over other links at crossings. */
  get jumpOver(): boolean {
    return this._jumpOver;
  }

  set jumpOver(value: boolean) {
    this._jumpOver = value;
  }

  /** GoJS-compatible: Length of the segment at the start of the link. */
  get fromEndSegmentLength(): number {
    return this._fromEndSegmentLength;
  }

  set fromEndSegmentLength(value: number) {
    this._fromEndSegmentLength = value;
  }

  /** GoJS-compatible: Length of the segment at the end of the link. */
  get toEndSegmentLength(): number {
    return this._toEndSegmentLength;
  }

  set toEndSegmentLength(value: number) {
    this._toEndSegmentLength = value;
  }

  /** GoJS-compatible: Whether the link can be relinked from the start end. */
  get relinkableFrom(): boolean {
    return this._relinkableFrom;
  }

  set relinkableFrom(value: boolean) {
    this._relinkableFrom = value;
  }

  /** GoJS-compatible: Whether the link can be relinked to the end end. */
  get relinkableTo(): boolean {
    return this._relinkableTo;
  }

  set relinkableTo(value: boolean) {
    this._relinkableTo = value;
  }

  /** GoJS-compatible: Whether the link path can be reshaped by dragging midpoints. */
  get reshapable(): boolean {
    return this._reshapable;
  }

  set reshapable(value: boolean) {
    this._reshapable = value;
  }

  /** GoJS-compatible: Custom path pattern for the link stroke. */
  get pathPattern(): string | null {
    return this._pathPattern;
  }

  set pathPattern(value: string | null) {
    this._pathPattern = value;
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

import { registerPartCtor } from '../panel/PartRegistry.ts';
registerPartCtor(Link);
