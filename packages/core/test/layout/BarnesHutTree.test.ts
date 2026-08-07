import { describe, expect, it } from 'vitest';
import { type BarnesHutBody, BarnesHutTree } from '../../src/layout/BarnesHutTree.ts';

/** Exact O(n²) reference: the same "inverse-square-ish" repulsion the tree approximates. */
function naiveRepulsion(
  bodies: readonly BarnesHutBody[],
  self: BarnesHutBody,
  strength: (dist: number, mass: number) => number,
): { fx: number; fy: number } {
  let fx = 0;
  let fy = 0;
  for (const other of bodies) {
    if (other === self) continue;
    const dx = self.x - other.x;
    const dy = self.y - other.y;
    const dist = Math.max(Math.hypot(dx, dy), 0.1);
    const f = strength(dist, other.mass);
    fx += (f * dx) / dist;
    fy += (f * dy) / dist;
  }
  return { fx, fy };
}

const strength = (dist: number, mass: number): number => (100 * 100 * mass) / dist;

describe('BarnesHutTree', () => {
  it('pushes two bodies apart, away from each other', () => {
    const a: BarnesHutBody = { x: 0, y: 0, mass: 1 };
    const b: BarnesHutBody = { x: 100, y: 0, mass: 1 };
    const tree = BarnesHutTree.build([a, b]);

    const outA = { fx: 0, fy: 0 };
    tree.accumulateRepulsion(a, 0.9, strength, outA);
    // a is repelled by b (to its right) -> pushed left (negative x).
    expect(outA.fx).toBeLessThan(0);
    expect(outA.fy).toBeCloseTo(0, 5);

    const outB = { fx: 0, fy: 0 };
    tree.accumulateRepulsion(b, 0.9, strength, outB);
    expect(outB.fx).toBeGreaterThan(0);
  });

  it('a lone body exerts no force on itself', () => {
    const a: BarnesHutBody = { x: 0, y: 0, mass: 1 };
    const tree = BarnesHutTree.build([a]);
    const out = { fx: 0, fy: 0 };
    tree.accumulateRepulsion(a, 0.9, strength, out);
    expect(out.fx).toBe(0);
    expect(out.fy).toBe(0);
  });

  it('handles empty input without throwing', () => {
    const tree = BarnesHutTree.build([]);
    const out = { fx: 0, fy: 0 };
    expect(() =>
      tree.accumulateRepulsion({ x: 0, y: 0, mass: 1 }, 0.9, strength, out),
    ).not.toThrow();
  });

  it('does not produce NaN/Infinity for exactly-coincident bodies', () => {
    const a: BarnesHutBody = { x: 50, y: 50, mass: 1 };
    const b: BarnesHutBody = { x: 50, y: 50, mass: 1 };
    const tree = BarnesHutTree.build([a, b]);
    const out = { fx: 0, fy: 0 };
    tree.accumulateRepulsion(a, 0.9, strength, out);
    expect(Number.isFinite(out.fx)).toBe(true);
    expect(Number.isFinite(out.fy)).toBe(true);
  });

  it('with theta=0 (no approximation), matches the exact O(n²) sum closely', () => {
    // A deterministic pseudo-random scattering of bodies.
    const bodies: BarnesHutBody[] = [];
    for (let i = 0; i < 60; i++) {
      const angle = i * 2.399963229728653;
      bodies.push({ x: Math.cos(angle) * (i * 7), y: Math.sin(angle) * (i * 5), mass: 1 });
    }
    const tree = BarnesHutTree.build(bodies);

    for (const body of bodies.slice(0, 10)) {
      const exact = naiveRepulsion(bodies, body, strength);
      const approx = { fx: 0, fy: 0 };
      tree.accumulateRepulsion(body, 0, strength, approx); // theta=0 forces full recursion to leaves
      expect(approx.fx).toBeCloseTo(exact.fx, 3);
      expect(approx.fy).toBeCloseTo(exact.fy, 3);
    }
  });

  it('a distant cluster approximated with theta=0.9 stays close to the exact force (within ~15%)', () => {
    // A tight cluster of 20 bodies far away from a single lone body.
    const bodies: BarnesHutBody[] = [{ x: 0, y: 0, mass: 1 }];
    for (let i = 0; i < 20; i++) {
      bodies.push({ x: 2000 + (i % 5), y: 2000 + Math.floor(i / 5), mass: 1 });
    }
    const lone = bodies[0]!;

    const exact = naiveRepulsion(bodies, lone, strength);
    const tree = BarnesHutTree.build(bodies);
    const approx = { fx: 0, fy: 0 };
    tree.accumulateRepulsion(lone, 0.9, strength, approx);

    const exactMag = Math.hypot(exact.fx, exact.fy);
    const approxMag = Math.hypot(approx.fx, approx.fy);
    expect(Math.abs(approxMag - exactMag) / exactMag).toBeLessThan(0.15);
  });

  it('scales sub-quadratically: 4x the bodies takes well under 4x the time', () => {
    function timeFor(n: number): number {
      const bodies: BarnesHutBody[] = [];
      for (let i = 0; i < n; i++) {
        bodies.push({ x: (i % 100) * 10, y: Math.floor(i / 100) * 10, mass: 1 });
      }
      const start = performance.now();
      const tree = BarnesHutTree.build(bodies);
      for (const b of bodies) {
        const out = { fx: 0, fy: 0 };
        tree.accumulateRepulsion(b, 0.9, strength, out);
      }
      return performance.now() - start;
    }

    timeFor(500); // warm up (JIT)
    const small = timeFor(2000);
    const large = timeFor(8000); // 4x the bodies

    // An O(n^2) algorithm would take ~16x as long for 4x the input;
    // O(n log n) should take well under 4x. Generous bound to avoid flakiness.
    expect(large).toBeLessThan(small * 8 + 50);
  });
});
