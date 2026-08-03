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
