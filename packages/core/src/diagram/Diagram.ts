import { AnimationManager } from '../animation/AnimationManager.ts';
import type { Binding } from '../binding/Binding.ts';
import { CommandHandler } from '../command/CommandHandler.ts';
import { InputEvent } from '../events/InputEvent.ts';
import type { ContextMenu } from '../export/ContextMenu.ts';
import { handleDrop } from '../export/Palette.ts';
import { PNGExporter } from '../export/PNGExporter.ts';
import { printDiagram } from '../export/PrintExporter.ts';
import { makeSvgElement } from '../export/SVGExporter.ts';
import { TooltipManager } from '../export/TooltipManager.ts';
import type { Rect } from '../geometry/Rect.ts';
import { Rect as RectClass } from '../geometry/Rect.ts';
import type { Spot } from '../geometry/Spot.ts';
import { createDefaultLayers, type Layer, LayerNames } from '../layer/Layer.ts';
import type { Layout } from '../layout/Layout.ts';
import { GraphLinksModel } from '../model/GraphLinksModel.ts';
import type {
  ChangedEvent,
  LinkCapableModel,
  LinkData,
  NodeData,
  NodeKey,
} from '../model/Model.ts';
import type { GraphObject } from '../panel/GraphObject.ts';
import type { Panel } from '../panel/Panel.ts';
import { Shape } from '../panel/Shape.ts';
import { Group } from '../parts/Group.ts';
import { type ArrowheadStyle, Link } from '../parts/Link.ts';
import { Node } from '../parts/Node.ts';
import type { Part } from '../parts/Part.ts';
import { Canvas2DRenderer } from '../render/Canvas2DRenderer.ts';
import { LayerCache } from '../render/LayerCache.ts';
import type { Renderer } from '../render/Renderer.ts';
import { type DiagramJSON, Serializer } from '../serialization/Serializer.ts';
import { PartPool } from '../spatial/PartPool.ts';
import { QuadTree } from '../spatial/QuadTree.ts';
import { VirtualizationManager } from '../spatial/VirtualizationManager.ts';
import { ClickCreatingTool } from '../tool/ClickCreatingTool.ts';
import { ClickSelectingTool } from '../tool/ClickSelectingTool.ts';
import { ContextMenuTool } from '../tool/ContextMenuTool.ts';
import { DraggingTool } from '../tool/DraggingTool.ts';
import { DragSelectingTool } from '../tool/DragSelectingTool.ts';
import { LinkingTool } from '../tool/LinkingTool.ts';
import { LinkLabelDraggingTool } from '../tool/LinkLabelDraggingTool.ts';
import { LinkReshapingTool } from '../tool/LinkReshapingTool.ts';
import { PanningTool } from '../tool/PanningTool.ts';
import { RelinkingTool } from '../tool/RelinkingTool.ts';
import { ResizingTool } from '../tool/ResizingTool.ts';
import { RotatingTool } from '../tool/RotatingTool.ts';
import { TextEditingTool } from '../tool/TextEditingTool.ts';
import { ToolManager } from '../tool/ToolManager.ts';
import { ZoomingTool } from '../tool/ZoomingTool.ts';
import type { Command } from '../undo/Command.ts';
import { ModelTransactionCommand } from '../undo/ModelTransactionCommand.ts';
import { UndoManager } from '../undo/UndoManager.ts';
import { type DiagramEvent, DiagramEvents, type DiagramEventType } from './DiagramEvents.ts';

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
  /**
   * Accessibility message formatters (aria-label, live-region
   * announcements). Defaults to English; override to localize. See
   * {@link AccessibilityMessages}.
   */
  accessibilityMessages?: Partial<AccessibilityMessages>;
}

/**
 * Message formatters for the diagram's accessibility features: the canvas
 * `aria-label` and the off-screen `aria-live` region announcements (see the
 * Interaction guide's Accessibility section). All defaults are in English;
 * override any subset via `DiagramOptions.accessibilityMessages` or
 * `diagram.accessibilityMessages = {...}` to localize.
 *
 * @experimental This interface is likely to grow more hooks (e.g. announcing
 * undo/redo or add/delete, not just selection/focus) before 1.0.0 — expect
 * additive changes, not removals.
 */
export interface AccessibilityMessages {
  /** Short description of a part, e.g. `Node "Alpha"` — used by the other messages below. */
  describePart(part: Part): string;
  /** The canvas `aria-label`, given the current content/selection counts. */
  ariaLabel(counts: { nodes: number; groups: number; links: number; selected: number }): string;
  /** Announcement when the selection becomes empty. */
  selectionCleared(): string;
  /** Announcement when exactly one part is selected (`description` from `describePart`). */
  singleSelected(description: string): string;
  /** Announcement when more than one part is selected. */
  multipleSelected(count: number): string;
  /** Announcement when the keyboard focus cursor moves (`description` from `describePart`). */
  focusMoved(description: string): string;
}

