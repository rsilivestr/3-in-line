import styled from '@emotion/styled';

export const Chip = styled.div<{ $color: string }>`
  position: absolute;
  width: 100px;
  height: 100px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${({ $color }) => $color};
  background-clip: padding-box;
  border: 15px solid transparent;
  transition: all 200ms;

  &:hover {
    border-color: lightgreen;
  }
`;
