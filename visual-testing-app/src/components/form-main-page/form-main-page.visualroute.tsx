import type { ReactNode } from 'react';
import { RevertIcon } from '@commercetools-uikit/icons';
import { FormMainPage } from '@commercetools-frontend/application-components';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/form-main-page';

type FormMainPageContainerProps = {
  customTitleRow?: ReactNode;
};

const FormMainPageContainer = (props: FormMainPageContainerProps) => (
  <div style={{ height: '750px' }}>
    <FormMainPage
      title="Lorem Ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      labelPrimaryButton="Save"
      labelSecondaryButton="Revert changes"
      iconLeftSecondaryButton={<RevertIcon />}
      onSecondaryButtonClick={() => {}}
      onPrimaryButtonClick={() => {}}
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
    </FormMainPage>
  </div>
);
FormMainPageContainer.displayName = 'FormMainPageContainer';

export const Component = () => (
  <Suite>
    <Spec label="FormMainPage">
      <FormMainPageContainer />
    </Spec>
    <Spec label="FormMainPage with customTitleRow">
      <FormMainPageContainer customTitleRow={<h2>John Doe</h2>} />
    </Spec>
  </Suite>
);
