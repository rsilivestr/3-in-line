import create from 'zustand';

import { Cell, Player } from 'model';

const useStore = create<{
  field: Cell[];
}>((set) => ({
  field: [],
}));
