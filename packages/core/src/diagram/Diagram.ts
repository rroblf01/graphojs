import type { Rect } from '../geometry/Rect.ts';
import { Rect as RectClass } from '../geometry/Rect.ts';
import { Spot } from '../geometry/Spot.ts';
import type { ChangedEvent, NodeData, LinkData } from '../model/Model.ts';
import type { NodeKey } from '../model/Model.ts';
import { GraphLinksModel } from '../model/GraphLinksModel.ts';
import { type Layer, createDefaultLayers, LayerNames } from '../layer/Layer.ts';
import type { Layout } from '../layout/Layout.ts';
import { Group } from '../parts/Group.ts';
import { Link, type ArrowheadStyle } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import { Shape } from '../panel/Shape.ts';
import type { GraphObject } from '../panel/GraphObject.ts';
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
import { ModelTransactionCommand } from '../undo/ModelTransactionCommand.ts';
import type { Command } from '../undo/Command.ts';
import { AnimationManager } from '../animation/AnimationManager.ts';
import { CommandHandler } from '../command/CommandHandler.ts';
import { VirtualizationManager } from '../spatial/VirtualizationManager.ts';
import { PartPool } from '../spatial/PartPool.ts';
import { QuadTree } from '../spatial/QuadTree.ts';
import { DiagramEvents, type DiagramEvent, type DiagramEventType } from './DiagramEvents.ts';
import { PNGExporter } from '../export/PNGExporter.ts';
import { makeSvgElement } from '../export/SVGExporter.ts';
import { printDiagram } from '../export/PrintExporter.ts';
import { TooltipManager } from '../export/TooltipManager.ts';
import { LayerCache } from '../render/LayerCache.ts';
import type { Part } from '../parts/Part.ts';
import type { Panel } from '../panel/Panel.ts';

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
  /** GoJS-compatible: Whether the diagram can be modified. Default: true */
  isReadOnly?: boolean;
  /** GoJS-compatible: Whether the diagram is enabled. Default: true */
  isEnabled?: boolean;
  /** GoJS-compatible: Whether parts can be moved. Default: true */
  allowMove?: boolean;
  /** GoJS-compatible: Whether parts can be copied. Default: true */
  allowCopy?: boolean;
  /** GoJS-compatible: Whether parts can be deleted. Default: true */
  allowDelete?: boolean;
  /** GoJS-compatible: Whether parts can be dropped. Default: true */
  allowDrop?: boolean;
  /** GoJS-compatible: Whether zooming is allowed. Default: true */
  allowZoom?: boolean;
  /** GoJS-compatible: Whether horizontal scrolling is allowed. Default: true */
  allowHorizontalScroll?: boolean;
  /** GoJS-compatible: Whether vertical scrolling is allowed. Default: true */
  allowVerticalScroll?: boolean;
  /** GoJS-compatible: Scroll mode: 'document' or 'infinite'. Default: 'document' */
  scrollMode?: 'document' | 'infinite';
  /** GoJS-compatible: Initial content alignment spot. */
  initialContentAlignment?: Spot;
  /** GoJS-compatible: Content alignment offset. */
  initialContentAlignmentOffset?: { x: number; y: number };
}

/**
 * A diagram that renders nodes and links on a canvas.
 */
export class Diagram {
  // GoJS-compatible alignment constants
  static readonly AlignNone = 'None';
  static readonly AlignSpot = 'Spot';
  static readonly AlignMin = 'Min';
  static readonly AlignMax = 'Max';
  static readonly AlignScale = 'Scale';
  static readonly AlignFill = 'Fill';

  private container: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private renderer: Renderer;
  private _model: GraphLinksModel;
  private parts: Map<NodeKey, Node | Link | Group> = new Map();
  private nodes: Map<NodeKey, Node> = new Map();
  private groups: Map<NodeKey, Group> = new Map();
  private links: Map<NodeKey, Link> = new Map();

  private _scale = 1;
  private offsetX = 0;
  private offsetY = 0;
  private _padding = 0;
  private minScale: number;
  private maxScale: number;
  private gridSize: number;
  private showGrid: boolean;
  private snapToGrid: boolean;
  private backgroundColor: string;

  private isDirty = true;
  private animationFrameId: number | null = null;

  private selectedParts: Set<Part> = new Set();
  private _toolManager: ToolManager;
  private _undoManager: UndoManager;
  private _layers: Layer[] = [];
  private contextMenu: ContextMenu | null = null;
  private _animationManager: AnimationManager = new AnimationManager();
  private _commandHandler: CommandHandler;
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

  // GoJS-compatible interaction flags
  private _isReadOnly = false;
  private _allowMove = true;
  private _allowCopy = true;
  private _allowDelete = true;
  private _allowDrop = true;
  private _allowZoom = true;
  private _allowHorizontalScroll = true;
  private _allowVerticalScroll = true;
  private _isEnabled = true;
  private _isModified = false;
  private _scrollMode: 'document' | 'infinite' = 'document';
  private _initialContentAlignment: Spot | null = null;
  private _initialContentAlignmentOffset: { x: number; y: number } | null = null;
  private _allowTextEdit = true;
  private _allowLink = true;
  private _allowRelink = true;
  private _allowGroup = true;
  private _allowInsert = true;
  private _allowResize = true;
  private _allowRotate = true;
  private _allowArrange = true;
  private _maxSelectionCount = Infinity;
  private _transactionEvents: ChangedEvent[] | null = null;
  private _transactionName = '';
  private _contextMenuEl: HTMLElement | null = null;
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

  // Touch support state
  private touchState: {
    active: boolean;
    startDistance: number;
    startScale: number;
    startTouchX: number;
    startTouchY: number;
    lastTouchX: number;
    lastTouchY: number;
    startOffsetX: number;
    startOffsetY: number;
  } | null = null;

  // GoJS-compatible template properties
  private _nodeTemplate: Panel | null = null;
  private _linkTemplate: Panel | null = null;
  private _groupTemplate: Panel | null = null;
  private _nodeTemplateMap: Map<string, Panel> = new Map();
  private _linkTemplateMap: Map<string, Panel> = new Map();

  constructor(options: DiagramOptions | HTMLDivElement | string) {
    // GoJS-compatible: accept an element, a string div id, or an options object
    let resolvedOptions: DiagramOptions;
    if (typeof options === 'string') {
      const el = document.getElementById(options);
      if (!el) throw new Error(`No element found with id "${options}"`);
      resolvedOptions = { div: el as HTMLDivElement };
    } else if (
      typeof options === 'object' &&
      options !== null &&
      'appendChild' in (options as object) &&
      !('div' in (options as object))
    ) {
      resolvedOptions = { div: options as HTMLDivElement };
    } else {
      resolvedOptions = options as DiagramOptions;
    }

    this.container = resolvedOptions.div;
    this.minScale = resolvedOptions.minScale ?? 0.1;
    this.maxScale = resolvedOptions.maxScale ?? 10;
    this.gridSize = resolvedOptions.gridSize ?? 20;
    this.showGrid = resolvedOptions.showGrid ?? true;
    this.snapToGrid = resolvedOptions.snapToGrid ?? false;
    this.backgroundColor = resolvedOptions.backgroundColor ?? '#ffffff';

    // GoJS-compatible options
    this._isReadOnly = resolvedOptions.isReadOnly ?? false;
    this._isEnabled = resolvedOptions.isEnabled ?? true;
    this._allowMove = resolvedOptions.allowMove ?? true;
    this._allowCopy = resolvedOptions.allowCopy ?? true;
    this._allowDelete = resolvedOptions.allowDelete ?? true;
    this._allowDrop = resolvedOptions.allowDrop ?? true;
    this._allowZoom = resolvedOptions.allowZoom ?? true;
    this._allowHorizontalScroll = resolvedOptions.allowHorizontalScroll ?? true;
    this._allowVerticalScroll = resolvedOptions.allowVerticalScroll ?? true;
    this._scrollMode = resolvedOptions.scrollMode ?? 'document';
    this._initialContentAlignment = resolvedOptions.initialContentAlignment ?? null;
    this._initialContentAlignmentOffset = resolvedOptions.initialContentAlignmentOffset ?? null;

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.container.appendChild(this.canvas);

    // Create renderer
    this.renderer = new Canvas2DRenderer(this.canvas);

    // Create model
    this._model = new GraphLinksModel();

    // Set initial scale
    this._scale = resolvedOptions.initialScale ?? 1;

    // Create tool manager and register tools
    this._toolManager = new ToolManager(this);
    this.registerDefaultTools();

    // Create undo manager
    this._undoManager = new UndoManager();

    // Wire the animation manager to report AnimationStarting/Finished events
    this._animationManager.diagram = this;

    // Create command handler
    this._commandHandler = new CommandHandler(this);

    // Create layers
    this._layers = createDefaultLayers();

    // Set up event listeners
    this.setupEventListeners();

    // Start render loop
    this.startRenderLoop();
  }

