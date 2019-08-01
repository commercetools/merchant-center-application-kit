import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import {
  AngleThinRightIcon,
  customProperties,
} from '@commercetools-frontend/ui-kit';

const ButlerCommand = ({ command, onMouseEnter, onClick, isSelected }) => (
  <div
    key={command.id}
    data-testid={`quick-access-result(${command.id})`}
    css={css`
      display: flex;
      padding: 0 ${customProperties.spacingM};
      height: 36px;
      font-size: 16px;
      font-weight: 200;
      line-height: 36px;
      cursor: default;
      ${isSelected
        ? `
            background: ${customProperties.colorAccent};
            color: ${customProperties.colorSurface};
          `
        : ''}
    `}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
  >
    <div
      css={css`
        flex: 1 auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
    >
      {command.text}
    </div>
    {((Array.isArray(command.subCommands) && command.subCommands.length > 0) ||
      typeof command.subCommands === 'function') && (
      <div
        css={css`
          align-self: center;
          > * {
            display: block;
          }
        `}
      >
        <AngleThinRightIcon
          size="medium"
          color={isSelected ? 'surface' : 'neutral60'}
        />
      </div>
    )}
  </div>
);

ButlerCommand.displayName = 'ButlerCommand';

ButlerCommand.propTypes = {
  command: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    subCommands: PropTypes.oneOfType([
      PropTypes.func,
      // commands are recursive (subCommands are commands), but this component
      // doesn't care about that part, so we just accept any.
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }).isRequired,
  isSelected: PropTypes.bool,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButlerCommand;
