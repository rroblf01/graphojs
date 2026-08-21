---
editUrl: false
next: false
prev: false
title: "Model"
---

Defined in: [model/Model.ts:58](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L58)

Abstract base class for all models.

## Extended by

- [`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)
- [`TreeModel`](/en/reference/api/graphojs/classes/treemodel/)

## Constructors

### Constructor

> **new Model**(`nodeKeyProperty?`): `Model`

Defined in: [model/Model.ts:65](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L65)

#### Parameters

##### nodeKeyProperty?

`string`

#### Returns

`Model`

## Properties

### changedEventLog

> **changedEventLog**: [`ChangedEvent`](/en/reference/api/graphojs/interfaces/changedevent/)[] = `[]`

Defined in: [model/Model.ts:402](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L402)

GoJS-compatible: The log of changed events since the last clear.

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

***

### addNode()

> **addNode**(`nodeData`): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [model/Model.ts:264](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L264)

Add a node. Returns the generated key if none provided.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

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

***

### clearChangedEventLog()

> **clearChangedEventLog**(): `void`

Defined in: [model/Model.ts:405](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L405)

GoJS-compatible: Clear the changed event log.

#### Returns

`void`

***

### clearIsModified()

> **clearIsModified**(): `void`

Defined in: [model/Model.ts:254](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L254)

GoJS-compatible: Clear the modified flag.

#### Returns

`void`

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

***

### copy()

> `abstract` **copy**(): `Model`

Defined in: [model/Model.ts:597](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L597)

Create a deep copy of this model.

#### Returns

`Model`

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

***

### equals()

> **equals**(`other`): `boolean`

Defined in: [model/Model.ts:588](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L588)

Check if this model equals another model.

#### Parameters

##### other

`Model`

#### Returns

`boolean`

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

***

### generateKey()

> **generateKey**(): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [model/Model.ts:90](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L90)

Generate a unique key that is not already in use.

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

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

***

### getKeyProperty()

> **getKeyProperty**(): `string`

Defined in: [model/Model.ts:212](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L212)

GoJS-compatible: Get or set the key property (GoJS name).

#### Returns

`string`

***

### getNodeCount()

> **getNodeCount**(): `number`

Defined in: [model/Model.ts:148](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L148)

Get the number of nodes.

#### Returns

`number`

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

***

### getNodeDataArray()

> **getNodeDataArray**(): readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

Defined in: [model/Model.ts:99](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L99)

Get all node data.

#### Returns

readonly [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

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

***

### getNodeKeyProperty()

> **getNodeKeyProperty**(): `string`

Defined in: [model/Model.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L70)

Get the node key property name.

#### Returns

`string`

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

***

### getUndoManager()

> **getUndoManager**(): `unknown`

Defined in: [model/Model.ts:233](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L233)

GoJS-compatible: Get the associated UndoManager.

#### Returns

`unknown`

***

### isTransactionInProgress()

> **isTransactionInProgress**(): `boolean`

Defined in: [model/Model.ts:501](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L501)

GoJS-compatible: Whether a transaction is currently in progress.

#### Returns

`boolean`

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

***

### mergeChanges()

> **mergeChanges**(`changes`): `void`

Defined in: [model/Model.ts:413](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L413)

GoJS-compatible: Merge the changed events recorded by another model
(or by this model's change log) into this model.

#### Parameters

##### changes

`Model` \| [`ChangedEvent`](/en/reference/api/graphojs/interfaces/changedevent/)[]

#### Returns

`void`

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

***

### removeNode()

> **removeNode**(`key`): `boolean`

Defined in: [model/Model.ts:297](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L297)

Remove a node by key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`boolean`

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

***

### rollbackTransaction()

> **rollbackTransaction**(): `boolean`

Defined in: [model/Model.ts:486](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L486)

GoJS-compatible: Roll back the current transaction, undoing its mutations.

#### Returns

`boolean`

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

***

### setKeyProperty()

> **setKeyProperty**(`value`): `void`

Defined in: [model/Model.ts:216](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L216)

#### Parameters

##### value

`string`

#### Returns

`void`

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

***

### toJson()

> **toJson**(): [`ModelJSON`](/en/reference/api/graphojs/interfaces/modeljson/)

Defined in: [model/Model.ts:578](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L578)

GoJS-compatible: Alias for toJSON (GoJS uses toJson).

#### Returns

[`ModelJSON`](/en/reference/api/graphojs/interfaces/modeljson/)

***

### toJSON()

> `abstract` **toJSON**(): [`ModelJSON`](/en/reference/api/graphojs/interfaces/modeljson/)

Defined in: [model/Model.ts:575](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L575)

Convert to JSON.

#### Returns

[`ModelJSON`](/en/reference/api/graphojs/interfaces/modeljson/)

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

***

### fromJSON()

> `static` **fromJSON**(`_json`): `Model`

Defined in: [model/Model.ts:583](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L583)

Create from JSON.

#### Parameters

##### \_json

[`ModelJSON`](/en/reference/api/graphojs/interfaces/modeljson/)

#### Returns

`Model`
