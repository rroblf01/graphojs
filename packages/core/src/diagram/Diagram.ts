import type { Rect } from '../geometry/Rect.ts';
import { Rect as RectClass } from '../geometry/Rect.ts';
import type { ChangedEvent } from '../model/Model.ts';
import type { NodeKey } from '../model/Model.ts';
import { GraphLinksModel } from '../model/GraphLinksModel.ts';
import { Group } from '../parts/Group.ts';
import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import { Canvas2DRenderer } from '../render/Canvas2DRenderer.ts';
import type { Renderer } from '../render/Renderer.ts';
import { Serializer, type DiagramJSON } from '../serialization/Serializer.ts';
import { ClickSelectingTool } from '../tool/ClickSelectingTool.ts';
import { DraggingTool } from '../tool/DraggingTool.ts';
import { PanningTool } from '../tool/PanningTool.ts';
import { ToolManager } from '../tool/ToolManager.ts';
import { ZoomingTool } from '../tool/ZoomingTool.ts';
import { UndoManager } from '../undo/UndoManager.ts';
import type { Command } from '../undo/Command.ts';

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
  private parts: Map<NodeKey, Node | Link | Group> = new Map();
  private nodes: Map<NodeKey, Node> = new Map();
  private groups: Map<NodeKey, Group> = new Map();
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

  private selectedParts: Set<NodeKey> = new Set();
  private toolManager: ToolManager;
  private undoManager: UndoManager;

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

    // Create tool manager and register tools
    this.toolManager = new ToolManager(this);
    this.registerDefaultTools();

    // Create undo manager
    this.undoManager = new UndoManager();

    // Set up event listeners
    this.setupEventListeners();

    // Start render loop
    this.startRenderLoop();
  }

  /** Register default interaction tools. */
  private registerDefaultTools(): void {
    this.toolManager.registerTool('clickSelecting', new ClickSelectingTool());
    this.toolManager.registerTool('dragging', new DraggingTool());
    this.toolManager.registerTool('panning', new PanningTool());
    this.toolManager.registerTool('zooming', new ZoomingTool());

    // Activate default tools
    this.toolManager.activateTool('clickSelecting');
    this.toolManager.activateTool('dragging');
    this.toolManager.activateTool('zooming');
  }

  /** Get the tool manager. */
  getToolManager(): ToolManager {
    return this.toolManager;
  }

  /** Get the undo manager. */
  getUndoManager(): UndoManager {
    return this.undoManager;
  }

  /** Execute an undoable command. */
  executeCommand(command: Command): void {
    this.undoManager.execute(command);
  }

  /** Undo the last command. */
  undo(): boolean {
    return this.undoManager.undo();
  }

  /** Redo the last undone command. */
  redo(): boolean {
    return this.undoManager.redo();
  }

  /** Set up DOM event listeners. */
  private setupEventListeners(): void {
    this.canvas.addEventListener('wheel', (e) => this.toolManager.handleMouseWheel(e), {
      passive: false,
    });
    this.canvas.addEventListener('mousedown', (e) => this.toolManager.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.toolManager.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.toolManager.handleMouseUp(e));
    this.canvas.addEventListener('mouseleave', (e) => this.toolManager.handleMouseUp(e));
    this.canvas.addEventListener('click', (e) => this.toolManager.handleClick(e));
    this.canvas.addEventListener('dblclick', (e) => this.toolManager.handleDoubleClick(e));

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
      } else if (part instanceof Group && !this.model.containsNode(key)) {
        this.parts.delete(key);
        this.groups.delete(key);
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

    // Add/update nodes and groups
    for (const nodeData of this.model.getNodeDataArray()) {
      const key = this.model.getNodeKey(nodeData);
      const isGroup = nodeData.isGroup === true;

      if (isGroup) {
        let group = this.groups.get(key);
        if (!group) {
          const x = (nodeData.x as number) ?? 0;
          const y = (nodeData.y as number) ?? 0;
          const width = (nodeData.width as number) ?? 100;
          const height = (nodeData.height as number) ?? 50;
          group = new Group(key, new RectClass(x, y, width, height));
          group.fill = (nodeData.fill as string) ?? '#f0f0f0';
          group.stroke = (nodeData.stroke as string) ?? '#666666';
          this.parts.set(key, group);
          this.groups.set(key, group);
        }

        // Sync members: add nodes/links whose groupKey matches this group
        for (const [memberKey, node] of this.nodes) {
          if (node.containingGroup === group) continue;
          const memberData = this.model.getNodeData(memberKey);
          if (memberData && memberData.group === key) {
            group.add(node);
          }
        }
      } else {
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

        // Add to parent group if specified
        const groupKey = nodeData.group;
        if (groupKey !== undefined) {
          const parentGroup = this.groups.get(groupKey as NodeKey);
          if (parentGroup && !parentGroup.contains(node)) {
            parentGroup.add(node);
          }
        }
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

      // Add to parent group if specified
      const groupKey = linkData.group;
      if (groupKey !== undefined) {
        const parentGroup = this.groups.get(groupKey as NodeKey);
        if (parentGroup && !parentGroup.contains(link)) {
          parentGroup.add(link);
        }
      }
    }
  }

  /** Find a part at the given diagram coordinates. */
  findPartAt(x: number, y: number): Node | Link | Group | null {
    // Check nodes first (on top)
    for (const [, node] of this.nodes) {
      if (node.containsPoint({ x, y })) {
        return node;
      }
    }

    // Check links
    for (const [, link] of this.links) {
      if (link.containsPoint({ x, y })) {
        return link;
      }
    }

    // Check groups (below nodes)
    for (const [, group] of this.groups) {
      if (group.containsPoint({ x, y })) {
        return group;
      }
    }

    return null;
  }

  /** Get a part by key. */
  getPart(key: NodeKey): Node | Link | Group | undefined {
    return this.parts.get(key);
  }

  /** Get mouse position in diagram coordinates. */
  getDiagramPoint(e: MouseEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    return {
      x: mouseX / this.scale + this.offsetX,
      y: mouseY / this.scale + this.offsetY,
    };
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
  getSelectedParts(): (Node | Link | Group)[] {
    const result: (Node | Link | Group)[] = [];
    for (const key of this.selectedParts) {
      const part = this.parts.get(key);
      if (part instanceof Node || part instanceof Link || part instanceof Group) {
        result.push(part);
      }
    }
    return result;
  }

  /** Set the model. */
  setModel(model: GraphLinksModel): void {
    this.model.removeChangedListener(this.handleModelChange.bind(this));
    this.model = model;
    this.model.addChangedListener(this.handleModelChange.bind(this));
    this.syncPartsFromModel();
    this.invalidate();
  }

  /** Serialize the diagram to JSON. */
  toJSON(): DiagramJSON {
    return Serializer.serialize(this);
  }

  /** Deserialize JSON into the diagram. */
  fromJSON(json: DiagramJSON): void {
    Serializer.deserialize(json, this);
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

    // Render groups (below everything)
    for (const [, group] of this.groups) {
      this.renderer.renderGroup(group);
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
    this.container.removeChild(this.canvas);
  }
}
