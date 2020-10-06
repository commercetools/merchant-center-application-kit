export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  Json: { [key: string]: unknown };
};

export type TApplicationExtension = {
  __typename?: 'ApplicationExtension';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  isActive: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  url: Scalars['String'];
  navbarMenu: Maybe<TNavbarMenu>;
  oAuthScopes: Array<Scalars['String']>;
};

export type TApplicationExtensionDataInput = {
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  url: Scalars['String'];
  oAuthScopes: Maybe<Array<Scalars['String']>>;
  navbarMenu: TApplicationExtensionNavbarMenuDataInput;
};

export type TApplicationExtensionNavbarMenuDataInput = {
  key: Scalars['String'];
  uriPath: Scalars['String'];
  featureToggle: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  permissions: Array<TOAuthScope>;
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  submenu: Array<TApplicationExtensionNavbarSubmenuDataInput>;
};

export type TApplicationExtensionNavbarSubmenuDataInput = {
  key: Scalars['String'];
  uriPath: Scalars['String'];
  featureToggle: Maybe<Scalars['String']>;
  permissions: Array<TOAuthScope>;
  labelAllLocales: Array<TLocalizedFieldDataInput>;
};

export type TApplicationExtensionWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  isActive: Maybe<Scalars['Boolean']>;
  isActive_not: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Scalars['String']>>;
  name_not_in: Maybe<Array<Scalars['String']>>;
  name_lt: Maybe<Scalars['String']>;
  name_lte: Maybe<Scalars['String']>;
  name_gt: Maybe<Scalars['String']>;
  name_gte: Maybe<Scalars['String']>;
  name_contains: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  name_starts_with: Maybe<Scalars['String']>;
  name_not_starts_with: Maybe<Scalars['String']>;
  name_ends_with: Maybe<Scalars['String']>;
  name_not_ends_with: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  description_not: Maybe<Scalars['String']>;
  description_in: Maybe<Array<Scalars['String']>>;
  description_not_in: Maybe<Array<Scalars['String']>>;
  description_lt: Maybe<Scalars['String']>;
  description_lte: Maybe<Scalars['String']>;
  description_gt: Maybe<Scalars['String']>;
  description_gte: Maybe<Scalars['String']>;
  description_contains: Maybe<Scalars['String']>;
  description_not_contains: Maybe<Scalars['String']>;
  description_starts_with: Maybe<Scalars['String']>;
  description_not_starts_with: Maybe<Scalars['String']>;
  description_ends_with: Maybe<Scalars['String']>;
  description_not_ends_with: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  url_not: Maybe<Scalars['String']>;
  url_in: Maybe<Array<Scalars['String']>>;
  url_not_in: Maybe<Array<Scalars['String']>>;
  url_lt: Maybe<Scalars['String']>;
  url_lte: Maybe<Scalars['String']>;
  url_gt: Maybe<Scalars['String']>;
  url_gte: Maybe<Scalars['String']>;
  url_contains: Maybe<Scalars['String']>;
  url_not_contains: Maybe<Scalars['String']>;
  url_starts_with: Maybe<Scalars['String']>;
  url_not_starts_with: Maybe<Scalars['String']>;
  url_ends_with: Maybe<Scalars['String']>;
  url_not_ends_with: Maybe<Scalars['String']>;
  navbarMenu: Maybe<TNavbarMenuWhereInput>;
  AND: Maybe<Array<TApplicationExtensionWhereInput>>;
  OR: Maybe<Array<TApplicationExtensionWhereInput>>;
  NOT: Maybe<Array<TApplicationExtensionWhereInput>>;
};

export enum TAuthPermission {
  LoggedInUser = 'loggedInUser',
  AccessToProject = 'accessToProject',
  ManageMyOrganizations = 'manageMyOrganizations',
  ManageProjectSettings = 'manageProjectSettings',
  ViewProjectSettings = 'viewProjectSettings',
  ViewCustomers = 'viewCustomers',
  ViewSomeDiscounts = 'viewSomeDiscounts',
  ViewProductDiscounts = 'viewProductDiscounts',
  ViewCartDiscounts = 'viewCartDiscounts',
  ViewDiscountCodes = 'viewDiscountCodes',
  ViewOrders = 'viewOrders',
  ViewProducts = 'viewProducts'
}

export type TAverageOrderValueConfiguration = {
  __typename?: 'AverageOrderValueConfiguration';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TAverageOrderValueConfigurationInput = {
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TAverageOrderValueConfigurationWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  showPreviousTimeframe: Maybe<Scalars['Boolean']>;
  showPreviousTimeframe_not: Maybe<Scalars['Boolean']>;
  AND: Maybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  OR: Maybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  NOT: Maybe<Array<TAverageOrderValueConfigurationWhereInput>>;
};

export enum TBestSellingLimit {
  Five = 'FIVE',
  Ten = 'TEN',
  Fifteen = 'FIFTEEN'
}

export type TCartDiscountsListView = {
  __typename?: 'CartDiscountsListView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  visibleColumns: Array<Scalars['String']>;
};

export type TCartDiscountsListViewInput = {
  visibleColumns: Array<Scalars['String']>;
};

export enum TCategoryRecommendationSearchProperty {
  Attribute = 'Attribute',
  MachineLearning = 'MachineLearning',
  ProductType = 'ProductType'
}

export type TCategoryRecommendationSettings = {
  __typename?: 'CategoryRecommendationSettings';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  searchProperty: TCategoryRecommendationSearchProperty;
  attributeName: Maybe<Scalars['String']>;
};

export type TCategoryRecommendationSettingsDataInput = {
  searchProperty: TCategoryRecommendationSearchProperty;
  attributeName: Maybe<Scalars['String']>;
};

export type TCategoryRecommendationSettingsWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  searchProperty: Maybe<TCategoryRecommendationSearchProperty>;
  searchProperty_not: Maybe<TCategoryRecommendationSearchProperty>;
  searchProperty_in: Maybe<Array<TCategoryRecommendationSearchProperty>>;
  searchProperty_not_in: Maybe<Array<TCategoryRecommendationSearchProperty>>;
  attributeName: Maybe<Scalars['String']>;
  attributeName_not: Maybe<Scalars['String']>;
  attributeName_in: Maybe<Array<Scalars['String']>>;
  attributeName_not_in: Maybe<Array<Scalars['String']>>;
  attributeName_lt: Maybe<Scalars['String']>;
  attributeName_lte: Maybe<Scalars['String']>;
  attributeName_gt: Maybe<Scalars['String']>;
  attributeName_gte: Maybe<Scalars['String']>;
  attributeName_contains: Maybe<Scalars['String']>;
  attributeName_not_contains: Maybe<Scalars['String']>;
  attributeName_starts_with: Maybe<Scalars['String']>;
  attributeName_not_starts_with: Maybe<Scalars['String']>;
  attributeName_ends_with: Maybe<Scalars['String']>;
  attributeName_not_ends_with: Maybe<Scalars['String']>;
  AND: Maybe<Array<TCategoryRecommendationSettingsWhereInput>>;
  OR: Maybe<Array<TCategoryRecommendationSettingsWhereInput>>;
  NOT: Maybe<Array<TCategoryRecommendationSettingsWhereInput>>;
};

export type TCustomApplication = {
  __typename?: 'CustomApplication';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  owner: TOrganizationExtension;
  installedBy: Maybe<Array<TCustomApplicationInstallation>>;
  status: Maybe<TCustomApplicationStatus>;
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  url: Scalars['String'];
  entryPointUriPath: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
  menuLinks: Maybe<TCustomApplicationMenuLink>;
  contacts: Maybe<Array<TCustomApplicationContactPerson>>;
};


export type TCustomApplication_InstalledByArgs = {
  where: Maybe<TCustomApplicationInstallationWhereInput>;
  orderBy: Maybe<TCustomApplicationInstallationOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type TCustomApplication_ContactsArgs = {
  where: Maybe<TCustomApplicationContactPersonWhereInput>;
  orderBy: Maybe<TCustomApplicationContactPersonOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TCustomApplicationContactPerson = {
  __typename?: 'CustomApplicationContactPerson';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  maintainerOf: Maybe<Array<TCustomApplication>>;
};


export type TCustomApplicationContactPerson_MaintainerOfArgs = {
  where: Maybe<TCustomApplicationWhereInput>;
  orderBy: Maybe<TCustomApplicationOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TCustomApplicationContactPersonDataInput = {
  email: Scalars['String'];
};

export enum TCustomApplicationContactPersonOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC'
}

export type TCustomApplicationContactPersonWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  email: Maybe<Scalars['String']>;
  email_not: Maybe<Scalars['String']>;
  email_in: Maybe<Array<Scalars['String']>>;
  email_not_in: Maybe<Array<Scalars['String']>>;
  email_lt: Maybe<Scalars['String']>;
  email_lte: Maybe<Scalars['String']>;
  email_gt: Maybe<Scalars['String']>;
  email_gte: Maybe<Scalars['String']>;
  email_contains: Maybe<Scalars['String']>;
  email_not_contains: Maybe<Scalars['String']>;
  email_starts_with: Maybe<Scalars['String']>;
  email_not_starts_with: Maybe<Scalars['String']>;
  email_ends_with: Maybe<Scalars['String']>;
  email_not_ends_with: Maybe<Scalars['String']>;
  maintainerOf_every: Maybe<TCustomApplicationWhereInput>;
  maintainerOf_some: Maybe<TCustomApplicationWhereInput>;
  maintainerOf_none: Maybe<TCustomApplicationWhereInput>;
  AND: Maybe<Array<TCustomApplicationContactPersonWhereInput>>;
  OR: Maybe<Array<TCustomApplicationContactPersonWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationContactPersonWhereInput>>;
};

export type TCustomApplicationDraftDataInput = {
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  url: Scalars['String'];
  entryPointUriPath: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
  contacts: Array<TCustomApplicationContactPersonDataInput>;
  menuLinks: TCustomApplicationMenuLinksDraftDataInput;
};

export type TCustomApplicationInstallation = {
  __typename?: 'CustomApplicationInstallation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  organization: TOrganizationExtension;
  application: TCustomApplication;
  installInAllProjects: Scalars['Boolean'];
  projects: Maybe<Array<TProjectExtension>>;
};


export type TCustomApplicationInstallation_ProjectsArgs = {
  where: Maybe<TProjectExtensionWhereInput>;
  orderBy: Maybe<TProjectExtensionOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum TCustomApplicationInstallationOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  InstallInAllProjectsAsc = 'installInAllProjects_ASC',
  InstallInAllProjectsDesc = 'installInAllProjects_DESC'
}

export type TCustomApplicationInstallationWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  organization: Maybe<TOrganizationExtensionWhereInput>;
  application: Maybe<TCustomApplicationWhereInput>;
  installInAllProjects: Maybe<Scalars['Boolean']>;
  installInAllProjects_not: Maybe<Scalars['Boolean']>;
  projects_every: Maybe<TProjectExtensionWhereInput>;
  projects_some: Maybe<TProjectExtensionWhereInput>;
  projects_none: Maybe<TProjectExtensionWhereInput>;
  AND: Maybe<Array<TCustomApplicationInstallationWhereInput>>;
  OR: Maybe<Array<TCustomApplicationInstallationWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationInstallationWhereInput>>;
};

