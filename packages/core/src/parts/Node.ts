import { Rect } from '../geometry/Rect.ts';
import { Spot } from '../geometry/Spot.ts';
import type { NodeKey } from '../model/Model.ts';
import { Part } from './Part.ts';
import { Panel } from '../panel/Panel.ts';
import { Port } from './Port.ts';
import type { GraphObject } from '../panel/GraphObject.ts';
import type { Link } from './Link.ts';
import type { Diagram } from '../diagram/Diagram.ts';

export type NodeShape = 'rect' | 'ellipse' | 'roundedRect';

/**
 * A visual node in a diagram.
 */
export class Node extends Part {
  private _shape: NodeShape = 'rect';
  private _label = '';
  private _labelColor = '#000000';
  private _labelFont = '12px sans-serif';
  private _cornerRadius = 0;
  private _ports: Port[] = [];

  /** Create a Node from position and size. */
  static fromPosAndSize(key: NodeKey, x: number, y: number, width: number, height: number): Node {
    return new Node(key, new Rect(x, y, width, height));
  }

  get shape(): NodeShape {
    return this._shape;
  }

  set shape(value: NodeShape) {
    this._shape = value;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get labelColor(): string {
    return this._labelColor;
  }

  set labelColor(value: string) {
    this._labelColor = value;
  }

  get labelFont(): string {
    return this._labelFont;
  }

  set labelFont(value: string) {
    this._labelFont = value;
  }

  get cornerRadius(): number {
    return this._cornerRadius;
  }

  set cornerRadius(value: number) {
    this._cornerRadius = value;
  }

  /** Check whether this node uses a panel for rendering. */
  get hasPanel(): boolean {
    return this._panel !== null;
  }

  /**
   * GoJS-compatible: Find a GraphObject by name in this node's visual tree.
   * Searches the panel's elements recursively.
   */
  override findObject(name: string): GraphObject | null {
    if (!this._panel) return null;
    return this._panel.findElement(name);
  }

  /** GoJS-compatible: Get the elements in this node's visual tree. */
  override get elements(): readonly GraphObject[] {
    return this._panel?.elements ?? [];
  }

  /** GoJS-compatible: Add a child element to this node's visual tree. */
  add(element: GraphObject): this {
    // Lazy-create panel if needed
    if (!this._panel) {
      this._panel = new Panel('Auto');
    }
    this._panel.add(element);
    return this;
  }

  /** GoJS-compatible: Remove a child element from this node's visual tree. */
  remove(element: GraphObject): boolean {
    if (!this._panel) return false;
    return this._panel.remove(element);
  }

  /** Get all ports on this node. */
  get ports(): readonly Port[] {
    return this._ports;
  }

  /** Get the number of ports. */
  get portCount(): number {
    return this._ports.length;
  }

  /** Whether a diagram point is near any of this node's ports (within a threshold). */
  isPointOnPort(point: { x: number; y: number }, threshold = 10): boolean {
    for (const port of this._ports) {
      const p = port.computePoint(
        this.bounds.x,
        this.bounds.y,
        this.bounds.width,
        this.bounds.height,
      );
      if (Math.abs(point.x - p.x) <= threshold && Math.abs(point.y - p.y) <= threshold) {
        return true;
      }
    }
    return false;
  }

  /** Add a port to this node. */
  addPort(port: Port): this {
    this._ports.push(port);
    return this;
  }

  /** Remove a port by reference. */
  removePort(port: Port): boolean {
    const index = this._ports.indexOf(port);
    if (index === -1) return false;
    this._ports.splice(index, 1);
    return true;
  }

  /** Remove all ports. */
  clearPorts(): void {
    this._ports = [];
  }

  /** Find a port by name. */
  findPort(name: string): Port | undefined {
    return this._ports.find((p) => p.name === name);
  }

  /**
   * GoJS-compatible: Collect ports declared declaratively in the visual tree
   * (GraphObjects with a non-empty `portId`), creating Port entries.
   * Uses the object's relative position within the node bounds as the port spot.
   */
  collectPortsFromPanel(): void {
    if (!this._panel) return;
    this.clearPorts();
    const walk = (panel: Panel): void => {
      for (const el of panel.elements) {
        if (el.portId) {
          const port = new Port(el.portId);
          // Derive a fractional spot from the element's position in the panel.
          // el.position is always absolute (diagram) coordinates, so it must be
          // taken relative to this node's own bounds — not divided as-is, or
          // the spot depends on the node's position on the canvas instead of
          // its position within the node.
          const w = this.bounds.width || 1;
          const h = this.bounds.height || 1;
          const spot = new Spot(
            w > 0 ? (el.position.x - this.bounds.x) / w : 0.5,
            h > 0 ? (el.position.y - this.bounds.y) / h : 0.5,
          );
          port.spot = spot;
          this._ports.push(port);
        }
        if (el instanceof Panel) walk(el);
      }
    };
    walk(this._panel);
  }

  /**
   * Recompute the fractional spot for each existing port from the current
   * element positions (layout happens during draw). Called after rendering so
   * declarative ports resolve to their real edge positions.
   */
  updatePortSpots(): void {
    if (!this._panel || this._ports.length === 0) return;
    const w = this.bounds.width || 1;
    const h = this.bounds.height || 1;
    const byId = new Map<string, Port>();
    for (const port of this._ports) byId.set(port.name, port);
    const walk = (panel: Panel): void => {
      for (const el of panel.elements) {
        if (el.portId) {
          const port = byId.get(el.portId);
          if (port) {
            port.spot = new Spot(
              w > 0 ? (el.position.x - this.bounds.x) / w : 0.5,
              h > 0 ? (el.position.y - this.bounds.y) / h : 0.5,
            );
          }
        }
        if (el instanceof Panel) walk(el);
      }
    };
    walk(this._panel);
  }

  /**
   * Compute the point of a port in diagram coordinates.
   * If no port name is given, returns the node center.
   */
  getPortPoint(name?: string): { x: number; y: number } {
    if (name !== undefined) {
      const port = this.findPort(name);
      if (port) {
        return port.computePoint(
          this.bounds.x,
          this.bounds.y,
          this.bounds.width,
          this.bounds.height,
        );
      }
    }
    return this.center;
  }

  /**
   * Get the point where a link from this node should connect,
   * given a target direction. Uses the port if specified, otherwise
   * computes the edge point toward the target.
   */
  getConnectionPoint(
    target: { x: number; y: number },
    portName?: string,
  ): { x: number; y: number } {
    if (portName !== undefined) {
      const port = this.findPort(portName);
      if (port) {
        return port.computePoint(
          this.bounds.x,
          this.bounds.y,
          this.bounds.width,
          this.bounds.height,
        );
      }
    }

    // Compute the edge point toward the target for rectangular nodes
    const cx = this.bounds.x + this.bounds.width / 2;
    const cy = this.bounds.y + this.bounds.height / 2;
    const dx = target.x - cx;
    const dy = target.y - cy;

    if (dx === 0 && dy === 0) return { x: cx, y: cy };

    // Scale the direction vector to intersect the rectangle edge
    const halfW = this.bounds.width / 2;
    const halfH = this.bounds.height / 2;
    const scale = Math.min(
      Math.abs(dx) > 0 ? halfW / Math.abs(dx) : Infinity,
      Math.abs(dy) > 0 ? halfH / Math.abs(dy) : Infinity,
    );
    const s = scale < Infinity ? scale : 0;

    return { x: cx + dx * s, y: cy + dy * s };
  }

  /**
   * Shape-aware hit testing: check whether a point is inside the node's
   * actual shape geometry, not just its bounding box.
   * Falls back to the bounding box for rect/roundedRect and when the
   * point is clearly outside.
   */
  shapeContainsPoint(point: { x: number; y: number }): boolean {
    // Fast rejection: outside the bounding box
    if (!this.bounds.containsPoint(point)) return false;

    const { x, y, width, height } = this.bounds;

    switch (this._shape) {
      case 'ellipse': {
        // Point-in-ellipse test
        const cx = x + width / 2;
        const cy = y + height / 2;
        const rx = width / 2;
        const ry = height / 2;
        if (rx === 0 || ry === 0) return false;
        const nx = (point.x - cx) / rx;
        const ny = (point.y - cy) / ry;
        return nx * nx + ny * ny <= 1;
      }
      case 'roundedRect': {
        const r = this._cornerRadius || Math.min(width, height) * 0.1;
        return pointInRoundedRect(point.x, point.y, x, y, width, height, r);
      }
      default:
        // Bounding box already confirmed inside
        return true;
    }
  }

  /** GoJS-compatible: All links that point into this node. */
  findLinksInto(): Link[] {
    const diagram = this.diagram as Diagram | null;
    if (!diagram) return [];
    return diagram.allLinks.filter((l) => l.toKey === this.key);
  }

  /** GoJS-compatible: All links that point out of this node. */
  findLinksOutOf(): Link[] {
    const diagram = this.diagram as Diagram | null;
    if (!diagram) return [];
    return diagram.allLinks.filter((l) => l.fromKey === this.key);
  }

  /** GoJS-compatible: All links connected to this node (in or out). */
  findLinksConnected(): Link[] {
    const diagram = this.diagram as Diagram | null;
    if (!diagram) return [];
    return diagram.allLinks.filter((l) => l.fromKey === this.key || l.toKey === this.key);
  }

  /** GoJS-compatible: The source nodes of the links pointing into this node. */
  findNodesInto(): Node[] {
    const diagram = this.diagram as Diagram | null;
    if (!diagram) return [];
    const result: Node[] = [];
    for (const l of this.findLinksInto()) {
      const node = diagram.findNodeForKey(l.fromKey);
      if (node) result.push(node);
    }
    return result;
  }

  /** GoJS-compatible: The destination nodes of the links pointing out of this node. */
  findNodesOutOf(): Node[] {
    const diagram = this.diagram as Diagram | null;
    if (!diagram) return [];
    const result: Node[] = [];
    for (const l of this.findLinksOutOf()) {
      const node = diagram.findNodeForKey(l.toKey);
      if (node) result.push(node);
    }
    return result;
  }

  /** GoJS-compatible: All nodes connected to this node by a link. */
  findNodesConnected(): Node[] {
    const diagram = this.diagram as Diagram | null;
    if (!diagram) return [];
    const result: Node[] = [];
    for (const l of this.findLinksConnected()) {
      const node =
        l.fromKey === this.key
          ? diagram.findNodeForKey(l.toKey)
          : diagram.findNodeForKey(l.fromKey);
      if (node) result.push(node);
    }
    return result;
  }

  /** GoJS-compatible: Whether this node is a tree leaf (no tree children). */
  isTreeLeaf(): boolean {
    return this.findTreeChildrenNodes().length === 0;
  }

  /** GoJS-compatible: The parent node in the tree structure (or null). */
  findTreeParentNode(): Node | null {
    const diagram = this.diagram as Diagram | null;
    if (!diagram) return null;
    return diagram.findTreeParent(this);
  }

  /** GoJS-compatible: The child nodes in the tree structure. */
  findTreeChildrenNodes(): Node[] {
    const diagram = this.diagram as Diagram | null;
    if (!diagram) return [];
    return diagram.findTreeChildren(this);
  }
}

/**
 * Check whether a point is inside a rounded rectangle.
 */
function pointInRoundedRect(
  px: number,
  py: number,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): boolean {
  const r = Math.min(radius, width / 2, height / 2);
  // Inside the central rect
  if (px >= x + r && px <= x + width - r) return true;
  if (py >= y + r && py <= y + height - r) return true;

  // Check the corner circles
  const corners: Array<[number, number]> = [
    [x + r, y + r],
    [x + width - r, y + r],
    [x + r, y + height - r],
    [x + width - r, y + height - r],
  ];
  for (const [cx, cy] of corners) {
    const dx = px - cx;
    const dy = py - cy;
    if (dx * dx + dy * dy <= r * r) return true;
  }
  return false;
}

import { registerPartCtor } from '../panel/PartRegistry.ts';
registerPartCtor(Node);
