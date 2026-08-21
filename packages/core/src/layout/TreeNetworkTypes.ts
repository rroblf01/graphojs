import { Point } from '../geometry/Point.ts';
import { LayoutEdge, LayoutNetwork, LayoutVertex } from './LayoutNetwork.ts';

/**
 * GoJS-compatible: `TreeLayout`'s specialized vertex/edge/network
 * subclasses. Real, constructible classes with the documented extra
 * properties — but graphojs's `TreeLayout` computes tree structure
 * internally rather than through these subclasses, so overriding them has
 * no effect on layout results. They exist for API parity with code ported
 * from GoJS that references these types directly. Named `TreeNetworkTypes`
 * (not `TreeNetwork`) to avoid clashing with `model/TreeModel`-adjacent
 * naming elsewhere in graphojs.
 */
export class TreeVertex extends LayoutVertex {
  initialized = false;
  parent: TreeVertex | null = null;
  children: TreeVertex[] = [];
  level = 0;
}

export class TreeEdge extends LayoutEdge {
  declare fromVertex: TreeVertex;
  declare toVertex: TreeVertex | null;
  relativePoint: Point = new Point(0, 0);
}

export class TreeNetwork extends LayoutNetwork {}
