import * as S from './styled';

type Props = {
  cells: [number, number];
  isActive: boolean;
};

export const Track: React.FC<Props> = ({ cells, isActive }) => {
  const [from, to] = cells;
  let angle = 0;
  if (to - from === 3) {
    angle = 90;
  }
  if (to - from === 4) {
    angle = 45;
  }
  if (to - from === 2) {
    angle = 135;
  }
  const ty = 45 + Math.floor((from - 1) / 3) * 200;
  const tx = 50 + ((from - 1) % 3) * 200;
  const transform = `translate(${tx}px, ${ty}px) rotate(${angle}deg)`;
  const backgroundColor = isActive ? '#8d8' : '#dde';

  return <S.Track style={{ backgroundColor, transform, transformOrigin: 'center left' }} />;
};
