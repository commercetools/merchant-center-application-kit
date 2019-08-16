import React from 'react';
import { useQuery } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import getDisplayName from '../../utils/get-display-name';
import FetchProjectExtensionImageRegex from './fetch-project-extension-image-regex.graphql';

type TImageRegexOptions = {
  flag: string;
  replace: string;
  search: string;
};
export type TImageRegex = {
  thumb?: TImageRegexOptions;
  small?: TImageRegexOptions;
};
type TImageRegexContext = {
  isLoading: boolean;
  imageRegex?: TImageRegex;
};
type ProviderProps = {
  children: React.ReactNode;
};
type ConsumerProps = {
  render: (imageRegex: TImageRegexContext) => React.ReactNode;
  children?: never;
};

const Context = React.createContext<TImageRegexContext>({ isLoading: true });

const ProjectExtensionProviderForImageRegex = (props: ProviderProps) => {
  const { loading, data } = useQuery<
    { projectExtension?: { imageRegex?: TImageRegex } },
    { target: typeof GRAPHQL_TARGETS.SETTINGS_SERVICE }
  >(FetchProjectExtensionImageRegex, {
    onError: reportErrorToSentry,
    variables: { target: GRAPHQL_TARGETS.SETTINGS_SERVICE },
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
    {imageRegexContext => props.render(imageRegexContext)}
  </Context.Consumer>
);
GetProjectExtensionImageRegex.displayName = 'GetProjectExtensionImageRegex';

function withProjectExtensionImageRegex<Props extends {}>(
  propKey = 'imageRegexData'
) {
  return (Component: React.ComponentType<Props>) => {
    const WrappedComponent = (props: Props) => (
      <GetProjectExtensionImageRegex
        render={imageRegexData => (
          <Component {...props} {...{ [propKey]: imageRegexData }} />
        )}
      />
    );
    WrappedComponent.displayName = `withProjectExtensionImageRegex(${getDisplayName<
      Props
    >(Component)})`;
    return WrappedComponent;
  };
}

// Exports
export {
  GetProjectExtensionImageRegex,
  ProjectExtensionProviderForImageRegex,
  withProjectExtensionImageRegex,
};
