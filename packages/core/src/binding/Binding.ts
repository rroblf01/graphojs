import type { NodeData } from '../model/Model.ts';
import type { Part } from '../parts/Part.ts';
import type { GraphObject } from '../panel/GraphObject.ts';

/** An object that can be the target of a binding: a Part or a GraphObject. */
export type BindingTarget = Part | GraphObject;

/**
 * A binding connects a model data property to a Part or GraphObject property.
 *
 * When the model changes, the binding reads `sourceProperty` from the
 * node data and writes it to `targetProperty` on the target.
 *
 * For TwoWay bindings, changes to the target property are written back
 * to the model.
 */
export class Binding {
  private _targetProperty: string;
  private _sourceProperty: string;
  private _converter: ((value: unknown, data: NodeData) => unknown) | null = null;
  private _twoWay = false;
  private _backConverter: ((value: unknown, target: BindingTarget) => unknown) | null = null;

  /** GoJS-compatible: sourceProperty is optional and defaults to targetProperty;
   *  the optional third argument is the converter function. */
  constructor(
    targetProperty: string,
    sourceProperty?: string,
    converter?: (value: unknown, data: NodeData) => unknown,
  ) {
    this._targetProperty = targetProperty;
    this._sourceProperty = sourceProperty ?? targetProperty;
    this._converter = converter ?? null;
  }

  /** The target property name to set. */
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

  /** Set a converter function that transforms model data → target property. */
  ofConverter(converter: (value: unknown, data: NodeData) => unknown): this {
    this._converter = converter;
    return this;
  }

  /** Make this a TwoWay binding so target property changes flow back to the model. */
  makeTwoWay(): this {
    this._twoWay = true;
    return this;
  }

  /** Set a back-converter for TwoWay bindings that transforms target property → model data. */
  ofBackConverter(backConverter: (value: unknown, target: BindingTarget) => unknown): this {
    this._backConverter = backConverter;
    this._twoWay = true;
    return this;
  }

  /**
   * Apply this binding: read from model data and set on the target.
   * Returns true if the property was set.
   */
  applyToTarget(target: BindingTarget, nodeData: NodeData): boolean {
    const sourceValue = this.getSourceValue(nodeData);
    let targetValue = sourceValue;

    if (this._converter) {
      targetValue = this._converter(sourceValue, nodeData);
    }

    if (targetValue === undefined || targetValue === null) {
      return false;
    }

    (target as unknown as Record<string, unknown>)[this._targetProperty] = targetValue;
    return true;
  }

  /**
   * Apply TwoWay: read target property and write back to model data.
   * Returns true if the property was set on the model.
   */
  applyToModel(target: BindingTarget, nodeData: NodeData): boolean {
    if (!this._twoWay) return false;

    const targetValue = (target as unknown as Record<string, unknown>)[this._targetProperty];
    let modelValue = targetValue;

    if (this._backConverter) {
      modelValue = this._backConverter(targetValue, target);
    }

    if (modelValue === undefined) {
      return false;
    }

    nodeData[this._sourceProperty] = modelValue;
    return true;
  }

  /**
   * Read the source property from model data, applying the converter if present.
   * Supports dot paths (e.g. "data.name", "meta.color").
   */
  getSourceValue(nodeData: NodeData): unknown {
    const raw = this.resolvePath(nodeData, this._sourceProperty);
    if (this._converter) {
      return this._converter(raw, nodeData);
    }
    return raw;
  }

  /** Resolve a dotted path on the data object, e.g. "a.b.c". */
  private resolvePath(data: unknown, path: string): unknown {
    if (path.includes('.')) {
      let current: unknown = data;
      for (const segment of path.split('.')) {
        if (current === null || current === undefined) return undefined;
        current = (current as Record<string, unknown>)[segment];
      }
      return current;
    }
    return (data as Record<string, unknown>)?.[path];
  }

  /**
   * Write a value to the target, applying the back-converter if present.
   */
  setTargetValue(target: BindingTarget, value: unknown): void {
    (target as unknown as Record<string, unknown>)[this._targetProperty] = value;
  }

  /**
   * Read the target property and write to model data, applying back-converter if present.
   */
  getSourceValueFromTarget(target: BindingTarget): unknown {
    const targetValue = (target as unknown as Record<string, unknown>)[this._targetProperty];
    if (this._backConverter) {
      return this._backConverter(targetValue, target);
    }
    return targetValue;
  }

  /** Check if two bindings are equivalent. */
  equals(other: Binding): boolean {
    return (
      this._targetProperty === other._targetProperty &&
      this._sourceProperty === other._sourceProperty &&
      this._twoWay === other._twoWay
    );
  }

  /** @deprecated Use applyToTarget instead. */
  applyToPart(part: Part, nodeData: NodeData): boolean {
    return this.applyToTarget(part, nodeData);
  }

  /** @deprecated Use getSourceValueFromTarget instead. */
  getSourceValueFromPart(part: Part): unknown {
    return this.getSourceValueFromTarget(part);
  }

  /** Create a deep copy of this binding. */
  copy(): Binding {
    const cloned = new Binding(this._targetProperty, this._sourceProperty);
    cloned._twoWay = this._twoWay;
    cloned._converter = this._converter;
    cloned._backConverter = this._backConverter;
    return cloned;
  }
}

/**
 * Helper to create a Binding.
 */
export function bind(targetProperty: string, sourceProperty: string): Binding {
  return new Binding(targetProperty, sourceProperty);
}
