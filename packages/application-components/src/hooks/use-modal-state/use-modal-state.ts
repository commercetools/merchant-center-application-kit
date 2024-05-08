import { useState, useCallback, useEffect } from 'react';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';

const useModalState = (isInitiallyOpen = false) => {
  const [isModalOpen, setIsModalOpen] = useState(isInitiallyOpen);

  // This is a workaround to make sure the portals container's Mutation Observer picks up a DOM mutation when the modal is opened
  // This is neccessary to make sure the modal stacking layer's indentation level is correctly calculated
  useEffect(() => {
    const PORTALS_CONTAINER_OBSERVER_TRIGGER_ID =
      'stacking-layer-observer-trigger';
    if (isModalOpen) {
      const newDiv = document.createElement('div');
      newDiv.setAttribute('id', PORTALS_CONTAINER_OBSERVER_TRIGGER_ID);
      const portalsContainer = document.querySelector(
        `div#${PORTALS_CONTAINER_ID}`
      );
      portalsContainer?.appendChild(newDiv);
    } else {
      const trigger = document.querySelector(
        `div#${PORTALS_CONTAINER_OBSERVER_TRIGGER_ID}`
      );
      trigger?.remove();
    }
  }, [isModalOpen]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModalState;
