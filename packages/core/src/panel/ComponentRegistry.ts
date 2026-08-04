/**
 * Registry of DOM component constructors (Diagram, Palette, Overview).
 * GraphObject.make uses this to construct them with their real arguments
 * instead of `new ctor()` (which would throw for argument-required ctors).
 */
const domCtors = new Set<unknown>();

export function registerDomComponent(ctor: unknown): void {
  domCtors.add(ctor);
}

export function isDomComponent(ctor: unknown): boolean {
  return domCtors.has(ctor);
}
