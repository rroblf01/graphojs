import { LayoutEdge, LayoutNetwork, LayoutVertex } from './LayoutNetwork.ts';

/**
 * GoJS-compatible: `ForceDirectedLayout`'s specialized vertex/edge/network
 * subclasses. Real, constructible classes with the documented extra
 * properties — but graphojs's `ForceDirectedLayout` (Barnes-Hut) computes
 * charge/mass/spring behavior internally rather than through these
 * subclasses, so overriding them has no effect on layout results. They
 * exist for API parity with code ported from GoJS that references these
 * types directly.
 */
export class ForceDirectedVertex extends LayoutVertex {
  isFixed = false;
  charge = 30;
  mass = 1;
  forceX = 0;
  forceY = 0;
}

export class ForceDirectedEdge extends LayoutEdge {
  stiffness = 4;
  length = 30;
}

export class ForceDirectedNetwork extends LayoutNetwork {}
