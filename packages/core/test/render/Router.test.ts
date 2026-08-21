// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { Set as GoSet } from '../../src/collections/Set.ts';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import type { Link } from '../../src/parts/Link.ts';
import { AvoidsNodesRouter } from '../../src/render/AvoidsNodesRouter.ts';
import { Router } from '../../src/render/Router.ts';

describe('Router (abstract base)', () => {
  class NoopRouter extends Router {
    routeLinks(): void {}
  }

  it('defaults name/isEnabled/isRealtime and round-trips diagram', () => {
    const r = new NoopRouter();
    expect(r.name).toBe('');
    expect(r.isEnabled).toBe(true);
    expect(r.isRealtime).toBe(false);
    expect(r.diagram).toBeNull();

    const div = document.createElement('div');
    const d = new Diagram({ div });
    r.diagram = d;
    expect(r.diagram).toBe(d);
    d.destroy();
  });

  it('canRoute/isRoutable default to true when enabled', () => {
    const r = new NoopRouter();
    const div = document.createElement('div');
    const d = new Diagram({ div });
    expect(r.canRoute(d)).toBe(true);
    r.isEnabled = false;
    expect(r.canRoute(d)).toBe(false);
    d.destroy();
  });
});

describe('AvoidsNodesRouter', () => {
  it('sets avoidObstacles on every routed link and invalidates the diagram', () => {
    const div = document.createElement('div');
    const d = new Diagram({ div });
    d.model = new GraphLinksModel({
      nodeDataArray: [
        { key: 1, x: 0, y: 0, width: 50, height: 50 },
        { key: 2, x: 200, y: 0, width: 50, height: 50 },
      ],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    const link = d.getModel().getLinkDataArray()[0];
    const linkKey = d.getModel().getLinkKey(link!)!;
    const linkPart = d.findLinkForKey(linkKey) as Link;
    expect(linkPart.avoidObstacles).toBe(false);

    const router = new AvoidsNodesRouter();
    router.diagram = d;
    const invalidateSpy = vi.spyOn(d, 'invalidate');
    router.routeLinks(new GoSet([linkPart]), d);

    expect(linkPart.avoidObstacles).toBe(true);
    expect(invalidateSpy).toHaveBeenCalled();
    d.destroy();
  });

  it('does nothing when disabled', () => {
    const div = document.createElement('div');
    const d = new Diagram({ div });
    d.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1 }, { key: 2 }],
      linkDataArray: [{ from: 1, to: 2 }],
    });
    const link = d.getModel().getLinkDataArray()[0];
    const linkKey = d.getModel().getLinkKey(link!)!;
    const linkPart = d.findLinkForKey(linkKey) as Link;

    const router = new AvoidsNodesRouter();
    router.isEnabled = false;
    router.routeLinks(new GoSet([linkPart]), d);
    expect(linkPart.avoidObstacles).toBe(false);
    d.destroy();
  });

  it('accepts an init property bag in the constructor', () => {
    const router = new AvoidsNodesRouter({ name: 'myRouter', isEnabled: false });
    expect(router.name).toBe('myRouter');
    expect(router.isEnabled).toBe(false);
  });
});
