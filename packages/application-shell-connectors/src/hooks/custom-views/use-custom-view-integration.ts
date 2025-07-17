import { useCallback, useEffect } from 'react';
import intersection from 'lodash/intersection';

export type TCustomViewIntegrationParams = {
  locators: string[];
  onRefreshDataRequested: (context: Record<string, unknown>) => void;
};

export const useCustomViewIntegration = (
  params: TCustomViewIntegrationParams
) => {
  const onCustomViewEventHandler = useCallback(
    (event: CustomEvent<{ locators: string[] }>) => {
      const { locators } = event.detail;
      if (intersection(params.locators, locators).length > 0) {
        params.onRefreshDataRequested(event.detail);
      }
    },
    []
  ) as EventListener;

  useEffect(() => {
    window.addEventListener('custom-view-closed', onCustomViewEventHandler);
    return () => {
      window.removeEventListener(
        'custom-view-closed',
        onCustomViewEventHandler
      );
    };
  }, [onCustomViewEventHandler]);
};
