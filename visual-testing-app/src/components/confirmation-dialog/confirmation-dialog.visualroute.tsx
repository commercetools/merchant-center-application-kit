import { ConfirmationDialog } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
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
      getParentSelector={() =>
        document.querySelector(`#${props.portalId}`) as HTMLElement
      }
      zIndex={10001}
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
      label="ConfirmationDialog - Size M (deprecated)"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="m" portalId="dialog-m" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size L (deprecated)"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="l" portalId="dialog-l" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size xl"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="xl" portalId="dialog-xl" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size 7"
      size={7}
      contentAlignment="center"
    >
      <ConfirmationDialogExample size={7} portalId="dialog-7" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size 8"
      size={8}
      contentAlignment="center"
    >
      <ConfirmationDialogExample size={8} portalId="dialog-8" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size 9"
      size={9}
      contentAlignment="center"
    >
      <ConfirmationDialogExample size={9} portalId="dialog-9" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size 10"
      size={10}
      contentAlignment="center"
    >
      <ConfirmationDialogExample size={10} portalId="dialog-10" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size 11"
      size={11}
      contentAlignment="center"
    >
      <ConfirmationDialogExample size={11} portalId="dialog-11" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size 12"
      size={12}
      contentAlignment="center"
    >
      <ConfirmationDialogExample size={12} portalId="dialog-12" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size 13"
      size={13}
      contentAlignment="center"
    >
      <ConfirmationDialogExample size={13} portalId="dialog-13" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size Scale"
      size={7}
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="scale" portalId="dialog-scale" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Default size"
      size={13}
      contentAlignment="center"
    >
      <ConfirmationDialogExample portalId="dialog-default" />
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
