/* eslint-disable import/no-duplicates */
import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';
import PageNotFoundSVG from '@commercetools-frontend/assets/images/page-not-found.svg';
import ProjectExpiredSVG from '@commercetools-frontend/assets/images/project-expired.svg';
import ProjectSuspendedSVG from '@commercetools-frontend/assets/images/project-suspended.svg';
import UnexpectedErrorSVG from '@commercetools-frontend/assets/images/unexpected-error.svg';
import FailedAuthorizationSVG from '@commercetools-frontend/assets/images/failed-authorization.svg';
import FailedAuthenticationSVG from '@commercetools-frontend/assets/images/failed-authentication.svg';
import { Spacings, Text } from '@commercetools-frontend/ui-kit';
import Readme from './README.md';
import MaintenancePageLayout from './maintenance-page-layout';

const images = {
  PageNotFoundSVG,
  ProjectExpiredSVG,
  ProjectSuspendedSVG,
  UnexpectedErrorSVG,
  FailedAuthorizationSVG,
  FailedAuthenticationSVG,
};
const imageNames = Object.keys(images);

storiesOf('Components|Maintenance pages', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('MaintenancePageLayout', () => {
    const selectedImage = select('image', imageNames, imageNames[0]);
    return (
      <MaintenancePageLayout
        imageSrc={images[selectedImage]}
        title={text('title', 'Title')}
        paragraph1={text('paragraph 1', 'The first paragraph')}
        paragraph2={text('paragraph 2', 'The second paragraph')}
        bodyContent={
          <Spacings.Stack scale="s">
            <Text.Body>{'This is the body'}</Text.Body>
            <Text.Detail>{'You can pass here any React element'}</Text.Detail>
          </Spacings.Stack>
        }
      />
    );
  });
