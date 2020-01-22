import React from 'react';
import PropTypes from 'prop-types';

const MeasureFirstPaint = props => {
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
MeasureFirstPaint.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MeasureFirstPaint;
