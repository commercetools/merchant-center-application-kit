import {
  type MutableRefObject,
  type RefObject,
  forwardRef,
  useState,
  useRef,
} from 'react';
import { css, Global } from '@emotion/react';
import useResizeObserver from '@react-hook/resize-observer';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import { useMutationObserver } from '@commercetools-uikit/hooks';

type TLayoutRefs = {
  notificationsGlobalRef: MutableRefObject<HTMLDivElement>;
  notificationsPageRef: MutableRefObject<HTMLDivElement>;
};
type TObservableElementDimensions = {
  height: number;
  width: number;
};

/**
 * Stacking layers keep track of how many (React Modal) child nodes are defined
 * within the portals container.
 * Every child nodes gets assigned a sequential number (level) to ensure
 * that every layer has the correct `z-index` defined.
 * Furtermore, the indentation level (for modal pages) is also calculated based
 * on the (React Modal) child nodes that are currently active.
 */
type TStackingLayer = {
  /**
   * A sequential number to indicate the level of each child node of the portals container.
   * The value is then assigned to each child (React Modal container) using a `data-level` attribute
   * and targeted using CSS selectors.
   */
  stackingLevel: number;
  /**
   * A sequential number to indicate the indentation level for modal pages.
   * The value is defined and applied only to active modal pages.
   */
  indentationLevel: number;
};

type TPortalsContainerProps = {
  /**
   * The offset value for positioning the container from the top, when opened.
   * Usually this corresponds to the height of the header section.
   * Defaults to `0px`.
   */
  offsetTop?: string;
  /**
   * The offset value for positioning the container from the left, when opened.
   * Usually this corresponds to the min width of the nav menu.
   * Defaults to `0px`.
   */
  offsetLeft?: string;
  /**
   * The offset value for positioning the container from the left, when opened.
   * The value is only applied when the `.body__menu-open` global class is added to the DOM.
   * Usually this corresponds to the width of the expanded nav menu.
   * Defaults to `0px`.
   */
  offsetLeftOnExpandedMenu?: string;
  /**
   * The CSS selector to apply the `overflow: hidden` style to (preventing scrolling)
   * when a modal container is open.
   * Defaults to `main`.
   */
  containerSelectorToPreventScrollingOnOpen?: string;
  /**
   * The `z-index` value to apply to the portal container..
   * Defaults to `10000`.
   */
  zIndex?: number;
  /**
   * The base `z-index` value to apply to each modal container.
   * Defaults to `1000`.
   */
  baseModalZIndex?: number;
};

// The width of each indentation level.
const indentationSize = '48px';

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
    const baseModalZIndex = props.baseModalZIndex ?? 1000;
    const modalWidthTransition = 'width 150ms cubic-bezier(1, 0, 0.58, 1)';

    const portalsContainerRef = useRef<HTMLDivElement>(null);
    const globalNotificationsElementDimensions = useObserverElementDimensions(
      (ref as MutableRefObject<TLayoutRefs>)?.current?.notificationsGlobalRef
    );
    const pageNotificationsElementDimensions = useObserverElementDimensions(
      (ref as MutableRefObject<TLayoutRefs>)?.current?.notificationsPageRef
    );

    const [stackingLayers, setStackingLayers] = useState<TStackingLayer[]>([]);
    // The mutation observer gets triggered every time a child node gets added or
    // removed from the portals container.
    // The stacking layers are then re-calculated.
    useMutationObserver(
      portalsContainerRef,
      (mutationList) => {
        // We expect only a single element in the mutation list as we configured the
        // observer to only listen to `childList` changes.
        const [mutationEvent] = mutationList;

        let indentationLevel = 0;
        const nextStackingLevels: TStackingLayer[] = [];

        mutationEvent.target.childNodes.forEach((node, index) => {
          if (node instanceof HTMLElement) {
            const stackingLevel = index + 1;
            node.dataset.level = String(stackingLevel);

            const overlayNode = node.firstChild;
            if (overlayNode instanceof HTMLElement) {
              if (overlayNode.dataset.role === 'modal-overlay') {
                indentationLevel += 1;
              }
            }

            nextStackingLevels.push({ stackingLevel, indentationLevel });
          }
        });

        setStackingLayers(nextStackingLevels);
      },
      {
        // Only subscribe to changes to the child nodes of the portals container.
        childList: true,
      }
    );

    return (
      <>
        <Global
          // Apply some global styles, based on the `.ReactModal__Body--open` class.
          styles={[
            css`
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
                  ${offsetTop} +
                    ${globalNotificationsElementDimensions.height}px +
                    ${pageNotificationsElementDimensions.height}px
                );
                right: 0;
                bottom: 0;
                z-index: ${zIndex};
                transition: ${modalWidthTransition};
              }

              .ReactModal__Body--open.body__menu-open #${PORTALS_CONTAINER_ID} {
                width: calc(100% - ${offsetLeftOnExpandedMenu});
                transition: ${modalWidthTransition};
              }
            `,
            // Apply styles for stacking layers.
            ...stackingLayers.map(
              /**
               * Every "overlay" container gets assigned a sequential `z-index` level.
               * Furthermore, the "modal overlay" containers (not "dialog") get assigned
               * the correct indentation level width.
               */
              (stackingLayer) => css`
                #${PORTALS_CONTAINER_ID}
                  .ReactModalPortal[data-level='${stackingLayer.stackingLevel}']
                  [data-role$='overlay'] {
                  z-index: calc(
                    ${baseModalZIndex} + ${stackingLayer.stackingLevel}
                  );
                }
                #${PORTALS_CONTAINER_ID}
                  .ReactModalPortal[data-level='${stackingLayer.stackingLevel}']
                  [data-role='modal-overlay']
                  [role='dialog'] {
                  width: calc(
                    100% -
                      (${indentationSize} * ${stackingLayer.indentationLevel})
                  );
                }
              `
            ),
          ]}
        />
        <div
          id={PORTALS_CONTAINER_ID}
          ref={portalsContainerRef}
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
