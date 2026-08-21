---
editUrl: false
next: false
prev: false
title: "Link"
---

Defined in: [parts/Link.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L15)

A visual link between two nodes.

## Extends

- [`Part`](/en/reference/api/graphojs/classes/part/)

## Constructors

### Constructor

> **new Link**(`key`, `fromKey`, `toKey`): `Link`

Defined in: [parts/Link.ts:67](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L67)

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

Defined in: [parts/Link.ts:27](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L27)

***

### Curved

> `readonly` `static` **Curved**: `"curved"` = `'curved'`

Defined in: [parts/Link.ts:19](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L19)

***

### DiamondArrowHead

> `readonly` `static` **DiamondArrowHead**: `"diamond"` = `'diamond'`

Defined in: [parts/Link.ts:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L26)

***

### None

> `readonly` `static` **None**: `"none"` = `'none'`

Defined in: [parts/Link.ts:22](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L22)

***

### OpenTriangleArrowHead

> `readonly` `static` **OpenTriangleArrowHead**: `"openArrow"` = `'openArrow'`

Defined in: [parts/Link.ts:24](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L24)

***

### Orthogonal

> `readonly` `static` **Orthogonal**: `"orthogonal"` = `'orthogonal'`

Defined in: [parts/Link.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L18)

***

### StandardArrowHead

> `readonly` `static` **StandardArrowHead**: `"triangle"` = `'triangle'`

Defined in: [parts/Link.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L25)

***

### Straight

> `readonly` `static` **Straight**: `"straight"` = `'straight'`

Defined in: [parts/Link.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L17)

***

### TriangleArrowHead

> `readonly` `static` **TriangleArrowHead**: `"triangle"` = `'triangle'`

Defined in: [parts/Link.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L23)

## Accessors

### actualBounds

#### Get Signature

> **get** **actualBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [parts/Part.ts:230](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L230)

GoJS-compatible: The actual bounds of this part in document coordinates.

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Set Signature

> **set** **actualBounds**(`value`): `void`

Defined in: [parts/Part.ts:234](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L234)

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

Defined in: [parts/Part.ts:572](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L572)

Get all adornments on this part.

##### Returns

