import type { Diagram } from '../diagram/Diagram.ts';
import type { NodeData, NodeKey } from '../model/Model.ts';
import { Node } from '../parts/Node.ts';
import { Rect } from '../geometry/Rect.ts';
import {
  RemoveNodeCommand,
  RemoveLinkCommand,
  AddNodeCommand,
  SetNodePropertyCommand,
} from '../undo/commands.ts';

export type Alignment = 'left' | 'right' | 'top' | 'bottom' | 'centerH' | 'centerV';

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

  /** Get the selected nodes for alignment operations. */
  private getSelectedNodes(): Node[] {
    return this.diagram.getSelectedParts().filter((p): p is Node => p instanceof Node);
  }

  /** Set a node's position preserving its size. */
  private setNodePos(node: Node, x: number, y: number): void {
    node.bounds = new Rect(x, y, node.bounds.width, node.bounds.height);
  }

  /** Align selected nodes (needs at least 2). Returns true if aligned. */
  align(alignment: Alignment): boolean {
    const nodes = this.getSelectedNodes();
    if (nodes.length < 2) return false;

    const model = this.diagram.getModel();
    const undoManager = this.diagram.getUndoManager();

    // Compute target positions
    let targetX: number | null = null;
    let targetY: number | null = null;
    const first = nodes[0];
    if (!first) return false;

    switch (alignment) {
      case 'left':
        targetX = Math.min(...nodes.map((n) => n.bounds.x));
        break;
      case 'right':
        targetX = Math.max(...nodes.map((n) => n.bounds.right)) - first.bounds.width;
        break;
      case 'top':
        targetY = Math.min(...nodes.map((n) => n.bounds.y));
        break;
      case 'bottom':
        targetY = Math.max(...nodes.map((n) => n.bounds.bottom)) - first.bounds.height;
        break;
      case 'centerH': {
        const minX = Math.min(...nodes.map((n) => n.bounds.x));
        const maxX = Math.max(...nodes.map((n) => n.bounds.right));
        const center = (minX + maxX) / 2;
        undoManager.beginTransaction(`Align centerH (${nodes.length} nodes)`);
        for (const node of nodes) {
          const newX = center - node.bounds.width / 2;
          this.setNodePos(node, newX, node.bounds.y);
          undoManager.execute(new SetNodePropertyCommand(model, node.key, 'x', newX));
        }
        undoManager.commitTransaction();
        this.diagram.invalidate();
        return true;
      }
      case 'centerV': {
        const minY = Math.min(...nodes.map((n) => n.bounds.y));
        const maxY = Math.max(...nodes.map((n) => n.bounds.bottom));
        const center = (minY + maxY) / 2;
        undoManager.beginTransaction(`Align centerV (${nodes.length} nodes)`);
        for (const node of nodes) {
          const newY = center - node.bounds.height / 2;
          this.setNodePos(node, node.bounds.x, newY);
          undoManager.execute(new SetNodePropertyCommand(model, node.key, 'y', newY));
        }
        undoManager.commitTransaction();
        this.diagram.invalidate();
        return true;
      }
    }

    if (targetX !== null || targetY !== null) {
      undoManager.beginTransaction(`Align ${alignment} (${nodes.length} nodes)`);
      for (const node of nodes) {
        if (targetX !== null) {
          this.setNodePos(node, targetX, node.bounds.y);
          undoManager.execute(new SetNodePropertyCommand(model, node.key, 'x', targetX));
        }
        if (targetY !== null) {
          this.setNodePos(node, node.bounds.x, targetY);
          undoManager.execute(new SetNodePropertyCommand(model, node.key, 'y', targetY));
        }
      }
      undoManager.commitTransaction();
      this.diagram.invalidate();
    }

    return true;
  }

  /** Distribute selected nodes evenly along the horizontal axis. Returns true if done. */
  distributeHorizontally(): boolean {
    const nodes = this.getSelectedNodes();
    if (nodes.length < 3) return false;

    const sorted = [...nodes].sort((a, b) => a.bounds.x - b.bounds.x);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    if (!first || !last) return false;

    const left = first.bounds.x;
    const right = last.bounds.right;
    const totalWidth = right - left;
    const totalNodeWidth = sorted.reduce((sum, n) => sum + n.bounds.width, 0);
    const gap = (totalWidth - totalNodeWidth) / (sorted.length - 1);

    const model = this.diagram.getModel();
    const undoManager = this.diagram.getUndoManager();
    undoManager.beginTransaction(`Distribute horizontally (${nodes.length} nodes)`);

    let cursor = left;
    for (const node of sorted) {
      this.setNodePos(node, cursor, node.bounds.y);
      undoManager.execute(new SetNodePropertyCommand(model, node.key, 'x', cursor));
      cursor += node.bounds.width + gap;
    }

    undoManager.commitTransaction();
    this.diagram.invalidate();
    return true;
  }

  /** Distribute selected nodes evenly along the vertical axis. Returns true if done. */
  distributeVertically(): boolean {
    const nodes = this.getSelectedNodes();
    if (nodes.length < 3) return false;

    const sorted = [...nodes].sort((a, b) => a.bounds.y - b.bounds.y);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    if (!first || !last) return false;

    const top = first.bounds.y;
    const bottom = last.bounds.bottom;
    const totalHeight = bottom - top;
    const totalNodeHeight = sorted.reduce((sum, n) => sum + n.bounds.height, 0);
    const gap = (totalHeight - totalNodeHeight) / (sorted.length - 1);

    const model = this.diagram.getModel();
    const undoManager = this.diagram.getUndoManager();
    undoManager.beginTransaction(`Distribute vertically (${nodes.length} nodes)`);

    let cursor = top;
    for (const node of sorted) {
      this.setNodePos(node, node.bounds.x, cursor);
      undoManager.execute(new SetNodePropertyCommand(model, node.key, 'y', cursor));
      cursor += node.bounds.height + gap;
    }

    undoManager.commitTransaction();
    this.diagram.invalidate();
    return true;
  }
}

/** Create a command handler for a diagram. */
export function createCommandHandler(diagram: Diagram): CommandHandler {
  return new CommandHandler(diagram);
}
