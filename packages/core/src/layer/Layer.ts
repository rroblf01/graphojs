import type { Part } from '../parts/Part.ts';

/**
 * A layer controls the z-ordering of parts in a diagram.
 * Parts in lower z-order layers are rendered first (behind).
 */
export class Layer {
  private _name: string;
  private _zOrder: number;
  private _parts: Part[] = [];
  private _isTemporary = false;
  private _opacity = 1;

  constructor(name: string, zOrder: number) {
    this._name = name;
    this._zOrder = zOrder;
  }

  /** The layer name. */
  get name(): string {
    return this._name;
  }

  /** The z-order of this layer (lower values rendered first). */
  get zOrder(): number {
    return this._zOrder;
  }

  /** Set the z-order. */
  set zOrder(value: number) {
    this._zOrder = value;
  }

  /** Whether this is a temporary layer (for dragging, etc.). */
  get isTemporary(): boolean {
    return this._isTemporary;
  }

  /** Set whether this is a temporary layer. */
  set isTemporary(value: boolean) {
    this._isTemporary = value;
  }

  /** The opacity of this layer (0-1). */
  get opacity(): number {
    return this._opacity;
  }

  /** Set the opacity. */
  set opacity(value: number) {
    this._opacity = Math.max(0, Math.min(1, value));
  }

  /** Get all parts in this layer. */
  get parts(): readonly Part[] {
    return this._parts;
  }

  /** Get the number of parts in this layer. */
  get partCount(): number {
    return this._parts.length;
  }

  /** Add a part to this layer. */
  add(part: Part): void {
    if (this._parts.includes(part)) return;
    this._parts.push(part);
  }

  /** Remove a part from this layer. */
  remove(part: Part): boolean {
    const index = this._parts.indexOf(part);
    if (index === -1) return false;
    this._parts.splice(index, 1);
    return true;
  }

  /** Check if a part is in this layer. */
  contains(part: Part): boolean {
    return this._parts.includes(part);
  }

  /** Get all visible parts in this layer. */
  getVisibleParts(): Part[] {
    return this._parts.filter((p) => p.visible);
  }

  /** Remove all parts from this layer. */
  clear(): void {
    this._parts.length = 0;
  }
}

/** Built-in layer names. */
export const LayerNames = {
  Grid: 'Grid',
  Background: 'Background',
  Default: 'Default',
  Foreground: 'Foreground',
} as const;

/** Default layer z-orders. */
export const LayerDefaults = {
  Grid: -100,
  Background: -10,
  Default: 0,
  Foreground: 10,
} as const;

/** Create a default set of layers. */
export function createDefaultLayers(): Layer[] {
  return [
    new Layer(LayerNames.Grid, LayerDefaults.Grid),
    new Layer(LayerNames.Background, LayerDefaults.Background),
    new Layer(LayerNames.Default, LayerDefaults.Default),
    new Layer(LayerNames.Foreground, LayerDefaults.Foreground),
  ];
}
