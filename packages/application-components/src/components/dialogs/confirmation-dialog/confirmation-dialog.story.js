import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  select,
  boolean,
  number,
} from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import {
  SecondaryButton,
  Spacings,
  Text,
} from '@commercetools-frontend/ui-kit';
import Readme from './README.md';
import ConfirmationDialog from './confirmation-dialog';

const DialogController = props => {
  const [isOpen, toggle] = React.useState(false);
  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Spacings.Stack>
        <Text.Headline elementType="h3">
          {'Open the Confirmation Dialog by clicking on the button'}
        </Text.Headline>
        <Spacings.Inline>
          <SecondaryButton
            label="Open Confirmation Dialog"
            onClick={() => toggle(true)}
          />
        </Spacings.Inline>
        {props.children({ isOpen, toggle })}
      </Spacings.Stack>
    </div>
  );
};
DialogController.displayName = 'DialogController';
DialogController.propTypes = {
  children: PropTypes.func.isRequired,
};

storiesOf('Components|Dialogs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('ConfirmationDialog', () => (
    <React.Fragment>
      <div id={PORTALS_CONTAINER_ID} />
      <DialogController>
        {({ isOpen, toggle }) => (
          <ConfirmationDialog
            title={text('title', 'Lorem Ipsum')}
            isOpen={isOpen}
            onClose={
              boolean('disable close', false) ? undefined : () => toggle(false)
            }
            size={select('size', ['m', 'l', 'scale'], 'l')}
            zIndex={number('z-index', 1000)}
            labelSecondary={text('label secondary', '') || undefined}
            labelPrimary={text('label primary', '') || undefined}
            isPrimaryButtonDisabled={boolean('isPrimaryButtonDisabled', false)}
            onCancel={() => {
              alert('cancelled');
              toggle(false);
            }}
            onConfirm={() => {
              alert('confirmed');
              toggle(false);
            }}
          >
            <Spacings.Stack scale="m">
              {boolean('show paragraph 1', true) && (
                <Text.Body>
                  {text(
                    'paragraph 1',
                    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec turpis in risus elementum fringilla. Vestibulum nec vulputate metus, fringilla luctus nisl. Vestibulum mattis ultricies augue sagittis vestibulum. Nulla facilisi. Quisque tempor pulvinar efficitur. Praesent interdum ultrices leo. Vivamus non ex maximus justo egestas suscipit eget sed purus. Aliquam ut venenatis nulla. Fusce ac ligula viverra, blandit augue eget, congue turpis. Curabitur a sagittis leo. Nunc sed quam dictum, placerat nunc quis, luctus erat.`
                  )}
                </Text.Body>
              )}
              {boolean('show paragraph 2', true) && (
                <Text.Body>
                  {text(
                    'paragraph 2',
                    `Nam id orci ut risus accumsan pellentesque. Quisque efficitur eu arcu ut tristique. Praesent ornare varius leo, ut consequat lacus rutrum vel. Donec mollis leo id lectus vehicula tempor. Nulla facilisi. Fusce fringilla tellus ac ligula consequat suscipit. Sed consectetur molestie quam eu pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac habitasse platea dictumst.`
                  )}
                </Text.Body>
              )}
              {boolean('show paragraph 3', true) && (
                <Text.Body>
                  {text(
                    'paragraph 3',
                    `Sed elementum leo vitae viverra bibendum. Donec iaculis tempor enim, ut interdum purus ornare vel. Mauris laoreet metus in laoreet sagittis. Aenean non suscipit mi. Etiam hendrerit ultricies tortor, et blandit risus ultricies eget. Suspendisse porta est ac nisi posuere, eu lobortis felis pulvinar. Duis eget convallis ligula. Quisque aliquam cursus mi quis auctor. Maecenas tristique, libero et blandit blandit, magna neque vulputate augue, sit amet lobortis est libero sed diam. In egestas, elit non imperdiet condimentum, mi ante ullamcorper tortor, vel euismod nulla eros sed elit. Aenean quis ullamcorper est, quis pretium lorem. Donec et vestibulum est. Nam pharetra quam sem, ac tempus lectus condimentum nec. Morbi porta lorem nunc, non tempus lacus accumsan id. Sed eleifend nunc eu libero vestibulum maximus. Nullam in lorem blandit, tempor felis ac, pellentesque odio.`
                  )}
                </Text.Body>
              )}
            </Spacings.Stack>
          </ConfirmationDialog>
        )}
      </DialogController>
    </React.Fragment>
  ));
