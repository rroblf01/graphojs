---
editUrl: false
next: false
prev: false
title: "AvoidsNodesRouter"
---

Defined in: [render/AvoidsNodesRouter.ts:15](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/AvoidsNodesRouter.ts#L15)

GoJS-compatible: a [Router](/en/reference/api/graphojs/classes/router/) that routes links around node
obstacles. Real implementation: sets `Link.avoidObstacles = true` on
every routed link, which graphojs's renderer already respects via
`routeOrthogonalAvoidingObstacles` (`render/LinkRouter.ts`) — this class
doesn't duplicate that pathfinding, it just flips the same flag real
GoJS's `Routing.AvoidsNodes` would.

## Extends

- [`Router`](/en/reference/api/graphojs/classes/router/)

## Constructors

### Constructor

> **new AvoidsNodesRouter**(`init?`): `AvoidsNodesRouter`

Defined in: [render/AvoidsNodesRouter.ts:16](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/AvoidsNodesRouter.ts#L16)

#### Parameters

##### init?

`Partial`\<`AvoidsNodesRouter`\>

#### Returns

`AvoidsNodesRouter`

#### Overrides

[`Router`](/en/reference/api/graphojs/classes/router/).[`constructor`](/en/reference/api/graphojs/classes/router/#constructor)

## Properties

### isEnabled

> **isEnabled**: `boolean` = `true`

Defined in: [render/Router.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L18)

#### Inherited from

[`Router`](/en/reference/api/graphojs/classes/router/).[`isEnabled`](/en/reference/api/graphojs/classes/router/#isenabled)

***

### isRealtime

> **isRealtime**: `boolean` = `false`

Defined in: [render/Router.ts:19](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L19)

#### Inherited from

[`Router`](/en/reference/api/graphojs/classes/router/).[`isRealtime`](/en/reference/api/graphojs/classes/router/#isrealtime)

***

### name

> **name**: `string` = `''`

Defined in: [render/Router.ts:17](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L17)

#### Inherited from

[`Router`](/en/reference/api/graphojs/classes/router/).[`name`](/en/reference/api/graphojs/classes/router/#name)

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

#### Inherited from

[`Router`](/en/reference/api/graphojs/classes/router/).[`diagram`](/en/reference/api/graphojs/classes/router/#diagram)

## Methods

### canRoute()

> **canRoute**(`_container`): `boolean`

Defined in: [render/AvoidsNodesRouter.ts:21](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/AvoidsNodesRouter.ts#L21)

Whether this router applies to the given container at all. Default: `isEnabled`.

#### Parameters

##### \_container

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| [`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`boolean`

#### Overrides

[`Router`](/en/reference/api/graphojs/classes/router/).[`canRoute`](/en/reference/api/graphojs/classes/router/#canroute)

***

### invalidateRouter()

> **invalidateRouter**(): `void`

Defined in: [render/Router.ts:31](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/Router.ts#L31)

Request that routes be recomputed; the default just invalidates the diagram.

#### Returns

`void`

#### Inherited from

[`Router`](/en/reference/api/graphojs/classes/router/).[`invalidateRouter`](/en/reference/api/graphojs/classes/router/#invalidaterouter)

***

### isRoutable()

> **isRoutable**(`_link`, `_container`): `boolean`

Defined in: [render/AvoidsNodesRouter.ts:25](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/AvoidsNodesRouter.ts#L25)

Whether this router should route the given link. Default: always.

#### Parameters

##### \_link

[`Link`](/en/reference/api/graphojs/classes/link/)

##### \_container

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| [`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`boolean`

#### Overrides

[`Router`](/en/reference/api/graphojs/classes/router/).[`isRoutable`](/en/reference/api/graphojs/classes/router/#isroutable)

***

### routeLinks()

> **routeLinks**(`links`, `_container`): `void`

Defined in: [render/AvoidsNodesRouter.ts:29](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/render/AvoidsNodesRouter.ts#L29)

Route every link in `links`, within `container`. Must be overridden.

#### Parameters

##### links

[`Set`](/en/reference/api/graphojs/classes/set/)\<[`Link`](/en/reference/api/graphojs/classes/link/)\>

##### \_container

[`Diagram`](/en/reference/api/graphojs/classes/diagram/) \| [`Group`](/en/reference/api/graphojs/classes/group/)

#### Returns

`void`

#### Overrides

[`Router`](/en/reference/api/graphojs/classes/router/).[`routeLinks`](/en/reference/api/graphojs/classes/router/#routelinks)
