import React from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { renderComponent, fireEvent } from '../../../test-utils';
import ConfirmationDialog from './confirmation-dialog';

type DialogControllerProps = {
  children: (renderProps: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<boolean>;
  }) => JSX.Element;
};
const DialogController = (props: DialogControllerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
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
    const rendered = renderComponent(
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
    expect(rendered.queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();

    fireEvent.click(rendered.getByLabelText(/Open Confirmation Dialog/i));
    await rendered.findByText(/Lorem ipsus/i);
    expect(rendered.queryByText(/Hello/i)).toBeInTheDocument();

    fireEvent.click(rendered.getByLabelText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
    fireEvent.click(rendered.getByLabelText('Confirm'));
    expect(onConfirm).toHaveBeenCalled();

    fireEvent.click(rendered.getByLabelText(/Close dialog/i));
    expect(rendered.queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();
  });
  it('should not be able to close the modal when onClose is not provided', async () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const rendered = renderComponent(
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
    expect(rendered.queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();

    fireEvent.click(rendered.getByLabelText(/Open Confirmation Dialog/i));
    await rendered.findByText(/Lorem ipsus/i);
    expect(rendered.queryByText(/Hello/i)).toBeInTheDocument();

    expect(rendered.queryByText(/Close dialog/i)).not.toBeInTheDocument();
  });
});
