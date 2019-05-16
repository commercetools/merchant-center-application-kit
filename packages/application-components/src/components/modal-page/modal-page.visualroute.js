import React from 'react';
import PropTypes from 'prop-types';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import { ModalPage } from 'application-components';
import { Suite, Spec } from '../../../test-utils/visual';

export const routePath = '/modal-page';

const ModalPageExample = props => (
  <React.Fragment>
    <div id={props.portalId} style={{ flex: 1 }} />
    <ModalPage
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      level={props.level}
      isOpen={true}
      onClose={() => {}}
      parentSelector={() => document.querySelector(`#${props.portalId}`)}
    >
      {props.children}
    </ModalPage>
  </React.Fragment>
);
ModalPageExample.displayName = 'ModalPageExample';
ModalPageExample.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node,
  portalId: PropTypes.string.isRequired,
};

export const component = () => (
  <Suite>
    <Spec label="ModalPage - First Level" size="l" contentAlignment="center">
      <ModalPageExample portalId="modal-one">
        <Spacings.Stack scale="m">
          <Text.Body>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
          </Text.Body>
          <Text.Body>
            {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
          </Text.Body>
        </Spacings.Stack>
      </ModalPageExample>
    </Spec>
    <Spec label="ModalPage - Nested" size="l" contentAlignment="center">
      <ModalPageExample portalId="modal-two" level={1}>
        <ModalPageExample portalId="modal-two" level={2}>
          <Spacings.Stack scale="m">
            <Text.Body>
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
            </Text.Body>
            <Text.Body>
              {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
            </Text.Body>
          </Spacings.Stack>
        </ModalPageExample>
      </ModalPageExample>
    </Spec>
  </Suite>
);
