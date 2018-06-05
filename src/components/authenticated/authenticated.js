import PropTypes from 'prop-types';
import * as storage from '@commercetools-local/storage';
import { STORAGE_KEYS } from '../../constants';

const getIsAuthenticated = () =>
  storage.get(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';

const Authenticated = props => {
  const isAuthenticated = getIsAuthenticated();
  return props.children({ isAuthenticated });
};
Authenticated.displayName = 'Authenticated';
Authenticated.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Authenticated;
