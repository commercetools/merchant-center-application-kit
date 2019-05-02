import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link as HistoryLink } from 'gatsby';
import { MDXRenderer } from 'gatsby-mdx';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { customProperties } from '@commercetools-frontend/ui-kit';
import * as colors from '../colors';
import ExternalLinkSvg from '../images/external-link.svg';
import { LayoutContent } from '../layouts';
import { SEO, CodeBlock } from '../components';

const TypographyPage = styled.div`
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  line-height: 1.45;
  padding: ${customProperties.spacingL};
  max-width: 740px;
`;
const headerStyles = () => css`
  line-height: 1.15;
  margin: 2.75rem 0 1rem;
`;

// Typography sizes have been calculated from https://type-scale.com
// Ref: https://medium.com/sketch-app-sources/exploring-responsive-type-scales-cf1da541be54
const Paragraph = styled.p`
  margin-bottom: 1.25em;
`;
const H1 = styled.h1`
  ${headerStyles};
  font-size: 4.209em;
  margin-top: 0;
`;
const H2 = styled.h2`
  ${headerStyles};
  font-size: 3.157em;
`;
const H3 = styled.h3`
  ${headerStyles};
  font-size: 2.369em;
`;
const H4 = styled.h4`
  ${headerStyles};
  font-size: 1.777em;
`;
const H5 = styled.h5`
  ${headerStyles};
  font-size: 1.333em;
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
  font-size: 0.9rem;
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
        td:nth-of-type(${index + 1}):before { content: "${
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

    :before {
      display: flex;
      font-weight: 700;
    }
  }
`;
const TableHeader = styled.th`
  padding: ${customProperties.spacingS};

  @media screen and (max-width: 40em) {
    display: block;
  }
`;
const Pre = props => props.children;
const Code = CodeBlock;
const InlineCode = styled.code`
  border: 1px solid ${colors.light.cards};
  border-bottom: 3px solid ${colors.light.cards};
  color: ${colors.light.primary};
  padding: 1px 4px;
  font-size: 1rem;
`;
const Em = styled.em``;
const Strong = styled.strong``;
const Delete = styled.span`
  text-decoration: line-through;
`;
const Hr = styled(ThematicBreak)``;
const linkStyles = css`
  color: ${colors.light.primary};
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
  :hover,
  :active {
    outline-width: 0;
  }
  :visited {
    color: ${colors.light.primarySoft};
  }
`;
// eslint-disable-next-line react/display-name
const Link = props => {
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
        <a
          {...props}
          css={linkStyles}
          target="_blank"
          rel="noopener noreferrer"
        />
        <ExternalLinkSvg />
      </span>
    );
  }

  // Since `document` is not available in SSR, we need to replace
  // the link with the proper value once the component is mounted.
  const [linkTo, setLink] = React.useState(props.href);
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
  });

  return (
    <HistoryLink to={linkTo} css={linkStyles}>
      {props.children}
    </HistoryLink>
  );
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

// See https://mdxjs.com/getting-started#table-of-components
const components = {
  p: Paragraph,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  thematicBreak: ThematicBreak,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  li: Li,
  // eslint-disable-next-line react/display-name
  table: props => (
    <div
      css={css`
        overflow: auto;
      `}
    >
      <Table {...props} />
    </div>
  ),
  tr: TableRow,
  td: TableCell,
  th: TableHeader,
  pre: Pre,
  code: Code,
  inlineCode: InlineCode,
  em: Em,
  strong: Strong,
  delete: Delete,
  hr: Hr,
  a: Link,
  img: Img,
};

const MarkdownTemplate = props => (
  <LayoutContent>
    <MDXProvider components={components}>
      <TypographyPage>
        <SEO title={props.data.mdx.frontmatter.title} />
        {/* This wrapper div is important to ensure the vertical space */}
        <div>
          <MDXRenderer>{props.data.mdx.code.body}</MDXRenderer>
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
      code: PropTypes.shape({
        body: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
export default MarkdownTemplate;

export const pageQuery = graphql`
  query QueryMarkdownPage($id: String!) {
    mdx(frontmatter: { id: { eq: $id } }) {
      id
      frontmatter {
        id
        title
        permalink
      }
      code {
        body
      }
    }
  }
`;
