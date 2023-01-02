import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@commercetools-uikit/design-system';

export type TPageContentNarrow = {
  children: ReactNode;
};

const Content = styled.section`
  grid-area: content;
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: '. content .';
  grid-template-columns: 1fr minmax(400px, 600px) 1fr;
  width: 100%;
`;

function PageContentNarrow(props: TPageContentNarrow) {
  const { isNewTheme } = useTheme();
  if (!isNewTheme) return <>{props.children}</>;

  return (
    <Container>
      <Content>{props.children}</Content>
    </Container>
  );
}

export default PageContentNarrow;
