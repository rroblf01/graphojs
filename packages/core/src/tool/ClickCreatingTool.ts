import type { NodeData, NodeKey } from '../model/Model.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for creating nodes by clicking on an empty part of the diagram.
 * GoJS-compatible: adds a node (using archetypeNodeData) at the click point.
 */
export class ClickCreatingTool extends Tool {
  private _archetypeNodeData: NodeData | null = null;
  private _isForTreeView = false;

  /** GoJS-compatible: A template of properties for nodes created by this tool. */
  get archetypeNodeData(): NodeData | null {
    return this._archetypeNodeData;
  }

  set archetypeNodeData(value: NodeData | null) {
    this._archetypeNodeData = value;
  }

  /** GoJS-compatible: Whether clicks are used to create tree children. */
  get isForTreeView(): boolean {
    return this._isForTreeView;
  }

  set isForTreeView(value: boolean) {
    this._isForTreeView = value;
  }

  /** GoJS-compatible: start creating on a click on empty background with primary button. */
  override canStart(_toolName: string, e: MouseEvent): boolean {
    if (e.button !== 0) return false;
    if (!this._archetypeNodeData) return false;
    if (!this.diagram || this.diagram.isReadOnly) return false;
    const point = this.getDiagramPoint(e);
    return this.findPartAt(point.x, point.y) === null;
  }

  override doMouseUp(e: MouseEvent): void {
    if (e.button !== 0) return;
    const diagram = this.diagram;
    if (!diagram || diagram.isReadOnly) return;
    if (!this._archetypeNodeData) return;

    const point = this.getDiagramPoint(e);
    const existing = this.findPartAt(point.x, point.y);
    if (existing) return;

    // Round to grid if snapping is enabled
    let x = point.x;
    let y = point.y;
    if (diagram.isSnapToGridEnabled()) {
      x = diagram.snapValue(x);
      y = diagram.snapValue(y);
    }

    const nodeData: NodeData = {
      ...this._archetypeNodeData,
      x,
      y,
    };
    let key: NodeKey | undefined;
    diagram.commit((d) => {
      key = d.getModel().addNode(nodeData);
    }, 'Click-create node');
    diagram.invalidate();

    if (key !== undefined) {
      const node = diagram.getPart(key);
      if (node) {
        diagram.announce(
          diagram.accessibilityMessages.partAdded(diagram.accessibilityMessages.describePart(node)),
        );
      }
    }
  }
}
