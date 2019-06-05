import React from 'react';
import PropTypes from 'prop-types';
import {
  Spacings,
  Text,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';

const ModalController = props => {
  const [isOpen, toggle] = React.useState(false);
  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Spacings.Stack>
        <Text.Body>{props.title}</Text.Body>
        <Spacings.Inline>
          <SecondaryButton
            label={props.buttonLabel}
            onClick={() => toggle(true)}
          />
        </Spacings.Inline>
        {props.children({ isOpen, toggle })}
      </Spacings.Stack>
    </div>
  );
};
ModalController.displayName = 'ModalController';
ModalController.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default ModalController;
