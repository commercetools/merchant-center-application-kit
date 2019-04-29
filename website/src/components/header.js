import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { customProperties, Spacings } from '@commercetools-frontend/ui-kit';
import * as colors from '../colors';
import LogoSvg from '../images/logo.svg';
import GitHubSvg from '../images/github.svg';
import BurgerIcon from './burger-icon';

const MenuButton = styled.button`
  appearance: none;
  border: 0;
  color: inherit;
  padding: 2px;
  background-color: transparent;
  border-radius: 4px;

  :focus {
    outline: 1px solid ${colors.light.cards};
  }

  @media screen and (min-width: 40em) {
    display: none;
  }
`;

const Header = props => (
  <header
    className={props.className}
    css={css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 ${customProperties.spacingM};
      flex: 1;
    `}
  >
    <Link
      to="/"
      css={css`
        color: ${colors.light.text};
        text-decoration: none;
        white-space: nowrap;
      `}
    >
      <Spacings.Inline scale="m" alignItems="center">
        <LogoSvg height={36} />
        <div
          css={css`
            font-size: 1.4rem;
          `}
        >
          {'App Kit'}
        </div>
      </Spacings.Inline>
    </Link>
    <Spacings.Inline alignItems="center">
      <a
        css={css`
          display: flex;
        `}
        href="https://github.com/commercetools/merchant-center-application-kit"
      >
        <GitHubSvg />
      </a>
      <MenuButton onClick={props.toggleMenu}>
        <BurgerIcon isActive={props.isMenuOpen} />
      </MenuButton>
    </Spacings.Inline>
  </header>
);
Header.displayName = 'Header';
Header.propTypes = {
  className: PropTypes.string,
  siteTitle: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};
Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
