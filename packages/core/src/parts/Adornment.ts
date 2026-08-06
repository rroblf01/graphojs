import type { Rect } from '../geometry/Rect.ts';
import { Rect as RectClass } from '../geometry/Rect.ts';
import type { NodeKey } from '../model/Model.ts';
import { Part } from './Part.ts';

/**
 * Standard adornment names used by GoJS.
 */
export type AdornmentName =
  | 'Selection'
  | 'Resize'
  | 'Rotation'
  | 'ToolTip'
  | 'ContextMenu'
  | 'Multi'
  | 'LinkLabel'
  | string;

/**
 * Adornment types.
 */
export type AdornmentType =
  | 'Selection'
  | 'Resize'
  | 'Rotation'
  | 'ToolTip'
  | 'ContextMenu'
  | 'Multi'
  | 'LinkLabel';

/**
 * An Adornment is a Part that is attached to another Part.
 * It is used for selection handles, resize handles, rotation handles,
 * tooltips, context menus, and any user-defined visual decoration.
 */
export class Adornment extends Part {
  private _adornedPart: Part | null = null;
  private _adornmentName: AdornmentName;
  private _adornmentType: AdornmentType;
  private _childShapes: AdornmentShape[] = [];
  private _isVisible = true;

  constructor(key: NodeKey, name: AdornmentName, type: AdornmentType, bounds?: Rect) {
    super(key, bounds ?? RectClass.zero());
    this._adornmentName = name;
    this._adornmentType = type;
  }

  /** The part this adornment is attached to. */
  get adornedPart(): Part | null {
    return this._adornedPart;
  }

  set adornedPart(value: Part | null) {
    this._adornedPart = value;
  }

  /** The name of this adornment (e.g., 'Selection', 'Resize'). */
  get adornmentName(): AdornmentName {
    return this._adornmentName;
  }

  /** The type of this adornment. */
  get adornmentType(): AdornmentType {
    return this._adornmentType;
  }

  /** Whether this adornment is visible. */
  get isVisible(): boolean {
    return this._isVisible;
  }

  set isVisible(value: boolean) {
    this._isVisible = value;
    this.visible = value;
  }

  /** Get all child shapes in this adornment. */
  get childShapes(): readonly AdornmentShape[] {
    return this._childShapes;
  }

  /** Add a child shape to this adornment. */
  addShape(shape: AdornmentShape): this {
    this._childShapes.push(shape);
    return this;
  }

  /** Remove a child shape from this adornment. */
  removeShape(shape: AdornmentShape): boolean {
    const index = this._childShapes.indexOf(shape);
    if (index === -1) return false;
    this._childShapes.splice(index, 1);
    return true;
  }

  /** Remove all child shapes. */
  clearShapes(): void {
    this._childShapes.length = 0;
  }

  /** Find a child shape by name. */
  findShape(name: string): AdornmentShape | undefined {
    return this._childShapes.find((s) => s.name === name);
  }

  /**
   * Update the adornment's position (and any child shapes created with a
   * relative spot, e.g. resize/rotation handles) based on the adorned
   * part's current bounds. Call this whenever the adorned part moves,
   * resizes, or rotates, to keep the adornment from going stale.
   */
  updatePosition(): void {
    if (!this._adornedPart) return;
    const partBounds = this._adornedPart.bounds;
    this.bounds = partBounds.clone();
    for (const shape of this._childShapes) {
      shape.repositionRelativeTo(partBounds);
    }
  }

  /** Check if a point is inside any child shape. */
  override containsPoint(point: { x: number; y: number }): boolean {
    for (const shape of this._childShapes) {
      if (shape.containsPoint(point)) return true;
    }
    return super.containsPoint(point);
  }
}

/**
 * A shape within an adornment (e.g., a resize handle, rotation handle).
 */
export class AdornmentShape {
  private _name: string;
  private _bounds: Rect;
  private _fill: string;
  private _stroke: string;
  private _strokeWidth: number;
  private _cursor: string;
  private _visible: boolean;
  /** Fractional point within the adorned part's bounds this shape tracks (e.g. {0,0}=top-left, {1,1}=bottom-right), or null to stay fixed. */
  private _relativeSpot: { x: number; y: number } | null;
  /** Fixed pixel offset applied after the relative spot (e.g. for a rotation handle sitting above the part). */
  private _relativeOffset: { x: number; y: number };

