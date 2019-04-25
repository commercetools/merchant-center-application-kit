import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { Spacings, customProperties } from '@commercetools-frontend/ui-kit';
import { TextHighlight } from './styled';
import * as colors from '../colors';

const NavbarLinkTitle = styled(TextHighlight)`
  font-size: 1.2rem;
`;
const NavbarLinkSubtitle = styled.div`
  font-size: 1rem;
`;
const NavbarLinkText = styled.div`
  font-size: 0.8rem;
`;

const NavbarLink = props => {
  const { level, ...restProps } = props;
  const indentation = 16 * level;
  return (
    <ClassNames>
      {({ css: makeClassName }) => (
        <Link
          css={css`
            border-left: ${customProperties.spacingXs} solid
              ${colors.light.surface};
            padding-left: calc(
              ${indentation}px - ${customProperties.spacingXs}
            );
            text-decoration: none;
            color: ${colors.light.text};
            &:hover {
              color: ${colors.light.primary};
            }
          `}
          activeClassName={makeClassName`
            border-left: ${customProperties.spacingXs} solid ${
            colors.light.primary
          } !important;
            color: ${colors.light.primary};
          `}
          {...restProps}
        />
      )}
    </ClassNames>
  );
};
NavbarLink.displayName = 'NavbarLink';
NavbarLink.propTypes = {
  level: PropTypes.oneOf([1, 2]),
};

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query NavbarQuery {
      site {
        siteMetadata {
          navbarLinks {
            label
            subgroup {
              label
              linkTo
              subgroup {
                label
                linkTo
              }
            }
          }
        }
      }
    }
  `);
  return (
    <Spacings.Inset scale="l">
      <Spacings.Stack scale="l">
        {data.site.siteMetadata.navbarLinks.map((link, index) => (
          <Spacings.Stack scale="s" key={index}>
            <NavbarLinkTitle>{link.label}</NavbarLinkTitle>
            {link.subgroup.map((subLink, subGroupIndex) => {
              if (subLink.subgroup) {
                return (
                  <Spacings.Stack scale="xs" key={subGroupIndex}>
                    <div
                      css={css`
                        padding-left: ${customProperties.spacing16};
                      `}
                    >
                      <NavbarLinkSubtitle>{subLink.label}</NavbarLinkSubtitle>
                    </div>
                    {subLink.subgroup.map(subSubLink => (
                      <NavbarLink
                        to={subSubLink.linkTo}
                        key={subSubLink.linkTo}
                        level={2}
                      >
                        <NavbarLinkText>{subSubLink.label}</NavbarLinkText>
                      </NavbarLink>
                    ))}
                  </Spacings.Stack>
                );
              }
              return (
                <NavbarLink to={subLink.linkTo} key={subLink.linkTo} level={1}>
                  <NavbarLinkSubtitle>{subLink.label}</NavbarLinkSubtitle>
                </NavbarLink>
              );
            })}
          </Spacings.Stack>
        ))}
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
Navbar.displayName = 'Navbar';

export default Navbar;
