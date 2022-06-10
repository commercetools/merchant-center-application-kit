import type {
  TFetchProjectExtensionImageRegexQuery,
  TFetchProjectExtensionImageRegexQueryVariables,
  TImageRegexOptions,
} from '../../types/generated/settings';
import warning from 'tiny-warning';

import {
  ComponentType,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import { useQuery } from '@apollo/client/react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import getDisplayName from '../../utils/get-display-name';
import FetchProjectExtensionImageRegex from './fetch-project-extension-image-regex.settings.graphql';

export type TImageRegexContext = {
  isLoading: boolean;
  imageRegex?: {
    small?: Pick<TImageRegexOptions, 'flag' | 'replace' | 'search'> | null;
    thumb?: Pick<TImageRegexOptions, 'flag' | 'replace' | 'search'> | null;
  } | null;
};
type ProviderProps = {
  skip?: boolean;
  children: ReactNode;
};
type ConsumerProps = {
  render: (imageRegex: TImageRegexContext) => ReactNode;
  children?: never;
};

const useWarning = (condition: boolean, message: string) => {
  useEffect(() => {
    warning(condition, message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const Context = createContext<TImageRegexContext>({ isLoading: false });

const useProjectExtensionImageRegex = () => {
  const { isLoading, imageRegex } = useContext(Context);
  return { isLoading, imageRegex };
};

const ProjectExtensionProviderForImageRegex = (props: ProviderProps) => {
  const { loading, data } = useQuery<
    TFetchProjectExtensionImageRegexQuery,
    TFetchProjectExtensionImageRegexQueryVariables
  >(FetchProjectExtensionImageRegex, {
    skip: props.skip,
    onError: reportErrorToSentry,
    context: { target: GRAPHQL_TARGETS.SETTINGS_SERVICE },
  });

  return (
    <Context.Provider
      value={{
        isLoading: loading,
        imageRegex:
          data && data.projectExtension && data.projectExtension.imageRegex,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
ProjectExtensionProviderForImageRegex.displayName =
  'ProjectExtensionProviderForImageRegex';

const GetProjectExtensionImageRegex = (props: ConsumerProps) => {
  useWarning(
    false,
    `@commercetools-frontend/application-shell-connectors: It is not recommended to use the 'GetProjectExtensionImageRegex' anymore. Please use the 'useProjectExtensionImageRegex' hook instead.`
  );

  return (
    <Context.Consumer>
      {(imageRegexContext) => props.render(imageRegexContext)}
    </Context.Consumer>
  );
};
GetProjectExtensionImageRegex.displayName = 'GetProjectExtensionImageRegex';

function withProjectExtensionImageRegex<Props extends {}>(
  propKey = 'imageRegexData'
) {
  return (Component: ComponentType<Props>) => {
    const WrappedComponent = (props: Props) => {
      useWarning(
        false,
        `@commercetools-frontend/application-shell-connectors: It is not recommended to use the 'withProjectExtensionImageRegex' high order component anymore. Please use the 'useProjectExtensionImageRegex' hook instead.`
      );
      const imageregexContext = useProjectExtensionImageRegex();
      return (
        <GetProjectExtensionImageRegex
          render={() => (
            <Component {...props} {...{ [propKey]: imageregexContext }} />
          )}
        />
      );
    };

    WrappedComponent.displayName = `withProjectExtensionImageRegex(${getDisplayName<Props>(
      Component
    )})`;
    return WrappedComponent;
  };
}

// Exports
export {
  GetProjectExtensionImageRegex,
  ProjectExtensionProviderForImageRegex,
  withProjectExtensionImageRegex,
  useProjectExtensionImageRegex,
};
