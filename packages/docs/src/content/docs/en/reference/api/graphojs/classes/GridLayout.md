---
editUrl: false
next: false
prev: false
title: "GridLayout"
---

Defined in: [layout/GridLayout.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L24)

Grid layout arranges nodes in a grid pattern.

## Extends

- [`Layout`](/en/reference/api/graphojs/classes/layout/)

## Constructors

### Constructor

> **new GridLayout**(`options?`): `GridLayout`

Defined in: [layout/GridLayout.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L31)

#### Parameters

##### options?

[`GridLayoutOptions`](/en/reference/api/graphojs/interfaces/gridlayoutoptions/) = `{}`

#### Returns

`GridLayout`

#### Overrides

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`constructor`](/en/reference/api/graphojs/classes/layout/#constructor)

## Properties

### diagram

> **diagram**: [`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null` = `null`

Defined in: [layout/Layout.ts:34](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/Layout.ts#L34)

GoJS-compatible: the Diagram this layout is assigned to (set by
`Diagram.layout = ...`), used by `doLayout()` when called with no
explicit collection.

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`diagram`](/en/reference/api/graphojs/classes/layout/#diagram)

## Accessors

### columnSpacing

#### Get Signature

> **get** **columnSpacing**(): `number`

Defined in: [layout/GridLayout.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L41)

GoJS-compatible: Horizontal spacing between cells.

##### Returns

`number`

#### Set Signature

> **set** **columnSpacing**(`value`): `void`

Defined in: [layout/GridLayout.ts:45](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L45)

##### Parameters

###### value

`number`

##### Returns

`void`

***

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

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`isFinal`](/en/reference/api/graphojs/classes/layout/#isfinal)

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

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`isInitial`](/en/reference/api/graphojs/classes/layout/#isinitial)

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

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`isOngoing`](/en/reference/api/graphojs/classes/layout/#isongoing)

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

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`network`](/en/reference/api/graphojs/classes/layout/#network)

***

### rowSpacing

#### Get Signature

> **get** **rowSpacing**(): `number`

Defined in: [layout/GridLayout.ts:50](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L50)

GoJS-compatible: Vertical spacing between cells.

##### Returns

`number`

#### Set Signature

> **set** **rowSpacing**(`value`): `void`

Defined in: [layout/GridLayout.ts:54](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L54)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### wrappingColumn

#### Get Signature

> **get** **wrappingColumn**(): `number` \| `undefined`

Defined in: [layout/GridLayout.ts:71](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L71)

GoJS-compatible: The maximum number of cells in a row before wrapping.

##### Returns

`number` \| `undefined`

#### Set Signature

> **set** **wrappingColumn**(`value`): `void`

Defined in: [layout/GridLayout.ts:75](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L75)

##### Parameters

###### value

`number` \| `undefined`

##### Returns

`void`

***

### wrappingWidth

#### Get Signature

> **get** **wrappingWidth**(): `number`

Defined in: [layout/GridLayout.ts:62](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L62)

GoJS-compatible: The maximum width of a row of cells before wrapping.

##### Returns

`number`

#### Set Signature

> **set** **wrappingWidth**(`value`): `void`

Defined in: [layout/GridLayout.ts:66](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L66)

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### apply()

> **apply**(`nodes`, `_links`): `void`

Defined in: [layout/GridLayout.ts:90](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/GridLayout.ts#L90)

Apply the layout to the given nodes and links.

#### Parameters

##### nodes

[`Node`](/en/reference/api/graphojs/classes/node/)[]

##### \_links

[`Link`](/en/reference/api/graphojs/classes/link/)[]

#### Returns

`void`

#### Overrides

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`apply`](/en/reference/api/graphojs/classes/layout/#apply)

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

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`doLayout`](/en/reference/api/graphojs/classes/layout/#dolayout)

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

#### Inherited from

[`Layout`](/en/reference/api/graphojs/classes/layout/).[`layoutParts`](/en/reference/api/graphojs/classes/layout/#layoutparts)
