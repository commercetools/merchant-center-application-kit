import React from 'react';
import { TabularModalPage } from '@commercetools-frontend/application-components';
import {
  Text,
  Spacings,
  TextInput,
  customProperties,
  IconButton,
  SearchIcon,
  FlameIcon,
  BinLinearIcon,
} from '@commercetools-frontend/ui-kit';
import { css } from '@emotion/core';
import ExampleWrapper from '../../internals/for-docs/example-wrapper';
import ModalController from '../../internals/for-docs/modal-controller';

const exampleCustomTitleRow = (
  <Spacings.Inline scale="m">
    <Spacings.Inline alignItems="center">
      <label htmlFor="input-1">
        <Text.Body isBold truncate>
          Input 1
        </Text.Body>
      </label>
      <TextInput id="input-1" value="" onChange={() => {}} />
    </Spacings.Inline>

    <Spacings.Inline alignItems="center">
      <label htmlFor="input-2">
        <Text.Body isBold truncate>
          Input 2
        </Text.Body>
      </label>
      <TextInput id="input-2" value="" onChange={() => {}} />
    </Spacings.Inline>
  </Spacings.Inline>
);

const exampleCustomControls = (
  <Spacings.Inline>
    <IconButton icon={<SearchIcon />} onClick={() => {}} />
    <IconButton icon={<FlameIcon />} onClick={() => {}} />
    <IconButton icon={<BinLinearIcon />} onClick={() => {}} />
  </Spacings.Inline>
);

const customControls = option => {
  if (option === 'custom') return exampleCustomControls;
  if (option === 'none') return <React.Fragment />;
  return undefined;
};

// This component is supposed to be used in the mdx documentation
const TabularModalPageExample = () => (
  <React.Fragment>
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
          kind: 'text-multi',
          name: 'content',
          label: 'Content',
          initialValue: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.\nNam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`,
        },
        {
          kind: 'select',
          name: 'useCustomTitleRow',
          label: 'Title Row',
          valueOptions: [
            { value: 'default', label: 'Default' },
            { value: 'custom', label: 'Custom (form example)' },
          ],
          initialValue: 'default',
        },
        {
          kind: 'select',
          name: 'useCustomControls',
          label: 'Form Controls',
          valueOptions: [
            { value: 'default', label: 'Default' },
            { value: 'custom', label: 'Custom (example)' },
            { value: 'none', label: 'None' },
          ],
          initialValue: 'none',
        },
      ]}
    >
      {({ values, isPlaygroundMode }) => {
        const containerId = isPlaygroundMode
          ? 'tabular-modal-page-playground'
          : 'tabular-modal-page';
        return (
          <ModalController
            title={values.title}
            buttonLabel="Open Tabular Modal Page"
            containerId={containerId}
          >
            {({ isOpen, setIsOpen }) => (
              <TabularModalPage
                title="Lorem ipsum"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                getParentSelector={() =>
                  document.querySelector(`#${containerId}`)
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
                customTitleRow={
                  values.useCustomTitleRow && exampleCustomTitleRow
                }
                customControls={customControls(values.useCustomControls)}
              >
                <Text.Body>{values.content}</Text.Body>
              </TabularModalPage>
            )}
          </ModalController>
        );
      }}
    </ExampleWrapper>
  </React.Fragment>
);
TabularModalPageExample.displayName = 'TabularModalPageExample';

export default TabularModalPageExample;
