import type { Rect } from '../geometry/Rect.ts';

/**
 * Compute orthogonal (manhattan) path points between two ports.
 * Produces L-shaped or Z-shaped routes with optional corner rounding.
 */
export function routeOrthogonal(
  from: { x: number; y: number },
  to: { x: number; y: number },
  fromNode: Rect,
  toNode: Rect,
  corner: number,
): Array<{ x: number; y: number }> {
  // Determine best exit direction from the from-node
  const fromDir = getExitDirection(from, fromNode, to);
  const toDir = getEntryDirection(to, toNode, from);

  const points: Array<{ x: number; y: number }> = [from];

  // Build orthogonal path based on exit/entry directions
  if (fromDir === 'right' || fromDir === 'left') {
    const midX = (from.x + to.x) / 2;
    if (toDir === 'top' || toDir === 'bottom') {
      // L-shape: horizontal then vertical
      points.push({ x: midX, y: from.y });
      points.push({ x: midX, y: to.y });
    } else {
      // Z-shape: horizontal, vertical, horizontal
      const midY = (from.y + to.y) / 2;
      points.push({ x: midX, y: from.y });
      points.push({ x: midX, y: midY });
      points.push({ x: to.x, y: midY });
    }
  } else {
    const midY = (from.y + to.y) / 2;
    if (toDir === 'left' || toDir === 'right') {
      // L-shape: vertical then horizontal
      points.push({ x: from.x, y: midY });
      points.push({ x: to.x, y: midY });
    } else {
      // Z-shape: vertical, horizontal, vertical
      const midX = (from.x + to.x) / 2;
      points.push({ x: from.x, y: midY });
      points.push({ x: midX, y: midY });
      points.push({ x: midX, y: to.y });
    }
  }

  points.push(to);

  // Apply corner rounding if requested
  if (corner > 0 && points.length > 2) {
    return roundCorners(points, corner);
  }

  return points;
}

/**
 * Compute curved (bezier) path points between two ports.
 * Returns cubic bezier control points for smooth curves.
 */
export function routeCurved(
  from: { x: number; y: number },
  to: { x: number; y: number },
  fromNode: Rect,
  toNode: Rect,
): Array<{ x: number; y: number }> {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);

  // Determine exit/entry directions
  const fromDir = getExitDirection(from, fromNode, to);
  const toDir = getEntryDirection(to, toNode, from);

  // Control point distance proportional to link length
  const cpDist = Math.max(50, dist * 0.4);

  const cp1 = getControlPoint(from, fromDir, cpDist);
  const cp2 = getControlPoint(to, toDir, cpDist);

  // Return as array of sampled points along the bezier curve
  return sampleBezier(from, cp1, cp2, to, 20);
}

/**
 * Compute straight path points between two ports.
 */
export function routeStraight(
  from: { x: number; y: number },
  to: { x: number; y: number },
): Array<{ x: number; y: number }> {
  return [from, to];
}

/**
 * Compute the position for a link label along the path.
 */
export function computeLabelPosition(
  points: Array<{ x: number; y: number }>,
  segmentIndex: number,
  labelOffset: number,
  labelSide: 'top' | 'bottom' | 'left' | 'right' | 'auto',
): { x: number; y: number; angle: number } {
  if (points.length < 2) {
    const p = points[0] ?? { x: 0, y: 0 };
    return { x: p.x, y: p.y, angle: 0 };
  }

  // Determine which segment to use
  let segIdx: number;
  if (segmentIndex >= 0 && segmentIndex < points.length - 1) {
    segIdx = segmentIndex;
  } else {
    // Default to middle segment
    segIdx = Math.floor((points.length - 1) / 2);
  }

  const a = points[segIdx];
  const b = points[segIdx + 1];
  if (!a || !b) return { x: 0, y: 0, angle: 0 };

  // Midpoint of the segment
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;

  // Direction of the segment
  const segDx = b.x - a.x;
  const segDy = b.y - a.y;
  const segAngle = Math.atan2(segDy, segDx);

  // Normal direction (perpendicular to segment)
  const normalAngle = segAngle + Math.PI / 2;

  // Determine offset direction based on labelSide
  let offsetAngle: number;
  if (labelSide === 'auto') {
    // Default to above the link
    offsetAngle = normalAngle;
  } else if (labelSide === 'top') {
    offsetAngle = -Math.PI / 2; // Up
  } else if (labelSide === 'bottom') {
    offsetAngle = Math.PI / 2; // Down
  } else if (labelSide === 'left') {
    offsetAngle = Math.PI; // Left
  } else {
    offsetAngle = 0; // Right
  }

  return {
    x: mx + Math.cos(offsetAngle) * labelOffset,
    y: my + Math.sin(offsetAngle) * labelOffset,
    angle: (segAngle * 180) / Math.PI,
  };
}

