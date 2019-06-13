import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from '@emotion/core';
import { withKnobs, text, number } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import {
  Text,
  Spacings,
  SecondaryIconButton,
  PlusThinIcon,
  MinimizeIcon,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import Readme from './README.md';
import TabularModalPage from './tabular-modal-page';
import ModalController from '../../internals/for-docs/modal-controller';

storiesOf('Components|Modals', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('TabularModalPage', () => {
    const firstModalLevel = number('level', 1);
    const [numberOfParagraphs, setNumberOfParagraphs] = React.useState(1);
    return (
      <React.Fragment>
        <div id={PORTALS_CONTAINER_ID} />
        <ModalController
          title="Open the Tabular Modal Page by clicking on the button"
          buttonLabel="Open Tabular Modal"
        >
          {({ isOpen, setIsOpen }) => (
            <TabularModalPage
              level={firstModalLevel}
              title={text('title', 'Tabular Modal Page Title')}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              topBarPreviousPathLabel={
                text('topBarPreviousPathLabel', '') || undefined
              }
              topBarCurrentPathLabel={
                text('topBarCurrentPathLabel', '') || undefined
              }
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
                        border-bottom: 3px solid
                          ${customProperties.colorPrimary};
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
                    <Text.Subheadline elementType="h4">
                      Tab One
                    </Text.Subheadline>
                  </span>
                  <span>
                    <Text.Subheadline elementType="h4">
                      Tab Two
                    </Text.Subheadline>
                  </span>
                  <span>
                    <Text.Subheadline elementType="h4">
                      Tab Three
                    </Text.Subheadline>
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
                    onClick={() =>
                      setNumberOfParagraphs(numberOfParagraphs + 1)
                    }
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
        </ModalController>
      </React.Fragment>
    );
  });
