import React from 'react';
import { Query } from 'react-apollo';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
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

const ProjectExtensionProviderForImageRegex = (props: ProviderProps) => (
  <Query<
    { projectExtension?: { imageRegex?: TImageRegex } },
    { target: string }
  >
    query={FetchProjectExtensionImageRegex}
    variables={{ target: GRAPHQL_TARGETS.SETTINGS_SERVICE }}
  >
    {({ loading, data }) => (
      <Context.Provider
        value={{
          isLoading: loading,
          imageRegex:
            data && data.projectExtension && data.projectExtension.imageRegex,
        }}
      >
        {props.children}
      </Context.Provider>
    )}
  </Query>
);
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
