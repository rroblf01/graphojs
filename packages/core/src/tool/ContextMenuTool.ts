import type { Part } from '../parts/Part.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for showing a context menu when the user right-clicks.
 * GoJS-compatible: delegates to the diagram's context-menu handling.
 */
export class ContextMenuTool extends Tool {
  private _currentPart: Part | null = null;

  /** GoJS-compatible: The part that is currently showing its context menu. */
  get currentPart(): Part | null {
    return this._currentPart;
  }

  /** GoJS-compatible: start on a right-click (contextmenu event). */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    return e.button === 2;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 2) return;
    const diagram = this.diagram;
    if (!diagram) return;
    const point = this.getDiagramPoint(e);
    this._currentPart = this.findPartAt(point.x, point.y);
  }

  override doMouseUp(e: MouseEvent): void {
    if (e.button !== 2) return;
    const diagram = this.diagram;
    if (!diagram) return;

    const point = this.getDiagramPoint(e);
    this._currentPart = this.findPartAt(point.x, point.y);

    // Delegate to the diagram's context-menu handling.
    const menu = (diagram as unknown as { handleContextMenu?: (ev: MouseEvent) => void })
      .handleContextMenu;
    if (menu) {
      menu.call(diagram, e);
    }
  }

  /** GoJS-compatible: Hide any currently visible context menu. */
  hide(): void {
    const diagram = this.diagram;
    if (!diagram) return;
    const hide = (diagram as unknown as { hideContextMenu?: () => void }).hideContextMenu;
    if (hide) hide.call(diagram);
    this._currentPart = null;
  }
}
