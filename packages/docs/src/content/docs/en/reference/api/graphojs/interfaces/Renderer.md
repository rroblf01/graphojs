---
editUrl: false
next: false
prev: false
title: "Renderer"
---

Defined in: [render/Renderer.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L18)

Abstract renderer interface for diagram parts.

## Methods

### clear()

> **clear**(): `void`

Defined in: [render/Renderer.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L20)

Clear the entire canvas.

#### Returns

`void`

***

### clearNodeBounds()

> **clearNodeBounds**(): `void`

Defined in: [render/Renderer.ts:71](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L71)

Clear all registered node bounds.

#### Returns

`void`

***

### diagramToScreen()

> **diagramToScreen**(`diagramX`, `diagramY`): `object`

Defined in: [render/Renderer.ts:62](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L62)

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

Defined in: [render/Renderer.ts:65](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L65)

Get the underlying canvas element.

#### Returns

`HTMLCanvasElement`

***

### getOffset()

> **getOffset**(): `object`

Defined in: [render/Renderer.ts:56](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L56)

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

Defined in: [render/Renderer.ts:53](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L53)

Get the current scale.

#### Returns

`number`

***

### renderGrid()

> **renderGrid**(`viewport`, `gridSize`, `pattern?`): `void`

Defined in: [render/Renderer.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L41)

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

***

### renderGroup()

> **renderGroup**(`group`): `void`

Defined in: [render/Renderer.ts:32](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L32)

Render a group (background bounds).

#### Parameters

##### group

[`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`

***

### renderLink()

> **renderLink**(`link`): `void`

Defined in: [render/Renderer.ts:29](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L29)

Render a link.

#### Parameters

##### link

[`Link`](/en/reference/api/graphojs/classes/link/)

#### Returns

`void`

***

### renderNode()

> **renderNode**(`node`): `void`

Defined in: [render/Renderer.ts:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L26)

Render a node.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`void`

***

### renderPart()

> **renderPart**(`part`): `void`

Defined in: [render/Renderer.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L35)

Render a bare decorative Part (not a Node/Link/Group) via its panel.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### renderSelectionRect()

> **renderSelectionRect**(`rect`): `void`

Defined in: [render/Renderer.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L38)

Render a selection rectangle.

#### Parameters

##### rect

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### resize()

> **resize**(): `void`

Defined in: [render/Renderer.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L23)

Resize the canvas to fit its container.

#### Returns

`void`

***

### restore()

> **restore**(): `void`

Defined in: [render/Renderer.ts:47](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L47)

Restore the previously saved canvas state.

#### Returns

`void`

***

### save()

> **save**(): `void`

Defined in: [render/Renderer.ts:44](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L44)

Save the current canvas state.

#### Returns

`void`

***

### screenToDiagram()

> **screenToDiagram**(`screenX`, `screenY`): `object`

Defined in: [render/Renderer.ts:59](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L59)

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

Defined in: [render/Renderer.ts:68](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L68)

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

Defined in: [render/Renderer.ts:50](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Renderer.ts#L50)

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
