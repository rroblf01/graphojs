/**
 * @module graphojs
 */

export const version = '1.4.0';

export type { AnimationOptions } from './animation/Animation.ts';
// Animations
export { Animation } from './animation/Animation.ts';
export { AnimationManager, tween } from './animation/AnimationManager.ts';
export type { EasingFunction, EasingName } from './animation/Easing.ts';
export {
  easeInCubic,
  easeInOutCubic,
  easeInOutQuad,
  easeInQuad,
  easeOutCubic,
  easeOutQuad,
  getEasing,
  linear,
} from './animation/Easing.ts';
// Data Binding
export { Binding, bind } from './binding/Binding.ts';
export { ThemeBinding } from './binding/ThemeBinding.ts';
// Collections (GoJS's own List/Set/Map, distinct from the native globals)
export type { Iterator } from './collections/Iterator.ts';
export { List } from './collections/List.ts';
export type { IKeyValuePair } from './collections/Map.ts';
export { Map } from './collections/Map.ts';
export { Set } from './collections/Set.ts';
export type { AlignDirection } from './command/CommandHandler.ts';
// Command System
export { CommandHandler, createCommandHandler } from './command/CommandHandler.ts';
// GoJS-compatible constant objects
export {
  Alignment,
  Arrowheads,
  AutoScale,
  BindingMode,
  Builders,
  Figures,
  Object,
  PanelTypes,
  Position,
  ScrollBehavior,
  ToolNames,
} from './constants.ts';
export type { AccessibilityMessages, DiagramOptions } from './diagram/Diagram.ts';
// Diagram
export { Diagram, defaultAccessibilityMessages } from './diagram/Diagram.ts';
export type {
  DiagramEvent,
  DiagramEventHandler,
  DiagramEventType,
} from './diagram/DiagramEvents.ts';
export { createDiagramEvents, DiagramEvents } from './diagram/DiagramEvents.ts';
// Events
export { InputEvent } from './events/InputEvent.ts';
export type { ContextMenuItem, ContextMenuOptions } from './export/ContextMenu.ts';
export { ContextMenu, createDefaultContextMenu } from './export/ContextMenu.ts';
export { createOverview, Overview } from './export/Overview.ts';
export {
  createDefaultPalette,
  findPaletteForDiagram,
  handleDrop,
  Palette,
  registerPalette,
} from './export/Palette.ts';
export type { ImageExportOptions } from './export/PNGExporter.ts';
export { createPNGExporter, exportToPNG, PNGExporter } from './export/PNGExporter.ts';
export type { PrintOptions } from './export/PrintExporter.ts';
export { printDiagram } from './export/PrintExporter.ts';
export type { ServerCanvasLike, ServerRenderOptions } from './export/ServerRenderer.ts';
export { measureDiagramContent, renderDiagramToCanvas } from './export/ServerRenderer.ts';
// Export
export { createSVGExporter, exportToSVG, SVGExporter } from './export/SVGExporter.ts';
export type { TooltipOptions } from './export/TooltipManager.ts';
export { createTooltipManager, TooltipManager } from './export/TooltipManager.ts';
export type { BrushLike } from './geometry/Brush.ts';
export { Brush, BrushType, ColorSpace } from './geometry/Brush.ts';
// Geometry
export {
  Geometry,
  GeometryType,
  PathFigure,
  PathSegment,
  SegmentType,
} from './geometry/Geometry.ts';
export { Margin } from './geometry/Margin.ts';
export { Point } from './geometry/Point.ts';
export { Rect } from './geometry/Rect.ts';
export { Size } from './geometry/Size.ts';
export { Spot } from './geometry/Spot.ts';
// GoJS-compatible namespace
export * as go from './go.ts';
// Layers
export { createDefaultLayers, Layer, LayerDefaults, LayerNames } from './layer/Layer.ts';
export type { CircularLayoutOptions } from './layout/CircularLayout.ts';
export { CircularLayout } from './layout/CircularLayout.ts';
export { CircularEdge, CircularNetwork, CircularVertex } from './layout/CircularNetwork.ts';
export type { ForceDirectedLayoutOptions } from './layout/ForceDirectedLayout.ts';
export { ForceDirectedLayout } from './layout/ForceDirectedLayout.ts';
export {
  ForceDirectedEdge,
  ForceDirectedNetwork,
  ForceDirectedVertex,
} from './layout/ForceDirectedNetwork.ts';
export type { GridLayoutOptions } from './layout/GridLayout.ts';
export { GridLayout } from './layout/GridLayout.ts';
export type { LayeredDigraphLayoutOptions } from './layout/LayeredDigraphLayout.ts';
export { LayeredDigraphLayout } from './layout/LayeredDigraphLayout.ts';
export {
  LayeredDigraphEdge,
  LayeredDigraphNetwork,
  LayeredDigraphVertex,
} from './layout/LayeredDigraphNetwork.ts';
export type { LayoutOptions } from './layout/Layout.ts';
// Layouts
export { Layout } from './layout/Layout.ts';
export { LayoutEdge, LayoutNetwork, LayoutVertex } from './layout/LayoutNetwork.ts';
export { PositionArray } from './layout/PositionArray.ts';
export type { SpotLayoutOptions } from './layout/SpotLayout.ts';
export { SpotLayout } from './layout/SpotLayout.ts';
export type { TreeLayoutOptions } from './layout/TreeLayout.ts';
export { TreeLayout } from './layout/TreeLayout.ts';
export { TreeEdge, TreeNetwork, TreeVertex } from './layout/TreeNetworkTypes.ts';
export type { GraphLinksModelJSON } from './model/GraphLinksModel.ts';
export { GraphLinksModel } from './model/GraphLinksModel.ts';
export type {
  ChangedEvent,
  ChangedEventHandler,
  LinkData,
  LinkValidationCallback,
  ModelJSON,
  NodeData,
  NodeKey,
  NodeValidationCallback,
} from './model/Model.ts';
// Model
export { Model } from './model/Model.ts';
export type { TreeModelJSON } from './model/TreeModel.ts';
export { TreeModel } from './model/TreeModel.ts';
export type { ExpanderButtonOptions } from './panel/Buttons.ts';
export { PanelExpanderButton, TreeExpanderButton } from './panel/Buttons.ts';
export { drawGeometryString } from './panel/GeometryString.ts';

