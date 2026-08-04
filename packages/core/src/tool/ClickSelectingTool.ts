import { Tool } from './Tool.ts';

/**
 * Tool for selecting parts by clicking.
 */
export class ClickSelectingTool extends Tool {
  /** GoJS-compatible: default selector — claims any primary click not handled by a higher-priority tool. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    return e.button === 0;
  }

  override doMouseDown(e: MouseEvent): void {
    if (e.button !== 0) return;

    const point = this.getDiagramPoint(e);
    const diagram = this.diagram;
    if (!diagram) return;

    // Clear selection if not holding Ctrl/Cmd
    if (!e.ctrlKey && !e.metaKey) {
      diagram.clearSelection();
    }

    // Find and select the part under the cursor
    const part = this.findPartAt(point.x, point.y);
    if (part) {
      part.isSelected = true;
      diagram.invalidate();
    }
  }
}
