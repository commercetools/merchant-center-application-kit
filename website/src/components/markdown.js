import React from 'react';
import PropTypes from 'prop-types';
import { Link as HistoryLink, withPrefix } from 'gatsby';
import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import {
  customProperties,
  ExternalLinkIcon,
  ClipboardIcon,
} from '@commercetools-frontend/ui-kit';
import { colors, dimensions, typography } from '../design-system';
import copyToClipboard from '../utils/copy-to-clipboard';
import codeBlockParseOptions from '../utils/code-block-parse-options';
import codeBlockHighlightCode from '../utils/code-block-highlight-code';
import ExternalLink from './external-link';

const TypographyPage = styled.div`
  font-family: ${typography.fontFamilies.primary};
  font-size: ${typography.fontSizes.body};
  font-weight: ${typography.fontWeights.regular};
  line-height: 1.5;
  word-spacing: 2px;
`;
const headerStyles = () => css`
  font-weight: ${typography.fontWeights.medium};
  line-height: 1.3;
  margin: ${dimensions.spacings.m} 0 ${dimensions.spacings.s};
`;

const Paragraph = styled.p`
  margin: ${dimensions.spacings.s} 0;
`;
const H1 = styled.h1`
  ${headerStyles};
  font-size: ${typography.fontSizes.h1};
  margin: 0 0 ${dimensions.spacings.s};
  font-weight: ${typography.fontWeights.regular};
  line-height: 1.15;
  color: ${colors.light.primary};
`;
const H2 = styled.h2`
  ${headerStyles};
  border-bottom: 1px solid ${colors.light.surfaceSecondary3};
  font-size: ${typography.fontSizes.h2};
  font-weight: ${typography.fontWeights.bold};
  margin: ${dimensions.spacings.xxxxl} 0 ${dimensions.spacings.xxxl};
  padding-bottom: ${dimensions.spacings.s};
`;
const H3 = styled.h3`
  ${headerStyles};
  font-size: ${typography.fontSizes.h3};
`;
const H4 = styled.h4`
  ${headerStyles};
  font-size: ${typography.fontSizes.h4};
`;
const H5 = styled.h5`
  ${headerStyles};
  font-size: ${typography.fontSizes.h5};
`;
const H6 = styled.h6`
  ${headerStyles};
  font-size: ${typography.fontSizes.h6};
  line-height: 1.4;
`;
const ThematicBreak = styled.hr`
  height: 1px;
  border: 0;
  background-color: ${colors.light.surfaceSecondary3};
`;
const Blockquote = styled.blockquote`
  background-color: ${colors.light.surfaceQuote};
  border-left: 1px solid ${colors.light.borderHighlight};
  border-radius: 0 ${customProperties.borderRadius6}
    ${customProperties.borderRadius6} 0;
  color: ${colors.light.textFaded};
  font-size: ${typography.fontSizes.small};
  margin: ${dimensions.spacings.l} ${dimensions.spacings.xxl};
  padding: ${dimensions.spacings.xs} ${dimensions.spacings.s};

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
  font-size: ${typography.fontSizes.body};
  tbody {
    border-top: 2px solid ${colors.light.borderPrimary};
  }
  thead tr {
    background: ${colors.light.surfacePrimary} !important;
  }

  @media screen and (${dimensions.viewports.mobile}) {
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
  &:nth-of-type(odd) {
    background: ${colors.light.surfaceSecondary1};
  }
  &:nth-of-type(even) {
    background: ${colors.light.surfacePrimary};
  }

  > * + * {
    border-left: 1px solid ${colors.light.borderPrimary};
  }

  @media screen and (${dimensions.viewports.mobile}) {
    display: block;
    border: 1px solid ${colors.light.borderPrimary};
  }
`;
const TableCell = styled.td`
  border-bottom: 1px solid ${colors.light.borderPrimary};
  font-size: ${typography.fontSizes.small};
  padding: ${dimensions.spacings.s};
  white-space: pre-wrap;
  vertical-align: top;

  @media screen and (${dimensions.viewports.mobile}) {
    display: block;
    border: none;
    border-bottom: 1px solid ${colors.light.borderPrimary};

    ::before {
      display: flex;
      font-weight: ${typography.fontWeights.bold};
    }
  }
`;
const TableHeader = styled.th`
  font-size: ${typography.fontSizes.small};
  padding: ${dimensions.spacings.s};
  text-align: left;

  @media screen and (${dimensions.viewports.mobile}) {
    display: block;
  }
`;
const ScrollableTable = props => (
  <div
    css={css`
      overflow-x: auto;
      border: 1px solid ${colors.light.borderPrimary};
    `}
  >
    <Table {...props} />
  </div>
);
const InlineCode = styled.code`
  background-color: ${colors.light.borderPrimary};
  border: 1px solid ${colors.light.surfaceInfo};
  border-radius: ${dimensions.spacings.xs};
  color: ${colors.light.textCode};
  font-family: ${typography.fontFamilies.code};
  font-size: ${typography.fontSizes.small};
  padding: 0 ${dimensions.spacings.xs};
`;
const CodeBlock = props => {
  const className = props.children.props ? props.children.props.className : '';
  const [languageTag] = className.split(':');
  const languageAliases = { sh: 'bash', zsh: 'bash', js: 'javascript' };
  const parsedLanguage = languageTag.split('language-').pop();
  const language = languageAliases[parsedLanguage] || parsedLanguage;
  const content =
    props.children.props && props.children.props.children
      ? props.children.props.children
      : props.children;
  const { splitLanguage, highlightLines } = codeBlockParseOptions(language);
  const formattedContent = codeBlockHighlightCode(
    splitLanguage,
    content,
    highlightLines
  ).replace(/\n$/, '');
  const numberOfLines =
    formattedContent.length === 0 ? 0 : formattedContent.split(`\n`).length;
  const handleCopyToClipboardClick = () => copyToClipboard(content);

  return (
    <>
      <Global
        styles={css`
          .gatsby-highlight {
            background-color: ${colors.light.surfaceCode};
            border-radius: ${customProperties.borderRadius6};
            margin: ${dimensions.spacings.m} 0;
            padding: ${dimensions.spacings.s} ${dimensions.spacings.m};
            overflow: auto;
          }
          .gatsby-highlight > code,
          .gatsby-highlight code[class*='language-'],
          .gatsby-highlight pre[class*='language-'],
          .gatsby-highlight .line-numbers-rows {
            font-family: ${typography.fontFamilies.code};
            font-size: ${typography.fontSizes.small};
          }
          .gatsby-highlight pre[class*='language-'] {
            background-color: ${colors.light.surfaceCode};
            margin: 0;
          }
          .gatsby-highlight pre[class*='language-'].line-numbers {
            padding: 0 ${dimensions.spacings.xl};
            overflow-x: scroll;
          }
          .gatsby-highlight .gatsby-highlight-code-line {
            background-color: ${colors.light.surfaceCodeHighlight};
            width: 100%;
            display: inline-block;
          }
        `}
      />
      <div
        className={[
          'gatsby-highlight',
          highlightLines &&
            highlightLines.length > 0 &&
            'has-highlighted-lines',
        ]
          .filter(Boolean)
          .join(' ')}
        data-language={splitLanguage}
      >
        <div
          css={css`
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin: ${dimensions.spacings.s} 0;
            > * + * {
              margin: 0 0 0 ${dimensions.spacings.m};
            }
          `}
        >
          <pre
            className={`language-${splitLanguage} line-numbers`}
            css={css`
              counter-reset: linenumber;
            `}
          >
            <code
              className={`language-${splitLanguage}`}
              dangerouslySetInnerHTML={{
                __html: formattedContent,
              }}
            />
            <span
              aria-hidden="true"
              className="line-numbers-rows"
              css={css`
                white-space: normal !important;
                width: auto !important;
                left: 0 !important;
              `}
            >
              {Array.from({ length: numberOfLines }).map((_, index) => (
                <span key={index} />
              ))}
            </span>
          </pre>
          <div
            css={css`
              cursor: pointer;
            `}
            onClick={handleCopyToClipboardClick}
            title="Copy to clipboard"
          >
            <ClipboardIcon color="surface" />
          </div>
        </div>
      </div>
    </>
  );
};
CodeBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};
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
    setLink(withPrefix(relativePath));
  }, [props.href]);
  if (linkTo) {
    return (
      <HistoryLink
        to={linkTo}
        css={ExternalLink.linkStyles}
        className={props.className}
      >
        {props.children}
      </HistoryLink>
    );
  }
  return props.children;
};
PatchedLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
const InlineLink = styled.span`
  display: inline-flex;
  align-items: center;
  > * + * {
    margin: 0 0 0 ${dimensions.spacings.xs};
  }
`;
// eslint-disable-next-line react/display-name
const Link = props => {
  if (props.href.startsWith('/static')) {
    return <a {...props} />;
  }

  const isExternalLink =
    /^https?/.test(props.href) || (props.target && props.target === '_blank');

  if (isExternalLink) {
    const linkWithIcon = React.isValidElement(props.children) ? (
      // In case the children are a React element (e.g. <code>) we need to inject
      // the external link icon next to the actual text.
      // For this we assume that the React element's own child is plain text.
      React.cloneElement(props.children, {
        children: (
          <InlineLink>
            <span>{props.children.props.children}</span>
            <ExternalLinkIcon size="small" color="primary" />
          </InlineLink>
        ),
      })
    ) : (
      <InlineLink>
        <span>{props.children}</span>
        <ExternalLinkIcon size="small" color="primary" />
      </InlineLink>
    );
    return <ExternalLink {...props}>{linkWithIcon}</ExternalLink>;
  }

  return <PatchedLink {...props} />;
};
Link.propTypes = {
  href: PropTypes.string.isRequired,
  target: PropTypes.string,
  children: PropTypes.node.isRequired,
};
const Img = props => (
  <div>
    <img {...props} />
    <p
      css={css`
        color: ${colors.light.textPrimary};
        font-size: ${typography.fontSizes.small};
        margin: 0;
      `}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {props.title || props.alt}
    </p>
  </div>
);

/* eslint-disable react/display-name,react/prop-types */
const withAnchorLink = Component => props => {
  return (
    <Component
      {...props}
      css={css`
        a {
          margin-left: ${dimensions.spacings.m};
          color: ${colors.light.borderPrimary};
          font-size: ${typography.fontSizes.small};
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

export {
  TypographyPage,
  Paragraph,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  ThematicBreak,
  Blockquote,
  Ul,
  Ol,
  Li,
  Table,
  TableRow,
  TableCell,
  TableHeader,
  ScrollableTable,
  InlineCode,
  CodeBlock,
  Em,
  Strong,
  Delete,
  Hr,
  Link,
  Img,
  withAnchorLink,
};
