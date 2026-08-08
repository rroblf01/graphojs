---
editUrl: false
next: false
prev: false
title: "Diagram"
---

Defined in: [diagram/Diagram.ts:209](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L209)

A diagram that renders nodes and links on a canvas.

## Constructors

### Constructor

> **new Diagram**(`options`): `Diagram`

Defined in: [diagram/Diagram.ts:352](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L352)

#### Parameters

##### options

`string` \| `HTMLDivElement` \| [`DiagramOptions`](/en/reference/api/graphojs/interfaces/diagramoptions/)

#### Returns

`Diagram`

## Properties

### accessibilityMessages

> **accessibilityMessages**: [`AccessibilityMessages`](/en/reference/api/graphojs/interfaces/accessibilitymessages/)

Defined in: [diagram/Diagram.ts:261](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L261)

Accessibility: message formatters for the aria-label and live-region announcements (default: English).

***

### AlignFill

> `readonly` `static` **AlignFill**: `"Fill"` = `'Fill'`

Defined in: [diagram/Diagram.ts:216](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L216)

***

### AlignMax

> `readonly` `static` **AlignMax**: `"Max"` = `'Max'`

Defined in: [diagram/Diagram.ts:214](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L214)

***

### AlignMin

> `readonly` `static` **AlignMin**: `"Min"` = `'Min'`

Defined in: [diagram/Diagram.ts:213](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L213)

***

### AlignNone

> `readonly` `static` **AlignNone**: `"None"` = `'None'`

Defined in: [diagram/Diagram.ts:211](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L211)

***

### AlignScale

> `readonly` `static` **AlignScale**: `"Scale"` = `'Scale'`

Defined in: [diagram/Diagram.ts:215](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L215)

***

### AlignSpot

> `readonly` `static` **AlignSpot**: `"Spot"` = `'Spot'`

Defined in: [diagram/Diagram.ts:212](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L212)

## Accessors

### actualBounds

#### Get Signature

> **get** **actualBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3639](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3639)

GoJS-compatible: The actual bounds currently occupied by parts.

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### allLinks

#### Get Signature

> **get** **allLinks**(): [`Link`](/en/reference/api/graphojs/classes/link/)[]

Defined in: [diagram/Diagram.ts:2484](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2484)

GoJS-compatible: All links in this diagram.

##### Returns

[`Link`](/en/reference/api/graphojs/classes/link/)[]

***

### allNodes

#### Get Signature

> **get** **allNodes**(): [`Node`](/en/reference/api/graphojs/classes/node/)[]

Defined in: [diagram/Diagram.ts:2489](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2489)

GoJS-compatible: All nodes in this diagram (as an array).

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/)[]

***

### allowArrange

#### Get Signature

> **get** **allowArrange**(): `boolean`

Defined in: [diagram/Diagram.ts:1013](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L1013)

GoJS-compatible: Whether parts can be rearranged.

##### Returns

`boolean`

#### Set Signature

> **set** **allowArrange**(`value`): `void`

Defined in: [diagram/Diagram.ts:1017](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L1017)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowCopy

#### Get Signature

> **get** **allowCopy**(): `boolean`

Defined in: [diagram/Diagram.ts:860](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L860)

GoJS-compatible: Whether parts can be copied.

##### Returns

`boolean`

#### Set Signature

> **set** **allowCopy**(`value`): `void`

Defined in: [diagram/Diagram.ts:864](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L864)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowDelete

#### Get Signature

> **get** **allowDelete**(): `boolean`

Defined in: [diagram/Diagram.ts:869](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L869)

GoJS-compatible: Whether parts can be deleted.

##### Returns

`boolean`

#### Set Signature

> **set** **allowDelete**(`value`): `void`

Defined in: [diagram/Diagram.ts:873](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L873)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowDrop

#### Get Signature

> **get** **allowDrop**(): `boolean`

Defined in: [diagram/Diagram.ts:878](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L878)

GoJS-compatible: Whether parts can be dropped onto the diagram.

##### Returns

`boolean`

#### Set Signature

> **set** **allowDrop**(`value`): `void`

Defined in: [diagram/Diagram.ts:882](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L882)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowGroup

#### Get Signature

> **get** **allowGroup**(): `boolean`

Defined in: [diagram/Diagram.ts:977](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L977)

GoJS-compatible: Whether nodes can be grouped.

##### Returns

`boolean`

#### Set Signature

> **set** **allowGroup**(`value`): `void`

Defined in: [diagram/Diagram.ts:981](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L981)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowHorizontalScroll

#### Get Signature

> **get** **allowHorizontalScroll**(): `boolean`

Defined in: [diagram/Diagram.ts:896](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L896)

GoJS-compatible: Whether horizontal scrolling is allowed.

##### Returns

`boolean`

#### Set Signature

> **set** **allowHorizontalScroll**(`value`): `void`

Defined in: [diagram/Diagram.ts:900](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L900)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowInsert

#### Get Signature

> **get** **allowInsert**(): `boolean`

Defined in: [diagram/Diagram.ts:986](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L986)

GoJS-compatible: Whether new nodes can be inserted.

##### Returns

`boolean`

#### Set Signature

> **set** **allowInsert**(`value`): `void`

Defined in: [diagram/Diagram.ts:990](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L990)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowLink

#### Get Signature

> **get** **allowLink**(): `boolean`

Defined in: [diagram/Diagram.ts:959](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L959)

GoJS-compatible: Whether new links can be drawn.

##### Returns

`boolean`

#### Set Signature

> **set** **allowLink**(`value`): `void`

Defined in: [diagram/Diagram.ts:963](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L963)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowMove

#### Get Signature

> **get** **allowMove**(): `boolean`

Defined in: [diagram/Diagram.ts:851](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L851)

GoJS-compatible: Whether parts can be moved.

##### Returns

`boolean`

#### Set Signature

> **set** **allowMove**(`value`): `void`

Defined in: [diagram/Diagram.ts:855](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L855)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowRelink

#### Get Signature

> **get** **allowRelink**(): `boolean`

Defined in: [diagram/Diagram.ts:968](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L968)

