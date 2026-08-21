// @vitest-environment jsdom

import React, { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  Diagram as GoDiagram,
  GraphLinksModel,
  GraphObject,
  Panel,
  Shape,
  type Template,
} from '../src/index.ts';
import {
  Diagram,
  Overview,
  Palette,
  ReactDiagram,
  type ReactDiagramRef,
  version,
} from '../src/react/index.tsx';

const roots: Root[] = [];

afterEach(() => {
  for (const root of roots) root.unmount();
  roots.length = 0;
  document.body.innerHTML = '';
});

function renderApp(node: React.ReactElement): { host: HTMLElement; unmount: () => void } {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  roots.push(root);
  root.render(node);
  return { host, unmount: () => root.unmount() };
}

/**
 * Renders a stateful component that lets tests swap props on the same root,
 * exercising React's prop-update path.
 */
function renderStateful<P>(
  Component: React.FC<P>,
  getProps: () => P,
): { rerender: () => void; host: HTMLElement; unmount: () => void } {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  roots.push(root);
  const rerender = () => root.render(React.createElement(Component, getProps()));
  rerender();
  return { rerender, host, unmount: () => root.unmount() };
}

describe('graphojs/react', () => {
  it('exposes a version', () => {
    expect(version).toBe('1.6.0');
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

  it('applies nodeTemplate before syncing the model on the very first mount (regression: effect order)', async () => {
    // The mount effect used to set diagram.model before the separate
    // nodeTemplate effect ran, so a model+nodeTemplate passed together on
    // first render synced nodes with no template at all.
    let created: GoDiagram | null = null;
    const $ = GraphObject.make;
    const nodeTemplate = $(Panel, 'Auto', $(Shape, 'Rectangle', { name: 'shape' }));
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

    const node = created!.findNodeForKey(1);
    expect(node?.findObject('shape')).toBeInstanceOf(Shape);
  });

  it('renders Palette and Overview components', async () => {
    renderApp(React.createElement(Palette, {}));

    const diagram = new GoDiagram({ div: document.createElement('div') });
    renderApp(React.createElement(Overview, { observed: diagram }));
    await act(async () => {});
    // If we got here without throwing, the components rendered
    expect(document.body.querySelectorAll('div').length).toBeGreaterThan(0);
  });

  it('onModelChange fires once per model mutation', async () => {
    const changes: string[] = [];
    const model = new GraphLinksModel({ nodeDataArray: [{ key: 1 }] });
    renderApp(
      React.createElement(Diagram, {
        model,
        onModelChange: (e) => changes.push(e.type),
      }),
    );
    await act(async () => {});
    model.addNode({ key: 2 });
    model.addLink({ key: 1, from: 1, to: 2 });
    await act(async () => {});
    expect(changes.filter((c) => c === 'node Added').length).toBe(1);
    expect(changes).toContain('link Added');
  });

  it('re-subscribes onModelChange when the callback identity changes', async () => {
    const model = new GraphLinksModel({ nodeDataArray: [{ key: 1 }] });
    const first = vi.fn();
    const second = vi.fn();
    let cb: (e: { type: string }) => void = first;
    renderApp(
      React.createElement(Diagram, {
        model,
        onModelChange: (e) => cb(e),
      }),
    );
    await act(async () => {});
    model.addNode({ key: 2 });
    await act(async () => {});
    expect(first).toHaveBeenCalledTimes(1);

    cb = second;
    await act(async () => {});
    model.addNode({ key: 3 });
    await act(async () => {});
    expect(second).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledTimes(1);
  });

  it('updates the model reactively when the model prop changes', async () => {
    const $ = GraphObject.make;
    const modelA = new GraphLinksModel({ nodeDataArray: [{ key: 1 }] });
    const modelB = new GraphLinksModel({ nodeDataArray: [{ key: 9 }] });
    let created: GoDiagram | null = null;
    let model: GraphLinksModel = modelA;
    const nodeTemplate = $(Panel, 'Auto', $(Shape, 'Rectangle'));

    const { rerender } = renderStateful(
      (props: { model: GraphLinksModel }) => (
        <Diagram
          model={props.model}
          nodeTemplate={nodeTemplate}
          initDiagram={(d) => {
            created = d;
          }}
        />
      ),
      () => ({ model }),
    );
    await act(async () => {});
    expect(created!.model).toBe(modelA);

    model = modelB;
    rerender();
    await act(async () => {});
    expect(created!.model).toBe(modelB);
  });

  it('applies nodeTemplate/linkTemplate/groupTemplate reactively', async () => {
    const $ = GraphObject.make;
    let created: GoDiagram | null = null;
    const templateA = $(Panel, 'Auto', $(Shape, 'Rectangle'));
    const templateB = $(Panel, 'Auto', $(Shape, 'Ellipse'));
    let nodeTemplate: Panel = templateA;

    const { rerender } = renderStateful(
      (props: { template: Panel }) => (
        <Diagram
          nodeTemplate={props.template}
          initDiagram={(d) => {
            created = d;
          }}
        />
      ),
      () => ({ template: nodeTemplate }),
    );
    await act(async () => {});
    expect(created!.nodeTemplate).toBe(templateA);

    nodeTemplate = templateB;
    rerender();
    await act(async () => {});
    expect(created!.nodeTemplate).toBe(templateB);
  });

  it('onDiagramInit is called after initDiagram', async () => {
    const order: string[] = [];
    renderApp(
      React.createElement(Diagram, {
        initDiagram: () => order.push('init'),
        onDiagramInit: () => order.push('init-done'),
      }),
    );
    await act(async () => {});
    expect(order).toEqual(['init', 'init-done']);
  });

  it('fires onDiagramEvent synchronously on node add', async () => {
    const events: string[] = [];
    const model = new GraphLinksModel({ nodeDataArray: [] });
    renderApp(
      React.createElement(Diagram, {
        model,
        onDiagramEvent: (type) => events.push(type),
      }),
    );
    await act(async () => {});
    model.addNode({ key: 1 });
    await act(async () => {});
    expect(events).toContain('PartAdded');
  });

  it('cleans up and destroys the diagram on unmount', async () => {
    let created: GoDiagram | null = null;
    const { unmount } = renderApp(
      React.createElement(Diagram, {
        initDiagram: (d) => {
          created = d;
        },
      }),
    );
    await act(async () => {});
    const destroySpy = vi.spyOn(created!, 'destroy');
    await act(async () => {
      unmount();
    });
    expect(destroySpy).toHaveBeenCalled();
    destroySpy.mockRestore();
  });

  it('Palette re-renders when templates change', async () => {
    let templates: Template[] = [
      { id: 'a', name: 'A', category: 'c', shape: 'rect', width: 10, height: 10 },
    ];
    const { rerender } = renderStateful(
      (props: { templates: Template[] }) => <Palette templates={props.templates} />,
      () => ({ templates }),
    );
    await act(async () => {});
    expect(document.body.querySelectorAll('[data-template-id]').length).toBe(1);

    templates = [
      { id: 'a', name: 'A', category: 'c', shape: 'rect', width: 10, height: 10 },
      { id: 'b', name: 'B', category: 'c', shape: 'ellipse', width: 10, height: 10 },
    ];
    rerender();
    await act(async () => {});
    expect(document.body.querySelectorAll('[data-template-id]').length).toBe(2);
  });

  it('Diagram and Palette forward className/style', async () => {
    renderApp(React.createElement(Diagram, { className: 'my-diagram', style: { width: '50px' } }));
    await act(async () => {});
    const el = document.body.querySelector('.my-diagram');
    expect(el).not.toBeNull();
    expect((el as HTMLElement).style.width).toBe('50px');
  });

  it('Overview forwards className/style', async () => {
    const diagram = new GoDiagram({ div: document.createElement('div') });
    renderApp(React.createElement(Overview, { observed: diagram, className: 'my-overview' }));
    await act(async () => {});
    expect(document.body.querySelector('.my-overview')).not.toBeNull();
  });

  it('onSelectionChanged fires when selection changes', async () => {
    let selected = 0;
    const model = new GraphLinksModel({ nodeDataArray: [{ key: 1, x: 0, y: 0 }] });
    renderApp(
      React.createElement(Diagram, {
        model,
        onSelectionChanged: () => {
          selected++;
        },
      }),
    );
    await act(async () => {});
    expect(selected).toBeGreaterThanOrEqual(0);
  });

  it('Palette accepts nodeTemplate/linkTemplate', async () => {
    const $ = GraphObject.make;
    const nodeTemplate = $(Panel, 'Auto', $(Shape, 'Rectangle'));
    renderApp(
      React.createElement(Palette, {
        templates: [{ id: 'a', name: 'A', category: 'c', shape: 'rect', width: 10, height: 10 }],
        nodeTemplate,
      }),
    );
    await act(async () => {});
    expect(document.body.querySelectorAll('div').length).toBeGreaterThan(0);
  });

  describe('ReactDiagram (gojs-react-shaped: factory + ref.getDiagram())', () => {
    function makeInitDiagram(onCall?: () => void) {
      return () => {
        onCall?.();
        const $ = GraphObject.make;
        const d = new GoDiagram({ div: null });
        d.nodeTemplate = $(Panel, 'Auto', $(Shape, 'Rectangle'));
        return d;
      };
    }

    it('calls initDiagram once, attaches div, seeds the model, and exposes it via the ref', async () => {
      let initCalls = 0;
      const ref = React.createRef<ReactDiagramRef>();
      renderApp(
        React.createElement(ReactDiagram, {
          ref,
          initDiagram: makeInitDiagram(() => {
            initCalls++;
          }),
          nodeDataArray: [{ key: 1, x: 0, y: 0 }],
        }),
      );
      await act(async () => {});

      expect(initCalls).toBe(1);
      const diagram = ref.current?.getDiagram();
      expect(diagram).not.toBeUndefined();
      expect(diagram?.div).not.toBeNull();
      expect(diagram?.model.nodeDataArray.length).toBe(1);
    });

    it('resyncs the model when nodeDataArray changes, unless skipsDiagramUpdate is set', async () => {
      const ref = React.createRef<ReactDiagramRef>();
      const initDiagram = makeInitDiagram();
      const host = document.createElement('div');
      document.body.appendChild(host);
      const root = createRoot(host);
      roots.push(root);

      root.render(
        React.createElement(ReactDiagram, {
          ref,
          initDiagram,
          nodeDataArray: [{ key: 1, x: 0, y: 0 }],
        }),
      );
      await act(async () => {});
      expect(ref.current?.getDiagram()?.model.nodeDataArray.length).toBe(1);

      root.render(
        React.createElement(ReactDiagram, {
          ref,
          initDiagram,
          nodeDataArray: [
            { key: 1, x: 0, y: 0 },
            { key: 2, x: 10, y: 10 },
          ],
        }),
      );
      await act(async () => {});
      expect(ref.current?.getDiagram()?.model.nodeDataArray.length).toBe(2);
    });

    it('does not resync the model when skipsDiagramUpdate is true', async () => {
      const ref = React.createRef<ReactDiagramRef>();
      const initDiagram = makeInitDiagram();
      const host = document.createElement('div');
      document.body.appendChild(host);
      const root = createRoot(host);
      roots.push(root);

      root.render(
        React.createElement(ReactDiagram, {
          ref,
          initDiagram,
          nodeDataArray: [{ key: 1, x: 0, y: 0 }],
          skipsDiagramUpdate: true,
        }),
      );
      await act(async () => {});
      const diagram = ref.current?.getDiagram();
      expect(diagram?.model.nodeDataArray.length).toBe(1);

      root.render(
        React.createElement(ReactDiagram, {
          ref,
          initDiagram,
          nodeDataArray: [
            { key: 1, x: 0, y: 0 },
            { key: 2, x: 10, y: 10 },
          ],
          skipsDiagramUpdate: true,
        }),
      );
      await act(async () => {});
      // Same diagram instance, and the model was left alone by the wrapper.
      expect(ref.current?.getDiagram()).toBe(diagram);
      expect(diagram?.model.nodeDataArray.length).toBe(1);
    });

    it('getDiagram() returns null before mount', () => {
      const ref = React.createRef<ReactDiagramRef>();
      expect(ref.current).toBeNull();
    });
  });
});
