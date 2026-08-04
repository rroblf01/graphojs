import type { Diagram } from '../diagram/Diagram.ts';
import type { Part } from '../parts/Part.ts';

/**
 * Types of diagram events.
 */
export type DiagramEventType =
  | 'SelectionChanged'
  | 'ViewportChanged'
  | 'ObjectDataChanged'
  | 'LayoutCompleted'
  | 'PartAdded'
  | 'PartRemoved'
  | 'PartMoved'
  | 'ModelChanged'
  | 'BackgroundSingleClicked'
  | 'BackgroundDoubleClicked'
  | 'LinkCreated'
  // GoJS-compatible events
  | 'ObjectSingleClicked'
  | 'ObjectDoubleClicked'
  | 'ObjectContextClicked'
  | 'BackgroundContextClicked'
  | 'ChangingSelection'
  | 'ChangedSelection'
  | 'PartResized'
  | 'PartRotated'
  | 'TextEdited'
  | 'LinkDrawn'
  | 'LinkRelinked'
  | 'SelectionMoved'
  | 'SelectionCopied'
  | 'SelectionDeleting'
  | 'SelectionDeleted'
  | 'SelectionGrouped'
  | 'SelectionUngrouped'
  | 'DocumentBoundsChanged'
  | 'ClipboardChanged'
  | 'ClipboardPasted'
  | 'InitialLayoutCompleted'
  | 'ExternalObjectsDropped'
  | 'TreeCollapsed'
  | 'TreeExpanded'
  | 'SubGraphCollapsed'
  | 'SubGraphExpanded'
  | 'AnimationStarting'
  | 'AnimationFinished'
  | 'Modified'
  | 'GainedFocus'
  | 'LostFocus'
  | 'ScrollChanged';

/**
 * Event payload for diagram events.
 */
export interface DiagramEvent {
  /** The diagram that fired the event. */
  diagram: Diagram;
  /** The event type. */
  type: DiagramEventType;
  /** The part involved (if any). */
  part?: Part | null;
  /** Extra data associated with the event. */
  data?: Record<string, unknown>;
}

export type DiagramEventHandler = (event: DiagramEvent) => void;

/**
 * Manages diagram-level events.
 */
export class DiagramEvents {
  private listeners: Map<DiagramEventType, DiagramEventHandler[]> = new Map();

  /** Add a listener for a specific event type. */
  addListener(type: DiagramEventType, handler: DiagramEventHandler): void {
    const list = this.listeners.get(type) ?? [];
    list.push(handler);
    this.listeners.set(type, list);
  }

  /** Add a listener for all event types. */
  addAnyListener(handler: DiagramEventHandler): void {
    for (const type of ALL_EVENT_TYPES) {
      this.addListener(type, handler);
    }
  }

  /** Remove a listener for a specific event type. */
  removeListener(type: DiagramEventType, handler: DiagramEventHandler): boolean {
    const list = this.listeners.get(type);
    if (!list) return false;
    const index = list.indexOf(handler);
    if (index === -1) return false;
    list.splice(index, 1);
    return true;
  }

  /** Remove a listener from all event types. */
  removeAnyListener(handler: DiagramEventHandler): void {
    for (const type of ALL_EVENT_TYPES) {
      this.removeListener(type, handler);
    }
  }

  /** Check if there are listeners for an event type. */
  hasListeners(type: DiagramEventType): boolean {
    return (this.listeners.get(type)?.length ?? 0) > 0;
  }

  /** Get the number of listeners for an event type. */
  listenerCount(type: DiagramEventType): number {
    return this.listeners.get(type)?.length ?? 0;
  }

  /** Remove all listeners. */
  clear(): void {
    this.listeners.clear();
  }

  /**
   * Fire an event to all registered listeners.
   */
  fire(
    diagram: Diagram,
    type: DiagramEventType,
    part?: Part | null,
    data?: Record<string, unknown>,
  ): void {
    const list = this.listeners.get(type);
    if (!list || list.length === 0) return;

    const event: DiagramEvent = { diagram, type, part, data };
    for (const handler of [...list]) {
      handler(event);
    }
  }
}

const ALL_EVENT_TYPES: DiagramEventType[] = [
  'SelectionChanged',
  'ViewportChanged',
  'ObjectDataChanged',
  'LayoutCompleted',
  'PartAdded',
  'PartRemoved',
  'PartMoved',
  'ModelChanged',
  'BackgroundSingleClicked',
  'BackgroundDoubleClicked',
  'LinkCreated',
  'ObjectSingleClicked',
  'ObjectDoubleClicked',
  'ObjectContextClicked',
  'BackgroundContextClicked',
  'ChangingSelection',
  'ChangedSelection',
  'PartResized',
  'PartRotated',
  'TextEdited',
  'LinkDrawn',
  'LinkRelinked',
  'SelectionMoved',
  'SelectionCopied',
  'SelectionDeleting',
  'SelectionDeleted',
  'SelectionGrouped',
  'SelectionUngrouped',
  'DocumentBoundsChanged',
  'ClipboardChanged',
  'ClipboardPasted',
  'InitialLayoutCompleted',
  'ExternalObjectsDropped',
  'TreeCollapsed',
  'TreeExpanded',
  'SubGraphCollapsed',
  'SubGraphExpanded',
  'AnimationStarting',
  'AnimationFinished',
  'Modified',
  'GainedFocus',
  'LostFocus',
  'ScrollChanged',
];

/** Create a diagram events manager. */
export function createDiagramEvents(): DiagramEvents {
  return new DiagramEvents();
}
