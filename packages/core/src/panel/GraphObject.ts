import type { Binding } from '../binding/Binding.ts';
import { Binding as BindingClass } from '../binding/Binding.ts';
import type { Margin } from '../geometry/Margin.ts';
import type { Rect } from '../geometry/Rect.ts';
import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import type { Spot } from '../geometry/Spot.ts';
import type { NodeData } from '../model/Model.ts';
import { isDomComponent } from './ComponentRegistry.ts';
import { getPanelFactory } from './PanelRegistry.ts';
import { isPartCtor } from './PartRegistry.ts';
import type { Part } from '../parts/Part.ts';
import type { InputEvent } from '../events/InputEvent.ts';

/**
 * Base class for all visual elements that can appear in a Panel.
 * GraphObjects are laid out by their containing Panel.
 */
export abstract class GraphObject {
  /** Properties that belong on the created Part, not on the template Panel. */
  protected static readonly PART_LEVEL_PROPS = new Set([
    'visible',
    'opacity',
    'location',
    'layerName',
    'draggable',
    'resizable',
    'rotatable',
    'selectable',
    'zOrder',
    'angle',
    'category',
    'width',
    'height',
    'desiredSize',
    'scale',
    'background',
    'pickable',
    'margin',
    'minSize',
    'maxSize',
    'cursor',
    'actualBounds',
    'deletable',
    'copyable',
  ]);
  private _name: string = '';
  private _desiredSize: Size | null = null;
  private _actualSize: Size = new SizeClass(0, 0);
  private _position = { x: 0, y: 0 };
  private _alignment: Spot | null = null;
  private _margin: Margin | null = null;
  private _visible = true;
  private _opacity = 1;
  private _angle = 0;
  private _cursor: string = '';
  private _bindings: Binding[] = [];

  // GoJS-compatible event handler properties (set via property maps)
  click?: (e: InputEvent, obj: GraphObject) => void;
  doubleClick?: (e: InputEvent, obj: GraphObject) => void;
  contextClick?: (e: InputEvent, obj: GraphObject) => void;
  mouseEnter?: (e: InputEvent, obj: GraphObject, prev: GraphObject | null) => void;
  mouseLeave?: (e: InputEvent, obj: GraphObject, prev: GraphObject | null) => void;
  mouseOver?: (e: InputEvent, obj: GraphObject) => void;
  mouseOut?: (e: InputEvent, obj: GraphObject) => void;

  /** The panel this object belongs to (set when added). Used for ofObject resolution. */
  parentPanel: GraphObject | null = null;

  /** GoJS-compatible: If non-empty, this object acts as a port on its part. */
  portId: string = '';

  /** The name of this graph object, used for findObject() lookups. */
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  /** GoJS-compatible: The bindings attached to this graph object. */
  get bindings(): readonly Binding[] {
    return this._bindings;
  }

  /**
   * GoJS-compatible: Set a binding on this graph object, replacing any
   * existing binding with the same target property.
   */
  setBinding(binding: Binding): this {
    this._bindings = this._bindings.filter((b) => b.targetProperty !== binding.targetProperty);
    this._bindings.push(binding);
    return this;
  }

  /** Add a binding to this graph object (keeps existing bindings). */
  addBinding(binding: Binding): this {
    this._bindings.push(binding);
    return this;
  }

  /** Remove a binding by target property. Returns true if removed. */
  removeBinding(targetProperty: string): boolean {
    const index = this._bindings.findIndex((b) => b.targetProperty === targetProperty);
    if (index === -1) return false;
    this._bindings.splice(index, 1);
    return true;
  }

  /** Apply all bindings from model data to this graph object. */
  applyBindings(nodeData: NodeData): number {
    let count = 0;
    for (const binding of this._bindings) {
      if (binding.applyToTarget(this, nodeData)) {
        count++;
      }
    }
    return count;
  }

