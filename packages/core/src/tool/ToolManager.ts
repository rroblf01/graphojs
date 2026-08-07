import type { Diagram } from '../diagram/Diagram.ts';
import type { DraggingTool } from './DraggingTool.ts';
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
  private mouseDownToolsList: Tool[] = [];
  private mouseMoveToolsList: Tool[] = [];
  private mouseUpToolsList: Tool[] = [];
  private wheelToolsList: Tool[] = [];
  private clickToolsList: Tool[] = [];
  private doubleClickToolsList: Tool[] = [];
  private keyDownToolsList: Tool[] = [];
  private keyUpToolsList: Tool[] = [];

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

  /** GoJS-compatible: The currently active tool (or null). */
  get currentTool(): Tool | null {
    return this.activeTool;
  }

  /** GoJS-compatible: The registered dragging tool, for configuring guided dragging. */
  get draggingTool(): DraggingTool | undefined {
    return this.getTool('dragging') as DraggingTool | undefined;
  }

  /** GoJS-compatible: The tool list consulted on mouse-down events. */
  get mouseDownTools(): readonly Tool[] {
    return this.mouseDownToolsList;
  }

  /** GoJS-compatible: The tool list consulted on mouse-move events. */
  get mouseMoveTools(): readonly Tool[] {
    return this.mouseMoveToolsList;
  }

  /** GoJS-compatible: The tool list consulted on mouse-up events. */
  get mouseUpTools(): readonly Tool[] {
    return this.mouseUpToolsList;
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

  private getList(listName: string): Tool[] {
    switch (listName) {
      case 'mouseDown':
        return this.mouseDownToolsList;
      case 'mouseMove':
        return this.mouseMoveToolsList;
      case 'mouseUp':
        return this.mouseUpToolsList;
      case 'wheel':
        return this.wheelToolsList;
      case 'click':
        return this.clickToolsList;
      case 'doubleClick':
        return this.doubleClickToolsList;
      case 'keyDown':
        return this.keyDownToolsList;
      case 'keyUp':
        return this.keyUpToolsList;
      default:
        return [];
    }
  }

  private removeFromLists(tool: Tool): void {
    for (const list of [
      this.mouseDownToolsList,
      this.mouseMoveToolsList,
      this.mouseUpToolsList,
      this.wheelToolsList,
      this.clickToolsList,
      this.doubleClickToolsList,
      this.keyDownToolsList,
      this.keyUpToolsList,
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
    const tool = this.findToolForEvent(this.mouseDownToolsList, e);
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

    // Only pick up a tool on mousemove while a button is held (drag), never on hover
    if (e.buttons > 0) {
      const tool = this.findToolForEvent(this.mouseMoveToolsList, e);
      if (tool) {
        const name = this.findToolName(tool);
        if (name) {
          this.activateTool(name);
          tool.doStart(e);
          tool.doMouseMove(e);
        }
      }
    }
  }

  /** Handle mouse up event. */
  handleMouseUp(e: MouseEvent): void {
    if (this.activeTool) {
      this.activeTool.doMouseUp(e);
      // deactivateTool() calls doStop() exactly once
      this.deactivateTool();
      return;
    }

    // Try to find a tool that can handle this event
    const tool = this.findToolForEvent(this.mouseUpToolsList, e);
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
    for (const tool of this.wheelToolsList) {
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

    for (const tool of this.keyDownToolsList) {
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

    for (const tool of this.keyUpToolsList) {
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

    for (const tool of this.clickToolsList) {
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

    for (const tool of this.doubleClickToolsList) {
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
