import { useState, useCallback } from 'react';

const useModalState = (isInitiallyOpen = false) => {
  const [isModalOpen, setIsModalOpen] = useState(isInitiallyOpen);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModalState;
