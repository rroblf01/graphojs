---
editUrl: false
next: false
prev: false
title: "ContextMenu"
---

Defined in: [export/ContextMenu.ts:32](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ContextMenu.ts#L32)

A context menu for a diagram.
Right-clicking on a part or the background opens a menu with items.

## Constructors

### Constructor

> **new ContextMenu**(`diagram`, `options`): `ContextMenu`

Defined in: [export/ContextMenu.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ContextMenu.ts#L43)

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### options

[`ContextMenuOptions`](/en/reference/api/graphojs/interfaces/contextmenuoptions/)

#### Returns

`ContextMenu`

## Accessors

### isMenuOpen

#### Get Signature

> **get** **isMenuOpen**(): `boolean`

Defined in: [export/ContextMenu.ts:67](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ContextMenu.ts#L67)

Check if the menu is open.

##### Returns

`boolean`

## Methods

### close()

> **close**(): `void`

Defined in: [export/ContextMenu.ts:119](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ContextMenu.ts#L119)

Close the context menu.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: [export/ContextMenu.ts:218](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ContextMenu.ts#L218)

Destroy the context menu and clean up.

#### Returns

`void`

***

### getElement()

> **getElement**(): `HTMLDivElement`

Defined in: [export/ContextMenu.ts:62](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ContextMenu.ts#L62)

Get the menu DOM element.

#### Returns

`HTMLDivElement`

***

### getMenuPart()

> **getMenuPart**(): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [export/ContextMenu.ts:72](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ContextMenu.ts#L72)

Get the part the menu was opened on.

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

***

### handleContextMenu()

> **handleContextMenu**(`e`): `void`

Defined in: [export/ContextMenu.ts:210](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ContextMenu.ts#L210)

Handle a right-click (contextmenu) event.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

***

### open()

> **open**(`x`, `y`, `part`): `void`

Defined in: [export/ContextMenu.ts:95](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ContextMenu.ts#L95)

Open the context menu at a screen position.

#### Parameters

##### x

`number`

Screen X coordinate.

##### y

`number`

Screen Y coordinate.

##### part

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

The part that was right-clicked, or null for background.

#### Returns

`void`
