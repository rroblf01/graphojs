---
editUrl: false
next: false
prev: false
title: "ServerCanvasLike"
---

Defined in: [export/ServerRenderer.ts:13](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ServerRenderer.ts#L13)

Minimal canvas-like object accepted for server-side rendering — matches
what `node-canvas`, `@napi-rs/canvas`, and `skia-canvas` already provide.
No DOM/browser APIs (no `getBoundingClientRect`, no `style`) are required.

## Properties

### height

> **height**: `number`

Defined in: [export/ServerRenderer.ts:15](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ServerRenderer.ts#L15)

***

### width

> **width**: `number`

Defined in: [export/ServerRenderer.ts:14](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ServerRenderer.ts#L14)

## Methods

### getContext()

> **getContext**(`contextId`): `CanvasRenderingContext2D` \| `null`

Defined in: [export/ServerRenderer.ts:16](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ServerRenderer.ts#L16)

#### Parameters

##### contextId

`"2d"`

#### Returns

`CanvasRenderingContext2D` \| `null`
