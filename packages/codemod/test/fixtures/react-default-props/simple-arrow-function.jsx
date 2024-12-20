import * as PropTypes from 'prop-types';

const MyComponent = (props) => {
  return <div>{props.foo}</div>;
};
MyComponent.defaultProps = {
  foo: 'bar',
};
MyComponent.propTypes = {
  foo: PropTypes.string,
};
