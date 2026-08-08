---
editUrl: false
next: false
prev: false
title: "Canvas2DRenderer"
---

Defined in: [render/Canvas2DRenderer.ts:23](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L23)

Canvas 2D renderer for diagram parts.

## Implements

- [`Renderer`](/en/reference/api/graphojs/interfaces/renderer/)

## Constructors

### Constructor

> **new Canvas2DRenderer**(`canvas`): `Canvas2DRenderer`

Defined in: [render/Canvas2DRenderer.ts:74](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L74)

#### Parameters

##### canvas

`HTMLCanvasElement`

#### Returns

`Canvas2DRenderer`

## Accessors

### dirtyRectCount

#### Get Signature

> **get** **dirtyRectCount**(): `number`

Defined in: [render/Canvas2DRenderer.ts:166](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L166)

Get the number of pending dirty rectangles.

##### Returns

`number`

## Methods

### clear()

> **clear**(): `void`

Defined in: [render/Canvas2DRenderer.ts:118](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L118)

Clear the entire canvas.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`clear`](/en/reference/api/graphojs/interfaces/renderer/#clear)

***

### clearDirtyRects()

> **clearDirtyRects**(): `void`

Defined in: [render/Canvas2DRenderer.ts:171](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L171)

Clear all pending dirty rectangles without clearing the canvas.

#### Returns

`void`

***

### clearNodeBounds()

> **clearNodeBounds**(): `void`

Defined in: [render/Canvas2DRenderer.ts:65](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L65)

Clear all registered node bounds.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`clearNodeBounds`](/en/reference/api/graphojs/interfaces/renderer/#clearnodebounds)

***

### diagramToScreen()

> **diagramToScreen**(`diagramX`, `diagramY`): `object`

Defined in: [render/Canvas2DRenderer.ts:663](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L663)

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

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`diagramToScreen`](/en/reference/api/graphojs/interfaces/renderer/#diagramtoscreen)

***

### disableDirtyRects()

> **disableDirtyRects**(): `void`

Defined in: [render/Canvas2DRenderer.ts:137](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L137)

Disable dirty-rectangle rendering (full clear each frame).

#### Returns

`void`

***

### enableDirtyRects()

> **enableDirtyRects**(): `void`

Defined in: [render/Canvas2DRenderer.ts:132](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L132)

Enable dirty-rectangle rendering.

#### Returns

`void`

***

### getCanvas()

> **getCanvas**(): `HTMLCanvasElement`

Defined in: [render/Canvas2DRenderer.ts:99](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L99)

Get the canvas element.

#### Returns

`HTMLCanvasElement`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`getCanvas`](/en/reference/api/graphojs/interfaces/renderer/#getcanvas)

***

### getContext()

> **getContext**(): `CanvasRenderingContext2D`

Defined in: [render/Canvas2DRenderer.ts:104](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L104)

Get the rendering context.

#### Returns

`CanvasRenderingContext2D`

***

### getLabelsVisible()

> **getLabelsVisible**(): `boolean`

Defined in: [render/Canvas2DRenderer.ts:50](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L50)

Check whether labels are currently visible.

#### Returns

`boolean`

***

### getOffset()

> **getOffset**(): `object`

Defined in: [render/Canvas2DRenderer.ts:652](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L652)

Get the current offset.

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`getOffset`](/en/reference/api/graphojs/interfaces/renderer/#getoffset)

***

### getPathCache()

> **getPathCache**(): [`PathCache`](/en/reference/api/graphojs/classes/pathcache/)

Defined in: [render/Canvas2DRenderer.ts:109](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L109)

Get the path cache.

#### Returns

[`PathCache`](/en/reference/api/graphojs/classes/pathcache/)

***

### getScale()

> **getScale**(): `number`

Defined in: [render/Canvas2DRenderer.ts:648](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L648)

Get the current scale.

#### Returns

`number`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`getScale`](/en/reference/api/graphojs/interfaces/renderer/#getscale)

***

### getTextMeasureCache()

> **getTextMeasureCache**(): [`TextMeasureCache`](/en/reference/api/graphojs/classes/textmeasurecache/)

Defined in: [render/Canvas2DRenderer.ts:114](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L114)

Get the text measure cache.

#### Returns

[`TextMeasureCache`](/en/reference/api/graphojs/classes/textmeasurecache/)

***

### invalidateLinkPaths()

> **invalidateLinkPaths**(): `void`

Defined in: [render/Canvas2DRenderer.ts:37](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L37)

Invalidate all cached link paths (e.g. when nodes move).

#### Returns

`void`

***

### isDirtyRectEnabled()

> **isDirtyRectEnabled**(): `boolean`

Defined in: [render/Canvas2DRenderer.ts:143](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L143)

Check whether dirty-rectangle rendering is enabled.

#### Returns

`boolean`

***

### markDirty()

> **markDirty**(`x`, `y`, `width`, `height`): `void`

Defined in: [render/Canvas2DRenderer.ts:148](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L148)

Add a dirty rectangle in diagram coordinates (converted to screen space).

#### Parameters

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

#### Returns

`void`

***

### markDirtyRect()

> **markDirtyRect**(`bounds`): `void`

Defined in: [render/Canvas2DRenderer.ts:161](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L161)

Mark an entire part's bounds as dirty.

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### renderGrid()

> **renderGrid**(`viewport`, `gridSize`): `void`

Defined in: [render/Canvas2DRenderer.ts:603](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L603)

Render a grid background.

#### Parameters

##### viewport

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### gridSize

`number`

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`renderGrid`](/en/reference/api/graphojs/interfaces/renderer/#rendergrid)

***

### renderGroup()

> **renderGroup**(`group`): `void`

Defined in: [render/Canvas2DRenderer.ts:555](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L555)

Render a group (background bounds).

#### Parameters

##### group

[`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`renderGroup`](/en/reference/api/graphojs/interfaces/renderer/#rendergroup)

***

### renderLink()

> **renderLink**(`link`): `void`

Defined in: [render/Canvas2DRenderer.ts:325](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L325)

Render a link.

#### Parameters

##### link

[`Link`](/en/reference/api/graphojs/classes/link/)

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`renderLink`](/en/reference/api/graphojs/interfaces/renderer/#renderlink)

***

### renderNode()

> **renderNode**(`node`): `void`

Defined in: [render/Canvas2DRenderer.ts:175](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L175)

Render a node.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`renderNode`](/en/reference/api/graphojs/interfaces/renderer/#rendernode)

***

### renderPanel()

> **renderPanel**(`panel`, `x`, `y`, `width`, `height`): `void`

Defined in: [render/Canvas2DRenderer.ts:291](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L291)

Render a panel at the given position and size.

#### Parameters

##### panel

[`Panel`](/en/reference/api/graphojs/classes/panel/)

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

#### Returns

`void`

***

### renderSelectionHandles()

> **renderSelectionHandles**(`x`, `y`, `width`, `height`): `void`

Defined in: [render/Canvas2DRenderer.ts:245](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L245)

Render resize handles and rotation handle for a selected node.

#### Parameters

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

#### Returns

`void`

***

### renderSelectionRect()

> **renderSelectionRect**(`rect`): `void`

Defined in: [render/Canvas2DRenderer.ts:591](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L591)

Render a selection rectangle.

#### Parameters

##### rect

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`renderSelectionRect`](/en/reference/api/graphojs/interfaces/renderer/#renderselectionrect)

***

### resize()

> **resize**(): `void`

Defined in: [render/Canvas2DRenderer.ts:94](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L94)

Resize the canvas to fit its container.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`resize`](/en/reference/api/graphojs/interfaces/renderer/#resize)

***

### restore()

> **restore**(): `void`

Defined in: [render/Canvas2DRenderer.ts:634](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L634)

Restore the previously saved canvas state.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`restore`](/en/reference/api/graphojs/interfaces/renderer/#restore)

***

### save()

> **save**(): `void`

Defined in: [render/Canvas2DRenderer.ts:630](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L630)

Save the current canvas state.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`save`](/en/reference/api/graphojs/interfaces/renderer/#save)

***

### screenToDiagram()

> **screenToDiagram**(`screenX`, `screenY`): `object`

Defined in: [render/Canvas2DRenderer.ts:656](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L656)

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

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`screenToDiagram`](/en/reference/api/graphojs/interfaces/renderer/#screentodiagram)

***

### setLabelsVisible()

> **setLabelsVisible**(`value`): `void`

Defined in: [render/Canvas2DRenderer.ts:45](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L45)

Set whether node labels should be rendered (used for LOD).

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setNodeBounds()

> **setNodeBounds**(`key`, `bounds`): `void`

Defined in: [render/Canvas2DRenderer.ts:60](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L60)

Register a node's bounds for link routing computation.

#### Parameters

##### key

`string` \| `number`

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`setNodeBounds`](/en/reference/api/graphojs/interfaces/renderer/#setnodebounds)

***

### setSelectionStyle()

> **setSelectionStyle**(`style`): `void`

Defined in: [render/Canvas2DRenderer.ts:55](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L55)

Set the colors used for selection highlights and resize handles.

#### Parameters

##### style

[`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)

#### Returns

`void`

***

### setViewport()

> **setViewport**(`x`, `y`, `scale`): `void`

Defined in: [render/Canvas2DRenderer.ts:638](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/render/Canvas2DRenderer.ts#L638)

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

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`setViewport`](/en/reference/api/graphojs/interfaces/renderer/#setviewport)
