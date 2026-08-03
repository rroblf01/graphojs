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
export type { NodeShape } from './parts/Node.ts';
export type { LinkRouting } from './parts/Link.ts';

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
