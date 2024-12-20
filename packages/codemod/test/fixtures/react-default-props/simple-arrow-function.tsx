type TMyComponentProps = {
  foo: string;
};

const MyComponent = (props: TMyComponentProps) => {
  return <div>{props.foo}</div>;
};

MyComponent.defaultProps = {
  foo: 'bar',
};
