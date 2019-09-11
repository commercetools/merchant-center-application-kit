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
import { TabularModalPage } from '@local-build/application-components';
import { Suite, Spec } from '../../../../../../visual-testing-app/test-utils';

export const routePath = '/tabular-modal-page';

const ModalPageWithPortalParentSelector = ({ portalId, ...remainingProps }) => (
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
      {...remainingProps}
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
      <ModalPageWithPortalParentSelector portalId="tabular-modal-page-default">
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="TabularModalPage - with the static exposed form controls"
      size="xl"
      formControls={
        <React.Fragment>
          <TabularModalPage.FormSecondaryButton onClick={() => {}} />
          <TabularModalPage.FormPrimaryButton onClick={() => {}} />
          <TabularModalPage.FormDeleteButton onClick={() => {}} />
        </React.Fragment>
      }
    >
      <ModalPageWithPortalParentSelector portalId="tabular-modal-page-default-controls">
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="TabularModalPage - with other custom controls" size="xl">
      <ModalPageWithPortalParentSelector
        formControls={
          <React.Fragment>
            <IconButton icon={<SearchIcon />} onClick={() => {}} />
            <IconButton icon={<FlameIcon />} onClick={() => {}} />
            <IconButton icon={<BinLinearIcon />} onClick={() => {}} />
          </React.Fragment>
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
        portalId="tabular-modal-page-custom-title-row-no-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec
      label="TabularModalPage - with Custom Title Row and the static exposed form controls"
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
        formControls={
          <React.Fragment>
            <TabularModalPage.FormSecondaryButton onClick={() => {}} />
            <TabularModalPage.FormPrimaryButton onClick={() => {}} />
            <TabularModalPage.FormDeleteButton onClick={() => {}} />
          </React.Fragment>
        }
        portalId="tabular-modal-page-custom-title-row-default-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="TabularModalPage - with hidden controls" size="xl">
      <ModalPageWithPortalParentSelector
        formControls={
          <React.Fragment>
            <TabularModalPage.FormSecondaryButton onClick={() => {}} />
            <TabularModalPage.FormPrimaryButton onClick={() => {}} />
            <TabularModalPage.FormDeleteButton onClick={() => {}} />
          </React.Fragment>
        }
        hideControls={true}
        portalId="tabular-modal-page-hidden-controls"
      >
        <Content />
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="TabularModalPage - long content" size="xl">
      <ModalPageWithPortalParentSelector
        formControls={<React.Fragment />}
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
