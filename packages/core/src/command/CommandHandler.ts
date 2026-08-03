import type { Diagram } from '../diagram/Diagram.ts';
import type { NodeData, NodeKey } from '../model/Model.ts';
import { RemoveNodeCommand, RemoveLinkCommand, AddNodeCommand } from '../undo/commands.ts';

/**
 * Handles high-level editing commands for a diagram.
 * Provides delete, copy, cut, paste, and select-all operations.
 */
export class CommandHandler {
  private diagram: Diagram;
  private clipboard: NodeData[] = [];

  constructor(diagram: Diagram) {
    this.diagram = diagram;
  }

  /** Get the diagram this handler belongs to. */
  getDiagram(): Diagram {
    return this.diagram;
  }

  /** Whether copy/paste is available (there is something selected). */
  canCopy(): boolean {
    return this.diagram.getSelectedParts().length > 0;
  }

  /** Whether there is content on the clipboard to paste. */
  canPaste(): boolean {
    return this.clipboard.length > 0;
  }

  /** Delete the currently selected parts (undoable). */
  deleteSelection(): boolean {
    const selected = this.diagram.getSelectedParts();
    if (selected.length === 0) return false;

    const diagram = this.diagram;
    const model = diagram.getModel();
    const undoManager = diagram.getUndoManager();

    // Collect node and link keys
    const nodeKeys: NodeKey[] = [];
    const linkKeys: NodeKey[] = [];

    for (const part of selected) {
      if (part.key !== undefined) {
        const linkData = model.getLinkDataArray().find((l) => model.getLinkKey(l) === part.key);
        if (linkData) {
          linkKeys.push(part.key);
        } else {
          nodeKeys.push(part.key);
        }
      }
    }

    // Remove links connected to deleted nodes
    for (const nodeKey of nodeKeys) {
      for (const linkData of [...model.getLinkDataArray()]) {
        if (linkData.from === nodeKey || linkData.to === nodeKey) {
          const linkKey = model.getLinkKey(linkData);
          if (linkKey !== undefined && !linkKeys.includes(linkKey)) {
            linkKeys.push(linkKey);
          }
        }
      }
    }

    // Remove links first, then nodes (reverse dependency)
    for (const linkKey of linkKeys) {
      undoManager.execute(new RemoveLinkCommand(model, linkKey));
    }
    for (const nodeKey of nodeKeys) {
      undoManager.execute(new RemoveNodeCommand(model, nodeKey));
    }

    diagram.clearSelection();
    return true;
  }

  /** Delete the selection without undo support. Returns true if any were removed. */
  deleteSelectionNoUndo(): boolean {
    const selected = this.diagram.getSelectedParts();
    if (selected.length === 0) return false;

    const model = this.diagram.getModel();
    const keys = selected.map((p) => p.key).filter((k) => k !== undefined);

    for (const key of keys) {
      const linkData = model.getLinkDataArray().find((l) => model.getLinkKey(l) === key);
      if (linkData) {
        model.removeLink(key);
      } else {
        model.removeNode(key);
      }
    }

    this.diagram.clearSelection();
    return true;
  }

  /** Copy the selected parts to the clipboard. */
  copySelection(): boolean {
    const selected = this.diagram.getSelectedParts();
    if (selected.length === 0) return false;

    const model = this.diagram.getModel();
    const nodeData: NodeData[] = [];

    for (const part of selected) {
      if (part.key === undefined) continue;
      const data = model.getNodeData(part.key);
      if (data) {
        // Remove the key so the pasted copy gets a new one
        const copy = { ...data };
        delete copy[model.getNodeKeyProperty()];
        nodeData.push(copy);
      }
    }

    this.clipboard = nodeData;
    return nodeData.length > 0;
  }

  /** Cut the selected parts (copy + delete). */
  cutSelection(): boolean {
    if (!this.copySelection()) return false;
    return this.deleteSelectionNoUndo();
  }

  /** Paste the clipboard into the diagram (undoable). */
  pasteClipboard(offset = 20): boolean {
    if (this.clipboard.length === 0) return false;

    const model = this.diagram.getModel();
    const undoManager = this.diagram.getUndoManager();

    for (const data of this.clipboard) {
      const copy: NodeData = { ...data };
      const newKey = model.generateKey();
      copy[model.getNodeKeyProperty()] = newKey;

      // Offset the pasted node
      const x = (copy.x as number) ?? 0;
      const y = (copy.y as number) ?? 0;
      copy.x = x + offset;
      copy.y = y + offset;

      undoManager.execute(new AddNodeCommand(model, copy));
    }

    return true;
  }

  /** Select all parts in the diagram. */
  selectAll(): boolean {
    const model = this.diagram.getModel();
    const diagram = this.diagram;

    for (const nodeData of model.getNodeDataArray()) {
      const part = diagram.getPart(model.getNodeKey(nodeData));
      if (part) {
        part.isSelected = true;
      }
    }
    for (const linkData of model.getLinkDataArray()) {
      const key = model.getLinkKey(linkData);
      if (key === undefined) continue;
      const part = diagram.getPart(key);
      if (part) {
        part.isSelected = true;
      }
    }

    diagram.invalidate();
    return true;
  }

  /** Undo the last operation. */
  undo(): boolean {
    return this.diagram.undo();
  }

  /** Redo the last operation. */
  redo(): boolean {
    return this.diagram.redo();
  }

  /** Get the current clipboard contents. */
  getClipboard(): readonly NodeData[] {
    return this.clipboard;
  }

  /** Set the clipboard contents. */
  setClipboard(data: NodeData[]): void {
    this.clipboard = data;
  }

  /** Clear the clipboard. */
  clearClipboard(): void {
    this.clipboard = [];
  }
}

/** Create a command handler for a diagram. */
export function createCommandHandler(diagram: Diagram): CommandHandler {
  return new CommandHandler(diagram);
}
