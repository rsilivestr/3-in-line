import styled from '@emotion/styled';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template: repeat(3, 100px) / repeat(3, 100px);
  grid-template-areas: 'tl tm tr' 'ml mm mr' 'bl bm br';
  gap: 100px;
  grid-area: main;
`;

export const Button = styled.button`
  padding: 20px;
  background-color: #2bc;
  border: none;
  border-radius: 100px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
`;
