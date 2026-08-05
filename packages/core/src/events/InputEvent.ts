import type { Diagram } from '../diagram/Diagram.ts';
import type { GraphLinksModel } from '../model/GraphLinksModel.ts';
import type { GraphObject } from '../panel/GraphObject.ts';

/**
 * GoJS-compatible: Wraps a browser event delivered to GraphObject handlers.
 * Exposes diagram/model/document-point accessors that DOM MouseEvents lack.
 */
export class InputEvent {
  /** The original DOM event. */
  readonly source: MouseEvent | KeyboardEvent;
  /** The diagram that received the event (if available). */
  diagram: Diagram | null = null;
  /** The GraphObject the event targeted (if available). */
  targetObject: GraphObject | null = null;
  /** Whether this event has been handled (prevents further propagation). */
  handled = false;
  /** The click count for mouse events. */
  clickCount = 0;
  /** The key involved in keyboard events (may be empty for mouse events). */
  key = '';

  constructor(source: MouseEvent | KeyboardEvent) {
    this.source = source;
  }

  /** GoJS-compatible: The point in document coordinates. */
  documentPoint(): { x: number; y: number } {
    if (this.diagram && 'clientX' in this.source && this.source.clientX !== undefined) {
      return this.diagram.getDiagramPoint(this.source as MouseEvent);
    }
    return { x: 0, y: 0 };
  }

  /** GoJS-compatible: The point in viewport (screen) coordinates. */
  viewPoint(): { x: number; y: number } {
    if ('clientX' in this.source && this.source.clientX !== undefined) {
      return { x: (this.source as MouseEvent).clientX, y: (this.source as MouseEvent).clientY };
    }
    return { x: 0, y: 0 };
  }

  /** GoJS-compatible: The model of the diagram receiving the event. */
  get model(): GraphLinksModel | null {
    return this.diagram ? this.diagram.getModel() : null;
  }
}