GoJS-compatible: Whether existing links can be reconnected.

##### Returns

`boolean`

#### Set Signature

> **set** **allowRelink**(`value`): `void`

Defined in: [diagram/Diagram.ts:972](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L972)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowResize

#### Get Signature

> **get** **allowResize**(): `boolean`

Defined in: [diagram/Diagram.ts:995](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L995)

GoJS-compatible: Whether nodes can be resized.

##### Returns

`boolean`

#### Set Signature

> **set** **allowResize**(`value`): `void`

Defined in: [diagram/Diagram.ts:999](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L999)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowRotate

#### Get Signature

> **get** **allowRotate**(): `boolean`

Defined in: [diagram/Diagram.ts:1004](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L1004)

GoJS-compatible: Whether nodes can be rotated.

##### Returns

`boolean`

#### Set Signature

> **set** **allowRotate**(`value`): `void`

Defined in: [diagram/Diagram.ts:1008](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L1008)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowTextEdit

#### Get Signature

> **get** **allowTextEdit**(): `boolean`

Defined in: [diagram/Diagram.ts:950](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L950)

GoJS-compatible: Whether in-place text editing is allowed.

##### Returns

`boolean`

#### Set Signature

> **set** **allowTextEdit**(`value`): `void`

Defined in: [diagram/Diagram.ts:954](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L954)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowVerticalScroll

#### Get Signature

> **get** **allowVerticalScroll**(): `boolean`

Defined in: [diagram/Diagram.ts:905](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L905)

GoJS-compatible: Whether vertical scrolling is allowed.

##### Returns

`boolean`

#### Set Signature

> **set** **allowVerticalScroll**(`value`): `void`

Defined in: [diagram/Diagram.ts:909](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L909)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### allowZoom

#### Get Signature

> **get** **allowZoom**(): `boolean`

Defined in: [diagram/Diagram.ts:887](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L887)

GoJS-compatible: Whether zooming is allowed.

##### Returns

`boolean`

#### Set Signature

> **set** **allowZoom**(`value`): `void`

Defined in: [diagram/Diagram.ts:891](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L891)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### animationManager

#### Get Signature

> **get** **animationManager**(): [`AnimationManager`](/en/reference/api/graphojs/classes/animationmanager/)

Defined in: [diagram/Diagram.ts:575](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L575)

GoJS-compatible: The animation manager.

##### Returns

[`AnimationManager`](/en/reference/api/graphojs/classes/animationmanager/)

***

### autoScale

#### Get Signature

> **get** **autoScale**(): `number`

Defined in: [diagram/Diagram.ts:2549](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2549)

GoJS-compatible: AutoScale mode (0=None, 1=Uniform, 2=Fit).

##### Returns

`number`

#### Set Signature

> **set** **autoScale**(`value`): `void`

Defined in: [diagram/Diagram.ts:2553](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2553)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### background

#### Get Signature

> **get** **background**(): `string`

Defined in: [diagram/Diagram.ts:2702](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2702)

GoJS-compatible: The background color of the diagram.

##### Returns

`string`

#### Set Signature

> **set** **background**(`value`): `void`

Defined in: [diagram/Diagram.ts:2706](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2706)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### commandHandler

#### Get Signature

> **get** **commandHandler**(): [`CommandHandler`](/en/reference/api/graphojs/classes/commandhandler/)

Defined in: [diagram/Diagram.ts:585](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L585)

GoJS-compatible: The command handler.

##### Returns

[`CommandHandler`](/en/reference/api/graphojs/classes/commandhandler/)

***

### contentAlignment

#### Get Signature

> **get** **contentAlignment**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [diagram/Diagram.ts:2537](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2537)

GoJS-compatible: The alignment of the diagram content within the viewport.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **contentAlignment**(`value`): `void`

Defined in: [diagram/Diagram.ts:2541](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2541)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

***

### div

#### Get Signature

> **get** **div**(): `HTMLDivElement`

Defined in: [diagram/Diagram.ts:2685](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2685)

GoJS-compatible: The HTML element this diagram renders into.

##### Returns

`HTMLDivElement`

***

### documentBounds

#### Get Signature

> **get** **documentBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3624](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3624)

GoJS-compatible: The bounds of the document (all content).

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### grid

#### Get Signature

> **get** **grid**(): `unknown`

Defined in: [diagram/Diagram.ts:2525](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2525)

GoJS-compatible: A Shape (or null) used as a grid pattern behind the diagram.

##### Returns

`unknown`

#### Set Signature

> **set** **grid**(`value`): `void`

Defined in: [diagram/Diagram.ts:2529](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2529)

##### Parameters

###### value

`unknown`

##### Returns

`void`

***

### groups

#### Get Signature

> **get** **groups**(): `ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Group`](/en/reference/api/graphojs/classes/group/)\>

Defined in: [diagram/Diagram.ts:2504](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2504)

GoJS-compatible: The groups in this diagram.

##### Returns

`ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Group`](/en/reference/api/graphojs/classes/group/)\>

***

### groupTemplate

#### Get Signature

> **get** **groupTemplate**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [diagram/Diagram.ts:614](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L614)

GoJS-compatible: Get the default group template.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **groupTemplate**(`value`): `void`

Defined in: [diagram/Diagram.ts:619](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L619)

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

Defined in: [diagram/Diagram.ts:636](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L636)

GoJS-compatible: Get the group template map.

##### Returns

`Map`\<`string`, [`Panel`](/en/reference/api/graphojs/classes/panel/)\>

***

### horizontalScrollPosition

#### Get Signature

> **get** **horizontalScrollPosition**(): `number`

Defined in: [diagram/Diagram.ts:3644](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3644)

GoJS-compatible: The horizontal scroll position in document coordinates.

##### Returns

`number`

#### Set Signature

> **set** **horizontalScrollPosition**(`value`): `void`

Defined in: [diagram/Diagram.ts:3648](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3648)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### initialContentAlignment

#### Get Signature

> **get** **initialContentAlignment**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [diagram/Diagram.ts:932](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L932)

