import type { ComponentProps, ReactNode } from 'react';
import { CUSTOM_VIEW_LOCATORS } from '@/storybook-helpers';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  InfoPageBody,
  longSubtitle,
  longTitle,
} from '../../info-page-fixtures';
import InfoModalPage from './info-modal-page';

const InfoModalPageSpec = ({
  children = <InfoPageBody />,
  ...props
}: Partial<ComponentProps<typeof InfoModalPage>>) => (
  <InfoModalPage
    isOpen
    title="Lorem ipsum"
    subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    onClose={() => undefined}
    // Otherwise `ModalPage` unmounts itself on close and nothing re-opens it.
    shouldDelayOnClose={false}
    {...props}
  >
    {children}
  </InfoModalPage>
);

const NestedLevel = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <InfoModalPage
    isOpen
    title={title}
    onClose={() => undefined}
    shouldDelayOnClose={false}
  >
    {children}
  </InfoModalPage>
);

const meta: Meta<typeof InfoModalPage> = {
  title: 'Application Components/InfoModalPage',
  component: InfoModalPage,
};

export default meta;

type Story = StoryObj<typeof InfoModalPage>;

// Full-viewport overlays can't share a frame, so one export per state.

export const Default: Story = {
  render: () => <InfoModalPageSpec />,
};

export const LongTitleAndSubtitle: Story = {
  render: () => <InfoModalPageSpec title={longTitle} subtitle={longSubtitle} />,
};

export const SecondLevelModal: Story = {
  render: () => (
    <InfoModalPageSpec>
      <InfoModalPage
        isOpen
        title="Second Level Modal"
        onClose={() => undefined}
        shouldDelayOnClose={false}
        topBarCurrentPathLabel="Nested Modal"
        topBarPreviousPathLabel="First Level Modal"
      >
        <InfoPageBody />
      </InfoModalPage>
    </InfoModalPageSpec>
  ),
};

export const FiveLevelsDeep: Story = {
  render: () => (
    <InfoModalPageSpec>
      <NestedLevel title="Second Level Modal">
        <NestedLevel title="Third Level Modal">
          <NestedLevel title="Fourth Level Modal">
            <NestedLevel title="Fifth Level Modal">
              <InfoPageBody />
            </NestedLevel>
          </NestedLevel>
        </NestedLevel>
      </NestedLevel>
    </InfoModalPageSpec>
  ),
};

export const WithCustomViewsSelector: Story = {
  render: () => (
    <InfoModalPageSpec
      customViewLocatorCode={CUSTOM_VIEW_LOCATORS.productDetails}
    />
  ),
};