export type TCustomApplicationMenuLink = {
  __typename?: 'CustomApplicationMenuLink';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  labelAllLocales: Maybe<Array<TLocalizedField>>;
  defaultLabel: Scalars['String'];
  permissions: Array<Scalars['String']>;
  iconName: Scalars['String'];
  submenuLinks: Maybe<Array<TCustomApplicationSubmenuLink>>;
};


export type TCustomApplicationMenuLink_LabelAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type TCustomApplicationMenuLink_SubmenuLinksArgs = {
  where: Maybe<TCustomApplicationSubmenuLinkWhereInput>;
  orderBy: Maybe<TCustomApplicationSubmenuLinkOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TCustomApplicationMenuLinksDraftDataInput = {
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  defaultLabel: Scalars['String'];
  iconName: Scalars['String'];
  permissions: Array<Scalars['String']>;
  submenuLinks: Array<TCustomApplicationSubmenuLinksDraftDataInput>;
};

export type TCustomApplicationMenuLinkWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  labelAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  defaultLabel: Maybe<Scalars['String']>;
  defaultLabel_not: Maybe<Scalars['String']>;
  defaultLabel_in: Maybe<Array<Scalars['String']>>;
  defaultLabel_not_in: Maybe<Array<Scalars['String']>>;
  defaultLabel_lt: Maybe<Scalars['String']>;
  defaultLabel_lte: Maybe<Scalars['String']>;
  defaultLabel_gt: Maybe<Scalars['String']>;
  defaultLabel_gte: Maybe<Scalars['String']>;
  defaultLabel_contains: Maybe<Scalars['String']>;
  defaultLabel_not_contains: Maybe<Scalars['String']>;
  defaultLabel_starts_with: Maybe<Scalars['String']>;
  defaultLabel_not_starts_with: Maybe<Scalars['String']>;
  defaultLabel_ends_with: Maybe<Scalars['String']>;
  defaultLabel_not_ends_with: Maybe<Scalars['String']>;
  iconName: Maybe<Scalars['String']>;
  iconName_not: Maybe<Scalars['String']>;
  iconName_in: Maybe<Array<Scalars['String']>>;
  iconName_not_in: Maybe<Array<Scalars['String']>>;
  iconName_lt: Maybe<Scalars['String']>;
  iconName_lte: Maybe<Scalars['String']>;
  iconName_gt: Maybe<Scalars['String']>;
  iconName_gte: Maybe<Scalars['String']>;
  iconName_contains: Maybe<Scalars['String']>;
  iconName_not_contains: Maybe<Scalars['String']>;
  iconName_starts_with: Maybe<Scalars['String']>;
  iconName_not_starts_with: Maybe<Scalars['String']>;
  iconName_ends_with: Maybe<Scalars['String']>;
  iconName_not_ends_with: Maybe<Scalars['String']>;
  submenuLinks_every: Maybe<TCustomApplicationSubmenuLinkWhereInput>;
  submenuLinks_some: Maybe<TCustomApplicationSubmenuLinkWhereInput>;
  submenuLinks_none: Maybe<TCustomApplicationSubmenuLinkWhereInput>;
  AND: Maybe<Array<TCustomApplicationMenuLinkWhereInput>>;
  OR: Maybe<Array<TCustomApplicationMenuLinkWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationMenuLinkWhereInput>>;
};

export enum TCustomApplicationOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  EntryPointUriPathAsc = 'entryPointUriPath_ASC',
  EntryPointUriPathDesc = 'entryPointUriPath_DESC'
}

export enum TCustomApplicationStatus {
  Draft = 'DRAFT',
  PrivateUsage = 'PRIVATE_USAGE'
}

export type TCustomApplicationSubmenuLink = {
  __typename?: 'CustomApplicationSubmenuLink';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  uriPath: Scalars['String'];
  labelAllLocales: Maybe<Array<TLocalizedField>>;
  defaultLabel: Scalars['String'];
  permissions: Array<Scalars['String']>;
};


export type TCustomApplicationSubmenuLink_LabelAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum TCustomApplicationSubmenuLinkOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UriPathAsc = 'uriPath_ASC',
  UriPathDesc = 'uriPath_DESC',
  DefaultLabelAsc = 'defaultLabel_ASC',
  DefaultLabelDesc = 'defaultLabel_DESC'
}

export type TCustomApplicationSubmenuLinksDraftDataInput = {
  uriPath: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  defaultLabel: Scalars['String'];
  permissions: Array<Scalars['String']>;
};

export type TCustomApplicationSubmenuLinkWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  uriPath: Maybe<Scalars['String']>;
  uriPath_not: Maybe<Scalars['String']>;
  uriPath_in: Maybe<Array<Scalars['String']>>;
  uriPath_not_in: Maybe<Array<Scalars['String']>>;
  uriPath_lt: Maybe<Scalars['String']>;
  uriPath_lte: Maybe<Scalars['String']>;
  uriPath_gt: Maybe<Scalars['String']>;
  uriPath_gte: Maybe<Scalars['String']>;
  uriPath_contains: Maybe<Scalars['String']>;
  uriPath_not_contains: Maybe<Scalars['String']>;
  uriPath_starts_with: Maybe<Scalars['String']>;
  uriPath_not_starts_with: Maybe<Scalars['String']>;
  uriPath_ends_with: Maybe<Scalars['String']>;
  uriPath_not_ends_with: Maybe<Scalars['String']>;
  labelAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  defaultLabel: Maybe<Scalars['String']>;
  defaultLabel_not: Maybe<Scalars['String']>;
  defaultLabel_in: Maybe<Array<Scalars['String']>>;
  defaultLabel_not_in: Maybe<Array<Scalars['String']>>;
  defaultLabel_lt: Maybe<Scalars['String']>;
  defaultLabel_lte: Maybe<Scalars['String']>;
  defaultLabel_gt: Maybe<Scalars['String']>;
  defaultLabel_gte: Maybe<Scalars['String']>;
  defaultLabel_contains: Maybe<Scalars['String']>;
  defaultLabel_not_contains: Maybe<Scalars['String']>;
  defaultLabel_starts_with: Maybe<Scalars['String']>;
  defaultLabel_not_starts_with: Maybe<Scalars['String']>;
  defaultLabel_ends_with: Maybe<Scalars['String']>;
  defaultLabel_not_ends_with: Maybe<Scalars['String']>;
  AND: Maybe<Array<TCustomApplicationSubmenuLinkWhereInput>>;
  OR: Maybe<Array<TCustomApplicationSubmenuLinkWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationSubmenuLinkWhereInput>>;
};

export type TCustomApplicationWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  owner: Maybe<TOrganizationExtensionWhereInput>;
  installedBy_every: Maybe<TCustomApplicationInstallationWhereInput>;
  installedBy_some: Maybe<TCustomApplicationInstallationWhereInput>;
  installedBy_none: Maybe<TCustomApplicationInstallationWhereInput>;
  status: Maybe<TCustomApplicationStatus>;
  status_not: Maybe<TCustomApplicationStatus>;
  status_in: Maybe<Array<TCustomApplicationStatus>>;
  status_not_in: Maybe<Array<TCustomApplicationStatus>>;
  name: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Scalars['String']>>;
  name_not_in: Maybe<Array<Scalars['String']>>;
  name_lt: Maybe<Scalars['String']>;
  name_lte: Maybe<Scalars['String']>;
  name_gt: Maybe<Scalars['String']>;
  name_gte: Maybe<Scalars['String']>;
  name_contains: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  name_starts_with: Maybe<Scalars['String']>;
  name_not_starts_with: Maybe<Scalars['String']>;
  name_ends_with: Maybe<Scalars['String']>;
  name_not_ends_with: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  description_not: Maybe<Scalars['String']>;
  description_in: Maybe<Array<Scalars['String']>>;
  description_not_in: Maybe<Array<Scalars['String']>>;
  description_lt: Maybe<Scalars['String']>;
  description_lte: Maybe<Scalars['String']>;
  description_gt: Maybe<Scalars['String']>;
  description_gte: Maybe<Scalars['String']>;
  description_contains: Maybe<Scalars['String']>;
  description_not_contains: Maybe<Scalars['String']>;
  description_starts_with: Maybe<Scalars['String']>;
  description_not_starts_with: Maybe<Scalars['String']>;
  description_ends_with: Maybe<Scalars['String']>;
  description_not_ends_with: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  url_not: Maybe<Scalars['String']>;
  url_in: Maybe<Array<Scalars['String']>>;
  url_not_in: Maybe<Array<Scalars['String']>>;
  url_lt: Maybe<Scalars['String']>;
  url_lte: Maybe<Scalars['String']>;
  url_gt: Maybe<Scalars['String']>;
  url_gte: Maybe<Scalars['String']>;
  url_contains: Maybe<Scalars['String']>;
  url_not_contains: Maybe<Scalars['String']>;
  url_starts_with: Maybe<Scalars['String']>;
  url_not_starts_with: Maybe<Scalars['String']>;
  url_ends_with: Maybe<Scalars['String']>;
  url_not_ends_with: Maybe<Scalars['String']>;
  entryPointUriPath: Maybe<Scalars['String']>;
  entryPointUriPath_not: Maybe<Scalars['String']>;
  entryPointUriPath_in: Maybe<Array<Scalars['String']>>;
  entryPointUriPath_not_in: Maybe<Array<Scalars['String']>>;
  entryPointUriPath_lt: Maybe<Scalars['String']>;
  entryPointUriPath_lte: Maybe<Scalars['String']>;
  entryPointUriPath_gt: Maybe<Scalars['String']>;
  entryPointUriPath_gte: Maybe<Scalars['String']>;
  entryPointUriPath_contains: Maybe<Scalars['String']>;
  entryPointUriPath_not_contains: Maybe<Scalars['String']>;
  entryPointUriPath_starts_with: Maybe<Scalars['String']>;
  entryPointUriPath_not_starts_with: Maybe<Scalars['String']>;
  entryPointUriPath_ends_with: Maybe<Scalars['String']>;
  entryPointUriPath_not_ends_with: Maybe<Scalars['String']>;
  menuLinks: Maybe<TCustomApplicationMenuLinkWhereInput>;
  contacts_every: Maybe<TCustomApplicationContactPersonWhereInput>;
  contacts_some: Maybe<TCustomApplicationContactPersonWhereInput>;
  contacts_none: Maybe<TCustomApplicationContactPersonWhereInput>;
  AND: Maybe<Array<TCustomApplicationWhereInput>>;
  OR: Maybe<Array<TCustomApplicationWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationWhereInput>>;
};

