import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import withReadme from 'storybook-readme/with-readme';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import {
  PrimaryButton,
  SecondaryButton,
  Spacings,
  Text,
} from '@commercetools-frontend/ui-kit';
import Readme from './README.md';
import ModalPage from './modal-page';

const ModalController = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Spacings.Stack>
        <Text.Headline elementType="h3">
          {'Open a Modal Page by clicking the button'}
        </Text.Headline>
        <Spacings.Inline>
          <SecondaryButton
            label="Open Modal Page"
            onClick={() => setIsOpen(true)}
          />
        </Spacings.Inline>
        {props.children({ isOpen, setIsOpen })}
      </Spacings.Stack>
    </div>
  );
};
ModalController.displayName = 'ModalController';
ModalController.propTypes = {
  children: PropTypes.func.isRequired,
};

storiesOf('Components|Modals', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('ModalPage', () => (
    <React.Fragment>
      <div id={PORTALS_CONTAINER_ID} />
      <ModalController>
        {({ isOpen, setIsOpen }) => (
          <ModalPage
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title={'Lorem ipsus'}
            subtitle={<Text.Body>{'Lorem ipsus ...'}</Text.Body>}
            components={{
              actions: (
                <Spacings.Inline alignItems="flex-start">
                  <SecondaryButton
                    label="Cancel"
                    onClick={() =>
                      action('onSecondaryControlButtonClick')('clicked')
                    }
                  />
                  <PrimaryButton
                    label="Save"
                    onClick={() =>
                      action('onPrimaryControlButtonClick')('clicked')
                    }
                  />
                </Spacings.Inline>
              ),
            }}
          >
            <Spacings.Stack scale="m">
              <Text.Body>{'Lorem ipsus ...'}</Text.Body>
              <ModalController>
                {/* eslint-disable-next-line no-shadow */}
                {({ isOpen, setIsOpen }) => (
                  <ModalPage
                    level="two"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                  >
                    <Spacings.Stack scale="m">
                      <Text.Body>{'Lorem ipsus ...'}</Text.Body>
                      <Text.Body>{'Lorem ipsus ...'}</Text.Body>
                    </Spacings.Stack>
                  </ModalPage>
                )}
              </ModalController>
            </Spacings.Stack>
          </ModalPage>
        )}
      </ModalController>
    </React.Fragment>
  ));
