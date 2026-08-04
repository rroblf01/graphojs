import React, { useEffect, useRef } from 'react';
import {
  Diagram as GoDiagram,
  Panel,
  GraphLinksModel,
  Palette as GoPalette,
  Overview as GoOverview,
  type Template,
} from 'graphojs';

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
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<GoDiagram | null>(null);

  // Create / destroy the diagram
  // biome-ignore lint/correctness/useExhaustiveDependencies: mount-once effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const diagram = new GoDiagram({ div: container });
    diagramRef.current = diagram;
    initDiagram?.(diagram);
    onDiagramInit?.(diagram);
    return () => {
      diagram.destroy();
      diagramRef.current = null;
    };
  }, []);

  // Sync props
  useEffect(() => {
    if (model && diagramRef.current) diagramRef.current.model = model;
  }, [model]);

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
  className?: string;
  style?: React.CSSProperties;
}

/** A React component that renders a palette of draggable templates. */
export const Palette: React.FC<PaletteProps> = ({ templates = [], className, style }) => {
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

export const version: string = '0.1.0';
