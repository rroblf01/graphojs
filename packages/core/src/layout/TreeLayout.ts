import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';
import { Layout, type LayoutOptions } from './Layout.ts';

/**
 * Options for tree layout.
 */
export interface TreeLayoutOptions extends LayoutOptions {
  /** Angle in degrees for the tree's growth direction (0=down, 90=right, 180=up, 270=left) in the
   *  non-radial layout, or the start angle in the radial layout. Default: 0 */
  angle?: number;
  /** Whether to use radial layout. Default: false */
  radial?: boolean;
  /** Angle increment for radial layout. Default: 45 */
  angleIncrement?: number;
  /** Node separation in the non-primary direction. Default: 30 */
  nodeSpacing?: number;
}

/**
 * Tree layout arranges nodes in a hierarchical tree structure.
 */
export class TreeLayout extends Layout {
  private _angle: number;
  private radial: boolean;
  private angleIncrement: number;
  private nodeSpacing: number;

  constructor(options: TreeLayoutOptions = {}) {
    super(options);
    this._angle = options.angle ?? 0;
    this.radial = options.radial ?? false;
    this.angleIncrement = options.angleIncrement ?? 45;
    this.nodeSpacing = options.nodeSpacing ?? 30;
  }

  /** GoJS-compatible: The angle of the layout direction in degrees. */
  get angle(): number {
    return this._angle;
  }

  set angle(value: number) {
    this._angle = value;
  }

  /** GoJS-compatible: Set how child links are drawn ("orthogonal", "curved", "arc"). */
  setChildLinkStyle(_style: string): void {
    // Accepted for GoJS API compatibility; rendering style is stored by Link.
  }

  override apply(nodes: Node[], links: Link[]): void {
    if (nodes.length === 0) return;

    const nodeMap = new Map(nodes.map((n) => [n.key, n]));
    let roots = this.findRoots(nodes, links);

    if (roots.length === 0) {
      // No roots found, treat first node as root
      const firstNode = nodes[0];
      if (firstNode) {
        roots = [firstNode];
      }
    }

    if (this.radial) {
      const firstRoot = roots[0];
      if (firstRoot) {
        const tree = this.buildTree(firstRoot.key, links, nodeMap, new Set());
        this.calculateSubtreeSizes(tree);
        this.positionRadial(tree, 0, 0, this.angle, 360);
      }
    } else {
      // Lay out every root's tree (a forest) side by side along the cross axis,
      // instead of only the first root.
      let crossOffset = 0;
      for (const root of roots) {
        const tree = this.buildTree(root.key, links, nodeMap, new Set());
        this.calculateSubtreeSizes(tree);
        this.positionTree(tree, crossOffset + tree.crossExtent / 2, 0);
        crossOffset += tree.crossExtent + this.nodeSpacing;
      }
    }

    // Center the layout
    if (this.center) {
      this.centerLayout(nodes);
    }
  }

  /** Whether the configured angle grows the tree horizontally (90/270) rather than vertically. */
  private isHorizontal(): boolean {
    const normalized = ((this._angle % 360) + 360) % 360;
    return normalized === 90 || normalized === 270;
  }

  /** A node's extent along the sibling-spread (cross) axis. */
  private crossSize(node: Node): number {
    return this.isHorizontal() ? node.bounds.height : node.bounds.width;
  }

  /** A node's extent along the depth (main/growth) axis. */
  private mainSize(node: Node): number {
    return this.isHorizontal() ? node.bounds.width : node.bounds.height;
  }

  private buildTree(
    rootKey: string | number,
    links: Link[],
    nodeMap: Map<string | number, Node>,
    visited: Set<string | number>,
  ): TreeNode {
    const node = nodeMap.get(rootKey);
    if (!node) {
      return { node: null as unknown as Node, children: [], crossExtent: 0, mainExtent: 0 };
    }
    // Cycle guard: if this key is already an ancestor in the current
    // recursion, stop descending instead of recursing forever.
    if (visited.has(rootKey)) {
      return { node, children: [], crossExtent: 0, mainExtent: 0 };
    }
    visited.add(rootKey);

    const childNodes = this.getChildren(rootKey, links, nodeMap);
    const children = childNodes.map((child) =>
      this.buildTree(child.key, links, nodeMap, visited),
    );

    return { node, children, crossExtent: 0, mainExtent: 0 };
  }

