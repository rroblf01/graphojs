---
editUrl: false
next: false
prev: false
title: "AddLinkCommand"
---

Defined in: [undo/commands.ts:128](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L128)

Command to add a link to the model.

## Implements

- [`Command`](/en/reference/api/graphojs/interfaces/command/)

## Constructors

### Constructor

> **new AddLinkCommand**(`model`, `linkData`): `AddLinkCommand`

Defined in: [undo/commands.ts:132](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L132)

#### Parameters

##### model

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

##### linkData

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

#### Returns

`AddLinkCommand`

## Methods

### describe()

> **describe**(): `string`

Defined in: [undo/commands.ts:148](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L148)

Get a description of the command.

#### Returns

`string`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`describe`](/en/reference/api/graphojs/interfaces/command/#describe)

***

### execute()

> **execute**(): `void`

Defined in: [undo/commands.ts:137](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L137)

Execute the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`execute`](/en/reference/api/graphojs/interfaces/command/#execute)

***

### undo()

> **undo**(): `void`

Defined in: [undo/commands.ts:141](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L141)

Undo the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`undo`](/en/reference/api/graphojs/interfaces/command/#undo)
