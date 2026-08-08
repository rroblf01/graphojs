---
editUrl: false
next: false
prev: false
title: "TooltipManager"
---

Defined in: [export/TooltipManager.ts:17](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/TooltipManager.ts#L17)

Shows HTML tooltips for parts when hovering over them.
A part shows its tooltip when it has a non-empty `tooltip` text.

## Constructors

### Constructor

> **new TooltipManager**(`diagram`, `options?`): `TooltipManager`

Defined in: [export/TooltipManager.ts:25](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/TooltipManager.ts#L25)

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### options?

[`TooltipOptions`](/en/reference/api/graphojs/interfaces/tooltipoptions/) = `{}`

#### Returns

`TooltipManager`

## Accessors

### isTooltipVisible

#### Get Signature

> **get** **isTooltipVisible**(): `boolean`

Defined in: [export/TooltipManager.ts:53](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/TooltipManager.ts#L53)

Check whether a tooltip is currently visible.

##### Returns

`boolean`

## Methods

### destroy()

> **destroy**(): `void`

Defined in: [export/TooltipManager.ts:134](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/TooltipManager.ts#L134)

Destroy the tooltip manager.

#### Returns

`void`

***

### getCurrentPart()

> **getCurrentPart**(): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [export/TooltipManager.ts:48](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/TooltipManager.ts#L48)

Get the part currently showing a tooltip, or null.

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

***

### getElement()

> **getElement**(): `HTMLDivElement`

Defined in: [export/TooltipManager.ts:43](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/TooltipManager.ts#L43)

Get the tooltip DOM element.

#### Returns

`HTMLDivElement`

***

### handleMouseLeave()

> **handleMouseLeave**(): `void`

Defined in: [export/TooltipManager.ts:88](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/TooltipManager.ts#L88)

Called when the mouse leaves the canvas.

#### Returns

`void`

***

### handleMouseMove()

> **handleMouseMove**(`e`): `void`

Defined in: [export/TooltipManager.ts:61](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/TooltipManager.ts#L61)

Called on mouse move: decides whether to show a tooltip for the
part under the cursor.

#### Parameters

##### e

`MouseEvent`

#### Returns

`void`

***

### hide()

> **hide**(): `void`

Defined in: [export/TooltipManager.ts:118](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/TooltipManager.ts#L118)

Hide the tooltip.

#### Returns

`void`
