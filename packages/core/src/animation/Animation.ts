import type { EasingName } from './Easing.ts';
import { getEasing } from './Easing.ts';

export interface AnimationOptions {
  /** Duration in milliseconds. Default: 300 */
  duration?: number;
  /** Easing function name. Default: 'linear' */
  easing?: EasingName;
  /** Delay in milliseconds before starting. Default: 0 */
  delay?: number;
  /** Whether to run the animation on the diagram's own tick loop. */
  manual?: boolean;
}

/**
 * A single animation that tweens a numeric property from start to end value.
 */
export class Animation {
  private _from: Record<string, number>;
  private _to: Record<string, number>;
  private _duration: number;
  private _easing: ReturnType<typeof getEasing>;
  private _delay: number;
  private _startTime: number | null = null;
  private _finished = false;
  private _paused = false;
  private _pauseTime: number | null = null;
  private callback: (values: Record<string, number>) => void;
  private onComplete: (() => void) | null = null;
  private onCancel: (() => void) | null = null;

  constructor(
    from: Record<string, number>,
    to: Record<string, number>,
    callback: (values: Record<string, number>) => void,
    options: AnimationOptions = {},
  ) {
    this._from = from;
    this._to = to;
    this.callback = callback;
    this._duration = options.duration ?? 300;
    this._easing = getEasing(options.easing ?? 'linear');
    this._delay = options.delay ?? 0;
  }

  /** Duration in milliseconds. */
  get duration(): number {
    return this._duration;
  }

  /** Whether the animation has finished. */
  get isFinished(): boolean {
    return this._finished;
  }

  /** Set a callback for when the animation completes. */
  onDone(callback: () => void): this {
    this.onComplete = callback;
    return this;
  }

  /** Set a callback for when the animation is cancelled. */
  onCancelCallback(callback: () => void): this {
    this.onCancel = callback;
    return this;
  }

  /** Pause the animation. */
  pause(): void {
    if (this._finished || this._paused) return;
    this._paused = true;
  }

  /** Resume a paused animation. */
  resume(): void {
    if (!this._paused) return;
    this._paused = false;
  }

  /** Cancel the animation. */
  cancel(): void {
    if (this._finished) return;
    this._finished = true;
    this.onCancel?.();
  }

  /** Start the animation. The start time is initialized on the first update call. */
  start(): void {
    // Start time is lazily initialized in update()
  }

  /**
   * Advance the animation. Called each frame.
   * @param now Current timestamp in milliseconds.
   * @returns True if the animation is still running.
   */
  update(now: number): boolean {
    if (this._finished) return false;

    if (this._paused) {
      if (this._pauseTime === null) {
        this._pauseTime = now;
      }
      return true;
    }

    // Account for pause duration by shifting the start time forward
    if (this._pauseTime !== null) {
      this._startTime = (this._startTime ?? now) + (now - this._pauseTime);
      this._pauseTime = null;
    }

    if (this._startTime === null) {
      this._startTime = now;
    }

    const elapsed = now - this._startTime - this._delay;

    if (elapsed < 0) {
      return true;
    }

    let t = elapsed / this._duration;
    if (t >= 1) {
      t = 1;
    }

    const eased = this._easing(t);

    const values: Record<string, number> = {};
    for (const key of Object.keys(this._from)) {
      const from = this._from[key] ?? 0;
      const to = this._to[key] ?? 0;
      values[key] = from + (to - from) * eased;
    }

    this.callback(values);

    if (t >= 1) {
      this._finished = true;
      this.onComplete?.();
      return false;
    }
    return true;
  }
}
