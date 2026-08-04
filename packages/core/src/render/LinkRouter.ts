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

// --- Obstacle Avoidance Routing ---

/**
 * A rectangular obstacle (typically a node) for routing.
 */
export interface RoutingObstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Route a link around obstacles using a simplified visibility-graph approach.
 * Produces orthogonal paths that avoid passing through obstacle rects.
 */
export function routeOrthogonalAvoidingObstacles(
  from: { x: number; y: number },
  to: { x: number; y: number },
  fromNode: Rect,
  toNode: Rect,
  obstacles: RoutingObstacle[],
  corner: number,
): Array<{ x: number; y: number }> {
  // Filter out the source and target nodes from obstacles
  const filteredObstacles = obstacles.filter((obs) => {
    const obsRect = { x: obs.x, y: obs.y, width: obs.width, height: obs.height } as Rect;
    return !rectsOverlap(obsRect, fromNode) && !rectsOverlap(obsRect, toNode);
  });

  // Check if the direct path is blocked
  if (!isPathBlocked(from, to, filteredObstacles)) {
    // Direct path is clear, use standard orthogonal routing
    return routeOrthogonal(from, to, fromNode, toNode, corner);
  }

  // Path is blocked, route around obstacles
  const fromDir = getExitDirection(from, fromNode, to);
  const toDir = getEntryDirection(to, toNode, from);

  // Find the bounding box of all obstacles
  const obsBounds = getObstaclesBounds(filteredObstacles);

  // Try routing above, below, left, and right of obstacles
  const routes: Array<{ points: Array<{ x: number; y: number }>; cost: number }> = [];

  // Route above obstacles
  const aboveY = obsBounds.y - 20;
  const routeAbove = buildDetourRoute(from, to, fromDir, toDir, aboveY, 'horizontal');
  if (routeAbove.length > 0 && !isPathBlockedMulti(routeAbove, filteredObstacles)) {
    routes.push({ points: routeAbove, cost: routeCost(routeAbove) });
  }

  // Route below obstacles
  const belowY = obsBounds.y + obsBounds.height + 20;
  const routeBelow = buildDetourRoute(from, to, fromDir, toDir, belowY, 'horizontal');
  if (routeBelow.length > 0 && !isPathBlockedMulti(routeBelow, filteredObstacles)) {
    routes.push({ points: routeBelow, cost: routeCost(routeBelow) });
  }

  // Route to the left of obstacles
  const leftX = obsBounds.x - 20;
  const routeLeft = buildDetourRoute(from, to, fromDir, toDir, leftX, 'vertical');
  if (routeLeft.length > 0 && !isPathBlockedMulti(routeLeft, filteredObstacles)) {
    routes.push({ points: routeLeft, cost: routeCost(routeLeft) });
  }

  // Route to the right of obstacles
  const rightX = obsBounds.x + obsBounds.width + 20;
  const routeRight = buildDetourRoute(from, to, fromDir, toDir, rightX, 'vertical');
  if (routeRight.length > 0 && !isPathBlockedMulti(routeRight, filteredObstacles)) {
    routes.push({ points: routeRight, cost: routeCost(routeRight) });
  }

  // Pick the route with the lowest cost
  if (routes.length > 0) {
    routes.sort((a, b) => a.cost - b.cost);
    const best = routes[0];
    if (corner > 0 && best.points.length > 2) {
      return roundCorners(best.points, corner);
    }
    return best.points;
  }

  // Fallback to standard orthogonal routing
  return routeOrthogonal(from, to, fromNode, toNode, corner);
}

/**
 * Check if a straight line segment between two points intersects any obstacle.
 */
