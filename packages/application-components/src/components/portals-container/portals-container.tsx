import {
  type MutableRefObject,
  type RefObject,
  forwardRef,
  useState,
} from 'react';
import { css, Global } from '@emotion/react';
import useResizeObserver from '@react-hook/resize-observer';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';

type TLayoutRefs = {
  notificationsGlobalRef: MutableRefObject<HTMLDivElement>;
  notificationsPageRef: MutableRefObject<HTMLDivElement>;
};
type TObservableElementDimensions = {
  height: number;
  width: number;
};
type TPortalsContainerProps = {
  /**
   * The offset value for positioning the container from the top, when opened.
   * Usually this corresponds to the height of the header section.
   */
  offsetTop: string;
  /**
   * The offset value for positioning the container from the left, when opened.
   * Usually this corresponds to the min width of the nav menu.
   */
  offsetLeft: string;
  /**
   * The offset value for positioning the container from the left, when opened.
   * The value is only applied when the `.body__menu-open` global class is added to the DOM.
   * Usually this corresponds to the width of the expanded nav menu.
   */
  offsetLeftOnExpandedMenu: string;
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
  | 'offsetTop'
  | 'offsetLeft'
  | 'offsetLeftOnExpandedMenu'
  | 'containerSelectorToPreventScrollingOnOpen'
  | 'zIndex'
> = {
  offsetTop: '0px',
  offsetLeft: '0px',
  offsetLeftOnExpandedMenu: '0px',
  containerSelectorToPreventScrollingOnOpen: 'main',
  zIndex: 10000,
};

const useObserverElementDimensions = (
  element: RefObject<HTMLDivElement> | null
): TObservableElementDimensions => {
  const [dimensions, setDimensions] = useState<TObservableElementDimensions>({
    height: 0,
    width: 0,
  });

  useResizeObserver<HTMLDivElement>(element, (entry) => {
    setDimensions({
      height: entry.contentRect.height,
      width: entry.contentRect.width,
    });
  });

  return dimensions;
};

// All modal components expect to be rendered inside this container.
const PortalsContainer = forwardRef<TLayoutRefs, TPortalsContainerProps>(
  (props, ref) => {
    const globalNotificationsElementDimensions = useObserverElementDimensions(
      (ref as MutableRefObject<TLayoutRefs>)?.current?.notificationsGlobalRef
    );
    const pageNotificationsElementDimensions = useObserverElementDimensions(
      (ref as MutableRefObject<TLayoutRefs>)?.current?.notificationsPageRef
    );

    return (
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
              height: calc(
                100% - ${props.offsetTop} -
                  ${globalNotificationsElementDimensions.height}px -
                  ${pageNotificationsElementDimensions.height}px
              );
              width: calc(100% - ${props.offsetLeft});
              top: calc(
                ${props.offsetTop} +
                  ${globalNotificationsElementDimensions.height}px +
                  ${pageNotificationsElementDimensions.height}px
              );
              right: 0;
              bottom: 0;
              z-index: ${props.zIndex};
            }

            .ReactModal__Body--open.body__menu-open #${PORTALS_CONTAINER_ID} {
              width: calc(100% - ${props.offsetLeftOnExpandedMenu});
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
  }
);
PortalsContainer.displayName = 'PortalsContainer';
PortalsContainer.defaultProps = defaultProps;

export default PortalsContainer;
