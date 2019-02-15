import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import Readme from './README.md';
import PageNotFound from './page-not-found';

storiesOf('Components|Maintenance pages', module)
  .addDecorator(withReadme(Readme))
  .add('PageNotFound', () => <PageNotFound />);
