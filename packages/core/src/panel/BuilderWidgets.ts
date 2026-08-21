import type { InputEvent } from '../events/InputEvent.ts';
import { Spot } from '../geometry/Spot.ts';
import { registerBuilder } from './BuilderRegistry.ts';
import type { GraphObject } from './GraphObject.ts';
import { Panel } from './Panel.ts';
import { Shape } from './Shape.ts';
import { TextBlock } from './TextBlock.ts';

/**
 * GoJS-compatible: the pre-fab widgets constructible by name via
 * `GraphObject.make`/`build` (e.g. `$(go.Builders.Button, ...)` or
 * `$("Button", ...)`), mirroring real GoJS's builder registry. Each
 * factory takes the non-property-map, non-Binding arguments passed to
 * `make`/`build` (typically zero or one "content" child) and returns a
 * `Panel`; the generic `make`/`build` arg-processing loop then applies any
 * remaining children/property maps/Bindings on top, exactly as it does for
 * a plain constructor.
 *
 * Registered here (rather than exported as a plain object for
 * `GraphObject.ts` to import directly) to avoid a module cycle:
 * `Panel`/`Shape`/`TextBlock` all import `GraphObject`, so `GraphObject.ts`
 * can't import this file's classes back at module-eval time. Mirrors the
 * existing `PanelRegistry.ts` pattern.
 */
registerBuilder('Button', buildButton);
registerBuilder('ToolTip', buildToolTip);
registerBuilder('ContextMenu', buildContextMenuPanel);
registerBuilder('ContextMenuButton', buildContextMenuButton);
registerBuilder('CheckBox', buildCheckBox);
registerBuilder('CheckBoxButton', buildCheckBoxButton);
registerBuilder('AutoRepeatButton', buildAutoRepeatButton);
registerBuilder('ToggleSwitch', buildToggleSwitch);
registerBuilder('Toggle', buildToggleSwitch);

function firstGraphObject(args: unknown[]): GraphObject | null {
  for (const a of args) {
    if (a && typeof a === 'object' && 'draw' in (a as object)) return a as GraphObject;
  }
  return null;
}

/** GoJS-compatible: a clickable button with a background and arbitrary content. */
function buildButton(contentArgs: unknown[]): Panel {
  const button = new Panel('Auto');
  button.name = 'BUTTON';

  const background = new Shape('roundedRect');
  background.fill = '#f5f5f5';
  background.stroke = '#a0a0a0';
  background.strokeWidth = 1;
  background.cornerRadius = 3;
  button.add(background);

  const content = firstGraphObject(contentArgs);
  if (content) button.add(content);

  button.cursor = 'pointer';
  button.mouseEnter = () => {
    background.fill = '#e0e0e0';
  };
  button.mouseLeave = () => {
    background.fill = '#f5f5f5';
  };
  return button;
}

/** GoJS-compatible: a floating tooltip container (Part.toolTip's default chrome). */
function buildToolTip(contentArgs: unknown[]): Panel {
  const tip = new Panel('Auto');
  tip.name = 'TOOLTIP';
  const background = new Shape('rect');
  background.fill = '#ffffe0';
  background.stroke = '#767676';
  background.strokeWidth = 1;
  tip.add(background);
  const content = firstGraphObject(contentArgs);
  if (content) tip.add(content);
  return tip;
}

/** GoJS-compatible: a context menu container — a vertical list of ContextMenuButtons. */
function buildContextMenuPanel(contentArgs: unknown[]): Panel {
  const menu = new Panel('Auto');
  menu.name = 'CONTEXTMENU';
  const background = new Shape('rect');
  background.fill = '#ffffff';
  background.stroke = '#a0a0a0';
  background.strokeWidth = 1;
  menu.add(background);

  const items = new Panel('Vertical');
  for (const a of contentArgs) {
    if (a && typeof a === 'object' && 'draw' in (a as object)) items.add(a as GraphObject);
  }
  menu.add(items);
  return menu;
}

/** GoJS-compatible: a full-width, left-aligned button styled for use inside a ContextMenu. */
function buildContextMenuButton(contentArgs: unknown[]): Panel {
  const item = new Panel('Auto');
  item.name = 'CONTEXTMENUBUTTON';
  const background = new Shape('rect');
  background.fill = 'transparent';
  item.add(background);
  const content = firstGraphObject(contentArgs);
  if (content) item.add(content);
  item.cursor = 'pointer';
  item.mouseEnter = () => {
    background.fill = '#d8e6fb';
  };
  item.mouseLeave = () => {
    background.fill = 'transparent';
  };
  return item;
}

