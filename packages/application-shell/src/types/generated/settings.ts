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
  DateTime: string;
  Json: { [key: string]: unknown };
};



export type TApplicationExtension = {
  __typename?: 'ApplicationExtension';
  createdAt: Scalars['DateTime'];
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  navbarMenu: Maybe<TNavbarMenu>;
  oAuthScopes: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TApplicationExtensionDataInput = {
  description: Maybe<Scalars['String']>;
  name: Scalars['String'];
  navbarMenu: TApplicationExtensionNavbarMenuDataInput;
  oAuthScopes: Maybe<Array<Scalars['String']>>;
  url: Scalars['String'];
};

export type TApplicationExtensionNavbarMenuDataInput = {
  featureToggle: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  key: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<TOAuthScope>;
  submenu: Array<TApplicationExtensionNavbarSubmenuDataInput>;
  uriPath: Scalars['String'];
};

export type TApplicationExtensionNavbarSubmenuDataInput = {
  featureToggle: Maybe<Scalars['String']>;
  key: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<TOAuthScope>;
  uriPath: Scalars['String'];
};

export type TApplicationExtensionWhereInput = {
  AND: Maybe<Array<TApplicationExtensionWhereInput>>;
  NOT: Maybe<Array<TApplicationExtensionWhereInput>>;
  OR: Maybe<Array<TApplicationExtensionWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  description: Maybe<Scalars['String']>;
  description_contains: Maybe<Scalars['String']>;
  description_ends_with: Maybe<Scalars['String']>;
  description_gt: Maybe<Scalars['String']>;
  description_gte: Maybe<Scalars['String']>;
  description_in: Maybe<Array<Scalars['String']>>;
  description_lt: Maybe<Scalars['String']>;
  description_lte: Maybe<Scalars['String']>;
  description_not: Maybe<Scalars['String']>;
  description_not_contains: Maybe<Scalars['String']>;
  description_not_ends_with: Maybe<Scalars['String']>;
  description_not_in: Maybe<Array<Scalars['String']>>;
  description_not_starts_with: Maybe<Scalars['String']>;
  description_starts_with: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  isActive: Maybe<Scalars['Boolean']>;
  isActive_not: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  name_contains: Maybe<Scalars['String']>;
  name_ends_with: Maybe<Scalars['String']>;
  name_gt: Maybe<Scalars['String']>;
  name_gte: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Scalars['String']>>;
  name_lt: Maybe<Scalars['String']>;
  name_lte: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  name_not_ends_with: Maybe<Scalars['String']>;
  name_not_in: Maybe<Array<Scalars['String']>>;
  name_not_starts_with: Maybe<Scalars['String']>;
  name_starts_with: Maybe<Scalars['String']>;
  navbarMenu: Maybe<TNavbarMenuWhereInput>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  url: Maybe<Scalars['String']>;
  url_contains: Maybe<Scalars['String']>;
  url_ends_with: Maybe<Scalars['String']>;
  url_gt: Maybe<Scalars['String']>;
  url_gte: Maybe<Scalars['String']>;
  url_in: Maybe<Array<Scalars['String']>>;
  url_lt: Maybe<Scalars['String']>;
  url_lte: Maybe<Scalars['String']>;
  url_not: Maybe<Scalars['String']>;
  url_not_contains: Maybe<Scalars['String']>;
  url_not_ends_with: Maybe<Scalars['String']>;
  url_not_in: Maybe<Array<Scalars['String']>>;
  url_not_starts_with: Maybe<Scalars['String']>;
  url_starts_with: Maybe<Scalars['String']>;
};

export enum TAuthPermission {
  AccessToProject = 'accessToProject',
  LoggedInUser = 'loggedInUser',
  ManageMyOrganizations = 'manageMyOrganizations',
  ManageProjectSettings = 'manageProjectSettings',
  ViewCartDiscounts = 'viewCartDiscounts',
  ViewCustomers = 'viewCustomers',
  ViewDiscountCodes = 'viewDiscountCodes',
  ViewOrders = 'viewOrders',
  ViewProductDiscounts = 'viewProductDiscounts',
  ViewProducts = 'viewProducts',
  ViewProjectSettings = 'viewProjectSettings',
  ViewSomeDiscounts = 'viewSomeDiscounts'
}

export type TAverageOrderValueConfiguration = {
  __typename?: 'AverageOrderValueConfiguration';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  showPreviousTimeframe: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type TAverageOrderValueConfigurationInput = {
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TAverageOrderValueConfigurationWhereInput = {
  AND: Maybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  NOT: Maybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  OR: Maybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  showPreviousTimeframe: Maybe<Scalars['Boolean']>;
  showPreviousTimeframe_not: Maybe<Scalars['Boolean']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export enum TBestSellingLimit {
  Fifteen = 'FIFTEEN',
  Five = 'FIVE',
  Ten = 'TEN'
}

export type TCartDiscountsListView = {
  __typename?: 'CartDiscountsListView';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
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
  attributeName: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  searchProperty: TCategoryRecommendationSearchProperty;
  updatedAt: Scalars['DateTime'];
};

export type TCategoryRecommendationSettingsDataInput = {
  attributeName: Maybe<Scalars['String']>;
  searchProperty: TCategoryRecommendationSearchProperty;
};

export type TCategoryRecommendationSettingsWhereInput = {
  AND: Maybe<Array<TCategoryRecommendationSettingsWhereInput>>;
  NOT: Maybe<Array<TCategoryRecommendationSettingsWhereInput>>;
  OR: Maybe<Array<TCategoryRecommendationSettingsWhereInput>>;
  attributeName: Maybe<Scalars['String']>;
  attributeName_contains: Maybe<Scalars['String']>;
  attributeName_ends_with: Maybe<Scalars['String']>;
  attributeName_gt: Maybe<Scalars['String']>;
  attributeName_gte: Maybe<Scalars['String']>;
  attributeName_in: Maybe<Array<Scalars['String']>>;
  attributeName_lt: Maybe<Scalars['String']>;
  attributeName_lte: Maybe<Scalars['String']>;
  attributeName_not: Maybe<Scalars['String']>;
  attributeName_not_contains: Maybe<Scalars['String']>;
  attributeName_not_ends_with: Maybe<Scalars['String']>;
  attributeName_not_in: Maybe<Array<Scalars['String']>>;
  attributeName_not_starts_with: Maybe<Scalars['String']>;
  attributeName_starts_with: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  searchProperty: Maybe<TCategoryRecommendationSearchProperty>;
  searchProperty_in: Maybe<Array<TCategoryRecommendationSearchProperty>>;
  searchProperty_not: Maybe<TCategoryRecommendationSearchProperty>;
  searchProperty_not_in: Maybe<Array<TCategoryRecommendationSearchProperty>>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TCustomApplication = {
  __typename?: 'CustomApplication';
  contact: TCustomApplicationContactInformation;
  contacts: Maybe<Array<TCustomApplicationContactPerson>>;
  createdAt: Scalars['DateTime'];
  description: Maybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  id: Scalars['ID'];
  installedBy: Maybe<Array<TCustomApplicationInstallation>>;
  menuLinks: Maybe<TCustomApplicationMenuLink>;
  name: Scalars['String'];
  owner: TOrganizationExtension;
  permissions: Maybe<Array<TCustomApplicationPermission>>;
  status: Maybe<TCustomApplicationStatus>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
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


export type TCustomApplication_InstalledByArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TCustomApplicationInstallationOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TCustomApplicationInstallationWhereInput>;
};


export type TCustomApplication_PermissionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TCustomApplicationPermissionOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TCustomApplicationPermissionWhereInput>;
};

export enum TCustomApplicationContactConsent {
  BetaTester = 'BETA_TESTER',
  CommunityInitiatives = 'COMMUNITY_INITIATIVES',
  LearningMaterial = 'LEARNING_MATERIAL',
  Marketplace = 'MARKETPLACE',
  Newsletter = 'NEWSLETTER',
  UserResearch = 'USER_RESEARCH'
}

export type TCustomApplicationContactInformation = {
  __typename?: 'CustomApplicationContactInformation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  maintainerOf: Maybe<Array<TCustomApplication>>;
};


export type TCustomApplicationContactInformation_MaintainerOfArgs = {
  where: Maybe<TCustomApplicationWhereInput>;
  orderBy: Maybe<TCustomApplicationOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
};

export type TCustomApplicationContactInformationDataInput = {
  email: Scalars['String'];
};

export type TCustomApplicationContactInformationWhereInput = {
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
  AND: Maybe<Array<TCustomApplicationContactInformationWhereInput>>;
  OR: Maybe<Array<TCustomApplicationContactInformationWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationContactInformationWhereInput>>;
};

export type TCustomApplicationContactPerson = {
  __typename?: 'CustomApplicationContactPerson';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
  consents: Array<TCustomApplicationContactConsent>;
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
  consents: Array<TCustomApplicationContactConsent>;
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
  contact: TCustomApplicationContactInformationDataInput;
  contacts: Array<TCustomApplicationContactPersonDataInput>;
  description: Maybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  menuLinks: TCustomApplicationMenuLinksDraftDataInput;
  name: Scalars['String'];
  permissions: Array<TCustomApplicationPermissionDataInput>;
  url: Scalars['String'];
};

export type TCustomApplicationInstallation = {
  __typename?: 'CustomApplicationInstallation';
  acceptedPermissions: Maybe<Array<TCustomApplicationPermission>>;
  application: TCustomApplication;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installInAllProjects: Scalars['Boolean'];
  organization: TOrganizationExtension;
  projects: Maybe<Array<TProjectExtension>>;
  updatedAt: Scalars['DateTime'];
};


export type TCustomApplicationInstallation_AcceptedPermissionsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TCustomApplicationPermissionOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TCustomApplicationPermissionWhereInput>;
};


export type TCustomApplicationInstallation_ProjectsArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TProjectExtensionOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TProjectExtensionWhereInput>;
};

export enum TCustomApplicationInstallationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  InstallInAllProjectsAsc = 'installInAllProjects_ASC',
  InstallInAllProjectsDesc = 'installInAllProjects_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type TCustomApplicationInstallationWhereInput = {
  AND: Maybe<Array<TCustomApplicationInstallationWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationInstallationWhereInput>>;
  OR: Maybe<Array<TCustomApplicationInstallationWhereInput>>;
  acceptedPermissions_every: Maybe<TCustomApplicationPermissionWhereInput>;
  acceptedPermissions_none: Maybe<TCustomApplicationPermissionWhereInput>;
  acceptedPermissions_some: Maybe<TCustomApplicationPermissionWhereInput>;
  application: Maybe<TCustomApplicationWhereInput>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  installInAllProjects: Maybe<Scalars['Boolean']>;
  installInAllProjects_not: Maybe<Scalars['Boolean']>;
  organization: Maybe<TOrganizationExtensionWhereInput>;
  projects_every: Maybe<TProjectExtensionWhereInput>;
  projects_none: Maybe<TProjectExtensionWhereInput>;
  projects_some: Maybe<TProjectExtensionWhereInput>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TCustomApplicationMenuLink = {
  __typename?: 'CustomApplicationMenuLink';
  createdAt: Scalars['DateTime'];
  defaultLabel: Scalars['String'];
  iconName: Scalars['String'];
  id: Scalars['ID'];
  labelAllLocales: Maybe<Array<TLocalizedField>>;
  permissions: Array<Scalars['String']>;
  submenuLinks: Maybe<Array<TCustomApplicationSubmenuLink>>;
  updatedAt: Scalars['DateTime'];
};


export type TCustomApplicationMenuLink_LabelAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};


export type TCustomApplicationMenuLink_SubmenuLinksArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TCustomApplicationSubmenuLinkOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TCustomApplicationSubmenuLinkWhereInput>;
};

