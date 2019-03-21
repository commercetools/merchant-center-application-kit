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
        'http://cdn.rawgit.com/commercetools/press-kit/master/PNG/72DPI/CT%20logo%20chrom%20black%20horizontal%20RGB%2072dpi.png',
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
