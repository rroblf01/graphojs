import { Rect } from '../geometry/Rect.ts';
import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';
import { Layout } from './Layout.ts';

export interface LayeredDigraphLayoutOptions {
  /** Spacing between nodes. Default: 60 */
  spacing?: number;
  /** Layer spacing (vertical gap between layers). Default: 80 */
  layerSpacing?: number;
  /** Border padding. Default: 20 */
  padding?: number;
  /** Direction of the layout. Default: 'vertical' (layers top to bottom). */
  direction?: 'horizontal' | 'vertical';
  /** Whether to center the layout. Default: true */
  center?: boolean;
  /** Whether to run crossing reduction. Default: true */
  reduceCrossings?: boolean;
}

/**
 * A layered (Sugiyama-style) layout for directed graphs.
 * Assigns nodes to layers based on their longest path from the roots,
 * then orders nodes within each layer to reduce edge crossings.
 */
export class LayeredDigraphLayout extends Layout {
  private layerSpacing: number;
  private reduceCrossings: boolean;

  constructor(options: LayeredDigraphLayoutOptions = {}) {
    super({
      spacing: options.spacing ?? 60,
      padding: options.padding ?? 20,
      direction: options.direction ?? 'vertical',
      center: options.center ?? true,
    });
    this.layerSpacing = options.layerSpacing ?? 80;
    this.reduceCrossings = options.reduceCrossings ?? true;
  }

  override apply(nodes: Node[], links: Link[]): void {
    if (nodes.length === 0) return;

    // Build adjacency maps
    const nodeMap = new Map<NodeKey, Node>();
    for (const node of nodes) {
      nodeMap.set(node.key, node);
    }

    const outgoing = new Map<Node, Node[]>();
    const incoming = new Map<Node, Node[]>();
    for (const node of nodes) {
      outgoing.set(node, []);
      incoming.set(node, []);
    }
    for (const link of links) {
      const from = nodeMap.get(link.fromKey);
      const to = nodeMap.get(link.toKey);
      if (from && to) {
        outgoing.get(from)?.push(to);
        incoming.get(to)?.push(from);
      }
    }

    // Step 1: assign layers using longest-path from roots
    const roots = nodes.filter((n) => (incoming.get(n)?.length ?? 0) === 0);
    const layerOf = new Map<Node, number>();
    const active = new Set<Node>();

    const assignLayer = (node: Node, layer: number): void => {
      // Guard against cycles
      if (active.has(node)) return;
      active.add(node);

      const current = layerOf.get(node);
      if (current === undefined || layer > current) {
        layerOf.set(node, layer);
      }
      for (const child of outgoing.get(node) ?? []) {
        assignLayer(child, layer + 1);
      }

      active.delete(node);
    };

    for (const root of roots) {
      assignLayer(root, 0);
    }

    // Handle cycles/isolated nodes not visited
    for (const node of nodes) {
      if (!layerOf.has(node)) {
        assignLayer(node, 0);
      }
    }

    // Step 2: group nodes by layer
    const maxLayer = Math.max(0, ...layerOf.values());
    const layers: Node[][] = [];
    for (let i = 0; i <= maxLayer; i++) {
      layers.push([]);
    }
    for (const node of nodes) {
      const layer = layerOf.get(node) ?? 0;
      layers[layer]?.push(node);
    }

    // Step 3: reduce crossings (median heuristic + transpose, Sugiyama-style)
    if (this.reduceCrossings) {
      this.reduceCrossingsBetweenLayers(layers, incoming, outgoing);
    }

    // Step 4: assign positions
    let cursor: number;
    if (this.direction === 'horizontal') {
      cursor = this.padding;
      for (const layer of layers) {
        const layerWidth = this.getLayerWidth(layer);
        let y = this.padding;
        for (const node of layer) {
          node.bounds = new Rect(cursor, y, node.bounds.width, node.bounds.height);
          y += node.bounds.height + this.spacing;
        }
        cursor += layerWidth + this.layerSpacing;
      }
    } else {
      cursor = this.padding;
      for (const layer of layers) {
        const layerHeight = this.getLayerHeight(layer);
        let x = this.padding;
        for (const node of layer) {
          node.bounds = new Rect(x, cursor, node.bounds.width, node.bounds.height);
          x += node.bounds.width + this.spacing;
        }
        cursor += layerHeight + this.layerSpacing;
      }
    }

    // Center each layer around the main axis
    this.centerLayers(layers, this.direction === 'horizontal');

    if (this.center) {
      this.centerLayout(nodes);
    }
  }

  private getLayerWidth(layer: Node[]): number {
    return layer.reduce((max, n) => Math.max(max, n.bounds.width), 0);
  }

  private getLayerHeight(layer: Node[]): number {
    return layer.reduce((max, n) => Math.max(max, n.bounds.height), 0);
  }

  private centerLayers(layers: Node[][], horizontal: boolean): void {
    if (horizontal) {
      // Center each layer vertically
      for (const layer of layers) {
        const bounds = this.getBounds(layer);
        const maxH = this.getLayerHeight(layer);
        const centerY = (bounds.minY + bounds.maxY) / 2;
        for (const node of layer) {
          const shift = centerY - bounds.minY - maxH / 2;
          node.bounds = new Rect(
            node.bounds.x,
            node.bounds.y - shift,
            node.bounds.width,
            node.bounds.height,
          );
        }
      }
    } else {
      // Center each layer horizontally
      for (const layer of layers) {
        const bounds = this.getBounds(layer);
        const maxW = this.getLayerWidth(layer);
        const centerX = (bounds.minX + bounds.maxX) / 2;
        for (const node of layer) {
          const shift = centerX - bounds.minX - maxW / 2;
          node.bounds = new Rect(
            node.bounds.x - shift,
            node.bounds.y,
            node.bounds.width,
            node.bounds.height,
          );
        }
      }
    }
  }

