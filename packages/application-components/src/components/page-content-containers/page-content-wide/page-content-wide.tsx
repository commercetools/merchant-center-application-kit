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
  const countChildren = Children.count(props.children);

  // if there's 1 column and more than 1 child
  const isColumnsOneAndMoreThanOneChild =
    props.columns === '1' && countChildren > 1;

  useWarning(
    !isColumnsOneAndMoreThanOneChild,
    'PageContentWide: This component has more than 1 child. Only the first child will be rendered.'
  );

  // if there's 1/1 or 2/1 columns and only 1 child
  const isColumnsTwoAndOneChild =
    (props.columns === '1/1' || props.columns === '2/1') && countChildren === 1;

  useWarning(
    !isColumnsTwoAndOneChild,
    'PageContentWide: This component has only 1 child. The second child will be ignored.'
  );

  // if there's 1/1 or 2/1 columns and more than 2 children
  const isColumnsTwoAndMoreThanTwoChildren =
    (props.columns === '1/1' || props.columns === '2/1') && countChildren > 2;

  useWarning(
    !isColumnsTwoAndMoreThanTwoChildren,
    'PageContentWide: This component has more than 2 children. Only the first 2 children will be rendered.'
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
