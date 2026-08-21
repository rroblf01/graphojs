---
editUrl: false
next: false
prev: false
title: "LayeredDigraphEdge"
---

Defined in: [layout/LayeredDigraphNetwork.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayeredDigraphNetwork.ts#L20)

An edge in a layout network, representing a link.
GoJS-compatible structure.

## Extends

- [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

## Constructors

### Constructor

> **new LayeredDigraphEdge**(`link?`): `LayeredDigraphEdge`

Defined in: [layout/LayoutNetwork.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L70)

#### Parameters

##### link?

[`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

#### Returns

`LayeredDigraphEdge`

#### Inherited from

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/).[`constructor`](/en/reference/api/graphojs/classes/layoutedge/#constructor)

## Properties

### forest

> **forest**: `boolean` = `false`

Defined in: [layout/LayeredDigraphNetwork.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayeredDigraphNetwork.ts#L25)

***

### fromVertex

> **fromVertex**: [`LayeredDigraphVertex`](/en/reference/api/graphojs/classes/layereddigraphvertex/) \| `null`

Defined in: [layout/LayeredDigraphNetwork.ts:21](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayeredDigraphNetwork.ts#L21)

#### Overrides

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/).[`fromVertex`](/en/reference/api/graphojs/classes/layoutedge/#fromvertex)

***

### isOrthogonal

> **isOrthogonal**: `boolean` = `false`

Defined in: [layout/LayoutNetwork.ts:67](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L67)

#### Inherited from

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/).[`isOrthogonal`](/en/reference/api/graphojs/classes/layoutedge/#isorthogonal)

***

### isTreeEdge

> **isTreeEdge**: `boolean` = `false`

Defined in: [layout/LayoutNetwork.ts:68](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L68)

#### Inherited from

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/).[`isTreeEdge`](/en/reference/api/graphojs/classes/layoutedge/#istreeedge)

***

### link

> **link**: [`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

Defined in: [layout/LayoutNetwork.ts:64](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L64)

#### Inherited from

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/).[`link`](/en/reference/api/graphojs/classes/layoutedge/#link)

***

### portFromPos

> **portFromPos**: `number` = `Number.NaN`

Defined in: [layout/LayeredDigraphNetwork.ts:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayeredDigraphNetwork.ts#L26)

***

### rev

> **rev**: `boolean` = `false`

Defined in: [layout/LayeredDigraphNetwork.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayeredDigraphNetwork.ts#L24)

***

### toVertex

> **toVertex**: [`LayeredDigraphVertex`](/en/reference/api/graphojs/classes/layereddigraphvertex/) \| `null`

Defined in: [layout/LayeredDigraphNetwork.ts:22](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayeredDigraphNetwork.ts#L22)

#### Overrides

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/).[`toVertex`](/en/reference/api/graphojs/classes/layoutedge/#tovertex)

***

### valid

> **valid**: `boolean` = `true`

Defined in: [layout/LayeredDigraphNetwork.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayeredDigraphNetwork.ts#L23)

## Methods

### getOtherVertex()

> **getOtherVertex**(`vertex`): [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

Defined in: [layout/LayoutNetwork.ts:75](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L75)

The other vertex, given one endpoint.

#### Parameters

##### vertex

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

#### Returns

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

#### Inherited from

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/).[`getOtherVertex`](/en/reference/api/graphojs/classes/layoutedge/#getothervertex)
