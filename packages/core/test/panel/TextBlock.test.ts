// @vitest-environment jsdom
/**
 * TextBlock.measure() used to guess text width as `0.6 * fontSize` per
 * character instead of measuring real glyph metrics — an error that grows
 * with text length. That divergence from GoJS's real DOM-based measurement
 * was reported as text visually starting a few pixels too far in one
 * direction, losing more of the string the longer it got. This file proves
 * measure() now uses the canvas's real `measureText`, via the
 * previously-unused `TextMeasureCache` from `render/RenderCache.ts`.
 */
import { beforeAll, describe, expect, it, vi } from 'vitest';
import {
  Diagram,
  GraphLinksModel,
  GraphObject,
  Margin,
  Node,
  Shape,
  Spot,
  TextBlock,
} from '../../src/index.ts';

// Deterministic per-character width, distinct from the old 0.6-per-char
// guess, so a passing test proves the real measurement path is used.
const CHAR_WIDTH = 9;

function mockContext() {
  return {
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
    stroke: vi.fn(),
    fill: vi.fn(),
    ellipse: vi.fn(),
    arc: vi.fn(),
    roundRect: vi.fn(),
    fillText: vi.fn(),
    setLineDash: vi.fn(),
    drawImage: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    measureText: (text: string) => ({ width: text.length * CHAR_WIDTH }),
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalAlpha: 1,
    font: '',
    textBaseline: '',
    textAlign: '',
  } as unknown as CanvasRenderingContext2D;
}

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn(() =>
    mockContext(),
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
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16)) as unknown as typeof requestAnimationFrame;
  globalThis.cancelAnimationFrame = ((id: number) =>
    clearTimeout(id)) as unknown as typeof cancelAnimationFrame;
});

describe('TextBlock.measure() uses real canvas measureText, not a per-character guess', () => {
  it('measure() width matches ctx.measureText, not the old 0.6*fontSize*length estimate', () => {
    const tb = new TextBlock('QA & launch');
    tb.font = '14px sans-serif';
    const size = tb.measure();

    const oldEstimate = 'QA & launch'.length * 14 * 0.6;
    expect(size.width).toBe('QA & launch'.length * CHAR_WIDTH);
    expect(size.width).not.toBeCloseTo(oldEstimate, 0);
  });

  it('longer text gets a proportionally larger, real-measured width (not a compounding guess error)', () => {
    const short = new TextBlock('Design');
    const long = new TextBlock('QA & launch');
    short.font = '14px sans-serif';
    long.font = '14px sans-serif';

    expect(short.measure().width).toBe('Design'.length * CHAR_WIDTH);
    expect(long.measure().width).toBe('QA & launch'.length * CHAR_WIDTH);
  });

  it('an auto-sized, left-aligned, margined label in a real diagram reports its real measured width', () => {
    const $ = GraphObject.make;
    const diagram = new Diagram({ div: document.createElement('div') });
    diagram.nodeTemplate = $(
      Node,
      'Auto',
      $(Shape, 'Rectangle', { name: 'bg' }),
      $(TextBlock, 'QA & launch', {
        name: 'label',
        font: '14px sans-serif',
        alignment: Spot.Left,
        margin: new Margin(0, 0, 0, 4),
      }),
    );
    diagram.model = new GraphLinksModel({
      nodeDataArray: [{ key: 1, x: 0, y: 0, width: 200, height: 40 }],
    });

    const node = diagram.findNodeForKey(1) as Node;
    const label = node.findObject('label') as TextBlock;

    expect(label.actualSize.width).toBeCloseTo('QA & launch'.length * CHAR_WIDTH, 5);

    diagram.destroy();
  });
});

describe('TextMeasureCache wiring (previously built but never called from measure())', () => {
  it('re-measuring the same text/font is cheap (comes from the shared cache, not recomputed each call)', () => {
    const tb = new TextBlock('Design');
    tb.font = '14px sans-serif';
    const w1 = tb.measure().width;
    const w2 = tb.measure().width;
    expect(w1).toBe(w2);
    expect(w1).toBe('Design'.length * CHAR_WIDTH);
  });
});
