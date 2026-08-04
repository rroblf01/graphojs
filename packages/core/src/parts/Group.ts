import { Rect } from '../geometry/Rect.ts';
import { Point } from '../geometry/Point.ts';
import type { NodeKey } from '../model/Model.ts';
import { Part } from './Part.ts';
import type { Node } from './Node.ts';
import type { Link } from './Link.ts';
import type { Layout } from '../layout/Layout.ts';

/**
 * A group is a Part that can contain other Parts (nodes and links).
 * Groups act as subgraphs within a diagram.
 */
export class Group extends Part {
  private _memberParts: Part[] = [];
  private _isSubGraphExpanded = true;
  private _isGroup = true;
  private _layout: Layout | null = null;
  private _placeholderPadding = 10;
  private _isHighlighted = false;
  private _location = { x: 0, y: 0 };

  constructor(key: NodeKey, bounds?: Rect) {
    super(key, bounds ?? Rect.zero());
  }

  /** Whether this is a group (always true). */
  get isGroup(): boolean {
    return this._isGroup;
  }

  /** Get the member parts of this group. */
  get memberParts(): readonly Part[] {
    return this._memberParts;
  }

  /** Get the member nodes. */
  get memberNodes(): Node[] {
    return this._memberParts.filter((p): p is Node => 'shape' in p);
  }

  /** Get the member links. */
  get memberLinks(): Link[] {
    return this._memberParts.filter((p): p is Link => 'fromKey' in p);
  }

  /** Get the number of member parts. */
  get memberCount(): number {
    return this._memberParts.length;
  }

  /** Whether the subgraph is expanded. */
  get isSubGraphExpanded(): boolean {
    return this._isSubGraphExpanded;
  }

  /** Set whether the subgraph is expanded. */
  set isSubGraphExpanded(value: boolean) {
    this._isSubGraphExpanded = value;
    this.updateMemberVisibility();
  }

  /** Get the layout for this group's members. */
  get layout(): Layout | null {
    return this._layout;
  }

  /** Set the layout for this group's members. */
  set layout(value: Layout | null) {
    this._layout = value;
  }

  /** Get the placeholder padding. */
  get placeholderPadding(): number {
    return this._placeholderPadding;
  }

  /** Set the placeholder padding. */
  set placeholderPadding(value: number) {
    this._placeholderPadding = value;
  }

  /** Whether this group is highlighted. */
  get isHighlighted(): boolean {
    return this._isHighlighted;
  }

  /** Set whether this group is highlighted. */
  set isHighlighted(value: boolean) {
    this._isHighlighted = value;
  }

  /** Get the location of the group. */
  override get location(): Point {
    return new Point(this._location.x, this._location.y);
  }

  /** Set the location of the group. */
  override set location(value: Point) {
    this._location = { x: value.x, y: value.y };
  }

  /** Add a part to this group. */
  add(part: Part): void {
    if (this._memberParts.includes(part)) return;

    this._memberParts.push(part);
    part.containingGroup = this;

    this.updateBoundsFromMembers();
  }

  /** Remove a part from this group. */
  remove(part: Part): boolean {
    const index = this._memberParts.indexOf(part);
    if (index === -1) return false;

    this._memberParts.splice(index, 1);
    part.containingGroup = null;

    this.updateBoundsFromMembers();
    return true;
  }

  /** Check if a part is a member of this group. */
  contains(part: Part): boolean {
    return this._memberParts.includes(part);
  }

  /** Check if this group contains a point (including members). */
  override containsPoint(point: { x: number; y: number }): boolean {
    // Check group bounds first
    if (super.containsPoint(point)) return true;

    // Check if point is in any member
    for (const part of this._memberParts) {
      if (part.visible && part.containsPoint(point)) {
        return true;
      }
    }

    return false;
  }

  /** Update bounds to encompass all members. */
  updateBoundsFromMembers(): void {
    if (this._memberParts.length === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const part of this._memberParts) {
      if (!part.visible) continue;
      minX = Math.min(minX, part.bounds.x);
      minY = Math.min(minY, part.bounds.y);
      maxX = Math.max(maxX, part.bounds.right);
      maxY = Math.max(maxY, part.bounds.bottom);
    }

    if (minX < maxX && minY < maxY) {
      this.bounds = new Rect(
        minX - this._placeholderPadding,
        minY - this._placeholderPadding,
        maxX - minX + this._placeholderPadding * 2,
        maxY - minY + this._placeholderPadding * 2,
      );
    }
  }

  /** Update member visibility based on expansion state. */
  private updateMemberVisibility(): void {
    for (const part of this._memberParts) {
      part.visible = this._isSubGraphExpanded;
    }
  }

  /** Collapse the group (hide members). */
  collapse(): void {
    this.isSubGraphExpanded = false;
  }

  /** Expand the group (show members). */
  expand(): void {
    this.isSubGraphExpanded = true;
  }

  /** Toggle expansion state. */
  toggle(): void {
    this.isSubGraphExpanded = !this._isSubGraphExpanded;
  }

  /** Get all parts in this group recursively. */
  getAllParts(): Part[] {
    const result: Part[] = [...this._memberParts];
    for (const part of this._memberParts) {
      if (part instanceof Group) {
        result.push(...part.getAllParts());
      }
    }
    return result;
  }

  /** Find a member by key. */
  findMember(key: NodeKey): Part | undefined {
    return this._memberParts.find((p) => p.key === key);
  }

  /** Get the level of this group in the hierarchy. */
  getLevel(): number {
    let level = 0;
    let current: Part | null = this;
    while (current !== null && current.containingGroup instanceof Group) {
      level++;
      current = current.containingGroup;
    }
    return level;
  }
}

import { registerPartCtor } from '../panel/PartRegistry.ts';
registerPartCtor(Group);
