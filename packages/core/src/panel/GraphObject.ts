import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import type { Margin } from '../geometry/Margin.ts';
import type { Spot } from '../geometry/Spot.ts';
import type { Rect } from '../geometry/Rect.ts';

/**
 * Base class for all visual elements that can appear in a Panel.
 * GraphObjects are laid out by their containing Panel.
 */
export abstract class GraphObject {
  private _name: string = '';
  private _desiredSize: Size | null = null;
  private _actualSize: Size = new SizeClass(0, 0);
  private _position = { x: 0, y: 0 };
  private _alignment: Spot | null = null;
  private _margin: Margin | null = null;
  private _visible = true;
  private _opacity = 1;
  private _angle = 0;

  /** The name of this graph object, used for findObject() lookups. */
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  /**
   * GoJS-compatible static factory method.
   *
   * Usage:
   *   const $ = go.GraphObject.make;
   *   const shape = $(go.Shape, "RoundedRectangle", { fill: "white", stroke: "gray" });
   *   const panel = $(go.Panel, "Auto", shape, $(go.TextBlock, "Hello"));
   */
  static make<T extends GraphObject>(ctor: new (...args: unknown[]) => T, ...args: unknown[]): T {
    const obj = new ctor();

    for (const arg of args) {
      if (arg === null || arg === undefined) continue;

      if (arg instanceof GraphObject) {
        // Child element: add to panel if applicable
        if ('add' in obj && typeof (obj as Record<string, unknown>).add === 'function') {
          (obj as { add(child: GraphObject): unknown }).add(arg);
        }
      } else if (typeof arg === 'string') {
        // First string arg for Shape = shape type, for Panel = panel type, for TextBlock = text
        if ('shape' in obj && obj.constructor.name === 'Shape') {
          (obj as { shape: unknown }).shape = arg;
        } else if ('type' in obj && obj.constructor.name === 'Panel') {
          (obj as { type: unknown }).type = arg;
        } else if ('text' in obj && obj.constructor.name === 'TextBlock') {
          (obj as { text: unknown }).text = arg;
        }
      } else if (typeof arg === 'object') {
        // Property map
        const props = arg as Record<string, unknown>;
        for (const [key, value] of Object.entries(props)) {
          (obj as Record<string, unknown>)[key] = value;
        }
      }
    }

    return obj;
  }

  /** Whether this object is visible. */
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
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
}
