import React from 'react';
import { TabularModalPage } from '@commercetools-frontend/application-components';
import {
  Text,
  Spacings,
  SecondaryIconButton,
  PlusThinIcon,
  MinimizeIcon,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import { css } from '@emotion/core';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';

// This component is supposed to be used in the mdx documentation
const TabularModalPageExample = () => {
  const [numberOfParagraphs, setNumberOfParagraphs] = React.useState(1);

  return (
    <ExampleWrapper
      containerId="tabular-modal"
      containerHeight="600px"
      controllerTitle="Open the Tabular Modal Page by clicking on the button"
      controllerButtonLabel="Open Tabular Modal Page"
    >
      {({ isOpen, toggle }) => (
        <TabularModalPage
          title="Lorem ipsum"
          isOpen={isOpen}
          onClose={() => toggle(false)}
          parentSelector={() => document.querySelector(`#tabular-modal`)}
          // FIXME: use proper Tab components
          tabControls={
            <div
              css={css`
                min-height: 30px;
                display: flex;
                > * {
                  min-width: 50px;
                  cursor: pointer;
                  &:first-of-type {
                    border-bottom: 3px solid ${customProperties.colorPrimary};
                    & > * {
                      color: ${customProperties.colorPrimary};
                    }
                  }
                }
                > * + * {
                  margin-left: 16px;
                }
              `}
            >
              <span>
                <Text.Subheadline elementType="h4">Tab One</Text.Subheadline>
              </span>
              <span>
                <Text.Subheadline elementType="h4">Tab Two</Text.Subheadline>
              </span>
              <span>
                <Text.Subheadline elementType="h4">Tab Three</Text.Subheadline>
              </span>
            </div>
          }
          customControls={<React.Fragment />}
        >
          <Spacings.Stack>
            {Array.from({ length: numberOfParagraphs }).map((_, index) => (
              <div
                css={css`
                  overflow: auto;
                `}
                key={index}
              >
                <Spacings.Inset scale="m">
                  <Text.Body>
                    {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
                  </Text.Body>
                  <Text.Body>
                    {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
                  </Text.Body>
                </Spacings.Inset>
              </div>
            ))}
            <Spacings.Inline>
              <SecondaryIconButton
                icon={<PlusThinIcon />}
                label="Add paragraph"
                onClick={() => setNumberOfParagraphs(numberOfParagraphs + 1)}
              />
              <SecondaryIconButton
                icon={<MinimizeIcon />}
                label="Remove paragraph"
                onClick={() =>
                  setNumberOfParagraphs(
                    numberOfParagraphs > 0 ? numberOfParagraphs - 1 : 0
                  )
                }
              />
            </Spacings.Inline>
          </Spacings.Stack>
        </TabularModalPage>
      )}
    </ExampleWrapper>
  );
};
TabularModalPageExample.displayName = 'TabularModalPageExample';

export default TabularModalPageExample;
