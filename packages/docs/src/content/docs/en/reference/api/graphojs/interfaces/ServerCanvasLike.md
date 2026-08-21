---
editUrl: false
next: false
prev: false
title: "ServerCanvasLike"
---

Defined in: [export/ServerRenderer.ts:13](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ServerRenderer.ts#L13)

Minimal canvas-like object accepted for server-side rendering — matches
what `node-canvas`, `@napi-rs/canvas`, and `skia-canvas` already provide.
No DOM/browser APIs (no `getBoundingClientRect`, no `style`) are required.

## Properties

### height

> **height**: `number`

Defined in: [export/ServerRenderer.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ServerRenderer.ts#L15)

***

### width

> **width**: `number`

Defined in: [export/ServerRenderer.ts:14](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ServerRenderer.ts#L14)

## Methods

### getContext()

> **getContext**(`contextId`): `CanvasRenderingContext2D` \| `null`

Defined in: [export/ServerRenderer.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/export/ServerRenderer.ts#L16)

#### Parameters

##### contextId

`"2d"`

#### Returns

`CanvasRenderingContext2D` \| `null`
