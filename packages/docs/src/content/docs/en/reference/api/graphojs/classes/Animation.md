---
editUrl: false
next: false
prev: false
title: "Animation"
---

Defined in: [animation/Animation.ts:18](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L18)

A single animation that tweens a numeric property from start to end value.

## Constructors

### Constructor

> **new Animation**(`from`, `to`, `callback`, `options?`): `Animation`

Defined in: [animation/Animation.ts:32](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L32)

#### Parameters

##### from

`Record`\<`string`, `number`\>

##### to

`Record`\<`string`, `number`\>

##### callback

(`values`) => `void`

##### options?

[`AnimationOptions`](/en/reference/api/graphojs/interfaces/animationoptions/) = `{}`

#### Returns

`Animation`

## Accessors

### duration

#### Get Signature

> **get** **duration**(): `number`

Defined in: [animation/Animation.ts:47](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L47)

Duration in milliseconds.

##### Returns

`number`

***

### isFinished

#### Get Signature

> **get** **isFinished**(): `boolean`

Defined in: [animation/Animation.ts:52](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L52)

Whether the animation has finished.

##### Returns

`boolean`

## Methods

### cancel()

> **cancel**(): `void`

Defined in: [animation/Animation.ts:81](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L81)

Cancel the animation.

#### Returns

`void`

***

### finishImmediately()

> **finishImmediately**(): `void`

Defined in: [animation/Animation.ts:88](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L88)

Jump directly to the final values and finish, without animating any frames.

#### Returns

`void`

***

### onCancelCallback()

> **onCancelCallback**(`callback`): `this`

Defined in: [animation/Animation.ts:63](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L63)

Set a callback for when the animation is cancelled.

#### Parameters

##### callback

() => `void`

#### Returns

`this`

***

### onDone()

> **onDone**(`callback`): `this`

Defined in: [animation/Animation.ts:57](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L57)

Set a callback for when the animation completes.

#### Parameters

##### callback

() => `void`

#### Returns

`this`

***

### pause()

> **pause**(): `void`

Defined in: [animation/Animation.ts:69](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L69)

Pause the animation.

#### Returns

`void`

***

### resume()

> **resume**(): `void`

Defined in: [animation/Animation.ts:75](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L75)

Resume a paused animation.

#### Returns

`void`

***

### start()

> **start**(): `void`

Defined in: [animation/Animation.ts:96](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L96)

Start the animation. The start time is initialized on the first update call.

#### Returns

`void`

***

### update()

> **update**(`now`): `boolean`

Defined in: [animation/Animation.ts:105](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/Animation.ts#L105)

Advance the animation. Called each frame.

#### Parameters

##### now

`number`

Current timestamp in milliseconds.

#### Returns

`boolean`

True if the animation is still running.