  /** Register default interaction tools in GoJS priority order. */
  private registerDefaultTools(): void {
    const tm = this._toolManager;
    tm.registerTool('clickSelecting', new ClickSelectingTool());
    tm.registerTool('dragging', new DraggingTool());
    tm.registerTool('panning', new PanningTool());
    tm.registerTool('zooming', new ZoomingTool());
    tm.registerTool('textEditing', new TextEditingTool());
    tm.registerTool('linking', new LinkingTool());
    tm.registerTool('relinking', new RelinkingTool());
    tm.registerTool('resizing', new ResizingTool());
    tm.registerTool('rotating', new RotatingTool());
    tm.registerTool('dragSelecting', new DragSelectingTool());

    // Populate per-event tool lists (GoJS mouseDownTools order)
    for (const name of [
      'relinking',
      'resizing',
      'rotating',
      'linking',
      'dragging',
      'panning',
      'clickSelecting',
      'dragSelecting',
    ]) {
      const tool = tm.getTool(name);
      if (tool) tm.addToolToList('mouseDown', tool);
    }
    // Wheel / click / double-click / key lists
    const zooming = tm.getTool('zooming');
    if (zooming) tm.addToolToList('wheel', zooming);
    const clickSelecting = tm.getTool('clickSelecting');
    if (clickSelecting) tm.addToolToList('click', clickSelecting);
    const textEditing = tm.getTool('textEditing');
    if (textEditing) tm.addToolToList('doubleClick', textEditing);
    const panning = tm.getTool('panning');
    if (panning) tm.addToolToList('mouseMove', panning);
    for (const name of [
      'dragging',
      'linking',
      'relinking',
      'resizing',
      'rotating',
      'clickSelecting',
      'dragSelecting',
      'textEditing',
    ]) {
      const tool = tm.getTool(name);
      if (tool) {
        tm.addToolToList('mouseMove', tool);
        tm.addToolToList('mouseUp', tool);
      }
    }
  }

  /** Get the tool manager. */
  getToolManager(): ToolManager {
    return this._toolManager;
  }

  /** GoJS-compatible: The tool manager. */
  get toolManager(): ToolManager {
    return this._toolManager;
  }

  /** Get the undo manager. */
  getUndoManager(): UndoManager {
    return this._undoManager;
  }

  /** GoJS-compatible: The undo manager. */
  get undoManager(): UndoManager {
    return this._undoManager;
  }

  /** Get the animation manager. */
  getAnimationManager(): AnimationManager {
    return this._animationManager;
  }

  /** GoJS-compatible: The animation manager. */
  get animationManager(): AnimationManager {
    return this._animationManager;
  }

  /** Get the command handler. */
  getCommandHandler(): CommandHandler {
    return this._commandHandler;
  }

  /** GoJS-compatible: The command handler. */
  get commandHandler(): CommandHandler {
    return this._commandHandler;
  }

  /** GoJS-compatible: Get the default node template. */
  get nodeTemplate(): Panel | null {
    return this._nodeTemplate;
  }

  /** GoJS-compatible: Set the default node template. */
  set nodeTemplate(value: Panel | null) {
    this._nodeTemplate = value;
    this.syncPartsFromModel();
    this.invalidate();
  }

  /** GoJS-compatible: Get the default link template. */
  get linkTemplate(): Panel | null {
    return this._linkTemplate;
  }

  /** GoJS-compatible: Set the default link template. */
  set linkTemplate(value: Panel | null) {
    this._linkTemplate = value;
    this.syncPartsFromModel();
    this.invalidate();
  }

  /** GoJS-compatible: Get the default group template. */
  get groupTemplate(): Panel | null {
    return this._groupTemplate;
  }

  /** GoJS-compatible: Set the default group template. */
  set groupTemplate(value: Panel | null) {
    this._groupTemplate = value;
    this.syncPartsFromModel();
    this.invalidate();
  }

  /** GoJS-compatible: Get the node template map. */
  get nodeTemplateMap(): Map<string, Panel> {
    return this._nodeTemplateMap;
  }

  /** GoJS-compatible: Get the link template map. */
  get linkTemplateMap(): Map<string, Panel> {
    return this._linkTemplateMap;
  }

  /** GoJS-compatible: Add a node template for a category. */
  addNodeTemplate(category: string, template: Panel): void {
    this._nodeTemplateMap.set(category, template);
  }

  /** GoJS-compatible: Add a link template for a category. */
  addLinkTemplate(category: string, template: Panel): void {
    this._linkTemplateMap.set(category, template);
  }

  /** GoJS-compatible: Remove a node template by category. */
  removeNodeTemplate(category: string): boolean {
    return this._nodeTemplateMap.delete(category);
  }

  /** GoJS-compatible: Remove a link template by category. */
  removeLinkTemplate(category: string): boolean {
    return this._linkTemplateMap.delete(category);
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
    this._undoManager.execute(command);
  }

  /** Undo the last command. */
  undo(): boolean {
    return this._undoManager.undo();
  }

  /** Redo the last undone command. */
  redo(): boolean {
    return this._undoManager.redo();
  }

  /** GoJS-compatible: Begin a transaction. Commands are grouped into one undo unit. */
  startTransaction(name = 'Transaction'): boolean {
    this._transactionEvents = [];
    this._transactionName = name;
    this._undoManager.beginTransaction(name);
    return true;
  }

  /** GoJS-compatible: Commit the current transaction. */
  commitTransaction(name = ''): boolean {
    const events = this._transactionEvents;
    this._transactionEvents = [];

    // If model changes were made without explicit commands, wrap them in an
    // undoable ModelTransactionCommand so undo/redo works (GoJS behavior).
    if (events && events.length > 0) {
      this._undoManager.execute(
        new ModelTransactionCommand(this._model, events, name || this._transactionName),
      );
    }
    this._undoManager.commitTransaction();
    return true;
  }

  /**
   * GoJS-compatible: Execute a function within a transaction.
   * If the function is provided, it's called and the transaction is committed.
   * If no function is provided, begins a transaction and returns a commit function.
   *
   * Usage:
   *   diagram.commit(d => {
   *     d.model.addNode({ key: 1, name: 'A' });
   *   }, 'add node');
   */
  commit(fn: (d: Diagram) => void, name = ''): void {
    this.startTransaction(name);
    try {
      fn(this);
    } finally {
      this.commitTransaction(name);
    }
  }

  /** Set a context menu for this diagram. */
  setContextMenu(menu: ContextMenu | null): void {
    this.contextMenu = menu;
  }

