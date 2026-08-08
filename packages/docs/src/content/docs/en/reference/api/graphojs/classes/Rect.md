---
editUrl: false
next: false
prev: false
title: "Rect"
---

Defined in: [geometry/Rect.ts:7](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L7)

A 2D rectangle defined by position (x, y) and size (width, height).

## Constructors

### Constructor

> **new Rect**(`x`, `y`, `width`, `height`): `Rect`

Defined in: [geometry/Rect.ts:13](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L13)

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

`Rect`

## Properties

### height

> **height**: `number`

Defined in: [geometry/Rect.ts:11](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L11)

***

### width

> **width**: `number`

Defined in: [geometry/Rect.ts:10](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L10)

***

### x

> **x**: `number`

Defined in: [geometry/Rect.ts:8](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L8)

***

### y

> **y**: `number`

Defined in: [geometry/Rect.ts:9](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L9)

## Accessors

### bottom

#### Get Signature

> **get** **bottom**(): `number`

Defined in: [geometry/Rect.ts:194](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L194)

Get the bottom edge y coordinate.

##### Returns

`number`

***

### bottomLeft

#### Get Signature

> **get** **bottomLeft**(): `object`

Defined in: [geometry/Rect.ts:134](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L134)

Get the bottom-left corner.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

***

### bottomRight

#### Get Signature

> **get** **bottomRight**(): `object`

Defined in: [geometry/Rect.ts:139](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L139)

Get the bottom-right corner.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

***

### center

#### Get Signature

> **get** **center**(): `object`

Defined in: [geometry/Rect.ts:144](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L144)

Get the center point.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

***

### centerX

#### Get Signature

> **get** **centerX**(): `number`

Defined in: [geometry/Rect.ts:149](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L149)

GoJS-compatible: The x coordinate of the center of this rect.

##### Returns

`number`

***

### centerY

#### Get Signature

> **get** **centerY**(): `number`

Defined in: [geometry/Rect.ts:154](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L154)

GoJS-compatible: The y coordinate of the center of this rect.

##### Returns

`number`

***

### left

#### Get Signature

> **get** **left**(): `number`

Defined in: [geometry/Rect.ts:179](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L179)

Get the left edge x coordinate.

##### Returns

`number`

***

### position

#### Get Signature

> **get** **position**(): [`Point`](/en/reference/api/graphojs/classes/point/)

Defined in: [geometry/Rect.ts:159](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L159)

GoJS-compatible: The position (top-left) as a Point.

##### Returns

[`Point`](/en/reference/api/graphojs/classes/point/)

#### Set Signature

> **set** **position**(`pos`): `void`

Defined in: [geometry/Rect.ts:163](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L163)

##### Parameters

###### pos

[`Point`](/en/reference/api/graphojs/classes/point/)

##### Returns

`void`

***

### right

#### Get Signature

> **get** **right**(): `number`

Defined in: [geometry/Rect.ts:184](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L184)

Get the right edge x coordinate.

##### Returns

`number`

***

### size

#### Get Signature

> **get** **size**(): [`Size`](/en/reference/api/graphojs/classes/size/)

Defined in: [geometry/Rect.ts:169](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L169)

GoJS-compatible: The size as a Size.

##### Returns

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Set Signature

> **set** **size**(`size`): `void`

Defined in: [geometry/Rect.ts:173](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L173)

##### Parameters

###### size

[`Size`](/en/reference/api/graphojs/classes/size/)

##### Returns

`void`

***

### top

#### Get Signature

> **get** **top**(): `number`

Defined in: [geometry/Rect.ts:189](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L189)

Get the top edge y coordinate.

##### Returns

`number`

***

### topLeft

#### Get Signature

> **get** **topLeft**(): `object`

Defined in: [geometry/Rect.ts:124](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L124)

Get the top-left corner.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

***

### topRight

#### Get Signature

> **get** **topRight**(): `object`

Defined in: [geometry/Rect.ts:129](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L129)

Get the top-right corner.

##### Returns

`object`

###### x

> **x**: `number`

###### y

> **y**: `number`

## Methods

### area()

> **area**(): `number`

Defined in: [geometry/Rect.ts:199](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L199)

Get the area.

#### Returns

`number`

***

### clone()

> **clone**(): `Rect`

Defined in: [geometry/Rect.ts:69](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L69)

Return a copy of this rect.

#### Returns

`Rect`

***

### computeSides()

> **computeSides**(`margin`): `Rect`

Defined in: [geometry/Rect.ts:91](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L91)

GoJS-compatible: Inset the rect on all sides by a margin value or {left,top,right,bottom}.

#### Parameters

##### margin

`number` \| \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}

#### Returns

`Rect`

***

### containsPoint()

> **containsPoint**(`point`): `boolean`

Defined in: [geometry/Rect.ts:214](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L214)

Check if this rect contains a point.

#### Parameters

##### point

###### x

`number`

###### y

`number`

#### Returns

`boolean`

***

### containsRect()

> **containsRect**(`other`): `boolean`

Defined in: [geometry/Rect.ts:224](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L224)

Check if this rect contains another rect.

#### Parameters

##### other

`Rect`

#### Returns

`boolean`

***

### copy()

> **copy**(): `Rect`

Defined in: [geometry/Rect.ts:74](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L74)

GoJS-compatible: Return a copy of this rect.

#### Returns

`Rect`

***

### deflate()

> **deflate**(`dx`, `dy?`): `Rect`

Defined in: [geometry/Rect.ts:290](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L290)

Shrink this rect by the given margin on all sides.

#### Parameters

##### dx

`number`

##### dy?

`number`

#### Returns

`Rect`

***

### equals()

