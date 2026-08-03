import { describe, it, expect, beforeEach } from 'vitest';
import { Tool } from '../../src/tool/Tool.ts';
import { ToolManager } from '../../src/tool/ToolManager.ts';
import { ClickSelectingTool } from '../../src/tool/ClickSelectingTool.ts';
import { DraggingTool } from '../../src/tool/DraggingTool.ts';
import { PanningTool } from '../../src/tool/PanningTool.ts';
import { ZoomingTool } from '../../src/tool/ZoomingTool.ts';

class TestTool extends Tool {
  activateCalled = false;
  deactivateCalled = false;
  mouseDownCalled = false;
  mouseMoveCalled = false;
  mouseUpCalled = false;

  override doActivate(): void {
    this.activateCalled = true;
    super.doActivate();
  }

  override doDeactivate(): void {
    this.deactivateCalled = true;
    super.doDeactivate();
  }

  override doMouseDown(_e: MouseEvent): void {
    this.mouseDownCalled = true;
  }

  override doMouseMove(_e: MouseEvent): void {
    this.mouseMoveCalled = true;
  }

  override doMouseUp(_e: MouseEvent): void {
    this.mouseUpCalled = true;
  }
}

describe('Tool', () => {
  let tool: TestTool;

  beforeEach(() => {
    tool = new TestTool();
  });

  it('should have default values', () => {
    expect(tool.diagram).toBeNull();
    expect(tool.isActive).toBe(false);
    expect(tool.isEnabled).toBe(true);
  });

  it('should activate and deactivate', () => {
    tool.doActivate();
    expect(tool.isActive).toBe(true);
    expect(tool.activateCalled).toBe(true);

    tool.doDeactivate();
    expect(tool.isActive).toBe(false);
    expect(tool.deactivateCalled).toBe(true);
  });

  it('should handle mouse events', () => {
    const event = new Event('mousedown') as MouseEvent;
    tool.doMouseDown(event);
    expect(tool.mouseDownCalled).toBe(true);

    const moveEvent = new Event('mousemove') as MouseEvent;
    tool.doMouseMove(moveEvent);
    expect(tool.mouseMoveCalled).toBe(true);

    const upEvent = new Event('mouseup') as MouseEvent;
    tool.doMouseUp(upEvent);
    expect(tool.mouseUpCalled).toBe(true);
  });

  it('should find part at coordinates', () => {
    expect(tool.findPartAt(0, 0)).toBeNull();
  });
});

describe('ToolManager', () => {
  let toolManager: ToolManager;

  beforeEach(() => {
    const mockDiagram = Object.create(null) as {
      findPartAt: () => null;
      getDiagramPoint: () => { x: number; y: number };
    };
    mockDiagram.findPartAt = () => null;
    mockDiagram.getDiagramPoint = () => ({ x: 0, y: 0 });
    toolManager = new ToolManager(mockDiagram);
  });

  it('should register and unregister tools', () => {
    const tool = new TestTool();
    toolManager.registerTool('test', tool);
    expect(toolManager.hasTool('test')).toBe(true);
    expect(toolManager.getTool('test')).toBe(tool);
    expect(toolManager.getToolNames()).toContain('test');

    expect(toolManager.unregisterTool('test')).toBe(true);
    expect(toolManager.hasTool('test')).toBe(false);
  });

  it('should activate and deactivate tools', () => {
    const tool = new TestTool();
    toolManager.registerTool('test', tool);

    expect(toolManager.activateTool('test')).toBe(true);
    expect(toolManager.getActiveTool()).toBe(tool);
    expect(toolManager.getActiveToolName()).toBe('test');
    expect(tool.isActive).toBe(true);

    toolManager.deactivateTool();
    expect(toolManager.getActiveTool()).toBeNull();
    expect(toolManager.getActiveToolName()).toBeNull();
    expect(tool.isActive).toBe(false);
  });

  it('should not activate disabled tool', () => {
    const tool = new TestTool();
    tool.isEnabled = false;
    toolManager.registerTool('test', tool);

    expect(toolManager.activateTool('test')).toBe(false);
    expect(toolManager.getActiveTool()).toBeNull();
  });

  it('should deactivate previous tool when activating new one', () => {
    const tool1 = new TestTool();
    const tool2 = new TestTool();
    toolManager.registerTool('test1', tool1);
    toolManager.registerTool('test2', tool2);

    toolManager.activateTool('test1');
    expect(toolManager.getActiveTool()).toBe(tool1);

    toolManager.activateTool('test2');
    expect(toolManager.getActiveTool()).toBe(tool2);
    expect(tool1.deactivateCalled).toBe(true);
  });

  it('should delegate mouse events to active tool', () => {
    const tool = new TestTool();
    toolManager.registerTool('test', tool);
    toolManager.activateTool('test');

    const downEvent = new Event('mousedown') as MouseEvent;
    toolManager.handleMouseDown(downEvent);
    expect(tool.mouseDownCalled).toBe(true);

    const moveEvent = new Event('mousemove') as MouseEvent;
    toolManager.handleMouseMove(moveEvent);
    expect(tool.mouseMoveCalled).toBe(true);

    const upEvent = new Event('mouseup') as MouseEvent;
    toolManager.handleMouseUp(upEvent);
    expect(tool.mouseUpCalled).toBe(true);
  });

  it('should handle unregistering active tool', () => {
    const tool = new TestTool();
    toolManager.registerTool('test', tool);
    toolManager.activateTool('test');

    expect(toolManager.unregisterTool('test')).toBe(true);
    expect(toolManager.getActiveTool()).toBeNull();
  });
});

describe('ClickSelectingTool', () => {
  it('should create with correct defaults', () => {
    const tool = new ClickSelectingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isActive).toBe(false);
  });
});

describe('DraggingTool', () => {
  it('should create with correct defaults', () => {
    const tool = new DraggingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isActive).toBe(false);
    expect(tool.isDragging).toBe(false);
  });
});

describe('PanningTool', () => {
  it('should create with correct defaults', () => {
    const tool = new PanningTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isActive).toBe(false);
  });
});

describe('ZoomingTool', () => {
  it('should create with correct defaults', () => {
    const tool = new ZoomingTool();
    expect(tool.isEnabled).toBe(true);
    expect(tool.isActive).toBe(false);
  });

  it('should create with custom min/max scale', () => {
    const tool = new ZoomingTool(0.5, 5);
    expect(tool.isEnabled).toBe(true);
  });
});
