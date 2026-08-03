import type { Node } from '../parts/Node.ts';
import type { Link } from '../parts/Link.ts';
import { Layout, type LayoutOptions } from './Layout.ts';

/**
 * Options for tree layout.
 */
export interface TreeLayoutOptions extends LayoutOptions {
  /** Angle in degrees for radial layout. Default: 0 */
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
  private angle: number;
  private radial: boolean;
  private angleIncrement: number;
  private nodeSpacing: number;

  constructor(options: TreeLayoutOptions = {}) {
    super(options);
    this.angle = options.angle ?? 0;
    this.radial = options.radial ?? false;
    this.angleIncrement = options.angleIncrement ?? 45;
    this.nodeSpacing = options.nodeSpacing ?? 30;
  }

  override apply(nodes: Node[], links: Link[]): void {
    if (nodes.length === 0) return;

    const nodeMap = new Map(nodes.map((n) => [n.key, n]));
    const roots = this.findRoots(nodes, links);

    if (roots.length === 0 && nodes.length > 0) {
      // No roots found, treat first node as root
      const firstNode = nodes[0];
      if (firstNode) {
        roots.push(firstNode);
      }
    }

    const firstRoot = roots[0];
    if (!firstRoot) return;

    // Build tree structure
    const tree = this.buildTree(firstRoot.key, links, nodeMap);

    // Calculate subtree sizes
    this.calculateSubtreeSizes(tree);

    // Position nodes
    if (this.radial) {
      this.positionRadial(tree, 0, 0, this.angle, 360);
    } else {
      this.positionTree(tree, 0, 0);
    }

    // Center the layout
    if (this.center) {
      this.centerLayout(nodes);
    }
  }

  private buildTree(
    rootKey: string | number,
    links: Link[],
    nodeMap: Map<string | number, Node>,
  ): TreeNode {
    const node = nodeMap.get(rootKey);
    if (!node) {
      return { node: null as unknown as Node, children: [], width: 0, height: 0 };
    }

    const childNodes = this.getChildren(rootKey, links, nodeMap);
    const children = childNodes.map((child) => this.buildTree(child.key, links, nodeMap));

    return { node, children, width: 0, height: 0 };
  }

  private calculateSubtreeSizes(tree: TreeNode): void {
    if (tree.children.length === 0) {
      tree.width = 0;
      tree.height = 0;
      return;
    }

    let totalWidth = 0;
    let maxHeight = 0;

    for (const child of tree.children) {
      this.calculateSubtreeSizes(child);
      totalWidth += child.width + (child.width > 0 ? this.nodeSpacing : 0);
      maxHeight = Math.max(maxHeight, child.height);
    }

    tree.width = Math.max(totalWidth - this.nodeSpacing, 0);
    tree.height = maxHeight + this.spacing;
  }

  private positionTree(tree: TreeNode, x: number, y: number): void {
    if (!tree.node) return;

    // Position this node
    const nodeWidth = tree.node.bounds.width;
    const dx = x - nodeWidth / 2 - tree.node.bounds.x;
    const dy = y - tree.node.bounds.y;
    tree.node.bounds = tree.node.bounds.offset(dx, dy);

    if (tree.children.length === 0) return;

    // Calculate starting x for children
    const totalChildWidth = tree.width;
    let currentX = x - totalChildWidth / 2;

    // Position children
    for (const child of tree.children) {
      const childWidth = child.node ? child.node.bounds.width : 0;

      if (child.children.length > 0) {
        this.positionTree(child, currentX + child.width / 2 + childWidth / 2, y + this.spacing);
      } else {
        this.positionTree(child, currentX + childWidth / 2, y + this.spacing);
      }

      currentX += child.width + this.nodeSpacing;
    }
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
      const radius = this.spacing + (child.width / 2) * (Math.PI / 180) * this.spacing;
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
  width: number;
  height: number;
}
