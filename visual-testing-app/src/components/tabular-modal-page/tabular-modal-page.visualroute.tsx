import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
import IconButton from '@commercetools-uikit/icon-button';
import {
  FlameIcon,
  SearchIcon,
  BinLinearIcon,
} from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import {
  TabularModalPage,
  TabHeader,
} from '@commercetools-frontend/application-components';
import { Suite, Spec } from '../../test-utils';
import { Switch, Route, Redirect } from 'react-router-dom';

export const routePath = '/tabular-modal-page';

type ContainerProps = {
  portalId: string;
} & Partial<Parameters<typeof TabularModalPage>[0]>;

const ModalPageWithPortalParentSelector = ({
  portalId,
  ...props
}: ContainerProps) => (
  <>
    <div id={portalId} style={{ position: 'relative', height: '750px' }} />
    <TabularModalPage
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      level={1}
      isOpen={true}
      onClose={() => undefined}
      getParentSelector={() =>
        document.querySelector(`#${portalId}`) as HTMLElement
      }
      tabControls={
        <>
          <TabHeader to="/tabular-modal-page/tab-one" label="Tab One" />
          <TabHeader to="/tabular-modal-page/tab-two" label="Tab Two" />
          <TabHeader
            to="/tabular-modal-page/tab-three"
            label="Disabled tab"
            isDisabled
          />
        </>
      }
      {...props}
    >
      {props.children}
    </TabularModalPage>
  </>
);
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';

const Content = () => (
  <Spacings.Stack scale="m">
    <Switch>
      <Route exact={true} path="/tabular-modal-page">
        <Redirect to="/tabular-modal-page/tab-one" />
      </Route>
      <Route path="/tabular-modal-page/tab-one">
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
        <Text.Body>
          {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
        </Text.Body>
      </Route>
      <Route path="/tabular-modal-page/tab-two">
        <Text.Body>
          {`Integer dignissim in sapien vitae elementum. Vivamus vestibulum leo at tempus auctor. Nunc dictum tincidunt porta. Vestibulum ornare odio leo, vitae rutrum arcu rutrum sit amet. Suspendisse elementum lacus nisl, sit amet sollicitudin ex luctus semper. Mauris rutrum venenatis sodales. Proin dictum, lorem at tincidunt mattis, tortor felis sodales arcu, id congue orci purus in libero. In porta semper enim, sed ornare ante commodo eget. Donec facilisis nibh sed sollicitudin elementum. Donec hendrerit lobortis ante eget interdum. Fusce sodales dui nunc, sed rhoncus enim sodales eget. Vestibulum vestibulum metus molestie volutpat tincidunt.`}
        </Text.Body>
      </Route>
    </Switch>
  </Spacings.Stack>
);
export const Component = () => (
  <Suite>
    <Spec label="TabularModalPage" size="xl">
      <ModalPageWithPortalParentSelector portalId="tabular-modal-page-default">
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      size="xl"
      label="TabularModalPage - with the static exposed form controls"
    >
      <ModalPageWithPortalParentSelector
        portalId="tabular-modal-page-default-controls"
        formControls={
          <>
            <TabularModalPage.FormSecondaryButton onClick={() => undefined} />
            <TabularModalPage.FormPrimaryButton onClick={() => undefined} />
            <TabularModalPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="TabularModalPage - with other custom controls" size="xl">
      <ModalPageWithPortalParentSelector
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
        portalId="tabular-modal-page-custom-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="TabularModalPage - with Custom Title Row and no controls"
      size="xl"
    >
      <ModalPageWithPortalParentSelector
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
        portalId="tabular-modal-page-custom-title-row-no-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="TabularModalPage - with Custom Title Row and the static exposed form controls"
      size="xl"
    >
      <ModalPageWithPortalParentSelector
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
            <TabularModalPage.FormSecondaryButton onClick={() => undefined} />
            <TabularModalPage.FormPrimaryButton onClick={() => undefined} />
            <TabularModalPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
        portalId="tabular-modal-page-custom-title-row-default-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="TabularModalPage - with hidden controls" size="xl">
      <ModalPageWithPortalParentSelector
        formControls={
          <>
            <TabularModalPage.FormSecondaryButton onClick={() => undefined} />
            <TabularModalPage.FormPrimaryButton onClick={() => undefined} />
            <TabularModalPage.FormDeleteButton onClick={() => undefined} />
          </>
        }
        hideControls={true}
        portalId="tabular-modal-page-hidden-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="TabularModalPage - long content" size="xl">
      <ModalPageWithPortalParentSelector portalId="tabular-modal-page-custom-title-row-long-content">
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
  </Suite>
);
