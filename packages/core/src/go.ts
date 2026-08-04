/**
 * GoJS-compatible namespace export.
 *
 * Usage:
 *   import * as go from 'graphojs/go';
 *   const $ = go.GraphObject.make;
 *   const myDiagram = $(go.Diagram, "myDiagramDiv", { ... });
 */

// Geometry
export { Point } from './geometry/Point.ts';
export { Size } from './geometry/Size.ts';
export { Rect } from './geometry/Rect.ts';
export { Margin } from './geometry/Margin.ts';
export { Spot } from './geometry/Spot.ts';

// Model
export { Model } from './model/Model.ts';
export { GraphLinksModel } from './model/GraphLinksModel.ts';
export { TreeModel } from './model/TreeModel.ts';
export type { NodeData, LinkData } from './model/Model.ts';

// Parts
export { Part } from './parts/Part.ts';
export { Node } from './parts/Node.ts';
export { Link } from './parts/Link.ts';
export { Group } from './parts/Group.ts';
export { Port, Ports } from './parts/Port.ts';
export { Adornment, AdornmentShape } from './parts/Adornment.ts';

// Binding
export { Binding, bind } from './binding/Binding.ts';

// Layers
export { Layer, LayerNames } from './layer/Layer.ts';

// Panels
export { GraphObject } from './panel/GraphObject.ts';
export { Shape } from './panel/Shape.ts';
export { TextBlock } from './panel/TextBlock.ts';
export { Picture } from './panel/Picture.ts';
export { Panel, panel, shape } from './panel/Panel.ts';

// Diagram
export { Diagram } from './diagram/Diagram.ts';
export type { DiagramOptions } from './diagram/Diagram.ts';
export { DiagramEvents, createDiagramEvents } from './diagram/DiagramEvents.ts';
export type {
  DiagramEvent,
  DiagramEventType,
  DiagramEventHandler,
} from './diagram/DiagramEvents.ts';

// Tools
export { Tool } from './tool/Tool.ts';
export { ToolManager } from './tool/ToolManager.ts';
export { DraggingTool } from './tool/DraggingTool.ts';
export { ClickSelectingTool } from './tool/ClickSelectingTool.ts';
export { DragSelectingTool } from './tool/DragSelectingTool.ts';
export { PanningTool } from './tool/PanningTool.ts';
export { ZoomingTool } from './tool/ZoomingTool.ts';
export { TextEditingTool } from './tool/TextEditingTool.ts';
export { LinkingBaseTool } from './tool/LinkingBaseTool.ts';
export { LinkingTool } from './tool/LinkingTool.ts';
export { RelinkingTool } from './tool/RelinkingTool.ts';
export { ResizingTool } from './tool/ResizingTool.ts';
export { RotatingTool } from './tool/RotatingTool.ts';

// Layouts
export { Layout } from './layout/Layout.ts';
export { ForceDirectedLayout } from './layout/ForceDirectedLayout.ts';
export { TreeLayout } from './layout/TreeLayout.ts';
export { CircularLayout } from './layout/CircularLayout.ts';
export { LayeredDigraphLayout } from './layout/LayeredDigraphLayout.ts';
export { GridLayout } from './layout/GridLayout.ts';
export { SpotLayout } from './layout/SpotLayout.ts';
export { LayoutNetwork, LayoutVertex, LayoutEdge } from './layout/LayoutNetwork.ts';

// Serialization
export { Serializer } from './serialization/Serializer.ts';

// Undo
export { UndoManager } from './undo/UndoManager.ts';
export { Transaction, createTransaction } from './undo/Transaction.ts';
export {
  ModelTransactionCommand,
  createModelTransactionCommand,
} from './undo/ModelTransactionCommand.ts';

// Command System
export { CommandHandler, createCommandHandler } from './command/CommandHandler.ts';

// Animations
export { Animation } from './animation/Animation.ts';
export { AnimationManager, tween } from './animation/AnimationManager.ts';
export {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  getEasing,
} from './animation/Easing.ts';
export type { EasingFunction, EasingName } from './animation/Easing.ts';

// Serialization / Undo commands
export {
  AddNodeCommand,
  RemoveNodeCommand,
  SetNodePropertyCommand,
  AddLinkCommand,
  RemoveLinkCommand,
  MoveNodeCommand,
  SetLinkPropertyCommand,
  ResizeNodeCommand,
  SetZOrderCommand,
} from './undo/commands.ts';

export const version = '0.1.0';

// Shapes
export {
  SHAPES,
  getShapeDefinition,
  normalizeShapeType,
  getAllShapeTypes,
  getShapesByCategory,
} from './shapes/ShapeTypes.ts';
export type { ShapeType, ShapeDefinition } from './shapes/ShapeTypes.ts';
export { ShapeRenderer } from './shapes/ShapeRenderer.ts';

// Spatial Indexing / Virtualization
export { QuadTree } from './spatial/QuadTree.ts';
export { PartPool } from './spatial/PartPool.ts';
export { VirtualizationManager } from './spatial/VirtualizationManager.ts';
export { RectPool, createRectPool } from './spatial/RectPool.ts';

// Rendering Optimizations
export { LayerCache, createLayerCache } from './render/LayerCache.ts';
export {
  PathCache,
  TextMeasureCache,
  createPathCache,
  createTextMeasureCache,
} from './render/RenderCache.ts';
export { LinkPathCache, CanvasPool, throttle, debounce } from './render/PerformanceCache.ts';

// Export
export { SVGExporter, exportToSVG } from './export/SVGExporter.ts';
export { PNGExporter, exportToPNG } from './export/PNGExporter.ts';
export { printDiagram } from './export/PrintExporter.ts';
export { Palette, createDefaultPalette } from './export/Palette.ts';
export { Overview, createOverview } from './export/Overview.ts';
export { ContextMenu, createDefaultContextMenu } from './export/ContextMenu.ts';
export { TooltipManager, createTooltipManager } from './export/TooltipManager.ts';
