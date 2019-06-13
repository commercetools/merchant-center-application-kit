import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@commercetools-frontend/ui-kit';
import { InfoModalPage } from 'application-components';
import { Suite, Spec } from '../../../../test-utils/visual';

export const routePath = '/info-modal-page';

const ModalPageWithPortalParentSelector = ({ portalId, ...props }) => (
  <React.Fragment>
    <div id={portalId} style={{ position: 'relative', height: '750px' }} />
    <InfoModalPage
      title="Lorem ipsum"
      level={1}
      isOpen={true}
      onClose={() => {}}
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      getParentSelector={() => document.querySelector(`#${portalId}`)}
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
      <ModalPageWithPortalParentSelector portalId="info-modal-one">
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
        <Text.Body>
          {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
        </Text.Body>
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="InfoModalPage - Long title and subtitle" size="xl">
      <ModalPageWithPortalParentSelector
        portalId="info-modal-long"
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        subtitle="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
      <ModalPageWithPortalParentSelector portalId="info-modal-two">
        <InfoModalPage
          title="Second Level Modal"
          level={2}
          isOpen={true}
          onClose={() => {}}
          topBarCurrentPathLabel="Nested Modal"
          topBarPreviousPathLabel="First Level Modal"
          getParentSelector={() => document.querySelector(`#info-modal-two`)}
        >
          <Text.Body>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
          </Text.Body>
          <Text.Body>
            {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
          </Text.Body>
        </InfoModalPage>
      </ModalPageWithPortalParentSelector>
    </Spec>
    <Spec label="InfoModalPage - Multiple Nesting" size="xl">
      <ModalPageWithPortalParentSelector portalId="info-modal-nested">
        <InfoModalPage
          title="Second Level Modal"
          level={2}
          isOpen={true}
          onClose={() => {}}
          getParentSelector={() => document.querySelector(`#info-modal-nested`)}
        >
          <InfoModalPage
            title="Third Level Modal"
            level={3}
            isOpen={true}
            onClose={() => {}}
            getParentSelector={() =>
              document.querySelector(`#info-modal-nested`)
            }
          >
            <InfoModalPage
              title="Fourth Level Modal"
              level={4}
              isOpen={true}
              onClose={() => {}}
              getParentSelector={() =>
                document.querySelector(`#info-modal-nested`)
              }
            >
              <InfoModalPage
                title="Fifth Level Modal"
                level={5}
                isOpen={true}
                onClose={() => {}}
                getParentSelector={() =>
                  document.querySelector(`#info-modal-nested`)
                }
              >
                <Text.Body>
                  {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
                </Text.Body>
                <Text.Body>
                  {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
                </Text.Body>
              </InfoModalPage>
            </InfoModalPage>
          </InfoModalPage>
        </InfoModalPage>
      </ModalPageWithPortalParentSelector>
    </Spec>
  </Suite>
);
