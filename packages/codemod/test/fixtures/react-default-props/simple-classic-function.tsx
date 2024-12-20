type TMyComponentProps = {
  foo: string;
};

function MyComponent(props: TMyComponentProps) {
  return <div>{props.foo}</div>;
}

MyComponent.defaultProps = {
  foo: 'bar',
};
