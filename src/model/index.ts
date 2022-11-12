export type Direction = 'forward' | 'backward' | 'neutral';

export type Cell = {
  id: number;
  adjacent: number[];
};

export type Chip = {
  id: number;
  color: string;
  isEmpowered: boolean;
  position: number;
};

export type Color = 'red' | 'blue';
