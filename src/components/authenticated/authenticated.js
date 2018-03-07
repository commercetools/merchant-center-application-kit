import PropTypes from 'prop-types';
import { compose, setDisplayName, withProps } from 'recompose';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';

export const Authenticated = props =>
  props.children({ isAuthenticated: props.isLoggedIn });
Authenticated.displayName = 'Authenticated';
Authenticated.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
};

export default compose(
  setDisplayName('Authenticated'),
  withProps(() => ({
    isLoggedIn: Boolean(storage.get(CORE_STORAGE_KEYS.IS_AUTHENTICATED)),
  }))
)(Authenticated);
