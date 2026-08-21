import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Animation } from '../../src/animation/Animation.ts';
import { AnimationManager, tween } from '../../src/animation/AnimationManager.ts';
import {
  easeInCubic,
  easeInOutCubic,
  easeInOutQuad,
  easeInQuad,
  easeOutCubic,
  easeOutQuad,
  getEasing,
  linear,
} from '../../src/animation/Easing.ts';

const rafCallbacks = new Map<number, FrameRequestCallback>();
let rafId = 0;

beforeAll(() => {
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => {
    rafId++;
    rafCallbacks.set(rafId, cb);
    return rafId;
  };
  globalThis.cancelAnimationFrame = (id: number) => {
    rafCallbacks.delete(id);
  };
});

afterAll(() => {
  rafCallbacks.clear();
});

describe('easing functions', () => {
  it('linear should be identity', () => {
    expect(linear(0)).toBe(0);
    expect(linear(0.5)).toBe(0.5);
    expect(linear(1)).toBe(1);
  });

  it('easeInQuad should be monotonic and bounded', () => {
    expect(easeInQuad(0)).toBe(0);
    expect(easeInQuad(0.5)).toBe(0.25);
    expect(easeInQuad(1)).toBe(1);
  });

  it('easeOutQuad should be monotonic', () => {
    expect(easeOutQuad(0)).toBe(0);
    expect(easeOutQuad(1)).toBe(1);
    expect(easeOutQuad(0.5)).toBe(0.75);
  });

  it('easeInOutQuad should be 0 at start, 1 at end', () => {
    expect(easeInOutQuad(0)).toBe(0);
    expect(easeInOutQuad(1)).toBe(1);
  });

  it('easeInCubic should cube', () => {
    expect(easeInCubic(0.5)).toBe(0.125);
  });

  it('easeOutCubic should be bounded', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });

  it('easeInOutCubic should be bounded', () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(1)).toBe(1);
  });

  it('getEasing should return correct functions', () => {
    expect(getEasing('linear')).toBe(linear);
    expect(getEasing('easeInQuad')).toBe(easeInQuad);
    expect(getEasing('easeOutQuad')).toBe(easeOutQuad);
    expect(getEasing('easeInOutQuad')).toBe(easeInOutQuad);
    expect(getEasing('easeInCubic')).toBe(easeInCubic);
    expect(getEasing('easeOutCubic')).toBe(easeOutCubic);
    expect(getEasing('easeInOutCubic')).toBe(easeInOutCubic);
    expect(getEasing('unknown' as never)).toBe(linear);
  });
});

describe('Animation', () => {
  it('should tween from start to end', () => {
    const values: number[] = [];
    const animation = new Animation({ value: 0 }, { value: 10 }, (v) => values.push(v.value ?? 0), {
      duration: 100,
      easing: 'linear',
    });

    animation.update(0);
    animation.update(50);
    animation.update(100);

    expect(values[0]).toBe(0);
    expect(values[1]).toBe(5);
    expect(values[2]).toBe(10);
  });

  it('should report finished after completion', () => {
    const animation = new Animation({ a: 0 }, { a: 1 }, () => {}, { duration: 100 });

    expect(animation.isFinished).toBe(false);
    animation.update(0);
    animation.update(200);
    expect(animation.isFinished).toBe(true);
  });

  it('should call onDone when complete', () => {
    let done = false;
    const animation = new Animation({ a: 0 }, { a: 1 }, () => {}, { duration: 100 }).onDone(() => {
      done = true;
    });
    animation.update(0);
    animation.update(200);
    expect(done).toBe(true);
  });

  it('should cancel and call onCancel', () => {
    let cancelled = false;
    const animation = new Animation({ a: 0 }, { a: 1 }, () => {}, { duration: 100 });
    animation.onCancelCallback(() => {
      cancelled = true;
    });
    animation.start();
    animation.cancel();
    expect(cancelled).toBe(true);
    expect(animation.isFinished).toBe(true);
  });

  it('should respect delay', () => {
    const values: number[] = [];
    const animation = new Animation(
      { value: 0 },
      { value: 100 },
      (v) => values.push(v.value ?? 0),
      { duration: 100, delay: 50 },
    );

    // First update initializes start time at 0
    animation.update(0); // elapsed = -50, no callback
    animation.update(50); // elapsed = 0, value 0
    animation.update(75); // elapsed = 25, value 25
    animation.update(150); // elapsed = 100, value 100

    expect(values).toEqual([0, 25, 100]);
  });

  it('should jump to final values on finishImmediately, without needing update() calls', () => {
    const values: Array<Record<string, number>> = [];
    let done = false;
    const animation = new Animation({ a: 0, b: 10 }, { a: 100, b: 20 }, (v) => values.push(v), {
      duration: 1000,
    }).onDone(() => {
      done = true;
    });

    animation.finishImmediately();

    expect(values).toEqual([{ a: 100, b: 20 }]);
    expect(animation.isFinished).toBe(true);
    expect(done).toBe(true);
  });

  it('finishImmediately should be a no-op if already finished', () => {
    const values: Array<Record<string, number>> = [];
    const animation = new Animation({ a: 0 }, { a: 1 }, (v) => values.push(v), { duration: 100 });
    animation.update(0);
    animation.update(200);
    values.length = 0;

    animation.finishImmediately();

    expect(values).toEqual([]);
  });

  it('should pause and resume', () => {
    const values: number[] = [];
    const animation = new Animation(
      { value: 0 },
      { value: 100 },
      (v) => values.push(v.value ?? 0),
      {
        duration: 100,
      },
    );

    animation.update(0); // value 0
    animation.update(25); // value 25
    animation.pause();
    animation.update(50); // paused, no progress
    animation.resume();
    animation.update(100); // start shifted to 50, elapsed 50, value 50
    animation.update(150); // elapsed 100, done

    expect(values).toEqual([0, 25, 50, 100]);
  });
});

