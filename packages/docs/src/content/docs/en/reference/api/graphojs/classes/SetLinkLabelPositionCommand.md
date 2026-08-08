---
editUrl: false
next: false
prev: false
title: "SetLinkLabelPositionCommand"
---

Defined in: [undo/commands.ts:405](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L405)

Command to persist a manual link-label reposition (from
LinkLabelDraggingTool). There is no model-data field for a link's label
position, so this operates directly on the visual Link, like
[ReshapeLinkCommand](/en/reference/api/graphojs/classes/reshapelinkcommand/).

## Implements

- [`Command`](/en/reference/api/graphojs/interfaces/command/)

## Constructors

### Constructor

> **new SetLinkLabelPositionCommand**(`link`, `newPosition`, `oldPosition`): `SetLinkLabelPositionCommand`

Defined in: [undo/commands.ts:410](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L410)

#### Parameters

##### link

[`Link`](/en/reference/api/graphojs/classes/link/)

##### newPosition

[`LinkLabelPosition`](/en/reference/api/graphojs/interfaces/linklabelposition/)

##### oldPosition

[`LinkLabelPosition`](/en/reference/api/graphojs/interfaces/linklabelposition/)

#### Returns

`SetLinkLabelPositionCommand`

## Methods

### describe()

> **describe**(): `string`

Defined in: [undo/commands.ts:431](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L431)

Get a description of the command.

#### Returns

`string`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`describe`](/en/reference/api/graphojs/interfaces/command/#describe)

***

### execute()

> **execute**(): `void`

Defined in: [undo/commands.ts:423](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L423)

Execute the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`execute`](/en/reference/api/graphojs/interfaces/command/#execute)

***

### undo()

> **undo**(): `void`

Defined in: [undo/commands.ts:427](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/undo/commands.ts#L427)

Undo the command.

#### Returns

`void`

#### Implementation of

[`Command`](/en/reference/api/graphojs/interfaces/command/).[`undo`](/en/reference/api/graphojs/interfaces/command/#undo)
