---
editUrl: false
next: false
prev: false
title: "Brush"
---

Defined in: [geometry/Brush.ts:32](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L32)

GoJS-compatible: a portable, serializable description of a solid color,
linear gradient, radial gradient, or pattern fill/stroke — an
alternative to a plain CSS color string for `Shape.fill`/`stroke` (and
anywhere else `BrushLike` is accepted). Unlike a raw `CanvasGradient`,
a `Brush` doesn't need a live canvas context to construct — it's
resolved to one lazily at draw time (see `resolveBrushLike` in
`render/BrushResolver.ts`).

## Constructors

### Constructor

> **new Brush**(`type?`, `init?`): `Brush`

Defined in: [geometry/Brush.ts:54](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L54)

#### Parameters

##### type?

`string` \| [`BrushType`](/en/reference/api/graphojs/type-aliases/brushtype/)

one of `Brush.Solid`/`Linear`/`Radial`/`Pattern` (default `Solid`).

##### init?

`Partial`\<`Brush`\> & `Record`\<`number`, `string`\>

a partial property bag, plus optionally numeric keys
  (`{0: "red", 1: "blue"}`) as shorthand for color stops.

#### Returns

`Brush`

## Properties

### HSL

> `readonly` `static` **HSL**: `2` = `ColorSpace.HSL`

Defined in: [geometry/Brush.ts:38](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L38)

***

### Lab

> `readonly` `static` **Lab**: `1` = `ColorSpace.Lab`

Defined in: [geometry/Brush.ts:37](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L37)

***

### Linear

> `readonly` `static` **Linear**: `2` = `BrushType.Linear`

Defined in: [geometry/Brush.ts:34](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L34)

***

### Pattern

> `readonly` `static` **Pattern**: `4` = `BrushType.Pattern`

Defined in: [geometry/Brush.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L36)

***

### Radial

> `readonly` `static` **Radial**: `3` = `BrushType.Radial`

Defined in: [geometry/Brush.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L35)

***

### Solid

> `readonly` `static` **Solid**: `1` = `BrushType.Solid`

Defined in: [geometry/Brush.ts:33](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L33)

## Accessors

### color

#### Get Signature

> **get** **color**(): `string`

Defined in: [geometry/Brush.ts:106](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L106)

##### Returns

`string`

#### Set Signature

> **set** **color**(`value`): `void`

Defined in: [geometry/Brush.ts:110](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L110)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### colorStops

#### Get Signature

> **get** **colorStops**(): [`Map`](/en/reference/api/graphojs/classes/map/)\<`number`, `string`\> \| `null`

Defined in: [geometry/Brush.ts:146](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L146)

##### Returns

[`Map`](/en/reference/api/graphojs/classes/map/)\<`number`, `string`\> \| `null`

#### Set Signature

> **set** **colorStops**(`value`): `void`

Defined in: [geometry/Brush.ts:150](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L150)

##### Parameters

###### value

[`Map`](/en/reference/api/graphojs/classes/map/)\<`number`, `string`\> \| `null`

##### Returns

`void`

***

### end

#### Get Signature

> **get** **end**(): [`Spot`](/en/reference/api/graphojs/classes/spot/)

Defined in: [geometry/Brush.ts:122](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L122)

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/)

#### Set Signature

> **set** **end**(`value`): `void`

Defined in: [geometry/Brush.ts:126](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L126)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/)

##### Returns

`void`

***

### endRadius

#### Get Signature

> **get** **endRadius**(): `number`

Defined in: [geometry/Brush.ts:138](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L138)

##### Returns

`number`

#### Set Signature

> **set** **endRadius**(`value`): `void`

Defined in: [geometry/Brush.ts:142](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L142)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### pattern

#### Get Signature

> **get** **pattern**(): `HTMLCanvasElement` \| `HTMLImageElement` \| `null`

Defined in: [geometry/Brush.ts:154](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L154)

##### Returns

`HTMLCanvasElement` \| `HTMLImageElement` \| `null`

#### Set Signature

> **set** **pattern**(`value`): `void`

Defined in: [geometry/Brush.ts:158](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L158)

##### Parameters

###### value

`HTMLCanvasElement` \| `HTMLImageElement` \| `null`

##### Returns

`void`

***

### start

#### Get Signature

> **get** **start**(): [`Spot`](/en/reference/api/graphojs/classes/spot/)

Defined in: [geometry/Brush.ts:114](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L114)

##### Returns

[`Spot`](/en/reference/api/graphojs/classes/spot/)

#### Set Signature

> **set** **start**(`value`): `void`

Defined in: [geometry/Brush.ts:118](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L118)

##### Parameters

###### value

[`Spot`](/en/reference/api/graphojs/classes/spot/)

##### Returns

`void`

