import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import IntlDecorator from './decorators/intl';

addDecorator(
  withOptions({
    name: 'Application Kit',
    // url: 'https://mc-app-kit.commercetools.com',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: false,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,

    resolveStoryHierarchy: storyName => storyName.split('/'),
  })
);

const srcStories = require.context('../src', true, /\.story\.js$/);

function loadStories() {
  require('./welcome.story');
  srcStories.keys().forEach(filename => srcStories(filename));
}

addDecorator(IntlDecorator);

configure(loadStories, module);
