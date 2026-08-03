export type NodeKey = string | number;

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
  protected nodeDataArray: NodeData[] = [];
  protected nodeKeyProperty: string = 'key';
  protected listeners: ChangedEventHandler[] = [];
  private nextKey: number = 1;

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
    return this.nodeDataArray;
  }

  /** Get the number of nodes. */
  getNodeCount(): number {
    return this.nodeDataArray.length;
  }

  /** Check if a node exists. */
  containsNode(key: NodeKey): boolean {
    return this.nodeDataArray.some((d) => this.getNodeKey(d) === key);
  }

  /** Get node data by key. */
  getNodeData(key: NodeKey): NodeData | undefined {
    return this.nodeDataArray.find((d) => this.getNodeKey(d) === key);
  }

  /** Add a node. Returns the generated key if none provided. */
  addNode(nodeData: NodeData): NodeKey {
    if (nodeData[this.nodeKeyProperty] === undefined || nodeData[this.nodeKeyProperty] === null) {
      nodeData[this.nodeKeyProperty] = this.generateKey();
    }

    const key = this.getNodeKey(nodeData);
    if (this.containsNode(key)) {
      throw new Error(`Node with key ${key} already exists`);
    }

    this.nodeDataArray.push(nodeData);
    this.emit({
      type: 'node Added',
      model: this,
      node: nodeData,
    });
    return key;
  }

  /** Remove a node by key. */
  removeNode(key: NodeKey): boolean {
    const index = this.nodeDataArray.findIndex((d) => this.getNodeKey(d) === key);
    if (index === -1) return false;

    const removed = this.nodeDataArray.splice(index, 1)[0];
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

  /** Emit a changed event. */
  protected emit(event: ChangedEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  /** Convert to JSON. */
  abstract toJSON(): ModelJSON;

  /** Create from JSON. */
  static fromJSON(_json: ModelJSON): Model {
    throw new Error('fromJSON must be implemented by subclass');
  }

  /** Check if this model equals another model. */
  equals(other: Model): boolean {
    if (this.nodeDataArray.length !== other.nodeDataArray.length) return false;
    return this.nodeDataArray.every((node, i) => {
      const otherNode = other.nodeDataArray[i];
      return JSON.stringify(node) === JSON.stringify(otherNode);
    });
  }
}
