import * as M from 'model';

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
