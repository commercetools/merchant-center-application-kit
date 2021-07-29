import { useState, useCallback, useLayoutEffect } from 'react';

const useWindowHeight = () => {
  const [height, setHeight] = useState(0);

  const updateHeight = useCallback(() => {
    setHeight(document.querySelector('body').scrollHeight);
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
