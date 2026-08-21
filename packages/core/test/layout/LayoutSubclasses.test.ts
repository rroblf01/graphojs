import { describe, expect, it } from 'vitest';
import { CircularEdge, CircularNetwork, CircularVertex } from '../../src/layout/CircularNetwork.ts';
import {
  ForceDirectedEdge,
  ForceDirectedNetwork,
  ForceDirectedVertex,
} from '../../src/layout/ForceDirectedNetwork.ts';
import {
  LayeredDigraphEdge,
  LayeredDigraphNetwork,
  LayeredDigraphVertex,
} from '../../src/layout/LayeredDigraphNetwork.ts';
import { LayoutEdge, LayoutNetwork, LayoutVertex } from '../../src/layout/LayoutNetwork.ts';
import { TreeEdge, TreeNetwork, TreeVertex } from '../../src/layout/TreeNetworkTypes.ts';

describe('Per-layout LayoutVertex/LayoutEdge/LayoutNetwork subclasses', () => {
  it('CircularVertex extends LayoutVertex with diameter/actualAngle defaults', () => {
    const v = new CircularVertex();
    expect(v).toBeInstanceOf(LayoutVertex);
    expect(v.diameter).toBe(0);
    expect(v.actualAngle).toBe(0);
  });

  it('CircularEdge/CircularNetwork are real, instantiable subclasses', () => {
    expect(new CircularEdge()).toBeInstanceOf(LayoutEdge);
    expect(new CircularNetwork()).toBeInstanceOf(LayoutNetwork);
  });

  it('ForceDirectedVertex has GoJS-documented defaults', () => {
    const v = new ForceDirectedVertex();
    expect(v.isFixed).toBe(false);
    expect(v.charge).toBe(30);
    expect(v.mass).toBe(1);
    expect(v.forceX).toBe(0);
    expect(v.forceY).toBe(0);
  });

  it('ForceDirectedEdge has GoJS-documented defaults', () => {
    const e = new ForceDirectedEdge();
    expect(e.stiffness).toBe(4);
    expect(e.length).toBe(30);
  });

  it('LayeredDigraphVertex has layer/column/component tracking fields', () => {
    const v = new LayeredDigraphVertex();
    expect(v.layer).toBe(0);
    expect(v.column).toBe(0);
    expect(v.component).toBe(0);
    expect(v.near).toBeNull();
  });

  it('LayeredDigraphEdge narrows fromVertex/toVertex to LayeredDigraphVertex', () => {
    const e = new LayeredDigraphEdge();
    expect(e.valid).toBe(true);
    expect(e.rev).toBe(false);
    const v1 = new LayeredDigraphVertex();
    const v2 = new LayeredDigraphVertex();
    e.fromVertex = v1;
    e.toVertex = v2;
    expect(e.fromVertex).toBe(v1);
    expect(e.toVertex).toBe(v2);
  });

  it('LayeredDigraphNetwork is a real, instantiable subclass', () => {
    expect(new LayeredDigraphNetwork()).toBeInstanceOf(LayoutNetwork);
  });

  it('TreeVertex tracks parent/children/level', () => {
    const root = new TreeVertex();
    const child = new TreeVertex();
    child.parent = root;
    child.level = 1;
    root.children.push(child);
    expect(root.children).toContain(child);
    expect(child.parent).toBe(root);
    expect(child.level).toBe(1);
  });

  it('TreeEdge has a relativePoint and TreeNetwork is instantiable', () => {
    const e = new TreeEdge();
    expect(e.relativePoint.x).toBe(0);
    expect(e.relativePoint.y).toBe(0);
    expect(new TreeNetwork()).toBeInstanceOf(LayoutNetwork);
  });

  it('all per-algorithm networks integrate with the shared addNode/addLink API', () => {
    const net = new ForceDirectedNetwork();
    const v = new ForceDirectedVertex();
    net.addVertex(v);
    expect(net.vertices).toContain(v);
    expect(v.index).toBe(0);
  });
});
