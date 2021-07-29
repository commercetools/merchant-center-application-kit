import type {
  TFetchProjectExtensionImageRegexQuery,
  TFetchProjectExtensionImageRegexQueryVariables,
  TImageRegexOptions,
} from '../../types/generated/settings';

import { ComponentType, createContext, ReactNode } from 'react';
import { useQuery } from '@apollo/client/react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import getDisplayName from '../../utils/get-display-name';
import FetchProjectExtensionImageRegex from './fetch-project-extension-image-regex.settings.graphql';

export type TImageRegexContext = {
  isLoading: boolean;
  imageRegex?: {
    small?: Pick<TImageRegexOptions, 'flag' | 'replace' | 'search'>;
    thumb?: Pick<TImageRegexOptions, 'flag' | 'replace' | 'search'>;
  };
};
type ProviderProps = {
  skip?: boolean;
  children: ReactNode;
};
type ConsumerProps = {
  render: (imageRegex: TImageRegexContext) => ReactNode;
  children?: never;
};

const Context = createContext<TImageRegexContext>({ isLoading: false });

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

const GetProjectExtensionImageRegex = (props: ConsumerProps) => (
  <Context.Consumer>
    {(imageRegexContext) => props.render(imageRegexContext)}
  </Context.Consumer>
);
GetProjectExtensionImageRegex.displayName = 'GetProjectExtensionImageRegex';

function withProjectExtensionImageRegex<Props extends {}>(
  propKey = 'imageRegexData'
) {
  return (Component: ComponentType<Props>) => {
    const WrappedComponent = (props: Props) => (
      <GetProjectExtensionImageRegex
        render={(imageRegexData) => (
          <Component {...props} {...{ [propKey]: imageRegexData }} />
        )}
      />
    );
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
};
