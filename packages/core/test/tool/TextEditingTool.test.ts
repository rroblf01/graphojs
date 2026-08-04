// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { TextEditingTool } from '../../src/tool/TextEditingTool.ts';
import { Node } from '../../src/parts/Node.ts';
import type { Diagram } from '../../src/diagram/Diagram.ts';

function createMockDiagram(node: Node): Diagram {
  const nodeDataArray = [{ key: node.key, label: node.label }];
  const model = {
    getNodeData: (key: string | number) => nodeDataArray.find((d) => d.key === key),
    setNodeProperty: vi.fn((key: string | number, prop: string, value: unknown) => {
      const data = nodeDataArray.find((d) => d.key === key);
      if (data) {
        data[prop] = value;
      }
    }),
  };
  return {
    getModel: () => model,
    getRenderer: () => ({
      getCanvas: () => ({ getBoundingClientRect: () => ({ left: 0, top: 0 }) }),
    }),
    getViewport: () => ({ x: 0, y: 0, scale: 1 }),
    getDiagramPoint: () => ({ x: 0, y: 0 }),
    findPartAt: () => node,
    invalidate: vi.fn(),
    fireDiagramEvent: vi.fn(),
  } as unknown as Diagram;
}

beforeAll(() => {
  document.body.innerHTML = '';
});

describe('TextEditingTool', () => {
  it('should create with defaults', () => {
    const tool = new TextEditingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isActive).toBe(false);
    expect(tool.isEditing).toBe(false);
    expect(tool.editingNode).toBeNull();
  });

  it('should start editing a node', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.label = 'Hello';
    const diagram = createMockDiagram(node);
    const tool = new TextEditingTool();
    tool.diagram = diagram;

    tool.editNode(node);
    expect(tool.isEditing).toBe(true);
    expect(tool.editingNode).toBe(node);

    // An input should be in the DOM
    const input = document.querySelector('.graphojs-text-editing') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe('Hello');
  });

  it('should commit changes to model on stopEditing', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.label = 'Hello';
    const diagram = createMockDiagram(node);
    const tool = new TextEditingTool();
    tool.diagram = diagram;

    tool.editNode(node);
    const input = document.querySelector('.graphojs-text-editing') as HTMLInputElement;
    input.value = 'World';
    tool.stopEditing(true);

    expect(diagram.getModel().getNodeData(1)?.label).toBe('World');
    expect(tool.isEditing).toBe(false);
    expect(tool.editingNode).toBeNull();
    expect(document.querySelector('.graphojs-text-editing')).toBeNull();
  });

  it('should cancel editing without committing', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.label = 'Hello';
    const diagram = createMockDiagram(node);
    const tool = new TextEditingTool();
    tool.diagram = diagram;

    tool.editNode(node);
    const input = document.querySelector('.graphojs-text-editing') as HTMLInputElement;
    input.value = 'Changed';
    tool.cancelEditing();

    expect(diagram.getModel().getNodeData(1)?.label).toBe('Hello');
    expect(tool.isEditing).toBe(false);
  });

  it('should handle double-click on a node', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.label = 'Test';
    const diagram = createMockDiagram(node);
    const tool = new TextEditingTool();
    tool.diagram = diagram;

    const event = new MouseEvent('dblclick', { button: 0, bubbles: true });
    tool.doDoubleClick(event);
    expect(tool.isEditing).toBe(true);
    expect(tool.editingNode).toBe(node);
  });

  it('should not start editing on right-click double', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    const diagram = createMockDiagram(node);
    const tool = new TextEditingTool();
    tool.diagram = diagram;

    const event = new MouseEvent('dblclick', { button: 2, bubbles: true });
    tool.doDoubleClick(event);
    expect(tool.isEditing).toBe(false);
  });

  it('should not start editing unselectable node', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.selectable = false;
    const diagram = createMockDiagram(node);
    const tool = new TextEditingTool();
    tool.diagram = diagram;

    tool.editNode(node);
    expect(tool.isEditing).toBe(false);
  });

  it('should commit on deactivate', () => {
    const node = Node.fromPosAndSize(1, 0, 0, 100, 50);
    node.label = 'A';
    const diagram = createMockDiagram(node);
    const tool = new TextEditingTool();
    tool.diagram = diagram;

    tool.editNode(node);
    const input = document.querySelector('.graphojs-text-editing') as HTMLInputElement;
    input.value = 'B';
    tool.doDeactivate();

    expect(diagram.getModel().getNodeData(1)?.label).toBe('B');
    expect(tool.isEditing).toBe(false);
  });
});