export type TCustomApplicationMenuLinkWhereInput = {
  AND: Maybe<Array<TCustomApplicationMenuLinkWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationMenuLinkWhereInput>>;
  OR: Maybe<Array<TCustomApplicationMenuLinkWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  defaultLabel: Maybe<Scalars['String']>;
  defaultLabel_contains: Maybe<Scalars['String']>;
  defaultLabel_ends_with: Maybe<Scalars['String']>;
  defaultLabel_gt: Maybe<Scalars['String']>;
  defaultLabel_gte: Maybe<Scalars['String']>;
  defaultLabel_in: Maybe<Array<Scalars['String']>>;
  defaultLabel_lt: Maybe<Scalars['String']>;
  defaultLabel_lte: Maybe<Scalars['String']>;
  defaultLabel_not: Maybe<Scalars['String']>;
  defaultLabel_not_contains: Maybe<Scalars['String']>;
  defaultLabel_not_ends_with: Maybe<Scalars['String']>;
  defaultLabel_not_in: Maybe<Array<Scalars['String']>>;
  defaultLabel_not_starts_with: Maybe<Scalars['String']>;
  defaultLabel_starts_with: Maybe<Scalars['String']>;
  iconName: Maybe<Scalars['String']>;
  iconName_contains: Maybe<Scalars['String']>;
  iconName_ends_with: Maybe<Scalars['String']>;
  iconName_gt: Maybe<Scalars['String']>;
  iconName_gte: Maybe<Scalars['String']>;
  iconName_in: Maybe<Array<Scalars['String']>>;
  iconName_lt: Maybe<Scalars['String']>;
  iconName_lte: Maybe<Scalars['String']>;
  iconName_not: Maybe<Scalars['String']>;
  iconName_not_contains: Maybe<Scalars['String']>;
  iconName_not_ends_with: Maybe<Scalars['String']>;
  iconName_not_in: Maybe<Array<Scalars['String']>>;
  iconName_not_starts_with: Maybe<Scalars['String']>;
  iconName_starts_with: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  labelAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  submenuLinks_every: Maybe<TCustomApplicationSubmenuLinkWhereInput>;
  submenuLinks_none: Maybe<TCustomApplicationSubmenuLinkWhereInput>;
  submenuLinks_some: Maybe<TCustomApplicationSubmenuLinkWhereInput>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TCustomApplicationMenuLinksDraftDataInput = {
  defaultLabel: Scalars['String'];
  iconName: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<Scalars['String']>;
  submenuLinks: Array<TCustomApplicationSubmenuLinksDraftDataInput>;
};

export enum TCustomApplicationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  EntryPointUriPathAsc = 'entryPointUriPath_ASC',
  EntryPointUriPathDesc = 'entryPointUriPath_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type TCustomApplicationPermission = {
  __typename?: 'CustomApplicationPermission';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TCustomApplicationPermissionDataInput = {
  name: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
};

export enum TCustomApplicationPermissionOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type TCustomApplicationPermissionWhereInput = {
  AND: Maybe<Array<TCustomApplicationPermissionWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationPermissionWhereInput>>;
  OR: Maybe<Array<TCustomApplicationPermissionWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  name: Maybe<Scalars['String']>;
  name_contains: Maybe<Scalars['String']>;
  name_ends_with: Maybe<Scalars['String']>;
  name_gt: Maybe<Scalars['String']>;
  name_gte: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Scalars['String']>>;
  name_lt: Maybe<Scalars['String']>;
  name_lte: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  name_not_ends_with: Maybe<Scalars['String']>;
  name_not_in: Maybe<Array<Scalars['String']>>;
  name_not_starts_with: Maybe<Scalars['String']>;
  name_starts_with: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export enum TCustomApplicationStatus {
  Draft = 'DRAFT',
  PrivateUsage = 'PRIVATE_USAGE'
}

export type TCustomApplicationSubmenuLink = {
  __typename?: 'CustomApplicationSubmenuLink';
  createdAt: Scalars['DateTime'];
  defaultLabel: Scalars['String'];
  id: Scalars['ID'];
  labelAllLocales: Maybe<Array<TLocalizedField>>;
  permissions: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  uriPath: Scalars['String'];
};


export type TCustomApplicationSubmenuLink_LabelAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};

export enum TCustomApplicationSubmenuLinkOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DefaultLabelAsc = 'defaultLabel_ASC',
  DefaultLabelDesc = 'defaultLabel_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UriPathAsc = 'uriPath_ASC',
  UriPathDesc = 'uriPath_DESC'
}

export type TCustomApplicationSubmenuLinkWhereInput = {
  AND: Maybe<Array<TCustomApplicationSubmenuLinkWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationSubmenuLinkWhereInput>>;
  OR: Maybe<Array<TCustomApplicationSubmenuLinkWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  defaultLabel: Maybe<Scalars['String']>;
  defaultLabel_contains: Maybe<Scalars['String']>;
  defaultLabel_ends_with: Maybe<Scalars['String']>;
  defaultLabel_gt: Maybe<Scalars['String']>;
  defaultLabel_gte: Maybe<Scalars['String']>;
  defaultLabel_in: Maybe<Array<Scalars['String']>>;
  defaultLabel_lt: Maybe<Scalars['String']>;
  defaultLabel_lte: Maybe<Scalars['String']>;
  defaultLabel_not: Maybe<Scalars['String']>;
  defaultLabel_not_contains: Maybe<Scalars['String']>;
  defaultLabel_not_ends_with: Maybe<Scalars['String']>;
  defaultLabel_not_in: Maybe<Array<Scalars['String']>>;
  defaultLabel_not_starts_with: Maybe<Scalars['String']>;
  defaultLabel_starts_with: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  labelAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  uriPath: Maybe<Scalars['String']>;
  uriPath_contains: Maybe<Scalars['String']>;
  uriPath_ends_with: Maybe<Scalars['String']>;
  uriPath_gt: Maybe<Scalars['String']>;
  uriPath_gte: Maybe<Scalars['String']>;
  uriPath_in: Maybe<Array<Scalars['String']>>;
  uriPath_lt: Maybe<Scalars['String']>;
  uriPath_lte: Maybe<Scalars['String']>;
  uriPath_not: Maybe<Scalars['String']>;
  uriPath_not_contains: Maybe<Scalars['String']>;
  uriPath_not_ends_with: Maybe<Scalars['String']>;
  uriPath_not_in: Maybe<Array<Scalars['String']>>;
  uriPath_not_starts_with: Maybe<Scalars['String']>;
  uriPath_starts_with: Maybe<Scalars['String']>;
};

export type TCustomApplicationSubmenuLinksDraftDataInput = {
  defaultLabel: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<Scalars['String']>;
  uriPath: Scalars['String'];
};

export type TCustomApplicationWhereInput = {
  AND: Maybe<Array<TCustomApplicationWhereInput>>;
  NOT: Maybe<Array<TCustomApplicationWhereInput>>;
  OR: Maybe<Array<TCustomApplicationWhereInput>>;
  contact: Maybe<TCustomApplicationContactInformationWhereInput>;
  contacts_every: Maybe<TCustomApplicationContactPersonWhereInput>;
  contacts_none: Maybe<TCustomApplicationContactPersonWhereInput>;
  contacts_some: Maybe<TCustomApplicationContactPersonWhereInput>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  description: Maybe<Scalars['String']>;
  description_contains: Maybe<Scalars['String']>;
  description_ends_with: Maybe<Scalars['String']>;
  description_gt: Maybe<Scalars['String']>;
  description_gte: Maybe<Scalars['String']>;
  description_in: Maybe<Array<Scalars['String']>>;
  description_lt: Maybe<Scalars['String']>;
  description_lte: Maybe<Scalars['String']>;
  description_not: Maybe<Scalars['String']>;
  description_not_contains: Maybe<Scalars['String']>;
  description_not_ends_with: Maybe<Scalars['String']>;
  description_not_in: Maybe<Array<Scalars['String']>>;
  description_not_starts_with: Maybe<Scalars['String']>;
  description_starts_with: Maybe<Scalars['String']>;
  entryPointUriPath: Maybe<Scalars['String']>;
  entryPointUriPath_contains: Maybe<Scalars['String']>;
  entryPointUriPath_ends_with: Maybe<Scalars['String']>;
  entryPointUriPath_gt: Maybe<Scalars['String']>;
  entryPointUriPath_gte: Maybe<Scalars['String']>;
  entryPointUriPath_in: Maybe<Array<Scalars['String']>>;
  entryPointUriPath_lt: Maybe<Scalars['String']>;
  entryPointUriPath_lte: Maybe<Scalars['String']>;
  entryPointUriPath_not: Maybe<Scalars['String']>;
  entryPointUriPath_not_contains: Maybe<Scalars['String']>;
  entryPointUriPath_not_ends_with: Maybe<Scalars['String']>;
  entryPointUriPath_not_in: Maybe<Array<Scalars['String']>>;
  entryPointUriPath_not_starts_with: Maybe<Scalars['String']>;
  entryPointUriPath_starts_with: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  installedBy_every: Maybe<TCustomApplicationInstallationWhereInput>;
  installedBy_none: Maybe<TCustomApplicationInstallationWhereInput>;
  installedBy_some: Maybe<TCustomApplicationInstallationWhereInput>;
  menuLinks: Maybe<TCustomApplicationMenuLinkWhereInput>;
  name: Maybe<Scalars['String']>;
  name_contains: Maybe<Scalars['String']>;
  name_ends_with: Maybe<Scalars['String']>;
  name_gt: Maybe<Scalars['String']>;
  name_gte: Maybe<Scalars['String']>;
  name_in: Maybe<Array<Scalars['String']>>;
  name_lt: Maybe<Scalars['String']>;
  name_lte: Maybe<Scalars['String']>;
  name_not: Maybe<Scalars['String']>;
  name_not_contains: Maybe<Scalars['String']>;
  name_not_ends_with: Maybe<Scalars['String']>;
  name_not_in: Maybe<Array<Scalars['String']>>;
  name_not_starts_with: Maybe<Scalars['String']>;
  name_starts_with: Maybe<Scalars['String']>;
  owner: Maybe<TOrganizationExtensionWhereInput>;
  permissions_every: Maybe<TCustomApplicationPermissionWhereInput>;
  permissions_none: Maybe<TCustomApplicationPermissionWhereInput>;
  permissions_some: Maybe<TCustomApplicationPermissionWhereInput>;
  status: Maybe<TCustomApplicationStatus>;
  status_in: Maybe<Array<TCustomApplicationStatus>>;
  status_not: Maybe<TCustomApplicationStatus>;
  status_not_in: Maybe<Array<TCustomApplicationStatus>>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  url: Maybe<Scalars['String']>;
  url_contains: Maybe<Scalars['String']>;
  url_ends_with: Maybe<Scalars['String']>;
  url_gt: Maybe<Scalars['String']>;
  url_gte: Maybe<Scalars['String']>;
  url_in: Maybe<Array<Scalars['String']>>;
  url_lt: Maybe<Scalars['String']>;
  url_lte: Maybe<Scalars['String']>;
  url_not: Maybe<Scalars['String']>;
  url_not_contains: Maybe<Scalars['String']>;
  url_not_ends_with: Maybe<Scalars['String']>;
  url_not_in: Maybe<Array<Scalars['String']>>;
  url_not_starts_with: Maybe<Scalars['String']>;
  url_starts_with: Maybe<Scalars['String']>;
};

export type TCustomersListView = {
  __typename?: 'CustomersListView';
  createdAt: Scalars['DateTime'];
  filters: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive: Maybe<Scalars['Boolean']>;
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search: Maybe<Scalars['String']>;
  sort: Maybe<TSort>;
  table: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TCustomersListView_FiltersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TFilterValuesOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TFilterValuesWhereInput>;
};


