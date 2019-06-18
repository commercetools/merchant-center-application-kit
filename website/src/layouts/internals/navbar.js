import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import {
  Spacings,
  CollapsibleMotion,
  AngleThinRightIcon,
  AngleDownIcon,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import { TextHighlight } from '../../components';
import * as colors from '../../colors';

const ToggableTitle = styled.div`
  cursor: pointer;
`;
const NavbarLinkTitle = styled.div`
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
              border-left: ${customProperties.spacingXs} solid
                ${colors.light.primarySoft};
              color: ${colors.light.primarySoft};
            }
          `}
          activeClassName={makeClassName`
            border-left: ${customProperties.spacingXs} solid ${colors.light.primary} !important;
            color: ${colors.light.primary} !important;
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

const Navbar = props => {
  const data = useStaticQuery(graphql`
    query NavbarQuery {
      site {
        siteMetadata {
          navbarLinks {
            label
            groupKey
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
  const groupKey = props.permalink.replace(/^\/(.*)\/(.*)$/, '$1');
  const [activeGroupKey, setActiveGroupKey] = React.useState(groupKey);
  return (
    <Spacings.Inset scale="l">
      <Spacings.Stack scale="l">
        {data.site.siteMetadata.navbarLinks.map((link, index) => (
          <CollapsibleMotion
            key={index}
            isDefaultClosed={true}
            isClosed={link.groupKey !== activeGroupKey}
            onToggle={() => {
              if (link.groupKey !== activeGroupKey) {
                setActiveGroupKey(link.groupKey);
              } else {
                setActiveGroupKey(null);
              }
            }}
          >
            {({ isOpen, toggle, containerStyles, registerContentNode }) => (
              <Spacings.Stack scale="s">
                <ToggableTitle onClick={toggle}>
                  <Spacings.Inline
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <NavbarLinkTitle>
                      <TextHighlight>{link.label}</TextHighlight>
                    </NavbarLinkTitle>
                    {isOpen ? (
                      <AngleDownIcon size="medium" theme="grey" />
                    ) : (
                      <AngleThinRightIcon size="medium" theme="grey" />
                    )}
                  </Spacings.Inline>
                </ToggableTitle>
                <div style={containerStyles}>
                  <div ref={registerContentNode}>
                    <Spacings.Stack scale="s">
                      {link.subgroup.map((subLink, subGroupIndex) => {
                        if (subLink.subgroup) {
                          return (
                            <Spacings.Stack scale="xs" key={subGroupIndex}>
                              <div
                                css={css`
                                  padding-left: ${customProperties.spacing16};
                                `}
                              >
                                <NavbarLinkSubtitle>
                                  {subLink.label}
                                </NavbarLinkSubtitle>
                              </div>
                              {subLink.subgroup.map(subSubLink => (
                                <NavbarLink
                                  to={subSubLink.linkTo}
                                  key={subSubLink.linkTo}
                                  level={2}
                                  onClick={props.onLinkClick}
                                >
                                  <NavbarLinkText>
                                    {subSubLink.label}
                                  </NavbarLinkText>
                                </NavbarLink>
                              ))}
                            </Spacings.Stack>
                          );
                        }
                        return (
                          <NavbarLink
                            to={subLink.linkTo}
                            key={subLink.linkTo}
                            level={1}
                            onClick={props.onLinkClick}
                          >
                            <NavbarLinkSubtitle>
                              {subLink.label}
                            </NavbarLinkSubtitle>
                          </NavbarLink>
                        );
                      })}
                    </Spacings.Stack>
                  </div>
                </div>
              </Spacings.Stack>
            )}
          </CollapsibleMotion>
        ))}
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
Navbar.displayName = 'Navbar';
Navbar.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  permalink: PropTypes.string.isRequired,
};

export default Navbar;
