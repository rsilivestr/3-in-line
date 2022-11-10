import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { Crown } from 'components/Crown';

import * as S from './styled';

type Props = {
  color: string;
  isActive: boolean;
  isEmpowered: boolean;
  isSelected: boolean;
  isWinner: boolean;
  position: number;
  onClick: () => void;
};

export const Chip: React.FC<Props> = ({
  color,
  isActive,
  isEmpowered,
  isSelected,
  isWinner,
  position,
  onClick,
}) => {
  // eslint-disable-next-line no-nested-ternary
  const borderColor = isWinner ? '#fe4' : isSelected ? 'lightgreen' : 'transparent';
  const filter = isActive || isWinner ? undefined : 'grayscale(0.5)';
  const opacity = isActive || isWinner ? 1 : 0.5;
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
      transform: ${transform} scale(1);
    }
  `;

  const AnimatedChip = styled(S.Chip)`
    animation: ${winAnimation} ease-in-out 3s;
    animation-fill-mode: forwards;
  `;

  const Element = isWinner ? AnimatedChip : S.Chip;

  return (
    <Element
      $color={color}
      style={{
        borderColor,
        filter,
        opacity,
        transform,
        zIndex: isWinner ? 5 : 1,
      }}
      onClick={onClick}
    >
      {isEmpowered && <Crown />}
    </Element>
  );
};
