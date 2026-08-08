---
editUrl: false
next: false
prev: false
title: "Panel"
---

Defined in: [panel/Panel.ts:24](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L24)

A Panel is a GraphObject that contains and lays out other GraphObjects.

## Extends

- [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

## Constructors

### Constructor

> **new Panel**(`type?`): `Panel`

Defined in: [panel/Panel.ts:62](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L62)

#### Parameters

##### type?

[`PanelType`](/en/reference/api/graphojs/type-aliases/paneltype/) = `'Auto'`

#### Returns

`Panel`

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`constructor`](/en/reference/api/graphojs/classes/graphobject/#constructor)

## Properties

### click?

> `optional` **click?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:65](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L65)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`click`](/en/reference/api/graphojs/classes/graphobject/#click)

***

### columnDefinitions

> **columnDefinitions**: `object`[] = `[]`

Defined in: [panel/Panel.ts:46](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L46)

GoJS-compatible: Explicit column widths for Table panels.

#### separatorStrokeWidth?

> `optional` **separatorStrokeWidth?**: `number`

#### width?

> `optional` **width?**: `number`

***

### contextClick?

> `optional` **contextClick?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:67](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L67)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`contextClick`](/en/reference/api/graphojs/classes/graphobject/#contextclick)

***

### data

> **data**: [`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/) \| `null` = `null`

Defined in: [panel/Panel.ts:60](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L60)

The data object most recently applied to this panel (for ofObject("parent")).

***

### doubleClick?

> `optional` **doubleClick?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:66](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L66)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`doubleClick`](/en/reference/api/graphojs/classes/graphobject/#doubleclick)

***

### mouseEnter?

> `optional` **mouseEnter?**: (`e`, `obj`, `prev`) => `void`

Defined in: [panel/GraphObject.ts:68](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L68)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

##### prev

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`mouseEnter`](/en/reference/api/graphojs/classes/graphobject/#mouseenter)

***

### mouseLeave?

> `optional` **mouseLeave?**: (`e`, `obj`, `prev`) => `void`

Defined in: [panel/GraphObject.ts:69](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L69)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

##### prev

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`mouseLeave`](/en/reference/api/graphojs/classes/graphobject/#mouseleave)

***

### mouseOut?

> `optional` **mouseOut?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:71](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L71)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`mouseOut`](/en/reference/api/graphojs/classes/graphobject/#mouseout)

***

### mouseOver?

> `optional` **mouseOver?**: (`e`, `obj`) => `void`

Defined in: [panel/GraphObject.ts:70](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L70)

#### Parameters

##### e

[`InputEvent`](/en/reference/api/graphojs/classes/inputevent/)

##### obj

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`mouseOver`](/en/reference/api/graphojs/classes/graphobject/#mouseover)

***

### parentPanel

> **parentPanel**: [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null` = `null`

Defined in: [panel/GraphObject.ts:74](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L74)

The panel this object belongs to (set when added). Used for ofObject resolution.

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`parentPanel`](/en/reference/api/graphojs/classes/graphobject/#parentpanel)

***

### portId

> **portId**: `string` = `''`

Defined in: [panel/GraphObject.ts:77](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L77)

GoJS-compatible: If non-empty, this object acts as a port on its part.

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`portId`](/en/reference/api/graphojs/classes/graphobject/#portid)

***

### rowDefinitions

> **rowDefinitions**: `object`[] = `[]`

Defined in: [panel/Panel.ts:44](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L44)

GoJS-compatible: Explicit row heights for Table panels (in the panel's coordinate space).

#### height?

> `optional` **height?**: `number`

#### separatorStrokeWidth?

> `optional` **separatorStrokeWidth?**: `number`

***

### templateProperties

> **templateProperties**: `Record`\<`string`, `unknown`\> = `{}`

Defined in: [panel/Panel.ts:57](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L57)

Extra properties to apply to the created part when this panel is used
as a node/link/group template (e.g. link routing, corner, arrowhead).

***

### Auto

> `readonly` `static` **Auto**: `"Auto"` = `'Auto'`

Defined in: [panel/Panel.ts:26](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L26)

***

### Horizontal

> `readonly` `static` **Horizontal**: `"Horizontal"` = `'Horizontal'`

Defined in: [panel/Panel.ts:28](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L28)

***

### Position

> `readonly` `static` **Position**: `"Position"` = `'Position'`

Defined in: [panel/Panel.ts:32](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L32)

***

### Spot

> `readonly` `static` **Spot**: `"Spot"` = `'Spot'`

Defined in: [panel/Panel.ts:29](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L29)

***

### Table

> `readonly` `static` **Table**: `"Table"` = `'Table'`

Defined in: [panel/Panel.ts:30](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L30)

***

### Vertical

> `readonly` `static` **Vertical**: `"Vertical"` = `'Vertical'`

Defined in: [panel/Panel.ts:27](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L27)

***

### Viewbox

> `readonly` `static` **Viewbox**: `"Viewbox"` = `'Viewbox'`

Defined in: [panel/Panel.ts:31](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L31)

## Accessors

### actualSize

#### Get Signature

> **get** **actualSize**(): [`Size`](/en/reference/api/graphojs/classes/size/)

Defined in: [panel/GraphObject.ts:382](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L382)

The actual size computed during layout.

##### Returns

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`actualSize`](/en/reference/api/graphojs/classes/graphobject/#actualsize)

***

### alignment

#### Get Signature

> **get** **alignment**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [panel/GraphObject.ts:392](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L392)

The alignment spot for Spot panels.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **alignment**(`value`): `void`

Defined in: [panel/GraphObject.ts:396](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L396)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`alignment`](/en/reference/api/graphojs/classes/graphobject/#alignment)

***

### alignmentFocus

#### Get Signature

> **get** **alignmentFocus**(): [`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

Defined in: [panel/GraphObject.ts:454](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L454)

GoJS-compatible: The spot within this object used for alignment/placement.

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

#### Set Signature

> **set** **alignmentFocus**(`value`): `void`

Defined in: [panel/GraphObject.ts:458](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L458)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/) \| `null`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`alignmentFocus`](/en/reference/api/graphojs/classes/graphobject/#alignmentfocus)

***

### angle

#### Get Signature

> **get** **angle**(): `number`

Defined in: [panel/GraphObject.ts:327](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L327)

The rotation angle in degrees.

##### Returns

`number`

#### Set Signature

> **set** **angle**(`value`): `void`

Defined in: [panel/GraphObject.ts:331](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L331)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`angle`](/en/reference/api/graphojs/classes/graphobject/#angle)

***

### background

#### Get Signature

> **get** **background**(): `string` \| `null`

Defined in: [panel/Panel.ts:161](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L161)

The background color of this panel.

##### Returns

`string` \| `null`

#### Set Signature

> **set** **background**(`value`): `void`

Defined in: [panel/Panel.ts:165](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L165)

##### Parameters

###### value

`string` \| `null`

##### Returns

`void`

***

### bindings

#### Get Signature

> **get** **bindings**(): readonly [`Binding`](/en/reference/api/graphojs/classes/binding/)[]

Defined in: [panel/GraphObject.ts:89](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L89)

GoJS-compatible: The bindings attached to this graph object.

##### Returns

readonly [`Binding`](/en/reference/api/graphojs/classes/binding/)[]

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`bindings`](/en/reference/api/graphojs/classes/graphobject/#bindings)

***

### column

#### Get Signature

> **get** **column**(): `number`

Defined in: [panel/GraphObject.ts:425](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L425)

GoJS-compatible: The column index for table panels.

##### Returns

`number`

#### Set Signature

> **set** **column**(`value`): `void`

Defined in: [panel/GraphObject.ts:429](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L429)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`column`](/en/reference/api/graphojs/classes/textblock/#column)

***

### columnCount

#### Get Signature

> **get** **columnCount**(): `number`

Defined in: [panel/Panel.ts:184](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L184)

The number of columns (for Table panels).

##### Returns

`number`

***

### columnSpan

#### Get Signature

> **get** **columnSpan**(): `number`

Defined in: [panel/GraphObject.ts:443](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L443)

GoJS-compatible: The number of columns this object spans.

##### Returns

`number`

#### Set Signature

> **set** **columnSpan**(`value`): `void`

Defined in: [panel/GraphObject.ts:447](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L447)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`columnSpan`](/en/reference/api/graphojs/classes/textblock/#columnspan)

***

### copyable

#### Get Signature

> **get** **copyable**(): `boolean`

Defined in: [panel/GraphObject.ts:536](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L536)

GoJS-compatible: Whether this object is included when copying its part.

##### Returns

`boolean`

#### Set Signature

> **set** **copyable**(`value`): `void`

Defined in: [panel/GraphObject.ts:540](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L540)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`copyable`](/en/reference/api/graphojs/classes/graphobject/#copyable)

***

### cursor

#### Get Signature

> **get** **cursor**(): `string`

Defined in: [panel/GraphObject.ts:336](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L336)

GoJS-compatible: The cursor displayed when hovering over this object.

##### Returns

`string`

#### Set Signature

> **set** **cursor**(`value`): `void`

Defined in: [panel/GraphObject.ts:340](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L340)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`cursor`](/en/reference/api/graphojs/classes/graphobject/#cursor)

***

### defaultAlignment

#### Get Signature

> **get** **defaultAlignment**(): \{ `x`: `number`; `y`: `number`; \} \| `null`

Defined in: [panel/Panel.ts:224](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L224)

GoJS-compatible: The default alignment for elements in Spot panels.

##### Returns

\{ `x`: `number`; `y`: `number`; \} \| `null`

#### Set Signature

> **set** **defaultAlignment**(`value`): `void`

Defined in: [panel/Panel.ts:228](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L228)

##### Parameters

###### value

\{ `x`: `number`; `y`: `number`; \} \| `null`

##### Returns

`void`

***

### desiredSize

#### Get Signature

> **get** **desiredSize**(): [`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

Defined in: [panel/GraphObject.ts:345](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L345)

The desired size. If null, natural size is used.

##### Returns

[`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

#### Set Signature

> **set** **desiredSize**(`value`): `void`

Defined in: [panel/GraphObject.ts:349](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L349)

##### Parameters

###### value

[`Size`](/en/reference/api/graphojs/classes/size/) \| `null`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`desiredSize`](/en/reference/api/graphojs/classes/textblock/#desiredsize)

***

### elementCount

#### Get Signature

> **get** **elementCount**(): `number`

Defined in: [panel/Panel.ts:138](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L138)

The number of elements in this panel.

##### Returns

`number`

***

### elements

#### Get Signature

> **get** **elements**(): readonly [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)[]

Defined in: [panel/Panel.ts:133](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L133)

The elements contained in this panel.

##### Returns

readonly [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)[]

***

### gradient

#### Get Signature

> **get** **gradient**(): `CanvasGradient` \| `null`

Defined in: [panel/Panel.ts:170](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L170)

A canvas gradient used as the background.

##### Returns

`CanvasGradient` \| `null`

#### Set Signature

> **set** **gradient**(`value`): `void`

Defined in: [panel/Panel.ts:174](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L174)

##### Parameters

###### value

`CanvasGradient` \| `null`

##### Returns

`void`

***

### height

#### Get Signature

> **get** **height**(): `number`

Defined in: [panel/GraphObject.ts:363](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L363)

The height (from desiredSize or actual size).

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

Defined in: [panel/GraphObject.ts:367](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L367)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`height`](/en/reference/api/graphojs/classes/graphobject/#height)

***

### isShadowed

#### Get Signature

> **get** **isShadowed**(): `boolean`

Defined in: [panel/GraphObject.ts:479](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L479)

GoJS-compatible: Whether this object casts a drop shadow.

##### Returns

`boolean`

#### Set Signature

> **set** **isShadowed**(`value`): `void`

Defined in: [panel/GraphObject.ts:483](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L483)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`isShadowed`](/en/reference/api/graphojs/classes/graphobject/#isshadowed)

***

### isVisibleObject

#### Get Signature

> **get** **isVisibleObject**(): `boolean`

Defined in: [panel/GraphObject.ts:292](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L292)

GoJS-compatible: Whether this object and all of its ancestors are visible.

##### Returns

`boolean`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`isVisibleObject`](/en/reference/api/graphojs/classes/graphobject/#isvisibleobject)

***

### itemArray

#### Get Signature

> **get** **itemArray**(): readonly `unknown`[]

Defined in: [panel/Panel.ts:68](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L68)

GoJS-compatible: The data array used to generate item elements.

##### Returns

readonly `unknown`[]

#### Set Signature

> **set** **itemArray**(`value`): `void`

Defined in: [panel/Panel.ts:72](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L72)

##### Parameters

###### value

`unknown`[]

##### Returns

`void`

***

### itemTemplate

#### Get Signature

> **get** **itemTemplate**(): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [panel/Panel.ts:78](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L78)

GoJS-compatible: The template used to create one element per item.

##### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Set Signature

> **set** **itemTemplate**(`value`): `void`

Defined in: [panel/Panel.ts:82](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L82)

##### Parameters

###### value

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

##### Returns

`void`

***

### mainElement

#### Get Signature

> **get** **mainElement**(): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [panel/Panel.ts:305](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L305)

Get the first element of this panel (used by Auto panels as background).

##### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

***

### margin

#### Get Signature

> **get** **margin**(): [`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

Defined in: [panel/GraphObject.ts:401](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L401)

The margin around this object.

##### Returns

[`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

#### Set Signature

> **set** **margin**(`value`): `void`

Defined in: [panel/GraphObject.ts:406](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L406)

GoJS-compatible: a plain number sets a uniform margin on all four sides.

##### Parameters

###### value

`number` \| [`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`margin`](/en/reference/api/graphojs/classes/graphobject/#margin)

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [panel/GraphObject.ts:80](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L80)

The name of this graph object, used for findObject() lookups.

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Defined in: [panel/GraphObject.ts:84](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L84)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`name`](/en/reference/api/graphojs/classes/graphobject/#name)

***

### opacity

#### Get Signature

> **get** **opacity**(): `number`

Defined in: [panel/GraphObject.ts:318](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L318)

The opacity of this object (0-1).

##### Returns

`number`

#### Set Signature

> **set** **opacity**(`value`): `void`

Defined in: [panel/GraphObject.ts:322](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L322)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`opacity`](/en/reference/api/graphojs/classes/graphobject/#opacity)

***

### padding

#### Get Signature

> **get** **padding**(): [`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

Defined in: [panel/Panel.ts:143](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L143)

The padding of this panel.

##### Returns

[`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

#### Set Signature

> **set** **padding**(`value`): `void`

Defined in: [panel/Panel.ts:147](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L147)

##### Parameters

###### value

[`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

##### Returns

`void`

***

### parent

#### Get Signature

> **get** **parent**(): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [panel/GraphObject.ts:302](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L302)

GoJS-compatible: The parent panel of this object (or null).

##### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`parent`](/en/reference/api/graphojs/classes/graphobject/#parent)

***

### part

#### Get Signature

> **get** **part**(): [`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

Defined in: [panel/GraphObject.ts:307](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L307)

GoJS-compatible: The Part that contains this object (or null).

##### Returns

[`Part`](/en/reference/api/graphojs/classes/part/) \| `null`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`part`](/en/reference/api/graphojs/classes/graphobject/#part)

***

### pickable

#### Get Signature

> **get** **pickable**(): `boolean`

Defined in: [panel/GraphObject.ts:527](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L527)

GoJS-compatible: Whether this object can be hit-tested.

##### Returns

`boolean`

#### Set Signature

> **set** **pickable**(`value`): `void`

Defined in: [panel/GraphObject.ts:531](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L531)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`pickable`](/en/reference/api/graphojs/classes/graphobject/#pickable)

***

### position

#### Get Signature

> **get** **position**(): `object`

Defined in: [panel/GraphObject.ts:372](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L372)

The position within the parent panel.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`position`](/en/reference/api/graphojs/classes/graphobject/#position)

***

### row

#### Get Signature

> **get** **row**(): `number`

Defined in: [panel/GraphObject.ts:416](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L416)

GoJS-compatible: The row index for table panels.

##### Returns

`number`

#### Set Signature

> **set** **row**(`value`): `void`

Defined in: [panel/GraphObject.ts:420](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L420)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`row`](/en/reference/api/graphojs/classes/textblock/#row)

***

### rowCount

#### Get Signature

> **get** **rowCount**(): `number`

Defined in: [panel/Panel.ts:179](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L179)

The number of rows (for Table panels).

##### Returns

`number`

***

### rowSpan

#### Get Signature

> **get** **rowSpan**(): `number`

Defined in: [panel/GraphObject.ts:434](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L434)

GoJS-compatible: The number of rows this object spans.

##### Returns

`number`

#### Set Signature

> **set** **rowSpan**(`value`): `void`

Defined in: [panel/GraphObject.ts:438](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L438)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`TextBlock`](/en/reference/api/graphojs/classes/textblock/).[`rowSpan`](/en/reference/api/graphojs/classes/textblock/#rowspan)

***

### scale

#### Get Signature

> **get** **scale**(): `number`

Defined in: [panel/GraphObject.ts:465](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L465)

GoJS-compatible: The scale of this object relative to its normal size.

##### Returns

`number`

#### Set Signature

> **set** **scale**(`value`): `void`

Defined in: [panel/GraphObject.ts:469](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L469)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`scale`](/en/reference/api/graphojs/classes/graphobject/#scale)

***

### separators

#### Get Signature

> **get** **separators**(): readonly [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)[]

Defined in: [panel/Panel.ts:217](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L217)

GoJS-compatible: The separators added to this panel.

##### Returns

readonly [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)[]

***

### shadow

#### Get Signature

> **get** **shadow**(): `string`

Defined in: [panel/GraphObject.ts:515](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L515)

GoJS-compatible: Alias for shadowColor.

##### Returns

`string`

#### Set Signature

> **set** **shadow**(`value`): `void`

Defined in: [panel/GraphObject.ts:519](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L519)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`shadow`](/en/reference/api/graphojs/classes/graphobject/#shadow)

***

### shadowBlur

#### Get Signature

> **get** **shadowBlur**(): `number`

Defined in: [panel/GraphObject.ts:506](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L506)

GoJS-compatible: The drop shadow blur radius.

##### Returns

`number`

#### Set Signature

> **set** **shadowBlur**(`value`): `void`

Defined in: [panel/GraphObject.ts:510](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L510)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`shadowBlur`](/en/reference/api/graphojs/classes/graphobject/#shadowblur)

***

### shadowColor

#### Get Signature

> **get** **shadowColor**(): `string`

Defined in: [panel/GraphObject.ts:488](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L488)

GoJS-compatible: The drop shadow color.

##### Returns

`string`

#### Set Signature

> **set** **shadowColor**(`value`): `void`

Defined in: [panel/GraphObject.ts:492](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L492)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`shadowColor`](/en/reference/api/graphojs/classes/graphobject/#shadowcolor)

***

### shadowOffset

#### Get Signature

> **get** **shadowOffset**(): `object`

Defined in: [panel/GraphObject.ts:497](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L497)

GoJS-compatible: The drop shadow offset.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

#### Set Signature

> **set** **shadowOffset**(`value`): `void`

Defined in: [panel/GraphObject.ts:501](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L501)

##### Parameters

###### value

###### x

`number`

###### y

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`shadowOffset`](/en/reference/api/graphojs/classes/graphobject/#shadowoffset)

***

### spacing

#### Get Signature

> **get** **spacing**(): `number`

Defined in: [panel/Panel.ts:152](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L152)

The spacing between elements (for Vertical/Horizontal panels).

##### Returns

`number`

#### Set Signature

> **set** **spacing**(`value`): `void`

Defined in: [panel/Panel.ts:156](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L156)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### type

#### Get Signature

> **get** **type**(): [`PanelType`](/en/reference/api/graphojs/type-aliases/paneltype/)

Defined in: [panel/Panel.ts:124](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L124)

##### Returns

[`PanelType`](/en/reference/api/graphojs/type-aliases/paneltype/)

#### Set Signature

> **set** **type**(`value`): `void`

Defined in: [panel/Panel.ts:128](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L128)

##### Parameters

###### value

[`PanelType`](/en/reference/api/graphojs/type-aliases/paneltype/)

##### Returns

`void`

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [panel/GraphObject.ts:283](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L283)

Whether this object is visible.

##### Returns

`boolean`

#### Set Signature

> **set** **visible**(`value`): `void`

Defined in: [panel/GraphObject.ts:287](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L287)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`Placeholder`](/en/reference/api/graphojs/classes/placeholder/).[`visible`](/en/reference/api/graphojs/classes/placeholder/#visible)

***

### width

#### Get Signature

> **get** **width**(): `number`

Defined in: [panel/GraphObject.ts:354](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L354)

The width (from desiredSize or actual size).

##### Returns

`number`

#### Set Signature

> **set** **width**(`value`): `void`

Defined in: [panel/GraphObject.ts:358](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L358)

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`width`](/en/reference/api/graphojs/classes/graphobject/#width)

## Methods

### add()

> **add**(`element`): `this`

Defined in: [panel/Panel.ts:189](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L189)

Add an element to this panel.

#### Parameters

##### element

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`this`

***

### addBinding()

> **addBinding**(`binding`): `this`

Defined in: [panel/GraphObject.ts:104](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L104)

Add a binding to this graph object (keeps existing bindings).

#### Parameters

##### binding

[`Binding`](/en/reference/api/graphojs/classes/binding/)

#### Returns

`this`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`addBinding`](/en/reference/api/graphojs/classes/graphobject/#addbinding)

***

### addSeparator()

> **addSeparator**(`separator?`): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

Defined in: [panel/Panel.ts:199](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L199)

GoJS-compatible: Add a visual separator element to this panel.

#### Parameters

##### separator?

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

***

### append()

> **append**(`element`): `this`

Defined in: [panel/Panel.ts:262](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L262)

Fluent add of an element.

#### Parameters

##### element

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`this`

***

### applyBindings()

> **applyBindings**(`nodeData`): `number`

Defined in: [panel/Panel.ts:822](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L822)

Apply bindings to this panel and recursively to all child elements.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`number`

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`applyBindings`](/en/reference/api/graphojs/classes/graphobject/#applybindings)

***

### clear()

> **clear**(): `void`

Defined in: [panel/Panel.ts:250](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L250)

Remove all elements.

#### Returns

`void`

***

### clone()

> **clone**(): `this`

Defined in: [panel/Panel.ts:785](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L785)

Deep copy of this panel, including all child elements.

#### Returns

`this`

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`clone`](/en/reference/api/graphojs/classes/graphobject/#clone)

***

### contains()

> **contains**(`element`): `boolean`

Defined in: [panel/Panel.ts:257](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L257)

Check if an element is in this panel.

#### Parameters

##### element

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`boolean`

***

### containsPoint()

> **containsPoint**(`px`, `py`): `boolean`

Defined in: [panel/GraphObject.ts:576](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L576)

Check if a point is inside this object's area (for hit testing).

#### Parameters

##### px

`number`

##### py

`number`

#### Returns

`boolean`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`containsPoint`](/en/reference/api/graphojs/classes/graphobject/#containspoint)

***

### draw()

> **draw**(`ctx`, `x`, `y`, `width`, `height`): `void`

Defined in: [panel/Panel.ts:426](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L426)

Draw this object at its computed position and size.

#### Parameters

##### ctx

`CanvasRenderingContext2D`

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

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`draw`](/en/reference/api/graphojs/classes/graphobject/#draw)

***

### findElement()

> **findElement**(`name`): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [panel/Panel.ts:763](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L763)

GoJS-compatible: Find a GraphObject by name, searching this panel and nested panels.

#### Parameters

##### name

`string`

#### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

***

### getBounds()

> **getBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [panel/Panel.ts:775](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L775)

The bounds of this panel within the parent coordinate space.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`getBounds`](/en/reference/api/graphojs/classes/graphobject/#getbounds)

***

### hitTest()

> **hitTest**(`px`, `py`): [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

Defined in: [panel/Panel.ts:745](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L745)

Find the top-most GraphObject at a point, or null.

#### Parameters

##### px

`number`

##### py

`number`

#### Returns

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/) \| `null`

***

### insertAt()

> **insertAt**(`index`, `element`): `this`

Defined in: [panel/Panel.ts:233](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L233)

GoJS-compatible: Insert an element at a specific index.

#### Parameters

##### index

`number`

##### element

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`this`

***

### measure()

> **measure**(): [`Size`](/en/reference/api/graphojs/classes/size/)

Defined in: [panel/Panel.ts:309](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L309)

Measure the natural size of this object.
Returns the size this object would like to occupy.

#### Returns

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`measure`](/en/reference/api/graphojs/classes/graphobject/#measure)

***

### measureWithMargin()

> **measureWithMargin**(): [`Size`](/en/reference/api/graphojs/classes/size/)

Defined in: [panel/GraphObject.ts:564](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L564)

Compute the effective size after applying margin.

#### Returns

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`measureWithMargin`](/en/reference/api/graphojs/classes/graphobject/#measurewithmargin)

***

### remove()

> **remove**(`element`): `boolean`

Defined in: [panel/Panel.ts:241](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L241)

Remove an element from this panel.

#### Parameters

##### element

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

#### Returns

`boolean`

***

### removeBinding()

> **removeBinding**(`targetProperty`): `boolean`

Defined in: [panel/GraphObject.ts:110](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L110)

Remove a binding by target property. Returns true if removed.

#### Parameters

##### targetProperty

`string`

#### Returns

`boolean`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`removeBinding`](/en/reference/api/graphojs/classes/graphobject/#removebinding)

***

### setActualSize()

> **setActualSize**(`width`, `height`): `void`

Defined in: [panel/GraphObject.ts:387](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L387)

Set the actual size during layout.

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`setActualSize`](/en/reference/api/graphojs/classes/graphobject/#setactualsize)

***

### setBackground()

> **setBackground**(`value`): `this`

Defined in: [panel/Panel.ts:279](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L279)

Fluent setter for background.

#### Parameters

##### value

`string` \| `null`

#### Returns

`this`

***

### setBinding()

> **setBinding**(`binding`): `this`

Defined in: [panel/GraphObject.ts:97](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L97)

GoJS-compatible: Set a binding on this graph object, replacing any
existing binding with the same target property.

#### Parameters

##### binding

[`Binding`](/en/reference/api/graphojs/classes/binding/)

#### Returns

`this`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`setBinding`](/en/reference/api/graphojs/classes/graphobject/#setbinding)

***

### setPadding()

> **setPadding**(`value`): `this`

Defined in: [panel/Panel.ts:267](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L267)

Fluent setter for padding.

#### Parameters

##### value

[`Margin`](/en/reference/api/graphojs/classes/margin/) \| `null`

#### Returns

`this`

***

### setPosition()

> **setPosition**(`x`, `y`): `void`

Defined in: [panel/GraphObject.ts:377](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L377)

Set the position within the parent panel.

#### Parameters

##### x

`number`

##### y

`number`

#### Returns

`void`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`setPosition`](/en/reference/api/graphojs/classes/graphobject/#setposition)

***

### setSpacing()

> **setSpacing**(`value`): `this`

Defined in: [panel/Panel.ts:273](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Panel.ts#L273)

Fluent setter for spacing.

#### Parameters

##### value

`number`

#### Returns

`this`

***

### make()

#### Call Signature

> `static` **make**(`ctor`, ...`args`): `Panel`

Defined in: [panel/GraphObject.ts:136](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L136)

GoJS-compatible static factory method.

Usage:
  const $ = go.GraphObject.make;
  const shape = $(go.Shape, "RoundedRectangle", { fill: "white", stroke: "gray" });
  const panel = $(go.Panel, "Auto", shape, $(go.TextBlock, "Hello"));

##### Parameters

###### ctor

*typeof* [`Node`](/en/reference/api/graphojs/classes/node/) \| *typeof* [`Link`](/en/reference/api/graphojs/classes/link/) \| *typeof* [`Group`](/en/reference/api/graphojs/classes/group/)

###### args

...`unknown`[]

##### Returns

`Panel`

##### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`make`](/en/reference/api/graphojs/classes/graphobject/#make)

#### Call Signature

> `static` **make**\<`T`\>(`ctor`, ...`args`): `T`

Defined in: [panel/GraphObject.ts:137](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L137)

GoJS-compatible static factory method.

Usage:
  const $ = go.GraphObject.make;
  const shape = $(go.Shape, "RoundedRectangle", { fill: "white", stroke: "gray" });
  const panel = $(go.Panel, "Auto", shape, $(go.TextBlock, "Hello"));

##### Type Parameters

###### T

`T`

##### Parameters

###### ctor

(...`args`) => `T`

###### args

...`unknown`[]

##### Returns

`T`

##### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`make`](/en/reference/api/graphojs/classes/graphobject/#make)
