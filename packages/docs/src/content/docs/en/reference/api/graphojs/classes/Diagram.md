---
editUrl: false
next: false
prev: false
title: "Diagram"
---

Defined in: [diagram/Diagram.ts:228](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L228)

A diagram that renders nodes and links on a canvas.

## Constructors

### Constructor

> **new Diagram**(`options`): `Diagram`

Defined in: [diagram/Diagram.ts:380](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L380)

#### Parameters

##### options

`string` \| `HTMLDivElement` \| [`DiagramOptions`](/en/reference/api/graphojs/interfaces/diagramoptions/)

#### Returns

`Diagram`

## Properties

### accessibilityMessages

> **accessibilityMessages**: [`AccessibilityMessages`](/en/reference/api/graphojs/interfaces/accessibilitymessages/)

Defined in: [diagram/Diagram.ts:281](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L281)

Accessibility: message formatters for the aria-label and live-region announcements (default: English).

***

### toolTipDelay

> **toolTipDelay**: `number` = `500`

Defined in: [diagram/Diagram.ts:320](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L320)

GoJS-compatible: delay (ms) before a part's `toolTip` Panel appears on hover.

***

### AlignFill

> `readonly` `static` **AlignFill**: `"Fill"` = `'Fill'`

Defined in: [diagram/Diagram.ts:235](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L235)

***

### AlignMax

> `readonly` `static` **AlignMax**: `"Max"` = `'Max'`

Defined in: [diagram/Diagram.ts:233](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L233)

***

### AlignMin

> `readonly` `static` **AlignMin**: `"Min"` = `'Min'`

Defined in: [diagram/Diagram.ts:232](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L232)

***

### AlignNone

> `readonly` `static` **AlignNone**: `"None"` = `'None'`

Defined in: [diagram/Diagram.ts:230](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L230)

***

### AlignScale

> `readonly` `static` **AlignScale**: `"Scale"` = `'Scale'`

Defined in: [diagram/Diagram.ts:234](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L234)

***

### AlignSpot

> `readonly` `static` **AlignSpot**: `"Spot"` = `'Spot'`

Defined in: [diagram/Diagram.ts:231](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L231)

## Accessors

### actualBounds

#### Get Signature

> **get** **actualBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3968](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3968)

GoJS-compatible: The actual bounds currently occupied by parts.

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### allLinks

#### Get Signature

> **get** **allLinks**(): [`Link`](/en/reference/api/graphojs/classes/link/)[]

Defined in: [diagram/Diagram.ts:2671](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2671)

GoJS-compatible: All links in this diagram.

##### Returns

[`Link`](/en/reference/api/graphojs/classes/link/)[]

***

### allNodes

#### Get Signature

> **get** **allNodes**(): [`Node`](/en/reference/api/graphojs/classes/node/)[]

Defined in: [diagram/Diagram.ts:2676](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2676)

GoJS-compatible: All nodes in this diagram (as an array).

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/)[]

***

### allowArrange

#### Get Signature

> **get** **allowArrange**(): `boolean`

Defined in: [diagram/Diagram.ts:1048](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1048)

GoJS-compatible: Whether parts can be rearranged.

##### Returns

`boolean`

#### Set Signature

> **set** **allowArrange**(`value`): `void`

Defined in: [diagram/Diagram.ts:1052](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1052)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowCopy

#### Get Signature

> **get** **allowCopy**(): `boolean`

Defined in: [diagram/Diagram.ts:895](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L895)

GoJS-compatible: Whether parts can be copied.

##### Returns

`boolean`

#### Set Signature

> **set** **allowCopy**(`value`): `void`

Defined in: [diagram/Diagram.ts:899](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L899)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowDelete

#### Get Signature

> **get** **allowDelete**(): `boolean`

Defined in: [diagram/Diagram.ts:904](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L904)

GoJS-compatible: Whether parts can be deleted.

##### Returns

`boolean`

#### Set Signature

> **set** **allowDelete**(`value`): `void`

Defined in: [diagram/Diagram.ts:908](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L908)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowDrop

#### Get Signature

> **get** **allowDrop**(): `boolean`

Defined in: [diagram/Diagram.ts:913](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L913)

GoJS-compatible: Whether parts can be dropped onto the diagram.

##### Returns

`boolean`

#### Set Signature

> **set** **allowDrop**(`value`): `void`

Defined in: [diagram/Diagram.ts:917](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L917)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowGroup

#### Get Signature

> **get** **allowGroup**(): `boolean`

Defined in: [diagram/Diagram.ts:1012](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1012)

GoJS-compatible: Whether nodes can be grouped.

##### Returns

`boolean`

#### Set Signature

> **set** **allowGroup**(`value`): `void`

Defined in: [diagram/Diagram.ts:1016](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1016)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowHorizontalScroll

#### Get Signature

> **get** **allowHorizontalScroll**(): `boolean`

Defined in: [diagram/Diagram.ts:931](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L931)

GoJS-compatible: Whether horizontal scrolling is allowed.

##### Returns

`boolean`

#### Set Signature

> **set** **allowHorizontalScroll**(`value`): `void`

Defined in: [diagram/Diagram.ts:935](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L935)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowInsert

#### Get Signature

> **get** **allowInsert**(): `boolean`

Defined in: [diagram/Diagram.ts:1021](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1021)

GoJS-compatible: Whether new nodes can be inserted.

##### Returns

`boolean`

#### Set Signature

> **set** **allowInsert**(`value`): `void`

Defined in: [diagram/Diagram.ts:1025](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1025)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowLink

#### Get Signature

> **get** **allowLink**(): `boolean`

Defined in: [diagram/Diagram.ts:994](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L994)

GoJS-compatible: Whether new links can be drawn.

##### Returns

`boolean`

#### Set Signature

> **set** **allowLink**(`value`): `void`

Defined in: [diagram/Diagram.ts:998](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L998)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowMove

#### Get Signature

> **get** **allowMove**(): `boolean`

Defined in: [diagram/Diagram.ts:886](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L886)

GoJS-compatible: Whether parts can be moved.

##### Returns

`boolean`

#### Set Signature

> **set** **allowMove**(`value`): `void`

Defined in: [diagram/Diagram.ts:890](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L890)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowRelink

#### Get Signature

> **get** **allowRelink**(): `boolean`

Defined in: [diagram/Diagram.ts:1003](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1003)

GoJS-compatible: Whether existing links can be reconnected.

##### Returns

`boolean`

#### Set Signature

> **set** **allowRelink**(`value`): `void`

Defined in: [diagram/Diagram.ts:1007](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1007)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowResize

#### Get Signature

> **get** **allowResize**(): `boolean`

Defined in: [diagram/Diagram.ts:1030](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1030)

GoJS-compatible: Whether nodes can be resized.

##### Returns

`boolean`

#### Set Signature

> **set** **allowResize**(`value`): `void`

Defined in: [diagram/Diagram.ts:1034](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1034)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowRotate

#### Get Signature

> **get** **allowRotate**(): `boolean`

Defined in: [diagram/Diagram.ts:1039](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1039)

GoJS-compatible: Whether nodes can be rotated.

##### Returns

`boolean`

#### Set Signature

> **set** **allowRotate**(`value`): `void`

Defined in: [diagram/Diagram.ts:1043](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1043)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowTextEdit

#### Get Signature

> **get** **allowTextEdit**(): `boolean`

Defined in: [diagram/Diagram.ts:985](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L985)

GoJS-compatible: Whether in-place text editing is allowed.

##### Returns

`boolean`

#### Set Signature

> **set** **allowTextEdit**(`value`): `void`

Defined in: [diagram/Diagram.ts:989](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L989)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowVerticalScroll

#### Get Signature

