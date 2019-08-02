import React from 'react';
import { SecondaryButton } from '@commercetools-frontend/ui-kit';
import { render, wait, fireEvent } from '../../../../test-utils';
import FormDialog from './form-dialog';

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
        label="Open Form Dialog"
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
    const { queryByText, getByLabelText } = render(
      <DialogController>
        {({ isOpen, setIsOpen }) => (
          <FormDialog
            title="Lorem ipsus"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSecondaryButtonClick={onCancel}
            onPrimaryButtonClick={onConfirm}
          >
            {'Hello'}
          </FormDialog>
        )}
      </DialogController>
    );
    expect(queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();

    fireEvent.click(getByLabelText(/Open Form Dialog/i));
    await wait(() => {
      expect(queryByText(/Lorem ipsus/i)).toBeInTheDocument();
    });
    expect(queryByText(/Hello/i)).toBeInTheDocument();

    fireEvent.click(getByLabelText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
    fireEvent.click(getByLabelText('Save'));
    expect(onConfirm).toHaveBeenCalled();

    fireEvent.click(getByLabelText(/Close dialog/i));
    await wait(() => {
      expect(queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();
    });
  });
  it('should not be able to close the modal when onClose is not provided', async () => {
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const { queryByText, getByLabelText } = render(
      <DialogController>
        {({ isOpen }) => (
          <FormDialog
            title="Lorem ipsus"
            isOpen={isOpen}
            onSecondaryButtonClick={onCancel}
            onPrimaryButtonClick={onConfirm}
          >
            {'Hello'}
          </FormDialog>
        )}
      </DialogController>
    );
    expect(queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();

    fireEvent.click(getByLabelText(/Open Form Dialog/i));
    await wait(() => {
      expect(queryByText(/Lorem ipsus/i)).toBeInTheDocument();
    });
    expect(queryByText(/Hello/i)).toBeInTheDocument();

    await wait(() => {
      expect(queryByText(/Close dialog/i)).not.toBeInTheDocument();
    });
  });
});
