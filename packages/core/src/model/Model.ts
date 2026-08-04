export type NodeKey = string | number;

/** Structural interface for models that support links (GraphLinksModel). */
export interface LinkCapableModel {
  getLinkDataArray(): readonly LinkData[];
  getLinkKey(linkData: LinkData): NodeKey | undefined;
  addLink(linkData: LinkData): NodeKey;
  removeLink(key: NodeKey): boolean;
}

export interface NodeData {
  [key: string]: unknown;
  key?: NodeKey;
}

export interface ChangedEvent {
  type: 'node Added' | 'node Removed' | 'property Changed' | 'link Added' | 'link Removed';
  model: Model;
  propertyName?: string;
  oldValue?: unknown;
  newValue?: unknown;
  node?: NodeData;
  link?: LinkData;
}

export type ChangedEventHandler = (event: ChangedEvent) => void;

/**
 * Validation callback for node data.
 * Return false to reject the operation.
 */
export type NodeValidationCallback = (nodeData: NodeData) => boolean;

/**
 * Validation callback for link data.
 * Return false to reject the operation.
 */
export type LinkValidationCallback = (linkData: LinkData) => boolean;

export interface LinkData {
  [key: string]: unknown;
  from: NodeKey;
  to: NodeKey;
}

export interface ModelJSON {
  class: string;
  nodeKeyProperty: string;
  nodeDataArray: NodeData[];
  linkDataArray?: LinkData[];
}

/**
 * Abstract base class for all models.
 */
export abstract class Model {
  protected _nodeDataArray: NodeData[] = [];
  protected nodeKeyProperty: string = 'key';
  protected listeners: ChangedEventHandler[] = [];
  private nextKey: number = 1;

  constructor(nodeKeyProperty?: string) {
    if (nodeKeyProperty) this.nodeKeyProperty = nodeKeyProperty;
  }

  /** Get the node key property name. */
  getNodeKeyProperty(): string {
    return this.nodeKeyProperty;
  }

  /** Set the node key property name. */
  setNodeKeyProperty(property: string): void {
    this.nodeKeyProperty = property;
  }

  /** Get the key of a node data object. */
  getNodeKey(nodeData: NodeData): NodeKey {
    return nodeData[this.nodeKeyProperty] as NodeKey;
  }

  /** Set the key of a node data object. */
  setNodeKey(nodeData: NodeData, key: NodeKey): void {
    nodeData[this.nodeKeyProperty] = key;
  }

  /** Generate a unique key. */
  generateKey(): NodeKey {
    return this.nextKey++;
  }

  /** Get all node data. */
  getNodeDataArray(): readonly NodeData[] {
    return this._nodeDataArray;
  }

  /** GoJS-compatible: Get the node data array. */
  get nodeDataArray(): readonly NodeData[] {
    return this._nodeDataArray;
  }

  /** GoJS-compatible: Set the node data array, assigning keys and emitting events. */
  set nodeDataArray(value: NodeData[]) {
    this.setNodeDataArray(value);
  }

  /** Set all node data, assigning missing keys and emitting add/remove events. */
  setNodeDataArray(value: NodeData[]): void {
    // Remove nodes no longer present
    const oldKeys = new Set(this._nodeDataArray.map((d) => this.getNodeKey(d)));
    const newKeys = new Set(value.map((d) => d[this.nodeKeyProperty] as NodeKey));
    for (const key of oldKeys) {
      if (key !== undefined && !newKeys.has(key)) {
        this.removeNode(key);
      }
    }
    // Add/update new nodes
    this._nodeDataArray = [];
    for (const data of value) {
      if (data[this.nodeKeyProperty] === undefined || data[this.nodeKeyProperty] === null) {
        data[this.nodeKeyProperty] = this.generateKey();
      }
      this._nodeDataArray.push(data);
      this.emit({ type: 'node Added', model: this, node: data });
    }
  }

  /** Get the number of nodes. */
  getNodeCount(): number {
    return this._nodeDataArray.length;
  }

  /** Check if a node exists. */
  containsNode(key: NodeKey): boolean {
    return this._nodeDataArray.some((d) => this.getNodeKey(d) === key);
  }

  /** Get node data by key. */
  getNodeData(key: NodeKey): NodeData | undefined {
    return this._nodeDataArray.find((d) => this.getNodeKey(d) === key);
  }

