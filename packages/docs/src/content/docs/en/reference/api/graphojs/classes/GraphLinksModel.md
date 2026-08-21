---
editUrl: false
next: false
prev: false
title: "GraphLinksModel"
---

Defined in: [model/GraphLinksModel.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L12)

A model that supports nodes and links between nodes.

## Extends

- [`Model`](/en/reference/api/graphojs/classes/model/)

## Constructors

### Constructor

> **new GraphLinksModel**(`options?`): `GraphLinksModel`

Defined in: [model/GraphLinksModel.ts:19](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L19)

GoJS-compatible: options object.

#### Parameters

##### options?

###### linkDataArray?

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

###### linkKeyProperty?

`string`

###### nodeDataArray?

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

###### nodeKeyProperty?

`string`

#### Returns

`GraphLinksModel`

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

### allowsDuplicateLinks

#### Get Signature

> **get** **allowsDuplicateLinks**(): `boolean`

Defined in: [model/GraphLinksModel.ts:146](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L146)

Whether duplicate links are allowed. Default: true

##### Returns

`boolean`

#### Set Signature

> **set** **allowsDuplicateLinks**(`value`): `void`

Defined in: [model/GraphLinksModel.ts:151](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L151)

Set whether duplicate links are allowed.

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowsSelfLoops

#### Get Signature

> **get** **allowsSelfLoops**(): `boolean`

Defined in: [model/GraphLinksModel.ts:136](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L136)

Whether self-loops are allowed. Default: true

##### Returns

`boolean`

#### Set Signature

> **set** **allowsSelfLoops**(`value`): `void`

Defined in: [model/GraphLinksModel.ts:141](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L141)

Set whether self-loops are allowed.

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

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

### isValidLink

#### Get Signature

> **get** **isValidLink**(): [`LinkValidationCallback`](/en/reference/api/graphojs/type-aliases/linkvalidationcallback/) \| `null`

Defined in: [model/GraphLinksModel.ts:121](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L121)

Get the link validation callback.

##### Returns

[`LinkValidationCallback`](/en/reference/api/graphojs/type-aliases/linkvalidationcallback/) \| `null`

#### Set Signature

> **set** **isValidLink**(`callback`): `void`

Defined in: [model/GraphLinksModel.ts:116](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L116)

Set a callback to validate link data before adding.

##### Parameters

###### callback

[`LinkValidationCallback`](/en/reference/api/graphojs/type-aliases/linkvalidationcallback/) \| `null`

##### Returns

`void`

***

### isValidLinkRemoval

#### Get Signature

> **get** **isValidLinkRemoval**(): [`LinkValidationCallback`](/en/reference/api/graphojs/type-aliases/linkvalidationcallback/) \| `null`

Defined in: [model/GraphLinksModel.ts:131](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L131)

Get the link removal validation callback.

##### Returns

[`LinkValidationCallback`](/en/reference/api/graphojs/type-aliases/linkvalidationcallback/) \| `null`

#### Set Signature

> **set** **isValidLinkRemoval**(`callback`): `void`

Defined in: [model/GraphLinksModel.ts:126](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L126)

Set a callback to validate link data before removal.

##### Parameters

###### callback

[`LinkValidationCallback`](/en/reference/api/graphojs/type-aliases/linkvalidationcallback/) \| `null`

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

### linkDataArray

#### Get Signature

> **get** **linkDataArray**(): readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

Defined in: [model/GraphLinksModel.ts:189](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L189)

GoJS-compatible: Get the link data array.

##### Returns

readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

#### Set Signature

> **set** **linkDataArray**(`value`): `void`

Defined in: [model/GraphLinksModel.ts:194](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L194)

GoJS-compatible: Set the link data array, assigning keys and emitting events.

##### Parameters

###### value

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

##### Returns

`void`

***

### linkFromPortIdProperty

#### Get Signature

> **get** **linkFromPortIdProperty**(): `string`

Defined in: [model/GraphLinksModel.ts:63](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L63)

##### Returns

`string`

#### Set Signature

> **set** **linkFromPortIdProperty**(`value`): `void`

Defined in: [model/GraphLinksModel.ts:67](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L67)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### linkToPortIdProperty

#### Get Signature

> **get** **linkToPortIdProperty**(): `string`

Defined in: [model/GraphLinksModel.ts:74](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L74)

##### Returns

`string`

#### Set Signature

> **set** **linkToPortIdProperty**(`value`): `void`

Defined in: [model/GraphLinksModel.ts:78](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L78)

##### Parameters

###### value

`string`

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

### addLink()

> **addLink**(`linkData`): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [model/GraphLinksModel.ts:296](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L296)

Add a link.

#### Parameters

##### linkData

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

***

### addLinkData()

> **addLinkData**(`linkData`): `void`

Defined in: [model/GraphLinksModel.ts:381](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L381)

GoJS-compatible: Add a link data object to the model.

