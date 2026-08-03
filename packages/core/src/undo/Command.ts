/**
 * Interface for undoable commands.
 */
export interface Command {
  /** Execute the command. */
  execute(): void;

  /** Undo the command. */
  undo(): void;

  /** Get a description of the command. */
  describe(): string;
}
