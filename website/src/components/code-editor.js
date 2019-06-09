import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LivePreview, LiveContext } from 'react-live';
import { css } from '@emotion/core';
import { Formik } from 'formik';
import * as intl from 'react-intl';
import * as uikit from '@commercetools-frontend/ui-kit';
import * as appkit from '@commercetools-frontend/application-components';
import ExampleWrapper from './example-wrapper';
import * as colors from '../colors';

const { Spacings, IconButton, CodeViewIcon, Tooltip, customProperties } = uikit;
const { InfoDialog } = appkit;

const librariesInScope = {
  css,
  React,
  ReactDOM,
  Formik,
  ExampleWrapper,
  ...intl,
  ...uikit,
  ...appkit,
};

const CodeEditor = props => {
  const [isOpen, toggle] = React.useState(false);
  return (
    <LiveProvider
      noInline={props.noInline}
      mountStylesheet={false}
      scope={{ ...librariesInScope, ...props.scope }}
      code={props.code}
      theme={props.theme}
    >
      {isOpen ? (
        <InfoDialog
          title="Editor mode"
          size="scale"
          isOpen={isOpen}
          onClose={() => toggle(false)}
          getParentSelector={() => document.body}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              height: 100%;
              > * + * {
                margin: 0 0 0 ${customProperties.spacingM};
              }
            `}
          >
            <div
              css={css`
                flex: 1;
                height: 100%;
                overflow: auto;
              `}
            >
              <LiveEditor ignoreTabKey={true} />
            </div>
            <div
              css={css`
                flex: 1;
                height: 100%;
              `}
            >
              <LiveContext.Consumer>
                {({ element: Element, error }) => {
                  if (error) {
                    return (
                      <div
                        css={css`
                          background-color: rgba(212, 4, 36, 0.1);
                          height: 100%;
                        `}
                      >
                        <pre
                          css={css`
                            margin: 0;
                            padding: ${customProperties.spacingM};
                            white-space: pre-wrap;
                          `}
                        >
                          {error}
                        </pre>
                      </div>
                    );
                  }
                  if (!Element) {
                    return null;
                  }
                  return (
                    <div
                      css={css`
                        height: 100%;
                      `}
                    >
                      <Element />
                    </div>
                  );
                }}
              </LiveContext.Consumer>
            </div>
          </div>
        </InfoDialog>
      ) : (
        <Spacings.Stack>
          <LivePreview
            css={css`
              height: ${props.height || '400px'};
              border: 1px solid ${colors.light.bordersSoft};
            `}
          />
          <Tooltip position="top" title="Enter editor mode">
            <IconButton
              icon={<CodeViewIcon />}
              label="Enter editor mode"
              onClick={() => toggle(true)}
            />
          </Tooltip>
        </Spacings.Stack>
      )}
    </LiveProvider>
  );
};
CodeEditor.displayName = 'CodeEditor';
CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  scope: PropTypes.object,
  noInline: PropTypes.bool,
  customStyles: PropTypes.object,
  theme: PropTypes.object,
  height: PropTypes.string,
};
CodeEditor.defaultProps = {
  scope: {},
  noInline: true,
  customStyles: {},
};
export default CodeEditor;
