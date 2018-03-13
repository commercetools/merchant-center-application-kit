import PropTypes from 'prop-types';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';

const getIsAuthenticated = () =>
  storage.get(CORE_STORAGE_KEYS.IS_AUTHENTICATED) === 'true';

const Authenticated = props => {
  const isAuthenticated = getIsAuthenticated();
  return props.children({ isAuthenticated });
};
Authenticated.displayName = 'Authenticated';
Authenticated.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Authenticated;
