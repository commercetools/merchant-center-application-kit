import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link as HistoryLink, withPrefix } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Tooltip } from '@commercetools-frontend/ui-kit';
import ClipboardIcon from '../images/icons/clipboard-icon.svg';
import ExternalLinkIcon from '../images/icons/external-link-icon.svg';
import RibbonIcon from '../images/icons/ribbon-icon.svg';
import { colors, dimensions, typography, tokens } from '../design-system';
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
  border-bottom: 1px solid ${colors.light.borderPrimary};
  font-size: ${typography.fontSizes.h2};
  font-weight: ${typography.fontWeights.bold};
  margin: ${dimensions.spacings.xxxxl} 0 ${dimensions.spacings.xl};
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
  border-radius: 0 ${tokens.borderRadius6} ${tokens.borderRadius6} 0;
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
  border: 1px solid ${colors.light.borderPrimary};
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
  text-align: ${props => props.align || 'left'};

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
const InlineCode = styled.code`
  background-color: ${colors.light.borderPrimary};
  border: 1px solid ${colors.light.surfaceInfo};
  border-radius: ${dimensions.spacings.xs};
  color: ${colors.light.textCode};
  font-family: ${typography.fontFamilies.code};
  font-size: ${typography.fontSizes.small};
  padding: 0 ${dimensions.spacings.xs};
`;
const TooltipWrapperComponent = props =>
  ReactDOM.createPortal(props.children, document.body);
const TooltipBodyComponent = styled.div`
  background-color: ${colors.light.surfaceCodeHighlight};
  border-radius: ${tokens.borderRadius4};
  color: ${colors.light.textInverted};
  font-size: ${typography.fontSizes.extraSmall};
  padding: ${dimensions.spacings.xs} ${dimensions.spacings.s};
`;
const CodeBlock = props => {
  const className = props.children.props ? props.children.props.className : '';
  const languageToken = className || 'text';
  const [languageTag] = languageToken.split(':');
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

  // Copy to clipboard logic
  const [isCopiedToClipboard, setIsCopiedToClipboard] = React.useState(false);
  const handleCopyToClipboardClick = () => {
    copyToClipboard(content);

    setIsCopiedToClipboard(true);
    setTimeout(() => {
      setIsCopiedToClipboard(false);
    }, 1500);
  };

  return (
    <div
      css={css`
        border: 1px solid ${colors.light.surfaceCodeHighlight};
        border-radius: ${tokens.borderRadius6};
        margin: ${dimensions.spacings.m} 0;
        overflow: auto;
      `}
    >
      <div
        css={css`
          background-color: ${colors.light.textPrimary};
          border-bottom: 1px solid ${colors.light.surfaceCodeHighlight};
          padding: ${dimensions.spacings.s} ${dimensions.spacings.m};
          display: flex;
          align-items: center;
          justify-content: flex-end;
          > * + * {
            margin: 0 0 0 ${dimensions.spacings.m};
          }
        `}
      >
        <span
          css={css`
            color: ${colors.light.textFaded};
            text-transform: uppercase;
          `}
        >
          {language}
        </span>
        <Tooltip
          placement="left"
          title={isCopiedToClipboard ? 'Copied' : 'Copy to clipboard'}
          components={{
            TooltipWrapperComponent,
            BodyComponent: TooltipBodyComponent,
          }}
        >
          <div
            css={css`
              cursor: pointer;
              height: ${dimensions.spacings.l};
              svg {
                * {
                  fill: ${colors.light.surfacePrimary};
                }
              }
              :hover {
                svg {
                  * {
                    fill: ${colors.light.surfaceCodeHighlight};
                  }
                }
              }
            `}
            onClick={handleCopyToClipboardClick}
            title={isCopiedToClipboard ? 'Copied' : 'Copy to clipboard'}
          >
            <ClipboardIcon />
          </div>
        </Tooltip>
      </div>
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
        <pre
          className={`language-${splitLanguage} line-numbers`}
          css={css`
            counter-reset: linenumber;
          `}
        >
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
          <code
            className={`language-${splitLanguage}`}
            dangerouslySetInnerHTML={{
              __html: formattedContent,
            }}
          />
        </pre>
      </div>
    </div>
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
  svg {
    * {
      fill: ${colors.light.link};
    }
  }
  :hover {
    svg {
      * {
        fill: ${colors.light.linkHover};
      }
    }
  }
`;
// eslint-disable-next-line react/display-name
const Link = props => {
  if (props.href.startsWith(withPrefix('/static'))) {
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
            <ExternalLinkIcon height={12} width={12} />
          </InlineLink>
        ),
      })
    ) : (
      <InlineLink>
        <span>{props.children}</span>
        <ExternalLinkIcon height={12} width={12} />
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
  <span>
    <img {...props} />
    <span
      css={css`
        color: ${colors.light.textSecondary};
        font-size: ${typography.fontSizes.small};
        margin: 0;
      `}
    >
      {/* eslint-disable-next-line react/prop-types */}
      {props.title || props.alt}
    </span>
  </span>
);

/* eslint-disable react/display-name,react/prop-types */
const withAnchorLink = Component => props => {
  return (
    <Component
      {...props}
      css={css`
        display: flex;
        align-items: baseline;
        :hover {
          [role='anchor-link'] {
            svg {
              * {
                fill: ${colors.light.linkNavigation};
              }
            }
          }
        }
        > * + * {
          margin: 0 0 0 ${dimensions.spacings.s};
        }
      `}
    >
      <span>{props.children}</span>
      <a href={`#${props.id}`} role="anchor-link">
        <RibbonIcon />
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
