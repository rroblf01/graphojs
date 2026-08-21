---
editUrl: false
next: false
prev: false
title: "UndoManager"
---

Defined in: [undo/UndoManager.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L23)

Manages undo/redo history for a diagram.

## Constructors

### Constructor

> **new UndoManager**(`maxHistorySize?`): `UndoManager`

Defined in: [undo/UndoManager.ts:32](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L32)

#### Parameters

##### maxHistorySize?

`number` = `100`

#### Returns

`UndoManager`

## Accessors

### clearsHistory

#### Get Signature

> **get** **clearsHistory**(): `boolean`

Defined in: [undo/UndoManager.ts:57](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L57)

GoJS-compatible: Whether undo/redo history is cleared by non-undoable actions.

##### Returns

`boolean`

#### Set Signature

> **set** **clearsHistory**(`value`): `void`

Defined in: [undo/UndoManager.ts:61](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L61)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isEnabled

#### Get Signature

> **get** **isEnabled**(): `boolean`

Defined in: [undo/UndoManager.ts:37](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L37)

GoJS-compatible: Whether undo/redo is enabled.

##### Returns

`boolean`

#### Set Signature

> **set** **isEnabled**(`value`): `void`

Defined in: [undo/UndoManager.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L41)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isUndoingRedoing

#### Get Signature

> **get** **isUndoingRedoing**(): `boolean`

Defined in: [undo/UndoManager.ts:84](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L84)

GoJS-compatible: Whether the UndoManager is currently undoing or redoing.

##### Returns

`boolean`

***

### maxHistoryLength

#### Get Signature

> **get** **maxHistoryLength**(): `number`

Defined in: [undo/UndoManager.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L46)

GoJS-compatible: The maximum number of undo/redo steps kept in history.

##### Returns

`number`

#### Set Signature

> **set** **maxHistoryLength**(`value`): `void`

Defined in: [undo/UndoManager.ts:50](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L50)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### skipUndoManager

#### Get Signature

> **get** **skipUndoManager**(): `boolean`

Defined in: [undo/UndoManager.ts:75](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L75)

##### Returns

`boolean`

#### Set Signature

> **set** **skipUndoManager**(`value`): `void`

Defined in: [undo/UndoManager.ts:79](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L79)

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### addListener()

> **addListener**(`listener`): `void`

Defined in: [undo/UndoManager.ts:258](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L258)

Add a change listener.

#### Parameters

##### listener

[`UndoManagerEventHandler`](/en/reference/api/graphojs/type-aliases/undomanagereventhandler/)

#### Returns

`void`

***

### beginTransaction()

> **beginTransaction**(`name?`): `void`

Defined in: [undo/UndoManager.ts:120](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L120)

Begin a transaction. Commands executed afterward are grouped into one undo unit.

#### Parameters

##### name?

`string` = `'Transaction'`

#### Returns

`void`

***

### canRedo()

> **canRedo**(): `boolean`

Defined in: [undo/UndoManager.ts:224](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L224)

Check if redo is available.

#### Returns

`boolean`

***

### canUndo()

> **canUndo**(): `boolean`

Defined in: [undo/UndoManager.ts:219](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L219)

Check if undo is available.

#### Returns

`boolean`

***

### clear()

> **clear**(): `void`

Defined in: [undo/UndoManager.ts:251](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L251)

Clear all history.

#### Returns

`void`

***

### commitTransaction()

> **commitTransaction**(): [`Transaction`](/en/reference/api/graphojs/classes/transaction/) \| `null`

Defined in: [undo/UndoManager.ts:128](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L128)

Commit the current transaction as a single undoable command.
Returns the committed transaction, or null if no transaction is open.

#### Returns

[`Transaction`](/en/reference/api/graphojs/classes/transaction/) \| `null`

***

### execute()

> **execute**(`command`): `void`

Defined in: [undo/UndoManager.ts:89](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L89)

Execute a command and add it to the undo stack.

#### Parameters

##### command

[`Command`](/en/reference/api/graphojs/interfaces/command/)

#### Returns

`void`

***

### getRedoDescription()

> **getRedoDescription**(): `string` \| `null`

Defined in: [undo/UndoManager.ts:245](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L245)

Get the description of the next redo command.

#### Returns

`string` \| `null`

***

### getRedoStack()

> **getRedoStack**(): readonly [`Command`](/en/reference/api/graphojs/interfaces/command/)[]

Defined in: [undo/UndoManager.ts:234](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L234)

Get the redo stack.

#### Returns

readonly [`Command`](/en/reference/api/graphojs/interfaces/command/)[]

***

### getTransactionDepth()

> **getTransactionDepth**(): `number`

Defined in: [undo/UndoManager.ts:178](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L178)

Get the depth of open transactions.

#### Returns

`number`

***

### getUndoDescription()

> **getUndoDescription**(): `string` \| `null`

Defined in: [undo/UndoManager.ts:239](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L239)

Get the description of the next undo command.

#### Returns

`string` \| `null`

***

### getUndoStack()

> **getUndoStack**(): readonly [`Command`](/en/reference/api/graphojs/interfaces/command/)[]

Defined in: [undo/UndoManager.ts:229](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L229)

Get the undo stack.

#### Returns

readonly [`Command`](/en/reference/api/graphojs/interfaces/command/)[]

***

### isTransactionOpen()

> **isTransactionOpen**(): `boolean`

Defined in: [undo/UndoManager.ts:173](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L173)

Check whether a transaction is currently open.

#### Returns

`boolean`

***

### redo()

> **redo**(): `boolean`

Defined in: [undo/UndoManager.ts:201](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L201)

Redo the last undone command.

#### Returns

`boolean`

***

### removeListener()

> **removeListener**(`listener`): `void`

Defined in: [undo/UndoManager.ts:263](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L263)

Remove a change listener.

#### Parameters

##### listener

[`UndoManagerEventHandler`](/en/reference/api/graphojs/type-aliases/undomanagereventhandler/)

#### Returns

`void`

***

### rollbackTransaction()

> **rollbackTransaction**(): `boolean`

Defined in: [undo/UndoManager.ts:161](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L161)

Roll back (cancel) the current transaction, undoing its commands.
Returns true if a transaction was rolled back.

#### Returns

`boolean`

***

### setTransactionIsSeparateFromHistory()

> **setTransactionIsSeparateFromHistory**(): `void`

Defined in: [undo/UndoManager.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L70)

GoJS-compatible: Mark the current transaction as separate from history.
No-op: GraphoJS doesn't yet distinguish "separate from history"
transactions from regular ones.

#### Returns

`void`

***

### undo()

> **undo**(): `boolean`

Defined in: [undo/UndoManager.ts:183](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/UndoManager.ts#L183)

Undo the last command.

#### Returns

`boolean`
