---
editUrl: false
next: false
prev: false
title: "ModelTransactionCommand"
---

Defined in: [undo/ModelTransactionCommand.ts:9](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/ModelTransactionCommand.ts#L9)

A command that records model changed events during a transaction and
reverses them on undo (GoJS-compatible: model edits within a transaction
are undoable).

## Implements

- [`Command`](/en/reference/api/graphojs/interfaces/command/)

## Constructors

### Constructor

> **new ModelTransactionCommand**(`model`, `events`, `name?`): `ModelTransactionCommand`

Defined in: [undo/ModelTransactionCommand.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/ModelTransactionCommand.ts#L14)

#### Parameters

##### model

[`Model`](/en/reference/api/graphojs/classes/model/)

##### events

[`ChangedEvent`](/en/reference/api/graphojs/interfaces/changedevent/)[]

##### name?

`string` = `'transaction'`

#### Returns

`ModelTransactionCommand`

## Methods

### describe()

> **describe**(): `string`

Defined in: [undo/ModelTransactionCommand.ts:135](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/ModelTransactionCommand.ts#L135)

Get a description of the command.

#### Returns

`string`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`describe`](/en/reference/api/graphojs/interfaces/command/#describe)

***

### execute()

> **execute**(): `void`

Defined in: [undo/ModelTransactionCommand.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/ModelTransactionCommand.ts#L20)

Execute the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`execute`](/en/reference/api/graphojs/interfaces/command/#execute)

***

### undo()

> **undo**(): `void`

Defined in: [undo/ModelTransactionCommand.ts:28](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/ModelTransactionCommand.ts#L28)

Undo the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`undo`](/en/reference/api/graphojs/interfaces/command/#undo)
