import * as PropTypes from 'prop-types';

function MySubcomponent(props) {
  return (
    <ul>
      <li>{props.foo}</li>
      <li>{props.bar}</li>
    </ul>
  );
}
MySubcomponent.propTypes = {
  foo: PropTypes.string,
  bar: PropTypes.string,
};

function MyComponent(props) {
  return (
    <div>
      <MySubcomponent {...props} />
    </div>
  );
}
MyComponent.propTypes = {
  foo: PropTypes.string,
  bar: PropTypes.string,
};
MyComponent.defaultProps = {
  foo: 'bar',
};
