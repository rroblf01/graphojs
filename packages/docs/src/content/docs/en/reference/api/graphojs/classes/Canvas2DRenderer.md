---
editUrl: false
next: false
prev: false
title: "Canvas2DRenderer"
---

Defined in: [render/Canvas2DRenderer.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L24)

Canvas 2D renderer for diagram parts.

## Implements

- [`Renderer`](/en/reference/api/graphojs/interfaces/renderer/)

## Constructors

### Constructor

> **new Canvas2DRenderer**(`canvas`): `Canvas2DRenderer`

Defined in: [render/Canvas2DRenderer.ts:75](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L75)

#### Parameters

##### canvas

`HTMLCanvasElement`

#### Returns

`Canvas2DRenderer`

## Accessors

### dirtyRectCount

#### Get Signature

> **get** **dirtyRectCount**(): `number`

Defined in: [render/Canvas2DRenderer.ts:167](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L167)

Get the number of pending dirty rectangles.

##### Returns

`number`

## Methods

### clear()

> **clear**(): `void`

Defined in: [render/Canvas2DRenderer.ts:119](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L119)

Clear the entire canvas.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`clear`](/en/reference/api/graphojs/interfaces/renderer/#clear)

***

### clearDirtyRects()

> **clearDirtyRects**(): `void`

Defined in: [render/Canvas2DRenderer.ts:172](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L172)

Clear all pending dirty rectangles without clearing the canvas.

#### Returns

`void`

***

### clearNodeBounds()

> **clearNodeBounds**(): `void`

Defined in: [render/Canvas2DRenderer.ts:66](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L66)

Clear all registered node bounds.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`clearNodeBounds`](/en/reference/api/graphojs/interfaces/renderer/#clearnodebounds)

***

### diagramToScreen()

> **diagramToScreen**(`diagramX`, `diagramY`): `object`

Defined in: [render/Canvas2DRenderer.ts:750](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L750)

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

Defined in: [render/Canvas2DRenderer.ts:138](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L138)

Disable dirty-rectangle rendering (full clear each frame).

#### Returns

`void`

***

### enableDirtyRects()

> **enableDirtyRects**(): `void`

Defined in: [render/Canvas2DRenderer.ts:133](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L133)

Enable dirty-rectangle rendering.

#### Returns

`void`

***

### getCanvas()

> **getCanvas**(): `HTMLCanvasElement`

Defined in: [render/Canvas2DRenderer.ts:100](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L100)

Get the canvas element.

#### Returns

`HTMLCanvasElement`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`getCanvas`](/en/reference/api/graphojs/interfaces/renderer/#getcanvas)

***

### getContext()

> **getContext**(): `CanvasRenderingContext2D`

Defined in: [render/Canvas2DRenderer.ts:105](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L105)

Get the rendering context.

#### Returns

`CanvasRenderingContext2D`

***

### getLabelsVisible()

> **getLabelsVisible**(): `boolean`

Defined in: [render/Canvas2DRenderer.ts:51](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L51)

Check whether labels are currently visible.

#### Returns

`boolean`

***

### getOffset()

> **getOffset**(): `object`

Defined in: [render/Canvas2DRenderer.ts:739](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L739)

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

Defined in: [render/Canvas2DRenderer.ts:110](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L110)

Get the path cache.

#### Returns

[`PathCache`](/en/reference/api/graphojs/classes/pathcache/)

***

### getScale()

> **getScale**(): `number`

Defined in: [render/Canvas2DRenderer.ts:735](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L735)

Get the current scale.

#### Returns

`number`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`getScale`](/en/reference/api/graphojs/interfaces/renderer/#getscale)

***

### getTextMeasureCache()

> **getTextMeasureCache**(): [`TextMeasureCache`](/en/reference/api/graphojs/classes/textmeasurecache/)

Defined in: [render/Canvas2DRenderer.ts:115](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L115)

Get the text measure cache.

#### Returns

[`TextMeasureCache`](/en/reference/api/graphojs/classes/textmeasurecache/)

***

### invalidateLinkPaths()

> **invalidateLinkPaths**(): `void`

Defined in: [render/Canvas2DRenderer.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L38)

Invalidate all cached link paths (e.g. when nodes move).

#### Returns

`void`

***

### isDirtyRectEnabled()

> **isDirtyRectEnabled**(): `boolean`

Defined in: [render/Canvas2DRenderer.ts:144](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L144)

Check whether dirty-rectangle rendering is enabled.

#### Returns

`boolean`

***

### markDirty()

> **markDirty**(`x`, `y`, `width`, `height`): `void`

Defined in: [render/Canvas2DRenderer.ts:149](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L149)

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

Defined in: [render/Canvas2DRenderer.ts:162](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L162)

Mark an entire part's bounds as dirty.

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### renderGrid()

> **renderGrid**(`viewport`, `gridSize`, `pattern?`): `void`

Defined in: [render/Canvas2DRenderer.ts:683](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L683)

Render a grid background, optionally styled by a `diagram.grid` pattern.

#### Parameters

##### viewport

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### gridSize

`number`

##### pattern?

[`GridPatternStyle`](/en/reference/api/graphojs/interfaces/gridpatternstyle/)

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`renderGrid`](/en/reference/api/graphojs/interfaces/renderer/#rendergrid)

***

### renderGroup()

> **renderGroup**(`group`): `void`

Defined in: [render/Canvas2DRenderer.ts:604](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L604)

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

Defined in: [render/Canvas2DRenderer.ts:326](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L326)

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

Defined in: [render/Canvas2DRenderer.ts:176](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L176)

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

Defined in: [render/Canvas2DRenderer.ts:292](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L292)

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

### renderPart()

> **renderPart**(`part`): `void`

Defined in: [render/Canvas2DRenderer.ts:646](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L646)

GoJS-compatible: render a bare decorative `Part` (not a Node/Link/
Group) — e.g. a frame or watermark added via `Diagram.add()` outside
the model. Only draws if it has a `panel` (from a template); a
decorative Part with no panel has nothing to render.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`renderPart`](/en/reference/api/graphojs/interfaces/renderer/#renderpart)

***

### renderSelectionHandles()

> **renderSelectionHandles**(`x`, `y`, `width`, `height`): `void`

Defined in: [render/Canvas2DRenderer.ts:246](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L246)

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

Defined in: [render/Canvas2DRenderer.ts:671](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L671)

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

Defined in: [render/Canvas2DRenderer.ts:95](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L95)

Resize the canvas to fit its container.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`resize`](/en/reference/api/graphojs/interfaces/renderer/#resize)

***

### restore()

> **restore**(): `void`

Defined in: [render/Canvas2DRenderer.ts:721](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L721)

Restore the previously saved canvas state.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`restore`](/en/reference/api/graphojs/interfaces/renderer/#restore)

***

### save()

> **save**(): `void`

Defined in: [render/Canvas2DRenderer.ts:717](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L717)

Save the current canvas state.

#### Returns

`void`

#### Implementation of

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/).[`save`](/en/reference/api/graphojs/interfaces/renderer/#save)

***

### screenToDiagram()

> **screenToDiagram**(`screenX`, `screenY`): `object`

Defined in: [render/Canvas2DRenderer.ts:743](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L743)

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

Defined in: [render/Canvas2DRenderer.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L46)

Set whether node labels should be rendered (used for LOD).

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setNodeBounds()

> **setNodeBounds**(`key`, `bounds`): `void`

Defined in: [render/Canvas2DRenderer.ts:61](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L61)

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

Defined in: [render/Canvas2DRenderer.ts:56](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L56)

Set the colors used for selection highlights and resize handles.

#### Parameters

##### style

[`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)

#### Returns

`void`

***

### setViewport()

> **setViewport**(`x`, `y`, `scale`): `void`

Defined in: [render/Canvas2DRenderer.ts:725](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Canvas2DRenderer.ts#L725)

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
