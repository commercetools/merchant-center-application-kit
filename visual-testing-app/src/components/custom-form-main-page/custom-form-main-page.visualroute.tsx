import type { ReactNode } from 'react';
import { CustomFormMainPage } from '@commercetools-frontend/application-components';
import { RevertIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import { CUSTOM_VIEW_LOCATORS } from '../../constants';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/custom-form-main-page';

type CustomFormMainPageContainerProps = {
  customTitleRow?: ReactNode;
  customViewLocatorCode?: string;
  hideControls?: boolean;
};

const CustomFormMainPageContainer = (
  props: CustomFormMainPageContainerProps
) => (
  <div style={{ height: '750px' }}>
    <CustomFormMainPage
      title="Lorem Ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      hideControls={props.hideControls}
      customViewLocatorCode={props.customViewLocatorCode}
      formControls={
        <>
          <CustomFormMainPage.FormSecondaryButton
            label="Revert changes"
            iconLeft={<RevertIcon />}
            onClick={() => {}}
          />
          <CustomFormMainPage.FormPrimaryButton
            label="Save"
            onClick={() => {}}
          />
        </>
      }
      {...props}
    >
      <Spacings.Stack scale="l">
        <Spacings.Inline scale="l">
          <TextField title="First Name" value="foo" onChange={() => {}} />
          <TextField title="Last Name" value="foo" onChange={() => {}} />
        </Spacings.Inline>
        <TextField title="Email Address" value="foo" onChange={() => {}} />
        <TextField title="Business Role" value="foo" onChange={() => {}} />
      </Spacings.Stack>
    </CustomFormMainPage>
  </div>
);
CustomFormMainPageContainer.displayName = 'CustomFormMainPageContainer';

export const Component = () => (
  <Suite>
    <Spec label="CustomFormMainPage">
      <CustomFormMainPageContainer />
    </Spec>
    <Spec label="CustomFormMainPage with no controls">
      <CustomFormMainPageContainer hideControls />
    </Spec>
    <Spec label="CustomFormMainPage with customTitleRow">
      <CustomFormMainPageContainer customTitleRow={<h2>John Doe</h2>} />
    </Spec>
    <Spec label="CustomFormMainPage with Custom Views selector">
      <CustomFormMainPageContainer
        customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
      />
    </Spec>
    <Spec label="CustomFormMainPage with Custom Views selector and no controls">
      <CustomFormMainPageContainer
        hideControls
        customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
      />
    </Spec>
  </Suite>
);
