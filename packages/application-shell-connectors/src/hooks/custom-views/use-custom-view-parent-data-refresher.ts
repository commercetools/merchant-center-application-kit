import { useCallback, useEffect } from 'react';
import { CUSTOM_VIEWS_EVENTS_NAMES } from '@commercetools-frontend/constants';

export type TCustomViewParentDataRefresherParams = {
  locators: string[];
  onRefreshDataRequested: (context: Record<string, unknown>) => void;
};

export const useCustomViewParentDataRefresher = (
  params: TCustomViewParentDataRefresherParams
) => {
  const onCustomViewEventHandler = useCallback(
    (event: CustomEvent<{ originLocatorCode: string }>) => {
      const { originLocatorCode } = event.detail;
      if (params.locators.includes(originLocatorCode)) {
        params.onRefreshDataRequested(event.detail);
      }
    },
    []
  ) as EventListener;

  useEffect(() => {
    window.addEventListener(
      CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_ON_CLOSE_AFTER,
      onCustomViewEventHandler
    );
    return () => {
      window.removeEventListener(
        CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_ON_CLOSE_AFTER,
        onCustomViewEventHandler
      );
    };
  }, [onCustomViewEventHandler]);
};
