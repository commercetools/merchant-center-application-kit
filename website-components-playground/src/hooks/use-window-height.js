import React from 'react';

const useWindowHeight = () => {
  const [height, setHeight] = React.useState(0);

  const updateHeight = React.useCallback(() => {
    setHeight(document.querySelector('body').scrollHeight);
  }, [setHeight]);

  React.useLayoutEffect(() => {
    window.addEventListener('resize', updateHeight);

    // Initial values
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, [updateHeight]);

  return height;
};

export default useWindowHeight;
