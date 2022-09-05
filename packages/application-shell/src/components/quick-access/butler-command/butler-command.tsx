import type { Command } from '../types';

import { MouseEventHandler } from 'react';
import { css } from '@emotion/react';
import { AngleThinRightIcon } from '@commercetools-uikit/icons';
import { designTokens } from '@commercetools-uikit/design-system';

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
      padding: 0 ${designTokens.spacingM};
      height: 36px;
      font-size: 16px;
      font-weight: 200;
      line-height: 36px;
      cursor: default;
      ${props.isSelected === true
        ? `
            background: ${designTokens.colorAccent};
            color: ${designTokens.colorSurface};
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

export default ButlerCommand;
