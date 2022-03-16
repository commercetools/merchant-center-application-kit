import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
import Spacings from '@commercetools-uikit/spacings';
import {
  TabularMainPage,
  TabHeader,
} from '@commercetools-frontend/application-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/tabular-main-page';

type ContainerProps = Partial<Parameters<typeof TabularMainPage>[0]>;

const TabularMainPageContainer = (props: ContainerProps) => (
  <div style={{ position: 'relative', height: '750px' }}>
    <TabularMainPage
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      tabControls={
        <>
          <TabHeader to="/tabular-main-page/tab-one" label="Tab One" />
          <TabHeader to="/tabular-main-page/tab-two" label="Tab Two" />
          <TabHeader
            to="/tabular-main-page/tab-three"
            label="Disabled tab"
            isDisabled
          />
        </>
      }
      {...props}
    >
      {props.children}
    </TabularMainPage>
  </div>
);
TabularMainPageContainer.displayName = 'TabularMainPageContainer';

const Content = () => (
  <Spacings.Stack scale="m">
    <Switch>
      <Route exact={true} path="/tabular-main-page">
        <Redirect to="/tabular-main-page/tab-one" />
      </Route>
      <Route path="/tabular-main-page/tab-one">
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
        <Text.Body>
          {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
        </Text.Body>
      </Route>
      <Route path="/tabular-main-page/tab-two">
        <Text.Body>
          {`Integer dignissim in sapien vitae elementum. Vivamus vestibulum leo at tempus auctor. Nunc dictum tincidunt porta. Vestibulum ornare odio leo, vitae rutrum arcu rutrum sit amet. Suspendisse elementum lacus nisl, sit amet sollicitudin ex luctus semper. Mauris rutrum venenatis sodales. Proin dictum, lorem at tincidunt mattis, tortor felis sodales arcu, id congue orci purus in libero. In porta semper enim, sed ornare ante commodo eget. Donec facilisis nibh sed sollicitudin elementum. Donec hendrerit lobortis ante eget interdum. Fusce sodales dui nunc, sed rhoncus enim sodales eget. Vestibulum vestibulum metus molestie volutpat tincidunt.`}
        </Text.Body>
      </Route>
    </Switch>
  </Spacings.Stack>
);
export const Component = () => (
  <Suite>
    <Spec label="TabularMainPage" size="xl">
      <TabularMainPageContainer>
        <Content />
      </TabularMainPageContainer>
    </Spec>
    <Spec label="TabularMainPage - with Custom Title Row" size="xl">
      <TabularMainPageContainer
        customTitleRow={
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
        }
      >
        <Content />
      </TabularMainPageContainer>
    </Spec>
    <Spec label="TabularMainPage - long content" size="xl">
      <TabularMainPageContainer>
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </TabularMainPageContainer>
    </Spec>
  </Suite>
);