  /** Add a node. Returns the generated key if none provided. */
  addNode(nodeData: NodeData): NodeKey {
    if (!this.validateNode(nodeData)) {
      throw new Error('Node validation failed');
    }

    if (nodeData[this.nodeKeyProperty] === undefined || nodeData[this.nodeKeyProperty] === null) {
      nodeData[this.nodeKeyProperty] = this.generateKey();
    }

    const key = this.getNodeKey(nodeData);
    if (this.containsNode(key)) {
      throw new Error(`Node with key ${key} already exists`);
    }

    this._nodeDataArray.push(nodeData);
    this.emit({
      type: 'node Added',
      model: this,
      node: nodeData,
    });
    return key;
  }

  /** Remove a node by key. */
  removeNode(key: NodeKey): boolean {
    const index = this._nodeDataArray.findIndex((d) => this.getNodeKey(d) === key);
    if (index === -1) return false;

    const removed = this._nodeDataArray[index];
    if (!removed || !this.validateNodeRemoval(removed)) {
      throw new Error('Node removal validation failed');
    }

    this._nodeDataArray.splice(index, 1);
    this.emit({
      type: 'node Removed',
      model: this,
      node: removed,
    });
    return true;
  }

  /** Set a property on a node. */
  setNodeProperty(key: NodeKey, propertyName: string, value: unknown): void {
    const nodeData = this.getNodeData(key);
    if (!nodeData) {
      throw new Error(`Node with key ${key} not found`);
    }

    const oldValue = nodeData[propertyName];
    nodeData[propertyName] = value;

    this.emit({
      type: 'property Changed',
      model: this,
      propertyName,
      oldValue,
      newValue: value,
      node: nodeData,
    });
  }

  /** Get a property from a node. */
  getNodeProperty(key: NodeKey, propertyName: string): unknown {
    const nodeData = this.getNodeData(key);
    if (!nodeData) return undefined;
    return nodeData[propertyName];
  }

  /** Add a change listener. */
  addChangedListener(listener: ChangedEventHandler): void {
    this.listeners.push(listener);
  }

