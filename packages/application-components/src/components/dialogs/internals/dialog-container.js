import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { css, ClassNames } from '@emotion/core';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import { Card, customProperties } from '@commercetools-frontend/ui-kit';

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

const getModalContentStyles = props => {
  // To ensure that the mouse click on the overlay surface goes "through"
  // and triggers the modal to close, we need to turn off the pointer events.
  const baseStyles = css`
    display: grid;
    height: 100%;
    width: 100%;
    outline: none;
    pointer-events: none;
  `;
  switch (props.size) {
    case 'm':
      return [
        baseStyles,
        css`
          grid:
            [row1-start] 'top top top' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row1-end]
            [row2-start] 'left main right' minmax(0, 100%) [row2-end]
            [row3-start] 'bottom bottom bottom' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row3-end]
            / minmax(${customProperties.spacingXl}, 1fr)
            ${customProperties.constraintM} minmax(
              ${customProperties.spacingXl},
              1fr
            );
        `,
      ];
    case 'scale':
      return [
        baseStyles,
        css`
          grid:
            [row1-start] 'top top top' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row1-end]
            [row2-start] 'left main right' minmax(0, 100%) [row2-end]
            [row3-start] 'bottom bottom bottom' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row3-end]
            / ${customProperties.spacingXl} 1fr ${customProperties.spacingXl};
        `,
      ];

    default:
      // size: l
      return [
        baseStyles,
        css`
          grid:
            [row1-start] 'top top top' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row1-end]
            [row2-start] 'left main right' minmax(0, 100%) [row2-end]
            [row3-start] 'bottom bottom bottom' minmax(
              ${customProperties.spacingXl},
              1fr
            )
            [row3-end]
            / minmax(${customProperties.spacingXl}, 1fr)
            ${customProperties.constraintL} minmax(
              ${customProperties.spacingXl},
              1fr
            );
        `,
      ];
  }
};

const DialogContainer = props => (
  <ClassNames>
    {({ css: makeClassName }) => (
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        shouldCloseOnOverlayClick={Boolean(props.onClose)}
        shouldCloseOnEsc={Boolean(props.onClose)}
        overlayClassName={makeClassName`
          display: flex;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(32, 62, 72, 0.5);
          opacity: 1;
        `}
        className={makeClassName(getModalContentStyles(props))}
        contentLabel={props.title}
        parentSelector={props.getParentSelector}
        ariaHideApp={false}
        style={{
          overlay: {
            zIndex: props.zIndex,
          },
        }}
      >
        <div
          css={css`
            grid-area: top;
          `}
        />
        <div
          css={css`
            grid-area: left;
          `}
        />
        <div
          css={css`
            grid-area: right;
          `}
        />
        <div
          css={css`
            grid-area: bottom;
          `}
        />
        <div
          css={css`
            grid-area: main;
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
              ${props.size === 'scale' ? `height: 100%;` : ``}

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
        </div>
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
