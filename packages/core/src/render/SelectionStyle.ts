/** Colors used to render selection highlights and the keyboard focus cursor. */
export interface SelectionStyle {
  /** Outline color for selected nodes/links, resize handles, and the rubber-band select rectangle. */
  selectionColor: string;
  /** Fill color for resize/rotation handles. */
  handleFill: string;
  /** Outline color for the keyboard focus cursor. */
  focusColor: string;
}

/** The default selection/focus colors. */
export const defaultSelectionStyle: SelectionStyle = {
  selectionColor: '#2196f3',
  handleFill: '#ffffff',
  focusColor: '#6200ea',
};

/**
 * Higher-contrast selection/focus colors, used when the OS requests more
 * contrast (`prefers-contrast: more` or `forced-colors: active`). Selection
 * and focus stay visually distinct from each other, not just from the
 * background.
 */
export const highContrastSelectionStyle: SelectionStyle = {
  selectionColor: '#000000',
  handleFill: '#ffd600',
  focusColor: '#d50000',
};

/** Convert a `#rrggbb` color to an `rgba(...)` string at the given alpha. */
export function hexToRgba(hex: string, alpha: number): string {
  const match = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) return hex;
  const [r, g, b] = match.slice(1).map((part) => parseInt(part, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
