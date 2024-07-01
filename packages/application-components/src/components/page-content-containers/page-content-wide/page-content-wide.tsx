import { Children, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { useWarning } from '@commercetools-uikit/utils';

export type TPageContentWide = {
  columns: '1' | '1/1' | '2/1';
  gapSize: '10' | '20';
  children: ReactNode;
  // @deprecated
  themeParentSelector?: () => HTMLElement | null;
};

const Content = styled.section<
  Pick<TPageContentWide, 'columns' | 'gapSize' | 'children'>
>`
  grid-area: content;
  display: grid;
  grid-template-areas: ${(props) =>
    props.columns === '1' ? 'none' : '"left-column right-column"'};
  grid-template-columns: ${(props) => {
    // NOTE: using only `?fr` can cause the layout the "break" as `fr`
    // is all about distribution of the available space.
    // If the content of a column becomes "bigger", the system tries
    // to compensate for the lack of space by reducing the width of the
    // other column (it does not overflow).
    // To fix that, we can use `minmax` to instruct the system that
    // the column size has to be maintained. However, this will cause
    // some overflow if the content is bigger.
    // For us, it's important to ensure that the columns layout maintains
    // the correct dimensions and sizes, thus using `minmax`.
    switch (props.columns) {
      case '1/1':
        return 'repeat(2, minmax(0, 1fr))';
      case '2/1':
        return 'minmax(0, 2fr) minmax(0, 1fr)';
      default:
        return 'minmax(0, 1fr)';
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
`;

const RightColumnContentWrapper = styled.div<Pick<TPageContentWide, 'columns'>>`
  top: 0;
  position: ${(props) => (props.columns === '2/1' ? 'sticky' : 'static')};
`;

const Container = styled.div`
  display: grid;
  grid-template-areas: '. content .';
  grid-template-columns: 1fr minmax(800px, 1200px) 1fr;
  width: 100%;
`;

function PageContentWide(props: TPageContentWide) {
  const [leftChild, rightChild] = Children.toArray(props.children);
  const childrenCount = Children.count(props.children);

  const isOneColumnAndMoreThanOneChild =
    props.columns === '1' && childrenCount > 1;

  const isTwoColumnsAndMoreThanTwoChildren =
    props.columns !== '1' && childrenCount > 2;

  useWarning(
    !isOneColumnAndMoreThanOneChild,
    'PageContentWide: This component only renders its first children when using a single column but you provided more than one.'
  );

  useWarning(
    !isTwoColumnsAndMoreThanTwoChildren,
    'PageContentWide: This component only renders its first two children when using a two columns layout but you provided more than two.'
  );

  return (
    <Container>
      <Content columns={props.columns} gapSize={props.gapSize}>
        {props.columns === '1' ? (
          <>{leftChild}</>
        ) : (
          <>
            <LeftContentColumn>{leftChild}</LeftContentColumn>
            <RightContentColumn>
              <RightColumnContentWrapper columns={props.columns}>
                {rightChild}
              </RightColumnContentWrapper>
            </RightContentColumn>
          </>
        )}
      </Content>
    </Container>
  );
}

const defaultProps: Pick<TPageContentWide, 'columns' | 'gapSize'> = {
  columns: '1',
  gapSize: '20',
};
PageContentWide.defaultProps = defaultProps;

export default PageContentWide;
