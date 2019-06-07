import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { getDisplayName } from '../utils';

interface Props {
  displayName: string;
  propKey: string;
  propLoadingKey: string;
  loadLocale: Function;
}

export default function createL10NInjector({
  displayName,
  propKey,
  propLoadingKey,
  loadLocale,
}: Props) {
  return (mapPropsToLocale: Function) => (
    WrappedComponent: React.ComponentClass<any>
  ): React.ComponentClass<any> => {
    class L10NComponent extends React.Component {
      static displayName = `${displayName}(${getDisplayName(
        WrappedComponent
      )})`;
      state = { [propLoadingKey]: true, [propKey]: {} };
      componentDidMount() {
        this.loadCountries(this.props);
      }
      componentWillUnmount() {
        this.isUnmounting = true;
      }
      // eslint-disable-next-line camelcase
      UNSAFE_componentWillReceiveProps(nextProps: any) {
        if (mapPropsToLocale(this.props) !== mapPropsToLocale(nextProps)) {
          this.loadCountries(nextProps);
        }
      }

      isUnmounting = false;

      loadCountries = (props: any) => {
        this.setState({ [propLoadingKey]: true });
        loadLocale(mapPropsToLocale(props), (error: Error, data: any) => {
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
