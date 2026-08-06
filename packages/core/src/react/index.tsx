import type React from 'react';
import { useEffect, useRef } from 'react';
import {
  Diagram as GoDiagram,
  type Panel,
  type GraphLinksModel,
  Palette as GoPalette,
  Overview as GoOverview,
  type Template,
  type DiagramEvent,
  type DiagramEventType,
  type ChangedEvent,
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
    // biome-ignore lint/correctness/useExhaustiveDependencies: mount-once effect
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
    // biome-ignore lint/correctness/useExhaustiveDependencies: mount-once effect
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

export const version: string = '0.2.0';
