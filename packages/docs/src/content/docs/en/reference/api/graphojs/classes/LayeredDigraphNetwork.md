---
editUrl: false
next: false
prev: false
title: "LayeredDigraphNetwork"
---

Defined in: [layout/LayeredDigraphNetwork.ts:29](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayeredDigraphNetwork.ts#L29)

A network of layout vertices and edges built from the diagram's
nodes and links. GoJS-compatible.

## Extends

- [`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/)

## Constructors

### Constructor

> **new LayeredDigraphNetwork**(): `LayeredDigraphNetwork`

#### Returns

`LayeredDigraphNetwork`

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`constructor`](/en/reference/api/graphojs/classes/layoutnetwork/#constructor)

## Properties

### edges

> **edges**: [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:88](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L88)

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`edges`](/en/reference/api/graphojs/classes/layoutnetwork/#edges)

***

### vertices

> **vertices**: [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:87](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L87)

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`vertices`](/en/reference/api/graphojs/classes/layoutnetwork/#vertices)

## Methods

### addEdge()

> **addEdge**(`edge`, `vertexForNode?`): `void`

Defined in: [layout/LayoutNetwork.ts:118](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L118)

Add an edge, connecting the vertices of its link's endpoints.

#### Parameters

##### edge

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

##### vertexForNode?

(`key`) => [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

#### Returns

`void`

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`addEdge`](/en/reference/api/graphojs/classes/layoutnetwork/#addedge)

***

### addLink()

> **addLink**(`link`, `vertexForNode?`): [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

Defined in: [layout/LayoutNetwork.ts:111](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L111)

Add an edge for a link, connecting the vertices of its endpoints.

#### Parameters

##### link

[`Link`](/en/reference/api/graphojs/classes/link/)

##### vertexForNode?

(`key`) => [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

#### Returns

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`addLink`](/en/reference/api/graphojs/classes/layoutnetwork/#addlink)

***

### addNode()

> **addNode**(`node`): [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

Defined in: [layout/LayoutNetwork.ts:96](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L96)

Add a vertex for a node.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`addNode`](/en/reference/api/graphojs/classes/layoutnetwork/#addnode)

***

### addVertex()

> **addVertex**(`vertex`): `void`

Defined in: [layout/LayoutNetwork.ts:103](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L103)

Add a vertex.

#### Parameters

##### vertex

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

#### Returns

`void`

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`addVertex`](/en/reference/api/graphojs/classes/layoutnetwork/#addvertex)

***

### clear()

> **clear**(): `void`

Defined in: [layout/LayoutNetwork.ts:165](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L165)

Remove all vertices and edges.

#### Returns

`void`

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`clear`](/en/reference/api/graphojs/classes/layoutnetwork/#clear)

***

### deleteEdge()

> **deleteEdge**(`edge`): `void`

Defined in: [layout/LayoutNetwork.ts:149](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L149)

Remove an edge and disconnect it from its vertices.

#### Parameters

##### edge

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

#### Returns

`void`

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`deleteEdge`](/en/reference/api/graphojs/classes/layoutnetwork/#deleteedge)

***

### deleteVertex()

> **deleteVertex**(`vertex`): `void`

Defined in: [layout/LayoutNetwork.ts:140](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L140)

Remove a vertex and its connected edges.

#### Parameters

##### vertex

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

#### Returns

`void`

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`deleteVertex`](/en/reference/api/graphojs/classes/layoutnetwork/#deletevertex)

***

### findVertex()

> **findVertex**(`key`): [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

Defined in: [layout/LayoutNetwork.ts:91](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L91)

Find a vertex by its node key.

#### Parameters

##### key

`unknown`

#### Returns

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`findVertex`](/en/reference/api/graphojs/classes/layoutnetwork/#findvertex)

***

### fromParts()

> `static` **fromParts**(`nodes`, `links`): [`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/)

Defined in: [layout/LayoutNetwork.ts:171](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/LayoutNetwork.ts#L171)

Build a network from the given nodes and links.

#### Parameters

##### nodes

[`Node`](/en/reference/api/graphojs/classes/node/)[]

##### links

[`Link`](/en/reference/api/graphojs/classes/link/)[]

#### Returns

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/)

#### Inherited from

[`LayoutNetwork`](/en/reference/api/graphojs/classes/layoutnetwork/).[`fromParts`](/en/reference/api/graphojs/classes/layoutnetwork/#fromparts)