/**
 * Attach a togglable `isChecked`/`checked` boolean to a panel, syncing a
 * glyph Shape's visibility and firing `click` on toggle. Shared by
 * CheckBox/CheckBoxButton/ToggleSwitch/Toggle.
 */
function defineCheckedState(panel: Panel, glyph: Shape, initial = false): void {
  let checked = initial;
  glyph.visible = checked;
  const sync = (): void => {
    glyph.visible = checked;
  };
  Object.defineProperty(panel, 'isChecked', {
    get: () => checked,
    set: (value: boolean) => {
      checked = value;
      sync();
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(panel, 'checked', {
    get: () => checked,
    set: (value: boolean) => {
      checked = value;
      sync();
    },
    enumerable: true,
    configurable: true,
  });
  panel.cursor = 'pointer';
  panel.click = (_e: InputEvent) => {
    checked = !checked;
    sync();
  };
}

/** GoJS-compatible: a small checkbox that toggles `isChecked`/`checked` on click. */
function buildCheckBox(_contentArgs: unknown[]): Panel {
  const box = new Panel('Auto');
  box.name = 'CHECKBOX';
  const background = new Shape('rect');
  background.width = 14;
  background.height = 14;
  background.fill = '#ffffff';
  background.stroke = '#767676';
  box.add(background);
  const glyph = new Shape('x');
  glyph.fill = 'transparent';
  glyph.stroke = '#2b2b2b';
  box.add(glyph);
  defineCheckedState(box, glyph);
  return box;
}

/** GoJS-compatible: a CheckBox plus adjacent content (typically a TextBlock label). */
function buildCheckBoxButton(contentArgs: unknown[]): Panel {
  const row = new Panel('Horizontal');
  row.name = 'CHECKBOXBUTTON';
  const checkbox = buildCheckBox([]);
  row.add(checkbox);
  const content = firstGraphObject(contentArgs) ?? new TextBlock('');
  row.add(content);
  row.cursor = 'pointer';
  row.click = (e: InputEvent, obj: GraphObject) => {
    (checkbox as unknown as { click?: (e: InputEvent, o: GraphObject) => void }).click?.(e, obj);
  };
  Object.defineProperty(row, 'isChecked', {
    get: () => (checkbox as unknown as { isChecked: boolean }).isChecked,
    set: (value: boolean) => {
      (checkbox as unknown as { isChecked: boolean }).isChecked = value;
    },
    enumerable: true,
    configurable: true,
  });
  return row;
}

/**
 * GoJS-compatible: a Button intended to repeat-fire its click while held
 * down. `GraphObject` has no `mouseDown`/`mouseUp` dispatch in graphojs
 * (unlike `mouseEnter`/`mouseLeave`, which are wired), so this currently
 * behaves like a plain `Button` — single-fire per click — rather than
 * truly repeating on hold.
 */
function buildAutoRepeatButton(contentArgs: unknown[]): Panel {
  const button = buildButton(contentArgs);
  button.name = 'AUTOREPEATBUTTON';
  return button;
}

/** GoJS-compatible: a sliding on/off switch, functionally a styled checkbox. */
function buildToggleSwitch(_contentArgs: unknown[]): Panel {
  const track = new Panel('Auto');
  track.name = 'TOGGLESWITCH';
  const background = new Shape('capsule');
  background.width = 36;
  background.height = 18;
  background.fill = '#cccccc';
  background.stroke = '#a0a0a0';
  track.add(background);
  const glyph = new Shape('circle');
  glyph.width = 14;
  glyph.height = 14;
  glyph.fill = '#2b7dfa';
  glyph.alignment = new Spot(0, 0.5);
  track.add(glyph);

  let checked = false;
  const sync = (): void => {
    background.fill = checked ? '#2b7dfa' : '#cccccc';
    glyph.alignment = new Spot(checked ? 1 : 0, 0.5);
  };
  Object.defineProperty(track, 'isChecked', {
    get: () => checked,
    set: (value: boolean) => {
      checked = value;
      sync();
    },
    enumerable: true,
    configurable: true,
  });
  Object.defineProperty(track, 'checked', {
    get: () => checked,
    set: (value: boolean) => {
      checked = value;
      sync();
    },
    enumerable: true,
    configurable: true,
  });
  track.cursor = 'pointer';
  track.click = () => {
    checked = !checked;
    sync();
  };
  return track;
}