GoJS-compatible: The initial content alignment spot.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **initialContentAlignment**(`value`): `void`

Defined in: [diagram/Diagram.ts:936](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L936)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

***

### initialContentAlignmentOffset

#### Get Signature

> **get** **initialContentAlignmentOffset**(): \{ `x`: `number`; `y`: `number`; \} \| `null`

Defined in: [diagram/Diagram.ts:941](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L941)

GoJS-compatible: The initial content alignment offset.

##### Returns

\{ `x`: `number`; `y`: `number`; \} \| `null`

#### Set Signature

> **set** **initialContentAlignmentOffset**(`value`): `void`

Defined in: [diagram/Diagram.ts:945](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L945)

##### Parameters

###### value

\{ `x`: `number`; `y`: `number`; \} \| `null`

##### Returns

`void`

***

### isEnabled

#### Get Signature

> **get** **isEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:914](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L914)

GoJS-compatible: Whether the diagram is enabled (interactive).

##### Returns

`boolean`

#### Set Signature

> **set** **isEnabled**(`value`): `void`

Defined in: [diagram/Diagram.ts:918](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L918)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isModified

#### Get Signature

> **get** **isModified**(): `boolean`

Defined in: [diagram/Diagram.ts:2712](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2712)

GoJS-compatible: Whether the diagram's model has been modified.

##### Returns

`boolean`

#### Set Signature

> **set** **isModified**(`value`): `void`

Defined in: [diagram/Diagram.ts:2716](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2716)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isReadOnly

#### Get Signature

> **get** **isReadOnly**(): `boolean`

Defined in: [diagram/Diagram.ts:842](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L842)

GoJS-compatible: Whether the diagram is read-only.

##### Returns

`boolean`

#### Set Signature

> **set** **isReadOnly**(`value`): `void`

Defined in: [diagram/Diagram.ts:846](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L846)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### layers

#### Get Signature

> **get** **layers**(): readonly [`Layer`](/en/reference/api/graphojs/classes/layer/)[]

Defined in: [diagram/Diagram.ts:2616](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2616)

GoJS-compatible: The layers in this diagram.

##### Returns

readonly [`Layer`](/en/reference/api/graphojs/classes/layer/)[]

***

### layout

#### Get Signature

> **get** **layout**(): [`Layout`](/en/reference/api/graphojs/classes/layout/) \| `null`

Defined in: [diagram/Diagram.ts:2623](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2623)

##### Returns

[`Layout`](/en/reference/api/graphojs/classes/layout/) \| `null`

#### Set Signature

> **set** **layout**(`value`): `void`

Defined in: [diagram/Diagram.ts:2627](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2627)

##### Parameters

###### value

[`Layout`](/en/reference/api/graphojs/classes/layout/) \| `null`

##### Returns

`void`

***

### links

#### Get Signature

> **get** **links**(): `ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Link`](/en/reference/api/graphojs/classes/link/)\>

Defined in: [diagram/Diagram.ts:2499](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2499)

GoJS-compatible: The links in this diagram.

##### Returns

`ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Link`](/en/reference/api/graphojs/classes/link/)\>

***

### linkTemplate

#### Get Signature

> **get** **linkTemplate**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [diagram/Diagram.ts:602](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L602)

GoJS-compatible: Get the default link template.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **linkTemplate**(`value`): `void`

Defined in: [diagram/Diagram.ts:607](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L607)

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

Defined in: [diagram/Diagram.ts:631](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L631)

GoJS-compatible: Get the link template map.

##### Returns

`Map`\<`string`, [`Panel`](/en/reference/api/graphojs/classes/panel/)\>

***

### maxScale

#### Get Signature

> **get** **maxScale**(): `number`

Defined in: [diagram/Diagram.ts:320](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L320)

GoJS-compatible: The maximum zoom scale.

##### Returns

`number`

#### Set Signature

> **set** **maxScale**(`value`): `void`

Defined in: [diagram/Diagram.ts:325](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L325)

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

Defined in: [diagram/Diagram.ts:1022](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L1022)

GoJS-compatible: The maximum number of parts that can be selected.

##### Returns

`number`

#### Set Signature

> **set** **maxSelectionCount**(`value`): `void`

Defined in: [diagram/Diagram.ts:1026](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L1026)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### minScale

#### Get Signature

> **get** **minScale**(): `number`

Defined in: [diagram/Diagram.ts:308](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L308)

GoJS-compatible: The minimum zoom scale.

##### Returns

`number`

#### Set Signature

> **set** **minScale**(`value`): `void`

Defined in: [diagram/Diagram.ts:313](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L313)

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

Defined in: [diagram/Diagram.ts:2601](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2601)

GoJS-compatible: Get the model.

##### Returns

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

#### Set Signature

> **set** **model**(`value`): `void`

Defined in: [diagram/Diagram.ts:2606](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2606)

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

Defined in: [diagram/Diagram.ts:2745](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2745)

##### Returns

((`event`) => `void`) \| `null`

#### Set Signature

> **set** **modelChanged**(`listener`): `void`

Defined in: [diagram/Diagram.ts:2735](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2735)

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

Defined in: [diagram/Diagram.ts:2494](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2494)

GoJS-compatible: The nodes in this diagram.

##### Returns

`ReadonlyMap`\<[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/), [`Node`](/en/reference/api/graphojs/classes/node/)\>

***

### nodeTemplate

#### Get Signature

> **get** **nodeTemplate**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [diagram/Diagram.ts:590](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L590)

GoJS-compatible: Get the default node template.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **nodeTemplate**(`value`): `void`

Defined in: [diagram/Diagram.ts:595](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L595)

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

Defined in: [diagram/Diagram.ts:626](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L626)

GoJS-compatible: Get the node template map.

##### Returns

`Map`\<`string`, [`Panel`](/en/reference/api/graphojs/classes/panel/)\>

***

### padding

#### Get Signature

> **get** **padding**(): `number`

Defined in: [diagram/Diagram.ts:3273](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3273)

GoJS-compatible: The padding around the content.

##### Returns

`number`

#### Set Signature

> **set** **padding**(`value`): `void`

