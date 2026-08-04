import { Model } from './Model.ts';
import type { ModelJSON, NodeData, NodeKey } from './Model.ts';

export interface TreeModelJSON extends ModelJSON {
  parentKeyProperty: string;
}

/**
 * A model for tree-structured diagrams.
 * Each node data has an optional `parent` property referencing its parent key.
 */
export class TreeModel extends Model {
  protected override nodeDataArray: NodeData[] = [];
  private parentKeyProperty = 'parent';
  private nextNodeKey = 1;

  /** Get the parent key property name. */
  getParentKeyProperty(): string {
    return this.parentKeyProperty;
  }

  /** Set the parent key property name. */
  setParentKeyProperty(property: string): void {
    this.parentKeyProperty = property;
  }

  /** Get the parent key of a node. Returns undefined for root nodes. */
  getParentKey(nodeData: NodeData): NodeKey | undefined {
    return nodeData[this.parentKeyProperty] as NodeKey | undefined;
  }

  /** Set the parent key of a node. */
  setParentKey(nodeData: NodeData, key: NodeKey | undefined): void {
    if (key === undefined) {
      delete nodeData[this.parentKeyProperty];
    } else {
      nodeData[this.parentKeyProperty] = key;
    }
  }

  /** Get the parent key of a node by node key. */
  getParentKeyForNode(key: NodeKey): NodeKey | undefined {
    const data = this.getNodeData(key);
    return data ? this.getParentKey(data) : undefined;
  }

  /** Check if a node is a root (has no parent). */
  isRoot(key: NodeKey): boolean {
    const data = this.getNodeData(key);
    return data ? this.getParentKey(data) === undefined : false;
  }

  /** Generate a unique node key. */
  private generateNodeKey(): NodeKey {
    return this.nextNodeKey++;
  }

  /** Get the direct children of a node. */
  getChildNodes(key: NodeKey): readonly NodeData[] {
    return this.nodeDataArray.filter((d) => this.getParentKey(d) === key);
  }

  /** Get the child keys of a node. */
  getChildKeys(key: NodeKey): NodeKey[] {
    return this.getChildNodes(key).map((d) => this.getNodeKey(d));
  }

  /** Get the direct parent node data of a node. */
  getParentNode(key: NodeKey): NodeData | undefined {
    const parentKey = this.getParentKeyForNode(key);
    return parentKey !== undefined ? this.getNodeData(parentKey) : undefined;
  }

  /** Check if a node has children. */
  hasChildren(key: NodeKey): boolean {
    return this.getChildNodes(key).length > 0;
  }

  /** Get the number of children of a node. */
  getChildCount(key: NodeKey): number {
    return this.getChildNodes(key).length;
  }

  /** Get the descendants (recursively) of a node. */
  getDescendants(key: NodeKey): NodeData[] {
    const result: NodeData[] = [];
    this.collectDescendants(key, result);
    return result;
  }

  private collectDescendants(key: NodeKey, result: NodeData[]): void {
    for (const child of this.getChildNodes(key)) {
      result.push(child);
      const childKey = this.getNodeKey(child);
      this.collectDescendants(childKey, result);
    }
  }

  /** Get the root nodes (nodes without a parent). */
  getRootNodes(): NodeData[] {
    return this.nodeDataArray.filter((d) => this.getParentKey(d) === undefined);
  }

  /** Get the depth (level) of a node. Root = 0. */
  getDepth(key: NodeKey): number {
    let depth = 0;
    let currentKey: NodeKey | undefined = key;
    let guard = 0;
    while (currentKey !== undefined && guard < 10000) {
      currentKey = this.getParentKeyForNode(currentKey);
      if (currentKey !== undefined) depth++;
      guard++;
    }
    return depth;
  }

  /** Add a node. Returns the generated key if none provided. */
  override addNode(nodeData: NodeData): NodeKey {
    if (!this.validateNode(nodeData)) {
      throw new Error('Node validation failed');
    }

    if (nodeData[this.nodeKeyProperty] === undefined || nodeData[this.nodeKeyProperty] === null) {
      nodeData[this.nodeKeyProperty] = this.generateNodeKey();
    }

    const key = this.getNodeKey(nodeData);
    if (this.containsNode(key)) {
      throw new Error(`Node with key ${key} already exists`);
    }

    // Validate parent if present
    const parentKey = this.getParentKey(nodeData);
    if (parentKey !== undefined && !this.containsNode(parentKey)) {
      throw new Error(`Parent node ${String(parentKey)} not found`);
    }

    this.nodeDataArray.push(nodeData);
    this.emit({
      type: 'node Added',
      model: this,
      node: nodeData,
    });
    return key;
  }

  /** Remove a node and all its descendants. */
  override removeNode(key: NodeKey): boolean {
    const data = this.getNodeData(key);
    if (!data) return false;
    if (!this.validateNodeRemoval(data)) {
      throw new Error('Node removal validation failed');
    }

    // Remove descendants first
    const descendants = this.getDescendants(key);
    for (const descendant of descendants) {
      this.nodeDataArray.splice(this.nodeDataArray.indexOf(descendant), 1);
      this.emit({
        type: 'node Removed',
        model: this,
        node: descendant,
      });
    }

    this.nodeDataArray.splice(this.nodeDataArray.indexOf(data), 1);
    this.emit({
      type: 'node Removed',
      model: this,
      node: data,
    });
    return true;
  }

  /** Set the parent of a node. */
  setParent(key: NodeKey, newParentKey: NodeKey | undefined): void {
    const data = this.getNodeData(key);
    if (!data) throw new Error(`Node with key ${String(key)} not found`);
    if (newParentKey !== undefined && !this.containsNode(newParentKey)) {
      throw new Error(`Parent node ${String(newParentKey)} not found`);
    }
    // Prevent cycles: a node cannot become an ancestor of itself
    if (newParentKey !== undefined && newParentKey === key) {
      throw new Error('Cannot set a node as its own parent');
    }
    if (newParentKey !== undefined) {
      const ancestors = this.getDescendants(key);
      if (ancestors.some((a) => this.getNodeKey(a) === newParentKey)) {
        throw new Error('Cannot create a cycle in the tree');
      }
    }
    this.setParentKey(data, newParentKey);
    this.emit({
      type: 'property Changed',
      model: this,
      propertyName: this.parentKeyProperty,
      oldValue: data[this.parentKeyProperty],
      newValue: newParentKey,
      node: data,
    });
  }

  /** Convert to JSON. */
  override toJSON(): TreeModelJSON {
    return {
      class: 'TreeModel',
      nodeKeyProperty: this.nodeKeyProperty,
      parentKeyProperty: this.parentKeyProperty,
      nodeDataArray: this.nodeDataArray.map((d) => ({ ...d })),
    };
  }

  /** Create from JSON. */
  static override fromJSON(json: TreeModelJSON): TreeModel {
    const model = new TreeModel();
    model.setNodeKeyProperty(json.nodeKeyProperty);
    model.setParentKeyProperty(json.parentKeyProperty);
    for (const nodeData of json.nodeDataArray) {
      model.addNode({ ...nodeData });
    }
    return model;
  }

  /** Create a deep copy of this model. */
  override copy(): TreeModel {
    return TreeModel.fromJSON(this.toJSON());
  }
}
