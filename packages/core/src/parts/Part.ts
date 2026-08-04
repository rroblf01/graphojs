import { Point } from '../geometry/Point.ts';
import type { Rect } from '../geometry/Rect.ts';
import type { NodeKey, NodeData } from '../model/Model.ts';
import type { Binding } from '../binding/Binding.ts';
import type { Group } from './Group.ts';
import type { Layer } from '../layer/Layer.ts';
import type { Adornment, AdornmentName } from './Adornment.ts';
import { Panel } from '../panel/Panel.ts';
import type { GraphObject } from '../panel/GraphObject.ts';

/**
 * Base class for all visual parts in a diagram.
 */
export abstract class Part {
  private _key: NodeKey;
  private _bounds: Rect;
  private _visible = true;
  private _selectable = true;
  private _isSelected = false;
  private _opacity = 1;
  private _fill = '#cccccc';
  private _stroke = '#333333';
  private _strokeWidth = 1;
  private _zOrder = 0;
  private _angle = 0;
  private _containingGroup: Group | null = null;
  private _bindings: Binding[] = [];
  private _layer: Layer | null = null;
  private _tooltip: string = '';
  private _tooltipVisible = false;
  private _adornments: Map<AdornmentName, Adornment> = new Map();
  private _draggable = true;
  private _resizable = true;
  private _rotatable = true;
  protected _panel: Panel | null = null;

  constructor(key: NodeKey, bounds: Rect) {
    this._key = key;
    this._bounds = bounds;
  }

  get key(): NodeKey {
    return this._key;
  }

  get bounds(): Rect {
    return this._bounds;
  }

