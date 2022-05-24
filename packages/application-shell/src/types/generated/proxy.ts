export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  actionRights?: Maybe<Array<TActionRight>>;
  dataFences?: Maybe<Array<TDataFence>>;
  featureToggle?: Maybe<Scalars['String']>;
  key: Scalars['String'];
  labelAllLocales: Array<TLocalizedField>;
  menuVisibility?: Maybe<Scalars['String']>;
  permissions: Array<Scalars['String']>;
  uriPath: Scalars['String'];
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
  actionRights?: Maybe<Array<TActionRight>>;
  dataFences?: Maybe<Array<TDataFence>>;
  featureToggle?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  key: Scalars['String'];
  labelAllLocales: Array<TLocalizedField>;
  menuVisibility?: Maybe<Scalars['String']>;
  permissions: Array<Scalars['String']>;
  shouldRenderDivider?: Maybe<Scalars['Boolean']>;
  submenu: Array<TBaseMenu>;
  uriPath: Scalars['String'];
};

export type TQuery = {
  __typename?: 'Query';
  allFeatureToggles: Array<Scalars['String']>;
  applicationsMenu: TApplicationsMenu;
};

export type TFetchAllMenuFeatureTogglesQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchAllMenuFeatureTogglesQuery = { __typename?: 'Query', allFeatureToggles: Array<string> };

export type TFetchApplicationsMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchApplicationsMenuQuery = { __typename?: 'Query', applicationsMenu: { __typename?: 'ApplicationsMenu', navBar: Array<{ __typename?: 'NavbarMenu', shouldRenderDivider?: boolean | null, key: string, uriPath: string, icon: string, featureToggle?: string | null, menuVisibility?: string | null, permissions: Array<string>, labelAllLocales: Array<{ __typename?: 'LocalizedField', locale: string, value: string }>, dataFences?: Array<{ __typename?: 'DataFence', group: string, name: string, type: string }> | null, actionRights?: Array<{ __typename?: 'ActionRight', group: string, name: string }> | null, submenu: Array<{ __typename?: 'BaseMenu', key: string, uriPath: string, featureToggle?: string | null, menuVisibility?: string | null, permissions: Array<string>, labelAllLocales: Array<{ __typename?: 'LocalizedField', locale: string, value: string }>, actionRights?: Array<{ __typename?: 'ActionRight', group: string, name: string }> | null, dataFences?: Array<{ __typename?: 'DataFence', group: string, name: string, type: string }> | null }> }>, appBar: Array<{ __typename?: 'BaseMenu', key: string, uriPath: string, featureToggle?: string | null, permissions: Array<string>, labelAllLocales: Array<{ __typename?: 'LocalizedField', locale: string, value: string }> }> } };
