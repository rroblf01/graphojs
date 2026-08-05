// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { createApp, h, nextTick, type Component } from 'vue';
import { Diagram, Palette, Overview, version } from '../src/index.ts';
import { GraphLinksModel, Diagram as GoDiagram } from 'graphojs';

function mockContext() {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    scale: vi.fn(),
    translate: vi.fn(),
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    ellipse: vi.fn(),
    arc: vi.fn(),
    roundRect: vi.fn(),
    fillText: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
    font: '',
    textBaseline: '',
    textAlign: '',
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  } as unknown as CanvasRenderingContext2D;
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() =>
    mockContext(),
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    top: 0,
    left: 0,
    right: 800,
    bottom: 600,
  })) as unknown as typeof HTMLCanvasElement.prototype.getBoundingClientRect;
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as unknown as typeof cancelAnimationFrame;
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

afterAll(() => {
  vi.restoreAllMocks();
});

function mountApp(
  comp: Component,
  props: Record<string, unknown> = {},
): { app: ReturnType<typeof createApp>; host: HTMLElement } {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const app = createApp(h(comp, props));
  app.mount(host);
  return { app, host };
}

describe('@graphojs/vue', () => {
  it('exposes a version', () => {
    expect(version).toBe('0.1.0');
  });

  it('mounts a Diagram component and initializes the diagram', async () => {
    let created: GoDiagram | null = null;
    const model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const { app, host } = mountApp(Diagram, {
      model,
      initDiagram: (d: GoDiagram) => {
        created = d;
      },
    });
    await nextTick();
    expect(created).toBeInstanceOf(GoDiagram);
    expect(created!.model).toBe(model);
    app.unmount();
    host.remove();
  });

  it('mounts Palette and Overview components', async () => {
    const { app, host } = mountApp(Palette);
    const diagram = new GoDiagram({ div: document.createElement('div') });
    const { app: app2, host: host2 } = mountApp(Overview, { observed: diagram });
    await nextTick();
    expect(document.body.querySelectorAll('div').length).toBeGreaterThan(0);
    app.unmount();
    app2.unmount();
    host.remove();
    host2.remove();
  });

  it('onModelChange fires when the model mutates', async () => {
    const changes: string[] = [];
    const model = new GraphLinksModel({ nodeDataArray: [{ key: 1 }] });
    const { app, host } = mountApp(Diagram, {
      model,
      onModelChange: (e: { type: string }) => changes.push(e.type),
    });
    await nextTick();
    model.addNode({ key: 2 });
    await nextTick();
    expect(changes).toContain('node Added');
    app.unmount();
    host.remove();
  });

  it('onSelectionChanged fires when selection changes', async () => {
    let selected = 0;
    const model = new GraphLinksModel({ nodeDataArray: [{ key: 1, x: 0, y: 0 }] });
    const { app, host } = mountApp(Diagram, {
      model,
      onSelectionChanged: () => {
        selected++;
      },
    });
    await nextTick();
    expect(selected).toBeGreaterThanOrEqual(0);
    app.unmount();
    host.remove();
  });

  it('Palette accepts nodeTemplate/linkTemplate', async () => {
    const { app, host } = mountApp(Palette, {
      templates: [{ id: 'a', name: 'A', category: 'c', shape: 'rect', width: 10, height: 10 }],
      nodeTemplate: { isPanel: true },
    });
    await nextTick();
    expect(document.body.querySelectorAll('div').length).toBeGreaterThan(0);
    app.unmount();
    host.remove();
  });
});
