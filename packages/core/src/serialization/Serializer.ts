import { GraphLinksModel } from '../model/GraphLinksModel.ts';
import type { GraphLinksModelJSON } from '../model/GraphLinksModel.ts';
import type { Diagram } from '../diagram/Diagram.ts';

/**
 * Diagram JSON format.
 */
export interface DiagramJSON {
  /** Version of the format. */
  version: string;
  /** The model data. */
  model: GraphLinksModelJSON;
  /** Diagram options. */
  options?: {
    scale?: number;
    offsetX?: number;
    offsetY?: number;
    showGrid?: boolean;
    gridSize?: number;
    backgroundColor?: string;
  };
}

/** Serialize a diagram to JSON. */
export function serializeDiagram(diagram: Diagram): DiagramJSON {
  const model = diagram.getModel();
  const viewport = diagram.getViewport();

  return {
    version: '0.1.0',
    model: model.toJSON(),
    options: {
      scale: viewport.scale,
      offsetX: viewport.x,
      offsetY: viewport.y,
    },
  };
}

/** Deserialize JSON into a diagram. */
export function deserializeDiagram(json: DiagramJSON, diagram: Diagram): void {
  const model = GraphLinksModel.fromJSON(json.model);
  diagram.setModel(model);

  if (json.options) {
    if (json.options.scale !== undefined) {
      diagram.setViewport(
        json.options.offsetX ?? 0,
        json.options.offsetY ?? 0,
        json.options.scale,
      );
    }
  }
}

/** Serialize a diagram to a JSON string. */
export function serializeToString(diagram: Diagram): string {
  const json = serializeDiagram(diagram);
  return JSON.stringify(json, null, 2);
}

/** Deserialize a JSON string into a diagram. */
export function deserializeFromString(jsonString: string, diagram: Diagram): void {
  const json = JSON.parse(jsonString) as DiagramJSON;
  deserializeDiagram(json, diagram);
}

/** Export diagram to a downloadable file. */
export function exportToFile(diagram: Diagram, filename: string): void {
  const jsonString = serializeToString(diagram);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

/** Import diagram from a file. */
export function importFromFile(diagram: Diagram): Promise<void> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve();
        return;
      }

      try {
        const text = await file.text();
        deserializeFromString(text, diagram);
        resolve();
      } catch (err) {
        reject(err);
      }
    };

    input.click();
  });
}

/** Serializer namespace for backward compatibility. */
export const Serializer = {
  serialize: serializeDiagram,
  deserialize: deserializeDiagram,
  serializeToString,
  deserializeFromString,
  exportToFile,
  importFromFile,
} as const;
