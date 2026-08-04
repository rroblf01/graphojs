import type { Diagram } from '../diagram/Diagram.ts';
import type { NodeData, NodeKey } from '../model/Model.ts';
import { Node } from '../parts/Node.ts';
import { Group } from '../parts/Group.ts';
import { Rect } from '../geometry/Rect.ts';
import {
  RemoveNodeCommand,
  RemoveLinkCommand,
  AddNodeCommand,
  AddLinkCommand,
  SetNodePropertyCommand,
  SetZOrderCommand,
  MoveNodeCommand,
} from '../undo/commands.ts';

export type Alignment = 'left' | 'right' | 'top' | 'bottom' | 'centerH' | 'centerV';

/**
 * Handles high-level editing commands for a diagram.
 * Provides delete, copy, cut, paste, and select-all operations.
 */
export class CommandHandler {
  private diagram: Diagram;
  /** Clipboard contents: copied node data and any connected link data. */
  private clipboard: { nodes: NodeData[]; links: NodeData[]; oldKeys: unknown[] } = {
    nodes: [],
    links: [],
    oldKeys: [],
  };

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
    return this.clipboard.nodes.length > 0;
  }

  /** Whether mutating commands are allowed (diagram enabled and not read-only). */
  private canModify(): boolean {
    const enabled = (this.diagram as unknown as { isEnabled?: boolean }).isEnabled !== false;
    const readOnly = (this.diagram as unknown as { isReadOnly?: boolean }).isReadOnly === true;
    return enabled && !readOnly;
  }

  /** Delete the currently selected parts (undoable). */
  deleteSelection(): boolean {
    if (!this.canModify()) return false;
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
    // GoJS-compatible: fire SelectionDeleted after a successful delete
    diagram.fireDiagramEvent('SelectionDeleted', null, {
      nodeCount: nodeKeys.length,
      linkCount: linkKeys.length,
    });
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

  /** Copy the selected parts (and their connected links) to the clipboard. */
  copySelection(): boolean {
    const selected = this.diagram.getSelectedParts();
    if (selected.length === 0) return false;

    const model = this.diagram.getModel();
    const nodes: NodeData[] = [];
    const oldKeys: unknown[] = [];
    const selectedKeys = new Set<unknown>();

    for (const part of selected) {
      if (part.key === undefined) continue;
      selectedKeys.add(part.key);
      const data = model.getNodeData(part.key);
      if (data) {
        // Remove the key so the pasted copy gets a new one
        oldKeys.push(data[model.getNodeKeyProperty()]);
        const copy = { ...data };
        delete copy[model.getNodeKeyProperty()];
        nodes.push(copy);
      }
    }

    // Copy links that connect two selected nodes
    const links: NodeData[] = [];
    const linkArray = model.getLinkDataArray();
    for (const linkData of linkArray) {
      if (selectedKeys.has(linkData.from) && selectedKeys.has(linkData.to)) {
        const copy = { ...linkData };
        delete copy[model.getLinkKeyProperty?.() ?? 'key'];
        links.push(copy);
      }
    }

    this.clipboard = { nodes, links, oldKeys };
    const count = nodes.length;
    this.diagram.fireDiagramEvent('ClipboardChanged', null, { count });
    this.diagram.fireDiagramEvent('SelectionCopied', null, { count });
    return count > 0;
  }

  /** Cut the selected parts (copy + delete). */
  cutSelection(): boolean {
    if (!this.canModify()) return false;
    if (!this.copySelection()) return false;
    return this.deleteSelectionNoUndo();
  }

  /** Paste the clipboard (nodes + links) into the diagram (undoable). */
  pasteClipboard(offset = 20): boolean {
    if (!this.canModify()) return false;
    if (this.clipboard.nodes.length === 0) return false;

    const model = this.diagram.getModel();
    const undoManager = this.diagram.getUndoManager();
    const keyMap = new Map<unknown, unknown>();

    undoManager.beginTransaction('paste');
    try {
      for (let i = 0; i < this.clipboard.nodes.length; i++) {
        const data = this.clipboard.nodes[i]!;
        const copy: NodeData = { ...data };
        const oldKey = this.clipboard.oldKeys[i];
        const newKey = model.generateKey();
        copy[model.getNodeKeyProperty()] = newKey;
        if (oldKey !== undefined) keyMap.set(oldKey, newKey);

        // Offset the pasted node
        const x = (copy.x as number) ?? 0;
        const y = (copy.y as number) ?? 0;
        copy.x = x + offset;
        copy.y = y + offset;

        undoManager.execute(new AddNodeCommand(model, copy));
      }

      // Paste connected links, remapping endpoints
      const linkKeyProperty = model.getLinkKeyProperty();
      for (const linkData of this.clipboard.links) {
        const fromKey = keyMap.get(linkData.from);
        const toKey = keyMap.get(linkData.to);
        if (fromKey === undefined || toKey === undefined) continue;
        const copy: NodeData = { ...linkData };
        delete copy[linkKeyProperty];
        undoManager.execute(new AddLinkCommand(model, copy as Parameters<typeof model.addLink>[0]));
      }
    } finally {
      undoManager.commitTransaction();
    }

    // GoJS-compatible: fire ClipboardPasted after a successful paste
    this.diagram.fireDiagramEvent('ClipboardPasted', null, { count: this.clipboard.nodes.length });
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
  getClipboard(): { nodes: readonly NodeData[]; links: readonly NodeData[] } {
    return this.clipboard;
  }

  /** Set the clipboard contents. */
  setClipboard(data: NodeData[] | { nodes: NodeData[]; links: NodeData[] }): void {
    this.clipboard = Array.isArray(data)
      ? { nodes: data, links: [], oldKeys: [] }
      : { nodes: data.nodes, links: data.links, oldKeys: [] };
  }

  /** Clear the clipboard. */
  clearClipboard(): void {
    this.clipboard = { nodes: [], links: [], oldKeys: [] };
  }

  /** Get the selected nodes for alignment operations. */
  private getSelectedNodes(): Node[] {
    return this.diagram.getSelectedParts().filter((p): p is Node => p instanceof Node);
  }

  /** Set a node's position preserving its size. */
  private setNodePos(node: Node, x: number, y: number): void {
    node.bounds = new Rect(x, y, node.bounds.width, node.bounds.height);
  }

  /** GoJS-compatible: Nudge the selected parts by the given deltas (arrow keys). */
  nudgeSelection(dx: number, dy: number, scale = 1): boolean {
    if (!this.canModify()) return false;
    const nodes = this.getSelectedNodes();
    if (nodes.length === 0) return false;

    const model = this.diagram.getModel();
    const undoManager = this.diagram.getUndoManager();
    const step = Math.round(1 / scale);

    undoManager.beginTransaction('nudge');
    try {
      for (const node of nodes) {
        const nx = Math.round(node.bounds.x + dx * step);
        const ny = Math.round(node.bounds.y + dy * step);
        undoManager.execute(new MoveNodeCommand(model, node.key, nx, ny));
      }
    } finally {
      undoManager.commitTransaction();
    }

    this.diagram.invalidate();
    return true;
  }

  /** Align selected nodes (needs at least 2). Returns true if aligned. */
  align(alignment: Alignment): boolean {
    if (!this.canModify()) return false;
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
    if (!this.canModify()) return false;
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
    if (!this.canModify()) return false;
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

  /** Bring the selected parts to the front (highest z-order in their layer). */
  bringToFront(): boolean {
    if (!this.canModify()) return false;
    const selected = this.diagram.getSelectedParts();
    if (selected.length === 0) return false;

    const model = this.diagram.getModel();
    const undoManager = this.diagram.getUndoManager();
    const layer = selected[0]?.layer;

    // Compute the max z-order in the layer
    let maxZ = 0;
    if (layer) {
      for (const part of layer.parts) {
        if (!selected.includes(part as never)) {
          maxZ = Math.max(maxZ, part.zOrder);
        }
      }
    }
    maxZ += 10;

    undoManager.beginTransaction(`Bring to front (${selected.length} parts)`);
    for (const part of selected) {
      part.zOrder = maxZ;
      undoManager.execute(new SetZOrderCommand(model, part.key, maxZ));
    }
    undoManager.commitTransaction();
    this.diagram.invalidate();
    return true;
  }

  /** Send the selected parts to the back (lowest z-order in their layer). */
  sendToBack(): boolean {
    if (!this.canModify()) return false;
    const selected = this.diagram.getSelectedParts();
    if (selected.length === 0) return false;

    const model = this.diagram.getModel();
    const undoManager = this.diagram.getUndoManager();
    const layer = selected[0]?.layer;

    let minZ = 0;
    if (layer) {
      for (const part of layer.parts) {
        if (!selected.includes(part as never)) {
          minZ = Math.min(minZ, part.zOrder);
        }
      }
    }
    minZ -= 10;

    undoManager.beginTransaction(`Send to back (${selected.length} parts)`);
    for (const part of selected) {
      part.zOrder = minZ;
      undoManager.execute(new SetZOrderCommand(model, part.key, minZ));
    }
    undoManager.commitTransaction();
    this.diagram.invalidate();
    return true;
  }

  /** Raise the selected parts by one z-order step. */
  raise(): boolean {
    return this.changeZOrder(1);
  }

  /** Lower the selected parts by one z-order step. */
  lower(): boolean {
    return this.changeZOrder(-1);
  }

  private changeZOrder(delta: number): boolean {
    if (!this.canModify()) return false;
    const selected = this.diagram.getSelectedParts();
    if (selected.length === 0) return false;

    const model = this.diagram.getModel();
    const undoManager = this.diagram.getUndoManager();
    undoManager.beginTransaction(`Change z-order (${selected.length} parts)`);
    for (const part of selected) {
      const newZ = part.zOrder + delta;
      part.zOrder = newZ;
      undoManager.execute(new SetZOrderCommand(model, part.key, newZ));
    }
    undoManager.commitTransaction();
    this.diagram.invalidate();
    return true;
  }

  // GoJS-compatible capability shortcuts
  canDeleteSelection(): boolean {
    return this.diagram.getSelectedParts().length > 0;
  }

  canCopySelection(): boolean {
    return this.diagram.getSelectedParts().length > 0;
  }

  canCutSelection(): boolean {
    return this.diagram.getSelectedParts().length > 0;
  }

  canSelectAll(): boolean {
    return this.diagram.getModel().getNodeCount() > 0;
  }

  canPasteSelection(): boolean {
    return this.clipboard.nodes.length > 0;
  }

  /** GoJS-compatible: Select all parts in the diagram. */
  selectAllInDiagram(): boolean {
    return this.selectAll();
  }

  /** GoJS-compatible: Whether groupSelection is possible (>=1 selected node). */
  canGroupSelection(): boolean {
    return this.diagram.getSelectedParts().some((p) => p instanceof Node);
  }

  /** GoJS-compatible: Group the selected nodes into a new Group part. */
  groupSelection(): boolean {
    if (!this.canModify()) return false;
    const nodes = this.diagram.getSelectedParts().filter((p): p is Node => p instanceof Node);
    if (nodes.length === 0) return false;

    const diagram = this.diagram;
    const model = diagram.getModel();

    // Bounds of the selected nodes
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const node of nodes) {
      minX = Math.min(minX, node.bounds.x);
      minY = Math.min(minY, node.bounds.y);
      maxX = Math.max(maxX, node.bounds.right);
      maxY = Math.max(maxY, node.bounds.bottom);
    }
    if (minX === Infinity) return false;

    const padding = 10;
    const groupKey = model.generateKey();
    const groupData: NodeData = {
      key: groupKey,
      isGroup: true,
      x: minX - padding,
      y: minY - padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2,
    };

    model.addNode(groupData);

    // Assign the selected nodes to the group
    for (const node of nodes) {
      const nodeData = node.data;
      if (nodeData) {
        model.setDataProperty(nodeData, 'group', groupKey);
      }
    }

    diagram.clearSelection();
    const group = diagram.findGroupForKey(groupKey);
    if (group) diagram.select(group);
    diagram.fireDiagramEvent('SelectionGrouped', group);
    diagram.invalidate();
    return true;
  }

  /** GoJS-compatible: Whether ungroupSelection is possible (>=1 selected group). */
  canUngroupSelection(): boolean {
    return this.diagram.getSelectedParts().some((p) => p instanceof Group);
  }

  /** GoJS-compatible: Ungroup the selected groups, releasing their members. */
  ungroupSelection(): boolean {
    if (!this.canModify()) return false;
    const groups = this.diagram.getSelectedParts().filter((p): p is Group => p instanceof Group);
    if (groups.length === 0) return false;

    const model = this.diagram.getModel();
    for (const group of groups) {
      // Release members from the group
      for (const member of group.memberParts) {
        const data = member.data;
        if (data) {
          model.setDataProperty(data, 'group', undefined);
        }
      }
      // Remove the group
      const key = group.key;
      if (model.containsNode(key)) {
        model.removeNode(key);
      }
    }
    this.diagram.fireDiagramEvent('SelectionUngrouped');
    this.diagram.invalidate();
    return true;
  }

  /** GoJS-compatible: Whether duplicateSelection is possible. */
  canDuplicateSelection(): boolean {
    return this.diagram.getSelectedParts().length > 0;
  }

  /** GoJS-compatible: Duplicate the selection at a small offset. */
  duplicateSelection(): boolean {
    if (!this.canModify()) return false;
    if (this.diagram.getSelectedParts().length === 0) return false;
    this.copySelection();
    return this.pasteClipboard(20);
  }
}

/** Create a command handler for a diagram. */
export function createCommandHandler(diagram: Diagram): CommandHandler {
  return new CommandHandler(diagram);
}
