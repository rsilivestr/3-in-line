import styled from '@emotion/styled';

export const Root = styled.div`
  width: 100%;
  max-width: 500px;
  display: grid;
  grid-template: 'main' 1fr / 1fr;
`;

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template: repeat(3, 100px) / repeat(3, 100px);
  grid-template-areas: "tl tm tr" "ml mm mr" "bl bm br";
  gap: 100px;
  grid-area: main;
`;
