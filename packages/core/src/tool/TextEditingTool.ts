import type { Diagram } from '../diagram/Diagram.ts';
import { Node } from '../parts/Node.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for editing node labels in place.
 * Double-clicking a node shows an HTML input overlay for editing its label.
 */
export class TextEditingTool extends Tool {
  private input: HTMLInputElement | null = null;
  private node: Node | null = null;
  private _isEditing = false;

  /** Whether text editing is currently active. */
  get isEditing(): boolean {
    return this._isEditing;
  }

  /** Get the node currently being edited. */
  get editingNode(): Node | null {
    return this.node;
  }

  /** Start editing the label of a node. */
  editNode(node: Node): void {
    const diagram = this.diagram;
    if (!diagram || this._isEditing) return;
    if (!node.selectable) return;

    this.node = node;
    this.showEditor(diagram);
    this._isEditing = true;
  }

  /** Stop editing and commit the current value. */
  stopEditing(commit = true): void {
    if (!this._isEditing || !this.input || !this.node) return;

    const diagram = this.diagram;
    const value = this.input.value;

    if (commit && diagram) {
      const key = this.node.key;
      const model = diagram.getModel();
      if (model.getNodeData(key)) {
        // Update model (triggers sync + re-render)
        model.setNodeProperty(key, 'label', value);
      } else {
        // Fallback: update the part directly
        this.node.label = value;
        diagram.invalidate();
      }
    }

    this.hideEditor();
    this._isEditing = false;
    this.node = null;
  }

  /** Cancel editing without committing. */
  cancelEditing(): void {
    this.stopEditing(false);
  }

  /** Show the HTML input overlay over the node's label. */
  private showEditor(diagram: Diagram): void {
    if (!this.node) return;

    const canvas = diagram.getRenderer().getCanvas();
    const rect = canvas.getBoundingClientRect();

    // Position the input over the node's bounds in screen space
    const screen = {
      x: (this.node.bounds.x - diagram.getViewport().x) * diagram.getViewport().scale,
      y: (this.node.bounds.y - diagram.getViewport().y) * diagram.getViewport().scale,
    };
    const size = {
      width: this.node.bounds.width * diagram.getViewport().scale,
      height: this.node.bounds.height * diagram.getViewport().scale,
    };

    const input = document.createElement('input');
    input.type = 'text';
    input.value = this.node.label;
    input.className = 'graphojs-text-editing';
    input.style.cssText = `
      position:fixed;
      left:${rect.left + screen.x}px;
      top:${rect.top + screen.y}px;
      width:${size.width}px;
      height:${size.height}px;
      box-sizing:border-box;
      font:${this.node.labelFont};
      color:${this.node.labelColor};
      text-align:center;
      border:2px solid #2196f3;
      outline:none;
      padding:0 4px;
      z-index:10000;
    `;

    document.body.appendChild(input);
    this.input = input;

    // Commit on Enter, cancel on Escape
    input.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        this.stopEditing(true);
      } else if (e.key === 'Escape') {
        this.cancelEditing();
      }
    });

    // Commit on blur
    input.addEventListener('blur', () => {
      this.stopEditing(true);
    });

    // Select all text and focus
    input.focus();
    input.select();
  }

  /** Remove the HTML input overlay. */
  private hideEditor(): void {
    if (this.input) {
      this.input.remove();
      this.input = null;
    }
  }

  /** Begin editing the node under the cursor on double-click. */
  override doDoubleClick(e: MouseEvent): void {
    if (e.button !== 0) return;
    const point = this.getDiagramPoint(e);
    const part = this.findPartAt(point.x, point.y);
    if (part instanceof Node) {
      this.editNode(part);
    }
  }

  override doDeactivate(): void {
    this.stopEditing(true);
    super.doDeactivate();
  }
}
