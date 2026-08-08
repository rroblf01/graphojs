---
editUrl: false
next: false
prev: false
title: "Binding"
---

Defined in: [binding/Binding.ts:17](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L17)

A binding connects a model data property to a Part or GraphObject property.

When the model changes, the binding reads `sourceProperty` from the
node data and writes it to `targetProperty` on the target.

For TwoWay bindings, changes to the target property are written back
to the model.

## Constructors

### Constructor

> **new Binding**(`targetProperty`, `sourceProperty?`, `converter?`): `Binding`

Defined in: [binding/Binding.ts:27](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L27)

GoJS-compatible: sourceProperty is optional and defaults to targetProperty;
 the optional third argument is the converter function.

#### Parameters

##### targetProperty

`string`

##### sourceProperty?

`string`

##### converter?

(`value`, `data`) => `unknown`

#### Returns

`Binding`

## Accessors

### mode

#### Get Signature

> **get** **mode**(): `number`

Defined in: [binding/Binding.ts:73](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L73)

GoJS-compatible: Get the mode (BindingMode.OneWay or BindingMode.TwoWay).

##### Returns

`number`

#### Set Signature

> **set** **mode**(`value`): `void`

Defined in: [binding/Binding.ts:68](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L68)

GoJS-compatible: Set the mode to BindingMode.OneWay or BindingMode.TwoWay.

##### Parameters

###### value

`number`

##### Returns

`void`

***

### sourceObjectName

#### Get Signature

> **get** **sourceObjectName**(): `string`

Defined in: [binding/Binding.ts:48](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L48)

The name of the source object (default "data").

##### Returns

`string`

***

### sourceProperty

#### Get Signature

> **get** **sourceProperty**(): `string`

Defined in: [binding/Binding.ts:58](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L58)

The model data property name to read.

##### Returns

`string`

***

### targetProperty

#### Get Signature

> **get** **targetProperty**(): `string`

Defined in: [binding/Binding.ts:53](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L53)

The target property name to set.

##### Returns

`string`

***

### twoWay

#### Get Signature

> **get** **twoWay**(): `boolean`

Defined in: [binding/Binding.ts:63](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L63)

Whether this is a TwoWay binding.

##### Returns

`boolean`

## Methods

### applyToModel()

> **applyToModel**(`target`, `nodeData`): `boolean`

Defined in: [binding/Binding.ts:116](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L116)

Apply TwoWay: read target property and write back to model data.
Returns true if the property was set on the model.

#### Parameters

##### target

`BindingTarget`

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`boolean`

***

### ~~applyToPart()~~

> **applyToPart**(`part`, `nodeData`): `boolean`

Defined in: [binding/Binding.ts:231](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L231)

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

***

### applyToTarget()

> **applyToTarget**(`target`, `nodeData`): `boolean`

Defined in: [binding/Binding.ts:100](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L100)

Apply this binding: read from model data and set on the target.
Returns true if the property was set.

#### Parameters

##### target

`BindingTarget`

##### nodeData

[`NodeData`](/en/reference/api/graphojs/interfaces/nodedata/)

#### Returns

`boolean`

***

### copy()

> **copy**(): `Binding`

Defined in: [binding/Binding.ts:241](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L241)

Create a deep copy of this binding.

#### Returns

`Binding`

***

### equals()

> **equals**(`other`): `boolean`

Defined in: [binding/Binding.ts:222](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L222)

Check if two bindings are equivalent.

#### Parameters

##### other

`Binding`

#### Returns

`boolean`

***

### getSourceValue()

> **getSourceValue**(`nodeData`, `target?`): `unknown`

Defined in: [binding/Binding.ts:140](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L140)

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

***

### ~~getSourceValueFromPart()~~

> **getSourceValueFromPart**(`part`): `unknown`

Defined in: [binding/Binding.ts:236](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L236)

:::caution[Deprecated]
Use getSourceValueFromTarget instead.
:::

#### Parameters

##### part

[`Part`](/en/reference/api/graphojs/classes/part/)

#### Returns

`unknown`

***

### getSourceValueFromTarget()

> **getSourceValueFromTarget**(`target`): `unknown`

Defined in: [binding/Binding.ts:213](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L213)

Read the target property and write to model data, applying back-converter if present.

#### Parameters

##### target

`BindingTarget`

#### Returns

`unknown`

***

### makeTwoWay()

> **makeTwoWay**(): `this`

Defined in: [binding/Binding.ts:84](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L84)

Make this a TwoWay binding so target property changes flow back to the model.

#### Returns

`this`

***

### ofBackConverter()

> **ofBackConverter**(`backConverter`): `this`

Defined in: [binding/Binding.ts:90](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L90)

Set a back-converter for TwoWay bindings that transforms target property → model data.

#### Parameters

##### backConverter

(`value`, `target`) => `unknown`

#### Returns

`this`

***

### ofConverter()

> **ofConverter**(`converter`): `this`

Defined in: [binding/Binding.ts:78](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L78)

Set a converter function that transforms model data → target property.

#### Parameters

##### converter

(`value`, `data`) => `unknown`

#### Returns

`this`

***

### ofObject()

> **ofObject**(`name`): `this`

Defined in: [binding/Binding.ts:42](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L42)

GoJS-compatible: Specify which object is the source of the binding.
Common values: "data" (the part's model data, the default), "parent"
(the parent panel's data). Named GraphObjects are resolved when possible.

#### Parameters

##### name

`string`

#### Returns

`this`

***

### setTargetValue()

> **setTargetValue**(`target`, `value`): `void`

Defined in: [binding/Binding.ts:206](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/binding/Binding.ts#L206)

Write a value to the target, applying the back-converter if present.

#### Parameters

##### target

`BindingTarget`

##### value

`unknown`

#### Returns

`void`
