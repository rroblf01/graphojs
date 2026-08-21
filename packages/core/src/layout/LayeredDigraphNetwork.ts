import { LayoutEdge, LayoutNetwork, LayoutVertex } from './LayoutNetwork.ts';

/**
 * GoJS-compatible: `LayeredDigraphLayout`'s specialized vertex/edge/network
 * subclasses. Real, constructible classes with the documented extra
 * properties — but graphojs's `LayeredDigraphLayout` computes layering
 * internally rather than through these subclasses, so overriding them has
 * no effect on layout results. They exist for API parity with code ported
 * from GoJS that references these types directly.
 */
export class LayeredDigraphVertex extends LayoutVertex {
  layer = 0;
  column = 0;
  layerVertexIndex = 0;
  component = 0;
  near: LayeredDigraphVertex | null = null;
  centered = false;
}

export class LayeredDigraphEdge extends LayoutEdge {
  declare fromVertex: LayeredDigraphVertex | null;
  declare toVertex: LayeredDigraphVertex | null;
  valid = true;
  rev = false;
  forest = false;
  portFromPos = Number.NaN;
}

export class LayeredDigraphNetwork extends LayoutNetwork {}
