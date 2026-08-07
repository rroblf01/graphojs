/**
 * Predefined palette data templates, split into a lazy subpath so they do not
 * inflate the core bundle. Load this only when you need the default palette
 * templates (e.g. `createDefaultPalette` or building your own palette).
 *
 * @module graphojs-templates
 */
export {
  basicShapes,
  dataFlowShapes,
  flowchartShapes,
  getAllTemplates,
  getTemplateById,
  getTemplateCategories,
  getTemplatesByCategory,
} from './template/TemplateCollection.ts';
export type { Template } from './template/Template.ts';
