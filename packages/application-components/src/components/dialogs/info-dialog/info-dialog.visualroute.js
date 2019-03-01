import React from 'react';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import { InfoDialog } from 'application-components';
import { Suite, Spec } from '../../../../test-utils/visual';

export const routePath = '/info-dialog';

export const component = () => (
  <Suite>
    <Spec label="InfoDialog - Size M" size="l" contentAlignment="center">
      <React.Fragment>
        <div id="dialog-m" style={{ flex: 1 }} />
        <InfoDialog
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          size="m"
          isOpen={true}
          onClose={() => {}}
          getParentSelector={() => document.querySelector(`#dialog-m`)}
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
    </Spec>
    <Spec label="InfoDialog - Size L" size="l" contentAlignment="center">
      <React.Fragment>
        <div id="dialog-l" style={{ flex: 1 }} />
        <InfoDialog
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          size="l"
          isOpen={true}
          onClose={() => {}}
          getParentSelector={() => document.querySelector(`#dialog-l`)}
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
    </Spec>
    <Spec label="InfoDialog - Size Scale" size="l" contentAlignment="center">
      <React.Fragment>
        <div id="dialog-scale" style={{ flex: 1 }} />
        <InfoDialog
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          size="scale"
          isOpen={true}
          onClose={() => {}}
          getParentSelector={() => document.querySelector(`#dialog-scale`)}
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
    </Spec>
  </Suite>
);
