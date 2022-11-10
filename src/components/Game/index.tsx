import { useState } from 'react';

import { Cell } from 'components/Cell';
import { Chip } from 'components/Chip';
import { CELLS } from 'data';
import * as M from 'model';

import * as S from './styled';

const RED = 'red';
const BLUE = 'blue';

const RED_EMPOWER_NODES = [1, 2, 3];
const BLUE_EMPOWER_NODES = [7, 8, 9];

export const Game = () => {
  const [chips, setChips] = useState<M.Chip[]>([
    { id: 1, color: BLUE, position: 1, isEmpowered: false },
    { id: 2, color: BLUE, position: 2, isEmpowered: false },
    { id: 3, color: BLUE, position: 3, isEmpowered: false },
    { id: 4, color: RED, position: 7, isEmpowered: false },
    { id: 5, color: RED, position: 8, isEmpowered: false },
    { id: 6, color: RED, position: 9, isEmpowered: false },
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
      const chipColor = selectedChip.color;
      const from = selectedChip.position;
      const to = cellId;
      let direction: M.Direction;
      if (Math.abs(from - to) === 1) {
        direction = 'neutral';
      } else if ((from - to > 0 && chipColor === RED) || (from - to < 0 && chipColor === BLUE)) {
        direction = 'forward';
      } else {
        direction = 'backward';
      }
      if (direction === 'backward' && !selectedChip.isEmpowered) return;
      // 2. Determine if will become empowered
      let willEmpower: boolean = selectedChip.isEmpowered;
      if (
        (chipColor === RED && RED_EMPOWER_NODES.includes(to)) ||
        (chipColor === BLUE && BLUE_EMPOWER_NODES.includes(to))
      ) {
        willEmpower = true;
      }
      // 3. Commit movement
      setChips((prevState) => {
        const newState = [...prevState];
        newState[selectedChip.id - 1] = { ...selectedChip, position: to, isEmpowered: willEmpower };
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
          const { id, color, isEmpowered, position } = chip;
          return (
            <Chip
              key={id}
              color={color}
              isEmpowered={isEmpowered}
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
