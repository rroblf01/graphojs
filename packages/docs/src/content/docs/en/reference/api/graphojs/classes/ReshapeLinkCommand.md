---
editUrl: false
next: false
prev: false
title: "ReshapeLinkCommand"
---

Defined in: [undo/commands.ts:356](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L356)

Command to persist a manual link reshape (from LinkReshapingTool). There is
no model-data field for a link's path points, so this operates directly on
the visual Link's pathPoints/hasManualReshape rather than through the model.

## Implements

- [`Command`](/en/reference/api/graphojs/interfaces/command/)

## Constructors

### Constructor

> **new ReshapeLinkCommand**(`link`, `newPoints`, `oldPoints`, `oldHasManualReshape`): `ReshapeLinkCommand`

Defined in: [undo/commands.ts:362](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L362)

#### Parameters

##### link

[`Link`](/en/reference/api/graphojs/classes/link/)

##### newPoints

`object`[]

##### oldPoints

`object`[]

##### oldHasManualReshape

`boolean`

#### Returns

`ReshapeLinkCommand`

## Methods

### describe()

> **describe**(): `string`

Defined in: [undo/commands.ts:386](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L386)

Get a description of the command.

#### Returns

`string`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`describe`](/en/reference/api/graphojs/interfaces/command/#describe)

***

### execute()

> **execute**(): `void`

Defined in: [undo/commands.ts:374](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L374)

Execute the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`execute`](/en/reference/api/graphojs/interfaces/command/#execute)

***

### undo()

> **undo**(): `void`

Defined in: [undo/commands.ts:380](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/undo/commands.ts#L380)

Undo the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`undo`](/en/reference/api/graphojs/interfaces/command/#undo)
