import type { Diagram } from '../diagram/Diagram.ts';
import { PNGExporter } from './PNGExporter.ts';
import { exportToSVG } from './SVGExporter.ts';

export interface PrintOptions {
  /** Page title shown in the print header. */
  title?: string;
  /** Background color. Default: '#ffffff' */
  background?: string;
  /** Padding around the content. Default: 20 */
  padding?: number;
  /** Scale factor for the printed image. Only applies to `format: 'png'`. Default: 2 (for print resolution). */
  scale?: number;
  /** Whether to fit the content to the page width. Default: true */
  fitToPage?: boolean;
  /**
   * How the diagram is embedded in the print window. `'svg'` (default)
   * embeds a vector `<svg>` — crisp at any zoom/DPI and produces a real
   * vector PDF when the browser's print dialog "saves as PDF". `'png'`
   * rasterizes first via `PNGExporter`, for cases needing a plain raster
   * image instead.
   */
  format?: 'svg' | 'png';
}

/**
 * Prints a diagram by opening a print dialog with its content embedded —
 * as vector SVG by default, or as a raster PNG image with `format: 'png'`.
 */
export function printDiagram(diagram: Diagram, options: PrintOptions = {}): void {
  const { title, background, padding, scale, fitToPage, format = 'svg' } = options;

  const win = window.open('', '_blank', 'width=800,height=600');
  if (!win) return;

  const widthCss = (fitToPage ?? true) ? 'width:100%;height:auto;' : '';

  const contentHtml =
    format === 'png'
      ? `<img src="${new PNGExporter({ background, padding, scale }).makeDataURL(diagram)}" alt="Diagram" style="${widthCss}max-width:100%;" />`
      : exportToSVG(diagram).replace('<svg ', `<svg style="${widthCss}max-width:100%;" `);

  win.document.write(`
    <html>
      <head>
        <title>${escapeHtml(title ?? 'Diagram')}</title>
        <style>
          body { margin: 0; padding: 20px; font-family: sans-serif; }
          h1 { font-size: 18px; margin: 0 0 12px 0; }
        </style>
      </head>
      <body>
        ${title ? `<h1>${escapeHtml(title)}</h1>` : ''}
        ${contentHtml}
      </body>
    </html>
  `);
  win.document.close();

  // Wait a tick for the content (image or inline SVG) to lay out before printing.
  win.onload = () => {
    setTimeout(() => {
      win.print();
      win.close();
    }, 100);
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