export type TCustomersListView_NameAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};

export type TCustomersListViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search: Maybe<Scalars['String']>;
  sort: TSortCreateInput;
  table: Maybe<TCustomersListViewTableInput>;
};

export type TCustomersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TDashboardView = {
  __typename?: 'DashboardView';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  layout: Maybe<Array<TLayoutCard>>;
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TDashboardView_LayoutArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLayoutCardOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLayoutCardWhereInput>;
};


export type TDashboardView_NameAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};

export type TDashboardViewInput = {
  layout: Array<TLayoutCardInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
};

export enum TDateFilterType {
  Custom = 'CUSTOM',
  Day = 'DAY',
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Week = 'WEEK',
  Year = 'YEAR'
}


export type TDiscountCodesListView = {
  __typename?: 'DiscountCodesListView';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  visibleColumns: Array<Scalars['String']>;
};

export type TDiscountCodesListViewInput = {
  visibleColumns: Array<Scalars['String']>;
};

export enum TDiscountType {
  CartDiscount = 'CartDiscount',
  DiscountCode = 'DiscountCode',
  ProductDiscount = 'ProductDiscount'
}

export type TDiscountsCustomView = {
  __typename?: 'DiscountsCustomView';
  createdAt: Scalars['DateTime'];
  filters: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive: Maybe<Scalars['Boolean']>;
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search: Maybe<Scalars['String']>;
  sort: Maybe<TSort>;
  table: Maybe<TTable>;
  type: TDiscountType;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TDiscountsCustomView_FiltersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TFilterValuesOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TFilterValuesWhereInput>;
};


export type TDiscountsCustomView_NameAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};

export type TDiscountsCustomViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search: Maybe<Scalars['String']>;
  sort: TSortCreateInput;
  table: Maybe<TOrdersListViewTableInput>;
};

export enum TExistence {
  All = 'All',
  Empty = 'Empty',
  Filled = 'Filled'
}

export enum TFilterType {
  CustomField = 'CustomField',
  EqualTo = 'EqualTo',
  In = 'In',
  LessThan = 'LessThan',
  Missing = 'Missing',
  MissingIn = 'MissingIn',
  MoreThan = 'MoreThan',
  Range = 'Range'
}

export type TFilterValues = {
  __typename?: 'FilterValues';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  json: Scalars['Json'];
  target: Scalars['String'];
  type: TFilterType;
  updatedAt: Scalars['DateTime'];
};

export type TFilterValuesCreateInput = {
  id: Maybe<Scalars['ID']>;
  json: Scalars['Json'];
  target: Scalars['String'];
  type: TFilterType;
};

export enum TFilterValuesOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  JsonAsc = 'json_ASC',
  JsonDesc = 'json_DESC',
  TargetAsc = 'target_ASC',
  TargetDesc = 'target_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type TFilterValuesWhereInput = {
  AND: Maybe<Array<TFilterValuesWhereInput>>;
  NOT: Maybe<Array<TFilterValuesWhereInput>>;
  OR: Maybe<Array<TFilterValuesWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  target: Maybe<Scalars['String']>;
  target_contains: Maybe<Scalars['String']>;
  target_ends_with: Maybe<Scalars['String']>;
  target_gt: Maybe<Scalars['String']>;
  target_gte: Maybe<Scalars['String']>;
  target_in: Maybe<Array<Scalars['String']>>;
  target_lt: Maybe<Scalars['String']>;
  target_lte: Maybe<Scalars['String']>;
  target_not: Maybe<Scalars['String']>;
  target_not_contains: Maybe<Scalars['String']>;
  target_not_ends_with: Maybe<Scalars['String']>;
  target_not_in: Maybe<Array<Scalars['String']>>;
  target_not_starts_with: Maybe<Scalars['String']>;
  target_starts_with: Maybe<Scalars['String']>;
  type: Maybe<TFilterType>;
  type_in: Maybe<Array<TFilterType>>;
  type_not: Maybe<TFilterType>;
  type_not_in: Maybe<Array<TFilterType>>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TImageRegex = {
  __typename?: 'ImageRegex';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  small: Maybe<TImageRegexOptions>;
  thumb: Maybe<TImageRegexOptions>;
  updatedAt: Scalars['DateTime'];
};

export type TImageRegexDataInput = {
  small: Maybe<TImageRegexOptionsInput>;
  thumb: Maybe<TImageRegexOptionsInput>;
};

