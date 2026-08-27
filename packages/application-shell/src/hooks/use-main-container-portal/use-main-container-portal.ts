import { useState, useEffect } from 'react';
import { MC_MAIN_CONTAINER_PORTAL_ID } from '@commercetools-frontend/constants';

// useEffect runs post-commit, so any dialog open in the same render batch is
// already in the DOM here. A dialog's stacking context sits above the portal
// target, so we bail — no z-index inside mc-main-container-portal can win.
const useMainContainerPortal = (): HTMLElement | null => {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const portal = document.getElementById(MC_MAIN_CONTAINER_PORTAL_ID);
    if (!portal) return;
    if (!document.querySelector('[role="dialog"]')) {
      setPortalTarget(portal);
    }
  }, []);

  return portalTarget;
};

export default useMainContainerPortal;
