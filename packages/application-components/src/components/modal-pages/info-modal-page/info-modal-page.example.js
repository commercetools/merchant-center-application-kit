import React from 'react';
import { InfoModalPage } from '@commercetools-frontend/application-components';
import { Text } from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';
import ModalController from '../../internals/for-docs/modal-controller';

// This component is supposed to be used in the mdx documentation
const InfoModalPageExample = () => (
  <ExampleWrapper
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
    {({ values, isPlaygroundMode }) => {
      const containerId = isPlaygroundMode
        ? 'info-modal-page-playground'
        : 'info-modal-page';
      return (
        <ModalController
          title="Open the Info Modal Page by clicking on the button"
          buttonLabel="Open Info Modal Page"
          containerId={containerId}
        >
          {({ isOpen, setIsOpen }) => (
            <InfoModalPage
              level={1}
              title={values.title}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              subtitle={values.subtitle}
              getParentSelector={() =>
                document.querySelector(`#${containerId}`)
              }
            >
              <ModalController
                title="Open Another Modal Page by clicking the button"
                buttonLabel="Open Modal Page"
                containerId={containerId}
              >
                {/* eslint-disable-next-line no-shadow */}
                {({ isOpen, setIsOpen }) => (
                  <InfoModalPage
                    title="Second Level Modal"
                    level={2}
                    isOpen={isOpen}
                    subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    onClose={() => setIsOpen(false)}
                    getParentSelector={() =>
                      document.querySelector(`#${containerId}`)
                    }
                  >
                    <ModalController
                      title="Open Another Modal Page by clicking the button"
                      buttonLabel="Open Modal Page"
                      containerId={containerId}
                    >
                      {/* eslint-disable-next-line no-shadow */}
                      {({ isOpen, setIsOpen }) => (
                        <InfoModalPage
                          title="Third Level Modal"
                          level={3}
                          isOpen={isOpen}
                          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                          onClose={() => setIsOpen(false)}
                          getParentSelector={() =>
                            document.querySelector(`#${containerId}`)
                          }
                        >
                          <ModalController
                            title="Open Another Modal Page by clicking the button"
                            buttonLabel="Open Modal Page"
                            containerId={containerId}
                          >
                            {/* eslint-disable-next-line no-shadow */}
                            {({ isOpen, setIsOpen }) => (
                              <InfoModalPage
                                title="Fourth Level Modal"
                                level={4}
                                isOpen={isOpen}
                                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                onClose={() => setIsOpen(false)}
                                getParentSelector={() =>
                                  document.querySelector(`#${containerId}`)
                                }
                              >
                                <ModalController
                                  title="Open Another Modal Page by clicking the button"
                                  buttonLabel="Open Modal Page"
                                  containerId={containerId}
                                >
                                  {/* eslint-disable-next-line no-shadow */}
                                  {({ isOpen, setIsOpen }) => (
                                    <InfoModalPage
                                      title="Fifth Level Modal"
                                      level={5}
                                      isOpen={isOpen}
                                      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                      onClose={() => setIsOpen(false)}
                                      getParentSelector={() =>
                                        document.querySelector(
                                          `#${containerId}`
                                        )
                                      }
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
      );
    }}
  </ExampleWrapper>
);
InfoModalPageExample.displayName = 'InfoModalPageExample';

export default InfoModalPageExample;