export type TCustomersListView = {
  __typename?: 'CustomersListView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  isActive: Maybe<Scalars['Boolean']>;
  search: Maybe<Scalars['String']>;
  table: Maybe<TTable>;
  sort: Maybe<TSort>;
  filters: Maybe<Array<TFilterValues>>;
};


export type TCustomersListView_NameAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type TCustomersListView_FiltersArgs = {
  where: Maybe<TFilterValuesWhereInput>;
  orderBy: Maybe<TFilterValuesOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TCustomersListViewInput = {
  search: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  table: Maybe<TCustomersListViewTableInput>;
  sort: TSortCreateInput;
  filters: Array<TFilterValuesCreateInput>;
};

export type TCustomersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TDashboardView = {
  __typename?: 'DashboardView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  isActive: Scalars['Boolean'];
  layout: Maybe<Array<TLayoutCard>>;
};


export type TDashboardView_NameAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type TDashboardView_LayoutArgs = {
  where: Maybe<TLayoutCardWhereInput>;
  orderBy: Maybe<TLayoutCardOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TDashboardViewInput = {
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  layout: Array<TLayoutCardInput>;
};


export type TDiscountCodesListView = {
  __typename?: 'DiscountCodesListView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  visibleColumns: Array<Scalars['String']>;
};

export type TDiscountCodesListViewInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TDiscountsCustomView = {
  __typename?: 'DiscountsCustomView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  isActive: Maybe<Scalars['Boolean']>;
  type: TDiscountType;
  search: Maybe<Scalars['String']>;
  table: Maybe<TTable>;
  sort: Maybe<TSort>;
  filters: Maybe<Array<TFilterValues>>;
};


export type TDiscountsCustomView_NameAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type TDiscountsCustomView_FiltersArgs = {
  where: Maybe<TFilterValuesWhereInput>;
  orderBy: Maybe<TFilterValuesOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TDiscountsCustomViewInput = {
  search: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  table: Maybe<TOrdersListViewTableInput>;
  sort: TSortCreateInput;
  filters: Array<TFilterValuesCreateInput>;
};

export enum TDiscountType {
  ProductDiscount = 'ProductDiscount',
  CartDiscount = 'CartDiscount',
  DiscountCode = 'DiscountCode'
}

export enum TExistence {
  All = 'All',
  Filled = 'Filled',
  Empty = 'Empty'
}

export enum TFilterType {
  EqualTo = 'EqualTo',
  In = 'In',
  LessThan = 'LessThan',
  Missing = 'Missing',
  MissingIn = 'MissingIn',
  MoreThan = 'MoreThan',
  Range = 'Range',
  CustomField = 'CustomField'
}

export type TFilterValues = {
  __typename?: 'FilterValues';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  target: Scalars['String'];
  type: TFilterType;
  json: Scalars['Json'];
};

export type TFilterValuesCreateInput = {
  id: Maybe<Scalars['ID']>;
  target: Scalars['String'];
  type: TFilterType;
  json: Scalars['Json'];
};

export enum TFilterValuesOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  TargetAsc = 'target_ASC',
  TargetDesc = 'target_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  JsonAsc = 'json_ASC',
  JsonDesc = 'json_DESC'
}

export type TFilterValuesWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  target: Maybe<Scalars['String']>;
  target_not: Maybe<Scalars['String']>;
  target_in: Maybe<Array<Scalars['String']>>;
  target_not_in: Maybe<Array<Scalars['String']>>;
  target_lt: Maybe<Scalars['String']>;
  target_lte: Maybe<Scalars['String']>;
  target_gt: Maybe<Scalars['String']>;
  target_gte: Maybe<Scalars['String']>;
  target_contains: Maybe<Scalars['String']>;
  target_not_contains: Maybe<Scalars['String']>;
  target_starts_with: Maybe<Scalars['String']>;
  target_not_starts_with: Maybe<Scalars['String']>;
  target_ends_with: Maybe<Scalars['String']>;
  target_not_ends_with: Maybe<Scalars['String']>;
  type: Maybe<TFilterType>;
  type_not: Maybe<TFilterType>;
  type_in: Maybe<Array<TFilterType>>;
  type_not_in: Maybe<Array<TFilterType>>;
  AND: Maybe<Array<TFilterValuesWhereInput>>;
  OR: Maybe<Array<TFilterValuesWhereInput>>;
  NOT: Maybe<Array<TFilterValuesWhereInput>>;
};

export type TImageRegex = {
  __typename?: 'ImageRegex';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  small: Maybe<TImageRegexOptions>;
  thumb: Maybe<TImageRegexOptions>;
};

export type TImageRegexDataInput = {
  small: Maybe<TImageRegexOptionsInput>;
  thumb: Maybe<TImageRegexOptionsInput>;
};

export type TImageRegexOptions = {
  __typename?: 'ImageRegexOptions';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  flag: Scalars['String'];
  search: Scalars['String'];
  replace: Scalars['String'];
};

export type TImageRegexOptionsInput = {
  flag: Scalars['String'];
  search: Scalars['String'];
  replace: Scalars['String'];
};

export type TImageRegexOptionsWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  flag: Maybe<Scalars['String']>;
  flag_not: Maybe<Scalars['String']>;
  flag_in: Maybe<Array<Scalars['String']>>;
  flag_not_in: Maybe<Array<Scalars['String']>>;
  flag_lt: Maybe<Scalars['String']>;
  flag_lte: Maybe<Scalars['String']>;
  flag_gt: Maybe<Scalars['String']>;
  flag_gte: Maybe<Scalars['String']>;
  flag_contains: Maybe<Scalars['String']>;
  flag_not_contains: Maybe<Scalars['String']>;
  flag_starts_with: Maybe<Scalars['String']>;
  flag_not_starts_with: Maybe<Scalars['String']>;
  flag_ends_with: Maybe<Scalars['String']>;
  flag_not_ends_with: Maybe<Scalars['String']>;
  search: Maybe<Scalars['String']>;
  search_not: Maybe<Scalars['String']>;
  search_in: Maybe<Array<Scalars['String']>>;
  search_not_in: Maybe<Array<Scalars['String']>>;
  search_lt: Maybe<Scalars['String']>;
  search_lte: Maybe<Scalars['String']>;
  search_gt: Maybe<Scalars['String']>;
  search_gte: Maybe<Scalars['String']>;
  search_contains: Maybe<Scalars['String']>;
  search_not_contains: Maybe<Scalars['String']>;
  search_starts_with: Maybe<Scalars['String']>;
  search_not_starts_with: Maybe<Scalars['String']>;
  search_ends_with: Maybe<Scalars['String']>;
  search_not_ends_with: Maybe<Scalars['String']>;
  replace: Maybe<Scalars['String']>;
  replace_not: Maybe<Scalars['String']>;
  replace_in: Maybe<Array<Scalars['String']>>;
  replace_not_in: Maybe<Array<Scalars['String']>>;
  replace_lt: Maybe<Scalars['String']>;
  replace_lte: Maybe<Scalars['String']>;
  replace_gt: Maybe<Scalars['String']>;
  replace_gte: Maybe<Scalars['String']>;
  replace_contains: Maybe<Scalars['String']>;
  replace_not_contains: Maybe<Scalars['String']>;
  replace_starts_with: Maybe<Scalars['String']>;
  replace_not_starts_with: Maybe<Scalars['String']>;
  replace_ends_with: Maybe<Scalars['String']>;
  replace_not_ends_with: Maybe<Scalars['String']>;
  AND: Maybe<Array<TImageRegexOptionsWhereInput>>;
  OR: Maybe<Array<TImageRegexOptionsWhereInput>>;
  NOT: Maybe<Array<TImageRegexOptionsWhereInput>>;
};

export type TImageRegexWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  small: Maybe<TImageRegexOptionsWhereInput>;
  thumb: Maybe<TImageRegexOptionsWhereInput>;
  AND: Maybe<Array<TImageRegexWhereInput>>;
  OR: Maybe<Array<TImageRegexWhereInput>>;
  NOT: Maybe<Array<TImageRegexWhereInput>>;
};


export type TLayoutCard = {
  __typename?: 'LayoutCard';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  key: TMetricCardType;
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  height: Scalars['Int'];
  width: Scalars['Int'];
  minHeight: Maybe<Scalars['Int']>;
  minWidth: Maybe<Scalars['Int']>;
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
  topProductsConfiguration: Maybe<TTopProductsConfiguration>;
  salesPerformanceConfiguration: Maybe<TSalesPerformanceConfiguration>;
  totalSalesConfiguration: Maybe<TTotalSalesConfiguration>;
  averageOrderValueConfiguration: Maybe<TAverageOrderValueConfiguration>;
  resourcesNumbersConfiguration: Maybe<TResourcesNumbersConfiguration>;
};


export type TLayoutCard_NameAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TLayoutCardInput = {
  key: TMetricCardType;
  nameAllLocales: Maybe<Array<TLocalizedFieldCreateInput>>;
  height: Scalars['Int'];
  width: Scalars['Int'];
  minHeight: Maybe<Scalars['Int']>;
  minWidth: Maybe<Scalars['Int']>;
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
  topProductsConfiguration: Maybe<TTopProductsConfigurationInput>;
  salesPerformanceConfiguration: Maybe<TSalesPerformanceConfigurationInput>;
  totalSalesConfiguration: Maybe<TTotalSalesConfigurationInput>;
  averageOrderValueConfiguration: Maybe<TAverageOrderValueConfigurationInput>;
  resourcesNumbersConfiguration: Maybe<TResourcesNumbersConfigurationInput>;
};

