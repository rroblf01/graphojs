/**
 * Registry of Part subclass constructors (Node, Link, Group).
 * Used by GraphObject.make to detect Part template constructors without
 * importing Part (avoids circular dependencies) and independent of
 * minified class/method names.
 */
const partCtors = new Set<unknown>();

/** Register a Part subclass constructor (called at module init). */
export function registerPartCtor(ctor: unknown): void {
  partCtors.add(ctor);
}

/** Check whether a constructor is a registered Part subclass. */
export function isPartCtor(ctor: unknown): boolean {
  return partCtors.has(ctor);
}
