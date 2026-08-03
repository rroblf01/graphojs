import type { Node } from '../parts/Node.ts';
import type { Link } from '../parts/Link.ts';
import { Rect } from '../geometry/Rect.ts';
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

    // Step 3: reduce crossings (barycenter heuristic)
    if (this.reduceCrossings) {
      this.reduceCrossingsBetweenLayers(layers, incoming);
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

  private reduceCrossingsBetweenLayers(layers: Node[][], incoming: Map<Node, Node[]>): void {
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = layers[i];
      const nextLayer = layers[i + 1];
      if (!currentLayer || !nextLayer) continue;

      // Compute barycenter for each node in the next layer
      const barycenters = new Map<Node, number>();
      for (const node of nextLayer) {
        const parents = incoming.get(node) ?? [];
        if (parents.length === 0) {
          barycenters.set(node, -1);
        } else {
          let sum = 0;
          for (const parent of parents) {
            const idx = currentLayer.indexOf(parent);
            sum += idx === -1 ? currentLayer.length : idx;
          }
          barycenters.set(node, sum / parents.length);
        }
      }

      // Sort the next layer by barycenter
      nextLayer.sort((a, b) => (barycenters.get(a) ?? -1) - (barycenters.get(b) ?? -1));
    }
  }
}

type NodeKey = string | number;