  /**
   * GoJS-compatible static factory method.
   *
   * Usage:
   *   const $ = go.GraphObject.make;
   *   const shape = $(go.Shape, "RoundedRectangle", { fill: "white", stroke: "gray" });
   *   const panel = $(go.Panel, "Auto", shape, $(go.TextBlock, "Hello"));
   */
  static make<T>(ctor: new (...args: unknown[]) => T, ...args: unknown[]): T {
    // GoJS-compatible: $(go.Node/'go.Link'/'go.Group', panelType, ...children, props)
    // builds a template Panel carrying the part properties to apply on instantiation.
    if (isPartCtor(ctor)) {
      return GraphObject.makePartTemplate(args) as unknown as T;
    }

    // GoJS-compatible: $(go.Diagram, "divId", {props}) and
    // $(go.Palette/Overview, div, {props}) construct with real arguments
    if (isDomComponent(ctor)) {
      return GraphObject.makeDomComponent(ctor, args) as unknown as T;
    }

    const obj = new ctor();
    const objAny = obj as unknown as object;

    for (const arg of args) {
      if (arg === null || arg === undefined) continue;

      if (arg instanceof BindingClass) {
        // GoJS-compatible: attach a Binding to the object
        const setter = (objAny as unknown as { setBinding?: (b: Binding) => unknown }).setBinding;
        if (setter) setter.call(objAny, arg);
        continue;
      }

      if (arg instanceof GraphObject) {
        // Child element: add to panel if applicable
        if ('add' in objAny && typeof (objAny as Record<string, unknown>).add === 'function') {
          (objAny as { add(child: GraphObject): unknown }).add(arg);
        }
      } else if (typeof arg === 'string') {
        // First string arg for Shape = shape type, for Panel = panel type,
        // for TextBlock = text, for Picture = source
        if ('shape' in objAny) {
          (objAny as { shape: unknown }).shape = arg;
        } else if ('type' in objAny) {
          (objAny as { type: unknown }).type = arg;
        } else if ('text' in objAny) {
          (objAny as { text: unknown }).text = arg;
        } else if ('source' in objAny) {
          (objAny as { source: unknown }).source = arg;
        }
      } else if (typeof arg === 'object') {
        // Property map
        const props = arg as Record<string, unknown>;
        for (const [key, value] of Object.entries(props)) {
          (objAny as Record<string, unknown>)[key] = value;
        }
      }
    }

    return obj;
  }

  /**
   * Construct a DOM component (Diagram/Palette/Overview) with its real
   * first argument, then apply remaining property maps (with dotted-key
   * support such as "undoManager.isEnabled").
   */
  private static makeDomComponent(
    ctor: new (...args: unknown[]) => unknown,
    args: unknown[],
  ): unknown {
    const first = args[0];
    // eslint-disable-next-line new-cap
    const obj = first !== undefined ? new ctor(first) : new ctor();
    for (let i = 1; i < args.length; i++) {
      const arg = args[i];
      if (arg && typeof arg === 'object') {
        for (const [key, value] of Object.entries(arg as Record<string, unknown>)) {
          GraphObject.applyPath(obj, key, value);
        }
      }
    }
    return obj;
  }

  /** Apply a (possibly dotted) property path, e.g. "undoManager.isEnabled". */
  private static applyPath(obj: unknown, key: string, value: unknown): void {
    if (!key.includes('.')) {
      (obj as Record<string, unknown>)[key] = value;
      return;
    }
    const segments = key.split('.');
    let current: unknown = obj;
    for (let i = 0; i < segments.length - 1; i++) {
      const seg = segments[i];
      if (seg === undefined) continue;
      const next = (current as Record<string, unknown>)[seg];
      current = next ?? {};
      (obj as Record<string, unknown>)[seg] = current;
      obj = current;
    }
    const lastSeg = segments[segments.length - 1];
    if (lastSeg !== undefined) {
      (current as Record<string, unknown>)[lastSeg] = value;
    }
  }

  /**
   * Build a template Panel for Part constructors (Node/Link/Group).
   * Children are added to the panel; property maps are applied to the panel
   * when the key exists there, otherwise stored as templateProperties.
   */
  private static makePartTemplate(args: unknown[]): GraphObject {
    const makePanel = getPanelFactory();
    const panel = makePanel('Auto');

    for (const arg of args) {
      if (arg === null || arg === undefined) continue;

      if (arg instanceof BindingClass) {
        // Bindings on the part itself: support multiple by collecting them
        const existing = (panel.templateProperties.__bindings__ as Binding[] | undefined) ?? [];
        existing.push(arg.copy());
        panel.templateProperties.__bindings__ = existing;
        continue;
      }

      if (arg instanceof GraphObject) {
        panel.add(arg);
      } else if (typeof arg === 'string') {
        panel.type = arg as 'Auto' | 'Table' | 'Spot' | 'Vertical' | 'Horizontal' | 'Viewbox';
      } else if (typeof arg === 'object') {
        const props = arg as Record<string, unknown>;
        for (const [key, value] of Object.entries(props)) {
          // Part-level properties (visible, opacity, location, etc.) belong on
          // the created Part, not on the template Panel
          if (GraphObject.PART_LEVEL_PROPS.has(key)) {
            panel.templateProperties[key] = value;
          } else if (key in panel && key !== 'templateProperties') {
            (panel as unknown as Record<string, unknown>)[key] = value;
          } else {
            panel.templateProperties[key] = value;
          }
        }
      }
    }

    return panel;
  }

