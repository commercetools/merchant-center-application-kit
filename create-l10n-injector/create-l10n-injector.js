import React from 'react';
import { wrapDisplayName } from 'recompose';
import { reportErrorToSentry } from '@commercetools-local/sentry';

export default function createL10NInjector({
  displayName,
  propKey,
  propLoadingKey,
  loadLocale,
}) {
  return mapPropsToLocale => WrappedComponent => {
    class L10NComponent extends React.Component {
      static displayName = wrapDisplayName(WrappedComponent, displayName);
      state = { [propLoadingKey]: true, [propKey]: {} };
      componentDidMount() {
        this.loadCountries(this.props);
      }
      componentWillUnmount() {
        this.isUnmounting = true;
      }
      UNSAFE_componentWillReceiveProps(nextProps) {
        if (mapPropsToLocale(this.props) !== mapPropsToLocale(nextProps)) {
          this.loadCountries(nextProps);
        }
      }
      loadCountries = props => {
        this.setState({ [propLoadingKey]: true });
        loadLocale(mapPropsToLocale(props), (error, data) => {
          if (error) {
            reportErrorToSentry(error);
          }
          if (!this.isUnmounting)
            this.setState({ [propKey]: data, [propLoadingKey]: false });
        });
      };
      render() {
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    }
    return L10NComponent;
  };
}
