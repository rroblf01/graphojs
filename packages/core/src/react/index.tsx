/**
 * React wrapper components for GraphoJS.
 *
 * @module graphojs-react
 */

import type React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import {
  type ChangedEvent,
  type DiagramEvent,
  type DiagramEventType,
  Diagram as GoDiagram,
  GraphLinksModel as GoGraphLinksModel,
  Overview as GoOverview,
  Palette as GoPalette,
  type GraphLinksModel,
  type LinkData,
  type NodeData,
  type Panel,
  type Template,
} from '../index.ts';

export interface DiagramProps {
  /** GoJS-compatible: the model to display. Re-renders when it changes. */
  model?: GraphLinksModel;
  /** GoJS-compatible: the node template. */
  nodeTemplate?: Panel | null;
  /** GoJS-compatible: the link template. */
  linkTemplate?: Panel | null;
  /** GoJS-compatible: the group template. */
  groupTemplate?: Panel | null;
  /** Called once the underlying diagram is created. */
  initDiagram?: (diagram: GoDiagram) => void;
  /** Called after initDiagram with the diagram instance. */
  onDiagramInit?: (diagram: GoDiagram) => void;
  /** GoJS-compatible: called whenever the diagram's model changes. */
  onModelChange?: (event: ChangedEvent) => void;
  /** Called for every fired diagram event of the given type. */
  onDiagramEvent?: (type: DiagramEventType, event: DiagramEvent) => void;
  /** Sugar for the "SelectionChanged" diagram event. */
  onSelectionChanged?: (diagram: GoDiagram) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A React component that renders a GraphoJS/GoJS-compatible diagram.
 * The diagram is created once and updated reactively when props change.
 */
export const Diagram: React.FC<DiagramProps> = ({
  model,
  nodeTemplate,
  linkTemplate,
  groupTemplate,
  initDiagram,
  onDiagramInit,
  onModelChange,
  onDiagramEvent,
  onSelectionChanged,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<GoDiagram | null>(null);
  const modelRef = useRef(model);

  // Create / destroy the diagram
  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-once effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const diagram = new GoDiagram({ div: container });
    diagramRef.current = diagram;
    // Templates must be applied before the model, since diagram.model= syncs
    // Parts synchronously using whatever template is set at that moment.
    diagram.nodeTemplate = nodeTemplate ?? null;
    diagram.linkTemplate = linkTemplate ?? null;
    diagram.groupTemplate = groupTemplate ?? null;
    initDiagram?.(diagram);
    onDiagramInit?.(diagram);

    if (modelRef.current) diagram.model = modelRef.current;

    return () => {
      diagram.destroy();
      diagramRef.current = null;
    };
  }, []);

  // Sync props
  useEffect(() => {
    if (model && diagramRef.current) {
      diagramRef.current.model = model;
      modelRef.current = model;
    }
  }, [model]);

  // Re-subscribe model-change listener when the callback changes
  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;
    if (!onModelChange) return;
    const listener = (event: ChangedEvent) => onModelChange?.(event);
    diagram.addModelChangedListener(listener);
    return () => diagram.removeModelChangedListener(listener);
  }, [onModelChange]);

  // Re-subscribe any-event listener when the callback changes
  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;
    if (!onDiagramEvent) return;
    const listener = (event: DiagramEvent) => onDiagramEvent?.(event.type, event);
    diagram.addAnyDiagramListener(listener);
    return () => {
      diagram.removeAnyDiagramListener(listener);
    };
  }, [onDiagramEvent]);

  // Re-subscribe selection listener when the callback changes
  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;
    if (!onSelectionChanged) return;
    const listener = () => onSelectionChanged?.(diagram);
    diagram.addDiagramListener('SelectionChanged', listener);
    return () => {
      diagram.removeDiagramListener('SelectionChanged', listener);
    };
  }, [onSelectionChanged]);

  useEffect(() => {
    if (diagramRef.current) diagramRef.current.nodeTemplate = nodeTemplate ?? null;
  }, [nodeTemplate]);

  useEffect(() => {
    if (diagramRef.current) diagramRef.current.linkTemplate = linkTemplate ?? null;
  }, [linkTemplate]);

  useEffect(() => {
    if (diagramRef.current) diagramRef.current.groupTemplate = groupTemplate ?? null;
  }, [groupTemplate]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
};

export interface PaletteProps {
  /** GoJS-compatible: palette data templates. */
  templates?: Template[];
  /** GoJS-compatible: node template applied to the palette's internal diagram. */
  nodeTemplate?: Panel | null;
  /** GoJS-compatible: link template applied to the palette's internal diagram. */
  linkTemplate?: Panel | null;
  className?: string;
  style?: React.CSSProperties;
}

