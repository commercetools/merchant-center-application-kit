import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { customProperties, Spacings } from '@commercetools-frontend/ui-kit';
import * as colors from '../colors';
import LogoSvg from '../images/logo.svg';
import GitHubSvg from '../images/github.svg';

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
    <a href="https://github.com/commercetools/merchant-center-application-kit">
      <GitHubSvg />
    </a>
  </header>
);
Header.displayName = 'Header';
Header.propTypes = {
  className: PropTypes.string,
  siteTitle: PropTypes.string,
};
Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
