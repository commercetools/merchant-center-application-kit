import React from 'react';
import { InfoDialog } from '@commercetools-frontend/application-components';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';

// This component is supposed to be used in the mdx documentation
const InfoDialogExample = () => (
  <ExampleWrapper
    containerId="info-dialog"
    controllerTitle="Open the Info Dialog by clicking on the button"
    controllerButtonLabel="Open Info Dialog"
  >
    {({ isOpen, toggle }) => (
      <InfoDialog
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        size="scale"
        isOpen={isOpen}
        onClose={() => toggle(false)}
        getParentSelector={() => document.querySelector(`#info-dialog`)}
      >
        <Spacings.Stack scale="m">
          <Text.Body>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
          </Text.Body>
          <Text.Body>
            {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
          </Text.Body>
        </Spacings.Stack>
      </InfoDialog>
    )}
  </ExampleWrapper>
);
InfoDialogExample.displayName = 'InfoDialogExample';

export default InfoDialogExample;
