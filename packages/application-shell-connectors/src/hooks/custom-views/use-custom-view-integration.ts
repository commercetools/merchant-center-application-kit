import { useCallback, useEffect } from 'react';

export type TCustomViewIntegrationParams = {
  locators: string[];
  onRefreshDataRequested: (context: Record<string, unknown>) => void;
};

export const useCustomViewIntegration = (
  params: TCustomViewIntegrationParams
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
    window.addEventListener('custom-view-closed', onCustomViewEventHandler);
    return () => {
      window.removeEventListener(
        'custom-view-closed',
        onCustomViewEventHandler
      );
    };
  }, [onCustomViewEventHandler]);
};
