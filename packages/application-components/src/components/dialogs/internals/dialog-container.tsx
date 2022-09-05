import type { ReactNode, SyntheticEvent } from 'react';
import Modal, { type Props as ModalProps } from 'react-modal';
import { css, ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import { designTokens } from '@commercetools-uikit/design-system';
import Card from '@commercetools-uikit/card';
import { getOverlayStyles, getModalContentStyles } from './dialog.styles';

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
    : (document.querySelector<HTMLElement>(
        `#${PORTALS_CONTAINER_ID}`
      ) as HTMLElement);

const getOverlayElement: ModalProps['overlayElement'] = (
  props,
  contentElement
) => (
  // Assign the `data-role` to the overlay container, which is used as
  // the CSS selector in the `<PortalsContainer>`.
  <div {...props} data-role="dialog-overlay">
    {contentElement}
  </div>
);

type Props = {
  isOpen: boolean;
  onClose?: (event: SyntheticEvent) => void;
  size: 'm' | 'l' | 7 | 8 | 9 | 10 | 'scale';
  zIndex?: number;
  title: string;
  children: ReactNode;
  getParentSelector: typeof getDefaultParentSelector;
};
const defaultProps: Pick<Props, 'size' | 'getParentSelector'> = {
  size: 10,
  getParentSelector: getDefaultParentSelector,
};

type GridAreaProps = {
  name: string;
};
const GridArea = styled.div<GridAreaProps>`
  grid-area: ${(props) => props.name};
`;

const sizeStyles = (props: Pick<Props, 'size'>) => {
  if (props.size === 'scale')
    return css`
      height: 100%;
    `;

  return css``;
};

const DialogContainer = (props: Props) => (
  <ClassNames>
    {({ css: makeClassName }) => (
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
        shouldCloseOnOverlayClick={Boolean(props.onClose)}
        shouldCloseOnEsc={Boolean(props.onClose)}
        overlayElement={getOverlayElement}
        overlayClassName={makeClassName(getOverlayStyles(props))}
        className={makeClassName(getModalContentStyles(props))}
        contentLabel={props.title}
        parentSelector={props.getParentSelector}
        ariaHideApp={false}
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
              ${sizeStyles(props)}

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
                  margin: ${designTokens.spacingM} 0 0;
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
DialogContainer.defaultProps = defaultProps;

export default DialogContainer;
