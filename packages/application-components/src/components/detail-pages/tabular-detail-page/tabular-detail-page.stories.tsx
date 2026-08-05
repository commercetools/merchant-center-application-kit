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
import TabularDetailPage from './tabular-detail-page';

const routePath = '/tabular-detail-page';

const TabularDetailPageSpec = ({
  children = <TabularPageContent basePath={routePath} />,
  ...props
}: Partial<ComponentProps<typeof TabularDetailPage>>) => (
  // `PageWrapper` is `height: 100%`, so each state needs a bounded ancestor.
  <div style={{ position: 'relative', height: '420px' }}>
    <TabularDetailPage
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      tabControls={<TabularPageTabControls basePath={routePath} />}
      onPreviousPathClick={() => undefined}
      {...props}
    >
      {children}
    </TabularDetailPage>
  </div>
);

const FormControls = () => (
  <>
    <TabularDetailPage.FormSecondaryButton onClick={() => undefined} />
    <TabularDetailPage.FormPrimaryButton onClick={() => undefined} />
    <TabularDetailPage.FormDeleteButton onClick={() => undefined} />
  </>
);

const meta: Meta<typeof TabularDetailPage> = {
  title: 'Application Components/TabularDetailPage',
  component: TabularDetailPage,
  parameters: {
    initialEntries: [`${routePath}/tab-one`],
  },
};

export default meta;

type Story = StoryObj<typeof TabularDetailPage>;

export const AllVariants: Story = {
  render: () => (
    <>
      <VisualSpecGroup label="TabularDetailPage">
        <TabularDetailPageSpec />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularDetailPage - with a very long title">
        <TabularDetailPageSpec title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl." />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularDetailPage - with the static exposed form controls">
        <TabularDetailPageSpec formControls={<FormControls />} />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularDetailPage - with other custom controls">
        <TabularDetailPageSpec
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
      <VisualSpecGroup label="TabularDetailPage - with Custom Title Row and no controls">
        <TabularDetailPageSpec customTitleRow={<TabularPageCustomTitleRow />} />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularDetailPage - with Custom Title Row and the static exposed form controls">
        <TabularDetailPageSpec
          customTitleRow={<TabularPageCustomTitleRow />}
          formControls={<FormControls />}
        />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularDetailPage - with static exposed page header title and side content as parts of Custom Title Row">
        <TabularDetailPageSpec
          customTitleRow={
            <Spacings.Inline scale="m" justifyContent="space-between">
              <TabularDetailPage.PageHeaderTitle
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
      <VisualSpecGroup label="TabularDetailPage - with hidden controls">
        <TabularDetailPageSpec formControls={<FormControls />} hideControls />
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularDetailPage - long content">
        <TabularDetailPageSpec>
          {Array.from({ length: 5 }, (_, index) => (
            <TabularPageContent key={index} basePath={routePath} />
          ))}
        </TabularDetailPageSpec>
      </VisualSpecGroup>
      <VisualSpecGroup label="TabularDetailPage - with Custom Views selector">
        <TabularDetailPageSpec
          customViewLocatorCodes={{
            [CUSTOM_VIEW_LOCATORS.productDetails]: `${routePath}/tab-one`,
          }}
        />
      </VisualSpecGroup>
    </>
  ),
};
