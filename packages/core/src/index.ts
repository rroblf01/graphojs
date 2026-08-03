export const version = '0.1.0';

// Geometry
export { Point } from './geometry/Point.ts';
export { Size } from './geometry/Size.ts';
export { Rect } from './geometry/Rect.ts';
export { Margin } from './geometry/Margin.ts';

// Model
export { Model } from './model/Model.ts';
export { GraphLinksModel } from './model/GraphLinksModel.ts';
export type {
  NodeKey,
  NodeData,
  LinkData,
  ChangedEvent,
  ChangedEventHandler,
  ModelJSON,
} from './model/Model.ts';
export type { GraphLinksModelJSON } from './model/GraphLinksModel.ts';

// Parts
export { Part } from './parts/Part.ts';
export { Node } from './parts/Node.ts';
export { Link } from './parts/Link.ts';
export { Group } from './parts/Group.ts';
export type { NodeShape } from './parts/Node.ts';
export type { LinkRouting } from './parts/Link.ts';

// Data Binding
export { Binding, bind } from './binding/Binding.ts';

// Layers
export { Layer, LayerNames, LayerDefaults, createDefaultLayers } from './layer/Layer.ts';

// Export
export { SVGExporter, createSVGExporter, exportToSVG } from './export/SVGExporter.ts';

// Render
export type { Renderer } from './render/Renderer.ts';
export { Canvas2DRenderer } from './render/Canvas2DRenderer.ts';

// Diagram
export { Diagram } from './diagram/Diagram.ts';
export type { DiagramOptions } from './diagram/Diagram.ts';

// Tools
export { Tool } from './tool/Tool.ts';
export { ToolManager } from './tool/ToolManager.ts';
export { DraggingTool } from './tool/DraggingTool.ts';
export { ClickSelectingTool } from './tool/ClickSelectingTool.ts';
export { PanningTool } from './tool/PanningTool.ts';
export { ZoomingTool } from './tool/ZoomingTool.ts';

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
export {
  AddNodeCommand,
  RemoveNodeCommand,
  SetNodePropertyCommand,
  AddLinkCommand,
  RemoveLinkCommand,
  MoveNodeCommand,
} from './undo/commands.ts';

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