> **get** **allowVerticalScroll**(): `boolean`

Defined in: [diagram/Diagram.ts:940](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L940)

GoJS-compatible: Whether vertical scrolling is allowed.

##### Returns

`boolean`

#### Set Signature

> **set** **allowVerticalScroll**(`value`): `void`

Defined in: [diagram/Diagram.ts:944](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L944)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowZoom

#### Get Signature

> **get** **allowZoom**(): `boolean`

Defined in: [diagram/Diagram.ts:922](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L922)

GoJS-compatible: Whether zooming is allowed.

##### Returns

`boolean`

#### Set Signature

> **set** **allowZoom**(`value`): `void`

Defined in: [diagram/Diagram.ts:926](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L926)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### animationManager

#### Get Signature

> **get** **animationManager**(): [`AnimationManager`](/en/reference/api/graphojs/classes/animationmanager/)

Defined in: [diagram/Diagram.ts:610](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L610)

GoJS-compatible: The animation manager.

##### Returns

[`AnimationManager`](/en/reference/api/graphojs/classes/animationmanager/)

***

### autoScale

#### Get Signature

> **get** **autoScale**(): `number`

Defined in: [diagram/Diagram.ts:2781](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2781)

GoJS-compatible: AutoScale mode (0=None, 1=Uniform, 2=Fit).

##### Returns

`number`

#### Set Signature

> **set** **autoScale**(`value`): `void`

Defined in: [diagram/Diagram.ts:2785](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2785)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### background

#### Get Signature

> **get** **background**(): `string`

Defined in: [diagram/Diagram.ts:2956](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2956)

GoJS-compatible: The background color of the diagram.

##### Returns

`string`

#### Set Signature

> **set** **background**(`value`): `void`

Defined in: [diagram/Diagram.ts:2960](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2960)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### commandHandler

#### Get Signature

> **get** **commandHandler**(): [`CommandHandler`](/en/reference/api/graphojs/classes/commandhandler/)

Defined in: [diagram/Diagram.ts:620](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L620)

GoJS-compatible: The command handler.

##### Returns

[`CommandHandler`](/en/reference/api/graphojs/classes/commandhandler/)

***

### contentAlignment

#### Get Signature

> **get** **contentAlignment**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [diagram/Diagram.ts:2769](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2769)

GoJS-compatible: The alignment of the diagram content within the viewport.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **contentAlignment**(`value`): `void`

Defined in: [diagram/Diagram.ts:2773](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2773)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

***

### div

#### Get Signature

> **get** **div**(): `HTMLDivElement` \| `null`

Defined in: [diagram/Diagram.ts:2917](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2917)

GoJS-compatible: The HTML element this diagram renders into, or `null` if detached.

##### Returns

`HTMLDivElement` \| `null`

#### Set Signature

> **set** **div**(`value`): `void`

Defined in: [diagram/Diagram.ts:2928](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2928)

GoJS-compatible: reparent this diagram (the same instance, model, undo
history, selection, and viewport) into a different div, or detach it
from the DOM entirely with `null`. Real GoJS's `div` is read/write for
exactly this: moving a diagram between containers (e.g. a framework
remounting its host element) without recreating it.

##### Parameters

###### value

`HTMLDivElement` \| `null`

##### Returns

`void`

***

### documentBounds

#### Get Signature

> **get** **documentBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3953](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3953)

GoJS-compatible: The bounds of the document (all content).

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### grid

#### Get Signature

> **get** **grid**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [diagram/Diagram.ts:2732](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2732)

GoJS-compatible: A `Panel` (type `"Grid"`, e.g.
`$(go.Panel, "Grid", { gridCellSize }, $(go.Shape, "LineH", ...), $(go.Shape, "LineV", ...))`)
used as the background grid pattern. Its `Shape` children's `stroke`/
`strokeWidth` style the grid lines; `null` falls back to the default
styling driven by `gridSize` alone.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **grid**(`value`): `void`

Defined in: [diagram/Diagram.ts:2736](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2736)

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

##### Returns

`void`

***

### groups

#### Get Signature

> **get** **groups**(): `ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Group`](/en/reference/api/graphojs/classes/group/)\>

Defined in: [diagram/Diagram.ts:2691](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2691)

GoJS-compatible: The groups in this diagram.

##### Returns

`ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Group`](/en/reference/api/graphojs/classes/group/)\>

***

### groupTemplate

#### Get Signature

> **get** **groupTemplate**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [diagram/Diagram.ts:649](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L649)

GoJS-compatible: Get the default group template.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **groupTemplate**(`value`): `void`

Defined in: [diagram/Diagram.ts:654](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L654)

GoJS-compatible: Set the default group template.

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

##### Returns

`void`

***

### groupTemplateMap

#### Get Signature

> **get** **groupTemplateMap**(): `Map`\<`string`, [`Panel`](/en/reference/api/graphojs/classes/panel/)\>

Defined in: [diagram/Diagram.ts:671](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L671)

GoJS-compatible: Get the group template map.

##### Returns

`Map`\<`string`, [`Panel`](/en/reference/api/graphojs/classes/panel/)\>

***

### horizontalScrollPosition

#### Get Signature

> **get** **horizontalScrollPosition**(): `number`

Defined in: [diagram/Diagram.ts:3973](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3973)

GoJS-compatible: The horizontal scroll position in document coordinates.

##### Returns

`number`

#### Set Signature

> **set** **horizontalScrollPosition**(`value`): `void`

Defined in: [diagram/Diagram.ts:3977](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3977)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### initialContentAlignment

#### Get Signature

> **get** **initialContentAlignment**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [diagram/Diagram.ts:967](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L967)

GoJS-compatible: The initial content alignment spot.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **initialContentAlignment**(`value`): `void`

Defined in: [diagram/Diagram.ts:971](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L971)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

***

### initialContentAlignmentOffset

#### Get Signature

> **get** **initialContentAlignmentOffset**(): \{ `x`: `number`; `y`: `number`; \} \| `null`

Defined in: [diagram/Diagram.ts:976](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L976)

GoJS-compatible: The initial content alignment offset.

##### Returns

\{ `x`: `number`; `y`: `number`; \} \| `null`

#### Set Signature

> **set** **initialContentAlignmentOffset**(`value`): `void`

Defined in: [diagram/Diagram.ts:980](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L980)

##### Parameters

###### value

\{ `x`: `number`; `y`: `number`; \} \| `null`

##### Returns

`void`

***

### isEnabled

#### Get Signature

> **get** **isEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:949](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L949)

GoJS-compatible: Whether the diagram is enabled (interactive).

##### Returns

`boolean`

#### Set Signature

> **set** **isEnabled**(`value`): `void`

Defined in: [diagram/Diagram.ts:953](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L953)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isModified

#### Get Signature

> **get** **isModified**(): `boolean`

Defined in: [diagram/Diagram.ts:2966](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2966)

GoJS-compatible: Whether the diagram's model has been modified.

##### Returns

`boolean`

#### Set Signature

> **set** **isModified**(`value`): `void`

Defined in: [diagram/Diagram.ts:2970](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2970)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isReadOnly

#### Get Signature

> **get** **isReadOnly**(): `boolean`

Defined in: [diagram/Diagram.ts:877](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L877)

GoJS-compatible: Whether the diagram is read-only.

##### Returns

`boolean`

#### Set Signature

> **set** **isReadOnly**(`value`): `void`

Defined in: [diagram/Diagram.ts:881](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L881)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### layers

#### Get Signature

> **get** **layers**(): readonly [`Layer`](/en/reference/api/graphojs/classes/layer/)[]

Defined in: [diagram/Diagram.ts:2848](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2848)

GoJS-compatible: The layers in this diagram.

##### Returns

