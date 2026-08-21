import type { Panel } from './Panel.ts';

type Builder = (contentArgs: unknown[]) => Panel;

const builders = new globalThis.Map<string, Builder>();

/** Register a named pre-fab widget builder (called by BuilderWidgets.ts at module init). */
export function registerBuilder(name: string, fn: Builder): void {
  builders.set(name, fn);
}

/** Look up a registered builder by name, or `undefined` if none is registered. */
export function getBuilder(name: string): Builder | undefined {
  return builders.get(name);
}
