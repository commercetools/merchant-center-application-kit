import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import {
  __LOCAL,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import { withUser } from '../fetch-user';
import { withProject } from '../fetch-project';

const mapUserAndProjectToState = ({ user, project }) => ({
  token: storage.get(CORE_STORAGE_KEYS.TOKEN),
  // This is the "selected project language", a.k.a the selected locale for the localized project data.
  currentLanguage: storage.get(CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE),
  // This is the user locale, a.k.a the locale used by react-intl to localize the application.
  locale: user.language,
  // Mostly useful for reacting to opening/closing of left menu navigation
  isForcedMenuOpen: storage.get(CORE_STORAGE_KEYS.IS_FORCED_MENU_OPEN),

  // User info
  id: user.id,
  firstName: user.firstName,
  // NOTE: will be deprecated in favour of a single `locale`
  // https://jira.commercetools.com/browse/CTP-814
  numberFormat: user.numberFormat,

  // Project info
  permissions: project.permissions,
  countries: project.countries,
  languages: project.languages,
  currencies: project.currencies,
  currentProjectKey: project.key,
  baseSettings: project.settings && project.settings.baseSettings,
  currentProjectSettings: project.settings,
  currentProjectExpired: project.expired,
});

export class LocalProvider extends React.Component {
  static displayName = 'LocalProvider';

  static propTypes = {
    children: PropTypes.any,
    plugin: PropTypes.string,
    hasStateForActivePlugin: PropTypes.bool.isRequired,

    // Injected
    user: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    store: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    // Only update when a plugin is defined and has its own state slice,
    // otherwise we're in the middle of either a plugin or project switch, so
    // the state is inconsistent
    return Boolean(nextProps.plugin) && nextProps.hasStateForActivePlugin;
  }

  getChildContext() {
    if (!this.props.plugin) return this.context.store;

    return {
      store: this.createLocalStore(this.context.store, this.props),
    };
  }

  createLocalStore = (store, props) => ({
    dispatch(action) {
      return store.dispatch({
        type: __LOCAL,
        payload: action,
        meta: {
          plugin: props.plugin,
        },
      });
    },
    getState() {
      const appState = store.getState();
      const state = appState[props.plugin];
      // Inject a field called `globalAppState` that contains
      // values about application, user and project.
      // This field is only available to a plugin state.
      state.globalAppState = mapUserAndProjectToState({
        user: props.user,
        project: props.project,
      });
      return state;
    },
    replaceReducer() {
      throw new Error('May not be called from plugin');
    },
    subscribe(...args) {
      return store.subscribe(...args);
    },
  });

  render() {
    // Only show the plugin when the state for it is initialized
    return this.props.hasStateForActivePlugin ? this.props.children : null;
  }
}

export const mapStateToProps = (state, ownProps) => ({
  hasStateForActivePlugin: Object.prototype.hasOwnProperty.call(
    state,
    ownProps.plugin
  ),
});

export default compose(
  withRouter,
  withUser(),
  withProject(ownProps => ownProps.match.params.projectKey),
  connect(mapStateToProps)
)(LocalProvider);
