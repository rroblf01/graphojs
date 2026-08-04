import type { Diagram } from '../diagram/Diagram.ts';
import type { Tool } from './Tool.ts';

/**
 * Manages interaction tools for a diagram.
 * Supports GoJS-style multi-tool lists with canStart() auto-selection.
 */
export class ToolManager {
  private diagram: Diagram;
  private tools: Map<string, Tool> = new Map();
  private activeTool: Tool | null = null;
  private activeToolName: string | null = null;

  // GoJS-style tool lists per event type
  private mouseDownTools: Tool[] = [];
  private mouseMoveTools: Tool[] = [];
  private mouseUpTools: Tool[] = [];
  private wheelTools: Tool[] = [];
  private clickTools: Tool[] = [];
  private doubleClickTools: Tool[] = [];
  private keyDownTools: Tool[] = [];
  private keyUpTools: Tool[] = [];

  constructor(diagram: Diagram) {
    this.diagram = diagram;
  }

  /** Register a tool with a name. */
  registerTool(name: string, tool: Tool): void {
    tool.diagram = this.diagram;
    this.tools.set(name, tool);
  }

  /** Unregister a tool by name. */
  unregisterTool(name: string): boolean {
    const tool = this.tools.get(name);
    if (!tool) return false;

    if (this.activeToolName === name) {
      this.deactivateTool();
    }

    tool.diagram = null;

    // Remove from all lists
    this.removeFromLists(tool);

    return this.tools.delete(name);
  }