export enum TLayoutCardOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  MinHeightAsc = 'minHeight_ASC',
  MinHeightDesc = 'minHeight_DESC',
  MinWidthAsc = 'minWidth_ASC',
  MinWidthDesc = 'minWidth_DESC',
  XPositionAsc = 'xPosition_ASC',
  XPositionDesc = 'xPosition_DESC',
  YPositionAsc = 'yPosition_ASC',
  YPositionDesc = 'yPosition_DESC'
}

export type TLayoutCardWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  key: Maybe<TMetricCardType>;
  key_not: Maybe<TMetricCardType>;
  key_in: Maybe<Array<TMetricCardType>>;
  key_not_in: Maybe<Array<TMetricCardType>>;
  nameAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  nameAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  nameAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  height: Maybe<Scalars['Int']>;
  height_not: Maybe<Scalars['Int']>;
  height_in: Maybe<Array<Scalars['Int']>>;
  height_not_in: Maybe<Array<Scalars['Int']>>;
  height_lt: Maybe<Scalars['Int']>;
  height_lte: Maybe<Scalars['Int']>;
  height_gt: Maybe<Scalars['Int']>;
  height_gte: Maybe<Scalars['Int']>;
  width: Maybe<Scalars['Int']>;
  width_not: Maybe<Scalars['Int']>;
  width_in: Maybe<Array<Scalars['Int']>>;
  width_not_in: Maybe<Array<Scalars['Int']>>;
  width_lt: Maybe<Scalars['Int']>;
  width_lte: Maybe<Scalars['Int']>;
  width_gt: Maybe<Scalars['Int']>;
  width_gte: Maybe<Scalars['Int']>;
  minHeight: Maybe<Scalars['Int']>;
  minHeight_not: Maybe<Scalars['Int']>;
  minHeight_in: Maybe<Array<Scalars['Int']>>;
  minHeight_not_in: Maybe<Array<Scalars['Int']>>;
  minHeight_lt: Maybe<Scalars['Int']>;
  minHeight_lte: Maybe<Scalars['Int']>;
  minHeight_gt: Maybe<Scalars['Int']>;
  minHeight_gte: Maybe<Scalars['Int']>;
  minWidth: Maybe<Scalars['Int']>;
  minWidth_not: Maybe<Scalars['Int']>;
  minWidth_in: Maybe<Array<Scalars['Int']>>;
  minWidth_not_in: Maybe<Array<Scalars['Int']>>;
  minWidth_lt: Maybe<Scalars['Int']>;
  minWidth_lte: Maybe<Scalars['Int']>;
  minWidth_gt: Maybe<Scalars['Int']>;
  minWidth_gte: Maybe<Scalars['Int']>;
  xPosition: Maybe<Scalars['Int']>;
  xPosition_not: Maybe<Scalars['Int']>;
  xPosition_in: Maybe<Array<Scalars['Int']>>;
  xPosition_not_in: Maybe<Array<Scalars['Int']>>;
  xPosition_lt: Maybe<Scalars['Int']>;
  xPosition_lte: Maybe<Scalars['Int']>;
  xPosition_gt: Maybe<Scalars['Int']>;
  xPosition_gte: Maybe<Scalars['Int']>;
  yPosition: Maybe<Scalars['Int']>;
  yPosition_not: Maybe<Scalars['Int']>;
  yPosition_in: Maybe<Array<Scalars['Int']>>;
  yPosition_not_in: Maybe<Array<Scalars['Int']>>;
  yPosition_lt: Maybe<Scalars['Int']>;
  yPosition_lte: Maybe<Scalars['Int']>;
  yPosition_gt: Maybe<Scalars['Int']>;
  yPosition_gte: Maybe<Scalars['Int']>;
  topProductsConfiguration: Maybe<TTopProductsConfigurationWhereInput>;
  salesPerformanceConfiguration: Maybe<TSalesPerformanceConfigurationWhereInput>;
  totalSalesConfiguration: Maybe<TTotalSalesConfigurationWhereInput>;
  averageOrderValueConfiguration: Maybe<TAverageOrderValueConfigurationWhereInput>;
  resourcesNumbersConfiguration: Maybe<TResourcesNumbersConfigurationWhereInput>;
  AND: Maybe<Array<TLayoutCardWhereInput>>;
  OR: Maybe<Array<TLayoutCardWhereInput>>;
  NOT: Maybe<Array<TLayoutCardWhereInput>>;
};

export type TLocalizedField = {
  __typename?: 'LocalizedField';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  locale: Scalars['String'];
  value: Scalars['String'];
};

export type TLocalizedFieldCreateInput = {
  id: Maybe<Scalars['ID']>;
  locale: Scalars['String'];
  value: Scalars['String'];
};

export type TLocalizedFieldDataInput = {
  locale: Scalars['String'];
  value: Scalars['String'];
};

export enum TLocalizedFieldOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  LocaleAsc = 'locale_ASC',
  LocaleDesc = 'locale_DESC',
  ValueAsc = 'value_ASC',
  ValueDesc = 'value_DESC'
}

export type TLocalizedFieldWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  locale: Maybe<Scalars['String']>;
  locale_not: Maybe<Scalars['String']>;
  locale_in: Maybe<Array<Scalars['String']>>;
  locale_not_in: Maybe<Array<Scalars['String']>>;
  locale_lt: Maybe<Scalars['String']>;
  locale_lte: Maybe<Scalars['String']>;
  locale_gt: Maybe<Scalars['String']>;
  locale_gte: Maybe<Scalars['String']>;
  locale_contains: Maybe<Scalars['String']>;
  locale_not_contains: Maybe<Scalars['String']>;
  locale_starts_with: Maybe<Scalars['String']>;
  locale_not_starts_with: Maybe<Scalars['String']>;
  locale_ends_with: Maybe<Scalars['String']>;
  locale_not_ends_with: Maybe<Scalars['String']>;
  value: Maybe<Scalars['String']>;
  value_not: Maybe<Scalars['String']>;
  value_in: Maybe<Array<Scalars['String']>>;
  value_not_in: Maybe<Array<Scalars['String']>>;
  value_lt: Maybe<Scalars['String']>;
  value_lte: Maybe<Scalars['String']>;
  value_gt: Maybe<Scalars['String']>;
  value_gte: Maybe<Scalars['String']>;
  value_contains: Maybe<Scalars['String']>;
  value_not_contains: Maybe<Scalars['String']>;
  value_starts_with: Maybe<Scalars['String']>;
  value_not_starts_with: Maybe<Scalars['String']>;
  value_ends_with: Maybe<Scalars['String']>;
  value_not_ends_with: Maybe<Scalars['String']>;
  AND: Maybe<Array<TLocalizedFieldWhereInput>>;
  OR: Maybe<Array<TLocalizedFieldWhereInput>>;
  NOT: Maybe<Array<TLocalizedFieldWhereInput>>;
};

export enum TMetricCardType {
  SalesPerformance = 'SALES_PERFORMANCE',
  TotalSales = 'TOTAL_SALES',
  AverageOrderValue = 'AVERAGE_ORDER_VALUE',
  ResourcesNumbers = 'RESOURCES_NUMBERS',
  ProductTopVariants = 'PRODUCT_TOP_VARIANTS'
}

export type TMutation = {
  __typename?: 'Mutation';
  createProjectExtensionApplication: Maybe<TProjectExtension>;
  updateProjectExtensionApplication: Maybe<TProjectExtension>;
  deleteProjectExtensionApplication: Maybe<TProjectExtension>;
  activateProjectExtensionApplication: Maybe<TProjectExtension>;
  deactivateProjectExtensionApplication: Maybe<TProjectExtension>;
  setProjectExtensionImageRegex: Maybe<TProjectExtension>;
  setProjectExtensionCategoryRecommendation: Maybe<TProjectExtension>;
  setProjectExtensionOrderStatesVisibility: Maybe<TProjectExtension>;
  createCustomApplication: Maybe<TCustomApplication>;
  updateCustomApplication: Maybe<TCustomApplication>;
  changeCustomApplicationStatus: Maybe<TCustomApplication>;
  deleteCustomApplication: Maybe<TCustomApplication>;
  installCustomApplication: Maybe<TCustomApplicationInstallation>;
  updateCustomApplicationProjectsInstallation: Maybe<TCustomApplicationInstallation>;
  setOrganizationExtensionOidcSsoConfig: Maybe<TOrganizationExtension>;
  activateOrganizationExtensionOidcSsoConfig: Maybe<TOrganizationExtension>;
  deactivateOrganizationExtensionOidcSsoConfig: Maybe<TOrganizationExtension>;
  createOrdersListView: TOrdersListView;
  updateOrdersListView: Maybe<TOrdersListView>;
  deleteOrdersListView: Maybe<TOrdersListView>;
  activateOrdersListView: Maybe<TOrdersListView>;
  deactivateOrdersListView: Maybe<TOrdersListView>;
  createCartDiscountsCustomView: TDiscountsCustomView;
  updateCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  deleteCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  activateCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  deactivateCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  createProductDiscountsCustomView: TDiscountsCustomView;
  updateProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  deleteProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  activateProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  deactivateProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  createDiscountCodesCustomView: TDiscountsCustomView;
  updateDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  deleteDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  activateDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  deactivateDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  createPimSearchListView: TPimSearchListView;
  updatePimSearchListView: Maybe<TPimSearchListView>;
  deletePimSearchListView: Maybe<TPimSearchListView>;
  activatePimSearchListView: Maybe<TPimSearchListView>;
  deactivatePimSearchListView: Maybe<TPimSearchListView>;
  createProductTypeAttributesView: TProductTypeAttributesView;
  updateProductTypeAttributesView: TProductTypeAttributesView;
  deleteProductTypeAttributesView: Maybe<TProductTypeAttributesView>;
  activateProductTypeAttributesView: Maybe<TProductTypeAttributesView>;
  deactivateProductTypeAttributesView: Maybe<TProductTypeAttributesView>;
  updateVariantPricesListView: Maybe<TVariantPricesListView>;
  createVariantPricesListView: Maybe<TVariantPricesListView>;
  createCustomersListView: TCustomersListView;
  updateCustomersListView: Maybe<TCustomersListView>;
  deleteCustomersListView: Maybe<TCustomersListView>;
  activateCustomersListView: Maybe<TCustomersListView>;
  deactivateCustomersListView: Maybe<TOrdersListView>;
  updateRuleBuilderQuickSelectionValues: Maybe<TRuleBuilderQuickSelectionValues>;
  createCartDiscountsListView: Maybe<TCartDiscountsListView>;
  updateCartDiscountsListView: Maybe<TCartDiscountsListView>;
  createProductDiscountsListView: Maybe<TProductDiscountsListView>;
  updateProductDiscountsListView: Maybe<TProductDiscountsListView>;
  createDiscountCodesListView: Maybe<TDiscountCodesListView>;
  updateDiscountCodesListView: Maybe<TDiscountCodesListView>;
  createDashboardView: TDashboardView;
  updateDashboardView: Maybe<TDashboardView>;
  deleteDashboardView: Maybe<TDashboardView>;
  activateDashboardView: Maybe<TDashboardView>;
  deactivateDashboardView: Maybe<TDashboardView>;
};


