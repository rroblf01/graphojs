import type { Rect } from '../geometry/Rect.ts';
import { Rect as RectClass } from '../geometry/Rect.ts';
import type { ChangedEvent, NodeData, LinkData } from '../model/Model.ts';
import type { NodeKey } from '../model/Model.ts';
import { GraphLinksModel } from '../model/GraphLinksModel.ts';
import { type Layer, createDefaultLayers, LayerNames } from '../layer/Layer.ts';
import { Group } from '../parts/Group.ts';
import { Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import type { ContextMenu } from '../export/ContextMenu.ts';
import { Canvas2DRenderer } from '../render/Canvas2DRenderer.ts';
import type { Renderer } from '../render/Renderer.ts';
import { Serializer, type DiagramJSON } from '../serialization/Serializer.ts';
import { ClickSelectingTool } from '../tool/ClickSelectingTool.ts';
import { DragSelectingTool } from '../tool/DragSelectingTool.ts';
import { DraggingTool } from '../tool/DraggingTool.ts';
import { LinkingTool } from '../tool/LinkingTool.ts';
import { PanningTool } from '../tool/PanningTool.ts';
import { RelinkingTool } from '../tool/RelinkingTool.ts';
import { ResizingTool } from '../tool/ResizingTool.ts';
import { RotatingTool } from '../tool/RotatingTool.ts';
import { TextEditingTool } from '../tool/TextEditingTool.ts';
import { ToolManager } from '../tool/ToolManager.ts';
import { ZoomingTool } from '../tool/ZoomingTool.ts';
import { UndoManager } from '../undo/UndoManager.ts';
import type { Command } from '../undo/Command.ts';
import { AnimationManager } from '../animation/AnimationManager.ts';
import { CommandHandler } from '../command/CommandHandler.ts';
import { VirtualizationManager } from '../spatial/VirtualizationManager.ts';
import { PartPool } from '../spatial/PartPool.ts';
import { QuadTree } from '../spatial/QuadTree.ts';
import { DiagramEvents, type DiagramEvent, type DiagramEventType } from './DiagramEvents.ts';
import { PNGExporter } from '../export/PNGExporter.ts';
import { printDiagram } from '../export/PrintExporter.ts';
import { TooltipManager } from '../export/TooltipManager.ts';
import { LayerCache } from '../render/LayerCache.ts';
import type { Part } from '../parts/Part.ts';

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
  /** Snap parts to the grid when moving. Default: false */
  snapToGrid?: boolean;
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
  private snapToGrid: boolean;
  private backgroundColor: string;

  private isDirty = true;
  private animationFrameId: number | null = null;

  private selectedParts: Set<NodeKey> = new Set();
  private toolManager: ToolManager;
  private undoManager: UndoManager;
  private layers: Layer[];
  private contextMenu: ContextMenu | null = null;
  private animationManager: AnimationManager = new AnimationManager();
  private commandHandler: CommandHandler;
  private virtualization: VirtualizationManager | null = null;
  private partPool: PartPool = new PartPool();
  private resizeObserver: ResizeObserver | null = null;
  private modelChangeListener: ((event: ChangedEvent) => void) | null = null;
  private keyDownListener: ((event: KeyboardEvent) => void) | null = null;
  private tempLink: { from: { x: number; y: number }; to: { x: number; y: number } } | null = null;
  private selectionRect: { x: number; y: number; width: number; height: number } | null = null;
  private events: DiagramEvents = new DiagramEvents();
  private layerCache: LayerCache | null = null;
  private layerCacheEnabled = false;
  private tooltipManager: TooltipManager | null = null;
  private backBuffer: HTMLCanvasElement | null = null;
  private backBufferEnabled = false;
  private hitIndex: QuadTree<Part> | null = null;
  private hitIndexDirty = true;
  private lodLabelThreshold = 0.3;
  private lodEnabled = false;
  private canvasListeners: Array<
    [string, EventListenerOrEventListenerObject, (AddEventListenerOptions | boolean)?]
  > = [];
  private _isDestroyed = false;

  constructor(options: DiagramOptions) {
    this.container = options.div;
    this.minScale = options.minScale ?? 0.1;
    this.maxScale = options.maxScale ?? 10;
    this.gridSize = options.gridSize ?? 20;
    this.showGrid = options.showGrid ?? true;
    this.snapToGrid = options.snapToGrid ?? false;
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

    // Create command handler
    this.commandHandler = new CommandHandler(this);

    // Create layers
    this.layers = createDefaultLayers();

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
    this.toolManager.registerTool('textEditing', new TextEditingTool());
    this.toolManager.registerTool('linking', new LinkingTool());
    this.toolManager.registerTool('relinking', new RelinkingTool());
    this.toolManager.registerTool('resizing', new ResizingTool());
    this.toolManager.registerTool('rotating', new RotatingTool());
    this.toolManager.registerTool('dragSelecting', new DragSelectingTool());

    // Activate default tools
    this.toolManager.activateTool('clickSelecting');
    this.toolManager.activateTool('dragging');
    this.toolManager.activateTool('zooming');
    this.toolManager.activateTool('resizing');
    this.toolManager.activateTool('rotating');
  }

  /** Get the tool manager. */
  getToolManager(): ToolManager {
    return this.toolManager;
  }

  /** Get the undo manager. */
  getUndoManager(): UndoManager {
    return this.undoManager;
  }

  /** Get the animation manager. */
  getAnimationManager(): AnimationManager {
    return this.animationManager;
  }

  /** Get the command handler. */
  getCommandHandler(): CommandHandler {
    return this.commandHandler;
  }

  /** Add a diagram event listener. */
  addDiagramListener(type: DiagramEventType, handler: (event: DiagramEvent) => void): void {
    this.events.addListener(type, handler);
  }

  /** Add a listener for all diagram events. */
  addAnyDiagramListener(handler: (event: DiagramEvent) => void): void {
    this.events.addAnyListener(handler);
  }

  /** Remove a diagram event listener. */
  removeDiagramListener(type: DiagramEventType, handler: (event: DiagramEvent) => void): boolean {
    return this.events.removeListener(type, handler);
  }

  /** Remove a listener from all diagram events. */
  removeAnyDiagramListener(handler: (event: DiagramEvent) => void): void {
    this.events.removeAnyListener(handler);
  }

  /** Check whether there are listeners for a diagram event type. */
  hasDiagramListeners(type: DiagramEventType): boolean {
    return this.events.hasListeners(type);
  }

  /** Fire a diagram event. */
  fireDiagramEvent(
    type: DiagramEventType,
    part?: Part | null,
    data?: Record<string, unknown>,
  ): void {
    this.events.fire(this, type, part, data);
  }

  /** Enable virtualization (viewport culling) with a world bounds. */
  enableVirtualization(bounds: Rect): void {
    this.virtualization = new VirtualizationManager(bounds);
    this.virtualization.isEnabled = true;
    this.rebuildSpatialIndex();
    this.invalidate();
  }

  /** Disable virtualization. */
  disableVirtualization(): void {
    this.virtualization = null;
    this.invalidate();
  }

  /** Check whether virtualization is enabled. */
  isVirtualizationEnabled(): boolean {
    return this.virtualization?.isEnabled ?? false;
  }

  /** Get the virtualization manager, or null if disabled. */
  getVirtualizationManager(): VirtualizationManager | null {
    return this.virtualization;
  }

  /** Get the part pool. */
  getPartPool(): PartPool {
    return this.partPool;
  }

  /** Rebuild the spatial index from current parts. */
  private rebuildSpatialIndex(): void {
    if (!this.virtualization) return;

    let minX = 0;
    let minY = 0;
    let maxX = 1000;
    let maxY = 1000;
    if (this.nodes.size > 0) {
      for (const [, node] of this.nodes) {
        minX = Math.min(minX, node.bounds.x);
        minY = Math.min(minY, node.bounds.y);
        maxX = Math.max(maxX, node.bounds.right);
        maxY = Math.max(maxY, node.bounds.bottom);
      }
    }
    const world = new RectClass(minX, minY, maxX - minX, maxY - minY);
    const parts: (Node | Link | Group)[] = [
      ...this.nodes.values(),
      ...this.links.values(),
      ...this.groups.values(),
    ];
    this.virtualization.rebuild(parts, world);
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

  /** Set a context menu for this diagram. */
  setContextMenu(menu: ContextMenu | null): void {
    this.contextMenu = menu;
  }

  /** Get the current context menu. */
  getContextMenu(): ContextMenu | null {
    return this.contextMenu;
  }

  /** Handle a contextmenu (right-click) event. */
  private handleContextMenu(e: MouseEvent): void {
    e.preventDefault();
    if (this.contextMenu) {
      this.contextMenu.handleContextMenu(e);
    }
  }

  /** Handle a double-click event (triggers text editing). */
  private handleDoubleClick(e: MouseEvent): void {
    e.preventDefault();
    const textEditing = this.toolManager.getTool('textEditing');
    if (textEditing instanceof TextEditingTool) {
      textEditing.doDoubleClick(e);
    }
  }

  /** Handle a click event. */
  private handleCanvasClick(e: MouseEvent): void {
    this.toolManager.handleClick(e);
    // Fire background click if the click was on empty space
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    if (!part) {
      this.fireDiagramEvent('BackgroundSingleClicked', null, { x: point.x, y: point.y });
    }
  }

  /** Handle keyboard shortcuts. */
  private handleKeyDown(e: KeyboardEvent): void {
    const target = e.target as HTMLElement;
    // Don't intercept when editing text
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }

    const ctrlOrCmd = e.ctrlKey || e.metaKey;

    if (ctrlOrCmd && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        this.commandHandler.redo();
      } else {
        this.commandHandler.undo();
      }
    } else if (ctrlOrCmd && e.key === 'y') {
      e.preventDefault();
      this.commandHandler.redo();
    } else if (ctrlOrCmd && e.key === 'c') {
      e.preventDefault();
      this.commandHandler.copySelection();
    } else if (ctrlOrCmd && e.key === 'x') {
      e.preventDefault();
      this.commandHandler.cutSelection();
    } else if (ctrlOrCmd && e.key === 'v') {
      e.preventDefault();
      this.commandHandler.pasteClipboard();
    } else if (ctrlOrCmd && e.key === 'a') {
      e.preventDefault();
      this.commandHandler.selectAll();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      this.commandHandler.deleteSelection();
    }
  }

  /** Set up DOM event listeners. */
  private setupEventListeners(): void {
    this.addCanvasListener('wheel', (e) => this.toolManager.handleMouseWheel(e as WheelEvent), {
      passive: false,
    });
    this.addCanvasListener('mousedown', (e) => this.toolManager.handleMouseDown(e as MouseEvent));
    this.addCanvasListener('mousemove', (e) => {
      this.toolManager.handleMouseMove(e as MouseEvent);
      this.tooltipManager?.handleMouseMove(e as MouseEvent);
    });
    this.addCanvasListener('mouseup', (e) => this.toolManager.handleMouseUp(e as MouseEvent));
    this.addCanvasListener('mouseleave', (e) => {
      this.toolManager.handleMouseUp(e as MouseEvent);
      this.tooltipManager?.handleMouseLeave();
    });
    this.addCanvasListener('click', (e) => this.handleCanvasClick(e as MouseEvent));
    this.addCanvasListener('dblclick', (e) => this.handleDoubleClick(e as MouseEvent));
    this.addCanvasListener('contextmenu', (e) => this.handleContextMenu(e as MouseEvent));

    // Keyboard shortcuts
    this.keyDownListener = (e: KeyboardEvent) => this.handleKeyDown(e);
    document.addEventListener('keydown', this.keyDownListener);

    // Resize observer
    this.resizeObserver = new ResizeObserver(() => {
      this.renderer.resize();
      this.invalidate();
    });
    this.resizeObserver.observe(this.container);

    // Model change listener
    this.modelChangeListener = (event: ChangedEvent) => this.handleModelChange(event);
    this.model.addChangedListener(this.modelChangeListener);
  }

  /** Add a canvas event listener and track it for cleanup. */
  private addCanvasListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions | boolean,
  ): void {
    this.canvas.addEventListener(type, listener, options);
    this.canvasListeners.push([type, listener, options]);
  }

  /** Remove all canvas event listeners. */
  private removeCanvasListeners(): void {
    for (const [type, listener, options] of this.canvasListeners) {
      this.canvas.removeEventListener(type, listener, options);
    }
    this.canvasListeners = [];
  }

  /** Handle model changes. */
  private handleModelChange(event: ChangedEvent): void {
    // Incrementally sync only the changed part
    this.syncPartFromModelChange(event);
    this.invalidate();
    // Layer cache must be refreshed on model changes
    this.layerCache?.markAllDirty();
    this.fireDiagramEvent('ModelChanged', null, {
      changeType: event.type,
      propertyName: event.propertyName,
    });
  }

  /** Check whether a layer contains any selected parts. */
  private layerHasSelectedParts(layer: Layer): boolean {
    for (const part of layer.getVisibleParts()) {
      if (part.isSelected) return true;
    }
    return false;
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
          // Assign to layer
          const layerName = (nodeData.layer as string) ?? LayerNames.Default;
          const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
          if (layer) group.layer = layer;
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
          // Assign to layer
          const layerName = (nodeData.layer as string) ?? LayerNames.Default;
          const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
          if (layer) node.layer = layer;
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
        // Assign to layer
        const layerName = (linkData.layer as string) ?? LayerNames.Default;
        const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
        if (layer) link.layer = layer;
        this.parts.set(linkKey, link);
        this.links.set(linkKey, link);
      }

      // Link routing / ports / spots from model data
      const routing = linkData.routing;
      if (routing === 'orthogonal' || routing === 'curved') {
        link.routing = routing;
      }
      link.fromPortName = linkData.fromPort as string | undefined;
      link.toPortName = linkData.toPort as string | undefined;

      // Arrowhead and label
      const arrowhead = linkData.arrowhead;
      if (
        arrowhead === 'triangle' ||
        arrowhead === 'openArrow' ||
        arrowhead === 'diamond' ||
        arrowhead === 'circle' ||
        arrowhead === 'none'
      ) {
        link.arrowhead = arrowhead;
      }
      link.arrowheadSize = (linkData.arrowheadSize as number) ?? link.arrowheadSize;
      link.label = (linkData.label as string) ?? '';
      link.labelColor = (linkData.labelColor as string) ?? link.labelColor;
      link.labelFont = (linkData.labelFont as string) ?? link.labelFont;

      // Update link ports based on node positions and port connections
      const fromNode = this.nodes.get(linkData.from);
      const toNode = this.nodes.get(linkData.to);
      if (fromNode && toNode) {
        const fromPoint = fromNode.getConnectionPoint(
          toNode.center,
          linkData.fromPort as string | undefined,
        );
        const toPoint = toNode.getConnectionPoint(
          fromNode.center,
          linkData.toPort as string | undefined,
        );
        link.fromPort = fromPoint;
        link.toPort = toPoint;

        // Compute path points based on routing
        if (link.routing === 'orthogonal') {
          link.setPathPoints(computeOrthogonalPath(fromPoint, toPoint));
        } else if (link.routing === 'curved') {
          link.setPathPoints(computeCurvedPath(fromPoint, toPoint));
        } else {
          link.setPathPoints([fromPoint, toPoint]);
        }
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

    // Apply bindings to all parts
    for (const [key, part] of this.parts) {
      if (part.bindings.length > 0) {
        const nodeData = this.model.getNodeData(key);
        if (nodeData) {
          part.applyBindings(nodeData);
        }
      }
    }

    this.markHitIndexDirty();
  }

  /**
   * Incrementally sync parts from a single model change event.
   * This avoids re-syncing the entire model for each edit.
   */
  private syncPartFromModelChange(event: ChangedEvent): void {
    switch (event.type) {
      case 'node Added': {
        if (event.node) this.syncNodeFromModel(event.node);
        break;
      }
      case 'node Removed': {
        if (event.node) {
          const key = this.model.getNodeKey(event.node);
          this.removePartByKey(key);
        }
        break;
      }
      case 'property Changed': {
        if (event.node) this.syncNodeFromModel(event.node);
        break;
      }
      case 'link Added': {
        if (event.link) this.syncLinkFromModel(event.link);
        break;
      }
      case 'link Removed': {
        if (event.link) {
          const key = this.model.getLinkKey(event.link);
          if (key !== undefined) this.removePartByKey(key);
        }
        break;
      }
    }
  }

  /** Sync a single node data into its visual part (create if needed). */
  private syncNodeFromModel(nodeData: NodeData): void {
    const key = this.model.getNodeKey(nodeData);
    const isGroup = nodeData.isGroup === true;

    if (isGroup) {
      let group = this.groups.get(key);
      if (!group) {
        group = this.createGroup(nodeData);
      }
      this.updateGroupFromData(group, nodeData);
      this.syncGroupMembers(group);
      return;
    }

    let node = this.nodes.get(key);
    if (!node) {
      node = this.createNode(nodeData);
    }
    this.updateNodeFromData(node, nodeData);
  }

  /** Sync a single link data into its visual part (create if needed). */
  private syncLinkFromModel(linkData: LinkData): void {
    const linkKey = this.model.getLinkKey(linkData);
    if (linkKey === undefined) return;

    let link = this.links.get(linkKey);
    if (!link) {
      link = this.createLink(linkData);
    }
    this.updateLinkFromData(link, linkData);
  }

  private createNode(nodeData: NodeData): Node {
    const key = this.model.getNodeKey(nodeData);
    const x = (nodeData.x as number) ?? 0;
    const y = (nodeData.y as number) ?? 0;
    const width = (nodeData.width as number) ?? 100;
    const height = (nodeData.height as number) ?? 50;
    const node = Node.fromPosAndSize(key, x, y, width, height);
    const layerName = (nodeData.layer as string) ?? LayerNames.Default;
    const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
    if (layer) node.layer = layer;
    this.parts.set(key, node);
    this.nodes.set(key, node);
    this.fireDiagramEvent('PartAdded', node);
    this.markHitIndexDirty();
    return node;
  }

  private createGroup(nodeData: NodeData): Group {
    const key = this.model.getNodeKey(nodeData);
    const x = (nodeData.x as number) ?? 0;
    const y = (nodeData.y as number) ?? 0;
    const width = (nodeData.width as number) ?? 100;
    const height = (nodeData.height as number) ?? 50;
    const group = new Group(key, new RectClass(x, y, width, height));
    const layerName = (nodeData.layer as string) ?? LayerNames.Default;
    const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
    if (layer) group.layer = layer;
    this.parts.set(key, group);
    this.groups.set(key, group);
    this.fireDiagramEvent('PartAdded', group);
    this.markHitIndexDirty();
    return group;
  }

  private createLink(linkData: LinkData): Link {
    const linkKey = this.model.getLinkKey(linkData);
    const link = new Link(linkKey as NodeKey, linkData.from, linkData.to);
    const layerName = (linkData.layer as string) ?? LayerNames.Default;
    const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
    if (layer) link.layer = layer;
    this.parts.set(linkKey as NodeKey, link);
    this.links.set(linkKey as NodeKey, link);
    this.fireDiagramEvent('PartAdded', link);
    this.markHitIndexDirty();
    return link;
  }

  private updateNodeFromData(node: Node, nodeData: NodeData): void {
    // Update spatial index incrementally if built
    this.hitIndex?.remove(node);

    const { x, y, width, height } = this.nodeDataBounds(nodeData);
    node.bounds = new RectClass(x, y, width, height);
    node.label = (nodeData.label as string) ?? node.label;
    node.fill = (nodeData.fill as string) ?? node.fill;
    node.stroke = (nodeData.stroke as string) ?? node.stroke;
    node.angle = (nodeData.angle as number) ?? node.angle;

    // Add to parent group if specified
    const groupKey = nodeData.group;
    if (groupKey !== undefined) {
      const parentGroup = this.groups.get(groupKey as NodeKey);
      if (parentGroup && !parentGroup.contains(node)) {
        parentGroup.add(node);
      }
    }

    // Apply bindings
    if (node.bindings.length > 0) {
      node.applyBindings(nodeData);
    }
    this.hitIndex?.insertWithBounds(node.bounds, node);
    this.fireDiagramEvent('PartMoved', node, { x, y });
  }

  private updateGroupFromData(group: Group, nodeData: NodeData): void {
    const { x, y, width, height } = this.nodeDataBounds(nodeData);
    group.bounds = new RectClass(x, y, width, height);
    group.fill = (nodeData.fill as string) ?? group.fill;
    group.stroke = (nodeData.stroke as string) ?? group.stroke;
  }

  private updateLinkFromData(link: Link, linkData: LinkData): void {
    this.hitIndex?.remove(link);
    const routing = linkData.routing;
    if (routing === 'orthogonal' || routing === 'curved') {
      link.routing = routing;
    }
    link.fromPortName = linkData.fromPort as string | undefined;
    link.toPortName = linkData.toPort as string | undefined;

    const arrowhead = linkData.arrowhead;
    if (
      arrowhead === 'triangle' ||
      arrowhead === 'openArrow' ||
      arrowhead === 'diamond' ||
      arrowhead === 'circle' ||
      arrowhead === 'none'
    ) {
      link.arrowhead = arrowhead;
    }
    link.arrowheadSize = (linkData.arrowheadSize as number) ?? link.arrowheadSize;
    link.label = (linkData.label as string) ?? '';
    link.labelColor = (linkData.labelColor as string) ?? link.labelColor;
    link.labelFont = (linkData.labelFont as string) ?? link.labelFont;

    const fromNode = this.nodes.get(linkData.from);
    const toNode = this.nodes.get(linkData.to);
    if (fromNode && toNode) {
      const fromPoint = fromNode.getConnectionPoint(
        toNode.center,
        linkData.fromPort as string | undefined,
      );
      const toPoint = toNode.getConnectionPoint(
        fromNode.center,
        linkData.toPort as string | undefined,
      );
      link.fromPort = fromPoint;
      link.toPort = toPoint;

      if (link.routing === 'orthogonal') {
        link.setPathPoints(computeOrthogonalPath(fromPoint, toPoint));
      } else if (link.routing === 'curved') {
        link.setPathPoints(computeCurvedPath(fromPoint, toPoint));
      } else {
        link.setPathPoints([fromPoint, toPoint]);
      }
      link.updateBounds();
    }

    const groupKey = linkData.group;
    if (groupKey !== undefined) {
      const parentGroup = this.groups.get(groupKey as NodeKey);
      if (parentGroup && !parentGroup.contains(link)) {
        parentGroup.add(link);
      }
    }

    this.hitIndex?.insertWithBounds(link.bounds, link);
  }

  private syncGroupMembers(group: Group): void {
    for (const [memberKey, node] of this.nodes) {
      if (node.containingGroup === group) continue;
      const memberData = this.model.getNodeData(memberKey);
      if (memberData && memberData.group === group.key) {
        group.add(node);
      }
    }
  }

  private removePartByKey(key: NodeKey): void {
    const part = this.parts.get(key);
    if (!part) return;

    if (part instanceof Node) {
      this.nodes.delete(key);
    } else if (part instanceof Group) {
      this.groups.delete(key);
    } else if (part instanceof Link) {
      this.links.delete(key);
    }
    this.parts.delete(key);
    this.selectedParts.delete(key);
    this.fireDiagramEvent('PartRemoved', part);
    this.markHitIndexDirty();
  }

  private nodeDataBounds(nodeData: NodeData): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    return {
      x: (nodeData.x as number) ?? 0,
      y: (nodeData.y as number) ?? 0,
      width: (nodeData.width as number) ?? 100,
      height: (nodeData.height as number) ?? 50,
    };
  }

  /** Find a part at the given diagram coordinates. */
  findPartAt(x: number, y: number): Node | Link | Group | null {
    // Use spatial index for hit testing when there are many parts
    if (this.parts.size >= 50) {
      this.ensureHitIndex();
      if (this.hitIndex) {
        const candidates = this.hitIndex.queryRegion(new RectClass(x - 1, y - 1, 2, 2));
        // Nodes first (on top), then links, then groups
        for (const part of candidates) {
          if (part instanceof Node && part.shapeContainsPoint({ x, y })) return part;
        }
        for (const part of candidates) {
          if (part instanceof Link && part.containsPoint({ x, y })) return part;
        }
        for (const part of candidates) {
          if (part instanceof Group && part.containsPoint({ x, y })) return part;
        }
      }
    }

    // Fallback: linear scan (accurate for links/groups crossing the point)
    // Check nodes first (on top)
    for (const [, node] of this.nodes) {
      if (node.shapeContainsPoint({ x, y })) {
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

  /** Ensure the spatial hit index is built and up to date. */
  private ensureHitIndex(): void {
    if (!this.hitIndexDirty) return;

    // Compute world bounds
    let minX = 0;
    let minY = 0;
    let maxX = 1000;
    let maxY = 1000;
    if (this.parts.size > 0) {
      for (const [, part] of this.parts) {
        minX = Math.min(minX, part.bounds.x);
        minY = Math.min(minY, part.bounds.y);
        maxX = Math.max(maxX, part.bounds.right);
        maxY = Math.max(maxY, part.bounds.bottom);
      }
    }

    this.hitIndex = new QuadTree<Part>(
      new RectClass(minX, minY, maxX - minX || 100, maxY - minY || 100),
    );
    for (const [, part] of this.parts) {
      this.hitIndex.insertWithBounds(part.bounds, part);
    }
    this.hitIndexDirty = false;
  }

  /** Mark the spatial hit index as stale (called when parts change). */
  private markHitIndexDirty(): void {
    this.hitIndexDirty = true;
  }

  /** Get a part by key. */
  getPart(key: NodeKey): Node | Link | Group | undefined {
    return this.parts.get(key);
  }

  /** Show a temporary link preview (used by linking tools). */
  showTempLink(from: { x: number; y: number }, to: { x: number; y: number }): void {
    this.tempLink = { from, to };
    this.invalidate();
  }

  /** Hide the temporary link preview. */
  hideTempLink(): void {
    if (this.tempLink) {
      this.tempLink = null;
      this.invalidate();
    }
  }

  /** Get the current temporary link, or null. */
  getTempLink(): { from: { x: number; y: number }; to: { x: number; y: number } } | null {
    return this.tempLink;
  }

  /** Show a temporary rubber-band selection rectangle. */
  showSelectionRect(rect: { x: number; y: number; width: number; height: number }): void {
    this.selectionRect = rect;
    this.invalidate();
  }

  /** Hide the temporary selection rectangle. */
  hideSelectionRect(): void {
    if (this.selectionRect) {
      this.selectionRect = null;
      this.invalidate();
    }
  }

  /** Get the current selection rectangle, or null. */
  getSelectionRect(): { x: number; y: number; width: number; height: number } | null {
    return this.selectionRect;
  }

  /** Select all parts intersecting a rectangle. */
  selectPartsInRect(rect: { x: number; y: number; width: number; height: number }): void {
    for (const [, node] of this.nodes) {
      if (node.bounds.intersects(rect as unknown as RectClass)) {
        node.isSelected = true;
      }
    }
    for (const [, link] of this.links) {
      if (link.bounds.intersects(rect as unknown as RectClass)) {
        link.isSelected = true;
      }
    }
    this.invalidate();
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
    this.fireDiagramEvent('SelectionChanged', null);
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
    if (this.modelChangeListener) {
      this.model.removeChangedListener(this.modelChangeListener);
    }
    this.model = model;
    this.modelChangeListener = (event: ChangedEvent) => this.handleModelChange(event);
    this.model.addChangedListener(this.modelChangeListener);
    this.syncPartsFromModel();
    this.invalidate();
  }

  /** Get all layers. */
  getLayers(): readonly Layer[] {
    return this.layers;
  }

  /** Get a layer by name. */
  getLayer(name: string): Layer | undefined {
    return this.layers.find((l) => l.name === name);
  }

  /** Add a layer. */
  addLayer(layer: Layer): void {
    this.layers.push(layer);
    this.layers.sort((a, b) => a.zOrder - b.zOrder);
    this.invalidate();
  }

  /** Remove a layer by name. */
  removeLayer(name: string): boolean {
    const index = this.layers.findIndex((l) => l.name === name);
    if (index === -1) return false;
    const layer = this.layers[index];
    if (!layer) return false;
    // Move parts to Default layer
    const defaultLayer = this.getLayer(LayerNames.Default);
    for (const part of [...layer.parts]) {
      part.layer = defaultLayer ?? null;
    }
    this.layers.splice(index, 1);
    this.invalidate();
    return true;
  }

  /** Move a part to a layer by name. */
  moveToLayer(part: Node | Link | Group, layerName: string): void {
    const layer = this.getLayer(layerName);
    if (layer) {
      part.layer = layer;
      this.invalidate();
    }
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

  /** Enable layer caching (renders static layers to offscreen canvases). */
  enableLayerCaching(scale?: number): void {
    this.layerCacheEnabled = true;
    this.layerCache = new LayerCache(scale ?? (globalThis.devicePixelRatio || 1));
    this.invalidate();
  }

  /** Disable layer caching. */
  disableLayerCaching(): void {
    this.layerCacheEnabled = false;
    this.layerCache = null;
    this.invalidate();
  }

  /** Check whether layer caching is enabled. */
  isLayerCachingEnabled(): boolean {
    return this.layerCacheEnabled;
  }

  /** Enable hover tooltips for parts with a tooltip text. */
  enableTooltips(options?: { delay?: number; offset?: number; style?: string }): void {
    this.tooltipManager = new TooltipManager(this, options);
  }

  /** Disable hover tooltips. */
  disableTooltips(): void {
    this.tooltipManager?.destroy();
    this.tooltipManager = null;
  }

  /** Get the tooltip manager, or null if disabled. */
  getTooltipManager(): TooltipManager | null {
    return this.tooltipManager;
  }

  /** Enable double-buffered rendering (render offscreen then blit). */
  enableDoubleBuffering(): void {
    this.backBufferEnabled = true;
    this.invalidate();
  }

  /** Disable double-buffered rendering. */
  disableDoubleBuffering(): void {
    this.backBufferEnabled = false;
    this.backBuffer = null;
    this.invalidate();
  }

  /** Check whether double-buffered rendering is enabled. */
  isDoubleBufferingEnabled(): boolean {
    return this.backBufferEnabled;
  }

  /** Enable level-of-detail rendering (hides labels when zoomed out). */
  enableLOD(threshold?: number): void {
    this.lodEnabled = true;
    if (threshold !== undefined) this.lodLabelThreshold = threshold;
    this.invalidate();
  }

  /** Disable level-of-detail rendering. */
  disableLOD(): void {
    this.lodEnabled = false;
    this.invalidate();
  }

  /** Check whether LOD rendering is enabled. */
  isLODEnabled(): boolean {
    return this.lodEnabled;
  }

  /** Set the zoom threshold below which labels are hidden. */
  setLODLabelThreshold(threshold: number): void {
    this.lodLabelThreshold = threshold;
    this.invalidate();
  }

  /** Get the LOD label threshold. */
  getLODLabelThreshold(): number {
    return this.lodLabelThreshold;
  }

  /** Enable grid snapping for moved parts. */
  enableSnapToGrid(): void {
    this.snapToGrid = true;
  }

  /** Disable grid snapping. */
  disableSnapToGrid(): void {
    this.snapToGrid = false;
  }

  /** Check whether grid snapping is enabled. */
  isSnapToGridEnabled(): boolean {
    return this.snapToGrid;
  }

  /** Set the grid size used for snapping. */
  setGridSize(size: number): void {
    this.gridSize = Math.max(1, size);
    this.invalidate();
  }

  /** Get the grid size. */
  getGridSize(): number {
    return this.gridSize;
  }

  /** Snap a value to the nearest grid line. */
  snapValue(value: number): number {
    if (!this.snapToGrid) return value;
    return Math.round(value / this.gridSize) * this.gridSize;
  }

  /** Snap a coordinate to the nearest grid line. */
  snapPoint(point: { x: number; y: number }): { x: number; y: number } {
    if (!this.snapToGrid) return { x: point.x, y: point.y };
    return { x: this.snapValue(point.x), y: this.snapValue(point.y) };
  }

  /** Check whether labels should be shown at the current zoom level. */
  private shouldShowLabels(): boolean {
    if (!this.lodEnabled) return true;
    return this.scale >= this.lodLabelThreshold;
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

    if (this.backBufferEnabled) {
      // Double buffering: render to an offscreen canvas, then blit
      if (!this.backBuffer) {
        this.backBuffer = document.createElement('canvas');
      }
      const dpr = globalThis.devicePixelRatio || 1;
      if (
        this.backBuffer.width !== Math.round(width * dpr) ||
        this.backBuffer.height !== Math.round(height * dpr)
      ) {
        this.backBuffer.width = Math.round(width * dpr);
        this.backBuffer.height = Math.round(height * dpr);
      }
      const offRenderer = new Canvas2DRenderer(this.backBuffer);
      this.renderTo(offRenderer, width, height);
      const ctx = (this.renderer as Canvas2DRenderer).getContext();
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(this.backBuffer, 0, 0, width, height);
      return;
    }

    this.renderTo(this.renderer, width, height);
  }

  /** Render the diagram content to a given renderer. */
  private renderTo(target: Renderer, width: number, height: number): void {
    // Set background
    target.save();
    target.setViewport(this.offsetX, this.offsetY, this.scale);

    // Apply LOD label visibility
    if (target instanceof Canvas2DRenderer) {
      target.setLabelsVisible(this.shouldShowLabels());
    }

    // Clear with background color
    const ctx = (target as Canvas2DRenderer).getContext();
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
      target.renderGrid(viewport, this.gridSize);
    }

    // Cull parts if virtualization is enabled
    const culledParts = new Set<Part>();
    if (this.virtualization?.isEnabled) {
      const viewportRect = VirtualizationManager.createViewport(
        this.offsetX,
        this.offsetY,
        width / this.scale,
        height / this.scale,
        100,
      );
      const visible = this.virtualization.cull(viewportRect);
      for (const part of visible) {
        culledParts.add(part);
      }
    }

    // Render parts in layer order (lowest z-order first)
    for (const layer of this.layers) {
      if (layer.name === LayerNames.Grid) continue;
      if (layer.partCount === 0) continue;

      ctx.save();
      ctx.globalAlpha = layer.opacity;

      // Use cached layer rendering when enabled and the layer is cacheable
      if (this.layerCacheEnabled && this.layerCache) {
        const cacheable = !this.layerHasSelectedParts(layer) && this.tempLink === null;
        if (cacheable) {
          const cached = this.layerCache.getLayer(layer);
          if (cached) {
            ctx.drawImage(cached.canvas, cached.x, cached.y, cached.width, cached.height);
            ctx.restore();
            continue;
          }
        } else {
          this.layerCache.markDirty(layer.name);
        }
      }

      const visibleParts = layer
        .getVisibleParts()
        .filter((part) => culledParts.size === 0 || culledParts.has(part));
      // Render in z-order (ascending: lower zOrder first)
      visibleParts.sort((a, b) => a.zOrder - b.zOrder);

      for (const part of visibleParts) {
        if (part instanceof Group) {
          target.renderGroup(part);
        } else if (part instanceof Link) {
          target.renderLink(part);
        } else if (part instanceof Node) {
          target.renderNode(part);
        }
      }

      ctx.restore();
    }

    // Render temporary link preview (on top of everything)
    if (this.tempLink) {
      ctx.save();
      ctx.strokeStyle = '#2196f3';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(this.tempLink.from.x, this.tempLink.from.y);
      ctx.lineTo(this.tempLink.to.x, this.tempLink.to.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    // Render rubber-band selection rectangle
    if (this.selectionRect) {
      const r = this.selectionRect;
      ctx.save();
      ctx.fillStyle = 'rgba(33, 150, 243, 0.1)';
      ctx.strokeStyle = '#2196f3';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.fillRect(r.x, r.y, r.width, r.height);
      ctx.strokeRect(r.x, r.y, r.width, r.height);
      ctx.setLineDash([]);
      ctx.restore();
    }

    target.restore();
  }

  /** Get the underlying model. */
  getModel(): GraphLinksModel {
    return this.model;
  }

  /** Get the renderer. */
  getRenderer(): Renderer {
    return this.renderer;
  }

  /**
   * Generate a raster image (canvas) of the diagram content.
   */
  makeImage(options?: {
    background?: string;
    padding?: number;
    scale?: number;
  }): HTMLCanvasElement {
    return new PNGExporter(options).makeCanvas(this);
  }

  /**
   * Print the diagram by rendering it to an image and opening the
   * browser's print dialog.
   */
  print(options?: {
    title?: string;
    background?: string;
    padding?: number;
    scale?: number;
    fitToPage?: boolean;
  }): void {
    printDiagram(this, options);
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
      // Layer cache must be re-rendered at the new scale
      this.layerCache?.setScale(this.scale * (globalThis.devicePixelRatio || 1));
      // Update LOD label visibility immediately
      if (this.renderer instanceof Canvas2DRenderer) {
        this.renderer.setLabelsVisible(this.shouldShowLabels());
      }
    }
    this.invalidate();
    this.fireDiagramEvent('ViewportChanged', null, { x, y, scale: this.scale });
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
    if (this._isDestroyed) return;
    this._isDestroyed = true;

    this.stopRenderLoop();

    // Stop animations
    this.animationManager.cancelAll();

    // Remove canvas event listeners
    this.removeCanvasListeners();

    // Remove keyboard listener
    if (this.keyDownListener) {
      document.removeEventListener('keydown', this.keyDownListener);
      this.keyDownListener = null;
    }

    // Disconnect resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    // Remove model change listener
    if (this.modelChangeListener) {
      this.model.removeChangedListener(this.modelChangeListener);
      this.modelChangeListener = null;
    }

    // Destroy context menu
    if (this.contextMenu) {
      this.contextMenu.destroy();
      this.contextMenu = null;
    }

    // Clear undo history
    this.undoManager.clear();

    // Clear parts and caches
    this.parts.clear();
    this.nodes.clear();
    this.groups.clear();
    this.links.clear();
    this.selectedParts.clear();
    this.virtualization?.clear();
    this.partPool.clear();
    this.layerCache = null;

    // Remove canvas from DOM
    this.container.removeChild(this.canvas);
  }

  /** Check whether the diagram has been destroyed. */
  isDestroyed(): boolean {
    return this._isDestroyed;
  }
}

/**
 * Compute an orthogonal (Manhattan-style) path between two points.
 * Produces a horizontal-vertical-horizontal or vertical-horizontal-vertical route.
 */
function computeOrthogonalPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
): Array<{ x: number; y: number }> {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (dx === 0 || dy === 0) {
    return [from, to];
  }

  // Route horizontally first, then vertically
  const midX = from.x + dx / 2;
  return [from, { x: midX, y: from.y }, { x: midX, y: to.y }, to];
}

/**
 * Compute a curved (bezier-like) path between two points.
 * Produces a set of interpolated points along a quadratic curve.
 */
function computeCurvedPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
): Array<{ x: number; y: number }> {
  const dx = to.x - from.x;
  const controlX = from.x + dx / 2;
  const controlY = from.y;

  const points: Array<{ x: number; y: number }> = [];
  const segments = 12;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const mt = 1 - t;
    const x = mt * mt * from.x + 2 * mt * t * controlX + t * t * to.x;
    const y = mt * mt * from.y + 2 * mt * t * controlY + t * t * to.y;
    points.push({ x, y });
  }
  return points;
}
