import { InfoDialog } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import LayoutApp from '../layouts/layout-app';
import ModalController from '../components/modal-controller';
import PlaygroundController from '../components/playground-controller';

const InfoDialogExample = () => (
  <LayoutApp>
    <PlaygroundController
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
      {({ values }) => (
        <ModalController
          title="Open the Info Dialog by clicking on the button"
          buttonLabel="Open Info Dialog"
        >
          {({ isOpen, setIsOpen }) => (
            <InfoDialog
              title={values.title as string}
              size={values.size as 'm' | 'l' | 'scale'}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <Spacings.Stack scale="m">
                {(values.content as string).split('\n').map((text, index) => (
                  <Text.Body key={index}>{text}</Text.Body>
                ))}
              </Spacings.Stack>
            </InfoDialog>
          )}
        </ModalController>
      )}
    </PlaygroundController>
  </LayoutApp>
);
InfoDialogExample.displayName = 'InfoDialogExample';

export default InfoDialogExample;
