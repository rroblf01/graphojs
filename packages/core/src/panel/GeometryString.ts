/**
 * Minimal SVG path (geometry string) parser and Canvas renderer.
 * Supports M/L/H/V/C/S/Q/T/A/Z commands (absolute and relative).
 * Paths are fitted to the given bounds, preserving aspect ratio.
 */

interface Cmd {
  op: string;
  args: number[];
}

/** Number of numeric parameters each command consumes per repetition. */
const ARITY: Record<string, number> = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0,
};

const COMMAND_CHARS = new Set('MLHVCSQTAZ');

/**
 * Tokenize an SVG-style path string into one Cmd per drawing operation.
 *
 * Handles two real-world SVG features a flat number/letter regex misses:
 *  - Implicit command repetition: "L10,0 20,10 30,0" means three separate
 *    lineTos, not one lineTo with leftover coordinates silently dropped
 *    (per the SVG spec, an M's extra repeated pairs become lineTos too).
 *  - Elliptical arc flags without a separator: the large-arc/sweep flags in
 *    "A25,25,0,11,50,25" are two single-digit flags ("1","1"), not the
 *    number 11 — they're parsed as exactly one character each.
 */
function tokenizePath(d: string): Cmd[] {
  const commands: Cmd[] = [];
  const len = d.length;
  let i = 0;

  const skipSeparators = (): void => {
    while (i < len && /[\s,]/.test(d[i]!)) i++;
  };

  const readNumber = (): number | null => {
    skipSeparators();
    const start = i;
    if (i < len && (d[i] === '+' || d[i] === '-')) i++;
    let sawDigits = false;
    while (i < len && /[0-9]/.test(d[i]!)) {
      i++;
      sawDigits = true;
    }
    if (i < len && d[i] === '.') {
      i++;
      while (i < len && /[0-9]/.test(d[i]!)) {
        i++;
        sawDigits = true;
      }
    }
    if (!sawDigits) {
      i = start;
      return null;
    }
    if (i < len && (d[i] === 'e' || d[i] === 'E')) {
      const save = i;
      i++;
      if (i < len && (d[i] === '+' || d[i] === '-')) i++;
      if (i < len && /[0-9]/.test(d[i]!)) {
        while (i < len && /[0-9]/.test(d[i]!)) i++;
      } else {
        i = save;
      }
    }
    return Number(d.slice(start, i));
  };

  /** Elliptical-arc flags are exactly one character ('0' or '1'), possibly
   *  with no separator before the next number. */
  const readFlag = (): number | null => {
    skipSeparators();
    if (i < len && (d[i] === '0' || d[i] === '1')) {
      const v = Number(d[i]);
      i++;
      return v;
    }
    return null;
  };

  while (i < len) {
    skipSeparators();
    if (i >= len) break;
    const ch = d[i]!;
    const upper = ch.toUpperCase();
    if (!COMMAND_CHARS.has(upper)) break; // malformed input; stop parsing
    i++;

    if (upper === 'Z') {
      commands.push({ op: ch, args: [] });
      continue;
    }

    // Read as many repetitions of this command's parameter group as are
    // available before the next command letter (implicit repetition).
    let repetition = 0;
    while (true) {
      skipSeparators();
      if (i >= len || COMMAND_CHARS.has(d[i]!.toUpperCase())) break;

      const args: number[] = [];
      if (upper === 'A') {
        const rx = readNumber();
        const ry = readNumber();
        const rot = readNumber();
        const large = readFlag();
        const sweep = readFlag();
        const x = readNumber();
        const y = readNumber();
        if (
          rx === null ||
          ry === null ||
          rot === null ||
          large === null ||
          sweep === null ||
          x === null ||
          y === null
        ) {
          break;
        }
        args.push(rx, ry, rot, large, sweep, x, y);
      } else {
        const arity = ARITY[upper] ?? 0;
        for (let k = 0; k < arity; k++) {
          const n = readNumber();
          if (n === null) {
            args.push(...new Array(arity - args.length).fill(0));
            break;
          }
          args.push(n);
        }
        if (args.length < arity) break;
      }

      // Per the SVG spec, a moveto's *repeated* coordinate pairs are lineTos.
      const op = upper === 'M' && repetition > 0 ? (ch === 'm' ? 'l' : 'L') : ch;
      commands.push({ op, args });
      repetition++;
    }

    // A command letter with no following numbers at all (rare, but keeps
    // e.g. a lone "Z"-less no-op letter from being silently dropped).
    if (repetition === 0 && upper !== 'Z') {
      commands.push({ op: ch, args: [] });
    }
  }
  return commands;
}