  /**
   * Sugiyama-style crossing reduction: alternating down/up median-heuristic
   * sweeps (Gansner et al.'s weighted median, as used by dot/graphviz — more
   * resistant to outliers than a plain barycenter/mean), followed by a
   * transpose pass that greedily swaps adjacent nodes within a layer whenever
   * doing so lowers the actual crossing count against both neighboring
   * layers.
   */
  private reduceCrossingsBetweenLayers(
    layers: Node[][],
    incoming: Map<Node, Node[]>,
    outgoing: Map<Node, Node[]>,
  ): void {
    const sweeps = 4;
    for (let sweep = 0; sweep < sweeps; sweep++) {
      for (let i = 1; i < layers.length; i++) {
        this.reorderLayerByMedian(layers[i], layers[i - 1], incoming);
      }
      for (let i = layers.length - 2; i >= 0; i--) {
        this.reorderLayerByMedian(layers[i], layers[i + 1], outgoing);
      }
    }
    this.transpose(layers, outgoing);
  }

  /** Reorders `layer` in place by each node's median neighbor position in `adjacentLayer`. */
  private reorderLayerByMedian(
    layer: Node[] | undefined,
    adjacentLayer: Node[] | undefined,
    neighborsOf: Map<Node, Node[]>,
  ): void {
    if (!layer || !adjacentLayer || layer.length < 2) return;

    const positionInAdjacent = new Map<Node, number>();
    adjacentLayer.forEach((n, idx) => {
      positionInAdjacent.set(n, idx);
    });

    const medians = new Map<Node, number>();
    layer.forEach((node, idx) => {
      const neighborPositions = (neighborsOf.get(node) ?? [])
        .map((n) => positionInAdjacent.get(n))
        .filter((p): p is number => p !== undefined)
        .sort((a, b) => a - b);
      // A node with no neighbors in the adjacent layer keeps its current
      // index as its "median" so it stays roughly in place rather than
      // collapsing to one end of the layer.
      medians.set(node, this.weightedMedian(neighborPositions, idx));
    });

    layer.sort((a, b) => (medians.get(a) ?? 0) - (medians.get(b) ?? 0));
  }

  /** Gansner et al.'s weighted median of a sorted list of neighbor positions. */
  private weightedMedian(sortedPositions: number[], fallback: number): number {
    const n = sortedPositions.length;
    if (n === 0) return fallback;
    const mid = Math.floor((n - 1) / 2);
    if (n % 2 === 1) return sortedPositions[mid] ?? fallback;
    if (n === 2) return ((sortedPositions[0] ?? 0) + (sortedPositions[1] ?? 0)) / 2;
    const left = (sortedPositions[mid] ?? 0) - (sortedPositions[0] ?? 0);
    const right = (sortedPositions[n - 1] ?? 0) - (sortedPositions[mid + 1] ?? 0);
    if (left + right === 0)
      return ((sortedPositions[mid] ?? 0) + (sortedPositions[mid + 1] ?? 0)) / 2;
    return (
      ((sortedPositions[mid] ?? 0) * right + (sortedPositions[mid + 1] ?? 0) * left) /
      (left + right)
    );
  }

  /** Number of pairwise edge crossings between `layerA` and `layerB`, using `edgesFromA` (A-node -> its neighbors). */
  private countCrossingsBetween(
    layerA: Node[],
    layerB: Node[],
    edgesFromA: Map<Node, Node[]>,
  ): number {
    const positionInB = new Map<Node, number>();
    layerB.forEach((n, idx) => {
      positionInB.set(n, idx);
    });

    const edges: Array<[number, number]> = [];
    layerA.forEach((node, i) => {
      for (const neighbor of edgesFromA.get(node) ?? []) {
        const j = positionInB.get(neighbor);
        if (j !== undefined) edges.push([i, j]);
      }
    });

    let crossings = 0;
    for (let i = 0; i < edges.length; i++) {
      const edgeI = edges[i];
      if (!edgeI) continue;
      for (let j = i + 1; j < edges.length; j++) {
        const edgeJ = edges[j];
        if (!edgeJ) continue;
        if ((edgeI[0] - edgeJ[0]) * (edgeI[1] - edgeJ[1]) < 0) crossings++;
      }
    }
    return crossings;
  }

  /** Greedily swaps adjacent nodes within each layer whenever it lowers total crossings with both neighbors. */
  private transpose(layers: Node[][], outgoing: Map<Node, Node[]>): void {
    let improved = true;
    let guard = 0;
    while (improved && guard < 4) {
      improved = false;
      guard++;
      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if (!layer || layer.length < 2) continue;
        const prevLayer = layers[i - 1];
        const nextLayer = layers[i + 1];

        const crossingsWith = (): number =>
          (prevLayer ? this.countCrossingsBetween(prevLayer, layer, outgoing) : 0) +
          (nextLayer ? this.countCrossingsBetween(layer, nextLayer, outgoing) : 0);

        for (let k = 0; k < layer.length - 1; k++) {
          const before = crossingsWith();
          const a = layer[k];
          const b = layer[k + 1];
          if (a === undefined || b === undefined) continue;
          layer[k] = b;
          layer[k + 1] = a;
          const after = crossingsWith();
          if (after < before) {
            improved = true;
          } else {
            layer[k] = a;
            layer[k + 1] = b;
          }
        }
      }
    }
  }
}

type NodeKey = string | number;
