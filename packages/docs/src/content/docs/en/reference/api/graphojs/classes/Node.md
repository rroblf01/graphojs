---
editUrl: false
next: false
prev: false
title: "Node"
---

Defined in: [parts/Node.ts:16](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L16)

A visual node in a diagram.

## Extends

- [`Part`](/en/reference/api/graphojs/classes/part/)

## Constructors

### Constructor

> **new Node**(`key`, `bounds`): `Node`

Defined in: [parts/Part.ts:58](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L58)

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`Node`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`constructor`](/en/reference/api/graphojs/classes/part/#constructor)

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

Defined in: [parts/Part.ts:628](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L628)

Get the center point.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Inherited from

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

### cornerRadius

#### Get Signature

> **get** **cornerRadius**(): `number`

Defined in: [parts/Node.ts:61](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L61)

##### Returns

`number`

#### Set Signature

> **set** **cornerRadius**(`value`): `void`

Defined in: [parts/Node.ts:65](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L65)

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

Defined in: [parts/Node.ts:84](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L84)

GoJS-compatible: Get the elements in this node's visual tree.

##### Returns

readonly [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)[]

#### Overrides

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

### hasPanel

#### Get Signature

> **get** **hasPanel**(): `boolean`

Defined in: [parts/Node.ts:70](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L70)

Check whether this node uses a panel for rendering.

##### Returns

`boolean`

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

Defined in: [parts/Node.ts:37](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L37)

##### Returns

`string`

#### Set Signature

> **set** **label**(`value`): `void`

Defined in: [parts/Node.ts:41](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L41)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### labelColor

#### Get Signature

> **get** **labelColor**(): `string`

Defined in: [parts/Node.ts:45](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L45)

##### Returns

`string`

#### Set Signature

> **set** **labelColor**(`value`): `void`

Defined in: [parts/Node.ts:49](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L49)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### labelFont

#### Get Signature

> **get** **labelFont**(): `string`

Defined in: [parts/Node.ts:53](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L53)

##### Returns

`string`

#### Set Signature

> **set** **labelFont**(`value`): `void`

Defined in: [parts/Node.ts:57](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L57)

##### Parameters

###### value

`string`

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

### portCount

#### Get Signature

> **get** **portCount**(): `number`

Defined in: [parts/Node.ts:110](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L110)

Get the number of ports.

##### Returns

`number`

***

### ports

#### Get Signature

> **get** **ports**(): readonly [`Port`](/en/reference/api/graphojs/classes/port/)[]

Defined in: [parts/Node.ts:105](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L105)

Get all ports on this node.

##### Returns

readonly [`Port`](/en/reference/api/graphojs/classes/port/)[]

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

### shape

#### Get Signature

> **get** **shape**(): [`NodeShape`](/en/reference/api/graphojs/type-aliases/nodeshape/)

Defined in: [parts/Node.ts:29](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L29)

##### Returns

[`NodeShape`](/en/reference/api/graphojs/type-aliases/nodeshape/)

#### Set Signature

> **set** **shape**(`value`): `void`

Defined in: [parts/Node.ts:33](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L33)

##### Parameters

###### value

[`NodeShape`](/en/reference/api/graphojs/type-aliases/nodeshape/)

##### Returns

`void`

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

### add()

> **add**(`element`): `this`

Defined in: [parts/Node.ts:89](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L89)

GoJS-compatible: Add a child element to this node's visual tree.

#### Parameters

##### element

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`this`

***

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

### addPort()

> **addPort**(`port`): `this`

Defined in: [parts/Node.ts:131](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L131)

Add a port to this node.

#### Parameters

##### port

[`Port`](/en/reference/api/graphojs/classes/port/)

#### Returns

`this`

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

### clearPorts()

> **clearPorts**(): `void`

Defined in: [parts/Node.ts:145](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L145)

Remove all ports.

#### Returns

`void`

***

### collectPortsFromPanel()

> **collectPortsFromPanel**(): `void`

Defined in: [parts/Node.ts:159](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L159)

GoJS-compatible: Collect ports declared declaratively in the visual tree
(GraphObjects with a non-empty `portId`), creating Port entries.
Uses the object's relative position within the node bounds as the port spot.

#### Returns

`void`

***

### containsPoint()

> **containsPoint**(`point`): `boolean`

Defined in: [parts/Part.ts:623](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L623)

Check if a point is inside this part.

#### Parameters

##### point

###### x

`number`

###### y

`number`

#### Returns

`boolean`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`containsPoint`](/en/reference/api/graphojs/classes/part/#containspoint)

***

### copy()

> **copy**(): `this`

Defined in: [parts/Part.ts:649](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L649)

Create a deep copy of this part.

#### Returns

`this`

#### Inherited from

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

### findLayer()

> **findLayer**(): [`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

Defined in: [parts/Part.ts:430](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Part.ts#L430)

GoJS-compatible: Find the layer that contains this part.

#### Returns

[`Layer`](/en/reference/api/graphojs/classes/layer/) \| `null`

#### Inherited from

[`Part`](/en/reference/api/graphojs/classes/part/).[`findLayer`](/en/reference/api/graphojs/classes/part/#findlayer)

***

### findLinksConnected()

> **findLinksConnected**(): [`Link`](/en/reference/api/graphojs/classes/link/)[]

Defined in: [parts/Node.ts:323](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L323)

GoJS-compatible: All links connected to this node (in or out).

#### Returns

[`Link`](/en/reference/api/graphojs/classes/link/)[]

***

### findLinksInto()

> **findLinksInto**(): [`Link`](/en/reference/api/graphojs/classes/link/)[]

Defined in: [parts/Node.ts:309](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L309)

GoJS-compatible: All links that point into this node.

#### Returns

[`Link`](/en/reference/api/graphojs/classes/link/)[]

***

### findLinksOutOf()

> **findLinksOutOf**(): [`Link`](/en/reference/api/graphojs/classes/link/)[]

Defined in: [parts/Node.ts:316](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L316)

GoJS-compatible: All links that point out of this node.

#### Returns

[`Link`](/en/reference/api/graphojs/classes/link/)[]

***

### findNodesConnected()

> **findNodesConnected**(): `Node`[]

Defined in: [parts/Node.ts:354](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L354)

GoJS-compatible: All nodes connected to this node by a link.

#### Returns

`Node`[]

***

### findNodesInto()

> **findNodesInto**(): `Node`[]

Defined in: [parts/Node.ts:330](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L330)

GoJS-compatible: The source nodes of the links pointing into this node.

#### Returns

`Node`[]

***

### findNodesOutOf()

> **findNodesOutOf**(): `Node`[]

Defined in: [parts/Node.ts:342](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L342)

GoJS-compatible: The destination nodes of the links pointing out of this node.

#### Returns

`Node`[]

***

### findObject()

> **findObject**(`name`): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [parts/Node.ts:78](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L78)

GoJS-compatible: Find a GraphObject by name in this node's visual tree.
Searches the panel's elements recursively.

#### Parameters

##### name

`string`

#### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Overrides

[`Part`](/en/reference/api/graphojs/classes/part/).[`findObject`](/en/reference/api/graphojs/classes/part/#findobject)

***

### findPort()

> **findPort**(`name`): [`Port`](/en/reference/api/graphojs/classes/port/) \| `undefined`

Defined in: [parts/Node.ts:150](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L150)

Find a port by name.

#### Parameters

##### name

`string`

#### Returns

[`Port`](/en/reference/api/graphojs/classes/port/) \| `undefined`

***

### findTreeChildrenNodes()

> **findTreeChildrenNodes**(): `Node`[]

Defined in: [parts/Node.ts:381](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L381)

GoJS-compatible: The child nodes in the tree structure.

#### Returns

`Node`[]

***

### findTreeParentNode()

> **findTreeParentNode**(): `Node` \| `null`

Defined in: [parts/Node.ts:374](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L374)

GoJS-compatible: The parent node in the tree structure (or null).

#### Returns

`Node` \| `null`

***

### getConnectionPoint()

> **getConnectionPoint**(`target`, `portName?`): `object`

Defined in: [parts/Node.ts:238](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L238)

Get the point where a link from this node should connect,
given a target direction. Uses the port if specified, otherwise
computes the edge point toward the target.

#### Parameters

##### target

###### x

`number`

###### y

`number`

##### portName?

`string`

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### getPortPoint()

> **getPortPoint**(`name?`): `object`

Defined in: [parts/Node.ts:218](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L218)

Compute the point of a port in diagram coordinates.
If no port name is given, returns the node center.

#### Parameters

##### name?

`string`

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

***

### isPointOnPort()

> **isPointOnPort**(`point`, `threshold?`): `boolean`

Defined in: [parts/Node.ts:115](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L115)

Whether a diagram point is near any of this node's ports (within a threshold).

#### Parameters

##### point

###### x

`number`

###### y

`number`

##### threshold?

`number` = `10`

#### Returns

`boolean`

***

### isTreeLeaf()

> **isTreeLeaf**(): `boolean`

Defined in: [parts/Node.ts:369](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L369)

GoJS-compatible: Whether this node is a tree leaf (no tree children).

#### Returns

`boolean`

***

### remove()

> **remove**(`element`): `boolean`

Defined in: [parts/Node.ts:99](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L99)

GoJS-compatible: Remove a child element from this node's visual tree.

#### Parameters

##### element

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`boolean`

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

### removePort()

> **removePort**(`port`): `boolean`

Defined in: [parts/Node.ts:137](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L137)

Remove a port by reference.

#### Parameters

##### port

[`Port`](/en/reference/api/graphojs/classes/port/)

#### Returns

`boolean`

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

### shapeContainsPoint()

> **shapeContainsPoint**(`point`): `boolean`

Defined in: [parts/Node.ts:280](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L280)

Shape-aware hit testing: check whether a point is inside the node's
actual shape geometry, not just its bounding box.
Falls back to the bounding box for rect/roundedRect and when the
point is clearly outside.

#### Parameters

##### point

###### x

`number`

###### y

`number`

#### Returns

`boolean`

***

### updatePortSpots()

> **updatePortSpots**(): `void`

Defined in: [parts/Node.ts:191](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L191)

Recompute the fractional spot for each existing port from the current
element positions (layout happens during draw). Called after rendering so
declarative ports resolve to their real edge positions.

#### Returns

`void`

***

### fromPosAndSize()

> `static` **fromPosAndSize**(`key`, `x`, `y`, `width`, `height`): `Node`

Defined in: [parts/Node.ts:25](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/parts/Node.ts#L25)

Create a Node from position and size.

#### Parameters

##### key

[`NodeKey`](/en/reference/api/graphojs/type-aliases/nodekey/)

##### x

`number`

##### y

`number`

##### width

`number`

##### height

`number`

#### Returns

`Node`
