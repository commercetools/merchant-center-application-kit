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

export class LocalStoreProvider extends React.Component {
  static displayName = 'LocalStoreProvider';

  static propTypes = {
    pluginName: PropTypes.string,
    children: PropTypes.any,

    // Injected
    hasStateForActivePlugin: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      numberFormat: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
    }).isRequired,
    project: PropTypes.shape({
      permissions: PropTypes.object.isRequired,
      countries: PropTypes.array.isRequired,
      languages: PropTypes.array.isRequired,
      currencies: PropTypes.array.isRequired,
      key: PropTypes.string.isRequired,
      settings: PropTypes.object,
      expired: PropTypes.bool.isRequired,
    }).isRequired,
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
    return Boolean(nextProps.pluginName) && nextProps.hasStateForActivePlugin;
  }

  getChildContext() {
    if (!this.props.pluginName) return { store: this.context.store };

    return {
      store: this.createLocalStore(this.context.store, this.props),
    };
  }

  createLocalStore = () => ({
    // This is just an internal flag to indicate that this is the local store.
    // It's mostly useful for testing and debugging.
    isLocal: true,
    dispatch: action =>
      this.context.store.dispatch({
        type: __LOCAL,
        payload: action,
        meta: {
          plugin: this.props.pluginName,
        },
      }),
    getState: () => {
      const appState = this.context.store.getState();
      return {
        ...appState[this.props.pluginName],
        // Inject a field called `globalAppState` that contains
        // values about application, user and project.
        // This field is only available to a plugin state.
        globalAppState: mapUserAndProjectToState({
          user: this.props.user,
          project: this.props.project,
        }),
      };
    },
    replaceReducer() {
      throw new Error('May not be called from plugin');
    },
    subscribe: (...args) => this.context.store.subscribe(...args),
  });

  render() {
    // Only show the plugin when the state for it is initialized
    return this.props.hasStateForActivePlugin ? this.props.children : null;
  }
}

export const mapStateToProps = (state, ownProps) => ({
  hasStateForActivePlugin: Object.prototype.hasOwnProperty.call(
    state,
    ownProps.pluginName
  ),
});

export default compose(
  withRouter,
  withUser(),
  withProject(ownProps => ownProps.match.params.projectKey),
  connect(mapStateToProps)
)(LocalStoreProvider);