> **equals**(`other`): `boolean`

Defined in: [geometry/Rect.ts:49](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L49)

Check if this rect equals another rect.

#### Parameters

##### other

`Rect`

#### Returns

`boolean`

***

### equalsApprox()

> **equalsApprox**(`other`, `tolerance?`): `boolean`

Defined in: [geometry/Rect.ts:59](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L59)

Check if this rect is approximately equal to another within a tolerance.

#### Parameters

##### other

`Rect`

##### tolerance?

`number` = `0.0001`

#### Returns

`boolean`

***

### grow()

> **grow**(`s`): `Rect`

Defined in: [geometry/Rect.ts:271](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L271)

GoJS-compatible: Expand this rect by the given amount on all sides.

#### Parameters

##### s

`number`

#### Returns

`Rect`

***

### inflate()

> **inflate**(`dx`, `dy?`): `Rect`

Defined in: [geometry/Rect.ts:265](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L265)

Expand this rect by the given margin on all sides.

#### Parameters

##### dx

`number`

##### dy?

`number`

#### Returns

`Rect`

***

### intersection()

> **intersection**(`other`): `Rect` \| `null`

Defined in: [geometry/Rect.ts:244](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L244)

Get the intersection of this rect with another rect.

#### Parameters

##### other

`Rect`

#### Returns

`Rect` \| `null`

***

### intersects()

> **intersects**(`other`): `boolean`

Defined in: [geometry/Rect.ts:234](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L234)

Check if this rect intersects another rect.

#### Parameters

##### other

`Rect`

#### Returns

`boolean`

***

### isEmpty()

> **isEmpty**(): `boolean`

Defined in: [geometry/Rect.ts:209](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L209)

Check if this rect is empty (zero width or height).

#### Returns

`boolean`

***

### isReal()

> **isReal**(): `boolean`

Defined in: [geometry/Rect.ts:79](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L79)

GoJS-compatible: Whether the rect has finite, non-negative dimensions.

#### Returns

`boolean`

***

### offset()

> **offset**(`dx`, `dy`): `Rect`

Defined in: [geometry/Rect.ts:295](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L295)

Offset this rect by the given amounts.

#### Parameters

##### dx

`number`

##### dy

`number`

#### Returns

`Rect`

***

### perimeter()

> **perimeter**(): `number`

Defined in: [geometry/Rect.ts:204](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L204)

Get the perimeter.

#### Returns

`number`

***

### relativeTo()

> **relativeTo**(`spot`): [`Point`](/en/reference/api/graphojs/classes/point/)

Defined in: [geometry/Rect.ts:107](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L107)

GoJS-compatible: Compute the point in this rect for the given spot.

#### Parameters

##### spot

###### offsetX

`number`

###### offsetY

`number`

###### x

`number`

###### y

`number`

#### Returns

[`Point`](/en/reference/api/graphojs/classes/point/)

***

### setTo()

> **setTo**(`x`, `y`, `width`, `height`): `this`

Defined in: [geometry/Rect.ts:115](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L115)

GoJS-compatible: In-place mutation returning this rect.

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

`this`

***

### setToPosition()

> **setToPosition**(`pos`): `this`

Defined in: [geometry/Rect.ts:276](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L276)

GoJS-compatible: In-place mutation of position returning this rect.

#### Parameters

##### pos

[`Point`](/en/reference/api/graphojs/classes/point/)

#### Returns

`this`

***

### setToSize()

> **setToSize**(`size`): `this`

Defined in: [geometry/Rect.ts:283](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L283)

GoJS-compatible: In-place mutation of size returning this rect.

#### Parameters

##### size

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Returns

`this`

***

### toJSON()

> **toJSON**(): `object`

Defined in: [geometry/Rect.ts:300](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L300)

Convert to a plain object.

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

### toString()

> **toString**(): `string`

Defined in: [geometry/Rect.ts:310](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L310)

#### Returns

`string`

***

### union()

> **union**(`other`): `Rect`

Defined in: [geometry/Rect.ts:256](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L256)

Get the smallest rect that contains both rects.

#### Parameters

##### other

`Rect`

#### Returns

`Rect`

***

### fromCorners()

> `static` **fromCorners**(`a`, `b`): `Rect`

Defined in: [geometry/Rect.ts:26](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L26)

Create a Rect from two corner points.

#### Parameters

##### a

[`Point`](/en/reference/api/graphojs/classes/point/)

##### b

[`Point`](/en/reference/api/graphojs/classes/point/)

#### Returns

`Rect`

***

### fromJSON()

> `static` **fromJSON**(`data`): `Rect`

Defined in: [geometry/Rect.ts:305](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L305)

Create a Rect from a JSON string or object.

#### Parameters

##### data

`string` \| \{ `height`: `number`; `width`: `number`; `x`: `number`; `y`: `number`; \}

#### Returns

`Rect`

***

### fromPosAndSize()

> `static` **fromPosAndSize**(`pos`, `size`): `Rect`

Defined in: [geometry/Rect.ts:21](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L21)

Create a Rect from position and size.

#### Parameters

##### pos

[`Point`](/en/reference/api/graphojs/classes/point/)

##### size

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Returns

`Rect`

***

### parse()

> `static` **parse**(`value`): `Rect`

Defined in: [geometry/Rect.ts:40](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L40)

GoJS-compatible: Parse a string like "x, y, w, h" or "x y w h".

#### Parameters

##### value

`string`

#### Returns

`Rect`

***

### zero()

> `static` **zero**(): `Rect`

Defined in: [geometry/Rect.ts:35](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/geometry/Rect.ts#L35)

Create a zero rect at origin.

#### Returns

`Rect`
