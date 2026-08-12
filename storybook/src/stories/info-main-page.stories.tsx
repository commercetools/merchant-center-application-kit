import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoMainPage } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import TextField from '@commercetools-uikit/text-field';
import { CUSTOM_VIEW_LOCATORS, VisualSpecGroup } from '../helpers';

// `PageWrapper` is `height: 100%`, so each state needs a bounded ancestor. Measured
// per state so none of them scroll.
const specHeight = '440px';

const InfoMainPageSpec = ({
  height = specHeight,
  ...props
}: { height?: string } & Partial<ComponentProps<typeof InfoMainPage>>) => (
  <div style={{ height }}>
    <InfoMainPage
      title="Lorem Ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      {...props}
    >
      <Spacings.Stack scale="l">
        <Spacings.Inline scale="l">
          <TextField
            title="First Name"
            value="foo"
            onChange={() => undefined}
          />
          <TextField title="Last Name" value="foo" onChange={() => undefined} />
        </Spacings.Inline>
        <TextField
          title="Email Address"
          value="foo"
          onChange={() => undefined}
        />
        <TextField
          title="Business Role"
          value="foo"
          onChange={() => undefined}
        />
      </Spacings.Stack>
    </InfoMainPage>
  </div>
);

const meta: Meta<typeof InfoMainPage> = {
  title: 'Application Components/InfoMainPage',
  component: InfoMainPage,
};

export default meta;

type Story = StoryObj<typeof InfoMainPage>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="InfoMainPage">
        <InfoMainPageSpec />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoMainPage with customTitleRow">
        <InfoMainPageSpec customTitleRow={<h2>{'John Doe'}</h2>} />
      </VisualSpecGroup>
      <VisualSpecGroup label="InfoMainPage with Custom Views selector">
        <InfoMainPageSpec
          height="520px"
          customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
        />
      </VisualSpecGroup>
    </>
  ),
};
