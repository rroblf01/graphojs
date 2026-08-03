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