`ReadonlyMap`\<`string`, [`Adornment`](/en/reference/api/graphojs/classes/adornment/)\>

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`adornments`](/en/reference/api/graphojs/classes/part/#adornments)

***

### angle

#### Get Signature

> **get** **angle**(): `number`

Defined in: [parts/Part.ts:313](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L313)

The rotation angle in degrees.

##### Returns

`number`

#### Set Signature

> **set** **angle**(`value`): `void`

Defined in: [parts/Part.ts:317](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L317)

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

Defined in: [parts/Link.ts:281](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L281)

The arrowhead style at the target end.

##### Returns

[`ArrowheadStyle`](/en/reference/api/graphojs/type-aliases/arrowheadstyle/)

#### Set Signature

> **set** **arrowhead**(`value`): `void`

Defined in: [parts/Link.ts:285](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L285)

##### Parameters

###### value

[`ArrowheadStyle`](/en/reference/api/graphojs/type-aliases/arrowheadstyle/)

##### Returns

`void`

***

### arrowheadSize

#### Get Signature

> **get** **arrowheadSize**(): `number`

Defined in: [parts/Link.ts:290](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L290)

The size of the arrowhead.

##### Returns

`number`

#### Set Signature

> **set** **arrowheadSize**(`value`): `void`

Defined in: [parts/Link.ts:294](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L294)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### avoidObstacles

#### Get Signature

> **get** **avoidObstacles**(): `boolean`

Defined in: [parts/Link.ts:425](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L425)

Whether this link should route around obstacles (nodes).

##### Returns

`boolean`

#### Set Signature

> **set** **avoidObstacles**(`value`): `void`

Defined in: [parts/Link.ts:429](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L429)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### background

#### Get Signature

> **get** **background**(): `string` \| `null`

Defined in: [parts/Part.ts:185](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L185)

GoJS-compatible: The background color of this part.

##### Returns

`string` \| `null`

#### Set Signature

> **set** **background**(`value`): `void`

Defined in: [parts/Part.ts:189](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L189)

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

Defined in: [parts/Part.ts:603](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L603)

Get all bindings on this part.

##### Returns

readonly [`Binding`](/en/reference/api/graphojs/classes/binding/)[]

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`bindings`](/en/reference/api/graphojs/classes/part/#bindings)

***

### bounds

#### Get Signature

> **get** **bounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [parts/Part.ts:135](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L135)

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Set Signature

> **set** **bounds**(`value`): `void`

Defined in: [parts/Part.ts:139](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L139)

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

Defined in: [parts/Part.ts:368](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L368)

GoJS-compatible: The category of this part (used to select a template).

##### Returns

`string`

#### Set Signature

> **set** **category**(`value`): `void`

Defined in: [parts/Part.ts:372](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L372)

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

Defined in: [parts/Link.ts:559](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L559)

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

Defined in: [parts/Part.ts:405](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L405)

Get the containing group, or null if top-level.

##### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

#### Set Signature

> **set** **containingGroup**(`value`): `void`

Defined in: [parts/Part.ts:410](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L410)

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

> **get** **contextMenu**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| [`HTMLInfo`](/en/reference/api/graphojs/classes/htmlinfo/) \| `null`

Defined in: [parts/Part.ts:488](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L488)

GoJS-compatible: a context menu shown on right-click — a Panel
template drawn to canvas, or an [HTMLInfo](/en/reference/api/graphojs/classes/htmlinfo/) for full control over
an HTML element.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| [`HTMLInfo`](/en/reference/api/graphojs/classes/htmlinfo/) \| `null`

#### Set Signature

> **set** **contextMenu**(`value`): `void`

Defined in: [parts/Part.ts:492](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L492)

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| [`HTMLInfo`](/en/reference/api/graphojs/classes/htmlinfo/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`contextMenu`](/en/reference/api/graphojs/classes/part/#contextmenu)

***

### copyable

#### Get Signature

> **get** **copyable**(): `boolean`

Defined in: [parts/Part.ts:118](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L118)

GoJS-compatible: Whether this part can be copied.

##### Returns

`boolean`

#### Set Signature

> **set** **copyable**(`value`): `void`

Defined in: [parts/Part.ts:122](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L122)

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

Defined in: [parts/Link.ts:326](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L326)

The corner rounding radius for orthogonal routing.

##### Returns

`number`

#### Set Signature

> **set** **corner**(`value`): `void`

Defined in: [parts/Link.ts:330](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L330)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### cursor

#### Get Signature

> **get** **cursor**(): `string`

Defined in: [parts/Part.ts:203](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L203)

GoJS-compatible: The cursor shown when hovering this part.

##### Returns

`string`

#### Set Signature

> **set** **cursor**(`value`): `void`

Defined in: [parts/Part.ts:207](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L207)

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

Defined in: [parts/Link.ts:145](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L145)

GoJS-compatible: The type of curve used for this link.

##### Returns

`"None"` \| `"Bezier"` \| `"JumpOver"` \| `"AvoidsNodes"`

#### Set Signature

> **set** **curve**(`value`): `void`

Defined in: [parts/Link.ts:149](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L149)

##### Parameters

###### value

`"None"` \| `"Bezier"` \| `"JumpOver"` \| `"AvoidsNodes"`

##### Returns

`void`

***

### curviness

#### Get Signature

> **get** **curviness**(): `number`

Defined in: [parts/Link.ts:380](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L380)

Controls the tightness of curved routing. 0 = default, positive = tighter, negative = looser.

##### Returns

`number`

#### Set Signature

> **set** **curviness**(`value`): `void`

Defined in: [parts/Link.ts:384](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L384)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### data

#### Get Signature

> **get** **data**(): [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `null`

Defined in: [parts/Part.ts:359](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L359)

GoJS-compatible: Reference to the model data object for this part.

##### Returns

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `null`

#### Set Signature

> **set** **data**(`value`): `void`

Defined in: [parts/Part.ts:363](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L363)

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

Defined in: [parts/Part.ts:96](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L96)

GoJS-compatible: Whether this part can be deleted.

##### Returns

`boolean`

#### Set Signature

> **set** **deletable**(`value`): `void`

Defined in: [parts/Part.ts:100](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L100)

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

Defined in: [parts/Part.ts:162](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L162)

GoJS-compatible: The desired size of this part.

##### Returns

[`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

#### Set Signature

> **set** **desiredSize**(`value`): `void`

Defined in: [parts/Part.ts:167](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L167)

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

Defined in: [parts/Part.ts:443](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L443)

GoJS-compatible: The diagram that this part is in (or null).

##### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

#### Set Signature

> **set** **diagram**(`value`): `void`

Defined in: [parts/Part.ts:448](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L448)

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

Defined in: [parts/Part.ts:377](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L377)

GoJS-compatible: The opacity used when this part is being dragged.

##### Returns

`number`

#### Set Signature

> **set** **dragAlpha**(`value`): `void`

Defined in: [parts/Part.ts:381](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L381)

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

Defined in: [parts/Part.ts:506](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L506)

Whether this part can be dragged.

##### Returns

`boolean`

#### Set Signature

> **set** **draggable**(`value`): `void`

Defined in: [parts/Part.ts:510](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L510)

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

Defined in: [parts/Part.ts:546](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L546)

GoJS-compatible: Get the child elements in this part's visual tree.

##### Returns

readonly [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)[]

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`elements`](/en/reference/api/graphojs/classes/part/#elements)

***

### fill

#### Get Signature

> **get** **fill**(): `string`

Defined in: [parts/Part.ts:280](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L280)

##### Returns

`string`

#### Set Signature

> **set** **fill**(`value`): `void`

Defined in: [parts/Part.ts:284](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L284)

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

Defined in: [parts/Link.ts:443](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L443)

GoJS-compatible: Length of the segment at the start of the link.

##### Returns

`number`

#### Set Signature

> **set** **fromEndSegmentLength**(`value`): `void`

Defined in: [parts/Link.ts:447](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L447)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### fromEndSegmentOrientation

#### Get Signature

> **get** **fromEndSegmentOrientation**(): `number`

Defined in: [parts/Link.ts:163](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L163)

GoJS-compatible: The orientation of the segment leaving the from-end.

##### Returns

`number`

#### Set Signature

> **set** **fromEndSegmentOrientation**(`value`): `void`

Defined in: [parts/Link.ts:167](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L167)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### fromKey

#### Get Signature

> **get** **fromKey**(): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [parts/Link.ts:75](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L75)

##### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Set Signature

> **set** **fromKey**(`value`): `void`

Defined in: [parts/Link.ts:79](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L79)

##### Parameters

###### value

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### Returns

`void`

***

### fromNode

#### Get Signature

> **get** **fromNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [parts/Link.ts:84](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L84)

GoJS-compatible: The source node of this link (or null).

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

#### Set Signature

> **set** **fromNode**(`value`): `void`

Defined in: [parts/Link.ts:90](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L90)

##### Parameters

###### value

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

##### Returns

`void`

***

### fromPort

#### Get Signature

> **get** **fromPort**(): `object`

Defined in: [parts/Link.ts:180](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L180)

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **fromPort**(`value`): `void`

Defined in: [parts/Link.ts:184](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L184)

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

Defined in: [parts/Link.ts:197](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L197)

The name of the source port on the from-node.

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **fromPortName**(`value`): `void`

Defined in: [parts/Link.ts:201](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L201)

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### fromShortLength

#### Get Signature

> **get** **fromShortLength**(): `number`

Defined in: [parts/Link.ts:407](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L407)

GoJS-compatible: The distance from the from-end to the first point.

##### Returns

`number`

#### Set Signature

> **set** **fromShortLength**(`value`): `void`

Defined in: [parts/Link.ts:411](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L411)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### fromSpot

#### Get Signature

> **get** **fromSpot**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [parts/Link.ts:215](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L215)

The spot on the from-node where this link connects.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **fromSpot**(`value`): `void`

Defined in: [parts/Link.ts:219](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L219)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

***

### hasManualReshape

#### Get Signature

> **get** **hasManualReshape**(): `boolean`

Defined in: [parts/Link.ts:272](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L272)

Whether pathPoints were set by the user reshaping this link (via
LinkReshapingTool) rather than computed by the router. While true, model
syncs that don't touch this link's own endpoints leave pathPoints alone
instead of overwriting the manual shape; moving either endpoint node
clears it (see Diagram.invalidateLinksForNode), reverting to auto-routing.

##### Returns

`boolean`

#### Set Signature

> **set** **hasManualReshape**(`value`): `void`

Defined in: [parts/Link.ts:276](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L276)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [parts/Part.ts:153](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L153)

GoJS-compatible: The height of this part (delegates to its bounds).

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

Defined in: [parts/Part.ts:157](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L157)

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

Defined in: [parts/Part.ts:127](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L127)

GoJS-compatible: Whether this part is currently highlighted.

##### Returns

`boolean`

#### Set Signature

> **set** **isHighlighted**(`value`): `void`

Defined in: [parts/Part.ts:131](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L131)

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

Defined in: [parts/Part.ts:386](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L386)

GoJS-compatible: Whether this part is within the document bounds.

##### Returns

`boolean`

#### Set Signature

> **set** **isInDocumentBounds**(`value`): `void`

Defined in: [parts/Part.ts:390](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L390)

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

Defined in: [parts/Part.ts:415](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L415)

GoJS-compatible: Whether this part is a member of a group.

##### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isMemberOfGroup`](/en/reference/api/graphojs/classes/part/#ismemberofgroup)

***

### isPositioned

#### Get Signature

> **get** **isPositioned**(): `boolean`

Defined in: [parts/Part.ts:420](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L420)

GoJS-compatible: Whether this part has been given a position/bounds.

##### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isPositioned`](/en/reference/api/graphojs/classes/part/#ispositioned)

***

### isSelected

#### Get Signature

> **get** **isSelected**(): `boolean`

Defined in: [parts/Part.ts:264](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L264)

##### Returns

`boolean`

#### Set Signature

> **set** **isSelected**(`value`): `void`

Defined in: [parts/Part.ts:268](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L268)

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

Defined in: [parts/Part.ts:109](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L109)

GoJS-compatible: Whether this part's tree-children (per findTreeChildrenNodes)
are shown. Distinct from Group.isSubGraphExpanded — this applies to any Part
and is what TreeExpanderButton toggles via Diagram.collapseTree/expandTree.

##### Returns

`boolean`

#### Set Signature

> **set** **isTreeExpanded**(`value`): `void`

Defined in: [parts/Part.ts:113](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L113)

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

Defined in: [parts/Link.ts:389](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L389)

GoJS-compatible: Whether this link is a tree link (parent-child).

##### Returns

`boolean`

#### Set Signature

> **set** **isTreeLink**(`value`): `void`

Defined in: [parts/Link.ts:393](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L393)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### isVisibleObject

#### Get Signature

> **get** **isVisibleObject**(): `boolean`

Defined in: [parts/Part.ts:239](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L239)

GoJS-compatible: Whether this part and its ancestors are visible.

##### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`isVisibleObject`](/en/reference/api/graphojs/classes/part/#isvisibleobject)

***

### jumpOver

#### Get Signature

> **get** **jumpOver**(): `boolean`

Defined in: [parts/Link.ts:434](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L434)

Whether this link should jump over other links at crossings.

##### Returns

`boolean`

#### Set Signature

> **set** **jumpOver**(`value`): `void`

Defined in: [parts/Link.ts:438](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L438)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### key

#### Get Signature

> **get** **key**(): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [parts/Part.ts:72](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L72)

##### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`key`](/en/reference/api/graphojs/classes/part/#key)

***

### label

#### Get Signature

> **get** **label**(): `string`

Defined in: [parts/Link.ts:299](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L299)

The label text shown on the link.

##### Returns

`string`

#### Set Signature

> **set** **label**(`value`): `void`

Defined in: [parts/Link.ts:303](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L303)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### labelAlignment

#### Get Signature

> **get** **labelAlignment**(): `"start"` \| `"end"` \| `"middle"`

Defined in: [parts/Link.ts:371](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L371)

Horizontal alignment of the label along its segment.

##### Returns

`"start"` \| `"end"` \| `"middle"`

#### Set Signature

> **set** **labelAlignment**(`value`): `void`

Defined in: [parts/Link.ts:375](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L375)

##### Parameters

###### value

`"start"` \| `"end"` \| `"middle"`

##### Returns

`void`

***

### labelColor

#### Get Signature

> **get** **labelColor**(): `string`

Defined in: [parts/Link.ts:308](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L308)

The color of the link label.

##### Returns

`string`

#### Set Signature

> **set** **labelColor**(`value`): `void`

Defined in: [parts/Link.ts:312](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L312)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### labelFont

#### Get Signature

> **get** **labelFont**(): `string`

Defined in: [parts/Link.ts:317](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L317)

The font of the link label.

##### Returns

`string`

#### Set Signature

> **set** **labelFont**(`value`): `void`

Defined in: [parts/Link.ts:321](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L321)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### labelOffset

#### Get Signature

> **get** **labelOffset**(): `number`

Defined in: [parts/Link.ts:335](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L335)

The perpendicular offset of the link label from the path.

##### Returns

`number`

#### Set Signature

> **set** **labelOffset**(`value`): `void`

Defined in: [parts/Link.ts:339](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L339)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### labelSegmentFraction

#### Get Signature

> **get** **labelSegmentFraction**(): `number`

Defined in: [parts/Link.ts:353](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L353)

GoJS-compatible ("segmentFraction"): position along the chosen segment, 0 (start) to 1 (end). Default 0.5 (midpoint).

##### Returns

`number`

#### Set Signature

> **set** **labelSegmentFraction**(`value`): `void`

Defined in: [parts/Link.ts:357](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L357)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### labelSegmentIndex

#### Get Signature

> **get** **labelSegmentIndex**(): `number`

Defined in: [parts/Link.ts:344](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L344)

The segment index to place the label on (-1 = middle segment).

##### Returns

`number`

#### Set Signature

> **set** **labelSegmentIndex**(`value`): `void`

Defined in: [parts/Link.ts:348](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L348)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### labelSide

#### Get Signature

> **get** **labelSide**(): `"top"` \| `"bottom"` \| `"left"` \| `"right"` \| `"auto"`

Defined in: [parts/Link.ts:362](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L362)

Which side of the link to place the label on.

##### Returns

`"top"` \| `"bottom"` \| `"left"` \| `"right"` \| `"auto"`

#### Set Signature

> **set** **labelSide**(`value`): `void`

Defined in: [parts/Link.ts:366](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L366)

##### Parameters

###### value

`"top"` \| `"bottom"` \| `"left"` \| `"right"` \| `"auto"`

##### Returns

`void`

***

### layer

#### Get Signature

> **get** **layer**(): [`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

Defined in: [parts/Part.ts:425](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L425)

Get the layer this part belongs to.

##### Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

#### Set Signature

> **set** **layer**(`value`): `void`

Defined in: [parts/Part.ts:430](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L430)

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

Defined in: [parts/Part.ts:395](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L395)

GoJS-compatible: The name of the layer this part belongs to.

##### Returns

`string`

#### Set Signature

> **set** **layerName**(`_value`): `void`

Defined in: [parts/Part.ts:399](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L399)

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

Defined in: [parts/Part.ts:326](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L326)

GoJS-compatible: The location point of this part — the point within the
bounds at `locationSpot`. With the default locationSpot (0.5, 0.5) this
is the center; changing locationSpot moves the part so the spot stays put.

##### Returns

[`Point`](/en/reference/api/graphojs/classes/point/)

#### Set Signature

> **set** **location**(`value`): `void`

Defined in: [parts/Part.ts:334](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L334)

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

Defined in: [parts/Part.ts:341](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L341)

GoJS-compatible: The spot in the part that corresponds to the location point.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **locationSpot**(`value`): `void`

Defined in: [parts/Part.ts:345](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L345)

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

Defined in: [parts/Part.ts:221](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L221)

GoJS-compatible: The maximum size of this part.

##### Returns

`object`

###### height

> **height**: `number`

###### width

> **width**: `number`

#### Set Signature

> **set** **maxSize**(`value`): `void`

Defined in: [parts/Part.ts:225](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L225)

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

Defined in: [parts/Part.ts:212](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L212)

GoJS-compatible: The minimum size of this part.

##### Returns

`object`

###### height

> **height**: `number`

###### width

> **width**: `number`

#### Set Signature

> **set** **minSize**(`value`): `void`

Defined in: [parts/Part.ts:216](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L216)

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

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [parts/Part.ts:87](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L87)

GoJS-compatible: an arbitrary name for this part. Real GoJS has this
because `Part extends GraphObject`, which has its own `.name` (used
for `findObject`-style lookups); graphojs's `Part` is a separate
class, so it needs its own copy of the same property rather than
inheriting it — most relevant for a bare decorative `Part` (see
`Diagram.add`), which ported GoJS code may still identify by `.name`
the way it would identify any other `GraphObject`.

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Defined in: [parts/Part.ts:91](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L91)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`name`](/en/reference/api/graphojs/classes/part/#name)

***

### opacity

#### Get Signature

> **get** **opacity**(): `number`

Defined in: [parts/Part.ts:272](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L272)

##### Returns

`number`

#### Set Signature

> **set** **opacity**(`value`): `void`

Defined in: [parts/Part.ts:276](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L276)

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

Defined in: [parts/Part.ts:533](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L533)

GoJS-compatible: Get the panel used to render this part's visual tree.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| `null`

#### Set Signature

> **set** **panel**(`value`): `void`

Defined in: [parts/Part.ts:538](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L538)

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

Defined in: [parts/Link.ts:488](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L488)

GoJS-compatible: Custom path pattern for the link stroke.

##### Returns

`string` \| `null`

#### Set Signature

> **set** **pathPattern**(`value`): `void`

Defined in: [parts/Link.ts:492](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L492)

##### Parameters

###### value

`string` \| `null`

##### Returns

`void`

***

### pathPoints

#### Get Signature

> **get** **pathPoints**(): `object`[]

Defined in: [parts/Link.ts:233](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L233)

The computed path points for this link.

##### Returns

`object`[]

***

### pickable

#### Get Signature

> **get** **pickable**(): `boolean`

Defined in: [parts/Part.ts:194](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L194)

GoJS-compatible: Whether this part is pickable (hit-testable).

##### Returns

`boolean`

#### Set Signature

> **set** **pickable**(`value`): `void`

Defined in: [parts/Part.ts:198](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L198)

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

Defined in: [parts/Part.ts:668](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L668)

Get the position (top-left).

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **position**(`value`): `void`

Defined in: [parts/Part.ts:673](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L673)

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

Defined in: [parts/Link.ts:461](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L461)

GoJS-compatible: Whether the link can be relinked from the start end.

##### Returns

`boolean`

#### Set Signature

> **set** **relinkableFrom**(`value`): `void`

Defined in: [parts/Link.ts:465](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L465)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### relinkableTo

#### Get Signature

> **get** **relinkableTo**(): `boolean`

Defined in: [parts/Link.ts:470](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L470)

GoJS-compatible: Whether the link can be relinked to the end end.

##### Returns

`boolean`

#### Set Signature

> **set** **relinkableTo**(`value`): `void`

Defined in: [parts/Link.ts:474](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L474)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### reshapable

#### Get Signature

> **get** **reshapable**(): `boolean`

Defined in: [parts/Link.ts:479](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L479)

GoJS-compatible: Whether the link path can be reshaped by dragging midpoints.

##### Returns

`boolean`

#### Set Signature

> **set** **reshapable**(`value`): `void`

Defined in: [parts/Link.ts:483](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L483)

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### resizable

#### Get Signature

> **get** **resizable**(): `boolean`

Defined in: [parts/Part.ts:515](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L515)

Whether this part can be resized.

##### Returns

`boolean`

#### Set Signature

> **set** **resizable**(`value`): `void`

Defined in: [parts/Part.ts:519](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L519)

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

Defined in: [parts/Link.ts:154](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L154)

GoJS-compatible: The segment index being resized, or -1.

##### Returns

`number`

#### Set Signature

> **set** **resizingSegmentIndex**(`value`): `void`

Defined in: [parts/Link.ts:158](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L158)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### rotatable

#### Get Signature

> **get** **rotatable**(): `boolean`

Defined in: [parts/Part.ts:524](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L524)

Whether this part can be rotated.

##### Returns

`boolean`

#### Set Signature

> **set** **rotatable**(`value`): `void`

Defined in: [parts/Part.ts:528](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L528)

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

Defined in: [parts/Link.ts:131](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L131)

##### Returns

[`LinkRouting`](/en/reference/api/graphojs/type-aliases/linkrouting/)

#### Set Signature

> **set** **routing**(`value`): `void`

Defined in: [parts/Link.ts:135](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L135)

##### Parameters

###### value

[`LinkRouting`](/en/reference/api/graphojs/type-aliases/linkrouting/)

##### Returns

`void`

***

### scale

#### Get Signature

> **get** **scale**(): `number`

Defined in: [parts/Part.ts:176](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L176)

GoJS-compatible: The scale of this part.

##### Returns

`number`

#### Set Signature

> **set** **scale**(`value`): `void`

Defined in: [parts/Part.ts:180](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L180)

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

Defined in: [parts/Part.ts:256](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L256)

##### Returns

`boolean`

#### Set Signature

> **set** **selectable**(`value`): `void`

Defined in: [parts/Part.ts:260](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L260)

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

Defined in: [parts/Part.ts:350](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L350)

GoJS-compatible: The GraphObject that is used as the selection object (for adornment placement).

##### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Set Signature

> **set** **selectionObject**(`_value`): `void`

Defined in: [parts/Part.ts:354](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L354)

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

Defined in: [parts/Part.ts:679](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L679)

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

Defined in: [parts/Part.ts:288](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L288)

##### Returns

`string`

#### Set Signature

> **set** **stroke**(`value`): `void`

Defined in: [parts/Part.ts:292](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L292)

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

Defined in: [parts/Part.ts:296](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L296)

##### Returns

`number`

#### Set Signature

> **set** **strokeWidth**(`value`): `void`

Defined in: [parts/Part.ts:300](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L300)

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

Defined in: [parts/Link.ts:452](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L452)

GoJS-compatible: Length of the segment at the end of the link.

##### Returns

`number`

#### Set Signature

> **set** **toEndSegmentLength**(`value`): `void`

Defined in: [parts/Link.ts:456](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L456)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### toEndSegmentOrientation

#### Get Signature

> **get** **toEndSegmentOrientation**(): `number`

Defined in: [parts/Link.ts:172](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L172)

GoJS-compatible: The orientation of the segment entering the to-end.

##### Returns

`number`

#### Set Signature

> **set** **toEndSegmentOrientation**(`value`): `void`

Defined in: [parts/Link.ts:176](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L176)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### toKey

#### Get Signature

> **get** **toKey**(): [`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

Defined in: [parts/Link.ts:98](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L98)

##### Returns

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

#### Set Signature

> **set** **toKey**(`value`): `void`

Defined in: [parts/Link.ts:102](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L102)

##### Parameters

###### value

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### Returns

`void`

***

### toNode

#### Get Signature

> **get** **toNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [parts/Link.ts:107](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L107)

GoJS-compatible: The destination node of this link (or null).

##### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

#### Set Signature

> **set** **toNode**(`value`): `void`

Defined in: [parts/Link.ts:113](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L113)

##### Parameters

###### value

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/) \| [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

##### Returns

`void`

***

### tooltip

#### Get Signature

> **get** **tooltip**(): `string`

Defined in: [parts/Part.ts:463](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L463)

The tooltip text shown when hovering over this part.

##### Returns

`string`

#### Set Signature

> **set** **tooltip**(`value`): `void`

Defined in: [parts/Part.ts:467](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L467)

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

> **get** **toolTip**(): [`Panel`](/en/reference/api/graphojs/classes/panel/) \| [`HTMLInfo`](/en/reference/api/graphojs/classes/htmlinfo/) \| `null`

Defined in: [parts/Part.ts:475](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L475)

GoJS-compatible: a tooltip shown on hover — a Panel template drawn to
canvas, or an [HTMLInfo](/en/reference/api/graphojs/classes/htmlinfo/) for full control over an HTML element.

##### Returns

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| [`HTMLInfo`](/en/reference/api/graphojs/classes/htmlinfo/) \| `null`

#### Set Signature

> **set** **toolTip**(`value`): `void`

Defined in: [parts/Part.ts:479](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L479)

##### Parameters

###### value

[`Panel`](/en/reference/api/graphojs/classes/panel/) \| [`HTMLInfo`](/en/reference/api/graphojs/classes/htmlinfo/) \| `null`

##### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`toolTip`](/en/reference/api/graphojs/classes/part/#tooltip-1)

***

### tooltipVisible

#### Get Signature

> **get** **tooltipVisible**(): `boolean`

Defined in: [parts/Part.ts:497](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L497)

Whether the tooltip is currently visible.

##### Returns

`boolean`

#### Set Signature

> **set** **tooltipVisible**(`value`): `void`

Defined in: [parts/Part.ts:501](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L501)

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

Defined in: [parts/Link.ts:188](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L188)

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **toPort**(`value`): `void`

Defined in: [parts/Link.ts:192](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L192)

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

Defined in: [parts/Link.ts:206](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L206)

The name of the target port on the to-node.

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **toPortName**(`value`): `void`

Defined in: [parts/Link.ts:210](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L210)

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### toShortLength

#### Get Signature

> **get** **toShortLength**(): `number`

Defined in: [parts/Link.ts:416](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L416)

GoJS-compatible: The distance from the to-end to the last point.

##### Returns

`number`

#### Set Signature

> **set** **toShortLength**(`value`): `void`

Defined in: [parts/Link.ts:420](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L420)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### toSpot

#### Get Signature

> **get** **toSpot**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [parts/Link.ts:224](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L224)

The spot on the to-node where this link connects.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **toSpot**(`value`): `void`

Defined in: [parts/Link.ts:228](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L228)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

***

### treeLinkRoute

#### Get Signature

> **get** **treeLinkRoute**(): `"straight"` \| `"orthogonal"` \| `"angled"`

Defined in: [parts/Link.ts:398](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L398)

GoJS-compatible: The routing style for tree links.

##### Returns

`"straight"` \| `"orthogonal"` \| `"angled"`

#### Set Signature

> **set** **treeLinkRoute**(`value`): `void`

Defined in: [parts/Link.ts:402](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L402)

##### Parameters

###### value

`"straight"` \| `"orthogonal"` \| `"angled"`

##### Returns

`void`

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [parts/Part.ts:248](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L248)

##### Returns

`boolean`

#### Set Signature

> **set** **visible**(`value`): `void`

Defined in: [parts/Part.ts:252](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L252)

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

Defined in: [parts/Part.ts:144](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L144)

GoJS-compatible: The width of this part (delegates to its bounds).

##### Returns

`number`

#### Set Signature

> **set** **width**(`value`): `void`

Defined in: [parts/Part.ts:148](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L148)

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

Defined in: [parts/Part.ts:304](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L304)

##### Returns

`number`

#### Set Signature

> **set** **zOrder**(`value`): `void`

Defined in: [parts/Part.ts:308](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L308)

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

Defined in: [parts/Part.ts:582](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L582)

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

Defined in: [parts/Part.ts:608](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L608)

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

Defined in: [parts/Part.ts:551](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L551)

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

Defined in: [parts/Part.ts:632](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L632)

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

Defined in: [parts/Part.ts:647](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L647)

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

Defined in: [parts/Part.ts:598](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L598)

Remove all adornments from this part.

#### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`clearAdornments`](/en/reference/api/graphojs/classes/part/#clearadornments)

***

### clearBindings()

> **clearBindings**(): `void`

Defined in: [parts/Part.ts:622](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L622)

Remove all bindings from this part.

#### Returns

`void`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`clearBindings`](/en/reference/api/graphojs/classes/part/#clearbindings)

***

### containsPoint()

> **containsPoint**(`point`): `boolean`

Defined in: [parts/Link.ts:564](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L564)

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

Defined in: [parts/Link.ts:497](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L497)

Deep copy of this link, including endpoint keys and path state.

#### Returns

`this`

#### Overrides

[`Part`](/en/reference/api/graphojs/classes/part/).[`copy`](/en/reference/api/graphojs/classes/part/#copy)

***

### findAdornment()

> **findAdornment**(`name`): [`Adornment`](/en/reference/api/graphojs/classes/adornment/) \| `undefined`

Defined in: [parts/Part.ts:577](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L577)

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

Defined in: [parts/Part.ts:588](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L588)

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

Defined in: [parts/Part.ts:627](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L627)

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

Defined in: [parts/Part.ts:453](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L453)

GoJS-compatible: Find the diagram that contains this part.

#### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`findDiagram`](/en/reference/api/graphojs/classes/part/#finddiagram)

***

### findFromNode()

> **findFromNode**(): [`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

Defined in: [parts/Link.ts:122](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L122)

GoJS-compatible: Find the source node of this link (or null).

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### findLayer()

> **findLayer**(): [`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

Defined in: [parts/Part.ts:458](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L458)

GoJS-compatible: Find the layer that contains this part.

#### Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`findLayer`](/en/reference/api/graphojs/classes/part/#findlayer)

***

### findObject()

> **findObject**(`name`): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [parts/Part.ts:566](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L566)

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

Defined in: [parts/Link.ts:127](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L127)

GoJS-compatible: Find the destination node of this link (or null).

#### Returns

[`Node`](/en/reference/api/graphojs/classes/node/) \| `null`

***

### getLabelBounds()

> **getLabelBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/) \| `null`

Defined in: [parts/Link.ts:248](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L248)

Approximate screen-space bounds of the rendered label (based on the last
routed `pathPoints`), or null if this link has no label. Used for
label-drag hit-testing; the text width is estimated from character count
since no canvas context is available here for exact measurement.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/) \| `null`

***

### removeAdornment()

> **removeAdornment**(`name`): `boolean`

Defined in: [parts/Part.ts:593](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L593)

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

Defined in: [parts/Part.ts:614](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L614)

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

Defined in: [parts/Part.ts:560](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Part.ts#L560)

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

Defined in: [parts/Link.ts:238](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L238)

Set the computed path points.

#### Parameters

##### points

`object`[]

#### Returns

`void`

***

### updateBounds()

> **updateBounds**(): `void`

Defined in: [parts/Link.ts:535](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Link.ts#L535)

Update the bounds based on all path points.

#### Returns

`void`