  /** Get a tool by name. */
  getTool(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  /** Check if a tool is registered. */
  hasTool(name: string): boolean {
    return this.tools.has(name);
  }

  /** Get all registered tool names. */
  getToolNames(): string[] {
    return Array.from(this.tools.keys());
  }

  /** GoJS-compatible: Add a tool to a specific event list. */
  addToolToList(
    listName:
      | 'mouseDown'
      | 'mouseMove'
      | 'mouseUp'
      | 'wheel'
      | 'click'
      | 'doubleClick'
      | 'keyDown'
      | 'keyUp',
    tool: Tool,
  ): void {
    const list = this.getList(listName);
    if (!list.includes(tool)) {
      list.push(tool);
    }
  }

  /** GoJS-compatible: Remove a tool from a specific event list. */
  removeToolFromList(
    listName:
      | 'mouseDown'
      | 'mouseMove'
      | 'mouseUp'
      | 'wheel'
      | 'click'
      | 'doubleClick'
      | 'keyDown'
      | 'keyUp',
    tool: Tool,
  ): boolean {
    const list = this.getList(listName);
    const index = list.indexOf(tool);
    if (index === -1) return false;
    list.splice(index, 1);
    return true;
  }

  /** Get a specific event tool list. */
  getToolList(
    listName:
      | 'mouseDown'
      | 'mouseMove'
      | 'mouseUp'
      | 'wheel'
      | 'click'
      | 'doubleClick'
      | 'keyDown'
      | 'keyUp',
  ): readonly Tool[] {
    return this.getList(listName);
  }

  private getList(
    listName: string,
  ): Tool[] {
    switch (listName) {
      case 'mouseDown':
        return this.mouseDownTools;
      case 'mouseMove':
        return this.mouseMoveTools;
      case 'mouseUp':
        return this.mouseUpTools;
      case 'wheel':
        return this.wheelTools;
      case 'click':
        return this.clickTools;
      case 'doubleClick':
        return this.doubleClickTools;
      case 'keyDown':
        return this.keyDownTools;
      case 'keyUp':
        return this.keyUpTools;
      default:
        return [];
    }
  }

  private removeFromLists(tool: Tool): void {
    for (const list of [
      this.mouseDownTools,
      this.mouseMoveTools,
      this.mouseUpTools,
      this.wheelTools,
      this.clickTools,
      this.doubleClickTools,
      this.keyDownTools,
      this.keyUpTools,
    ]) {
      const index = list.indexOf(tool);
      if (index !== -1) list.splice(index, 1);
    }
  }

  /** Activate a tool by name. */
  activateTool(name: string): boolean {
    const tool = this.tools.get(name);
    if (!tool?.isEnabled) return false;

    if (this.activeTool) {
      this.activeTool.doStop();
      this.activeTool.doDeactivate();
    }

    this.activeTool = tool;
    this.activeToolName = name;
    tool.doActivate();
    return true;
  }

  /** Deactivate the current tool. */
  deactivateTool(): void {
    if (this.activeTool) {
      this.activeTool.doStop();
      this.activeTool.doDeactivate();
      this.activeTool = null;
      this.activeToolName = null;
    }
  }

  /** Get the currently active tool. */
  getActiveTool(): Tool | null {
    return this.activeTool;
  }

  /** Get the name of the currently active tool. */
  getActiveToolName(): string | null {
    return this.activeToolName;
  }

  /**
   * GoJS-compatible: Find the first tool in a list that canStart() returns true for.
   */
  private findToolForEvent(list: Tool[], e: MouseEvent): Tool | null {
    for (const tool of list) {
      if (tool.isEnabled && tool.canStart(tool.constructor.name, e)) {
        return tool;
      }
    }
    return null;
  }

  /** Handle mouse down event. */
  handleMouseDown(e: MouseEvent): void {
    // If there's an active tool, let it handle the event
    if (this.activeTool) {
      this.activeTool.doMouseDown(e);
      return;
    }

    // Try to find a tool that can handle this event
    const tool = this.findToolForEvent(this.mouseDownTools, e);
    if (tool) {
      const name = this.findToolName(tool);
      if (name) {
        this.activateTool(name);
        tool.doStart(e);
        tool.doMouseDown(e);
      }
    }
  }

  /** Handle mouse move event. */
  handleMouseMove(e: MouseEvent): void {
    if (this.activeTool) {
      this.activeTool.doMouseMove(e);
      return;
    }

    // Try to find a tool that can handle this event
    const tool = this.findToolForEvent(this.mouseMoveTools, e);
    if (tool) {
      const name = this.findToolName(tool);
      if (name) {
        this.activateTool(name);
        tool.doStart(e);
        tool.doMouseMove(e);
      }
    }
  }

  /** Handle mouse up event. */
  handleMouseUp(e: MouseEvent): void {
    if (this.activeTool) {
      this.activeTool.doMouseUp(e);
      this.activeTool.doStop();
      this.deactivateTool();
      return;
    }

    // Try to find a tool that can handle this event
    const tool = this.findToolForEvent(this.mouseUpTools, e);
    if (tool) {
      const name = this.findToolName(tool);
      if (name) {
        this.activateTool(name);
        tool.doStart(e);
        tool.doMouseUp(e);
        tool.doStop();
        this.deactivateTool();
      }
    }
  }

  /** Handle mouse wheel event. */
  handleMouseWheel(e: WheelEvent): void {
    if (this.activeTool) {
      this.activeTool.doMouseWheel(e);
      return;
    }

    // Try to find a tool in wheelTools (unlikely to have canStart, so just use the first enabled one)
    for (const tool of this.wheelTools) {
      if (tool.isEnabled) {
        const name = this.findToolName(tool);
        if (name) {
          this.activateTool(name);
          tool.doMouseWheel(e);
          this.deactivateTool();
        }
        return;
      }
    }
  }

  /** Handle key down event. */
  handleKeyDown(e: KeyboardEvent): void {
    if (this.activeTool) {
      this.activeTool.doKeyDown(e);
      return;
    }

    for (const tool of this.keyDownTools) {
      if (tool.isEnabled) {
        tool.doKeyDown(e);
      }
    }
  }

  /** Handle key up event. */
  handleKeyUp(e: KeyboardEvent): void {
    if (this.activeTool) {
      this.activeTool.doKeyUp(e);
      return;
    }

    for (const tool of this.keyUpTools) {
      if (tool.isEnabled) {
        tool.doKeyUp(e);
      }
    }
  }

  /** Handle click event. */
  handleClick(e: MouseEvent): void {
    if (this.activeTool) {
      this.activeTool.doClick(e);
      return;
    }

    for (const tool of this.clickTools) {
      if (tool.isEnabled) {
        tool.doClick(e);
      }
    }
  }

  /** Handle double click event. */
  handleDoubleClick(e: MouseEvent): void {
    if (this.activeTool) {
      this.activeTool.doDoubleClick(e);
      return;
    }

    for (const tool of this.doubleClickTools) {
      if (tool.isEnabled) {
        tool.doDoubleClick(e);
      }
    }
  }

  private findToolName(tool: Tool): string | null {
    for (const [name, t] of this.tools) {
      if (t === tool) return name;
    }
    return null;
  }
}
