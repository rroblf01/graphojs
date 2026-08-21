---
editUrl: false
next: false
prev: false
title: "ThemeBinding"
---

Defined in: [binding/ThemeBinding.ts:18](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L18)

GoJS-compatible: a `Binding` whose source value comes from the target's
Diagram's `ThemeManager` instead of the model data — created by
`GraphObject.theme()` (a literal theme key), `themeData()` (a data
property's value names the theme key), or `themeModel()`. Always
one-way (theme → target); `applyToModel` is a no-op.

graphojs has no `Model.modelData` (a shared, model-wide data object) —
`themeModel()` falls back to the same per-part data lookup `themeData()`
uses, rather than real GoJS's model-wide source.

## Extends

- [`Binding`](/en/reference/api/graphojs/classes/binding/)

## Constructors

### Constructor

> **new ThemeBinding**(`targetprop?`, `sourceprop?`, `themeSource?`, `conv?`, `themeConverter?`): `ThemeBinding`

Defined in: [binding/ThemeBinding.ts:23](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L23)

#### Parameters

##### targetprop?

`string` = `''`

##### sourceprop?

`string`

##### themeSource?

`string` \| `null`

##### conv?

(`value`, `data`) => `unknown`

##### themeConverter?

(`value`, `target`) => `unknown`

#### Returns

`ThemeBinding`

#### Overrides

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`constructor`](/en/reference/api/graphojs/classes/binding/#constructor)

## Accessors

### mode

#### Get Signature

> **get** **mode**(): `number`

Defined in: [binding/Binding.ts:73](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L73)

GoJS-compatible: Get the mode (BindingMode.OneWay or BindingMode.TwoWay).

##### Returns

`number`

#### Set Signature

> **set** **mode**(`value`): `void`

Defined in: [binding/Binding.ts:68](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L68)

GoJS-compatible: Set the mode to BindingMode.OneWay or BindingMode.TwoWay.

##### Parameters

###### value

`number`

##### Returns

`void`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`mode`](/en/reference/api/graphojs/classes/binding/#mode)

***

### sourceObjectName

#### Get Signature

> **get** **sourceObjectName**(): `string`

Defined in: [binding/Binding.ts:48](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L48)

The name of the source object (default "data").

##### Returns

`string`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`sourceObjectName`](/en/reference/api/graphojs/classes/binding/#sourceobjectname)

***

### sourceProperty

#### Get Signature

> **get** **sourceProperty**(): `string`

Defined in: [binding/Binding.ts:58](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L58)

The model data property name to read.

##### Returns

`string`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`sourceProperty`](/en/reference/api/graphojs/classes/binding/#sourceproperty)

***

### targetProperty

#### Get Signature

> **get** **targetProperty**(): `string`

Defined in: [binding/Binding.ts:53](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L53)

The target property name to set.

##### Returns

`string`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`targetProperty`](/en/reference/api/graphojs/classes/binding/#targetproperty)

***

### themeConverter

#### Get Signature

> **get** **themeConverter**(): ((`value`, `target`) => `unknown`) \| `null`

Defined in: [binding/ThemeBinding.ts:55](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L55)

##### Returns

((`value`, `target`) => `unknown`) \| `null`

#### Set Signature

> **set** **themeConverter**(`value`): `void`

Defined in: [binding/ThemeBinding.ts:59](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L59)

##### Parameters

###### value

((`value`, `target`) => `unknown`) \| `null`

##### Returns

`void`

***

### themeSource

#### Get Signature

> **get** **themeSource**(): `string`

Defined in: [binding/ThemeBinding.ts:47](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L47)

##### Returns

`string`

#### Set Signature

> **set** **themeSource**(`value`): `void`

Defined in: [binding/ThemeBinding.ts:51](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L51)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### twoWay

#### Get Signature

> **get** **twoWay**(): `boolean`

Defined in: [binding/Binding.ts:63](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L63)

Whether this is a TwoWay binding.

##### Returns

`boolean`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`twoWay`](/en/reference/api/graphojs/classes/binding/#twoway)

## Methods

### applyToModel()

> **applyToModel**(): `boolean`

Defined in: [binding/ThemeBinding.ts:82](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L82)

Apply TwoWay: read target property and write back to model data.
Returns true if the property was set on the model.

#### Returns

`boolean`

#### Overrides

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`applyToModel`](/en/reference/api/graphojs/classes/binding/#applytomodel)

***

### ~~applyToPart()~~

> **applyToPart**(`part`, `nodeData`): `boolean`

Defined in: [binding/Binding.ts:235](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L235)

:::caution[Deprecated]
Use applyToTarget instead.
:::

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`boolean`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`applyToPart`](/en/reference/api/graphojs/classes/binding/#applytopart)

***

### applyToTarget()

> **applyToTarget**(`target`, `nodeData`): `boolean`

Defined in: [binding/Binding.ts:100](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L100)

Apply this binding: read from model data and set on the target.
Returns true if the property was set.

#### Parameters

##### target

`BindingTarget`

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`boolean`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`applyToTarget`](/en/reference/api/graphojs/classes/binding/#applytotarget)

***

### copy()

> **copy**(): `ThemeBinding`

Defined in: [binding/ThemeBinding.ts:86](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L86)

Create a deep copy of this binding.

#### Returns

`ThemeBinding`

#### Overrides

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`copy`](/en/reference/api/graphojs/classes/binding/#copy)

***

### equals()

> **equals**(`other`): `boolean`

Defined in: [binding/Binding.ts:226](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L226)

Check if two bindings are equivalent.

#### Parameters

##### other

[`Binding`](/en/reference/api/graphojs/classes/binding/)

#### Returns

`boolean`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`equals`](/en/reference/api/graphojs/classes/binding/#equals)

***

### getSourceValue()

> **getSourceValue**(`nodeData`, `target?`): `unknown`

Defined in: [binding/ThemeBinding.ts:63](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L63)

Read the source property from model data, applying the converter if present.
Supports dot paths (e.g. "data.name", "meta.color").
Resolves the source object per ofObject(): "data" (default), "parent",
or a named GraphObject in the visual tree.

#### Parameters

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

##### target?

`BindingTarget`

#### Returns

`unknown`

#### Overrides

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`getSourceValue`](/en/reference/api/graphojs/classes/binding/#getsourcevalue)

***

### ~~getSourceValueFromPart()~~

> **getSourceValueFromPart**(`part`): `unknown`

Defined in: [binding/Binding.ts:240](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L240)

:::caution[Deprecated]
Use getSourceValueFromTarget instead.
:::

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`unknown`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`getSourceValueFromPart`](/en/reference/api/graphojs/classes/binding/#getsourcevaluefrompart)

***

### getSourceValueFromTarget()

> **getSourceValueFromTarget**(`target`): `unknown`

Defined in: [binding/Binding.ts:217](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L217)

Read the target property and write to model data, applying back-converter if present.

#### Parameters

##### target

`BindingTarget`

#### Returns

`unknown`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`getSourceValueFromTarget`](/en/reference/api/graphojs/classes/binding/#getsourcevaluefromtarget)

***

### makeTwoWay()

> **makeTwoWay**(): `this`

Defined in: [binding/Binding.ts:84](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L84)

Make this a TwoWay binding so target property changes flow back to the model.

#### Returns

`this`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`makeTwoWay`](/en/reference/api/graphojs/classes/binding/#maketwoway)

***

### ofBackConverter()

> **ofBackConverter**(`backConverter`): `this`

Defined in: [binding/Binding.ts:90](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L90)

Set a back-converter for TwoWay bindings that transforms target property → model data.

#### Parameters

##### backConverter

(`value`, `target`) => `unknown`

#### Returns

`this`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`ofBackConverter`](/en/reference/api/graphojs/classes/binding/#ofbackconverter)

***

### ofConverter()

> **ofConverter**(`converter`): `this`

Defined in: [binding/Binding.ts:78](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L78)

Set a converter function that transforms model data → target property.

#### Parameters

##### converter

(`value`, `data`) => `unknown`

#### Returns

`this`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`ofConverter`](/en/reference/api/graphojs/classes/binding/#ofconverter)

***

### ofData()

> **ofData**(): `this`

Defined in: [binding/ThemeBinding.ts:36](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L36)

Switch this binding to resolve its theme key from a data property's value (used by `GraphObject.themeData`).

#### Returns

`this`

***

### ofModel()

> **ofModel**(): `this`

Defined in: [binding/ThemeBinding.ts:42](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/ThemeBinding.ts#L42)

Switch this binding to resolve its theme key from model-wide data (used by `GraphObject.themeModel`).

#### Returns

`this`

***

### ofObject()

> **ofObject**(`name`): `this`

Defined in: [binding/Binding.ts:42](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L42)

GoJS-compatible: Specify which object is the source of the binding.
Common values: "data" (the part's model data, the default), "parent"
(the parent panel's data). Named GraphObjects are resolved when possible.

#### Parameters

##### name

`string`

#### Returns

`this`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`ofObject`](/en/reference/api/graphojs/classes/binding/#ofobject)

***

### setTargetValue()

> **setTargetValue**(`target`, `value`): `void`

Defined in: [binding/Binding.ts:210](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/binding/Binding.ts#L210)

Write a value to the target, applying the back-converter if present.

#### Parameters

##### target

`BindingTarget`

##### value

`unknown`

#### Returns

`void`

#### Inherited from

[`Binding`](/en/reference/api/graphojs/classes/binding/).[`setTargetValue`](/en/reference/api/graphojs/classes/binding/#settargetvalue)
