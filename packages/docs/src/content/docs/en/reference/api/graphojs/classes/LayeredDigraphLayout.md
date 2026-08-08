---
editUrl: false
next: false
prev: false
title: "LayeredDigraphLayout"
---

Defined in: [layout/LayeredDigraphLayout.ts:26](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayeredDigraphLayout.ts#L26)

A layered (Sugiyama-style) layout for directed graphs.
Assigns nodes to layers based on their longest path from the roots,
then orders nodes within each layer to reduce edge crossings.

## Extends

- [`Layout`](/en/reference/api/graphojs/classes/layout/)

## Constructors

### Constructor

> **new LayeredDigraphLayout**(`options?`): `LayeredDigraphLayout`

Defined in: [layout/LayeredDigraphLayout.ts:30](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayeredDigraphLayout.ts#L30)

#### Parameters

##### options?

[`LayeredDigraphLayoutOptions`](/en/reference/api/graphojs/interfaces/layereddigraphlayoutoptions/) = `{}`

#### Returns

`LayeredDigraphLayout`

#### Overrides

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`constructor`](/en/reference/api/graphojs/classes/layout/#constructor)

## Properties

### diagram

> **diagram**: [`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null` = `null`

Defined in: [layout/Layout.ts:34](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L34)

GoJS-compatible: the Diagram this layout is assigned to (set by
`Diagram.layout = ...`), used by `doLayout()` when called with no
explicit collection.

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`diagram`](/en/reference/api/graphojs/classes/layout/#diagram)

## Accessors

### isFinal

#### Get Signature

> **get** **isFinal**(): `boolean`

Defined in: [layout/Layout.ts:234](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L234)

GoJS-compatible: Whether this is the final layout of a cycle.

##### Returns

`boolean`

#### Set Signature

> **set** **isFinal**(`value`): `void`

Defined in: [layout/Layout.ts:238](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L238)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`isFinal`](/en/reference/api/graphojs/classes/layout/#isfinal)

***

### isInitial

#### Get Signature

> **get** **isInitial**(): `boolean`

Defined in: [layout/Layout.ts:225](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L225)

GoJS-compatible: Whether this is the initial layout of the diagram.

##### Returns

`boolean`

#### Set Signature

> **set** **isInitial**(`value`): `void`

Defined in: [layout/Layout.ts:229](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L229)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`isInitial`](/en/reference/api/graphojs/classes/layout/#isinitial)

***

### isOngoing

#### Get Signature

> **get** **isOngoing**(): `boolean`

Defined in: [layout/Layout.ts:243](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L243)

GoJS-compatible: Whether the layout is ongoing (auto-layout is active).

##### Returns

`boolean`

#### Set Signature

> **set** **isOngoing**(`value`): `void`

Defined in: [layout/Layout.ts:247](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L247)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`isOngoing`](/en/reference/api/graphojs/classes/layout/#isongoing)

***

### network

#### Get Signature

> **get** **network**(): [`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/) \| `null`

Defined in: [layout/Layout.ts:200](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L200)

GoJS-compatible: The current layout network (or null).

##### Returns

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/) \| `null`

#### Set Signature

> **set** **network**(`value`): `void`

Defined in: [layout/Layout.ts:204](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L204)

##### Parameters

###### value

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/) \| `null`

##### Returns

`void`

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`network`](/en/reference/api/graphojs/classes/layout/#network)

## Methods

### apply()

> **apply**(`nodes`, `links`): `void`

Defined in: [layout/LayeredDigraphLayout.ts:41](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayeredDigraphLayout.ts#L41)

Apply the layout to the given nodes and links.

#### Parameters

##### nodes

[`Node`](/en/reference/api/graphojs/classes/node/)[]

##### links

[`Link`](/en/reference/api/graphojs/classes/link/)[]

#### Returns

`void`

#### Overrides

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`apply`](/en/reference/api/graphojs/classes/layout/#apply)

***

### doLayout()

> **doLayout**(`collection?`): `void`

Defined in: [layout/Layout.ts:176](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L176)

GoJS-compatible: Perform the layout on a collection of parts (or this diagram's parts).

#### Parameters

##### collection?

###### links?

readonly [`Link`](/en/reference/api/graphojs/classes/link/)[]

###### nodes?

readonly [`Node`](/en/reference/api/graphojs/classes/node/)[]

#### Returns

`void`

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`doLayout`](/en/reference/api/graphojs/classes/layout/#dolayout)

***

### layoutParts()

> **layoutParts**(`parts`): `void`

Defined in: [layout/Layout.ts:183](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/Layout.ts#L183)

GoJS-compatible: Perform the layout on the given parts.

#### Parameters

##### parts

readonly [`Part`](/en/reference/api/graphojs/classes/part/)[]

#### Returns

`void`

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`layoutParts`](/en/reference/api/graphojs/classes/layout/#layoutparts)
