---
editUrl: false
next: false
prev: false
title: "ReactDiagram"
---

> `const` **ReactDiagram**: `ForwardRefExoticComponent`\<[`ReactDiagramProps`](/en/reference/api/graphojs-react/interfaces/reactdiagramprops/) & `RefAttributes`\<[`ReactDiagramRef`](/en/reference/api/graphojs-react/interfaces/reactdiagramref/)\>\>

Defined in: [react/index.tsx:295](https://github.com/rroblf01/graphojs/blob/aa122e30a116d47c3df4e406066e615bceb89e4e/packages/core/src/react/index.tsx#L295)

A React component matching `gojs-react`'s `ReactDiagram` shape (a
factory prop plus `ref.getDiagram()`), for porting existing `gojs-react`
code by only changing the import — as an alternative to this module's
own `<Diagram>`, which instead takes `nodeTemplate`/`linkTemplate` as
declarative props.
