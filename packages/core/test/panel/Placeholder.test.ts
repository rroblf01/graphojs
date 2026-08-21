import { describe, expect, it } from 'vitest';
import { Panel } from '../../src/panel/Panel.ts';
import { Placeholder } from '../../src/panel/Placeholder.ts';
import { Group } from '../../src/parts/Group.ts';
import { Node } from '../../src/parts/Node.ts';

describe('Placeholder', () => {
  it('measures to the union of visible member bounds plus padding, when used inside a Group template', () => {
    const group = new Group(1);
    const root = new Panel('Auto');
    const placeholder = new Placeholder();
    root.add(placeholder);
    group.panel = root; // wires GraphObject.part so placeholder.part === group

    const member1 = Node.fromPosAndSize(2, 0, 0, 50, 30);
    const member2 = Node.fromPosAndSize(3, 100, 80, 50, 30);
    group.add(member1);
    group.add(member2);

    const size = placeholder.measure();
    expect(size.width).toBe(150 + placeholder.padding * 2);
    expect(size.height).toBe(110 + placeholder.padding * 2);
  });

  it('shrinks with the members when one becomes invisible (e.g. a collapsed group)', () => {
    const group = new Group(1);
    const root = new Panel('Auto');
    const placeholder = new Placeholder();
    root.add(placeholder);
    group.panel = root;

    const member1 = Node.fromPosAndSize(2, 0, 0, 50, 30);
    const member2 = Node.fromPosAndSize(3, 100, 80, 50, 30);
    group.add(member1);
    group.add(member2);
    member2.visible = false;

    const size = placeholder.measure();
    expect(size.width).toBe(50 + placeholder.padding * 2);
    expect(size.height).toBe(30 + placeholder.padding * 2);
  });

  it('falls back to a minimal padding-only size with no members or no owning Group', () => {
    const placeholder = new Placeholder();
    const size = placeholder.measure();
    expect(size.width).toBe(placeholder.padding * 2);
    expect(size.height).toBe(placeholder.padding * 2);
  });

  it('respects a custom padding value', () => {
    const group = new Group(1);
    const root = new Panel('Auto');
    const placeholder = new Placeholder();
    placeholder.padding = 25;
    root.add(placeholder);
    group.panel = root;

    const member = Node.fromPosAndSize(2, 0, 0, 50, 30);
    group.add(member);

    const size = placeholder.measure();
    expect(size.width).toBe(50 + 50);
    expect(size.height).toBe(30 + 50);
  });
});
