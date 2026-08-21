import type { Diagram } from '../diagram/Diagram.ts';
import type { Part } from '../parts/Part.ts';
import type { Tool } from '../tool/Tool.ts';

/**
 * GoJS-compatible: an HTML-based alternative to a `Panel` template for
 * `Part.contextMenu`/`toolTip`, or `TextBlock.textEditor` — instead of a
 * canvas-drawn Panel, `show`/`hide` are given full control over an
 * arbitrary HTML element.
 *
 * Real GoJS types `show`'s first argument as `GraphObject | null`, since
 * `Part extends GraphObject` there. graphojs's `Part` has a `panel`
 * instead of being one (a permanent architectural difference), so this is
 * typed `Part | null` — the part the menu/tooltip is being shown for, or
 * `null` for the diagram background.
 */
export class HTMLInfo {
  private _mainElement: HTMLElement | null = null;
  private _show: ((a: Part | null, b: Diagram, c: Tool | null) => void) | null = null;
  private _hide: ((a: Diagram, b: Tool | null) => void) | null = null;
  private _valueFunction: (() => unknown) | null = null;

  constructor(init?: Partial<HTMLInfo>) {
    if (init) Object.assign(this, init);
  }

  get mainElement(): HTMLElement | null {
    return this._mainElement;
  }

  set mainElement(value: HTMLElement | null) {
    this._mainElement = value;
  }

  get show(): ((a: Part | null, b: Diagram, c: Tool | null) => void) | null {
    return this._show;
  }

  set show(value: ((a: Part | null, b: Diagram, c: Tool | null) => void) | null) {
    this._show = value;
  }

  get hide(): ((a: Diagram, b: Tool | null) => void) | null {
    return this._hide;
  }

  set hide(value: ((a: Diagram, b: Tool | null) => void) | null) {
    this._hide = value;
  }

  get valueFunction(): (() => unknown) | null {
    return this._valueFunction;
  }

  set valueFunction(value: (() => unknown) | null) {
    this._valueFunction = value;
  }

  /** Invoke `show`, falling back to un-hiding `mainElement` if `hide` wasn't set either. */
  invokeShow(part: Part | null, diagram: Diagram, tool: Tool | null): void {
    this._show?.(part, diagram, tool);
  }

  /** Invoke `hide`, or — if unset — hide `mainElement` directly, matching GoJS's documented default. */
  invokeHide(diagram: Diagram, tool: Tool | null): void {
    if (this._hide) {
      this._hide(diagram, tool);
    } else if (this._mainElement) {
      this._mainElement.style.display = 'none';
    }
  }
}