export type TMutation_CreateProjectExtensionApplicationArgs = {
  data: TApplicationExtensionDataInput;
};


export type TMutation_UpdateProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID'];
  data: TApplicationExtensionDataInput;
};


export type TMutation_DeleteProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID'];
};


export type TMutation_ActivateProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID'];
};


export type TMutation_DeactivateProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID'];
};


export type TMutation_SetProjectExtensionImageRegexArgs = {
  data: Maybe<TImageRegexDataInput>;
};


export type TMutation_SetProjectExtensionCategoryRecommendationArgs = {
  data: Maybe<TCategoryRecommendationSettingsDataInput>;
};


export type TMutation_SetProjectExtensionOrderStatesVisibilityArgs = {
  data: Maybe<Array<Maybe<TOrderStatesVisibility>>>;
};


export type TMutation_CreateCustomApplicationArgs = {
  organizationId: Scalars['String'];
  data: TCustomApplicationDraftDataInput;
};


export type TMutation_UpdateCustomApplicationArgs = {
  organizationId: Scalars['String'];
  applicationId: Scalars['ID'];
  data: TCustomApplicationDraftDataInput;
};


export type TMutation_ChangeCustomApplicationStatusArgs = {
  organizationId: Scalars['String'];
  applicationId: Scalars['ID'];
  status: TCustomApplicationStatus;
};


export type TMutation_DeleteCustomApplicationArgs = {
  organizationId: Scalars['String'];
  applicationId: Scalars['ID'];
};


export type TMutation_InstallCustomApplicationArgs = {
  organizationId: Scalars['String'];
  applicationId: Scalars['ID'];
  projectKeys: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type TMutation_UpdateCustomApplicationProjectsInstallationArgs = {
  organizationId: Scalars['String'];
  installedApplicationId: Scalars['ID'];
  projectKeys: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type TMutation_SetOrganizationExtensionOidcSsoConfigArgs = {
  organizationId: Scalars['String'];
  data: TOidcSsoConfigDataInput;
};


export type TMutation_ActivateOrganizationExtensionOidcSsoConfigArgs = {
  organizationId: Scalars['String'];
};


export type TMutation_DeactivateOrganizationExtensionOidcSsoConfigArgs = {
  organizationId: Scalars['String'];
};


export type TMutation_CreateOrdersListViewArgs = {
  data: TOrdersListViewInput;
};


export type TMutation_UpdateOrdersListViewArgs = {
  id: Scalars['ID'];
  data: TOrdersListViewInput;
};


export type TMutation_DeleteOrdersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateOrdersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateOrdersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_CreateCartDiscountsCustomViewArgs = {
  data: TDiscountsCustomViewInput;
};


export type TMutation_UpdateCartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
  data: TDiscountsCustomViewInput;
};


export type TMutation_DeleteCartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateCartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateCartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_CreateProductDiscountsCustomViewArgs = {
  data: TDiscountsCustomViewInput;
};


export type TMutation_UpdateProductDiscountsCustomViewArgs = {
  id: Scalars['ID'];
  data: TDiscountsCustomViewInput;
};


export type TMutation_DeleteProductDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateProductDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateProductDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_CreateDiscountCodesCustomViewArgs = {
  data: TDiscountsCustomViewInput;
};


export type TMutation_UpdateDiscountCodesCustomViewArgs = {
  id: Scalars['ID'];
  data: TDiscountsCustomViewInput;
};


export type TMutation_DeleteDiscountCodesCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateDiscountCodesCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateDiscountCodesCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_CreatePimSearchListViewArgs = {
  data: TPimSearchListViewInput;
};


export type TMutation_UpdatePimSearchListViewArgs = {
  id: Scalars['ID'];
  data: TPimSearchListViewInput;
};


export type TMutation_DeletePimSearchListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivatePimSearchListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivatePimSearchListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_CreateProductTypeAttributesViewArgs = {
  data: TProductTypeAttributesViewInput;
};


export type TMutation_UpdateProductTypeAttributesViewArgs = {
  id: Scalars['ID'];
  data: TProductTypeAttributesViewUpdateInput;
};


export type TMutation_DeleteProductTypeAttributesViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateProductTypeAttributesViewArgs = {
  id: Scalars['ID'];
  productTypeId: Scalars['String'];
  isVariant: Scalars['Boolean'];
};


export type TMutation_DeactivateProductTypeAttributesViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_UpdateVariantPricesListViewArgs = {
  id: Scalars['ID'];
  data: TVariantPricesListViewInput;
};


export type TMutation_CreateVariantPricesListViewArgs = {
  data: TVariantPricesListViewInput;
};


export type TMutation_CreateCustomersListViewArgs = {
  data: TCustomersListViewInput;
};


export type TMutation_UpdateCustomersListViewArgs = {
  id: Scalars['ID'];
  data: TCustomersListViewInput;
};


export type TMutation_DeleteCustomersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateCustomersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateCustomersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_UpdateRuleBuilderQuickSelectionValuesArgs = {
  id: Maybe<Scalars['ID']>;
  data: TRuleBuilderQuickSelectionInput;
};


export type TMutation_CreateCartDiscountsListViewArgs = {
  data: TCartDiscountsListViewInput;
};


export type TMutation_UpdateCartDiscountsListViewArgs = {
  data: TCartDiscountsListViewInput;
  id: Scalars['ID'];
};


export type TMutation_CreateProductDiscountsListViewArgs = {
  data: TProductDiscountsListViewInput;
};


export type TMutation_UpdateProductDiscountsListViewArgs = {
  data: TProductDiscountsListViewInput;
  id: Scalars['ID'];
};


export type TMutation_CreateDiscountCodesListViewArgs = {
  data: TDiscountCodesListViewInput;
};


export type TMutation_UpdateDiscountCodesListViewArgs = {
  data: TDiscountCodesListViewInput;
  id: Scalars['ID'];
};


export type TMutation_CreateDashboardViewArgs = {
  data: TDashboardViewInput;
};


export type TMutation_UpdateDashboardViewArgs = {
  id: Scalars['ID'];
  data: TDashboardViewInput;
};


export type TMutation_DeleteDashboardViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateDashboardViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateDashboardViewArgs = {
  id: Scalars['ID'];
};

export type TNavbarMenu = {
  __typename?: 'NavbarMenu';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  key: Scalars['String'];
  uriPath: Scalars['String'];
  labelAllLocales: Maybe<Array<TLocalizedField>>;
  featureToggle: Maybe<Scalars['String']>;
  permissions: Array<TOAuthScope>;
  icon: Scalars['String'];
  submenu: Maybe<Array<TNavbarSubmenu>>;
};


export type TNavbarMenu_LabelAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type TNavbarMenu_SubmenuArgs = {
  where: Maybe<TNavbarSubmenuWhereInput>;
  orderBy: Maybe<TNavbarSubmenuOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TNavbarMenuWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  key: Maybe<Scalars['String']>;
  key_not: Maybe<Scalars['String']>;
  key_in: Maybe<Array<Scalars['String']>>;
  key_not_in: Maybe<Array<Scalars['String']>>;
  key_lt: Maybe<Scalars['String']>;
  key_lte: Maybe<Scalars['String']>;
  key_gt: Maybe<Scalars['String']>;
  key_gte: Maybe<Scalars['String']>;
  key_contains: Maybe<Scalars['String']>;
  key_not_contains: Maybe<Scalars['String']>;
  key_starts_with: Maybe<Scalars['String']>;
  key_not_starts_with: Maybe<Scalars['String']>;
  key_ends_with: Maybe<Scalars['String']>;
  key_not_ends_with: Maybe<Scalars['String']>;
  uriPath: Maybe<Scalars['String']>;
  uriPath_not: Maybe<Scalars['String']>;
  uriPath_in: Maybe<Array<Scalars['String']>>;
  uriPath_not_in: Maybe<Array<Scalars['String']>>;
  uriPath_lt: Maybe<Scalars['String']>;
  uriPath_lte: Maybe<Scalars['String']>;
  uriPath_gt: Maybe<Scalars['String']>;
  uriPath_gte: Maybe<Scalars['String']>;
  uriPath_contains: Maybe<Scalars['String']>;
  uriPath_not_contains: Maybe<Scalars['String']>;
  uriPath_starts_with: Maybe<Scalars['String']>;
  uriPath_not_starts_with: Maybe<Scalars['String']>;
  uriPath_ends_with: Maybe<Scalars['String']>;
  uriPath_not_ends_with: Maybe<Scalars['String']>;
  labelAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  featureToggle: Maybe<Scalars['String']>;
  featureToggle_not: Maybe<Scalars['String']>;
  featureToggle_in: Maybe<Array<Scalars['String']>>;
  featureToggle_not_in: Maybe<Array<Scalars['String']>>;
  featureToggle_lt: Maybe<Scalars['String']>;
  featureToggle_lte: Maybe<Scalars['String']>;
  featureToggle_gt: Maybe<Scalars['String']>;
  featureToggle_gte: Maybe<Scalars['String']>;
  featureToggle_contains: Maybe<Scalars['String']>;
  featureToggle_not_contains: Maybe<Scalars['String']>;
  featureToggle_starts_with: Maybe<Scalars['String']>;
  featureToggle_not_starts_with: Maybe<Scalars['String']>;
  featureToggle_ends_with: Maybe<Scalars['String']>;
  featureToggle_not_ends_with: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  icon_not: Maybe<Scalars['String']>;
  icon_in: Maybe<Array<Scalars['String']>>;
  icon_not_in: Maybe<Array<Scalars['String']>>;
  icon_lt: Maybe<Scalars['String']>;
  icon_lte: Maybe<Scalars['String']>;
  icon_gt: Maybe<Scalars['String']>;
  icon_gte: Maybe<Scalars['String']>;
  icon_contains: Maybe<Scalars['String']>;
  icon_not_contains: Maybe<Scalars['String']>;
  icon_starts_with: Maybe<Scalars['String']>;
  icon_not_starts_with: Maybe<Scalars['String']>;
  icon_ends_with: Maybe<Scalars['String']>;
  icon_not_ends_with: Maybe<Scalars['String']>;
  submenu_every: Maybe<TNavbarSubmenuWhereInput>;
  submenu_some: Maybe<TNavbarSubmenuWhereInput>;
  submenu_none: Maybe<TNavbarSubmenuWhereInput>;
  AND: Maybe<Array<TNavbarMenuWhereInput>>;
  OR: Maybe<Array<TNavbarMenuWhereInput>>;
  NOT: Maybe<Array<TNavbarMenuWhereInput>>;
};

export type TNavbarSubmenu = {
  __typename?: 'NavbarSubmenu';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  key: Scalars['String'];
  uriPath: Scalars['String'];
  labelAllLocales: Maybe<Array<TLocalizedField>>;
  featureToggle: Maybe<Scalars['String']>;
  permissions: Array<TOAuthScope>;
};


export type TNavbarSubmenu_LabelAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export enum TNavbarSubmenuOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  UriPathAsc = 'uriPath_ASC',
  UriPathDesc = 'uriPath_DESC',
  FeatureToggleAsc = 'featureToggle_ASC',
  FeatureToggleDesc = 'featureToggle_DESC'
}

