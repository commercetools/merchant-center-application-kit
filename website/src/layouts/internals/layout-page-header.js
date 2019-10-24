import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const LayoutPageHeader = styled.div`
  grid-row: 1;
  grid-column: 1/3;
  padding: ${dimensions.spacings.m} ${dimensions.spacings.m} 0;
  max-width: ${dimensions.widths.pageContent};

  @media screen and (${dimensions.viewports.tablet}) {
    grid-column: 1;
    padding: ${dimensions.spacings.m} ${dimensions.spacings.xl} 0;
  }
`;

export default LayoutPageHeader;