describe('AnimationManager', () => {
  it('should not animate initially', () => {
    const manager = new AnimationManager();
    expect(manager.isAnimating).toBe(false);
    expect(manager.count).toBe(0);
  });

  it('should add animations', () => {
    const manager = new AnimationManager();
    manager.add(new Animation({ a: 0 }, { a: 1 }, () => {}, { duration: 100 }));
    expect(manager.count).toBe(1);
    expect(manager.isAnimating).toBe(true);
  });

  it('should cancel all animations', () => {
    const manager = new AnimationManager();
    manager.add(new Animation({ a: 0 }, { a: 1 }, () => {}, { duration: 100 }));
    manager.cancelAll();
    expect(manager.count).toBe(0);
    expect(manager.isAnimating).toBe(false);
  });

  it('should animate with animate method', () => {
    const manager = new AnimationManager();
    const values: number[] = [];
    const animation = manager.animate(
      { value: 0 },
      { value: 10 },
      (v) => values.push(v.value ?? 0),
      { duration: 100 },
    );
    expect(animation).toBeInstanceOf(Animation);

    animation.update(0);
    animation.update(50);
    expect(values[values.length - 1]).toBe(5);
  });

  it('should support tween helper', () => {
    const manager = new AnimationManager();
    const values: number[] = [];
    const animation = tween(manager, 0, 10, 100, (v) => values.push(v), undefined, 'linear');
    expect(animation).toBeInstanceOf(Animation);

    animation.update(0);
    animation.update(50);
    expect(values[values.length - 1]).toBe(5);
  });

  it('should default isEnabled to true', () => {
    const manager = new AnimationManager();
    expect(manager.isEnabled).toBe(true);
  });

  it('when isEnabled is false, added animations jump straight to their final values', () => {
    const manager = new AnimationManager();
    manager.isEnabled = false;
    const values: number[] = [];
    manager.animate({ value: 0 }, { value: 10 }, (v) => values.push(v.value ?? 0), {
      duration: 1000,
    });

    expect(values).toEqual([10]);
    expect(manager.isAnimating).toBe(false);
    expect(manager.count).toBe(0);
  });

  it('when isEnabled is false, still fires AnimationStarting/AnimationFinished', () => {
    const manager = new AnimationManager();
    manager.isEnabled = false;
    const events: string[] = [];
    manager.diagram = { fireDiagramEvent: (type) => events.push(type) };

    manager.animate({ value: 0 }, { value: 10 }, () => {}, { duration: 1000 });

    expect(events).toEqual(['AnimationStarting', 'AnimationFinished']);
  });
});
