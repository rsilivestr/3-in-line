import { useEffect, useRef, useState } from 'react';

import { Cell } from 'components/Cell';
import { Chip } from 'components/Chip';
import { Track } from 'components/Track';
import * as M from 'model';

import {
  CELLS,
  TRACKS,
  INITIAL_CHIPS,
  BLUE,
  RED,
  BLUE_EMPOWER_NODES,
  RED_EMPOWER_NODES,
  BLUE_WIN_POSITIONS,
  RED_WIN_POSITIONS,
  ALL_WIN_POSITIONS,
} from './constants';
import * as S from './styled';

const getDirection = (chip: M.Chip, from: number, to: number): M.Direction => {
  let direction: M.Direction;
  if (Math.abs(from - to) === 1) {
    direction = 'neutral';
  } else if ((from - to > 0 && chip.color === RED) || (from - to < 0 && chip.color === BLUE)) {
    direction = 'forward';
  } else {
    direction = 'backward';
  }
  return direction;
};

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
  const [activeCells, setActiveCells] = useState<number[]>([]);
  const activeColor = useRef<M.Color>(RED);

  const handleChipSelect = (chip: M.Chip) => {
    if (winner) return;
    const { id, color } = chip;
    if (id !== selectedChip?.id && color === activeColor.current) {
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
      const direction = getDirection(selectedChip, from, to);
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
      setActiveCells([]);
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

  useEffect(() => {
    if (selectedChip) {
      const selectedPosition = selectedChip.position;
      const chipPositions = chips.map(toPositions);
      const connectedCells = TRACKS.filter((cells) => cells.includes(selectedPosition))
        .flat()
        .filter(
          (cell) =>
            cell !== selectedPosition &&
            !chipPositions.includes(cell) &&
            getDirection(selectedChip, selectedPosition, cell) !== 'backward'
        );
      setActiveCells(connectedCells);
    }
  }, [selectedChip]);

  return (
    <S.Root>
      <S.Grid>
        {TRACKS.map((cells) => {
          let isActive = false;
          if (selectedChip) {
            const chipPositions = chips.map(toPositions);
            const isConnected = cells.includes(selectedChip.position);
            const isBlocked = chipPositions.includes(cells[0]) && chipPositions.includes(cells[1]);
            if (isConnected && !isBlocked) {
              const from = selectedChip.position;
              const to = cells.find((pos) => pos !== from);
              const direction = getDirection(selectedChip, from, to!);
              if (direction !== 'backward' || selectedChip.isEmpowered) {
                isActive = true;
              }
            }
          }
          return <Track key={`${cells[0]}${cells[1]}`} cells={cells} isActive={isActive} />;
        })}
        {CELLS.map(({ id }) => (
          <Cell key={id} isActive={activeCells.includes(id)} onClick={() => handleCellClick(id)} />
        ))}
        {chips.map((chip) => {
          const { id, color, isEmpowered, position } = chip;
          return (
            <Chip
              key={id}
              color={color}
              isActive={color === activeColor.current}
              isEmpowered={isEmpowered}
              isSelected={id === selectedChip?.id}
              isWinner={color === winner}
              position={position}
              onClick={() => handleChipSelect(chip)}
            />
          );
        })}
      </S.Grid>
    </S.Root>
  );
};
