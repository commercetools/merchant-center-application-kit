import React from 'react';
import * as gtm from '../../utils/gtm';
import ErrorBoundary from '../error-boundary';
import trackingEvents from './tracking-events';
import ButlerContainer from './butler-container';
import pimIndexerStates from './pim-indexer-states';

type Props = {
  onChangeProjectDataLocale?: (locale: string) => void;
};

const QuickAccess = React.lazy(() =>
  import('./quick-access' /* webpackChunkName: "quick-access" */)
);

const QuickAccessTrigger = (props: Props) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const open = React.useCallback(() => {
    setIsVisible(true);
  }, []);
  const close = React.useCallback(() => {
    setIsVisible(false);
  }, []);
  // We store the information of whether a project is indexed by pim-indexer,
  // to avoid having to refetch that information every time Quick Access is
  // opened. We can't move the information to the quick-access.js component
  // as that component unmounts and would lose its state.
  //
  // We need to know whether a project is indexed by pim-indexer to know
  // whether we should query pim-search or whether we can skip that request.
  //
  // We don't need to update this information when the project key changes,
  // as changing a project always results in a full page reload anyways.
  const [pimIndexerState, setPimIndexerState] = React.useState(
    pimIndexerStates.UNCHECKED
  );
  const handlePimIndexerStateChange = React.useCallback(
    (nextPimIndexerState) => {
      setPimIndexerState(nextPimIndexerState);
    },
    []
  );
  const keyHandler = React.useCallback(
    (event) => {
      const hotKey = 'f';
      // avoid interfering with any key combinations using modifier keys
      if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)
        return;

      // Let users close QuickAccess by pressing Escape
      if (
        event.key === 'Escape' &&
        event.target.id === 'quick-access-search-input'
      ) {
        close();
        return;
      }

      // Avoid interfering with any other elements. We only
      // open the QuickAccess when nothing was focused, so target is document.body
      if (
        event.target !== document.body &&
        // tabIndex="-1" has a special meaning
        // It will make the element focusable, while hiding it from the
        // navigation. It is typically used for modals and overlays.
        // react-modal uses it for example. We want to treat those elements
        // similar to document.body.
        // See https://stackoverflow.com/a/32912224
        event.target.getAttribute('tabindex') !== '-1' &&
        // Do not prevent Quick Access from opening when a link has focus
        event.target.nodeName !== 'A'
      )
        return;

      if (event.key === hotKey) {
        if (!isVisible) {
          // prevent the letter from appearing in the search input when
          // it is the key press that lead to opening Quick Access
          event.preventDefault();

          // We use tracking directly here as it's the easiest
          // Otherwise we'd have to duplicate injectTracking from core, as we
          // can't import it from there
          gtm.track(
            trackingEvents.openQuickAccess.event,
            trackingEvents.openQuickAccess.category,
            trackingEvents.openQuickAccess.label
          );
        }
        open();
      }

      return;
    },
    [close, isVisible, open]
  );
  React.useEffect(() => {
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [keyHandler]);

  if (!isVisible) return null;

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<ButlerContainer tabIndex={-1} />}>
        <QuickAccess
          pimIndexerState={pimIndexerState}
          onPimIndexerStateChange={handlePimIndexerStateChange}
          onClose={close}
          onChangeProjectDataLocale={props.onChangeProjectDataLocale}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};
QuickAccessTrigger.displayName = 'QuickAccessTrigger';

export default QuickAccessTrigger;
