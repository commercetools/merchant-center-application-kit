import * as PropTypes from 'prop-types';

function MyComponent(props) {
  return <div>{props.foo}</div>;
}
MyComponent.defaultProps = {
  foo: 'bar',
};
MyComponent.propTypes = {
  foo: PropTypes.string,
};
