---
editUrl: false
next: false
prev: false
title: "SetLinkPropertyCommand"
---

Defined in: [undo/commands.ts:231](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L231)

Command to change a link property.

## Implements

- [`Command`](/en/reference/api/graphojs/interfaces/command/)

## Constructors

### Constructor

> **new SetLinkPropertyCommand**(`model`, `linkKey`, `propertyName`, `newValue`): `SetLinkPropertyCommand`

Defined in: [undo/commands.ts:238](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L238)

#### Parameters

##### model

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

##### linkKey

`string` \| `number`

##### propertyName

`string`

##### newValue

`unknown`

#### Returns

`SetLinkPropertyCommand`

## Methods

### describe()

> **describe**(): `string`

Defined in: [undo/commands.ts:259](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L259)

Get a description of the command.

#### Returns

`string`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`describe`](/en/reference/api/graphojs/interfaces/command/#describe)

***

### execute()

> **execute**(): `void`

Defined in: [undo/commands.ts:250](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L250)

Execute the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`execute`](/en/reference/api/graphojs/interfaces/command/#execute)

***

### undo()

> **undo**(): `void`

Defined in: [undo/commands.ts:255](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L255)

Undo the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`undo`](/en/reference/api/graphojs/interfaces/command/#undo)
