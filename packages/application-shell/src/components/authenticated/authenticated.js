import PropTypes from 'prop-types';
import { localStorage } from '@commercetools-frontend/storage';
import { STORAGE_KEYS } from '../../constants';

const getIsAuthenticated = () =>
  localStorage.get(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';

const Authenticated = props => {
  const isAuthenticated = getIsAuthenticated();
  return props.children({ isAuthenticated });
};
Authenticated.displayName = 'Authenticated';
Authenticated.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Authenticated;
