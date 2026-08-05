import type { ComponentProps } from 'react';
import { CUSTOM_VIEW_LOCATORS, VisualSpecGroup } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import IconButton from '@commercetools-uikit/icon-button';
import {
  BinLinearIcon,
  FlameIcon,
  SearchIcon,
} from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import {
  TabularPageContent,
  TabularPageCustomTitleRow,
  TabularPageTabControls,
} from '../../tabular-page-fixtures';
import TabularMainPage from './tabular-main-page';

const routePath = '/tabular-main-page';

const TabularMainPageSpec = ({
  children = <TabularPageContent basePath={routePath} />,
  ...props
}: Partial<ComponentProps<typeof TabularMainPage>>) => (
  // `PageWrapper` is `height: 100%`, so each state needs a bounded ancestor.
  <div style={{ position: 'relative', height: '420px' }}>
    <TabularMainPage
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      tabControls={<TabularPageTabControls basePath={routePath} />}
      {...props}
    >
      {children}
    </TabularMainPage>
  </div>
);

const FormControls = () => (
  <>
    <TabularMainPage.FormSecondaryButton onClick={() => undefined} />
    <TabularMainPage.FormPrimaryButton onClick={() => undefined} />
    <TabularMainPage.FormDeleteButton onClick={() => undefined} />
  </>
);

const meta: Meta<typeof TabularMainPage> = {
  title: 'Application Components/TabularMainPage',
  component: TabularMainPage,
  parameters: {
    initialEntries: [`${routePath}/tab-one`],
  },
};

export default meta;

type Story = StoryObj<typeof TabularMainPage>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="TabularMainPage">
        <TabularMainPageSpec />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularMainPage - with a very long title">
        <TabularMainPageSpec title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl." />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularMainPage - with the static exposed form controls">
        <TabularMainPageSpec formControls={<FormControls />} />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularMainPage - with other custom controls">
        <TabularMainPageSpec
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
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularMainPage - with Custom Title Row and no controls">
        <TabularMainPageSpec customTitleRow={<TabularPageCustomTitleRow />} />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularMainPage - with Custom Title Row and the static exposed form controls">
        <TabularMainPageSpec
          customTitleRow={<TabularPageCustomTitleRow />}
          formControls={<FormControls />}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularMainPage - with static exposed page header title and side content as parts of Custom Title Row">
        <TabularMainPageSpec
          customTitleRow={
            <Spacings.Inline scale="m" justifyContent="space-between">
              <TabularMainPage.PageHeaderTitle
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                titleSize="big"
              />
              <Spacings.Inline alignItems="center">
                <Text.Body isBold truncate>
                  {'Lorem ipsum dolor sit amet.'}
                </Text.Body>
              </Spacings.Inline>
            </Spacings.Inline>
          }
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularMainPage - with hidden controls">
        <TabularMainPageSpec formControls={<FormControls />} hideControls />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularMainPage - long content">
        <TabularMainPageSpec>
          {Array.from({ length: 5 }, (_, index) => (
            <TabularPageContent key={index} basePath={routePath} />
          ))}
        </TabularMainPageSpec>
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularMainPage - with Custom Views selector">
        <TabularMainPageSpec
          customViewLocatorCodes={{
            [CUSTOM_VIEW_LOCATORS.productDetails]: `${routePath}/tab-one`,
          }}
        />
      </VisualSpecGroup>
    </>
  ),
};