  /** Whether this object is visible. */
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  /** GoJS-compatible: Whether this object and all of its ancestors are visible. */
  get isVisibleObject(): boolean {
    let current: GraphObject | null = this;
    while (current) {
      if (!current.visible) return false;
      current = current.parent;
    }
    return true;
  }

  /** GoJS-compatible: The parent panel of this object (or null). */
  get parent(): GraphObject | null {
    return this.parentPanel;
  }

  /** GoJS-compatible: The Part that contains this object (or null). */
  get part(): Part | null {
    let current: GraphObject | null = this;
    while (current) {
      const owner = (current as unknown as { partRef?: Part | null }).partRef;
      if (owner) return owner;
      current = current.parent;
    }
    return null;
  }

  /** The opacity of this object (0-1). */
  get opacity(): number {
    return this._opacity;
  }

  set opacity(value: number) {
    this._opacity = Math.max(0, Math.min(1, value));
  }

  /** The rotation angle in degrees. */
  get angle(): number {
    return this._angle;
  }

  set angle(value: number) {
    this._angle = value;
  }

  /** GoJS-compatible: The cursor displayed when hovering over this object. */
  get cursor(): string {
    return this._cursor;
  }

  set cursor(value: string) {
    this._cursor = value;
  }

  /** The desired size. If null, natural size is used. */
  get desiredSize(): Size | null {
    return this._desiredSize;
  }

  set desiredSize(value: Size | null) {
    this._desiredSize = value;
  }

  /** The width (from desiredSize or actual size). */
  get width(): number {
    return this._desiredSize?.width ?? this._actualSize.width;
  }

  set width(value: number) {
    this._desiredSize = new SizeClass(value, this._desiredSize?.height ?? this._actualSize.height);
  }

  /** The height (from desiredSize or actual size). */
  get height(): number {
    return this._desiredSize?.height ?? this._actualSize.height;
  }

  set height(value: number) {
    this._desiredSize = new SizeClass(this._desiredSize?.width ?? this._actualSize.width, value);
  }

  /** The position within the parent panel. */
  get position(): { x: number; y: number } {
    return this._position;
  }

  /** Set the position within the parent panel. */
  setPosition(x: number, y: number): void {
    this._position = { x, y };
  }

  /** The actual size computed during layout. */
  get actualSize(): Size {
    return this._actualSize;
  }

  /** Set the actual size during layout. */
  setActualSize(width: number, height: number): void {
    this._actualSize = new SizeClass(width, height);
  }

  /** The alignment spot for Spot panels. */
  get alignment(): Spot | null {
    return this._alignment;
  }

  set alignment(value: Spot | null) {
    this._alignment = value;
  }

  /** The margin around this object. */
  get margin(): Margin | null {
    return this._margin;
  }

  set margin(value: Margin | null) {
    this._margin = value;
  }

  private _row = 0;
  private _column = 0;
  private _rowSpan = 1;
  private _columnSpan = 1;

