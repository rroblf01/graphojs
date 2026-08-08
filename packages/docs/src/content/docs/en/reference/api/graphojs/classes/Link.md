---
editUrl: false
next: false
prev: false
title: "Link"
---

Defined in: [parts/Link.ts:15](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L15)

A visual link between two nodes.

## Extends

- [`Part`](/en/reference/api/graphojs/classes/part/)

## Constructors

### Constructor

> **new Link**(`key`, `fromKey`, `toKey`): `Link`

Defined in: [parts/Link.ts:67](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L67)

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### fromKey

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### toKey

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Returns

`Link`

#### Overrides

[`Part`](/en/reference/api/graphojs/classes/part/).[`constructor`](/en/reference/api/graphojs/classes/part/#constructor)

## Properties

### CircleArrowHead

> `readonly` `static` **CircleArrowHead**: `"circle"` = `'circle'`

Defined in: [parts/Link.ts:27](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L27)

***

### Curved

> `readonly` `static` **Curved**: `"curved"` = `'curved'`

Defined in: [parts/Link.ts:19](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L19)

***

### DiamondArrowHead

> `readonly` `static` **DiamondArrowHead**: `"diamond"` = `'diamond'`

Defined in: [parts/Link.ts:26](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L26)

***

### None

> `readonly` `static` **None**: `"none"` = `'none'`

Defined in: [parts/Link.ts:22](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L22)

***

### OpenTriangleArrowHead

> `readonly` `static` **OpenTriangleArrowHead**: `"openArrow"` = `'openArrow'`

Defined in: [parts/Link.ts:24](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L24)

***

### Orthogonal

> `readonly` `static` **Orthogonal**: `"orthogonal"` = `'orthogonal'`

Defined in: [parts/Link.ts:18](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L18)

***

### StandardArrowHead

> `readonly` `static` **StandardArrowHead**: `"triangle"` = `'triangle'`

Defined in: [parts/Link.ts:25](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L25)

***

### Straight

> `readonly` `static` **Straight**: `"straight"` = `'straight'`

Defined in: [parts/Link.ts:17](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L17)

***

### TriangleArrowHead

> `readonly` `static` **TriangleArrowHead**: `"triangle"` = `'triangle'`

Defined in: [parts/Link.ts:23](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L23)

## Accessors

### actualBounds

#### Get Signature

> **get** **actualBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [parts/Part.ts:202](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L202)

GoJS-compatible: The actual bounds of this part in document coordinates.

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Set Signature

> **set** **actualBounds**(`value`): `void`

Defined in: [parts/Part.ts:206](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L206)

##### Parameters

###### value

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`actualBounds`](/en/reference/api/graphojs/classes/part/#actualbounds)

***

### adornments

#### Get Signature

> **get** **adornments**(): `ReadonlyMap`\<`string`, [`Adornment`](/en/reference/api/graphojs/classes/adornment/)\>

Defined in: [parts/Part.ts:537](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L537)

Get all adornments on this part.

##### Returns

`ReadonlyMap`\<`string`, [`Adornment`](/en/reference/api/graphojs/classes/adornment/)\>

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`adornments`](/en/reference/api/graphojs/classes/part/#adornments)

***

### angle

#### Get Signature

> **get** **angle**(): `number`

Defined in: [parts/Part.ts:285](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L285)

The rotation angle in degrees.

##### Returns

`number`

#### Set Signature

> **set** **angle**(`value`): `void`

Defined in: [parts/Part.ts:289](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L289)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`angle`](/en/reference/api/graphojs/classes/part/#angle)

***

### arrowhead

#### Get Signature

> **get** **arrowhead**(): [`ArrowheadStyle`](/en/reference/api/graphojs/type-aliases/arrowheadstyle/)

Defined in: [parts/Link.ts:281](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L281)

The arrowhead style at the target end.

##### Returns

[`ArrowheadStyle`](/en/reference/api/graphojs/type-aliases/arrowheadstyle/)

#### Set Signature

> **set** **arrowhead**(`value`): `void`

Defined in: [parts/Link.ts:285](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L285)

##### Parameters

###### value

[`ArrowheadStyle`](/en/reference/api/graphojs/type-aliases/arrowheadstyle/)

##### Returns

`void`

***

### arrowheadSize

#### Get Signature

> **get** **arrowheadSize**(): `number`

Defined in: [parts/Link.ts:290](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L290)

The size of the arrowhead.

##### Returns

`number`

#### Set Signature

> **set** **arrowheadSize**(`value`): `void`

Defined in: [parts/Link.ts:294](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L294)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### avoidObstacles

#### Get Signature

> **get** **avoidObstacles**(): `boolean`

Defined in: [parts/Link.ts:425](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L425)

Whether this link should route around obstacles (nodes).

##### Returns

`boolean`

#### Set Signature

> **set** **avoidObstacles**(`value`): `void`

Defined in: [parts/Link.ts:429](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L429)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### background

#### Get Signature

> **get** **background**(): `string` \| `null`

Defined in: [parts/Part.ts:157](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L157)

GoJS-compatible: The background color of this part.

##### Returns

`string` \| `null`

#### Set Signature

> **set** **background**(`value`): `void`

Defined in: [parts/Part.ts:161](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L161)

##### Parameters

###### value

`string` \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`background`](/en/reference/api/graphojs/classes/part/#background)

***

### bindings

#### Get Signature

> **get** **bindings**(): readonly [`Binding`](/en/reference/api/graphojs/classes/binding/)[]

Defined in: [parts/Part.ts:568](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L568)

Get all bindings on this part.

##### Returns

readonly [`Binding`](/en/reference/api/graphojs/classes/binding/)[]

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`bindings`](/en/reference/api/graphojs/classes/part/#bindings)

***

### bounds

#### Get Signature

> **get** **bounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [parts/Part.ts:107](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L107)

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Set Signature

> **set** **bounds**(`value`): `void`

Defined in: [parts/Part.ts:111](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L111)

##### Parameters

###### value

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`bounds`](/en/reference/api/graphojs/classes/part/#bounds)

***

### category

#### Get Signature

> **get** **category**(): `string`

Defined in: [parts/Part.ts:340](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L340)

GoJS-compatible: The category of this part (used to select a template).

##### Returns

`string`

#### Set Signature

> **set** **category**(`value`): `void`

Defined in: [parts/Part.ts:344](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L344)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`category`](/en/reference/api/graphojs/classes/part/#category)

***

### center

#### Get Signature

> **get** **center**(): `object`

Defined in: [parts/Link.ts:559](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L559)

Get the center point of the link.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Overrides

[`Part`](/en/reference/api/graphojs/classes/part/).[`center`](/en/reference/api/graphojs/classes/part/#center)

***

### containingGroup

#### Get Signature

> **get** **containingGroup**(): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [parts/Part.ts:377](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L377)

Get the containing group, or null if top-level.

##### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

#### Set Signature

> **set** **containingGroup**(`value`): `void`

Defined in: [parts/Part.ts:382](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L382)

Set the containing group.

##### Parameters

###### value

[`Group`](/en/reference/api/graphojs/classes/group/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`containingGroup`](/en/reference/api/graphojs/classes/part/#containinggroup)

***

### contextMenu

#### Get Signature

> **get** **contextMenu**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [parts/Part.ts:453](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L453)

GoJS-compatible: A context menu template (Panel) shown on right-click.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **contextMenu**(`value`): `void`

Defined in: [parts/Part.ts:457](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L457)

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`contextMenu`](/en/reference/api/graphojs/classes/part/#contextmenu)

***

### copyable

#### Get Signature

> **get** **copyable**(): `boolean`

Defined in: [parts/Part.ts:90](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L90)

GoJS-compatible: Whether this part can be copied.

##### Returns

`boolean`

#### Set Signature

> **set** **copyable**(`value`): `void`

Defined in: [parts/Part.ts:94](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L94)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`copyable`](/en/reference/api/graphojs/classes/part/#copyable)

***

### corner

#### Get Signature

> **get** **corner**(): `number`

Defined in: [parts/Link.ts:326](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L326)

The corner rounding radius for orthogonal routing.

##### Returns

`number`

#### Set Signature

> **set** **corner**(`value`): `void`

Defined in: [parts/Link.ts:330](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L330)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### cursor

#### Get Signature

> **get** **cursor**(): `string`

Defined in: [parts/Part.ts:175](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L175)

GoJS-compatible: The cursor shown when hovering this part.

##### Returns

`string`

#### Set Signature

> **set** **cursor**(`value`): `void`

Defined in: [parts/Part.ts:179](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L179)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`cursor`](/en/reference/api/graphojs/classes/part/#cursor)

***

### curve

#### Get Signature

> **get** **curve**(): `"None"` \| `"Bezier"` \| `"JumpOver"` \| `"AvoidsNodes"`

Defined in: [parts/Link.ts:145](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L145)

GoJS-compatible: The type of curve used for this link.

##### Returns

`"None"` \| `"Bezier"` \| `"JumpOver"` \| `"AvoidsNodes"`

#### Set Signature

> **set** **curve**(`value`): `void`

Defined in: [parts/Link.ts:149](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L149)

##### Parameters

###### value

`"None"` \| `"Bezier"` \| `"JumpOver"` \| `"AvoidsNodes"`

##### Returns

`void`

***

### curviness

#### Get Signature

> **get** **curviness**(): `number`

Defined in: [parts/Link.ts:380](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L380)

Controls the tightness of curved routing. 0 = default, positive = tighter, negative = looser.

##### Returns

`number`

#### Set Signature

> **set** **curviness**(`value`): `void`

Defined in: [parts/Link.ts:384](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L384)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### data

#### Get Signature

> **get** **data**(): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `null`

Defined in: [parts/Part.ts:331](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L331)

GoJS-compatible: Reference to the model data object for this part.

##### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `null`

#### Set Signature

> **set** **data**(`value`): `void`

Defined in: [parts/Part.ts:335](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L335)

##### Parameters

###### value

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`data`](/en/reference/api/graphojs/classes/part/#data)

***

### deletable

#### Get Signature

> **get** **deletable**(): `boolean`

Defined in: [parts/Part.ts:68](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L68)

GoJS-compatible: Whether this part can be deleted.

##### Returns

`boolean`

#### Set Signature

> **set** **deletable**(`value`): `void`

Defined in: [parts/Part.ts:72](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L72)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`deletable`](/en/reference/api/graphojs/classes/part/#deletable)

***

### desiredSize

#### Get Signature

> **get** **desiredSize**(): [`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

Defined in: [parts/Part.ts:134](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L134)

GoJS-compatible: The desired size of this part.

##### Returns

[`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

#### Set Signature

> **set** **desiredSize**(`value`): `void`

Defined in: [parts/Part.ts:139](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L139)

##### Parameters

###### value

[`Size`](/en/reference/api/graphojs/classes/size/) \| \{ `height`: `number`; `width`: `number`; \} \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`desiredSize`](/en/reference/api/graphojs/classes/part/#desiredsize)

***

### diagram

#### Get Signature

> **get** **diagram**(): [`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

Defined in: [parts/Part.ts:415](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L415)

GoJS-compatible: The diagram that this part is in (or null).

##### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

#### Set Signature

> **set** **diagram**(`value`): `void`

Defined in: [parts/Part.ts:420](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L420)

Set the diagram this part belongs to.

##### Parameters

###### value

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`diagram`](/en/reference/api/graphojs/classes/part/#diagram)

***

### dragAlpha

#### Get Signature

> **get** **dragAlpha**(): `number`

Defined in: [parts/Part.ts:349](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L349)

GoJS-compatible: The opacity used when this part is being dragged.

##### Returns

`number`

#### Set Signature

> **set** **dragAlpha**(`value`): `void`

Defined in: [parts/Part.ts:353](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L353)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`dragAlpha`](/en/reference/api/graphojs/classes/part/#dragalpha)

***

### draggable

#### Get Signature

> **get** **draggable**(): `boolean`

Defined in: [parts/Part.ts:471](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L471)

Whether this part can be dragged.

##### Returns

`boolean`

#### Set Signature

> **set** **draggable**(`value`): `void`

Defined in: [parts/Part.ts:475](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L475)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`draggable`](/en/reference/api/graphojs/classes/part/#draggable)

***

### elements

#### Get Signature

> **get** **elements**(): readonly [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)[]

Defined in: [parts/Part.ts:511](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L511)

GoJS-compatible: Get the child elements in this part's visual tree.

##### Returns

readonly [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)[]

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`elements`](/en/reference/api/graphojs/classes/part/#elements)

***

### fill

#### Get Signature

> **get** **fill**(): `string`

Defined in: [parts/Part.ts:252](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L252)

##### Returns

`string`

#### Set Signature

> **set** **fill**(`value`): `void`

Defined in: [parts/Part.ts:256](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L256)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`fill`](/en/reference/api/graphojs/classes/part/#fill)

***

### fromEndSegmentLength

#### Get Signature

> **get** **fromEndSegmentLength**(): `number`

Defined in: [parts/Link.ts:443](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L443)

GoJS-compatible: Length of the segment at the start of the link.

##### Returns

`number`

#### Set Signature

> **set** **fromEndSegmentLength**(`value`): `void`

Defined in: [parts/Link.ts:447](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L447)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### fromEndSegmentOrientation

#### Get Signature

> **get** **fromEndSegmentOrientation**(): `number`

Defined in: [parts/Link.ts:163](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L163)

GoJS-compatible: The orientation of the segment leaving the from-end.

##### Returns

`number`

#### Set Signature

> **set** **fromEndSegmentOrientation**(`value`): `void`

Defined in: [parts/Link.ts:167](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L167)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### fromKey

#### Get Signature

> **get** **fromKey**(): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [parts/Link.ts:75](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L75)

##### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Set Signature

> **set** **fromKey**(`value`): `void`

Defined in: [parts/Link.ts:79](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L79)

##### Parameters

###### value

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### Returns

`void`

***

### fromNode

#### Get Signature

> **get** **fromNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [parts/Link.ts:84](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L84)

GoJS-compatible: The source node of this link (or null).

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

#### Set Signature

> **set** **fromNode**(`value`): `void`

Defined in: [parts/Link.ts:90](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L90)

##### Parameters

###### value

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

##### Returns

`void`

***

### fromPort

#### Get Signature

> **get** **fromPort**(): `object`

Defined in: [parts/Link.ts:180](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L180)

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **fromPort**(`value`): `void`

Defined in: [parts/Link.ts:184](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L184)

##### Parameters

###### value

###### x

`number`

###### y

`number`

##### Returns

`void`

***

### fromPortName

#### Get Signature

> **get** **fromPortName**(): `string` \| `undefined`

Defined in: [parts/Link.ts:197](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L197)

The name of the source port on the from-node.

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **fromPortName**(`value`): `void`

Defined in: [parts/Link.ts:201](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L201)

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### fromShortLength

#### Get Signature

> **get** **fromShortLength**(): `number`

Defined in: [parts/Link.ts:407](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L407)

GoJS-compatible: The distance from the from-end to the first point.

##### Returns

`number`

#### Set Signature

> **set** **fromShortLength**(`value`): `void`

Defined in: [parts/Link.ts:411](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L411)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### fromSpot

#### Get Signature

> **get** **fromSpot**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [parts/Link.ts:215](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L215)

The spot on the from-node where this link connects.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **fromSpot**(`value`): `void`

Defined in: [parts/Link.ts:219](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L219)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

***

### hasManualReshape

#### Get Signature

> **get** **hasManualReshape**(): `boolean`

Defined in: [parts/Link.ts:272](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L272)

Whether pathPoints were set by the user reshaping this link (via
LinkReshapingTool) rather than computed by the router. While true, model
syncs that don't touch this link's own endpoints leave pathPoints alone
instead of overwriting the manual shape; moving either endpoint node
clears it (see Diagram.invalidateLinksForNode), reverting to auto-routing.

##### Returns

`boolean`

#### Set Signature

> **set** **hasManualReshape**(`value`): `void`

Defined in: [parts/Link.ts:276](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L276)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [parts/Part.ts:125](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L125)

GoJS-compatible: The height of this part (delegates to its bounds).

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

Defined in: [parts/Part.ts:129](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L129)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`height`](/en/reference/api/graphojs/classes/part/#height)

***

### isHighlighted

#### Get Signature

> **get** **isHighlighted**(): `boolean`

Defined in: [parts/Part.ts:99](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L99)

GoJS-compatible: Whether this part is currently highlighted.

##### Returns

`boolean`

#### Set Signature

> **set** **isHighlighted**(`value`): `void`

Defined in: [parts/Part.ts:103](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L103)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isHighlighted`](/en/reference/api/graphojs/classes/part/#ishighlighted)

***

### isInDocumentBounds

#### Get Signature

> **get** **isInDocumentBounds**(): `boolean`

Defined in: [parts/Part.ts:358](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L358)

GoJS-compatible: Whether this part is within the document bounds.

##### Returns

`boolean`

#### Set Signature

> **set** **isInDocumentBounds**(`value`): `void`

Defined in: [parts/Part.ts:362](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L362)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isInDocumentBounds`](/en/reference/api/graphojs/classes/part/#isindocumentbounds)

***

### isMemberOfGroup

#### Get Signature

> **get** **isMemberOfGroup**(): `boolean`

Defined in: [parts/Part.ts:387](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L387)

GoJS-compatible: Whether this part is a member of a group.

##### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isMemberOfGroup`](/en/reference/api/graphojs/classes/part/#ismemberofgroup)

***

### isPositioned

#### Get Signature

> **get** **isPositioned**(): `boolean`

Defined in: [parts/Part.ts:392](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L392)

GoJS-compatible: Whether this part has been given a position/bounds.

##### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isPositioned`](/en/reference/api/graphojs/classes/part/#ispositioned)

***

### isSelected

#### Get Signature

> **get** **isSelected**(): `boolean`

Defined in: [parts/Part.ts:236](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L236)

##### Returns

`boolean`

#### Set Signature

> **set** **isSelected**(`value`): `void`

Defined in: [parts/Part.ts:240](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L240)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isSelected`](/en/reference/api/graphojs/classes/part/#isselected)

***

### isTreeExpanded

#### Get Signature

> **get** **isTreeExpanded**(): `boolean`

Defined in: [parts/Part.ts:81](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L81)

GoJS-compatible: Whether this part's tree-children (per findTreeChildrenNodes)
are shown. Distinct from Group.isSubGraphExpanded — this applies to any Part
and is what TreeExpanderButton toggles via Diagram.collapseTree/expandTree.

##### Returns

`boolean`

#### Set Signature

> **set** **isTreeExpanded**(`value`): `void`

Defined in: [parts/Part.ts:85](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L85)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isTreeExpanded`](/en/reference/api/graphojs/classes/part/#istreeexpanded)

***

### isTreeLink

#### Get Signature

> **get** **isTreeLink**(): `boolean`

Defined in: [parts/Link.ts:389](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L389)

GoJS-compatible: Whether this link is a tree link (parent-child).

##### Returns

`boolean`

#### Set Signature

> **set** **isTreeLink**(`value`): `void`

Defined in: [parts/Link.ts:393](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L393)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isVisibleObject

#### Get Signature

> **get** **isVisibleObject**(): `boolean`

Defined in: [parts/Part.ts:211](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L211)

GoJS-compatible: Whether this part and its ancestors are visible.

##### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isVisibleObject`](/en/reference/api/graphojs/classes/part/#isvisibleobject)

***

### jumpOver

#### Get Signature

> **get** **jumpOver**(): `boolean`

Defined in: [parts/Link.ts:434](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L434)

Whether this link should jump over other links at crossings.

##### Returns

`boolean`

#### Set Signature

> **set** **jumpOver**(`value`): `void`

Defined in: [parts/Link.ts:438](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L438)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### key

#### Get Signature

> **get** **key**(): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [parts/Part.ts:63](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L63)

##### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`key`](/en/reference/api/graphojs/classes/part/#key)

***

### label

#### Get Signature

> **get** **label**(): `string`

Defined in: [parts/Link.ts:299](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L299)

The label text shown on the link.

##### Returns

`string`

#### Set Signature

> **set** **label**(`value`): `void`

Defined in: [parts/Link.ts:303](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L303)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### labelAlignment

#### Get Signature

> **get** **labelAlignment**(): `"start"` \| `"end"` \| `"middle"`

Defined in: [parts/Link.ts:371](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L371)

Horizontal alignment of the label along its segment.

##### Returns

`"start"` \| `"end"` \| `"middle"`

#### Set Signature

> **set** **labelAlignment**(`value`): `void`

Defined in: [parts/Link.ts:375](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L375)

##### Parameters

###### value

`"start"` \| `"end"` \| `"middle"`

##### Returns

`void`

***

### labelColor

#### Get Signature

> **get** **labelColor**(): `string`

Defined in: [parts/Link.ts:308](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L308)

The color of the link label.

##### Returns

`string`

#### Set Signature

> **set** **labelColor**(`value`): `void`

Defined in: [parts/Link.ts:312](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L312)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### labelFont

#### Get Signature

> **get** **labelFont**(): `string`

Defined in: [parts/Link.ts:317](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L317)

The font of the link label.

##### Returns

`string`

#### Set Signature

> **set** **labelFont**(`value`): `void`

Defined in: [parts/Link.ts:321](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L321)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### labelOffset

#### Get Signature

> **get** **labelOffset**(): `number`

Defined in: [parts/Link.ts:335](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L335)

The perpendicular offset of the link label from the path.

##### Returns

`number`

#### Set Signature

> **set** **labelOffset**(`value`): `void`

Defined in: [parts/Link.ts:339](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L339)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### labelSegmentFraction

#### Get Signature

> **get** **labelSegmentFraction**(): `number`

Defined in: [parts/Link.ts:353](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L353)

GoJS-compatible ("segmentFraction"): position along the chosen segment, 0 (start) to 1 (end). Default 0.5 (midpoint).

##### Returns

`number`

#### Set Signature

> **set** **labelSegmentFraction**(`value`): `void`

Defined in: [parts/Link.ts:357](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L357)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### labelSegmentIndex

#### Get Signature

> **get** **labelSegmentIndex**(): `number`

Defined in: [parts/Link.ts:344](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L344)

The segment index to place the label on (-1 = middle segment).

##### Returns

`number`

#### Set Signature

> **set** **labelSegmentIndex**(`value`): `void`

Defined in: [parts/Link.ts:348](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L348)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### labelSide

#### Get Signature

> **get** **labelSide**(): `"top"` \| `"bottom"` \| `"left"` \| `"right"` \| `"auto"`

Defined in: [parts/Link.ts:362](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L362)

Which side of the link to place the label on.

##### Returns

`"top"` \| `"bottom"` \| `"left"` \| `"right"` \| `"auto"`

#### Set Signature

> **set** **labelSide**(`value`): `void`

Defined in: [parts/Link.ts:366](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L366)

##### Parameters

###### value

`"top"` \| `"bottom"` \| `"left"` \| `"right"` \| `"auto"`

##### Returns

`void`

***

### layer

#### Get Signature

> **get** **layer**(): [`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

Defined in: [parts/Part.ts:397](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L397)

Get the layer this part belongs to.

##### Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

#### Set Signature

> **set** **layer**(`value`): `void`

Defined in: [parts/Part.ts:402](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L402)

Set the layer this part belongs to.

##### Parameters

###### value

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`layer`](/en/reference/api/graphojs/classes/part/#layer)

***

### layerName

#### Get Signature

> **get** **layerName**(): `string`

Defined in: [parts/Part.ts:367](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L367)

GoJS-compatible: The name of the layer this part belongs to.

##### Returns

`string`

#### Set Signature

> **set** **layerName**(`_value`): `void`

Defined in: [parts/Part.ts:371](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L371)

##### Parameters

###### \_value

`string`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`layerName`](/en/reference/api/graphojs/classes/part/#layername)

***

### location

#### Get Signature

> **get** **location**(): [`Point`](/en/reference/api/graphojs/classes/point/)

Defined in: [parts/Part.ts:298](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L298)

GoJS-compatible: The location point of this part — the point within the
bounds at `locationSpot`. With the default locationSpot (0.5, 0.5) this
is the center; changing locationSpot moves the part so the spot stays put.

##### Returns

[`Point`](/en/reference/api/graphojs/classes/point/)

#### Set Signature

> **set** **location**(`value`): `void`

Defined in: [parts/Part.ts:306](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L306)

##### Parameters

###### value

[`Point`](/en/reference/api/graphojs/classes/point/)

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`location`](/en/reference/api/graphojs/classes/part/#location)

***

### locationSpot

#### Get Signature

> **get** **locationSpot**(): `object`

Defined in: [parts/Part.ts:313](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L313)

GoJS-compatible: The spot in the part that corresponds to the location point.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **locationSpot**(`value`): `void`

Defined in: [parts/Part.ts:317](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L317)

##### Parameters

###### value

###### x

`number`

###### y

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`locationSpot`](/en/reference/api/graphojs/classes/part/#locationspot)

***

### maxSize

#### Get Signature

> **get** **maxSize**(): `object`

Defined in: [parts/Part.ts:193](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L193)

GoJS-compatible: The maximum size of this part.

##### Returns

`object`

###### height

> **height**: `number`

###### width

> **width**: `number`

#### Set Signature

> **set** **maxSize**(`value`): `void`

Defined in: [parts/Part.ts:197](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L197)

##### Parameters

###### value

###### height

`number`

###### width

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`maxSize`](/en/reference/api/graphojs/classes/part/#maxsize)

***

### minSize

#### Get Signature

> **get** **minSize**(): `object`

Defined in: [parts/Part.ts:184](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L184)

GoJS-compatible: The minimum size of this part.

##### Returns

`object`

###### height

> **height**: `number`

###### width

> **width**: `number`

#### Set Signature

> **set** **minSize**(`value`): `void`

Defined in: [parts/Part.ts:188](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L188)

##### Parameters

###### value

###### height

`number`

###### width

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`minSize`](/en/reference/api/graphojs/classes/part/#minsize)

***

### opacity

#### Get Signature

> **get** **opacity**(): `number`

Defined in: [parts/Part.ts:244](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L244)

##### Returns

`number`

#### Set Signature

> **set** **opacity**(`value`): `void`

Defined in: [parts/Part.ts:248](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L248)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`opacity`](/en/reference/api/graphojs/classes/part/#opacity)

***

### panel

#### Get Signature

> **get** **panel**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [parts/Part.ts:498](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L498)

GoJS-compatible: Get the panel used to render this part's visual tree.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **panel**(`value`): `void`

Defined in: [parts/Part.ts:503](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L503)

GoJS-compatible: Set the panel used to render this part's visual tree.

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`panel`](/en/reference/api/graphojs/classes/part/#panel)

***

### pathPattern

#### Get Signature

> **get** **pathPattern**(): `string` \| `null`

Defined in: [parts/Link.ts:488](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L488)

GoJS-compatible: Custom path pattern for the link stroke.

##### Returns

`string` \| `null`

#### Set Signature

> **set** **pathPattern**(`value`): `void`

Defined in: [parts/Link.ts:492](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L492)

##### Parameters

###### value

`string` \| `null`

##### Returns

`void`

***

### pathPoints

#### Get Signature

> **get** **pathPoints**(): `object`[]

Defined in: [parts/Link.ts:233](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L233)

The computed path points for this link.

##### Returns

`object`[]

***

### pickable

#### Get Signature

> **get** **pickable**(): `boolean`

Defined in: [parts/Part.ts:166](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L166)

GoJS-compatible: Whether this part is pickable (hit-testable).

##### Returns

`boolean`

#### Set Signature

> **set** **pickable**(`value`): `void`

Defined in: [parts/Part.ts:170](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L170)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`pickable`](/en/reference/api/graphojs/classes/part/#pickable)

***

### position

#### Get Signature

> **get** **position**(): `object`

Defined in: [parts/Part.ts:633](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L633)

Get the position (top-left).

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **position**(`value`): `void`

Defined in: [parts/Part.ts:638](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L638)

Set the position (top-left), preserving size.

##### Parameters

###### value

###### x

`number`

###### y

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`position`](/en/reference/api/graphojs/classes/part/#position)

***

### relinkableFrom

#### Get Signature

> **get** **relinkableFrom**(): `boolean`

Defined in: [parts/Link.ts:461](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L461)

GoJS-compatible: Whether the link can be relinked from the start end.

##### Returns

`boolean`

#### Set Signature

> **set** **relinkableFrom**(`value`): `void`

Defined in: [parts/Link.ts:465](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L465)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### relinkableTo

#### Get Signature

> **get** **relinkableTo**(): `boolean`

Defined in: [parts/Link.ts:470](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L470)

GoJS-compatible: Whether the link can be relinked to the end end.

##### Returns

`boolean`

#### Set Signature

> **set** **relinkableTo**(`value`): `void`

Defined in: [parts/Link.ts:474](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L474)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### reshapable

#### Get Signature

> **get** **reshapable**(): `boolean`

Defined in: [parts/Link.ts:479](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L479)

GoJS-compatible: Whether the link path can be reshaped by dragging midpoints.

##### Returns

`boolean`

#### Set Signature

> **set** **reshapable**(`value`): `void`

Defined in: [parts/Link.ts:483](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L483)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### resizable

#### Get Signature

> **get** **resizable**(): `boolean`

Defined in: [parts/Part.ts:480](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L480)

Whether this part can be resized.

##### Returns

`boolean`

#### Set Signature

> **set** **resizable**(`value`): `void`

Defined in: [parts/Part.ts:484](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L484)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`resizable`](/en/reference/api/graphojs/classes/part/#resizable)

***

### resizingSegmentIndex

#### Get Signature

> **get** **resizingSegmentIndex**(): `number`

Defined in: [parts/Link.ts:154](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L154)

GoJS-compatible: The segment index being resized, or -1.

##### Returns

`number`

#### Set Signature

> **set** **resizingSegmentIndex**(`value`): `void`

Defined in: [parts/Link.ts:158](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L158)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### rotatable

#### Get Signature

> **get** **rotatable**(): `boolean`

Defined in: [parts/Part.ts:489](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L489)

Whether this part can be rotated.

##### Returns

`boolean`

#### Set Signature

> **set** **rotatable**(`value`): `void`

Defined in: [parts/Part.ts:493](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L493)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`rotatable`](/en/reference/api/graphojs/classes/part/#rotatable)

***

### routing

#### Get Signature

> **get** **routing**(): [`LinkRouting`](/en/reference/api/graphojs/type-aliases/linkrouting/)

Defined in: [parts/Link.ts:131](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L131)

##### Returns

[`LinkRouting`](/en/reference/api/graphojs/type-aliases/linkrouting/)

#### Set Signature

> **set** **routing**(`value`): `void`

Defined in: [parts/Link.ts:135](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L135)

##### Parameters

###### value

[`LinkRouting`](/en/reference/api/graphojs/type-aliases/linkrouting/)

##### Returns

`void`

***

### scale

#### Get Signature

> **get** **scale**(): `number`

Defined in: [parts/Part.ts:148](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L148)

GoJS-compatible: The scale of this part.

##### Returns

`number`

#### Set Signature

> **set** **scale**(`value`): `void`

Defined in: [parts/Part.ts:152](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L152)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`scale`](/en/reference/api/graphojs/classes/part/#scale)

***

### selectable

#### Get Signature

> **get** **selectable**(): `boolean`

Defined in: [parts/Part.ts:228](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L228)

##### Returns

`boolean`

#### Set Signature

> **set** **selectable**(`value`): `void`

Defined in: [parts/Part.ts:232](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L232)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`selectable`](/en/reference/api/graphojs/classes/part/#selectable)

***

### selectionObject

#### Get Signature

> **get** **selectionObject**(): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [parts/Part.ts:322](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L322)

GoJS-compatible: The GraphObject that is used as the selection object (for adornment placement).

##### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Set Signature

> **set** **selectionObject**(`_value`): `void`

Defined in: [parts/Part.ts:326](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L326)

##### Parameters

###### \_value

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`selectionObject`](/en/reference/api/graphojs/classes/part/#selectionobject)

***

### size

#### Get Signature

> **get** **size**(): `object`

Defined in: [parts/Part.ts:644](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L644)

Get the size.

##### Returns

`object`

###### height

> **height**: `number`

###### width

> **width**: `number`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`size`](/en/reference/api/graphojs/classes/part/#size)

***

### stroke

#### Get Signature

> **get** **stroke**(): `string`

Defined in: [parts/Part.ts:260](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L260)

##### Returns

`string`

#### Set Signature

> **set** **stroke**(`value`): `void`

Defined in: [parts/Part.ts:264](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L264)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`stroke`](/en/reference/api/graphojs/classes/part/#stroke)

***

### strokeWidth

#### Get Signature

> **get** **strokeWidth**(): `number`

Defined in: [parts/Part.ts:268](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L268)

##### Returns

`number`

#### Set Signature

> **set** **strokeWidth**(`value`): `void`

Defined in: [parts/Part.ts:272](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L272)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`strokeWidth`](/en/reference/api/graphojs/classes/part/#strokewidth)

***

### toEndSegmentLength

#### Get Signature

> **get** **toEndSegmentLength**(): `number`

Defined in: [parts/Link.ts:452](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L452)

GoJS-compatible: Length of the segment at the end of the link.

##### Returns

`number`

#### Set Signature

> **set** **toEndSegmentLength**(`value`): `void`

Defined in: [parts/Link.ts:456](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L456)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### toEndSegmentOrientation

#### Get Signature

> **get** **toEndSegmentOrientation**(): `number`

Defined in: [parts/Link.ts:172](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L172)

GoJS-compatible: The orientation of the segment entering the to-end.

##### Returns

`number`

#### Set Signature

> **set** **toEndSegmentOrientation**(`value`): `void`

Defined in: [parts/Link.ts:176](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L176)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### toKey

#### Get Signature

> **get** **toKey**(): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [parts/Link.ts:98](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L98)

##### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Set Signature

> **set** **toKey**(`value`): `void`

Defined in: [parts/Link.ts:102](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L102)

##### Parameters

###### value

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### Returns

`void`

***

### toNode

#### Get Signature

> **get** **toNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [parts/Link.ts:107](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L107)

GoJS-compatible: The destination node of this link (or null).

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

#### Set Signature

> **set** **toNode**(`value`): `void`

Defined in: [parts/Link.ts:113](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L113)

##### Parameters

###### value

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

##### Returns

`void`

***

### tooltip

#### Get Signature

> **get** **tooltip**(): `string`

Defined in: [parts/Part.ts:435](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L435)

The tooltip text shown when hovering over this part.

##### Returns

`string`

#### Set Signature

> **set** **tooltip**(`value`): `void`

Defined in: [parts/Part.ts:439](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L439)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`tooltip`](/en/reference/api/graphojs/classes/part/#tooltip)

***

### toolTip

#### Get Signature

> **get** **toolTip**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

Defined in: [parts/Part.ts:444](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L444)

GoJS-compatible: A tooltip template (Panel) shown on hover.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **toolTip**(`value`): `void`

Defined in: [parts/Part.ts:448](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L448)

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`toolTip`](/en/reference/api/graphojs/classes/part/#tooltip-1)

***

### tooltipVisible

#### Get Signature

> **get** **tooltipVisible**(): `boolean`

Defined in: [parts/Part.ts:462](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L462)

Whether the tooltip is currently visible.

##### Returns

`boolean`

#### Set Signature

> **set** **tooltipVisible**(`value`): `void`

Defined in: [parts/Part.ts:466](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L466)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`tooltipVisible`](/en/reference/api/graphojs/classes/part/#tooltipvisible)

***

### toPort

#### Get Signature

> **get** **toPort**(): `object`

Defined in: [parts/Link.ts:188](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L188)

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **toPort**(`value`): `void`

Defined in: [parts/Link.ts:192](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L192)

##### Parameters

###### value

###### x

`number`

###### y

`number`

##### Returns

`void`

***

### toPortName

#### Get Signature

> **get** **toPortName**(): `string` \| `undefined`

Defined in: [parts/Link.ts:206](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L206)

The name of the target port on the to-node.

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **toPortName**(`value`): `void`

Defined in: [parts/Link.ts:210](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L210)

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### toShortLength

#### Get Signature

> **get** **toShortLength**(): `number`

Defined in: [parts/Link.ts:416](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L416)

GoJS-compatible: The distance from the to-end to the last point.

##### Returns

`number`

#### Set Signature

> **set** **toShortLength**(`value`): `void`

Defined in: [parts/Link.ts:420](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L420)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### toSpot

#### Get Signature

> **get** **toSpot**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [parts/Link.ts:224](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L224)

The spot on the to-node where this link connects.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **toSpot**(`value`): `void`

Defined in: [parts/Link.ts:228](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L228)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

***

### treeLinkRoute

#### Get Signature

> **get** **treeLinkRoute**(): `"straight"` \| `"orthogonal"` \| `"angled"`

Defined in: [parts/Link.ts:398](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L398)

GoJS-compatible: The routing style for tree links.

##### Returns

`"straight"` \| `"orthogonal"` \| `"angled"`

#### Set Signature

> **set** **treeLinkRoute**(`value`): `void`

Defined in: [parts/Link.ts:402](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L402)

##### Parameters

###### value

`"straight"` \| `"orthogonal"` \| `"angled"`

##### Returns

`void`

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [parts/Part.ts:220](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L220)

##### Returns

`boolean`

#### Set Signature

> **set** **visible**(`value`): `void`

Defined in: [parts/Part.ts:224](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L224)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`visible`](/en/reference/api/graphojs/classes/part/#visible)

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [parts/Part.ts:116](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L116)

GoJS-compatible: The width of this part (delegates to its bounds).

##### Returns

`number`

#### Set Signature

> **set** **width**(`value`): `void`

Defined in: [parts/Part.ts:120](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L120)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`width`](/en/reference/api/graphojs/classes/part/#width)

***

### zOrder

#### Get Signature

> **get** **zOrder**(): `number`

Defined in: [parts/Part.ts:276](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L276)

##### Returns

`number`

#### Set Signature

> **set** **zOrder**(`value`): `void`

Defined in: [parts/Part.ts:280](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L280)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`zOrder`](/en/reference/api/graphojs/classes/part/#zorder)

## Methods

### addAdornment()

> **addAdornment**(`name`, `adornment`): `void`

Defined in: [parts/Part.ts:547](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L547)

Add an adornment to this part.

#### Parameters

##### name

`string`

##### adornment

[`Adornment`](/en/reference/api/graphojs/classes/adornment/)

#### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`addAdornment`](/en/reference/api/graphojs/classes/part/#addadornment)

***

### addBinding()

> **addBinding**(`binding`): `this`

Defined in: [parts/Part.ts:573](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L573)

Add a binding to this part.

#### Parameters

##### binding

[`Binding`](/en/reference/api/graphojs/classes/binding/)

#### Returns

`this`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`addBinding`](/en/reference/api/graphojs/classes/part/#addbinding)

***

### addVisual()

> **addVisual**(`element`): `this`

Defined in: [parts/Part.ts:516](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L516)

GoJS-compatible: Add a child element to this part's visual tree.

#### Parameters

##### element

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`this`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`addVisual`](/en/reference/api/graphojs/classes/part/#addvisual)

***

### applyBindings()

> **applyBindings**(`nodeData`): `number`

Defined in: [parts/Part.ts:597](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L597)

Apply all bindings from model data to this part. Returns the number of properties set.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`number`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`applyBindings`](/en/reference/api/graphojs/classes/part/#applybindings)

***

### applyTwoWayBindings()

> **applyTwoWayBindings**(`nodeData`): `number`

Defined in: [parts/Part.ts:612](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L612)

Apply TwoWay bindings: write Part properties back to model data.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`number`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`applyTwoWayBindings`](/en/reference/api/graphojs/classes/part/#applytwowaybindings)

***

### clearAdornments()

> **clearAdornments**(): `void`

Defined in: [parts/Part.ts:563](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L563)

Remove all adornments from this part.

#### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`clearAdornments`](/en/reference/api/graphojs/classes/part/#clearadornments)

***

### clearBindings()

> **clearBindings**(): `void`

Defined in: [parts/Part.ts:587](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L587)

Remove all bindings from this part.

#### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`clearBindings`](/en/reference/api/graphojs/classes/part/#clearbindings)

***

### containsPoint()

> **containsPoint**(`point`): `boolean`

Defined in: [parts/Link.ts:564](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L564)

Check if a point is near the link path.

#### Parameters

##### point

###### x

`number`

###### y

`number`

#### Returns

`boolean`

#### Overrides

[`Part`](/en/reference/api/graphojs/classes/part/).[`containsPoint`](/en/reference/api/graphojs/classes/part/#containspoint)

***

### copy()

> **copy**(): `this`

Defined in: [parts/Link.ts:497](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L497)

Deep copy of this link, including endpoint keys and path state.

#### Returns

`this`

#### Overrides

[`Part`](/en/reference/api/graphojs/classes/part/).[`copy`](/en/reference/api/graphojs/classes/part/#copy)

***

### findAdornment()

> **findAdornment**(`name`): [`Adornment`](/en/reference/api/graphojs/classes/adornment/) \| `undefined`

Defined in: [parts/Part.ts:542](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L542)

Get a specific adornment by name.

#### Parameters

##### name

`string`

#### Returns

[`Adornment`](/en/reference/api/graphojs/classes/adornment/) \| `undefined`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`findAdornment`](/en/reference/api/graphojs/classes/part/#findadornment)

***

### findAdornmentNamed()

> **findAdornmentNamed**(`name`): [`Adornment`](/en/reference/api/graphojs/classes/adornment/) \| `null`

Defined in: [parts/Part.ts:553](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L553)

GoJS-compatible: Find an adornment by name, or null if not present.

#### Parameters

##### name

`string`

#### Returns

[`Adornment`](/en/reference/api/graphojs/classes/adornment/) \| `null`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`findAdornmentNamed`](/en/reference/api/graphojs/classes/part/#findadornmentnamed)

***

### findBinding()

> **findBinding**(`targetProperty`): [`Binding`](/en/reference/api/graphojs/classes/binding/) \| `undefined`

Defined in: [parts/Part.ts:592](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L592)

Find a binding targeting a specific property.

#### Parameters

##### targetProperty

`string`

#### Returns

[`Binding`](/en/reference/api/graphojs/classes/binding/) \| `undefined`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`findBinding`](/en/reference/api/graphojs/classes/part/#findbinding)

***

### findDiagram()

> **findDiagram**(): [`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

Defined in: [parts/Part.ts:425](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L425)

GoJS-compatible: Find the diagram that contains this part.

#### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`findDiagram`](/en/reference/api/graphojs/classes/part/#finddiagram)

***

### findFromNode()

> **findFromNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [parts/Link.ts:122](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L122)

GoJS-compatible: Find the source node of this link (or null).

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### findLayer()

> **findLayer**(): [`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

Defined in: [parts/Part.ts:430](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L430)

GoJS-compatible: Find the layer that contains this part.

#### Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`findLayer`](/en/reference/api/graphojs/classes/part/#findlayer)

***

### findObject()

> **findObject**(`name`): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [parts/Part.ts:531](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L531)

GoJS-compatible: Find a GraphObject by name in this part's visual tree.

#### Parameters

##### name

`string`

#### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`findObject`](/en/reference/api/graphojs/classes/part/#findobject)

***

### findToNode()

> **findToNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [parts/Link.ts:127](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L127)

GoJS-compatible: Find the destination node of this link (or null).

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### getLabelBounds()

> **getLabelBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/) \| `null`

Defined in: [parts/Link.ts:248](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L248)

Approximate screen-space bounds of the rendered label (based on the last
routed `pathPoints`), or null if this link has no label. Used for
label-drag hit-testing; the text width is estimated from character count
since no canvas context is available here for exact measurement.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/) \| `null`

***

### removeAdornment()

> **removeAdornment**(`name`): `boolean`

Defined in: [parts/Part.ts:558](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L558)

Remove an adornment from this part.

#### Parameters

##### name

`string`

#### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`removeAdornment`](/en/reference/api/graphojs/classes/part/#removeadornment)

***

### removeBinding()

> **removeBinding**(`binding`): `boolean`

Defined in: [parts/Part.ts:579](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L579)

Remove a binding from this part.

#### Parameters

##### binding

[`Binding`](/en/reference/api/graphojs/classes/binding/)

#### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`removeBinding`](/en/reference/api/graphojs/classes/part/#removebinding)

***

### removeVisual()

> **removeVisual**(`element`): `boolean`

Defined in: [parts/Part.ts:525](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L525)

GoJS-compatible: Remove a child element from this part's visual tree.

#### Parameters

##### element

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`removeVisual`](/en/reference/api/graphojs/classes/part/#removevisual)

***

### setPathPoints()

> **setPathPoints**(`points`): `void`

Defined in: [parts/Link.ts:238](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L238)

Set the computed path points.

#### Parameters

##### points

`object`[]

#### Returns

`void`

***

### updateBounds()

> **updateBounds**(): `void`

Defined in: [parts/Link.ts:535](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Link.ts#L535)

Update the bounds based on all path points.

#### Returns

`void`
