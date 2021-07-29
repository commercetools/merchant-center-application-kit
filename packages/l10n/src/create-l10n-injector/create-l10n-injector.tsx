import { ComponentType, useEffect, useReducer } from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { getDisplayName } from '../utils';

type LoadLocale<LoadedData extends {}> = (
  locale: string
) => Promise<LoadedData>;
type InjectorOptions<LoadedData extends {}> = {
  displayName: string;
  propKey: string;
  propLoadingKey: string;
  loadLocale: LoadLocale<LoadedData>;
};
type State<Data extends {}> = {
  isLoading: boolean;
  data: Data | {};
  error?: Error;
};
type Action<Data extends {}> =
  | { type: 'loading' }
  | { type: 'ok'; data: Data }
  | { type: 'error'; error: Error };

const initialState = {
  isLoading: true,
  // Keep it as an empty object, for backwards compatibility
  data: {},
};

function reducer<Data extends {}>(
  state = initialState,
  action: Action<Data>
): State<Data> {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true, data: {} };
    case 'ok':
      return { ...state, isLoading: false, data: action.data };
    case 'error':
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

export function createL10NHook<LoadedData extends {}>(
  loadLocale: LoadLocale<LoadedData>
) {
  return (locale: string) => {
    const [data, dispatch] = useReducer<
      (
        prevState: State<LoadedData>,
        action: Action<LoadedData>
      ) => State<LoadedData>
    >(reducer, initialState);

    useEffect(() => {
      let cleaning = false;
      dispatch({ type: 'loading' });
      async function run() {
        try {
          const data = await loadLocale(locale);
          !cleaning && dispatch({ type: 'ok', data });
        } catch (error) {
          reportErrorToSentry(error);
          !cleaning && dispatch({ type: 'error', error });
        }
      }
      run();
      return () => {
        cleaning = true;
      };
    }, [locale]);

    return data;
  };
}

export function createL10NInjector<LoadedData extends {}>({
  displayName,
  propKey,
  propLoadingKey,
  loadLocale,
}: InjectorOptions<LoadedData>) {
  return function createHOC<Props extends {}>(
    mapPropsToLocale: (props: Props) => string
  ) {
    const useL10n = createL10NHook(loadLocale);

    return (WrappedComponent: ComponentType<Props>) => {
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
