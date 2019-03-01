import React from 'react';
import PropTypes from 'prop-types';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import { InfoDialog } from 'application-components';
import { Suite, Spec } from '../../../../test-utils/visual';

export const routePath = '/info-dialog';

const InfoDialogExample = props => (
  <React.Fragment>
    <div id={props.portalId} style={{ flex: 1 }} />
    <InfoDialog
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      size={props.size}
      isOpen={true}
      onClose={() => {}}
      getParentSelector={() => document.querySelector(`#${props.portalId}`)}
    >
      <Spacings.Stack scale="m">
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
        <Text.Body>
          {`Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`}
        </Text.Body>
      </Spacings.Stack>
    </InfoDialog>
  </React.Fragment>
);
InfoDialogExample.displayName = 'InfoDialogExample';
InfoDialogExample.propTypes = {
  size: PropTypes.oneOf(['m', 'l', 'scale']).isRequired,
  isPrimaryButtonDisabled: PropTypes.bool,
  portalId: PropTypes.string.isRequired,
};

export const component = () => (
  <Suite>
    <Spec label="InfoDialog - Size M" size="l" contentAlignment="center">
      <InfoDialogExample size="m" portalId="dialog-m" />
    </Spec>
    <Spec label="InfoDialog - Size L" size="l" contentAlignment="center">
      <InfoDialogExample size="l" portalId="dialog-l" />
    </Spec>
    <Spec label="InfoDialog - Size Scale" size="l" contentAlignment="center">
      <InfoDialogExample size="scale" portalId="dialog-scale" />
    </Spec>
  </Suite>
);
