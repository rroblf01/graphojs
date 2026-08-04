import type { Diagram } from '../diagram/Diagram.ts';
import { Node } from '../parts/Node.ts';
import { Panel } from '../panel/Panel.ts';
import { TextBlock } from '../panel/TextBlock.ts';
import { Tool } from './Tool.ts';

/**
 * Tool for editing text in place (GoJS-compatible).
 * Double-clicking a node with an `editable` TextBlock in its visual tree
 * shows an HTML input overlay for editing that TextBlock's text.
 */
export class TextEditingTool extends Tool {
  private input: HTMLInputElement | null = null;
  private textBlock: TextBlock | null = null;
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

  /** Get the TextBlock currently being edited, or null. */
  get editingTextBlock(): TextBlock | null {
    return this.textBlock;
  }

  /** Find the first editable TextBlock in a node's visual tree. */
  findEditableTextBlock(node: Node): TextBlock | null {
    const panel = node.panel;
    if (!panel) return null;
    return this.findEditableInPanel(panel);
  }

  private findEditableInPanel(panel: Panel): TextBlock | null {
    for (const el of panel.elements) {
      if (el instanceof TextBlock && el.editable) {
        return el;
      }
      if (el instanceof Panel) {
        const found = this.findEditableInPanel(el);
        if (found) return found;
      }
    }
    return null;
  }

  /** Start editing the text of a node (its editable TextBlock or its label). */
  editNode(node: Node): void {
    const diagram = this.diagram;
    if (!diagram || this._isEditing) return;
    // GoJS-compatible: respect isEnabled, read-only and allowTextEdit flags
    if (
      diagram.isEnabled === false ||
      diagram.isReadOnly === true ||
      diagram.allowTextEdit === false
    )
      return;
    if (!node.selectable) return;

    // Prefer an editable TextBlock in the visual tree; fall back to the node label
    const textBlock = this.findEditableTextBlock(node);
    this.node = node;
    this.textBlock = textBlock;
    this.showEditor(diagram);
    this._isEditing = true;
  }

  /** Stop editing and commit the current value. */
  stopEditing(commit = true): void {
    if (!this._isEditing || !this.input || !this.node) return;

    const diagram = this.diagram;
    const value = this.input.value;
    const node = this.node;
    const textBlock = this.textBlock;

    // Prevent re-entrancy: hide/clear BEFORE committing so a synchronous blur
    // from removing the input cannot double-commit or commit a cancelled edit.
    this.hideEditor();
    this._isEditing = false;
    this.node = null;
    this.textBlock = null;

    if (commit && diagram) {
      // Wrap the model write in a transaction so text edits are undoable
      diagram.startTransaction('text edit');
      try {
        if (textBlock) {
          this.commitTextBlock(diagram, node, textBlock, value);
        } else {
          this.commitNodeLabel(diagram, node, value);
        }
      } finally {
        diagram.commitTransaction('text edit');
      }
      // GoJS-compatible: fire TextEdited after a successful edit
      diagram.fireDiagramEvent('TextEdited', node, { text: value });
    }
  }

  /** Commit an edited TextBlock back to the model when it has a source binding. */
  private commitTextBlock(diagram: Diagram, node: Node, textBlock: TextBlock, value: string): void {
    textBlock.text = value;
    diagram.invalidate();

    // If the TextBlock has a binding to a model property, write the value back
    for (const binding of textBlock.bindings) {
      if (binding.targetProperty === 'text') {
        const nodeData = node.data;
        if (nodeData) {
          diagram.getModel().setDataProperty(nodeData, binding.sourceProperty, value);
        }
        return;
      }
    }
  }

  /** Commit a node label edit to the model. */
  private commitNodeLabel(diagram: Diagram, node: Node, value: string): void {
    const key = node.key;
    const model = diagram.getModel();
    if (model.getNodeData(key)) {
      model.setNodeProperty(key, 'label', value);
    } else {
      node.label = value;
      diagram.invalidate();
    }
  }

  /** Cancel editing without committing. */
  cancelEditing(): void {
    this.stopEditing(false);
  }

  /** Show the HTML input overlay over the target's bounds. */
  private showEditor(diagram: Diagram): void {
    if (!this.node) return;

    const canvas = diagram.getRenderer().getCanvas();
    const rect = canvas.getBoundingClientRect();
    const viewport = diagram.getViewport();

    // TextBlock bounds are in panel coordinates; use node bounds for the overlay
    const w = this.node.bounds.width;
    const h = this.node.bounds.height;

    const screen = {
      x: (this.node.bounds.x - viewport.x) * viewport.scale,
      y: (this.node.bounds.y - viewport.y) * viewport.scale,
    };
    const size = { width: w * viewport.scale, height: h * viewport.scale };

    const input = document.createElement('input');
    input.type = 'text';
    input.value = this.textBlock ? this.textBlock.text : this.node.label;
    input.className = 'graphojs-text-editing';
    input.style.cssText = `
      position:fixed;
      left:${rect.left + screen.x}px;
      top:${rect.top + screen.y}px;
      width:${size.width}px;
      height:${size.height}px;
      box-sizing:border-box;
      font:${this.textBlock?.font ?? this.node.labelFont};
      color:${this.textBlock?.color ?? this.node.labelColor};
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