readonly [`Layer`](/en/reference/api/graphojs/classes/layer/)[]

***

### layout

#### Get Signature

> **get** **layout**(): [`Layout`](/en/reference/api/graphojs/classes/layout/) \| `null`

Defined in: [diagram/Diagram.ts:2855](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2855)

##### Returns

[`Layout`](/en/reference/api/graphojs/classes/layout/) \| `null`

#### Set Signature

> **set** **layout**(`value`): `void`

Defined in: [diagram/Diagram.ts:2859](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2859)

##### Parameters

###### value

[`Layout`](/en/reference/api/graphojs/classes/layout/) \| `null`

##### Returns

`void`

***

### links

#### Get Signature

> **get** **links**(): `ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Link`](/en/reference/api/graphojs/classes/link/)\>

Defined in: [diagram/Diagram.ts:2686](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2686)

GoJS-compatible: The links in this diagram.

##### Returns

`ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Link`](/en/reference/api/graphojs/classes/link/)\>

***

### linkTemplate

#### Get Signature

> **get** **linkTemplate**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [diagram/Diagram.ts:637](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L637)

GoJS-compatible: Get the default link template.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **linkTemplate**(`value`): `void`

Defined in: [diagram/Diagram.ts:642](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L642)

GoJS-compatible: Set the default link template.

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

##### Returns

`void`

***

### linkTemplateMap

#### Get Signature

> **get** **linkTemplateMap**(): `Map`\<`string`, [`Panel`](/en/reference/api/graphojs/classes/panel/)\>

Defined in: [diagram/Diagram.ts:666](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L666)

GoJS-compatible: Get the link template map.

##### Returns

`Map`\<`string`, [`Panel`](/en/reference/api/graphojs/classes/panel/)\>

***

### maxScale

#### Get Signature

> **get** **maxScale**(): `number`

Defined in: [diagram/Diagram.ts:348](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L348)

GoJS-compatible: The maximum zoom scale.

##### Returns

`number`

#### Set Signature

> **set** **maxScale**(`value`): `void`

Defined in: [diagram/Diagram.ts:353](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L353)

GoJS-compatible: Set the maximum zoom scale.

##### Parameters

###### value

`number`

##### Returns

`void`

***

### maxSelectionCount

#### Get Signature

> **get** **maxSelectionCount**(): `number`

Defined in: [diagram/Diagram.ts:1057](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1057)

GoJS-compatible: The maximum number of parts that can be selected.

##### Returns

`number`

#### Set Signature

> **set** **maxSelectionCount**(`value`): `void`

Defined in: [diagram/Diagram.ts:1061](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1061)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### minScale

#### Get Signature

> **get** **minScale**(): `number`

Defined in: [diagram/Diagram.ts:336](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L336)

GoJS-compatible: The minimum zoom scale.

##### Returns

`number`

#### Set Signature

> **set** **minScale**(`value`): `void`

Defined in: [diagram/Diagram.ts:341](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L341)

GoJS-compatible: Set the minimum zoom scale.

##### Parameters

###### value

`number`

##### Returns

`void`

***

### model

#### Get Signature

