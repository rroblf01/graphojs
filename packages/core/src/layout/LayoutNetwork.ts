import type { Rect } from '../geometry/Rect.ts';
import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';

/**
 * A vertex in a layout network, representing a node.
 * GoJS-compatible structure.
 */
export class LayoutVertex {
  node: Node | null;
  bounds: Rect;
  edges: LayoutEdge[] = [];
  destinationEdges: LayoutEdge[] = [];
  sourceEdges: LayoutEdge[] = [];
  index = -1;

  constructor(node?: Node | null) {
    this.node = node ?? null;
    this.bounds = node
      ? (node.bounds.clone() as Rect)
      : ({ x: 0, y: 0, width: 0, height: 0 } as Rect);
  }

  /** Whether this vertex has any edges. */
  get degree(): number {
    return this.edges.length;
  }

  /** The edges coming INTO this vertex. */
  get inDegree(): number {
    return this.destinationEdges.length;
  }

  /** The edges going OUT of this vertex. */
  get outDegree(): number {
    return this.sourceEdges.length;
  }

  /** Whether this vertex has no incoming edges (a root). */
  get isRoot(): boolean {
    return this.destinationEdges.length === 0;
  }

  /** Whether this vertex has no outgoing edges (a leaf). */
  get isLeaf(): boolean {
    return this.sourceEdges.length === 0;
  }

  /** Center point of the vertex bounds. */
  get centerX(): number {
    return this.bounds.x + this.bounds.width / 2;
  }

  get centerY(): number {
    return this.bounds.y + this.bounds.height / 2;
  }
}

/**
 * An edge in a layout network, representing a link.
 * GoJS-compatible structure.
 */
export class LayoutEdge {
  link: Link | null;
  fromVertex: LayoutVertex | null = null;
  toVertex: LayoutVertex | null = null;
  isOrthogonal = false;
  isTreeEdge = false;

  constructor(link?: Link | null) {
    this.link = link ?? null;
  }

  /** The other vertex, given one endpoint. */
  getOtherVertex(vertex: LayoutVertex): LayoutVertex | null {
    if (this.fromVertex === vertex) return this.toVertex;
    if (this.toVertex === vertex) return this.fromVertex;
    return null;
  }
}

/**
 * A network of layout vertices and edges built from the diagram's
 * nodes and links. GoJS-compatible.
 */
export class LayoutNetwork {
  vertices: LayoutVertex[] = [];
  edges: LayoutEdge[] = [];

  /** Find a vertex by its node key. */
  findVertex(key: unknown): LayoutVertex | null {
    return this.vertices.find((v) => v.node && v.node.key === key) ?? null;
  }

  /** Add a vertex for a node. */
  addNode(node: Node): LayoutVertex {
    const vertex = new LayoutVertex(node);
    this.addVertex(vertex);
    return vertex;
  }

  /** Add a vertex. */
  addVertex(vertex: LayoutVertex): void {
    if (!this.vertices.includes(vertex)) {
      vertex.index = this.vertices.length;
      this.vertices.push(vertex);
    }
  }

  /** Add an edge for a link, connecting the vertices of its endpoints. */
  addLink(link: Link, vertexForNode?: (key: unknown) => LayoutVertex | null): LayoutEdge {
    const edge = new LayoutEdge(link);
    this.addEdge(edge, vertexForNode);
    return edge;
  }

  /** Add an edge, connecting the vertices of its link's endpoints. */
  addEdge(edge: LayoutEdge, vertexForNode?: (key: unknown) => LayoutVertex | null): void {
    const link = edge.link;
    if (link && link.fromKey !== undefined && link.toKey !== undefined) {
      const from = vertexForNode ? vertexForNode(link.fromKey) : this.findVertex(link.fromKey);
      const to = vertexForNode ? vertexForNode(link.toKey) : this.findVertex(link.toKey);
      edge.fromVertex = from ?? edge.fromVertex;
      edge.toVertex = to ?? edge.toVertex;
    }
    if (!this.edges.includes(edge)) {
      this.edges.push(edge);
    }
    if (edge.fromVertex) {
      edge.fromVertex.edges.push(edge);
      edge.fromVertex.sourceEdges.push(edge);
    }
    if (edge.toVertex) {
      edge.toVertex.edges.push(edge);
      edge.toVertex.destinationEdges.push(edge);
    }
  }

  /** Remove a vertex and its connected edges. */
  deleteVertex(vertex: LayoutVertex): void {
    for (const edge of [...vertex.edges]) {
      this.deleteEdge(edge);
    }
    const index = this.vertices.indexOf(vertex);
    if (index !== -1) this.vertices.splice(index, 1);
  }

  /** Remove an edge and disconnect it from its vertices. */
  deleteEdge(edge: LayoutEdge): void {
    const removeFrom = (v: LayoutVertex | null, list: keyof LayoutVertex) => {
      if (!v) return;
      const arr = v[list] as LayoutEdge[];
      const i = arr.indexOf(edge);
      if (i !== -1) arr.splice(i, 1);
    };
    removeFrom(edge.fromVertex, 'edges');
    removeFrom(edge.fromVertex, 'sourceEdges');
    removeFrom(edge.toVertex, 'edges');
    removeFrom(edge.toVertex, 'destinationEdges');
    const index = this.edges.indexOf(edge);
    if (index !== -1) this.edges.splice(index, 1);
  }

  /** Remove all vertices and edges. */
  clear(): void {
    this.vertices = [];
    this.edges = [];
  }

  /** Build a network from the given nodes and links. */
  static fromParts(nodes: Node[], links: Link[]): LayoutNetwork {
    const network = new LayoutNetwork();
    for (const node of nodes) {
      network.addNode(node);
    }
    for (const link of links) {
      network.addLink(link);
    }
    return network;
  }
}
