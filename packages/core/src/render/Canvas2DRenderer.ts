import type { Rect } from '../geometry/Rect.ts';
import { Rect as RectClass } from '../geometry/Rect.ts';
import type { Panel } from '../panel/Panel.ts';
import type { Group } from '../parts/Group.ts';
import type { Link } from '../parts/Link.ts';
import type { Node } from '../parts/Node.ts';
import type { Part } from '../parts/Part.ts';
import {
  computeLabelPosition,
  type RoutingObstacle,
  routeCurved,
  routeOrthogonal,
  routeOrthogonalAvoidingObstacles,
  routeStraight,
} from './LinkRouter.ts';
import { LinkPathCache } from './PerformanceCache.ts';
import { PathCache, TextMeasureCache } from './RenderCache.ts';
import type { GridPatternStyle, Renderer } from './Renderer.ts';
import { defaultSelectionStyle, type SelectionStyle } from './SelectionStyle.ts';

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
  private pathCache: PathCache = new PathCache();
  private textMeasureCache: TextMeasureCache = new TextMeasureCache();
  private linkPathCache: LinkPathCache = new LinkPathCache();

  /** Invalidate all cached link paths (e.g. when nodes move). */
  invalidateLinkPaths(): void {
    this.linkPathCache.invalidate();
  }
  private labelsVisible = true;
  private nodeBoundsMap = new Map<string | number, RectClass>();
  private selectionStyle: SelectionStyle = defaultSelectionStyle;

  /** Set whether node labels should be rendered (used for LOD). */
  setLabelsVisible(value: boolean): void {
    this.labelsVisible = value;
  }

  /** Check whether labels are currently visible. */
  getLabelsVisible(): boolean {
    return this.labelsVisible;
  }

  /** Set the colors used for selection highlights and resize handles. */
  setSelectionStyle(style: SelectionStyle): void {
    this.selectionStyle = style;
  }

  /** Register a node's bounds for link routing computation. */
  setNodeBounds(key: string | number, bounds: RectClass): void {
    this.nodeBoundsMap.set(key, bounds);
  }

  /** Clear all registered node bounds. */
  clearNodeBounds(): void {
    this.nodeBoundsMap.clear();
  }

  /** Get node bounds for link routing, falling back to a default rect. */
  private getNodeBounds(key: string | number): RectClass {
    return this.nodeBoundsMap.get(key) ?? new RectClass(0, 0, 0, 0);
  }

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
    // Re-read the DPR on every setup (resize/zoom/monitor changes can alter it).
    this.devicePixelRatio = globalThis.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = Math.max(1, Math.round(rect.width * this.devicePixelRatio));
    this.canvas.height = Math.max(1, Math.round(rect.height * this.devicePixelRatio));
    this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0);
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

  /** Get the path cache. */
  getPathCache(): PathCache {
    return this.pathCache;
  }

  /** Get the text measure cache. */
  getTextMeasureCache(): TextMeasureCache {
    return this.textMeasureCache;
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

    // Apply rotation around the node center
    if (node.angle !== 0) {
      const cx = x + width / 2;
      const cy = y + height / 2;
      this.ctx.translate(cx, cy);
      this.ctx.rotate((node.angle * Math.PI) / 180);
      this.ctx.translate(-cx, -cy);
    }

    // If the node has a panel, render it instead of the flat representation
    const panel = node.panel;
    if (panel) {
      panel.setPosition(0, 0);
      panel.setActualSize(width, height);
      panel.draw(this.ctx, x, y, width, height);
      // After layout, refresh declarative port positions
      node.updatePortSpots();
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
      if (node.label && this.labelsVisible) {
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
      this.ctx.strokeStyle = this.selectionStyle.selectionColor;
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([4, 4]);
      this.ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
      this.ctx.setLineDash([]);
      this.renderSelectionHandles(x, y, width, height);
    }

    this.ctx.restore();
  }

  /** Render resize handles and rotation handle for a selected node. */
  renderSelectionHandles(x: number, y: number, width: number, height: number): void {
    const size = 8;
    const half = size / 2;

    this.ctx.fillStyle = this.selectionStyle.handleFill;
    this.ctx.strokeStyle = this.selectionStyle.selectionColor;
    this.ctx.lineWidth = 1;

    const corners: Array<[number, number]> = [
      [x, y],
      [x + width, y],
      [x, y + height],
      [x + width, y + height],
    ];
    for (const [hx, hy] of corners) {
      this.ctx.fillRect(hx - half, hy - half, size, size);
      this.ctx.strokeRect(hx - half, hy - half, size, size);
    }

    // Edge handles
    const edges: Array<[number, number]> = [
      [x + width / 2, y],
      [x + width / 2, y + height],
      [x, y + height / 2],
      [x + width, y + height / 2],
    ];
    for (const [hx, hy] of edges) {
      this.ctx.fillRect(hx - half, hy - half, size, size);
      this.ctx.strokeRect(hx - half, hy - half, size, size);
    }

    // Rotation handle (above the top-center)
    const rx = x + width / 2;
    const ry = y - 20;
    this.ctx.beginPath();
    this.ctx.arc(rx, ry, 5, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    // Stem connecting rotation handle to the node
    this.ctx.beginPath();
    this.ctx.moveTo(rx, ry + 5);
    this.ctx.lineTo(rx, y);
    this.ctx.stroke();
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

    // Check cache first
    let points = link.pathPoints;
    if (points.length === 0) {
      // Get all node bounds as obstacles (for avoidObstacles routing)
      const obstacles: RoutingObstacle[] = [];
      if (link.avoidObstacles && link.routing === 'orthogonal') {
        for (const [key, bounds] of this.nodeBoundsMap) {
          if (key !== link.fromKey && key !== link.toKey) {
            obstacles.push(bounds);
          }
        }
      }

      // Try cache
      const cached = this.linkPathCache.get(
        link.fromKey,
        link.toKey,
        link.routing,
        link.corner,
        link.fromPort,
        link.toPort,
        link.avoidObstacles,
        link.jumpOver,
        obstacles,
      );

      if (cached) {
        points = cached;
      } else {
        // Compute routing from port positions and node bounds
        const fromNode = this.getNodeBounds(link.fromKey);
        const toNode = this.getNodeBounds(link.toKey);

        if (link.avoidObstacles && link.routing === 'orthogonal') {
          points = routeOrthogonalAvoidingObstacles(
            link.fromPort,
            link.toPort,
            fromNode,
            toNode,
            obstacles,
            link.corner,
          );
        } else {
          switch (link.routing) {
            case 'orthogonal':
              points = routeOrthogonal(link.fromPort, link.toPort, fromNode, toNode, link.corner);
              break;
            case 'curved':
              points = routeCurved(link.fromPort, link.toPort, fromNode, toNode);
              break;
            default:
              points = routeStraight(link.fromPort, link.toPort);
          }
        }

        // Cache the computed path
        this.linkPathCache.set(
          link.fromKey,
          link.toKey,
          link.routing,
          link.corner,
          link.fromPort,
          link.toPort,
          points,
          link.avoidObstacles,
          link.jumpOver,
          obstacles,
        );
      }
      link.setPathPoints(points);
    }

    this.strokePath(points);

    // Arrowhead at the target end
    if (link.arrowhead !== 'none' && points.length >= 2) {
      this.renderArrowhead(link, points);
    }

    // Selection highlight
    if (link.isSelected) {
      this.ctx.strokeStyle = this.selectionStyle.selectionColor;
      this.ctx.lineWidth = link.strokeWidth + 2;
      this.ctx.setLineDash([4, 4]);
      this.strokePath(points);
      this.ctx.setLineDash([]);
    }

    // Link label with positioning
    if (link.label) {
      const labelPos = computeLabelPosition(
        points,
        link.labelSegmentIndex,
        link.labelOffset,
        link.labelSide,
        link.labelSegmentFraction,
      );
      this.renderLabel(link.label, labelPos.x, labelPos.y, link.labelColor, link.labelFont);
    }

    // Render the link's visual tree (from linkTemplate) if present
    if (link.panel && points.length > 0) {
      this.renderLinkPanel(link, points);
    }

    this.ctx.restore();
  }

  /** Render a link's panel (linkTemplate) centered on the path midpoint. */
  private renderLinkPanel(link: Link, points: Array<{ x: number; y: number }>): void {
    const panel = link.panel;
    if (!panel) return;

    // Compute the midpoint of the path
    let midX = 0;
    let midY = 0;
    const total = points.length;
    if (total >= 2) {
      const midIndex = Math.floor((total - 1) / 2);
      const a = points[midIndex];
      const b = points[midIndex + 1];
      if (a && b) {
        midX = (a.x + b.x) / 2;
        midY = (a.y + b.y) / 2;
      }
    } else if (total === 1) {
      const p = points[0];
      if (p) {
        midX = p.x;
        midY = p.y;
      }
    }

    const natural = panel.measure();
    const panelW = Math.max(1, natural.width || 40);
    const panelH = Math.max(1, natural.height || 20);

    const x = midX - panelW / 2;
    const y = midY - panelH / 2;

    panel.setPosition(x, y);
    panel.setActualSize(panelW, panelH);
    panel.draw(this.ctx, x, y, panelW, panelH);
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

    // If the group has a panel (from groupTemplate), render it instead of
    // the flat representation — same as renderNode.
    const panel = group.panel;
    if (panel) {
      panel.setPosition(0, 0);
      panel.setActualSize(width, height);
      panel.draw(this.ctx, x, y, width, height);
    } else {
      // Fill background
      this.ctx.fillStyle = group.fill;
      this.ctx.strokeStyle = group.stroke;
      this.ctx.lineWidth = group.strokeWidth;
      this.ctx.fillRect(x, y, width, height);
      this.ctx.strokeRect(x, y, width, height);
    }

    // Selection highlight
    if (group.isSelected) {
      this.ctx.strokeStyle = this.selectionStyle.selectionColor;
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([4, 4]);
      this.ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
      this.ctx.setLineDash([]);
    }

    this.ctx.restore();
  }

  /**
   * GoJS-compatible: render a bare decorative `Part` (not a Node/Link/
   * Group) — e.g. a frame or watermark added via `Diagram.add()` outside
   * the model. Only draws if it has a `panel` (from a template); a
   * decorative Part with no panel has nothing to render.
   */
  renderPart(part: Part): void {
    if (!part.visible) return;

    const { x, y, width, height } = part.bounds;
    const panel = part.panel;
    if (!panel) return;

    this.ctx.save();
    this.ctx.globalAlpha = part.opacity;

    if (part.angle !== 0) {
      const cx = x + width / 2;
      const cy = y + height / 2;
      this.ctx.translate(cx, cy);
      this.ctx.rotate((part.angle * Math.PI) / 180);
      this.ctx.translate(-cx, -cy);
    }

    panel.setPosition(0, 0);
    panel.setActualSize(width, height);
    panel.draw(this.ctx, x, y, width, height);

    this.ctx.restore();
  }

  renderSelectionRect(rect: Rect): void {
    this.ctx.save();
    this.ctx.strokeStyle = this.selectionStyle.selectionColor;
    this.ctx.fillStyle = 'rgba(33, 150, 243, 0.1)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 4]);
    this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    this.ctx.setLineDash([]);
    this.ctx.restore();
  }

  renderGrid(viewport: Rect, gridSize: number, pattern?: GridPatternStyle): void {
    this.ctx.save();

    const stepX = pattern?.cellWidth ?? gridSize;
    const stepY = pattern?.cellHeight ?? gridSize;
    const vertical = pattern?.vertical ?? { stroke: '#e0e0e0', strokeWidth: 0.5 };
    const horizontal = pattern?.horizontal ?? { stroke: '#e0e0e0', strokeWidth: 0.5 };

    const startX = Math.floor(viewport.x / stepX) * stepX;
    const startY = Math.floor(viewport.y / stepY) * stepY;
    const endX = viewport.x + viewport.width;
    const endY = viewport.y + viewport.height;

    this.ctx.strokeStyle = vertical.stroke;
    this.ctx.lineWidth = vertical.strokeWidth;
    for (let x = startX; x <= endX; x += stepX) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, viewport.y);
      this.ctx.lineTo(x, viewport.y + viewport.height);
      this.ctx.stroke();
    }

    this.ctx.strokeStyle = horizontal.stroke;
    this.ctx.lineWidth = horizontal.strokeWidth;
    for (let y = startY; y <= endY; y += stepY) {
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
    this.ctx.scale(scale, scale);
    this.ctx.translate(-x, -y);
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
