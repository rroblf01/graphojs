---
editUrl: false
next: false
prev: false
title: "Layout"
---

Defined in: [layout/Layout.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L23)

Abstract base class for diagram layouts.

## Extended by

- [`CircularLayout`](/en/reference/api/graphojs/classes/circularlayout/)
- [`ForceDirectedLayout`](/en/reference/api/graphojs/classes/forcedirectedlayout/)
- [`GridLayout`](/en/reference/api/graphojs/classes/gridlayout/)
- [`LayeredDigraphLayout`](/en/reference/api/graphojs/classes/layereddigraphlayout/)
- [`SpotLayout`](/en/reference/api/graphojs/classes/spotlayout/)
- [`TreeLayout`](/en/reference/api/graphojs/classes/treelayout/)

## Constructors

### Constructor

> **new Layout**(`options?`): `Layout`

Defined in: [layout/Layout.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L36)

#### Parameters

##### options?

[`LayoutOptions`](/en/reference/api/graphojs/interfaces/layoutoptions/) = `{}`

#### Returns

`Layout`

## Properties

### diagram

> **diagram**: [`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null` = `null`

Defined in: [layout/Layout.ts:34](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L34)

GoJS-compatible: the Diagram this layout is assigned to (set by
`Diagram.layout = ...`), used by `doLayout()` when called with no
explicit collection.

## Accessors

### isFinal

#### Get Signature

> **get** **isFinal**(): `boolean`

Defined in: [layout/Layout.ts:234](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L234)

GoJS-compatible: Whether this is the final layout of a cycle.

##### Returns

`boolean`

#### Set Signature

> **set** **isFinal**(`value`): `void`

Defined in: [layout/Layout.ts:238](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L238)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isInitial

#### Get Signature

> **get** **isInitial**(): `boolean`

Defined in: [layout/Layout.ts:225](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L225)

GoJS-compatible: Whether this is the initial layout of the diagram.

##### Returns

`boolean`

#### Set Signature

> **set** **isInitial**(`value`): `void`

Defined in: [layout/Layout.ts:229](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L229)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isOngoing

#### Get Signature

> **get** **isOngoing**(): `boolean`

Defined in: [layout/Layout.ts:243](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L243)

GoJS-compatible: Whether the layout is ongoing (auto-layout is active).

##### Returns

`boolean`

#### Set Signature

> **set** **isOngoing**(`value`): `void`

Defined in: [layout/Layout.ts:247](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L247)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### network

#### Get Signature

> **get** **network**(): [`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/) \| `null`

Defined in: [layout/Layout.ts:200](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L200)

GoJS-compatible: The current layout network (or null).

##### Returns

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/) \| `null`

#### Set Signature

> **set** **network**(`value`): `void`

Defined in: [layout/Layout.ts:204](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L204)

##### Parameters

###### value

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/) \| `null`

##### Returns

`void`

## Methods

### apply()

> `abstract` **apply**(`nodes`, `links`): `void`

Defined in: [layout/Layout.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L46)

Apply the layout to the given nodes and links.

#### Parameters

##### nodes

[`Node`](/en/reference/api/graphojs/classes/node/)[]

##### links

[`Link`](/en/reference/api/graphojs/classes/link/)[]

#### Returns

`void`

***

### doLayout()

> **doLayout**(`collection?`): `void`

Defined in: [layout/Layout.ts:176](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L176)

GoJS-compatible: Perform the layout on a collection of parts (or this diagram's parts).

#### Parameters

##### collection?

###### links?

readonly [`Link`](/en/reference/api/graphojs/classes/link/)[]

###### nodes?

readonly [`Node`](/en/reference/api/graphojs/classes/node/)[]

#### Returns

`void`

***

### layoutParts()

> **layoutParts**(`parts`): `void`

Defined in: [layout/Layout.ts:183](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L183)

GoJS-compatible: Perform the layout on the given parts.

#### Parameters

##### parts

readonly [`Part`](/en/reference/api/graphojs/classes/part/)[]

#### Returns

`void`
