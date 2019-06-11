import { addParameters, configure, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import IntlDecorator from './decorators/intl';

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Application Kit',
      // To control appearance:
      brandImage:
        'https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png',
    }),
    isFullScreen: false,
    panelPosition: 'right',
    showNav: true,
    showPanel: true,
    sortStoriesByKind: false,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  },
});

const srcStories = require.context('../src', true, /\.story\.js$/);

function loadStories() {
  require('./welcome.story');
  srcStories.keys().forEach(filename => srcStories(filename));
}

addDecorator(IntlDecorator);

configure(loadStories, module);
