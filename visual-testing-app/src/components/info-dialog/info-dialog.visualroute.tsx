import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
import { InfoDialog } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/info-dialog';

type ContainerProps = {
  portalId: string;
} & Partial<Parameters<typeof InfoDialog>[0]>;

const InfoDialogExample = (props: ContainerProps) => (
  <>
    <div id={props.portalId} style={{ flex: 1 }} />
    <InfoDialog
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      size={props.size}
      isOpen={true}
      onClose={() => undefined}
      getParentSelector={() =>
        document.querySelector(`#${props.portalId}`) as HTMLElement
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

export const Component = () => (
  <Suite>
    <Spec label="InfoDialog - Size M" size="l" contentAlignment="center">
      <InfoDialogExample size="m" portalId="dialog-m" />
    </Spec>
    <Spec label="InfoDialog - Size L" size="l" contentAlignment="center">
      <InfoDialogExample size="l" portalId="dialog-l" />
    </Spec>
    <Spec label="InfoDialog - Size 7" size={7} contentAlignment="center">
      <InfoDialogExample size={7} portalId="dialog-7" />
    </Spec>
    <Spec label="InfoDialog - Size 8" size={8} contentAlignment="center">
      <InfoDialogExample size={8} portalId="dialog-8" />
    </Spec>
    <Spec label="InfoDialog - Size 9" size={9} contentAlignment="center">
      <InfoDialogExample size={9} portalId="dialog-9" />
    </Spec>
    <Spec label="InfoDialog - Size 10" size={10} contentAlignment="center">
      <InfoDialogExample size={10} portalId="dialog-10" />
    </Spec>
    <Spec label="InfoDialog - Size Scale" size="l" contentAlignment="center">
      <InfoDialogExample size="scale" portalId="dialog-scale" />
    </Spec>
  </Suite>
);
