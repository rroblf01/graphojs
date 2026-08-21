import type { Size } from '../geometry/Size.ts';
import type { Spot } from '../geometry/Spot.ts';

export type PortAlignment = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'custom';

/**
 * A connection point on a Node where Links can attach.
 * Ports can be positioned by an alignment or a Spot.
 */
export class Port {
  private _name: string;
  private _alignment: PortAlignment = 'center';
  private _spot: Spot | null = null;
  private _size: Size | null = null;
  private _visible = true;

  constructor(name: string) {
    this._name = name;
  }

  /** The port name (used to reference it from link data). */
  get name(): string {
    return this._name;
  }

  /** The alignment of this port on its node. */
  get alignment(): PortAlignment {
    return this._alignment;
  }

  set alignment(value: PortAlignment) {
    this._alignment = value;
  }

  /** A custom Spot for precise positioning. Overrides alignment. */
  get spot(): Spot | null {
    return this._spot;
  }

  set spot(value: Spot | null) {
    this._spot = value;
    if (value) this._alignment = 'custom';
  }

  /** The size of this port (for rendering). */
  get size(): Size | null {
    return this._size;
  }

  set size(value: Size | null) {
    this._size = value;
  }

  /** Whether this port is visible. */
  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }

  /**
   * Compute the point of this port on a node bounds.
   */
  computePoint(x: number, y: number, width: number, height: number): { x: number; y: number } {
    if (this._spot) {
      return this._spot.computePoint(x, y, width, height);
    }

    switch (this._alignment) {
      case 'left':
        return { x, y: y + height / 2 };
      case 'right':
        return { x: x + width, y: y + height / 2 };
      case 'top':
        return { x: x + width / 2, y };
      case 'bottom':
        return { x: x + width / 2, y: y + height };
      default:
        return { x: x + width / 2, y: y + height / 2 };
    }
  }
}

/** Factory helpers for common ports. */
export const Ports = {
  /** A port on the left edge. */
  left(name = 'left'): Port {
    const p = new Port(name);
    p.alignment = 'left';
    return p;
  },

  /** A port on the right edge. */
  right(name = 'right'): Port {
    const p = new Port(name);
    p.alignment = 'right';
    return p;
  },

  /** A port on the top edge. */
  top(name = 'top'): Port {
    const p = new Port(name);
    p.alignment = 'top';
    return p;
  },

  /** A port on the bottom edge. */
  bottom(name = 'bottom'): Port {
    const p = new Port(name);
    p.alignment = 'bottom';
    return p;
  },

  /** A port at the center. */
  center(name = 'center'): Port {
    const p = new Port(name);
    p.alignment = 'center';
    return p;
  },
} as const;
