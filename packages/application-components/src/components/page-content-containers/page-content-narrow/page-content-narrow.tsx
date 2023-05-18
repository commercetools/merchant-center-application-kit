import type { ReactNode } from 'react';
import styled from '@emotion/styled';

export type TPageContentNarrow = {
  children: ReactNode;
};

const Content = styled.section`
  grid-area: content;
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: '. content .';
  grid-template-columns: 1fr minmax(400px, 742px) 1fr;
  width: 100%;
`;

function PageContentNarrow(props: TPageContentNarrow) {
  return (
    <Container>
      <Content>{props.children}</Content>
    </Container>
  );
}

export default PageContentNarrow;
