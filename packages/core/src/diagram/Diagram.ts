import type { Rect } from '../geometry/Rect.ts';
import { Rect as RectClass } from '../geometry/Rect.ts';
import type { ChangedEvent } from '../model/Model.ts';
import type { NodeKey } from '../model/Model.ts';
import { GraphLinksModel } from '../model/GraphLinksModel.ts';
import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import { Canvas2DRenderer } from '../render/Canvas2DRenderer.ts';
import type { Renderer } from '../render/Renderer.ts';

export interface DiagramOptions {
  /** The container element for the diagram. */
  div: HTMLDivElement;
  /** Initial scale. Default: 1 */
  initialScale?: number;
  /** Minimum scale for zoom. Default: 0.1 */
  minScale?: number;
  /** Maximum scale for zoom. Default: 10 */
  maxScale?: number;
  /** Grid size in pixels. Default: 20 */
  gridSize?: number;
  /** Show grid background. Default: true */
  showGrid?: boolean;
  /** Background color. Default: '#ffffff' */
  backgroundColor?: string;
}

/**
 * A diagram that renders nodes and links on a canvas.
 */
export class Diagram {
  private container: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private renderer: Renderer;
  private model: GraphLinksModel;
  private parts: Map<NodeKey, Node | Link> = new Map();
  private nodes: Map<NodeKey, Node> = new Map();
  private links: Map<NodeKey, Link> = new Map();

  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;
  private minScale: number;
  private maxScale: number;
  private gridSize: number;
  private showGrid: boolean;
  private backgroundColor: string;

  private isDirty = true;
  private animationFrameId: number | null = null;
  private isPanning = false;
  private panStartX = 0;
  private panStartY = 0;
  private panOffsetX = 0;
  private panOffsetY = 0;

  private selectedParts: Set<NodeKey> = new Set();

  constructor(options: DiagramOptions) {
    this.container = options.div;
    this.minScale = options.minScale ?? 0.1;
    this.maxScale = options.maxScale ?? 10;
    this.gridSize = options.gridSize ?? 20;
    this.showGrid = options.showGrid ?? true;
    this.backgroundColor = options.backgroundColor ?? '#ffffff';

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.container.appendChild(this.canvas);

    // Create renderer
    this.renderer = new Canvas2DRenderer(this.canvas);

    // Create model
    this.model = new GraphLinksModel();

    // Set initial scale
    this.scale = options.initialScale ?? 1;

    // Set up event listeners
    this.setupEventListeners();

    // Start render loop
    this.startRenderLoop();
  }

