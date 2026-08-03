import type { Command } from './Command.ts';

/**
 * Event fired when undo/redo state changes.
 */
export interface UndoManagerEvent {
  /** Whether undo is available. */
  canUndo: boolean;
  /** Whether redo is available. */
  canRedo: boolean;
  /** The current undo stack size. */
  undoStackSize: number;
  /** The current redo stack size. */
  redoStackSize: number;
}

export type UndoManagerEventHandler = (event: UndoManagerEvent) => void;

/**
 * Manages undo/redo history for a diagram.
 */
export class UndoManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  private maxHistorySize: number;
  private isExecuting = false;
  private listeners: UndoManagerEventHandler[] = [];

  constructor(maxHistorySize = 100) {
    this.maxHistorySize = maxHistorySize;
  }

  /** Execute a command and add it to the undo stack. */
  execute(command: Command): void {
    if (this.isExecuting) return;

    this.isExecuting = true;
    try {
      command.execute();
      this.undoStack.push(command);
      this.redoStack = []; // Clear redo stack on new action

      // Trim history if needed
      if (this.undoStack.length > this.maxHistorySize) {
        this.undoStack.shift();
      }

      this.emit();
    } finally {
      this.isExecuting = false;
    }
  }

  /** Undo the last command. */
  undo(): boolean {
    if (!this.canUndo()) return false;

    this.isExecuting = true;
    try {
      const command = this.undoStack.pop();
      if (!command) return false;

      command.undo();
      this.redoStack.push(command);
      this.emit();
      return true;
    } finally {
      this.isExecuting = false;
    }
  }

  /** Redo the last undone command. */
  redo(): boolean {
    if (!this.canRedo()) return false;

    this.isExecuting = true;
    try {
      const command = this.redoStack.pop();
      if (!command) return false;

      command.execute();
      this.undoStack.push(command);
      this.emit();
      return true;
    } finally {
      this.isExecuting = false;
    }
  }

  /** Check if undo is available. */
  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  /** Check if redo is available. */
  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /** Get the undo stack. */
  getUndoStack(): readonly Command[] {
    return this.undoStack;
  }

  /** Get the redo stack. */
  getRedoStack(): readonly Command[] {
    return this.redoStack;
  }

  /** Get the description of the next undo command. */
  getUndoDescription(): string | null {
    if (!this.canUndo()) return null;
    return this.undoStack[this.undoStack.length - 1]?.describe() ?? null;
  }

  /** Get the description of the next redo command. */
  getRedoDescription(): string | null {
    if (!this.canRedo()) return null;
    return this.redoStack[this.redoStack.length - 1]?.describe() ?? null;
  }

  /** Clear all history. */
  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
    this.emit();
  }

  /** Add a change listener. */
  addListener(listener: UndoManagerEventHandler): void {
    this.listeners.push(listener);
  }

  /** Remove a change listener. */
  removeListener(listener: UndoManagerEventHandler): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) this.listeners.splice(index, 1);
  }

  private emit(): void {
    const event: UndoManagerEvent = {
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
      undoStackSize: this.undoStack.length,
      redoStackSize: this.redoStack.length,
    };
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}