function isPathBlocked(
  from: { x: number; y: number },
  to: { x: number; y: number },
  obstacles: RoutingObstacle[],
): boolean {
  for (const obs of obstacles) {
    if (segmentIntersectsRect(from, to, obs)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if a multi-segment path intersects any obstacle.
 */
function isPathBlockedMulti(
  points: Array<{ x: number; y: number }>,
  obstacles: RoutingObstacle[],
): boolean {
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (isPathBlocked(a, b, obstacles)) {
      return true;
    }
  }
  return false;
}

/**
 * Build a detour route around obstacles.
 */
function buildDetourRoute(
  from: { x: number; y: number },
  to: { x: number; y: number },
  _fromDir: string,
  _toDir: string,
  detourPos: number,
  axis: 'horizontal' | 'vertical',
): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [from];

  if (axis === 'horizontal') {
    // Route horizontally to detour Y position, then vertically, then horizontally to target
    points.push({ x: from.x, y: detourPos });
    points.push({ x: to.x, y: detourPos });
  } else {
    // Route vertically to detour X position, then horizontally, then vertically to target
    points.push({ x: detourPos, y: from.y });
    points.push({ x: detourPos, y: to.y });
  }

  points.push(to);
  return points;
}

/**
 * Calculate the total cost (length) of a route.
 */
function routeCost(points: Array<{ x: number; y: number }>): number {
  let cost = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    cost += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return cost;
}

/**
 * Get the bounding box of all obstacles.
 */
function getObstaclesBounds(obstacles: RoutingObstacle[]): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  if (obstacles.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const obs of obstacles) {
    minX = Math.min(minX, obs.x);
    minY = Math.min(minY, obs.y);
    maxX = Math.max(maxX, obs.x + obs.width);
    maxY = Math.max(maxY, obs.y + obs.height);
  }

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

/**
 * Check if two rects overlap.
 */
function rectsOverlap(a: Rect, b: Rect): boolean {
  return !(
    a.x + a.width < b.x ||
    b.x + b.width < a.x ||
    a.y + a.height < b.y ||
    b.y + b.height < a.y
  );
}

/**
 * Check if a line segment intersects a rectangle.
 */
function segmentIntersectsRect(
  from: { x: number; y: number },
  to: { x: number; y: number },
  rect: RoutingObstacle,
): boolean {
  // Check if either endpoint is inside the rect
  if (
    from.x >= rect.x &&
    from.x <= rect.x + rect.width &&
    from.y >= rect.y &&
    from.y <= rect.y + rect.height
  ) {
    return true;
  }
  if (
    to.x >= rect.x &&
    to.x <= rect.x + rect.width &&
    to.y >= rect.y &&
    to.y <= rect.y + rect.height
  ) {
    return true;
  }

  // Check if segment intersects any edge of the rect
  const edges: Array<[{ x: number; y: number }, { x: number; y: number }]> = [
    [
      { x: rect.x, y: rect.y },
      { x: rect.x + rect.width, y: rect.y },
    ],
    [
      { x: rect.x + rect.width, y: rect.y },
      { x: rect.x + rect.width, y: rect.y + rect.height },
    ],
    [
      { x: rect.x + rect.width, y: rect.y + rect.height },
      { x: rect.x, y: rect.y + rect.height },
    ],
    [
      { x: rect.x, y: rect.y + rect.height },
      { x: rect.x, y: rect.y },
    ],
  ];

  for (const [a, b] of edges) {
    if (segmentsIntersect(from, to, a, b)) {
      return true;
    }
  }

  return false;
}

/**
 * Check if two line segments intersect.
 */
function segmentsIntersect(
  a1: { x: number; y: number },
  a2: { x: number; y: number },
  b1: { x: number; y: number },
  b2: { x: number; y: number },
): boolean {
  const d1 = direction(b1, b2, a1);
  const d2 = direction(b1, b2, a2);
  const d3 = direction(a1, a2, b1);
  const d4 = direction(a1, a2, b2);

  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
    return true;
  }

  if (d1 === 0 && onSegment(b1, a1, b2)) return true;
  if (d2 === 0 && onSegment(b1, a2, b2)) return true;
  if (d3 === 0 && onSegment(a1, b1, a2)) return true;
  if (d4 === 0 && onSegment(a1, b2, a2)) return true;

  return false;
}

