import Text from '@commercetools-uikit/text';
import { InfoModalPage } from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/info-modal-page';

type ContainerProps = {
  portalId: string;
} & Partial<Parameters<typeof InfoModalPage>[0]>;

const ModalPageWithPortalParentSelector = ({
  portalId,
  ...props
}: ContainerProps) => (
  <>
    <div id={portalId} style={{ position: 'relative', height: '750px' }} />
    <InfoModalPage
      isOpen
      title="Lorem ipsum"
      onClose={() => undefined}
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      getParentSelector={() =>
        document.querySelector(`#${portalId}`) as HTMLElement
      }
      {...props}
    >
      {props.children}
    </InfoModalPage>
  </>
);
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';

export const Component = () => (
  <Suite>
    <Spec label="InfoModalPage - First Level" size="xl">
      <ModalPageWithPortalParentSelector portalId="info-modal-one">
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
        <Text.Body>
          {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
        </Text.Body>
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="InfoModalPage - Long title and subtitle" size="xl">
      <ModalPageWithPortalParentSelector
        portalId="info-modal-long"
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
    </Spec>
    <Spec label="InfoModalPage - Nested" size="xl">
      <ModalPageWithPortalParentSelector portalId="info-modal-two">
        <InfoModalPage
          isOpen
          title="Second Level Modal"
          onClose={() => undefined}
          topBarCurrentPathLabel="Nested Modal"
          topBarPreviousPathLabel="First Level Modal"
          getParentSelector={() =>
            document.querySelector(`#info-modal-two`) as HTMLElement
          }
        >
          <Text.Body>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
          </Text.Body>
          <Text.Body>
            {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
          </Text.Body>
        </InfoModalPage>
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="InfoModalPage - Multiple Nesting" size="xl">
      <ModalPageWithPortalParentSelector portalId="info-modal-nested">
        <InfoModalPage
          isOpen
          title="Second Level Modal"
          onClose={() => undefined}
          getParentSelector={() =>
            document.querySelector(`#info-modal-nested`) as HTMLElement
          }
        >
          <InfoModalPage
            isOpen
            title="Third Level Modal"
            onClose={() => undefined}
            getParentSelector={() =>
              document.querySelector(`#info-modal-nested`) as HTMLElement
            }
          >
            <InfoModalPage
              isOpen
              title="Fourth Level Modal"
              onClose={() => undefined}
              getParentSelector={() =>
                document.querySelector(`#info-modal-nested`) as HTMLElement
              }
            >
              <InfoModalPage
                isOpen
                title="Fifth Level Modal"
                onClose={() => undefined}
                getParentSelector={() =>
                  document.querySelector(`#info-modal-nested`) as HTMLElement
                }
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
    </Spec>
  </Suite>
);
