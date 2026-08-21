import { describe, expect, it, vi } from 'vitest';
import type { Diagram } from '../../src/diagram/Diagram.ts';
import type { DiagramEvent, DiagramEventType } from '../../src/diagram/DiagramEvents.ts';
import { createDiagramEvents, DiagramEvents } from '../../src/diagram/DiagramEvents.ts';
import { Node } from '../../src/parts/Node.ts';

function mockDiagram(): Diagram {
  return { getViewport: () => ({ x: 0, y: 0, scale: 1 }) } as unknown as Diagram;
}

describe('DiagramEvents', () => {
  it('should create with no listeners', () => {
    const events = new DiagramEvents();
    expect(events.listenerCount('SelectionChanged')).toBe(0);
    expect(events.hasListeners('SelectionChanged')).toBe(false);
  });

  it('should add and fire listeners', () => {
    const events = new DiagramEvents();
    const diagram = mockDiagram();
    const handler = vi.fn();

    events.addListener('SelectionChanged', handler);
    expect(events.listenerCount('SelectionChanged')).toBe(1);
    expect(events.hasListeners('SelectionChanged')).toBe(true);

    events.fire(diagram, 'SelectionChanged', null);
    expect(handler).toHaveBeenCalledTimes(1);
    const event = handler.mock.calls[0]?.[0] as DiagramEvent;
    expect(event.diagram).toBe(diagram);
    expect(event.type).toBe('SelectionChanged');
  });

  it('should include part and data in event', () => {
    const events = new DiagramEvents();
    const diagram = mockDiagram();
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const handler = vi.fn();

    events.addListener('PartMoved', handler);
    events.fire(diagram, 'PartMoved', node, { dx: 5, dy: 10 });

    const event = handler.mock.calls[0]?.[0] as DiagramEvent;
    expect(event.part).toBe(node);
    expect(event.data).toEqual({ dx: 5, dy: 10 });
  });

  it('should remove listeners', () => {
    const events = new DiagramEvents();
    const diagram = mockDiagram();
    const handler = vi.fn();

    events.addListener('ViewportChanged', handler);
    expect(events.removeListener('ViewportChanged', handler)).toBe(true);
    expect(events.listenerCount('ViewportChanged')).toBe(0);
    expect(events.removeListener('ViewportChanged', handler)).toBe(false);

    events.fire(diagram, 'ViewportChanged', null);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should add any listener for all events', () => {
    const events = new DiagramEvents();
    const diagram = mockDiagram();
    const handler = vi.fn();

    events.addAnyListener(handler);
    events.fire(diagram, 'SelectionChanged', null);
    events.fire(diagram, 'ViewportChanged', null);
    events.fire(diagram, 'LayoutCompleted', null);

    expect(handler).toHaveBeenCalledTimes(3);
  });

  it('should remove any listener', () => {
    const events = new DiagramEvents();
    const diagram = mockDiagram();
    const handler = vi.fn();

    events.addAnyListener(handler);
    events.removeAnyListener(handler);
    events.fire(diagram, 'SelectionChanged', null);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should not fire if no listeners', () => {
    const events = new DiagramEvents();
    const diagram = mockDiagram();
    expect(() => events.fire(diagram, 'LinkCreated', null)).not.toThrow();
  });

  it('should clear all listeners', () => {
    const events = new DiagramEvents();
    const diagram = mockDiagram();
    const handler = vi.fn();

    events.addListener('SelectionChanged', handler);
    events.addListener('ViewportChanged', handler);
    events.clear();
    expect(events.listenerCount('SelectionChanged')).toBe(0);
    expect(events.listenerCount('ViewportChanged')).toBe(0);

    events.fire(diagram, 'SelectionChanged', null);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should create via factory', () => {
    const events = createDiagramEvents();
    expect(events).toBeInstanceOf(DiagramEvents);
  });

  it('should support all event types', () => {
    const types: DiagramEventType[] = [
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
    ];
    const events = new DiagramEvents();
    const diagram = mockDiagram();
    for (const type of types) {
      const handler = vi.fn();
      events.addListener(type, handler);
      events.fire(diagram, type, null);
      expect(handler).toHaveBeenCalledTimes(1);
    }
  });
});
