import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { getDisplayName } from '../utils';

type InjectorOptions<LoadedData> = {
  displayName: string;
  propKey: string;
  propLoadingKey: string;
  loadLocale: (
    locale: string,
    cb: (error?: Error, data?: LoadedData) => void
  ) => void;
};

export default function createL10NInjector<LoadedData>({
  displayName,
  propKey,
  propLoadingKey,
  loadLocale,
}: InjectorOptions<LoadedData>) {
  return function createHOC<Props extends {}>(
    mapPropsToLocale: (props: Props) => string
  ) {
    return (WrappedComponent: React.ComponentType<Props>) => {
      return class L10NComponent extends React.Component<Props> {
        static displayName = `${displayName}(${getDisplayName<Props>(
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
          loadLocale(
            mapPropsToLocale(props),
            (error?: Error, data?: LoadedData) => {
              if (error) {
                reportErrorToSentry(error);
              }
              if (!this.isUnmounting)
                this.setState({ [propKey]: data, [propLoadingKey]: false });
            }
          );
        };
        render() {
          return <WrappedComponent {...this.props} {...this.state} />;
        }
      };
    };
  };
}
