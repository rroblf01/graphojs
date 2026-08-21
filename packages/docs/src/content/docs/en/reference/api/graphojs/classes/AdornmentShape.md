---
editUrl: false
next: false
prev: false
title: "AdornmentShape"
---

Defined in: [parts/Adornment.ts:134](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L134)

A shape within an adornment (e.g., a resize handle, rotation handle).

## Constructors

### Constructor

> **new AdornmentShape**(`options`): `AdornmentShape`

Defined in: [parts/Adornment.ts:147](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L147)

#### Parameters

##### options

###### bounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

###### cursor?

`string`

###### fill?

`string`

###### name

`string`

###### relativeOffset?

\{ `x`: `number`; `y`: `number`; \}

###### relativeOffset.x

`number`

###### relativeOffset.y

`number`

###### relativeSpot?

\{ `x`: `number`; `y`: `number`; \}

###### relativeSpot.x

`number`

###### relativeSpot.y

`number`

###### stroke?

`string`

###### strokeWidth?

`number`

###### visible?

`boolean`

#### Returns

`AdornmentShape`

## Accessors

### bounds

#### Get Signature

> **get** **bounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [parts/Adornment.ts:187](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L187)

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Set Signature

> **set** **bounds**(`value`): `void`

Defined in: [parts/Adornment.ts:191](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L191)

##### Parameters

###### value

[`Rect`](/en/reference/api/graphojs/classes/rect/)

##### Returns

`void`

***

### cursor

#### Get Signature

> **get** **cursor**(): `string`

Defined in: [parts/Adornment.ts:219](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L219)

##### Returns

`string`

#### Set Signature

> **set** **cursor**(`value`): `void`

Defined in: [parts/Adornment.ts:223](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L223)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### fill

#### Get Signature

> **get** **fill**(): `string`

Defined in: [parts/Adornment.ts:195](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L195)

##### Returns

`string`

#### Set Signature

> **set** **fill**(`value`): `void`

Defined in: [parts/Adornment.ts:199](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L199)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [parts/Adornment.ts:183](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L183)

##### Returns

`string`

***

### stroke

#### Get Signature

> **get** **stroke**(): `string`

Defined in: [parts/Adornment.ts:203](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L203)

##### Returns

`string`

#### Set Signature

> **set** **stroke**(`value`): `void`

Defined in: [parts/Adornment.ts:207](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L207)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### strokeWidth

#### Get Signature

> **get** **strokeWidth**(): `number`

Defined in: [parts/Adornment.ts:211](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L211)

##### Returns

`number`

#### Set Signature

> **set** **strokeWidth**(`value`): `void`

Defined in: [parts/Adornment.ts:215](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L215)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### visible

#### Get Signature

> **get** **visible**(): `boolean`

Defined in: [parts/Adornment.ts:227](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L227)

##### Returns

`boolean`

#### Set Signature

> **set** **visible**(`value`): `void`

Defined in: [parts/Adornment.ts:231](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L231)

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### containsPoint()

> **containsPoint**(`point`): `boolean`

Defined in: [parts/Adornment.ts:236](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L236)

Check if a point is inside this shape.

#### Parameters

##### point

###### x

`number`

###### y

`number`

#### Returns

`boolean`

***

### repositionRelativeTo()

> **repositionRelativeTo**(`partBounds`): `void`

Defined in: [parts/Adornment.ts:174](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/parts/Adornment.ts#L174)

Move this shape so its center sits at its stored relative spot (plus any
fixed offset) within the given (current) part bounds. A shape created
without a relativeSpot is left untouched.

#### Parameters

##### partBounds

[`Rect`](/en/reference/api/graphojs/classes/rect/)

#### Returns

`void`
