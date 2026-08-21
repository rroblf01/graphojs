---
editUrl: false
next: false
prev: false
title: "TreeVertex"
---

Defined in: [layout/TreeNetworkTypes.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeNetworkTypes.ts#L14)

GoJS-compatible: `TreeLayout`'s specialized vertex/edge/network
subclasses. Real, constructible classes with the documented extra
properties — but graphojs's `TreeLayout` computes tree structure
internally rather than through these subclasses, so overriding them has
no effect on layout results. They exist for API parity with code ported
from GoJS that references these types directly. Named `TreeNetworkTypes`
(not `TreeNetwork`) to avoid clashing with `model/TreeModel`-adjacent
naming elsewhere in graphojs.

## Extends

- [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

## Constructors

### Constructor

> **new TreeVertex**(`node?`): `TreeVertex`

Defined in: [layout/LayoutNetwork.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L17)

#### Parameters

##### node?

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

#### Returns

`TreeVertex`

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`constructor`](/en/reference/api/graphojs/classes/layoutvertex/#constructor)

## Properties

### bounds

> **bounds**: [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [layout/LayoutNetwork.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L11)

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`bounds`](/en/reference/api/graphojs/classes/layoutvertex/#bounds)

***

### children

> **children**: `TreeVertex`[] = `[]`

Defined in: [layout/TreeNetworkTypes.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeNetworkTypes.ts#L17)

***

### destinationEdges

> **destinationEdges**: [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L13)

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`destinationEdges`](/en/reference/api/graphojs/classes/layoutvertex/#destinationedges)

***

### edges

> **edges**: [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:12](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L12)

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`edges`](/en/reference/api/graphojs/classes/layoutvertex/#edges)

***

### index

> **index**: `number` = `-1`

Defined in: [layout/LayoutNetwork.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L15)

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`index`](/en/reference/api/graphojs/classes/layoutvertex/#index)

***

### initialized

> **initialized**: `boolean` = `false`

Defined in: [layout/TreeNetworkTypes.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeNetworkTypes.ts#L15)

***

### level

> **level**: `number` = `0`

Defined in: [layout/TreeNetworkTypes.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeNetworkTypes.ts#L18)

***

### node

> **node**: [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [layout/LayoutNetwork.ts:10](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L10)

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`node`](/en/reference/api/graphojs/classes/layoutvertex/#node)

***

### parent

> **parent**: `TreeVertex` \| `null` = `null`

Defined in: [layout/TreeNetworkTypes.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/TreeNetworkTypes.ts#L16)

***

### sourceEdges

> **sourceEdges**: [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L14)

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`sourceEdges`](/en/reference/api/graphojs/classes/layoutvertex/#sourceedges)

## Accessors

### centerX

#### Get Signature

> **get** **centerX**(): `number`

Defined in: [layout/LayoutNetwork.ts:50](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L50)

Center point of the vertex bounds.

##### Returns

`number`

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`centerX`](/en/reference/api/graphojs/classes/layoutvertex/#centerx)

***

### centerY

#### Get Signature

> **get** **centerY**(): `number`

Defined in: [layout/LayoutNetwork.ts:54](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L54)

##### Returns

`number`

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`centerY`](/en/reference/api/graphojs/classes/layoutvertex/#centery)

***

### degree

#### Get Signature

> **get** **degree**(): `number`

Defined in: [layout/LayoutNetwork.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L25)

Whether this vertex has any edges.

##### Returns

`number`

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`degree`](/en/reference/api/graphojs/classes/layoutvertex/#degree)

***

### inDegree

#### Get Signature

> **get** **inDegree**(): `number`

Defined in: [layout/LayoutNetwork.ts:30](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L30)

The edges coming INTO this vertex.

##### Returns

`number`

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`inDegree`](/en/reference/api/graphojs/classes/layoutvertex/#indegree)

***

### isLeaf

#### Get Signature

> **get** **isLeaf**(): `boolean`

Defined in: [layout/LayoutNetwork.ts:45](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L45)

Whether this vertex has no outgoing edges (a leaf).

##### Returns

`boolean`

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`isLeaf`](/en/reference/api/graphojs/classes/layoutvertex/#isleaf)

***

### isRoot

#### Get Signature

> **get** **isRoot**(): `boolean`

Defined in: [layout/LayoutNetwork.ts:40](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L40)

Whether this vertex has no incoming edges (a root).

##### Returns

`boolean`

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`isRoot`](/en/reference/api/graphojs/classes/layoutvertex/#isroot)

***

### outDegree

#### Get Signature

> **get** **outDegree**(): `number`

Defined in: [layout/LayoutNetwork.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L35)

The edges going OUT of this vertex.

##### Returns

`number`

#### Inherited from

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/).[`outDegree`](/en/reference/api/graphojs/classes/layoutvertex/#outdegree)