export type TImageRegexOptions = {
  __typename?: 'ImageRegexOptions';
  createdAt: Scalars['DateTime'];
  flag: Scalars['String'];
  id: Scalars['ID'];
  replace: Scalars['String'];
  search: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TImageRegexOptionsInput = {
  flag: Scalars['String'];
  replace: Scalars['String'];
  search: Scalars['String'];
};

export type TImageRegexOptionsWhereInput = {
  AND: Maybe<Array<TImageRegexOptionsWhereInput>>;
  NOT: Maybe<Array<TImageRegexOptionsWhereInput>>;
  OR: Maybe<Array<TImageRegexOptionsWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  flag: Maybe<Scalars['String']>;
  flag_contains: Maybe<Scalars['String']>;
  flag_ends_with: Maybe<Scalars['String']>;
  flag_gt: Maybe<Scalars['String']>;
  flag_gte: Maybe<Scalars['String']>;
  flag_in: Maybe<Array<Scalars['String']>>;
  flag_lt: Maybe<Scalars['String']>;
  flag_lte: Maybe<Scalars['String']>;
  flag_not: Maybe<Scalars['String']>;
  flag_not_contains: Maybe<Scalars['String']>;
  flag_not_ends_with: Maybe<Scalars['String']>;
  flag_not_in: Maybe<Array<Scalars['String']>>;
  flag_not_starts_with: Maybe<Scalars['String']>;
  flag_starts_with: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  replace: Maybe<Scalars['String']>;
  replace_contains: Maybe<Scalars['String']>;
  replace_ends_with: Maybe<Scalars['String']>;
  replace_gt: Maybe<Scalars['String']>;
  replace_gte: Maybe<Scalars['String']>;
  replace_in: Maybe<Array<Scalars['String']>>;
  replace_lt: Maybe<Scalars['String']>;
  replace_lte: Maybe<Scalars['String']>;
  replace_not: Maybe<Scalars['String']>;
  replace_not_contains: Maybe<Scalars['String']>;
  replace_not_ends_with: Maybe<Scalars['String']>;
  replace_not_in: Maybe<Array<Scalars['String']>>;
  replace_not_starts_with: Maybe<Scalars['String']>;
  replace_starts_with: Maybe<Scalars['String']>;
  search: Maybe<Scalars['String']>;
  search_contains: Maybe<Scalars['String']>;
  search_ends_with: Maybe<Scalars['String']>;
  search_gt: Maybe<Scalars['String']>;
  search_gte: Maybe<Scalars['String']>;
  search_in: Maybe<Array<Scalars['String']>>;
  search_lt: Maybe<Scalars['String']>;
  search_lte: Maybe<Scalars['String']>;
  search_not: Maybe<Scalars['String']>;
  search_not_contains: Maybe<Scalars['String']>;
  search_not_ends_with: Maybe<Scalars['String']>;
  search_not_in: Maybe<Array<Scalars['String']>>;
  search_not_starts_with: Maybe<Scalars['String']>;
  search_starts_with: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TImageRegexWhereInput = {
  AND: Maybe<Array<TImageRegexWhereInput>>;
  NOT: Maybe<Array<TImageRegexWhereInput>>;
  OR: Maybe<Array<TImageRegexWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  small: Maybe<TImageRegexOptionsWhereInput>;
  thumb: Maybe<TImageRegexOptionsWhereInput>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};


export type TLayoutCard = {
  __typename?: 'LayoutCard';
  averageOrderValueConfiguration: Maybe<TAverageOrderValueConfiguration>;
  createdAt: Scalars['DateTime'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  key: TMetricCardType;
  minHeight: Maybe<Scalars['Int']>;
  minWidth: Maybe<Scalars['Int']>;
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  orderStatusConfiguration: Maybe<TOrderStatusConfiguration>;
  resourcesNumbersConfiguration: Maybe<TResourcesNumbersConfiguration>;
  salesPerformanceConfiguration: Maybe<TSalesPerformanceConfiguration>;
  topProductsConfiguration: Maybe<TTopProductsConfiguration>;
  totalOrdersConfiguration: Maybe<TTotalOrdersConfiguration>;
  totalSalesConfiguration: Maybe<TTotalSalesConfiguration>;
  updatedAt: Scalars['DateTime'];
  width: Scalars['Int'];
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
};


export type TLayoutCard_NameAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};

export type TLayoutCardInput = {
  averageOrderValueConfiguration: Maybe<TAverageOrderValueConfigurationInput>;
  height: Scalars['Int'];
  key: TMetricCardType;
  minHeight: Maybe<Scalars['Int']>;
  minWidth: Maybe<Scalars['Int']>;
  nameAllLocales: Maybe<Array<TLocalizedFieldCreateInput>>;
  orderStatusConfiguration: Maybe<TOrderStatusConfigurationInput>;
  resourcesNumbersConfiguration: Maybe<TResourcesNumbersConfigurationInput>;
  salesPerformanceConfiguration: Maybe<TSalesPerformanceConfigurationInput>;
  topProductsConfiguration: Maybe<TTopProductsConfigurationInput>;
  totalOrdersConfiguration: Maybe<TTotalOrdersConfigurationInput>;
  totalSalesConfiguration: Maybe<TTotalSalesConfigurationInput>;
  width: Scalars['Int'];
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
};

export enum TLayoutCardOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  MinHeightAsc = 'minHeight_ASC',
  MinHeightDesc = 'minHeight_DESC',
  MinWidthAsc = 'minWidth_ASC',
  MinWidthDesc = 'minWidth_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  XPositionAsc = 'xPosition_ASC',
  XPositionDesc = 'xPosition_DESC',
  YPositionAsc = 'yPosition_ASC',
  YPositionDesc = 'yPosition_DESC'
}

export type TLayoutCardWhereInput = {
  AND: Maybe<Array<TLayoutCardWhereInput>>;
  NOT: Maybe<Array<TLayoutCardWhereInput>>;
  OR: Maybe<Array<TLayoutCardWhereInput>>;
  averageOrderValueConfiguration: Maybe<TAverageOrderValueConfigurationWhereInput>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  height: Maybe<Scalars['Int']>;
  height_gt: Maybe<Scalars['Int']>;
  height_gte: Maybe<Scalars['Int']>;
  height_in: Maybe<Array<Scalars['Int']>>;
  height_lt: Maybe<Scalars['Int']>;
  height_lte: Maybe<Scalars['Int']>;
  height_not: Maybe<Scalars['Int']>;
  height_not_in: Maybe<Array<Scalars['Int']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  key: Maybe<TMetricCardType>;
  key_in: Maybe<Array<TMetricCardType>>;
  key_not: Maybe<TMetricCardType>;
  key_not_in: Maybe<Array<TMetricCardType>>;
  minHeight: Maybe<Scalars['Int']>;
  minHeight_gt: Maybe<Scalars['Int']>;
  minHeight_gte: Maybe<Scalars['Int']>;
  minHeight_in: Maybe<Array<Scalars['Int']>>;
  minHeight_lt: Maybe<Scalars['Int']>;
  minHeight_lte: Maybe<Scalars['Int']>;
  minHeight_not: Maybe<Scalars['Int']>;
  minHeight_not_in: Maybe<Array<Scalars['Int']>>;
  minWidth: Maybe<Scalars['Int']>;
  minWidth_gt: Maybe<Scalars['Int']>;
  minWidth_gte: Maybe<Scalars['Int']>;
  minWidth_in: Maybe<Array<Scalars['Int']>>;
  minWidth_lt: Maybe<Scalars['Int']>;
  minWidth_lte: Maybe<Scalars['Int']>;
  minWidth_not: Maybe<Scalars['Int']>;
  minWidth_not_in: Maybe<Array<Scalars['Int']>>;
  nameAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  nameAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  nameAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  orderStatusConfiguration: Maybe<TOrderStatusConfigurationWhereInput>;
  resourcesNumbersConfiguration: Maybe<TResourcesNumbersConfigurationWhereInput>;
  salesPerformanceConfiguration: Maybe<TSalesPerformanceConfigurationWhereInput>;
  topProductsConfiguration: Maybe<TTopProductsConfigurationWhereInput>;
  totalOrdersConfiguration: Maybe<TTotalOrdersConfigurationWhereInput>;
  totalSalesConfiguration: Maybe<TTotalSalesConfigurationWhereInput>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  width: Maybe<Scalars['Int']>;
  width_gt: Maybe<Scalars['Int']>;
  width_gte: Maybe<Scalars['Int']>;
  width_in: Maybe<Array<Scalars['Int']>>;
  width_lt: Maybe<Scalars['Int']>;
  width_lte: Maybe<Scalars['Int']>;
  width_not: Maybe<Scalars['Int']>;
  width_not_in: Maybe<Array<Scalars['Int']>>;
  xPosition: Maybe<Scalars['Int']>;
  xPosition_gt: Maybe<Scalars['Int']>;
  xPosition_gte: Maybe<Scalars['Int']>;
  xPosition_in: Maybe<Array<Scalars['Int']>>;
  xPosition_lt: Maybe<Scalars['Int']>;
  xPosition_lte: Maybe<Scalars['Int']>;
  xPosition_not: Maybe<Scalars['Int']>;
  xPosition_not_in: Maybe<Array<Scalars['Int']>>;
  yPosition: Maybe<Scalars['Int']>;
  yPosition_gt: Maybe<Scalars['Int']>;
  yPosition_gte: Maybe<Scalars['Int']>;
  yPosition_in: Maybe<Array<Scalars['Int']>>;
  yPosition_lt: Maybe<Scalars['Int']>;
  yPosition_lte: Maybe<Scalars['Int']>;
  yPosition_not: Maybe<Scalars['Int']>;
  yPosition_not_in: Maybe<Array<Scalars['Int']>>;
};

export type TLocalizedField = {
  __typename?: 'LocalizedField';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  locale: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LocaleAsc = 'locale_ASC',
  LocaleDesc = 'locale_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  ValueAsc = 'value_ASC',
  ValueDesc = 'value_DESC'
}

export type TLocalizedFieldWhereInput = {
  AND: Maybe<Array<TLocalizedFieldWhereInput>>;
  NOT: Maybe<Array<TLocalizedFieldWhereInput>>;
  OR: Maybe<Array<TLocalizedFieldWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  locale: Maybe<Scalars['String']>;
  locale_contains: Maybe<Scalars['String']>;
  locale_ends_with: Maybe<Scalars['String']>;
  locale_gt: Maybe<Scalars['String']>;
  locale_gte: Maybe<Scalars['String']>;
  locale_in: Maybe<Array<Scalars['String']>>;
  locale_lt: Maybe<Scalars['String']>;
  locale_lte: Maybe<Scalars['String']>;
  locale_not: Maybe<Scalars['String']>;
  locale_not_contains: Maybe<Scalars['String']>;
  locale_not_ends_with: Maybe<Scalars['String']>;
  locale_not_in: Maybe<Array<Scalars['String']>>;
  locale_not_starts_with: Maybe<Scalars['String']>;
  locale_starts_with: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  value: Maybe<Scalars['String']>;
  value_contains: Maybe<Scalars['String']>;
  value_ends_with: Maybe<Scalars['String']>;
  value_gt: Maybe<Scalars['String']>;
  value_gte: Maybe<Scalars['String']>;
  value_in: Maybe<Array<Scalars['String']>>;
  value_lt: Maybe<Scalars['String']>;
  value_lte: Maybe<Scalars['String']>;
  value_not: Maybe<Scalars['String']>;
  value_not_contains: Maybe<Scalars['String']>;
  value_not_ends_with: Maybe<Scalars['String']>;
  value_not_in: Maybe<Array<Scalars['String']>>;
  value_not_starts_with: Maybe<Scalars['String']>;
  value_starts_with: Maybe<Scalars['String']>;
};

export enum TMetricCardType {
  AverageOrderValue = 'AVERAGE_ORDER_VALUE',
  OrderStatus = 'ORDER_STATUS',
  ProductTopVariants = 'PRODUCT_TOP_VARIANTS',
  ResourcesNumbers = 'RESOURCES_NUMBERS',
  SalesPerformance = 'SALES_PERFORMANCE',
  TotalOrders = 'TOTAL_ORDERS',
  TotalSales = 'TOTAL_SALES'
}

export type TMutation = {
  __typename?: 'Mutation';
  activateCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  activateCustomersListView: Maybe<TCustomersListView>;
  activateDashboardView: Maybe<TDashboardView>;
  activateDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  activateOrdersListView: Maybe<TOrdersListView>;
  activateOrganizationExtensionOidcSsoConfig: Maybe<TOrganizationExtension>;
  activatePimSearchListView: Maybe<TPimSearchListView>;
  activateProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  activateProductTypeAttributesView: Maybe<TProductTypeAttributesView>;
  activateProjectExtensionApplication: Maybe<TProjectExtension>;
  changeCustomApplicationStatus: Maybe<TCustomApplication>;
  createCartDiscountsCustomView: TDiscountsCustomView;
  createCartDiscountsListView: Maybe<TCartDiscountsListView>;
  createCustomApplication: Maybe<TCustomApplication>;
  createCustomersListView: TCustomersListView;
  createDashboardView: TDashboardView;
  createDiscountCodesCustomView: TDiscountsCustomView;
  createDiscountCodesListView: Maybe<TDiscountCodesListView>;
  createOrdersListView: TOrdersListView;
  createPimSearchListView: TPimSearchListView;
  createProductDiscountsCustomView: TDiscountsCustomView;
  createProductDiscountsListView: Maybe<TProductDiscountsListView>;
  createProductTypeAttributesView: TProductTypeAttributesView;
  createProjectExtensionApplication: Maybe<TProjectExtension>;
  createVariantPricesListView: Maybe<TVariantPricesListView>;
  deactivateCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  deactivateCustomersListView: Maybe<TOrdersListView>;
  deactivateDashboardView: Maybe<TDashboardView>;
  deactivateDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  deactivateOrdersListView: Maybe<TOrdersListView>;
  deactivateOrganizationExtensionOidcSsoConfig: Maybe<TOrganizationExtension>;
  deactivatePimSearchListView: Maybe<TPimSearchListView>;
  deactivateProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  deactivateProductTypeAttributesView: Maybe<TProductTypeAttributesView>;
  deactivateProjectExtensionApplication: Maybe<TProjectExtension>;
  deleteAllDashboardViews: Array<TDashboardView>;
  deleteCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  deleteCustomApplication: Maybe<TCustomApplication>;
  deleteCustomersListView: Maybe<TCustomersListView>;
  deleteDashboardView: Maybe<TDashboardView>;
  deleteDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  deleteOrdersListView: Maybe<TOrdersListView>;
  deletePimSearchListView: Maybe<TPimSearchListView>;
  deleteProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  deleteProductTypeAttributesView: Maybe<TProductTypeAttributesView>;
  deleteProjectExtensionApplication: Maybe<TProjectExtension>;
  installCustomApplication: Maybe<TCustomApplicationInstallation>;
  setOrganizationExtensionOidcSsoConfig: Maybe<TOrganizationExtension>;
  setProjectExtensionCategoryRecommendation: Maybe<TProjectExtension>;
  setProjectExtensionImageRegex: Maybe<TProjectExtension>;
  setProjectExtensionOrderStatesVisibility: Maybe<TProjectExtension>;
  uninstallCustomApplication: Maybe<TCustomApplicationInstallation>;
  updateCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  updateCartDiscountsListView: Maybe<TCartDiscountsListView>;
  updateCustomApplication: Maybe<TCustomApplication>;
  updateCustomApplicationProjectsInstallation: Maybe<TCustomApplicationInstallation>;
  updateCustomersListView: Maybe<TCustomersListView>;
  updateDashboardView: Maybe<TDashboardView>;
  updateDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  updateDiscountCodesListView: Maybe<TDiscountCodesListView>;
  updateOrdersListView: Maybe<TOrdersListView>;
  updatePimSearchListView: Maybe<TPimSearchListView>;
  updateProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  updateProductDiscountsListView: Maybe<TProductDiscountsListView>;
  updateProductTypeAttributesView: TProductTypeAttributesView;
  updateProjectExtensionApplication: Maybe<TProjectExtension>;
  updateRuleBuilderQuickSelectionValues: Maybe<TRuleBuilderQuickSelectionValues>;
  updateVariantPricesListView: Maybe<TVariantPricesListView>;
};


export type TMutation_ActivateCartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateCustomersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateDashboardViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateDiscountCodesCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateOrdersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateOrganizationExtensionOidcSsoConfigArgs = {
  organizationId: Scalars['String'];
};


export type TMutation_ActivatePimSearchListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateProductDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_ActivateProductTypeAttributesViewArgs = {
  id: Scalars['ID'];
  isVariant: Scalars['Boolean'];
  productTypeId: Scalars['String'];
};


export type TMutation_ActivateProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID'];
};


export type TMutation_ChangeCustomApplicationStatusArgs = {
  applicationId: Scalars['ID'];
  organizationId: Scalars['String'];
  status: TCustomApplicationStatus;
};


export type TMutation_CreateCartDiscountsCustomViewArgs = {
  data: TDiscountsCustomViewInput;
};


export type TMutation_CreateCartDiscountsListViewArgs = {
  data: TCartDiscountsListViewInput;
};


export type TMutation_CreateCustomApplicationArgs = {
  data: TCustomApplicationDraftDataInput;
  organizationId: Scalars['String'];
};


export type TMutation_CreateCustomersListViewArgs = {
  data: TCustomersListViewInput;
};


export type TMutation_CreateDashboardViewArgs = {
  data: TDashboardViewInput;
};


export type TMutation_CreateDiscountCodesCustomViewArgs = {
  data: TDiscountsCustomViewInput;
};


export type TMutation_CreateDiscountCodesListViewArgs = {
  data: TDiscountCodesListViewInput;
};


export type TMutation_CreateOrdersListViewArgs = {
  data: TOrdersListViewInput;
};


export type TMutation_CreatePimSearchListViewArgs = {
  data: TPimSearchListViewInput;
};


export type TMutation_CreateProductDiscountsCustomViewArgs = {
  data: TDiscountsCustomViewInput;
};


export type TMutation_CreateProductDiscountsListViewArgs = {
  data: TProductDiscountsListViewInput;
};


export type TMutation_CreateProductTypeAttributesViewArgs = {
  data: TProductTypeAttributesViewInput;
};


export type TMutation_CreateProjectExtensionApplicationArgs = {
  data: TApplicationExtensionDataInput;
};


export type TMutation_CreateVariantPricesListViewArgs = {
  data: TVariantPricesListViewInput;
};


export type TMutation_DeactivateCartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateCustomersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateDashboardViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateDiscountCodesCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateOrdersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateOrganizationExtensionOidcSsoConfigArgs = {
  organizationId: Scalars['String'];
};


export type TMutation_DeactivatePimSearchListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateProductDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateProductTypeAttributesViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeactivateProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID'];
};


