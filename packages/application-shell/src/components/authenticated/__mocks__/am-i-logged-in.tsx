type RenderFnArgs = { isAuthenticated: boolean };
type Props = {
  render: (args: RenderFnArgs) => JSX.Element;
  children?: never;
};

let isAuthenticated = true;

export const __setIsAuthenticated = (value: boolean) => {
  isAuthenticated = value;
};

const AmILoggedIn = (props: Props) => <>{props.render({ isAuthenticated })}</>;

AmILoggedIn.displayName = 'AmILoggedIn';

export default AmILoggedIn;
