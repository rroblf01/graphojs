import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import type { Part } from '../parts/Part.ts';
import { LayoutNetwork } from './LayoutNetwork.ts';
/**
 * Options for layout configuration.
 */
export interface LayoutOptions {
  /** Spacing between nodes. Default: 50 */
  spacing?: number;
  /** Border padding. Default: 20 */
  padding?: number;
  /** Whether to arrange in a specific direction. Default: 'vertical' */
  direction?: 'horizontal' | 'vertical';
  /** Whether to center the layout. Default: true */
  center?: boolean;
}

/**
 * Abstract base class for diagram layouts.
 */
export abstract class Layout {
  protected spacing: number;
  protected padding: number;
  protected direction: 'horizontal' | 'vertical';
  protected center: boolean;

  constructor(options: LayoutOptions = {}) {
    this.spacing = options.spacing ?? 50;
    this.padding = options.padding ?? 20;
    this.direction = options.direction ?? 'vertical';
    this.center = options.center ?? true;
  }

  /**
   * Apply the layout to the given nodes and links.
   */
  abstract apply(nodes: Node[], links: Link[]): void;

  /**
   * Get the bounding box of all nodes after layout.
   */
  protected getBounds(nodes: Node[]): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } {
    if (nodes.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const node of nodes) {
      minX = Math.min(minX, node.bounds.x);
      minY = Math.min(minY, node.bounds.y);
      maxX = Math.max(maxX, node.bounds.right);
      maxY = Math.max(maxY, node.bounds.bottom);
    }

    return { minX, minY, maxX, maxY };
  }

  /**
   * Center the layout around the origin.
   */
  protected centerLayout(nodes: Node[]): void {
    if (nodes.length === 0) return;

    const bounds = this.getBounds(nodes);
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;

    for (const node of nodes) {
      node.bounds = node.bounds.offset(-centerX, -centerY);
    }
  }

  /**
   * Sort nodes topologically (for tree layouts).
   */
  protected topologicalSort(nodes: Node[], links: Link[]): Node[] {
    const nodeMap = new Map(nodes.map((n) => [n.key, n]));
    const inDegree = new Map<Node, number>();
    const adjacency = new Map<Node, Node[]>();

    // Initialize
    for (const node of nodes) {
      inDegree.set(node, 0);
      adjacency.set(node, []);
    }

    // Build graph
    for (const link of links) {
      const fromNode = nodeMap.get(link.fromKey);
      const toNode = nodeMap.get(link.toKey);
      if (fromNode && toNode) {
        adjacency.get(fromNode)?.push(toNode);
        inDegree.set(toNode, (inDegree.get(toNode) ?? 0) + 1);
      }
    }

    // Kahn's algorithm
    const queue: Node[] = [];
    for (const [node, degree] of inDegree) {
      if (degree === 0) {
        queue.push(node);
      }
    }

    const result: Node[] = [];
    while (queue.length > 0) {
      const node = queue.shift();
      if (!node) break;
      result.push(node);

      for (const neighbor of adjacency.get(node) ?? []) {
        const newDegree = (inDegree.get(neighbor) ?? 1) - 1;
        inDegree.set(neighbor, newDegree);
        if (newDegree === 0) {
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  /**
   * Find root nodes (nodes with no incoming links).
   */
  protected findRoots(nodes: Node[], links: Link[]): Node[] {
    const targets = new Set(links.map((l) => l.toKey));
    return nodes.filter((n) => !targets.has(n.key));
  }

  /**
   * Get children of a node.
   */
  protected getChildren(
    nodeKey: string | number,
    links: Link[],
    nodeMap: Map<string | number, Node>,
  ): Node[] {
    return links
      .filter((l) => l.fromKey === nodeKey)
      .map((l) => nodeMap.get(l.toKey))
      .filter((n): n is Node => n !== undefined);
  }

  /**
   * GoJS-compatible: The layout network for the current parts.
   * Built lazily via makeNetwork(nodes, links).
   */
  protected _network: LayoutNetwork | null = null;

  /** GoJS-compatible: Build a LayoutNetwork from nodes and links. */
  protected makeNetwork(nodes: Node[], links: Link[]): LayoutNetwork {
    this._network = LayoutNetwork.fromParts(nodes, links);
    return this._network;
  }

  /** GoJS-compatible: Perform the layout on a collection of parts (or this diagram's parts). */
  doLayout(collection?: { nodes?: readonly Node[]; links?: readonly Link[] }): void {
    const nodes = (collection?.nodes ?? this.diagramParts()) as Node[];
    const links = (collection?.links ?? this.diagramLinks()) as Link[];
    this.apply(nodes, links);
  }

  /** GoJS-compatible: Perform the layout on the given parts. */
  layoutParts(parts: readonly Part[]): void {
    const nodes = parts.filter((p): p is Node => p instanceof Node) as Node[];
    const links = parts.filter((p): p is Link => p instanceof Link) as Link[];
    this.apply(nodes, links);
  }

  /** The nodes this layout applies to when no collection is given. */
  private diagramParts(): Node[] {
    const diagram = (this as unknown as { diagram?: { allNodes?: () => Node[] } }).diagram;
    if (diagram && typeof diagram.allNodes === 'function') return diagram.allNodes();
    return [];
  }

  /** The links this layout applies to when no collection is given. */
  private diagramLinks(): Link[] {
    const diagram = (this as unknown as { diagram?: { allLinks?: () => Link[] } }).diagram;
    if (diagram && typeof diagram.allLinks === 'function') return diagram.allLinks();
    return [];
  }

  /** GoJS-compatible: The current layout network (or null). */
  get network(): LayoutNetwork | null {
    return this._network;
  }

  set network(value: LayoutNetwork | null) {
    this._network = value;
  }

  /**
   * GoJS-compatible: Commit vertex positions back to their nodes.
   */
  protected commitLayers(): void {
    if (!this._network) return;
    for (const vertex of this._network.vertices) {
      if (vertex.node) {
        vertex.node.bounds = vertex.bounds.clone();
      }
    }
  }

  private _isInitial = true;
  private _isFinal = true;
  private _isOngoing = true;

  /** GoJS-compatible: Whether this is the initial layout of the diagram. */
  get isInitial(): boolean {
    return this._isInitial;
  }

  set isInitial(value: boolean) {
    this._isInitial = value;
  }

  /** GoJS-compatible: Whether this is the final layout of a cycle. */
  get isFinal(): boolean {
    return this._isFinal;
  }

  set isFinal(value: boolean) {
    this._isFinal = value;
  }

  /** GoJS-compatible: Whether the layout is ongoing (auto-layout is active). */
  get isOngoing(): boolean {
    return this._isOngoing;
  }

  set isOngoing(value: boolean) {
    this._isOngoing = value;
  }
}
