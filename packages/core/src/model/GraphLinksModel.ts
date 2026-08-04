import type { LinkData, LinkValidationCallback, ModelJSON, NodeData, NodeKey } from './Model.ts';
import { Model } from './Model.ts';

export interface GraphLinksModelJSON extends ModelJSON {
  linkKeyProperty: string;
  linkDataArray: LinkData[];
}

/**
 * A model that supports nodes and links between nodes.
 */
export class GraphLinksModel extends Model {
  protected override _nodeDataArray: NodeData[] = [];
  protected _linkDataArray: LinkData[] = [];
  private linkKeyProperty = 'key';
  private linkKeyCounter = 1;

  /** GoJS-compatible: options object. */
  constructor(options?: {
    nodeDataArray?: NodeData[];
    linkDataArray?: LinkData[];
    nodeKeyProperty?: string;
    linkKeyProperty?: string;
  }) {
    super(options?.nodeKeyProperty);
    if (options?.linkKeyProperty) this.linkKeyProperty = options.linkKeyProperty;
    if (options?.nodeDataArray) {
      for (const data of options.nodeDataArray) {
        if (data[this.nodeKeyProperty] === undefined || data[this.nodeKeyProperty] === null) {
          data[this.nodeKeyProperty] = this.generateKey();
        }
        this._nodeDataArray.push(data);
      }
    }
    if (options?.linkDataArray) {
      for (const data of options.linkDataArray) {
        if (data[this.linkKeyProperty] === undefined || data[this.linkKeyProperty] === null) {
          data[this.linkKeyProperty] = this.generateLinkKey();
        }
        this._linkDataArray.push(data);
      }
    }
  }

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
    return this._linkDataArray;
  }

  /** GoJS-compatible: Get the link data array. */
  get linkDataArray(): readonly LinkData[] {
    return this._linkDataArray;
  }

  /** GoJS-compatible: Set the link data array, assigning keys and emitting events. */
  set linkDataArray(value: LinkData[]) {
    this.setLinkDataArray(value);
  }

  /** Set all link data, assigning missing keys and emitting add/remove events. */
  setLinkDataArray(value: LinkData[]): void {
    if (this.isReadOnly) {
      throw new Error('Cannot modify a read-only model');
    }
    const oldKeys = new Set(this._linkDataArray.map((l) => this.getLinkKey(l)));
    const newKeys = new Set(value.map((l) => l[this.linkKeyProperty] as NodeKey));
    for (const key of oldKeys) {
      if (key !== undefined && !newKeys.has(key)) {
        this.removeLink(key);
      }
    }
    this._linkDataArray = [];
    for (const data of value) {
      if (data[this.linkKeyProperty] === undefined || data[this.linkKeyProperty] === null) {
        data[this.linkKeyProperty] = this.generateLinkKey();
      }
      this._linkDataArray.push(data);
      const key = data[this.linkKeyProperty] as NodeKey;
      if (key !== undefined && !oldKeys.has(key)) {
        this.emit({ type: 'link Added', model: this, link: data });
      }
    }
  }

  /** Get the number of links. */
  getLinkCount(): number {
    return this._linkDataArray.length;
  }

  /** Get the key of a link data object. */
  getLinkKey(linkData: LinkData): NodeKey | undefined {
    return linkData[this.linkKeyProperty] as NodeKey | undefined;
  }

  /** Set the key of a link data object. */
  setLinkKey(linkData: LinkData, key: NodeKey): void {
    linkData[this.linkKeyProperty] = key;
  }

  /** Get a property from a link. */
  getLinkProperty(key: NodeKey, propertyName: string): unknown {
    const linkData = this.getLinkData(key);
    if (!linkData) return undefined;
    return linkData[propertyName];
  }

  /** Set a property on a link. */
  setLinkProperty(key: NodeKey, propertyName: string, value: unknown): void {
    if (this.isReadOnly) {
      throw new Error('Cannot modify a read-only model');
    }
    const linkData = this.getLinkData(key);
    if (!linkData) return;

    const oldValue = linkData[propertyName];
    linkData[propertyName] = value;

    this.recordRollback(() => {
      if (oldValue === undefined) {
        delete linkData[propertyName];
      } else {
        linkData[propertyName] = oldValue;
      }
    });
    this.emit({
      type: 'property Changed',
      model: this,
      propertyName,
      oldValue,
      newValue: value,
      link: linkData,
    });
  }

  /** Get a link data object by key. */
  getLinkData(key: NodeKey): LinkData | undefined {
    return this._linkDataArray.find((l) => this.getLinkKey(l) === key);
  }

  /** Generate a unique link key that is not already in use. */
  private generateLinkKey(): NodeKey {
    let key: NodeKey;
    do {
      key = this.linkKeyCounter++;
    } while (this.getLinkData(key));
    return key;
  }

  /** Add a link. */
  addLink(linkData: LinkData): NodeKey {
    if (this.isReadOnly) {
      throw new Error('Cannot modify a read-only model');
    }
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

    // Enforce link-key uniqueness (like addNode does for node keys)
    if (linkData[this.linkKeyProperty] !== undefined && linkData[this.linkKeyProperty] !== null) {
      const existingKey = linkData[this.linkKeyProperty];
      if (this.getLinkData(existingKey as NodeKey)) {
        throw new Error(`Link with key ${String(existingKey)} already exists`);
      }
    } else {
      linkData[this.linkKeyProperty] = this.generateLinkKey();
    }

    this._linkDataArray.push(linkData);
    const linkKey = this.getLinkKey(linkData);
    this.recordRollback(() => {
      const idx = this._linkDataArray.findIndex((l) => this.getLinkKey(l) === linkKey);
      if (idx !== -1) this._linkDataArray.splice(idx, 1);
    });
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
    if (this.isReadOnly) {
      throw new Error('Cannot modify a read-only model');
    }
    const index = this._linkDataArray.findIndex((d) => this.getLinkKey(d) === key);
    if (index === -1) return false;

    const removed = this._linkDataArray[index];
    if (!removed || !this.validateLinkRemoval(removed)) {
      throw new Error('Link removal validation failed');
    }

    const removedData = removed;
    this._linkDataArray.splice(index, 1);
    this.recordRollback(() => {
      if (!this.getLinkData(this.getLinkKey(removedData) as NodeKey)) {
        this._linkDataArray.push(removedData);
      }
    });
    this.emit({
      type: 'link Removed',
      model: this,
      link: removed,
    });
    return true;
  }

  /** Get links connected to a node. */
  getLinksForNode(key: NodeKey): readonly LinkData[] {
    return this._linkDataArray.filter((l) => l.from === key || l.to === key);
  }

  /** Get links from a node. */
  getLinksFrom(key: NodeKey): readonly LinkData[] {
    return this._linkDataArray.filter((l) => l.from === key);
  }

  /** Get links to a node. */
  getLinksTo(key: NodeKey): readonly LinkData[] {
    return this._linkDataArray.filter((l) => l.to === key);
  }

  /** Check if a link exists between two nodes. */
  containsLink(from: NodeKey, to: NodeKey): boolean {
    return this._linkDataArray.some((l) => l.from === from && l.to === to);
  }

  /** Remove all links connected to a node. */
  removeLinksForNode(key: NodeKey): void {
    const toRemove = this._linkDataArray.filter((l) => l.from === key || l.to === key);
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
      nodeDataArray: this._nodeDataArray.map((d) => ({ ...d })),
      linkDataArray: this._linkDataArray.map((d) => ({ ...d })),
    };
  }

  /**
   * GoJS-compatible: Produce an incremental JSON representation based on
   * the current change log. Falls back to a full snapshot when no log exists.
   */
  toIncrementalJson(): {
    modifiedNodeData?: NodeData[];
    removedNodeIds?: NodeKey[];
    modifiedLinkData?: LinkData[];
    removedLinkIds?: NodeKey[];
  } {
    const modifiedNodeData: NodeData[] = [];
    const removedNodeIds: NodeKey[] = [];
    const modifiedLinkData: LinkData[] = [];
    const removedLinkIds: NodeKey[] = [];

    for (const event of this.changedEventLog) {
      if (event.node) {
        const key = this.getNodeKey(event.node);
        if (event.type === 'node Removed') {
          if (!removedNodeIds.includes(key)) removedNodeIds.push(key);
        } else if (!modifiedNodeData.some((n) => this.getNodeKey(n) === key)) {
          modifiedNodeData.push({ ...event.node });
        }
      }
      if (event.link) {
        const key = this.getLinkKey(event.link);
        if (key === undefined) continue;
        if (event.type === 'link Removed') {
          if (!removedLinkIds.includes(key)) removedLinkIds.push(key);
        } else if (!modifiedLinkData.some((l) => this.getLinkKey(l) === key)) {
          modifiedLinkData.push({ ...event.link });
        }
      }
    }

    return { modifiedNodeData, removedNodeIds, modifiedLinkData, removedLinkIds };
  }

  /**
   * GoJS-compatible: Apply an incremental JSON representation produced by
   * toIncrementalJson (or a full GraphLinksModelJSON snapshot).
   */
  applyIncrementalJson(json: {
    modifiedNodeData?: NodeData[];
    removedNodeIds?: NodeKey[];
    modifiedLinkData?: LinkData[];
    removedLinkIds?: NodeKey[];
  }): void {
    for (const key of json.removedNodeIds ?? []) {
      if (this.containsNode(key)) this.removeNode(key);
    }
    for (const nodeData of json.modifiedNodeData ?? []) {
      const key = this.getNodeKey(nodeData);
      if (this.containsNode(key)) {
        this.removeNode(key);
        this.addNode({ ...nodeData });
      } else {
        this.addNode({ ...nodeData });
      }
    }
    for (const key of json.removedLinkIds ?? []) {
      this.removeLink(key);
    }
    for (const linkData of json.modifiedLinkData ?? []) {
      const key = this.getLinkKey(linkData);
      if (key !== undefined && this.getLinkData(key)) {
        this.removeLink(key);
        this.addLink({ ...linkData });
      } else {
        this.addLink({ ...linkData });
      }
    }
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
    if (this._linkDataArray.length !== other.linkDataArray.length) return false;
    return this._linkDataArray.every((link, i) => {
      const otherLink = other.linkDataArray[i];
      return JSON.stringify(link) === JSON.stringify(otherLink);
    });
  }

  /** GoJS-compatible: Remove all nodes and links from the model. */
  clear(): void {
    for (const linkData of [...this._linkDataArray]) {
      const key = this.getLinkKey(linkData);
      if (key !== undefined) this.removeLink(key);
    }
    for (const nodeData of [...this._nodeDataArray]) {
      this.removeNode(this.getNodeKey(nodeData));
    }
  }

  /** Create a deep copy of this model. */
  override copy(): GraphLinksModel {
    return GraphLinksModel.fromJSON(this.toJSON());
  }
}