export interface GeometryPathPoint {
  x: number;
  y: number;
}

/**
 * Draw an SVG path string onto a canvas context, fitted into (x, y, w, h).
 */
export function drawGeometryString(
  ctx: CanvasRenderingContext2D,
  d: string,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const commands = tokenizePath(d);
  if (commands.length === 0) return;

  // First pass: compute absolute points and overall bounds
  let cx = 0;
  let cy = 0;
  let startX = 0;
  let startY = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const record = (px: number, py: number): void => {
    minX = Math.min(minX, px);
    minY = Math.min(minY, py);
    maxX = Math.max(maxX, px);
    maxY = Math.max(maxY, py);
  };

  for (const c of commands) {
    const a = c.args;
    const op = c.op;
    switch (op) {
      case 'M':
        cx = a[0] ?? cx;
        cy = a[1] ?? cy;
        startX = cx;
        startY = cy;
        record(cx, cy);
        break;
      case 'm':
        cx += a[0] ?? 0;
        cy += a[1] ?? 0;
        startX = cx;
        startY = cy;
        record(cx, cy);
        break;
      case 'L':
      case 'l': {
        const nx = op === 'L' ? (a[0] ?? cx) : cx + (a[0] ?? 0);
        const ny = op === 'L' ? (a[1] ?? cy) : cy + (a[1] ?? 0);
        cx = nx;
        cy = ny;
        record(cx, cy);
        break;
      }
      case 'H':
      case 'h': {
        cx = op === 'H' ? (a[0] ?? cx) : cx + (a[0] ?? 0);
        record(cx, cy);
        break;
      }
      case 'V':
      case 'v': {
        cy = op === 'V' ? (a[0] ?? cy) : cy + (a[0] ?? 0);
        record(cx, cy);
        break;
      }
      case 'C':
      case 'c': {
        for (let i = 0; i < 6; i += 2) {
          const ox = op === 'C' ? (a[i] ?? 0) : cx + (a[i] ?? 0);
          const oy = op === 'C' ? (a[i + 1] ?? 0) : cy + (a[i + 1] ?? 0);
          record(ox, oy);
        }
        cx = op === 'C' ? (a[4] ?? cx) : cx + (a[4] ?? 0);
        cy = op === 'C' ? (a[5] ?? cy) : cy + (a[5] ?? 0);
        break;
      }
      case 'Q':
      case 'q': {
        for (let i = 0; i < 4; i += 2) {
          const ox = op === 'Q' ? (a[i] ?? 0) : cx + (a[i] ?? 0);
          const oy = op === 'Q' ? (a[i + 1] ?? 0) : cy + (a[i + 1] ?? 0);
          record(ox, oy);
        }
        cx = op === 'Q' ? (a[2] ?? cx) : cx + (a[2] ?? 0);
        cy = op === 'Q' ? (a[3] ?? cy) : cy + (a[3] ?? 0);
        break;
      }
      case 'S':
      case 's': {
        for (let i = 0; i < 4; i += 2) {
          const ox = op === 'S' ? (a[i] ?? 0) : cx + (a[i] ?? 0);
          const oy = op === 'S' ? (a[i + 1] ?? 0) : cy + (a[i + 1] ?? 0);
          record(ox, oy);
        }
        cx = op === 'S' ? (a[2] ?? cx) : cx + (a[2] ?? 0);
        cy = op === 'S' ? (a[3] ?? cy) : cy + (a[3] ?? 0);
        break;
      }
      case 'T':
      case 't': {
        const nx = op === 'T' ? (a[0] ?? cx) : cx + (a[0] ?? 0);
        const ny = op === 'T' ? (a[1] ?? cy) : cy + (a[1] ?? 0);
        record(nx, ny);
        cx = nx;
        cy = ny;
        break;
      }
      case 'A':
      case 'a': {
        const rx = Math.abs(a[0] ?? 0);
        const ry = Math.abs(a[1] ?? 0);
        const rot = ((a[2] ?? 0) * Math.PI) / 180;
        const large = (a[3] ?? 0) !== 0;
        const sweep = (a[4] ?? 0) !== 0;
        const nx = op === 'A' ? (a[5] ?? cx) : cx + (a[5] ?? 0);
        const ny = op === 'A' ? (a[6] ?? cy) : cy + (a[6] ?? 0);
        const samples = arcSamples(cx, cy, rx, ry, rot, large, sweep, nx, ny);
        for (const s of samples) record(s.x, s.y);
        cx = nx;
        cy = ny;
        break;
      }
      case 'Z':
      case 'z':
        cx = startX;
        cy = startY;
        break;
      default:
        break;
    }
  }

  if (!Number.isFinite(minX) || minX === Infinity) return;

  // Compute scale to fit within the target bounds
  const bw = maxX - minX;
  const bh = maxY - minY;
  const scale = Math.min(bw > 0 ? width / bw : 1, bh > 0 ? height / bh : 1);
  const offsetX = x + (width - bw * scale) / 2 - minX * scale;
  const offsetY = y + (height - bh * scale) / 2 - minY * scale;

  const sx = (px: number): number => px * scale + offsetX;
  const sy = (py: number): number => py * scale + offsetY;

  // Second pass: draw
  cx = 0;
  cy = 0;
  ctx.beginPath();
  let started = false;
  for (const c of commands) {
    const a = c.args;
    const op = c.op;
    switch (op) {
      case 'M':
        cx = a[0] ?? cx;
        cy = a[1] ?? cy;
        ctx.moveTo(sx(cx), sy(cy));
        started = true;
        break;
      case 'm':
        cx += a[0] ?? 0;
        cy += a[1] ?? 0;
        ctx.moveTo(sx(cx), sy(cy));
        started = true;
        break;
      case 'L':
        cx = a[0] ?? cx;
        cy = a[1] ?? cy;
        if (!started) {
          ctx.moveTo(sx(cx), sy(cy));
          started = true;
        } else {
          ctx.lineTo(sx(cx), sy(cy));
        }
        break;
      case 'l':
        cx += a[0] ?? 0;
        cy += a[1] ?? 0;
        if (!started) {
          ctx.moveTo(sx(cx), sy(cy));
          started = true;
        } else {
          ctx.lineTo(sx(cx), sy(cy));
        }
        break;
      case 'H':
        cx = a[0] ?? cx;
        ctx.lineTo(sx(cx), sy(cy));
        break;
      case 'h':
        cx += a[0] ?? 0;
        ctx.lineTo(sx(cx), sy(cy));
        break;
      case 'V':
        cy = a[0] ?? cy;
        ctx.lineTo(sx(cx), sy(cy));
        break;
      case 'v':
        cy += a[0] ?? 0;
        ctx.lineTo(sx(cx), sy(cy));
        break;
      case 'C':
        ctx.bezierCurveTo(
          sx(a[0] ?? cx),
          sy(a[1] ?? cy),
          sx(a[2] ?? cx),
          sy(a[3] ?? cy),
          sx(a[4] ?? cx),
          sy(a[5] ?? cy),
        );
        cx = a[4] ?? cx;
        cy = a[5] ?? cy;
        break;
      case 'c':
        ctx.bezierCurveTo(
          sx(cx + (a[0] ?? 0)),
          sy(cy + (a[1] ?? 0)),
          sx(cx + (a[2] ?? 0)),
          sy(cy + (a[3] ?? 0)),
          sx(cx + (a[4] ?? 0)),
          sy(cy + (a[5] ?? 0)),
        );
        cx += a[4] ?? 0;
        cy += a[5] ?? 0;
        break;
      case 'Q':
        ctx.quadraticCurveTo(sx(a[0] ?? cx), sy(a[1] ?? cy), sx(a[2] ?? cx), sy(a[3] ?? cy));
        cx = a[2] ?? cx;
        cy = a[3] ?? cy;
        break;
      case 'q':
        ctx.quadraticCurveTo(
          sx(cx + (a[0] ?? 0)),
          sy(cy + (a[1] ?? 0)),
          sx(cx + (a[2] ?? 0)),
          sy(cy + (a[3] ?? 0)),
        );
        cx += a[2] ?? 0;
        cy += a[3] ?? 0;
        break;
      case 'S': {
        ctx.bezierCurveTo(
          sx(a[0] ?? cx),
          sy(a[1] ?? cy),
          sx(a[2] ?? cx),
          sy(a[3] ?? cy),
          sx(a[4] ?? cx),
          sy(a[5] ?? cy),
        );
        cx = a[4] ?? cx;
        cy = a[5] ?? cy;
        break;
      }
      case 's': {
        ctx.bezierCurveTo(
          sx(cx + (a[0] ?? 0)),
          sy(cy + (a[1] ?? 0)),
          sx(cx + (a[2] ?? 0)),
          sy(cy + (a[3] ?? 0)),
          sx(cx + (a[4] ?? 0)),
          sy(cy + (a[5] ?? 0)),
        );
        cx += a[4] ?? 0;
        cy += a[5] ?? 0;
        break;
      }
      case 'T':
        cx = a[0] ?? cx;
        cy = a[1] ?? cy;
        ctx.lineTo(sx(cx), sy(cy));
        break;
      case 't':
        cx += a[0] ?? 0;
        cy += a[1] ?? 0;
        ctx.lineTo(sx(cx), sy(cy));
        break;
      case 'A':
      case 'a': {
        const rx = Math.abs(a[0] ?? 0);
        const ry = Math.abs(a[1] ?? 0);
        const rot = ((a[2] ?? 0) * Math.PI) / 180;
        const large = (a[3] ?? 0) !== 0;
        const sweep = (a[4] ?? 0) !== 0;
        const fromX = cx;
        const fromY = cy;
        const nx = op === 'A' ? (a[5] ?? cx) : cx + (a[5] ?? 0);
        const ny = op === 'A' ? (a[6] ?? cy) : cy + (a[6] ?? 0);
        const samples = arcSamples(fromX, fromY, rx, ry, rot, large, sweep, nx, ny);
        for (const s of samples) ctx.lineTo(sx(s.x), sy(s.y));
        cx = nx;
        cy = ny;
        break;
      }
      case 'Z':
      case 'z':
        ctx.closePath();
        started = false;
        break;
      default:
        break;
    }
  }
}

