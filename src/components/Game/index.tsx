import { useEffect, useRef, useState } from 'react';

import { Cell } from 'components/Cell';
import { Chip } from 'components/Chip';
import {
  CELLS,
  INITIAL_CHIPS,
  BLUE,
  RED,
  BLUE_EMPOWER_NODES,
  RED_EMPOWER_NODES,
  BLUE_WIN_POSITIONS,
  RED_WIN_POSITIONS,
  ALL_WIN_POSITIONS,
} from 'data';
import * as M from 'model';

import * as S from './styled';

const toPositions = ({ position }: M.Chip) => position;

const countEmpoweredChips = (count: number, { isEmpowered }: M.Chip): number =>
  isEmpowered ? count + 1 : count;

const checkEmpower = (chips: M.Chip[]) => chips.reduce(countEmpoweredChips, 0) === 3;

const checkWinner = (chips: M.Chip[], activeColor: M.Color): M.Color | null => {
  const activeChips = activeColor === BLUE ? chips.slice(0, 3) : chips.slice(3, 6);
  const positions = activeChips.map(toPositions).sort();
  const areEmpowered = checkEmpower(activeChips);
  let winPositions: number[][];
  if (areEmpowered) {
    winPositions = ALL_WIN_POSITIONS;
  } else {
    winPositions = activeColor === BLUE ? BLUE_WIN_POSITIONS : RED_WIN_POSITIONS;
  }
  let isWin = false;
  winPositions.forEach((wp) => {
    if (wp.every((position) => positions.includes(position))) {
      isWin = true;
    }
  });
  return isWin ? activeColor : null;
};

export const Game = () => {
  const [chips, setChips] = useState<M.Chip[]>(INITIAL_CHIPS);
  const [selectedChip, setSelectedChip] = useState<M.Chip | null>(null);
  const [winner, setWinner] = useState<M.Color>();
  const activeColor = useRef<M.Color>(RED);

  const handleChipSelect = (chip: M.Chip) => {
    if (winner) return;
    const { id, color } = chip;
    if (id === selectedChip?.id) {
      setSelectedChip(null);
    } else if (color === activeColor.current) {
      setSelectedChip(chip);
    }
  };

  const handleCellClick = async (cellId: number) => {
    if (!selectedChip) return;

    const cell = CELLS.find(({ id }) => id === cellId);
    if (cell!.adjacent.includes(selectedChip.position)) {
      const chipColor = selectedChip.color;
      const from = selectedChip.position;
      const to = cellId;

      // Determine move direction
      let direction: M.Direction;
      if (Math.abs(from - to) === 1) {
        direction = 'neutral';
      } else if ((from - to > 0 && chipColor === RED) || (from - to < 0 && chipColor === BLUE)) {
        direction = 'forward';
      } else {
        direction = 'backward';
      }
      if (direction === 'backward' && !selectedChip.isEmpowered) return;

      // Determine if the chip will become empowered
      let willEmpower: boolean = selectedChip.isEmpowered;
      if (
        (chipColor === RED && RED_EMPOWER_NODES.includes(to)) ||
        (chipColor === BLUE && BLUE_EMPOWER_NODES.includes(to))
      ) {
        willEmpower = true;
      }

      // Move and deselect chip
      setChips((prevState) => {
        const newState = [...prevState];
        newState[selectedChip.id - 1] = { ...selectedChip, position: to, isEmpowered: willEmpower };
        return newState;
      });
      setSelectedChip(null);
      activeColor.current = activeColor.current === RED ? BLUE : RED;
    }
  };

  useEffect(() => {
    const prevColor = activeColor.current === RED ? BLUE : RED;
    const newWinner = checkWinner(chips, prevColor);
    if (newWinner) {
      setWinner(newWinner);
    }
  }, [chips]);

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
              active={color === activeColor.current}
              color={color}
              isEmpowered={isEmpowered}
              isSelected={id === selectedChip?.id}
              position={position}
              winner={color === winner}
              onClick={() => handleChipSelect(chip)}
            />
          );
        })}
      </S.Grid>
    </S.Root>
  );
};
