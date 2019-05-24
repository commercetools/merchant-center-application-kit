import React from 'react';
import PropTypes from 'prop-types';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import { InfoModalPage } from 'application-components';
import { Suite, Spec } from '../../../../test-utils/visual';

export const routePath = '/info-modal-page';

const ModalPageWithPortalParentSelector = ({ portalId, ...props }) => (
  <React.Fragment>
    <div
      id={portalId}
      style={{
        position: 'relative',
        height: '750px',
      }}
    />
    <InfoModalPage
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
    <Spec label="InfoModalPage - First Level" size="xl">
      <ModalPageWithPortalParentSelector
        title="Lorem Ipsum"
        level={1}
        isOpen={true}
        onClose={() => {}}
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        topBarCurrentPathLabel="The current modal"
        topBarPreviousPathLabel="Back"
      >
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
        <Text.Body>
          {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
        </Text.Body>
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="InfoModalPage - Nested" size="xl">
      <ModalPageWithPortalParentSelector
        title="First level Modal"
        level={1}
        isOpen={true}
        onClose={() => {}}
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        topBarCurrentPathLabel="The current modal"
        topBarPreviousPathLabel="Back"
        portalId="modal-two"
      >
        <InfoModalPage
          title="Second Level Modal"
          level={2}
          isOpen={true}
          onClose={() => {}}
          topBarCurrentPathLabel="Nested Modal"
          topBarPreviousPathLabel="First Level Modal"
          parentSelector={() => document.querySelector(`#modal-two`)}
        >
          <Spacings.Inset>
            <Text.Body>
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
            </Text.Body>
            <Text.Body>
              {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
            </Text.Body>
          </Spacings.Inset>
        </InfoModalPage>
      </ModalPageWithPortalParentSelector>
    </Spec>
  </Suite>
);