Defined in: [diagram/Diagram.ts:3277](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3277)

##### Parameters

###### value

`number` \| \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}

##### Returns

`void`

***

### position

#### Get Signature

> **get** **position**(): `object`

Defined in: [diagram/Diagram.ts:3264](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3264)

GoJS-compatible: The position (top-left of the viewport in diagram coordinates).

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **position**(`value`): `void`

Defined in: [diagram/Diagram.ts:3268](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3268)

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

Defined in: [diagram/Diagram.ts:3253](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3253)

GoJS-compatible: The current zoom scale.

##### Returns

`number`

#### Set Signature

> **set** **scale**(`value`): `void`

Defined in: [diagram/Diagram.ts:3257](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3257)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### scrollBehavior

#### Get Signature

> **get** **scrollBehavior**(): `number`

Defined in: [diagram/Diagram.ts:2561](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2561)

GoJS-compatible: How scrolling and scrollbars behave.

##### Returns

`number`

#### Set Signature

> **set** **scrollBehavior**(`value`): `void`

Defined in: [diagram/Diagram.ts:2565](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2565)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### scrollMode

#### Get Signature

> **get** **scrollMode**(): `"document"` \| `"infinite"`

Defined in: [diagram/Diagram.ts:923](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L923)

GoJS-compatible: The scroll mode ('document' or 'infinite').

##### Returns

`"document"` \| `"infinite"`

#### Set Signature

> **set** **scrollMode**(`value`): `void`

Defined in: [diagram/Diagram.ts:927](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L927)

##### Parameters

###### value

`"document"` \| `"infinite"`

##### Returns

`void`

***

### selection

#### Get Signature

> **get** **selection**(): ([`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/))[]

Defined in: [diagram/Diagram.ts:2479](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2479)

GoJS-compatible: The set of currently selected parts.

##### Returns

([`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/))[]

***

### selectionStyle

#### Get Signature

> **get** **selectionStyle**(): [`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)

Defined in: [diagram/Diagram.ts:2639](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2639)

Colors used for selection highlights and the keyboard focus cursor.
Defaults to a high-contrast palette when the OS requests more contrast
(see the constructor); assigning here always overrides that default.

##### Returns

[`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)

#### Set Signature

> **set** **selectionStyle**(`value`): `void`

Defined in: [diagram/Diagram.ts:2643](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2643)

##### Parameters

###### value

[`SelectionStyle`](/en/reference/api/graphojs/interfaces/selectionstyle/)

##### Returns

`void`

***

### toolManager

#### Get Signature

> **get** **toolManager**(): [`ToolManager`](/en/reference/api/graphojs/classes/toolmanager/)

Defined in: [diagram/Diagram.ts:555](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L555)

GoJS-compatible: The tool manager.

##### Returns

[`ToolManager`](/en/reference/api/graphojs/classes/toolmanager/)

***

### undoManager

#### Get Signature

> **get** **undoManager**(): [`UndoManager`](/en/reference/api/graphojs/classes/undomanager/)

Defined in: [diagram/Diagram.ts:565](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L565)

GoJS-compatible: The undo manager.

##### Returns

[`UndoManager`](/en/reference/api/graphojs/classes/undomanager/)

***

### verticalScrollPosition

#### Get Signature

> **get** **verticalScrollPosition**(): `number`

Defined in: [diagram/Diagram.ts:3653](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3653)

GoJS-compatible: The vertical scroll position in document coordinates.

##### Returns

`number`

#### Set Signature

> **set** **verticalScrollPosition**(`value`): `void`

Defined in: [diagram/Diagram.ts:3657](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3657)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### viewportBounds

#### Get Signature

> **get** **viewportBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3629](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3629)

GoJS-compatible: The bounds of the viewport.

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### zoomFactor

#### Get Signature

> **get** **zoomFactor**(): `number`

Defined in: [diagram/Diagram.ts:3216](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3216)

GoJS-compatible: The current zoom factor (alias for scale).

##### Returns

`number`

#### Set Signature

> **set** **zoomFactor**(`value`): `void`

Defined in: [diagram/Diagram.ts:3220](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3220)

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### add()

> **add**(`part`): `void`

Defined in: [diagram/Diagram.ts:3298](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3298)

GoJS-compatible: Add a part directly to the diagram (and its data to the model).

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### addAnyDiagramListener()

> **addAnyDiagramListener**(`handler`): `void`

Defined in: [diagram/Diagram.ts:676](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L676)

Add a listener for all diagram events.

#### Parameters

##### handler

(`event`) => `void`

#### Returns

`void`

***

### addDiagramListener()

> **addDiagramListener**(`type`, `handler`): `void`

Defined in: [diagram/Diagram.ts:671](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L671)

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

Defined in: [diagram/Diagram.ts:651](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L651)

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

Defined in: [diagram/Diagram.ts:2760](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2760)

Add a layer.

#### Parameters

##### layer

[`Layer`](/en/reference/api/graphojs/classes/layer/)

#### Returns

`void`

***

### addLinkTemplate()

> **addLinkTemplate**(`category`, `template`): `void`

Defined in: [diagram/Diagram.ts:646](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L646)

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

Defined in: [diagram/Diagram.ts:2723](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2723)

GoJS-compatible: Register a model changed listener.

#### Parameters

##### listener

(`event`) => `void`

#### Returns

`void`

***

### addNodeTemplate()

> **addNodeTemplate**(`category`, `template`): `void`

Defined in: [diagram/Diagram.ts:641](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L641)

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

Defined in: [diagram/Diagram.ts:3333](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3333)

GoJS-compatible: Add multiple parts at once.

#### Parameters

##### parts

`Iterable`\<[`Part`](/en/reference/api/graphojs/classes/part/)\>

#### Returns

`void`

***

### announce()

> **announce**(`message`): `void`

Defined in: [diagram/Diagram.ts:2351](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2351)

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

Defined in: [diagram/Diagram.ts:3584](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3584)

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

Defined in: [diagram/Diagram.ts:3579](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3579)

GoJS-compatible: Scroll the view so that a rect is centered.

#### Parameters

