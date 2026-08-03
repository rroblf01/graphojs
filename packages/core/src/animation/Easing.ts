/**
 * Easing functions for animations.
 */
export type EasingFunction = (t: number) => number;

/** Linear easing. */
export function linear(t: number): number {
  return t;
}

/** Quadratic ease-in. */
export function easeInQuad(t: number): number {
  return t * t;
}

/** Quadratic ease-out. */
export function easeOutQuad(t: number): number {
  return t * (2 - t);
}

/** Quadratic ease-in-out. */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/** Cubic ease-in. */
export function easeInCubic(t: number): number {
  return t * t * t;
}

/** Cubic ease-out. */
export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/** Cubic ease-in-out. */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/** Easing function names. */
export type EasingName =
  | 'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic';

/** Get an easing function by name. */
export function getEasing(name: EasingName): EasingFunction {
  switch (name) {
    case 'linear':
      return linear;
    case 'easeInQuad':
      return easeInQuad;
    case 'easeOutQuad':
      return easeOutQuad;
    case 'easeInOutQuad':
      return easeInOutQuad;
    case 'easeInCubic':
      return easeInCubic;
    case 'easeOutCubic':
      return easeOutCubic;
    case 'easeInOutCubic':
      return easeInOutCubic;
    default:
      return linear;
  }
}
