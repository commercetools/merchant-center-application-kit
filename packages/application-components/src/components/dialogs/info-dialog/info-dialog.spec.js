import React from 'react';
import PropTypes from 'prop-types';
import { SecondaryButton } from '@commercetools-frontend/ui-kit';
import { render, wait, fireEvent } from '../../../../test-utils';
import InfoDialog from './info-dialog';

const DialogController = props => {
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
DialogController.propTypes = {
  children: PropTypes.func.isRequired,
};

describe('rendering', () => {
  it('should open the modal and close it by clicking on the close button', async () => {
    const { queryByText, getByLabelText } = render(
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
    expect(queryByText(/Lorem ipsus/)).not.toBeInTheDocument();

    fireEvent.click(getByLabelText(/Open Info Dialog/));
    await wait(() => {
      expect(queryByText(/Lorem ipsus/)).toBeInTheDocument();
    });
    expect(queryByText(/Hello/)).toBeInTheDocument();

    fireEvent.click(getByLabelText(/Close dialog/));
    await wait(() => {
      expect(queryByText(/Lorem ipsus/)).not.toBeInTheDocument();
    });
  });
});
