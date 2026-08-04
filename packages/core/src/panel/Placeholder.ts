import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import { GraphObject } from './GraphObject.ts';

/**
 * GoJS-compatible Placeholder.
 * A special GraphObject used inside group templates that automatically sizes
 * itself to the group's member bounds (plus padding). It renders nothing.
 */
export class Placeholder extends GraphObject {
  private _padding = 10;

  /** Extra space around the members' bounds. */
  get padding(): number {
    return this._padding;
  }

  set padding(value: number) {
    this._padding = value;
  }

  override measure(): Size {
    return new SizeClass(100, 60);
  }

  override draw(): void {
    // Placeholder is invisible; the group's member bounds define its size
  }
}
