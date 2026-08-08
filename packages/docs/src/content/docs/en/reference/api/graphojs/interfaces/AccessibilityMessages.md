---
editUrl: false
next: false
prev: false
title: "AccessibilityMessages"
---

Defined in: [diagram/Diagram.ts:131](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L131)

Message formatters for the diagram's accessibility features: the canvas
`aria-label` and the off-screen `aria-live` region announcements (see the
Interaction guide's Accessibility section). All defaults are in English;
override any subset via `DiagramOptions.accessibilityMessages` or
`diagram.accessibilityMessages = {...}` to localize.

 Still growing before 1.0.0 — expect additive changes, not
removals.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

## Methods

### ariaLabel()

> **ariaLabel**(`counts`): `string`

Defined in: [diagram/Diagram.ts:135](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L135)

The canvas `aria-label`, given the current content/selection counts.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### counts

###### groups

`number`

###### links

`number`

###### nodes

`number`

###### selected

`number`

#### Returns

`string`

***

### describePart()

> **describePart**(`part`): `string`

Defined in: [diagram/Diagram.ts:133](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L133)

Short description of a part, e.g. `Node "Alpha"` — used by the other messages below.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`string`

***

### focusMoved()

> **focusMoved**(`description`): `string`

Defined in: [diagram/Diagram.ts:143](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L143)

Announcement when the keyboard focus cursor moves (`description` from `describePart`).

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### description

`string`

#### Returns

`string`

***

### multipleSelected()

> **multipleSelected**(`count`): `string`

Defined in: [diagram/Diagram.ts:141](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L141)

Announcement when more than one part is selected.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### count

`number`

#### Returns

`string`

***

### partAdded()

> **partAdded**(`description`): `string`

Defined in: [diagram/Diagram.ts:145](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L145)

Announcement when a single part is added (e.g. via `ClickCreatingTool`).

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### description

`string`

#### Returns

`string`

***

### partsDeleted()

> **partsDeleted**(`count`): `string`

Defined in: [diagram/Diagram.ts:147](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L147)

Announcement when one or more parts are deleted (e.g. via `CommandHandler.deleteSelection`).

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### count

`number`

#### Returns

`string`

***

### redoPerformed()

> **redoPerformed**(`description`): `string`

Defined in: [diagram/Diagram.ts:151](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L151)

Announcement after a redo (`description` from the redone command's `describe()`).

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### description

`string`

#### Returns

`string`

***

### selectionCleared()

> **selectionCleared**(): `string`

Defined in: [diagram/Diagram.ts:137](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L137)

Announcement when the selection becomes empty.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Returns

`string`

***

### singleSelected()

> **singleSelected**(`description`): `string`

Defined in: [diagram/Diagram.ts:139](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L139)

Announcement when exactly one part is selected (`description` from `describePart`).

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### description

`string`

#### Returns

`string`

***

### treeCollapsed()

> **treeCollapsed**(`description`): `string`

Defined in: [diagram/Diagram.ts:153](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L153)

Announcement when a node's tree is collapsed (`description` from `describePart`).

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### description

`string`

#### Returns

`string`

***

### treeExpanded()

> **treeExpanded**(`description`): `string`

Defined in: [diagram/Diagram.ts:155](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L155)

Announcement when a node's tree is expanded (`description` from `describePart`).

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### description

`string`

#### Returns

`string`

***

### undoPerformed()

> **undoPerformed**(`description`): `string`

Defined in: [diagram/Diagram.ts:149](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L149)

Announcement after an undo (`description` from the undone command's `describe()`).

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### description

`string`

#### Returns

`string`
