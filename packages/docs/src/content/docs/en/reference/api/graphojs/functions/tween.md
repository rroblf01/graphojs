---
editUrl: false
next: false
prev: false
title: "tween"
---

> **tween**(`manager`, `from`, `to`, `duration`, `onUpdate`, `onDone?`, `easing?`): [`Animation`](/en/reference/api/graphojs/classes/animation/)

Defined in: [animation/AnimationManager.ts:150](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/animation/AnimationManager.ts#L150)

A helper to tween a numeric property with easing.

## Parameters

### manager

[`AnimationManager`](/en/reference/api/graphojs/classes/animationmanager/)

### from

`number`

### to

`number`

### duration

`number`

### onUpdate

(`value`) => `void`

### onDone?

() => `void`

### easing?

[`EasingName`](/en/reference/api/graphojs/type-aliases/easingname/) = `'linear'`

## Returns

[`Animation`](/en/reference/api/graphojs/classes/animation/)
