import { useState } from 'react';

import { Cell } from 'components/Cell';
import { Chip } from 'components/Chip';
import * as M from 'model';

import * as S from './styled';

const RED = 'red';
const BLUE = 'blue';
// const [cells, setCells] = useState<Cell[]>([
const CELLS: M.Cell[] = [
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

export const Game = () => {
  const [chips, setChips] = useState<M.Chip[]>([
    { id: 1, color: BLUE, position: 1 },
    { id: 2, color: BLUE, position: 2 },
    { id: 3, color: BLUE, position: 3 },
    { id: 4, color: RED, position: 7 },
    { id: 5, color: RED, position: 8 },
    { id: 6, color: RED, position: 9 },
  ]);
  const [selectedChip, setSelectedChip] = useState<M.Chip | null>(null);

  const handleChipSelect = (chip: M.Chip) => {
    if (chip.id === selectedChip?.id) {
      setSelectedChip(null);
    } else {
      setSelectedChip(chip);
    }
  };

  const handleCellClick = (cellId: number) => {
    if (!selectedChip) return;

    const cell = CELLS.find(({ id }) => id === cellId);
    if (cell!.adjacent.includes(selectedChip.position)) {
      setChips((prevState) => {
        const newState = [...prevState];
        newState[selectedChip.id - 1] = { ...selectedChip, position: cellId };
        return newState;
      });
      setSelectedChip(null);
    }
  };

  return (
    <S.Root>
      <S.Grid>
        {CELLS.map(({ id }) => (
          <Cell key={id} onClick={() => handleCellClick(id)} />
        ))}
        {chips.map((chip) => {
          const { id, color, position } = chip;
          return (
            <Chip
              key={id}
              color={color}
              isSelected={id === selectedChip?.id}
              position={position}
              onClick={() => handleChipSelect(chip)}
            />
          );
        })}
      </S.Grid>
    </S.Root>
  );
};
