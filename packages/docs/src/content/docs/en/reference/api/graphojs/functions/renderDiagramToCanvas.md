---
editUrl: false
next: false
prev: false
title: "renderDiagramToCanvas"
---

> **renderDiagramToCanvas**(`diagram`, `canvas`, `options?`): `void`

Defined in: [export/ServerRenderer.ts:89](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/export/ServerRenderer.ts#L89)

Renders `diagram`'s current content onto a caller-supplied canvas-like
object — no `document`, no DOM, no browser `<canvas>` involved. Intended
for server-side rendering: build the `Diagram` under a lightweight DOM
shim (e.g. jsdom, whose own canvas has no real 2D backend) for its
model/layout logic, then render the actual pixels into a fast native
canvas from an optional package of your choice:

```js
import { createCanvas } from '@napi-rs/canvas'; // or 'canvas', 'skia-canvas'...
import { renderDiagramToCanvas } from 'graphojs';

const canvas = createCanvas(1, 1); // resized internally to fit the content
renderDiagramToCanvas(diagram, canvas, { padding: 20 });
const png = canvas.toBuffer('image/png');
```

GraphoJS does not depend on any Node canvas package — bring whichever one
you prefer; this only requires `width`/`height`/`getContext('2d')`.

 Shape and defaults may still change before 1.0.0 based on
real-world server-rendering usage.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

## Parameters

### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

### canvas

[`ServerCanvasLike`](/en/reference/api/graphojs/interfaces/servercanvaslike/)

### options?

[`ServerRenderOptions`](/en/reference/api/graphojs/interfaces/serverrenderoptions/) = `{}`

## Returns

`void`
