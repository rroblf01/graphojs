import type { Diagram } from '../diagram/Diagram.ts';
import type { Part } from '../parts/Part.ts';

/**
 * Base class for all interaction tools.
 */
export abstract class Tool {
  private _diagram: Diagram | null = null;
  private _isActive = false;
  private _isEnabled = true;

  /** Get the diagram this tool belongs to. */
  get diagram(): Diagram | null {
    return this._diagram;
  }

  /** Set the diagram this tool belongs to. */
  set diagram(value: Diagram | null) {
    this._diagram = value;
  }

  /** Check if this tool is currently active. */
  get isActive(): boolean {
    return this._isActive;
  }

  /** Check if this tool is enabled. */
  get isEnabled(): boolean {
    return this._isEnabled;
  }

  /** Enable or disable this tool. */
  set isEnabled(value: boolean) {
    this._isEnabled = value;
  }

  /** Called when the tool becomes the active tool. */
  doActivate(): void {
    this._isActive = true;
  }

  /** Called when the tool is deactivated. */
  doDeactivate(): void {
    this._isActive = false;
  }

  /** Called when a mouse down event occurs. */
  doMouseDown(_e: MouseEvent): void {
    // Override in subclasses
  }

  /** Called when a mouse move event occurs. */
  doMouseMove(_e: MouseEvent): void {
    // Override in subclasses
  }

  /** Called when a mouse up event occurs. */
  doMouseUp(_e: MouseEvent): void {
    // Override in subclasses
  }

  /** Called when a mouse wheel event occurs. */
  doMouseWheel(_e: WheelEvent): void {
    // Override in subclasses
  }

  /** Called when a key down event occurs. */
  doKeyDown(_e: KeyboardEvent): void {
    // Override in subclasses
  }

  /** Called when a key up event occurs. */
  doKeyUp(_e: KeyboardEvent): void {
    // Override in subclasses
  }

  /** Called when a click event occurs. */
  doClick(_e: MouseEvent): void {
    // Override in subclasses
  }

  /** Called when a double click event occurs. */
  doDoubleClick(_e: MouseEvent): void {
    // Override in subclasses
  }

  /**
   * GoJS-compatible: Called when a tool operation starts (after canStart returns true).
   */
  doStart(_e: MouseEvent): void {
    // Override in subclasses
  }

  /**
   * GoJS-compatible: Called when a tool operation stops.
   */
  doStop(): void {
    // Override in subclasses
  }

  /**
   * GoJS-compatible: Determines whether this tool should start given the current event.
   * Override in subclasses to return true when this tool should handle the event.
   */
  canStart(_toolName: string, _e: MouseEvent): boolean {
    return false;
  }

  /** Find a part at the given diagram coordinates. */
  findPartAt(x: number, y: number): Part | null {
    if (!this._diagram) return null;
    return this._diagram.findPartAt(x, y);
  }

  /** Get the mouse position in diagram coordinates. */
  getDiagramPoint(e: MouseEvent): { x: number; y: number } {
    if (!this._diagram) return { x: 0, y: 0 };
    return this._diagram.getDiagramPoint(e);
  }
}
