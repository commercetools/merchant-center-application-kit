import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ArrowRightIcon } from '@commercetools-frontend/ui-kit';
import styles from './butler-command.mod.css';

const ButlerCommand = ({ command, onMouseEnter, onClick, isSelected }) => (
  <div
    key={command.id}
    data-testid={`quick-access-result(${command.id})`}
    className={classnames(styles.result, { [styles.activeResult]: isSelected })}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
  >
    <div className={styles.resultText}>{command.text}</div>
    {((Array.isArray(command.subCommands) && command.subCommands.length > 0) ||
      typeof command.subCommands === 'function') && (
      <div className={styles.subCommandsArrow}>
        <ArrowRightIcon size="medium" theme={isSelected ? 'white' : 'grey'} />
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
