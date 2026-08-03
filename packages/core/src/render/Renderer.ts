import type { Rect } from '../geometry/Rect.ts';
import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';

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

  /** Render a selection rectangle. */
  renderSelectionRect(rect: Rect): void;

  /** Render a grid background. */
  renderGrid(viewport: Rect, gridSize: number): void;

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
}
