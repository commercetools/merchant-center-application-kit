import { Dispatch, useState } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { screen, renderComponent, fireEvent } from '../../../test-utils';
import FormDialog from './form-dialog';

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
    renderComponent(
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
    expect(screen.queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Open Form Dialog/i));
    await screen.findByText(/Lorem ipsus/i);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('Save'));
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
    expect(screen.queryByText(/Lorem ipsus/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Open Form Dialog/i));
    await screen.findByText(/Lorem ipsus/i);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();

    expect(screen.queryByText(/Close dialog/i)).not.toBeInTheDocument();
  });

  it('should show secondaryButton Icon', () => {
    renderComponent(
      <DialogController>
        {() => (
          <FormDialog
            title="Lorem ipsus"
            isOpen={true}
            onSecondaryButtonClick={() => {}}
            onPrimaryButtonClick={() => {}}
            labelSecondaryButtonIcon={<div>button icon</div>}
          >
            {'Hello'}
          </FormDialog>
        )}
      </DialogController>
    );

    screen.getByText('button icon');
  });
});
