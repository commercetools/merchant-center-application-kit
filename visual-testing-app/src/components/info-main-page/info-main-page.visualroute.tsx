import type { ReactNode } from 'react';
import { InfoMainPage } from '@commercetools-frontend/application-components';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/info-main-page';

type InfoMainPageContainerProps = {
  customTitleRow?: ReactNode;
};

const InfoMainPageContainer = (props: InfoMainPageContainerProps) => (
  <div style={{ height: '750px' }}>
    <InfoMainPage
      title="Lorem Ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
    </InfoMainPage>
  </div>
);
InfoMainPageContainer.displayName = 'InfoMainPageContainer';

export const Component = () => (
  <Suite>
    <Spec label="InfoMainPage">
      <InfoMainPageContainer />
    </Spec>
    <Spec label="InfoMainPage with customTitleRow">
      <InfoMainPageContainer customTitleRow={<h2>John Doe</h2>} />
    </Spec>
  </Suite>
);
