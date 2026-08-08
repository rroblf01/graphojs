---
editUrl: false
next: false
prev: false
title: "Serializer"
---

> `const` **Serializer**: `object`

Defined in: [serialization/Serializer.ts:305](https://github.com/rroblf01/graphojs/blob/da00c0557b629182a306e06cb15ac4040763a706/packages/core/src/serialization/Serializer.ts#L305)

Serializer namespace for backward compatibility.

## Type Declaration

### deserialize

> `readonly` **deserialize**: (`json`, `diagram`) => `void` = `deserializeDiagram`

Deserialize JSON into a diagram.

#### Parameters

##### json

[`DiagramJSON`](/en/reference/api/graphojs/interfaces/diagramjson/)

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`void`

### deserializeFromGraphML

> **deserializeFromGraphML**: (`xml`, `diagram`) => `void`

Parse a GraphML XML string into a diagram's model.

 See serializeToGraphML.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### xml

`string`

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`void`

### deserializeFromString

> **deserializeFromString**: (`jsonString`, `diagram`) => `void`

Deserialize a JSON string into a diagram.

#### Parameters

##### jsonString

`string`

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`void`

### exportToFile

> **exportToFile**: (`diagram`, `filename`) => `void`

Export diagram to a downloadable file.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### filename

`string`

#### Returns

`void`

### exportToGraphMLFile

> **exportToGraphMLFile**: (`diagram`, `filename`) => `void`

Export a diagram's model to a downloadable .graphml file.

 See serializeToGraphML.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

##### filename

`string`

#### Returns

`void`

### importFromFile

> **importFromFile**: (`diagram`) => `Promise`\<`void`\>

Import diagram from a file.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`Promise`\<`void`\>

### importFromGraphMLFile

> **importFromGraphMLFile**: (`diagram`) => `Promise`\<`void`\>

Import a diagram's model from a .graphml file chosen by the user.

 See serializeToGraphML.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`Promise`\<`void`\>

### serialize

> `readonly` **serialize**: (`diagram`) => [`DiagramJSON`](/en/reference/api/graphojs/interfaces/diagramjson/) = `serializeDiagram`

Serialize a diagram to JSON.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

[`DiagramJSON`](/en/reference/api/graphojs/interfaces/diagramjson/)

### serializeToGraphML

> **serializeToGraphML**: (`diagram`) => `string`

Serialize a diagram's model to a GraphML XML string.

 The attribute-type inference and node-key numeric coercion
heuristics may still change before 1.0.0 — there's no real GoJS API to
mirror here, so the round-trip format is this project's own design.

:::caution[Experimental]
This API should not be used in production and may be trimmed from a public release.
:::

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`string`

### serializeToString

> **serializeToString**: (`diagram`) => `string`

Serialize a diagram to a JSON string.

#### Parameters

##### diagram

[`Diagram`](/en/reference/api/graphojs/classes/diagram/)

#### Returns

`string`