export type TNavbarSubmenuWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  key: Maybe<Scalars['String']>;
  key_not: Maybe<Scalars['String']>;
  key_in: Maybe<Array<Scalars['String']>>;
  key_not_in: Maybe<Array<Scalars['String']>>;
  key_lt: Maybe<Scalars['String']>;
  key_lte: Maybe<Scalars['String']>;
  key_gt: Maybe<Scalars['String']>;
  key_gte: Maybe<Scalars['String']>;
  key_contains: Maybe<Scalars['String']>;
  key_not_contains: Maybe<Scalars['String']>;
  key_starts_with: Maybe<Scalars['String']>;
  key_not_starts_with: Maybe<Scalars['String']>;
  key_ends_with: Maybe<Scalars['String']>;
  key_not_ends_with: Maybe<Scalars['String']>;
  uriPath: Maybe<Scalars['String']>;
  uriPath_not: Maybe<Scalars['String']>;
  uriPath_in: Maybe<Array<Scalars['String']>>;
  uriPath_not_in: Maybe<Array<Scalars['String']>>;
  uriPath_lt: Maybe<Scalars['String']>;
  uriPath_lte: Maybe<Scalars['String']>;
  uriPath_gt: Maybe<Scalars['String']>;
  uriPath_gte: Maybe<Scalars['String']>;
  uriPath_contains: Maybe<Scalars['String']>;
  uriPath_not_contains: Maybe<Scalars['String']>;
  uriPath_starts_with: Maybe<Scalars['String']>;
  uriPath_not_starts_with: Maybe<Scalars['String']>;
  uriPath_ends_with: Maybe<Scalars['String']>;
  uriPath_not_ends_with: Maybe<Scalars['String']>;
  labelAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  featureToggle: Maybe<Scalars['String']>;
  featureToggle_not: Maybe<Scalars['String']>;
  featureToggle_in: Maybe<Array<Scalars['String']>>;
  featureToggle_not_in: Maybe<Array<Scalars['String']>>;
  featureToggle_lt: Maybe<Scalars['String']>;
  featureToggle_lte: Maybe<Scalars['String']>;
  featureToggle_gt: Maybe<Scalars['String']>;
  featureToggle_gte: Maybe<Scalars['String']>;
  featureToggle_contains: Maybe<Scalars['String']>;
  featureToggle_not_contains: Maybe<Scalars['String']>;
  featureToggle_starts_with: Maybe<Scalars['String']>;
  featureToggle_not_starts_with: Maybe<Scalars['String']>;
  featureToggle_ends_with: Maybe<Scalars['String']>;
  featureToggle_not_ends_with: Maybe<Scalars['String']>;
  AND: Maybe<Array<TNavbarSubmenuWhereInput>>;
  OR: Maybe<Array<TNavbarSubmenuWhereInput>>;
  NOT: Maybe<Array<TNavbarSubmenuWhereInput>>;
};

export enum TOAuthScope {
  ManageProducts = 'ManageProducts',
  ViewProducts = 'ViewProducts',
  ManageCategories = 'ManageCategories',
  ViewCategories = 'ViewCategories',
  ManageCustomers = 'ManageCustomers',
  ViewCustomers = 'ViewCustomers',
  ManageCustomerGroups = 'ManageCustomerGroups',
  ViewCustomerGroups = 'ViewCustomerGroups',
  ManageOrders = 'ManageOrders',
  ViewOrders = 'ViewOrders',
  ManageProductDiscounts = 'ManageProductDiscounts',
  ViewProductDiscounts = 'ViewProductDiscounts',
  ManageCartDiscounts = 'ManageCartDiscounts',
  ViewCartDiscounts = 'ViewCartDiscounts',
  ManageDiscountCodes = 'ManageDiscountCodes',
  ViewDiscountCodes = 'ViewDiscountCodes',
  ManageProjectSettings = 'ManageProjectSettings',
  ViewProjectSettings = 'ViewProjectSettings',
  ManageProductTypes = 'ManageProductTypes',
  ViewProductTypes = 'ViewProductTypes',
  ManageDeveloperSettings = 'ManageDeveloperSettings',
  ViewDeveloperSettings = 'ViewDeveloperSettings',
  ManageProject = 'ManageProject'
}

export type TOidcSsoConfig = {
  __typename?: 'OidcSsoConfig';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  isActive: Maybe<Scalars['Boolean']>;
  authorityUrl: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret: Maybe<Scalars['String']>;
  teamIdForNewUsers: Scalars['String'];
  logoutUrl: Maybe<Scalars['String']>;
};

export type TOidcSsoConfigDataInput = {
  authorityUrl: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret: Maybe<Scalars['String']>;
  teamIdForNewUsers: Scalars['String'];
  logoutUrl: Maybe<Scalars['String']>;
};

export type TOidcSsoConfigWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  isActive: Maybe<Scalars['Boolean']>;
  isActive_not: Maybe<Scalars['Boolean']>;
  authorityUrl: Maybe<Scalars['String']>;
  authorityUrl_not: Maybe<Scalars['String']>;
  authorityUrl_in: Maybe<Array<Scalars['String']>>;
  authorityUrl_not_in: Maybe<Array<Scalars['String']>>;
  authorityUrl_lt: Maybe<Scalars['String']>;
  authorityUrl_lte: Maybe<Scalars['String']>;
  authorityUrl_gt: Maybe<Scalars['String']>;
  authorityUrl_gte: Maybe<Scalars['String']>;
  authorityUrl_contains: Maybe<Scalars['String']>;
  authorityUrl_not_contains: Maybe<Scalars['String']>;
  authorityUrl_starts_with: Maybe<Scalars['String']>;
  authorityUrl_not_starts_with: Maybe<Scalars['String']>;
  authorityUrl_ends_with: Maybe<Scalars['String']>;
  authorityUrl_not_ends_with: Maybe<Scalars['String']>;
  clientId: Maybe<Scalars['String']>;
  clientId_not: Maybe<Scalars['String']>;
  clientId_in: Maybe<Array<Scalars['String']>>;
  clientId_not_in: Maybe<Array<Scalars['String']>>;
  clientId_lt: Maybe<Scalars['String']>;
  clientId_lte: Maybe<Scalars['String']>;
  clientId_gt: Maybe<Scalars['String']>;
  clientId_gte: Maybe<Scalars['String']>;
  clientId_contains: Maybe<Scalars['String']>;
  clientId_not_contains: Maybe<Scalars['String']>;
  clientId_starts_with: Maybe<Scalars['String']>;
  clientId_not_starts_with: Maybe<Scalars['String']>;
  clientId_ends_with: Maybe<Scalars['String']>;
  clientId_not_ends_with: Maybe<Scalars['String']>;
  clientSecret: Maybe<Scalars['String']>;
  clientSecret_not: Maybe<Scalars['String']>;
  clientSecret_in: Maybe<Array<Scalars['String']>>;
  clientSecret_not_in: Maybe<Array<Scalars['String']>>;
  clientSecret_lt: Maybe<Scalars['String']>;
  clientSecret_lte: Maybe<Scalars['String']>;
  clientSecret_gt: Maybe<Scalars['String']>;
  clientSecret_gte: Maybe<Scalars['String']>;
  clientSecret_contains: Maybe<Scalars['String']>;
  clientSecret_not_contains: Maybe<Scalars['String']>;
  clientSecret_starts_with: Maybe<Scalars['String']>;
  clientSecret_not_starts_with: Maybe<Scalars['String']>;
  clientSecret_ends_with: Maybe<Scalars['String']>;
  clientSecret_not_ends_with: Maybe<Scalars['String']>;
  teamIdForNewUsers: Maybe<Scalars['String']>;
  teamIdForNewUsers_not: Maybe<Scalars['String']>;
  teamIdForNewUsers_in: Maybe<Array<Scalars['String']>>;
  teamIdForNewUsers_not_in: Maybe<Array<Scalars['String']>>;
  teamIdForNewUsers_lt: Maybe<Scalars['String']>;
  teamIdForNewUsers_lte: Maybe<Scalars['String']>;
  teamIdForNewUsers_gt: Maybe<Scalars['String']>;
  teamIdForNewUsers_gte: Maybe<Scalars['String']>;
  teamIdForNewUsers_contains: Maybe<Scalars['String']>;
  teamIdForNewUsers_not_contains: Maybe<Scalars['String']>;
  teamIdForNewUsers_starts_with: Maybe<Scalars['String']>;
  teamIdForNewUsers_not_starts_with: Maybe<Scalars['String']>;
  teamIdForNewUsers_ends_with: Maybe<Scalars['String']>;
  teamIdForNewUsers_not_ends_with: Maybe<Scalars['String']>;
  logoutUrl: Maybe<Scalars['String']>;
  logoutUrl_not: Maybe<Scalars['String']>;
  logoutUrl_in: Maybe<Array<Scalars['String']>>;
  logoutUrl_not_in: Maybe<Array<Scalars['String']>>;
  logoutUrl_lt: Maybe<Scalars['String']>;
  logoutUrl_lte: Maybe<Scalars['String']>;
  logoutUrl_gt: Maybe<Scalars['String']>;
  logoutUrl_gte: Maybe<Scalars['String']>;
  logoutUrl_contains: Maybe<Scalars['String']>;
  logoutUrl_not_contains: Maybe<Scalars['String']>;
  logoutUrl_starts_with: Maybe<Scalars['String']>;
  logoutUrl_not_starts_with: Maybe<Scalars['String']>;
  logoutUrl_ends_with: Maybe<Scalars['String']>;
  logoutUrl_not_ends_with: Maybe<Scalars['String']>;
  AND: Maybe<Array<TOidcSsoConfigWhereInput>>;
  OR: Maybe<Array<TOidcSsoConfigWhereInput>>;
  NOT: Maybe<Array<TOidcSsoConfigWhereInput>>;
};