  set bounds(value: Rect) {
    this._bounds = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  get selectable(): boolean {
    return this._selectable;
  }

  set selectable(value: boolean) {
    this._selectable = value;
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  set isSelected(value: boolean) {
    this._isSelected = value;
  }

  get opacity(): number {
    return this._opacity;
  }

  set opacity(value: number) {
    this._opacity = value;
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

  get zOrder(): number {
    return this._zOrder;
  }

  set zOrder(value: number) {
    this._zOrder = value;
  }

  /** The rotation angle in degrees. */
  get angle(): number {
    return this._angle;
  }

  set angle(value: number) {
    this._angle = value;
  }

  /** GoJS-compatible: The location (position) of this part. */
  get location(): Point {
    return new Point(this._bounds.x, this._bounds.y);
  }

  set location(value: Point) {
    this._bounds = {
      ...this._bounds,
      x: value.x,
      y: value.y,
    } as Rect;
  }

  /** GoJS-compatible: The spot in the part that corresponds to the location point. */
  get locationSpot(): { x: number; y: number } {
    return { x: 0.5, y: 0.5 };
  }

  /** GoJS-compatible: The GraphObject that is used as the selection object (for adornment placement). */
  get selectionObject(): GraphObject | null {
    return null;
  }

  set selectionObject(_value: GraphObject | null) {
    // No-op: selection object is typically the main shape
  }

  /** GoJS-compatible: Reference to the model data object for this part. */
  get data(): NodeData | null {
    return null;
  }

  set data(_value: NodeData | null) {
    // No-op: data is managed by the model
  }

  /** GoJS-compatible: The name of the layer this part belongs to. */
  get layerName(): string {
    return this._layer?.name ?? 'Default';
  }

  set layerName(_value: string) {
    // Setting layerName would require a reference to the diagram to resolve
    // For now this is a no-op; layer assignment should be done via diagram operations
  }

  /** Get the containing group, or null if top-level. */
  get containingGroup(): Part | null {
    return this._containingGroup;
  }

  /** Set the containing group. */
  set containingGroup(value: Group | null) {
    this._containingGroup = value;
  }

  /** Get the layer this part belongs to. */
  get layer(): Layer | null {
    return this._layer;
  }

  /** Set the layer this part belongs to. */
  set layer(value: Layer | null) {
    // Remove from old layer
    if (this._layer) {
      this._layer.remove(this);
    }
    this._layer = value;
    // Add to new layer
    if (value) {
      value.add(this);
    }
  }

  /** The tooltip text shown when hovering over this part. */
  get tooltip(): string {
    return this._tooltip;
  }

  set tooltip(value: string) {
    this._tooltip = value;
  }

  /** Whether the tooltip is currently visible. */
  get tooltipVisible(): boolean {
    return this._tooltipVisible;
  }

  set tooltipVisible(value: boolean) {
    this._tooltipVisible = value;
  }

  /** Whether this part can be dragged. */
  get draggable(): boolean {
    return this._draggable;
  }

  set draggable(value: boolean) {
    this._draggable = value;
  }

  /** Whether this part can be resized. */
  get resizable(): boolean {
    return this._resizable;
  }

  set resizable(value: boolean) {
    this._resizable = value;
  }

  /** Whether this part can be rotated. */
  get rotatable(): boolean {
    return this._rotatable;
  }

  set rotatable(value: boolean) {
    this._rotatable = value;
  }

  /** GoJS-compatible: Get the panel used to render this part's visual tree. */
  get panel(): Panel | null {
    return this._panel;
  }

  /** GoJS-compatible: Set the panel used to render this part's visual tree. */
  set panel(value: Panel | null) {
    this._panel = value;
  }

  /** GoJS-compatible: Get the child elements in this part's visual tree. */
  get elements(): readonly GraphObject[] {
    return this._panel?.elements ?? [];
  }

  /** GoJS-compatible: Add a child element to this part's visual tree. */
  addVisual(element: GraphObject): this {
    if (!this._panel) {
      this._panel = new Panel('Auto');
    }
    this._panel.add(element);
    return this;
  }

  /** GoJS-compatible: Remove a child element from this part's visual tree. */
  removeVisual(element: GraphObject): boolean {
    if (!this._panel) return false;
    return this._panel.remove(element);
  }

  /** GoJS-compatible: Find a GraphObject by name in this part's visual tree. */
  findObject(name: string): GraphObject | null {
    if (!this._panel) return null;
    return this._panel.findElement(name);
  }

  /** Get all adornments on this part. */
  get adornments(): ReadonlyMap<AdornmentName, Adornment> {
    return this._adornments;
  }

  /** Get a specific adornment by name. */
  findAdornment(name: AdornmentName): Adornment | undefined {
    return this._adornments.get(name);
  }

  /** Add an adornment to this part. */
  addAdornment(name: AdornmentName, adornment: Adornment): void {
    adornment.adornedPart = this;
    this._adornments.set(name, adornment);
  }

  /** Remove an adornment from this part. */
  removeAdornment(name: AdornmentName): boolean {
    return this._adornments.delete(name);
  }

  /** Remove all adornments from this part. */
  clearAdornments(): void {
    this._adornments.clear();
  }

  /** Get all bindings on this part. */
  get bindings(): readonly Binding[] {
    return this._bindings;
  }

  /** Add a binding to this part. */
  addBinding(binding: Binding): this {
    this._bindings.push(binding);
    return this;
  }

  /** Remove a binding from this part. */
  removeBinding(binding: Binding): boolean {
    const index = this._bindings.indexOf(binding);
    if (index === -1) return false;
    this._bindings.splice(index, 1);
    return true;
  }

  /** Remove all bindings from this part. */
  clearBindings(): void {
    this._bindings.length = 0;
  }

  /** Find a binding targeting a specific property. */
  findBinding(targetProperty: string): Binding | undefined {
    return this._bindings.find((b) => b.targetProperty === targetProperty);
  }

  /** Apply all bindings from model data to this part. Returns the number of properties set. */
  applyBindings(nodeData: NodeData): number {
    let count = 0;
    for (const binding of this._bindings) {
      if (binding.applyToPart(this, nodeData)) {
        count++;
      }
    }
    return count;
  }

  /** Apply TwoWay bindings: write Part properties back to model data. */
  applyTwoWayBindings(nodeData: NodeData): number {
    let count = 0;
    for (const binding of this._bindings) {
      if (binding.applyToModel(this, nodeData)) {
        count++;
      }
    }
    return count;
  }

  /** Check if a point is inside this part. */
  containsPoint(point: { x: number; y: number }): boolean {
    return this._bounds.containsPoint(point);
  }

  /** Get the center point. */
  get center(): { x: number; y: number } {
    return this._bounds.center;
  }

  /** Get the position (top-left). */
  get position(): { x: number; y: number } {
    return { x: this._bounds.x, y: this._bounds.y };
  }

  /** Get the size. */
  get size(): { width: number; height: number } {
    return { width: this._bounds.width, height: this._bounds.height };
  }

  /** Create a deep copy of this part. */
  copy(): this {
    const cloned = Object.create(Object.getPrototypeOf(this)) as this;
    cloned._key = this._key;
    cloned._bounds = this._bounds.clone();
    cloned._visible = this._visible;
    cloned._selectable = this._selectable;
    cloned._isSelected = this._isSelected;
    cloned._opacity = this._opacity;
    cloned._fill = this._fill;
    cloned._stroke = this._stroke;
    cloned._strokeWidth = this._strokeWidth;
    cloned._zOrder = this._zOrder;
    cloned._angle = this._angle;
    cloned._tooltip = this._tooltip;
    cloned._tooltipVisible = this._tooltipVisible;
    cloned._draggable = this._draggable;
    cloned._resizable = this._resizable;
    cloned._rotatable = this._rotatable;
    cloned._bindings = this._bindings.map((b) => b.copy());
    cloned._adornments = new Map();
    return cloned;
  }
}