// --- Internal helpers ---

type Direction = 'top' | 'bottom' | 'left' | 'right';

function getExitDirection(
  port: { x: number; y: number },
  node: Rect,
  target: { x: number; y: number },
): Direction {
  const cx = node.x + node.width / 2;
  const cy = node.y + node.height / 2;
  const dx = target.x - cx;
  const dy = target.y - cy;

  // If port is on an edge of the node, use that edge direction
  const eps = 2;
  if (Math.abs(port.x - node.x) < eps) return 'left';
  if (Math.abs(port.x - (node.x + node.width)) < eps) return 'right';
  if (Math.abs(port.y - node.y) < eps) return 'top';
  if (Math.abs(port.y - (node.y + node.height)) < eps) return 'bottom';

  // Otherwise, choose based on relative position
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? 'right' : 'left';
  }
  return dy > 0 ? 'bottom' : 'top';
}

function getEntryDirection(
  port: { x: number; y: number },
  node: Rect,
  source: { x: number; y: number },
): Direction {
  const cx = node.x + node.width / 2;
  const cy = node.y + node.height / 2;
  const dx = source.x - cx;
  const dy = source.y - cy;

  const eps = 2;
  if (Math.abs(port.x - node.x) < eps) return 'left';
  if (Math.abs(port.x - (node.x + node.width)) < eps) return 'right';
  if (Math.abs(port.y - node.y) < eps) return 'top';
  if (Math.abs(port.y - (node.y + node.height)) < eps) return 'bottom';

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? 'right' : 'left';
  }
  return dy > 0 ? 'bottom' : 'top';
}

function getControlPoint(
  port: { x: number; y: number },
  dir: Direction,
  dist: number,
): { x: number; y: number } {
  switch (dir) {
    case 'top':
      return { x: port.x, y: port.y - dist };
    case 'bottom':
      return { x: port.x, y: port.y + dist };
    case 'left':
      return { x: port.x - dist, y: port.y };
    case 'right':
      return { x: port.x + dist, y: port.y };
  }
}

function sampleBezier(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  segments: number,
): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;

    points.push({
      x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
      y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
    });
  }
  return points;
}

function roundCorners(
  points: Array<{ x: number; y: number }>,
  radius: number,
): Array<{ x: number; y: number }> {
  if (points.length < 3) return points;

  const result: Array<{ x: number; y: number }> = [];
  const first = points[0];
  if (first) result.push(first);

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];
    if (!prev || !curr || !next) continue;

    // Vectors from curr to prev and curr to next
    const dx1 = prev.x - curr.x;
    const dy1 = prev.y - curr.y;
    const dx2 = next.x - curr.x;
    const dy2 = next.y - curr.y;

    const len1 = Math.hypot(dx1, dy1);
    const len2 = Math.hypot(dx2, dy2);

    if (len1 === 0 || len2 === 0) {
      result.push(curr);
      continue;
    }

    const r = Math.min(radius, len1 / 2, len2 / 2);

    // Points at distance r from the corner along each leg
    result.push({
      x: curr.x + (dx1 / len1) * r,
      y: curr.y + (dy1 / len1) * r,
    });
    result.push({
      x: curr.x + (dx2 / len2) * r,
      y: curr.y + (dy2 / len2) * r,
    });
  }

  const last = points[points.length - 1];
  if (last) result.push(last);
  return result;
}