  private calculateSubtreeSizes(tree: TreeNode): void {
    if (!tree.node) {
      tree.crossExtent = 0;
      tree.mainExtent = 0;
      return;
    }

    const ownCross = this.crossSize(tree.node);

    if (tree.children.length === 0) {
      tree.crossExtent = ownCross;
      tree.mainExtent = this.mainSize(tree.node);
      return;
    }

    let childrenCross = 0;
    let maxChildMain = 0;
    for (const child of tree.children) {
      this.calculateSubtreeSizes(child);
      childrenCross += child.crossExtent;
      maxChildMain = Math.max(maxChildMain, child.mainExtent);
    }
    childrenCross += this.nodeSpacing * (tree.children.length - 1);

    // A subtree must be at least as wide (cross-axis) as its own node, so a
    // large parent with narrow children doesn't overlap its neighbors.
    tree.crossExtent = Math.max(ownCross, childrenCross);
    tree.mainExtent = this.mainSize(tree.node) + this.spacing + maxChildMain;
  }

  private positionTree(tree: TreeNode, crossCenter: number, mainPos: number): void {
    if (!tree.node) return;

    this.placeNode(tree.node, crossCenter, mainPos);

    if (tree.children.length === 0) return;

    const nextMain = mainPos + this.mainSize(tree.node) + this.spacing;
    let cursor = crossCenter - tree.crossExtent / 2;
    for (const child of tree.children) {
      cursor += child.crossExtent / 2;
      this.positionTree(child, cursor, nextMain);
      cursor += child.crossExtent / 2 + this.nodeSpacing;
    }
  }

  /**
   * Move a node so its center sits at crossCenter along the sibling-spread
   * axis and its leading edge sits at mainPos along the growth axis, mapping
   * the logical (cross, main) position to real (x, y) according to `angle`:
   * 0 grows downward, 90 rightward, 180 upward, 270 leftward.
   */
  private placeNode(node: Node, crossCenter: number, mainPos: number): void {
    const w = node.bounds.width;
    const h = node.bounds.height;
    const angle = ((this._angle % 360) + 360) % 360;
    let x: number;
    let y: number;
    switch (angle) {
      case 90:
        x = mainPos;
        y = crossCenter - h / 2;
        break;
      case 180:
        x = crossCenter - w / 2;
        y = -mainPos - h;
        break;
      case 270:
        x = -mainPos - w;
        y = crossCenter - h / 2;
        break;
      default:
        x = crossCenter - w / 2;
        y = mainPos;
        break;
    }
    const dx = x - node.bounds.x;
    const dy = y - node.bounds.y;
    node.bounds = node.bounds.offset(dx, dy);
  }

  private positionRadial(
    tree: TreeNode,
    cx: number,
    cy: number,
    startAngle: number,
    sweepAngle: number,
  ): void {
    if (!tree.node) return;

    // Position this node at center
    if (cx !== 0 || cy !== 0) {
      const nodeWidth = tree.node.bounds.width;
      const nodeHeight = tree.node.bounds.height;
      const dx = cx - nodeWidth / 2 - tree.node.bounds.x;
      const dy = cy - nodeHeight / 2 - tree.node.bounds.y;
      tree.node.bounds = tree.node.bounds.offset(dx, dy);
    }

    if (tree.children.length === 0) return;

    // Calculate angles for children
    const anglePerChild = sweepAngle / tree.children.length;
    let currentAngle = startAngle;

    for (const child of tree.children) {
      const radius = this.spacing + (child.crossExtent / 2) * (Math.PI / 180) * this.spacing;
      const angle = (currentAngle * Math.PI) / 180;
      const childCx = cx + Math.cos(angle) * radius;
      const childCy = cy + Math.sin(angle) * radius;

      this.positionRadial(child, childCx, childCy, currentAngle, anglePerChild);
      currentAngle += anglePerChild;
    }
  }
}

interface TreeNode {
  node: Node;
  children: TreeNode[];
  /** Extent along the sibling-spread axis (width for vertical growth, height for horizontal). */
  crossExtent: number;
  /** Extent along the depth/growth axis (height for vertical growth, width for horizontal). */
  mainExtent: number;
}
