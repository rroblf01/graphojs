/**
 * Vue wrapper components for GraphoJS.
 *
 * @module graphojs-vue
 */

import { defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  type ChangedEvent,
  type DiagramEvent,
  type DiagramEventType,
  Diagram as GoDiagram,
  Overview as GoOverview,
  Palette as GoPalette,
  type GraphLinksModel,
  type Panel,
  type Template,
} from '../index.ts';

/**
 * A Vue component that renders a GraphoJS/GoJS-compatible diagram.
 * The diagram is created once and updated reactively when props change.
 */
export const Diagram = defineComponent({
  name: 'GraphoJSDiagram',
  props: {
    model: { type: Object as () => GraphLinksModel | null, default: null },
    nodeTemplate: { type: Object as () => Panel | null, default: null },
    linkTemplate: { type: Object as () => Panel | null, default: null },
    groupTemplate: { type: Object as () => Panel | null, default: null },
    initDiagram: {
      type: Function as unknown as () => ((d: GoDiagram) => void) | null,
      default: null,
    },
    onModelChange: {
      type: Function as unknown as () => ((e: ChangedEvent) => void) | null,
      default: null,
    },
    onDiagramEvent: {
      type: Function as unknown as () => ((type: DiagramEventType, e: DiagramEvent) => void) | null,
      default: null,
    },
    onSelectionChanged: {
      type: Function as unknown as () => ((d: GoDiagram) => void) | null,
      default: null,
    },
    className: { type: String, default: null },
    style: { type: Object as () => Record<string, string> | null, default: null },
  },
  emits: ['diagram-init', 'model-change', 'diagram-event', 'selection-changed'],
  setup(props, { emit }) {
    const container = ref<HTMLDivElement | null>(null);
    let diagram: GoDiagram | null = null;
    const listeners: Array<() => void> = [];

    onMounted(() => {
      if (!container.value) return;
      diagram = new GoDiagram({ div: container.value });
      // Apply initial props immediately (watchers are lazy). Templates must be
      // set before the model, since diagram.model= syncs Parts synchronously
      // using whatever template is set at that moment.
      if (props.nodeTemplate) diagram.nodeTemplate = props.nodeTemplate;
      if (props.linkTemplate) diagram.linkTemplate = props.linkTemplate;
      if (props.groupTemplate) diagram.groupTemplate = props.groupTemplate;
      if (props.model) diagram.model = props.model;

      if (props.onModelChange) {
        const l = (e: ChangedEvent) => {
          if (props.onModelChange) props.onModelChange(e);
          else emit('model-change', e);
        };
        diagram.addModelChangedListener(l);
        listeners.push(() => diagram?.removeModelChangedListener(l));
      }
      if (props.onDiagramEvent) {
        const l = (e: DiagramEvent) => {
          if (props.onDiagramEvent) props.onDiagramEvent(e.type, e);
          else emit('diagram-event', e);
        };
        diagram.addAnyDiagramListener(l);
        listeners.push(() => diagram?.removeAnyDiagramListener(l));
      }
      if (props.onSelectionChanged) {
        const l = () => {
          if (props.onSelectionChanged) props.onSelectionChanged(diagram as GoDiagram);
          else emit('selection-changed', diagram);
        };
        diagram.addDiagramListener('SelectionChanged', l);
        listeners.push(() => diagram?.removeDiagramListener('SelectionChanged', l));
      }

      props.initDiagram?.(diagram);
      emit('diagram-init', diagram);
    });

    onUnmounted(() => {
      for (const remove of listeners) remove();
      listeners.length = 0;
      diagram?.destroy();
      diagram = null;
    });

    watch(
      () => props.model,
      (m) => {
        if (m && diagram) diagram.model = m;
      },
    );
    watch(
      () => props.nodeTemplate,
      (t) => {
        if (diagram) diagram.nodeTemplate = t ?? null;
      },
    );
    watch(
      () => props.linkTemplate,
      (t) => {
        if (diagram) diagram.linkTemplate = t ?? null;
      },
    );
    watch(
      () => props.groupTemplate,
      (t) => {
        if (diagram) diagram.groupTemplate = t ?? null;
      },
    );

    return () =>
      h('div', {
        ref: container,
        class: props.className ?? undefined,
        style: { width: '100%', height: '100%', ...(props.style ?? {}) },
      });
  },
});

/** A Vue component that renders a palette of draggable templates. */
export const Palette = defineComponent({
  name: 'GraphoJSPalette',
  props: {
    templates: { type: Array as () => Template[], default: () => [] },
    nodeTemplate: { type: Object as () => Panel | null, default: null },
    linkTemplate: { type: Object as () => Panel | null, default: null },
    className: { type: String, default: null },
    style: { type: Object as () => Record<string, string> | null, default: null },
  },
  setup(props) {
    const container = ref<HTMLElement | null>(null);
    let palette: GoPalette | null = null;

    onMounted(() => {
      if (!container.value) return;
      palette = new GoPalette(container.value, undefined, props.templates);
    });
    onUnmounted(() => {
      palette = null;
      if (container.value) container.value.innerHTML = '';
    });
    watch(
      () => props.templates,
      (t) => palette?.setTemplates(t),
    );
    watch(
      () => props.nodeTemplate,
      (t) => {
        if (palette) palette.getDiagram().nodeTemplate = t ?? null;
      },
    );
    watch(
      () => props.linkTemplate,
      (t) => {
        if (palette) palette.getDiagram().linkTemplate = t ?? null;
      },
    );

    return () =>
      h('div', {
        ref: container,
        class: props.className ?? undefined,
        style: { width: '100%', height: '100%', ...(props.style ?? {}) },
      });
  },
});

/** A Vue component that renders an overview of a diagram. */
export const Overview = defineComponent({
  name: 'GraphoJSOverview',
  props: {
    observed: { type: Object as () => GoDiagram, required: true },
    className: { type: String, default: null },
    style: { type: Object as () => Record<string, string> | null, default: null },
  },
  setup(props) {
    const container = ref<HTMLElement | null>(null);
    let overview: GoOverview | null = null;

    onMounted(() => {
      if (!container.value) return;
      overview = new GoOverview(container.value, props.observed);
    });
    onUnmounted(() => {
      overview = null;
      if (container.value) container.value.innerHTML = '';
    });
    watch(
      () => props.observed,
      (d) => {
        if (overview) overview.observed = d;
      },
    );

    return () =>
      h('div', {
        ref: container,
        class: props.className ?? undefined,
        style: { width: '100%', height: '100%', ...(props.style ?? {}) },
      });
  },
});

export const version: string = '1.1.0';
