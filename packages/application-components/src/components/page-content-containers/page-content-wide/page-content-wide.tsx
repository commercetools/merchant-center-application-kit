import { Children, ReactNode } from 'react';
import styled from '@emotion/styled';

export type TPageContentWide = {
  columns: '1' | '1/1' | '2/1';
  gapSize: '10' | '20';
  children: ReactNode;
};

const LeftContentMarginColumn = styled.div`
  grid-area: left-margin;
`;

const MainContentColumn = styled.div<
  Pick<TPageContentWide, 'columns' | 'gapSize' | 'children'>
>`
  grid-area: main-content;
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
  gap: ${(props) => (props.gapSize === '10' ? '32px' : '64px')};
  width: 100%;
`;

const RightContentMarginColumn = styled.div`
  grid-area: right-margin;
`;

const LeftContentInnerColumn = styled.div`
  grid-area: left-column;
`;

const RightContentInnerColumn = styled.div`
  grid-area: right-column;
  position: sticky;
`;

const MainContainer = styled.section`
  display: grid;
  grid-template-areas: 'left-margin main-content right-margin';
  grid-template-columns: 1fr minmax(800px, 1200px) 1fr;
  width: 100%;
`;

function PageContentWide(props: TPageContentWide) {
  const [leftChild, rightChild] = Children.toArray(props.children);
  return (
    <MainContainer>
      <LeftContentMarginColumn />
      <MainContentColumn columns={props.columns} gapSize={props.gapSize}>
        {props.columns === '1' ? (
          <div>{leftChild}</div>
        ) : (
          <>
            <LeftContentInnerColumn>{leftChild}</LeftContentInnerColumn>
            <RightContentInnerColumn>{rightChild}</RightContentInnerColumn>
          </>
        )}
      </MainContentColumn>
      <RightContentMarginColumn />
    </MainContainer>
  );
}

const defaultProps: Pick<TPageContentWide, 'gapSize'> = {
  gapSize: '10',
};
PageContentWide.defaultProps = defaultProps;

export default PageContentWide;
