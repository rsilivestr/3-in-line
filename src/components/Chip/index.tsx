import { Crown } from 'components/Crown';

import * as S from './styled';

type Props = {
  color: string;
  isEmpowered: boolean;
  isSelected: boolean;
  position: number;
  onClick: () => void;
};

export const Chip: React.FC<Props> = ({ color, isEmpowered, isSelected, position, onClick }) => {
  const tx = Math.floor((position - 1) / 3) * 200;
  const ty = ((position - 1) % 3) * 200;

  return (
    <S.Chip
      $color={color}
      $selected={isSelected}
      style={{
        borderColor: isSelected ? 'lightgreen' : 'transparent',
        transform: `translate(${ty}%, ${tx}%)`,
      }}
      onClick={onClick}
    >
      {isEmpowered && <Crown />}
    </S.Chip>
  );
};
