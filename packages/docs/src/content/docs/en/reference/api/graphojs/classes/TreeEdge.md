---
editUrl: false
next: false
prev: false
title: "TreeEdge"
---

Defined in: [layout/TreeNetworkTypes.ts:21](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeNetworkTypes.ts#L21)

An edge in a layout network, representing a link.
GoJS-compatible structure.

## Extends

- [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

## Constructors

### Constructor

> **new TreeEdge**(`link?`): `TreeEdge`

Defined in: [layout/LayoutNetwork.ts:70](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L70)

#### Parameters

##### link?

[`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

#### Returns

`TreeEdge`

#### Inherited from

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/).[`constructor`](/en/reference/api/graphojs/classes/layoutedge/#constructor)

## Properties

### fromVertex

> **fromVertex**: [`TreeVertex`](/en/reference/api/graphojs/classes/treevertex/)

Defined in: [layout/TreeNetworkTypes.ts:22](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeNetworkTypes.ts#L22)

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

### relativePoint

> **relativePoint**: [`Point`](/en/reference/api/graphojs/classes/point/)

Defined in: [layout/TreeNetworkTypes.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeNetworkTypes.ts#L24)

***

### toVertex

> **toVertex**: [`TreeVertex`](/en/reference/api/graphojs/classes/treevertex/) \| `null`

Defined in: [layout/TreeNetworkTypes.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeNetworkTypes.ts#L23)

#### Overrides

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/).[`toVertex`](/en/reference/api/graphojs/classes/layoutedge/#tovertex)

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
