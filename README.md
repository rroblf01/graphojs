# GraphoJS

An open-source, MIT-licensed alternative to GoJS for building interactive diagrams and graphs in the web.

## Packages

| Package           | npm                                                                                                       | Description                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `graphojs`        | [![npm](https://img.shields.io/npm/v/graphojs.svg)](https://www.npmjs.com/package/graphojs)               | Core library (framework-agnostic, Canvas 2D) |
| `@graphojs/react` | [![npm](https://img.shields.io/npm/v/@graphojs/react.svg)](https://www.npmjs.com/package/@graphojs/react) | React wrapper                                |
| `@graphojs/vue`   | [![npm](https://img.shields.io/npm/v/@graphojs/vue.svg)](https://www.npmjs.com/package/@graphojs/vue)     | Vue wrapper                                  |

## Status

**Work in progress** — not yet published. See the [Roadmap](#roadmap) for planned features.

## Tech Stack

- **TypeScript** 7.0.2
- **Biome** 2.5.6 (lint + format)
- **Vitest** 4.1.10 (unit tests)
- **Playwright** 1.62.1 (e2e tests)
- **tsup** 8.5.1 (bundler)
- **pnpm** 11.18.0 (package manager)

## Development

```bash
# Install dependencies (requires pnpm 11.18.0)
pnpm install

# Build all packages
pnpm build

# Run unit tests
pnpm test

# Run unit tests in watch mode
pnpm test:watch

# Run type checks
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format

# Lint + format check
pnpm check

# Run e2e tests (requires Playwright)
pnpm test:e2e:install
pnpm test:e2e
```

## Roadmap

- [x] Phase 0 — Project setup & tooling
- [ ] Phase 1 — Geometry primitives & data model
- [ ] Phase 2 — Canvas 2D rendering engine
- [ ] Phase 3 — Interaction tools (pan, zoom, select, drag)
- [ ] Phase 4 — Layouts (Grid, Tree)
- [ ] Phase 5 — React wrapper
- [ ] Phase 6 — Vue wrapper
- [ ] Phase 7 — npm publication & documentation
- [ ] Phase 8 — Post-MVP features (UndoManager, Groups, advanced layouts)

## License

MIT — see [LICENSE](./LICENSE).

## Author

Ricardo Robles Fernandez
