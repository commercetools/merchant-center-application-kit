import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoDialog } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { VisualSpecGroup } from '../helpers';

type TExampleProps = {
  portalId: string;
} & Partial<Parameters<typeof InfoDialog>[0]>;

// The dialog portals into this target, so it needs an explicit size or nothing is captured.
const InfoDialogExample = ({ portalId, ...props }: TExampleProps) => (
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
    <InfoDialog
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      size={props.size}
      isOpen={true}
      onClose={() => undefined}
      getParentSelector={() =>
        document.querySelector(`#${portalId}`) as HTMLElement
      }
      zIndex={10001}
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
  </>
);
InfoDialogExample.displayName = 'InfoDialogExample';

const meta: Meta<typeof InfoDialog> = {
  title: 'Application Components/InfoDialog',
  component: InfoDialog,
};

export default meta;

type Story = StoryObj<typeof InfoDialog>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="InfoDialog - Size M (deprecated)">
        <InfoDialogExample size="m" portalId="dialog-m" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size L (deprecated)">
        <InfoDialogExample size="l" portalId="dialog-l" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size 7">
        <InfoDialogExample size={7} portalId="dialog-7" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size 8">
        <InfoDialogExample size={8} portalId="dialog-8" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size 9">
        <InfoDialogExample size={9} portalId="dialog-9" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size 10">
        <InfoDialogExample size={10} portalId="dialog-10" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size 11">
        <InfoDialogExample size={11} portalId="dialog-11" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size 12">
        <InfoDialogExample size={12} portalId="dialog-12" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size 13">
        <InfoDialogExample size={13} portalId="dialog-13" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size 16">
        <InfoDialogExample size={16} portalId="dialog-16" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Size Scale">
        <InfoDialogExample size="scale" portalId="dialog-scale" />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoDialog - Default size (L)">
        <InfoDialogExample portalId="dialog-default" />
      </VisualSpecGroup>
    </>
  ),
};
