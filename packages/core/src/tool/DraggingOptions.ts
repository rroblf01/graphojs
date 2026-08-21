import { Point } from '../geometry/Point.ts';
import { Size } from '../geometry/Size.ts';
import { Spot } from '../geometry/Spot.ts';

/** GoJS-compatible: the initial drag point for a moved/copied part. */
export class DraggingInfo {
  private _point: Point;

  constructor(pt?: Point) {
    this._point = pt ?? new Point(0, 0);
  }

  get point(): Point {
    return this._point;
  }

  set point(value: Point) {
    this._point = value;
  }
}

/**
 * GoJS-compatible: options for dragging/moving parts, used by
 * `Diagram.moveParts`/`computeMove` and `DraggingTool.computeMove`.
 * graphojs's `DraggingTool` currently reads its own individual
 * `isGridSnapEnabled`-style properties directly rather than through a
 * `DraggingOptions` instance — this class exists for API parity and for
 * code that constructs one directly, but isn't yet consulted internally.
 */
export class DraggingOptions {
  isGridSnapEnabled = false;
  isGridSnapRealtime = true;
  gridSnapCellSize: Size = new Size(Number.NaN, Number.NaN);
  gridSnapCellSpot: Spot = Spot.TopLeft;
  gridSnapOrigin: Point = new Point(Number.NaN, Number.NaN);
  dragsLink = false;
  dragsTree = false;
  groupsSnapMembers = false;
  groupsAlwaysMove = true;
  dragsMembers = true;

  constructor(init?: Partial<DraggingOptions>) {
    if (init) Object.assign(this, init);
  }
}
