// From ui-kit
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const AccessibleButton = React.forwardRef((props, ref) => {
  const { onClick } = props;

  const handleClick = React.useCallback(
    event => {
      if (!props.isDisabled && onClick) return onClick(event);
      // eslint-disable-next-line no-useless-return, consistent-return
      return;
    },
    [onClick, props.isDisabled]
  );
  return (
    <button
      id={props.id}
      ref={ref}
      type={props.type}
      aria-label={props.label}
      onClick={handleClick}
      css={css`
        border: none;
        background: none;
        display: inline-block;
        outline: 0;
        padding: 0;
        margin: 0;
        white-space: nowrap;
        cursor: pointer;
        color: inherit;
        font: inherit;
        font-size: inherit;
        font-family: inherit;
        &:disabled {
          cursor: not-allowed;
        }
      `}
      // Allow to override the styles by passing a `className` prop.
      // Custom styles can also be passed using the `css` prop from emotion.
      // https://emotion.sh/docs/css-prop#style-precedence
      className={props.className}
      disabled={props.isDisabled}
      aria-disabled={props.isDisabled}
      {...(props.isToggleButton ? { 'aria-pressed': props.isToggled } : {})}
      {...props.buttonAttributes}
    >
      {props.children}
    </button>
  );
});
AccessibleButton.displayName = 'AccessibleButton';
AccessibleButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  // set to true or false to indicate a toggle button
  isToggled: ({ isToggleButton, isToggled }, ...rest) => {
    if (isToggleButton && isToggled === undefined)
      return new Error(
        `\`isToggled\` is a required prop if \`isToggleButton\` is \`true\` on AccessibleButton component`
      );
    return PropTypes.bool({ isToggled }, ...rest);
  },
  isToggleButton: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  // allows setting custom attributes on the underlying button html element
  buttonAttributes: PropTypes.object,
};
AccessibleButton.defaultProps = {
  type: 'button',
  buttonAttributes: {},
  isToggleButton: false,
  isToggled: false,
};

export default AccessibleButton;
