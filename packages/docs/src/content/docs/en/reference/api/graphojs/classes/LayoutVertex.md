---
editUrl: false
next: false
prev: false
title: "LayoutVertex"
---

Defined in: [layout/LayoutNetwork.ts:9](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L9)

A vertex in a layout network, representing a node.
GoJS-compatible structure.

## Constructors

### Constructor

> **new LayoutVertex**(`node?`): `LayoutVertex`

Defined in: [layout/LayoutNetwork.ts:17](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L17)

#### Parameters

##### node?

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

#### Returns

`LayoutVertex`

## Properties

### bounds

> **bounds**: [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [layout/LayoutNetwork.ts:11](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L11)

***

### destinationEdges

> **destinationEdges**: [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:13](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L13)

***

### edges

> **edges**: [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:12](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L12)

***

### index

> **index**: `number` = `-1`

Defined in: [layout/LayoutNetwork.ts:15](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L15)

***

### node

> **node**: [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [layout/LayoutNetwork.ts:10](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L10)

***

### sourceEdges

> **sourceEdges**: [`LayoutEdge`](/en/reference/api/graphojs/classes/layoutedge/)[] = `[]`

Defined in: [layout/LayoutNetwork.ts:14](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L14)

## Accessors

### centerX

#### Get Signature

> **get** **centerX**(): `number`

Defined in: [layout/LayoutNetwork.ts:50](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L50)

Center point of the vertex bounds.

##### Returns

`number`

***

### centerY

#### Get Signature

> **get** **centerY**(): `number`

Defined in: [layout/LayoutNetwork.ts:54](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L54)

##### Returns

`number`

***

### degree

#### Get Signature

> **get** **degree**(): `number`

Defined in: [layout/LayoutNetwork.ts:25](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L25)

Whether this vertex has any edges.

##### Returns

`number`

***

### inDegree

#### Get Signature

> **get** **inDegree**(): `number`

Defined in: [layout/LayoutNetwork.ts:30](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L30)

The edges coming INTO this vertex.

##### Returns

`number`

***

### isLeaf

#### Get Signature

> **get** **isLeaf**(): `boolean`

Defined in: [layout/LayoutNetwork.ts:45](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L45)

Whether this vertex has no outgoing edges (a leaf).

##### Returns

`boolean`

***

### isRoot

#### Get Signature

> **get** **isRoot**(): `boolean`

Defined in: [layout/LayoutNetwork.ts:40](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L40)

Whether this vertex has no incoming edges (a root).

##### Returns

`boolean`

***

### outDegree

#### Get Signature

> **get** **outDegree**(): `number`

Defined in: [layout/LayoutNetwork.ts:35](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/layout/LayoutNetwork.ts#L35)

The edges going OUT of this vertex.

##### Returns

`number`
