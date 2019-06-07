import React from 'react';
import { InfoModalPage } from '@commercetools-frontend/application-components';
import { Text } from '@commercetools-frontend/ui-kit';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';
import ModalController from '../../internals/for-docs/modal-controller';

// This component is supposed to be used in the mdx documentation
const InfoModalPageExample = () => (
  <ExampleWrapper
    containerId="info-modal"
    containerHeight="600px"
    controllerTitle="Open the Info Modal Page by clicking on the button"
    controllerButtonLabel="Open Info Modal Page"
  >
    {({ isOpen, toggle }) => (
      <InfoModalPage
        title="First Level Modal"
        level={1}
        isOpen={isOpen}
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        onClose={() => toggle(false)}
        getParentSelector={() => document.querySelector(`#info-modal`)}
      >
        <ModalController
          title="Open Another Modal Page by clicking the button"
          buttonLabel="Open Modal Page"
        >
          {/* eslint-disable-next-line no-shadow */}
          {({ isOpen, toggle }) => (
            <InfoModalPage
              title="Second Level Modal"
              level={2}
              isOpen={isOpen}
              subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              onClose={() => toggle(false)}
              getParentSelector={() => document.querySelector(`#info-modal`)}
            >
              <ModalController
                title="Open Another Modal Page by clicking the button"
                buttonLabel="Open Modal Page"
              >
                {/* eslint-disable-next-line no-shadow */}
                {({ isOpen, toggle }) => (
                  <InfoModalPage
                    title="Third Level Modal"
                    level={3}
                    isOpen={isOpen}
                    subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    onClose={() => toggle(false)}
                    getParentSelector={() =>
                      document.querySelector(`#info-modal`)
                    }
                  >
                    <ModalController
                      title="Open Another Modal Page by clicking the button"
                      buttonLabel="Open Modal Page"
                    >
                      {/* eslint-disable-next-line no-shadow */}
                      {({ isOpen, toggle }) => (
                        <InfoModalPage
                          title="Fourth Level Modal"
                          level={4}
                          isOpen={isOpen}
                          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                          onClose={() => toggle(false)}
                          getParentSelector={() =>
                            document.querySelector(`#info-modal`)
                          }
                        >
                          <ModalController
                            title="Open Another Modal Page by clicking the button"
                            buttonLabel="Open Modal Page"
                          >
                            {/* eslint-disable-next-line no-shadow */}
                            {({ isOpen, toggle }) => (
                              <InfoModalPage
                                title="Fifth Level Modal"
                                level={5}
                                isOpen={isOpen}
                                subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                onClose={() => toggle(false)}
                                getParentSelector={() =>
                                  document.querySelector(`#info-modal`)
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
  </ExampleWrapper>
);
InfoModalPageExample.displayName = 'InfoModalPageExample';

export default InfoModalPageExample;
