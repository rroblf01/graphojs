import type { Rect } from '../geometry/Rect.ts';
import { Rect as RectClass } from '../geometry/Rect.ts';
import type { Group } from '../parts/Group.ts';
import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';
import type { Renderer } from './Renderer.ts';
import type { Panel } from '../panel/Panel.ts';

/**
 * Canvas 2D renderer for diagram parts.
 */
export class Canvas2DRenderer implements Renderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;
  private devicePixelRatio = 1;
  private dirtyRects: RectClass[] = [];
  private useDirtyRects = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context');
    this.ctx = ctx;
    this.devicePixelRatio = globalThis.devicePixelRatio || 1;
    this.setupHiDPI();
  }

  /** Set up HiDPI rendering. */
  private setupHiDPI(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * this.devicePixelRatio;
    this.canvas.height = rect.height * this.devicePixelRatio;
    this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
  }

  /** Resize the canvas to fit its container. */
  resize(): void {
    this.setupHiDPI();
  }

  /** Get the canvas element. */
  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  /** Get the rendering context. */
  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  clear(): void {
    if (this.useDirtyRects && this.dirtyRects.length > 0) {
      // Only clear the dirty regions
      for (const rect of this.dirtyRects) {
        this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
      }
      this.dirtyRects = [];
      return;
    }
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);
  }

  /** Enable dirty-rectangle rendering. */
  enableDirtyRects(): void {
    this.useDirtyRects = true;
  }

  /** Disable dirty-rectangle rendering (full clear each frame). */
  disableDirtyRects(): void {
    this.useDirtyRects = false;
    this.dirtyRects = [];
  }

  /** Check whether dirty-rectangle rendering is enabled. */
  isDirtyRectEnabled(): boolean {
    return this.useDirtyRects;
  }

  /** Add a dirty rectangle in diagram coordinates (converted to screen space). */
  markDirty(x: number, y: number, width: number, height: number): void {
    if (!this.useDirtyRects) return;

    // Convert to screen coordinates
    const sx = (x - this.offsetX) * this.scale;
    const sy = (y - this.offsetY) * this.scale;
    const sw = width * this.scale;
    const sh = height * this.scale;

    this.dirtyRects.push(new RectClass(sx, sy, sw, sh));
  }

  /** Mark an entire part's bounds as dirty. */
  markDirtyRect(bounds: Rect): void {
    this.markDirty(bounds.x, bounds.y, bounds.width, bounds.height);
  }

  /** Get the number of pending dirty rectangles. */
  get dirtyRectCount(): number {
    return this.dirtyRects.length;
  }

  /** Clear all pending dirty rectangles without clearing the canvas. */
  clearDirtyRects(): void {
    this.dirtyRects = [];
  }

  renderNode(node: Node): void {
    if (!node.visible) return;

    this.ctx.save();
    this.ctx.globalAlpha = node.opacity;

    const { x, y, width, height } = node.bounds;

    // If the node has a panel, render it instead of the flat representation
    const panel = node.panel;
    if (panel) {
      panel.setPosition(0, 0);
      panel.setActualSize(width, height);
      panel.draw(this.ctx, x, y, width, height);
    } else {
      // Fill
      this.ctx.fillStyle = node.fill;
      this.ctx.strokeStyle = node.stroke;
      this.ctx.lineWidth = node.strokeWidth;

      switch (node.shape) {
        case 'ellipse':
          this.renderEllipse(x, y, width, height);
          break;
        case 'roundedRect':
          this.renderRoundedRect(x, y, width, height, node.cornerRadius);
          break;
        default:
          this.ctx.fillRect(x, y, width, height);
          this.ctx.strokeRect(x, y, width, height);
          break;
      }

      // Label
      if (node.label) {
        this.renderLabel(
          node.label,
          x + width / 2,
          y + height / 2,
          node.labelColor,
          node.labelFont,
        );
      }
    }

    // Selection highlight
    if (node.isSelected) {
      this.ctx.strokeStyle = '#2196f3';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([4, 4]);
      this.ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
      this.ctx.setLineDash([]);
    }

    this.ctx.restore();
  }

  /** Render a panel at the given position and size. */
  renderPanel(panel: Panel, x: number, y: number, width: number, height: number): void {
    panel.draw(this.ctx, x, y, width, height);
  }

  private renderEllipse(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy, width / 2, height / 2, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  private renderRoundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ): void {
    this.ctx.beginPath();
    this.ctx.roundRect(x, y, width, height, radius);
    this.ctx.fill();
    this.ctx.stroke();
  }

  private renderLabel(text: string, x: number, y: number, color: string, font: string): void {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(text, x, y);
  }

  renderLink(link: Link): void {
    if (!link.visible) return;

    this.ctx.save();
    this.ctx.globalAlpha = link.opacity;
    this.ctx.strokeStyle = link.stroke;
    this.ctx.lineWidth = link.strokeWidth;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';

    const points = link.pathPoints.length > 0 ? link.pathPoints : [link.fromPort, link.toPort];

    this.strokePath(points);

    // Arrowhead at the target end
    if (link.arrowhead !== 'none' && points.length >= 2) {
      this.renderArrowhead(link, points);
    }

    // Selection highlight
    if (link.isSelected) {
      this.ctx.strokeStyle = '#2196f3';
      this.ctx.lineWidth = link.strokeWidth + 2;
      this.ctx.setLineDash([4, 4]);
      this.strokePath(points);
      this.ctx.setLineDash([]);
    }

    // Link label
    if (link.label) {
      const mid = this.midPoint(points);
      this.renderLabel(link.label, mid.x, mid.y, link.labelColor, link.labelFont);
    }

    this.ctx.restore();
  }

  private renderArrowhead(link: Link, points: Array<{ x: number; y: number }>): void {
    const last = points[points.length - 1];
    const prev = points[points.length - 2];
    if (!last || !prev) return;

    // Direction of the last segment
    const dx = last.x - prev.x;
    const dy = last.y - prev.y;
    const len = Math.hypot(dx, dy);
    if (len === 0) return;

    const ux = dx / len;
    const uy = dy / len;
    const size = link.arrowheadSize;
    const tipX = last.x;
    const tipY = last.y;

    this.ctx.save();
    this.ctx.fillStyle = link.stroke;
    this.ctx.strokeStyle = link.stroke;
    this.ctx.lineWidth = 1;

    switch (link.arrowhead) {
      case 'circle': {
        this.ctx.beginPath();
        this.ctx.arc(tipX, tipY, size / 2, 0, 2 * Math.PI);
        this.ctx.fill();
        break;
      }
      case 'diamond': {
        this.ctx.beginPath();
        this.ctx.moveTo(tipX + ux * size, tipY + uy * size);
        this.ctx.lineTo(tipX - uy * (size / 2), tipY + ux * (size / 2));
        this.ctx.lineTo(tipX - ux * size, tipY - uy * size);
        this.ctx.lineTo(tipX + uy * (size / 2), tipY - ux * (size / 2));
        this.ctx.closePath();
        this.ctx.fill();
        break;
      }
      case 'openArrow': {
        this.ctx.beginPath();
        this.ctx.moveTo(tipX - ux * size + uy * size * 0.5, tipY - uy * size - ux * size * 0.5);
        this.ctx.lineTo(tipX, tipY);
        this.ctx.lineTo(tipX - ux * size - uy * size * 0.5, tipY - uy * size + ux * size * 0.5);
        this.ctx.stroke();
        break;
      }
      default: {
        this.ctx.beginPath();
        this.ctx.moveTo(tipX, tipY);
        this.ctx.lineTo(tipX - ux * size + uy * (size / 2), tipY - uy * size - ux * (size / 2));
        this.ctx.lineTo(tipX - ux * size - uy * (size / 2), tipY - uy * size + ux * (size / 2));
        this.ctx.closePath();
        this.ctx.fill();
        break;
      }
    }

    this.ctx.restore();
  }

  private midPoint(points: Array<{ x: number; y: number }>): { x: number; y: number } {
    if (points.length === 0) return { x: 0, y: 0 };
    if (points.length === 1) {
      const p = points[0];
      return p ? { x: p.x, y: p.y } : { x: 0, y: 0 };
    }

    // Find total path length
    let total = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) continue;
      total += Math.hypot(b.x - a.x, b.y - a.y);
    }

    // Walk to the midpoint
    let half = total / 2;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (!a || !b) continue;
      const segLen = Math.hypot(b.x - a.x, b.y - a.y);
      if (half <= segLen) {
        const t = half / segLen;
        return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      }
      half -= segLen;
    }

    const last = points[points.length - 1];
    return last ? { x: last.x, y: last.y } : { x: 0, y: 0 };
  }

  private strokePath(points: Array<{ x: number; y: number }>): void {
    if (points.length === 0) return;
    const first = points[0];
    if (!first) return;

    this.ctx.beginPath();
    this.ctx.moveTo(first.x, first.y);
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      if (p) this.ctx.lineTo(p.x, p.y);
    }
    this.ctx.stroke();
  }

  renderGroup(group: Group): void {
    if (!group.visible) return;

    const { x, y, width, height } = group.bounds;

    this.ctx.save();
    this.ctx.globalAlpha = group.opacity;

    // Fill background
    this.ctx.fillStyle = group.fill;
    this.ctx.strokeStyle = group.stroke;
    this.ctx.lineWidth = group.strokeWidth;
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeRect(x, y, width, height);

    // Selection highlight
    if (group.isSelected) {
      this.ctx.strokeStyle = '#2196f3';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([4, 4]);
      this.ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
      this.ctx.setLineDash([]);
    }

    this.ctx.restore();
  }

  renderSelectionRect(rect: Rect): void {
    this.ctx.save();
    this.ctx.strokeStyle = '#2196f3';
    this.ctx.fillStyle = 'rgba(33, 150, 243, 0.1)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]);
    this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    this.ctx.setLineDash([]);
    this.ctx.restore();
  }

  renderGrid(viewport: Rect, gridSize: number): void {
    this.ctx.save();
    this.ctx.strokeStyle = '#e0e0e0';
    this.ctx.lineWidth = 0.5;

    const startX = Math.floor(viewport.x / gridSize) * gridSize;
    const startY = Math.floor(viewport.y / gridSize) * gridSize;
    const endX = viewport.x + viewport.width;
    const endY = viewport.y + viewport.height;

    for (let x = startX; x <= endX; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, viewport.y);
      this.ctx.lineTo(x, viewport.y + viewport.height);
      this.ctx.stroke();
    }

    for (let y = startY; y <= endY; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(viewport.x, y);
      this.ctx.lineTo(viewport.x + viewport.width, y);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  save(): void {
    this.ctx.save();
  }

  restore(): void {
    this.ctx.restore();
  }

  setViewport(x: number, y: number, scale: number): void {
    this.offsetX = x;
    this.offsetY = y;
    this.scale = scale;

    this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0);
    this.ctx.translate(-x, -y);
    this.ctx.scale(scale, scale);
  }

  getScale(): number {
    return this.scale;
  }

  getOffset(): { x: number; y: number } {
    return { x: this.offsetX, y: this.offsetY };
  }

  screenToDiagram(screenX: number, screenY: number): { x: number; y: number } {
    return {
      x: screenX / this.scale + this.offsetX,
      y: screenY / this.scale + this.offsetY,
    };
  }

  diagramToScreen(diagramX: number, diagramY: number): { x: number; y: number } {
    return {
      x: (diagramX - this.offsetX) * this.scale,
      y: (diagramY - this.offsetY) * this.scale,
    };
  }
}