  /** Set up DOM event listeners. */
  private setupEventListeners(): void {
    this.canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      this.renderer.resize();
      this.invalidate();
    });
    resizeObserver.observe(this.container);

    // Model change listener
    this.model.addChangedListener(this.handleModelChange.bind(this));
  }

  /** Handle model changes. */
  private handleModelChange(_event: ChangedEvent): void {
    this.syncPartsFromModel();
    this.invalidate();
  }

  /** Sync visual parts from the model. */
  private syncPartsFromModel(): void {
    // Remove parts that no longer exist in model
    for (const [key, part] of this.parts) {
      if (part instanceof Node && !this.model.containsNode(key)) {
        this.parts.delete(key);
        this.nodes.delete(key);
      } else if (part instanceof Link) {
        const linkData = this.model
          .getLinkDataArray()
          .find((l) => this.model.getLinkKey(l) === key);
        if (!linkData) {
          this.parts.delete(key);
          this.links.delete(key);
        }
      }
    }

    // Add/update nodes
    for (const nodeData of this.model.getNodeDataArray()) {
      const key = this.model.getNodeKey(nodeData);
      let node = this.nodes.get(key);
      if (!node) {
        const x = (nodeData.x as number) ?? 0;
        const y = (nodeData.y as number) ?? 0;
        const width = (nodeData.width as number) ?? 100;
        const height = (nodeData.height as number) ?? 50;
        node = Node.fromPosAndSize(key, x, y, width, height);
        node.label = (nodeData.label as string) ?? '';
        node.fill = (nodeData.fill as string) ?? '#cccccc';
        node.stroke = (nodeData.stroke as string) ?? '#333333';
        this.parts.set(key, node);
        this.nodes.set(key, node);
      }
    }

    // Add/update links
    for (const linkData of this.model.getLinkDataArray()) {
      const linkKey = this.model.getLinkKey(linkData);
      if (linkKey === undefined) continue;

      let link = this.links.get(linkKey);
      if (!link) {
        link = new Link(linkKey, linkData.from, linkData.to);
        this.parts.set(linkKey, link);
        this.links.set(linkKey, link);
      }

      // Update link ports based on node positions
      const fromNode = this.nodes.get(linkData.from);
      const toNode = this.nodes.get(linkData.to);
      if (fromNode && toNode) {
        link.fromPort = fromNode.center;
        link.toPort = toNode.center;
        link.updateBounds();
      }
    }
  }

  /** Handle mouse wheel for zooming. */
  private handleWheel(e: WheelEvent): void {
    e.preventDefault();

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate diagram coordinates before zoom
    const diagramX = mouseX / this.scale + this.offsetX;
    const diagramY = mouseY / this.scale + this.offsetY;

    // Apply zoom
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.scale * zoomFactor));

    // Adjust offset to keep mouse position fixed
    this.offsetX = diagramX - mouseX / newScale;
    this.offsetY = diagramY - mouseY / newScale;
    this.scale = newScale;

    this.invalidate();
  }

  /** Handle mouse down for panning. */
  private handleMouseDown(e: MouseEvent): void {
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      // Middle button or shift+left button for panning
      this.isPanning = true;
      this.panStartX = e.clientX;
      this.panStartY = e.clientY;
      this.panOffsetX = this.offsetX;
      this.panOffsetY = this.offsetY;
      this.canvas.style.cursor = 'grabbing';
    } else if (e.button === 0) {
      // Left click for selection
      this.handleClick(e);
    }
  }

  /** Handle mouse move for panning. */
  private handleMouseMove(e: MouseEvent): void {
    if (this.isPanning) {
      const dx = (e.clientX - this.panStartX) / this.scale;
      const dy = (e.clientY - this.panStartY) / this.scale;
      this.offsetX = this.panOffsetX - dx;
      this.offsetY = this.panOffsetY - dy;
      this.invalidate();
    }
  }

  /** Handle mouse up. */
  private handleMouseUp(): void {
    this.isPanning = false;
    this.canvas.style.cursor = 'default';
  }

  /** Handle click for selection. */
  private handleClick(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert to diagram coordinates
    const diagramX = mouseX / this.scale + this.offsetX;
    const diagramY = mouseY / this.scale + this.offsetY;

    // Clear selection if not holding Ctrl/Cmd
    if (!e.ctrlKey && !e.metaKey) {
      this.clearSelection();
    }

    // Check if clicked on a node
    for (const [, node] of this.nodes) {
      if (node.containsPoint({ x: diagramX, y: diagramY })) {
        node.isSelected = true;
        this.selectedParts.add(node.key);
        this.invalidate();
        return;
      }
    }

    // Check if clicked on a link
    for (const [, link] of this.links) {
      if (link.containsPoint({ x: diagramX, y: diagramY })) {
        link.isSelected = true;
        this.selectedParts.add(link.key);
        this.invalidate();
        return;
      }
    }
  }

  /** Clear all selections. */
  clearSelection(): void {
    for (const key of this.selectedParts) {
      const part = this.parts.get(key);
      if (part) part.isSelected = false;
    }
    this.selectedParts.clear();
    this.invalidate();
  }

  /** Get selected parts. */
  getSelectedParts(): (Node | Link)[] {
    const result: (Node | Link)[] = [];
    for (const key of this.selectedParts) {
      const part = this.parts.get(key);
      if (part instanceof Node || part instanceof Link) {
        result.push(part);
      }
    }
    return result;
  }

  /** Invalidate the diagram (triggers re-render). */
  invalidate(): void {
    this.isDirty = true;
  }

  /** Start the render loop. */
  private startRenderLoop(): void {
    const render = () => {
      if (this.isDirty) {
        this.render();
        this.isDirty = false;
      }
      this.animationFrameId = requestAnimationFrame(render);
    };
    this.animationFrameId = requestAnimationFrame(render);
  }

  /** Stop the render loop. */
  private stopRenderLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /** Render the diagram. */
  private render(): void {
    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Set background
    this.renderer.save();
    this.renderer.setViewport(this.offsetX, this.offsetY, this.scale);

    // Clear with background color
    const ctx = (this.renderer as Canvas2DRenderer).getContext();
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(
      this.offsetX - width / this.scale,
      this.offsetY - height / this.scale,
      (width * 2) / this.scale,
      (height * 2) / this.scale,
    );

    // Render grid
    if (this.showGrid) {
      const viewport: Rect = new RectClass(
        this.offsetX - width / this.scale,
        this.offsetY - height / this.scale,
        (width * 2) / this.scale,
        (height * 2) / this.scale,
      );
      this.renderer.renderGrid(viewport, this.gridSize);
    }

    // Render links first (below nodes)
    for (const [, link] of this.links) {
      this.renderer.renderLink(link);
    }

    // Render nodes
    for (const [, node] of this.nodes) {
      this.renderer.renderNode(node);
    }

    this.renderer.restore();
  }

  /** Get the underlying model. */
  getModel(): GraphLinksModel {
    return this.model;
  }

  /** Get the renderer. */
  getRenderer(): Renderer {
    return this.renderer;
  }

  /** Get the current viewport. */
  getViewport(): { x: number; y: number; width: number; height: number; scale: number } {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: this.offsetX,
      y: this.offsetY,
      width: rect.width / this.scale,
      height: rect.height / this.scale,
      scale: this.scale,
    };
  }

  /** Set the viewport. */
  setViewport(x: number, y: number, scale?: number): void {
    this.offsetX = x;
    this.offsetY = y;
    if (scale !== undefined) {
      this.scale = Math.max(this.minScale, Math.min(this.maxScale, scale));
    }
    this.invalidate();
  }

  /** Zoom to fit all content. */
  zoomToFit(padding = 50): void {
    if (this.nodes.size === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const [, node] of this.nodes) {
      minX = Math.min(minX, node.bounds.x);
      minY = Math.min(minY, node.bounds.y);
      maxX = Math.max(maxX, node.bounds.right);
      maxY = Math.max(maxY, node.bounds.bottom);
    }

    const rect = this.canvas.getBoundingClientRect();
    const contentWidth = maxX - minX + padding * 2;
    const contentHeight = maxY - minY + padding * 2;

    const scaleX = rect.width / contentWidth;
    const scaleY = rect.height / contentHeight;
    this.scale = Math.max(this.minScale, Math.min(this.maxScale, Math.min(scaleX, scaleY)));

    this.offsetX = minX - padding + (rect.width / this.scale - contentWidth) / 2;
    this.offsetY = minY - padding + (rect.height / this.scale - contentHeight) / 2;

    this.invalidate();
  }

  /** Destroy the diagram and clean up resources. */
  destroy(): void {
    this.stopRenderLoop();
    this.canvas.removeEventListener('wheel', this.handleWheel.bind(this));
    this.canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.removeEventListener('mouseleave', this.handleMouseUp.bind(this));
    this.container.removeChild(this.canvas);
  }
}
