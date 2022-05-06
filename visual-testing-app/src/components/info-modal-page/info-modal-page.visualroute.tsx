import { useHistory } from 'react-router-dom';
import Text from '@commercetools-uikit/text';
import { InfoModalPage } from '@commercetools-frontend/application-components';
import { NestedPages, Suite } from '../../test-utils';

export const routePath = '/info-modal-page';

type ContainerProps = Partial<Parameters<typeof InfoModalPage>[0]>;

const ModalPageWithPortalParentSelector = (props: ContainerProps) => {
  const history = useHistory();
  return (
    <InfoModalPage
      isOpen
      title="Lorem ipsum"
      onClose={() => history.push(routePath)}
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      {...props}
    >
      {props.children}
    </InfoModalPage>
  );
};
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';

export const Component = () => (
  <Suite>
    <NestedPages
      title="Info modal pages"
      basePath={routePath}
      pages={[
        {
          path: 'info-modal-one',
          spec: (
            <ModalPageWithPortalParentSelector>
              <Text.Body>
                {`asdasdLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
              </Text.Body>
              <Text.Body>
                {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
              </Text.Body>
            </ModalPageWithPortalParentSelector>
          ),
        },
        {
          path: 'info-modal-long',
          spec: (
            <ModalPageWithPortalParentSelector
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            >
              <Text.Body>
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
              </Text.Body>
              <Text.Body>
                {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
              </Text.Body>
            </ModalPageWithPortalParentSelector>
          ),
        },
        {
          path: 'info-modal-two',
          spec: (
            <ModalPageWithPortalParentSelector>
              <InfoModalPage
                isOpen
                title="Second Level Modal"
                onClose={() => undefined}
                topBarCurrentPathLabel="Nested Modal"
                topBarPreviousPathLabel="First Level Modal"
              >
                <Text.Body>
                  {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
                </Text.Body>
                <Text.Body>
                  {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
                </Text.Body>
              </InfoModalPage>
            </ModalPageWithPortalParentSelector>
          ),
        },
        {
          path: 'info-modal-nested',
          spec: (
            <ModalPageWithPortalParentSelector>
              <InfoModalPage
                isOpen
                title="Second Level Modal"
                onClose={() => undefined}
              >
                <InfoModalPage
                  isOpen
                  title="Third Level Modal"
                  onClose={() => undefined}
                >
                  <InfoModalPage
                    isOpen
                    title="Fourth Level Modal"
                    onClose={() => undefined}
                  >
                    <InfoModalPage
                      isOpen
                      title="Fifth Level Modal"
                      onClose={() => undefined}
                    >
                      <Text.Body>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
                      </Text.Body>
                      <Text.Body>
                        {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
                      </Text.Body>
                    </InfoModalPage>
                  </InfoModalPage>
                </InfoModalPage>
              </InfoModalPage>
            </ModalPageWithPortalParentSelector>
          ),
        },
      ]}
    />
  </Suite>
);
