import { RevertIcon } from '@commercetools-uikit/icons';
import { CustomFormMainPage } from '@commercetools-frontend/application-components';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/custom-form-main-page';

const Content = () => (
  <Spacings.Stack scale="l">
    <Spacings.Inline scale="l">
      <TextField title="First Name" value="foo" onChange={() => {}} />
      <TextField title="Last Name" value="foo" onChange={() => {}} />
    </Spacings.Inline>
    <TextField title="Email Address" value="foo" onChange={() => {}} />
    <TextField title="Business Role" value="foo" onChange={() => {}} />
  </Spacings.Stack>
);

export const Component = () => (
  <Suite>
    <Spec label="CustomFormMainPage">
      <CustomFormMainPage
        title="Lorem Ipsum"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
      >
        <Content />
      </CustomFormMainPage>
    </Spec>
    <Spec label="CustomFormMainPage with customTitleRow">
      <CustomFormMainPage
        customTitleRow={<div>John Doe</div>}
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
      >
        <Content />
      </CustomFormMainPage>
    </Spec>
  </Suite>
);
