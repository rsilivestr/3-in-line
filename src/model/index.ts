export type Direction = 'forward' | 'backward' | 'neutral';

export type Cell = {
  id: number;
  adjacent: number[]; // Cell ids
};

export type Chip = {
  id: number;
  color: string;
  isEmpowered: boolean;
  position: number;
};
