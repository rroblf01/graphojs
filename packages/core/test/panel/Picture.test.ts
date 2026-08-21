// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { Picture } from '../../src/panel/Picture.ts';

function mockContext() {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    drawImage: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

describe('Picture', () => {
  it('has no source by default', () => {
    const pic = new Picture();
    expect(pic.source).toBeNull();
  });

  it('accepts a source via the constructor', () => {
    const pic = new Picture('https://example.com/a.png');
    expect(pic.source).toBe('https://example.com/a.png');
  });

  it('source setter and setSource() fluent method both update the source', () => {
    const pic = new Picture();
    pic.source = 'a.png';
    expect(pic.source).toBe('a.png');

    const result = pic.setSource('b.png');
    expect(result).toBe(pic); // fluent: returns `this`
    expect(pic.source).toBe('b.png');
  });

  it('draw() is a no-op when there is no source', () => {
    const pic = new Picture();
    const ctx = mockContext();
    pic.draw(ctx, 0, 0, 100, 100);
    expect(ctx.drawImage).not.toHaveBeenCalled();
    expect(ctx.save).not.toHaveBeenCalled();
  });

  it('draw() calls drawImage directly for an HTMLCanvasElement source', () => {
    const source = document.createElement('canvas');
    const pic = new Picture(source);
    const ctx = mockContext();

    pic.draw(ctx, 10, 20, 200, 150);
    expect(ctx.drawImage).toHaveBeenCalledWith(source, 10, 20, 200, 150);
  });

  it('draw() calls drawImage directly for an already-loaded HTMLImageElement source', () => {
    const source = document.createElement('img');
    const pic = new Picture(source);
    const ctx = mockContext();

    pic.draw(ctx, 0, 0, 50, 50);
    expect(ctx.drawImage).toHaveBeenCalledWith(source, 0, 0, 50, 50);
  });

  it('draw() with a string source and a not-yet-loaded image defers to onload', () => {
    const pic = new Picture('a.png');
    const ctx = mockContext();

    // jsdom Image()s are never "complete" with a real naturalWidth for a
    // fake src, so this exercises the onload-deferred branch.
    expect(() => pic.draw(ctx, 0, 0, 40, 40)).not.toThrow();
    expect(ctx.drawImage).not.toHaveBeenCalled();
  });

  describe('natural size tracking', () => {
    it('picks up an HTMLCanvasElement source width/height', () => {
      const source = document.createElement('canvas');
      source.width = 300;
      source.height = 150;
      const pic = new Picture();
      pic.source = source;

      // No explicit width/height set on the Picture itself, so measure()
      // falls back to the source's natural size.
      const size = pic.measure();
      expect(size.width).toBe(300);
      expect(size.height).toBe(150);
    });

    it('picks up an HTMLImageElement source naturalWidth/naturalHeight', () => {
      const source = document.createElement('img');
      Object.defineProperty(source, 'naturalWidth', { value: 640 });
      Object.defineProperty(source, 'naturalHeight', { value: 480 });
      const pic = new Picture();
      pic.source = source;

      const size = pic.measure();
      expect(size.width).toBe(640);
      expect(size.height).toBe(480);
    });

    it('an HTMLImageElement with naturalWidth 0 (not yet loaded) does not set a natural size', () => {
      const source = document.createElement('img'); // naturalWidth defaults to 0 in jsdom
      const pic = new Picture();
      pic.source = source;

      // Falls all the way through to the 50x50 default.
      const size = pic.measure();
      expect(size.width).toBe(50);
      expect(size.height).toBe(50);
    });

    it('resets the natural size when the source is cleared', () => {
      const source = document.createElement('canvas');
      source.width = 300;
      source.height = 150;
      const pic = new Picture();
      pic.source = source;
      expect(pic.measure().width).toBe(300);

      pic.source = null;
      expect(pic.measure().width).toBe(50); // back to the default
    });
  });

  describe('measure()', () => {
    it('prefers an explicitly-set width/height over the natural size', () => {
      const source = document.createElement('canvas');
      source.width = 300;
      source.height = 150;
      const pic = new Picture(source);
      pic.width = 20;
      pic.height = 10;

      const size = pic.measure();
      expect(size.width).toBe(20);
      expect(size.height).toBe(10);
    });

    it('falls back to a 50x50 default with no source and no explicit size', () => {
      const pic = new Picture();
      const size = pic.measure();
      expect(size.width).toBe(50);
      expect(size.height).toBe(50);
    });
  });
});
