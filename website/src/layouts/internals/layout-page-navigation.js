import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Spacings } from '@commercetools-frontend/ui-kit';
import StackedLinesIndentedIcon from '../../images/icons/stacked-lines-indented-icon.svg';
import { colors, dimensions, typography } from '../../design-system';
import PageNavigation from './page-navigation';

const Container = styled.div`
  border-left: 1px solid ${colors.light.borderPrimary};
  grid-row: 2;
  grid-column: 2;
  width: ${dimensions.widths.pageNavigation};
  display: none;

  @media screen and (${dimensions.viewports.largeTablet}) {
    display: block;
  }
`;
const StickyContainer = styled.div`
  position: sticky;
  top: ${dimensions.spacings.xxl};
`;
const PageTitle = styled.div`
  color: ${colors.light.textSecondary};
  font-size: ${typography.fontSizes.small};
  padding: ${dimensions.spacings.s} ${dimensions.spacings.m} 0;
  border-left: 1px solid transparent;
`;

const LayoutPageNavigation = props => {
  if (!props.tableOfContents) return null;
  if (
    !props.tableOfContents.items ||
    (props.tableOfContents.items && props.tableOfContents.items.length === 0)
  )
    return null;

  return (
    <Container>
      <StickyContainer>
        <Spacings.Stack scale="m">
          <PageTitle>
            <Spacings.Inline scale="s" alignItems="center">
              <div>{props.pageTitle}</div>
              <StackedLinesIndentedIcon />
            </Spacings.Inline>
          </PageTitle>
          <PageNavigation tableOfContents={props.tableOfContents} />
        </Spacings.Stack>
      </StickyContainer>
    </Container>
  );
};
LayoutPageNavigation.displayName = 'LayoutPageNavigation';
LayoutPageNavigation.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  tableOfContents: PropTypes.shape({
    items: PropTypes.array,
  }),
};

export default LayoutPageNavigation;
