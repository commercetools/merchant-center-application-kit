import { ReactNode } from 'react';
import styled from '@emotion/styled';

export type TPageContentNarrow = {
  children: ReactNode;
};

const LeftContentMarginColumn = styled.div`
  grid-area: 'left-margin';
`;

const MainContentColumn = styled.div`
  grid-area: 'main-content';
`;

const RightContentMarginColumn = styled.div`
  grid-area: 'right-margin';
`;

const MainContainer = styled.section`
  display: grid;
  grid-template-areas: 'left-margin main-content right-margin';
  grid-template-columns: 1fr minmax(400px, 600px) 1fr;
  width: 100%;
`;

function PageContentNarrow(props: TPageContentNarrow) {
  return (
    <MainContainer>
      <LeftContentMarginColumn />
      <MainContentColumn>{props.children}</MainContentColumn>
      <RightContentMarginColumn />
    </MainContainer>
  );
}

export default PageContentNarrow;
