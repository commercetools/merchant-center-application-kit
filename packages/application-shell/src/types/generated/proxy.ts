export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type TActionRight = {
  __typename?: 'ActionRight';
  group: Scalars['String'];
  name: Scalars['String'];
};

export type TApplicationsMenu = {
  __typename?: 'ApplicationsMenu';
  appBar: Array<TBaseMenu>;
  navBar: Array<TNavbarMenu>;
};

export type TBaseMenu = {
  __typename?: 'BaseMenu';
  key: Scalars['String'];
  uriPath: Scalars['String'];
  labelAllLocales: Array<TLocalizedField>;
  featureToggle: Maybe<Scalars['String']>;
  menuVisibility: Maybe<Scalars['String']>;
  permissions: Array<Scalars['String']>;
  actionRights: Maybe<Array<TActionRight>>;
  dataFences: Maybe<Array<TDataFence>>;
};

export type TDataFence = {
  __typename?: 'DataFence';
  group: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TLocalizedField = {
  __typename?: 'LocalizedField';
  locale: Scalars['String'];
  value: Scalars['String'];
};

export type TNavbarMenu = {
  __typename?: 'NavbarMenu';
  shouldRenderDivider: Scalars['Boolean'];
  key: Scalars['String'];
  uriPath: Scalars['String'];
  icon: Scalars['String'];
  labelAllLocales: Array<TLocalizedField>;
  featureToggle: Maybe<Scalars['String']>;
  permissions: Array<Scalars['String']>;
  actionRights: Maybe<Array<TActionRight>>;
  dataFences: Maybe<Array<TDataFence>>;
  menuVisibility: Maybe<Scalars['String']>;
  submenu: Array<TBaseMenu>;
};

export type TQuery = {
  __typename?: 'Query';
  applicationsMenu: TApplicationsMenu;
  allFeatureToggles: Array<Scalars['String']>;
};

export type TFetchAllMenuFeatureTogglesQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchAllMenuFeatureTogglesQuery = (
  { __typename?: 'Query' }
  & Pick<TQuery, 'allFeatureToggles'>
);

export type TFetchApplicationsMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchApplicationsMenuQuery = (
  { __typename?: 'Query' }
  & { applicationsMenu: (
    { __typename?: 'ApplicationsMenu' }
    & { navBar: Array<(
      { __typename?: 'NavbarMenu' }
      & Pick<TNavbarMenu, 'shouldRenderDivider' | 'key' | 'uriPath' | 'icon' | 'featureToggle' | 'menuVisibility' | 'permissions'>
      & { labelAllLocales: Array<(
        { __typename?: 'LocalizedField' }
        & Pick<TLocalizedField, 'locale' | 'value'>
      )>, dataFences: Maybe<Array<(
        { __typename?: 'DataFence' }
        & Pick<TDataFence, 'group' | 'name' | 'type'>
      )>>, actionRights: Maybe<Array<(
        { __typename?: 'ActionRight' }
        & Pick<TActionRight, 'group' | 'name'>
      )>>, submenu: Array<(
        { __typename?: 'BaseMenu' }
        & Pick<TBaseMenu, 'key' | 'uriPath' | 'featureToggle' | 'menuVisibility' | 'permissions'>
        & { labelAllLocales: Array<(
          { __typename?: 'LocalizedField' }
          & Pick<TLocalizedField, 'locale' | 'value'>
        )>, actionRights: Maybe<Array<(
          { __typename?: 'ActionRight' }
          & Pick<TActionRight, 'group' | 'name'>
        )>>, dataFences: Maybe<Array<(
          { __typename?: 'DataFence' }
          & Pick<TDataFence, 'group' | 'name' | 'type'>
        )>> }
      )> }
    )>, appBar: Array<(
      { __typename?: 'BaseMenu' }
      & Pick<TBaseMenu, 'key' | 'uriPath' | 'featureToggle' | 'permissions'>
      & { labelAllLocales: Array<(
        { __typename?: 'LocalizedField' }
        & Pick<TLocalizedField, 'locale' | 'value'>
      )> }
    )> }
  ) }
);
