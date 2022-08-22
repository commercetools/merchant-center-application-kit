import { BinLinearIcon } from '@commercetools-uikit/icons';
import { FormMainPage } from '@commercetools-frontend/application-components';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/form-main-page';

const Content = () => (
  <Spacings.Stack scale="l">
    <Spacings.Inline scale="l">
      <TextField title="First Name" value="foo" />
      <TextField title="Last Name" value="foo" />
    </Spacings.Inline>
    <TextField title="Email Address" value="foo" />
    <TextField title="Business Role" value="foo" />
  </Spacings.Stack>
);

export const Component = () => (
  <Suite>
    <Spec label="FormMainPage">
      <FormMainPage
        title="Lorem Ipsum"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        labelPrimaryButton="Save"
        labelSecondaryButton="Revert changes"
        labelSecondaryButtonIcon={<BinLinearIcon />}
        onSecondaryButtonClick={() => {}}
        onPrimaryButtonClick={() => {}}
      >
        <Content />
      </FormMainPage>
    </Spec>
    <Spec label="FormMainPage with customTitleRow">
      <FormMainPage
        customTitleRow={<div>John Doe</div>}
        onSecondaryButtonClick={() => {}}
        onPrimaryButtonClick={() => {}}
      >
        <Content />
      </FormMainPage>
    </Spec>
  </Suite>
);
