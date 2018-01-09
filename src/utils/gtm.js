import { getDataAttribute } from '@commercetools-local/utils/dataset';

// The way that tracking works is like so:
//
// `data-track-component`: used to set up the hierarchy of the tracking ID.
// `data-track-event`: if this attribute exists, track the event.
// `data-track-strict`: if this exists, do not handle event bubbling.
// `data-track-label`: additional meta information.

// Whitelisting and mapping certain generated event names to hardcoded events.
// They should be keyed by generated name, valued by hardcoded name.
export const eventWhitelist = {
  LanguageSwitch: 'LanguageSwitch',
  ProjectSwitch: 'ProjectSwitch',
  ForgotPassword: 'ForgotPassword',
};

export const track = (event, hierarchy, label) => {
  if (!window.dataLayer) return;

  // sends event to google tag manager based on the mapping defined there
  // https://tagmanager.google.com/?authuser=2#/container/accounts/374886/containers/2308084/workspaces/6/tags
  // the mapped event is then forwarded to google analytics
  window.dataLayer.push({
    event: 'TrackingEvent',
    trackingCategory: hierarchy,
    trackingAction: event,
    trackingLabel: label,
    // trackingValue: metadata # TODO: use `custom dimensions`
  });
};

// Sometimes necessary to manually get the hierarchy.
export const getHierarchy = node => {
  const hierarchy = [];
  let parent = node;

  while (parent) {
    const dataTrackComponent = getDataAttribute(parent, 'data-track-component');
    if (dataTrackComponent) hierarchy.push(dataTrackComponent);

    parent = parent.parentNode;
  }

  hierarchy.reverse();
  return hierarchy.join('-');
};

const eventHandler = name => event => {
  let hierarchy = [];
  let node;
  let trackEvent;
  let trackLabel;
  let trackStrict;

  node = event.target;
  const originalNode = node;

  // Traverse the target elements' parents to find a `data-track` attribute,
  // and if none is found then do nothing.
  while (node) {
    const dataTrackComponent = getDataAttribute(node, 'data-track-component');
    const dataTrackEvent = getDataAttribute(node, 'data-track-event');
    const dataTrackLabel = getDataAttribute(node, 'data-track-label');
    const dataTrackStrict = getDataAttribute(node, 'data-track-strict');

    if (dataTrackEvent && (!dataTrackStrict || originalNode === node)) {
      trackEvent = dataTrackEvent;
      trackLabel = dataTrackLabel;
      trackStrict = dataTrackStrict;

      if (trackStrict) hierarchy.push(trackStrict);
    }

    if (dataTrackComponent) hierarchy.push(dataTrackComponent);

    node = node.parentNode;
  }

  if (trackEvent !== name) return;

  hierarchy = hierarchy.reverse().join('-');

  // The event map also serves as a whitelist. This is really not intuitive
  // by looking at the name.

  // This checks:
  // 1. if the event is in the whitelist and is a string, map it
  // 2. if the event is in the whitelist, is an object,
  //   and there is a matching key, then map to the value
  // 3. if the event is not in the whitelist then don't track
  if (typeof eventWhitelist[hierarchy] === 'string')
    hierarchy = eventWhitelist[hierarchy];
  else if (
    typeof eventWhitelist[hierarchy] === 'object' &&
    trackLabel in eventWhitelist[hierarchy]
  )
    hierarchy = eventWhitelist[hierarchy][trackLabel];
  else {
    // eslint-disable-next-line no-console
    console.warn('ignoring event', {
      event: trackEvent,
      hierarchy:
        typeof hierarchy === 'object' && trackLabel in hierarchy
          ? hierarchy[trackLabel]
          : hierarchy,
      label: trackLabel,
    });
    return;
  }

  // eslint-disable-next-line no-console
  console.info('tracking event', {
    event: trackEvent,
    hierarchy:
      typeof hierarchy === 'object' ? hierarchy[trackLabel] : hierarchy,
    label: trackLabel,
  });

  track(trackEvent, hierarchy, trackLabel);
};

const events = ['click', 'change', 'drop'];

export const boot = () => {
  events.forEach(event => {
    const handler = eventHandler(event);
    window.addEventListener(event, handler, true);
  });
};

export const updateUser = user => {
  if (window.dataLayer && window.app.tracking.gtm)
    window.dataLayer.push({ userId: user.id });
};

export const stopTrackingUser = () => {
  if (window.dataLayer && window.app.tracking.gtm)
    window.dataLayer.push({ userId: undefined });
};
