export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  shouldRenderDivider: Maybe<Scalars['Boolean']>;
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


export type TFetchAllMenuFeatureTogglesQuery = { __typename?: 'Query', allFeatureToggles: Array<string> };

export type TFetchApplicationsMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchApplicationsMenuQuery = { __typename?: 'Query', applicationsMenu: { __typename?: 'ApplicationsMenu', navBar: Array<{ __typename?: 'NavbarMenu', shouldRenderDivider: Maybe<boolean>, key: string, uriPath: string, icon: string, featureToggle: Maybe<string>, menuVisibility: Maybe<string>, permissions: Array<string>, labelAllLocales: Array<{ __typename?: 'LocalizedField', locale: string, value: string }>, dataFences: Maybe<Array<{ __typename?: 'DataFence', group: string, name: string, type: string }>>, actionRights: Maybe<Array<{ __typename?: 'ActionRight', group: string, name: string }>>, submenu: Array<{ __typename?: 'BaseMenu', key: string, uriPath: string, featureToggle: Maybe<string>, menuVisibility: Maybe<string>, permissions: Array<string>, labelAllLocales: Array<{ __typename?: 'LocalizedField', locale: string, value: string }>, actionRights: Maybe<Array<{ __typename?: 'ActionRight', group: string, name: string }>>, dataFences: Maybe<Array<{ __typename?: 'DataFence', group: string, name: string, type: string }>> }> }>, appBar: Array<{ __typename?: 'BaseMenu', key: string, uriPath: string, featureToggle: Maybe<string>, permissions: Array<string>, labelAllLocales: Array<{ __typename?: 'LocalizedField', locale: string, value: string }> }> } };
