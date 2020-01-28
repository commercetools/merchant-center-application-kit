import React from 'react';
import styled from '@emotion/styled';
import { TabularModalPage } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
import { customProperties } from '@commercetools-uikit/design-system';
import LayoutApp from '../layouts/layout-app';
import PlaygroundController from '../components/playground-controller';
import ModalController from '../components/modal-controller';

const containerId = 'tabular-modal-page';

const TabControlsContainer = styled.div`
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
`;

const exampleCustomTitleRow = (
  <Spacings.Inline scale="m">
    <Spacings.Inline alignItems="center">
      <label htmlFor="input-1">
        <Text.Body isBold truncate>
          Input 1
        </Text.Body>
      </label>
      <TextInput id="input-1" value="" onChange={() => undefined} />
    </Spacings.Inline>

    <Spacings.Inline alignItems="center">
      <label htmlFor="input-2">
        <Text.Body isBold truncate>
          Input 2
        </Text.Body>
      </label>
      <TextInput id="input-2" value="" onChange={() => undefined} />
    </Spacings.Inline>
  </Spacings.Inline>
);

const TabularModalPageExample = props => (
  <LayoutApp>
    <PlaygroundController
      // eslint-disable-next-line react/prop-types
      {...props.pageContext}
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
          name: 'hideControls',
          label: 'Hide Controls?',
          valueOptions: [
            { value: false, label: 'No' },
            { value: true, label: 'Yes' },
          ],
          initialValue: true,
        },
      ]}
    >
      {({ values }) => (
        <ModalController
          title={values.title}
          buttonLabel="Open Tabular Modal Page"
          containerId={containerId}
        >
          {({ isOpen, setIsOpen }) => (
            <TabularModalPage
              title={values.title}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              getParentSelector={() =>
                document.querySelector(`#${containerId}`)
              }
              // FIXME: use proper Tab components
              tabControls={
                <TabControlsContainer>
                  <span>
                    <Text.Subheadline as="h4">Tab One</Text.Subheadline>
                  </span>
                  <span>
                    <Text.Subheadline as="h4">Tab Two</Text.Subheadline>
                  </span>
                  <span>
                    <Text.Subheadline as="h4">Tab Three</Text.Subheadline>
                  </span>
                </TabControlsContainer>
              }
              customTitleRow={
                values.useCustomTitleRow === 'custom' && exampleCustomTitleRow
              }
              formControls={
                <React.Fragment>
                  <TabularModalPage.FormSecondaryButton
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  />
                  <TabularModalPage.FormPrimaryButton
                    onClick={() => undefined}
                    isDisabled
                  />
                  <TabularModalPage.FormDeleteButton
                    onClick={() => undefined}
                    isDisabled
                  />
                </React.Fragment>
              }
              hideControls={values.hideControls}
            >
              <Text.Body>{values.content}</Text.Body>
            </TabularModalPage>
          )}
        </ModalController>
      )}
    </PlaygroundController>
  </LayoutApp>
);
TabularModalPageExample.displayName = 'TabularModalPageExample';

export default TabularModalPageExample;
