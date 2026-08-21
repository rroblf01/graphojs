// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { ThemeBinding } from '../../src/binding/ThemeBinding.ts';
import { Diagram } from '../../src/diagram/Diagram.ts';
import { GraphLinksModel } from '../../src/model/GraphLinksModel.ts';
import { GraphObject } from '../../src/panel/GraphObject.ts';
import { Panel } from '../../src/panel/Panel.ts';
import { Shape } from '../../src/panel/Shape.ts';
import type { Node } from '../../src/parts/Node.ts';
import { ThemeManager } from '../../src/theme/ThemeManager.ts';
import { Themes } from '../../src/theme/Themes.ts';

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(
    () =>
      ({
        save: vi.fn(),
        restore: vi.fn(),
        scale: vi.fn(),
        translate: vi.fn(),
        setTransform: vi.fn(),
        clearRect: vi.fn(),
        fillRect: vi.fn(),
        strokeRect: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        rect: vi.fn(),
        stroke: vi.fn(),
        fill: vi.fn(),
        setLineDash: vi.fn(),
        drawImage: vi.fn(),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        globalAlpha: 1,
      }) as unknown as CanvasRenderingContext2D,
  ) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getBoundingClientRect = vi.fn(() => ({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    top: 0,
    left: 0,
    right: 800,
    bottom: 600,
  })) as unknown as typeof HTMLCanvasElement.prototype.getBoundingClientRect;
});

describe('Themes', () => {
  it('Light/Dark reproduce the documented GoJS colors', () => {
    expect(Themes.Light.colors?.text).toBe('#0a0a0a');
    expect(Themes.Dark.colors?.text).toBe('#f5f5f5');
    expect(Themes.Light.numbers?.selection).toBe(3);
    expect(Themes.Light.margins?.group.left).toBe(5);
    expect(Themes.Light.arrowheads?.toArrow).toBe('Standard');
  });
});

describe('ThemeManager', () => {
  it('defaults to light/dark themes with currentTheme="light"', () => {
    const tm = new ThemeManager();
    expect(tm.currentTheme).toBe('light');
    expect(tm.defaultTheme).toBe('light');
    expect(tm.themeMap.get('light')?.colors?.text).toBe('#0a0a0a');
    expect(tm.themeMap.get('dark')?.colors?.text).toBe('#f5f5f5');
  });

  it('findValue looks up via the default targetPropertyMap using targetprop', () => {
    const tm = new ThemeManager();
    expect(tm.findValue('text', undefined, 'stroke')).toBe('#0a0a0a');
    expect(tm.findValue('selection', undefined, 'strokeWidth')).toBe(3);
  });

  it('findValue respects an explicit source path over targetPropertyMap', () => {
    const tm = new ThemeManager();
    expect(tm.findValue('toArrow', 'arrowheads')).toBe('Standard');
  });

  it('switching currentTheme changes what findValue resolves', () => {
    const tm = new ThemeManager();
    expect(tm.findValue('text', undefined, 'stroke')).toBe('#0a0a0a');
    tm.currentTheme = 'dark';
    expect(tm.findValue('text', undefined, 'stroke')).toBe('#f5f5f5');
  });

  it('falls back to defaultTheme when the current theme lacks a value', () => {
    const tm = new ThemeManager();
    tm.set('custom', { colors: {} });
    tm.currentTheme = 'custom';
    // 'custom' theme has no colors.text, so it falls back to defaultTheme ('light').
    expect(tm.findValue('text', undefined, 'stroke')).toBe('#0a0a0a');
  });

  it('set() merges into an existing theme without discarding other keys', () => {
    const tm = new ThemeManager();
    tm.set('light', { colors: { ...Themes.Light.colors, text: '#123456' } });
    expect(tm.findValue('text', undefined, 'stroke')).toBe('#123456');
    expect(tm.findValue('selection', undefined, 'strokeWidth')).toBe(3); // untouched
  });

  it('findTheme resolves "system" to light or dark based on matchMedia', () => {
    const tm = new ThemeManager();
    const original = globalThis.matchMedia;
    globalThis.matchMedia = ((query: string) => ({
      matches: query.includes('dark'),
    })) as unknown as typeof globalThis.matchMedia;
    expect(tm.findTheme('system')?.colors?.text).toBe('#f5f5f5');
    globalThis.matchMedia = original;
  });

  it('addDiagram/removeDiagram/updateAllThemes triggers Diagram.updateThemeBindings', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const tm = new ThemeManager();
    const spy = vi.spyOn(diagram, 'updateThemeBindings');
    tm.addDiagram(diagram);
    tm.currentTheme = 'dark';
    expect(spy).toHaveBeenCalled();
    tm.removeDiagram(diagram);
    spy.mockClear();
    tm.currentTheme = 'light';
    expect(spy).not.toHaveBeenCalled();
    diagram.destroy();
  });
});

