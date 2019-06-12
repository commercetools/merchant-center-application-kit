import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { getDisplayName } from '../utils';

type InjectorOptions<T> = {
  displayName: string;
  propKey: string;
  propLoadingKey: string;
  loadLocale: (locale: string, cb: (error?: Error, data?: T) => void) => void;
};

export default function createL10NInjector<T>({
  displayName,
  propKey,
  propLoadingKey,
  loadLocale,
}: InjectorOptions<T>) {
  return function createHOC<Props>(mapPropsToLocale: (props: any) => string) {
    return (
      WrappedComponent: React.ComponentType<Props>
    ): React.ComponentClass<Props> => {
      class L10NComponent extends React.Component<Props> {
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
        UNSAFE_componentWillReceiveProps(nextProps: Props) {
          if (mapPropsToLocale(this.props) !== mapPropsToLocale(nextProps)) {
            this.loadCountries(nextProps);
          }
        }

        isUnmounting = false;

        loadCountries = (props: Props) => {
          this.setState({ [propLoadingKey]: true });
          loadLocale(mapPropsToLocale(props), (error?: Error, data?: T) => {
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
  };
}
