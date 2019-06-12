import React from 'react';
import { InfoDialog } from '@commercetools-frontend/application-components';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';
import ModalController from '../../internals/for-docs/modal-controller';

// This component is supposed to be used in the mdx documentation
const InfoDialogExample = () => {
  return (
    <ExampleWrapper
      knobs={[
        {
          kind: 'text',
          name: 'title',
          label: 'Title',
          initialValue:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          kind: 'text-multi',
          name: 'content',
          label: 'Content',
          initialValue: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.\nNam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`,
        },
        {
          kind: 'select',
          name: 'size',
          label: 'Size',
          valueOptions: [
            { value: 'm', label: 'm' },
            { value: 'l', label: 'l' },
            { value: 'scale', label: 'scale' },
          ],
          initialValue: 'scale',
        },
      ]}
    >
      {({ values, isPlaygroundMode }) => {
        const containerId = isPlaygroundMode
          ? 'info-dialog-playground'
          : 'info-dialog';
        return (
          <ModalController
            containerId={containerId}
            title="Open the Info Dialog by clicking on the button"
            buttonLabel="Open Info Dialog"
          >
            {({ isOpen, setIsOpen }) => (
              <InfoDialog
                title={values.title}
                size={values.size}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                getParentSelector={() =>
                  document.querySelector(`#${containerId}`)
                }
              >
                <Spacings.Stack scale="m">
                  {values.content.split('\n').map((text, index) => (
                    <Text.Body key={index}>{text}</Text.Body>
                  ))}
                </Spacings.Stack>
              </InfoDialog>
            )}
          </ModalController>
        );
      }}
    </ExampleWrapper>
  );
};
InfoDialogExample.displayName = 'InfoDialogExample';

export default InfoDialogExample;