export type TOrdersListView = {
  __typename?: 'OrdersListView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  isActive: Maybe<Scalars['Boolean']>;
  search: Maybe<Scalars['String']>;
  table: Maybe<TTable>;
  sort: Maybe<TSort>;
  filters: Maybe<Array<TFilterValues>>;
};


export type TOrdersListView_NameAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type TOrdersListView_FiltersArgs = {
  where: Maybe<TFilterValuesWhereInput>;
  orderBy: Maybe<TFilterValuesOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TOrdersListViewInput = {
  search: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  table: Maybe<TOrdersListViewTableInput>;
  sort: TSortCreateInput;
  filters: Array<TFilterValuesCreateInput>;
};

export type TOrdersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export enum TOrderStatesVisibility {
  HidePaymentState = 'HidePaymentState',
  HideShipmentState = 'HideShipmentState',
  HideOrderState = 'HideOrderState'
}

export type TOrganizationExtension = {
  __typename?: 'OrganizationExtension';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  organizationId: Scalars['String'];
  oidcSsoConfig: Maybe<TOidcSsoConfig>;
  registeredApplications: Maybe<Array<TRestrictedCustomApplicationForOrganization>>;
  installedApplications: Maybe<Array<TRestrictedCustomApplicationInstallationForOrganization>>;
};

export type TOrganizationExtensionWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  organizationId: Maybe<Scalars['String']>;
  organizationId_not: Maybe<Scalars['String']>;
  organizationId_in: Maybe<Array<Scalars['String']>>;
  organizationId_not_in: Maybe<Array<Scalars['String']>>;
  organizationId_lt: Maybe<Scalars['String']>;
  organizationId_lte: Maybe<Scalars['String']>;
  organizationId_gt: Maybe<Scalars['String']>;
  organizationId_gte: Maybe<Scalars['String']>;
  organizationId_contains: Maybe<Scalars['String']>;
  organizationId_not_contains: Maybe<Scalars['String']>;
  organizationId_starts_with: Maybe<Scalars['String']>;
  organizationId_not_starts_with: Maybe<Scalars['String']>;
  organizationId_ends_with: Maybe<Scalars['String']>;
  organizationId_not_ends_with: Maybe<Scalars['String']>;
  oidcSsoConfig: Maybe<TOidcSsoConfigWhereInput>;
  registeredApplications_every: Maybe<TCustomApplicationWhereInput>;
  registeredApplications_some: Maybe<TCustomApplicationWhereInput>;
  registeredApplications_none: Maybe<TCustomApplicationWhereInput>;
  installedApplications_every: Maybe<TCustomApplicationInstallationWhereInput>;
  installedApplications_some: Maybe<TCustomApplicationInstallationWhereInput>;
  installedApplications_none: Maybe<TCustomApplicationInstallationWhereInput>;
  AND: Maybe<Array<TOrganizationExtensionWhereInput>>;
  OR: Maybe<Array<TOrganizationExtensionWhereInput>>;
  NOT: Maybe<Array<TOrganizationExtensionWhereInput>>;
};

export type TPimSearchListView = {
  __typename?: 'PimSearchListView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  isActive: Maybe<Scalars['Boolean']>;
  search: Maybe<Scalars['String']>;
  table: Maybe<TTable>;
  sort: Maybe<TSort>;
  filters: Maybe<Array<TFilterValues>>;
};


export type TPimSearchListView_NameAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};


export type TPimSearchListView_FiltersArgs = {
  where: Maybe<TFilterValuesWhereInput>;
  orderBy: Maybe<TFilterValuesOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TPimSearchListViewInput = {
  search: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  table: Maybe<TPimSearchListViewTableInput>;
  sort: TSortCreateInput;
  filters: Array<TFilterValuesCreateInput>;
};

export type TPimSearchListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TProductDiscountsListView = {
  __typename?: 'ProductDiscountsListView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  visibleColumns: Array<Scalars['String']>;
};

export type TProductDiscountsListViewInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TProductTypeAttributesView = {
  __typename?: 'ProductTypeAttributesView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  productTypeId: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVariant: Maybe<Scalars['Boolean']>;
  pinnedAttributes: Array<Scalars['String']>;
  searchTerm: Maybe<Scalars['String']>;
  existence: Maybe<TExistence>;
};


export type TProductTypeAttributesView_NameAllLocalesArgs = {
  where: Maybe<TLocalizedFieldWhereInput>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TProductTypeAttributesViewInput = {
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  productTypeId: Scalars['String'];
  pinnedAttributes: Array<Scalars['String']>;
  isVariant: Maybe<Scalars['Boolean']>;
  searchTerm: Maybe<Scalars['String']>;
  existence: Maybe<TExistence>;
};

export type TProductTypeAttributesViewUpdateInput = {
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  isVariant: Maybe<Scalars['Boolean']>;
  pinnedAttributes: Array<Scalars['String']>;
  searchTerm: Maybe<Scalars['String']>;
  existence: Maybe<TExistence>;
};

export type TProjectExtension = {
  __typename?: 'ProjectExtension';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  projectKey: Scalars['String'];
  applications: Maybe<Array<TApplicationExtension>>;
  installedApplications: Maybe<Array<TRestrictedCustomApplicationInstallationForProject>>;
  imageRegex: Maybe<TImageRegex>;
  orderStatesVisibility: Array<TOrderStatesVisibility>;
  categoryRecommendationSettings: Maybe<TCategoryRecommendationSettings>;
};


export type TProjectExtension_ApplicationsArgs = {
  where: Maybe<TRestrictedApplicationExtensionWhereInput>;
};


export type TProjectExtension_InstalledApplicationsArgs = {
  where: Maybe<TRestrictedCustomApplicationInstallationWhereInput>;
};

export enum TProjectExtensionOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  ProjectKeyAsc = 'projectKey_ASC',
  ProjectKeyDesc = 'projectKey_DESC'
}

export type TProjectExtensionWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  projectKey: Maybe<Scalars['String']>;
  projectKey_not: Maybe<Scalars['String']>;
  projectKey_in: Maybe<Array<Scalars['String']>>;
  projectKey_not_in: Maybe<Array<Scalars['String']>>;
  projectKey_lt: Maybe<Scalars['String']>;
  projectKey_lte: Maybe<Scalars['String']>;
  projectKey_gt: Maybe<Scalars['String']>;
  projectKey_gte: Maybe<Scalars['String']>;
  projectKey_contains: Maybe<Scalars['String']>;
  projectKey_not_contains: Maybe<Scalars['String']>;
  projectKey_starts_with: Maybe<Scalars['String']>;
  projectKey_not_starts_with: Maybe<Scalars['String']>;
  projectKey_ends_with: Maybe<Scalars['String']>;
  projectKey_not_ends_with: Maybe<Scalars['String']>;
  applications_every: Maybe<TApplicationExtensionWhereInput>;
  applications_some: Maybe<TApplicationExtensionWhereInput>;
  applications_none: Maybe<TApplicationExtensionWhereInput>;
  installedApplications_every: Maybe<TCustomApplicationInstallationWhereInput>;
  installedApplications_some: Maybe<TCustomApplicationInstallationWhereInput>;
  installedApplications_none: Maybe<TCustomApplicationInstallationWhereInput>;
  imageRegex: Maybe<TImageRegexWhereInput>;
  categoryRecommendationSettings: Maybe<TCategoryRecommendationSettingsWhereInput>;
  AND: Maybe<Array<TProjectExtensionWhereInput>>;
  OR: Maybe<Array<TProjectExtensionWhereInput>>;
  NOT: Maybe<Array<TProjectExtensionWhereInput>>;
};

export type TQuery = {
  __typename?: 'Query';
  projectExtension: Maybe<TProjectExtension>;
  allProjectExtensions: Array<TProjectExtension>;
  /** @deprecated Experimental feature - For internal usage only */
  allCustomApplicationOAuthScopes: Array<Scalars['String']>;
  organizationExtension: Maybe<TOrganizationExtension>;
  /** @deprecated Experimental feature - For internal usage only */
  globalOrganizationExtension: Maybe<TOrganizationExtension>;
  ordersListViews: Array<Maybe<TOrdersListView>>;
  ordersListView: Maybe<TOrdersListView>;
  activeOrdersListView: Maybe<TOrdersListView>;
  cartDiscountsCustomViews: Array<Maybe<TDiscountsCustomView>>;
  cartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  activeCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  productDiscountsCustomViews: Array<Maybe<TDiscountsCustomView>>;
  productDiscountsCustomView: Maybe<TDiscountsCustomView>;
  activeProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  discountCodesCustomViews: Array<Maybe<TDiscountsCustomView>>;
  discountCodesCustomView: Maybe<TDiscountsCustomView>;
  activeDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  pimSearchListViews: Array<Maybe<TPimSearchListView>>;
  pimSearchListView: Maybe<TPimSearchListView>;
  activePimSearchListView: Maybe<TPimSearchListView>;
  productTypeAttributesViews: Maybe<Array<Maybe<TProductTypeAttributesView>>>;
  productTypeAttributesView: Maybe<TProductTypeAttributesView>;
  activeProductTypeAttributesView: Maybe<TProductTypeAttributesView>;
  variantPricesListViews: Array<Maybe<TVariantPricesListView>>;
  customersListViews: Array<Maybe<TCustomersListView>>;
  customersListView: Maybe<TCustomersListView>;
  activeCustomersListView: Maybe<TCustomersListView>;
  ruleBuilderQuickSelectionValues: Maybe<Array<Maybe<TRuleBuilderQuickSelectionValues>>>;
  cartDiscountsListView: Maybe<TCartDiscountsListView>;
  productDiscountsListView: Maybe<TProductDiscountsListView>;
  discountCodesListView: Maybe<TDiscountCodesListView>;
  dashboardViews: Array<Maybe<TDashboardView>>;
  dashboardView: Maybe<TDashboardView>;
  activeDashboardView: Maybe<TDashboardView>;
};


