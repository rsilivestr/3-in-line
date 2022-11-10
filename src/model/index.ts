export type Player = {
  id: number;
};

export type Cell = {
  id: number;
  row?: number;
  column?: number;
  adjacent: number[]; // Cell ids
  occupied?: number; // Chip id
};

export type Chip = {
  id: number;
  color: string;
  position: number;
};
