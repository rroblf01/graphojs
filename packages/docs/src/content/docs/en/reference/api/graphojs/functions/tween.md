---
editUrl: false
next: false
prev: false
title: "tween"
---

> **tween**(`manager`, `from`, `to`, `duration`, `onUpdate`, `onDone?`, `easing?`): [`Animation`](/en/reference/api/graphojs/classes/animation/)

Defined in: [animation/AnimationManager.ts:150](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/animation/AnimationManager.ts#L150)

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
