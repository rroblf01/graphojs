import type { Size } from '../geometry/Size.ts';
import { Size as SizeClass } from '../geometry/Size.ts';
import { Group } from '../parts/Group.ts';
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
    const owner = this.part;
    if (owner instanceof Group) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const member of owner.memberParts) {
        if (!member.visible) continue;
        minX = Math.min(minX, member.bounds.x);
        minY = Math.min(minY, member.bounds.y);
        maxX = Math.max(maxX, member.bounds.right);
        maxY = Math.max(maxY, member.bounds.bottom);
      }
      if (minX < maxX && minY < maxY) {
        return new SizeClass(maxX - minX + this._padding * 2, maxY - minY + this._padding * 2);
      }
    }
    return new SizeClass(this._padding * 2, this._padding * 2);
  }

  override draw(): void {
    // Placeholder is invisible; the group's member bounds define its size
  }
}
