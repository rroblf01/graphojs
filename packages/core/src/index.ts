export const version = '0.1.0';

// Geometry
export { Point } from './geometry/Point.ts';
export { Size } from './geometry/Size.ts';
export { Rect } from './geometry/Rect.ts';
export { Margin } from './geometry/Margin.ts';

// Model
export { Model } from './model/Model.ts';
export { GraphLinksModel } from './model/GraphLinksModel.ts';
export { TreeModel } from './model/TreeModel.ts';
export type { TreeModelJSON } from './model/TreeModel.ts';
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

// Parts
export { Part } from './parts/Part.ts';
export { Node } from './parts/Node.ts';
export { Link } from './parts/Link.ts';
export { Group } from './parts/Group.ts';
export { Port, Ports } from './parts/Port.ts';
export type { PortAlignment } from './parts/Port.ts';
export type { NodeShape } from './parts/Node.ts';
export type { LinkRouting, ArrowheadStyle } from './parts/Link.ts';

// Data Binding
export { Binding, bind } from './binding/Binding.ts';

// Layers
export { Layer, LayerNames, LayerDefaults, createDefaultLayers } from './layer/Layer.ts';

// Export
export { SVGExporter, createSVGExporter, exportToSVG } from './export/SVGExporter.ts';
export { PNGExporter, createPNGExporter, exportToPNG } from './export/PNGExporter.ts';
export type { ImageExportOptions } from './export/PNGExporter.ts';
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

// Render
export type { Renderer } from './render/Renderer.ts';
export { Canvas2DRenderer } from './render/Canvas2DRenderer.ts';

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
export { PanningTool } from './tool/PanningTool.ts';
export { ZoomingTool } from './tool/ZoomingTool.ts';
export { TextEditingTool } from './tool/TextEditingTool.ts';
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

// Serialization
export { Serializer } from './serialization/Serializer.ts';
export type { DiagramJSON } from './serialization/Serializer.ts';

// Undo
export type { Command } from './undo/Command.ts';
export { UndoManager } from './undo/UndoManager.ts';
export type { UndoManagerEvent, UndoManagerEventHandler } from './undo/UndoManager.ts';
export { Transaction, createTransaction } from './undo/Transaction.ts';
export {
  AddNodeCommand,
  RemoveNodeCommand,
  SetNodePropertyCommand,
  AddLinkCommand,
  RemoveLinkCommand,
  MoveNodeCommand,
  SetLinkPropertyCommand,
  ResizeNodeCommand,
} from './undo/commands.ts';

// Command System
export { CommandHandler, createCommandHandler } from './command/CommandHandler.ts';

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

// Spatial Indexing / Virtualization
export { QuadTree } from './spatial/QuadTree.ts';
export { PartPool } from './spatial/PartPool.ts';
export { VirtualizationManager } from './spatial/VirtualizationManager.ts';

// Rendering Optimizations
export { LayerCache, createLayerCache } from './render/LayerCache.ts';

// Panels
export { GraphObject } from './panel/GraphObject.ts';
export { Shape } from './panel/Shape.ts';
export { TextBlock } from './panel/TextBlock.ts';
export { Picture } from './panel/Picture.ts';
export { Panel, panel, shape } from './panel/Panel.ts';
export type { PanelType } from './panel/Panel.ts';
export { Spot } from './geometry/Spot.ts';

// Shapes
export type { ShapeType, ShapeDefinition } from './shapes/ShapeTypes.ts';
export {
  SHAPES,
  getShapeDefinition,
  getAllShapeTypes,
  getShapesByCategory,
} from './shapes/ShapeTypes.ts';
export { ShapeRenderer } from './shapes/ShapeRenderer.ts';

// Templates
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