  /** Get the current context menu. */
  getContextMenu(): ContextMenu | null {
    return this.contextMenu;
  }

  /** GoJS-compatible: Whether the diagram is read-only. */
  get isReadOnly(): boolean {
    return this._isReadOnly;
  }

  set isReadOnly(value: boolean) {
    this._isReadOnly = value;
  }

  /** GoJS-compatible: Whether parts can be moved. */
  get allowMove(): boolean {
    return this._allowMove;
  }

  set allowMove(value: boolean) {
    this._allowMove = value;
  }

  /** GoJS-compatible: Whether parts can be copied. */
  get allowCopy(): boolean {
    return this._allowCopy;
  }

  set allowCopy(value: boolean) {
    this._allowCopy = value;
  }

  /** GoJS-compatible: Whether parts can be deleted. */
  get allowDelete(): boolean {
    return this._allowDelete;
  }

  set allowDelete(value: boolean) {
    this._allowDelete = value;
  }

  /** GoJS-compatible: Whether parts can be dropped onto the diagram. */
  get allowDrop(): boolean {
    return this._allowDrop;
  }

  set allowDrop(value: boolean) {
    this._allowDrop = value;
  }

  /** GoJS-compatible: Whether zooming is allowed. */
  get allowZoom(): boolean {
    return this._allowZoom;
  }

  set allowZoom(value: boolean) {
    this._allowZoom = value;
  }

  /** GoJS-compatible: Whether horizontal scrolling is allowed. */
  get allowHorizontalScroll(): boolean {
    return this._allowHorizontalScroll;
  }

  set allowHorizontalScroll(value: boolean) {
    this._allowHorizontalScroll = value;
  }

  /** GoJS-compatible: Whether vertical scrolling is allowed. */
  get allowVerticalScroll(): boolean {
    return this._allowVerticalScroll;
  }

  set allowVerticalScroll(value: boolean) {
    this._allowVerticalScroll = value;
  }

  /** GoJS-compatible: Whether the diagram is enabled (interactive). */
  get isEnabled(): boolean {
    return this._isEnabled;
  }

  set isEnabled(value: boolean) {
    this._isEnabled = value;
  }

  /** GoJS-compatible: The scroll mode ('document' or 'infinite'). */
  get scrollMode(): 'document' | 'infinite' {
    return this._scrollMode;
  }

  set scrollMode(value: 'document' | 'infinite') {
    this._scrollMode = value;
  }

  /** GoJS-compatible: The initial content alignment spot. */
  get initialContentAlignment(): Spot | null {
    return this._initialContentAlignment;
  }

  set initialContentAlignment(value: Spot | null) {
    this._initialContentAlignment = value;
  }

  /** GoJS-compatible: The initial content alignment offset. */
  get initialContentAlignmentOffset(): { x: number; y: number } | null {
    return this._initialContentAlignmentOffset;
  }

  set initialContentAlignmentOffset(value: { x: number; y: number } | null) {
    this._initialContentAlignmentOffset = value;
  }

  /** GoJS-compatible: Whether in-place text editing is allowed. */
  get allowTextEdit(): boolean {
    return this._allowTextEdit;
  }

  set allowTextEdit(value: boolean) {
    this._allowTextEdit = value;
  }

  /** GoJS-compatible: Whether new links can be drawn. */
  get allowLink(): boolean {
    return this._allowLink;
  }

  set allowLink(value: boolean) {
    this._allowLink = value;
  }

  /** GoJS-compatible: Whether existing links can be reconnected. */
  get allowRelink(): boolean {
    return this._allowRelink;
  }

  set allowRelink(value: boolean) {
    this._allowRelink = value;
  }

  /** GoJS-compatible: Whether nodes can be grouped. */
  get allowGroup(): boolean {
    return this._allowGroup;
  }

  set allowGroup(value: boolean) {
    this._allowGroup = value;
  }

  /** GoJS-compatible: Whether new nodes can be inserted. */
  get allowInsert(): boolean {
    return this._allowInsert;
  }

  set allowInsert(value: boolean) {
    this._allowInsert = value;
  }

  /** GoJS-compatible: Whether nodes can be resized. */
  get allowResize(): boolean {
    return this._allowResize;
  }

  set allowResize(value: boolean) {
    this._allowResize = value;
  }

  /** GoJS-compatible: Whether nodes can be rotated. */
  get allowRotate(): boolean {
    return this._allowRotate;
  }

  set allowRotate(value: boolean) {
    this._allowRotate = value;
  }

  /** GoJS-compatible: Whether parts can be rearranged. */
  get allowArrange(): boolean {
    return this._allowArrange;
  }

  set allowArrange(value: boolean) {
    this._allowArrange = value;
  }

  /** GoJS-compatible: The maximum number of parts that can be selected. */
  get maxSelectionCount(): number {
    return this._maxSelectionCount;
  }

  set maxSelectionCount(value: number) {
    this._maxSelectionCount = Math.max(0, value);
  }

  /** Handle a contextmenu (right-click) event. */
  private handleContextMenu(e: MouseEvent): void {
    e.preventDefault();
    // GraphObject.contextClick handler
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    if (part) {
      const obj = this.findHitGraphObject(part, point);
      if (obj?.contextClick) obj.contextClick(e, obj);
    }
    // Part-level context menu template takes precedence
    if (part?.contextMenu) {
      this.showPartContextMenu(part, e);
    } else if (this.contextMenu) {
      this.contextMenu.handleContextMenu(e);
    }
  }

  /** Show a floating context menu rendered from a part's contextMenu template. */
  private showPartContextMenu(part: Part, e: MouseEvent): void {
    const template = part.contextMenu;
    if (!template) return;
    this.hideContextMenu();

    const el = document.createElement('div');
    el.style.cssText =
      'position:fixed;z-index:10000;background:white;border:1px solid #999;box-shadow:2px 2px 6px rgba(0,0,0,0.3);';
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 200;
    canvas.style.display = 'block';
    el.appendChild(canvas);
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    document.body.appendChild(el);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      template.setPosition(0, 0);
      template.setActualSize(160, 200);
      template.draw(ctx, 0, 0, 160, 200);
    }
    this._contextMenuEl = el;

