import React from 'react';
import PropTypes from 'prop-types';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import { ConfirmationDialog } from 'application-components';
import { Suite, Spec } from '../../../../test-utils/visual';

export const routePath = '/confirmation-dialog';

const ConfirmationDialogExample = props => (
  <React.Fragment>
    <div id={props.portalId} style={{ flex: 1 }} />
    <ConfirmationDialog
      title="Lorem ipsum"
      size={props.size}
      isOpen={true}
      onClose={() => {}}
      onCancel={() => {}}
      onConfirm={() => {}}
      isPrimaryButtonDisabled={props.isPrimaryButtonDisabled}
      getParentSelector={() => document.querySelector(`#${props.portalId}`)}
    >
      <Spacings.Stack scale="m">
        <Text.Body>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`}
        </Text.Body>
      </Spacings.Stack>
    </ConfirmationDialog>
  </React.Fragment>
);
ConfirmationDialogExample.displayName = 'ConfirmationDialogExample';
ConfirmationDialogExample.propTypes = {
  size: PropTypes.oneOf(['m', 'l', 'scale']).isRequired,
  isPrimaryButtonDisabled: PropTypes.bool,
  portalId: PropTypes.string.isRequired,
};

export const component = () => (
  <Suite>
    <Spec
      label="ConfirmationDialog - Size M"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="m" portalId="dialog-m" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size L"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="l" portalId="dialog-l" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Size Scale"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample size="scale" portalId="dialog-scale" />
    </Spec>
    <Spec
      label="ConfirmationDialog - Primary button disabled"
      size="l"
      contentAlignment="center"
    >
      <ConfirmationDialogExample
        size="l"
        isPrimaryButtonDisabled={true}
        portalId="dialog-disabled"
      />
    </Spec>
  </Suite>
);
