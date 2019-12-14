import React from 'react';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { ConfirmationDialog } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/confirmation-dialog';

type ContainerProps = {
  portalId: string;
} & Partial<Parameters<typeof ConfirmationDialog>[0]>;

const ConfirmationDialogExample = (props: ContainerProps) => (
  <>
    <div id={props.portalId} style={{ flex: 1 }} />
    <ConfirmationDialog
      title="Lorem ipsum"
      size={props.size}
      isOpen={true}
      onClose={() => undefined}
      onCancel={() => undefined}
      onConfirm={() => undefined}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      getParentSelector={() => document.querySelector(`#${props.portalId}`)}
    >
      <Spacings.Stack scale="m">
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
      </Spacings.Stack>
    </ConfirmationDialog>
  </>
);
ConfirmationDialogExample.displayName = 'ConfirmationDialogExample';

export const Component = () => (
  <Suite>
    <Spec
      label="ConfirmationDialog - Size M"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="m" portalId="dialog-m" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size L"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="l" portalId="dialog-l" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size Scale"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="scale" portalId="dialog-scale" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Primary button disabled"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample
        size="l"
        isPrimaryButtonDisabled={true}
        portalId="dialog-disabled"
      />
    </Spec>
  </Suite>
);
