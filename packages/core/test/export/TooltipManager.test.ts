// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { TooltipManager, createTooltipManager } from '../../src/export/TooltipManager.ts';
import { Node } from '../../src/parts/Node.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';

function createMockDiagram(part: Node | null): Diagram {
  return {
    getDiagramPoint: () => ({ x: 0, y: 0 }),
    findPartAt: () => part,
  } as unknown as Diagram;
}

describe('TooltipManager', () => {
  it('should create and append element to body', () => {
    const diagram = createMockDiagram(null);
    const manager = new TooltipManager(diagram);
    expect(manager.getElement().className).toContain('graphojs-tooltip');
    expect(document.body.contains(manager.getElement())).toBe(true);
    expect(manager.isTooltipVisible).toBe(false);
  });

  it('should create via factory', () => {
    const diagram = createMockDiagram(null);
    const manager = createTooltipManager(diagram, { delay: 100 });
    expect(manager).toBeInstanceOf(TooltipManager);
  });

  it('should show tooltip for part with tooltip text', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.tooltip = 'My tooltip';
    const diagram = createMockDiagram(node);
    const manager = new TooltipManager(diagram, { delay: 0 });

    const event = new MouseEvent('mousemove', { clientX: 10, clientY: 20 });
    manager.handleMouseMove(event);

    // With delay 0, setTimeout still fires async; check after flush
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(manager.isTooltipVisible).toBe(true);
        expect(manager.getCurrentPart()).toBe(node);
        expect(manager.getElement().textContent).toBe('My tooltip');
        expect(manager.getElement().style.display).toBe('block');
        expect(node.tooltipVisible).toBe(true);
        resolve(undefined);
      }, 20);
    });
  });

  it('should not show tooltip for part without tooltip text', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const diagram = createMockDiagram(node);
    const manager = new TooltipManager(diagram, { delay: 0 });

    const event = new MouseEvent('mousemove');
    manager.handleMouseMove(event);
    expect(manager.isTooltipVisible).toBe(false);
  });

  it('should hide tooltip when moving to a part without tooltip', () => {
    const withTip = Node.fromPosAndSize(1, 0, 0, 100, 50);
    withTip.tooltip = 'Tip';
    const noTip = Node.fromPosAndSize(2, 200, 0, 100, 50);
    const diagram = createMockDiagram(withTip);
    const manager = new TooltipManager(diagram, { delay: 0 });

    return new Promise((resolve) => {
      manager.handleMouseMove(new MouseEvent('mousemove'));
      setTimeout(() => {
        expect(manager.isTooltipVisible).toBe(true);

        // Move to a part without tooltip
        const diagram2 = createMockDiagram(noTip);
        (manager as unknown as { diagram: Diagram }).diagram = diagram2;
        manager.handleMouseMove(new MouseEvent('mousemove'));
        expect(manager.isTooltipVisible).toBe(false);
        resolve(undefined);
      }, 20);
    });
  });

  it('should hide on mouse leave', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.tooltip = 'Tip';
    const diagram = createMockDiagram(node);
    const manager = new TooltipManager(diagram, { delay: 0 });

    return new Promise((resolve) => {
      manager.handleMouseMove(new MouseEvent('mousemove'));
      setTimeout(() => {
        manager.handleMouseLeave();
        expect(manager.isTooltipVisible).toBe(false);
        expect(node.tooltipVisible).toBe(false);
        resolve(undefined);
      }, 20);
    });
  });

  it('should destroy and remove element', () => {
    const diagram = createMockDiagram(null);
    const manager = new TooltipManager(diagram);
    manager.destroy();
    expect(document.body.contains(manager.getElement())).toBe(false);
  });
});
