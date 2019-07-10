import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import {
  Text,
  Spacings,
  TextInput,
  FlameIcon,
  IconButton,
  SearchIcon,
  BinLinearIcon,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import { TabularModalPage } from 'application-components';
import { Suite, Spec } from '../../../../test-utils/visual';

export const routePath = '/tabular-modal-page';

const ModalPageWithPortalParentSelector = ({ portalId, ...props }) => (
  <React.Fragment>
    <div id={portalId} style={{ position: 'relative', height: '750px' }} />
    <TabularModalPage
      title="Lorem ipsum"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      level={1}
      isOpen={true}
      onClose={() => {}}
      getParentSelector={() => document.querySelector(`#${portalId}`)}
      tabControls={
        <div
          css={css`
            min-height: 30px;
            display: flex;
            > * {
              min-width: 50px;
              cursor: pointer;
              &:first-of-type {
                border-bottom: 3px solid ${customProperties.colorPrimary};
                & > * {
                  color: ${customProperties.colorPrimary};
                }
              }
            }
            > * + * {
              margin-left: 16px;
            }
          `}
        >
          <span>
            <Text.Subheadline as="h4">Tab One</Text.Subheadline>
          </span>
          <span>
            <Text.Subheadline as="h4">Tab Two</Text.Subheadline>
          </span>
          <span>
            <Text.Subheadline as="h4">Tab Three</Text.Subheadline>
          </span>
        </div>
      }
      {...props}
    />
  </React.Fragment>
);
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';
ModalPageWithPortalParentSelector.propTypes = {
  portalId: PropTypes.string.isRequired,
};

const Content = () => (
  <Spacings.Stack scale="m">
    <Text.Body>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
    </Text.Body>
    <Text.Body>
      {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
    </Text.Body>
  </Spacings.Stack>
);

export const component = () => (
  <Suite>
    <Spec label="TabularModalPage" size="xl">
      <ModalPageWithPortalParentSelector
        portalId="tabular-modal-page-default"
        customControls={<React.Fragment />}
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="TabularModalPage - with secondary and primary buttons"
      size="xl"
    >
      <ModalPageWithPortalParentSelector portalId="tabular-modal-page-default-controls">
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="TabularModalPage - with primary button disabled" size="xl">
      <ModalPageWithPortalParentSelector
        portalId="tabular-modal-page-primary-button-disabled"
        isPrimaryButtonDisabled={true}
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="TabularModalPage - with Custom Controls" size="xl">
      <ModalPageWithPortalParentSelector
        customControls={
          <Spacings.Inline>
            <IconButton icon={<SearchIcon />} onClick={() => {}} />
            <IconButton icon={<FlameIcon />} onClick={() => {}} />
            <IconButton icon={<BinLinearIcon />} onClick={() => {}} />
          </Spacings.Inline>
        }
        portalId="tabular-modal-page-custom-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="TabularModalPage - with Custom Title Row and no controls"
      size="xl"
    >
      <ModalPageWithPortalParentSelector
        customTitleRow={
          <Spacings.Inline scale="m">
            <Spacings.Inline alignItems="center">
              <label htmlFor="input-1">
                <Text.Body isBold truncate>
                  Input 1
                </Text.Body>
              </label>
              <TextInput id="input-1" value="" onChange={() => {}} />
            </Spacings.Inline>
            <Spacings.Inline alignItems="center">
              <label htmlFor="input-2">
                <Text.Body isBold truncate>
                  Input 2
                </Text.Body>
              </label>
              <TextInput id="input-2" value="" onChange={() => {}} />
            </Spacings.Inline>
          </Spacings.Inline>
        }
        customControls={<React.Fragment />}
        portalId="tabular-modal-page-custom-title-row-no-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="TabularModalPage - with Custom Title Row and default controls"
      size="xl"
    >
      <ModalPageWithPortalParentSelector
        customTitleRow={
          <Spacings.Inline scale="m">
            <Spacings.Inline alignItems="center">
              <label htmlFor="input-1">
                <Text.Body isBold truncate>
                  Input 1
                </Text.Body>
              </label>
              <TextInput id="input-1" value="" onChange={() => {}} />
            </Spacings.Inline>
            <Spacings.Inline alignItems="center">
              <label htmlFor="input-2">
                <Text.Body isBold truncate>
                  Input 2
                </Text.Body>
              </label>
              <TextInput id="input-2" value="" onChange={() => {}} />
            </Spacings.Inline>
          </Spacings.Inline>
        }
        portalId="tabular-modal-page-custom-title-row-default-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="TabularModalPage - with Custom Title Row and custom controls"
      size="xl"
    >
      <ModalPageWithPortalParentSelector
        customTitleRow={
          <Spacings.Inline scale="m">
            <Spacings.Inline alignItems="center">
              <label htmlFor="input-1">
                <Text.Body isBold truncate>
                  Input 1
                </Text.Body>
              </label>
              <TextInput id="input-1" value="" onChange={() => {}} />
            </Spacings.Inline>
            <Spacings.Inline alignItems="center">
              <label htmlFor="input-2">
                <Text.Body isBold truncate>
                  Input 2
                </Text.Body>
              </label>
              <TextInput id="input-2" value="" onChange={() => {}} />
            </Spacings.Inline>
          </Spacings.Inline>
        }
        customControls={
          <Spacings.Inline>
            <IconButton icon={<SearchIcon />} onClick={() => {}} />
            <IconButton icon={<FlameIcon />} onClick={() => {}} />
            <IconButton icon={<BinLinearIcon />} onClick={() => {}} />
          </Spacings.Inline>
        }
        portalId="tabular-modal-page-custom-title-row-and-custom-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="TabularModalPage - long content" size="xl">
      <ModalPageWithPortalParentSelector
        customControls={<React.Fragment />}
        portalId="tabular-modal-page-custom-title-row-long-content"
      >
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
  </Suite>
);
