---
editUrl: false
next: false
prev: false
title: "Placeholder"
---

Defined in: [panel/Placeholder.ts:11](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Placeholder.ts#L11)

GoJS-compatible Placeholder.
A special GraphObject used inside group templates that automatically sizes
itself to the group's member bounds (plus padding). It renders nothing.

## Extends

- [`GraphObject`](/en/reference/api/graphojs/classes/graphobject/)

## Constructors

### Constructor

> **new Placeholder**(): `Placeholder`

#### Returns

`Placeholder`

#### Inherited from

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

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`column`](/en/reference/api/graphojs/classes/graphobject/#column)

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

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`columnSpan`](/en/reference/api/graphojs/classes/graphobject/#columnspan)

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

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`desiredSize`](/en/reference/api/graphojs/classes/graphobject/#desiredsize)

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

> **get** **padding**(): `number`

Defined in: [panel/Placeholder.ts:15](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Placeholder.ts#L15)

Extra space around the members' bounds.

##### Returns

`number`

#### Set Signature

> **set** **padding**(`value`): `void`

Defined in: [panel/Placeholder.ts:19](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Placeholder.ts#L19)

##### Parameters

###### value

`number`

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

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`row`](/en/reference/api/graphojs/classes/graphobject/#row)

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

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`rowSpan`](/en/reference/api/graphojs/classes/graphobject/#rowspan)

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

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`visible`](/en/reference/api/graphojs/classes/graphobject/#visible)

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

### applyBindings()

> **applyBindings**(`nodeData`): `number`

Defined in: [panel/GraphObject.ts:118](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L118)

Apply all bindings from model data to this graph object.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`number`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`applyBindings`](/en/reference/api/graphojs/classes/graphobject/#applybindings)

***

### clone()

> **clone**(): `this`

Defined in: [panel/GraphObject.ts:633](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L633)

Create a deep copy of this GraphObject.
Subclasses override to copy their specific properties.

#### Returns

`this`

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`clone`](/en/reference/api/graphojs/classes/graphobject/#clone)

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

> **draw**(): `void`

Defined in: [panel/Placeholder.ts:44](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Placeholder.ts#L44)

Draw this object at its computed position and size.

#### Returns

`void`

#### Overrides

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`draw`](/en/reference/api/graphojs/classes/graphobject/#draw)

***

### getBounds()

> **getBounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [panel/GraphObject.ts:586](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/GraphObject.ts#L586)

Get the bounds of this object within the panel coordinate space.

#### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Inherited from

[`GraphObject`](/en/reference/api/graphojs/classes/graphobject/).[`getBounds`](/en/reference/api/graphojs/classes/graphobject/#getbounds)

***

### measure()

> **measure**(): [`Size`](/en/reference/api/graphojs/classes/size/)

Defined in: [panel/Placeholder.ts:23](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/panel/Placeholder.ts#L23)

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

### make()

#### Call Signature

> `static` **make**(`ctor`, ...`args`): [`Panel`](/en/reference/api/graphojs/classes/panel/)

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

[`Panel`](/en/reference/api/graphojs/classes/panel/)

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
