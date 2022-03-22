import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
import Spacings from '@commercetools-uikit/spacings';
import IconButton from '@commercetools-uikit/icon-button';
import {
  FlameIcon,
  SearchIcon,
  BinLinearIcon,
} from '@commercetools-uikit/icons';
import {
  TabularDetailPage,
  TabHeader,
} from '@commercetools-frontend/application-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/tabular-detail-page';

type ContainerProps = Partial<Parameters<typeof TabularDetailPage>[0]>;

const TabularDetailPageContainer = (props: ContainerProps) => (
  <div style={{ position: 'relative', height: '750px' }}>
    <TabularDetailPage
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      tabControls={
        <>
          <TabHeader to="/tabular-detail-page/tab-one" label="Tab One" />
          <TabHeader to="/tabular-detail-page/tab-two" label="Tab Two" />
          <TabHeader
            to="/tabular-detail-page/tab-three"
            label="Disabled tab"
            isDisabled
          />
        </>
      }
      onPreviousPathClick={() => window.alert('Back button clicked')}
      {...props}
    >
      {props.children}
    </TabularDetailPage>
  </div>
);
TabularDetailPageContainer.displayName = 'TabularDetailPageContainer';

const Content = () => (
  <Spacings.Stack scale="m">
    <Switch>
      <Route exact={true} path="/tabular-detail-page">
        <Redirect to="/tabular-detail-page/tab-one" />
      </Route>
      <Route path="/tabular-detail-page/tab-one">
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
        <Text.Body>
          {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
        </Text.Body>
      </Route>
      <Route path="/tabular-detail-page/tab-two">
        <Text.Body>
          {`Integer dignissim in sapien vitae elementum. Vivamus vestibulum leo at tempus auctor. Nunc dictum tincidunt porta. Vestibulum ornare odio leo, vitae rutrum arcu rutrum sit amet. Suspendisse elementum lacus nisl, sit amet sollicitudin ex luctus semper. Mauris rutrum venenatis sodales. Proin dictum, lorem at tincidunt mattis, tortor felis sodales arcu, id congue orci purus in libero. In porta semper enim, sed ornare ante commodo eget. Donec facilisis nibh sed sollicitudin elementum. Donec hendrerit lobortis ante eget interdum. Fusce sodales dui nunc, sed rhoncus enim sodales eget. Vestibulum vestibulum metus molestie volutpat tincidunt.`}
        </Text.Body>
      </Route>
    </Switch>
  </Spacings.Stack>
);
export const Component = () => (
  <Suite>
    <Spec label="TabularDetailPage" size="xl">
      <TabularDetailPageContainer>
        <Content />
      </TabularDetailPageContainer>
    </Spec>
    <Spec label="TabularDetailPage - with a very long title" size="xl">
      <TabularDetailPageContainer title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl.">
        <Content />
      </TabularDetailPageContainer>
    </Spec>
    <Spec
      size="xl"
      label="TabularDetailPage - with the static exposed form controls"
    >
      <TabularDetailPageContainer
        formControls={
          <>
            <TabularDetailPage.FormSecondaryButton onClick={() => undefined} />
            <TabularDetailPage.FormPrimaryButton onClick={() => undefined} />
            <TabularDetailPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
      >
        <Content />
      </TabularDetailPageContainer>
    </Spec>
    <Spec label="TabularDetailPage - with other custom controls" size="xl">
      <TabularDetailPageContainer
        formControls={
          <>
            <IconButton
              label="SearchIcon"
              icon={<SearchIcon />}
              onClick={() => undefined}
            />
            <IconButton
              label="FlameIcon"
              icon={<FlameIcon />}
              onClick={() => undefined}
            />
            <IconButton
              label="BinLinearIcon"
              icon={<BinLinearIcon />}
              onClick={() => undefined}
            />
          </>
        }
      >
        <Content />
      </TabularDetailPageContainer>
    </Spec>
    <Spec
      label="TabularDetailPage - with Custom Title Row and no controls"
      size="xl"
    >
      <TabularDetailPageContainer
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
      </TabularDetailPageContainer>
    </Spec>
    <Spec
      label="TabularDetailPage - with Custom Title Row and the static exposed form controls"
      size="xl"
    >
      <TabularDetailPageContainer
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
        formControls={
          <>
            <TabularDetailPage.FormSecondaryButton onClick={() => undefined} />
            <TabularDetailPage.FormPrimaryButton onClick={() => undefined} />
            <TabularDetailPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
      >
        <Content />
      </TabularDetailPageContainer>
    </Spec>
    <Spec label="TabularMainPage - with hidden controls" size="xl">
      <TabularDetailPageContainer
        formControls={
          <>
            <TabularDetailPage.FormSecondaryButton onClick={() => undefined} />
            <TabularDetailPage.FormPrimaryButton onClick={() => undefined} />
            <TabularDetailPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
        hideControls={true}
      >
        <Content />
      </TabularDetailPageContainer>
    </Spec>
    <Spec label="TabularDetailPage - long content" size="xl">
      <TabularDetailPageContainer>
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </TabularDetailPageContainer>
    </Spec>
  </Suite>
);
