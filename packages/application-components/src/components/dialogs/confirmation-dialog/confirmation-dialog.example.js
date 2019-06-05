import React from 'react';
import { ConfirmationDialog } from '@commercetools-frontend/application-components';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';

// This component is supposed to be used in the mdx documentation
const ConfirmationDialogExample = () => (
  <ExampleWrapper
    containerId="confirmation-dialog"
    controllerTitle="Open the Confirmation Dialog by clicking on the button"
    controllerButtonLabel="Open Confirmation Dialog"
  >
    {({ isOpen, toggle }) => (
      <ConfirmationDialog
        title="Lorem Ipsum"
        isOpen={isOpen}
        onClose={() => toggle(false)}
        size="l"
        onCancel={() => {
          toggle(false);
        }}
        onConfirm={() => {
          alert('confirmed');
          toggle(false);
        }}
        getParentSelector={() => document.querySelector(`#confirmation-dialog`)}
      >
        <Spacings.Stack scale="m">
          <Text.Body>
            {
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.'
            }
          </Text.Body>
          <Text.Body>
            {
              'Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.'
            }
          </Text.Body>
        </Spacings.Stack>
      </ConfirmationDialog>
    )}
  </ExampleWrapper>
);
ConfirmationDialogExample.displayName = 'ConfirmationDialogExample';

export default ConfirmationDialogExample;