/** Default English {@link AccessibilityMessages}. */
export const defaultAccessibilityMessages: AccessibilityMessages = {
  describePart(part: Part): string {
    const label = (part as { label?: string }).label;
    if (part instanceof Group) return `Group "${label || String(part.key)}"`;
    if (part instanceof Link) return `Link from ${String(part.fromKey)} to ${String(part.toKey)}`;
    if (part instanceof Node) return `Node "${label || String(part.key)}"`;
    return `Item ${String(part.key)}`;
  },
  ariaLabel({ nodes, groups, links, selected }): string {
    let label = `Diagram with ${nodes} node${nodes === 1 ? '' : 's'}`;
    if (groups > 0) label += `, ${groups} group${groups === 1 ? '' : 's'}`;
    label += ` and ${links} link${links === 1 ? '' : 's'}`;
    if (selected > 0) label += `. ${selected} selected`;
    return label;
  },
  selectionCleared(): string {
    return 'Selection cleared';
  },
  singleSelected(description: string): string {
    return `${description} selected`;
  },
  multipleSelected(count: number): string {
    return `${count} items selected`;
  },
  focusMoved(description: string): string {
    return `Focus on ${description}`;
  },
};

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
  private _nodes: Map<NodeKey, Node> = new Map();
  private _groups: Map<NodeKey, Group> = new Map();
  private _links: Map<NodeKey, Link> = new Map();

  private _scale = 1;
  private offsetX = 0;
  private offsetY = 0;
  private _padding = 0;
  private _minScale: number;
  private _maxScale: number;
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
  private alignmentGuidelines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  /** Accessibility: the part with the keyboard focus cursor (Arrow keys, when nothing is selected). */
  private focusedPart: Part | null = null;
  /** Accessibility: off-screen `aria-live` region announcing selection/focus changes. */
  private liveRegion: HTMLElement | null = null;
  /** Accessibility: message formatters for the aria-label and live-region announcements (default: English). */
  accessibilityMessages: AccessibilityMessages;
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
  private _transactionStack: Array<{ events: ChangedEvent[]; name: string }> = [];
  private _contextMenuEl: HTMLElement | null = null;
  private backBuffer: HTMLCanvasElement | null = null;
  private backBufferEnabled = false;
  private layoutProbeCtx: CanvasRenderingContext2D | null = null;
  private hitIndex: QuadTree<Part> | null = null;
  private hitIndexDirty = true;
  private lodLabelThreshold = 0.3;
  private lodEnabled = false;
  private canvasListeners: Array<
    [string, EventListenerOrEventListenerObject, (AddEventListenerOptions | boolean)?]
  > = [];
  private _isDestroyed = false;

  /** GoJS-compatible: The minimum zoom scale. */
  get minScale(): number {
    return this._minScale;
  }

  /** GoJS-compatible: Set the minimum zoom scale. */
  set minScale(value: number) {
    if (Number.isFinite(value) && value > 0) {
      this._minScale = value;
    }
  }

  /** GoJS-compatible: The maximum zoom scale. */
  get maxScale(): number {
    return this._maxScale;
  }

  /** GoJS-compatible: Set the maximum zoom scale. */
  set maxScale(value: number) {
    if (Number.isFinite(value) && value > 0) {
      this._maxScale = value;
    }
  }

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
  private _groupTemplateMap: Map<string, Panel> = new Map();

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
    this._minScale = resolvedOptions.minScale ?? 0.1;
    this._maxScale = resolvedOptions.maxScale ?? 10;
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
    this.accessibilityMessages = {
      ...defaultAccessibilityMessages,
      ...resolvedOptions.accessibilityMessages,
    };

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    // Accessibility: keyboard-focusable, with a role/label describing an
    // interactive widget (updated as content/selection change) rather than a
    // static image.
    this.canvas.tabIndex = 0;
    this.canvas.setAttribute('role', 'application');
    this.canvas.setAttribute('aria-roledescription', 'diagram');
    this.container.appendChild(this.canvas);

    // Accessibility: visually-hidden live region announcing selection and
    // keyboard-focus-cursor changes to screen readers.
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('role', 'status');
    Object.assign(this.liveRegion.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      whiteSpace: 'nowrap',
    });
    this.container.appendChild(this.liveRegion);

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
    tm.registerTool('clickCreating', new ClickCreatingTool());
    tm.registerTool('contextMenu', new ContextMenuTool());
    tm.registerTool('linkReshaping', new LinkReshapingTool());
    tm.registerTool('linkLabelDragging', new LinkLabelDraggingTool());

    // Populate per-event tool lists (GoJS mouseDownTools order). clickCreating
    // is only ever a candidate once archetypeNodeData is set (see its
    // canStart), so it's placed alongside dragSelecting — both compete for an
    // empty-background click, ahead of the catch-all clickSelecting — rather
    // than after it, where clickSelecting's unconditional canStart would
    // always win first and clickCreating would never be reachable.
    // linkLabelDragging is first: its canStart only matches the small label
    // hit-box, so it must win before the broader relinking/resizing/etc.
    // hit-tests get a chance to claim the same click.
    for (const name of [
      'linkLabelDragging',
      'relinking',
      'resizing',
      'rotating',
      'linkReshaping',
      'linking',
      'dragging',
      'panning',
      'clickCreating',
      'dragSelecting',
      'clickSelecting',
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
      'linkLabelDragging',
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

  /** GoJS-compatible: Get the group template map. */
  get groupTemplateMap(): Map<string, Panel> {
    return this._groupTemplateMap;
  }

  /** GoJS-compatible: Add a node template for a category. */
  addNodeTemplate(category: string, template: Panel): void {
    this._nodeTemplateMap.set(category, template);
  }

  /** GoJS-compatible: Add a link template for a category. */
  addLinkTemplate(category: string, template: Panel): void {
    this._linkTemplateMap.set(category, template);
  }

  /** GoJS-compatible: Add a group template for a category. */
  addGroupTemplate(category: string, template: Panel): void {
    this._groupTemplateMap.set(category, template);
  }

  /** GoJS-compatible: Remove a node template by category. */
  removeNodeTemplate(category: string): boolean {
    return this._nodeTemplateMap.delete(category);
  }

  /** GoJS-compatible: Remove a link template by category. */
  removeLinkTemplate(category: string): boolean {
    return this._linkTemplateMap.delete(category);
  }

  /** GoJS-compatible: Remove a group template by category. */
  removeGroupTemplate(category: string): boolean {
    return this._groupTemplateMap.delete(category);
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
    if (type === 'SelectionChanged') {
      this.announceSelectionChange();
    }
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
    if (this._nodes.size > 0) {
      for (const [, node] of this._nodes) {
        minX = Math.min(minX, node.bounds.x);
        minY = Math.min(minY, node.bounds.y);
        maxX = Math.max(maxX, node.bounds.right);
        maxY = Math.max(maxY, node.bounds.bottom);
      }
    }
    const world = new RectClass(minX, minY, maxX - minX, maxY - minY);
    const parts: (Node | Link | Group)[] = [
      ...this._nodes.values(),
      ...this._links.values(),
      ...this._groups.values(),
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
    // Push a new event buffer so nested transactions keep the outer events
    this._transactionStack.push({ events: [], name });
    this._undoManager.beginTransaction(name);
    return true;
  }

  /** GoJS-compatible: Commit the current transaction. */
  commitTransaction(name = ''): boolean {
    const frame = this._transactionStack.pop();
    if (!frame) return false;

    // If model changes were made without explicit commands, wrap them in an
    // undoable ModelTransactionCommand so undo/redo works (GoJS behavior).
    if (frame.events.length > 0) {
      this._undoManager.execute(
        new ModelTransactionCommand(this._model, frame.events, name || frame.name),
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
      if (obj?.contextClick) {
        const input = new InputEvent(e);
        input.diagram = this;
        input.targetObject = obj;
        obj.contextClick(input, obj);
      }
    }
    // GoJS-compatible: fire the diagram-level context-click event
    if (part) {
      this.fireDiagramEvent('ObjectContextClicked', part, { x: point.x, y: point.y });
    } else {
      this.fireDiagramEvent('BackgroundContextClicked', null, { x: point.x, y: point.y });
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
      if (obj?.doubleClick) {
        const input = new InputEvent(e);
        input.diagram = this;
        input.targetObject = obj;
        input.clickCount = 2;
        obj.doubleClick(input, obj);
      }
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
      if (obj?.click) {
        const input = new InputEvent(e);
        input.diagram = this;
        input.targetObject = obj;
        input.clickCount = 1;
        obj.click(input, obj);
      }
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
      // Accessibility: with nothing selected and the diagram focused, arrow
      // keys move a keyboard focus cursor between parts instead of nudging
      // (there is nothing to nudge); this never changes the existing
      // nudge-a-selection behavior below.
      if (this.selectedParts.size === 0 && document.activeElement === this.canvas) {
        const direction = e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 1;
        this.moveFocusCursor(direction);
      } else {
        const dx = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0;
        const dy = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0;
        this._commandHandler.nudgeSelection(dx, dy, this._scale);
      }
    } else if (
      (e.key === 'Enter' || e.key === ' ') &&
      this.focusedPart &&
      document.activeElement === this.canvas
    ) {
      e.preventDefault();
      this.select(this.focusedPart);
    } else if (e.key === 'Escape' && document.activeElement === this.canvas) {
      if (this.focusedPart) {
        this.focusedPart = null;
        this.invalidate();
      }
      this.clearSelection();
    }
  }

  /**
   * Handle touch start. A single finger touching a draggable node/group starts
   * the dragging tool directly (mirroring a left mouse-button press on it);
   * otherwise it falls back to panning the empty canvas exactly as before.
   * Two fingers always pinch-zoom.
   */
  private handleTouchStart(e: TouchEvent): void {
    e.preventDefault();
    const touches = e.touches;

    if (touches.length === 1) {
      const t = touches[0]!;
      const synthetic = new MouseEvent('mousedown', {
        clientX: t.clientX,
        clientY: t.clientY,
        button: 0,
        buttons: 1,
      });
      const dragging = this._toolManager.getTool('dragging');
      if (dragging?.canStart('dragging', synthetic)) {
        this._toolManager.activateTool('dragging');
        dragging.doStart(synthetic);
        dragging.doMouseDown(synthetic);
        this.touchState = null;
        return;
      }

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

  /** Handle touch move (drags a node if one was grabbed on touch start; otherwise pan or pinch-zoom). */
  private handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    const touches = e.touches;

    const dragging = this._toolManager.getTool('dragging');
    if (touches.length === 1 && dragging?.isActive) {
      const t = touches[0]!;
      dragging.doMouseMove(
        new MouseEvent('mousemove', {
          clientX: t.clientX,
          clientY: t.clientY,
          button: 0,
          buttons: 1,
        }),
      );
      return;
    }

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
      // Two-finger pinch-zoom + pan. Keep the diagram point that was under
      // the gesture's starting midpoint pinned under the *current* midpoint:
      // anchor the diagram point using the OLD scale, then re-project it to
      // the new midpoint using the NEW scale (same pattern as
      // ZoomingTool.doMouseWheel's cursor-anchored zoom, generalized to a
      // moving anchor).
      const t0 = touches[0]!;
      const t1 = touches[1]!;
      const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      const ratio = dist / this.touchState.startDistance;
      const newScale = Math.max(
        this._minScale,
        Math.min(this._maxScale, this.touchState.startScale * ratio),
      );
      const rect = this.canvas.getBoundingClientRect();
      const anchorX = this.touchState.startTouchX - rect.left;
      const anchorY = this.touchState.startTouchY - rect.top;
      const diagramAnchorX = anchorX / this.touchState.startScale + this.touchState.startOffsetX;
      const diagramAnchorY = anchorY / this.touchState.startScale + this.touchState.startOffsetY;
      const midX = (t0.clientX + t1.clientX) / 2 - rect.left;
      const midY = (t0.clientY + t1.clientY) / 2 - rect.top;
      this.setViewport(
        diagramAnchorX - midX / newScale,
        diagramAnchorY - midY / newScale,
        newScale,
      );
    }
  }

  /** Handle touch end. */
  private handleTouchEnd(e: TouchEvent): void {
    e.preventDefault();
    const dragging = this._toolManager.getTool('dragging');
    if (dragging?.isActive) {
      dragging.doMouseUp(new MouseEvent('mouseup', { button: 0, buttons: 0 }));
      this._toolManager.deactivateTool();
    }
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

    // Native palette drag-and-drop
    this.addCanvasListener('dragover', (e) => {
      e.preventDefault();
    });
    this.addCanvasListener('drop', (e) => {
      if (this.allowDrop === false) return;
      const dragEvent = e as DragEvent;
      const templateId = dragEvent.dataTransfer?.getData('application/x-graphojs-template');
      if (!templateId) return;
      e.preventDefault();
      const dropped = handleDrop(dragEvent, this);
      if (dropped) {
        this.fireDiagramEvent('ExternalObjectsDropped', null, { templateId });
      }
    });

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
    const top = this._transactionStack[this._transactionStack.length - 1];
    if (top) {
      top.events.push(event);
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
      let shouldRemove = false;
      if (part instanceof Node && !this._model.containsNode(key)) {
        shouldRemove = true;
      } else if (part instanceof Group && !this._model.containsNode(key)) {
        shouldRemove = true;
      } else if (part instanceof Link) {
        const linkKey = part.key;
        const linkData = this._model
          .getLinkDataArray()
          .find((l) => this.getLinkKeyOf(l) === linkKey);
        if (!linkData) shouldRemove = true;
      }
      if (shouldRemove) {
        this.removePartByKey(
          part.key,
          part instanceof Link ? 'link' : part instanceof Group ? 'group' : 'node',
        );
      }
    }

    // Add/update nodes and groups
    for (const nodeData of this._model.getNodeDataArray()) {
      const key = this._model.getNodeKey(nodeData);
      const isGroup = nodeData.isGroup === true;

      if (isGroup) {
        let group = this._groups.get(key);
        if (!group) {
          group = this.createGroup(nodeData);
        }
        this.updateGroupFromData(group, nodeData);

        // Sync members: add nodes/links whose groupKey matches this group
        for (const [memberKey, node] of this._nodes) {
          if (node.containingGroup === group) continue;
          const memberData = this._model.getNodeData(memberKey);
          if (memberData && memberData.group === key) {
            group.add(node);
          }
        }
      } else {
        let node = this._nodes.get(key);
        if (!node) {
          node = this.createNode(nodeData);
        }
        // Applies label/fill/stroke/angle/zOrder and reparents to nodeData.group.
        this.updateNodeFromData(node, nodeData);
      }
    }

    // Add/update links
    for (const linkData of this.getLinksArray()) {
      const linkKey = this.getLinkKeyOf(linkData);
      if (linkKey === undefined) continue;

      let link = this._links.get(linkKey);
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
      const fromNode = this._nodes.get(linkData.from);
      const toNode = this._nodes.get(linkData.to);
      if (fromNode && toNode) {
        const fromPoint = this.connectionPointFor(
          fromNode,
          toNode.center,
          linkData.fromPort as string | undefined,
          link.fromSpot,
        );
        const toPoint = this.connectionPointFor(
          toNode,
          fromNode.center,
          linkData.toPort as string | undefined,
          link.toSpot,
        );
        link.fromPort = fromPoint;
        link.toPort = toPoint;

        // Compute path points based on routing, unless the user manually
        // reshaped this link and neither endpoint has moved since.
        if (!link.hasManualReshape) {
          if (link.routing === 'orthogonal') {
            link.setPathPoints(computeOrthogonalPath(fromPoint, toPoint));
          } else if (link.routing === 'curved') {
            link.setPathPoints(computeCurvedPath(fromPoint, toPoint));
          } else {
            link.setPathPoints([fromPoint, toPoint]);
          }
        }
        link.updateBounds();
      }

      // Add to parent group if specified (removing from any previous one)
      this.reparentToGroup(link, linkData.group as NodeKey | undefined);
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
    this.updateCanvasAriaLabel();
  }

  /** Get the model data object for a part (node data or link data). */
  private getDataForPart(part: Part): NodeData | LinkData | undefined {
    if (part instanceof Link) {
      const linkKey = part.key;
      return this.getLinksArray().find((l) => this.getLinkKeyOf(l) === linkKey);
    }
    return this._model.getNodeData(part.key);
  }

  /**
   * The link data array, or [] when the model has no links. `_model` is
   * typed as `GraphLinksModel`, but GoJS-compatible code can assign a
   * `TreeModel` via `diagram.model = treeModel as unknown as GraphLinksModel`
   * (mirroring real GoJS, where `Diagram.model` accepts any `Model`), so this
   * still has to check the capability at runtime rather than assume it.
   */
  private getLinksArray(): LinkData[] {
    const m = this._model as unknown as Partial<LinkCapableModel>;
    return m.getLinkDataArray ? [...m.getLinkDataArray()] : [];
  }

  /** Get a link's key, or undefined when the model has no links (see `getLinksArray`). */
  private getLinkKeyOf(linkData: LinkData): NodeKey | undefined {
    const m = this._model as unknown as Partial<LinkCapableModel>;
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
        // A new node changes the obstacle set for links routing around it.
        this.invalidateAllLinkPaths();
        break;
      }
      case 'node Removed': {
        if (event.node) {
          const key = this._model.getNodeKey(event.node);
          this.removePartByKey(key, 'node');
        }
        // A removed node changes the obstacle set for links that routed around it.
        this.invalidateAllLinkPaths();
        break;
      }
      case 'property Changed': {
        if (event.node) {
          this.syncNodeFromModel(event.node);
          // A node's own bounds/ports may have changed; keep its links anchored.
          this.invalidateLinksForNode(this._model.getNodeKey(event.node));
        }
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
      let group = this._groups.get(key);
      if (!group) {
        group = this.createGroup(nodeData);
      }
      this.updateGroupFromData(group, nodeData);
      this.syncGroupMembers(group);
      return;
    }

    let node = this._nodes.get(key);
    if (!node) {
      node = this.createNode(nodeData);
    }
    this.updateNodeFromData(node, nodeData);
  }

  /** Sync a single link data into its visual part (create if needed). */
  private syncLinkFromModel(linkData: LinkData): void {
    const linkKey = this.getLinkKeyOf(linkData);
    if (linkKey === undefined) return;

    let link = this._links.get(linkKey);
    if (!link) {
      link = this.createLink(linkData);
    }
    this.updateLinkFromData(link, linkData);
  }

  /**
   * A dedicated, off-screen canvas context used only to run a panel's
   * layout (measure/arrange) logic once outside the real render loop —
   * never rendered anywhere, so it can't leak state onto the visible canvas.
   */
  private getLayoutProbeContext(): CanvasRenderingContext2D | null {
    if (!this.layoutProbeCtx) {
      const probeCanvas = document.createElement('canvas');
      this.layoutProbeCtx = probeCanvas.getContext('2d');
    }
    return this.layoutProbeCtx;
  }

  /**
   * Move a node/link into the group referenced by groupKey, removing it from
   * any previous group first — otherwise a reparented (or ungrouped) part
   * stays listed in its old group's memberParts, so that group keeps
   * dragging/collapsing/sizing around a part it no longer owns.
   */
  private reparentToGroup(part: Node | Link, groupKey: NodeKey | undefined): void {
    const currentGroup = part.containingGroup;
    const newGroup = groupKey !== undefined ? this._groups.get(groupKey) : undefined;
    if (currentGroup instanceof Group && currentGroup !== newGroup) {
      currentGroup.remove(part);
    }
    if (newGroup && !newGroup.contains(part)) {
      newGroup.add(part);
    }
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
      // Run one throwaway layout pass so element positions (and therefore
      // declarative port spots) are already correct before anything — e.g. a
      // link connecting to a named port in this same model load — reads them.
      // Without this, ports resolve to (0,0) until the node is first painted.
      const probeCtx = this.getLayoutProbeContext();
      if (probeCtx) {
        try {
          cloned.setPosition(0, 0);
          cloned.setActualSize(width, height);
          cloned.draw(probeCtx, x, y, width, height);
        } catch {
          // Incomplete Canvas 2D implementation (e.g. some headless/test
          // environments) — fall back silently; ports will still resolve
          // correctly on the node's first real render via updatePortSpots().
        }
      }
      // Collect declarative ports (GraphObjects with portId)
      node.collectPortsFromPanel();
    }

    const layerName = (nodeData.layer as string) ?? LayerNames.Default;
    const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
    if (layer) node.layer = layer;
    node.diagram = this;
    this.parts.set(key, node);
    this._nodes.set(key, node);
    this.fireDiagramEvent('PartAdded', node);
    this.markHitIndexDirty();
    return node;
  }

  /** Apply templateProperties (e.g. routing, corner) to a created part. */
  private applyTemplateProperties(part: Part, props: Record<string, unknown>): void {
    for (const [key, value] of Object.entries(props)) {
      if (key === '__bindings__' && Array.isArray(value)) {
        for (const b of value as Binding[]) {
          part.addBinding(b);
        }
        continue;
      }
      if (key === '__binding__') {
        part.addBinding(value as Binding);
        continue;
      }
      if (key === 'width') {
        part.bounds.width = value as number;
        continue;
      }
      if (key === 'height') {
        part.bounds.height = value as number;
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

    // Apply GoJS-compatible group template if set. A category-specific
    // template (groupTemplateMap) takes priority over the single default
    // groupTemplate, matching how node/link category templates are resolved.
    const category = nodeData.category as string | undefined;
    const groupTemplate =
      (category !== undefined ? this._groupTemplateMap.get(category) : undefined) ??
      this._groupTemplate;
    if (groupTemplate) {
      const cloned = groupTemplate.clone();
      group.panel = cloned;
      this.applyTemplateProperties(group, cloned.templateProperties);
    }

    const layerName = (nodeData.layer as string) ?? LayerNames.Default;
    const layer = this.getLayer(layerName) ?? this.getLayer(LayerNames.Default);
    if (layer) group.layer = layer;
    group.diagram = this;
    this.parts.set(key, group);
    this._groups.set(key, group);
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
    link.diagram = this;
    this.parts.set(this.linkPartKey(linkKey as NodeKey), link);
    this._links.set(linkKey as NodeKey, link);
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

    if (!node.bounds) {
      node.bounds = new RectClass(0, 0, 100, 50);
    }
    const { x, y } = this.nodeDataBounds(nodeData);
    // Only override width/height when the node data explicitly defines them;
    // otherwise keep the size from the template (or the initial creation).
    if (nodeData.width !== undefined) node.bounds.width = nodeData.width as number;
    if (nodeData.height !== undefined) node.bounds.height = nodeData.height as number;
    node.bounds.x = x;
    node.bounds.y = y;
    node.label = (nodeData.label as string) ?? node.label;
    node.fill = (nodeData.fill as string) ?? node.fill;
    node.stroke = (nodeData.stroke as string) ?? node.stroke;
    node.angle = (nodeData.angle as number) ?? node.angle;
    node.zOrder = (nodeData.zOrder as number) ?? node.zOrder;

    // Add to parent group if specified (removing from any previous one)
    this.reparentToGroup(node, nodeData.group as NodeKey | undefined);

    // Apply bindings
    if (node.bindings.length > 0 || node.panel !== null) {
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
    // Keep fromKey/toKey in sync with the model (fixes stale endpoints after relink)
    if (linkData.from !== link.fromKey) {
      link.fromKey = linkData.from;
      link.hasManualReshape = false;
    }
    if (linkData.to !== link.toKey) {
      link.toKey = linkData.to;
      link.hasManualReshape = false;
    }
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

    const fromNode = this._nodes.get(linkData.from);
    const toNode = this._nodes.get(linkData.to);
    if (fromNode && toNode) {
      const fromPoint = this.connectionPointFor(
        fromNode,
        toNode.center,
        linkData.fromPort as string | undefined,
        link.fromSpot,
      );
      const toPoint = this.connectionPointFor(
        toNode,
        fromNode.center,
        linkData.toPort as string | undefined,
        link.toSpot,
      );
      link.fromPort = fromPoint;
      link.toPort = toPoint;

      if (!link.hasManualReshape) {
        if (link.routing === 'orthogonal') {
          link.setPathPoints(computeOrthogonalPath(fromPoint, toPoint));
        } else if (link.routing === 'curved') {
          link.setPathPoints(computeCurvedPath(fromPoint, toPoint));
        } else {
          link.setPathPoints([fromPoint, toPoint]);
        }
      }
      link.updateBounds();
    }

    this.reparentToGroup(link, linkData.group as NodeKey | undefined);

    this.hitIndex?.insertWithBounds(link.bounds, link);
  }

  private syncGroupMembers(group: Group): void {
    for (const [memberKey, node] of this._nodes) {
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
      part = this._links.get(key) ?? (this.parts.get(this.linkPartKey(key)) as Link | undefined);
    } else if (type === 'group') {
      part = this._groups.get(key);
    } else if (type === 'node') {
      part = this._nodes.get(key);
    } else {
      part = this.getPartByKey(key);
    }
    if (!part) return;

    if (this.focusedPart === part) this.focusedPart = null;

    // Detach from its layer so it is no longer rendered
    if (part.layer) {
      part.layer.remove(part);
      part.layer = null;
    }
    part.diagram = null;

    if (part instanceof Node) {
      this._nodes.delete(key);
    } else if (part instanceof Group) {
      this._groups.delete(key);
    } else if (part instanceof Link) {
      this._links.delete(key);
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
    for (const [, node] of this._nodes) {
      if (node.shapeContainsPoint({ x, y })) {
        return node;
      }
    }

    // Check links
    for (const [, link] of this._links) {
      if (link.containsPoint({ x, y })) {
        return link;
      }
    }

    // Check groups (below nodes)
    for (const [, group] of this._groups) {
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
    return this._nodes.get(key) ?? null;
  }

  /** GoJS-compatible: Find a part (node, group, or link) by its model key. */
  findPartForKey(key: NodeKey): Part | null {
    return this.parts.get(key) ?? null;
  }

  /** GoJS-compatible: Find a link part by its model key. */
  findLinkForKey(key: NodeKey): Link | null {
    return this._links.get(key) ?? null;
  }

  /** GoJS-compatible: Find a node part by its model data object. */
  findNodeForData(data: NodeData): Node | null {
    const key = this._model.getNodeKey(data);
    return this._nodes.get(key) ?? null;
  }

  /** GoJS-compatible: Find a link part by its model data object. */
  findLinkForData(data: LinkData): Link | null {
    const key = this.getLinkKeyOf(data);
    if (key === undefined) return null;
    return this._links.get(key) ?? null;
  }

  /** GoJS-compatible: Remove all parts and clear the model. */
  clear(): void {
    this.parts.clear();
    this._nodes.clear();
    this._links.clear();
    this._groups.clear();
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

  /**
   * GoJS-compatible ("GuidedDraggingTool" extension style): show temporary
   * alignment guideline segments while dragging, snapped to the edges/centers
   * of nearby parts.
   */
  showAlignmentGuidelines(lines: Array<{ x1: number; y1: number; x2: number; y2: number }>): void {
    this.alignmentGuidelines = lines;
    this.invalidate();
  }

  /** Hide any alignment guidelines currently shown. */
  hideAlignmentGuidelines(): void {
    if (this.alignmentGuidelines.length > 0) {
      this.alignmentGuidelines = [];
      this.invalidate();
    }
  }

  /** Get the alignment guideline segments currently shown. */
  getAlignmentGuidelines(): Array<{ x1: number; y1: number; x2: number; y2: number }> {
    return this.alignmentGuidelines;
  }

  /** Select all parts intersecting a rectangle. */
  selectPartsInRect(
    rect: { x: number; y: number; width: number; height: number },
    partialInclusion = true,
  ): void {
    // Build a real Rect instance: containsRect/intersects are called ON this
    // value below, so a plain {x,y,width,height} literal (as passed by
    // DragSelectingTool) would be missing its prototype methods.
    const r = new RectClass(rect.x, rect.y, rect.width, rect.height);
    for (const [, node] of this._nodes) {
      const hit = partialInclusion ? node.bounds.intersects(r) : r.containsRect(node.bounds);
      if (hit) {
        this.select(node, true);
      }
    }
    for (const [, link] of this._links) {
      const hit = partialInclusion ? link.bounds.intersects(r) : r.containsRect(link.bounds);
      if (hit) {
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

  /** Accessibility: push a message to the off-screen live region. */
  private announce(message: string): void {
    if (this.liveRegion) this.liveRegion.textContent = message;
  }

  /** Accessibility: refresh the canvas's aria-label to reflect content/selection counts. */
  private updateCanvasAriaLabel(): void {
    const label = this.accessibilityMessages.ariaLabel({
      nodes: this._nodes.size,
      groups: this._groups.size,
      links: this._links.size,
      selected: this.selectedParts.size,
    });
    this.canvas.setAttribute('aria-label', label);
  }

  /** Accessibility: announce the current selection and refresh the aria-label. */
  private announceSelectionChange(): void {
    const parts = this.getSelectedParts();
    const m = this.accessibilityMessages;
    if (parts.length === 0) {
      this.announce(m.selectionCleared());
    } else if (parts.length === 1) {
      this.announce(m.singleSelected(m.describePart(parts[0]!)));
    } else {
      this.announce(m.multipleSelected(parts.length));
    }
    this.updateCanvasAriaLabel();
  }

  /**
   * Accessibility: move the keyboard focus cursor to the next/previous part
   * (Arrow keys, only while nothing is selected — see `handleKeyDown`) and
   * announce it. The cursor wraps and is drawn as a dashed outline in `render()`.
   */
  private moveFocusCursor(direction: 1 | -1): void {
    const allParts: Part[] = [
      ...this._nodes.values(),
      ...this._groups.values(),
      ...this._links.values(),
    ];
    if (allParts.length === 0) return;
    const currentIndex = this.focusedPart ? allParts.indexOf(this.focusedPart) : -1;
    const nextIndex = (currentIndex + direction + allParts.length) % allParts.length;
    this.focusedPart = allParts[nextIndex] ?? null;
    this.invalidate();
    if (this.focusedPart) {
      this.announce(
        this.accessibilityMessages.focusMoved(
          this.accessibilityMessages.describePart(this.focusedPart),
        ),
      );
    }
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
    this.fireDiagramEvent('ChangingSelection', part);
    part.isSelected = false;
    this.selectedParts.delete(part);
    this.invalidate();
    this.fireDiagramEvent('SelectionChanged', null);
    this.fireDiagramEvent('ChangedSelection', null);
  }

  /** GoJS-compatible: Find a group part by its model key. */
  findGroupForKey(key: NodeKey): Group | null {
    return this._groups.get(key) ?? null;
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

  /** GoJS-compatible: The set of currently selected parts. */
  get selection(): (Node | Link | Group)[] {
    return this.getSelectedParts();
  }

  /** GoJS-compatible: All links in this diagram. */
  get allLinks(): Link[] {
    return Array.from(this._links.values());
  }

  /** GoJS-compatible: All nodes in this diagram (as an array). */
  get allNodes(): Node[] {
    return Array.from(this._nodes.values());
  }

  /** GoJS-compatible: The nodes in this diagram. */
  get nodes(): ReadonlyMap<NodeKey, Node> {
    return this._nodes;
  }

  /** GoJS-compatible: The links in this diagram. */
  get links(): ReadonlyMap<NodeKey, Link> {
    return this._links;
  }

  /** GoJS-compatible: The groups in this diagram. */
  get groups(): ReadonlyMap<NodeKey, Group> {
    return this._groups;
  }

  /** GoJS-compatible: Whether a node (group) subgraph is expanded. */
  isTreeExpanded(node: Node): boolean {
    if (node instanceof Group) {
      return node.isSubGraphExpanded;
    }
    return true;
  }

  /** GoJS-compatible: Get the bounds of the diagram canvas in page/screen coordinates. */
  getCanvasBounds(): { x: number; y: number; width: number; height: number } {
    const rect = this.container.getBoundingClientRect();
    return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
  }

  private _gridPattern: unknown = null;

  /** GoJS-compatible: A Shape (or null) used as a grid pattern behind the diagram. */
  get grid(): unknown {
    return this._gridPattern;
  }

  set grid(value: unknown) {
    this._gridPattern = value;
    this.invalidate();
  }

  private _contentAlignment: Spot | null = null;

  /** GoJS-compatible: The alignment of the diagram content within the viewport. */
  get contentAlignment(): Spot | null {
    return this._contentAlignment ?? this._initialContentAlignment;
  }

  set contentAlignment(value: Spot | null) {
    this._contentAlignment = value;
    this.invalidate();
  }

  private _autoScale: number = 0;

  /** GoJS-compatible: AutoScale mode (0=None, 1=Uniform, 2=Fit). */
  get autoScale(): number {
    return this._autoScale;
  }

  set autoScale(value: number) {
    this._autoScale = value;
    this.invalidate();
  }

  private _scrollBehavior: number = 0;

  /** GoJS-compatible: How scrolling and scrollbars behave. */
  get scrollBehavior(): number {
    return this._scrollBehavior;
  }

  set scrollBehavior(value: number) {
    this._scrollBehavior = value;
  }

  /** GoJS-compatible: Request a redraw of the diagram. */
  requestUpdate(): void {
    this.invalidate();
  }

  /** Set the model. */
  setModel(model: GraphLinksModel): void {
    if (this.modelChangeListener) {
      this._model.removeChangedListener(this.modelChangeListener);
    }
    // Clear stale parts and history when switching to a different model
    for (const layer of this._layers) layer.clear();
    this.parts.clear();
    this._nodes.clear();
    this._links.clear();
    this._groups.clear();
    this.selectedParts.clear();
    this._undoManager.clear();
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
    if (this._layout && this._layout !== value) this._layout.diagram = null;
    this._layout = value;
    if (value) value.diagram = this;
    this.applyDiagramLayout();
  }

  /** Apply the diagram layout to the current nodes and links. */
  private applyDiagramLayout(): void {
    const layout = this._layout;
    if (!layout) return;
    const nodes = Array.from(this._nodes.values());
    const links = Array.from(this._links.values());
    layout.apply(nodes, links);
    this.recomputeAllLinkEndpoints();
    this.invalidate();
  }

  /** GoJS-compatible: Run the diagram layout (or the given layout) on all parts. */
  layoutDiagram(layout?: Layout): void {
    const target = layout ?? this._layout;
    if (!target) return;
    const nodes = Array.from(this._nodes.values());
    const links = Array.from(this._links.values());
    target.apply(nodes, links);
    this.recomputeAllLinkEndpoints();
    this.invalidate();
    this.fireDiagramEvent('LayoutCompleted', null, { layout: target });
  }

  /** GoJS-compatible: Run the layout on the given parts. */
  layoutParts(parts: readonly Part[]): void {
    const target = this._layout;
    if (!target) return;
    const nodes = parts.filter((p): p is Node => p instanceof Node);
    const links = parts.filter((p): p is Link => p instanceof Link);
    target.apply(nodes, links);
    this.recomputeAllLinkEndpoints();
    this.invalidate();
  }

  /** GoJS-compatible: The HTML element this diagram renders into. */
  get div(): HTMLDivElement {
    return this.container;
  }

  /** GoJS-compatible: Get the HTML element this diagram renders into. */
  getDiagramDiv(): HTMLDivElement {
    return this.container;
  }

  /** GoJS-compatible: Give keyboard focus to the diagram's div. */
  focus(): void {
    if (this.container && typeof this.container.focus === 'function') {
      this.container.focus();
    }
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

  private _modelChangedListener: ((event: ChangedEvent) => void) | null = null;

  /** GoJS-compatible: A listener called when the model changes (single handler). */
  set modelChanged(listener: ((event: ChangedEvent) => void) | null) {
    if (this._modelChangedListener) {
      this._model.removeChangedListener(this._modelChangedListener);
    }
    this._modelChangedListener = listener;
    if (listener) {
      this._model.addChangedListener(listener);
    }
  }

  get modelChanged(): ((event: ChangedEvent) => void) | null {
    return this._modelChangedListener;
  }

  /** Get a layer by name. */
  getLayer(name: string): Layer | undefined {
    return this._layers.find((l) => l.name === name);
  }

  /** GoJS-compatible: Find a layer by name. */
  findLayer(name: string): Layer | null {
    return this._layers.find((l) => l.name === name) ?? null;
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
      if (layer.visible === false) continue;

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

    // Render alignment guidelines (GuidedDraggingTool-style)
    if (this.alignmentGuidelines.length > 0) {
      ctx.save();
      ctx.strokeStyle = '#e91e63';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      for (const line of this.alignmentGuidelines) {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();
    }

    // Render the keyboard focus cursor (accessibility)
    if (this.focusedPart?.visible) {
      const b = this.focusedPart.bounds;
      ctx.save();
      ctx.strokeStyle = '#6200ea';
      ctx.lineWidth = 2;
      ctx.setLineDash([2, 2]);
      ctx.strokeRect(b.x - 4, b.y - 4, b.width + 8, b.height + 8);
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
    this._scale = Math.max(this._minScale, Math.min(this._maxScale, value));
    this.invalidate();
  }

  /**
   * Print the diagram by opening the browser's print dialog with the
   * diagram embedded as vector SVG (default) or a raster PNG image.
   */
  print(options?: {
    title?: string;
    background?: string;
    padding?: number;
    scale?: number;
    fitToPage?: boolean;
    format?: 'svg' | 'png';
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
    this._scale = Math.max(this._minScale, Math.min(this._maxScale, value));
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

  set padding(value: number | { left: number; top: number; right: number; bottom: number }) {
    this._padding = typeof value === 'number' ? value : value.left;
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

  /** GoJS-compatible: Add a part directly to the diagram (and its data to the model). */
  add(part: Part): void {
    const key = part.key;
    if (key === undefined) return;
    if (this.parts.has(key)) return;
    if (part instanceof Node) {
      this._nodes.set(key, part);
      this.parts.set(key, part);
      // Keep the model in sync when adding a part with attached data
      if (part.data && !this._model.containsNode(key)) {
        this._model.addNode({ ...part.data });
      }
    } else if (part instanceof Group) {
      this._groups.set(key, part);
      this.parts.set(key, part);
      if (part.data && !this._model.containsNode(key)) {
        this._model.addNode({ ...part.data });
      }
    } else if (part instanceof Link) {
      this._links.set(key, part);
      this.parts.set(this.linkPartKey(key), part);
      const linkData = part.data as LinkData | null;
      if (linkData && !this.getLinkKeyOf(linkData)) {
        this.getLinksArray();
      }
    }
    const layer =
      this.getLayer(part.layerName ?? LayerNames.Default) ?? this.getLayer(LayerNames.Default);
    if (layer) part.layer = layer;
    part.diagram = this;
    this.markHitIndexDirty();
    this.fireDiagramEvent('PartAdded', part);
    this.invalidate();
  }

  /** GoJS-compatible: Add multiple parts at once. */
  addParts(parts: Iterable<Part>): void {
    for (const part of parts) this.add(part);
  }

  /** GoJS-compatible: Remove multiple parts at once. */
  removeParts(parts: Iterable<Part>): void {
    for (const part of parts) this.remove(part);
  }

  /** GoJS-compatible: Remove a part directly from the diagram. */
  remove(part: Part): void {
    const key = part.key;
    if (key === undefined) return;
    // Also remove the part's data from the model when it came from the model
    if (part.data) {
      if (part instanceof Link) {
        const linkKey = this.getLinkKeyOf(part.data as LinkData);
        if (linkKey !== undefined && this._model.getLinkData(linkKey)) {
          this._model.removeLink(linkKey);
        }
      } else if (this._model.containsNode(key)) {
        this._model.removeNode(key);
      }
    }
    this.removePartByKey(
      key,
      part instanceof Link ? 'link' : part instanceof Group ? 'group' : 'node',
    );
  }

  /** Set the viewport. */
  setViewport(x: number, y: number, scale?: number): void {
    let targetX = x;
    let targetY = y;

    // In 'document' scroll mode, keep the viewport within the content bounds
    if (this._scrollMode === 'document' && this._nodes.size > 0) {
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
      this._scale = Math.max(this._minScale, Math.min(this._maxScale, scale));
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

  /**
   * Recompute the connection points of links attached to a node from its
   * current bounds, and clear the cached paths so the renderer re-routes:
   * adjacent links keep following the node during drags/resizes and after
   * programmatic bounds changes, while non-adjacent auto-routed links re-route
   * around the moved node (it may be an obstacle for them). Manually-reshaped
   * routes are only discarded for links attached to the moved node.
   */
  invalidateLinksForNode(nodeKey: NodeKey): void {
    for (const [, link] of this._links) {
      if (link.fromKey === nodeKey || link.toKey === nodeKey) {
        this.recomputeLinkEndpoints(link);
        link.setPathPoints([]);
        // The node it's attached to moved — a manually-reshaped route no
        // longer reflects reality, so fall back to auto-routing.
        link.hasManualReshape = false;
      } else if (!link.hasManualReshape) {
        // The moved node may be an obstacle for this link; clear its cached
        // path so the renderer re-routes it around the new obstacle layout.
        link.setPathPoints([]);
      }
    }
    if (this.renderer instanceof Canvas2DRenderer) {
      this.renderer.invalidateLinkPaths();
    }
  }

  /**
   * Clear every auto-routed link's cached path so the renderer re-routes them.
   * Used when the obstacle set changes (a node is added/removed) so links
   * routing around obstacles are recomputed. Manually-reshaped routes survive.
   */
  private invalidateAllLinkPaths(): void {
    for (const [, link] of this._links) {
      if (!link.hasManualReshape) {
        link.setPathPoints([]);
      }
    }
    if (this.renderer instanceof Canvas2DRenderer) {
      this.renderer.invalidateLinkPaths();
    }
  }

  /**
   * Recompute every auto-routed link's endpoints and cached path after a
   * layout pass has moved nodes. Layouts reposition nodes but never touch
   * links, so without this each link would keep its stale from/to ports.
   */
  private recomputeAllLinkEndpoints(): void {
    for (const [, link] of this._links) {
      if (link.hasManualReshape) continue;
      this.recomputeLinkEndpoints(link);
      link.setPathPoints([]);
    }
    if (this.renderer instanceof Canvas2DRenderer) {
      this.renderer.invalidateLinkPaths();
    }
  }

  /** Recompute a link's from/to connection points from its endpoints' current bounds. */
  private recomputeLinkEndpoints(link: Link): void {
    const fromNode = this._nodes.get(link.fromKey);
    const toNode = this._nodes.get(link.toKey);
    if (!fromNode || !toNode) return;
    link.fromPort = this.connectionPointFor(
      fromNode,
      toNode.center,
      link.fromPortName,
      link.fromSpot,
    );
    link.toPort = this.connectionPointFor(toNode, fromNode.center, link.toPortName, link.toSpot);
  }

  /**
   * Compute a link endpoint's connection point on a node. An explicit
   * fromSpot/toSpot on the link forces attachment at that fixed fractional
   * spot on the node, overriding the port-name/nearest-edge computation.
   */
  private connectionPointFor(
    node: Node,
    target: { x: number; y: number },
    portName: string | undefined,
    overrideSpot: Spot | null,
  ): { x: number; y: number } {
    if (overrideSpot) {
      const b = node.bounds;
      return overrideSpot.computePoint(b.x, b.y, b.width, b.height);
    }
    return node.getConnectionPoint(target, portName);
  }

  /** Zoom to fit all content. */
  zoomToFit(padding = 50): void {
    if (this._nodes.size === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const [, node] of this._nodes) {
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
    this._scale = Math.max(this._minScale, Math.min(this._maxScale, Math.min(scaleX, scaleY)));

    this.offsetX = minX - padding - (rect.width / this._scale - contentWidth) / 2;
    this.offsetY = minY - padding - (rect.height / this._scale - contentHeight) / 2;

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
    this._scale = Math.max(this._minScale, Math.min(this._maxScale, Math.min(scaleX, scaleY)));
    this.offsetX = rect.x - padding - (view.width / this._scale - contentWidth) / 2;
    this.offsetY = rect.y - padding - (view.height / this._scale - contentHeight) / 2;
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
    if (this._nodes.size === 0) {
      return new RectClass(0, 0, 0, 0);
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const [, node] of this._nodes) {
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

  /** GoJS-compatible: The bounds of the document (all content). */
  get documentBounds(): RectClass {
    return this.getContentBounds();
  }

  /** GoJS-compatible: The bounds of the viewport. */
  get viewportBounds(): RectClass {
    return this.getViewportBounds();
  }

  /** GoJS-compatible: The bounds of all content, including links. */
  computeBounds(): RectClass {
    return this.getContentBounds();
  }

  /** GoJS-compatible: The actual bounds currently occupied by parts. */
  get actualBounds(): RectClass {
    return this.getContentBounds();
  }

  /** GoJS-compatible: The horizontal scroll position in document coordinates. */
  get horizontalScrollPosition(): number {
    return this.offsetX;
  }

  set horizontalScrollPosition(value: number) {
    this.setViewport(value, this.offsetY);
  }

  /** GoJS-compatible: The vertical scroll position in document coordinates. */
  get verticalScrollPosition(): number {
    return this.offsetY;
  }

  set verticalScrollPosition(value: number) {
    this.setViewport(this.offsetX, value);
  }

  /** GoJS-compatible: Find all nodes that are tree roots (no parent key). */
  findTreeRoots(): Node[] {
    const roots: Node[] = [];
    for (const [, node] of this._nodes) {
      const data = node.data;
      if (data && this.treeParentKeyOf(data) === undefined) {
        roots.push(node);
      }
    }
    return roots;
  }

  /** GoJS-compatible: Find the tree children of a node. */
  findTreeChildren(node: Node): Node[] {
    const children: Node[] = [];
    for (const [, other] of this._nodes) {
      const data = other.data;
      if (data && this.treeParentKeyOf(data) === node.key) {
        children.push(other);
      }
    }
    return children;
  }

  /** GoJS-compatible: Find the tree parent of a node, or null. */
  findTreeParent(node: Node): Node | null {
    const data = node.data;
    if (!data) return null;
    const parentKey = this.treeParentKeyOf(data);
    if (parentKey === undefined) return null;
    return this.findNodeForKey(parentKey);
  }

  /** Resolve the tree parent key of a node data object (via model or the "parent" property). */
  private treeParentKeyOf(data: NodeData): NodeKey | undefined {
    const model = this._model as unknown as { getParentKey?: (d: NodeData) => NodeKey | undefined };
    if (model.getParentKey) {
      const key = model.getParentKey(data);
      if (key !== undefined) return key;
    }
    const parent = (data as Record<string, unknown>).parent;
    return parent === null || parent === undefined ? undefined : (parent as NodeKey);
  }

  /**
   * GoJS-compatible: collapse a node's tree — hide every descendant reachable
   * via findTreeChildrenNodes (and any Link visually connecting them), used by
   * TreeExpanderButton. Independent of Group.isSubGraphExpanded/collapseGroup.
   */
  collapseTree(node: Node): void {
    node.isTreeExpanded = false;
    this.setTreeChildrenVisible(node, false);
    this.invalidate();
    this.fireDiagramEvent('TreeCollapsed', node);
  }

  /**
   * GoJS-compatible: expand a node's tree, showing its direct tree-children.
   * A child that is itself collapsed keeps its own descendants hidden.
   */
  expandTree(node: Node): void {
    node.isTreeExpanded = true;
    this.setTreeChildrenVisible(node, true);
    this.invalidate();
    this.fireDiagramEvent('TreeExpanded', node);
  }

  private setTreeChildrenVisible(node: Node, visible: boolean): void {
    for (const child of node.findTreeChildrenNodes()) {
      const link = this.findLinkBetweenNodes(node, child);
      if (link) link.visible = visible;
      child.visible = visible;
      // Collapsing hides the whole subtree unconditionally; expanding only
      // cascades into a child's own children if that child isn't itself collapsed.
      if (visible) {
        if (child.isTreeExpanded) this.setTreeChildrenVisible(child, true);
      } else {
        this.setTreeChildrenVisible(child, false);
      }
    }
  }

  /** Find a visual Link part directly connecting two nodes, in either direction. */
  private findLinkBetweenNodes(a: Node, b: Node): Link | null {
    for (const [, link] of this._links) {
      if (
        (link.fromKey === a.key && link.toKey === b.key) ||
        (link.fromKey === b.key && link.toKey === a.key)
      ) {
        return link;
      }
    }
    return null;
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

    // Destroy tooltip manager (removes any tooltip element/timeouts)
    this.tooltipManager?.destroy();
    this.tooltipManager = null;

    // Remove any floating part context menu
    this.hideContextMenu();

    // Remove any active text-editing input overlay
    const editingInput = document.querySelector('input.graphojs-text-editing');
    editingInput?.remove();

    // Clear parts and caches
    this.parts.clear();
    this._nodes.clear();
    this._groups.clear();
    this._links.clear();
    this.selectedParts.clear();
    this.focusedPart = null;
    this.virtualization?.clear();
    this.partPool.clear();
    this.layerCache = null;

    // Remove canvas and accessibility live region from DOM
    this.container.removeChild(this.canvas);
    if (this.liveRegion) {
      this.liveRegion.remove();
      this.liveRegion = null;
    }
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

import { registerDomComponent } from '../panel/ComponentRegistry.ts';

registerDomComponent(Diagram);
