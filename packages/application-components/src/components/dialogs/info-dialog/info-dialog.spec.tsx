import React from 'react';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { renderComponent, fireEvent } from '../../../test-utils';
import InfoDialog from './info-dialog';

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
    const rendered = renderComponent(
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
    expect(rendered.queryByText(/Lorem ipsus/)).not.toBeInTheDocument();

    fireEvent.click(rendered.getByLabelText(/Open Info Dialog/));
    await rendered.findByText(/Lorem ipsus/);
    expect(rendered.queryByText(/Hello/)).toBeInTheDocument();

    fireEvent.click(rendered.getByLabelText(/Close dialog/));
    expect(rendered.queryByText(/Lorem ipsus/)).not.toBeInTheDocument();
  });
});
