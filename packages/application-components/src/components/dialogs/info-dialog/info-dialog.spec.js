import React from 'react';
import PropTypes from 'prop-types';
import { SecondaryButton } from '@commercetools-frontend/ui-kit';
import { render, wait, fireEvent } from '../../../../test-utils';
import InfoDialog from './info-dialog';

const DialogController = props => {
  const [isOpen, toggle] = React.useState(false);
  return (
    <div>
      <SecondaryButton label="Open Info Dialog" onClick={() => toggle(true)} />
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
    const { queryByText, getByLabelText } = render(
      <DialogController>
        {({ isOpen, toggle }) => (
          <InfoDialog
            title="Lorem ipsus"
            isOpen={isOpen}
            onClose={() => toggle(false)}
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
