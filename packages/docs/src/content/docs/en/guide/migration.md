---
title: Migration
description: Switch from gojs to graphojs by changing just the import.
---

Migrating a GoJS application to GraphoJS is, in most cases, just changing
**a single import line**.

```diff
- import * as go from "gojs";
+ import * as go from "graphojs/go";
```

## What works without changes

- `go.GraphObject.make` (`$`) and templates
- `diagram.model`, transactions, and undo/redo
- `go.Node` / `go.Link` / `go.Group` / `go.Panel` / `go.Shape` / `go.TextBlock`
- Bindings, events, layouts, Palette, Overview, ContextMenu
- Export PNG/SVG/print

## Known differences

See the full table in [Compatibility](/en/reference/compatibility/#known-differences).

## If you were using palette templates

```diff
- go.getAllTemplates()
+ import { getAllTemplates } from "graphojs/templates";
```

## Verification

GraphoJS includes e2e tests that run GoJS's "Getting Started" tutorial
verbatim (only changing the import) in a real browser.
