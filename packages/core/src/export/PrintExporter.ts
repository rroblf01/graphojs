import type { Diagram } from '../diagram/Diagram.ts';
import { PNGExporter } from './PNGExporter.ts';

export interface PrintOptions {
  /** Page title shown in the print header. */
  title?: string;
  /** Background color. Default: '#ffffff' */
  background?: string;
  /** Padding around the content. Default: 20 */
  padding?: number;
  /** Scale factor for the printed image. Default: 2 (for print resolution). */
  scale?: number;
  /** Whether to fit the image to the page width. Default: true */
  fitToPage?: boolean;
}

/**
 * Prints a diagram by rendering it to an image and opening a print dialog.
 */
export function printDiagram(diagram: Diagram, options: PrintOptions = {}): void {
  const { title, background, padding, scale, fitToPage } = options;

  const exporter = new PNGExporter({ background, padding, scale });
  const dataUrl = exporter.makeDataURL(diagram);

  const win = window.open('', '_blank', 'width=800,height=600');
  if (!win) return;

  const widthCss = (fitToPage ?? true) ? 'width:100%;height:auto;' : '';
  win.document.write(`
    <html>
      <head>
        <title>${escapeHtml(title ?? 'Diagram')}</title>
        <style>
          body { margin: 0; padding: 20px; font-family: sans-serif; }
          img { ${widthCss} max-width: 100%; }
          h1 { font-size: 18px; margin: 0 0 12px 0; }
        </style>
      </head>
      <body>
        ${title ? `<h1>${escapeHtml(title)}</h1>` : ''}
        <img src="${dataUrl}" alt="Diagram" />
      </body>
    </html>
  `);
  win.document.close();

  // Wait for the image to load before printing
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
