// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { type Component, createApp, defineComponent, h, nextTick, ref } from 'vue';
import { Diagram as GoDiagram, GraphLinksModel, GraphObject, Panel, Shape } from '../src/index.ts';
import { Diagram, Overview, Palette, version } from '../src/vue/index.ts';

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

/**
 * Mounts `comp` inside a wrapper that re-renders whenever the shared
 * `props` object is replaced, so tests can exercise reactive prop updates.
 */
function mountReactive(
  comp: Component,
  getProps: () => Record<string, unknown>,
): { update: () => Promise<void>; host: HTMLElement; unmount: () => void } {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const state = ref(getProps());
  const app = createApp(
    defineComponent({
      setup() {
        return () => h(comp, state.value);
      },
    }),
  );
  app.mount(host);
  return {
    update: async () => {
      state.value = getProps();
      await nextTick();
    },
    host,
    unmount: () => app.unmount(),
  };
}

describe('graphojs/vue', () => {
  it('exposes a version', () => {
    expect(version).toBe('1.5.0');
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

  it('applies nodeTemplate before syncing the model on the very first mount (regression: effect order)', async () => {
    // onMounted used to set diagram.model before nodeTemplate, so a
    // model+nodeTemplate passed together on first mount synced nodes with
    // no template at all.
    let created: GoDiagram | null = null;
    const $ = GraphObject.make;
    const nodeTemplate = $(Panel, 'Auto', $(Shape, 'Rectangle', { name: 'shape' }));
    const model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const { app, host } = mountApp(Diagram, {
      model,
      nodeTemplate,
      initDiagram: (d: GoDiagram) => {
        created = d;
      },
    });
    await nextTick();

    const node = created!.findNodeForKey(1);
    expect(node?.findObject('shape')).toBeInstanceOf(Shape);
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

  it('onModelChange fires once per model mutation', async () => {
    const changes: string[] = [];
    const model = new GraphLinksModel({ nodeDataArray: [{ key: 1 }] });
    const { app, host } = mountApp(Diagram, {
      model,
      onModelChange: (e: { type: string }) => changes.push(e.type),
    });
    await nextTick();
    model.addNode({ key: 2 });
    await nextTick();
    expect(changes.filter((c) => c === 'node Added').length).toBe(1);
    app.unmount();
    host.remove();
  });

  it('updates the model reactively when the model prop changes', async () => {
    const modelA = new GraphLinksModel({ nodeDataArray: [{ key: 1 }] });
    const modelB = new GraphLinksModel({ nodeDataArray: [{ key: 9 }] });
    let created: GoDiagram | null = null;
    let model: GraphLinksModel = modelA;
    const { update, unmount } = mountReactive(Diagram, () => ({
      model,
      initDiagram: (d: GoDiagram) => {
        created = d;
      },
    }));
    await nextTick();
    expect(created!.model).toStrictEqual(modelA);

    model = modelB;
    await update();
    expect(created!.model).toStrictEqual(modelB);
    unmount();
  });

  it('applies nodeTemplate/linkTemplate/groupTemplate reactively', async () => {
    const { GraphObject, Panel, Shape } = await import('graphojs');
    const $ = GraphObject.make;
    const templateA = $(Panel, 'Auto', $(Shape, 'Rectangle'));
    const templateB = $(Panel, 'Auto', $(Shape, 'Ellipse'));
    let created: GoDiagram | null = null;
    let nodeTemplate: unknown = templateA;
    const { update, unmount } = mountReactive(Diagram, () => ({
      nodeTemplate,
      initDiagram: (d: GoDiagram) => {
        created = d;
      },
    }));
    await nextTick();
    expect(created!.nodeTemplate).toStrictEqual(templateA);

    nodeTemplate = templateB;
    await update();
    expect(created!.nodeTemplate).toStrictEqual(templateB);
    unmount();
  });

  it('emits diagram-init after initDiagram', async () => {
    const order: string[] = [];
    const { app, host } = mountApp(Diagram, {
      initDiagram: () => order.push('init'),
      onDiagramInit: () => order.push('emit'),
    });
    await nextTick();
    expect(order).toEqual(['init', 'emit']);
    app.unmount();
    host.remove();
  });

  it('fires onDiagramEvent and emits model-change', async () => {
    const events: string[] = [];
    const model = new GraphLinksModel({ nodeDataArray: [] });
    const { app, host } = mountApp(Diagram, {
      model,
      onDiagramEvent: (type: string) => events.push(type),
      onModelChange: (e: { type: string }) => events.push(`model:${e.type}`),
    });
    await nextTick();
    model.addNode({ key: 1 });
    await nextTick();
    expect(events).toContain('PartAdded');
    expect(events.some((e) => e.startsWith('model:'))).toBe(true);
    app.unmount();
    host.remove();
  });

  it('cleans up and destroys the diagram on unmount', async () => {
    let created: GoDiagram | null = null;
    const { app, host } = mountApp(Diagram, {
      initDiagram: (d: GoDiagram) => {
        created = d;
      },
    });
    await nextTick();
    const destroySpy = vi.spyOn(created!, 'destroy');
    app.unmount();
    host.remove();
    await nextTick();
    expect(destroySpy).toHaveBeenCalled();
    destroySpy.mockRestore();
  });

  it('Palette re-renders when templates change', async () => {
    let templates: Array<{
      id: string;
      name: string;
      category: string;
      shape: string;
      width: number;
      height: number;
    }> = [{ id: 'a', name: 'A', category: 'c', shape: 'rect', width: 10, height: 10 }];
    const { update, unmount } = mountReactive(Palette, () => ({ templates }));
    await nextTick();
    expect(document.body.querySelectorAll('[data-template-id]').length).toBe(1);

    templates = [
      { id: 'a', name: 'A', category: 'c', shape: 'rect', width: 10, height: 10 },
      { id: 'b', name: 'B', category: 'c', shape: 'ellipse', width: 10, height: 10 },
    ];
    await update();
    expect(document.body.querySelectorAll('[data-template-id]').length).toBe(2);
    unmount();
  });

  it('forwards className/style on all components', async () => {
    const diagram = new GoDiagram({ div: document.createElement('div') });
    const { app, host } = mountApp(Diagram, {
      className: 'my-diagram',
      style: { width: '50px' },
    });
    await nextTick();
    const el = host.querySelector('.my-diagram');
    expect(el).not.toBeNull();
    expect((el as HTMLElement).style.width).toBe('50px');
    app.unmount();
    host.remove();

    const { app: app2, host: host2 } = mountApp(Overview, {
      observed: diagram,
      className: 'my-overview',
    });
    await nextTick();
    expect(host2.querySelector('.my-overview')).not.toBeNull();
    app2.unmount();
    host2.remove();
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
