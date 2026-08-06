import { describe, expect, it } from 'vitest';
import { Point } from '../../src/geometry/Point.ts';
import { Rect } from '../../src/geometry/Rect.ts';
import { TreeLayout } from '../../src/layout/TreeLayout.ts';
import { Group } from '../../src/parts/Group.ts';
import { Link } from '../../src/parts/Link.ts';
import { Node } from '../../src/parts/Node.ts';

describe('Group', () => {
  it('should create with default values', () => {
    const group = new Group(1);
    expect(group.key).toBe(1);
    expect(group.isGroup).toBe(true);
    expect(group.memberCount).toBe(0);
    expect(group.isSubGraphExpanded).toBe(true);
  });

  it('should create with custom bounds', () => {
    const bounds = new Rect(0, 0, 200, 150);
    const group = new Group(1, bounds);
    expect(group.bounds).toEqual(bounds);
  });

  it('should add member parts', () => {
    const group = new Group(1);
    const node1 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(3, 100, 0, 100, 50);

    group.add(node1);
    group.add(node2);

    expect(group.memberCount).toBe(2);
    expect(group.memberNodes).toContain(node1);
    expect(group.memberNodes).toContain(node2);
  });

  it('should set containingGroup on added parts', () => {
    const group = new Group(1);
    const node = Node.fromPosAndSize(2, 0, 0, 100, 50);

    group.add(node);

    expect(node.containingGroup).toBe(group);
  });

  it('should remove member parts', () => {
    const group = new Group(1);
    const node = Node.fromPosAndSize(2, 0, 0, 100, 50);

    group.add(node);
    expect(group.memberCount).toBe(1);

    group.remove(node);
    expect(group.memberCount).toBe(0);
    expect(node.containingGroup).toBeNull();
  });

  it('should check if contains a part', () => {
    const group = new Group(1);
    const node = Node.fromPosAndSize(2, 0, 0, 100, 50);

    expect(group.contains(node)).toBe(false);
    group.add(node);
    expect(group.contains(node)).toBe(true);
  });

  it('should get member links', () => {
    const group = new Group(1);
    const node1 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(3, 100, 0, 100, 50);
    const link = new Link(100, 2, 3);

    group.add(node1);
    group.add(node2);
    group.add(link);

    expect(group.memberLinks).toHaveLength(1);
    expect(group.memberLinks[0]).toBe(link);
  });

  it('should toggle expansion', () => {
    const group = new Group(1);
    const node = Node.fromPosAndSize(2, 0, 0, 100, 50);
    group.add(node);

    expect(group.isSubGraphExpanded).toBe(true);
    expect(node.visible).toBe(true);

    group.toggle();
    expect(group.isSubGraphExpanded).toBe(false);
    expect(node.visible).toBe(false);

    group.toggle();
    expect(group.isSubGraphExpanded).toBe(true);
    expect(node.visible).toBe(true);
  });

  it('should collapse and expand', () => {
    const group = new Group(1);
    const node = Node.fromPosAndSize(2, 0, 0, 100, 50);
    group.add(node);

    group.collapse();
    expect(group.isSubGraphExpanded).toBe(false);
    expect(node.visible).toBe(false);

    group.expand();
    expect(group.isSubGraphExpanded).toBe(true);
    expect(node.visible).toBe(true);
  });

  it('should shrink bounds when collapsed and restore them when expanded', () => {
    const group = new Group(1);
    const node1 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(3, 200, 100, 100, 50);
    group.add(node1);
    group.add(node2);

    const expandedWidth = group.bounds.width;
    const expandedHeight = group.bounds.height;
    expect(expandedWidth).toBeGreaterThan(50);

    group.collapse();
    expect(group.bounds.width).toBeLessThan(expandedWidth);
    expect(group.bounds.height).toBeLessThan(expandedHeight);

    group.expand();
    expect(group.bounds.width).toBe(expandedWidth);
    expect(group.bounds.height).toBe(expandedHeight);
  });

  it('should derive location from bounds like any other Part', () => {
    const group = new Group(1, new Rect(100, 200, 60, 40));
    // Default locationSpot is the center (0.5, 0.5), same as Node/Link.
    expect(group.location.x).toBe(130);
    expect(group.location.y).toBe(220);

    group.location = new Point(0, 0);
    expect(group.bounds.x).toBe(-30);
    expect(group.bounds.y).toBe(-20);
  });

  it('should update bounds from members', () => {
    const group = new Group(1);
    const node1 = Node.fromPosAndSize(2, 0, 0, 100, 50);
    const node2 = Node.fromPosAndSize(3, 200, 100, 100, 50);

    group.add(node1);
    group.add(node2);

    // Bounds should encompass both nodes with padding
    expect(group.bounds.x).toBeLessThanOrEqual(0);
    expect(group.bounds.y).toBeLessThanOrEqual(0);
    expect(group.bounds.right).toBeGreaterThanOrEqual(300);
    expect(group.bounds.bottom).toBeGreaterThanOrEqual(150);
  });

  it('should find member by key', () => {
    const group = new Group(1);
    const node = Node.fromPosAndSize(2, 0, 0, 100, 50);
    group.add(node);

    expect(group.findMember(2)).toBe(node);
    expect(group.findMember(999)).toBeUndefined();
  });

  it('should get all parts recursively', () => {
    const group = new Group(1);
    const innerGroup = new Group(2);
    const node = Node.fromPosAndSize(3, 0, 0, 100, 50);

    innerGroup.add(node);
    group.add(innerGroup);

    const allParts = group.getAllParts();
    expect(allParts).toContain(innerGroup);
    expect(allParts).toContain(node);
  });

  it('should get level in hierarchy', () => {
    const group = new Group(1);
    const innerGroup = new Group(2);
    const node = Node.fromPosAndSize(3, 0, 0, 100, 50);

    innerGroup.add(node);
    group.add(innerGroup);

    // Top-level group has no parent
    expect(group.getLevel()).toBe(0);
    // Inner group is nested one level deep
    expect(innerGroup.getLevel()).toBe(1);
  });

  it('should check if point is inside group or members', () => {
    const group = new Group(1);
    const node = Node.fromPosAndSize(2, 50, 50, 100, 50);
    group.add(node);

    // Point inside node (which is inside group)
    expect(group.containsPoint({ x: 75, y: 75 })).toBe(true);

    // Point outside both
    expect(group.containsPoint({ x: 200, y: 200 })).toBe(false);
  });

  it('should support layout', () => {
    const group = new Group(1);
    const layout = new TreeLayout();
    group.layout = layout;
    expect(group.layout).toBe(layout);
  });

  it('should not add duplicate parts', () => {
    const group = new Group(1);
    const node = Node.fromPosAndSize(2, 0, 0, 100, 50);

    group.add(node);
    group.add(node);

    expect(group.memberCount).toBe(1);
  });

  it('should handle removing non-member gracefully', () => {
    const group = new Group(1);
    const node = Node.fromPosAndSize(2, 0, 0, 100, 50);

    expect(group.remove(node)).toBe(false);
  });
});
