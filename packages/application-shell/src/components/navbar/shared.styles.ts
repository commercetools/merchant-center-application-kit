import styled from '@emotion/styled';
import { NAVBAR } from '../../constants';

const IconWrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
`;
const Icon = styled.div`
  width: ${NAVBAR.iconSize};
  height: ${NAVBAR.iconSize};
  transition: ${NAVBAR.leftNavigationTransition};

  > svg *:not([fill='none']) {
    fill: var(--color-surface);
  }
`;

const ItemIconText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export { Icon, IconWrapper, ItemIconText };