> **get** **model**(): [`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

Defined in: [diagram/Diagram.ts:2833](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2833)

GoJS-compatible: Get the model.

##### Returns

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

#### Set Signature

> **set** **model**(`value`): `void`

Defined in: [diagram/Diagram.ts:2838](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2838)

GoJS-compatible: Set the model.

##### Parameters

###### value

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

##### Returns

`void`

***

### modelChanged

#### Get Signature

> **get** **modelChanged**(): ((`event`) => `void`) \| `null`

Defined in: [diagram/Diagram.ts:2999](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2999)

##### Returns

((`event`) => `void`) \| `null`

#### Set Signature

> **set** **modelChanged**(`listener`): `void`

Defined in: [diagram/Diagram.ts:2989](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2989)

GoJS-compatible: A listener called when the model changes (single handler).

##### Parameters

###### listener

((`event`) => `void`) \| `null`

##### Returns

`void`

***

### nodes

#### Get Signature

> **get** **nodes**(): `ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Node`](/en/reference/api/graphojs/classes/node/)\>

Defined in: [diagram/Diagram.ts:2681](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2681)

GoJS-compatible: The nodes in this diagram.

##### Returns

`ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Node`](/en/reference/api/graphojs/classes/node/)\>

***

### nodeTemplate

#### Get Signature

> **get** **nodeTemplate**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [diagram/Diagram.ts:625](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L625)

GoJS-compatible: Get the default node template.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **nodeTemplate**(`value`): `void`

Defined in: [diagram/Diagram.ts:630](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L630)

GoJS-compatible: Set the default node template.

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

##### Returns

`void`

***

### nodeTemplateMap

#### Get Signature

> **get** **nodeTemplateMap**(): `Map`\<`string`, [`Panel`](/en/reference/api/graphojs/classes/panel/)\>

Defined in: [diagram/Diagram.ts:661](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L661)

GoJS-compatible: Get the node template map.

##### Returns

`Map`\<`string`, [`Panel`](/en/reference/api/graphojs/classes/panel/)\>

***

### padding

#### Get Signature

> **get** **padding**(): `number`

Defined in: [diagram/Diagram.ts:3590](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3590)

GoJS-compatible: The padding around the content.

##### Returns

`number`

#### Set Signature

> **set** **padding**(`value`): `void`

Defined in: [diagram/Diagram.ts:3594](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3594)

##### Parameters

###### value

`number` \| \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}

##### Returns

`void`

***

### parts

#### Get Signature

> **get** **parts**(): [`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<[`Part`](/en/reference/api/graphojs/classes/part/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/)\>

Defined in: [diagram/Diagram.ts:2704](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2704)

GoJS-compatible: an iterator over all of this diagram's top-level
Parts (nodes, links, groups, and any bare decorative `Part`s added via
`add()`), in no particular order — mirrors real GoJS's `Iterator`
protocol (call `next()` before reading `.value`) and is also a real
`[Symbol.iterator]`, so `for (const p of diagram.parts)` works too.
Previously the only way to reach a Part was by already knowing its
key (`getPart`/`findPartForKey`/`findNodeForKey`/...).

##### Returns

[`Iterator`](/en/reference/api/graphojs/interfaces/iterator/)\<[`Part`](/en/reference/api/graphojs/classes/part/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/)\>

***

### position

#### Get Signature

> **get** **position**(): `object`

Defined in: [diagram/Diagram.ts:3581](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3581)

GoJS-compatible: The position (top-left of the viewport in diagram coordinates).

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **position**(`value`): `void`

Defined in: [diagram/Diagram.ts:3585](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3585)

##### Parameters

###### value

###### x

`number`

###### y

`number`

##### Returns

`void`

***

### scale

#### Get Signature

> **get** **scale**(): `number`

Defined in: [diagram/Diagram.ts:3570](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3570)

GoJS-compatible: The current zoom scale.

##### Returns

`number`

#### Set Signature

> **set** **scale**(`value`): `void`

Defined in: [diagram/Diagram.ts:3574](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3574)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### scrollBehavior

#### Get Signature

> **get** **scrollBehavior**(): `number`

Defined in: [diagram/Diagram.ts:2793](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2793)

GoJS-compatible: How scrolling and scrollbars behave.

##### Returns

`number`

#### Set Signature

> **set** **scrollBehavior**(`value`): `void`

Defined in: [diagram/Diagram.ts:2797](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2797)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### scrollMode

#### Get Signature

> **get** **scrollMode**(): `"document"` \| `"infinite"`

Defined in: [diagram/Diagram.ts:958](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L958)

GoJS-compatible: The scroll mode ('document' or 'infinite').

##### Returns

`"document"` \| `"infinite"`

#### Set Signature

> **set** **scrollMode**(`value`): `void`

Defined in: [diagram/Diagram.ts:962](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L962)

##### Parameters

###### value

`"document"` \| `"infinite"`

##### Returns

`void`

***

### selection

#### Get Signature

> **get** **selection**(): ([`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/))[]

Defined in: [diagram/Diagram.ts:2666](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2666)

GoJS-compatible: The set of currently selected parts.

##### Returns

([`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/))[]

***

### selectionStyle

#### Get Signature

> **get** **selectionStyle**(): [`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)

Defined in: [diagram/Diagram.ts:2871](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2871)

Colors used for selection highlights and the keyboard focus cursor.
Defaults to a high-contrast palette when the OS requests more contrast
(see the constructor); assigning here always overrides that default.

##### Returns

[`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)

#### Set Signature

> **set** **selectionStyle**(`value`): `void`

Defined in: [diagram/Diagram.ts:2875](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2875)

##### Parameters

###### value

[`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)

##### Returns

`void`

***

### themeManager

#### Get Signature

> **get** **themeManager**(): [`ThemeManager`](/en/reference/api/graphojs/classes/thememanager/)

Defined in: [diagram/Diagram.ts:3101](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3101)

GoJS-compatible: the `ThemeManager` for this diagram, lazily created
with the default `light`/`dark` themes on first access.

##### Returns

[`ThemeManager`](/en/reference/api/graphojs/classes/thememanager/)

#### Set Signature

> **set** **themeManager**(`value`): `void`

Defined in: [diagram/Diagram.ts:3109](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3109)

##### Parameters

###### value

[`ThemeManager`](/en/reference/api/graphojs/classes/thememanager/)

##### Returns

`void`

***

### toolManager

#### Get Signature

> **get** **toolManager**(): [`ToolManager`](/en/reference/api/graphojs/classes/toolmanager/)

Defined in: [diagram/Diagram.ts:590](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L590)

GoJS-compatible: The tool manager.

##### Returns

[`ToolManager`](/en/reference/api/graphojs/classes/toolmanager/)

***

### undoManager

#### Get Signature

> **get** **undoManager**(): [`UndoManager`](/en/reference/api/graphojs/classes/undomanager/)

Defined in: [diagram/Diagram.ts:600](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L600)

GoJS-compatible: The undo manager.

##### Returns

[`UndoManager`](/en/reference/api/graphojs/classes/undomanager/)

***

### verticalScrollPosition

#### Get Signature

> **get** **verticalScrollPosition**(): `number`

Defined in: [diagram/Diagram.ts:3982](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3982)

GoJS-compatible: The vertical scroll position in document coordinates.

##### Returns

`number`

#### Set Signature

> **set** **verticalScrollPosition**(`value`): `void`

Defined in: [diagram/Diagram.ts:3986](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3986)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### viewportBounds

#### Get Signature

> **get** **viewportBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3958](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3958)

GoJS-compatible: The bounds of the viewport.

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### zoomFactor

#### Get Signature

> **get** **zoomFactor**(): `number`

Defined in: [diagram/Diagram.ts:3533](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3533)

GoJS-compatible: The current zoom factor (alias for scale).

##### Returns

`number`

#### Set Signature

> **set** **zoomFactor**(`value`): `void`

Defined in: [diagram/Diagram.ts:3537](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3537)

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### add()

> **add**(`part`): `void`

Defined in: [diagram/Diagram.ts:3615](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3615)

GoJS-compatible: Add a part directly to the diagram (and its data to the model).

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### addAnyDiagramListener()

> **addAnyDiagramListener**(`handler`): `void`

Defined in: [diagram/Diagram.ts:711](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L711)

Add a listener for all diagram events.

#### Parameters

##### handler

(`event`) => `void`

#### Returns

`void`

***

### addDiagramListener()

> **addDiagramListener**(`type`, `handler`): `void`

Defined in: [diagram/Diagram.ts:706](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L706)

Add a diagram event listener.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

##### handler

(`event`) => `void`

#### Returns

`void`

***

### addGroupTemplate()

> **addGroupTemplate**(`category`, `template`): `void`

Defined in: [diagram/Diagram.ts:686](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L686)

GoJS-compatible: Add a group template for a category.

#### Parameters

##### category

`string`

##### template

[`Panel`](/en/reference/api/graphojs/classes/panel/)

#### Returns

`void`

***

### addLayer()

> **addLayer**(`layer`): `void`

Defined in: [diagram/Diagram.ts:3014](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3014)

Add a layer.

#### Parameters

##### layer

[`Layer`](/en/reference/api/graphojs/classes/layer/)

#### Returns

`void`

***

### addLinkTemplate()

> **addLinkTemplate**(`category`, `template`): `void`

Defined in: [diagram/Diagram.ts:681](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L681)

GoJS-compatible: Add a link template for a category.

#### Parameters

##### category

`string`

##### template

[`Panel`](/en/reference/api/graphojs/classes/panel/)

#### Returns

`void`

***

### addModelChangedListener()

> **addModelChangedListener**(`listener`): `void`

Defined in: [diagram/Diagram.ts:2977](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2977)

GoJS-compatible: Register a model changed listener.

#### Parameters

##### listener

(`event`) => `void`

#### Returns

`void`

***

### addNodeTemplate()

> **addNodeTemplate**(`category`, `template`): `void`

Defined in: [diagram/Diagram.ts:676](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L676)

GoJS-compatible: Add a node template for a category.

#### Parameters

##### category

`string`

##### template

[`Panel`](/en/reference/api/graphojs/classes/panel/)

#### Returns

`void`

***

### addParts()

> **addParts**(`parts`): `void`

Defined in: [diagram/Diagram.ts:3656](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3656)

GoJS-compatible: Add multiple parts at once.

#### Parameters

##### parts

`Iterable`\<[`Part`](/en/reference/api/graphojs/classes/part/)\>

#### Returns

`void`

***

### announce()

> **announce**(`message`): `void`

Defined in: [diagram/Diagram.ts:2538](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2538)

Accessibility: push a message to the off-screen live region, announced
to screen readers. Public so tools/command handlers can announce their
own user-initiated actions (see `CommandHandler.deleteSelection` and
`ClickCreatingTool` for examples).

#### Parameters

##### message

`string`

#### Returns

`void`

***

### centerPoint()

> **centerPoint**(`p`): `void`

Defined in: [diagram/Diagram.ts:3913](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3913)

GoJS-compatible: Scroll the view so that a point is centered.

#### Parameters

##### p

###### x

`number`

###### y

`number`

#### Returns

`void`

***

### centerRect()

> **centerRect**(`rect`): `void`

Defined in: [diagram/Diagram.ts:3908](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3908)

GoJS-compatible: Scroll the view so that a rect is centered.

#### Parameters

##### rect

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [diagram/Diagram.ts:2425](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2425)

GoJS-compatible: Remove all parts and clear the model.

#### Returns

`void`

***

### clearSelection()

> **clearSelection**(): `void`

Defined in: [diagram/Diagram.ts:2593](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2593)

Clear all selections.

#### Returns

`void`

***

### collapseGroup()

> **collapseGroup**(`group`): `void`

Defined in: [diagram/Diagram.ts:2639](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2639)

GoJS-compatible: Collapse a group's subgraph, firing SubGraphCollapsed.

#### Parameters

##### group

[`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`

***

### collapseTree()

> **collapseTree**(`node`): `void`

Defined in: [diagram/Diagram.ts:4039](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L4039)

GoJS-compatible: collapse a node's tree — hide every descendant reachable
via findTreeChildrenNodes (and any Link visually connecting them), used by
TreeExpanderButton. Independent of Group.isSubGraphExpanded/collapseGroup.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`void`

***

### commit()

> **commit**(`fn`, `name?`): `void`

Defined in: [diagram/Diagram.ts:857](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L857)

GoJS-compatible: Execute a function within a transaction.
If the function is provided, it's called and the transaction is committed.
If no function is provided, begins a transaction and returns a commit function.

Usage:
  diagram.commit(d => {
    d.model.addNode({ key: 1, name: 'A' });
  }, 'add node');

#### Parameters

##### fn

(`d`) => `void`

##### name?

`string` = `''`

#### Returns

`void`

***

### commitTransaction()

> **commitTransaction**(`name?`): `boolean`

Defined in: [diagram/Diagram.ts:832](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L832)

GoJS-compatible: Commit the current transaction.

#### Parameters

##### name?

`string` = `''`

#### Returns

`boolean`

***

### computeBounds()

> **computeBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3963](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3963)

GoJS-compatible: The bounds of all content, including links.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### deselect()

> **deselect**(`part`): `void`

Defined in: [diagram/Diagram.ts:2623](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2623)

GoJS-compatible: Deselect a part.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: [diagram/Diagram.ts:4092](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L4092)

Destroy the diagram and clean up resources.

#### Returns

`void`

***

### disableDoubleBuffering()

> **disableDoubleBuffering**(): `void`

Defined in: [diagram/Diagram.ts:3139](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3139)

Disable double-buffered rendering.

#### Returns

`void`

***

### disableGrid()

> **disableGrid**(): `void`

Defined in: [diagram/Diagram.ts:3208](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3208)

Hide the background grid.

#### Returns

`void`

***

### disableLayerCaching()

> **disableLayerCaching**(): `void`

Defined in: [diagram/Diagram.ts:3068](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3068)

Disable layer caching.

#### Returns

`void`

***

### disableLOD()

> **disableLOD**(): `void`

Defined in: [diagram/Diagram.ts:3158](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3158)

Disable level-of-detail rendering.

#### Returns

`void`

***

### disableSnapToGrid()

> **disableSnapToGrid**(): `void`

Defined in: [diagram/Diagram.ts:3185](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3185)

Disable grid snapping.

#### Returns

`void`

***

### disableTooltips()

> **disableTooltips**(): `void`

Defined in: [diagram/Diagram.ts:3085](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3085)

Disable hover tooltips.

#### Returns

`void`

***

### disableVirtualization()

> **disableVirtualization**(): `void`

Defined in: [diagram/Diagram.ts:751](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L751)

Disable virtualization.

#### Returns

`void`

***

### enableDoubleBuffering()

> **enableDoubleBuffering**(): `void`

Defined in: [diagram/Diagram.ts:3133](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3133)

Enable double-buffered rendering (render offscreen then blit).

#### Returns

`void`

***

### enableGrid()

> **enableGrid**(): `void`

Defined in: [diagram/Diagram.ts:3202](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3202)

GoJS-compatible: show the background grid — the closest equivalent of
real GoJS's `myDiagram.grid.visible = true` (its `Diagram.grid` exists
by default but starts invisible; here that's `showGrid`, `false` by
default, toggled through this pair of methods rather than a settable
property since `enableSnapToGrid`/`disableSnapToGrid` already
established that shape for the closely-related `snapToGrid`).

#### Returns

`void`

***

### enableLayerCaching()

> **enableLayerCaching**(`scale?`): `void`

Defined in: [diagram/Diagram.ts:3061](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3061)

Enable layer caching (renders static layers to offscreen canvases).

#### Parameters

##### scale?

`number`

#### Returns

`void`

***

### enableLOD()

> **enableLOD**(`threshold?`): `void`

Defined in: [diagram/Diagram.ts:3151](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3151)

Enable level-of-detail rendering (hides labels when zoomed out).

#### Parameters

##### threshold?

`number`

#### Returns

`void`

***

### enableSnapToGrid()

> **enableSnapToGrid**(): `void`

Defined in: [diagram/Diagram.ts:3180](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3180)

Enable grid snapping for moved parts.

#### Returns

`void`

***

### enableTooltips()

> **enableTooltips**(`options?`): `void`

Defined in: [diagram/Diagram.ts:3080](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3080)

Enable hover tooltips for parts with a tooltip text.

#### Parameters

##### options?

###### delay?

`number`

###### offset?

`number`

###### style?

`string`

#### Returns

`void`

***

### enableVirtualization()

> **enableVirtualization**(`bounds`): `void`

Defined in: [diagram/Diagram.ts:743](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L743)

Enable virtualization (viewport culling) with a world bounds.

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### executeCommand()

> **executeCommand**(`command`): `void`

Defined in: [diagram/Diagram.ts:797](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L797)

Execute an undoable command.

#### Parameters

##### command

[`Command`](/en/reference/api/graphojs/interfaces/command/)

#### Returns

`void`

***

### expandGroup()

> **expandGroup**(`group`): `void`

Defined in: [diagram/Diagram.ts:2647](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2647)

GoJS-compatible: Expand a group's subgraph, firing SubGraphExpanded.

#### Parameters

##### group

[`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`

***

### expandTree()

> **expandTree**(`node`): `void`

Defined in: [diagram/Diagram.ts:4053](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L4053)

GoJS-compatible: expand a node's tree, showing its direct tree-children.
A child that is itself collapsed keeps its own descendants hidden.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`void`

***

### findGroupForKey()

> **findGroupForKey**(`key`): [`Group`](/en/reference/api/graphojs/classes/group/) \| `null`

Defined in: [diagram/Diagram.ts:2634](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2634)

GoJS-compatible: Find a group part by its model key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Group`](/en/reference/api/graphojs/classes/group/) \| `null`

***

### findHitGraphObject()

> **findHitGraphObject**(`part`, `point`): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [diagram/Diagram.ts:1316](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1316)

Find the deepest GraphObject in `part`'s visual tree at the given
diagram point. Every element's `_position`/`_actualSize` (set during
`Panel.draw`'s layout passes) is already in absolute diagram
coordinates, not relative to `part.bounds` — so `point` is passed to
`panel.hitTest` unchanged.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

##### point

###### x

`number`

###### y

`number`

#### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

***

### findLayer()

> **findLayer**(`name`): [`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

Defined in: [diagram/Diagram.ts:3009](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3009)

GoJS-compatible: Find a layer by name.

#### Parameters

##### name

`string`

#### Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

***

### findLinkForData()

> **findLinkForData**(`data`): [`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

Defined in: [diagram/Diagram.ts:2418](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2418)

GoJS-compatible: Find a link part by its model data object.

#### Parameters

##### data

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

#### Returns

[`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

***

### findLinkForKey()

> **findLinkForKey**(`key`): [`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

Defined in: [diagram/Diagram.ts:2407](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2407)

GoJS-compatible: Find a link part by its model key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

***

### findNodeForData()

> **findNodeForData**(`data`): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [diagram/Diagram.ts:2412](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2412)

GoJS-compatible: Find a node part by its model data object.

#### Parameters

##### data

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### findNodeForKey()

> **findNodeForKey**(`key`): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [diagram/Diagram.ts:2397](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2397)

GoJS-compatible: Find a node part by its model key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### findPartAt()

> **findPartAt**(`x`, `y`): [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/) \| `null`

Defined in: [diagram/Diagram.ts:2314](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2314)

Find a part at the given diagram coordinates.

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/) \| `null`

***

### findPartForKey()

> **findPartForKey**(`key`): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [diagram/Diagram.ts:2402](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2402)

GoJS-compatible: Find a part (node, group, or link) by its model key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

***

### findPartsInRect()

> **findPartsInRect**(`rect`, `_partialInclusion?`): ([`Part`](/en/reference/api/graphojs/classes/part/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/))[]

Defined in: [diagram/Diagram.ts:3600](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3600)

GoJS-compatible: Find all parts intersecting a rectangle.

#### Parameters

##### rect

###### height

`number`

###### width

`number`

###### x

`number`

###### y

`number`

##### \_partialInclusion?

`boolean` = `true`

#### Returns

([`Part`](/en/reference/api/graphojs/classes/part/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/))[]

***

### findTreeChildren()

> **findTreeChildren**(`node`): [`Node`](/en/reference/api/graphojs/classes/node/)[]

Defined in: [diagram/Diagram.ts:4003](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L4003)

GoJS-compatible: Find the tree children of a node.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/)[]

***

### findTreeParent()

> **findTreeParent**(`node`): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [diagram/Diagram.ts:4015](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L4015)

GoJS-compatible: Find the tree parent of a node, or null.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### findTreeRoots()

> **findTreeRoots**(): [`Node`](/en/reference/api/graphojs/classes/node/)[]

Defined in: [diagram/Diagram.ts:3991](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3991)

GoJS-compatible: Find all nodes that are tree roots (no parent key).

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/)[]