  constructor(options: {
    name: string;
    bounds: Rect;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    cursor?: string;
    visible?: boolean;
    relativeSpot?: { x: number; y: number };
    relativeOffset?: { x: number; y: number };
  }) {
    this._name = options.name;
    this._bounds = options.bounds;
    this._fill = options.fill ?? '#ffffff';
    this._stroke = options.stroke ?? '#2196f3';
    this._strokeWidth = options.strokeWidth ?? 1;
    this._cursor = options.cursor ?? 'default';
    this._visible = options.visible ?? true;
    this._relativeSpot = options.relativeSpot ?? null;
    this._relativeOffset = options.relativeOffset ?? { x: 0, y: 0 };
  }

  /**
   * Move this shape so its center sits at its stored relative spot (plus any
   * fixed offset) within the given (current) part bounds. A shape created
   * without a relativeSpot is left untouched.
   */
  repositionRelativeTo(partBounds: Rect): void {
    if (!this._relativeSpot) return;
    const w = this._bounds.width;
    const h = this._bounds.height;
    const cx = partBounds.x + this._relativeSpot.x * partBounds.width + this._relativeOffset.x;
    const cy = partBounds.y + this._relativeSpot.y * partBounds.height + this._relativeOffset.y;
    this._bounds = new RectClass(cx - w / 2, cy - h / 2, w, h);
  }

  get name(): string {
    return this._name;
  }

  get bounds(): Rect {
    return this._bounds;
  }

  set bounds(value: Rect) {
    this._bounds = value;
  }

  get fill(): string {
    return this._fill;
  }

  set fill(value: string) {
    this._fill = value;
  }

  get stroke(): string {
    return this._stroke;
  }

  set stroke(value: string) {
    this._stroke = value;
  }

  get strokeWidth(): number {
    return this._strokeWidth;
  }

  set strokeWidth(value: number) {
    this._strokeWidth = value;
  }

  get cursor(): string {
    return this._cursor;
  }

