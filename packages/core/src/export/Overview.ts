import { Diagram } from '../diagram/Diagram.ts';
import { LayerNames } from '../layer/Layer.ts';
import { Group } from '../parts/Group.ts';
import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import type { Part } from '../parts/Part.ts';

/**
 * An overview shows a scaled-down view of the entire diagram.
 * Clicking or dragging on the overview pans the main diagram.
 */
export class Overview {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private diagram: Diagram;
  private width = 200;
  private height = 150;
  private isDragging = false;

  constructor(
    container: HTMLElement,
    diagram?: Diagram,
    options?: { width?: number; height?: number },
  ) {
    if (diagram) {
      this.diagram = diagram;
    } else {
      // GoJS-compatible: create an internal diagram when none is observed yet
      this.diagram = new Diagram({ div: container as HTMLDivElement });
    }
    this.width = options?.width ?? 200;
    this.height = options?.height ?? 150;

    // Container styling
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.border = '1px solid #ccc';
    container.style.background = '#ffffff';
    // Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.canvas.style.display = 'block';
    this.canvas.style.cursor = 'crosshair';
    container.appendChild(this.canvas);

    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context');
    this.ctx = ctx;

    this.setupEvents();
    this.render();
  }

  /** Get the overview canvas element. */
  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  /** GoJS-compatible: Get the observed diagram. */
  get observed(): Diagram {
    return this.diagram;
  }

  /** GoJS-compatible: Set the diagram this overview observes. */
  set observed(value: Diagram) {
    this.diagram = value;
    this.render();
  }

  /** Set up mouse events for panning. */
  private setupEvents(): void {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.handlePan(e);
    });
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        this.handlePan(e);
      }
    });
    this.canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });
  }

  /** Handle panning the main diagram to the clicked position. */
  private handlePan(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / this.width;
    const ny = (e.clientY - rect.top) / this.height;

    const bounds = this.getContentBounds();
    const centerX = bounds.x + nx * bounds.width;
    const centerY = bounds.y + ny * bounds.height;

    const viewport = this.diagram.getViewport();
    const newX = centerX - viewport.width / 2;
    const newY = centerY - viewport.height / 2;
    this.diagram.setViewport(newX, newY, viewport.scale);
  }

  /** Get the content bounds of the diagram. */
  private getContentBounds(): { x: number; y: number; width: number; height: number } {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const layer of this.diagram.getLayers()) {
      for (const part of layer.parts) {
        if (!part.visible) continue;
        minX = Math.min(minX, part.bounds.x);
        minY = Math.min(minY, part.bounds.y);
        maxX = Math.max(maxX, part.bounds.right);
        maxY = Math.max(maxY, part.bounds.bottom);
      }
    }

    if (minX === Infinity) {
      return { x: 0, y: 0, width: 100, height: 100 };
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }

  /** Render the overview. */
  render(): void {
    const bounds = this.getContentBounds();
    const scaleX = this.width / bounds.width;
    const scaleY = this.height / bounds.height;
    const scale = Math.min(scaleX, scaleY);
    const offsetX = (this.width - bounds.width * scale) / 2 - bounds.x * scale;
    const offsetY = (this.height - bounds.height * scale) / 2 - bounds.y * scale;

    this.ctx.save();
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.translate(offsetX, offsetY);
    this.ctx.scale(scale, scale);

    // Render parts
    for (const layer of this.diagram.getLayers()) {
      if (layer.name === LayerNames.Grid) continue;
      for (const part of layer.parts) {
        if (!part.visible) continue;
        this.renderPart(part);
      }
    }

    this.ctx.restore();
  }

  private renderPart(part: Part): void {
    if (part instanceof Node) {
      this.ctx.fillStyle = part.fill;
      this.ctx.strokeStyle = part.stroke;
      this.ctx.lineWidth = part.strokeWidth;
      const { x, y, width, height } = part.bounds;
      switch (part.shape) {
        case 'ellipse':
          this.ctx.beginPath();
          this.ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
          this.ctx.fill();
          this.ctx.stroke();
          break;
        default:
          this.ctx.fillRect(x, y, width, height);
          this.ctx.strokeRect(x, y, width, height);
          break;
      }
    } else if (part instanceof Group) {
      const { x, y, width, height } = part.bounds;
      this.ctx.fillStyle = part.fill;
      this.ctx.strokeStyle = part.stroke;
      this.ctx.lineWidth = part.strokeWidth;
      this.ctx.fillRect(x, y, width, height);
      this.ctx.strokeRect(x, y, width, height);
    } else if (part instanceof Link) {
      this.ctx.strokeStyle = part.stroke;
      this.ctx.lineWidth = part.strokeWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(part.fromPort.x, part.fromPort.y);
      this.ctx.lineTo(part.toPort.x, part.toPort.y);
      this.ctx.stroke();
    }
  }

  /** Destroy the overview and clean up. */
  destroy(): void {
    this.canvas.remove();
  }
}

/** Create an overview for a diagram. */
export function createOverview(
  container: HTMLElement,
  diagram: Diagram,
  options?: { width?: number; height?: number },
): Overview {
  return new Overview(container, diagram, options);
}
