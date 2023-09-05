import type { Puzzle } from '@ajhyndman/puz';

// aggregate
export type State = {
  puzzle?: Puzzle;
  selection: {
    index?: number;
    direction: 'column' | 'row';
  };
};

// actions
export type Action =
  | {
      type: 'ADVANCE_CURSOR';
      payload?: undefined;
    }
  | {
      type: 'RETREAT_CURSOR';
      payload?: undefined;
    }
  | {
      type: 'INPUT';
      payload: {
        value: string;
      };
    }
  | {
      type: 'KEYBOARD_NAVIGATE';
      payload: {
        key: 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'ArrowUp';
      };
    }
  | {
      type: 'SELECT';
      payload: {
        index: number;
      };
    }
  | {
      type: 'ROTATE_SELECTION';
      payload?: undefined;
    };