  set cursor(value: string) {
    this._cursor = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  /** Check if a point is inside this shape. */
  containsPoint(point: { x: number; y: number }): boolean {
    return this._bounds.containsPoint(point);
  }
}

/**
 * Create a selection adornment with standard resize handles.
 */
export function createSelectionAdornment(key: NodeKey, adornedPart: Part): Adornment {
  const adornment = new Adornment(key, 'Selection', 'Selection');
  adornment.adornedPart = adornedPart;
  adornment.updatePosition();

  const { x, y, width, height } = adornedPart.bounds;
  const handleSize = 8;
  const half = handleSize / 2;

  // Corner handles
  const corners: Array<[number, number, string, { x: number; y: number }]> = [
    [x, y, 'nw-resize', { x: 0, y: 0 }],
    [x + width, y, 'ne-resize', { x: 1, y: 0 }],
    [x, y + height, 'sw-resize', { x: 0, y: 1 }],
    [x + width, y + height, 'se-resize', { x: 1, y: 1 }],
  ];

  for (const [hx, hy, cursor, relativeSpot] of corners) {
    adornment.addShape(
      new AdornmentShape({
        name: `corner-${cursor}`,
        bounds: new RectClass(hx - half, hy - half, handleSize, handleSize),
        cursor,
        relativeSpot,
      }),
    );
  }

  // Edge handles
  const edges: Array<[number, number, string, { x: number; y: number }]> = [
    [x + width / 2, y, 'n-resize', { x: 0.5, y: 0 }],
    [x + width / 2, y + height, 's-resize', { x: 0.5, y: 1 }],
    [x, y + height / 2, 'w-resize', { x: 0, y: 0.5 }],
    [x + width, y + height / 2, 'e-resize', { x: 1, y: 0.5 }],
  ];

  for (const [hx, hy, cursor, relativeSpot] of edges) {
    adornment.addShape(
      new AdornmentShape({
        name: `edge-${cursor}`,
        bounds: new RectClass(hx - half, hy - half, handleSize, handleSize),
        cursor,
        relativeSpot,
      }),
    );
  }

  return adornment;
}

/**
 * Create a rotation adornment with a rotation handle.
 */
export function createRotationAdornment(key: NodeKey, adornedPart: Part): Adornment {
  const adornment = new Adornment(key, 'Rotation', 'Rotation');
  adornment.adornedPart = adornedPart;
  adornment.updatePosition();

  const { x, y, width } = adornedPart.bounds;
  const handleRadius = 5;
  const handleY = y - 20;

  adornment.addShape(
    new AdornmentShape({
      name: 'rotation-handle',
      bounds: new RectClass(
        x + width / 2 - handleRadius,
        handleY - handleRadius,
        handleRadius * 2,
        handleRadius * 2,
      ),
      fill: '#ffffff',
      stroke: '#2196f3',
      cursor: 'crosshair',
      relativeSpot: { x: 0.5, y: 0 },
      relativeOffset: { x: 0, y: -20 },
    }),
  );

  return adornment;
}

/**
 * Create a tooltip adornment.
 */
export function createTooltipAdornment(
  key: NodeKey,
  adornedPart: Part,
  tooltipText: string,
): Adornment {
  const adornment = new Adornment(key, 'ToolTip', 'ToolTip');
  adornment.adornedPart = adornedPart;

  const { x, y, height } = adornedPart.bounds;
  const tooltipHeight = 24;
  const padding = 8;

  adornment.addShape(
    new AdornmentShape({
      name: 'tooltip-background',
      bounds: new RectClass(
        x,
        y + height + 5,
        Math.max(tooltipText.length * 7 + padding * 2, 60),
        tooltipHeight,
      ),
      fill: '#333333',
      stroke: '#333333',
      strokeWidth: 0,
    }),
  );

  return adornment;
}

/**
 * Create a context menu adornment.
 */
export function createContextmenuAdornment(
  key: NodeKey,
  adornedPart: Part,
  items: Array<{ text: string; action: string }>,
): Adornment {
  const adornment = new Adornment(key, 'ContextMenu', 'ContextMenu');
  adornment.adornedPart = adornedPart;

  const { x, y } = adornedPart.bounds;
  const itemHeight = 28;
  const menuWidth = 150;

  let currentY = y;

  for (const item of items) {
    adornment.addShape(
      new AdornmentShape({
        name: `menu-${item.action}`,
        bounds: new RectClass(x, currentY, menuWidth, itemHeight),
        fill: '#ffffff',
        stroke: '#cccccc',
        cursor: 'pointer',
      }),
    );
    currentY += itemHeight;
  }

  return adornment;
}

/**
 * Manages adornments for a diagram.
 */
export class AdornmentManager {
  private _adornments: Map<NodeKey, Map<AdornmentName, Adornment>> = new Map();
  private _nextKey = 1;

  /** Get all adornments for a part. */
  getAdornments(part: Part): Map<AdornmentName, Adornment> {
    return this._adornments.get(part.key) ?? new Map();
  }

  /** Get a specific adornment for a part. */
  getAdornment(part: Part, name: AdornmentName): Adornment | undefined {
    return this._adornments.get(part.key)?.get(name);
  }

  /** Add an adornment for a part. */
  addAdornment(part: Part, adornment: Adornment): void {
    let partAdornments = this._adornments.get(part.key);
    if (!partAdornments) {
      partAdornments = new Map();
      this._adornments.set(part.key, partAdornments);
    }
    adornment.adornedPart = part;
    partAdornments.set(adornment.adornmentName, adornment);
  }

  /** Remove an adornment from a part. */
  removeAdornment(part: Part, name: AdornmentName): boolean {
    const partAdornments = this._adornments.get(part.key);
    if (!partAdornments) return false;
    return partAdornments.delete(name);
  }

  /** Remove all adornments for a part. */
  clearAdornments(part: Part): void {
    this._adornments.delete(part.key);
  }

  /** Remove all adornments. */
  clear(): void {
    this._adornments.clear();
  }

  /** Generate a unique key for an adornment. */
  generateKey(): NodeKey {
    return `adornment-${this._nextKey++}`;
  }

  /** Get all adornments as an array. */
  getAllAdornments(): Adornment[] {
    const result: Adornment[] = [];
    for (const partAdornments of this._adornments.values()) {
      for (const adornment of partAdornments.values()) {
        result.push(adornment);
      }
    }
    return result;
  }

  /** Get the number of adornments. */
  get size(): number {
    let count = 0;
    for (const partAdornments of this._adornments.values()) {
      count += partAdornments.size;
    }
    return count;
  }
}