export type TMutation_DeleteCartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeleteCustomApplicationArgs = {
  applicationId: Scalars['ID'];
  organizationId: Scalars['String'];
};


export type TMutation_DeleteCustomersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeleteDashboardViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeleteDiscountCodesCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeleteOrdersListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeletePimSearchListViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeleteProductDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeleteProductTypeAttributesViewArgs = {
  id: Scalars['ID'];
};


export type TMutation_DeleteProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID'];
};


export type TMutation_InstallCustomApplicationArgs = {
  applicationId: Scalars['ID'];
  organizationId: Scalars['String'];
  projectKeys: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type TMutation_SetOrganizationExtensionOidcSsoConfigArgs = {
  data: TOidcSsoConfigDataInput;
  organizationId: Scalars['String'];
};


export type TMutation_SetProjectExtensionCategoryRecommendationArgs = {
  data: Maybe<TCategoryRecommendationSettingsDataInput>;
};


export type TMutation_SetProjectExtensionImageRegexArgs = {
  data: Maybe<TImageRegexDataInput>;
};


export type TMutation_SetProjectExtensionOrderStatesVisibilityArgs = {
  data: Maybe<Array<Maybe<TOrderStatesVisibility>>>;
};


export type TMutation_UninstallCustomApplicationArgs = {
  installedApplicationId: Scalars['ID'];
  organizationId: Scalars['String'];
};


export type TMutation_UpdateCartDiscountsCustomViewArgs = {
  data: TDiscountsCustomViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateCartDiscountsListViewArgs = {
  data: TCartDiscountsListViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateCustomApplicationArgs = {
  applicationId: Scalars['ID'];
  data: TCustomApplicationDraftDataInput;
  organizationId: Scalars['String'];
};


export type TMutation_UpdateCustomApplicationProjectsInstallationArgs = {
  installedApplicationId: Scalars['ID'];
  organizationId: Scalars['String'];
  projectKeys: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type TMutation_UpdateCustomersListViewArgs = {
  data: TCustomersListViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateDashboardViewArgs = {
  data: TDashboardViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateDiscountCodesCustomViewArgs = {
  data: TDiscountsCustomViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateDiscountCodesListViewArgs = {
  data: TDiscountCodesListViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateOrdersListViewArgs = {
  data: TOrdersListViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdatePimSearchListViewArgs = {
  data: TPimSearchListViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateProductDiscountsCustomViewArgs = {
  data: TDiscountsCustomViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateProductDiscountsListViewArgs = {
  data: TProductDiscountsListViewInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateProductTypeAttributesViewArgs = {
  data: TProductTypeAttributesViewUpdateInput;
  id: Scalars['ID'];
};


export type TMutation_UpdateProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID'];
  data: TApplicationExtensionDataInput;
};


export type TMutation_UpdateRuleBuilderQuickSelectionValuesArgs = {
  data: TRuleBuilderQuickSelectionInput;
  id: Maybe<Scalars['ID']>;
};


export type TMutation_UpdateVariantPricesListViewArgs = {
  data: TVariantPricesListViewInput;
  id: Scalars['ID'];
};

export type TNavbarMenu = {
  __typename?: 'NavbarMenu';
  createdAt: Scalars['DateTime'];
  featureToggle: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  id: Scalars['ID'];
  key: Scalars['String'];
  labelAllLocales: Maybe<Array<TLocalizedField>>;
  permissions: Array<TOAuthScope>;
  submenu: Maybe<Array<TNavbarSubmenu>>;
  updatedAt: Scalars['DateTime'];
  uriPath: Scalars['String'];
};


export type TNavbarMenu_LabelAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};


export type TNavbarMenu_SubmenuArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TNavbarSubmenuOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TNavbarSubmenuWhereInput>;
};

export type TNavbarMenuWhereInput = {
  AND: Maybe<Array<TNavbarMenuWhereInput>>;
  NOT: Maybe<Array<TNavbarMenuWhereInput>>;
  OR: Maybe<Array<TNavbarMenuWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  featureToggle: Maybe<Scalars['String']>;
  featureToggle_contains: Maybe<Scalars['String']>;
  featureToggle_ends_with: Maybe<Scalars['String']>;
  featureToggle_gt: Maybe<Scalars['String']>;
  featureToggle_gte: Maybe<Scalars['String']>;
  featureToggle_in: Maybe<Array<Scalars['String']>>;
  featureToggle_lt: Maybe<Scalars['String']>;
  featureToggle_lte: Maybe<Scalars['String']>;
  featureToggle_not: Maybe<Scalars['String']>;
  featureToggle_not_contains: Maybe<Scalars['String']>;
  featureToggle_not_ends_with: Maybe<Scalars['String']>;
  featureToggle_not_in: Maybe<Array<Scalars['String']>>;
  featureToggle_not_starts_with: Maybe<Scalars['String']>;
  featureToggle_starts_with: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  icon_contains: Maybe<Scalars['String']>;
  icon_ends_with: Maybe<Scalars['String']>;
  icon_gt: Maybe<Scalars['String']>;
  icon_gte: Maybe<Scalars['String']>;
  icon_in: Maybe<Array<Scalars['String']>>;
  icon_lt: Maybe<Scalars['String']>;
  icon_lte: Maybe<Scalars['String']>;
  icon_not: Maybe<Scalars['String']>;
  icon_not_contains: Maybe<Scalars['String']>;
  icon_not_ends_with: Maybe<Scalars['String']>;
  icon_not_in: Maybe<Array<Scalars['String']>>;
  icon_not_starts_with: Maybe<Scalars['String']>;
  icon_starts_with: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  key: Maybe<Scalars['String']>;
  key_contains: Maybe<Scalars['String']>;
  key_ends_with: Maybe<Scalars['String']>;
  key_gt: Maybe<Scalars['String']>;
  key_gte: Maybe<Scalars['String']>;
  key_in: Maybe<Array<Scalars['String']>>;
  key_lt: Maybe<Scalars['String']>;
  key_lte: Maybe<Scalars['String']>;
  key_not: Maybe<Scalars['String']>;
  key_not_contains: Maybe<Scalars['String']>;
  key_not_ends_with: Maybe<Scalars['String']>;
  key_not_in: Maybe<Array<Scalars['String']>>;
  key_not_starts_with: Maybe<Scalars['String']>;
  key_starts_with: Maybe<Scalars['String']>;
  labelAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  submenu_every: Maybe<TNavbarSubmenuWhereInput>;
  submenu_none: Maybe<TNavbarSubmenuWhereInput>;
  submenu_some: Maybe<TNavbarSubmenuWhereInput>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  uriPath: Maybe<Scalars['String']>;
  uriPath_contains: Maybe<Scalars['String']>;
  uriPath_ends_with: Maybe<Scalars['String']>;
  uriPath_gt: Maybe<Scalars['String']>;
  uriPath_gte: Maybe<Scalars['String']>;
  uriPath_in: Maybe<Array<Scalars['String']>>;
  uriPath_lt: Maybe<Scalars['String']>;
  uriPath_lte: Maybe<Scalars['String']>;
  uriPath_not: Maybe<Scalars['String']>;
  uriPath_not_contains: Maybe<Scalars['String']>;
  uriPath_not_ends_with: Maybe<Scalars['String']>;
  uriPath_not_in: Maybe<Array<Scalars['String']>>;
  uriPath_not_starts_with: Maybe<Scalars['String']>;
  uriPath_starts_with: Maybe<Scalars['String']>;
};

export type TNavbarSubmenu = {
  __typename?: 'NavbarSubmenu';
  createdAt: Scalars['DateTime'];
  featureToggle: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  key: Scalars['String'];
  labelAllLocales: Maybe<Array<TLocalizedField>>;
  permissions: Array<TOAuthScope>;
  updatedAt: Scalars['DateTime'];
  uriPath: Scalars['String'];
};


export type TNavbarSubmenu_LabelAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};

export enum TNavbarSubmenuOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FeatureToggleAsc = 'featureToggle_ASC',
  FeatureToggleDesc = 'featureToggle_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UriPathAsc = 'uriPath_ASC',
  UriPathDesc = 'uriPath_DESC'
}

export type TNavbarSubmenuWhereInput = {
  AND: Maybe<Array<TNavbarSubmenuWhereInput>>;
  NOT: Maybe<Array<TNavbarSubmenuWhereInput>>;
  OR: Maybe<Array<TNavbarSubmenuWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  featureToggle: Maybe<Scalars['String']>;
  featureToggle_contains: Maybe<Scalars['String']>;
  featureToggle_ends_with: Maybe<Scalars['String']>;
  featureToggle_gt: Maybe<Scalars['String']>;
  featureToggle_gte: Maybe<Scalars['String']>;
  featureToggle_in: Maybe<Array<Scalars['String']>>;
  featureToggle_lt: Maybe<Scalars['String']>;
  featureToggle_lte: Maybe<Scalars['String']>;
  featureToggle_not: Maybe<Scalars['String']>;
  featureToggle_not_contains: Maybe<Scalars['String']>;
  featureToggle_not_ends_with: Maybe<Scalars['String']>;
  featureToggle_not_in: Maybe<Array<Scalars['String']>>;
  featureToggle_not_starts_with: Maybe<Scalars['String']>;
  featureToggle_starts_with: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  key: Maybe<Scalars['String']>;
  key_contains: Maybe<Scalars['String']>;
  key_ends_with: Maybe<Scalars['String']>;
  key_gt: Maybe<Scalars['String']>;
  key_gte: Maybe<Scalars['String']>;
  key_in: Maybe<Array<Scalars['String']>>;
  key_lt: Maybe<Scalars['String']>;
  key_lte: Maybe<Scalars['String']>;
  key_not: Maybe<Scalars['String']>;
  key_not_contains: Maybe<Scalars['String']>;
  key_not_ends_with: Maybe<Scalars['String']>;
  key_not_in: Maybe<Array<Scalars['String']>>;
  key_not_starts_with: Maybe<Scalars['String']>;
  key_starts_with: Maybe<Scalars['String']>;
  labelAllLocales_every: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some: Maybe<TLocalizedFieldWhereInput>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  uriPath: Maybe<Scalars['String']>;
  uriPath_contains: Maybe<Scalars['String']>;
  uriPath_ends_with: Maybe<Scalars['String']>;
  uriPath_gt: Maybe<Scalars['String']>;
  uriPath_gte: Maybe<Scalars['String']>;
  uriPath_in: Maybe<Array<Scalars['String']>>;
  uriPath_lt: Maybe<Scalars['String']>;
  uriPath_lte: Maybe<Scalars['String']>;
  uriPath_not: Maybe<Scalars['String']>;
  uriPath_not_contains: Maybe<Scalars['String']>;
  uriPath_not_ends_with: Maybe<Scalars['String']>;
  uriPath_not_in: Maybe<Array<Scalars['String']>>;
  uriPath_not_starts_with: Maybe<Scalars['String']>;
  uriPath_starts_with: Maybe<Scalars['String']>;
};

export enum TOAuthScope {
  ManageCartDiscounts = 'ManageCartDiscounts',
  ManageCategories = 'ManageCategories',
  ManageCustomerGroups = 'ManageCustomerGroups',
  ManageCustomers = 'ManageCustomers',
  ManageDeveloperSettings = 'ManageDeveloperSettings',
  ManageDiscountCodes = 'ManageDiscountCodes',
  ManageImportSinks = 'ManageImportSinks',
  ManageOrders = 'ManageOrders',
  ManageProductDiscounts = 'ManageProductDiscounts',
  ManageProductTypes = 'ManageProductTypes',
  ManageProducts = 'ManageProducts',
  ManageProject = 'ManageProject',
  ManageProjectSettings = 'ManageProjectSettings',
  ViewCartDiscounts = 'ViewCartDiscounts',
  ViewCategories = 'ViewCategories',
  ViewCustomerGroups = 'ViewCustomerGroups',
  ViewCustomers = 'ViewCustomers',
  ViewDeveloperSettings = 'ViewDeveloperSettings',
  ViewDiscountCodes = 'ViewDiscountCodes',
  ViewImportSinks = 'ViewImportSinks',
  ViewOrders = 'ViewOrders',
  ViewProductDiscounts = 'ViewProductDiscounts',
  ViewProductTypes = 'ViewProductTypes',
  ViewProducts = 'ViewProducts',
  ViewProjectSettings = 'ViewProjectSettings'
}

export type TOidcSsoConfig = {
  __typename?: 'OidcSsoConfig';
  authorityUrl: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActive: Maybe<Scalars['Boolean']>;
  logoutUrl: Maybe<Scalars['String']>;
  teamIdForNewUsers: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TOidcSsoConfigDataInput = {
  authorityUrl: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret: Maybe<Scalars['String']>;
  logoutUrl: Maybe<Scalars['String']>;
  teamIdForNewUsers: Scalars['String'];
};

export type TOidcSsoConfigWhereInput = {
  AND: Maybe<Array<TOidcSsoConfigWhereInput>>;
  NOT: Maybe<Array<TOidcSsoConfigWhereInput>>;
  OR: Maybe<Array<TOidcSsoConfigWhereInput>>;
  authorityUrl: Maybe<Scalars['String']>;
  authorityUrl_contains: Maybe<Scalars['String']>;
  authorityUrl_ends_with: Maybe<Scalars['String']>;
  authorityUrl_gt: Maybe<Scalars['String']>;
  authorityUrl_gte: Maybe<Scalars['String']>;
  authorityUrl_in: Maybe<Array<Scalars['String']>>;
  authorityUrl_lt: Maybe<Scalars['String']>;
  authorityUrl_lte: Maybe<Scalars['String']>;
  authorityUrl_not: Maybe<Scalars['String']>;
  authorityUrl_not_contains: Maybe<Scalars['String']>;
  authorityUrl_not_ends_with: Maybe<Scalars['String']>;
  authorityUrl_not_in: Maybe<Array<Scalars['String']>>;
  authorityUrl_not_starts_with: Maybe<Scalars['String']>;
  authorityUrl_starts_with: Maybe<Scalars['String']>;
  clientId: Maybe<Scalars['String']>;
  clientId_contains: Maybe<Scalars['String']>;
  clientId_ends_with: Maybe<Scalars['String']>;
  clientId_gt: Maybe<Scalars['String']>;
  clientId_gte: Maybe<Scalars['String']>;
  clientId_in: Maybe<Array<Scalars['String']>>;
  clientId_lt: Maybe<Scalars['String']>;
  clientId_lte: Maybe<Scalars['String']>;
  clientId_not: Maybe<Scalars['String']>;
  clientId_not_contains: Maybe<Scalars['String']>;
  clientId_not_ends_with: Maybe<Scalars['String']>;
  clientId_not_in: Maybe<Array<Scalars['String']>>;
  clientId_not_starts_with: Maybe<Scalars['String']>;
  clientId_starts_with: Maybe<Scalars['String']>;
  clientSecret: Maybe<Scalars['String']>;
  clientSecret_contains: Maybe<Scalars['String']>;
  clientSecret_ends_with: Maybe<Scalars['String']>;
  clientSecret_gt: Maybe<Scalars['String']>;
  clientSecret_gte: Maybe<Scalars['String']>;
  clientSecret_in: Maybe<Array<Scalars['String']>>;
  clientSecret_lt: Maybe<Scalars['String']>;
  clientSecret_lte: Maybe<Scalars['String']>;
  clientSecret_not: Maybe<Scalars['String']>;
  clientSecret_not_contains: Maybe<Scalars['String']>;
  clientSecret_not_ends_with: Maybe<Scalars['String']>;
  clientSecret_not_in: Maybe<Array<Scalars['String']>>;
  clientSecret_not_starts_with: Maybe<Scalars['String']>;
  clientSecret_starts_with: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  isActive: Maybe<Scalars['Boolean']>;
  isActive_not: Maybe<Scalars['Boolean']>;
  logoutUrl: Maybe<Scalars['String']>;
  logoutUrl_contains: Maybe<Scalars['String']>;
  logoutUrl_ends_with: Maybe<Scalars['String']>;
  logoutUrl_gt: Maybe<Scalars['String']>;
  logoutUrl_gte: Maybe<Scalars['String']>;
  logoutUrl_in: Maybe<Array<Scalars['String']>>;
  logoutUrl_lt: Maybe<Scalars['String']>;
  logoutUrl_lte: Maybe<Scalars['String']>;
  logoutUrl_not: Maybe<Scalars['String']>;
  logoutUrl_not_contains: Maybe<Scalars['String']>;
  logoutUrl_not_ends_with: Maybe<Scalars['String']>;
  logoutUrl_not_in: Maybe<Array<Scalars['String']>>;
  logoutUrl_not_starts_with: Maybe<Scalars['String']>;
  logoutUrl_starts_with: Maybe<Scalars['String']>;
  teamIdForNewUsers: Maybe<Scalars['String']>;
  teamIdForNewUsers_contains: Maybe<Scalars['String']>;
  teamIdForNewUsers_ends_with: Maybe<Scalars['String']>;
  teamIdForNewUsers_gt: Maybe<Scalars['String']>;
  teamIdForNewUsers_gte: Maybe<Scalars['String']>;
  teamIdForNewUsers_in: Maybe<Array<Scalars['String']>>;
  teamIdForNewUsers_lt: Maybe<Scalars['String']>;
  teamIdForNewUsers_lte: Maybe<Scalars['String']>;
  teamIdForNewUsers_not: Maybe<Scalars['String']>;
  teamIdForNewUsers_not_contains: Maybe<Scalars['String']>;
  teamIdForNewUsers_not_ends_with: Maybe<Scalars['String']>;
  teamIdForNewUsers_not_in: Maybe<Array<Scalars['String']>>;
  teamIdForNewUsers_not_starts_with: Maybe<Scalars['String']>;
  teamIdForNewUsers_starts_with: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export enum TOrderStatesVisibility {
  HideOrderState = 'HideOrderState',
  HidePaymentState = 'HidePaymentState',
  HideShipmentState = 'HideShipmentState'
}

export type TOrderStatusConfiguration = {
  __typename?: 'OrderStatusConfiguration';
  createdAt: Scalars['DateTime'];
  dateFilterType: TDateFilterType;
  dateFrom: Maybe<Scalars['DateTime']>;
  dateTo: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  productId: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TOrderStatusConfigurationInput = {
  dateFilterType: TDateFilterType;
  dateFrom: Maybe<Scalars['DateTime']>;
  dateTo: Maybe<Scalars['DateTime']>;
  productId: Maybe<Scalars['String']>;
};

export type TOrderStatusConfigurationWhereInput = {
  AND: Maybe<Array<TOrderStatusConfigurationWhereInput>>;
  NOT: Maybe<Array<TOrderStatusConfigurationWhereInput>>;
  OR: Maybe<Array<TOrderStatusConfigurationWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  dateFilterType: Maybe<TDateFilterType>;
  dateFilterType_in: Maybe<Array<TDateFilterType>>;
  dateFilterType_not: Maybe<TDateFilterType>;
  dateFilterType_not_in: Maybe<Array<TDateFilterType>>;
  dateFrom: Maybe<Scalars['DateTime']>;
  dateFrom_gt: Maybe<Scalars['DateTime']>;
  dateFrom_gte: Maybe<Scalars['DateTime']>;
  dateFrom_in: Maybe<Array<Scalars['DateTime']>>;
  dateFrom_lt: Maybe<Scalars['DateTime']>;
  dateFrom_lte: Maybe<Scalars['DateTime']>;
  dateFrom_not: Maybe<Scalars['DateTime']>;
  dateFrom_not_in: Maybe<Array<Scalars['DateTime']>>;
  dateTo: Maybe<Scalars['DateTime']>;
  dateTo_gt: Maybe<Scalars['DateTime']>;
  dateTo_gte: Maybe<Scalars['DateTime']>;
  dateTo_in: Maybe<Array<Scalars['DateTime']>>;
  dateTo_lt: Maybe<Scalars['DateTime']>;
  dateTo_lte: Maybe<Scalars['DateTime']>;
  dateTo_not: Maybe<Scalars['DateTime']>;
  dateTo_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  productId: Maybe<Scalars['String']>;
  productId_contains: Maybe<Scalars['String']>;
  productId_ends_with: Maybe<Scalars['String']>;
  productId_gt: Maybe<Scalars['String']>;
  productId_gte: Maybe<Scalars['String']>;
  productId_in: Maybe<Array<Scalars['String']>>;
  productId_lt: Maybe<Scalars['String']>;
  productId_lte: Maybe<Scalars['String']>;
  productId_not: Maybe<Scalars['String']>;
  productId_not_contains: Maybe<Scalars['String']>;
  productId_not_ends_with: Maybe<Scalars['String']>;
  productId_not_in: Maybe<Array<Scalars['String']>>;
  productId_not_starts_with: Maybe<Scalars['String']>;
  productId_starts_with: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TOrdersListView = {
  __typename?: 'OrdersListView';
  createdAt: Scalars['DateTime'];
  filters: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive: Maybe<Scalars['Boolean']>;
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search: Maybe<Scalars['String']>;
  sort: Maybe<TSort>;
  table: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TOrdersListView_FiltersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TFilterValuesOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TFilterValuesWhereInput>;
};


export type TOrdersListView_NameAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};

export type TOrdersListViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search: Maybe<Scalars['String']>;
  sort: TSortCreateInput;
  table: Maybe<TOrdersListViewTableInput>;
};

export type TOrdersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TOrganizationExtension = {
  __typename?: 'OrganizationExtension';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installedApplications: Maybe<Array<TRestrictedCustomApplicationInstallationForOrganization>>;
  oidcSsoConfig: Maybe<TOidcSsoConfig>;
  organizationId: Scalars['String'];
  registeredApplications: Maybe<Array<TRestrictedCustomApplicationForOrganization>>;
  updatedAt: Scalars['DateTime'];
};

export type TOrganizationExtensionWhereInput = {
  AND: Maybe<Array<TOrganizationExtensionWhereInput>>;
  NOT: Maybe<Array<TOrganizationExtensionWhereInput>>;
  OR: Maybe<Array<TOrganizationExtensionWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  installedApplications_every: Maybe<TCustomApplicationInstallationWhereInput>;
  installedApplications_none: Maybe<TCustomApplicationInstallationWhereInput>;
  installedApplications_some: Maybe<TCustomApplicationInstallationWhereInput>;
  oidcSsoConfig: Maybe<TOidcSsoConfigWhereInput>;
  organizationId: Maybe<Scalars['String']>;
  organizationId_contains: Maybe<Scalars['String']>;
  organizationId_ends_with: Maybe<Scalars['String']>;
  organizationId_gt: Maybe<Scalars['String']>;
  organizationId_gte: Maybe<Scalars['String']>;
  organizationId_in: Maybe<Array<Scalars['String']>>;
  organizationId_lt: Maybe<Scalars['String']>;
  organizationId_lte: Maybe<Scalars['String']>;
  organizationId_not: Maybe<Scalars['String']>;
  organizationId_not_contains: Maybe<Scalars['String']>;
  organizationId_not_ends_with: Maybe<Scalars['String']>;
  organizationId_not_in: Maybe<Array<Scalars['String']>>;
  organizationId_not_starts_with: Maybe<Scalars['String']>;
  organizationId_starts_with: Maybe<Scalars['String']>;
  registeredApplications_every: Maybe<TCustomApplicationWhereInput>;
  registeredApplications_none: Maybe<TCustomApplicationWhereInput>;
  registeredApplications_some: Maybe<TCustomApplicationWhereInput>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TPimSearchListView = {
  __typename?: 'PimSearchListView';
  createdAt: Scalars['DateTime'];
  filters: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive: Maybe<Scalars['Boolean']>;
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search: Maybe<Scalars['String']>;
  sort: Maybe<TSort>;
  table: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TPimSearchListView_FiltersArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TFilterValuesOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TFilterValuesWhereInput>;
};


export type TPimSearchListView_NameAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};

export type TPimSearchListViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search: Maybe<Scalars['String']>;
  sort: TSortCreateInput;
  table: Maybe<TPimSearchListViewTableInput>;
};

export type TPimSearchListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TProductDiscountsListView = {
  __typename?: 'ProductDiscountsListView';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  visibleColumns: Array<Scalars['String']>;
};

export type TProductDiscountsListViewInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TProductTypeAttributesView = {
  __typename?: 'ProductTypeAttributesView';
  createdAt: Scalars['DateTime'];
  existence: Maybe<TExistence>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isVariant: Maybe<Scalars['Boolean']>;
  nameAllLocales: Maybe<Array<TLocalizedField>>;
  pinnedAttributes: Array<Scalars['String']>;
  productTypeId: Scalars['String'];
  projectKey: Scalars['String'];
  searchTerm: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TProductTypeAttributesView_NameAllLocalesArgs = {
  after: Maybe<Scalars['String']>;
  before: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  last: Maybe<Scalars['Int']>;
  orderBy: Maybe<TLocalizedFieldOrderByInput>;
  skip: Maybe<Scalars['Int']>;
  where: Maybe<TLocalizedFieldWhereInput>;
};

export type TProductTypeAttributesViewInput = {
  existence: Maybe<TExistence>;
  isVariant: Maybe<Scalars['Boolean']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  pinnedAttributes: Array<Scalars['String']>;
  productTypeId: Scalars['String'];
  searchTerm: Maybe<Scalars['String']>;
};

export type TProductTypeAttributesViewUpdateInput = {
  existence: Maybe<TExistence>;
  isVariant: Maybe<Scalars['Boolean']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  pinnedAttributes: Array<Scalars['String']>;
  searchTerm: Maybe<Scalars['String']>;
};

export type TProjectExtension = {
  __typename?: 'ProjectExtension';
  applications: Maybe<Array<TApplicationExtension>>;
  categoryRecommendationSettings: Maybe<TCategoryRecommendationSettings>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageRegex: Maybe<TImageRegex>;
  installedApplications: Maybe<Array<TRestrictedCustomApplicationInstallationForProject>>;
  orderStatesVisibility: Array<TOrderStatesVisibility>;
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type TProjectExtension_ApplicationsArgs = {
  where: Maybe<TRestrictedApplicationExtensionWhereInput>;
};


export type TProjectExtension_InstalledApplicationsArgs = {
  where: Maybe<TRestrictedCustomApplicationInstallationWhereInput>;
};

export enum TProjectExtensionOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ProjectKeyAsc = 'projectKey_ASC',
  ProjectKeyDesc = 'projectKey_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type TProjectExtensionWhereInput = {
  AND: Maybe<Array<TProjectExtensionWhereInput>>;
  NOT: Maybe<Array<TProjectExtensionWhereInput>>;
  OR: Maybe<Array<TProjectExtensionWhereInput>>;
  applications_every: Maybe<TApplicationExtensionWhereInput>;
  applications_none: Maybe<TApplicationExtensionWhereInput>;
  applications_some: Maybe<TApplicationExtensionWhereInput>;
  categoryRecommendationSettings: Maybe<TCategoryRecommendationSettingsWhereInput>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  imageRegex: Maybe<TImageRegexWhereInput>;
  installedApplications_every: Maybe<TCustomApplicationInstallationWhereInput>;
  installedApplications_none: Maybe<TCustomApplicationInstallationWhereInput>;
  installedApplications_some: Maybe<TCustomApplicationInstallationWhereInput>;
  projectKey: Maybe<Scalars['String']>;
  projectKey_contains: Maybe<Scalars['String']>;
  projectKey_ends_with: Maybe<Scalars['String']>;
  projectKey_gt: Maybe<Scalars['String']>;
  projectKey_gte: Maybe<Scalars['String']>;
  projectKey_in: Maybe<Array<Scalars['String']>>;
  projectKey_lt: Maybe<Scalars['String']>;
  projectKey_lte: Maybe<Scalars['String']>;
  projectKey_not: Maybe<Scalars['String']>;
  projectKey_not_contains: Maybe<Scalars['String']>;
  projectKey_not_ends_with: Maybe<Scalars['String']>;
  projectKey_not_in: Maybe<Array<Scalars['String']>>;
  projectKey_not_starts_with: Maybe<Scalars['String']>;
  projectKey_starts_with: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TQuery = {
  __typename?: 'Query';
  activeCartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  activeCustomersListView: Maybe<TCustomersListView>;
  activeDashboardView: Maybe<TDashboardView>;
  activeDiscountCodesCustomView: Maybe<TDiscountsCustomView>;
  activeOrdersListView: Maybe<TOrdersListView>;
  activePimSearchListView: Maybe<TPimSearchListView>;
  activeProductDiscountsCustomView: Maybe<TDiscountsCustomView>;
  activeProductTypeAttributesView: Maybe<TProductTypeAttributesView>;
  /** @deprecated Experimental feature - For internal usage only */
  allAppliedCustomApplicationPermissions: Array<TCustomApplicationPermission>;
  allProjectExtensions: Array<TProjectExtension>;
  cartDiscountsCustomView: Maybe<TDiscountsCustomView>;
  cartDiscountsCustomViews: Array<Maybe<TDiscountsCustomView>>;
  cartDiscountsListView: Maybe<TCartDiscountsListView>;
  customersListView: Maybe<TCustomersListView>;
  customersListViews: Array<Maybe<TCustomersListView>>;
  dashboardView: Maybe<TDashboardView>;
  dashboardViews: Array<Maybe<TDashboardView>>;
  discountCodesCustomView: Maybe<TDiscountsCustomView>;
  discountCodesCustomViews: Array<Maybe<TDiscountsCustomView>>;
  discountCodesListView: Maybe<TDiscountCodesListView>;
  /** @deprecated Experimental feature - For internal usage only */
  globalOrganizationExtension: Maybe<TOrganizationExtension>;
  ordersListView: Maybe<TOrdersListView>;
  ordersListViews: Array<Maybe<TOrdersListView>>;
  organizationExtension: Maybe<TOrganizationExtension>;
  pimSearchListView: Maybe<TPimSearchListView>;
  pimSearchListViews: Array<Maybe<TPimSearchListView>>;
  productDiscountsCustomView: Maybe<TDiscountsCustomView>;
  productDiscountsCustomViews: Array<Maybe<TDiscountsCustomView>>;
  productDiscountsListView: Maybe<TProductDiscountsListView>;
  productTypeAttributesView: Maybe<TProductTypeAttributesView>;
  productTypeAttributesViews: Maybe<Array<Maybe<TProductTypeAttributesView>>>;
  projectExtension: Maybe<TProjectExtension>;
  ruleBuilderQuickSelectionValues: Maybe<Array<Maybe<TRuleBuilderQuickSelectionValues>>>;
  variantPricesListViews: Array<Maybe<TVariantPricesListView>>;
};


export type TQuery_ActiveProductTypeAttributesViewArgs = {
  isVariant: Scalars['Boolean'];
  productTypeId: Scalars['String'];
};


export type TQuery_AllAppliedCustomApplicationPermissionsArgs = {
  applicationId: Scalars['ID'];
  entryPointUriPath: Scalars['String'];
};


export type TQuery_CartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_CustomersListViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_DashboardViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_DiscountCodesCustomViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_GlobalOrganizationExtensionArgs = {
  organizationId: Scalars['String'];
};


export type TQuery_OrdersListViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_OrganizationExtensionArgs = {
  organizationId: Scalars['String'];
};


export type TQuery_PimSearchListViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_ProductDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_ProductTypeAttributesViewArgs = {
  id: Scalars['ID'];
};


export type TQuery_ProductTypeAttributesViewsArgs = {
  isVariant: Scalars['Boolean'];
  productTypeId: Scalars['String'];
};


export type TQuery_RuleBuilderQuickSelectionValuesArgs = {
  ruleBuilderType: TRuleBuilderType;
};

export enum TResourceType {
  Categories = 'CATEGORIES',
  PublishedProducts = 'PUBLISHED_PRODUCTS',
  TotalProducts = 'TOTAL_PRODUCTS',
  UnpublishedProducts = 'UNPUBLISHED_PRODUCTS'
}

export type TResourcesNumbersConfiguration = {
  __typename?: 'ResourcesNumbersConfiguration';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  resourceOptions: Array<TResourceType>;
  updatedAt: Scalars['DateTime'];
};

export type TResourcesNumbersConfigurationInput = {
  resourceOptions: Array<TResourceType>;
};

export type TResourcesNumbersConfigurationWhereInput = {
  AND: Maybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  NOT: Maybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  OR: Maybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TRestrictedApplicationExtensionWhereInput = {
  id: Maybe<Scalars['ID']>;
  isActive: Maybe<Scalars['Boolean']>;
  url: Maybe<Scalars['String']>;
};

export type TRestrictedCustomApplicationContactInformation = {
  __typename?: 'RestrictedCustomApplicationContactInformation';
  email: Scalars['String'];
};

export type TRestrictedCustomApplicationContactPerson = {
  __typename?: 'RestrictedCustomApplicationContactPerson';
  email: Scalars['String'];
  consents: Array<TCustomApplicationContactConsent>;
};

export type TRestrictedCustomApplicationForOrganization = {
  __typename?: 'RestrictedCustomApplicationForOrganization';
  contact: TRestrictedCustomApplicationContactInformation;
  contacts: Maybe<Array<TRestrictedCustomApplicationContactPerson>>;
  createdAt: Scalars['DateTime'];
  description: Maybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  id: Scalars['ID'];
  menuLinks: Maybe<TCustomApplicationMenuLink>;
  name: Scalars['String'];
  permissions: Array<TCustomApplicationPermission>;
  status: Maybe<TCustomApplicationStatus>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TRestrictedCustomApplicationForProject = {
  __typename?: 'RestrictedCustomApplicationForProject';
  createdAt: Scalars['DateTime'];
  description: Maybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  id: Scalars['ID'];
  menuLinks: Maybe<TCustomApplicationMenuLink>;
  name: Scalars['String'];
  permissions: Array<TCustomApplicationPermission>;
  status: Maybe<TCustomApplicationStatus>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TRestrictedCustomApplicationInstallationForOrganization = {
  __typename?: 'RestrictedCustomApplicationInstallationForOrganization';
  application: TRestrictedCustomApplicationForProject;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installInAllProjects: Scalars['Boolean'];
  projects: Maybe<Array<TProjectExtension>>;
  updatedAt: Scalars['DateTime'];
};

export type TRestrictedCustomApplicationInstallationForProject = {
  __typename?: 'RestrictedCustomApplicationInstallationForProject';
  application: TRestrictedCustomApplicationForProject;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installInAllProjects: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type TRestrictedCustomApplicationInstallationWhereInput = {
  application: Maybe<TRestrictedCustomApplicationWhereInput>;
};

export type TRestrictedCustomApplicationWhereInput = {
  entryPointUriPath: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  status: Maybe<TCustomApplicationStatus>;
  url: Maybe<Scalars['String']>;
};

export type TRuleBuilderQuickSelectCreatefunctionsInput = {
  set: Maybe<Array<Scalars['String']>>;
};

export type TRuleBuilderQuickSelectCreatepredicatesInput = {
  set: Maybe<Array<Scalars['String']>>;
};

export type TRuleBuilderQuickSelectionInput = {
  functions: Maybe<TRuleBuilderQuickSelectCreatepredicatesInput>;
  predicates: Maybe<TRuleBuilderQuickSelectCreatefunctionsInput>;
  ruleBuilderType: TRuleBuilderType;
};

export type TRuleBuilderQuickSelectionValues = {
  __typename?: 'RuleBuilderQuickSelectionValues';
  createdAt: Scalars['DateTime'];
  functions: Array<Scalars['String']>;
  id: Scalars['ID'];
  predicates: Array<Scalars['String']>;
  projectKey: Scalars['String'];
  ruleBuilderType: TRuleBuilderType;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export enum TRuleBuilderType {
  CartDiscount = 'CartDiscount',
  CartTargetDiscount = 'CartTargetDiscount',
  ProductDiscount = 'ProductDiscount'
}

export type TSalesPerformanceConfiguration = {
  __typename?: 'SalesPerformanceConfiguration';
  createdAt: Scalars['DateTime'];
  dateFilterType: TDateFilterType;
  dateFrom: Maybe<Scalars['DateTime']>;
  dateTo: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  showPreviousTimeframe: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type TSalesPerformanceConfigurationInput = {
  dateFilterType: TDateFilterType;
  dateFrom: Maybe<Scalars['DateTime']>;
  dateTo: Maybe<Scalars['DateTime']>;
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TSalesPerformanceConfigurationWhereInput = {
  AND: Maybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  NOT: Maybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  OR: Maybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  dateFilterType: Maybe<TDateFilterType>;
  dateFilterType_in: Maybe<Array<TDateFilterType>>;
  dateFilterType_not: Maybe<TDateFilterType>;
  dateFilterType_not_in: Maybe<Array<TDateFilterType>>;
  dateFrom: Maybe<Scalars['DateTime']>;
  dateFrom_gt: Maybe<Scalars['DateTime']>;
  dateFrom_gte: Maybe<Scalars['DateTime']>;
  dateFrom_in: Maybe<Array<Scalars['DateTime']>>;
  dateFrom_lt: Maybe<Scalars['DateTime']>;
  dateFrom_lte: Maybe<Scalars['DateTime']>;
  dateFrom_not: Maybe<Scalars['DateTime']>;
  dateFrom_not_in: Maybe<Array<Scalars['DateTime']>>;
  dateTo: Maybe<Scalars['DateTime']>;
  dateTo_gt: Maybe<Scalars['DateTime']>;
  dateTo_gte: Maybe<Scalars['DateTime']>;
  dateTo_in: Maybe<Array<Scalars['DateTime']>>;
  dateTo_lt: Maybe<Scalars['DateTime']>;
  dateTo_lte: Maybe<Scalars['DateTime']>;
  dateTo_not: Maybe<Scalars['DateTime']>;
  dateTo_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  showPreviousTimeframe: Maybe<Scalars['Boolean']>;
  showPreviousTimeframe_not: Maybe<Scalars['Boolean']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TSort = {
  __typename?: 'Sort';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  key: Scalars['String'];
  order: TSortOrder;
  updatedAt: Scalars['DateTime'];
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
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  visibleColumns: Array<Scalars['String']>;
};

export type TTopProductsConfiguration = {
  __typename?: 'TopProductsConfiguration';
  bestSellingLimit: TBestSellingLimit;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type TTopProductsConfigurationInput = {
  bestSellingLimit: Maybe<TBestSellingLimit>;
};

export type TTopProductsConfigurationWhereInput = {
  AND: Maybe<Array<TTopProductsConfigurationWhereInput>>;
  NOT: Maybe<Array<TTopProductsConfigurationWhereInput>>;
  OR: Maybe<Array<TTopProductsConfigurationWhereInput>>;
  bestSellingLimit: Maybe<TBestSellingLimit>;
  bestSellingLimit_in: Maybe<Array<TBestSellingLimit>>;
  bestSellingLimit_not: Maybe<TBestSellingLimit>;
  bestSellingLimit_not_in: Maybe<Array<TBestSellingLimit>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TTotalOrdersConfiguration = {
  __typename?: 'TotalOrdersConfiguration';
  createdAt: Scalars['DateTime'];
  dateFilterType: TDateFilterType;
  dateFrom: Maybe<Scalars['DateTime']>;
  dateTo: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  productId: Maybe<Scalars['String']>;
  showPreviousTimeframe: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type TTotalOrdersConfigurationInput = {
  dateFilterType: TDateFilterType;
  dateFrom: Maybe<Scalars['DateTime']>;
  dateTo: Maybe<Scalars['DateTime']>;
  productId: Maybe<Scalars['String']>;
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TTotalOrdersConfigurationWhereInput = {
  AND: Maybe<Array<TTotalOrdersConfigurationWhereInput>>;
  NOT: Maybe<Array<TTotalOrdersConfigurationWhereInput>>;
  OR: Maybe<Array<TTotalOrdersConfigurationWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  dateFilterType: Maybe<TDateFilterType>;
  dateFilterType_in: Maybe<Array<TDateFilterType>>;
  dateFilterType_not: Maybe<TDateFilterType>;
  dateFilterType_not_in: Maybe<Array<TDateFilterType>>;
  dateFrom: Maybe<Scalars['DateTime']>;
  dateFrom_gt: Maybe<Scalars['DateTime']>;
  dateFrom_gte: Maybe<Scalars['DateTime']>;
  dateFrom_in: Maybe<Array<Scalars['DateTime']>>;
  dateFrom_lt: Maybe<Scalars['DateTime']>;
  dateFrom_lte: Maybe<Scalars['DateTime']>;
  dateFrom_not: Maybe<Scalars['DateTime']>;
  dateFrom_not_in: Maybe<Array<Scalars['DateTime']>>;
  dateTo: Maybe<Scalars['DateTime']>;
  dateTo_gt: Maybe<Scalars['DateTime']>;
  dateTo_gte: Maybe<Scalars['DateTime']>;
  dateTo_in: Maybe<Array<Scalars['DateTime']>>;
  dateTo_lt: Maybe<Scalars['DateTime']>;
  dateTo_lte: Maybe<Scalars['DateTime']>;
  dateTo_not: Maybe<Scalars['DateTime']>;
  dateTo_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  productId: Maybe<Scalars['String']>;
  productId_contains: Maybe<Scalars['String']>;
  productId_ends_with: Maybe<Scalars['String']>;
  productId_gt: Maybe<Scalars['String']>;
  productId_gte: Maybe<Scalars['String']>;
  productId_in: Maybe<Array<Scalars['String']>>;
  productId_lt: Maybe<Scalars['String']>;
  productId_lte: Maybe<Scalars['String']>;
  productId_not: Maybe<Scalars['String']>;
  productId_not_contains: Maybe<Scalars['String']>;
  productId_not_ends_with: Maybe<Scalars['String']>;
  productId_not_in: Maybe<Array<Scalars['String']>>;
  productId_not_starts_with: Maybe<Scalars['String']>;
  productId_starts_with: Maybe<Scalars['String']>;
  showPreviousTimeframe: Maybe<Scalars['Boolean']>;
  showPreviousTimeframe_not: Maybe<Scalars['Boolean']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TTotalSalesConfiguration = {
  __typename?: 'TotalSalesConfiguration';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  productId: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TTotalSalesConfigurationInput = {
  productId: Maybe<Scalars['String']>;
};

export type TTotalSalesConfigurationWhereInput = {
  AND: Maybe<Array<TTotalSalesConfigurationWhereInput>>;
  NOT: Maybe<Array<TTotalSalesConfigurationWhereInput>>;
  OR: Maybe<Array<TTotalSalesConfigurationWhereInput>>;
  createdAt: Maybe<Scalars['DateTime']>;
  createdAt_gt: Maybe<Scalars['DateTime']>;
  createdAt_gte: Maybe<Scalars['DateTime']>;
  createdAt_in: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt: Maybe<Scalars['DateTime']>;
  createdAt_lte: Maybe<Scalars['DateTime']>;
  createdAt_not: Maybe<Scalars['DateTime']>;
  createdAt_not_in: Maybe<Array<Scalars['DateTime']>>;
  id: Maybe<Scalars['ID']>;
  id_contains: Maybe<Scalars['ID']>;
  id_ends_with: Maybe<Scalars['ID']>;
  id_gt: Maybe<Scalars['ID']>;
  id_gte: Maybe<Scalars['ID']>;
  id_in: Maybe<Array<Scalars['ID']>>;
  id_lt: Maybe<Scalars['ID']>;
  id_lte: Maybe<Scalars['ID']>;
  id_not: Maybe<Scalars['ID']>;
  id_not_contains: Maybe<Scalars['ID']>;
  id_not_ends_with: Maybe<Scalars['ID']>;
  id_not_in: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with: Maybe<Scalars['ID']>;
  id_starts_with: Maybe<Scalars['ID']>;
  productId: Maybe<Scalars['String']>;
  productId_contains: Maybe<Scalars['String']>;
  productId_ends_with: Maybe<Scalars['String']>;
  productId_gt: Maybe<Scalars['String']>;
  productId_gte: Maybe<Scalars['String']>;
  productId_in: Maybe<Array<Scalars['String']>>;
  productId_lt: Maybe<Scalars['String']>;
  productId_lte: Maybe<Scalars['String']>;
  productId_not: Maybe<Scalars['String']>;
  productId_not_contains: Maybe<Scalars['String']>;
  productId_not_ends_with: Maybe<Scalars['String']>;
  productId_not_in: Maybe<Array<Scalars['String']>>;
  productId_not_starts_with: Maybe<Scalars['String']>;
  productId_starts_with: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['DateTime']>;
  updatedAt_gt: Maybe<Scalars['DateTime']>;
  updatedAt_gte: Maybe<Scalars['DateTime']>;
  updatedAt_in: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt: Maybe<Scalars['DateTime']>;
  updatedAt_lte: Maybe<Scalars['DateTime']>;
  updatedAt_not: Maybe<Scalars['DateTime']>;
  updatedAt_not_in: Maybe<Array<Scalars['DateTime']>>;
};

export type TVariantPricesListView = {
  __typename?: 'VariantPricesListView';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
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
    )>>, installedApplications: Maybe<Array<(
      { __typename?: 'RestrictedCustomApplicationInstallationForProject' }
      & { application: (
        { __typename?: 'RestrictedCustomApplicationForProject' }
        & Pick<TRestrictedCustomApplicationForProject, 'id' | 'entryPointUriPath'>
        & { menuLinks: Maybe<(
          { __typename?: 'CustomApplicationMenuLink' }
          & Pick<TCustomApplicationMenuLink, 'id' | 'iconName' | 'permissions' | 'defaultLabel'>
          & { labelAllLocales: Maybe<Array<(
            { __typename?: 'LocalizedField' }
            & Pick<TLocalizedField, 'locale' | 'value'>
          )>>, submenuLinks: Maybe<Array<(
            { __typename?: 'CustomApplicationSubmenuLink' }
            & Pick<TCustomApplicationSubmenuLink, 'id' | 'uriPath' | 'permissions' | 'defaultLabel'>
            & { labelAllLocales: Maybe<Array<(
              { __typename?: 'LocalizedField' }
              & Pick<TLocalizedField, 'locale' | 'value'>
            )>> }
          )>> }
        )> }
      ) }
    )>> }
  )> }
);
