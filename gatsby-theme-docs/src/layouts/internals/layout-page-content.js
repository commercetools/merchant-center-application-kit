import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const LayoutPageContent = styled.div`
  grid-row: 2;
  grid-column: 1/3;
  padding: ${dimensions.spacings.xl} ${dimensions.spacings.m};
  max-width: ${dimensions.widths.pageContent};

  > * + * {
    margin: ${dimensions.spacings.xl} 0 0;
  }

  @media screen and (${dimensions.viewports.largeTablet}) {
    grid-column: 1;
    padding: ${dimensions.spacings.xl};
  }
`;

export default LayoutPageContent;
