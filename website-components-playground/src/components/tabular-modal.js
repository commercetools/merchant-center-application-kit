import styled from '@emotion/styled';
import {
  TabularModalPage,
  TabHeader,
} from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
import LayoutApp from '../layouts/layout-app';
import PlaygroundController from './playground-controller';
import ModalController from './modal-controller';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const containerId = 'tabular-modal-page';

const TabList = styled.ul`
  min-height: 30px;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
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

const isBrowser = typeof window !== 'undefined';

const TabularModalPageExample = (props) => {
  return (
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
              <>
                {isBrowser && (
                  <Router>
                    <TabularModalPage
                      title={values.title}
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                      getParentSelector={() =>
                        document.querySelector(`#${containerId}`)
                      }
                      tabControls={
                        <TabList>
                          <TabHeader
                            name="tab-one"
                            to="/tabular-modal-page/tab-one"
                          >
                            Tab One
                          </TabHeader>
                          <TabHeader
                            name="tab-two"
                            to="/tabular-modal-page/tab-two"
                          >
                            Tab Two
                          </TabHeader>
                          <TabHeader
                            name="tab-three"
                            to="/tabular-modal-page/tab-three"
                            isDisabled={true}
                          >
                            Disabled tab
                          </TabHeader>
                        </TabList>
                      }
                      customTitleRow={
                        values.useCustomTitleRow === 'custom' &&
                        exampleCustomTitleRow
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
                      hideControls={values.hideControls}
                    >
                      <Switch>
                        <Route path="/tabular-modal-page/tab-one">
                          <Text.Body>{values['tab-one-content']}</Text.Body>
                        </Route>
                        <Route path="/tabular-modal-page/tab-two">
                          <Text.Body>{values['tab-two-content']}</Text.Body>
                        </Route>
                      </Switch>
                    </TabularModalPage>
                  </Router>
                )}
              </>
            )}
          </ModalController>
        )}
      </PlaygroundController>
    </LayoutApp>
  );
};
TabularModalPageExample.displayName = 'TabularModalPageExample';

export default TabularModalPageExample;
