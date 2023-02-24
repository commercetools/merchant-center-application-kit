import { useState, useCallback, useLayoutEffect } from 'react';

const useWindowHeight = () => {
  const [height, setHeight] = useState(400);

  const updateHeight = useCallback(() => {
    const bodyElement = document?.querySelector('body');
    if (bodyElement) {
      setHeight(bodyElement.scrollHeight);
    }
  }, [setHeight]);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateHeight);

    // Initial values
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, [updateHeight]);

  return height;
};

export default useWindowHeight;
