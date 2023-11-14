import { type Puzzle, isCorrect } from '@ajhyndman/puz';

export type State = {
  puzzle?: Puzzle;
  isCorrect?: boolean;
};

export type Action =
  | {
      type: 'NEW_PUZZLE';
      payload: Puzzle;
    }
  | {
      type: 'CELL_CHANGED';
      payload: { index: number; value: string; isPencil?: boolean };
    };

export const DEFAULT_STATE = {};

export const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'NEW_PUZZLE':
      return { ...state, puzzle: payload, isCorrect: isCorrect(payload) };

    case 'CELL_CHANGED':
      // if puzzle is already correct, ignore this action
      if (state.isCorrect) return state;
      // if no puzzle set yet, ignore this action
      if (!state.puzzle?.state) return state;
      // if action has no contents, ignore this action
      if (payload.value == null) return state;

      // update the character at the given position
      const nextState = [...state.puzzle.state];
      nextState[payload.index] = payload.value.slice(0, 1).toUpperCase();
      const puzzle: Puzzle = { ...state.puzzle, state: nextState.join('') };

      // also set markup flag
      const markupGrid = state.puzzle.markupGrid ?? [];
      markupGrid[payload.index] = markupGrid[payload.index] ?? {};
      markupGrid[payload.index].unknown_01 = payload.isPencil;

      return { ...state, puzzle, isCorrect: isCorrect(puzzle) };

    default:
      return state;
  }
};
