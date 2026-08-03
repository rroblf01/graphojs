import type { NodeData } from '../model/Model.ts';
import type { Part } from '../parts/Part.ts';

/**
 * A binding connects a model data property to a Part property.
 *
 * When the model changes, the binding reads `sourceProperty` from the
 * node data and writes it to `targetProperty` on the Part.
 *
 * For TwoWay bindings, changes to the Part property are written back
 * to the model.
 */
export class Binding {
  private _targetProperty: string;
  private _sourceProperty: string;
  private _converter: ((value: unknown, data: NodeData) => unknown) | null = null;
  private _twoWay = false;
  private _backConverter: ((value: unknown, part: Part) => unknown) | null = null;

  constructor(targetProperty: string, sourceProperty: string) {
    this._targetProperty = targetProperty;
    this._sourceProperty = sourceProperty;
  }

  /** The Part property name to set. */
  get targetProperty(): string {
    return this._targetProperty;
  }

  /** The model data property name to read. */
  get sourceProperty(): string {
    return this._sourceProperty;
  }

  /** Whether this is a TwoWay binding. */
  get twoWay(): boolean {
    return this._twoWay;
  }

  /** Set a converter function that transforms model data → Part property. */
  ofConverter(converter: (value: unknown, data: NodeData) => unknown): this {
    this._converter = converter;
    return this;
  }

  /** Make this a TwoWay binding so Part property changes flow back to the model. */
  makeTwoWay(): this {
    this._twoWay = true;
    return this;
  }

  /** Set a back-converter for TwoWay bindings that transforms Part property → model data. */
  ofBackConverter(backConverter: (value: unknown, part: Part) => unknown): this {
    this._backConverter = backConverter;
    this._twoWay = true;
    return this;
  }

  /**
   * Apply this binding: read from model data and set on the Part.
   * Returns true if the property was set.
   */
  applyToPart(part: Part, nodeData: NodeData): boolean {
    const sourceValue = nodeData[this._sourceProperty];
    let targetValue = sourceValue;

    if (this._converter) {
      targetValue = this._converter(sourceValue, nodeData);
    }

    if (targetValue === undefined || targetValue === null) {
      return false;
    }

    (part as unknown as Record<string, unknown>)[this._targetProperty] = targetValue;
    return true;
  }

  /**
   * Apply TwoWay: read Part property and write back to model data.
   * Returns true if the property was set on the model.
   */
  applyToModel(part: Part, nodeData: NodeData): boolean {
    if (!this._twoWay) return false;

    const partValue = (part as unknown as Record<string, unknown>)[this._targetProperty];
    let modelValue = partValue;

    if (this._backConverter) {
      modelValue = this._backConverter(partValue, part);
    }

    if (modelValue === undefined) {
      return false;
    }

    nodeData[this._sourceProperty] = modelValue;
    return true;
  }

  /**
   * Read the source property from model data, applying the converter if present.
   */
  getSourceValue(nodeData: NodeData): unknown {
    const raw = nodeData[this._sourceProperty];
    if (this._converter) {
      return this._converter(raw, nodeData);
    }
    return raw;
  }

  /**
   * Write a value to the Part, applying the back-converter if present.
   */
  setTargetValue(part: Part, value: unknown): void {
    (part as unknown as Record<string, unknown>)[this._targetProperty] = value;
  }

  /**
   * Read the Part property and write to model data, applying back-converter if present.
   */
  getSourceValueFromPart(part: Part): unknown {
    const partValue = (part as unknown as Record<string, unknown>)[this._targetProperty];
    if (this._backConverter) {
      return this._backConverter(partValue, part);
    }
    return partValue;
  }

  /** Check if two bindings are equivalent. */
  equals(other: Binding): boolean {
    return (
      this._targetProperty === other._targetProperty &&
      this._sourceProperty === other._sourceProperty &&
      this._twoWay === other._twoWay
    );
  }
}

/**
 * Helper to create a Binding.
 */
export function bind(targetProperty: string, sourceProperty: string): Binding {
  return new Binding(targetProperty, sourceProperty);
}
