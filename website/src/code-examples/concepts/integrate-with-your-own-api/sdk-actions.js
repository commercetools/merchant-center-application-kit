actions.forwardTo.get({ uri: 'https://my-custom-app.com/graphql' });
actions.forwardTo.del({ uri: 'https://my-custom-app.com/graphql' });
actions.forwardTo.head({ uri: 'https://my-custom-app.com/graphql' });
actions.forwardTo.post({
  uri: 'https://my-custom-app.com/graphql',
  payload: { say: 'Hello' },
});

// You can also pass custom HTTP headers, for example:
actions.forwardTo.get({
  uri: 'https://my-custom-app.com/graphql',
  headers: {
    'x-foo': 'bar',
  },
});

// To change the audience policy:
actions.forwardTo.get({
  uri: 'https://my-custom-app.com/api',
  audiencePolicy: 'forward-url-origin',
});