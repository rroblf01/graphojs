import {
  Diagram as GoDiagram,
  Overview as GoOverview,
  Palette as GoPalette,
  type GraphLinksModel,
  type Panel,
  type Template,
} from 'graphojs';
import { defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue';

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
  },
  emits: ['diagram-init'],
  setup(props, { emit }) {
    const container = ref<HTMLDivElement | null>(null);
    let diagram: GoDiagram | null = null;

    onMounted(() => {
      if (!container.value) return;
      diagram = new GoDiagram({ div: container.value });
      // Apply initial props immediately (watchers are lazy)
      if (props.model) diagram.model = props.model;
      if (props.nodeTemplate) diagram.nodeTemplate = props.nodeTemplate;
      if (props.linkTemplate) diagram.linkTemplate = props.linkTemplate;
      if (props.groupTemplate) diagram.groupTemplate = props.groupTemplate;
      props.initDiagram?.(diagram);
      emit('diagram-init', diagram);
    });

    onUnmounted(() => {
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
        style: { width: '100%', height: '100%' },
      });
  },
});

/** A Vue component that renders a palette of draggable templates. */
export const Palette = defineComponent({
  name: 'GraphoJSPalette',
  props: {
    templates: { type: Array as () => Template[], default: () => [] },
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

    return () => h('div', { ref: container, style: { width: '100%', height: '100%' } });
  },
});

/** A Vue component that renders an overview of a diagram. */
export const Overview = defineComponent({
  name: 'GraphoJSOverview',
  props: {
    observed: { type: Object as () => GoDiagram, required: true },
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

    return () => h('div', { ref: container, style: { width: '100%', height: '100%' } });
  },
});

export const version: string = '0.1.0';
