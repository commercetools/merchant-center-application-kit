import React from 'react';
import PropTypes from 'prop-types';
import { SecondaryButton } from '@commercetools-frontend/ui-kit';
import { render, wait, fireEvent } from '../../../../test-utils';
import ConfirmationDialog from './confirmation-dialog';

const DialogController = props => {
  const [isOpen, toggle] = React.useState(false);
  return (
    <div>
      <SecondaryButton
        label="Open Confirmation Dialog"
        onClick={() => toggle(true)}
      />
      {props.children({ isOpen, toggle })}
    </div>
  );
};
DialogController.displayName = 'DialogController';
DialogController.propTypes = {
  children: PropTypes.func.isRequired,
};

describe('rendering', () => {
  it('should open the modal and close it by clicking on the close button', async () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const { queryByText, getByLabelText } = render(
      <DialogController>
        {({ isOpen, toggle }) => (
          <ConfirmationDialog
            title="Lorem ipsus"
            isOpen={isOpen}
            onClose={() => toggle(false)}
            onCancel={onCancel}
            onConfirm={onConfirm}
          >
            {'Hello'}
          </ConfirmationDialog>
        )}
      </DialogController>
    );
    expect(queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();

    fireEvent.click(getByLabelText(/Open Confirmation Dialog/i));
    await wait(() => {
      expect(queryByText(/Lorem ipsus/i)).toBeInTheDocument();
    });
    expect(queryByText(/Hello/i)).toBeInTheDocument();

    fireEvent.click(getByLabelText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
    fireEvent.click(getByLabelText('Confirm'));
    expect(onConfirm).toHaveBeenCalled();

    fireEvent.click(getByLabelText(/Close dialog/i));
    await wait(() => {
      expect(queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();
    });
  });
});
