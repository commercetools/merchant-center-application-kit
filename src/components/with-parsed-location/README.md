# A HoC to parse route location params into props

## `withParsedLocation`

### Usage

> NOTE: this HoC should be use in conjunction with a router `location`

```js
import { withParsedLocation } from '@commercetools-local/application-shell';

const View = props => <div>{props.locationParams.name}</div>;
View.propTypes = {
  // This is what the router injects. Hash and search are just strings.
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired,
  // This is what this HoC injects, it contains all the parsed params
  // both from hash and search.
  // Example url:
  // /?redirectTo=/foo#scope=email&name=john
  locationParams: PropTypes.shape({
    redirectTo: PropTypes.string,
    scope: PropTypes.string,
    name: PropTypes.string
  }).isRequired
};

compose(withRouter, withParsedLocation);
```