function direction(
  a: { x: number; y: number },
  b: { x: number; y: number },
  c: { x: number; y: number },
): number {
  return (c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x);
}

function onSegment(
  a: { x: number; y: number },
  b: { x: number; y: number },
  c: { x: number; y: number },
): boolean {
  return (
    b.x <= Math.max(a.x, c.x) &&
    b.x >= Math.min(a.x, c.x) &&
    b.y <= Math.max(a.y, c.y) &&
    b.y >= Math.min(a.y, c.y)
  );
}

// --- Jumpover Rendering ---

/**
 * Compute jumpover gap points for a link crossing another link.
 * Returns the points where the link should be split to create a jump.
 */
export function computeJumpoverPoints(
  linkPoints: Array<{ x: number; y: number }>,
  crossingLinkPoints: Array<{ x: number; y: number }>,
  _gapSize: number,
): Array<{ index: number; position: { x: number; y: number } }> {
  const jumps: Array<{ index: number; position: { x: number; y: number } }> = [];

  for (let i = 0; i < linkPoints.length - 1; i++) {
    const a1 = linkPoints[i];
    const a2 = linkPoints[i + 1];

    for (let j = 0; j < crossingLinkPoints.length - 1; j++) {
      const b1 = crossingLinkPoints[j];
      const b2 = crossingLinkPoints[j + 1];

      const intersection = lineLineIntersection(a1, a2, b1, b2);
      if (intersection) {
        jumps.push({ index: i, position: intersection });
      }
    }
  }

  return jumps;
}

/**
 * Find the intersection point of two line segments.
 */
function lineLineIntersection(
  a1: { x: number; y: number },
  a2: { x: number; y: number },
  b1: { x: number; y: number },
  b2: { x: number; y: number },
): { x: number; y: number } | null {
  const d1x = a2.x - a1.x;
  const d1y = a2.y - a1.y;
  const d2x = b2.x - b1.x;
  const d2y = b2.y - b1.y;

  const cross = d1x * d2y - d1y * d2x;
  if (Math.abs(cross) < 1e-10) return null;

  const dx = b1.x - a1.x;
  const dy = b1.y - a1.y;
  const t = (dx * d2y - dy * d2x) / cross;

  if (t < 0 || t > 1) return null;

  return {
    x: a1.x + t * d1x,
    y: a1.y + t * d1y,
  };
}

/**
 * Split a path at jumpover points, creating gaps.
 */
export function splitPathAtJumps(
  points: Array<{ x: number; y: number }>,
  jumps: Array<{ index: number; position: { x: number; y: number } }>,
  gapSize: number,
): Array<{ x: number; y: number }> {
  if (jumps.length === 0) return points;

  const result: Array<{ x: number; y: number }> = [];
  let lastEnd = 0;

  for (const jump of jumps) {
    const segStart = points[jump.index];
    const segEnd = points[jump.index + 1];
    const segDx = segEnd.x - segStart.x;
    const segDy = segEnd.y - segStart.y;
    const segLen = Math.hypot(segDx, segDy);
    if (segLen === 0) continue;

    // Calculate positions for the gap
    const t =
      ((jump.position.x - segStart.x) * segDx + (jump.position.y - segStart.y) * segDy) /
      (segLen * segLen);
    const gapStart = {
      x: segStart.x + segDx * Math.max(0, t - gapSize / segLen),
      y: segStart.y + segDy * Math.max(0, t - gapSize / segLen),
    };
    const gapEnd = {
      x: segStart.x + segDx * Math.min(1, t + gapSize / segLen),
      y: segStart.y + segDy * Math.min(1, t + gapSize / segLen),
    };

    // Add points up to the gap
    for (let i = lastEnd; i <= jump.index; i++) {
      const p = points[i];
      if (p) result.push(p);
    }
    result.push(gapStart);

    // Skip to after the gap
    result.push(gapEnd);
    lastEnd = jump.index + 1;
  }

  // Add remaining points
  for (let i = lastEnd; i < points.length; i++) {
    const p = points[i];
    if (p) result.push(p);
  }

  return result;
}