    const dismiss = (): void => {
      this.hideContextMenu();
      window.removeEventListener('mousedown', dismiss);
      window.removeEventListener('wheel', dismiss);
    };
    window.addEventListener('mousedown', dismiss);
    window.addEventListener('wheel', dismiss);
  }

  /** Hide any floating part context menu. */
  hideContextMenu(): void {
    if (this._contextMenuEl) {
      this._contextMenuEl.remove();
      this._contextMenuEl = null;
    }
  }

  /** Handle a double-click event (triggers text editing + GraphObject.doubleClick). */
  private handleDoubleClick(e: MouseEvent): void {
    e.preventDefault();
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);

    // GraphObject.doubleClick handler
    if (part) {
      const obj = this.findHitGraphObject(part, point);
      if (obj?.doubleClick) obj.doubleClick(e, obj);
    }

    const textEditing = this._toolManager.getTool('textEditing');
    if (textEditing instanceof TextEditingTool) {
      textEditing.doDoubleClick(e);
    }
    // Fire object double-click event
    if (part) {
      this.fireDiagramEvent('ObjectDoubleClicked', part, { x: point.x, y: point.y });
    } else {
      this.fireDiagramEvent('BackgroundDoubleClicked', null, { x: point.x, y: point.y });
    }
  }

  /** Handle a click event. */
  private handleCanvasClick(e: MouseEvent): void {
    this._toolManager.handleClick(e);
    // Fire background click or object click
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    if (!part) {
      this.fireDiagramEvent('BackgroundSingleClicked', null, { x: point.x, y: point.y });
    } else {
      // GraphObject.click handler
      const obj = this.findHitGraphObject(part, point);
      if (obj?.click) obj.click(e, obj);
      this.fireDiagramEvent('ObjectSingleClicked', part, { x: point.x, y: point.y });
    }
  }

  /** Find the deepest GraphObject of a part's visual tree at a diagram point. */
  private findHitGraphObject(part: Part, point: { x: number; y: number }): GraphObject | null {
    const panel = part.panel;
    if (!panel) return null;
    const localX = point.x - part.bounds.x;
    const localY = point.y - part.bounds.y;
    return panel.hitTest(localX, localY);
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
        this._commandHandler.redo();
      } else {
        this._commandHandler.undo();
      }
    } else if (ctrlOrCmd && e.key === 'y') {
      e.preventDefault();
      this._commandHandler.redo();
    } else if (ctrlOrCmd && e.key === 'c') {
      e.preventDefault();
      this._commandHandler.copySelection();
    } else if (ctrlOrCmd && e.key === 'x') {
      e.preventDefault();
      this._commandHandler.cutSelection();
    } else if (ctrlOrCmd && e.key === 'v') {
      e.preventDefault();
      this._commandHandler.pasteClipboard();
    } else if (ctrlOrCmd && e.key === 'a') {
      e.preventDefault();
      this._commandHandler.selectAll();
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      this._commandHandler.deleteSelection();
    } else if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight'
    ) {
      e.preventDefault();
      const dx = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0;
      const dy = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0;
      this._commandHandler.nudgeSelection(dx, dy, this._scale);
    }
  }

  /** Handle touch start (supports single-finger pan and two-finger pinch-zoom). */
  private handleTouchStart(e: TouchEvent): void {
    e.preventDefault();
    const touches = e.touches;

    if (touches.length === 1) {
      const t = touches[0]!;
      this.touchState = {
        active: true,
        startDistance: 0,
        startScale: this._scale,
        startTouchX: t.clientX,
        startTouchY: t.clientY,
        lastTouchX: t.clientX,
        lastTouchY: t.clientY,
        startOffsetX: this.offsetX,
        startOffsetY: this.offsetY,
      };
    } else if (touches.length === 2) {
      const t0 = touches[0]!;
      const t1 = touches[1]!;
      const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      const midX = (t0.clientX + t1.clientX) / 2;
      const midY = (t0.clientY + t1.clientY) / 2;
      this.touchState = {
        active: true,
        startDistance: dist,
        startScale: this._scale,
        startTouchX: midX,
        startTouchY: midY,
        lastTouchX: midX,
        lastTouchY: midY,
        startOffsetX: this.offsetX,
        startOffsetY: this.offsetY,
      };
    }
  }

  /** Handle touch move (pan or pinch-zoom). */
  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    const touches = e.touches;
    if (!this.touchState) return;

    if (touches.length === 1) {
      // Single-finger pan
      const t = touches[0]!;
      const dx = t.clientX - this.touchState.startTouchX;
      const dy = t.clientY - this.touchState.startTouchY;
      this.setViewport(
        this.touchState.startOffsetX - dx / this._scale,
        this.touchState.startOffsetY - dy / this._scale,
      );
    } else if (touches.length === 2 && this.touchState.startDistance > 0) {
      // Two-finger pinch-zoom + pan
      const t0 = touches[0]!;
      const t1 = touches[1]!;
      const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      const ratio = dist / this.touchState.startDistance;
      const newScale = Math.max(
        this.minScale,
        Math.min(this.maxScale, this.touchState.startScale * ratio),
      );
      const midX = (t0.clientX + t1.clientX) / 2;
      const midY = (t0.clientY + t1.clientY) / 2;
      const dx = midX - this.touchState.startTouchX;
      const dy = midY - this.touchState.startTouchY;
      this.setViewport(
        this.touchState.startOffsetX - dx / newScale,
        this.touchState.startOffsetY - dy / newScale,
        newScale,
      );
    }
  }

  /** Handle touch end. */
  private handleTouchEnd(e: TouchEvent): void {
    e.preventDefault();
    if (e.touches.length === 0) {
      this.touchState = null;
    }
  }

  /** Set up DOM event listeners. */
  private setupEventListeners(): void {
    this.addCanvasListener('wheel', (e) => this._toolManager.handleMouseWheel(e as WheelEvent), {
      passive: false,
    });
    this.addCanvasListener('mousedown', (e) => this._toolManager.handleMouseDown(e as MouseEvent));
    this.addCanvasListener('mousemove', (e) => {
      this._toolManager.handleMouseMove(e as MouseEvent);
      this.tooltipManager?.handleMouseMove(e as MouseEvent);
    });
    this.addCanvasListener('mouseup', (e) => this._toolManager.handleMouseUp(e as MouseEvent));
    this.addCanvasListener('mouseleave', (e) => {
      this._toolManager.handleMouseUp(e as MouseEvent);
      this.tooltipManager?.handleMouseLeave();
    });
    this.addCanvasListener('click', (e) => this.handleCanvasClick(e as MouseEvent));
    this.addCanvasListener('dblclick', (e) => this.handleDoubleClick(e as MouseEvent));
    this.addCanvasListener('contextmenu', (e) => this.handleContextMenu(e as MouseEvent));

    // Focus events
    this.addCanvasListener('focus', () => this.fireDiagramEvent('GainedFocus'));
    this.addCanvasListener('blur', () => this.fireDiagramEvent('LostFocus'));

    // Touch support
    this.addCanvasListener('touchstart', (e) => this.handleTouchStart(e as TouchEvent), {
      passive: false,
    });
    this.addCanvasListener('touchmove', (e) => this.handleTouchMove(e as TouchEvent), {
      passive: false,
    });
    this.addCanvasListener('touchend', (e) => this.handleTouchEnd(e as TouchEvent), {
      passive: false,
    });
    this.addCanvasListener('touchcancel', (e) => this.handleTouchEnd(e as TouchEvent), {
      passive: false,
    });

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
    this._model.addChangedListener(this.modelChangeListener);
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
    // Record model changes for undoable transactions
    if (this._transactionEvents) {
      this._transactionEvents.push(event);
    }
    // Incrementally sync only the changed part
    this.syncPartFromModelChange(event);
    this.invalidate();
    // Layer cache must be refreshed on model changes
    this.layerCache?.markAllDirty();
    this.isModified = true;
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
      if (part instanceof Node && !this._model.containsNode(key)) {
        this.parts.delete(key);
        this.nodes.delete(key);
      } else if (part instanceof Group && !this._model.containsNode(key)) {
        this.parts.delete(key);
        this.groups.delete(key);
      } else if (part instanceof Link) {
        const linkKey = part.key;
        const linkData = this._model
          .getLinkDataArray()
          .find((l) => this.getLinkKeyOf(l) === linkKey);
        if (!linkData) {
          this.parts.delete(key);
          this.links.delete(linkKey);
        }
      }
    }

    // Add/update nodes and groups
    for (const nodeData of this._model.getNodeDataArray()) {
      const key = this._model.getNodeKey(nodeData);
      const isGroup = nodeData.isGroup === true;

      if (isGroup) {
        let group = this.groups.get(key);
        if (!group) {
          group = this.createGroup(nodeData);
        }

        // Sync members: add nodes/links whose groupKey matches this group
        for (const [memberKey, node] of this.nodes) {
          if (node.containingGroup === group) continue;
          const memberData = this._model.getNodeData(memberKey);
          if (memberData && memberData.group === key) {
            group.add(node);
          }
        }
      } else {
        let node = this.nodes.get(key);
        if (!node) {
          node = this.createNode(nodeData);
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
    for (const linkData of this.getLinksArray()) {
      const linkKey = this.getLinkKeyOf(linkData);
      if (linkKey === undefined) continue;

      let link = this.links.get(linkKey);
      if (!link) {
        link = this.createLink(linkData);
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
    for (const [, part] of this.parts) {
      if (part.bindings.length > 0 || part.panel !== null) {
        const data = this.getDataForPart(part);
        if (data) {
          part.applyBindings(data);
        }
      }
    }

    this.markHitIndexDirty();
  }

  /** Get the model data object for a part (node data or link data). */
  private getDataForPart(part: Part): NodeData | LinkData | undefined {
    if (part instanceof Link) {
      const linkKey = part.key;
      return this.getLinksArray().find((l) => this.getLinkKeyOf(l) === linkKey);
    }
    return this._model.getNodeData(part.key);
  }

  /** The link data array, or [] when the model has no links (e.g. TreeModel). */
  private getLinksArray(): LinkData[] {
    const m = this._model as unknown as { getLinkDataArray?: () => readonly LinkData[] };
    return m.getLinkDataArray ? [...m.getLinkDataArray()] : [];
  }

  /** Get a link key, or undefined when the model has no links. */
  private getLinkKeyOf(linkData: LinkData): NodeKey | undefined {
    const m = this._model as unknown as { getLinkKey?: (l: LinkData) => NodeKey | undefined };
    return m.getLinkKey ? m.getLinkKey(linkData) : undefined;
  }

  /**
   * Find a part by its model key in the parts map.
   * Link keys live in a separate namespace (prefixed) to avoid colliding
   * with node keys.
   */
  private getPartByKey(key: NodeKey): Node | Link | Group | undefined {
    return this.parts.get(key) ?? this.parts.get(this.linkPartKey(key));
  }

  private linkPartKey(key: NodeKey): string {
    return `l:${key}`;
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
          const key = this._model.getNodeKey(event.node);
          this.removePartByKey(key, 'node');
        }
        break;
      }
      case 'property Changed': {
        if (event.node) this.syncNodeFromModel(event.node);
        if (event.link) this.syncLinkFromModel(event.link);
        break;
      }
      case 'link Added': {
        if (event.link) this.syncLinkFromModel(event.link);
        break;
      }
      case 'link Removed': {
        if (event.link) {
          const key = this.getLinkKeyOf(event.link);
          if (key !== undefined) this.removePartByKey(key, 'link');
        }
        break;
      }
    }
  }

  /** Sync a single node data into its visual part (create if needed). */
  private syncNodeFromModel(nodeData: NodeData): void {
    const key = this._model.getNodeKey(nodeData);
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
    const linkKey = this.getLinkKeyOf(linkData);
    if (linkKey === undefined) return;

    let link = this.links.get(linkKey);
    if (!link) {
      link = this.createLink(linkData);
    }
    this.updateLinkFromData(link, linkData);
  }

  private createNode(nodeData: NodeData): Node {
    const key = this._model.getNodeKey(nodeData);
    const x = (nodeData.x as number) ?? 0;
    const y = (nodeData.y as number) ?? 0;
    const width = (nodeData.width as number) ?? 100;
    const height = (nodeData.height as number) ?? 50;
    const node = Node.fromPosAndSize(key, x, y, width, height);
    node.data = nodeData;

    // Apply GoJS-compatible template if set
    const category = nodeData.category as string | undefined;
    const template =
      (category !== undefined ? this._nodeTemplateMap.get(category) : undefined) ??
      this._nodeTemplate;
    if (template) {
      const cloned = template.clone();
      node.panel = cloned;
      // Apply template properties to the part
      this.applyTemplateProperties(node, cloned.templateProperties);
      // Collect declarative ports (GraphObjects with portId)
      node.collectPortsFromPanel();
    }

    const layerName = (nodeData.layer as string) ?? LayerNames.Default;
    const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
    if (layer) node.layer = layer;
    this.parts.set(key, node);
    this.nodes.set(key, node);
    this.fireDiagramEvent('PartAdded', node);
    this.markHitIndexDirty();
    return node;
  }

  /** Apply templateProperties (e.g. routing, corner) to a created part. */
  private applyTemplateProperties(part: Part, props: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(props)) {
      if (key === '__binding__') {
        (part as unknown as { addBinding: (b: unknown) => void }).addBinding(value);
        continue;
      }
      (part as unknown as Record<string, unknown>)[key] = value;
    }
  }

  private createGroup(nodeData: NodeData): Group {
    const key = this._model.getNodeKey(nodeData);
    const x = (nodeData.x as number) ?? 0;
    const y = (nodeData.y as number) ?? 0;
    const width = (nodeData.width as number) ?? 100;
    const height = (nodeData.height as number) ?? 50;
    const group = new Group(key, new RectClass(x, y, width, height));
    group.data = nodeData;

    // Apply GoJS-compatible group template if set
    const category = nodeData.category as string | undefined;
    const template = category !== undefined ? this._nodeTemplateMap.get(category) : undefined;
    const groupTemplate = this._groupTemplate ?? template;
    if (groupTemplate) {
      const cloned = groupTemplate.clone();
      group.panel = cloned;
      this.applyTemplateProperties(group, cloned.templateProperties);
    }

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
    const linkKey = this.getLinkKeyOf(linkData);
    const link = new Link(linkKey as NodeKey, linkData.from, linkData.to);
    link.data = linkData;

    // Apply GoJS-compatible link template if set
    const category = linkData.category as string | undefined;
    const template =
      (category !== undefined ? this._linkTemplateMap.get(category) : undefined) ??
      this._linkTemplate;
    if (template) {
      const cloned = template.clone();
      link.panel = cloned;
      this.applyTemplateProperties(link, cloned.templateProperties);
      this.applyLinkTemplateAppearance(link, cloned);
    }

    const layerName = (linkData.layer as string) ?? LayerNames.Default;
    const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
    if (layer) link.layer = layer;
    this.parts.set(this.linkPartKey(linkKey as NodeKey), link);
    this.links.set(linkKey as NodeKey, link);
    this.fireDiagramEvent('PartAdded', link);
    this.fireDiagramEvent('LinkCreated', link);
    this.markHitIndexDirty();
    return link;
  }

  /**
   * Extract link path appearance from a link template:
   * the first Shape's stroke/strokeWidth become the link path style,
   * and a Shape with toArrow/fromArrow sets the arrowhead.
   */
  private applyLinkTemplateAppearance(link: Link, panel: Panel): void {
    for (const el of panel.elements) {
      if (el instanceof Shape) {
        if (link.strokeWidth === 2 || el.strokeWidth > 0) {
          if (el.strokeWidth > 0) link.strokeWidth = el.strokeWidth;
          if (el.stroke && el.stroke !== '#333333') link.stroke = el.stroke;
        }
        if (el.toArrow) {
          link.arrowhead = this.mapArrowhead(el.toArrow);
        }
        break;
      }
    }
  }

  /** Map a GoJS arrowhead figure name to our ArrowheadStyle. */
  private mapArrowhead(figure: string): ArrowheadStyle {
    const n = figure.toLowerCase().replace(/[^a-z]/g, '');
    if (n.includes('diamond')) return 'diamond';
    if (n.includes('circle')) return 'circle';
    if (n.includes('open') || n.includes('standard')) return 'openArrow';
    if (n === 'none' || n === '') return 'none';
    return 'triangle';
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
    node.zOrder = (nodeData.zOrder as number) ?? node.zOrder;

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
      const memberData = this._model.getNodeData(memberKey);
      if (memberData && memberData.group === group.key) {
        group.add(node);
      }
    }
  }

  private removePartByKey(key: NodeKey, type?: 'node' | 'link' | 'group'): void {
    // Resolve by type to avoid node/link key namespace collisions
    let part: Node | Link | Group | undefined;
    if (type === 'link') {
      part = this.links.get(key) ?? (this.parts.get(this.linkPartKey(key)) as Link | undefined);
    } else if (type === 'group') {
      part = this.groups.get(key);
    } else if (type === 'node') {
      part = this.nodes.get(key);
    } else {
      part = this.getPartByKey(key);
    }
    if (!part) return;

    if (part instanceof Node) {
      this.nodes.delete(key);
    } else if (part instanceof Group) {
      this.groups.delete(key);
    } else if (part instanceof Link) {
      this.links.delete(key);
      this.parts.delete(this.linkPartKey(key));
      this.selectedParts.delete(part);
      this.fireDiagramEvent('PartRemoved', part);
      this.markHitIndexDirty();
      return;
    }
    this.parts.delete(key);
    this.selectedParts.delete(part);
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
    return this.getPartByKey(key);
  }

  /** GoJS-compatible: Find a node part by its model key. */
  findNodeForKey(key: NodeKey): Node | null {
    return this.nodes.get(key) ?? null;
  }

  /** GoJS-compatible: Find a link part by its model key. */
  findLinkForKey(key: NodeKey): Link | null {
    return this.links.get(key) ?? null;
  }

  /** GoJS-compatible: Find a node part by its model data object. */
  findNodeForData(data: NodeData): Node | null {
    const key = this._model.getNodeKey(data);
    return this.nodes.get(key) ?? null;
  }

  /** GoJS-compatible: Find a link part by its model data object. */
  findLinkForData(data: LinkData): Link | null {
    const key = this.getLinkKeyOf(data);
    if (key === undefined) return null;
    return this.links.get(key) ?? null;
  }

  /** GoJS-compatible: Remove all parts and clear the model. */
  clear(): void {
    this.parts.clear();
    this.nodes.clear();
    this.links.clear();
    this.groups.clear();
    this.selectedParts.clear();
    this._model.clear();
    this.markHitIndexDirty();
    this.invalidate();
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
        this.select(node, true);
      }
    }
    for (const [, link] of this.links) {
      if (link.bounds.intersects(rect as unknown as RectClass)) {
        this.select(link, true);
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
      x: mouseX / this._scale + this.offsetX,
      y: mouseY / this._scale + this.offsetY,
    };
  }

  /** Clear all selections. */
  clearSelection(): void {
    this.fireDiagramEvent('ChangingSelection', null);
    for (const part of this.selectedParts) {
      part.isSelected = false;
    }
    this.selectedParts.clear();
    this.invalidate();
    this.fireDiagramEvent('SelectionChanged', null);
    this.fireDiagramEvent('ChangedSelection', null);
  }

  /** GoJS-compatible: Select a part, adding it to the current selection. */
  select(part: Part | null, addToSelection = false): boolean {
    if (!part) return false;
    if (!addToSelection) {
      this.clearSelection();
    }
    if (this.selectedParts.has(part)) return true;
    // Respect maxSelectionCount
    if (this.selectedParts.size >= this._maxSelectionCount) return false;
    this.fireDiagramEvent('ChangingSelection', part);
    this.selectedParts.add(part);
    part.isSelected = true;
    this.invalidate();
    this.fireDiagramEvent('SelectionChanged', part);
    this.fireDiagramEvent('ChangedSelection', part);
    return true;
  }

  /** GoJS-compatible: Deselect a part. */
  deselect(part: Part): void {
    if (!this.selectedParts.has(part)) return;
    part.isSelected = false;
    this.selectedParts.delete(part);
    this.invalidate();
    this.fireDiagramEvent('SelectionChanged', null);
    this.fireDiagramEvent('ChangedSelection', null);
  }

  /** GoJS-compatible: Find a group part by its model key. */
  findGroupForKey(key: NodeKey): Group | null {
    return this.groups.get(key) ?? null;
  }

  /** GoJS-compatible: Collapse a group's subgraph, firing SubGraphCollapsed. */
  collapseGroup(group: Group): void {
    group.collapse();
    this.fireDiagramEvent('SubGraphCollapsed', group);
    this.applyDiagramLayout();
    this.invalidate();
  }

  /** GoJS-compatible: Expand a group's subgraph, firing SubGraphExpanded. */
  expandGroup(group: Group): void {
    group.expand();
    this.fireDiagramEvent('SubGraphExpanded', group);
    this.applyDiagramLayout();
    this.invalidate();
  }

  /** Get selected parts. */
  getSelectedParts(): (Node | Link | Group)[] {
    const result: (Node | Link | Group)[] = [];
    for (const part of this.selectedParts) {
      if (part instanceof Node || part instanceof Link || part instanceof Group) {
        result.push(part);
      }
    }
    return result;
  }

  /** Set the model. */
  setModel(model: GraphLinksModel): void {
    if (this.modelChangeListener) {
      this._model.removeChangedListener(this.modelChangeListener);
    }
    this._model = model;
    this.modelChangeListener = (event: ChangedEvent) => this.handleModelChange(event);
    this._model.addChangedListener(this.modelChangeListener);
    this.syncPartsFromModel();
    // GoJS-compatible: run the diagram layout after the model is set
    if (this._layout) {
      this.applyDiagramLayout();
      this.fireDiagramEvent('InitialLayoutCompleted');
      this.fireDiagramEvent('LayoutCompleted');
    }
    this.invalidate();
  }

  /** GoJS-compatible: Get the model. */
  get model(): GraphLinksModel {
    return this._model;
  }

  /** GoJS-compatible: Set the model. */
  set model(value: GraphLinksModel) {
    this.setModel(value);
  }

  /** Get all layers. */
  getLayers(): readonly Layer[] {
    return this._layers;
  }

  /** GoJS-compatible: The layers in this diagram. */
  get layers(): readonly Layer[] {
    return this._layers;
  }

  /** GoJS-compatible: The diagram layout, applied to nodes/links when set. */
  private _layout: Layout | null = null;

  get layout(): Layout | null {
    return this._layout;
  }

  set layout(value: Layout | null) {
    this._layout = value;
    this.applyDiagramLayout();
  }

  /** Apply the diagram layout to the current nodes and links. */
  private applyDiagramLayout(): void {
    const layout = this._layout;
    if (!layout) return;
    const nodes = Array.from(this.nodes.values());
    const links = Array.from(this.links.values());
    layout.apply(nodes, links);
    this.invalidate();
  }

  /** GoJS-compatible: Run the diagram layout (or the given layout) on all parts. */
  layoutDiagram(layout?: Layout): void {
    const target = layout ?? this._layout;
    if (!target) return;
    const nodes = Array.from(this.nodes.values());
    const links = Array.from(this.links.values());
    target.apply(nodes, links);
    this.invalidate();
    this.fireDiagramEvent('LayoutCompleted', null, { layout: target });
  }

  /** GoJS-compatible: The HTML element this diagram renders into. */
  get div(): HTMLDivElement {
    return this.container;
  }

  /** GoJS-compatible: Get the HTML element this diagram renders into. */
  getDiagramDiv(): HTMLDivElement {
    return this.container;
  }

  /** GoJS-compatible: The background color of the diagram. */
  get background(): string {
    return this.backgroundColor;
  }

  set background(value: string) {
    this.backgroundColor = value;
    this.invalidate();
  }

  /** GoJS-compatible: Whether the diagram's model has been modified. */
  get isModified(): boolean {
    return this._isModified;
  }

  set isModified(value: boolean) {
    if (this._isModified === value) return;
    this._isModified = value;
    this.fireDiagramEvent('Modified', null, { value });
  }

  /** GoJS-compatible: Register a model changed listener. */
  addModelChangedListener(listener: (event: ChangedEvent) => void): void {
    this._model.addChangedListener(listener);
  }

  /** GoJS-compatible: Remove a model changed listener. */
  removeModelChangedListener(listener: (event: ChangedEvent) => void): void {
    this._model.removeChangedListener(listener);
  }

  /** Get a layer by name. */
  getLayer(name: string): Layer | undefined {
    return this._layers.find((l) => l.name === name);
  }

  /** Add a layer. */
  addLayer(layer: Layer): void {
    this._layers.push(layer);
    this._layers.sort((a, b) => a.zOrder - b.zOrder);
    this.invalidate();
  }

  /** Remove a layer by name. */
  removeLayer(name: string): boolean {
    const index = this._layers.findIndex((l) => l.name === name);
    if (index === -1) return false;
    const layer = this._layers[index];
    if (!layer) return false;
    // Move parts to Default layer
    const defaultLayer = this.getLayer(LayerNames.Default);
    for (const part of [...layer.parts]) {
      part.layer = defaultLayer ?? null;
    }
    this._layers.splice(index, 1);
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
    return this._scale >= this.lodLabelThreshold;
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
    target.setViewport(this.offsetX, this.offsetY, this._scale);

    // Apply LOD label visibility
    if (target instanceof Canvas2DRenderer) {
      target.setLabelsVisible(this.shouldShowLabels());
    }

    // Clear with background color
    const ctx = (target as Canvas2DRenderer).getContext();
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(
      this.offsetX - width / this._scale,
      this.offsetY - height / this._scale,
      (width * 2) / this._scale,
      (height * 2) / this._scale,
    );

    // Render grid
    if (this.showGrid) {
      const viewport: Rect = new RectClass(
        this.offsetX - width / this._scale,
        this.offsetY - height / this._scale,
        (width * 2) / this._scale,
        (height * 2) / this._scale,
      );
      target.renderGrid(viewport, this.gridSize);
    }

    // Auto-initialize virtualization if not already done
    if (!this.virtualization) {
      const world = new RectClass(-10000, -10000, 20000, 20000);
      this.virtualization = new VirtualizationManager(world);
      this.virtualization.isEnabled = true;
    }

    // Collect all visible parts for spatial index rebuild
    const allParts: Part[] = [];
    for (const layer of this._layers) {
      if (layer.name === LayerNames.Grid) continue;
      for (const part of layer.getVisibleParts()) {
        allParts.push(part);
      }
    }

    // Rebuild spatial index with current part positions
    const world = new RectClass(-10000, -10000, 20000, 20000);
    this.virtualization.rebuild(allParts, world);

    // Cull parts based on viewport
    const viewportRect = VirtualizationManager.createViewport(
      this.offsetX,
      this.offsetY,
      width / this._scale,
      height / this._scale,
      100,
    );
    const visibleParts = new Set(this.virtualization.cull(viewportRect, allParts));

    // Register node bounds with renderer for link routing computation
    target.clearNodeBounds();
    for (const layer of this._layers) {
      for (const part of layer.getVisibleParts()) {
        if (part instanceof Node) {
          target.setNodeBounds(part.key, part.bounds);
        }
      }
    }

    // Render parts in layer order (lowest z-order first)
    for (const layer of this._layers) {
      if (layer.name === LayerNames.Grid) continue;
      if (layer.partCount === 0) continue;

      // Skip save/restore when the layer has full opacity (common case)
      const layerAlphaApplied = layer.opacity < 1;
      if (layerAlphaApplied) {
        ctx.save();
        ctx.globalAlpha = layer.opacity;
      }

      // Use cached layer rendering when enabled and the layer is cacheable
      if (this.layerCacheEnabled && this.layerCache) {
        const cacheable = !this.layerHasSelectedParts(layer) && this.tempLink === null;
        if (cacheable) {
          const cached = this.layerCache.getLayer(layer);
          if (cached) {
            ctx.drawImage(cached.canvas, cached.x, cached.y, cached.width, cached.height);
            if (layerAlphaApplied) ctx.restore();
            continue;
          }
        } else {
          this.layerCache.markDirty(layer.name);
        }
      }

      const layerParts = layer.getVisibleParts().filter((part) => visibleParts.has(part));
      // Render in z-order (ascending: lower zOrder first); skip sorting
      // when no explicit z-order is in use (common case, avoids O(n log n))
      let needsSort = false;
      for (const part of layerParts) {
        if (part.zOrder !== 0) {
          needsSort = true;
          break;
        }
      }
      if (needsSort) {
        layerParts.sort((a, b) => a.zOrder - b.zOrder);
      }

      for (const part of layerParts) {
        if (part instanceof Group) {
          target.renderGroup(part);
        } else if (part instanceof Link) {
          target.renderLink(part);
        } else if (part instanceof Node) {
          target.renderNode(part);
        }
      }

      if (layerAlphaApplied) ctx.restore();
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
    return this._model;
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

  /** GoJS-compatible: Render the diagram as a PNG data URL string. */
  makeImageData(options?: { background?: string; padding?: number; scale?: number }): string {
    return this.makeImage(options).toDataURL('image/png');
  }

  /** GoJS-compatible: Render the diagram as an SVGElement. */
  makeSvg(): SVGElement {
    return makeSvgElement(this);
  }

  /** GoJS-compatible: The current zoom factor (alias for scale). */
  get zoomFactor(): number {
    return this._scale;
  }

  set zoomFactor(value: number) {
    this._scale = Math.max(this.minScale, Math.min(this.maxScale, value));
    this.invalidate();
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
      width: rect.width / this._scale,
      height: rect.height / this._scale,
      scale: this._scale,
    };
  }

  /** GoJS-compatible: The current zoom scale. */
  get scale(): number {
    return this._scale;
  }

  set scale(value: number) {
    this._scale = Math.max(this.minScale, Math.min(this.maxScale, value));
    this.invalidate();
    this.fireDiagramEvent('ViewportChanged', null, { scale: this._scale });
  }

  /** GoJS-compatible: The position (top-left of the viewport in diagram coordinates). */
  get position(): { x: number; y: number } {
    return { x: this.offsetX, y: this.offsetY };
  }

  set position(value: { x: number; y: number }) {
    this.setViewport(value.x, value.y);
  }

  /** GoJS-compatible: The padding around the content. */
  get padding(): number {
    return this._padding;
  }

  set padding(value: number) {
    this._padding = value;
    this.invalidate();
  }

  /** GoJS-compatible: Find all parts intersecting a rectangle. */
  findPartsInRect(
    rect: { x: number; y: number; width: number; height: number },
    _partialInclusion = true,
  ): (Node | Link | Group)[] {
    const result: (Node | Link | Group)[] = [];
    const r = new RectClass(rect.x, rect.y, rect.width, rect.height);
    for (const part of this.parts.values()) {
      if (part.bounds.intersects(r)) {
        result.push(part);
      }
    }
    return result;
  }

  /** GoJS-compatible: Add a part directly to the diagram. */
  add(part: Part): void {
    const key = part.key;
    if (key === undefined) return;
    if (this.parts.has(key)) return;
    if (part instanceof Node) {
      this.nodes.set(key, part);
      this.parts.set(key, part);
    } else if (part instanceof Group) {
      this.groups.set(key, part);
      this.parts.set(key, part);
    } else if (part instanceof Link) {
      this.links.set(key, part);
      this.parts.set(this.linkPartKey(key), part);
    }
    const layer =
      this.getLayer(part.layerName ?? LayerNames.Default) ?? this.getLayer(LayerNames.Default);
    if (layer) part.layer = layer;
    this.markHitIndexDirty();
    this.fireDiagramEvent('PartAdded', part);
    this.invalidate();
  }

  /** GoJS-compatible: Remove a part directly from the diagram. */
  remove(part: Part): void {
    const key = part.key;
    if (key === undefined) return;
    this.removePartByKey(key);
  }

  /** Set the viewport. */
  setViewport(x: number, y: number, scale?: number): void {
    let targetX = x;
    let targetY = y;

    // In 'document' scroll mode, keep the viewport within the content bounds
    if (this._scrollMode === 'document' && this.nodes.size > 0) {
      const content = this.getContentBounds();
      const rect = this.canvas.getBoundingClientRect();
      const viewW = rect.width / this._scale;
      const viewH = rect.height / this._scale;
      const pad = this._padding || 200;
      targetX = Math.min(Math.max(x, content.x - viewW - pad), content.right + pad);
      targetY = Math.min(Math.max(y, content.y - viewH - pad), content.bottom + pad);
    }

    this.offsetX = targetX;
    this.offsetY = targetY;
    if (scale !== undefined) {
      this._scale = Math.max(this.minScale, Math.min(this.maxScale, scale));
      // Layer cache must be re-rendered at the new scale
      this.layerCache?.setScale(this._scale * (globalThis.devicePixelRatio || 1));
      // Update LOD label visibility immediately
      if (this.renderer instanceof Canvas2DRenderer) {
        this.renderer.setLabelsVisible(this.shouldShowLabels());
      }
    }
    this.invalidate();
    this.fireDiagramEvent('ViewportChanged', null, { x: targetX, y: targetY, scale: this._scale });
    this.fireDiagramEvent('ScrollChanged', null, { x: targetX, y: targetY });
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
    this._scale = Math.max(this.minScale, Math.min(this.maxScale, Math.min(scaleX, scaleY)));

    this.offsetX = minX - padding + (rect.width / this._scale - contentWidth) / 2;
    this.offsetY = minY - padding + (rect.height / this._scale - contentHeight) / 2;

    this.invalidate();
  }

  /** GoJS-compatible: Zoom the view so the given rect fills the viewport. */
  zoomToRect(rect: { x: number; y: number; width: number; height: number }, padding = 50): void {
    if (rect.width <= 0 || rect.height <= 0) return;
    const view = this.canvas.getBoundingClientRect();
    const contentWidth = rect.width + padding * 2;
    const contentHeight = rect.height + padding * 2;
    const scaleX = view.width / contentWidth;
    const scaleY = view.height / contentHeight;
    this._scale = Math.max(this.minScale, Math.min(this.maxScale, Math.min(scaleX, scaleY)));
    this.offsetX = rect.x - padding + (view.width / this._scale - contentWidth) / 2;
    this.offsetY = rect.y - padding + (view.height / this._scale - contentHeight) / 2;
    this.invalidate();
    this.fireDiagramEvent('ViewportChanged', null, { scale: this._scale });
  }

  /** Scroll the viewport to show a specific part. */
  scrollToPart(part: Part, _padding = 50): void {
    const rect = this.canvas.getBoundingClientRect();
    const partBounds = part.bounds;

    // Calculate the center of the part in diagram coordinates
    const partCenterX = partBounds.x + partBounds.width / 2;
    const partCenterY = partBounds.y + partBounds.height / 2;

    // Calculate the viewport center in diagram coordinates
    const viewportCenterX = this.offsetX + rect.width / (2 * this._scale);
    const viewportCenterY = this.offsetY + rect.height / (2 * this._scale);

    // Calculate the offset needed to center the part
    const dx = partCenterX - viewportCenterX;
    const dy = partCenterY - viewportCenterY;

    // Apply the offset
    this.offsetX += dx;
    this.offsetY += dy;

    this.invalidate();
  }

  /** GoJS-compatible: Scroll the view so that a rect is visible (optionally centered). */
  scrollToRect(rect: RectClass, center = false): void {
    const canvasRect = this.canvas.getBoundingClientRect();
    const viewW = canvasRect.width / this._scale;
    const viewH = canvasRect.height / this._scale;

    let targetX = this.offsetX;
    let targetY = this.offsetY;

    if (center) {
      targetX = rect.x + rect.width / 2 - viewW / 2;
      targetY = rect.y + rect.height / 2 - viewH / 2;
    } else {
      // Minimal scroll to bring the rect into view
      if (rect.x < this.offsetX) targetX = rect.x;
      if (rect.x + rect.width > this.offsetX + viewW) targetX = rect.x + rect.width - viewW;
      if (rect.y < this.offsetY) targetY = rect.y;
      if (rect.y + rect.height > this.offsetY + viewH) targetY = rect.y + rect.height - viewH;
    }

    this.setViewport(targetX, targetY);
  }

  /** GoJS-compatible: Scroll the view so that a rect is centered. */
  centerRect(rect: RectClass): void {
    this.scrollToRect(rect, true);
  }

  /** GoJS-compatible: Scroll the view so that a point is centered. */
  centerPoint(p: { x: number; y: number }): void {
    const canvasRect = this.canvas.getBoundingClientRect();
    const viewW = canvasRect.width / this._scale;
    const viewH = canvasRect.height / this._scale;
    this.setViewport(p.x - viewW / 2, p.y - viewH / 2);
  }

  /** Get the bounds of all content in the diagram. */
  getContentBounds(): RectClass {
    if (this.nodes.size === 0) {
      return new RectClass(0, 0, 0, 0);
    }

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

    return new RectClass(minX, minY, maxX - minX, maxY - minY);
  }

  /** Get the current viewport bounds in diagram coordinates. */
  getViewportBounds(): RectClass {
    const rect = this.canvas.getBoundingClientRect();
    return new RectClass(
      this.offsetX,
      this.offsetY,
      rect.width / this._scale,
      rect.height / this._scale,
    );
  }

  /** GoJS-compatible: Find all nodes that are tree roots (no parent key). */
  findTreeRoots(): Node[] {
    const model = this._model as unknown as { getParentKey?: (d: NodeData) => NodeKey | undefined };
    if (!model.getParentKey) return [];
    const roots: Node[] = [];
    for (const [, node] of this.nodes) {
      const data = node.data;
      if (data && model.getParentKey(data) === undefined) {
        roots.push(node);
      }
    }
    return roots;
  }

  /** GoJS-compatible: Find the tree children of a node. */
  findTreeChildren(node: Node): Node[] {
    const model = this._model as unknown as { getParentKey?: (d: NodeData) => NodeKey | undefined };
    if (!model.getParentKey) return [];
    const children: Node[] = [];
    for (const [, other] of this.nodes) {
      const data = other.data;
      if (data && model.getParentKey(data) === node.key) {
        children.push(other);
      }
    }
    return children;
  }

  /** GoJS-compatible: Find the tree parent of a node, or null. */
  findTreeParent(node: Node): Node | null {
    const model = this._model as unknown as { getParentKey?: (d: NodeData) => NodeKey | undefined };
    if (!model.getParentKey) return null;
    const data = node.data;
    if (!data) return null;
    const parentKey = model.getParentKey(data);
    if (parentKey === undefined) return null;
    return this.findNodeForKey(parentKey);
  }

  /** Destroy the diagram and clean up resources. */
  destroy(): void {
    if (this._isDestroyed) return;
    this._isDestroyed = true;

    this.stopRenderLoop();

    // Stop animations
    this._animationManager.cancelAll();

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
      this._model.removeChangedListener(this.modelChangeListener);
      this.modelChangeListener = null;
    }

    // Destroy context menu
    if (this.contextMenu) {
      this.contextMenu.destroy();
      this.contextMenu = null;
    }

    // Clear undo history
    this._undoManager.clear();

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