***

### fireDiagramEvent()

> **fireDiagramEvent**(`type`, `part?`, `data?`): `void`

Defined in: [diagram/Diagram.ts:731](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L731)

Fire a diagram event.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

##### part?

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

##### data?

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### focus()

> **focus**(): `void`

Defined in: [diagram/Diagram.ts:2949](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2949)

GoJS-compatible: Give keyboard focus to the diagram's div.

#### Returns

`void`

***

### fromJSON()

> **fromJSON**(`json`): `void`

Defined in: [diagram/Diagram.ts:3051](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3051)

Deserialize JSON into the diagram.

#### Parameters

##### json

[`DiagramJSON`](/en/reference/api/graphojs/interfaces/diagramjson/)

#### Returns

`void`

***

### getAlignmentGuidelines()

> **getAlignmentGuidelines**(): `object`[]

Defined in: [diagram/Diagram.ts:2493](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2493)

Get the alignment guideline segments currently shown.

#### Returns

`object`[]

***

### getAnimationManager()

> **getAnimationManager**(): [`AnimationManager`](/en/reference/api/graphojs/classes/animationmanager/)

Defined in: [diagram/Diagram.ts:605](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L605)

Get the animation manager.

#### Returns

[`AnimationManager`](/en/reference/api/graphojs/classes/animationmanager/)

