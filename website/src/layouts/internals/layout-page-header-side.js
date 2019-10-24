import styled from '@emotion/styled';
import { dimensions } from '../../design-system';

const LayoutPageHeaderSide = styled.div`
  grid-row: 1;
  grid-column: 2;
  width: ${dimensions.widths.pageNavigation};
  display: none;

  @media screen and (${dimensions.viewports.desktop}) {
    display: block;
  }
`;

export default LayoutPageHeaderSide;