/**
 * Approximate an SVG elliptical arc (A command) with sample points using the
 * standard endpoint-to-center parameterization.
 */
function arcSamples(
  x1: number,
  y1: number,
  rx: number,
  ry: number,
  phi: number,
  largeArc: boolean,
  sweep: boolean,
  x2: number,
  y2: number,
): Array<{ x: number; y: number }> {
  if (rx === 0 || ry === 0 || (x1 === x2 && y1 === y2)) {
    return [{ x: x2, y: y2 }];
  }

  // Step 1: compute the center point
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;
  const x1p = cosPhi * dx + sinPhi * dy;
  const y1p = -sinPhi * dx + cosPhi * dy;

  const rxSq = rx * rx;
  const rySq = ry * ry;
  const x1pSq = x1p * x1p;
  const y1pSq = y1p * y1p;
  let radicand = (rxSq * rySq - rxSq * y1pSq - rySq * x1pSq) / (rxSq * y1pSq + rySq * x1pSq);
  if (radicand < 0) radicand = 0;
  const coef = (largeArc === sweep ? -1 : 1) * Math.sqrt(radicand);
  const cxp = (coef * rx * y1p) / ry;
  const cyp = (coef * -ry * x1p) / rx;

  const cx = cosPhi * cxp - sinPhi * cyp + (x1 + x2) / 2;
  const cy = sinPhi * cxp + cosPhi * cyp + (y1 + y2) / 2;

  // Step 2: compute start and end angles
  const v1x = (x1p - cxp) / rx;
  const v1y = (y1p - cyp) / ry;
  const v2x = (-x1p - cxp) / rx;
  const v2y = (-y1p - cyp) / ry;
  const startAngle = Math.atan2(v1y, v1x);
  let delta = Math.atan2(v1x * v2y - v1y * v2x, v1x * v2x + v1y * v2y);
  if (!sweep && delta > 0) delta -= 2 * Math.PI;
  else if (sweep && delta < 0) delta += 2 * Math.PI;

  // Step 3: sample points along the arc
  const samples: Array<{ x: number; y: number }> = [];
  const steps = Math.max(4, Math.ceil((Math.abs(delta) / (Math.PI / 2)) * 4));
  for (let i = 1; i <= steps; i++) {
    const t = (i / steps) * delta + startAngle;
    const px = rx * Math.cos(t);
    const py = ry * Math.sin(t);
    samples.push({
      x: cosPhi * px - sinPhi * py + cx,
      y: sinPhi * px + cosPhi * py + cy,
    });
  }
  return samples;
}