#### Parameters

##### linkData

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

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

#### Inherited from

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

### applyIncrementalJson()

> **applyIncrementalJson**(`json`): `void`

Defined in: [model/GraphLinksModel.ts:482](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L482)

GoJS-compatible: Apply an incremental JSON representation produced by
toIncrementalJson (or a full GraphLinksModelJSON snapshot).

#### Parameters

##### json

###### modifiedLinkData?

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

###### modifiedNodeData?

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

###### removedLinkIds?

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)[]

###### removedNodeIds?

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)[]

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [model/GraphLinksModel.ts:543](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L543)

GoJS-compatible: Remove all nodes and links from the model.

#### Returns

`void`

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

### containsLink()

> **containsLink**(`from`, `to`): `boolean`

Defined in: [model/GraphLinksModel.ts:408](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L408)

Check if a link exists between two nodes.

#### Parameters

##### from

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### to

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

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

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`containsNode`](/en/reference/api/graphojs/classes/model/#containsnode)

***

### copy()

> **copy**(): `GraphLinksModel`

Defined in: [model/GraphLinksModel.ts:554](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L554)

Create a deep copy of this model.

#### Returns

`GraphLinksModel`

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`copy`](/en/reference/api/graphojs/classes/model/#copy)

***

### copyLinkData()

> **copyLinkData**(`linkData`): [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

Defined in: [model/GraphLinksModel.ts:88](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L88)

GoJS-compatible: Copy a link data object.

#### Parameters

##### linkData

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

#### Returns

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

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

Defined in: [model/GraphLinksModel.ts:532](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L532)

Check if this model equals another model.

#### Parameters

##### other

[`Model`](/en/reference/api/graphojs/classes/model/)

#### Returns

`boolean`

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`equals`](/en/reference/api/graphojs/classes/model/#equals)

***

### findLinkDataForKey()

> **findLinkDataForKey**(`key`): [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/) \| `undefined`

Defined in: [model/GraphLinksModel.ts:98](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L98)

GoJS-compatible: Find link data by key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/) \| `undefined`

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

### getKeyProperty()

> **getKeyProperty**(): `string`

Defined in: [model/Model.ts:212](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L212)

GoJS-compatible: Get or set the key property (GoJS name).

#### Returns

`string`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getKeyProperty`](/en/reference/api/graphojs/classes/model/#getkeyproperty)

***

### getLinkCount()

> **getLinkCount**(): `number`

Defined in: [model/GraphLinksModel.ts:231](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L231)

Get the number of links.

#### Returns

`number`

***

### getLinkData()

> **getLinkData**(`key`): [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/) \| `undefined`

Defined in: [model/GraphLinksModel.ts:282](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L282)

Get a link data object by key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/) \| `undefined`

***

### getLinkDataArray()

> **getLinkDataArray**(): readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

Defined in: [model/GraphLinksModel.ts:184](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L184)

Get all link data.

#### Returns

readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

***

### getLinkKey()

> **getLinkKey**(`linkData`): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| `undefined`

Defined in: [model/GraphLinksModel.ts:236](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L236)

Get the key of a link data object.

#### Parameters

##### linkData

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

#### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| `undefined`

***

### getLinkKeyProperty()

> **getLinkKeyProperty**(): `string`

Defined in: [model/GraphLinksModel.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L46)

Get the link key property name.

#### Returns

`string`

***

### getLinkKeyPropertyName()

> **getLinkKeyPropertyName**(): `string`

Defined in: [model/GraphLinksModel.ts:56](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L56)

GoJS-compatible: Get or set the link key property (GoJS names).

#### Returns

`string`

***

### getLinkProperty()

> **getLinkProperty**(`key`, `propertyName`): `unknown`

Defined in: [model/GraphLinksModel.ts:246](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L246)

Get a property from a link.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### propertyName

`string`

#### Returns

`unknown`

***

### getLinksForNode()

> **getLinksForNode**(`key`): readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

Defined in: [model/GraphLinksModel.ts:393](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L393)

Get links connected to a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

***

### getLinksFrom()

> **getLinksFrom**(`key`): readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

Defined in: [model/GraphLinksModel.ts:398](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L398)

Get links from a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

***

### getLinksTo()

> **getLinksTo**(`key`): readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

Defined in: [model/GraphLinksModel.ts:403](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L403)

Get links to a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

readonly [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

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

### getUndoManager()

> **getUndoManager**(): `unknown`

Defined in: [model/Model.ts:233](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/Model.ts#L233)

GoJS-compatible: Get the associated UndoManager.

#### Returns

`unknown`

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`getUndoManager`](/en/reference/api/graphojs/classes/model/#getundomanager)

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

### makeLinkData()

> **makeLinkData**(`value?`): [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

Defined in: [model/GraphLinksModel.ts:83](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L83)

GoJS-compatible: Make a new link data object from a prototype.

#### Parameters

##### value?

`Partial`\<[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)\>

#### Returns

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

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

### mergeLinkData()

> **mergeLinkData**(`linkData`, `newData`): `void`

Defined in: [model/GraphLinksModel.ts:93](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L93)

GoJS-compatible: Merge new data into an existing link data object.

#### Parameters

##### linkData

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

##### newData

`Partial`\<[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)\>

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

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`mergeNodeData`](/en/reference/api/graphojs/classes/model/#mergenodedata)

***

### relinkNodeData()

> **relinkNodeData**(`nodeKey`, `newKey`): `void`

Defined in: [model/GraphLinksModel.ts:103](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L103)

GoJS-compatible: Relink a node: update all links to/from the old key to the new key.

#### Parameters

##### nodeKey

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### newKey

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

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

#### Inherited from

[`Model`](/en/reference/api/graphojs/classes/model/).[`removeChangedListener`](/en/reference/api/graphojs/classes/model/#removechangedlistener)

***

### removeLink()

> **removeLink**(`key`): `boolean`

Defined in: [model/GraphLinksModel.ts:352](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L352)

Remove a link by key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`boolean`

***

### removeLinkData()

> **removeLinkData**(`key`): `boolean`

Defined in: [model/GraphLinksModel.ts:386](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L386)

GoJS-compatible: Remove a link data object (or its key) from the model.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

#### Returns

`boolean`

***

### removeLinksForNode()

> **removeLinksForNode**(`key`): `void`

Defined in: [model/GraphLinksModel.ts:413](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L413)

Remove all links connected to a node.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`void`

***

### removeNode()

> **removeNode**(`key`): `boolean`

Defined in: [model/GraphLinksModel.ts:424](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L424)

Override removeNode to also remove connected links.

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

### setLinkDataArray()

> **setLinkDataArray**(`value`): `void`

Defined in: [model/GraphLinksModel.ts:199](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L199)

Set all link data, assigning missing keys and emitting add/remove events.

#### Parameters

##### value

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

#### Returns

`void`

***

### setLinkKey()

> **setLinkKey**(`linkData`, `key`): `void`

Defined in: [model/GraphLinksModel.ts:241](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L241)

Set the key of a link data object.

#### Parameters

##### linkData

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`void`

***

### setLinkKeyProperty()

> **setLinkKeyProperty**(`property`): `void`

Defined in: [model/GraphLinksModel.ts:51](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L51)

Set the link key property name.

#### Parameters

##### property

`string`

#### Returns

`void`

***

### setLinkProperty()

> **setLinkProperty**(`key`, `propertyName`, `value`): `void`

Defined in: [model/GraphLinksModel.ts:253](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L253)

Set a property on a link.

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

### toIncrementalJson()

> **toIncrementalJson**(): `object`

Defined in: [model/GraphLinksModel.ts:444](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L444)

GoJS-compatible: Produce an incremental JSON representation based on
the current change log. Falls back to a full snapshot when no log exists.

#### Returns

`object`

##### modifiedLinkData?

> `optional` **modifiedLinkData?**: [`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)[]

