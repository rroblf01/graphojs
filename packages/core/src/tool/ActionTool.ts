import { InputEvent } from '../events/InputEvent.ts';
import type { GraphObject } from '../panel/GraphObject.ts';
import { Tool } from './Tool.ts';

/**
 * GoJS-compatible: dispatches `actionDown`/`actionMove`/`actionUp`/
 * `actionCancel` on the deepest `GraphObject` with `isActionable: true`
 * under the mouse — for building controls (buttons, sliders) inside a
 * Part's visual tree without defining a new `Tool`.
 */
export class ActionTool extends Tool {
  private _target: GraphObject | null = null;

  constructor(init?: Partial<ActionTool>) {
    super();
    if (init) Object.assign(this, init);
  }

  private findActionable(e: MouseEvent): GraphObject | null {
    const diagram = this.diagram;
    if (!diagram) return null;
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    if (!part) return null;
    const obj = diagram.findHitGraphObject(part, point);
    return obj?.isActionable ? obj : null;
  }

  override canStart(_toolName: string, e: MouseEvent): boolean {
    return this.findActionable(e) !== null;
  }

  override doMouseDown(e: MouseEvent): void {
    this._target = this.findActionable(e);
    this._target?.actionDown?.(new InputEvent(e), this._target);
  }

  override doMouseMove(e: MouseEvent): void {
    this._target?.actionMove?.(new InputEvent(e), this._target);
  }

  override doMouseUp(e: MouseEvent): void {
    this._target?.actionUp?.(new InputEvent(e), this._target);
    this._target = null;
  }

  doCancel(): void {
    if (this._target) {
      this._target.actionCancel?.(new InputEvent(new MouseEvent('mouseup')), this._target);
    }
    this._target = null;
  }
}
