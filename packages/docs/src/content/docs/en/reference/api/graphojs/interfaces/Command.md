---
editUrl: false
next: false
prev: false
title: "Command"
---

Defined in: [undo/Command.ts:4](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Command.ts#L4)

Interface for undoable commands.

## Methods

### describe()

> **describe**(): `string`

Defined in: [undo/Command.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Command.ts#L12)

Get a description of the command.

#### Returns

`string`

***

### execute()

> **execute**(): `void`

Defined in: [undo/Command.ts:6](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Command.ts#L6)

Execute the command.

#### Returns

`void`

***

### undo()

> **undo**(): `void`

Defined in: [undo/Command.ts:9](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/Command.ts#L9)

Undo the command.

#### Returns

`void`
