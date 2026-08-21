import { LayoutEdge, LayoutNetwork, LayoutVertex } from './LayoutNetwork.ts';

/**
 * GoJS-compatible: `CircularLayout`'s specialized vertex/edge/network
 * subclasses. These are real, constructible classes with the documented
 * extra properties, but — unlike real GoJS — graphojs's `CircularLayout`
 * doesn't build its internal working set out of these subclasses, so
 * overriding them has no effect on layout results. They exist for API
 * parity with code ported from GoJS that references these types directly.
 */
export class CircularVertex extends LayoutVertex {
  diameter = 0;
  actualAngle = 0;
}

export class CircularEdge extends LayoutEdge {}

export class CircularNetwork extends LayoutNetwork {}
