import { describe, expect, it } from 'vitest';
import { Rect } from '../../src/geometry/Rect.ts';
import { createRectPool, RectPool } from '../../src/spatial/RectPool.ts';

describe('RectPool', () => {
  it('should create with defaults', () => {
    const pool = new RectPool();
    expect(pool.size).toBe(0);
  });

  it('should create via factory', () => {
    const pool = createRectPool(100);
    expect(pool).toBeInstanceOf(RectPool);
  });

  it('should acquire a rect', () => {
    const pool = new RectPool();
    const rect = pool.acquire(10, 20, 30, 40);
    expect(rect).toBeInstanceOf(Rect);
    expect(rect.x).toBe(10);
    expect(rect.y).toBe(20);
    expect(rect.width).toBe(30);
    expect(rect.height).toBe(40);
  });

  it('should reuse released rects', () => {
    const pool = new RectPool();
    const rect1 = pool.acquire(1, 2, 3, 4);
    pool.release(rect1);
    expect(pool.size).toBe(1);

    const rect2 = pool.acquire(5, 6, 7, 8);
    expect(rect2).toBe(rect1); // Same instance reused
    expect(rect2.x).toBe(5); // Values updated
    expect(pool.size).toBe(0);
  });

  it('should respect max pool size', () => {
    const pool = new RectPool(2);
    const r1 = pool.acquire(0, 0, 1, 1);
    const r2 = pool.acquire(0, 0, 1, 1);
    const r3 = pool.acquire(0, 0, 1, 1);

    pool.release(r1);
    pool.release(r2);
    pool.release(r3);

    expect(pool.size).toBe(2);
  });

  it('should clear the pool', () => {
    const pool = new RectPool();
    const rect = pool.acquire(0, 0, 1, 1);
    pool.release(rect);
    expect(pool.size).toBe(1);
    pool.clear();
    expect(pool.size).toBe(0);
  });
});
