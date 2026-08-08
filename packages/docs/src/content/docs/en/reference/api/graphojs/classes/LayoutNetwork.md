---
editUrl: false
next: false
prev: false
title: "LayoutNetwork"
---

Defined in: [layout/LayoutNetwork.ts:86](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L86)

A network of layout vertices and edges built from the diagram's
nodes and links. GoJS-compatible.

## Constructors

### Constructor

> **new LayoutNetwork**(): `LayoutNetwork`

#### Returns

`LayoutNetwork`

## Properties

### edges

> **edges**: [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:88](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L88)

***

### vertices

> **vertices**: [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:87](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L87)

## Methods

### addEdge()

> **addEdge**(`edge`, `vertexForNode?`): `void`

Defined in: [layout/LayoutNetwork.ts:118](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L118)

Add an edge, connecting the vertices of its link's endpoints.

#### Parameters

##### edge

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

##### vertexForNode?

(`key`) => [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

#### Returns

`void`

***

### addLink()

> **addLink**(`link`, `vertexForNode?`): [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

Defined in: [layout/LayoutNetwork.ts:111](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L111)

Add an edge for a link, connecting the vertices of its endpoints.

#### Parameters

##### link

[`Link`](/en/reference/api/graphojs/classes/link/)

##### vertexForNode?

(`key`) => [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

#### Returns

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

***

### addNode()

> **addNode**(`node`): [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

Defined in: [layout/LayoutNetwork.ts:96](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L96)

Add a vertex for a node.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

***

### addVertex()

> **addVertex**(`vertex`): `void`

Defined in: [layout/LayoutNetwork.ts:103](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L103)

Add a vertex.

#### Parameters

##### vertex

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [layout/LayoutNetwork.ts:165](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L165)

Remove all vertices and edges.

#### Returns

`void`

***

### deleteEdge()

> **deleteEdge**(`edge`): `void`

Defined in: [layout/LayoutNetwork.ts:149](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L149)

Remove an edge and disconnect it from its vertices.

#### Parameters

##### edge

[`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)

#### Returns

`void`

***

### deleteVertex()

> **deleteVertex**(`vertex`): `void`

Defined in: [layout/LayoutNetwork.ts:140](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L140)

Remove a vertex and its connected edges.

#### Parameters

##### vertex

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/)

#### Returns

`void`

***

### findVertex()

> **findVertex**(`key`): [`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

Defined in: [layout/LayoutNetwork.ts:91](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L91)

Find a vertex by its node key.

#### Parameters

##### key

`unknown`

#### Returns

[`LayoutVertex`](/en/reference/api/graphojs/classes/layoutvertex/) \| `null`

***

### fromParts()

> `static` **fromParts**(`nodes`, `links`): `LayoutNetwork`

Defined in: [layout/LayoutNetwork.ts:171](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L171)

Build a network from the given nodes and links.

#### Parameters

##### nodes

[`Node`](/en/reference/api/graphojs/classes/node/)[]

##### links

[`Link`](/en/reference/api/graphojs/classes/link/)[]

#### Returns

`LayoutNetwork`
