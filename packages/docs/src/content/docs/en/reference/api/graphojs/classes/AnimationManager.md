---
editUrl: false
next: false
prev: false
title: "AnimationManager"
---

Defined in: [animation/AnimationManager.ts:12](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L12)

Manages and runs animations.

## Constructors

### Constructor

> **new AnimationManager**(): `AnimationManager`

#### Returns

`AnimationManager`

## Properties

### isEnabled

> **isEnabled**: `boolean` = `true`

Defined in: [animation/AnimationManager.ts:24](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L24)

GoJS-compatible: whether animations actually animate, or jump straight to
their final values. Default: true. GraphoJS defaults this to false when
the OS-level `prefers-reduced-motion: reduce` setting is on (see
`Diagram`'s constructor) — set it explicitly to override that default.

## Accessors

### count

#### Get Signature

> **get** **count**(): `number`

Defined in: [animation/AnimationManager.ts:41](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L41)

Get the number of running animations.

##### Returns

`number`

***

### diagram

#### Get Signature

> **get** **diagram**(): `DiagramEventsSink` \| `null`

Defined in: [animation/AnimationManager.ts:27](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L27)

GoJS-compatible: The diagram this manager reports events to.

##### Returns

`DiagramEventsSink` \| `null`

#### Set Signature

> **set** **diagram**(`value`): `void`

Defined in: [animation/AnimationManager.ts:31](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L31)

##### Parameters

###### value

`DiagramEventsSink` \| `null`

##### Returns

`void`

***

### isAnimating

#### Get Signature

> **get** **isAnimating**(): `boolean`

Defined in: [animation/AnimationManager.ts:36](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L36)

Whether any animation is currently running.

##### Returns

`boolean`

## Methods

### add()

> **add**(`animation`): `void`

Defined in: [animation/AnimationManager.ts:61](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L61)

Add an animation to the manager.

#### Parameters

##### animation

[`Animation`](/en/reference/api/graphojs/classes/animation/)

#### Returns

`void`

***

### animate()

> **animate**(`from`, `to`, `callback`, `options?`): [`Animation`](/en/reference/api/graphojs/classes/animation/)

Defined in: [animation/AnimationManager.ts:49](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L49)

Create and run an animation.
Returns the Animation object.

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

[`Animation`](/en/reference/api/graphojs/classes/animation/)

***

### cancelAll()

> **cancelAll**(): `void`

Defined in: [animation/AnimationManager.ts:87](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L87)

Cancel all animations.

#### Returns

`void`

***

### pauseAll()

> **pauseAll**(): `void`

Defined in: [animation/AnimationManager.ts:96](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L96)

Pause all animations.

#### Returns

`void`

***

### resumeAll()

> **resumeAll**(): `void`

Defined in: [animation/AnimationManager.ts:103](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L103)

Resume all paused animations.

#### Returns

`void`

***

### tickManually()

> **tickManually**(): `void`

Defined in: [animation/AnimationManager.ts:140](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L140)

Advance animations manually (for tests or custom loops).

#### Returns

`void`
