import type { Command } from './Command.ts';
import { Transaction } from './Transaction.ts';

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
  private transactionStack: Transaction[] = [];
  private _isEnabled = true;

  constructor(maxHistorySize = 100) {
    this.maxHistorySize = maxHistorySize;
  }

  /** GoJS-compatible: Whether undo/redo is enabled. */
  get isEnabled(): boolean {
    return this._isEnabled;
  }

  set isEnabled(value: boolean) {
    this._isEnabled = value;
  }

  /** GoJS-compatible: The maximum number of undo/redo steps kept in history. */
  get maxHistoryLength(): number {
    return this.maxHistorySize;
  }

  set maxHistoryLength(value: number) {
    this.maxHistorySize = Math.max(1, value);
  }

  private _clearsHistory = true;

  /** GoJS-compatible: Whether undo/redo history is cleared by non-undoable actions. */
  get clearsHistory(): boolean {
    return this._clearsHistory;
  }

  set clearsHistory(value: boolean) {
    this._clearsHistory = value;
  }

  private separateTransaction: Transaction | null = null;

  /** GoJS-compatible: Mark the current transaction as separate from history. */
  setTransactionIsSeparateFromHistory(): void {
    const current = this.transactionStack[this.transactionStack.length - 1];
    if (current) this.separateTransaction = current;
  }

  /** GoJS-compatible: Whether commands should skip undo recording. */
  private _skipUndoManager = false;

  get skipUndoManager(): boolean {
    return this._skipUndoManager;
  }

  set skipUndoManager(value: boolean) {
    this._skipUndoManager = value;
  }

  /** GoJS-compatible: Whether the UndoManager is currently undoing or redoing. */
  get isUndoingRedoing(): boolean {
    return this.isExecuting;
  }

  /** Execute a command and add it to the undo stack. */
  execute(command: Command): void {
    if (this.isExecuting) return;

    // If inside a transaction, add to the current transaction
    const currentTransaction = this.transactionStack[this.transactionStack.length - 1];
    if (currentTransaction) {
      currentTransaction.add(command);
      command.execute();
      return;
    }

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

  /** Begin a transaction. Commands executed afterward are grouped into one undo unit. */
  beginTransaction(name = 'Transaction'): void {
    this.transactionStack.push(new Transaction(name));
  }

  /**
   * Commit the current transaction as a single undoable command.
   * Returns the committed transaction, or null if no transaction is open.
   */
  commitTransaction(): Transaction | null {
    const transaction = this.transactionStack.pop();
    if (!transaction) return null;

    // If nested, add this transaction to the parent instead of pushing to history
    const parent = this.transactionStack[this.transactionStack.length - 1];
    if (parent) {
      if (!transaction.isEmpty) {
        parent.add(transaction);
      }
      return transaction;
    }

    if (!transaction.isEmpty) {
      this.isExecuting = true;
      try {
        this.undoStack.push(transaction);
        this.redoStack = [];
        if (this.undoStack.length > this.maxHistorySize) {
          this.undoStack.shift();
        }
        this.emit();
      } finally {
        this.isExecuting = false;
      }
    }
    return transaction;
  }

  /**
   * Roll back (cancel) the current transaction, undoing its commands.
   * Returns true if a transaction was rolled back.
   */
  rollbackTransaction(): boolean {
    const transaction = this.transactionStack.pop();
    if (!transaction) return false;

    if (!transaction.isEmpty) {
      transaction.undo();
    }
    this.emit();
    return true;
  }

  /** Check whether a transaction is currently open. */
  isTransactionOpen(): boolean {
    return this.transactionStack.length > 0;
  }

  /** Get the depth of open transactions. */
  getTransactionDepth(): number {
    return this.transactionStack.length;
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
