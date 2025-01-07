type TMyComponentProps = {
  foo: string;
  bar: string;
  baz: string;
};

const MyComponent = ({ baz, ...props }: TMyComponentProps) => {
  return (
    <ul>
      <li>{props.foo}</li>
      <li>{props.bar}</li>
      <li>{baz}</li>
    </ul>
  );
};

MyComponent.defaultProps = {
  foo: 'bar',
};
