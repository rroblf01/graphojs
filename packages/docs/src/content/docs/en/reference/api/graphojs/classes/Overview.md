---
editUrl: false
next: false
prev: false
title: "Overview"
---

Defined in: [export/Overview.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Overview.ts#L12)

An overview shows a scaled-down view of the entire diagram.
Clicking or dragging on the overview pans the main diagram.

## Constructors

### Constructor

> **new Overview**(`container`, `diagram?`, `options?`): `Overview`

Defined in: [export/Overview.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Overview.ts#L23)

#### Parameters

##### container

`HTMLElement`

##### diagram?

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### options?

###### height?

`number`

###### width?

`number`

#### Returns

`Overview`

## Accessors

### observed

#### Get Signature

> **get** **observed**(): [`Diagram`](/en/reference/api/graphojs/classes/diagram/)

Defined in: [export/Overview.ts:69](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Overview.ts#L69)

GoJS-compatible: Get the observed diagram.

##### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Set Signature

> **set** **observed**(`value`): `void`

Defined in: [export/Overview.ts:74](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Overview.ts#L74)

GoJS-compatible: Set the diagram this overview observes.

##### Parameters

###### value

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### Returns

`void`

## Methods

### destroy()

> **destroy**(): `void`

Defined in: [export/Overview.ts:262](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Overview.ts#L262)

Destroy the overview and clean up.

#### Returns

`void`

***

### getCanvas()

> **getCanvas**(): `HTMLCanvasElement`

Defined in: [export/Overview.ts:64](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Overview.ts#L64)

Get the overview canvas element.

#### Returns

`HTMLCanvasElement`

***

### render()

> **render**(): `void`

Defined in: [export/Overview.ts:183](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/Overview.ts#L183)

Render the overview.

#### Returns

`void`
