---
editUrl: false
next: false
prev: false
title: "PositionArray"
---

Defined in: [layout/PositionArray.ts:11](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L11)

GoJS-compatible: a sparse occupancy grid used by layouts (originally for
`AvoidsLinksRouter`-style obstacle avoidance) to track which rectangular
cells are occupied. A standalone, real implementation — not yet consumed
by any of graphojs's own layouts, which compute obstacle avoidance
differently (see `render/LinkRouter.ts`'s `routeOrthogonalAvoidingObstacles`).

## Constructors

### Constructor

> **new PositionArray**(`cellsize`): `PositionArray`

Defined in: [layout/PositionArray.ts:20](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L20)

#### Parameters

##### cellsize

[`Size`](/en/reference/api/graphojs/classes/size/)

#### Returns

`PositionArray`

## Accessors

### bounds

#### Get Signature

> **get** **bounds**(): [`Rect`](/en/reference/api/graphojs/classes/rect/)

Defined in: [layout/PositionArray.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L25)

##### Returns

[`Rect`](/en/reference/api/graphojs/classes/rect/)

***

### cellHeight

#### Get Signature

> **get** **cellHeight**(): `number`

Defined in: [layout/PositionArray.ts:43](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L43)

##### Returns

`number`

#### Set Signature

> **set** **cellHeight**(`value`): `void`

Defined in: [layout/PositionArray.ts:47](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L47)

##### Parameters

###### value

`number`

##### Returns

`void`

***

### cellWidth

#### Get Signature

> **get** **cellWidth**(): `number`

Defined in: [layout/PositionArray.ts:35](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L35)

##### Returns

`number`

#### Set Signature

> **set** **cellWidth**(`value`): `void`

Defined in: [layout/PositionArray.ts:39](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L39)

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### isUnoccupied()

> **isUnoccupied**(`x`, `y`, `w`, `h`): `boolean`

Defined in: [layout/PositionArray.ts:66](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L66)

Whether every cell covered by the given rect is unoccupied.

#### Parameters

##### x

`number`

##### y

`number`

##### w

`number`

##### h

`number`

#### Returns

`boolean`

***

### maxAvoidsLinksSpaceH()

> **maxAvoidsLinksSpaceH**(`minx`, `maxx`, `y`, `h`): `number`

Defined in: [layout/PositionArray.ts:77](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L77)

The widest unoccupied horizontal run available at row `y` (height `h`) between `minx`/`maxx`.

#### Parameters

##### minx

`number`

##### maxx

`number`

##### y

`number`

##### h

`number`

#### Returns

`number`

***

### maxAvoidsLinksSpaceV()

> **maxAvoidsLinksSpaceV**(`miny`, `maxy`, `x`, `w`): `number`

Defined in: [layout/PositionArray.ts:102](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L102)

The tallest unoccupied vertical run available at column `x` (width `w`) between `miny`/`maxy`.

#### Parameters

##### miny

`number`

##### maxy

`number`

##### x

`number`

##### w

`number`

#### Returns

`number`

***

### occupy()

> **occupy**(`x`, `y`, `w`, `h`): `void`

Defined in: [layout/PositionArray.ts:52](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/layout/PositionArray.ts#L52)

Mark the cells covered by the given document-coordinate rect as occupied.

#### Parameters

##### x

`number`

##### y

`number`

##### w

`number`

##### h

`number`

#### Returns

`void`
