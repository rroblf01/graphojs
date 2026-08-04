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
      case 'x':
        this.renderX(x, y, width, height);
        break;
      case 'plus':
        this.renderPlus(x, y, width, height);
        break;
      case 'minus':
        this.renderMinus(x, y, width, height);
        break;
      case 'line':
        this.ctx.moveTo(x, y + height / 2);
        this.ctx.lineTo(x + width, y + height / 2);
        break;
      case 'circle':
        this.renderEllipse(x, y, width, height);
        break;
      case 'doubleArrow':
        this.renderDoubleArrow(x, y, width, height);
        break;
      case 'person':
        this.renderPerson(x, y, width, height);
        break;
      case 'ring':
        this.renderRing(x, y, width, height);
        break;
      case 'rhombus':
        this.renderRhombus(x, y, width, height);
        break;
      case 'kite':
        this.renderKite(x, y, width, height);
        break;
      case 'club':
        this.renderClub(x, y, width, height);
        break;
      case 'spade':
        this.renderSpade(x, y, width, height);
        break;
      case 'piePiece':
        this.renderPiePiece(x, y, width, height);
        break;
      case 'file':
        this.renderFile(x, y, width, height);
        break;
      case 'folder':
        this.renderFolder(x, y, width, height);
        break;
      case 'terminator':
        this.renderRoundedRect(x, y, width, height, Math.min(width, height) * 0.5);
        break;
      case 'planner':
        this.renderPlanner(x, y, width, height);
        break;
      case 'internalStorage':
        this.renderInternalStorage(x, y, width, height);
        break;
      case 'externalStorage':
        this.renderExternalStorage(x, y, width, height);
        break;
      case 'sequentialAccessStorage':
        this.renderSequentialAccess(x, y, width, height);
        break;
      case 'directAccessStorage':
        this.renderDirectAccess(x, y, width, height);
        break;
      case 'collate':
        this.renderCollate(x, y, width, height);
        break;
      case 'manualInput':
        this.renderManualInput(x, y, width, height);
        break;
      case 'preparation':
        this.renderPreparation(x, y, width, height);
        break;
      case 'loopLimit':
        this.renderLoopLimit(x, y, width, height);
        break;
      case 'database':
        this.renderDatabase(x, y, width, height);
        break;
      case 'subroutine':
        this.renderRoundedRect(x, y, width, height, 8);
        break;
      case 'sort':
        this.renderSort(x, y, width, height);
        break;
      case 'doubleChevron':
        this.renderDoubleChevron(x, y, width, height);
        break;
      case 'halfCircle':
        this.renderHalfCircle(x, y, width, height);
        break;
      case 'rightTriangle':
        this.renderRightTriangle(x, y, width, height);
        break;
      case 'plus2':
        this.renderPlus(x, y, width, height);
        break;
      case 'rect2':
        this.ctx.rect(x, y, width, height);
        break;
      case 'tabbedRectangle':
        this.renderTabbedRectangle(x, y, width, height);
        break;
    }
  }

  private renderFile(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width * 0.8, y);
    this.ctx.lineTo(x + width, y + height * 0.3);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.closePath();
  }

  private renderFolder(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width * 0.3, y);
    this.ctx.lineTo(x + width * 0.4, y + height * 0.2);
    this.ctx.lineTo(x + width, y + height * 0.2);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.closePath();
  }

  private renderPlanner(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y + height * 0.25);
    this.ctx.lineTo(x + width * 0.25, y);
    this.ctx.lineTo(x + width * 0.75, y);
    this.ctx.lineTo(x + width, y + height * 0.25);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.closePath();
  }

  private renderInternalStorage(x: number, y: number, width: number, height: number): void {
    this.ctx.rect(x, y, width, height);
    this.ctx.moveTo(x + width * 0.5, y);
    this.ctx.lineTo(x + width * 0.5, y + height);
  }

  private renderExternalStorage(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x + width * 0.25, y);
    this.ctx.lineTo(x + width, y);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x + width * 0.25, y + height);
    this.ctx.quadraticCurveTo(x, y + height * 0.5, x + width * 0.25, y);
    this.ctx.closePath();
  }

  private renderSequentialAccess(x: number, y: number, width: number, height: number): void {
    this.ctx.rect(x, y, width, height);
    this.ctx.moveTo(x + width * 0.5, y);
    this.ctx.lineTo(x + width * 0.5, y + height);
  }

  private renderDirectAccess(x: number, y: number, width: number, height: number): void {
    this.ctx.rect(x, y, width, height);
    this.ctx.moveTo(x + width * 0.25, y);
    this.ctx.lineTo(x + width * 0.25, y + height);
    this.ctx.moveTo(x + width * 0.75, y);
    this.ctx.lineTo(x + width * 0.75, y + height);
  }

  private renderCollate(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x + width * 0.5, y);
    this.ctx.lineTo(x + width, y + height * 0.5);
    this.ctx.lineTo(x + width * 0.5, y + height);
    this.ctx.lineTo(x, y + height * 0.5);
    this.ctx.closePath();
  }

  private renderManualInput(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width, y);
    this.ctx.lineTo(x + width * 0.7, y + height);
    this.ctx.lineTo(x + width * 0.3, y + height);
    this.ctx.closePath();
  }

  private renderPreparation(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y + height * 0.5);
    this.ctx.lineTo(x + width * 0.5, y);
    this.ctx.lineTo(x + width, y + height * 0.5);
    this.ctx.lineTo(x + width * 0.5, y + height);
    this.ctx.closePath();
  }

  private renderLoopLimit(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width * 0.3, y);
    this.ctx.lineTo(x + width, y + height * 0.5);
    this.ctx.lineTo(x + width * 0.3, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.quadraticCurveTo(x + width * 0.2, y + height * 0.5, x, y);
    this.ctx.closePath();
  }

  private renderDatabase(x: number, y: number, width: number, height: number): void {
    const rx = width / 2;
    this.ctx.ellipse(x + width / 2, y + height * 0.2, rx, height * 0.15, 0, 0, 2 * Math.PI);
    this.ctx.moveTo(x, y + height * 0.2);
    this.ctx.lineTo(x, y + height * 0.8);
    this.ctx.ellipse(x + width / 2, y + height * 0.8, rx, height * 0.15, 0, Math.PI, 0, true);
    this.ctx.moveTo(x + width, y + height * 0.2);
    this.ctx.lineTo(x + width, y + height * 0.8);
  }

  private renderSort(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x + width * 0.5, y);
    this.ctx.lineTo(x, y + height);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.closePath();
  }

  private renderDoubleChevron(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width * 0.4, y + height * 0.5);
    this.ctx.lineTo(x, y + height);
    this.ctx.moveTo(x + width * 0.4, y);
    this.ctx.lineTo(x + width, y + height * 0.5);
    this.ctx.lineTo(x + width * 0.4, y + height);
  }

  private renderHalfCircle(x: number, y: number, width: number, height: number): void {
    this.ctx.arc(
      x + width / 2,
      y + height / 2,
      Math.min(width, height) / 2,
      Math.PI / 2,
      (3 * Math.PI) / 2,
    );
  }

  private renderRightTriangle(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.closePath();
  }

  private renderTabbedRectangle(x: number, y: number, width: number, height: number): void {
    this.ctx.rect(x, y + height * 0.2, width, height * 0.8);
    this.ctx.moveTo(x, y + height * 0.2);
    this.ctx.lineTo(x, y);
    this.ctx.lineTo(x + width * 0.3, y);
    this.ctx.lineTo(x + width * 0.35, y + height * 0.2);
  }

  private renderX(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.moveTo(x + width, y);
    this.ctx.lineTo(x, y + height);
  }

  private renderPlus(x: number, y: number, width: number, height: number): void {
    const armX = Math.min(width, height) * 0.25;
    this.ctx.rect(x + width / 2 - armX / 2, y, armX, height);
  }

  private renderMinus(x: number, y: number, width: number, height: number): void {
    const armY = Math.min(width, height) * 0.25;
    this.ctx.rect(x, y + height / 2 - armY / 2, width, armY);
  }

  private renderDoubleArrow(x: number, y: number, width: number, height: number): void {
    const h = height;
    this.ctx.moveTo(x + width / 2, y);
    this.ctx.lineTo(x, y + h / 2);
    this.ctx.lineTo(x + width / 2, y + h);
    this.ctx.moveTo(x + width / 2, y);
    this.ctx.lineTo(x + width, y + h / 2);
    this.ctx.lineTo(x + width / 2, y + h);
  }

  private renderPerson(x: number, y: number, width: number, height: number): void {
    const headR = Math.min(width, height) * 0.2;
    const cx = x + width / 2;
    this.ctx.ellipse(cx, y + headR, headR, headR, 0, 0, 2 * Math.PI);
    this.ctx.moveTo(cx, y + headR * 2);
    this.ctx.arc(cx, y + height * 0.7, width * 0.35, Math.PI, 0, true);
  }

  private renderRing(x: number, y: number, width: number, height: number): void {
    this.ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
  }

  private renderRhombus(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y + height / 2);
    this.ctx.lineTo(x + width / 2, y);
    this.ctx.lineTo(x + width, y + height / 2);
    this.ctx.lineTo(x + width / 2, y + height);
    this.ctx.closePath();
  }

  private renderKite(x: number, y: number, width: number, height: number): void {
    this.ctx.moveTo(x, y + height / 2);
    this.ctx.lineTo(x + width / 2, y);
    this.ctx.lineTo(x + width, y + height / 2);
    this.ctx.lineTo(x + width / 2, y + height);
    this.ctx.closePath();
  }

  private renderClub(x: number, y: number, width: number, height: number): void {
    const r = Math.min(width, height) * 0.25;
    const cx = x + width / 2;
    const cy = y + height * 0.55;
    this.ctx.ellipse(cx - r, cy, r, r, 0, 0, 2 * Math.PI);
    this.ctx.ellipse(cx + r, cy, r, r, 0, 0, 2 * Math.PI);
    this.ctx.ellipse(cx, cy - r, r, r, 0, 0, 2 * Math.PI);
    this.ctx.rect(cx - r * 0.3, cy, r * 0.6, height * 0.35);
  }

  private renderSpade(x: number, y: number, width: number, height: number): void {
    const r = Math.min(width, height) * 0.25;
    const cx = x + width / 2;
    this.ctx.moveTo(cx, y);
    this.ctx.lineTo(cx - r * 1.2, y + height * 0.4);
    this.ctx.quadraticCurveTo(cx - r * 1.2, y + height * 0.7, cx - r * 0.4, y + height * 0.55);
    this.ctx.quadraticCurveTo(cx, y + height * 0.5, cx + r * 0.4, y + height * 0.55);
    this.ctx.quadraticCurveTo(cx + r * 1.2, y + height * 0.7, cx + r * 1.2, y + height * 0.4);
    this.ctx.closePath();
    this.ctx.moveTo(cx - r * 0.3, y + height * 0.7);
    this.ctx.rect(cx - r * 0.3, y + height * 0.65, r * 0.6, height * 0.3);
  }

  private renderPiePiece(x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const r = Math.min(width, height) / 2;
    this.ctx.moveTo(cx, cy);
    this.ctx.arc(cx, cy, r, 0, Math.PI / 2);
    this.ctx.closePath();
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
