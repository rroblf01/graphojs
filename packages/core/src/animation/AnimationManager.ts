import { Animation, type AnimationOptions } from './Animation.ts';
import type { EasingName } from './Easing.ts';

/**
 * Manages and runs animations.
 */
export class AnimationManager {
  private animations: Animation[] = [];
  private animationFrameId: number | null = null;
  private _isAnimating = false;

  /** Whether any animation is currently running. */
  get isAnimating(): boolean {
    return this._isAnimating;
  }

  /** Get the number of running animations. */
  get count(): number {
    return this.animations.length;
  }

  /**
   * Create and run an animation.
   * Returns the Animation object.
   */
  animate(
    from: Record<string, number>,
    to: Record<string, number>,
    callback: (values: Record<string, number>) => void,
    options: AnimationOptions = {},
  ): Animation {
    const animation = new Animation(from, to, callback, options);
    this.add(animation);
    return animation;
  }

  /** Add an animation to the manager. */
  add(animation: Animation): void {
    this.animations.push(animation);
    animation.start();
    this.ensureRunning();
  }

  /** Cancel all animations. */
  cancelAll(): void {
    for (const animation of this.animations) {
      animation.cancel();
    }
    this.animations.length = 0;
    this.stopLoop();
  }

  /** Pause all animations. */
  pauseAll(): void {
    for (const animation of this.animations) {
      animation.pause();
    }
  }

  /** Resume all paused animations. */
  resumeAll(): void {
    for (const animation of this.animations) {
      animation.resume();
    }
  }

  /** Ensure the animation loop is running. */
  private ensureRunning(): void {
    if (this._isAnimating) return;
    this._isAnimating = true;
    this.animationFrameId = requestAnimationFrame(() => this.tick());
  }

  /** Stop the animation loop. */
  private stopLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this._isAnimating = false;
  }

  /** Advance all animations by one frame. */
  private tick(): void {
    if (this.animations.length === 0) {
      this.stopLoop();
      return;
    }

    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();

    this.animations = this.animations.filter((animation) => animation.update(now));

    this.animationFrameId = requestAnimationFrame(() => this.tick());
  }

  /** Advance animations manually (for tests or custom loops). */
  tickManually(): void {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    this.animations = this.animations.filter((animation) => animation.update(now));
    if (this.animations.length === 0) {
      this.stopLoop();
    }
  }
}

/** A helper to tween a numeric property with easing. */
export function tween(
  manager: AnimationManager,
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  onDone?: () => void,
  easing: EasingName = 'linear',
): Animation {
  return manager
    .animate({ value: from }, { value: to }, (values) => onUpdate(values.value ?? from), {
      duration,
      easing,
    })
    .onDone(() => onDone?.());
}
