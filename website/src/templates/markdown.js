import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link as HistoryLink } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-frontend/ui-kit';
import * as colors from '../colors';
import ExternalLinkSvg from '../images/external-link.svg';
import { LayoutContent } from '../layouts';
import { SEO, ExternalLink } from '../components';

// Typography sizes have been calculated from https://type-scale.com
// Ref: https://medium.com/sketch-app-sources/exploring-responsive-type-scales-cf1da541be54
const typographyScale = {
  // perfectFourth: {
  //   h1: '4.209em',
  //   h2: '3.157em',
  //   h3: '2.369em',
  //   h4: '1.777em',
  //   h5: '1.333em',
  // },
  // augmentedFourth: {
  //   h1: '5.653em',
  //   h2: '3.998em',
  //   h3: '2.827em',
  //   h4: '1.999em',
  //   h5: '1.414em',
  // },
  normalized: {
    h1: '5rem',
    h2: '3.5rem',
    h3: '2.5rem',
    h4: '2rem',
    h5: '1.7rem',
    body: '1.4rem',
  },
};

const TypographyPage = styled.div`
  font-family: 'Barlow', sans-serif;
  font-size: ${typographyScale.normalized.body};
  font-weight: normal;
  line-height: 1.5;
  word-spacing: 3px;
  padding: ${customProperties.spacingL};
  max-width: 740px;
`;
const headerStyles = () => css`
  line-height: 1.15;
  margin: 2.75rem 0 1rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1.25em;
`;
const H1 = styled.h1`
  ${headerStyles};
  font-size: ${typographyScale.normalized.h1};
  margin-top: 0;
`;
const H2 = styled.h2`
  ${headerStyles};
  font-size: ${typographyScale.normalized.h2};
`;
const H3 = styled.h3`
  ${headerStyles};
  font-size: ${typographyScale.normalized.h3};
`;
const H4 = styled.h4`
  ${headerStyles};
  font-size: ${typographyScale.normalized.h4};
`;
const H5 = styled.h5`
  ${headerStyles};
  font-size: ${typographyScale.normalized.h5};
`;
const H6 = styled.h6`
  ${headerStyles};
`;
const ThematicBreak = styled.hr`
  height: 1px;
  border: 0;
  background-image: linear-gradient(
    to right,
    ${colors.light.bordersSoft},
    ${colors.light.borders},
    ${colors.light.bordersSoft}
  );
`;
const Blockquote = styled.blockquote`
  border-left: 0.25em solid ${colors.light.cards};
  color: ${colors.light.textSoft};
  background-color: ${colors.light.cardsSoft};
  font-style: italic;
  padding: 0.25rem 1rem;
  margin: 0;
  margin-bottom: ${customProperties.spacingM};

  > :first-of-type {
    margin-top: 0;
  }
  > :last-of-type {
    margin-bottom: 0;
  }
`;
const Ul = styled.ul`
  margin: 0;
  padding-left: 2em;
  > * + * {
    margin-top: 0.25em;
  }
`;
const Ol = styled.ol`
  margin: 0;
  padding-left: 2em;
  > * + * {
    margin-top: 0.25em;
  }
`;
const Li = styled.li``;
const Table = styled.table`
  border-collapse: collapse;
  font-size: 1.1rem;
  tbody {
    border-top: 4px solid ${colors.light.cards};
  }

  @media screen and (max-width: 40em) {
    display: block;
    tbody {
      display: block;
    }
    thead {
      display: block;
    }
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    ${props => {
      const tableHeaders = React.Children.toArray(props.children).find(
        elem => elem.props.mdxType === 'thead'
      );
      const rowHeaders = tableHeaders.props.children;
      return React.Children.toArray(rowHeaders.props.children).reduce(
        (styles, elem, index) => `
        ${styles}
        td:nth-of-type(${index + 1})::before { content: "${
          elem.props.children
        }"; }
      `,
        ''
      );
    }}
  }
`;
const TableRow = styled.tr`
  > * + * {
    border-left: 1px solid ${colors.light.cards};
  }

  @media screen and (max-width: 40em) {
    display: block;
    border: 1px solid ${colors.light.cards};
  }
`;
const TableCell = styled.td`
  border-bottom: 2px solid ${colors.light.cards};
  padding: ${customProperties.spacingS};

  @media screen and (max-width: 40em) {
    display: block;
    border: none;
    border-bottom: 1px solid ${colors.light.cards};

    ::before {
      display: flex;
      font-weight: 700;
    }
  }
`;
const TableHeader = styled.th`
  padding: ${customProperties.spacingS};
  text-align: left;

  @media screen and (max-width: 40em) {
    display: block;
  }
`;
const InlineCode = styled.code`
  border: 1px solid ${colors.light.cards};
  border-bottom: 3px solid ${colors.light.cards};
  color: ${colors.light.primary};
  padding: 2px 4px;
  font-size: 1.3rem;
`;
const Em = styled.em``;
const Strong = styled.strong``;
const Delete = styled.span`
  text-decoration: line-through;
`;
const Hr = styled(ThematicBreak)``;
// eslint-disable-next-line react/display-name
const PatchedLink = props => {
  // Since `document` is not available in SSR, we need to replace
  // the link with the proper value once the component is mounted.
  const [linkTo, setLink] = React.useState();
  React.useEffect(() => {
    // At this point, `href` values are relative but the link router expects
    // a full relative path from the base URL path.
    // E.g. if `href="./foo"` and we're on page `/getting-started/bar`, the
    // value we need is `/getting-started/foo`.
    // To achieve that, we let the DOM API build the full URL, then we simply
    // extract the relative path.
    const linkElement = document.createElement('a');
    linkElement.href = props.href;
    const absoluteUrl = linkElement.href; // <-- this now is the full absolute URL
    const [, relativePath] = absoluteUrl.split(window.location.origin);
    setLink(relativePath);
  }, [props.href]);
  if (linkTo) {
    return (
      <HistoryLink to={linkTo} css={ExternalLink.linkStyles}>
        {props.children}
      </HistoryLink>
    );
  }
  return props.children;
};
PatchedLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
// eslint-disable-next-line react/display-name
const Link = props => {
  if (props.href.startsWith('/static')) {
    return <a {...props} />;
  }

  const isExternalLink =
    /^https?/.test(props.href) || (props.target && props.target === '_blank');

  if (isExternalLink) {
    return (
      <span
        css={css`
          display: inline-flex;
          align-items: center;
        `}
      >
        <ExternalLink {...props} />
        <ExternalLinkSvg />
      </span>
    );
  }

  return <PatchedLink {...props} />;
};
Link.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  children: PropTypes.node.isRequired,
};
const Img = styled.img`
  background-color: ${colors.light.surface};
  box-sizing: content-box;
  max-width: 100%;
`;

