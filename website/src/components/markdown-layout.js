import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Layout from './layout';
import SEO from './seo';

// TODO: style components
const Paragraph = styled.p``;
const H1 = styled.h1``;
const H2 = styled.h2``;
const H3 = styled.h3``;
const H4 = styled.h4``;
const H5 = styled.h5``;
const H6 = styled.h6``;
const ThematicBreak = styled.div``;
const Blockquote = styled.blockquote``;
const Ul = styled.ul``;
const Ol = styled.ol``;
const Li = styled.li``;
const Table = styled.table``;
const TableRow = styled.tr``;
const TableCell = styled.td``;
const TableHeader = styled.th``;
const Pre = styled.pre``;
const Code = styled.code``;
const InlineCode = styled.code``;
const Em = styled.em``;
const Strong = styled.strong``;
const Delete = styled.span`
  text-decoration: line-through;
`;
const Hr = styled.hr``;
const Link = styled.a``;
const Img = styled.img``;

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
  table: Table,
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

const MarkdownLayout = props => (
  <Layout>
    <MDXProvider components={components}>
      <div
        css={css`
          padding: 16px;
        `}
      >
        <SEO title={props.frontmatter.title} />
        {props.children}
      </div>
    </MDXProvider>
  </Layout>
);
MarkdownLayout.displayName = 'MarkdownLayout';
MarkdownLayout.propTypes = {
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default MarkdownLayout;
