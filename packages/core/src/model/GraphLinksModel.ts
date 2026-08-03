import { Model } from './Model.ts';
import type { LinkData, LinkValidationCallback, ModelJSON, NodeData, NodeKey } from './Model.ts';

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

  private _isValidLink: LinkValidationCallback | null = null;
  private _isValidLinkRemoval: LinkValidationCallback | null = null;
  private _allowsSelfLoops = true;
  private _allowsDuplicateLinks = true;

  /** Set a callback to validate link data before adding. */
  set isValidLink(callback: LinkValidationCallback | null) {
    this._isValidLink = callback;
  }

  /** Get the link validation callback. */
  get isValidLink(): LinkValidationCallback | null {
    return this._isValidLink;
  }

  /** Set a callback to validate link data before removal. */
  set isValidLinkRemoval(callback: LinkValidationCallback | null) {
    this._isValidLinkRemoval = callback;
  }

  /** Get the link removal validation callback. */
  get isValidLinkRemoval(): LinkValidationCallback | null {
    return this._isValidLinkRemoval;
  }

  /** Whether self-loops are allowed. Default: true */
  get allowsSelfLoops(): boolean {
    return this._allowsSelfLoops;
  }

  /** Set whether self-loops are allowed. */
  set allowsSelfLoops(value: boolean) {
    this._allowsSelfLoops = value;
  }

  /** Whether duplicate links are allowed. Default: true */
  get allowsDuplicateLinks(): boolean {
    return this._allowsDuplicateLinks;
  }

  /** Set whether duplicate links are allowed. */
  set allowsDuplicateLinks(value: boolean) {
    this._allowsDuplicateLinks = value;
  }

  /**
   * Validate a link before it is added.
   * Checks self-loops, duplicates, and the user callback.
   */
  validateLink(linkData: LinkData): boolean {
    if (linkData.from === linkData.to && !this._allowsSelfLoops) {
      return false;
    }
    if (!this._allowsDuplicateLinks && this.containsLink(linkData.from, linkData.to)) {
      return false;
    }
    if (this._isValidLink) {
      return this._isValidLink(linkData);
    }
    return true;
  }

  /**
   * Validate a link before it is removed.
   * Returns true if valid (allows removal).
   */
  validateLinkRemoval(linkData: LinkData): boolean {
    if (this._isValidLinkRemoval) {
      return this._isValidLinkRemoval(linkData);
    }
    return true;
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

    if (!this.validateLink(linkData)) {
      throw new Error('Link validation failed');
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

    const removed = this.linkDataArray[index];
    if (!removed || !this.validateLinkRemoval(removed)) {
      throw new Error('Link removal validation failed');
    }

    this.linkDataArray.splice(index, 1);
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
