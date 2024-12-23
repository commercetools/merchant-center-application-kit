import * as PropTypes from 'prop-types';

const MyComponent = ({ baz, ...props }) => {
  return (
    <ul>
      <li>{props.foo}</li>
      <li>{props.bar}</li>
      <li>{baz}</li>
    </ul>
  );
};
MyComponent.propTypes = {
  foo: PropTypes.string,
  bar: PropTypes.string,
  baz: PropTypes.string,
};
MyComponent.defaultProps = {
  foo: 'bar',
};