export type TQuery_AllCustomApplicationOAuthScopesArgs = {
  applicationId: Scalars['ID'];
};


export type TQuery_OrganizationExtensionArgs = {
  organizationId: Scalars['String'];
};


export type TQuery_GlobalOrganizationExtensionArgs = {
  organizationId: Scalars['String'];
};


export type TQuery_OrdersListViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_CartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_ProductDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_DiscountCodesCustomViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_PimSearchListViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_ProductTypeAttributesViewsArgs = {
  productTypeId: Scalars['String'];
  isVariant: Scalars['Boolean'];
};


export type TQuery_ProductTypeAttributesViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_ActiveProductTypeAttributesViewArgs = {
  productTypeId: Scalars['String'];
  isVariant: Scalars['Boolean'];
};


export type TQuery_CustomersListViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_RuleBuilderQuickSelectionValuesArgs = {
  ruleBuilderType: TRuleBuilderType;
};


export type TQuery_DashboardViewArgs = {
  id: Scalars['ID'];
};

export type TResourcesNumbersConfiguration = {
  __typename?: 'ResourcesNumbersConfiguration';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  resourceOptions: Array<TResourceType>;
};

export type TResourcesNumbersConfigurationInput = {
  resourceOptions: Array<TResourceType>;
};

export type TResourcesNumbersConfigurationWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  AND: Maybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  OR: Maybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  NOT: Maybe<Array<TResourcesNumbersConfigurationWhereInput>>;
};

export enum TResourceType {
  TotalProducts = 'TOTAL_PRODUCTS',
  PublishedProducts = 'PUBLISHED_PRODUCTS',
  UnpublishedProducts = 'UNPUBLISHED_PRODUCTS',
  Categories = 'CATEGORIES'
}

export type TRestrictedApplicationExtensionWhereInput = {
  id: Maybe<Scalars['ID']>;
  isActive: Maybe<Scalars['Boolean']>;
  url: Maybe<Scalars['String']>;
};

export type TRestrictedCustomApplicationContactPerson = {
  __typename?: 'RestrictedCustomApplicationContactPerson';
  email: Scalars['String'];
};

export type TRestrictedCustomApplicationForOrganization = {
  __typename?: 'RestrictedCustomApplicationForOrganization';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  status: Maybe<TCustomApplicationStatus>;
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  url: Scalars['String'];
  entryPointUriPath: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
  menuLinks: Maybe<TCustomApplicationMenuLink>;
  contacts: Maybe<Array<TRestrictedCustomApplicationContactPerson>>;
};

export type TRestrictedCustomApplicationForProject = {
  __typename?: 'RestrictedCustomApplicationForProject';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  status: Maybe<TCustomApplicationStatus>;
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  url: Scalars['String'];
  entryPointUriPath: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
  menuLinks: Maybe<TCustomApplicationMenuLink>;
};

export type TRestrictedCustomApplicationInstallationForOrganization = {
  __typename?: 'RestrictedCustomApplicationInstallationForOrganization';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  application: TRestrictedCustomApplicationForProject;
  installInAllProjects: Scalars['Boolean'];
  projects: Maybe<Array<TProjectExtension>>;
};

export type TRestrictedCustomApplicationInstallationForProject = {
  __typename?: 'RestrictedCustomApplicationInstallationForProject';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  application: TRestrictedCustomApplicationForProject;
  installInAllProjects: Scalars['Boolean'];
};

export type TRestrictedCustomApplicationInstallationWhereInput = {
  application: Maybe<TRestrictedCustomApplicationWhereInput>;
};

export type TRestrictedCustomApplicationWhereInput = {
  id: Maybe<Scalars['ID']>;
  status: Maybe<TCustomApplicationStatus>;
  url: Maybe<Scalars['String']>;
  entryPointUriPath: Maybe<Scalars['String']>;
};

export type TRuleBuilderQuickSelectCreatefunctionsInput = {
  set: Maybe<Array<Scalars['String']>>;
};

export type TRuleBuilderQuickSelectCreatepredicatesInput = {
  set: Maybe<Array<Scalars['String']>>;
};

export type TRuleBuilderQuickSelectionInput = {
  ruleBuilderType: TRuleBuilderType;
  predicates: Maybe<TRuleBuilderQuickSelectCreatefunctionsInput>;
  functions: Maybe<TRuleBuilderQuickSelectCreatepredicatesInput>;
};

export type TRuleBuilderQuickSelectionValues = {
  __typename?: 'RuleBuilderQuickSelectionValues';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  ruleBuilderType: TRuleBuilderType;
  functions: Array<Scalars['String']>;
  predicates: Array<Scalars['String']>;
};

export enum TRuleBuilderType {
  ProductDiscount = 'ProductDiscount',
  CartDiscount = 'CartDiscount',
  CartTargetDiscount = 'CartTargetDiscount'
}

export type TSalesPerformanceConfiguration = {
  __typename?: 'SalesPerformanceConfiguration';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TSalesPerformanceConfigurationInput = {
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TSalesPerformanceConfigurationWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  showPreviousTimeframe: Maybe<Scalars['Boolean']>;
  showPreviousTimeframe_not: Maybe<Scalars['Boolean']>;
  AND: Maybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  OR: Maybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  NOT: Maybe<Array<TSalesPerformanceConfigurationWhereInput>>;
};

export type TSort = {
  __typename?: 'Sort';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  key: Scalars['String'];
  order: TSortOrder;
};

export type TSortCreateInput = {
  id: Maybe<Scalars['ID']>;
  key: Scalars['String'];
  order: TSortOrder;
};

export enum TSortOrder {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type TTable = {
  __typename?: 'Table';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  visibleColumns: Array<Scalars['String']>;
};

export type TTopProductsConfiguration = {
  __typename?: 'TopProductsConfiguration';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  bestSellingLimit: TBestSellingLimit;
};

export type TTopProductsConfigurationInput = {
  bestSellingLimit: Maybe<TBestSellingLimit>;
};

export type TTopProductsConfigurationWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  bestSellingLimit: Maybe<TBestSellingLimit>;
  bestSellingLimit_not: Maybe<TBestSellingLimit>;
  bestSellingLimit_in: Maybe<Array<TBestSellingLimit>>;
  bestSellingLimit_not_in: Maybe<Array<TBestSellingLimit>>;
  AND: Maybe<Array<TTopProductsConfigurationWhereInput>>;
  OR: Maybe<Array<TTopProductsConfigurationWhereInput>>;
  NOT: Maybe<Array<TTopProductsConfigurationWhereInput>>;
};

export type TTotalSalesConfiguration = {
  __typename?: 'TotalSalesConfiguration';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productId: Maybe<Scalars['String']>;
};

export type TTotalSalesConfigurationInput = {
  productId: Maybe<Scalars['String']>;
};

export type TTotalSalesConfigurationWhereInput = {
  id: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  productId: Maybe<Scalars['String']>;
  productId_not: Maybe<Scalars['String']>;
  productId_in: Maybe<Array<Scalars['String']>>;
  productId_not_in: Maybe<Array<Scalars['String']>>;
  productId_lt: Maybe<Scalars['String']>;
  productId_lte: Maybe<Scalars['String']>;
  productId_gt: Maybe<Scalars['String']>;
  productId_gte: Maybe<Scalars['String']>;
  productId_contains: Maybe<Scalars['String']>;
  productId_not_contains: Maybe<Scalars['String']>;
  productId_starts_with: Maybe<Scalars['String']>;
  productId_not_starts_with: Maybe<Scalars['String']>;
  productId_ends_with: Maybe<Scalars['String']>;
  productId_not_ends_with: Maybe<Scalars['String']>;
  AND: Maybe<Array<TTotalSalesConfigurationWhereInput>>;
  OR: Maybe<Array<TTotalSalesConfigurationWhereInput>>;
  NOT: Maybe<Array<TTotalSalesConfigurationWhereInput>>;
};

export type TVariantPricesListView = {
  __typename?: 'VariantPricesListView';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  projectKey: Scalars['String'];
  visibleColumns: Array<Scalars['String']>;
};

export type TVariantPricesListViewInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TFetchProjectExtensionImageRegexQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchProjectExtensionImageRegexQuery = (
  { __typename?: 'Query' }
  & { projectExtension: Maybe<(
    { __typename?: 'ProjectExtension' }
    & Pick<TProjectExtension, 'id'>
    & { imageRegex: Maybe<(
      { __typename?: 'ImageRegex' }
      & { thumb: Maybe<(
        { __typename?: 'ImageRegexOptions' }
        & TImageRegexFragment
      )>, small: Maybe<(
        { __typename?: 'ImageRegexOptions' }
        & TImageRegexFragment
      )> }
    )> }
  )> }
);

export type TImageRegexFragment = (
  { __typename?: 'ImageRegexOptions' }
  & Pick<TImageRegexOptions, 'flag' | 'search' | 'replace'>
);

export type TFetchProjectExtensionsNavbarQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchProjectExtensionsNavbarQuery = (
  { __typename?: 'Query' }
  & { projectExtension: Maybe<(
    { __typename?: 'ProjectExtension' }
    & Pick<TProjectExtension, 'id'>
    & { applications: Maybe<Array<(
      { __typename?: 'ApplicationExtension' }
      & Pick<TApplicationExtension, 'id'>
      & { navbarMenu: Maybe<(
        { __typename?: 'NavbarMenu' }
        & Pick<TNavbarMenu, 'id' | 'key' | 'uriPath' | 'icon' | 'featureToggle' | 'permissions'>
        & { labelAllLocales: Maybe<Array<(
          { __typename?: 'LocalizedField' }
          & Pick<TLocalizedField, 'locale' | 'value'>
        )>>, submenu: Maybe<Array<(
          { __typename?: 'NavbarSubmenu' }
          & Pick<TNavbarSubmenu, 'id' | 'key' | 'uriPath' | 'permissions' | 'featureToggle'>
          & { labelAllLocales: Maybe<Array<(
            { __typename?: 'LocalizedField' }
            & Pick<TLocalizedField, 'locale' | 'value'>
          )>> }
        )>> }
      )> }
    )>> }
  )> }
);
