---
editUrl: false
next: false
prev: false
title: "AccessibilityMessages"
---

Defined in: [diagram/Diagram.ts:150](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L150)

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

Defined in: [diagram/Diagram.ts:154](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L154)

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

Defined in: [diagram/Diagram.ts:152](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L152)

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

Defined in: [diagram/Diagram.ts:162](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L162)

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

Defined in: [diagram/Diagram.ts:160](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L160)

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

Defined in: [diagram/Diagram.ts:164](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L164)

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

Defined in: [diagram/Diagram.ts:166](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L166)

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

Defined in: [diagram/Diagram.ts:170](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L170)

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

Defined in: [diagram/Diagram.ts:156](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L156)

Announcement when the selection becomes empty.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Returns

`string`

***

### singleSelected()

> **singleSelected**(`description`): `string`

Defined in: [diagram/Diagram.ts:158](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L158)

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

Defined in: [diagram/Diagram.ts:172](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L172)

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

Defined in: [diagram/Diagram.ts:174](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L174)

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

Defined in: [diagram/Diagram.ts:168](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L168)

Announcement after an undo (`description` from the undone command's `describe()`).

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### description

`string`

#### Returns

`string`
