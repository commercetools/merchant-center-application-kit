import { BinLinearIcon } from '@commercetools-uikit/icons';
import { FormMainPageLayout } from '@commercetools-frontend/application-components';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import { Suite, Spec } from '../../test-utils';

export const routePath = '/form-main-page-layout';

export const Component = () => (
  <Suite>
    <Spec label="FormMainPageLayout">
      <FormMainPageLayout
        gravatarHash="20c9c1b252b46ab49d6f7a4cee9c3e68"
        firstName="John"
        lastName="Doe"
        title="My Profile"
        onSubmit={() => {}}
        headerTitle="John Doe"
        headerIcon={<BinLinearIcon />}
      >
        <Spacings.Inline scale="l">
          <TextField title="First Name" value="foo" onChange={() => {}} />
          <TextField title="Last Name" value="foo" onChange={() => {}} />
        </Spacings.Inline>
        ;
        <TextField title="Email Address" value="foo" onChange={() => {}} />
        <TextField title="Business Role" value="foo" onChange={() => {}} />
      </FormMainPageLayout>
    </Spec>
    <Spec label="FormMainPageLayout with customHeaderRow">
      <FormMainPageLayout
        title="My Profile"
        onSubmit={() => {}}
        customHeaderRow={<div>John Doe</div>}
      >
        <Spacings.Inline scale="l">
          <TextField title="First Name" value="foo" onChange={() => {}} />
          <TextField title="Last Name" value="foo" onChange={() => {}} />
        </Spacings.Inline>
        ;
        <TextField title="Email Address" value="foo" onChange={() => {}} />
        <TextField title="Business Role" value="foo" onChange={() => {}} />
      </FormMainPageLayout>
    </Spec>
  </Suite>
);
