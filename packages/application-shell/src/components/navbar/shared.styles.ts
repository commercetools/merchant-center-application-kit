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

const Title = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: var(--font-size-for-navbar-link);
  line-height: var(--line-height-for-navbar-link);
  color: var(--color-for-navbar-link);
  opacity: 0;
  transition: ${NAVBAR.leftNavigationTransition};
  text-align: left;
  text-decoration: none;
  z-index: 1;
`;

export { Icon, IconWrapper, ItemIconText, Title };
