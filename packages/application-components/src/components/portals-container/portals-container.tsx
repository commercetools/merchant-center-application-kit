import { css, Global } from '@emotion/react';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';

type TPortalsContainerProps = {
  /**
   * The offset value for positioning the container from the top, when opened.
   * Usually this is corresponds to the height of the header section.
   */
  offsetTop: string;
  /**
   * The CSS selector to apply the `overflow: hidden` style to (preventing scrolling)
   * when a modal container is open.
   */
  containerSelectorToPreventScrollingOnOpen: string;
  /**
   * The `z-index` value to apply to the portal container. Default to `10000`.
   */
  zIndex: number;
};
const defaultProps: Pick<
  TPortalsContainerProps,
  'offsetTop' | 'containerSelectorToPreventScrollingOnOpen' | 'zIndex'
> = {
  offsetTop: '0',
  containerSelectorToPreventScrollingOnOpen: 'main',
  zIndex: 10000,
};

// All modal components expect to be rendered inside this container.
const PortalsContainer = (props: TPortalsContainerProps) => (
  <>
    <Global
      // Apply some global styles, based on the `.ReactModal__Body--open` class.
      styles={css`
        .ReactModal__Body--open
          ${props.containerSelectorToPreventScrollingOnOpen} {
          overflow: hidden;
        }

        .ReactModal__Body--open #${PORTALS_CONTAINER_ID} {
          position: fixed;
          height: calc(100% - ${props.offsetTop});
          width: 100%;
          top: ${props.offsetTop};
          bottom: 0;
          z-index: ${props.zIndex};
        }
      `}
    />
    <div
      id={PORTALS_CONTAINER_ID}
      // The container needs a height in order to be tabbable: https://reactjs/react-modal#774
      css={css`
        display: flex;
        height: 1px;
        margin-top: -1px;
      `}
    />
  </>
);
PortalsContainer.displayName = 'PortalsContainer';
PortalsContainer.defaultProps = defaultProps;

export default PortalsContainer;