describe('Diagram.themeManager', () => {
  it('is lazily created and auto-registers the diagram', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const tm = diagram.themeManager;
    expect(tm).toBeInstanceOf(ThemeManager);
    const spy = vi.spyOn(diagram, 'updateThemeBindings');
    tm.currentTheme = 'dark';
    expect(spy).toHaveBeenCalled();
    diagram.destroy();
  });
});

describe('GraphObject.theme/themeData + ThemeBinding end-to-end', () => {
  it('.theme("stroke", "text") resolves the literal theme key "text" from colors', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const $ = GraphObject.make;
    diagram.nodeTemplate = $(
      Panel,
      'Auto',
      $(Shape, 'rect', { name: 'bg' }).theme('stroke', 'text'),
    );
    diagram.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const node = diagram.findNodeForKey(1) as Node;
    const shape = node.findObject('bg') as Shape;
    expect(shape.stroke).toBe('#0a0a0a'); // Themes.Light.colors.text
    diagram.destroy();
  });

  it('switching currentTheme updates already-rendered parts via updateThemeBindings', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const $ = GraphObject.make;
    diagram.nodeTemplate = $(
      Panel,
      'Auto',
      $(Shape, 'rect', { name: 'bg' }).theme('stroke', 'text'),
    );
    diagram.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const node = diagram.findNodeForKey(1) as Node;
    const shape = node.findObject('bg') as Shape;
    expect(shape.stroke).toBe('#0a0a0a');

    diagram.themeManager.currentTheme = 'dark';
    expect(shape.stroke).toBe('#f5f5f5');
    diagram.destroy();
  });

  it('.themeData("fill", "state") resolves data.state\'s value as the theme key', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    diagram.themeManager.set('light', {
      colors: { ...Themes.Light.colors, urgent: '#ff0000', normal: '#00ff00' },
    });
    const $ = GraphObject.make;
    diagram.nodeTemplate = $(
      Panel,
      'Auto',
      $(Shape, 'rect', { name: 'bg' }).themeData('fill', 'state'),
    );
    diagram.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50, state: 'urgent' }],
    });
    const node = diagram.findNodeForKey(1) as Node;
    const shape = node.findObject('bg') as Shape;
    expect(shape.fill).toBe('#ff0000');
    diagram.destroy();
  });

  it('a themeConverter transforms the raw theme value before assignment', () => {
    const div = document.createElement('div');
    const diagram = new Diagram({ div });
    const $ = GraphObject.make;
    diagram.nodeTemplate = $(
      Panel,
      'Auto',
      $(Shape, 'rect', { name: 'bg' }).theme(
        'stroke',
        'selection',
        'numbers',
        undefined,
        (v) => `${v}px`,
      ),
    );
    diagram.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 100, height: 50 }],
    });
    const node = diagram.findNodeForKey(1) as Node;
    const shape = node.findObject('bg') as Shape;
    expect(shape.stroke).toBe('3px'); // Themes.Light.numbers.selection === 3
    diagram.destroy();
  });

  it('ThemeBinding.applyToModel is a no-op (always one-way)', () => {
    const b = new ThemeBinding('stroke', 'text');
    expect(b.applyToModel()).toBe(false);
  });

  it('ThemeBinding.copy() preserves themeSource/themeConverter/keyMode', () => {
    const conv = () => 'x';
    const original = new ThemeBinding('fill', 'state', 'colors', undefined, conv).ofData();
    const copy = original.copy();
    expect(copy.themeSource).toBe('colors');
    expect(copy.themeConverter).toBe(conv);
  });
});
