import { InfoMainPage } from '@commercetools-frontend/application-components';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/info-main-page';

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
    <Spec label="InfoMainPage">
      <InfoMainPage
        title="Lorem Ipsum"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <Content />
      </InfoMainPage>
    </Spec>
    <Spec label="InfoMainPage with customTitleRow">
      <InfoMainPage customTitleRow={<div>John Doe</div>}>
        <Content />
      </InfoMainPage>
    </Spec>
  </Suite>
);