##### rect

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [diagram/Diagram.ts:2238](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2238)

GoJS-compatible: Remove all parts and clear the model.

#### Returns

`void`

***

### clearSelection()

> **clearSelection**(): `void`

Defined in: [diagram/Diagram.ts:2406](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2406)

Clear all selections.

#### Returns

`void`

***

### collapseGroup()

> **collapseGroup**(`group`): `void`

Defined in: [diagram/Diagram.ts:2452](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2452)

GoJS-compatible: Collapse a group's subgraph, firing SubGraphCollapsed.

#### Parameters

##### group

[`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`

***

### collapseTree()

> **collapseTree**(`node`): `void`

Defined in: [diagram/Diagram.ts:3710](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3710)

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

Defined in: [diagram/Diagram.ts:822](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L822)

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

Defined in: [diagram/Diagram.ts:797](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L797)

GoJS-compatible: Commit the current transaction.

#### Parameters

##### name?

`string` = `''`

#### Returns

`boolean`

***

### computeBounds()

> **computeBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3634](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3634)

GoJS-compatible: The bounds of all content, including links.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### deselect()

> **deselect**(`part`): `void`

Defined in: [diagram/Diagram.ts:2436](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2436)

GoJS-compatible: Deselect a part.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: [diagram/Diagram.ts:3763](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3763)

Destroy the diagram and clean up resources.

#### Returns

`void`

***

### disableDoubleBuffering()

> **disableDoubleBuffering**(): `void`

Defined in: [diagram/Diagram.ts:2848](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2848)

Disable double-buffered rendering.

#### Returns

`void`

***

### disableLayerCaching()

> **disableLayerCaching**(): `void`

Defined in: [diagram/Diagram.ts:2814](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2814)

Disable layer caching.

#### Returns

`void`

***

### disableLOD()

> **disableLOD**(): `void`

Defined in: [diagram/Diagram.ts:2867](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2867)

Disable level-of-detail rendering.

#### Returns

`void`

***

### disableSnapToGrid()

> **disableSnapToGrid**(): `void`

Defined in: [diagram/Diagram.ts:2894](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2894)

Disable grid snapping.

#### Returns

`void`

***

### disableTooltips()

> **disableTooltips**(): `void`

Defined in: [diagram/Diagram.ts:2831](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2831)

Disable hover tooltips.

#### Returns

`void`

***

### disableVirtualization()

> **disableVirtualization**(): `void`

Defined in: [diagram/Diagram.ts:716](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L716)

Disable virtualization.

#### Returns

`void`

***

### enableDoubleBuffering()

> **enableDoubleBuffering**(): `void`

Defined in: [diagram/Diagram.ts:2842](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2842)

Enable double-buffered rendering (render offscreen then blit).

#### Returns

`void`

***

### enableLayerCaching()

> **enableLayerCaching**(`scale?`): `void`

Defined in: [diagram/Diagram.ts:2807](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2807)

Enable layer caching (renders static layers to offscreen canvases).

#### Parameters

##### scale?

`number`

#### Returns

`void`

***

### enableLOD()

> **enableLOD**(`threshold?`): `void`

Defined in: [diagram/Diagram.ts:2860](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2860)

Enable level-of-detail rendering (hides labels when zoomed out).

#### Parameters

##### threshold?

`number`

#### Returns

`void`

***

### enableSnapToGrid()

> **enableSnapToGrid**(): `void`

Defined in: [diagram/Diagram.ts:2889](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2889)

Enable grid snapping for moved parts.

#### Returns

`void`

***

### enableTooltips()

> **enableTooltips**(`options?`): `void`

Defined in: [diagram/Diagram.ts:2826](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2826)

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

Defined in: [diagram/Diagram.ts:708](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L708)

Enable virtualization (viewport culling) with a world bounds.

#### Parameters

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`

***

### executeCommand()

> **executeCommand**(`command`): `void`

Defined in: [diagram/Diagram.ts:762](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L762)

Execute an undoable command.

#### Parameters

##### command

[`Command`](/en/reference/api/graphojs/interfaces/command/)

#### Returns

`void`

***

### expandGroup()

> **expandGroup**(`group`): `void`

Defined in: [diagram/Diagram.ts:2460](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2460)

GoJS-compatible: Expand a group's subgraph, firing SubGraphExpanded.

#### Parameters

##### group

[`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`

***

### expandTree()

> **expandTree**(`node`): `void`

Defined in: [diagram/Diagram.ts:3724](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3724)

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

Defined in: [diagram/Diagram.ts:2447](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2447)

GoJS-compatible: Find a group part by its model key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Group`](/en/reference/api/graphojs/classes/group/) \| `null`

***

### findLayer()

