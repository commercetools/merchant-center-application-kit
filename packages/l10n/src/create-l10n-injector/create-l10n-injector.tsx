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
type State<Data> = {
  isLoading: boolean;
  data?: Data;
  error?: Error;
};
type Action<Data> =
  | { type: 'loading' }
  | { type: 'ok'; data: Data }
  | { type: 'error'; error: Error };

const initialState = {
  isLoading: true,
};

function reducer<Data>(
  state = initialState,
  action: Action<Data>
): State<Data> {
  switch (action.type) {
    case 'loading':
      return { isLoading: true };
    case 'ok':
      return { isLoading: false, data: action.data };
    case 'error':
      return { isLoading: false, error: action.error };
    default:
      return state;
  }
}

export function createL10NHook<LoadedData>(
  loadLocale: (
    locale: string,
    cb: (error?: Error, data?: LoadedData) => void
  ) => void
) {
  return (locale: string) => {
    const [data, dispatch] = React.useReducer<
      (
        prevState: State<LoadedData>,
        action: Action<LoadedData>
      ) => State<LoadedData>
    >(reducer, initialState);

    React.useEffect(() => {
      let cleaning = false;
      dispatch({ type: 'loading' });
      loadLocale(locale, (error?: Error, data?: LoadedData) => {
        if (error) {
          reportErrorToSentry(error);
        }
        if (!cleaning) {
          if (error) {
            dispatch({ type: 'error', error });
          }
          if (data) {
            dispatch({ type: 'ok', data });
          }
        }
      });
      return () => {
        cleaning = true;
      };
    }, [locale]);

    return data;
  };
}

export function createL10NInjector<LoadedData>({
  displayName,
  propKey,
  propLoadingKey,
  loadLocale,
}: InjectorOptions<LoadedData>) {
  return function createHOC<Props extends {}>(
    mapPropsToLocale: (props: Props) => string
  ) {
    const useL10n = createL10NHook(loadLocale);

    return (WrappedComponent: React.ComponentType<Props>) => {
      const L10NComponent = (props: Props) => {
        const state = useL10n(mapPropsToLocale(props));
        return (
          <WrappedComponent
            {...props}
            {...{ [propLoadingKey]: state.isLoading, [propKey]: state.data }}
          />
        );
      };
      L10NComponent.displayName = `${displayName}(${getDisplayName<Props>(
        WrappedComponent
      )})`;
      return L10NComponent;
    };
  };
}
