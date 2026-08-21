---
editUrl: false
next: false
prev: false
title: "Router"
---

Defined in: [render/Router.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L16)

GoJS-compatible: abstract base class for a pluggable link-routing
strategy, mirroring real GoJS's `Router`. graphojs's own rendering
already computes link paths per `Link.routing`/`avoidObstacles`
(`render/LinkRouter.ts`'s route* functions) rather than delegating to an
instantiable Router — subclassing this and overriding `routeLinks` lets
ported GoJS code plug into that decision instead of the individual
per-link flags, but graphojs itself doesn't consult a `Router` instance
anywhere in its own rendering path.

## Extended by

- [`AvoidsNodesRouter`](/en/reference/api/graphojs/classes/avoidsnodesrouter/)

## Constructors

### Constructor

> **new Router**(): `Router`

#### Returns

`Router`

## Properties

### isEnabled

> **isEnabled**: `boolean` = `true`

Defined in: [render/Router.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L18)

***

### isRealtime

> **isRealtime**: `boolean` = `false`

Defined in: [render/Router.ts:19](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L19)

***

### name

> **name**: `string` = `''`

Defined in: [render/Router.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L17)

## Accessors

### diagram

#### Get Signature

> **get** **diagram**(): [`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

Defined in: [render/Router.ts:22](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L22)

##### Returns

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

#### Set Signature

> **set** **diagram**(`value`): `void`

Defined in: [render/Router.ts:26](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L26)

##### Parameters

###### value

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| `null`

##### Returns

`void`

## Methods

### canRoute()

> **canRoute**(`_container`): `boolean`

Defined in: [render/Router.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L36)

Whether this router applies to the given container at all. Default: `isEnabled`.

#### Parameters

##### \_container

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| [`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`boolean`

***

### invalidateRouter()

> **invalidateRouter**(): `void`

Defined in: [render/Router.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L31)

Request that routes be recomputed; the default just invalidates the diagram.

#### Returns

`void`

***

### isRoutable()

> **isRoutable**(`_link`, `_container`): `boolean`

Defined in: [render/Router.ts:41](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L41)

Whether this router should route the given link. Default: always.

#### Parameters

##### \_link

[`Link`](/en/reference/api/graphojs/classes/link/)

##### \_container

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| [`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`boolean`

***

### routeLinks()

> `abstract` **routeLinks**(`links`, `container`): `void`

Defined in: [render/Router.ts:46](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L46)

Route every link in `links`, within `container`. Must be overridden.

#### Parameters

##### links

[`Set`](/en/reference/api/graphojs/classes/set/)\<[`Link`](/en/reference/api/graphojs/classes/link/)\>

##### container

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| [`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`