> **findLayer**(`name`): [`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

Defined in: [diagram/Diagram.ts:2755](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2755)

GoJS-compatible: Find a layer by name.

#### Parameters

##### name

`string`

#### Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

***

### findLinkForData()

> **findLinkForData**(`data`): [`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

Defined in: [diagram/Diagram.ts:2231](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2231)

GoJS-compatible: Find a link part by its model data object.

#### Parameters

##### data

[`LinkData`](/en/reference/api/graphojs/interfaces/linkdata/)

#### Returns

[`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

***

### findLinkForKey()

> **findLinkForKey**(`key`): [`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

Defined in: [diagram/Diagram.ts:2220](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2220)

GoJS-compatible: Find a link part by its model key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

***

### findNodeForData()

> **findNodeForData**(`data`): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [diagram/Diagram.ts:2225](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2225)

GoJS-compatible: Find a node part by its model data object.

#### Parameters

##### data

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### findNodeForKey()

> **findNodeForKey**(`key`): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [diagram/Diagram.ts:2210](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2210)

GoJS-compatible: Find a node part by its model key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### findPartAt()

> **findPartAt**(`x`, `y`): [`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

Defined in: [diagram/Diagram.ts:2127](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2127)

Find a part at the given diagram coordinates.

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

[`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| `null`

***

### findPartForKey()

> **findPartForKey**(`key`): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [diagram/Diagram.ts:2215](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2215)

GoJS-compatible: Find a part (node, group, or link) by its model key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

***

### findPartsInRect()

> **findPartsInRect**(`rect`, `_partialInclusion?`): ([`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/))[]

Defined in: [diagram/Diagram.ts:3283](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3283)

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

([`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/))[]

***

### findTreeChildren()

> **findTreeChildren**(`node`): [`Node`](/en/reference/api/graphojs/classes/node/)[]

Defined in: [diagram/Diagram.ts:3674](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3674)

GoJS-compatible: Find the tree children of a node.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/)[]

***

### findTreeParent()

> **findTreeParent**(`node`): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [diagram/Diagram.ts:3686](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3686)

GoJS-compatible: Find the tree parent of a node, or null.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### findTreeRoots()

> **findTreeRoots**(): [`Node`](/en/reference/api/graphojs/classes/node/)[]

Defined in: [diagram/Diagram.ts:3662](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3662)

GoJS-compatible: Find all nodes that are tree roots (no parent key).

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/)[]

***

### fireDiagramEvent()

> **fireDiagramEvent**(`type`, `part?`, `data?`): `void`

Defined in: [diagram/Diagram.ts:696](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L696)

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

Defined in: [diagram/Diagram.ts:2695](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2695)

GoJS-compatible: Give keyboard focus to the diagram's div.

#### Returns

`void`

***

### fromJSON()

> **fromJSON**(`json`): `void`

Defined in: [diagram/Diagram.ts:2797](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2797)

Deserialize JSON into the diagram.

#### Parameters

##### json

[`DiagramJSON`](/en/reference/api/graphojs/interfaces/diagramjson/)

#### Returns

`void`

***

### getAlignmentGuidelines()

> **getAlignmentGuidelines**(): `object`[]

Defined in: [diagram/Diagram.ts:2306](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2306)

Get the alignment guideline segments currently shown.

#### Returns

`object`[]

***

### getAnimationManager()

> **getAnimationManager**(): [`AnimationManager`](/en/reference/api/graphojs/classes/animationmanager/)

Defined in: [diagram/Diagram.ts:570](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L570)

Get the animation manager.

#### Returns

[`AnimationManager`](/en/reference/api/graphojs/classes/animationmanager/)

***

### getCanvasBounds()

> **getCanvasBounds**(): `object`

Defined in: [diagram/Diagram.ts:2517](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2517)

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

Defined in: [diagram/Diagram.ts:580](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L580)

Get the command handler.

#### Returns

[`CommandHandler`](/en/reference/api/graphojs/classes/commandhandler/)

***

### getContentBounds()

> **getContentBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [diagram/Diagram.ts:3592](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3592)

Get the bounds of all content in the diagram.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### getContextMenu()

> **getContextMenu**(): [`ContextMenu`](/en/reference/api/graphojs/classes/contextmenu/) \| `null`

Defined in: [diagram/Diagram.ts:837](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L837)

Get the current context menu.

#### Returns

[`ContextMenu`](/en/reference/api/graphojs/classes/contextmenu/) \| `null`

***

### getDiagramDiv()

> **getDiagramDiv**(): `HTMLDivElement`

Defined in: [diagram/Diagram.ts:2690](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2690)

GoJS-compatible: Get the HTML element this diagram renders into.

#### Returns

`HTMLDivElement`

***

### getDiagramPoint()

> **getDiagramPoint**(`e`): `object`

Defined in: [diagram/Diagram.ts:2335](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2335)

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

Defined in: [diagram/Diagram.ts:2910](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2910)

Get the grid size.

#### Returns

`number`

***

### getLayer()

> **getLayer**(`name`): [`Layer`](/en/reference/api/graphojs/classes/layer/) \| `undefined`

Defined in: [diagram/Diagram.ts:2750](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2750)

Get a layer by name.

#### Parameters

##### name

`string`

#### Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `undefined`

***

### getLayers()

> **getLayers**(): readonly [`Layer`](/en/reference/api/graphojs/classes/layer/)[]

Defined in: [diagram/Diagram.ts:2611](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2611)

Get all layers.

#### Returns

readonly [`Layer`](/en/reference/api/graphojs/classes/layer/)[]

***

### getLODLabelThreshold()

> **getLODLabelThreshold**(): `number`

Defined in: [diagram/Diagram.ts:2884](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2884)

Get the LOD label threshold.

#### Returns

`number`

***

### getModel()

> **getModel**(): [`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

Defined in: [diagram/Diagram.ts:3185](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3185)

Get the underlying model.

#### Returns

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

***

### getPart()

> **getPart**(`key`): [`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| `undefined`

Defined in: [diagram/Diagram.ts:2205](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2205)

Get a part by key.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

[`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/) \| `undefined`

***

### getPartPool()

> **getPartPool**(): [`PartPool`](/en/reference/api/graphojs/classes/partpool/)

Defined in: [diagram/Diagram.ts:732](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L732)

Get the part pool.

#### Returns

[`PartPool`](/en/reference/api/graphojs/classes/partpool/)

***

### getRenderer()

> **getRenderer**(): [`Renderer`](/en/reference/api/graphojs/interfaces/renderer/)

Defined in: [diagram/Diagram.ts:3190](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3190)

Get the renderer.

#### Returns

[`Renderer`](/en/reference/api/graphojs/interfaces/renderer/)

***

### getSelectedParts()

> **getSelectedParts**(): ([`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/))[]

Defined in: [diagram/Diagram.ts:2468](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2468)

Get selected parts.

#### Returns

([`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/))[]

***

### getSelectionRect()

> **getSelectionRect**(): \{ `height`: `number`; `width`: `number`; `x`: `number`; `y`: `number`; \} \| `null`

Defined in: [diagram/Diagram.ts:2283](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2283)

Get the current selection rectangle, or null.

#### Returns

\{ `height`: `number`; `width`: `number`; `x`: `number`; `y`: `number`; \} \| `null`

***

### getTempLink()

> **getTempLink**(): \{ `from`: \{ `x`: `number`; `y`: `number`; \}; `to`: \{ `x`: `number`; `y`: `number`; \}; \} \| `null`

Defined in: [diagram/Diagram.ts:2264](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2264)

Get the current temporary link, or null.

#### Returns

\{ `from`: \{ `x`: `number`; `y`: `number`; \}; `to`: \{ `x`: `number`; `y`: `number`; \}; \} \| `null`

***

### getToolManager()

> **getToolManager**(): [`ToolManager`](/en/reference/api/graphojs/classes/toolmanager/)

Defined in: [diagram/Diagram.ts:550](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L550)

Get the tool manager.

#### Returns

[`ToolManager`](/en/reference/api/graphojs/classes/toolmanager/)

***

### getTooltipManager()

> **getTooltipManager**(): [`TooltipManager`](/en/reference/api/graphojs/classes/tooltipmanager/) \| `null`

Defined in: [diagram/Diagram.ts:2837](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2837)

Get the tooltip manager, or null if disabled.

#### Returns

[`TooltipManager`](/en/reference/api/graphojs/classes/tooltipmanager/) \| `null`

***

### getUndoManager()

> **getUndoManager**(): [`UndoManager`](/en/reference/api/graphojs/classes/undomanager/)

Defined in: [diagram/Diagram.ts:560](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L560)

Get the undo manager.

#### Returns

[`UndoManager`](/en/reference/api/graphojs/classes/undomanager/)

***

### getViewport()

> **getViewport**(): `object`

Defined in: [diagram/Diagram.ts:3241](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3241)

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

Defined in: [diagram/Diagram.ts:3613](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3613)

Get the current viewport bounds in diagram coordinates.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### getVirtualizationManager()

> **getVirtualizationManager**(): [`VirtualizationManager`](/en/reference/api/graphojs/classes/virtualizationmanager/) \| `null`

Defined in: [diagram/Diagram.ts:727](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L727)

Get the virtualization manager, or null if disabled.

#### Returns

[`VirtualizationManager`](/en/reference/api/graphojs/classes/virtualizationmanager/) \| `null`

***

### hasDiagramListeners()

> **hasDiagramListeners**(`type`): `boolean`

Defined in: [diagram/Diagram.ts:691](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L691)

Check whether there are listeners for a diagram event type.

#### Parameters

##### type

[`DiagramEventType`](/en/reference/api/graphojs/type-aliases/diagrameventtype/)

#### Returns

`boolean`

***

### hideAlignmentGuidelines()

> **hideAlignmentGuidelines**(): `void`

Defined in: [diagram/Diagram.ts:2298](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2298)

Hide any alignment guidelines currently shown.

#### Returns

`void`

***

### hideContextMenu()

> **hideContextMenu**(): `void`

Defined in: [diagram/Diagram.ts:1096](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L1096)

Hide any floating part context menu.

#### Returns

`void`

***

### hideSelectionRect()

> **hideSelectionRect**(): `void`

Defined in: [diagram/Diagram.ts:2275](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2275)

Hide the temporary selection rectangle.

#### Returns

`void`

***

### hideTempLink()

> **hideTempLink**(): `void`

Defined in: [diagram/Diagram.ts:2256](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2256)

Hide the temporary link preview.

#### Returns

`void`

***

### invalidate()

> **invalidate**(): `void`

Defined in: [diagram/Diagram.ts:2802](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2802)

Invalidate the diagram (triggers re-render).

#### Returns

`void`

***

### invalidateLinksForNode()

> **invalidateLinksForNode**(`nodeKey`): `void`

Defined in: [diagram/Diagram.ts:3403](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3403)

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

Defined in: [diagram/Diagram.ts:3833](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3833)

Check whether the diagram has been destroyed.

#### Returns

`boolean`

***

### isDoubleBufferingEnabled()

> **isDoubleBufferingEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:2855](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2855)

Check whether double-buffered rendering is enabled.

#### Returns

`boolean`

***

### isLayerCachingEnabled()

> **isLayerCachingEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:2821](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2821)

Check whether layer caching is enabled.

#### Returns

`boolean`

***

### isLODEnabled()

> **isLODEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:2873](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2873)

Check whether LOD rendering is enabled.

#### Returns

`boolean`

***

### isSnapToGridEnabled()

> **isSnapToGridEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:2899](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2899)

Check whether grid snapping is enabled.

#### Returns

`boolean`

***

### isTreeExpanded()

> **isTreeExpanded**(`node`): `boolean`

Defined in: [diagram/Diagram.ts:2509](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2509)

GoJS-compatible: Whether a node (group) subgraph is expanded.

#### Parameters

##### node

[`Node`](/en/reference/api/graphojs/classes/node/)

#### Returns

`boolean`

***

### isVirtualizationEnabled()

> **isVirtualizationEnabled**(): `boolean`

Defined in: [diagram/Diagram.ts:722](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L722)

Check whether virtualization is enabled.

#### Returns

`boolean`

***

### layoutDiagram()

> **layoutDiagram**(`layout?`): `void`

Defined in: [diagram/Diagram.ts:2662](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2662)

GoJS-compatible: Run the diagram layout (or the given layout) on all parts.

#### Parameters

##### layout?

[`Layout`](/en/reference/api/graphojs/classes/layout/)

#### Returns

`void`

***

### layoutParts()

> **layoutParts**(`parts`): `void`

Defined in: [diagram/Diagram.ts:2674](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2674)

GoJS-compatible: Run the layout on the given parts.

#### Parameters

##### parts

readonly [`Part`](/en/reference/api/graphojs/classes/part/)[]

#### Returns

`void`

***

### makeImage()

> **makeImage**(`options?`): `HTMLCanvasElement`

Defined in: [diagram/Diagram.ts:3197](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3197)

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

Defined in: [diagram/Diagram.ts:3206](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3206)

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

Defined in: [diagram/Diagram.ts:3211](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3211)

GoJS-compatible: Render the diagram as an SVGElement.

#### Returns

`SVGElement`

***

### moveToLayer()

> **moveToLayer**(`part`, `layerName`): `void`

Defined in: [diagram/Diagram.ts:2783](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2783)

Move a part to a layer by name.

#### Parameters

##### part

[`Group`](/en/reference/api/graphojs/classes/group/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| [`Link`](/en/reference/api/graphojs/classes/link/)

##### layerName

`string`

#### Returns

`void`

***

### print()

> **print**(`options?`): `void`

Defined in: [diagram/Diagram.ts:3229](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3229)

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

Defined in: [diagram/Diagram.ts:778](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L778)

Redo the last undone command.

#### Returns

`boolean`

***

### remove()

> **remove**(`part`): `void`

Defined in: [diagram/Diagram.ts:3343](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3343)

GoJS-compatible: Remove a part directly from the diagram.

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`void`

***

### removeAnyDiagramListener()

> **removeAnyDiagramListener**(`handler`): `void`

Defined in: [diagram/Diagram.ts:686](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L686)

Remove a listener from all diagram events.

#### Parameters

##### handler

(`event`) => `void`

#### Returns

`void`

***

### removeDiagramListener()

> **removeDiagramListener**(`type`, `handler`): `boolean`

Defined in: [diagram/Diagram.ts:681](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L681)

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

Defined in: [diagram/Diagram.ts:666](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L666)

GoJS-compatible: Remove a group template by category.

#### Parameters

##### category

`string`

#### Returns

`boolean`

***

### removeLayer()

> **removeLayer**(`name`): `boolean`

Defined in: [diagram/Diagram.ts:2767](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2767)

Remove a layer by name.

#### Parameters

##### name

`string`

#### Returns

`boolean`

***

### removeLinkTemplate()

> **removeLinkTemplate**(`category`): `boolean`

Defined in: [diagram/Diagram.ts:661](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L661)

GoJS-compatible: Remove a link template by category.

#### Parameters

##### category

`string`

#### Returns

`boolean`

***

### removeModelChangedListener()

> **removeModelChangedListener**(`listener`): `void`

Defined in: [diagram/Diagram.ts:2728](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2728)

GoJS-compatible: Remove a model changed listener.

#### Parameters

##### listener

(`event`) => `void`

#### Returns

`void`

***

### removeNodeTemplate()

> **removeNodeTemplate**(`category`): `boolean`

Defined in: [diagram/Diagram.ts:656](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L656)

GoJS-compatible: Remove a node template by category.

#### Parameters

##### category

`string`

#### Returns

`boolean`

***

### removeParts()

> **removeParts**(`parts`): `void`

Defined in: [diagram/Diagram.ts:3338](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3338)

GoJS-compatible: Remove multiple parts at once.

#### Parameters

##### parts

`Iterable`\<[`Part`](/en/reference/api/graphojs/classes/part/)\>

#### Returns

`void`

***

### requestUpdate()

> **requestUpdate**(): `void`

Defined in: [diagram/Diagram.ts:2570](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2570)

GoJS-compatible: Request a redraw of the diagram.

#### Returns

`void`

***

### scrollToPart()

> **scrollToPart**(`part`, `_padding?`): `void`

Defined in: [diagram/Diagram.ts:3532](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3532)

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

Defined in: [diagram/Diagram.ts:3556](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3556)

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

Defined in: [diagram/Diagram.ts:2418](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2418)

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

Defined in: [diagram/Diagram.ts:2311](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2311)

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

Defined in: [diagram/Diagram.ts:832](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L832)

Set a context menu for this diagram.

#### Parameters

##### menu

[`ContextMenu`](/en/reference/api/graphojs/classes/contextmenu/) \| `null`

#### Returns

`void`

***

### setGridSize()

> **setGridSize**(`size`): `void`

Defined in: [diagram/Diagram.ts:2904](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2904)

Set the grid size used for snapping.

#### Parameters

##### size

`number`

#### Returns

`void`

***

### setLODLabelThreshold()

> **setLODLabelThreshold**(`threshold`): `void`

Defined in: [diagram/Diagram.ts:2878](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2878)

Set the zoom threshold below which labels are hidden.

#### Parameters

##### threshold

`number`

#### Returns

`void`

***

### setModel()

> **setModel**(`model`): `void`

Defined in: [diagram/Diagram.ts:2575](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2575)

Set the model.

#### Parameters

##### model

[`GraphLinksModel`](/en/reference/api/graphojs/classes/graphlinksmodel/)

#### Returns

`void`

***

### setViewport()

> **setViewport**(`x`, `y`, `scale?`): `void`

Defined in: [diagram/Diagram.ts:3364](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3364)

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

Defined in: [diagram/Diagram.ts:2292](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2292)

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

Defined in: [diagram/Diagram.ts:2269](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2269)

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

Defined in: [diagram/Diagram.ts:2250](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2250)

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

Defined in: [diagram/Diagram.ts:2921](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2921)

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

Defined in: [diagram/Diagram.ts:2915](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2915)

Snap a value to the nearest grid line.

#### Parameters

##### value

`number`

#### Returns

`number`

***

### startTransaction()

> **startTransaction**(`name?`): `boolean`

Defined in: [diagram/Diagram.ts:789](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L789)

GoJS-compatible: Begin a transaction. Commands are grouped into one undo unit.

#### Parameters

##### name?

`string` = `'Transaction'`

#### Returns

`boolean`

***

### toJSON()

> **toJSON**(): [`DiagramJSON`](/en/reference/api/graphojs/interfaces/diagramjson/)

Defined in: [diagram/Diagram.ts:2792](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L2792)

Serialize the diagram to JSON.

#### Returns

[`DiagramJSON`](/en/reference/api/graphojs/interfaces/diagramjson/)

***

### undo()

> **undo**(): `boolean`

Defined in: [diagram/Diagram.ts:767](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L767)

Undo the last command.

#### Returns

`boolean`

***

### zoomToFit()

> **zoomToFit**(`padding?`): `void`

Defined in: [diagram/Diagram.ts:3487](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3487)

Zoom to fit all content.

#### Parameters

##### padding?

`number` = `50`

#### Returns

`void`

***

### zoomToRect()

> **zoomToRect**(`rect`, `padding?`): `void`

Defined in: [diagram/Diagram.ts:3517](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/diagram/Diagram.ts#L3517)

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