/** A React component that renders a palette of draggable templates. */
export const Palette: React.FC<PaletteProps> = ({
  templates = [],
  nodeTemplate,
  linkTemplate,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<GoPalette | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-once effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const palette = new GoPalette(container, undefined, templates);
    paletteRef.current = palette;
    return () => {
      paletteRef.current = null;
      container.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    paletteRef.current?.setTemplates(templates);
  }, [templates]);

  useEffect(() => {
    const palette = paletteRef.current;
    if (palette) palette.getDiagram().nodeTemplate = nodeTemplate ?? null;
  }, [nodeTemplate]);

  useEffect(() => {
    const palette = paletteRef.current;
    if (palette) palette.getDiagram().linkTemplate = linkTemplate ?? null;
  }, [linkTemplate]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
};

export interface OverviewProps {
  /** GoJS-compatible: the diagram this overview observes. */
  observed: GoDiagram;
  className?: string;
  style?: React.CSSProperties;
}

/** A React component that renders an overview of a diagram. */
export const Overview: React.FC<OverviewProps> = ({ observed, className, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<GoOverview | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-once effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const overview = new GoOverview(container, observed);
    overviewRef.current = overview;
    return () => {
      overviewRef.current = null;
      container.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    if (overviewRef.current) overviewRef.current.observed = observed;
  }, [observed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
};

export interface ReactDiagramProps {
  /**
   * Called once, on mount, to construct the `Diagram` (templates, tools,
   * listeners — whatever the app needs) *before* it has a div: `<ReactDiagram>`
   * attaches it afterward via `diagram.div =`. Matches `gojs-react`'s
   * `ReactDiagram` factory shape, so existing `initDiagram` functions port
   * by only changing the import.
   */
  initDiagram: () => GoDiagram;
  /** GoJS-compatible: initial/updated node data. */
  nodeDataArray?: NodeData[];
  /** GoJS-compatible: initial/updated link data. */
  linkDataArray?: LinkData[];
  /**
   * Accepted for `gojs-react` prop-shape compatibility, but inert:
   * graphojs's `Model` has no `modelData` (shared, model-wide data)
   * concept to apply it to.
   */
  modelData?: Record<string, unknown>;
  /**
   * When true, `nodeDataArray`/`linkDataArray` prop changes are NOT
   * synced to the model automatically — the app manages the model itself
   * (e.g. via transactions on the instance from `ref.getDiagram()`),
   * matching `gojs-react`'s advanced/incremental-update mode. When
   * false/omitted (the default), changing these props replaces
   * `diagram.model` with a freshly-built one — a full resync, not
   * `gojs-react`'s finer-grained incremental `IncrementalData` diff.
   */
  skipsDiagramUpdate?: boolean;
  /** GoJS-compatible: called whenever the diagram's model changes. */
  onModelChange?: (event: ChangedEvent) => void;
  divClassName?: string;
  style?: React.CSSProperties;
}

export interface ReactDiagramRef {
  /** GoJS-compatible: the underlying `Diagram`, once mounted (else `null`). */
  getDiagram(): GoDiagram | null;
}

/**
 * A React component matching `gojs-react`'s `ReactDiagram` shape (a
 * factory prop plus `ref.getDiagram()`), for porting existing `gojs-react`
 * code by only changing the import — as an alternative to this module's
 * own `<Diagram>`, which instead takes `nodeTemplate`/`linkTemplate` as
 * declarative props.
 */
export const ReactDiagram = forwardRef<ReactDiagramRef, ReactDiagramProps>(function ReactDiagram(
  {
    initDiagram,
    nodeDataArray,
    linkDataArray,
    skipsDiagramUpdate,
    onModelChange,
    divClassName,
    style,
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<GoDiagram | null>(null);
  const modelListenerRef = useRef<((event: ChangedEvent) => void) | null>(null);

  useImperativeHandle(ref, () => ({
    getDiagram: () => diagramRef.current,
  }));

  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-once effect; initDiagram is a factory, called once by design (matches gojs-react)
  useEffect(() => {
    const diagram = initDiagram();
    diagramRef.current = diagram;
    if (containerRef.current) diagram.div = containerRef.current;

    if (nodeDataArray || linkDataArray) {
      diagram.model = new GoGraphLinksModel({ nodeDataArray, linkDataArray });
    }

    return () => {
      diagram.destroy();
      diagramRef.current = null;
    };
  }, []);

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;
    if (modelListenerRef.current) diagram.removeModelChangedListener(modelListenerRef.current);
    if (!onModelChange) {
      modelListenerRef.current = null;
      return;
    }
    const listener = (event: ChangedEvent): void => onModelChange(event);
    modelListenerRef.current = listener;
    diagram.addModelChangedListener(listener);
  }, [onModelChange]);

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram || skipsDiagramUpdate) return;
    diagram.model = new GoGraphLinksModel({ nodeDataArray, linkDataArray });
  }, [nodeDataArray, linkDataArray, skipsDiagramUpdate]);

  return (
    <div
      ref={containerRef}
      className={divClassName}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
});

export const version: string = '1.6.0';
