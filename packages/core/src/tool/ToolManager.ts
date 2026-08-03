import type { Diagram } from '../diagram/Diagram.ts';
import type { Tool } from './Tool.ts';

/**
 * Manages interaction tools for a diagram.
 */
export class ToolManager {
  private diagram: Diagram;
  private tools: Map<string, Tool> = new Map();
  private activeTool: Tool | null = null;
  private activeToolName: string | null = null;

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

  /** Activate a tool by name. */
  activateTool(name: string): boolean {
    const tool = this.tools.get(name);
    if (!tool?.isEnabled) return false;

    if (this.activeTool) {
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

  /** Handle mouse down event. */
  handleMouseDown(e: MouseEvent): void {
    this.activeTool?.doMouseDown(e);
  }

  /** Handle mouse move event. */
  handleMouseMove(e: MouseEvent): void {
    this.activeTool?.doMouseMove(e);
  }

  /** Handle mouse up event. */
  handleMouseUp(e: MouseEvent): void {
    this.activeTool?.doMouseUp(e);
  }

  /** Handle mouse wheel event. */
  handleMouseWheel(e: WheelEvent): void {
    this.activeTool?.doMouseWheel(e);
  }

  /** Handle key down event. */
  handleKeyDown(e: KeyboardEvent): void {
    this.activeTool?.doKeyDown(e);
  }

  /** Handle key up event. */
  handleKeyUp(e: KeyboardEvent): void {
    this.activeTool?.doKeyUp(e);
  }

  /** Handle click event. */
  handleClick(e: MouseEvent): void {
    this.activeTool?.doClick(e);
  }

  /** Handle double click event. */
  handleDoubleClick(e: MouseEvent): void {
    this.activeTool?.doDoubleClick(e);
  }
}
