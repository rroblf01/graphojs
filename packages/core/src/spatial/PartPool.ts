import { Node } from '../parts/Node.ts';
import { Link } from '../parts/Link.ts';
import { Group } from '../parts/Group.ts';
import type { Rect } from '../geometry/Rect.ts';

/**
 * A pool of reusable parts for off-screen rendering virtualization.
 * When a part scrolls out of view, it's returned to the pool so the
 * object can be reused instead of allocating new instances.
 */
export class PartPool {
  private availableNodes: Node[] = [];
  private availableLinks: Link[] = [];
  private availableGroups: Group[] = [];
  private activeNodes = 0;
  private activeLinks = 0;
  private activeGroups = 0;
  private maxPoolSize: number;

  constructor(maxPoolSize = 1000) {
    this.maxPoolSize = maxPoolSize;
  }

  /** Get the number of available (pooled) nodes. */
  get availableNodeCount(): number {
    return this.availableNodes.length;
  }

  /** Get the number of available (pooled) links. */
  get availableLinkCount(): number {
    return this.availableLinks.length;
  }

  /** Get the number of available (pooled) groups. */
  get availableGroupCount(): number {
    return this.availableGroups.length;
  }

  /** Get the number of active (checked out) nodes. */
  get activeNodeCount(): number {
    return this.activeNodes;
  }

  /** Get the number of active (checked out) links. */
  get activeLinkCount(): number {
    return this.activeLinks;
  }

  /** Get the number of active (checked out) groups. */
  get activeGroupCount(): number {
    return this.activeGroups;
  }

  /**
   * Acquire a node. Returns a pooled node if available, otherwise a new one.
   */
  acquireNode(key: string | number, bounds: Rect): Node {
    const node = this.availableNodes.pop();
    if (node) {
      node.bounds = bounds;
      this.activeNodes++;
      return node;
    }
    this.activeNodes++;
    return Node.fromPosAndSize(key, bounds.x, bounds.y, bounds.width, bounds.height);
  }

  /**
   * Acquire a link. Returns a pooled link if available, otherwise a new one.
   */
  acquireLink(key: string | number): Link {
    const link = this.availableLinks.pop();
    if (link) {
      this.activeLinks++;
      return link;
    }
    this.activeLinks++;
    return new Link(key, 0, 0);
  }

  /**
   * Acquire a group. Returns a pooled group if available, otherwise a new one.
   */
  acquireGroup(key: string | number, bounds: Rect): Group {
    const group = this.availableGroups.pop();
    if (group) {
      group.bounds = bounds;
      this.activeGroups++;
      return group;
    }
    this.activeGroups++;
    return new Group(key, bounds);
  }

  /** Release a node back to the pool. */
  releaseNode(node: Node): void {
    if (this.availableNodes.length >= this.maxPoolSize) {
      this.activeNodes--;
      return;
    }
    this.availableNodes.push(node);
    this.activeNodes--;
  }

  /** Release a link back to the pool. */
  releaseLink(link: Link): void {
    if (this.availableLinks.length >= this.maxPoolSize) {
      this.activeLinks--;
      return;
    }
    this.availableLinks.push(link);
    this.activeLinks--;
  }

  /** Release a group back to the pool. */
  releaseGroup(group: Group): void {
    if (this.availableGroups.length >= this.maxPoolSize) {
      this.activeGroups--;
      return;
    }
    this.availableGroups.push(group);
    this.activeGroups--;
  }

  /** Clear all pooled parts. */
  clear(): void {
    this.availableNodes = [];
    this.availableLinks = [];
    this.availableGroups = [];
    this.activeNodes = 0;
    this.activeLinks = 0;
    this.activeGroups = 0;
  }

  /** Get the total number of pooled parts. */
  get pooledCount(): number {
    return this.availableNodes.length + this.availableLinks.length + this.availableGroups.length;
  }

  /** Get the total number of active parts. */
  get activeCount(): number {
    return this.activeNodes + this.activeLinks + this.activeGroups;
  }
}
