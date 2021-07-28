import { Dispatch, useState } from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { screen, renderComponent, fireEvent } from '../../../test-utils';
import InfoDialog from './info-dialog';

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
        label="Open Info Dialog"
        onClick={() => setIsOpen(true)}
      />
      {props.children({ isOpen, setIsOpen })}
    </div>
  );
};
DialogController.displayName = 'DialogController';

describe('rendering', () => {
  it('should open the modal and close it by clicking on the close button', async () => {
    renderComponent(
      <DialogController>
        {({ isOpen, setIsOpen }) => (
          <InfoDialog
            title="Lorem ipsus"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            {'Hello'}
          </InfoDialog>
        )}
      </DialogController>
    );
    expect(screen.queryByText(/Lorem ipsus/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Open Info Dialog/));
    await screen.findByText(/Lorem ipsus/);
    expect(screen.getByText(/Hello/)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/Close dialog/));
    expect(screen.queryByText(/Lorem ipsus/)).not.toBeInTheDocument();
  });
});
