import { Model } from './Model.ts';
import type { LinkData, ModelJSON, NodeData, NodeKey } from './Model.ts';

export interface GraphLinksModelJSON extends ModelJSON {
  linkKeyProperty: string;
  linkDataArray: LinkData[];
}

/**
 * A model that supports nodes and links between nodes.
 */
export class GraphLinksModel extends Model {
  protected override nodeDataArray: NodeData[] = [];
  protected linkDataArray: LinkData[] = [];
  private linkKeyProperty = 'key';
  private linkKeyCounter = 1;

  /** Get the link key property name. */
  getLinkKeyProperty(): string {
    return this.linkKeyProperty;
  }

  /** Set the link key property name. */
  setLinkKeyProperty(property: string): void {
    this.linkKeyProperty = property;
  }

  /** Get all link data. */
  getLinkDataArray(): readonly LinkData[] {
    return this.linkDataArray;
  }

  /** Get the number of links. */
  getLinkCount(): number {
    return this.linkDataArray.length;
  }

  /** Get the key of a link data object. */
  getLinkKey(linkData: LinkData): NodeKey | undefined {
    return linkData[this.linkKeyProperty] as NodeKey | undefined;
  }

  /** Set the key of a link data object. */
  setLinkKey(linkData: LinkData, key: NodeKey): void {
    linkData[this.linkKeyProperty] = key;
  }

  /** Generate a unique link key. */
  private generateLinkKey(): NodeKey {
    return this.linkKeyCounter++;
  }

  /** Add a link. */
  addLink(linkData: LinkData): NodeKey {
    if (!linkData.from || !linkData.to) {
      throw new Error('Link must have "from" and "to" properties');
    }

    if (!this.containsNode(linkData.from)) {
      throw new Error(`Source node ${linkData.from} not found`);
    }

    if (!this.containsNode(linkData.to)) {
      throw new Error(`Target node ${linkData.to} not found`);
    }

    if (linkData[this.linkKeyProperty] === undefined || linkData[this.linkKeyProperty] === null) {
      linkData[this.linkKeyProperty] = this.generateLinkKey();
    }

    this.linkDataArray.push(linkData);
    this.emit({
      type: 'link Added',
      model: this,
      link: linkData,
    });

    const key = this.getLinkKey(linkData);
    if (key === undefined) {
      throw new Error('Failed to get link key');
    }
    return key;
  }

  /** Remove a link by key. */
  removeLink(key: NodeKey): boolean {
    const index = this.linkDataArray.findIndex((d) => this.getLinkKey(d) === key);
    if (index === -1) return false;

    const removed = this.linkDataArray.splice(index, 1)[0];
    this.emit({
      type: 'link Removed',
      model: this,
      link: removed,
    });
    return true;
  }

  /** Get links connected to a node. */
  getLinksForNode(key: NodeKey): readonly LinkData[] {
    return this.linkDataArray.filter((l) => l.from === key || l.to === key);
  }

  /** Get links from a node. */
  getLinksFrom(key: NodeKey): readonly LinkData[] {
    return this.linkDataArray.filter((l) => l.from === key);
  }

  /** Get links to a node. */
  getLinksTo(key: NodeKey): readonly LinkData[] {
    return this.linkDataArray.filter((l) => l.to === key);
  }

  /** Check if a link exists between two nodes. */
  containsLink(from: NodeKey, to: NodeKey): boolean {
    return this.linkDataArray.some((l) => l.from === from && l.to === to);
  }

  /** Remove all links connected to a node. */
  removeLinksForNode(key: NodeKey): void {
    const toRemove = this.linkDataArray.filter((l) => l.from === key || l.to === key);
    for (const link of toRemove) {
      const linkKey = this.getLinkKey(link);
      if (linkKey !== undefined) {
        this.removeLink(linkKey);
      }
    }
  }

  /** Override removeNode to also remove connected links. */
  override removeNode(key: NodeKey): boolean {
    this.removeLinksForNode(key);
    return super.removeNode(key);
  }

  /** Convert to JSON. */
  override toJSON(): GraphLinksModelJSON {
    return {
      class: 'GraphLinksModel',
      nodeKeyProperty: this.nodeKeyProperty,
      linkKeyProperty: this.linkKeyProperty,
      nodeDataArray: this.nodeDataArray.map((d) => ({ ...d })),
      linkDataArray: this.linkDataArray.map((d) => ({ ...d })),
    };
  }

  /** Create from JSON. */
  static override fromJSON(json: GraphLinksModelJSON): GraphLinksModel {
    const model = new GraphLinksModel();
    model.setNodeKeyProperty(json.nodeKeyProperty);
    model.setLinkKeyProperty(json.linkKeyProperty);

    for (const nodeData of json.nodeDataArray) {
      model.addNode({ ...nodeData });
    }

    for (const linkData of json.linkDataArray ?? []) {
      model.addLink({ ...linkData });
    }

    return model;
  }

  /** Check if this model equals another model. */
  override equals(other: Model): boolean {
    if (!(other instanceof GraphLinksModel)) return false;
    if (!super.equals(other)) return false;
    if (this.linkDataArray.length !== other.linkDataArray.length) return false;
    return this.linkDataArray.every((link, i) => {
      const otherLink = other.linkDataArray[i];
      return JSON.stringify(link) === JSON.stringify(otherLink);
    });
  }
}
