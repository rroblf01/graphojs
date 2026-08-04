import type { Model } from '../model/Model.ts';
import type { ChangedEvent, NodeKey, LinkData, NodeData } from '../model/Model.ts';
import type { Command } from './Command.ts';

/**
 * A command that records model changed events during a transaction and
 * reverses them on undo (GoJS-compatible: model edits within a transaction
 * are undoable).
 */
export class ModelTransactionCommand implements Command {
  private model: Model;
  private events: ChangedEvent[];
  private name: string;

  constructor(model: Model, events: ChangedEvent[], name = 'transaction') {
    this.model = model;
    this.events = [...events];
    this.name = name;
  }

  execute(): void {
    // The changes were already applied when recorded; nothing to redo for
    // a fresh model transaction (the events replay the adds/property sets).
    for (const event of this.events) {
      this.apply(event);
    }
  }

  undo(): void {
    // Reverse the events in reverse order
    for (let i = this.events.length - 1; i >= 0; i--) {
      this.reverse(this.events[i]!);
    }
  }

  private apply(event: ChangedEvent): void {
    switch (event.type) {
      case 'node Added':
        if (event.node && !this.model.containsNode(this.model.getNodeKey(event.node))) {
          this.model.addNode({ ...event.node });
        }
        break;
      case 'node Removed': {
        // Redo of a removal: re-remove the node if it is still present
        if (event.node) {
          const key = this.model.getNodeKey(event.node);
          if (this.model.containsNode(key)) {
            this.model.removeNode(key);
          }
        }
        break;
      }
      case 'link Added': {
        const linkModel = this.model as unknown as LinkOps;
        if (event.link && 'addLink' in linkModel) {
          const key = linkModel.getLinkKey(event.link);
          const exists = linkModel
            .getLinkDataArray()
            .some((l) => linkModel.getLinkKey(l) === key);
          if (!exists) linkModel.addLink({ ...event.link });
        }
        break;
      }
      case 'link Removed': {
        const linkModel = this.model as unknown as LinkOps;
        if (event.link && 'getLinkKey' in linkModel) {
          const key = linkModel.getLinkKey(event.link);
          if (key !== undefined && linkModel.getLinkData(key)) {
            linkModel.removeLink(key);
          }
        }
        break;
      }
      case 'property Changed': {
        if (event.propertyName === undefined) break;
        if (event.node) {
          const key = this.model.getNodeKey(event.node);
          if (this.model.containsNode(key)) {
            this.model.setNodeProperty(key, event.propertyName, event.newValue);
          }
        } else if (event.link) {
          const linkModel = this.model as unknown as LinkOps;
          const key = linkModel.getLinkKey(event.link);
          if (key !== undefined && linkModel.getLinkData(key)) {
            linkModel.setLinkProperty(key, event.propertyName, event.newValue);
          }
        }
        break;
      }
    }
  }

  private reverse(event: ChangedEvent): void {
    switch (event.type) {
      case 'node Added':
        if (event.node) this.model.removeNode(this.model.getNodeKey(event.node));
        break;
      case 'node Removed':
        if (event.node) this.model.addNode({ ...event.node });
        break;
      case 'link Added': {
        const linkModel = this.model as unknown as LinkOps;
        if (event.link && 'getLinkKey' in linkModel) {
          const key = linkModel.getLinkKey(event.link);
          if (key !== undefined) linkModel.removeLink(key);
        }
        break;
      }
      case 'link Removed': {
        const linkModel = this.model as unknown as LinkOps;
        if (event.link && 'addLink' in linkModel) {
          const key = linkModel.getLinkKey(event.link);
          const exists = linkModel
            .getLinkDataArray()
            .some((l) => linkModel.getLinkKey(l) === key);
          if (!exists) linkModel.addLink({ ...event.link });
        }
        break;
      }
      case 'property Changed': {
        if (event.propertyName === undefined) break;
        if (event.node) {
          const key = this.model.getNodeKey(event.node);
          if (this.model.containsNode(key)) {
            this.model.setNodeProperty(key, event.propertyName, event.oldValue);
          }
        } else if (event.link) {
          const linkModel = this.model as unknown as LinkOps;
          const key = linkModel.getLinkKey(event.link);
          if (key !== undefined && linkModel.getLinkData(key)) {
            linkModel.setLinkProperty(key, event.propertyName, event.oldValue);
          }
        }
        break;
      }
    }
  }

  describe(): string {
    return this.name;
  }
}

/** Minimal structural interface for models with link operations. */
export interface LinkOps {
  getLinkKey(linkData: LinkData): NodeKey | undefined;
  getLinkData(key: NodeKey): LinkData | undefined;
  getLinkDataArray(): readonly LinkData[];
  addLink(linkData: LinkData): NodeKey;
  removeLink(key: NodeKey): boolean;
  setLinkProperty(key: NodeKey, propertyName: string, value: unknown): void;
}

/** @deprecated Use ModelTransactionCommand. */
export const createModelTransactionCommand = (
  model: Model,
  events: ChangedEvent[],
  name = 'transaction',
): ModelTransactionCommand => new ModelTransactionCommand(model, events, name);

export type { NodeData };
