import type { GraphLinksModel } from '../model/GraphLinksModel.ts';
import type { NodeData, LinkData } from '../model/Model.ts';
import type { Command } from './Command.ts';

/**
 * Command to add a node to the model.
 */
export class AddNodeCommand implements Command {
  private model: GraphLinksModel;
  private nodeData: NodeData;

  constructor(model: GraphLinksModel, nodeData: NodeData) {
    this.model = model;
    this.nodeData = { ...nodeData };
  }

  execute(): void {
    this.model.addNode({ ...this.nodeData });
  }

  undo(): void {
    const key = this.model.getNodeKey(this.nodeData);
    this.model.removeNode(key);
  }

  describe(): string {
    const key = this.model.getNodeKey(this.nodeData);
    return `Add node ${String(key)}`;
  }
}

/**
 * Command to remove a node from the model.
 */
export class RemoveNodeCommand implements Command {
  private model: GraphLinksModel;
  private nodeKey: string | number;
  private removedNodeData: NodeData | null = null;

  constructor(model: GraphLinksModel, nodeKey: string | number) {
    this.model = model;
    this.nodeKey = nodeKey;
  }

  execute(): void {
    this.removedNodeData = this.model.getNodeData(this.nodeKey) ?? null;
    this.model.removeNode(this.nodeKey);
  }

  undo(): void {
    if (this.removedNodeData) {
      this.model.addNode({ ...this.removedNodeData });
    }
  }

  describe(): string {
    return `Remove node ${String(this.nodeKey)}`;
  }
}

/**
 * Command to change a node property.
 */
export class SetNodePropertyCommand implements Command {
  private model: GraphLinksModel;
  private nodeKey: string | number;
  private propertyName: string;
  private newValue: unknown;
  private oldValue: unknown = undefined;

  constructor(
    model: GraphLinksModel,
    nodeKey: string | number,
    propertyName: string,
    newValue: unknown,
  ) {
    this.model = model;
    this.nodeKey = nodeKey;
    this.propertyName = propertyName;
    this.newValue = newValue;
  }

  execute(): void {
    this.oldValue = this.model.getNodeProperty(this.nodeKey, this.propertyName);
    this.model.setNodeProperty(this.nodeKey, this.propertyName, this.newValue);
  }

  undo(): void {
    this.model.setNodeProperty(this.nodeKey, this.propertyName, this.oldValue);
  }

  describe(): string {
    return `Set ${this.propertyName} on node ${String(this.nodeKey)}`;
  }
}

/**
 * Command to add a link to the model.
 */
export class AddLinkCommand implements Command {
  private model: GraphLinksModel;
  private linkData: LinkData;

  constructor(model: GraphLinksModel, linkData: LinkData) {
    this.model = model;
    this.linkData = { ...linkData };
  }

  execute(): void {
    this.model.addLink({ ...this.linkData });
  }

  undo(): void {
    const key = this.model.getLinkKey(this.linkData);
    if (key !== undefined) {
      this.model.removeLink(key);
    }
  }

  describe(): string {
    const key = this.model.getLinkKey(this.linkData);
    return `Add link ${String(key)}`;
  }
}

/**
 * Command to remove a link from the model.
 */
export class RemoveLinkCommand implements Command {
  private model: GraphLinksModel;
  private linkKey: string | number;
  private removedLinkData: LinkData | null = null;

  constructor(model: GraphLinksModel, linkKey: string | number) {
    this.model = model;
    this.linkKey = linkKey;
  }

  execute(): void {
    // Find the link data before removing
    for (const linkData of this.model.getLinkDataArray()) {
      if (this.model.getLinkKey(linkData) === this.linkKey) {
        this.removedLinkData = { ...linkData };
        break;
      }
    }
    this.model.removeLink(this.linkKey);
  }

  undo(): void {
    if (this.removedLinkData) {
      this.model.addLink({ ...this.removedLinkData });
    }
  }

  describe(): string {
    return `Remove link ${String(this.linkKey)}`;
  }
}

/**
 * Command to move a node (batch property changes).
 */
export class MoveNodeCommand implements Command {
  private model: GraphLinksModel;
  private nodeKey: string | number;
  private newX: number;
  private newY: number;
  private oldX = 0;
  private oldY = 0;
  private initialized = false;

  constructor(model: GraphLinksModel, nodeKey: string | number, newX: number, newY: number) {
    this.model = model;
    this.nodeKey = nodeKey;
    this.newX = newX;
    this.newY = newY;
  }

  execute(): void {
    if (!this.initialized) {
      this.oldX = (this.model.getNodeProperty(this.nodeKey, 'x') as number) ?? 0;
      this.oldY = (this.model.getNodeProperty(this.nodeKey, 'y') as number) ?? 0;
      this.initialized = true;
    }
    this.model.setNodeProperty(this.nodeKey, 'x', this.newX);
    this.model.setNodeProperty(this.nodeKey, 'y', this.newY);
  }

  undo(): void {
    this.model.setNodeProperty(this.nodeKey, 'x', this.oldX);
    this.model.setNodeProperty(this.nodeKey, 'y', this.oldY);
  }

  describe(): string {
    return `Move node ${String(this.nodeKey)} to (${this.newX}, ${this.newY})`;
  }
}
