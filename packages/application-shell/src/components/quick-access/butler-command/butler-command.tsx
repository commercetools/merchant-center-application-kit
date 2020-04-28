import type { MouseEventHandler } from 'react';
import type { Command } from '../types';

import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { AngleThinRightIcon } from '@commercetools-uikit/icons';
import { customProperties } from '@commercetools-uikit/design-system';

type Props = {
  command: Command;
  isSelected?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
};

const ButlerCommand = (props: Props) => (
  <div
    key={props.command.id}
    data-testid={`quick-access-result(${props.command.id})`}
    aria-current={props.isSelected === true ? 'true' : 'false'}
    css={css`
      display: flex;
      padding: 0 ${customProperties.spacingM};
      height: 36px;
      font-size: 16px;
      font-weight: 200;
      line-height: 36px;
      cursor: default;
      ${props.isSelected === true
        ? `
            background: ${customProperties.colorAccent};
            color: ${customProperties.colorSurface};
          `
        : ''}
    `}
    onMouseEnter={props.onMouseEnter}
    onClick={props.onClick}
  >
    <div
      css={css`
        flex: 1 auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
    >
      {props.command.text}
    </div>
    {((Array.isArray(props.command.subCommands) &&
      props.command.subCommands.length > 0) ||
      typeof props.command.subCommands === 'function') && (
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
          color={props.isSelected ? 'surface' : 'neutral60'}
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
