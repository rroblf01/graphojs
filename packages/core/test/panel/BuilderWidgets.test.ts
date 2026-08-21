import { describe, expect, it } from 'vitest';
import '../../src/panel/BuilderWidgets.ts';
import { Builders } from '../../src/constants.ts';
import type { InputEvent } from '../../src/events/InputEvent.ts';
import { GraphObject } from '../../src/panel/GraphObject.ts';
import { Panel } from '../../src/panel/Panel.ts';
import { TextBlock } from '../../src/panel/TextBlock.ts';

const $ = GraphObject.make;

function fireClick(obj: Panel): void {
  obj.click?.({} as InputEvent, obj);
}

describe('GraphObject.make string dispatch for pre-fab widgets', () => {
  it('throws for an unregistered builder name', () => {
    expect(() => $('NotARealWidget')).toThrow(/no constructor or registered builder/);
  });

  it('Builders constants match the registered names', () => {
    expect(() => $(Builders.Button)).not.toThrow();
    expect(() => $(Builders.ToolTip)).not.toThrow();
    expect(() => $(Builders.ContextMenu)).not.toThrow();
    expect(() => $(Builders.CheckBox)).not.toThrow();
  });

  it('Button constructs a Panel with the given content and applies property maps', () => {
    const label = $(TextBlock, 'OK');
    const button = $('Button', label, { name: 'okButton' });
    expect(button).toBeInstanceOf(Panel);
    expect(button.name).toBe('okButton');
    expect(button.elements.some((el) => el === label)).toBe(true);
  });

  it('Button applies a user click handler from the property map', () => {
    let fired = false;
    const button = $('Button', $(TextBlock, 'Go'), {
      click: () => {
        fired = true;
      },
    });
    fireClick(button);
    expect(fired).toBe(true);
  });

  it('ToolTip wraps its content in a bordered Auto panel', () => {
    const label = $(TextBlock, 'Info');
    const tip = $('ToolTip', label);
    expect(tip.type).toBe('Auto');
    expect(tip.elements.some((el) => el === label)).toBe(true);
  });

  it('ContextMenu holds ContextMenuButton children in a vertical list', () => {
    const item1 = $('ContextMenuButton', $(TextBlock, 'Cut'));
    const item2 = $('ContextMenuButton', $(TextBlock, 'Copy'));
    const menu = $('ContextMenu', item1, item2);
    expect(menu).toBeInstanceOf(Panel);
  });

  it('CheckBox toggles isChecked/checked on click', () => {
    const box = $('CheckBox') as unknown as Panel & { isChecked: boolean; checked: boolean };
    expect(box.isChecked).toBe(false);
    fireClick(box);
    expect(box.isChecked).toBe(true);
    expect(box.checked).toBe(true);
    fireClick(box);
    expect(box.isChecked).toBe(false);
  });

  it('CheckBox glyph visibility mirrors isChecked', () => {
    const box = $('CheckBox') as unknown as Panel & { isChecked: boolean };
    const glyph = box.elements[1];
    expect(glyph?.visible).toBe(false);
    box.isChecked = true;
    expect(glyph?.visible).toBe(true);
  });

  it('CheckBoxButton pairs a checkbox with a label and toggles together', () => {
    const row = $('CheckBoxButton', $(TextBlock, 'Enabled')) as unknown as Panel & {
      isChecked: boolean;
    };
    expect(row.isChecked).toBe(false);
    fireClick(row);
    expect(row.isChecked).toBe(true);
  });

  it('AutoRepeatButton fires its click handler like a normal Button', () => {
    let count = 0;
    const button = $('AutoRepeatButton', $(TextBlock, '+'), {
      click: () => {
        count++;
      },
    });
    fireClick(button);
    fireClick(button);
    expect(count).toBe(2);
  });

  it('ToggleSwitch and Toggle both toggle isChecked on click', () => {
    const toggle = $('ToggleSwitch') as unknown as Panel & { isChecked: boolean };
    expect(toggle.isChecked).toBe(false);
    fireClick(toggle);
    expect(toggle.isChecked).toBe(true);

    const toggle2 = $('Toggle') as unknown as Panel & { isChecked: boolean };
    fireClick(toggle2);
    expect(toggle2.isChecked).toBe(true);
  });

  it('a Binding can be attached to a builder-constructed widget', async () => {
    const { Binding } = await import('../../src/binding/Binding.ts');
    const box = $('CheckBox', new Binding('isChecked', 'done').makeTwoWay());
    expect(box.bindings.length).toBe(1);
  });
});
