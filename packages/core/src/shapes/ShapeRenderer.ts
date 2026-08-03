import type { ShapeType } from './ShapeTypes.ts';

/**
 * Renders various shapes on a Canvas 2D context.
 */
export class ShapeRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  /**
   * Render a shape by type.
   */
  renderShape(type: ShapeType, x: number, y: number, width: number, height: number): void {
    this.ctx.beginPath();

    switch (type) {
      case 'rect':
        this.ctx.rect(x, y, width, height);
        break;
      case 'ellipse':
        this.renderEllipse(x, y, width, height);
        break;
      case 'roundedRect':
        this.renderRoundedRect(x, y, width, height, Math.min(width, height) * 0.1);
        break;
      case 'diamond':
        this.renderDiamond(x, y, width, height);
        break;
      case 'hexagon':
        this.renderPolygon(x, y, width, height, 6);
        break;
      case 'octagon':
        this.renderPolygon(x, y, width, height, 8);
        break;
      case 'star':
        this.renderStar(x, y, width, height, 5);
        break;
      case 'triangle':
        this.renderTriangle(x, y, width, height);
        break;
      case 'cross':
        this.renderCross(x, y, width, height);
        break;
      case 'arrow':
        this.renderArrow(x, y, width, height);
        break;
      case 'cloud':
        this.renderCloud(x, y, width, height);
        break;
      case 'parallelogram':
        this.renderParallelogram(x, y, width, height);
        break;
      case 'trapezoid':
        this.renderTrapezoid(x, y, width, height);
        break;
      case 'pentagon':
        this.renderPolygon(x, y, width, height, 5);
        break;
      case 'heart':
        this.renderHeart(x, y, width, height);
        break;
      case 'cylinder':
        this.renderCylinder(x, y, width, height);
        break;
      case 'process':
        this.renderProcess(x, y, width, height);
        break;
      case 'document':
        this.renderDocument(x, y, width, height);
        break;
      case 'predefinedProcess':
        this.renderPredefinedProcess(x, y, width, height);
        break;
      case 'decision':
        this.renderDiamond(x, y, width, height);
        break;
      case 'start':
        this.renderEllipse(x, y, width, height);
        break;
      case 'end':
        this.renderDoubleEllipse(x, y, width, height);
        break;
      case 'io':
        this.renderParallelogram(x, y, width, height);
        break;
      case 'card':
        this.renderCard(x, y, width, height);
        break;
      case 'display':
        this.renderDisplay(x, y, width, height);
        break;
      case 'delay':
        this.renderDelay(x, y, width, height);
        break;
      case 'manualOperation':
        this.renderManualOperation(x, y, width, height);
        break;
      case 'merge':
        this.renderDiamond(x, y, width, height);
        break;
      case 'extract':
        this.renderExtract(x, y, width, height);
        break;
      case 'or':
        this.renderOr(x, y, width, height);
        break;
      case 'summingJunction':
        this.renderSummingJunction(x, y, width, height);
        break;
    }
  }

  private renderEllipse(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    this.ctx.ellipse(cx, cy, width / 2, height / 2, 0, 0, 2 * Math.PI);
  }

  private renderRoundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ): void {
    this.ctx.roundRect(x, y, width, height, radius);
  }

  private renderDiamond(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    this.ctx.moveTo(cx, y);
    this.ctx.lineTo(x + width, cy);
    this.ctx.lineTo(cx, y + height);
    this.ctx.lineTo(x, cy);
    this.ctx.closePath();
  }

  private renderPolygon(x: number, y: number, width: number, height: number, sides: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const radius = Math.min(width, height) / 2;
    const angleOffset = -Math.PI / 2;

    for (let i = 0; i < sides; i++) {
      const angle = angleOffset + (2 * Math.PI * i) / sides;
      const px = cx + radius * Math.cos(angle);
      const py = cy + radius * Math.sin(angle);

      if (i === 0) {
        this.ctx.moveTo(px, py);
      } else {
        this.ctx.lineTo(px, py);
      }
    }
    this.ctx.closePath();
  }

  private renderStar(x: number, y: number, width: number, height: number, points: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const outerRadius = Math.min(width, height) / 2;
    const innerRadius = outerRadius * 0.4;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = -Math.PI / 2 + (Math.PI * i) / points;
      const px = cx + radius * Math.cos(angle);
      const py = cy + radius * Math.sin(angle);

      if (i === 0) {
        this.ctx.moveTo(px, py);
      } else {
        this.ctx.lineTo(px, py);
      }
    }
    this.ctx.closePath();
  }

  private renderTriangle(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x + width / 2, y);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.closePath();
  }

  private renderCross(x: number, y: number, width: number, height: number): void {
    const armWidth = width / 3;
    const armHeight = height / 3;

    this.ctx.moveTo(x + armWidth, y);
    this.ctx.lineTo(x + 2 * armWidth, y);
    this.ctx.lineTo(x + 2 * armWidth, y + armHeight);
    this.ctx.lineTo(x + width, y + armHeight);
    this.ctx.lineTo(x + width, y + 2 * armHeight);
    this.ctx.lineTo(x + 2 * armWidth, y + 2 * armHeight);
    this.ctx.lineTo(x + 2 * armWidth, y + height);
    this.ctx.lineTo(x + armWidth, y + height);
    this.ctx.lineTo(x + armWidth, y + 2 * armHeight);
    this.ctx.lineTo(x, y + 2 * armHeight);
    this.ctx.lineTo(x, y + armHeight);
    this.ctx.lineTo(x + armWidth, y + armHeight);
    this.ctx.closePath();
  }

  private renderArrow(x: number, y: number, width: number, height: number): void {
    const shaftHeight = height / 3;
    const headWidth = width / 3;

    this.ctx.moveTo(x, y + shaftHeight);
    this.ctx.lineTo(x + width - headWidth, y + shaftHeight);
    this.ctx.lineTo(x + width - headWidth, y);
    this.ctx.lineTo(x + width, y + height / 2);
    this.ctx.lineTo(x + width - headWidth, y + height);
    this.ctx.lineTo(x + width - headWidth, y + 2 * shaftHeight);
    this.ctx.lineTo(x, y + 2 * shaftHeight);
    this.ctx.closePath();
  }

  private renderCloud(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const rx = width / 2;
    const ry = height / 2;

    // Draw cloud as overlapping circles
    this.ctx.moveTo(cx + rx * 0.3, cy);
    this.ctx.bezierCurveTo(
      cx + rx * 0.3,
      cy - ry * 0.5,
      cx - rx * 0.2,
      cy - ry * 0.8,
      cx - rx * 0.5,
      cy - ry * 0.3,
    );
    this.ctx.bezierCurveTo(
      cx - rx * 0.8,
      cy - ry * 0.1,
      cx - rx * 0.9,
      cy + ry * 0.4,
      cx - rx * 0.5,
      cy + ry * 0.5,
    );
    this.ctx.bezierCurveTo(
      cx - rx * 0.3,
      cy + ry * 0.8,
      cx + rx * 0.2,
      cy + ry * 0.8,
      cx + rx * 0.5,
      cy + ry * 0.4,
    );
    this.ctx.bezierCurveTo(
      cx + rx * 0.8,
      cy + ry * 0.2,
      cx + rx * 0.8,
      cy - ry * 0.3,
      cx + rx * 0.3,
      cy,
    );
  }

  private renderParallelogram(x: number, y: number, width: number, height: number): void {
    const offset = width * 0.2;
    this.ctx.moveTo(x + offset, y);
    this.ctx.lineTo(x + width, y);
    this.ctx.lineTo(x + width - offset, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.closePath();
  }

  private renderTrapezoid(x: number, y: number, width: number, height: number): void {
    const offset = width * 0.2;
    this.ctx.moveTo(x + offset, y);
    this.ctx.lineTo(x + width - offset, y);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.closePath();
  }

  private renderHeart(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;

    this.ctx.moveTo(cx, y + height);
    this.ctx.bezierCurveTo(x, y + height * 0.6, x - width * 0.1, y, cx, y + height * 0.3);
    this.ctx.bezierCurveTo(x + width + width * 0.1, y, x + width, y + height * 0.6, cx, y + height);
  }

  private renderCylinder(x: number, y: number, width: number, height: number): void {
    const ellipseHeight = height * 0.15;

    // Bottom ellipse
    this.ctx.ellipse(
      x + width / 2,
      y + height - ellipseHeight,
      width / 2,
      ellipseHeight,
      0,
      0,
      2 * Math.PI,
    );
    this.ctx.moveTo(x, y + ellipseHeight);
    this.ctx.lineTo(x, y + height - ellipseHeight);
    this.ctx.moveTo(x + width, y + ellipseHeight);
    this.ctx.lineTo(x + width, y + height - ellipseHeight);

    // Top ellipse
    this.ctx.moveTo(x + width, y + ellipseHeight);
    this.ctx.ellipse(x + width / 2, y + ellipseHeight, width / 2, ellipseHeight, 0, 0, Math.PI);
  }

  private renderProcess(x: number, y: number, width: number, height: number): void {
    // Double line at top and bottom
    const lineOffset = 4;
    this.ctx.rect(x, y, width, height);
    this.ctx.moveTo(x, y + lineOffset);
    this.ctx.lineTo(x + width, y + lineOffset);
    this.ctx.moveTo(x, y + height - lineOffset);
    this.ctx.lineTo(x + width, y + height - lineOffset);
  }

  private renderDocument(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width, y);
    this.ctx.lineTo(x + width, y + height * 0.8);

    // Wavy bottom
    const waveHeight = height * 0.2;
    const waveWidth = width / 4;
    for (let i = 0; i < 4; i++) {
      const wx = x + width - (i + 0.5) * waveWidth;
      const wy = y + height * 0.8 + (i % 2 === 0 ? waveHeight : 0);
      this.ctx.quadraticCurveTo(wx, wy, x + width - (i + 1) * waveWidth, y + height);
    }
    this.ctx.closePath();
  }

  private renderPredefinedProcess(x: number, y: number, width: number, height: number): void {
    const margin = 8;
    this.ctx.rect(x, y, width, height);
    this.ctx.moveTo(x + margin, y);
    this.ctx.lineTo(x + margin, y + height);
    this.ctx.moveTo(x + width - margin, y);
    this.ctx.lineTo(x + width - margin, y + height);
  }

  private renderDoubleEllipse(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    this.ctx.ellipse(cx, cy, width / 2, height / 2, 0, 0, 2 * Math.PI);
    this.ctx.moveTo(x + 4, y + 4);
    this.ctx.ellipse(cx, cy, width / 2 - 4, height / 2 - 4, 0, 0, 2 * Math.PI);
  }

  private renderCard(x: number, y: number, width: number, height: number): void {
    const notchHeight = height * 0.2;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width, y);
    this.ctx.lineTo(x + width, y + height - notchHeight);
    this.ctx.quadraticCurveTo(x + width / 2, y + height + notchHeight, x, y + height - notchHeight);
    this.ctx.closePath();
  }

  private renderDisplay(x: number, y: number, width: number, height: number): void {
    const offset = width * 0.15;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width, y);
    this.ctx.lineTo(x + width - offset, y + height);
    this.ctx.lineTo(x + offset, y + height);
    this.ctx.closePath();
  }

  private renderDelay(x: number, y: number, width: number, height: number): void {
    const radius = height / 2;
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width, y);
    this.ctx.ellipse(x + width - radius, y + radius, radius, radius, 0, -Math.PI / 2, Math.PI / 2);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.ellipse(x + radius, y + radius, radius, radius, 0, Math.PI / 2, -Math.PI / 2);
  }

  private renderManualOperation(x: number, y: number, width: number, height: number): void {
    const offset = width * 0.1;
    this.ctx.moveTo(x, y);
    this.ctx.quadraticCurveTo(x + width / 2, y + height * 0.3, x + width, y);
    this.ctx.lineTo(x + width - offset, y + height);
    this.ctx.quadraticCurveTo(x + width / 2, y + height * 0.7, x + offset, y + height);
    this.ctx.closePath();
  }

  private renderExtract(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const radius = Math.min(width, height) / 2;

    this.ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    this.ctx.moveTo(cx, y);
    this.ctx.lineTo(cx, y + height);
    this.ctx.moveTo(x, cy);
    this.ctx.lineTo(x + width, cy);
  }

  private renderOr(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const radius = Math.min(width, height) / 2;

    this.ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    this.ctx.moveTo(cx - radius, cy);
    this.ctx.lineTo(cx + radius, cy);
    this.ctx.moveTo(cx, cy - radius);
    this.ctx.lineTo(cx, cy + radius);
  }

  private renderSummingJunction(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const radius = Math.min(width, height) / 2;

    this.ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    this.ctx.moveTo(cx - radius * 0.7, cy - radius * 0.7);
    this.ctx.lineTo(cx + radius * 0.7, cy + radius * 0.7);
    this.ctx.moveTo(cx + radius * 0.7, cy - radius * 0.7);
    this.ctx.lineTo(cx - radius * 0.7, cy + radius * 0.7);
  }
}