  /** Remove a change listener. */
  removeChangedListener(listener: ChangedEventHandler): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) this.listeners.splice(index, 1);
  }

  /** Emit a changed event. Buffers while a transaction is in progress. */
  protected emit(event: ChangedEvent): void {
    if (this._transactionDepth > 0) {
      this._pendingEvents.push(event);
      return;
    }
    this.flushEvent(event);
  }

  private flushEvent(event: ChangedEvent): void {
    this.changedEventLog.push(event);
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  /** GoJS-compatible: The log of changed events since the last clear. */
  changedEventLog: ChangedEvent[] = [];

  /** GoJS-compatible: Clear the changed event log. */
  clearChangedEventLog(): void {
    this.changedEventLog = [];
  }

  /**
   * GoJS-compatible: Merge the changed events recorded by another model
   * (or by this model's change log) into this model.
   */
  mergeChanges(changes: Model | ChangedEvent[]): void {
    const events = Array.isArray(changes) ? changes : changes.changedEventLog;
    for (const event of events) {
      this.applyChangeEvent(event);
    }
  }

  private applyChangeEvent(event: ChangedEvent): void {
    switch (event.type) {
      case 'node Added':
        if (event.node && !this.containsNode(this.getNodeKey(event.node))) {
          this.addNode({ ...event.node });
        }
        break;
      case 'node Removed':
        if (event.node) this.removeNode(this.getNodeKey(event.node));
        break;
      case 'property Changed':
        if (event.node && event.propertyName !== undefined) {
          const key = this.getNodeKey(event.node);
          if (this.containsNode(key)) {
            this.setNodeProperty(key, event.propertyName, event.newValue);
          }
        }
        break;
      case 'link Added': {
        const linkModel = this as unknown as LinkCapableModel;
        if (event.link && 'addLink' in linkModel) {
          const exists = linkModel
            .getLinkDataArray()
            .some((l) => linkModel.getLinkKey(l) === linkModel.getLinkKey(event.link as LinkData));
          if (!exists) linkModel.addLink({ ...event.link });
        }
        break;
      }
      case 'link Removed': {
        const linkModel = this as unknown as LinkCapableModel;
        if (event.link && 'getLinkKey' in linkModel) {
          const key = linkModel.getLinkKey(event.link);
          if (key !== undefined) linkModel.removeLink(key);
        }
        break;
      }
    }
  }

  // Transaction support (GoJS-compatible)
  private _transactionDepth = 0;
  private _pendingEvents: ChangedEvent[] = [];

  /** GoJS-compatible: Begin a transaction; changed events are buffered until commit. */
  startTransaction(_name = ''): boolean {
    this._transactionDepth++;
    return true;
  }

  /** GoJS-compatible: Commit the current transaction, flushing buffered events. */
  commitTransaction(_name = ''): boolean {
    if (this._transactionDepth <= 0) return false;
    this._transactionDepth--;
    if (this._transactionDepth === 0 && this._pendingEvents.length > 0) {
      const pending = this._pendingEvents;
      this._pendingEvents = [];
      for (const event of pending) {
        this.flushEvent(event);
      }
    }
    return true;
  }

  /** GoJS-compatible: Roll back the current transaction, discarding buffered events. */
  rollbackTransaction(): boolean {
    if (this._transactionDepth <= 0) return false;
    this._transactionDepth--;
    if (this._transactionDepth === 0) {
      this._pendingEvents = [];
    }
    return true;
  }

  /** GoJS-compatible: Whether a transaction is currently in progress. */
  isTransactionInProgress(): boolean {
    return this._transactionDepth > 0;
  }

  private _isValidNode: NodeValidationCallback | null = null;
  private _isValidNodeRemoval: NodeValidationCallback | null = null;
  private _nodeKeyPropertyValidated = true;

  /** Set a callback to validate node data before adding. */
  set isValidNode(callback: NodeValidationCallback | null) {
    this._isValidNode = callback;
  }

  /** Get the node validation callback. */
  get isValidNode(): NodeValidationCallback | null {
    return this._isValidNode;
  }

  /** Set a callback to validate node data before removal. */
  set isValidNodeRemoval(callback: NodeValidationCallback | null) {
    this._isValidNodeRemoval = callback;
  }

  /** Get the node removal validation callback. */
  get isValidNodeRemoval(): NodeValidationCallback | null {
    return this._isValidNodeRemoval;
  }

  /**
   * Validate a node before it is added.
   * Returns true if valid (allows insertion).
   */
  validateNode(nodeData: NodeData): boolean {
    if (nodeData[this.nodeKeyProperty] !== undefined && nodeData[this.nodeKeyProperty] !== null) {
      if (!this._nodeKeyPropertyValidated) {
        throw new Error('Cannot use invalid node key property');
      }
    }
    if (this._isValidNode) {
      return this._isValidNode(nodeData);
    }
    return true;
  }

  /**
   * Validate a node before it is removed.
   * Returns true if valid (allows removal).
   */
  validateNodeRemoval(nodeData: NodeData): boolean {
    if (this._isValidNodeRemoval) {
      return this._isValidNodeRemoval(nodeData);
    }
    return true;
  }

  /** Convert to JSON. */
  abstract toJSON(): ModelJSON;

  /** Create from JSON. */
  static fromJSON(_json: ModelJSON): Model {
    throw new Error('fromJSON must be implemented by subclass');
  }

  /** Check if this model equals another model. */
  equals(other: Model): boolean {
    if (this._nodeDataArray.length !== other.nodeDataArray.length) return false;
    return this._nodeDataArray.every((node, i) => {
      const otherNode = other.nodeDataArray[i];
      return JSON.stringify(node) === JSON.stringify(otherNode);
    });
  }

  /** Create a deep copy of this model. */
  abstract copy(): Model;

  /** Set a property on any data object (node or link) with change event. */
  setDataProperty(data: NodeData | LinkData, propertyName: string, value: unknown): void {
    const oldValue = data[propertyName];
    data[propertyName] = value;

    const isNode = this._nodeDataArray.includes(data as NodeData);
    this.emit({
      type: 'property Changed',
      model: this,
      propertyName,
      oldValue,
      newValue: value,
      node: isNode ? (data as NodeData) : undefined,
      link: !isNode ? (data as LinkData) : undefined,
    });
  }
}