***

### getCanvasBounds()

> **getCanvasBounds**(): `object`

Defined in: [diagram/Diagram.ts:2717](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2717)

GoJS-compatible: Get the bounds of the diagram canvas in page/screen coordinates.

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### getCommandHandler()

> **getCommandHandler**(): [`CommandHandler`](/en/reference/api/graphojs/classes/commandhandler/)

Defined in: [diagram/Diagram.ts:615](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L615)

Get the command handler.

#### Returns

[`CommandHandler`](/en/reference/api/graphojs/classes/commandhandler/)

***

### getContentBounds()

> **getContentBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3921](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3921)

Get the bounds of all content in the diagram.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### getContextMenu()

> **getContextMenu**(): [`ContextMenu`](/en/reference/api/graphojs/classes/contextmenu/) \| `null`

Defined in: [diagram/Diagram.ts:872](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L872)

Get the current context menu.

#### Returns

[`ContextMenu`](/en/reference/api/graphojs/classes/contextmenu/) \| `null`

***

### getDiagramDiv()

> **getDiagramDiv**(): `HTMLDivElement` \| `null`

Defined in: [diagram/Diagram.ts:2944](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2944)

GoJS-compatible: Get the HTML element this diagram renders into, or `null` if detached.

#### Returns

`HTMLDivElement` \| `null`

***

### getDiagramPoint()

> **getDiagramPoint**(`e`): `object`

Defined in: [diagram/Diagram.ts:2522](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2522)

Get mouse position in diagram coordinates.

#### Parameters

##### e

`MouseEvent`

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### getGridSize()

> **getGridSize**(): `number`

Defined in: [diagram/Diagram.ts:3225](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3225)

Get the grid size.

#### Returns

`number`

***

### getLayer()

> **getLayer**(`name`): [`Layer`](/en/reference/api/graphojs/classes/layer/) \| `undefined`

Defined in: [diagram/Diagram.ts:3004](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3004)

Get a layer by name.

#### Parameters

##### name

`string`

#### Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `undefined`

***

### getLayers()

> **getLayers**(): readonly [`Layer`](/en/reference/api/graphojs/classes/layer/)[]

Defined in: [diagram/Diagram.ts:2843](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2843)

Get all layers.

#### Returns

readonly [`Layer`](/en/reference/api/graphojs/classes/layer/)[]

***

### getLODLabelThreshold()

> **getLODLabelThreshold**(): `number`

Defined in: [diagram/Diagram.ts:3175](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3175)

Get the LOD label threshold.

#### Returns

`number`

***

### getModel()

> **getModel**(): [`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

Defined in: [diagram/Diagram.ts:3502](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3502)

Get the underlying model.

#### Returns

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

***

### getPart()

> **getPart**(`key`): [`Part`](/en/reference/api/graphojs/classes/part/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/) \| `undefined`

Defined in: [diagram/Diagram.ts:2392](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2392)

Get a part by key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/) \| `undefined`

***

### getPartPool()

> **getPartPool**(): [`PartPool`](/en/reference/api/graphojs/classes/partpool/)

Defined in: [diagram/Diagram.ts:767](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L767)

Get the part pool.

#### Returns

[`PartPool`](/en/reference/api/graphojs/classes/partpool/)

***

### getRenderer()

> **getRenderer**(): [`Renderer`](/en/reference/api/graphojs/interfaces/renderer/)

Defined in: [diagram/Diagram.ts:3507](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3507)

Get the renderer.

#### Returns

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/)

***

### getSelectedParts()

> **getSelectedParts**(): ([`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/))[]

Defined in: [diagram/Diagram.ts:2655](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2655)

Get selected parts.

#### Returns

