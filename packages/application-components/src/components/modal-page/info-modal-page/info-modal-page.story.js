import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import { PORTALS_CONTAINER_ID } from '@commercetools-frontend/constants';
import {
  Text,
  Spacings,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
import { number } from '@storybook/addon-knobs/dist/deprecated';
import Readme from './README.md';
import InfoModalPage from './info-modal-page';

// This is to see the scroll behaviour inside the Modal content
const wallOfText = (
  <Text.Body>
    {`
  Lorem ipsum dolor sit amet, consectetuer justo tellus wisi nulla, vel gravida ac mi eu, amet id integer placerat ipsum. Vestibulum augue quam facilis, aptent magna orci semper netus, sed elementum fringilla ut. Phasellus sociis nec volutpat, metus primis sit adipiscing, itaque sit ante dolor eget. Hac quis semper adipiscing et, mus sodales nunc sit. Et enim neque sit aliquam, libero eu sociis accumsan, excepturi integer lacus mi, repellendus nibh vestibulum est etiam. Neque rutrum nonummy in dolor, nibh facilisis aliquam parturient neque. Massa habitant risus fermentum, nibh lectus porttitor sagittis nibh, congue ultrices vestibulum nibh.
  Ut facilisi maecenas iusto amet, ligula suspendisse wisi nunc amet, pharetra aute et donec bibendum, ligula curabitur fermentum eu. Magna orci pellentesque elementum, curabitur magna turpis feugiat, ut pulvinar pretium sed, tellus malesuada maecenas nulla. Nulla sagittis parturient platea tortor, justo pede eu sed vivamus, ipsum taciti placerat quisque pellentesque, vulputate adipiscing luctus erat placerat. Ac ipsum et sapien massa, non turpis diam dolorem. Consequat erat est vitae, vehicula lacus nunc donec sociosqu, elit qui et placerat leo, ac aliquam nunc ante. Mauris arcu wisi vestibulum, vitae lacus ultrices pellentesque, dui viverra metus mauris, nunc mauris diam non. Mollis conubia vitae lorem, felis in nec quis, risus fusce amet duis in. Reiciendis orci euismod magna dapibus, accumsan erat id vivamus hendrerit.
  Inceptos ante voluptatum platea, suspendisse accumsan porttitor integer scelerisque, felis eu nec turpis, orci aliquam integer aliquet quam. Justo lacus et porta, quam sem suspendisse suscipit, faucibus penatibus potenti arcu. Proin nibh velit suscipit suspendisse, phasellus pede ut in, feugiat fringilla enim diam, tellus a congue eu. Non semper velit erat fusce, fringilla tortor nunc metus lectus, dictumst tellus sed elit sem, justo arcu id faucibus. Euismod et ante rhoncus proin, sem tristique sit elit, ut vivamus eget luctus, tortor molestie libero nostrud arcu. Wisi mi suspendisse vitae, luctus tristique elit elit, eget dictumst wisi enim. Ut gravida sed orci, vitae at convallis aenean aenean.
`}
  </Text.Body>
);

const ModalController = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Spacings.Inset>
      <Spacings.Stack>
        <Spacings.Inline>
          <SecondaryButton
            label="Open an Info Modal Page"
            onClick={() => setIsOpen(true)}
          />
          {props.children({ isOpen, setIsOpen })}
        </Spacings.Inline>
      </Spacings.Stack>
    </Spacings.Inset>
  );
};
ModalController.displayName = 'ModalController';
ModalController.propTypes = {
  children: PropTypes.func.isRequired,
};

storiesOf('Components|Modals', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('InfoModalPage', () => {
    const firstModalLevel = number('level', 1);

    return (
      <React.Fragment>
        <div id={PORTALS_CONTAINER_ID} />
        <ModalController>
          {({ isOpen, setIsOpen }) => (
            <InfoModalPage
              level={firstModalLevel}
              title={text('title', 'Info Modal Page Title')}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              subtitle={text('subtitle', 'Subtitle text') || undefined}
              topBarPreviousPathLabel={
                text('topBarPreviousPathLabel', '') || undefined
              }
              topBarCurrentPathLabel={
                text('topBarCurrentPathLabel', '') || undefined
              }
            >
              <ModalController>
                {/* eslint-disable-next-line no-shadow */}
                {({ isOpen, setIsOpen }) => (
                  <InfoModalPage
                    level={firstModalLevel + 1}
                    title="A Nested Info Modal Page"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    topBarCurrentPathLabel={'Current Path'}
                    topBarPreviousPathLabel={'Go Back To First Modal'}
                  >
                    {wallOfText}
                  </InfoModalPage>
                )}
              </ModalController>
              {wallOfText}
            </InfoModalPage>
          )}
        </ModalController>
      </React.Fragment>
    );
  });