##### modifiedNodeData?

> `optional` **modifiedNodeData?**: [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)[]

##### removedLinkIds?

> `optional` **removedLinkIds?**: [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)[]

##### removedNodeIds?

> `optional` **removedNodeIds?**: [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)[]

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

> **toJSON**(): [`GraphLinksModelJSON`](/en/reference/api/graphojs/interfaces/graphlinksmodeljson/)

Defined in: [model/GraphLinksModel.ts:430](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L430)

Convert to JSON.

#### Returns

[`GraphLinksModelJSON`](/en/reference/api/graphojs/interfaces/graphlinksmodeljson/)

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`toJSON`](/en/reference/api/graphojs/classes/model/#tojson-1)

***

### validateLink()

> **validateLink**(`linkData`): `boolean`

Defined in: [model/GraphLinksModel.ts:159](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L159)

Validate a link before it is added.
Checks self-loops, duplicates, and the user callback.

#### Parameters

##### linkData

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

#### Returns

`boolean`

***

### validateLinkRemoval()

> **validateLinkRemoval**(`linkData`): `boolean`

Defined in: [model/GraphLinksModel.ts:176](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L176)

Validate a link before it is removed.
Returns true if valid (allows removal).

#### Parameters

##### linkData

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

#### Returns

`boolean`

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

> `static` **fromJSON**(`json`): `GraphLinksModel`

Defined in: [model/GraphLinksModel.ts:515](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/model/GraphLinksModel.ts#L515)

Create from JSON.

#### Parameters

##### json

[`GraphLinksModelJSON`](/en/reference/api/graphojs/interfaces/graphlinksmodeljson/)

#### Returns

`GraphLinksModel`

#### Overrides

[`Model`](/en/reference/api/graphojs/classes/model/).[`fromJSON`](/en/reference/api/graphojs/classes/model/#fromjson)
