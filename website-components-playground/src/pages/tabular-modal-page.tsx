import { Routes, Route, Navigate, useResolvedPath } from 'react-router-dom';
import {
  TabularModalPage,
  TabHeader,
} from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
import ModalController from '../components/modal-controller';
import PlaygroundController from '../components/playground-controller';
import LayoutApp from '../layouts/layout-app';

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

const TabularModalPageExample = () => {
  const { pathname } = useResolvedPath('');
  return (
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
            kind: 'text-multi',
            name: 'tab-one-content',
            label: 'Tab One Content',
            initialValue: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.\nNam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`,
          },
          {
            kind: 'text-multi',
            name: 'tab-two-content',
            label: 'Tab Two Content',
            initialValue: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
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
              { value: 'false', label: 'No' },
              { value: 'true', label: 'Yes' },
            ],
            initialValue: 'true',
          },
        ]}
      >
        {({ values }) => (
          <ModalController
            title={values.title as string}
            buttonLabel="Open Tabular Modal Page"
          >
            {({ isOpen, setIsOpen }) => (
              <TabularModalPage
                title={values.title as string}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                tabControls={
                  <>
                    <TabHeader
                      to={`${pathname}/tabular-modal-page/tab-one`}
                      label="Tab One"
                    />
                    <TabHeader
                      to={`${pathname}/tabular-modal-page/tab-two`}
                      label="Tab Two"
                    />
                    <TabHeader
                      to={`${pathname}/tabular-modal-page/tab-three`}
                      label="Disabled tab"
                      isDisabled
                    />
                  </>
                }
                customTitleRow={
                  values.useCustomTitleRow === 'custom' && exampleCustomTitleRow
                }
                formControls={
                  <>
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
                  </>
                }
                hideControls={Boolean(values.hideControls)}
              >
                <Routes>
                  <Route
                    path={`${pathname}/tabular-modal-page/tab-one`}
                    element={<Text.Body>{values['tab-one-content']}</Text.Body>}
                  />
                  <Route
                    path={`${pathname}/tabular-modal-page/tab-two`}
                    element={<Text.Body>{values['tab-two-content']}</Text.Body>}
                  />
                  <Route
                    element={
                      <Navigate to={`${pathname}/tabular-modal-page/tab-one`} />
                    }
                  />
                </Routes>
              </TabularModalPage>
            )}
          </ModalController>
        )}
      </PlaygroundController>
    </LayoutApp>
  );
};
TabularModalPageExample.displayName = 'TabularModalPageExample';

export default TabularModalPageExample;
