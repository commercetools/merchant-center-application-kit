import { Drawer } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import ModalController from '../components/modal-controller';
import PlaygroundController from '../components/playground-controller';
import LayoutApp from '../layouts/layout-app';

const DrawerExample = () => (
  <LayoutApp>
    <PlaygroundController
      knobs={[
        {
          kind: 'text',
          name: 'title',
          label: 'Title',
          initialValue: 'Lorem ipsum',
        },
        {
          kind: 'text',
          name: 'subtitle',
          label: 'Subtitle',
          initialValue: 'Lorem ipsum dolor sit amet',
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
            { value: '10', label: '10' },
            { value: '20', label: '20' },
            { value: '30', label: '30' },
          ],
          initialValue: '10',
        },
        {
          kind: 'select',
          name: 'hideControls',
          label: 'Hide controls',
          valueOptions: [
            { value: 'true', label: 'true' },
            { value: 'false', label: 'false' },
          ],
          initialValue: 'false',
        },
      ]}
    >
      {({ values }) => (
        <ModalController
          title="Open the Drawer component by clicking on the button"
          buttonLabel="Open Drawer"
        >
          {({ isOpen, setIsOpen }) => (
            <Drawer
              title={values.title as string}
              subtitle={values.subtitle as string}
              isOpen={isOpen}
              size={values.size as 10 | 20 | 30}
              onClose={() => setIsOpen(false)}
              hideControls={values.hideControls as boolean}
            >
              <Spacings.Stack scale="m">
                {(values.content as string).split('\n').map((text, index) => (
                  <Text.Body key={index}>{text}</Text.Body>
                ))}
              </Spacings.Stack>
            </Drawer>
          )}
        </ModalController>
      )}
    </PlaygroundController>
  </LayoutApp>
);
DrawerExample.displayName = 'DrawerExample';

export default DrawerExample;
