# Notifications

A general-purpose notification system built on top of redux, providing only the
low-level logic.

## Action Creator

### `addNotification(notification, [options])`

#### Arguments

1. `notification` _(Object)_: This notification will get added to the list. See
   `Notification`.
1. `[options]` _(Object)_: If specified, further customizes the behavior of the
   notification.

* `[dismissAfter = 0]` _(Number)_: dismiss the component after this duration
  (milliseconds)
* `[onDismiss]` _(Function)_: Callback which will get called with the
  notification's `id` before it is dismissed.

The payload must be a `Notification` object. The `id` will be added by the
middleware automatically.

#### Returns

After dispatching a notification to the middleware a `notificationHandle` will
be returned.

```js
{
  id: Number,
  dismiss: Function,
}
```

#### Notification

```js
{
  id: Number,
}
```

A notification in the state will always have an `id` which gets added by the
middleware automatically, plus any props passed as the payload on creation.

#### Action Format

```js
{
  type: 'ADD_NOTIFICATION',
  payload: Object,
  meta: {
    dismissAfter: Number
  }
}
```

### `removeNotification(id)`

#### Arguments

1. `id` _(Number)_: This notification will be removed

#### Example action

```js
{
  type: 'REMOVE_NOTIFICATION',
  payload: Number,
}
```

## Middleware

The middleware

* adds a unique `id` to every notification
* handles scheduling removal of notifications specifying `dismissAfter`
* returns a `notificationHandle` for each dispatched notification containing its
  `id` and a `dismiss` function for convenience.

### Integration

```js
import { createStore, applyMiddleware } from 'redux';
import { middleware as notificationsMiddleware } from '@commercetools-local/notifications';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(notificationsMiddleware)
);
```

## Reducer

Mount the reducer on your notifications store slice.

### `reducer`

#### Example

```js
combineReducers({
  notifications: reducer,
  ...more reducers here...
})
```

## Action Types

Although not required for use in the application, these are exported as well.

* `ADD_NOTIFICATION`
* `REMOVE_NOTIFICATION`

They can be used for filtering out notification actions in the logger.

## Usage

### With React

```js
import React from 'react'
import PropTypes from 'prop-types';
import { removeNotification } from '@commercetools-local/notifications'

// Accepts a notification map function,
// which returns the component based on the notification.
//
// function mapNotificationToComponent (notification) {
//   const map = {
//     'success': SuccessNotification,
//     'intercom': IntercomNotification,
//   }
//   return map[notification.kind] || InfoNotification
// }
//
// accept notifications, which should come from connecting to the store

class LeftNavigation extends React.PureComponent {
  static propTypes: {
    notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    mapNotificationToComponent: PropTypes.func.isRequired,
  };

  render () {
    return (
      <div>
        {
          this.props.notifications.map(
            notification => {
              const Component = this.props.mapNotificationToComponent(notification)
              const dismiss = () => removeNotification(notification.id)
              return (
                <Component
                  key={notification.id}
                  notification={notification}
                  dismiss={dismiss}
                />
              )
            }
          )
        }
      </div>
    )
  };
}
```

---

* The notification system is unaware of the types of notifications you are going
  to dispatch. It's recommended to call the types of notifications you have
  `kind`, to not confuse it with Action Types.
* The notification system is also unaware of the `domain`'s used in the
  application. A domain is the part of the application where the notification
  will be displayed. We currently have: `global`, `page` and `side`
* `addNotification` is a low-level function. It's recommended to use it in your
  own action-creators, and use your own action-creators in your application
  exclusively calling `addNotification` behind the scenes.
* to hide all notifications, iterate over the notifications in the state and
  call `removeNotification(id)` on each one: `state.notifications.forEach(notif => removeNotification(notif.id))`. Simply resetting the state would lead to
  the `onDismiss` callbacks not being fired.
* It's entirely up to you to render the notifications. Connect to the store and
  iterate over them.
* If your notifications need to have different styles or even different React
  components when rendering, use the `kind` to decide which component to render
  or which style to use.
* Since notifications are stored in the Redux store, they should be
  serializeable. Avoid setting functions on notifications. Again, use the
  `kind`, pass any required information and handle it in the component rendering
  the notification.

MCNG: When a certain plugin must provide a way to render a notification, it can
export it from the plugin and we can asynchronously add it to the notifications
renderer on plugin activation.
