import { Children, ReactNode } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';

export type TPageContentWide = {
  columns: '1' | '1/1' | '2/1';
  gapSize: '10' | '20';
  children: ReactNode;
};

const Content = styled.section<
  Pick<TPageContentWide, 'columns' | 'gapSize' | 'children'>
>`
  grid-area: content;
  display: grid;
  grid-template-areas: ${(props) =>
    props.columns === '1' ? 'none' : '"left-column right-column"'};
  grid-template-columns: ${(props) => {
    switch (props.columns) {
      case '1/1':
        return '1fr 1fr';
      case '2/1':
        return '2fr 1fr';
      default:
        return '1fr';
    }
  }};
  gap: ${(props) =>
    props.gapSize === '10' ? designTokens.spacing50 : designTokens.spacing70};
  width: 100%;
`;

const LeftContentColumn = styled.div`
  grid-area: left-column;
`;

const RightContentColumn = styled.div`
  grid-area: right-column;
  position: sticky;
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: '. content .';
  grid-template-columns: 1fr minmax(800px, 1200px) 1fr;
  width: 100%;
`;

function PageContentWide(props: TPageContentWide) {
  const [leftChild, rightChild] = Children.toArray(props.children);
  return (
    <Container>
      <Content columns={props.columns} gapSize={props.gapSize}>
        {props.columns === '1' ? (
          <>{leftChild}</>
        ) : (
          <>
            <LeftContentColumn>{leftChild}</LeftContentColumn>
            <RightContentColumn>{rightChild}</RightContentColumn>
          </>
        )}
      </Content>
    </Container>
  );
}

const defaultProps: Pick<TPageContentWide, 'columns' | 'gapSize'> = {
  columns: '1',
  gapSize: '10',
};
PageContentWide.defaultProps = defaultProps;

export default PageContentWide;
