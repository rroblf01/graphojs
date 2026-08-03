import type { Command } from './Command.ts';

/**
 * A transaction groups multiple commands into a single undoable unit.
 * All sub-commands are executed together and undone together.
 */
export class Transaction implements Command {
  private commands: Command[] = [];
  private _name: string;

  constructor(name = 'Transaction') {
    this._name = name;
  }

  /** The name of this transaction. */
  get name(): string {
    return this._name;
  }

  /** Get the number of sub-commands in this transaction. */
  get size(): number {
    return this.commands.length;
  }

  /** Whether this transaction has no commands. */
  get isEmpty(): boolean {
    return this.commands.length === 0;
  }

  /** Add a command to this transaction. */
  add(command: Command): this {
    this.commands.push(command);
    return this;
  }

  /** Remove the last added command. */
  removeLast(): Command | null {
    return this.commands.pop() ?? null;
  }

  /** Clear all commands in this transaction. */
  clear(): void {
    this.commands = [];
  }

  /** Execute all commands in order. */
  execute(): void {
    for (const command of this.commands) {
      command.execute();
    }
  }

  /** Undo all commands in reverse order. */
  undo(): void {
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i]?.undo();
    }
  }

  /** Get a description of this transaction. */
  describe(): string {
    return `${this.name} (${this.commands.length} command${this.commands.length === 1 ? '' : 's'})`;
  }
}

/** Create a transaction with an optional name. */
export function createTransaction(name?: string): Transaction {
  return new Transaction(name);
}
