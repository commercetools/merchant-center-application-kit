import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { css, ClassNames } from '@emotion/core';
import styled from '@emotion/styled';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import { Card, customProperties } from '@commercetools-frontend/ui-kit';
import { getModalOverlayStyles, getModalContentStyles } from './dialog.styles';

const GridArea = styled.div`
  grid-area: ${props => props.name};
`;

// When running tests, we don't render the AppShell. Instead we mock the
// application context to make the data available to the application under
// test. However, this also means that the AppShell tree is not rendered,
// which contains among other things the <div id="portals-container" />
// element, used to render the modal content.
// Apparently though, when the <Modal> component unmounts between tests, it
// tries to remove the child elements within the parent selector
// ("portals-container") which may have been cleaned up by another test,
// resulting in the <Modal> to throw an NotFoundError.
// To solve this, we can simply use "document.body" as the parent selector
// instead of a specific element that will be cleaned up, resulting in
// console errors (even though the test passes). We only need to to this in
// test environment.
const getDefaultParentSelector = () =>
  process.env.NODE_ENV === 'test'
    ? document.body
    : document.querySelector(`#${PORTALS_CONTAINER_ID}`);

const sizeStyles = props => {
  if (props.size === 'scale')
    return css`
      height: 100%;
    `;

  return css``;
};

const DialogContainer = props => (
  <ClassNames>
    {({ css: makeClassName }) => (
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        shouldCloseOnOverlayClick={Boolean(props.onClose)}
        shouldCloseOnEsc={Boolean(props.onClose)}
        overlayClassName={makeClassName(getModalOverlayStyles(props))}
        className={makeClassName(getModalContentStyles(props))}
        contentLabel={props.title}
        parentSelector={props.getParentSelector}
        ariaHideApp={false}
        style={{
          // stylelint-disable-next-line selector-type-no-unknown
          overlay: {
            zIndex: props.zIndex,
          },
        }}
      >
        <GridArea name="top" />
        <GridArea name="left" />
        <GridArea name="right" />
        <GridArea name="bottom" />
        <GridArea
          name="main"
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            overflow: hidden;
          `}
        >
          <Card
            // 1. For the min-height: https://stackoverflow.com/questions/28636832/firefox-overflow-y-not-working-with-nested-flexbox/28639686#28639686
            // 2. For the scale size, we want the card to stretch to 100% height
            // 3. For the actual "> div" container with the content, we need to use normal pointer events so that clicking on it does not close the dialog.
            css={css`
              min-height: 0;
              ${sizeStyles}

              > div {
                display: flex;
                flex-direction: column;
                height: 100%;
                pointer-events: auto;
                min-height: 0;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: stretch;
                height: 100%;
                min-height: 0;

                > * + * {
                  margin: ${customProperties.spacingM} 0 0;
                }
              `}
            >
              {props.children}
            </div>
          </Card>
        </GridArea>
      </Modal>
    )}
  </ClassNames>
);
DialogContainer.displayName = 'DialogContainer';
DialogContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['m', 'l', 'scale']),
  zIndex: PropTypes.number,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  getParentSelector: PropTypes.func,
};
DialogContainer.defaultProps = {
  size: 'l',
  zIndex: 1000,
  getParentSelector: getDefaultParentSelector,
};

export default DialogContainer;
