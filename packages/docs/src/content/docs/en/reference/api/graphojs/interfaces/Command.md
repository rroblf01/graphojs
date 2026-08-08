---
editUrl: false
next: false
prev: false
title: "Command"
---

Defined in: [undo/Command.ts:4](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/Command.ts#L4)

Interface for undoable commands.

## Methods

### describe()

> **describe**(): `string`

Defined in: [undo/Command.ts:12](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/Command.ts#L12)

Get a description of the command.

#### Returns

`string`

***

### execute()

> **execute**(): `void`

Defined in: [undo/Command.ts:6](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/Command.ts#L6)

Execute the command.

#### Returns

`void`

***

### undo()

> **undo**(): `void`

Defined in: [undo/Command.ts:9](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/Command.ts#L9)

Undo the command.

#### Returns

`void`
