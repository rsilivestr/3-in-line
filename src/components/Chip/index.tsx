import * as S from './styled';

type Props = {
  color: string;
  isSelected: boolean;
  position: number;
  onClick: () => void;
};

export const Chip: React.FC<Props> = ({ color, position, isSelected, onClick }) => {
  const tx = Math.floor((position - 1) / 3) * 200;
  const ty = ((position - 1) % 3) * 200;

  return (
    <S.Chip
      $color={color}
      $selected={isSelected}
      style={{
        borderColor: isSelected ? 'lightgreen' : 'transparent',
        transform: `translate(${ty}%, ${tx}%)`
      }}
      onClick={onClick}
    />
  );
};
