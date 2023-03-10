import { InfoModalPage } from '@commercetools-frontend/application-components';
import Text from '@commercetools-uikit/text';
import ModalController from '../components/modal-controller';
import PlaygroundController from '../components/playground-controller';
import LayoutApp from '../layouts/layout-app';

const InfoModalPageExample = () => (
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
          kind: 'text',
          name: 'subtitle',
          label: 'subtitle',
          initialValue: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum.`,
        },
      ]}
    >
      {({ values }) => (
        <ModalController
          title="Open the Info Modal Page by clicking on the button"
          buttonLabel="Open Info Modal Page"
        >
          {({ isOpen, setIsOpen }) => (
            <InfoModalPage
              title={values.title as string}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              subtitle={values.subtitle as string}
            >
              <ModalController
                title="Open Another Modal Page by clicking the button"
                buttonLabel="Open Modal Page"
              >
                {/* eslint-disable-next-line no-shadow */}
                {({ isOpen, setIsOpen }) => (
                  <InfoModalPage
                    title="Second Level Modal"
                    isOpen={isOpen}
                    subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    onClose={() => setIsOpen(false)}
                  >
                    <ModalController
                      title="Open Another Modal Page by clicking the button"
                      buttonLabel="Open Modal Page"
                    >
                      {/* eslint-disable-next-line no-shadow */}
                      {({ isOpen, setIsOpen }) => (
                        <InfoModalPage
                          title="Third Level Modal"
                          isOpen={isOpen}
                          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                          onClose={() => setIsOpen(false)}
                        >
                          <ModalController
                            title="Open Another Modal Page by clicking the button"
                            buttonLabel="Open Modal Page"
                          >
                            {/* eslint-disable-next-line no-shadow */}
                            {({ isOpen, setIsOpen }) => (
                              <InfoModalPage
                                title="Fourth Level Modal"
                                isOpen={isOpen}
                                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                onClose={() => setIsOpen(false)}
                              >
                                <ModalController
                                  title="Open Another Modal Page by clicking the button"
                                  buttonLabel="Open Modal Page"
                                >
                                  {/* eslint-disable-next-line no-shadow */}
                                  {({ isOpen, setIsOpen }) => (
                                    <InfoModalPage
                                      title="Fifth Level Modal"
                                      isOpen={isOpen}
                                      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                      onClose={() => setIsOpen(false)}
                                    >
                                      <Text.Body>
                                        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
                                      </Text.Body>
                                      <Text.Body>
                                        {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
                                      </Text.Body>
                                    </InfoModalPage>
                                  )}
                                </ModalController>
                              </InfoModalPage>
                            )}
                          </ModalController>
                        </InfoModalPage>
                      )}
                    </ModalController>
                  </InfoModalPage>
                )}
              </ModalController>
            </InfoModalPage>
          )}
        </ModalController>
      )}
    </PlaygroundController>
  </LayoutApp>
);
InfoModalPageExample.displayName = 'InfoModalPageExample';

export default InfoModalPageExample;
