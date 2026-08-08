---
editUrl: false
next: false
prev: false
title: "AddNodeCommand"
---

Defined in: [undo/commands.ts:9](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L9)

Command to add a node to the model.

## Implements

- [`Command`](/en/reference/api/graphojs/interfaces/command/)

## Constructors

### Constructor

> **new AddNodeCommand**(`model`, `nodeData`): `AddNodeCommand`

Defined in: [undo/commands.ts:14](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L14)

#### Parameters

##### model

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`AddNodeCommand`

## Methods

### describe()

> **describe**(): `string`

Defined in: [undo/commands.ts:34](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L34)

Get a description of the command.

#### Returns

`string`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`describe`](/en/reference/api/graphojs/interfaces/command/#describe)

***

### execute()

> **execute**(): `void`

Defined in: [undo/commands.ts:19](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L19)

Execute the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`execute`](/en/reference/api/graphojs/interfaces/command/#execute)

***

### undo()

> **undo**(): `void`

Defined in: [undo/commands.ts:29](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L29)

Undo the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`undo`](/en/reference/api/graphojs/interfaces/command/#undo)
