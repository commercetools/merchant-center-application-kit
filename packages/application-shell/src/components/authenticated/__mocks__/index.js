let isAuthenticated = 'true';

export const setIsAuthenticated = value => {
  isAuthenticated = value;
};

const Authenticated = props => {
  return props.render({ isAuthenticated: isAuthenticated === 'true' });
};

export default Authenticated;
