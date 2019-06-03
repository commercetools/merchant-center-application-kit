import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import {
  Text,
  Spacings,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import { TabularModalPage } from 'application-components';
import { Suite, Spec } from '../../../../test-utils/visual';

export const routePath = '/tabular-modal-page';

const ModalPageWithPortalParentSelector = ({ portalId, ...props }) => (
  <React.Fragment>
    <div
      id={portalId}
      style={{
        position: 'relative',
        height: '750px',
      }}
    />
    <TabularModalPage
      title="Lorem ipsum"
      level={1}
      isOpen={true}
      onClose={() => {}}
      parentSelector={() => document.querySelector(`#${portalId}`)}
      {...props}
    />
  </React.Fragment>
);
ModalPageWithPortalParentSelector.displayName =
  'ModalPageWithPortalParentSelector';
ModalPageWithPortalParentSelector.propTypes = {
  portalId: PropTypes.string.isRequired,
};

export const component = () => (
  <Suite>
    <Spec label="TabularModalPage" size="xl">
      <ModalPageWithPortalParentSelector portalId="tabular-modal-one">
        <div
          css={css`
            background-color: #f2f2f2;
            padding: 16px 16px 0;
          `}
        >
          <Spacings.Stack size="xl">
            <Text.Headline elementType="h2">{'Tabular Content'}</Text.Headline>
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
                <Text.Subheadline elementType="h4">Tab One</Text.Subheadline>
              </span>
              <span>
                <Text.Subheadline elementType="h4">Tab Two</Text.Subheadline>
              </span>
              <span>
                <Text.Subheadline elementType="h4">Tab Three</Text.Subheadline>
              </span>
            </div>
          </Spacings.Stack>
        </div>
        <div
          css={css`
            overflow: auto;
          `}
        >
          <Spacings.Inset scale="m">
            <Text.Body>
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
            </Text.Body>
            <Text.Body>
              {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
            </Text.Body>
          </Spacings.Inset>
        </div>
      </ModalPageWithPortalParentSelector>
    </Spec>
  </Suite>
);
