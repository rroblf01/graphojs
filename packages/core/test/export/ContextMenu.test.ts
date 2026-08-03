// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { ContextMenu, createDefaultContextMenu } from '../../src/export/ContextMenu.ts';
import type { ContextMenuItem } from '../../src/export/ContextMenu.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';
import { Node } from '../../src/parts/Node.ts';

function createMockDiagram(): Diagram {
  const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
  return {
    getDiagramPoint: () => ({ x: 0, y: 0 }),
    findPartAt: () => node,
    getViewport: () => ({ x: 0, y: 0, width: 500, height: 400, scale: 1 }),
    setViewport: vi.fn(),
    zoomToFit: vi.fn(),
  } as unknown as Diagram;
}

describe('ContextMenu', () => {
  it('should create and append element to body', () => {
    const diagram = createMockDiagram();
    const partItems: ContextMenuItem[] = [{ label: 'Delete', action: vi.fn() }];
    const menu = new ContextMenu(diagram, { partItems, showDefaults: false });

    expect(menu.getElement().className).toContain('graphojs-context-menu');
    expect(document.body.contains(menu.getElement())).toBe(true);
  });

  it('should not be open initially', () => {
    const diagram = createMockDiagram();
    const menu = new ContextMenu(diagram, { partItems: [], showDefaults: false });
    expect(menu.isMenuOpen).toBe(false);
  });

  it('should open and show items', () => {
    const diagram = createMockDiagram();
    const action = vi.fn();
    const partItems: ContextMenuItem[] = [{ label: 'Delete', action }];
    const menu = new ContextMenu(diagram, { partItems, showDefaults: false });
    const node = Node.fromPosAndSize(9, 0, 0, 100, 50);

    menu.open(100, 100, node);
    expect(menu.isMenuOpen).toBe(true);

    const text = menu.getElement().textContent ?? '';
    expect(text).toContain('Delete');
  });

  it('should include default items when enabled', () => {
    const diagram = createMockDiagram();
    const menu = new ContextMenu(diagram, { partItems: [], showDefaults: true });

    menu.open(100, 100, null);
    const text = menu.getElement().textContent ?? '';
    expect(text).toContain('Zoom In');
    expect(text).toContain('Zoom Out');
    expect(text).toContain('Zoom to Fit');
  });

  it('should close the menu', () => {
    const diagram = createMockDiagram();
    const menu = new ContextMenu(diagram, { partItems: [], showDefaults: false });

    menu.open(100, 100, null);
    expect(menu.isMenuOpen).toBe(true);

    menu.close();
    expect(menu.isMenuOpen).toBe(false);
    expect(menu.getMenuPart()).toBeNull();
  });

  it('should store the part menu was opened on', () => {
    const diagram = createMockDiagram();
    const node = Node.fromPosAndSize(5, 0, 0, 100, 50);
    const menu = new ContextMenu(diagram, { partItems: [], showDefaults: false });

    menu.open(100, 100, node);
    expect(menu.getMenuPart()).toBe(node);
  });

  it('should trigger action when item clicked', () => {
    const diagram = createMockDiagram();
    const action = vi.fn();
    const partItems: ContextMenuItem[] = [{ label: 'Delete', action }];
    const menu = new ContextMenu(diagram, { partItems, showDefaults: false });
    const node = Node.fromPosAndSize(9, 0, 0, 100, 50);

    menu.open(100, 100, node);
    const item = Array.from(menu.getElement().querySelectorAll('.graphojs-context-menu-item')).find(
      (el) => el.textContent === 'Delete',
    );
    expect(item).toBeDefined();
    if (item) {
      (item as HTMLElement).click();
      expect(action).toHaveBeenCalledTimes(1);
    }
  });

  it('should disable items with enabled false', () => {
    const diagram = createMockDiagram();
    const action = vi.fn();
    const partItems: ContextMenuItem[] = [{ label: 'Disabled', action, enabled: false }];
    const menu = new ContextMenu(diagram, { partItems, showDefaults: false });
    const node = Node.fromPosAndSize(9, 0, 0, 100, 50);

    menu.open(100, 100, node);
    const item = Array.from(menu.getElement().querySelectorAll('.graphojs-context-menu-item')).find(
      (el) => el.textContent === 'Disabled',
    );
    expect(item).toBeDefined();
    if (item) {
      (item as HTMLElement).click();
      expect(action).not.toHaveBeenCalled();
    }
  });

  it('should show separator', () => {
    const diagram = createMockDiagram();
    const partItems: ContextMenuItem[] = [{ label: 'Delete', action: vi.fn() }];
    const menu = new ContextMenu(diagram, { partItems, showDefaults: true });
    const node = Node.fromPosAndSize(9, 0, 0, 100, 50);

    menu.open(100, 100, node);
    const separators = menu.getElement().querySelectorAll('.graphojs-context-menu-separator');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('should handle context menu event', () => {
    const diagram = createMockDiagram();
    const menu = new ContextMenu(diagram, { partItems: [], showDefaults: false });
    const event = new MouseEvent('contextmenu', { clientX: 100, clientY: 100, bubbles: true });

    menu.handleContextMenu(event);
    expect(menu.isMenuOpen).toBe(true);
  });

  it('should destroy and remove element', () => {
    const diagram = createMockDiagram();
    const menu = new ContextMenu(diagram, { partItems: [], showDefaults: false });

    menu.destroy();
    expect(document.body.contains(menu.getElement())).toBe(false);
  });
});

describe('createDefaultContextMenu', () => {
  it('should create a default context menu', () => {
    const diagram = createMockDiagram();
    const menu = createDefaultContextMenu(diagram);
    expect(menu).toBeInstanceOf(ContextMenu);
  });

  it('should use custom part items', () => {
    const diagram = createMockDiagram();
    const action = vi.fn();
    const menu = createDefaultContextMenu(diagram, {
      partItems: [{ label: 'Custom', action }],
    });
    const node = Node.fromPosAndSize(9, 0, 0, 100, 50);

    menu.open(100, 100, node);
    const text = menu.getElement().textContent ?? '';
    expect(text).toContain('Custom');
  });
});
