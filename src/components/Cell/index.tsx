import * as S from './styled';

type Props = {
  children?: React.ReactNode;
  onClick: () => void;
};

export const Cell: React.FC<Props> = ({ children, onClick }) => (
  <S.Cell onClick={onClick}>{children}</S.Cell>
);
