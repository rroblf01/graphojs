---
editUrl: false
next: false
prev: false
title: "LayoutEdge"
---

Defined in: [layout/LayoutNetwork.ts:63](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L63)

An edge in a layout network, representing a link.
GoJS-compatible structure.

## Constructors

### Constructor

> **new LayoutEdge**(`link?`): `LayoutEdge`

Defined in: [layout/LayoutNetwork.ts:70](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L70)

#### Parameters

##### link?

[`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

#### Returns

`LayoutEdge`

## Properties

### fromVertex

> **fromVertex**: [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null` = `null`

Defined in: [layout/LayoutNetwork.ts:65](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L65)

***

### isOrthogonal

> **isOrthogonal**: `boolean` = `false`

Defined in: [layout/LayoutNetwork.ts:67](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L67)

***

### isTreeEdge

> **isTreeEdge**: `boolean` = `false`

Defined in: [layout/LayoutNetwork.ts:68](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L68)

***

### link

> **link**: [`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

Defined in: [layout/LayoutNetwork.ts:64](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L64)

***

### toVertex

> **toVertex**: [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null` = `null`

Defined in: [layout/LayoutNetwork.ts:66](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L66)

## Methods

### getOtherVertex()

> **getOtherVertex**(`vertex`): [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

Defined in: [layout/LayoutNetwork.ts:75](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L75)

The other vertex, given one endpoint.

#### Parameters

##### vertex

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

#### Returns

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`
