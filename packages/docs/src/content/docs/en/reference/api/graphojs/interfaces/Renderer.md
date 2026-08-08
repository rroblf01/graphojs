---
editUrl: false
next: false
prev: false
title: "Renderer"
---

Defined in: [render/Renderer.ts:9](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L9)

Abstract renderer interface for diagram parts.

## Methods

### clear()

> **clear**(): `void`

Defined in: [render/Renderer.ts:11](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L11)

Clear the entire canvas.

#### Returns

`void`

***

### clearNodeBounds()

> **clearNodeBounds**(): `void`

Defined in: [render/Renderer.ts:59](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L59)

Clear all registered node bounds.

#### Returns

`void`

***

### diagramToScreen()

> **diagramToScreen**(`diagramX`, `diagramY`): `object`

Defined in: [render/Renderer.ts:50](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L50)

Convert diagram coordinates to screen coordinates.

#### Parameters

##### diagramX

`number`

##### diagramY

`number`

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### getCanvas()

> **getCanvas**(): `HTMLCanvasElement`

Defined in: [render/Renderer.ts:53](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L53)

Get the underlying canvas element.

#### Returns

`HTMLCanvasElement`

***

### getOffset()

> **getOffset**(): `object`

Defined in: [render/Renderer.ts:44](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L44)

Get the current offset.

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### getScale()

> **getScale**(): `number`

Defined in: [render/Renderer.ts:41](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L41)

Get the current scale.

#### Returns

`number`

***

### renderGrid()

> **renderGrid**(`viewport`, `gridSize`): `void`

Defined in: [render/Renderer.ts:29](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L29)

Render a grid background.

#### Parameters

##### viewport

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### gridSize

`number`

#### Returns

`void`

***

### renderGroup()

> **renderGroup**(`group`): `void`

Defined in: [render/Renderer.ts:23](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L23)

Render a group (background bounds).

#### Parameters

##### group

[`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`

***

### renderLink()

> **renderLink**(`link`): `void`

Defined in: [render/Renderer.ts:20](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L20)

Render a link.

#### Parameters

##### link

[`Link`](/en/reference/api/graphojs/classes/link/)

#### Returns

`void`

***

### renderNode()

> **renderNode**(`node`): `void`

Defined in: [render/Renderer.ts:17](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L17)

Render a node.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`void`

***

### renderSelectionRect()

> **renderSelectionRect**(`rect`): `void`

Defined in: [render/Renderer.ts:26](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L26)

Render a selection rectangle.

#### Parameters

##### rect

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### resize()

> **resize**(): `void`

Defined in: [render/Renderer.ts:14](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L14)

Resize the canvas to fit its container.

#### Returns

`void`

***

### restore()

> **restore**(): `void`

Defined in: [render/Renderer.ts:35](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L35)

Restore the previously saved canvas state.

#### Returns

`void`

***

### save()

> **save**(): `void`

Defined in: [render/Renderer.ts:32](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L32)

Save the current canvas state.

#### Returns

`void`

***

### screenToDiagram()

> **screenToDiagram**(`screenX`, `screenY`): `object`

Defined in: [render/Renderer.ts:47](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L47)

Convert screen coordinates to diagram coordinates.

#### Parameters

##### screenX

`number`

##### screenY

`number`

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### setNodeBounds()

> **setNodeBounds**(`key`, `bounds`): `void`

Defined in: [render/Renderer.ts:56](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L56)

Register a node's bounds for link routing computation.

#### Parameters

##### key

`string` \| `number`

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### setViewport()

> **setViewport**(`x`, `y`, `scale`): `void`

Defined in: [render/Renderer.ts:38](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Renderer.ts#L38)

Set the viewport (pan/zoom).

#### Parameters

##### x

`number`

##### y

`number`

##### scale

`number`

#### Returns

`void`
