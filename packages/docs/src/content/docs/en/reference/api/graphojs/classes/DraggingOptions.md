---
editUrl: false
next: false
prev: false
title: "DraggingOptions"
---

Defined in: [tool/DraggingOptions.ts:30](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L30)

GoJS-compatible: options for dragging/moving parts, used by
`Diagram.moveParts`/`computeMove` and `DraggingTool.computeMove`.
graphojs's `DraggingTool` currently reads its own individual
`isGridSnapEnabled`-style properties directly rather than through a
`DraggingOptions` instance — this class exists for API parity and for
code that constructs one directly, but isn't yet consulted internally.

## Constructors

### Constructor

> **new DraggingOptions**(`init?`): `DraggingOptions`

Defined in: [tool/DraggingOptions.ts:42](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L42)

#### Parameters

##### init?

`Partial`\<`DraggingOptions`\>

#### Returns

`DraggingOptions`

## Properties

### dragsLink

> **dragsLink**: `boolean` = `false`

Defined in: [tool/DraggingOptions.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L36)

***

### dragsMembers

> **dragsMembers**: `boolean` = `true`

Defined in: [tool/DraggingOptions.ts:40](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L40)

***

### dragsTree

> **dragsTree**: `boolean` = `false`

Defined in: [tool/DraggingOptions.ts:37](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L37)

***

### gridSnapCellSize

> **gridSnapCellSize**: [`Size`](/en/reference/api/graphojs/classes/size/)

Defined in: [tool/DraggingOptions.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L33)

***

### gridSnapCellSpot

> **gridSnapCellSpot**: [`Spot`](/en/reference/api/graphojs/classes/spot/) = `Spot.TopLeft`

Defined in: [tool/DraggingOptions.ts:34](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L34)

***

### gridSnapOrigin

> **gridSnapOrigin**: [`Point`](/en/reference/api/graphojs/classes/point/)

Defined in: [tool/DraggingOptions.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L35)

***

### groupsAlwaysMove

> **groupsAlwaysMove**: `boolean` = `true`

Defined in: [tool/DraggingOptions.ts:39](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L39)

***

### groupsSnapMembers

> **groupsSnapMembers**: `boolean` = `false`

Defined in: [tool/DraggingOptions.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L38)

***

### isGridSnapEnabled

> **isGridSnapEnabled**: `boolean` = `false`

Defined in: [tool/DraggingOptions.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L31)

***

### isGridSnapRealtime

> **isGridSnapRealtime**: `boolean` = `true`

Defined in: [tool/DraggingOptions.ts:32](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/tool/DraggingOptions.ts#L32)
