import type { Rect } from '../geometry/Rect.ts';
import type { NodeKey, NodeData } from '../model/Model.ts';
import type { Binding } from '../binding/Binding.ts';
import type { Group } from './Group.ts';
import type { Layer } from '../layer/Layer.ts';

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
  private _containingGroup: Group | null = null;
  private _bindings: Binding[] = [];
  private _layer: Layer | null = null;

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
}
