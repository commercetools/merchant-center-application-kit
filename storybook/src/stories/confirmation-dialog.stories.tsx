import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmationDialog } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { VisualSpecGroup } from '../helpers';

type TExampleProps = {
  portalId: string;
} & Partial<Parameters<typeof ConfirmationDialog>[0]>;

// The dialog portals into this target, so it needs an explicit size or nothing is captured.
const ConfirmationDialogExample = ({ portalId, ...props }: TExampleProps) => (
  <>
    <div
      id={portalId}
      style={{
        position: 'relative',
        width: '100%',
        height: 550,
        overflow: 'hidden',
      }}
    />
    <ConfirmationDialog
      title="Lorem ipsum"
      size={props.size}
      isOpen={true}
      onClose={() => undefined}
      onCancel={() => undefined}
      onConfirm={() => undefined}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      getParentSelector={() =>
        document.querySelector(`#${portalId}`) as HTMLElement
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

const meta: Meta<typeof ConfirmationDialog> = {
  title: 'Application Components/ConfirmationDialog',
  component: ConfirmationDialog,
};

export default meta;

type Story = StoryObj<typeof ConfirmationDialog>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="ConfirmationDialog - Size M (deprecated)">
        <ConfirmationDialogExample size="m" portalId="dialog-m" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size L (deprecated)">
        <ConfirmationDialogExample size="l" portalId="dialog-l" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size 7">
        <ConfirmationDialogExample size={7} portalId="dialog-7" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size 8">
        <ConfirmationDialogExample size={8} portalId="dialog-8" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size 9">
        <ConfirmationDialogExample size={9} portalId="dialog-9" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size 10">
        <ConfirmationDialogExample size={10} portalId="dialog-10" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size 11">
        <ConfirmationDialogExample size={11} portalId="dialog-11" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size 12">
        <ConfirmationDialogExample size={12} portalId="dialog-12" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size 13">
        <ConfirmationDialogExample size={13} portalId="dialog-13" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size 16">
        <ConfirmationDialogExample size={16} portalId="dialog-16" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Size Scale">
        <ConfirmationDialogExample size="scale" portalId="dialog-scale" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Default size">
        <ConfirmationDialogExample portalId="dialog-default" />
      </VisualSpecGroup>
      <VisualSpecGroup label="ConfirmationDialog - Primary button disabled">
        <ConfirmationDialogExample
          size="l"
          isPrimaryButtonDisabled={true}
          portalId="dialog-disabled"
        />
      </VisualSpecGroup>
    </>
  ),
};
