---
editUrl: false
next: false
prev: false
title: "Transaction"
---

Defined in: [undo/Transaction.ts:7](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L7)

A transaction groups multiple commands into a single undoable unit.
All sub-commands are executed together and undone together.

## Implements

- [`Command`](/en/reference/api/graphojs/interfaces/command/)

## Constructors

### Constructor

> **new Transaction**(`name?`): `Transaction`

Defined in: [undo/Transaction.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L11)

#### Parameters

##### name?

`string` = `'Transaction'`

#### Returns

`Transaction`

## Accessors

### isEmpty

#### Get Signature

> **get** **isEmpty**(): `boolean`

Defined in: [undo/Transaction.ts:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L26)

Whether this transaction has no commands.

##### Returns

`boolean`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [undo/Transaction.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L16)

The name of this transaction.

##### Returns

`string`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [undo/Transaction.ts:21](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L21)

Get the number of sub-commands in this transaction.

##### Returns

`number`

## Methods

### add()

> **add**(`command`): `this`

Defined in: [undo/Transaction.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L31)

Add a command to this transaction.

#### Parameters

##### command

[`Command`](/en/reference/api/graphojs/interfaces/command/)

#### Returns

`this`

***

### clear()

> **clear**(): `void`

Defined in: [undo/Transaction.ts:42](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L42)

Clear all commands in this transaction.

#### Returns

`void`

***

### describe()

> **describe**(): `string`

Defined in: [undo/Transaction.ts:61](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L61)

Get a description of this transaction.

#### Returns

`string`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`describe`](/en/reference/api/graphojs/interfaces/command/#describe)

***

### execute()

> **execute**(): `void`

Defined in: [undo/Transaction.ts:47](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L47)

Execute all commands in order.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`execute`](/en/reference/api/graphojs/interfaces/command/#execute)

***

### removeLast()

> **removeLast**(): [`Command`](/en/reference/api/graphojs/interfaces/command/) \| `null`

Defined in: [undo/Transaction.ts:37](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L37)

Remove the last added command.

#### Returns

[`Command`](/en/reference/api/graphojs/interfaces/command/) \| `null`

***

### undo()

> **undo**(): `void`

Defined in: [undo/Transaction.ts:54](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Transaction.ts#L54)

Undo all commands in reverse order.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`undo`](/en/reference/api/graphojs/interfaces/command/#undo)
