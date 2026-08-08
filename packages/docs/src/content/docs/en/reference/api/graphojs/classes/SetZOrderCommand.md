---
editUrl: false
next: false
prev: false
title: "SetZOrderCommand"
---

Defined in: [undo/commands.ts:325](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L325)

Command to change a part's z-order within its layer.

## Implements

- [`Command`](/en/reference/api/graphojs/interfaces/command/)

## Constructors

### Constructor

> **new SetZOrderCommand**(`model`, `key`, `newZOrder`): `SetZOrderCommand`

Defined in: [undo/commands.ts:331](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L331)

#### Parameters

##### model

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

##### key

`string` \| `number`

##### newZOrder

`number`

#### Returns

`SetZOrderCommand`

## Methods

### describe()

> **describe**(): `string`

Defined in: [undo/commands.ts:346](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L346)

Get a description of the command.

#### Returns

`string`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`describe`](/en/reference/api/graphojs/interfaces/command/#describe)

***

### execute()

> **execute**(): `void`

Defined in: [undo/commands.ts:337](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L337)

Execute the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`execute`](/en/reference/api/graphojs/interfaces/command/#execute)

***

### undo()

> **undo**(): `void`

Defined in: [undo/commands.ts:342](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L342)

Undo the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`undo`](/en/reference/api/graphojs/interfaces/command/#undo)
