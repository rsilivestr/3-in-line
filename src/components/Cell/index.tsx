import * as S from './styled';

type Props = {
  children?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

export const Cell: React.FC<Props> = ({ children, isActive, onClick }) => (
  <S.Cell style={{ borderColor: isActive ? 'lightgreen' : '#dde' }} onClick={onClick}>
    {children}
  </S.Cell>
);