/* eslint-disable react/display-name,react/prop-types */
const withAnchorLink = Component => props => {
  return (
    <Component
      {...props}
      css={css`
        a {
          margin-left: ${customProperties.spacingM};
          color: ${customProperties.colorNeutral};
          font-size: 0.7em;
        }
        [role='anchor-link'] {
          visibility: hidden;
        }
        :hover {
          [role='anchor-link'] {
            visibility: visible;
          }
        }
        display: flex;
        align-items: center;
      `}
    >
      {props.children}
      <a href={`#${props.id}`}>
        <span
          role="anchor-link"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: '&#8267;' }}
        />
      </a>
    </Component>
  );
};
/* eslint-enable */

// See https://mdxjs.com/getting-started#table-of-components
const components = {
  p: Paragraph,
  h1: H1,
  h2: withAnchorLink(H2),
  h3: withAnchorLink(H3),
  h4: withAnchorLink(H4),
  h5: withAnchorLink(H5),
  h6: withAnchorLink(H6),
  thematicBreak: ThematicBreak,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  li: Li,
  // eslint-disable-next-line react/display-name
  table: props => (
    <div
      css={css`
        overflow-x: auto;
      `}
    >
      <Table {...props} />
    </div>
  ),
  tr: TableRow,
  td: TableCell,
  th: TableHeader,
  inlineCode: InlineCode,
  em: Em,
  strong: Strong,
  delete: Delete,
  hr: Hr,
  a: Link,
  img: Img,
};

const MarkdownTemplate = props => (
  <LayoutContent pageData={props.data.mdx}>
    <MDXProvider components={components}>
      <TypographyPage>
        <SEO title={props.data.mdx.frontmatter.title} />
        {/* This wrapper div is important to ensure the vertical space */}
        <div>
          <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
        </div>
      </TypographyPage>
    </MDXProvider>
  </LayoutContent>
);

MarkdownTemplate.displayName = 'MarkdownTemplate';
MarkdownTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        permalink: PropTypes.string,
      }).isRequired,
      body: PropTypes.string.isRequired,
      tableOfContents: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
export default MarkdownTemplate;

export const query = graphql`
  query QueryMarkdownPage($id: String!) {
    mdx(frontmatter: { id: { eq: $id } }) {
      id
      frontmatter {
        id
        title
        permalink
      }
      body
      tableOfContents(maxDepth: 2)
    }
  }
`;
