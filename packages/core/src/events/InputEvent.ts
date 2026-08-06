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

  /** GoJS-compatible: whether the Control key was held during the event. */
  get control(): boolean {
    return this.source.ctrlKey;
  }

  /** GoJS-compatible: whether the Shift key was held during the event. */
  get shift(): boolean {
    return this.source.shiftKey;
  }

  /** GoJS-compatible: whether the Alt/Option key was held during the event. */
  get alt(): boolean {
    return this.source.altKey;
  }

  /** GoJS-compatible: whether the Meta/Command key was held during the event. */
  get meta(): boolean {
    return this.source.metaKey;
  }

  /** GoJS-compatible: the mouse button involved (0=left, 1=middle, 2=right), or -1 for non-mouse events. */
  get button(): number {
    return 'button' in this.source ? this.source.button : -1;
  }

  /** GoJS-compatible: whether the left mouse button was involved. */
  get left(): boolean {
    return this.button === 0;
  }

  /** GoJS-compatible: whether the right mouse button was involved. */
  get right(): boolean {
    return this.button === 2;
  }
}
