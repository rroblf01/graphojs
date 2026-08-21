import { Rect } from '../geometry/Rect.ts';
import type { Size } from '../geometry/Size.ts';

/**
 * GoJS-compatible: a sparse occupancy grid used by layouts (originally for
 * `AvoidsLinksRouter`-style obstacle avoidance) to track which rectangular
 * cells are occupied. A standalone, real implementation — not yet consumed
 * by any of graphojs's own layouts, which compute obstacle avoidance
 * differently (see `render/LinkRouter.ts`'s `routeOrthogonalAvoidingObstacles`).
 */
export class PositionArray {
  private cellWidth_: number;
  private cellHeight_: number;
  private occupied = new globalThis.Set<string>();
  private minCol = Number.POSITIVE_INFINITY;
  private maxCol = Number.NEGATIVE_INFINITY;
  private minRow = Number.POSITIVE_INFINITY;
  private maxRow = Number.NEGATIVE_INFINITY;

  constructor(cellsize: Size) {
    this.cellWidth_ = cellsize.width;
    this.cellHeight_ = cellsize.height;
  }

  get bounds(): Rect {
    if (this.occupied.size === 0) return new Rect(0, 0, 0, 0);
    return new Rect(
      this.minCol * this.cellWidth_,
      this.minRow * this.cellHeight_,
      (this.maxCol - this.minCol + 1) * this.cellWidth_,
      (this.maxRow - this.minRow + 1) * this.cellHeight_,
    );
  }

  get cellWidth(): number {
    return this.cellWidth_;
  }

  set cellWidth(value: number) {
    this.cellWidth_ = value;
  }

  get cellHeight(): number {
    return this.cellHeight_;
  }

  set cellHeight(value: number) {
    this.cellHeight_ = value;
  }

  /** Mark the cells covered by the given document-coordinate rect as occupied. */
  occupy(x: number, y: number, w: number, h: number): void {
    const [c0, c1, r0, r1] = this.cellRange(x, y, w, h);
    for (let c = c0; c <= c1; c++) {
      for (let r = r0; r <= r1; r++) {
        this.occupied.add(`${c},${r}`);
        this.minCol = Math.min(this.minCol, c);
        this.maxCol = Math.max(this.maxCol, c);
        this.minRow = Math.min(this.minRow, r);
        this.maxRow = Math.max(this.maxRow, r);
      }
    }
  }

  /** Whether every cell covered by the given rect is unoccupied. */
  isUnoccupied(x: number, y: number, w: number, h: number): boolean {
    const [c0, c1, r0, r1] = this.cellRange(x, y, w, h);
    for (let c = c0; c <= c1; c++) {
      for (let r = r0; r <= r1; r++) {
        if (this.occupied.has(`${c},${r}`)) return false;
      }
    }
    return true;
  }

  /** The widest unoccupied horizontal run available at row `y` (height `h`) between `minx`/`maxx`. */
  maxAvoidsLinksSpaceH(minx: number, maxx: number, y: number, h: number): number {
    const [, , r0, r1] = this.cellRange(minx, y, maxx - minx, h);
    const c0 = Math.floor(minx / this.cellWidth_);
    const c1 = Math.ceil(maxx / this.cellWidth_) - 1;
    let best = 0;
    let run = 0;
    for (let c = c0; c <= c1; c++) {
      let blocked = false;
      for (let r = r0; r <= r1; r++) {
        if (this.occupied.has(`${c},${r}`)) {
          blocked = true;
          break;
        }
      }
      if (blocked) {
        best = Math.max(best, run);
        run = 0;
      } else {
        run++;
      }
    }
    return Math.max(best, run) * this.cellWidth_;
  }

  /** The tallest unoccupied vertical run available at column `x` (width `w`) between `miny`/`maxy`. */
  maxAvoidsLinksSpaceV(miny: number, maxy: number, x: number, w: number): number {
    const [c0, c1] = this.cellRange(x, miny, w, maxy - miny);
    const r0 = Math.floor(miny / this.cellHeight_);
    const r1 = Math.ceil(maxy / this.cellHeight_) - 1;
    let best = 0;
    let run = 0;
    for (let r = r0; r <= r1; r++) {
      let blocked = false;
      for (let c = c0; c <= c1; c++) {
        if (this.occupied.has(`${c},${r}`)) {
          blocked = true;
          break;
        }
      }
      if (blocked) {
        best = Math.max(best, run);
        run = 0;
      } else {
        run++;
      }
    }
    return Math.max(best, run) * this.cellHeight_;
  }

  private cellRange(x: number, y: number, w: number, h: number): [number, number, number, number] {
    const c0 = Math.floor(x / this.cellWidth_);
    const c1 = Math.ceil((x + w) / this.cellWidth_) - 1;
    const r0 = Math.floor(y / this.cellHeight_);
    const r1 = Math.ceil((y + h) / this.cellHeight_) - 1;
    return [c0, c1, r0, r1];
  }
}