([`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/))[]

***

### getSelectionRect()

> **getSelectionRect**(): \{ `height`: `number`; `width`: `number`; `x`: `number`; `y`: `number`; \} \| `null`

Defined in: [diagram/Diagram.ts:2470](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2470)

Get the current selection rectangle, or null.

#### Returns

\{ `height`: `number`; `width`: `number`; `x`: `number`; `y`: `number`; \} \| `null`

***

### getTempLink()

> **getTempLink**(): \{ `from`: \{ `x`: `number`; `y`: `number`; \}; `to`: \{ `x`: `number`; `y`: `number`; \}; \} \| `null`

Defined in: [diagram/Diagram.ts:2451](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2451)

Get the current temporary link, or null.

#### Returns

\{ `from`: \{ `x`: `number`; `y`: `number`; \}; `to`: \{ `x`: `number`; `y`: `number`; \}; \} \| `null`

***

### getToolManager()

> **getToolManager**(): [`ToolManager`](/en/reference/api/graphojs/classes/toolmanager/)

Defined in: [diagram/Diagram.ts:585](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L585)

Get the tool manager.

#### Returns

[`ToolManager`](/en/reference/api/graphojs/classes/toolmanager/)

***

### getTooltipManager()

> **getTooltipManager**(): [`TooltipManager`](/en/reference/api/graphojs/classes/tooltipmanager/) \| `null`

Defined in: [diagram/Diagram.ts:3091](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3091)

Get the tooltip manager, or null if disabled.

#### Returns

[`TooltipManager`](/en/reference/api/graphojs/classes/tooltipmanager/) \| `null`

***

### getUndoManager()

> **getUndoManager**(): [`UndoManager`](/en/reference/api/graphojs/classes/undomanager/)

Defined in: [diagram/Diagram.ts:595](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L595)

Get the undo manager.

#### Returns

[`UndoManager`](/en/reference/api/graphojs/classes/undomanager/)

***

### getViewport()

> **getViewport**(): `object`

Defined in: [diagram/Diagram.ts:3558](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3558)

Get the current viewport.

#### Returns

`object`

##### height

> **height**: `number`

##### scale

> **scale**: `number`

##### width

> **width**: `number`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### getViewportBounds()

> **getViewportBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3942](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3942)

Get the current viewport bounds in diagram coordinates.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### getVirtualizationManager()

> **getVirtualizationManager**(): [`VirtualizationManager`](/en/reference/api/graphojs/classes/virtualizationmanager/) \| `null`

Defined in: [diagram/Diagram.ts:762](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L762)

Get the virtualization manager, or null if disabled.

#### Returns

[`VirtualizationManager`](/en/reference/api/graphojs/classes/virtualizationmanager/) \| `null`

***

### hasDiagramListeners()

> **hasDiagramListeners**(`type`): `boolean`

Defined in: [diagram/Diagram.ts:726](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L726)

Check whether there are listeners for a diagram event type.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

#### Returns

`boolean`

***

### hideAlignmentGuidelines()

> **hideAlignmentGuidelines**(): `void`

Defined in: [diagram/Diagram.ts:2485](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2485)

Hide any alignment guidelines currently shown.

#### Returns

`void`

***

### hideContextMenu()

> **hideContextMenu**(): `void`

Defined in: [diagram/Diagram.ts:1154](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1154)

Hide any floating part context menu.

#### Returns

`void`

***

### hideSelectionRect()

> **hideSelectionRect**(): `void`

Defined in: [diagram/Diagram.ts:2462](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2462)

Hide the temporary selection rectangle.

#### Returns

`void`

***

### hideTempLink()

> **hideTempLink**(): `void`

Defined in: [diagram/Diagram.ts:2443](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2443)

Hide the temporary link preview.

#### Returns

`void`

***

### hideToolTip()

> **hideToolTip**(): `void`

Defined in: [diagram/Diagram.ts:1236](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L1236)

GoJS-compatible: hide any floating part `toolTip` and reset hover tracking.

#### Returns

`void`

***

### invalidate()

> **invalidate**(): `void`

Defined in: [diagram/Diagram.ts:3056](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3056)

Invalidate the diagram (triggers re-render).

#### Returns

`void`

***

### invalidateLinksForNode()

> **invalidateLinksForNode**(`nodeKey`): `void`

Defined in: [diagram/Diagram.ts:3732](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3732)

Recompute the connection points of links attached to a node from its
current bounds, and clear the cached paths so the renderer re-routes:
adjacent links keep following the node during drags/resizes and after
programmatic bounds changes, while non-adjacent auto-routed links re-route
around the moved node (it may be an obstacle for them). Manually-reshaped
routes are only discarded for links attached to the moved node.

#### Parameters

##### nodeKey

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`void`

***

### isDestroyed()

> **isDestroyed**(): `boolean`

Defined in: [diagram/Diagram.ts:4164](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L4164)

Check whether the diagram has been destroyed.

#### Returns

`boolean`

***

### isDoubleBufferingEnabled()

> **isDoubleBufferingEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:3146](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3146)

Check whether double-buffered rendering is enabled.

#### Returns

`boolean`

***

### isGridEnabled()

> **isGridEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:3214](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3214)

Check whether the background grid is currently shown.

#### Returns

`boolean`

***

### isLayerCachingEnabled()

> **isLayerCachingEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:3075](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3075)

Check whether layer caching is enabled.

#### Returns

`boolean`

***

### isLODEnabled()

> **isLODEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:3164](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3164)

Check whether LOD rendering is enabled.

#### Returns

`boolean`

***

### isSnapToGridEnabled()

> **isSnapToGridEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:3190](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3190)

Check whether grid snapping is enabled.

#### Returns

`boolean`

***

### isTreeExpanded()

> **isTreeExpanded**(`node`): `boolean`

Defined in: [diagram/Diagram.ts:2709](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2709)

GoJS-compatible: Whether a node (group) subgraph is expanded.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`boolean`

***

### isVirtualizationEnabled()

> **isVirtualizationEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:757](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L757)

Check whether virtualization is enabled.

#### Returns

`boolean`

***

### layoutDiagram()

> **layoutDiagram**(`layout?`): `void`

Defined in: [diagram/Diagram.ts:2894](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2894)

GoJS-compatible: Run the diagram layout (or the given layout) on all parts.

#### Parameters

##### layout?

[`Layout`](/en/reference/api/graphojs/classes/layout/)

#### Returns

`void`

***

### layoutParts()

> **layoutParts**(`parts`): `void`

Defined in: [diagram/Diagram.ts:2906](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2906)

GoJS-compatible: Run the layout on the given parts.

#### Parameters

##### parts

readonly [`Part`](/en/reference/api/graphojs/classes/part/)[]

#### Returns

`void`

***

### makeImage()

> **makeImage**(`options?`): `HTMLCanvasElement`

Defined in: [diagram/Diagram.ts:3514](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3514)

Generate a raster image (canvas) of the diagram content.

#### Parameters

##### options?

###### background?

`string`

###### padding?

`number`

###### scale?

`number`

#### Returns

`HTMLCanvasElement`

***

### makeImageData()

> **makeImageData**(`options?`): `string`

Defined in: [diagram/Diagram.ts:3523](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3523)

GoJS-compatible: Render the diagram as a PNG data URL string.

#### Parameters

##### options?

###### background?

`string`

###### padding?

`number`

###### scale?

`number`

#### Returns

`string`

***

### makeSvg()

> **makeSvg**(): `SVGElement`

Defined in: [diagram/Diagram.ts:3528](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3528)

GoJS-compatible: Render the diagram as an SVGElement.

#### Returns

`SVGElement`

***

### moveToLayer()

> **moveToLayer**(`part`, `layerName`): `void`

Defined in: [diagram/Diagram.ts:3037](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3037)

Move a part to a layer by name.

#### Parameters

##### part

[`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| [`Group`](/en/reference/api/graphojs/classes/group/)

##### layerName

`string`

#### Returns

`void`

***

### print()

> **print**(`options?`): `void`

Defined in: [diagram/Diagram.ts:3546](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3546)

Print the diagram by opening the browser's print dialog with the
diagram embedded as vector SVG (default) or a raster PNG image.

#### Parameters

##### options?

###### background?

`string`

###### fitToPage?

`boolean`

###### format?

`"svg"` \| `"png"`

###### padding?

`number`

###### scale?

`number`

###### title?

`string`

#### Returns

`void`

***

### redo()

> **redo**(): `boolean`

Defined in: [diagram/Diagram.ts:813](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L813)

Redo the last undone command.

#### Returns

`boolean`

***

### remove()

> **remove**(`part`): `void`

Defined in: [diagram/Diagram.ts:3666](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3666)

GoJS-compatible: Remove a part directly from the diagram.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### removeAnyDiagramListener()

> **removeAnyDiagramListener**(`handler`): `void`

Defined in: [diagram/Diagram.ts:721](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L721)

Remove a listener from all diagram events.

#### Parameters

##### handler

(`event`) => `void`

#### Returns

`void`

***

### removeDiagramListener()

> **removeDiagramListener**(`type`, `handler`): `boolean`

Defined in: [diagram/Diagram.ts:716](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L716)

Remove a diagram event listener.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

##### handler

(`event`) => `void`

#### Returns

`boolean`

***

### removeGroupTemplate()

> **removeGroupTemplate**(`category`): `boolean`

Defined in: [diagram/Diagram.ts:701](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L701)

GoJS-compatible: Remove a group template by category.

#### Parameters

##### category

`string`

#### Returns

`boolean`

***

### removeLayer()

> **removeLayer**(`name`): `boolean`

Defined in: [diagram/Diagram.ts:3021](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3021)

Remove a layer by name.

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### removeLinkTemplate()

> **removeLinkTemplate**(`category`): `boolean`

Defined in: [diagram/Diagram.ts:696](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L696)

GoJS-compatible: Remove a link template by category.

#### Parameters

##### category

`string`

#### Returns

`boolean`

***

### removeModelChangedListener()

> **removeModelChangedListener**(`listener`): `void`

Defined in: [diagram/Diagram.ts:2982](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2982)

GoJS-compatible: Remove a model changed listener.

#### Parameters

##### listener

(`event`) => `void`

#### Returns

`void`

***

### removeNodeTemplate()

> **removeNodeTemplate**(`category`): `boolean`

Defined in: [diagram/Diagram.ts:691](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L691)

GoJS-compatible: Remove a node template by category.

#### Parameters

##### category

`string`

#### Returns

`boolean`

***

### removeParts()

> **removeParts**(`parts`): `void`

Defined in: [diagram/Diagram.ts:3661](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3661)

GoJS-compatible: Remove multiple parts at once.

#### Parameters

##### parts

`Iterable`\<[`Part`](/en/reference/api/graphojs/classes/part/)\>

#### Returns

`void`

***

### requestUpdate()

> **requestUpdate**(): `void`

Defined in: [diagram/Diagram.ts:2802](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2802)

GoJS-compatible: Request a redraw of the diagram.

#### Returns

`void`

***

### scrollToPart()

> **scrollToPart**(`part`, `_padding?`): `void`

Defined in: [diagram/Diagram.ts:3861](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3861)

Scroll the viewport to show a specific part.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

##### \_padding?

`number` = `50`

#### Returns

`void`

***

### scrollToRect()

> **scrollToRect**(`rect`, `center?`): `void`

Defined in: [diagram/Diagram.ts:3885](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3885)

GoJS-compatible: Scroll the view so that a rect is visible (optionally centered).

#### Parameters

##### rect

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### center?

`boolean` = `false`

#### Returns

`void`

***

### select()

> **select**(`part`, `addToSelection?`): `boolean`

Defined in: [diagram/Diagram.ts:2605](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2605)

GoJS-compatible: Select a part, adding it to the current selection.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

##### addToSelection?

`boolean` = `false`

#### Returns

`boolean`

***

### selectPartsInRect()

> **selectPartsInRect**(`rect`, `partialInclusion?`): `void`

Defined in: [diagram/Diagram.ts:2498](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2498)

Select all parts intersecting a rectangle.

#### Parameters

##### rect

###### height

`number`

###### width

`number`

###### x

`number`

###### y

`number`

##### partialInclusion?

`boolean` = `true`

#### Returns

`void`

***

### setContextMenu()

> **setContextMenu**(`menu`): `void`

Defined in: [diagram/Diagram.ts:867](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L867)

Set a context menu for this diagram.

#### Parameters

##### menu

[`ContextMenu`](/en/reference/api/graphojs/classes/contextmenu/) \| `null`

#### Returns

`void`

***

### setGridSize()

> **setGridSize**(`size`): `void`

Defined in: [diagram/Diagram.ts:3219](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3219)

Set the grid size used for snapping.

#### Parameters

##### size

`number`

#### Returns

`void`

***

### setLODLabelThreshold()

> **setLODLabelThreshold**(`threshold`): `void`

Defined in: [diagram/Diagram.ts:3169](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3169)

Set the zoom threshold below which labels are hidden.

#### Parameters

##### threshold

`number`

#### Returns

`void`

***

### setModel()

> **setModel**(`model`): `void`

Defined in: [diagram/Diagram.ts:2807](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2807)

Set the model.

#### Parameters

##### model

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

#### Returns

`void`

***

### setViewport()

> **setViewport**(`x`, `y`, `scale?`): `void`

Defined in: [diagram/Diagram.ts:3693](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3693)

Set the viewport.

#### Parameters

##### x

`number`

##### y

`number`

##### scale?

`number`

#### Returns

`void`

***

### showAlignmentGuidelines()

> **showAlignmentGuidelines**(`lines`): `void`

Defined in: [diagram/Diagram.ts:2479](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2479)

GoJS-compatible ("GuidedDraggingTool" extension style): show temporary
alignment guideline segments while dragging, snapped to the edges/centers
of nearby parts.

#### Parameters

##### lines

`object`[]

#### Returns

`void`

***

### showSelectionRect()

> **showSelectionRect**(`rect`): `void`

Defined in: [diagram/Diagram.ts:2456](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2456)

Show a temporary rubber-band selection rectangle.

#### Parameters

##### rect

###### height

`number`

###### width

`number`

###### x

`number`

###### y

`number`

#### Returns

`void`

***

### showTempLink()

> **showTempLink**(`from`, `to`): `void`

Defined in: [diagram/Diagram.ts:2437](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L2437)

Show a temporary link preview (used by linking tools).

#### Parameters

##### from

###### x

`number`

###### y

`number`

##### to

###### x

`number`

###### y

`number`

#### Returns

`void`

***

### snapPoint()

> **snapPoint**(`point`): `object`

Defined in: [diagram/Diagram.ts:3236](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3236)

Snap a coordinate to the nearest grid line.

#### Parameters

##### point

###### x

`number`

###### y

`number`

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### snapValue()

> **snapValue**(`value`): `number`

Defined in: [diagram/Diagram.ts:3230](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3230)

Snap a value to the nearest grid line.

#### Parameters

##### value

`number`

#### Returns

`number`

***

### startTransaction()

> **startTransaction**(`name?`): `boolean`

Defined in: [diagram/Diagram.ts:824](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L824)

GoJS-compatible: Begin a transaction. Commands are grouped into one undo unit.

#### Parameters

##### name?

`string` = `'Transaction'`

#### Returns

`boolean`

***

### toJSON()

> **toJSON**(): [`DiagramJSON`](/en/reference/api/graphojs/interfaces/diagramjson/)

Defined in: [diagram/Diagram.ts:3046](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3046)

Serialize the diagram to JSON.

#### Returns

[`DiagramJSON`](/en/reference/api/graphojs/interfaces/diagramjson/)

***

### undo()

> **undo**(): `boolean`

Defined in: [diagram/Diagram.ts:802](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L802)

Undo the last command.

#### Returns

`boolean`

***

### updateThemeBindings()

> **updateThemeBindings**(): `void`

Defined in: [diagram/Diagram.ts:3122](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3122)

Re-apply every binding (including `ThemeBinding`s) on every part, so
templates using `GraphObject.theme()`/`themeData()` pick up the
current theme. Called automatically when `themeManager.currentTheme`
changes or `themeManager.set(...)` is called.

#### Returns

`void`

***

### zoomToFit()

> **zoomToFit**(`padding?`): `void`

Defined in: [diagram/Diagram.ts:3816](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3816)

Zoom to fit all content.

#### Parameters

##### padding?

`number` = `50`

#### Returns

`void`

***

### zoomToRect()

> **zoomToRect**(`rect`, `padding?`): `void`

Defined in: [diagram/Diagram.ts:3846](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/diagram/Diagram.ts#L3846)

GoJS-compatible: Zoom the view so the given rect fills the viewport.

#### Parameters

##### rect

###### height

`number`

###### width

`number`

###### x

`number`

###### y

`number`

##### padding?

`number` = `50`

#### Returns

`void`
