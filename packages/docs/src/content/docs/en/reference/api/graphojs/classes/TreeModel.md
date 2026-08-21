---
editUrl: false
next: false
prev: false
title: "TreeModel"
---

Defined in: [model/TreeModel.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L12)

A model for tree-structured diagrams.
Each node data has an optional `parent` property referencing its parent key.

## Extends

- [`Model`](/en/reference/api/graphojs/classes/model/)

## Constructors

### Constructor

> **new TreeModel**(`options?`): `TreeModel`

Defined in: [model/TreeModel.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L18)

GoJS-compatible: options object.

#### Parameters

##### options?

###### nodeDataArray?

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

###### nodeKeyProperty?

`string`

###### parentKeyProperty?

`string`

#### Returns

`TreeModel`

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`constructor`](/en/reference/api/graphojs/classes/model/#constructor)

## Properties

### changedEventLog

> **changedEventLog**: [`ChangedEvent`](/en/reference/api/graphojs/interfaces/changedevent/)[] = `[]`

Defined in: [model/Model.ts:402](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L402)

GoJS-compatible: The log of changed events since the last clear.

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`changedEventLog`](/en/reference/api/graphojs/classes/model/#changedeventlog)

## Accessors

### isModified

#### Get Signature

> **get** **isModified**(): `boolean`

Defined in: [model/Model.ts:245](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L245)

##### Returns

`boolean`

#### Set Signature

> **set** **isModified**(`value`): `void`

Defined in: [model/Model.ts:249](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L249)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`isModified`](/en/reference/api/graphojs/classes/model/#ismodified)

***

### isReadOnly

#### Get Signature

> **get** **isReadOnly**(): `boolean`

Defined in: [model/Model.ts:515](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L515)

GoJS-compatible: Whether this model is read-only.

##### Returns

`boolean`

#### Set Signature

> **set** **isReadOnly**(`value`): `void`

Defined in: [model/Model.ts:519](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L519)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`isReadOnly`](/en/reference/api/graphojs/classes/model/#isreadonly)

***

### isValidNode

#### Get Signature

> **get** **isValidNode**(): [`NodeValidationCallback`](/en/reference/api/graphojs/type-aliases/nodevalidationcallback/) \| `null`

Defined in: [model/Model.ts:533](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L533)

Get the node validation callback.

##### Returns

[`NodeValidationCallback`](/en/reference/api/graphojs/type-aliases/nodevalidationcallback/) \| `null`

#### Set Signature

> **set** **isValidNode**(`callback`): `void`

Defined in: [model/Model.ts:528](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L528)

Set a callback to validate node data before adding.

##### Parameters

###### callback

[`NodeValidationCallback`](/en/reference/api/graphojs/type-aliases/nodevalidationcallback/) \| `null`

##### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`isValidNode`](/en/reference/api/graphojs/classes/model/#isvalidnode)

***

### isValidNodeRemoval

#### Get Signature

> **get** **isValidNodeRemoval**(): [`NodeValidationCallback`](/en/reference/api/graphojs/type-aliases/nodevalidationcallback/) \| `null`

Defined in: [model/Model.ts:543](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L543)

Get the node removal validation callback.

##### Returns

[`NodeValidationCallback`](/en/reference/api/graphojs/type-aliases/nodevalidationcallback/) \| `null`

#### Set Signature

> **set** **isValidNodeRemoval**(`callback`): `void`

Defined in: [model/Model.ts:538](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L538)

Set a callback to validate node data before removal.

##### Parameters

###### callback

[`NodeValidationCallback`](/en/reference/api/graphojs/type-aliases/nodevalidationcallback/) \| `null`

##### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`isValidNodeRemoval`](/en/reference/api/graphojs/classes/model/#isvalidnoderemoval)

***

### nodeCategoryProperty

#### Get Signature

> **get** **nodeCategoryProperty**(): `string`

Defined in: [model/Model.ts:193](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L193)

GoJS-compatible: Get or set the node category property name.

##### Returns

`string`

#### Set Signature

> **set** **nodeCategoryProperty**(`value`): `void`

Defined in: [model/Model.ts:197](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L197)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`nodeCategoryProperty`](/en/reference/api/graphojs/classes/model/#nodecategoryproperty)

***

### nodeDataArray

#### Get Signature

> **get** **nodeDataArray**(): readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

Defined in: [model/Model.ts:104](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L104)

GoJS-compatible: Get the node data array.

##### Returns

readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

#### Set Signature

> **set** **nodeDataArray**(`value`): `void`

Defined in: [model/Model.ts:109](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L109)

GoJS-compatible: Set the node data array, assigning keys and emitting events.

##### Parameters

###### value

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

##### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`nodeDataArray`](/en/reference/api/graphojs/classes/model/#nodedataarray)

***

### usesUndoManager

#### Get Signature

> **get** **usesUndoManager**(): `boolean`

Defined in: [model/Model.ts:224](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L224)

GoJS-compatible: Whether this model supports undo/redo.

##### Returns

`boolean`

#### Set Signature

> **set** **usesUndoManager**(`value`): `void`

Defined in: [model/Model.ts:228](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L228)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`usesUndoManager`](/en/reference/api/graphojs/classes/model/#usesundomanager)

## Methods

### addChangedListener()

> **addChangedListener**(`listener`): `void`

Defined in: [model/Model.ts:375](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L375)

Add a change listener.

#### Parameters

##### listener

[`ChangedEventHandler`](/en/reference/api/graphojs/type-aliases/changedeventhandler/)

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`addChangedListener`](/en/reference/api/graphojs/classes/model/#addchangedlistener)

***

### addNode()

> **addNode**(`nodeData`): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [model/TreeModel.ts:136](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L136)

Add a node. Returns the generated key if none provided.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`addNode`](/en/reference/api/graphojs/classes/model/#addnode)

***

### addNodeData()

> **addNodeData**(`nodeData`): `void`

Defined in: [model/Model.ts:326](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L326)

GoJS-compatible: Add a node data object to the model.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`addNodeData`](/en/reference/api/graphojs/classes/model/#addnodedata)

***

### clearChangedEventLog()

> **clearChangedEventLog**(): `void`

Defined in: [model/Model.ts:405](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L405)

GoJS-compatible: Clear the changed event log.

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`clearChangedEventLog`](/en/reference/api/graphojs/classes/model/#clearchangedeventlog)

***

### clearIsModified()

> **clearIsModified**(): `void`

Defined in: [model/Model.ts:254](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L254)

GoJS-compatible: Clear the modified flag.

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`clearIsModified`](/en/reference/api/graphojs/classes/model/#clearismodified)

***

### commitTransaction()

> **commitTransaction**(`_name?`): `boolean`

Defined in: [model/Model.ts:471](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L471)

GoJS-compatible: Commit the current transaction, flushing buffered events.

#### Parameters

##### \_name?

`string` = `''`

#### Returns

`boolean`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`commitTransaction`](/en/reference/api/graphojs/classes/model/#committransaction)

***

### containsNode()

> **containsNode**(`key`): `boolean`

Defined in: [model/Model.ts:153](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L153)

Check if a node exists.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`boolean`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`containsNode`](/en/reference/api/graphojs/classes/model/#containsnode)

***

### copy()

> **copy**(): `TreeModel`

Defined in: [model/TreeModel.ts:273](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L273)

Create a deep copy of this model.

#### Returns

`TreeModel`

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`copy`](/en/reference/api/graphojs/classes/model/#copy)

***

### copyNodeData()

> **copyNodeData**(`nodeData`): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

Defined in: [model/Model.ts:178](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L178)

GoJS-compatible: Copy a node data object.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`copyNodeData`](/en/reference/api/graphojs/classes/model/#copynodedata)

***

### equals()

> **equals**(`other`): `boolean`

Defined in: [model/Model.ts:588](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L588)

Check if this model equals another model.

#### Parameters

##### other

[`Model`](/en/reference/api/graphojs/classes/model/)

#### Returns

`boolean`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`equals`](/en/reference/api/graphojs/classes/model/#equals)

***

### findNodeDataForKey()

> **findNodeDataForKey**(`key`): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

Defined in: [model/Model.ts:163](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L163)

GoJS-compatible: Find node data by key (alias).

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`findNodeDataForKey`](/en/reference/api/graphojs/classes/model/#findnodedataforkey)

***

### findNodeDataForPart()

> **findNodeDataForPart**(`partKey`): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

Defined in: [model/Model.ts:188](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L188)

GoJS-compatible: Find the node data that corresponds to a part (by key).

#### Parameters

##### partKey

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`findNodeDataForPart`](/en/reference/api/graphojs/classes/model/#findnodedataforpart)

***

### generateKey()

> **generateKey**(): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [model/Model.ts:90](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L90)

Generate a unique key that is not already in use.

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`generateKey`](/en/reference/api/graphojs/classes/model/#generatekey)

***

### getCategoryForNodeData()

> **getCategoryForNodeData**(`nodeData`): `string`

Defined in: [model/Model.ts:202](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L202)

GoJS-compatible: Get the category of a node data object.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`string`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getCategoryForNodeData`](/en/reference/api/graphojs/classes/model/#getcategoryfornodedata)

***

### getChildCount()

> **getChildCount**(`key`): `number`

Defined in: [model/TreeModel.ts:98](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L98)

Get the number of children of a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`number`

***

### getChildKeys()

> **getChildKeys**(`key`): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)[]

Defined in: [model/TreeModel.ts:82](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L82)

Get the child keys of a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)[]

***

### getChildNodes()

> **getChildNodes**(`key`): readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

Defined in: [model/TreeModel.ts:77](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L77)

Get the direct children of a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

***

### getDepth()

> **getDepth**(`key`): `number`

Defined in: [model/TreeModel.ts:123](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L123)

Get the depth (level) of a node. Root = 0.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`number`

***

### getDescendants()

> **getDescendants**(`key`): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

Defined in: [model/TreeModel.ts:103](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L103)

Get the descendants (recursively) of a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

***

### getKeyProperty()

> **getKeyProperty**(): `string`

Defined in: [model/Model.ts:212](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L212)

GoJS-compatible: Get or set the key property (GoJS name).

#### Returns

`string`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getKeyProperty`](/en/reference/api/graphojs/classes/model/#getkeyproperty)

***

### getNodeCount()

> **getNodeCount**(): `number`

Defined in: [model/Model.ts:148](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L148)

Get the number of nodes.

#### Returns

`number`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getNodeCount`](/en/reference/api/graphojs/classes/model/#getnodecount)

***

### getNodeData()

> **getNodeData**(`key`): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

Defined in: [model/Model.ts:158](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L158)

Get node data by key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getNodeData`](/en/reference/api/graphojs/classes/model/#getnodedata)

***

### getNodeDataArray()

> **getNodeDataArray**(): readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

Defined in: [model/Model.ts:99](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L99)

Get all node data.

#### Returns

readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getNodeDataArray`](/en/reference/api/graphojs/classes/model/#getnodedataarray)

***

### getNodeDataForKey()

> **getNodeDataForKey**(`key`): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

Defined in: [model/Model.ts:168](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L168)

GoJS-compatible: Find node data by key (alias).

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getNodeDataForKey`](/en/reference/api/graphojs/classes/model/#getnodedataforkey)

***

### getNodeKey()

> **getNodeKey**(`nodeData`): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [model/Model.ts:80](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L80)

Get the key of a node data object.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getNodeKey`](/en/reference/api/graphojs/classes/model/#getnodekey)

***

### getNodeKeyProperty()

> **getNodeKeyProperty**(): `string`

Defined in: [model/Model.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L70)

Get the node key property name.

#### Returns

`string`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getNodeKeyProperty`](/en/reference/api/graphojs/classes/model/#getnodekeyproperty)

***

### getNodeProperty()

> **getNodeProperty**(`key`, `propertyName`): `unknown`

Defined in: [model/Model.ts:368](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L368)

Get a property from a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### propertyName

`string`

#### Returns

`unknown`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getNodeProperty`](/en/reference/api/graphojs/classes/model/#getnodeproperty)

***

### getParentKey()

> **getParentKey**(`nodeData`): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| `undefined`

Defined in: [model/TreeModel.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L46)

Get the parent key of a node. Returns undefined for root nodes.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| `undefined`

***

### getParentKeyForNode()

> **getParentKeyForNode**(`key`): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| `undefined`

Defined in: [model/TreeModel.ts:60](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L60)

Get the parent key of a node by node key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| `undefined`

***

### getParentKeyProperty()

> **getParentKeyProperty**(): `string`

Defined in: [model/TreeModel.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L36)

Get the parent key property name.

#### Returns

`string`

***

### getParentNode()

> **getParentNode**(`key`): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

Defined in: [model/TreeModel.ts:87](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L87)

Get the direct parent node data of a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `undefined`

***

### getRootNodes()

> **getRootNodes**(): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

Defined in: [model/TreeModel.ts:118](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L118)

Get the root nodes (nodes without a parent).

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

***

### getUndoManager()

> **getUndoManager**(): `unknown`

Defined in: [model/Model.ts:233](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L233)

GoJS-compatible: Get the associated UndoManager.

#### Returns

`unknown`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getUndoManager`](/en/reference/api/graphojs/classes/model/#getundomanager)

***

### hasChildren()

> **hasChildren**(`key`): `boolean`

Defined in: [model/TreeModel.ts:93](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L93)

Check if a node has children.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`boolean`

***

### isRoot()

> **isRoot**(`key`): `boolean`

Defined in: [model/TreeModel.ts:66](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L66)

Check if a node is a root (has no parent).

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`boolean`

***

### isTransactionInProgress()

> **isTransactionInProgress**(): `boolean`

Defined in: [model/Model.ts:501](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L501)

GoJS-compatible: Whether a transaction is currently in progress.

#### Returns

`boolean`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`isTransactionInProgress`](/en/reference/api/graphojs/classes/model/#istransactioninprogress)

***

### makeNodeData()

> **makeNodeData**(`value?`): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

Defined in: [model/Model.ts:173](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L173)

GoJS-compatible: Make a new node data object from a prototype.

#### Parameters

##### value?

`Partial`\<[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)\>

#### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`makeNodeData`](/en/reference/api/graphojs/classes/model/#makenodedata)

***

### mergeChanges()

> **mergeChanges**(`changes`): `void`

Defined in: [model/Model.ts:413](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L413)

GoJS-compatible: Merge the changed events recorded by another model
(or by this model's change log) into this model.

#### Parameters

##### changes

[`Model`](/en/reference/api/graphojs/classes/model/) \| [`ChangedEvent`](/en/reference/api/graphojs/interfaces/changedevent/)[]

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`mergeChanges`](/en/reference/api/graphojs/classes/model/#mergechanges)

***

### mergeNodeData()

> **mergeNodeData**(`nodeData`, `newData`): `void`

Defined in: [model/Model.ts:183](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L183)

GoJS-compatible: Merge new data into an existing node data object.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

##### newData

`Partial`\<[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)\>

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`mergeNodeData`](/en/reference/api/graphojs/classes/model/#mergenodedata)

***

### removeChangedListener()

> **removeChangedListener**(`listener`): `void`

Defined in: [model/Model.ts:380](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L380)

Remove a change listener.

#### Parameters

##### listener

[`ChangedEventHandler`](/en/reference/api/graphojs/type-aliases/changedeventhandler/)

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`removeChangedListener`](/en/reference/api/graphojs/classes/model/#removechangedlistener)

***

### removeNode()

> **removeNode**(`key`): `boolean`

Defined in: [model/TreeModel.ts:174](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L174)

Remove a node and all its descendants.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`boolean`

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`removeNode`](/en/reference/api/graphojs/classes/model/#removenode)

***

### removeNodeData()

> **removeNodeData**(`key`): `boolean`

Defined in: [model/Model.ts:331](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L331)

GoJS-compatible: Remove a node data object (or its key) from the model.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`boolean`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`removeNodeData`](/en/reference/api/graphojs/classes/model/#removenodedata)

***

### rollbackTransaction()

> **rollbackTransaction**(): `boolean`

Defined in: [model/Model.ts:486](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L486)

GoJS-compatible: Roll back the current transaction, undoing its mutations.

#### Returns

`boolean`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`rollbackTransaction`](/en/reference/api/graphojs/classes/model/#rollbacktransaction)

***

### setCategoryForNodeData()

> **setCategoryForNodeData**(`nodeData`, `category`): `void`

Defined in: [model/Model.ts:207](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L207)

GoJS-compatible: Set the category of a node data object.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

##### category

`string`

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`setCategoryForNodeData`](/en/reference/api/graphojs/classes/model/#setcategoryfornodedata)

***

### setDataProperty()

> **setDataProperty**(`data`, `propertyName`, `value`): `void`

Defined in: [model/Model.ts:600](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L600)

Set a property on any data object (node or link) with change event.

#### Parameters

##### data

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/) \| [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

##### propertyName

`string`

##### value

`unknown`

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`setDataProperty`](/en/reference/api/graphojs/classes/model/#setdataproperty)

***

### setKeyProperty()

> **setKeyProperty**(`value`): `void`

Defined in: [model/Model.ts:216](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L216)

#### Parameters

##### value

`string`

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`setKeyProperty`](/en/reference/api/graphojs/classes/model/#setkeyproperty)

***

### setNodeDataArray()

> **setNodeDataArray**(`value`): `void`

Defined in: [model/Model.ts:114](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L114)

Set all node data, assigning missing keys and emitting add/remove events.

#### Parameters

##### value

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`setNodeDataArray`](/en/reference/api/graphojs/classes/model/#setnodedataarray)

***

### setNodeKey()

> **setNodeKey**(`nodeData`, `key`): `void`

Defined in: [model/Model.ts:85](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L85)

Set the key of a node data object.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`setNodeKey`](/en/reference/api/graphojs/classes/model/#setnodekey)

***

### setNodeKeyProperty()

> **setNodeKeyProperty**(`property`): `void`

Defined in: [model/Model.ts:75](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L75)

Set the node key property name.

#### Parameters

##### property

`string`

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`setNodeKeyProperty`](/en/reference/api/graphojs/classes/model/#setnodekeyproperty)

***

### setNodeProperty()

> **setNodeProperty**(`key`, `propertyName`, `value`): `void`

Defined in: [model/Model.ts:337](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L337)

Set a property on a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### propertyName

`string`

##### value

`unknown`

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`setNodeProperty`](/en/reference/api/graphojs/classes/model/#setnodeproperty)

***

### setParent()

> **setParent**(`key`, `newParentKey`): `void`

Defined in: [model/TreeModel.ts:216](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L216)

Set the parent of a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### newParentKey

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| `undefined`

#### Returns

`void`

***

### setParentKey()

> **setParentKey**(`nodeData`, `key`): `void`

Defined in: [model/TreeModel.ts:51](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L51)

Set the parent key of a node.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| `undefined`

#### Returns

`void`

***

### setParentKeyProperty()

> **setParentKeyProperty**(`property`): `void`

Defined in: [model/TreeModel.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L41)

Set the parent key property name.

#### Parameters

##### property

`string`

#### Returns

`void`

***

### setUndoManager()

> **setUndoManager**(`undoManager`): `void`

Defined in: [model/Model.ts:238](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L238)

GoJS-compatible: Set the associated UndoManager.

#### Parameters

##### undoManager

`unknown`

#### Returns

`void`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`setUndoManager`](/en/reference/api/graphojs/classes/model/#setundomanager)

***

### startTransaction()

> **startTransaction**(`_name?`): `boolean`

Defined in: [model/Model.ts:465](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L465)

GoJS-compatible: Begin a transaction; changed events are buffered until commit.

#### Parameters

##### \_name?

`string` = `''`

#### Returns

`boolean`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`startTransaction`](/en/reference/api/graphojs/classes/model/#starttransaction)

***

### toJson()

> **toJson**(): [`ModelJSON`](/en/reference/api/graphojs/interfaces/modeljson/)

Defined in: [model/Model.ts:578](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L578)

GoJS-compatible: Alias for toJSON (GoJS uses toJson).

#### Returns

[`ModelJSON`](/en/reference/api/graphojs/interfaces/modeljson/)

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`toJson`](/en/reference/api/graphojs/classes/model/#tojson)

***

### toJSON()

> **toJSON**(): [`TreeModelJSON`](/en/reference/api/graphojs/interfaces/treemodeljson/)

Defined in: [model/TreeModel.ts:252](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L252)

Convert to JSON.

#### Returns

[`TreeModelJSON`](/en/reference/api/graphojs/interfaces/treemodeljson/)

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`toJSON`](/en/reference/api/graphojs/classes/model/#tojson-1)

***

### validateNode()

> **validateNode**(`nodeData`): `boolean`

Defined in: [model/Model.ts:551](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L551)

Validate a node before it is added.
Returns true if valid (allows insertion).

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`boolean`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`validateNode`](/en/reference/api/graphojs/classes/model/#validatenode)

***

### validateNodeRemoval()

> **validateNodeRemoval**(`nodeData`): `boolean`

Defined in: [model/Model.ts:567](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L567)

Validate a node before it is removed.
Returns true if valid (allows removal).

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`boolean`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`validateNodeRemoval`](/en/reference/api/graphojs/classes/model/#validatenoderemoval)

***

### fromJSON()

> `static` **fromJSON**(`json`): `TreeModel`

Defined in: [model/TreeModel.ts:262](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/TreeModel.ts#L262)

Create from JSON.

#### Parameters

##### json

[`TreeModelJSON`](/en/reference/api/graphojs/interfaces/treemodeljson/)

#### Returns

`TreeModel`

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`fromJSON`](/en/reference/api/graphojs/classes/model/#fromjson)
