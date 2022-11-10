import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { Crown } from 'components/Crown';

import * as S from './styled';

type Props = {
  active: boolean;
  color: string;
  isEmpowered: boolean;
  isSelected: boolean;
  position: number;
  winner: boolean;
  onClick: () => void;
};

export const Chip: React.FC<Props> = ({
  active,
  color,
  isEmpowered,
  isSelected,
  position,
  winner,
  onClick,
}) => {
  const borderColor = isSelected ? 'lightgreen' : 'transparent';
  const filter = active || winner ? undefined : 'grayscale(0.5)';
  const opacity = active || winner ? 1 : 0.5;
  const tx = Math.floor((position - 1) / 3) * 200;
  const ty = ((position - 1) % 3) * 200;
  const transform = `translate(${ty}%, ${tx}%)`;
  const winAnimation = keyframes`
    0%, 33.33%, 66.67% {
      transform: ${transform} scale(1);
    }
    16.67%, 50%, 83.33% {
      transform: ${transform} scale(4);
    }
    100% {
      transform: ${transform} scale(1.5);
    }
  `;

  const AnimatedChip = styled(S.Chip)`
    animation: ${winAnimation} ease-in-out 3s;
    animation-fill-mode: forwards;
  `;

  const Element = winner ? AnimatedChip : S.Chip;

  return (
    <Element
      $color={color}
      style={{
        borderColor,
        filter,
        opacity,
        transform,
      }}
      onClick={onClick}
    >
      {isEmpowered && <Crown />}
    </Element>
  );
};
