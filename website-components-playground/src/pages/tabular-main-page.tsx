import { Routes, Route, useResolvedPath, Navigate } from 'react-router-dom';
import {
  TabularMainPage,
  TabHeader,
} from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
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

const exampleCustomTitleRowWithTitleAndSideForm = (
  <Spacings.Inline scale="m" justifyContent="space-between">
    <TabularMainPage.PageHeaderTitle
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      titleSize="big"
    />
    <Spacings.Inline alignItems="center">
      <Text.Body isBold truncate>
        Lorem ipsum dolor sit amet.
      </Text.Body>
    </Spacings.Inline>
  </Spacings.Inline>
);

const getCustomTitleRow = (useCustomTitleRow: string) => {
  switch (useCustomTitleRow) {
    case 'custom-form':
      return exampleCustomTitleRow;
    case 'custom-title-and-side-content':
      return exampleCustomTitleRowWithTitleAndSideForm;
    default:
      return null;
  }
};

const TabularMainPageExample = () => {
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
              { value: 'custom-form', label: 'Custom (form example)' },
              {
                value: 'custom-title-and-side-content',
                label: 'Custom (title and side content example)',
              },
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
          <TabularMainPage
            title={values.title as string}
            tabControls={
              <>
                <TabHeader
                  to={`${pathname}/tabular-main-page/tab-one`}
                  label="Tab One"
                />
                <TabHeader
                  to={`${pathname}/tabular-main-page/tab-two`}
                  label="Tab Two"
                />
                <TabHeader
                  to={`${pathname}/tabular-main-page/tab-three`}
                  label="Disabled tab"
                  isDisabled
                />
              </>
            }
            customTitleRow={getCustomTitleRow(
              values.useCustomTitleRow as string
            )}
            formControls={
              <>
                <TabularMainPage.FormSecondaryButton
                  onClick={() => undefined}
                  isDisabled
                />
                <TabularMainPage.FormPrimaryButton
                  onClick={() => undefined}
                  isDisabled
                />
                <TabularMainPage.FormDeleteButton
                  onClick={() => undefined}
                  isDisabled
                />
              </>
            }
            hideControls={Boolean(values.hideControls)}
          >
            <Routes>
              <Route
                path={`${pathname}/tabular-main-page/tab-one`}
                element={<Text.Body>{values['tab-one-content']}</Text.Body>}
              ></Route>
              <Route
                path={`${pathname}/tabular-main-page/tab-two`}
                element={<Text.Body>{values['tab-two-content']}</Text.Body>}
              ></Route>
              <Route
                element={
                  <Navigate to={`${pathname}/tabular-main-page/tab-one`} />
                }
              />
            </Routes>
          </TabularMainPage>
        )}
      </PlaygroundController>
    </LayoutApp>
  );
};
TabularMainPageExample.displayName = 'TabularMainPageExample';

export default TabularMainPageExample;
