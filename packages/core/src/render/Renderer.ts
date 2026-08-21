import type { Rect } from '../geometry/Rect.ts';
import type { Group } from '../parts/Group.ts';
import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';
import type { Part } from '../parts/Part.ts';

/** Line styling extracted from a `diagram.grid` pattern Panel's `Shape` children. */
export interface GridPatternStyle {
  cellWidth?: number;
  cellHeight?: number;
  horizontal?: { stroke: string; strokeWidth: number };
  vertical?: { stroke: string; strokeWidth: number };
}

/**
 * Abstract renderer interface for diagram parts.
 */
export interface Renderer {
  /** Clear the entire canvas. */
  clear(): void;

  /** Resize the canvas to fit its container. */
  resize(): void;

  /** Render a node. */
  renderNode(node: Node): void;

  /** Render a link. */
  renderLink(link: Link): void;

  /** Render a group (background bounds). */
  renderGroup(group: Group): void;

  /** Render a bare decorative Part (not a Node/Link/Group) via its panel. */
  renderPart(part: Part): void;

  /** Render a selection rectangle. */
  renderSelectionRect(rect: Rect): void;

  /** Render a grid background, optionally styled by a `diagram.grid` pattern. */
  renderGrid(viewport: Rect, gridSize: number, pattern?: GridPatternStyle): void;

  /** Save the current canvas state. */
  save(): void;

  /** Restore the previously saved canvas state. */
  restore(): void;

  /** Set the viewport (pan/zoom). */
  setViewport(x: number, y: number, scale: number): void;

  /** Get the current scale. */
  getScale(): number;

  /** Get the current offset. */
  getOffset(): { x: number; y: number };

  /** Convert screen coordinates to diagram coordinates. */
  screenToDiagram(screenX: number, screenY: number): { x: number; y: number };

  /** Convert diagram coordinates to screen coordinates. */
  diagramToScreen(diagramX: number, diagramY: number): { x: number; y: number };

  /** Get the underlying canvas element. */
  getCanvas(): HTMLCanvasElement;

  /** Register a node's bounds for link routing computation. */
  setNodeBounds(key: string | number, bounds: Rect): void;

  /** Clear all registered node bounds. */
  clearNodeBounds(): void;
}
