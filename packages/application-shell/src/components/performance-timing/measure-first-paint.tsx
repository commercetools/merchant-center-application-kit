import React from 'react';

type Props = {
  children: React.ReactNode;
};

const MeasureFirstPaint = (props: Props) => {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'The `MeasureFirtPaint` component has been deprecated and will be removed in the next major version v16.'
      );
    }
  }, []);
  return props.children;
};
MeasureFirstPaint.displayName = 'MeasureFirstPaint';

export default MeasureFirstPaint;