***

### startRadius

#### Get Signature

> **get** **startRadius**(): `number`

Defined in: [geometry/Brush.ts:130](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L130)

##### Returns

`number`

#### Set Signature

> **set** **startRadius**(`value`): `void`

Defined in: [geometry/Brush.ts:134](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L134)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### type

#### Get Signature

> **get** **type**(): [`BrushType`](/en/reference/api/graphojs/type-aliases/brushtype/)

Defined in: [geometry/Brush.ts:98](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L98)

##### Returns

[`BrushType`](/en/reference/api/graphojs/type-aliases/brushtype/)

#### Set Signature

> **set** **type**(`value`): `void`

Defined in: [geometry/Brush.ts:102](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L102)

##### Parameters

###### value

[`BrushType`](/en/reference/api/graphojs/type-aliases/brushtype/)

##### Returns

`void`

## Methods

### addColorStop()

> **addColorStop**(`loc`, `color`): `this`

Defined in: [geometry/Brush.ts:92](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L92)

GoJS-compatible: add a color stop at fractional location `loc` (0..1); returns `this`.

#### Parameters

##### loc

`number`

##### color

`string`

#### Returns

`this`

***

### copy()

> **copy**(): `Brush`

Defined in: [geometry/Brush.ts:79](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L79)

#### Returns

`Brush`

***

### darkenBy()

> **darkenBy**(`fraction?`, `_mode?`): `this`

Defined in: [geometry/Brush.ts:169](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L169)

Darken this brush's solid `color` in place by `fraction` (default 0.2); returns `this`.

#### Parameters

##### fraction?

`number` = `0.2`

##### \_mode?

[`ColorSpace`](/en/reference/api/graphojs/type-aliases/colorspace/) = `ColorSpace.Lab`

#### Returns

`this`

***

### isDark()

> **isDark**(): `boolean`

Defined in: [geometry/Brush.ts:175](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L175)

Whether this brush's solid `color` is perceptually dark (ignores gradients/patterns).

#### Returns

`boolean`

***

### lightenBy()

> **lightenBy**(`fraction?`, `_mode?`): `this`

Defined in: [geometry/Brush.ts:163](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L163)

Lighten this brush's solid `color` in place by `fraction` (default 0.2); returns `this`.

#### Parameters

##### fraction?

`number` = `0.2`

##### \_mode?

[`ColorSpace`](/en/reference/api/graphojs/type-aliases/colorspace/) = `ColorSpace.Lab`

#### Returns

`this`

***

### darken()

> `static` **darken**(`color`): `string`

Defined in: [geometry/Brush.ts:209](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L209)

#### Parameters

##### color

`string`

#### Returns

`string`

***

### darkenBy()

> `static` **darkenBy**(`color`, `fraction?`, `_mode?`): `string`

Defined in: [geometry/Brush.ts:213](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L213)

#### Parameters

##### color

`string`

##### fraction?

`number` = `0.2`

##### \_mode?

[`ColorSpace`](/en/reference/api/graphojs/type-aliases/colorspace/) = `ColorSpace.Lab`

#### Returns

`string`

***

### isDark()

> `static` **isDark**(`color`): `boolean`

Defined in: [geometry/Brush.ts:223](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L223)

#### Parameters

##### color

[`BrushLike`](/en/reference/api/graphojs/type-aliases/brushlike/)

#### Returns

`boolean`

***

### isValidColor()

> `static` **isValidColor**(`color`): `boolean`

Defined in: [geometry/Brush.ts:188](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L188)

#### Parameters

##### color

`string`

#### Returns

`boolean`

***

### lighten()

> `static` **lighten**(`color`): `string`

Defined in: [geometry/Brush.ts:201](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L201)

#### Parameters

##### color

`string`

#### Returns

`string`

***

### lightenBy()

> `static` **lightenBy**(`color`, `fraction?`, `_mode?`): `string`

Defined in: [geometry/Brush.ts:205](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L205)

#### Parameters

##### color

`string`

##### fraction?

`number` = `0.2`

##### \_mode?

[`ColorSpace`](/en/reference/api/graphojs/type-aliases/colorspace/) = `ColorSpace.Lab`

#### Returns

`string`

***

### mix()

> `static` **mix**(`color1`, `color2`, `fraction?`): `string`

Defined in: [geometry/Brush.ts:217](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L217)

#### Parameters

##### color1

`string`

##### color2

`string`

##### fraction?

`number` = `0.5`

#### Returns

`string`

***

### randomColor()

> `static` **randomColor**(`min?`, `max?`): `string`

Defined in: [geometry/Brush.ts:181](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/geometry/Brush.ts#L181)

#### Parameters

##### min?

`number` = `0`

##### max?

`number` = `255`

#### Returns

`string`
