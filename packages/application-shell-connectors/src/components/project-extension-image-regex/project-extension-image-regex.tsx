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
type TImageRegex = {
  thumb?: TImageRegexOptions;
  small?: TImageRegexOptions;
};
type TImageRegexContext = {
  isLoading: boolean;
  imageRegex: TImageRegex | null;
};
type ProviderProps = {
  children: React.ReactNode;
};
type ConsumerProps = {
  render: (imageRegex: TImageRegexContext | {}) => React.ReactNode;
  children?: never;
};

const Context = React.createContext<TImageRegexContext | {}>({});

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
  <Context.Consumer>{imageRegex => props.render(imageRegex)}</Context.Consumer>
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