// Panels
// Registers the named pre-fab widget builders (Button/CheckBox/ToolTip/...)
// consumed by GraphObject.make/build's string-dispatch branch.
import './panel/BuilderWidgets.ts';

export { GraphObject } from './panel/GraphObject.ts';
export { HTMLInfo } from './panel/HTMLInfo.ts';
export type { PanelType } from './panel/Panel.ts';
export { Panel, panel, shape } from './panel/Panel.ts';
export { Picture } from './panel/Picture.ts';
export { Placeholder } from './panel/Placeholder.ts';
export { RowColumnDefinition } from './panel/RowColumnDefinition.ts';
export { Shape } from './panel/Shape.ts';
export { TextBlock } from './panel/TextBlock.ts';
export type { AdornmentName, AdornmentType } from './parts/Adornment.ts';
export {
  Adornment,
  AdornmentManager,
  AdornmentShape,
  createContextmenuAdornment,
  createRotationAdornment,
  createSelectionAdornment,
  createTooltipAdornment,
} from './parts/Adornment.ts';
export { Group } from './parts/Group.ts';
export type { ArrowheadStyle, LinkRouting } from './parts/Link.ts';
export { Link } from './parts/Link.ts';
export type { NodeShape } from './parts/Node.ts';
export { Node } from './parts/Node.ts';
// Parts
export { Part } from './parts/Part.ts';
export type { PortAlignment } from './parts/Port.ts';
export { Port, Ports } from './parts/Port.ts';
// Render
export { AvoidsNodesRouter } from './render/AvoidsNodesRouter.ts';
export { Canvas2DRenderer } from './render/Canvas2DRenderer.ts';
// Rendering Optimizations
export { createLayerCache, LayerCache } from './render/LayerCache.ts';
export { CanvasPool, debounce, LinkPathCache, throttle } from './render/PerformanceCache.ts';
export {
  createPathCache,
  createTextMeasureCache,
  PathCache,
  TextMeasureCache,
} from './render/RenderCache.ts';
export type { GridPatternStyle, Renderer } from './render/Renderer.ts';
export { Router } from './render/Router.ts';
export type { SelectionStyle } from './render/SelectionStyle.ts';
export { defaultSelectionStyle, highContrastSelectionStyle } from './render/SelectionStyle.ts';
export type { DiagramJSON } from './serialization/Serializer.ts';
// Serialization
export { Serializer } from './serialization/Serializer.ts';
export { ShapeRenderer } from './shapes/ShapeRenderer.ts';
// Shapes
export type { ShapeDefinition, ShapeType } from './shapes/ShapeTypes.ts';
export {
  getAllShapeTypes,
  getShapeDefinition,
  getShapesByCategory,
  normalizeShapeType,
  SHAPES,
} from './shapes/ShapeTypes.ts';
export { PartPool } from './spatial/PartPool.ts';
// Spatial Indexing / Virtualization
export { QuadTree } from './spatial/QuadTree.ts';
export { createRectPool, RectPool } from './spatial/RectPool.ts';
export { VirtualizationManager } from './spatial/VirtualizationManager.ts';
// Templates (data templates are available via the "graphojs/templates" subpath)
export type { Template } from './template/Template.ts';
export { templateToNodeData } from './template/Template.ts';
// Theming
export type { Theme, ThemeColors, ThemeValues } from './theme/Theme.ts';
export { ThemeManager } from './theme/ThemeManager.ts';
export { Themes } from './theme/Themes.ts';
export { ActionTool } from './tool/ActionTool.ts';
export { ClickCreatingTool } from './tool/ClickCreatingTool.ts';
export { ClickSelectingTool } from './tool/ClickSelectingTool.ts';
export { ContextMenuTool } from './tool/ContextMenuTool.ts';
export { DraggingInfo, DraggingOptions } from './tool/DraggingOptions.ts';
export { DraggingTool } from './tool/DraggingTool.ts';
export { DragSelectingTool } from './tool/DragSelectingTool.ts';
export { LinkingBaseTool } from './tool/LinkingBaseTool.ts';
export { LinkingTool } from './tool/LinkingTool.ts';
export { LinkLabelDraggingTool } from './tool/LinkLabelDraggingTool.ts';
export { LinkReshapingTool } from './tool/LinkReshapingTool.ts';
export { PanningTool } from './tool/PanningTool.ts';
export { RelinkingTool } from './tool/RelinkingTool.ts';
export type { ResizeHandle } from './tool/ResizingTool.ts';
export { ResizingTool } from './tool/ResizingTool.ts';
export { RotatingTool } from './tool/RotatingTool.ts';
export { TextEditingTool } from './tool/TextEditingTool.ts';
// Tools
export { Tool } from './tool/Tool.ts';
export { ToolManager } from './tool/ToolManager.ts';
export { ZoomingTool } from './tool/ZoomingTool.ts';
// Undo
export type { Command } from './undo/Command.ts';
export type { LinkLabelPosition } from './undo/commands.ts';
export {
  AddLinkCommand,
  AddNodeCommand,
  MoveNodeCommand,
  RemoveLinkCommand,
  RemoveNodeCommand,
  ReshapeLinkCommand,
  ResizeNodeCommand,
  SetLinkLabelPositionCommand,
  SetLinkPropertyCommand,
  SetNodePropertyCommand,
  SetZOrderCommand,
} from './undo/commands.ts';
export {
  createModelTransactionCommand,
  ModelTransactionCommand,
} from './undo/ModelTransactionCommand.ts';
export { createTransaction, Transaction } from './undo/Transaction.ts';
export type { UndoManagerEvent, UndoManagerEventHandler } from './undo/UndoManager.ts';
export { UndoManager } from './undo/UndoManager.ts';
