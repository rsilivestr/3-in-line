import * as M from 'model';

export const BLUE = 'blue';

export const RED = 'red';

export const CELLS: M.Cell[] = [
  { id: 1, adjacent: [2, 4, 5] },
  { id: 2, adjacent: [1, 3, 5] },
  { id: 3, adjacent: [2, 5, 6] },
  { id: 4, adjacent: [1, 5, 7] },
  { id: 5, adjacent: [1, 2, 3, 4, 6, 7, 8, 9] },
  { id: 6, adjacent: [3, 5, 9] },
  { id: 7, adjacent: [4, 5, 8] },
  { id: 8, adjacent: [5, 7, 9] },
  { id: 9, adjacent: [5, 6, 8] },
];

export const INITIAL_CHIPS: M.Chip[] = [
  { id: 1, color: BLUE, position: 1, isEmpowered: false },
  { id: 2, color: BLUE, position: 2, isEmpowered: false },
  { id: 3, color: BLUE, position: 3, isEmpowered: false },
  { id: 4, color: RED, position: 7, isEmpowered: false },
  { id: 5, color: RED, position: 8, isEmpowered: false },
  { id: 6, color: RED, position: 9, isEmpowered: false },
];

export const RED_EMPOWER_NODES = [1, 2, 3];

export const BLUE_EMPOWER_NODES = [7, 8, 9];

export const COMMON_WIN_POSITIONS: number[][] = [
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
];

export const BLUE_START_POSITIONS: number[] = [1, 2, 3];

export const RED_START_POSITIONS: number[] = [7, 8, 9];

export const BLUE_WIN_POSITIONS: number[][] = [...COMMON_WIN_POSITIONS, RED_START_POSITIONS];

export const RED_WIN_POSITIONS: number[][] = [...COMMON_WIN_POSITIONS, BLUE_START_POSITIONS];

export const ALL_WIN_POSITIONS: number[][] = [
  ...COMMON_WIN_POSITIONS,
  BLUE_START_POSITIONS,
  RED_START_POSITIONS,
];
