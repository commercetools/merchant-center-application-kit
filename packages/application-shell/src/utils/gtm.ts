/**
 * Google Tag Manager (GTM) Tracking Utilities
 */
import camelcase from 'lodash/camelCase';
import type { ApplicationWindow } from '@commercetools-frontend/constants';

import logger from './logger';

declare let window: ApplicationWindow;

type TrackingListValueMap = { [key: string]: string };
type TrackingListValue = string | TrackingListValueMap;
export type TrackingList = {
  [key: string]: TrackingListValue;
};

const isPlainTrackingListValue = (value: TrackingListValue): value is string =>
  typeof value === 'string';

const isObjectTrackingListValue = (
  value: TrackingListValue
): value is TrackingListValueMap => typeof value === 'object';

const isHtmlElement = (node: Node | HTMLElement): node is HTMLElement =>
  (node as HTMLElement).dataset !== undefined;

const getDataAttribute = (node: Node, key: string) => {
  if (isHtmlElement(node)) {
    const camelKey = camelcase(key.replace(/^data-/, ''));
    return node.dataset[camelKey];
  }
  return undefined;
};
const isGtmEnabled = () =>
  window.dataLayer &&
  window.app.trackingGtm &&
  window.app.trackingGtm !== 'null';

// The way that tracking works is like so:
//
// `data-track-component`: used to set up the hierarchy of the tracking ID.
// `data-track-event`: if this attribute exists, track the event.
// `data-track-strict`: if this exists, do not handle event bubbling.
// `data-track-label`: additional meta information.

// Listing and mapping certain generated event names to hardcoded events.
// They should be keyed by generated name, valued by hardcoded name.
export const defaultEventList = {
  LanguageSwitch: 'LanguageSwitch',
  ProjectSwitch: 'ProjectSwitch',
  ForgotPassword: 'ForgotPassword',
};

const logTracking = (
  {
    action,
    category,
    label,
    variable,
    value,
  }: {
    action?: string;
    category: string;
    label?: string;
    variable?: string;
    value?: unknown;
  },
  { isIgnored }: { isIgnored: boolean } = { isIgnored: false }
) => {
  const groupName = `%cGTM ${
    isIgnored ? '%cignoring' : '%cperforming'
  } %ctracking %c${category} %c${label || ''}`;

  logger.groupCollapsed(
    groupName,
    'color: gray; font-weight: bold;',
    `color: ${isIgnored ? 'orangered' : 'seagreen'}; font-weight: lighter;`,
    'color: gray; font-weight: lighter;',
    'color: goldenrod; font-style: normal;',
    'color: cornflowerblue; font-style: normal;'
  );

  if (action) logger.log('%caction', 'color: cadetblue;', action);
  if (variable) logger.log('%cvariable', 'color: cadetblue;', variable);
  if (typeof value === 'number') logger.log('%cvalue', 'color: red;', value);
  logger.log('%ccategory', 'color: goldenrod; font-weight: bold;', category);
  if (label)
    logger.log('%clabel', 'color: cornflowerblue; font-weight: bold;', label);

  logger.groupEnd();
};

export const track = (action: string, category: string, label?: string) => {
  if (!window.dataLayer) return;

  logTracking({
    action,
    category,
    label,
  });

  // sends event to google tag manager based on the mapping defined there
  // the mapped event is then forwarded to google analytics
  window.dataLayer.push({
    event: 'TrackingEvent',
    trackingCategory: category,
    trackingAction: action,
    trackingLabel: label,
    // trackingValue: metadata # TODO: use `custom dimensions`
  });
};

export const trackTiming = ({
  category,
  variable,
  value,
  label,
}: {
  category: string;
  variable: string;
  value: string | number;
  label?: string;
}) => {
  if (isGtmEnabled()) {
    logTracking({
      variable,
      value,
      category,
      label,
    });

    window.dataLayer.push({
      event: 'TimingEvent',
      trackingCategory: category,
      trackingVariable: variable,
      trackingValue: value,
      trackingLabel: label,
    });
  }
};

// Track custom dimensions
export const trackApplicationName = (applicationName: string) => {
  if (isGtmEnabled()) window.dataLayer.push({ applicationName });
};
export const trackProjectKey = (projectKey?: string) => {
  if (isGtmEnabled() && projectKey) window.dataLayer.push({ projectKey });
};
export const trackUserBusinessRole = (userBusinessRole?: string) => {
  if (isGtmEnabled() && userBusinessRole) {
    window.dataLayer.push({ userBusinessRole });
  }
};

// Sometimes necessary to manually get the hierarchy.
export const getHierarchy = (node: Node | null) => {
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

const eventHandler =
  (name: string, trackingEventList: TrackingList) => (event: Event) => {
    if (!event.target) return;

    const hierarchy: string[] = [];
    let trackEvent: string | undefined;
    let trackLabel: string | undefined;
    let trackStrict: string | undefined;

    let node = event.target as Node | null;
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

      node = node.parentNode || null;
    }

    if (!trackEvent) return;
    if (trackEvent !== name) return;

    let hierarchyKey = hierarchy.reverse().join('-');

    // The event map also serves as an allow list. This is really not intuitive
    // by looking at the name.

    // Since we don't want to have all caught events to be sent automatically
    // but only certain events that we are interesting in actually tracking
    // there is a list of events that specifies which events should be
    // sent to Google Tag manager

    // Every application of the Merchant Center should maintain its own list of
    // events it wants to be tracked. This list is passed in via the
    // `trackingEventList` parameter that needs to be merged with the
    // default event list.
    // The default list contains all events that are not generated by a
    // specific application, but by parts of the application shell itself like the
    // menu or the profile view.

    const eventList: TrackingList = {
      ...defaultEventList,
      ...trackingEventList,
    };
    const eventValue = eventList[hierarchyKey];
    // This checks:
    // 1. if the event is in the allow list and is a string, map it
    // 2. if the event is in the allow list, is an object,
    //   and there is a matching key, then map to the value
    // 3. if the event is not in the allow list then don't track
    if (isPlainTrackingListValue(eventValue)) hierarchyKey = eventValue;
    else if (
      isObjectTrackingListValue(eventValue) &&
      trackLabel &&
      trackLabel in eventValue
    )
      hierarchyKey = eventValue[trackLabel];
    else {
      logTracking(
        {
          action: trackEvent,
          category:
            typeof hierarchyKey === 'object' && trackLabel
              ? hierarchyKey[trackLabel]
              : hierarchyKey,
          label: trackLabel,
        },
        { isIgnored: true }
      );

      return;
    }

    logTracking({
      action: trackEvent,
      category:
        typeof hierarchyKey === 'object' && trackLabel
          ? hierarchyKey[trackLabel]
          : hierarchyKey,
      label: trackLabel,
    });

    track(trackEvent, hierarchyKey, trackLabel);
  };

const events = ['click', 'change', 'drop'];

export const boot = (trackingEventList: TrackingList) => {
  events.forEach((event) => {
    const handler = eventHandler(event, trackingEventList);
    window.addEventListener(event, handler, true);
  });
};

export const updateUser = (userId: string) => {
  if (isGtmEnabled()) window.dataLayer.push({ userId });
};

export const stopTrackingUser = () => {
  if (isGtmEnabled()) window.dataLayer.push({ userId: undefined });
};
