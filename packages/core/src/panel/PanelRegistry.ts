import type { Panel } from './Panel.ts';

type PanelFactory = (type?: string) => Panel;

let factory: PanelFactory | null = null;

/** Register the Panel constructor factory (called by Panel.ts at module init). */
export function registerPanelFactory(fn: PanelFactory): void {
  factory = fn;
}

/** Get the Panel factory. Throws if Panel hasn't been loaded yet. */
export function getPanelFactory(): PanelFactory {
  if (!factory) {
    throw new Error('Panel factory not registered');
  }
  return factory;
}
