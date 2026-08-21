import type { Binding } from '../binding/Binding.ts';
import type { Diagram } from '../diagram/Diagram.ts';
import { Point } from '../geometry/Point.ts';
import type { Rect } from '../geometry/Rect.ts';
import type { Size } from '../geometry/Size.ts';
import type { Layer } from '../layer/Layer.ts';
import { LayerNames } from '../layer/Layer.ts';
import type { NodeData, NodeKey } from '../model/Model.ts';
import type { GraphObject } from '../panel/GraphObject.ts';
import type { HTMLInfo } from '../panel/HTMLInfo.ts';
import { Panel } from '../panel/Panel.ts';
import type { Adornment, AdornmentName } from './Adornment.ts';
import type { Group } from './Group.ts';

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
  private _toolTip: Panel | HTMLInfo | null = null;
  private _contextMenu: Panel | HTMLInfo | null = null;
  private _adornments: Map<AdornmentName, Adornment> = new Map();
  private _draggable = true;
  private _resizable = true;
  private _rotatable = true;
  protected _panel: Panel | null = null;
  private _locationSpot: { x: number; y: number } = { x: 0.5, y: 0.5 };
  private _data: NodeData | null = null;
  private _category = '';
  private _dragAlpha = 1;
  private _isInDocumentBounds = true;
  private _deletable = true;
  private _isTreeExpanded = true;
  private _copyable = true;
  private _isHighlighted = false;
  private _diagram: Diagram | null = null;
  private _scale = 1;
  private _background: string | null = null;
  private _pickable = true;
  private _cursor = '';
  private _minSize = { width: 0, height: 0 };
  private _maxSize = { width: Infinity, height: Infinity };
  private _desiredSize: { width: number; height: number } | null = null;

  constructor(key: NodeKey, bounds: Rect) {
    this._key = key;
    this._bounds = bounds;
  }

  get key(): NodeKey {
    return this._key;
  }

  /** GoJS-compatible: Whether this part can be deleted. */
  get deletable(): boolean {
    return this._deletable;
  }

  set deletable(value: boolean) {
    this._deletable = value;
  }

  /**
   * GoJS-compatible: Whether this part's tree-children (per findTreeChildrenNodes)
   * are shown. Distinct from Group.isSubGraphExpanded — this applies to any Part
   * and is what TreeExpanderButton toggles via Diagram.collapseTree/expandTree.
   */
  get isTreeExpanded(): boolean {
    return this._isTreeExpanded;
  }

  set isTreeExpanded(value: boolean) {
    this._isTreeExpanded = value;
  }

  /** GoJS-compatible: Whether this part can be copied. */
  get copyable(): boolean {
    return this._copyable;
  }

  set copyable(value: boolean) {
    this._copyable = value;
  }

  /** GoJS-compatible: Whether this part is currently highlighted. */
  get isHighlighted(): boolean {
    return this._isHighlighted;
  }

  set isHighlighted(value: boolean) {
    this._isHighlighted = value;
  }

  get bounds(): Rect {
    return this._bounds;
  }

  set bounds(value: Rect) {
    this._bounds = value;
  }

  /** GoJS-compatible: The width of this part (delegates to its bounds). */
  get width(): number {
    return this._bounds.width;
  }

  set width(value: number) {
    this._bounds.width = value;
  }

  /** GoJS-compatible: The height of this part (delegates to its bounds). */
  get height(): number {
    return this._bounds.height;
  }

  set height(value: number) {
    this._bounds.height = value;
  }

  /** GoJS-compatible: The desired size of this part. */
  get desiredSize(): Size | null {
    if (this._desiredSize === null) return null;
    return { width: this._desiredSize.width, height: this._desiredSize.height } as unknown as Size;
  }

  set desiredSize(value: Size | { width: number; height: number } | null) {
    if (value === null) {
      this._desiredSize = null;
      return;
    }
    this._desiredSize = { width: value.width, height: value.height };
  }

  /** GoJS-compatible: The scale of this part. */
  get scale(): number {
    return this._scale;
  }

  set scale(value: number) {
    this._scale = value;
  }

  /** GoJS-compatible: The background color of this part. */
  get background(): string | null {
    return this._background;
  }

  set background(value: string | null) {
    this._background = value;
  }

  /** GoJS-compatible: Whether this part is pickable (hit-testable). */
  get pickable(): boolean {
    return this._pickable;
  }

  set pickable(value: boolean) {
    this._pickable = value;
  }

  /** GoJS-compatible: The cursor shown when hovering this part. */
  get cursor(): string {
    return this._cursor;
  }

  set cursor(value: string) {
    this._cursor = value;
  }

  /** GoJS-compatible: The minimum size of this part. */
  get minSize(): { width: number; height: number } {
    return this._minSize;
  }

  set minSize(value: { width: number; height: number }) {
    this._minSize = value;
  }

  /** GoJS-compatible: The maximum size of this part. */
  get maxSize(): { width: number; height: number } {
    return this._maxSize;
  }

  set maxSize(value: { width: number; height: number }) {
    this._maxSize = value;
  }

  /** GoJS-compatible: The actual bounds of this part in document coordinates. */
  get actualBounds(): Rect {
    return this._bounds;
  }

  set actualBounds(value: Rect) {
    this._bounds = value;
  }

  /** GoJS-compatible: Whether this part and its ancestors are visible. */
  get isVisibleObject(): boolean {
    let current: Part | null = this;
    while (current) {
      if (!current.visible) return false;
      current = current.containingGroup as Part | null;
    }
    return true;
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

  /**
   * GoJS-compatible: The location point of this part — the point within the
   * bounds at `locationSpot`. With the default locationSpot (0.5, 0.5) this
   * is the center; changing locationSpot moves the part so the spot stays put.
   */
  get location(): Point {
    const spot = this._locationSpot;
    return new Point(
      this._bounds.x + this._bounds.width * spot.x,
      this._bounds.y + this._bounds.height * spot.y,
    );
  }

  set location(value: Point) {
    const spot = this._locationSpot;
    this._bounds.x = value.x - this._bounds.width * spot.x;
    this._bounds.y = value.y - this._bounds.height * spot.y;
  }

  /** GoJS-compatible: The spot in the part that corresponds to the location point. */
  get locationSpot(): { x: number; y: number } {
    return this._locationSpot;
  }

  set locationSpot(value: { x: number; y: number }) {
    this._locationSpot = value;
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
    return this._data;
  }

  set data(value: NodeData | null) {
    this._data = value;
  }

  /** GoJS-compatible: The category of this part (used to select a template). */
  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  /** GoJS-compatible: The opacity used when this part is being dragged. */
  get dragAlpha(): number {
    return this._dragAlpha;
  }

  set dragAlpha(value: number) {
    this._dragAlpha = Math.max(0, Math.min(1, value));
  }

  /** GoJS-compatible: Whether this part is within the document bounds. */
  get isInDocumentBounds(): boolean {
    return this._isInDocumentBounds;
  }

  set isInDocumentBounds(value: boolean) {
    this._isInDocumentBounds = value;
  }

  /** GoJS-compatible: The name of the layer this part belongs to. */
  get layerName(): string {
    return this._layer?.name ?? LayerNames.Default;
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

  /** GoJS-compatible: Whether this part is a member of a group. */
  get isMemberOfGroup(): boolean {
    return this._containingGroup !== null;
  }

  /** GoJS-compatible: Whether this part has been given a position/bounds. */
  get isPositioned(): boolean {
    return this._bounds.isReal();
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

  /** GoJS-compatible: The diagram that this part is in (or null). */
  get diagram(): Diagram | null {
    return this._diagram;
  }

  /** Set the diagram this part belongs to. */
  set diagram(value: Diagram | null) {
    this._diagram = value;
  }

  /** GoJS-compatible: Find the diagram that contains this part. */
  findDiagram(): Diagram | null {
    return this._diagram;
  }

  /** GoJS-compatible: Find the layer that contains this part. */
  findLayer(): Layer | null {
    return this._layer;
  }

  /** The tooltip text shown when hovering over this part. */
  get tooltip(): string {
    return this._tooltip;
  }

  set tooltip(value: string) {
    this._tooltip = value;
  }

  /**
   * GoJS-compatible: a tooltip shown on hover — a Panel template drawn to
   * canvas, or an {@link HTMLInfo} for full control over an HTML element.
   */
  get toolTip(): Panel | HTMLInfo | null {
    return this._toolTip;
  }

  set toolTip(value: Panel | HTMLInfo | null) {
    this._toolTip = value;
  }

  /**
   * GoJS-compatible: a context menu shown on right-click — a Panel
   * template drawn to canvas, or an {@link HTMLInfo} for full control over
   * an HTML element.
   */
  get contextMenu(): Panel | HTMLInfo | null {
    return this._contextMenu;
  }

  set contextMenu(value: Panel | HTMLInfo | null) {
    this._contextMenu = value;
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
    if (value) {
      (value as unknown as { partRef?: Part }).partRef = this;
    }
  }

  /** GoJS-compatible: Get the child elements in this part's visual tree. */
  get elements(): readonly GraphObject[] {
    return this._panel?.elements ?? [];
  }

  /** GoJS-compatible: Add a child element to this part's visual tree. */
  addVisual(element: GraphObject): this {
    if (!this._panel) {
      this.panel = new Panel('Auto');
    }
    this._panel?.add(element);
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

  /** GoJS-compatible: Find an adornment by name, or null if not present. */
  findAdornmentNamed(name: string): Adornment | null {
    return this._adornments.get(name as AdornmentName) ?? null;
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
    // Apply element-level bindings in the visual tree
    if (this._panel) {
      count += this._panel.applyBindings(nodeData);
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

  /** Set the position (top-left), preserving size. */
  set position(value: { x: number; y: number }) {
    this._bounds.x = value.x;
    this._bounds.y = value.y;
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
    cloned._locationSpot = { ...this._locationSpot };
    cloned._category = this._category;
    cloned._dragAlpha = this._dragAlpha;
    cloned._isInDocumentBounds = this._isInDocumentBounds;
    // Deep-copy the visual tree
    cloned._panel = this._panel ? (this._panel.clone() as Panel) : null;
    // Copy the data reference (shared model object)
    cloned._data = this._data;
    return cloned;
  }
}
