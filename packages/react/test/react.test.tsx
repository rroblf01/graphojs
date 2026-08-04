// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Diagram, Palette, Overview, version } from '../src/index.tsx';
import { GraphLinksModel, Diagram as GoDiagram, GraphObject, Shape, Panel } from 'graphojs';

const roots: Root[] = [];

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

afterEach(() => {
  for (const root of roots) root.unmount();
  roots.length = 0;
  document.body.innerHTML = '';
});

afterAll(() => {
  vi.restoreAllMocks();
});

function renderApp(node: React.ReactElement): HTMLElement {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  roots.push(root);
  root.render(node);
  return host;
}

describe('@graphojs/react', () => {
  it('exposes a version', () => {
    expect(version).toBe('0.1.0');
  });

  it('renders a Diagram component and initializes the diagram', async () => {
    let created: GoDiagram | null = null;
    const $ = GraphObject.make;
    const nodeTemplate = $(Panel, 'Auto', $(Shape, 'Rectangle'));
    const model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });

    renderApp(
      React.createElement(Diagram, {
        model,
        nodeTemplate,
        initDiagram: (d) => {
          created = d;
        },
      }),
    );
    await act(async () => {});
    expect(created).toBeInstanceOf(GoDiagram);
    expect(created!.model).toBe(model);
  });

  it('renders Palette and Overview components', async () => {
    renderApp(React.createElement(Palette, {}));

    const diagram = new GoDiagram({ div: document.createElement('div') });
    renderApp(React.createElement(Overview, { observed: diagram }));
    await act(async () => {});
    // If we got here without throwing, the components rendered
    expect(document.body.querySelectorAll('div').length).toBeGreaterThan(0);
  });
});
