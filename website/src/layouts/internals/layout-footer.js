import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Spacings, customProperties } from '@commercetools-frontend/ui-kit';
import ExternalLinkSvg from '../../images/external-link.svg';
import * as colors from '../../colors';

const FooterSectionTitle = styled.div`
  font-size: 1.6rem;
  color: ${colors.light.cards};
`;

const FooterSectionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 0 0 ${customProperties.spacingL};

  li::before {
    content: '\\2022';
    color: ${colors.light.cards};
    font-weight: 600;
    display: inline-block;
    width: 1em;
    margin-left: -1px;
  }
`;

const linkStyles = css`
  text-decoration: none;
  font-size: 1.2rem;
  color: ${colors.light.cards};

  :hover {
    opacity: 0.8;
  }
`;
const TextLink = styled(Link)`
  ${linkStyles};
`;
const TextExternalLink = props => (
  <a {...props} css={linkStyles} target="_blank" rel="noopener noreferrer">
    <span
      css={css`
        display: inline-flex;
        align-items: center;
      `}
    >
      {props.children}
      <ExternalLinkSvg
        css={css`
          > g > g {
            fill: ${colors.light.cardsSoft};
          }
        `}
      />
    </span>
  </a>
);
TextExternalLink.displayName = 'TextExternalLink';
TextExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
};

const LayoutFooter = () => {
  const data = useStaticQuery(graphql`
    query GetMainResourcesLinks {
      site(
        siteMetadata: {
          navbarLinks: { elemMatch: { groupKey: { nin: ["getting-started"] } } }
        }
      ) {
        siteMetadata {
          navbarLinks {
            label
            groupKey
          }
        }
      }
    }
  `);
  return (
    <div
      css={css`
        background-color: ${colors.light.text};
        color: ${colors.light.cards};
        padding: ${customProperties.spacingXl};
      `}
    >
      <div
        css={css`
          width: 90%;
          max-width: 740px;
          margin: 0 auto;
        `}
      >
        <Spacings.Stack scale="l">
          <Spacings.Inline
            alignItems="flex-start"
            justifyContent="space-around"
          >
            <Spacings.Stack scale="m">
              <FooterSectionTitle>{'Documentation'}</FooterSectionTitle>
              <FooterSectionList>
                {data.site.siteMetadata.navbarLinks.map(link => (
                  <li key={link.groupKey}>
                    <TextLink to={`/${link.groupKey}`}>{link.label}</TextLink>
                  </li>
                ))}
              </FooterSectionList>
            </Spacings.Stack>
            <Spacings.Stack scale="m">
              <FooterSectionTitle>{'Resources'}</FooterSectionTitle>
              <FooterSectionList>
                <li>
                  <TextExternalLink href="https://github.com/commercetools/merchant-center-application-kit">
                    {'GitHub'}
                  </TextExternalLink>
                </li>
                <li>
                  <TextExternalLink href="https://github.com/commercetools/ui-kit">
                    {'UI-Kit'}
                  </TextExternalLink>
                </li>
                <li>
                  <TextExternalLink href="https://docs.commercetools.com">
                    {'commercetools platform'}
                  </TextExternalLink>
                </li>
              </FooterSectionList>
            </Spacings.Stack>
          </Spacings.Inline>
          <div
            css={css`
              text-align: center;
              color: ${colors.light.cards};
            `}
          >
            {'copyright'} &copy;{' '}
            {`${new Date().getFullYear()} commercetools GmbH`}
          </div>
        </Spacings.Stack>
      </div>
    </div>
  );
};
LayoutFooter.displayName = 'LayoutFooter';

export default LayoutFooter;
