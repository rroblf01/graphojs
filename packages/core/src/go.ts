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
export type {
  NodeKey,
  NodeData,
  LinkData,
  ChangedEvent,
  ChangedEventHandler,
  ModelJSON,
  NodeValidationCallback,
  LinkValidationCallback,
} from './model/Model.ts';
export type { GraphLinksModelJSON } from './model/GraphLinksModel.ts';
export type { TreeModelJSON } from './model/TreeModel.ts';

// Parts
export { Part } from './parts/Part.ts';
export { Node } from './parts/Node.ts';
export { Link } from './parts/Link.ts';
export { Group } from './parts/Group.ts';
export { Port, Ports } from './parts/Port.ts';
export type { PortAlignment } from './parts/Port.ts';
export type { NodeShape } from './parts/Node.ts';
export type { LinkRouting, ArrowheadStyle } from './parts/Link.ts';
export {
  Adornment,
  AdornmentShape,
  AdornmentManager,
  createSelectionAdornment,
  createRotationAdornment,
  createTooltipAdornment,
  createContextmenuAdornment,
} from './parts/Adornment.ts';
export type { AdornmentName, AdornmentType } from './parts/Adornment.ts';

// Binding
export { Binding, bind } from './binding/Binding.ts';

// Layers
export { Layer, LayerNames, LayerDefaults, createDefaultLayers } from './layer/Layer.ts';

// Panels
export { GraphObject } from './panel/GraphObject.ts';
export { Shape } from './panel/Shape.ts';
export { TextBlock } from './panel/TextBlock.ts';
export { Picture } from './panel/Picture.ts';
export { Panel, panel, shape } from './panel/Panel.ts';
export type { PanelType } from './panel/Panel.ts';
export { drawGeometryString } from './panel/GeometryString.ts';

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
export type { ResizeHandle } from './tool/ResizingTool.ts';

// Layouts
export { Layout } from './layout/Layout.ts';
export type { LayoutOptions } from './layout/Layout.ts';
export { ForceDirectedLayout } from './layout/ForceDirectedLayout.ts';
export type { ForceDirectedLayoutOptions } from './layout/ForceDirectedLayout.ts';
export { TreeLayout } from './layout/TreeLayout.ts';
export type { TreeLayoutOptions } from './layout/TreeLayout.ts';
export { CircularLayout } from './layout/CircularLayout.ts';
export type { CircularLayoutOptions } from './layout/CircularLayout.ts';
export { LayeredDigraphLayout } from './layout/LayeredDigraphLayout.ts';
export type { LayeredDigraphLayoutOptions } from './layout/LayeredDigraphLayout.ts';
export { GridLayout } from './layout/GridLayout.ts';
export type { GridLayoutOptions } from './layout/GridLayout.ts';
export { SpotLayout } from './layout/SpotLayout.ts';
export type { SpotLayoutOptions } from './layout/SpotLayout.ts';
export { LayoutNetwork, LayoutVertex, LayoutEdge } from './layout/LayoutNetwork.ts';

// Serialization
export { Serializer } from './serialization/Serializer.ts';
export type { DiagramJSON } from './serialization/Serializer.ts';

// Undo
export { UndoManager } from './undo/UndoManager.ts';
export type { UndoManagerEvent, UndoManagerEventHandler } from './undo/UndoManager.ts';
export { Transaction, createTransaction } from './undo/Transaction.ts';
export type { Command } from './undo/Command.ts';
export {
  ModelTransactionCommand,
  createModelTransactionCommand,
} from './undo/ModelTransactionCommand.ts';

// Command System
export { CommandHandler, createCommandHandler } from './command/CommandHandler.ts';
export type { Alignment } from './command/CommandHandler.ts';

// Animations
export { Animation } from './animation/Animation.ts';
export type { AnimationOptions } from './animation/Animation.ts';
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

// Render
export type { Renderer } from './render/Renderer.ts';
export { Canvas2DRenderer } from './render/Canvas2DRenderer.ts';

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
export { SVGExporter, exportToSVG, createSVGExporter } from './export/SVGExporter.ts';
export { PNGExporter, exportToPNG, createPNGExporter } from './export/PNGExporter.ts';
export type { ImageExportOptions } from './export/PNGExporter.ts';
export { printDiagram } from './export/PrintExporter.ts';
export type { PrintOptions } from './export/PrintExporter.ts';
export {
  Palette,
  createDefaultPalette,
  handleDrop,
  registerPalette,
  findPaletteForDiagram,
} from './export/Palette.ts';
export { Overview, createOverview } from './export/Overview.ts';
export { ContextMenu, createDefaultContextMenu } from './export/ContextMenu.ts';
export type { ContextMenuItem, ContextMenuOptions } from './export/ContextMenu.ts';
export { TooltipManager, createTooltipManager } from './export/TooltipManager.ts';
export type { TooltipOptions } from './export/TooltipManager.ts';

// Templates (palette data templates)
export type { Template } from './template/Template.ts';
export { templateToNodeData } from './template/Template.ts';
export {
  basicShapes,
  flowchartShapes,
  dataFlowShapes,
  getAllTemplates,
  getTemplatesByCategory,
  getTemplateById,
  getTemplateCategories,
} from './template/TemplateCollection.ts';