  /** GoJS-compatible: The row index for table panels. */
  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
  }

  /** GoJS-compatible: The column index for table panels. */
  get column(): number {
    return this._column;
  }

  set column(value: number) {
    this._column = value;
  }

  /** GoJS-compatible: The number of rows this object spans. */
  get rowSpan(): number {
    return this._rowSpan;
  }

  set rowSpan(value: number) {
    this._rowSpan = value;
  }

  /** GoJS-compatible: The number of columns this object spans. */
  get columnSpan(): number {
    return this._columnSpan;
  }

  set columnSpan(value: number) {
    this._columnSpan = value;
  }

  private _alignmentFocus: Spot | null = null;

  /** GoJS-compatible: The spot within this object used for alignment/placement. */
  get alignmentFocus(): Spot | null {
    return this._alignmentFocus;
  }

  set alignmentFocus(value: Spot | null) {
    this._alignmentFocus = value;
  }

  private _scale = 1;

  /** GoJS-compatible: The scale of this object relative to its normal size. */
  get scale(): number {
    return this._scale;
  }

  set scale(value: number) {
    this._scale = value;
  }

  private _isShadowed = false;
  private _shadowColor = 'rgba(0,0,0,0.3)';
  private _shadowOffset = { x: 3, y: 3 };
  private _shadowBlur = 4;

  /** GoJS-compatible: Whether this object casts a drop shadow. */
  get isShadowed(): boolean {
    return this._isShadowed;
  }

  set isShadowed(value: boolean) {
    this._isShadowed = value;
  }

  /** GoJS-compatible: The drop shadow color. */
  get shadowColor(): string {
    return this._shadowColor;
  }

  set shadowColor(value: string) {
    this._shadowColor = value;
  }

  /** GoJS-compatible: The drop shadow offset. */
  get shadowOffset(): { x: number; y: number } {
    return this._shadowOffset;
  }

  set shadowOffset(value: { x: number; y: number }) {
    this._shadowOffset = value;
  }

  /** GoJS-compatible: The drop shadow blur radius. */
  get shadowBlur(): number {
    return this._shadowBlur;
  }

  set shadowBlur(value: number) {
    this._shadowBlur = value;
  }

  /** GoJS-compatible: Alias for shadowColor. */
  get shadow(): string {
    return this._shadowColor;
  }

  set shadow(value: string) {
    this._shadowColor = value;
  }

  private _pickable = true;
  private _copyable = true;

  /** GoJS-compatible: Whether this object can be hit-tested. */
  get pickable(): boolean {
    return this._pickable;
  }

  set pickable(value: boolean) {
    this._pickable = value;
  }

  /** GoJS-compatible: Whether this object is included when copying its part. */
  get copyable(): boolean {
    return this._copyable;
  }

  set copyable(value: boolean) {
    this._copyable = value;
  }

  /**
   * Measure the natural size of this object.
   * Returns the size this object would like to occupy.
   */
  abstract measure(): Size;

  /**
   * Draw this object at its computed position and size.
   */
  abstract draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void;

  /**
   * Compute the effective size after applying margin.
   */
  measureWithMargin(): Size {
    const size = this.measure();
    const m = this._margin;
    if (m) {
      return new SizeClass(size.width + m.left + m.right, size.height + m.top + m.bottom);
    }
    return size;
  }

  /**
   * Check if a point is inside this object's area (for hit testing).
   */
  containsPoint(px: number, py: number): boolean {
    return (
      px >= this._position.x &&
      px <= this._position.x + this._actualSize.width &&
      py >= this._position.y &&
      py <= this._position.y + this._actualSize.height
    );
  }

  /** Get the bounds of this object within the panel coordinate space. */
  getBounds(): Rect {
    return {
      x: this._position.x,
      y: this._position.y,
      width: this._actualSize.width,
      height: this._actualSize.height,
    } as Rect;
  }

  /**
   * Copy the common properties from another GraphObject into this one.
   * Used by template cloning (GoJS-compatible).
   */
  protected copyFrom(source: GraphObject): void {
    this._name = source._name;
    this._desiredSize = source._desiredSize
      ? new SizeClass(source._desiredSize.width, source._desiredSize.height)
      : null;
    this._alignment = source._alignment;
    this._margin = source._margin
      ? ({
          top: source._margin.top,
          right: source._margin.right,
          bottom: source._margin.bottom,
          left: source._margin.left,
        } as Margin)
      : null;
    this._visible = source._visible;
    this._opacity = source._opacity;
    this._angle = source._angle;
    this._cursor = source._cursor;
    this._bindings = source._bindings.map((b) => b.copy());
    this.portId = source.portId;
    // Copy GoJS event handlers (set via property maps)
    this.click = source.click;
    this.doubleClick = source.doubleClick;
    this.contextClick = source.contextClick;
    this.mouseEnter = source.mouseEnter;
    this.mouseLeave = source.mouseLeave;
    this.mouseOver = source.mouseOver;
    this.mouseOut = source.mouseOut;
  }

  /**
   * Create a deep copy of this GraphObject.
   * Subclasses override to copy their specific properties.
   */
  clone(): this {
    const cloned = Object.create(Object.getPrototypeOf(this)) as this;
    cloned.copyFrom(this);
    return cloned;
  }
}
