import { Dispatch, useState } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { screen, renderComponent, fireEvent } from '../../../test-utils';
import ConfirmationDialog from './confirmation-dialog';

type DialogControllerProps = {
  children: (renderProps: {
    isOpen: boolean;
    setIsOpen: Dispatch<boolean>;
  }) => JSX.Element;
};
const DialogController = (props: DialogControllerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <SecondaryButton
        label="Open Confirmation Dialog"
        onClick={() => setIsOpen(true)}
      />
      {props.children({ isOpen, setIsOpen })}
    </div>
  );
};
DialogController.displayName = 'DialogController';

describe('rendering', () => {
  it('should open the modal and close it by clicking on the close button', async () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    renderComponent(
      <DialogController>
        {({ isOpen, setIsOpen }) => (
          <ConfirmationDialog
            title="Lorem ipsus"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onCancel={onCancel}
            onConfirm={onConfirm}
          >
            {'Hello'}
          </ConfirmationDialog>
        )}
      </DialogController>
    );
    expect(screen.queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Open Confirmation Dialog/i));
    await screen.findByText(/Lorem ipsus/i);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('Confirm'));
    expect(onConfirm).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText(/Close dialog/i));
    expect(screen.queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();
  });
  it('should not be able to close the modal when onClose is not provided', async () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    renderComponent(
      <DialogController>
        {({ isOpen }) => (
          <ConfirmationDialog
            title="Lorem ipsus"
            isOpen={isOpen}
            onCancel={onCancel}
            onConfirm={onConfirm}
          >
            {'Hello'}
          </ConfirmationDialog>
        )}
      </DialogController>
    );

    expect(screen.queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Open Confirmation Dialog/i));
    await screen.findByText(/Lorem ipsus/i);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();

    expect(screen.queryByText(/Close dialog/i)).not.toBeInTheDocument();
  });
});
