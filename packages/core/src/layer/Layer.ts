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
  private _visible = true;

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

  /** GoJS-compatible: Whether this layer is visible. */
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
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

/**
 * Built-in layer names. GoJS-compatible: `Default` is the empty string
 * (matching real GoJS — `Part.layerName = ""` means "the default layer"),
 * not the literal name "Default".
 */
export const LayerNames = {
  Grid: 'Grid',
  ViewportBackground: 'ViewportBackground',
  Background: 'Background',
  Default: '',
  Foreground: 'Foreground',
  ViewportForeground: 'ViewportForeground',
  Adornment: 'Adornment',
  Tool: 'Tool',
} as const;

/** Default layer z-orders. */
export const LayerDefaults = {
  Grid: -100,
  ViewportBackground: -30,
  Background: -10,
  Default: 0,
  Foreground: 10,
  ViewportForeground: 30,
  Adornment: 50,
  Tool: 100,
} as const;

/**
 * Create the standard set of layers, in the same relative stacking order
 * real GoJS uses. Only `Grid`/`Background`/`Default`/`Foreground` are
 * currently drawn into by the renderer; `ViewportBackground`/
 * `ViewportForeground`/`Adornment`/`Tool` exist so `diagram.findLayer(...)`/
 * `part.layerName = ...` round-trip the same names as real GoJS, even
 * though adornments and tool handles aren't yet routed through them (they
 * render as a separate overlay pass today).
 */
export function createDefaultLayers(): Layer[] {
  return [
    new Layer(LayerNames.Grid, LayerDefaults.Grid),
    new Layer(LayerNames.ViewportBackground, LayerDefaults.ViewportBackground),
    new Layer(LayerNames.Background, LayerDefaults.Background),
    new Layer(LayerNames.Default, LayerDefaults.Default),
    new Layer(LayerNames.Foreground, LayerDefaults.Foreground),
    new Layer(LayerNames.ViewportForeground, LayerDefaults.ViewportForeground),
    new Layer(LayerNames.Adornment, LayerDefaults.Adornment),
    new Layer(LayerNames.Tool, LayerDefaults.Tool),
  ];
}
