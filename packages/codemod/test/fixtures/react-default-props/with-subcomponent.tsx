type MySubcomponentProps = {
  foo: string;
  bar: string;
};
function MySubcomponent(props: MySubcomponentProps) {
  return (
    <ul>
      <li>{props.foo}</li>
      <li>{props.bar}</li>
    </ul>
  );
}

type TMyComponentProps = {
  foo: string;
  bar: string;
};
function MyComponent(props: TMyComponentProps) {
  return (
    <div>
      <MySubcomponent {...props} />
    </div>
  );
}
MyComponent.defaultProps = {
  foo: 'bar',
};
