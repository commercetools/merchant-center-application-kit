# Google Tag Manager (GTM) Tracking Utilities

## What is Google Tag Manager?

A service for collecting tracking data and mapping that tracking data to all
kinds of analytics services like Google Analytics.

## Why not directly use Google Analytics (GA)?

For convenience, GTM allows to plugin in multiple
different analytics solutions without needing to change any code. This is
cool, but we are only sending data to Google Analytics right now.

## How can I track events?

Events can be tracked in two ways. Imperatively, by calling the `track` function that lies
in the React Context, or declaratively, by using the `data-track` attributes.

## Imperative Tracking

```jsx
import { GtmContext } from '@commercetools-frontend/application-shell';

// In your application tracking event list
const trackingEventList = {
  'InterestingComponent-MyInterestingFeature': 'InterestingComponent-MyInterestingFeature',
};

class ImperativeTrackingExample extends React.Component {
  static contextType = GtmContext;
  handleInterestingUserBehaviour = () => {
    // passing the DOM node of this component so that the `track` function can
    // read that the context of this `track` call is `InterestingComponent` as
    // defined in the render method
    const componentNode = ReactDOM.findDOMNode(component);
    this.context.track('
      click',
      this.context.getHierarchy(componentNode),
      'MyInterestingFeature'
    );
  }
  render() {
    return <div data-track-component="InterestingComponent">{'...'}</div>
  }
}
```

## Declarative Tracking

```jsx
// In your application tracking event list
const trackingEventList = {
  'InterestingComponent-InterestingButton':
    'InterestingComponent-InterestingButton',
};
const DeclarativeTrackingExample = () => (
  <div data-track-component="InterestingComponent">
    <button data-track-component="InterestingButton" data-track-event="click">
      {
        'Clicking me will send an event to Google Analytics via Google Tag Manager'
      }
    </button>
  </div>
);
```
