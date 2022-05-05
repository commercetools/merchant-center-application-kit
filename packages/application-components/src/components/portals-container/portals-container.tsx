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
  offsetTop?: string;
  /**
   * The offset value for positioning the container from the left, when opened.
   * Usually this corresponds to the min width of the nav menu.
   */
  offsetLeft?: string;
  /**
   * The offset value for positioning the container from the left, when opened.
   * The value is only applied when the `.body__menu-open` global class is added to the DOM.
   * Usually this corresponds to the width of the expanded nav menu.
   */
  offsetLeftOnExpandedMenu?: string;
  /**
   * The CSS selector to apply the `overflow: hidden` style to (preventing scrolling)
   * when a modal container is open.
   */
  containerSelectorToPreventScrollingOnOpen?: string;
  /**
   * The `z-index` value to apply to the portal container. Default to `10000`.
   */
  zIndex?: number;
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
    // Initialize props with default values.
    // NOTE: using `defaultProps` with `forwardRef` results in the type declarations
    // to ignore the `defaultProps`. Therefore, the default props are typed
    // as optional and we initialize the value here with the default values.
    const offsetTop = props.offsetTop ?? '0px';
    const offsetLeft = props.offsetLeft ?? '0px';
    const offsetLeftOnExpandedMenu = props.offsetLeftOnExpandedMenu ?? '0px';
    const containerSelectorToPreventScrollingOnOpen =
      props.containerSelectorToPreventScrollingOnOpen ?? 'main';
    const zIndex = props.zIndex ?? 10000;

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
              ${containerSelectorToPreventScrollingOnOpen} {
              overflow: hidden;
            }

            .ReactModal__Body--open #${PORTALS_CONTAINER_ID} {
              position: fixed;
              height: calc(
                100% - ${offsetTop} -
                  ${globalNotificationsElementDimensions.height}px -
                  ${pageNotificationsElementDimensions.height}px
              );
              width: calc(100% - ${offsetLeft});
              top: calc(
                ${offsetTop} + ${globalNotificationsElementDimensions.height}px +
                  ${pageNotificationsElementDimensions.height}px
              );
              right: 0;
              bottom: 0;
              z-index: ${zIndex};
            }

            .ReactModal__Body--open.body__menu-open #${PORTALS_CONTAINER_ID} {
              width: calc(100% - ${offsetLeftOnExpandedMenu});
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

export default PortalsContainer;
