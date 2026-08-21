---
editUrl: false
next: false
prev: false
title: "TextMeasureCache"
---

Defined in: [render/RenderCache.ts:122](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/RenderCache.ts#L122)

A cache for text width measurements.
Measuring text is expensive; cache widths per (text, font) pair.

## Constructors

### Constructor

> **new TextMeasureCache**(): `TextMeasureCache`

#### Returns

`TextMeasureCache`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [render/RenderCache.ts:127](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/RenderCache.ts#L127)

Get the number of cached measurements.

##### Returns

`number`

## Methods

### clear()

> **clear**(): `void`

Defined in: [render/RenderCache.ts:146](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/RenderCache.ts#L146)

Clear the measurement cache.

#### Returns

`void`

***

### measure()

> **measure**(`ctx`, `text`, `font`): `number`

Defined in: [render/RenderCache.ts:134](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/RenderCache.ts#L134)

Measure text width, caching by (text, font).

#### Parameters

##### ctx

`CanvasRenderingContext2D`

##### text

`string`

##### font

`string`

#### Returns

`number`
