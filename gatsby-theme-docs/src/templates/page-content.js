import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import LayoutContent from '../layouts/content';
import { SEO, Markdown } from '../components';
import PlaceholderMarkdownComponents from '../overrides/markdown-components';

// See https://mdxjs.com/getting-started#table-of-components
const components = {
  p: Markdown.Paragraph,
  // NOTE: we want to ensure that only one h1 exists on each page.
  // Therefore, we map the markdown header elements starting from h2.
  // The h1 header will be automatically rendered based on the frontmatter
  // page values.
  h1: Markdown.withAnchorLink(Markdown.H2),
  h2: Markdown.withAnchorLink(Markdown.H3),
  h3: Markdown.withAnchorLink(Markdown.H4),
  h4: Markdown.withAnchorLink(Markdown.H5),
  h5: Markdown.withAnchorLink(Markdown.H6),
  h6: Markdown.withAnchorLink(Markdown.H6),
  thematicBreak: Markdown.ThematicBreak,
  blockquote: Markdown.Blockquote,
  ul: Markdown.Ul,
  ol: Markdown.Ol,
  li: Markdown.Li,
  table: Markdown.ScrollableTable,
  tr: Markdown.TableRow,
  td: Markdown.TableCell,
  th: Markdown.TableHeader,
  inlineCode: Markdown.InlineCode,
  em: Markdown.Em,
  strong: Markdown.Strong,
  delete: Markdown.Delete,
  hr: Markdown.Hr,
  a: Markdown.Link,
  img: Markdown.Img,
  // eslint-disable-next-line react/display-name
  pre: Markdown.CodeBlock,

  // Custom React components to be used in MDX files
  ...PlaceholderMarkdownComponents,
};

const getSeoTitle = slug =>
  slug
    .split('/')
    .map(linkPath =>
      linkPath
        // Upper case first letter
        .replace(/^([a-zA-Z])/i, char => char.toUpperCase())
        // Use whitespace instead of hyphens
        .replace(/-/gi, ' ')
    )
    .filter(Boolean)
    .join(' > ');

const PageContentTemplate = props => (
  <LayoutContent pageData={props.data.mdx}>
    <MDXProvider components={components}>
      <Markdown.TypographyPage>
        <SEO title={getSeoTitle(props.data.mdx.fields.slug)} />
        {/* This wrapper div is important to ensure the vertical space */}
        <div>
          <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
        </div>
      </Markdown.TypographyPage>
    </MDXProvider>
  </LayoutContent>
);

PageContentTemplate.displayName = 'PageContentTemplate';
PageContentTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }).isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
      }).isRequired,
      body: PropTypes.string.isRequired,
      tableOfContents: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
export default PageContentTemplate;

export const query = graphql`
  query QueryMarkdownPage($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        beta
      }
      body
      tableOfContents(maxDepth: 4)
    }
  }
`;
