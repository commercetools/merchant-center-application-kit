export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  navbarMenu?: Maybe<TNavbarMenu>;
  oAuthScopes: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TApplicationExtensionDataInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  navbarMenu: TApplicationExtensionNavbarMenuDataInput;
  oAuthScopes?: InputMaybe<Array<Scalars['String']>>;
  url: Scalars['String'];
};

export type TApplicationExtensionInfoForLegacyCustomApplicationsMigrationReport =
  {
    __typename?: 'ApplicationExtensionInfoForLegacyCustomApplicationsMigrationReport';
    entryPointUriPath: Scalars['String'];
    id: Scalars['ID'];
    isActive: Scalars['Boolean'];
    migratedTo: Array<TApplicationExtensionMigrationMatchingScore>;
    name: Scalars['String'];
    url: Scalars['String'];
  };

export type TApplicationExtensionMigrationMatchingScore = {
  __typename?: 'ApplicationExtensionMigrationMatchingScore';
  applicationId: Scalars['String'];
  matchByEntryPointUriPath: TMigrationMatchingScore;
  matchByName: TMigrationMatchingScore;
  matchByUrl: TMigrationMatchingScore;
};

export type TApplicationExtensionNavbarMenuDataInput = {
  featureToggle?: InputMaybe<Scalars['String']>;
  icon: Scalars['String'];
  key: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<TOAuthScope>;
  submenu: Array<TApplicationExtensionNavbarSubmenuDataInput>;
  uriPath: Scalars['String'];
};

export type TApplicationExtensionNavbarSubmenuDataInput = {
  featureToggle?: InputMaybe<Scalars['String']>;
  key: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<TOAuthScope>;
  uriPath: Scalars['String'];
};

export type TApplicationInfoForLegacyCustomApplicationsMigrationReport = {
  __typename?: 'ApplicationInfoForLegacyCustomApplicationsMigrationReport';
  entryPointUriPath: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export enum TAuthPermission {
  AccessToProject = 'accessToProject',
  LoggedInUser = 'loggedInUser',
  ManageMyOrganizations = 'manageMyOrganizations',
  ManageProjectSettings = 'manageProjectSettings',
  PerformDataCleanups = 'performDataCleanups',
  PerformMigrations = 'performMigrations',
  ViewCartDiscounts = 'viewCartDiscounts',
  ViewCustomers = 'viewCustomers',
  ViewDiscountCodes = 'viewDiscountCodes',
  ViewOrders = 'viewOrders',
  ViewProductDiscounts = 'viewProductDiscounts',
  ViewProducts = 'viewProducts',
  ViewProjectSettings = 'viewProjectSettings',
  ViewSomeDiscounts = 'viewSomeDiscounts',
  ViewUsersAndOrganizations = 'viewUsersAndOrganizations',
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
  AND?: InputMaybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  NOT?: InputMaybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  OR?: InputMaybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  showPreviousTimeframe?: InputMaybe<Scalars['Boolean']>;
  showPreviousTimeframe_not?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export enum TBestSellingLimit {
  Fifteen = 'FIFTEEN',
  Five = 'FIVE',
  Ten = 'TEN',
}

export enum TCategoryRecommendationSearchProperty {
  Attribute = 'Attribute',
  MachineLearning = 'MachineLearning',
  ProductType = 'ProductType',
}

export type TCategoryRecommendationSettings = {
  __typename?: 'CategoryRecommendationSettings';
  attributeName?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  searchProperty: TCategoryRecommendationSearchProperty;
  updatedAt: Scalars['DateTime'];
};

export type TCategoryRecommendationSettingsDataInput = {
  attributeName?: InputMaybe<Scalars['String']>;
  searchProperty: TCategoryRecommendationSearchProperty;
};

export type TContactInformation = {
  __typename?: 'ContactInformation';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  verifiedEmail?: Maybe<Scalars['String']>;
};

export type TContactInformationDataInput = {
  email: Scalars['String'];
};

export type TCustomApplication = {
  __typename?: 'CustomApplication';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  installedBy: Array<TCustomApplicationInstallation>;
  mainMenuLink: TCustomApplicationMenuLink;
  name: Scalars['String'];
  owner: TOrganizationExtension;
  ownerId: Scalars['String'];
  permissions: Array<TCustomApplicationPermission>;
  status?: Maybe<TCustomApplicationStatus>;
  submenuLinks: Array<TCustomApplicationSubmenuLink>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TCustomApplicationDraftDataInput = {
  description?: InputMaybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  icon: Scalars['String'];
  mainMenuLink: TCustomApplicationMenuLinkDraftDataInput;
  name: Scalars['String'];
  permissions: Array<TCustomApplicationPermissionDataInput>;
  submenuLinks: Array<TCustomApplicationSubmenuLinkDraftDataInput>;
  url: Scalars['String'];
};

export type TCustomApplicationInstallation = {
  __typename?: 'CustomApplicationInstallation';
  acceptedPermissions: Array<TCustomApplicationInstallationPermission>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installInAllProjects: Scalars['Boolean'];
  owner: TOrganizationExtension;
  ownerId: Scalars['String'];
  projects?: Maybe<Array<TProjectExtension>>;
  updatedAt: Scalars['DateTime'];
};

export type TCustomApplicationInstallationPermission = {
  __typename?: 'CustomApplicationInstallationPermission';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TCustomApplicationMenuLink = {
  __typename?: 'CustomApplicationMenuLink';
  createdAt: Scalars['DateTime'];
  defaultLabel: Scalars['String'];
  /** @deprecated This field has been moved outside of the menu link. */
  icon: Scalars['String'];
  /** @deprecated This field has been renamed to icon. */
  iconName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  labelAllLocales: Array<TLocalizedField>;
  permissions: Array<Scalars['String']>;
  /** @deprecated This field has been moved outside of the menu link and is now a top level field. */
  submenuLinks: Array<TCustomApplicationSubmenuLink>;
  updatedAt: Scalars['DateTime'];
};

export type TCustomApplicationMenuLinkDraftDataInput = {
  defaultLabel: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<Scalars['String']>;
};

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

export type TCustomApplicationQueryInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<TCustomApplicationQueryWhereInput>;
};

export type TCustomApplicationQueryWhereInput = {
  entryPointUriPath?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['String']>;
};

export enum TCustomApplicationStatus {
  Draft = 'DRAFT',
  PrivateUsage = 'PRIVATE_USAGE',
}

export type TCustomApplicationSubmenuLink = {
  __typename?: 'CustomApplicationSubmenuLink';
  createdAt: Scalars['DateTime'];
  defaultLabel: Scalars['String'];
  id: Scalars['ID'];
  labelAllLocales: Array<TLocalizedField>;
  permissions: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  uriPath: Scalars['String'];
};

export type TCustomApplicationSubmenuLinkDraftDataInput = {
  defaultLabel: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<Scalars['String']>;
  uriPath: Scalars['String'];
};

export type TCustomApplicationsMaintainerContactEmailVerificationConfirmation =
  {
    __typename?: 'CustomApplicationsMaintainerContactEmailVerificationConfirmation';
    organizationId: Scalars['ID'];
  };

export type TCustomApplicationsMaintainerContactEmailVerificationRequest = {
  __typename?: 'CustomApplicationsMaintainerContactEmailVerificationRequest';
  token?: Maybe<Scalars['String']>;
};

export type TCustomApplicationsPagedQueryResult = {
  __typename?: 'CustomApplicationsPagedQueryResult';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<TCustomApplication>;
  total: Scalars['Int'];
};

export type TCustomersListView = {
  __typename?: 'CustomersListView';
  createdAt: Scalars['DateTime'];
  filters?: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  migratedById?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type TCustomersListView_FiltersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TFilterValuesOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TFilterValuesWhereInput>;
};

export type TCustomersListView_NameAllLocalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLocalizedFieldOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLocalizedFieldWhereInput>;
};

export type TCustomersListViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search?: InputMaybe<Scalars['String']>;
  sort: TSortCreateInput;
  table?: InputMaybe<TCustomersListViewTableInput>;
};

export type TCustomersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TDashboardView = {
  __typename?: 'DashboardView';
  createdAt: Scalars['DateTime'];
  currencyCode?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  layout?: Maybe<Array<TLayoutCard>>;
  migratedById?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  timeZone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type TDashboardView_LayoutArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLayoutCardOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLayoutCardWhereInput>;
};

export type TDashboardView_NameAllLocalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLocalizedFieldOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLocalizedFieldWhereInput>;
};

export type TDashboardViewInput = {
  currencyCode?: InputMaybe<Scalars['String']>;
  layout: Array<TLayoutCardInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  timeZone?: InputMaybe<Scalars['String']>;
};

export enum TDateFilterType {
  Custom = 'CUSTOM',
  Day = 'DAY',
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Week = 'WEEK',
  Year = 'YEAR',
}

export enum TDiscountType {
  CartDiscount = 'CartDiscount',
  DiscountCode = 'DiscountCode',
  ProductDiscount = 'ProductDiscount',
}

export type TDiscountsCustomView = {
  __typename?: 'DiscountsCustomView';
  createdAt: Scalars['DateTime'];
  filters?: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  migratedById?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  type: TDiscountType;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type TDiscountsCustomView_FiltersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TFilterValuesOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TFilterValuesWhereInput>;
};

export type TDiscountsCustomView_NameAllLocalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLocalizedFieldOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLocalizedFieldWhereInput>;
};

export type TDiscountsCustomViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search?: InputMaybe<Scalars['String']>;
  sort: TSortCreateInput;
  table?: InputMaybe<TOrdersListViewTableInput>;
};

export enum TExistence {
  All = 'All',
  Empty = 'Empty',
  Filled = 'Filled',
}

export enum TFilterType {
  CustomField = 'CustomField',
  EqualTo = 'EqualTo',
  In = 'In',
  LessThan = 'LessThan',
  Missing = 'Missing',
  MissingIn = 'MissingIn',
  MoreThan = 'MoreThan',
  Range = 'Range',
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
  id?: InputMaybe<Scalars['ID']>;
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
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type TFilterValuesWhereInput = {
  AND?: InputMaybe<Array<TFilterValuesWhereInput>>;
  NOT?: InputMaybe<Array<TFilterValuesWhereInput>>;
  OR?: InputMaybe<Array<TFilterValuesWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  target?: InputMaybe<Scalars['String']>;
  target_contains?: InputMaybe<Scalars['String']>;
  target_ends_with?: InputMaybe<Scalars['String']>;
  target_gt?: InputMaybe<Scalars['String']>;
  target_gte?: InputMaybe<Scalars['String']>;
  target_in?: InputMaybe<Array<Scalars['String']>>;
  target_lt?: InputMaybe<Scalars['String']>;
  target_lte?: InputMaybe<Scalars['String']>;
  target_not?: InputMaybe<Scalars['String']>;
  target_not_contains?: InputMaybe<Scalars['String']>;
  target_not_ends_with?: InputMaybe<Scalars['String']>;
  target_not_in?: InputMaybe<Array<Scalars['String']>>;
  target_not_starts_with?: InputMaybe<Scalars['String']>;
  target_starts_with?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TFilterType>;
  type_in?: InputMaybe<Array<TFilterType>>;
  type_not?: InputMaybe<TFilterType>;
  type_not_in?: InputMaybe<Array<TFilterType>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type TImageRegex = {
  __typename?: 'ImageRegex';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  small?: Maybe<TImageRegexOptions>;
  thumb?: Maybe<TImageRegexOptions>;
  updatedAt: Scalars['DateTime'];
};

export type TImageRegexDataInput = {
  small?: InputMaybe<TImageRegexOptionsInput>;
  thumb?: InputMaybe<TImageRegexOptionsInput>;
};

export type TImageRegexOptions = {
  __typename?: 'ImageRegexOptions';
  flag?: Maybe<Scalars['String']>;
  replace: Scalars['String'];
  search: Scalars['String'];
};

export type TImageRegexOptionsInput = {
  flag?: InputMaybe<Scalars['String']>;
  replace: Scalars['String'];
  search: Scalars['String'];
};

export type TLayoutCard = {
  __typename?: 'LayoutCard';
  averageOrderValueConfiguration?: Maybe<TAverageOrderValueConfiguration>;
  createdAt: Scalars['DateTime'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  key: TMetricCardType;
  maxHeight?: Maybe<Scalars['Int']>;
  maxWidth?: Maybe<Scalars['Int']>;
  minHeight?: Maybe<Scalars['Int']>;
  minWidth?: Maybe<Scalars['Int']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  orderStatusConfiguration?: Maybe<TOrderStatusConfiguration>;
  resizeHandles: Array<Scalars['String']>;
  resourcesNumbersConfiguration?: Maybe<TResourcesNumbersConfiguration>;
  salesPerformanceConfiguration?: Maybe<TSalesPerformanceConfiguration>;
  topProductsConfiguration?: Maybe<TTopProductsConfiguration>;
  totalOrdersConfiguration?: Maybe<TTotalOrdersConfiguration>;
  totalSalesConfiguration?: Maybe<TTotalSalesConfiguration>;
  updatedAt: Scalars['DateTime'];
  width: Scalars['Int'];
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
};

export type TLayoutCard_NameAllLocalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLocalizedFieldOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLocalizedFieldWhereInput>;
};

export type TLayoutCardInput = {
  averageOrderValueConfiguration?: InputMaybe<TAverageOrderValueConfigurationInput>;
  height: Scalars['Int'];
  id?: InputMaybe<Scalars['ID']>;
  key: TMetricCardType;
  maxHeight?: InputMaybe<Scalars['Int']>;
  maxWidth?: InputMaybe<Scalars['Int']>;
  minHeight?: InputMaybe<Scalars['Int']>;
  minWidth?: InputMaybe<Scalars['Int']>;
  nameAllLocales?: InputMaybe<Array<TLocalizedFieldCreateInput>>;
  orderStatusConfiguration?: InputMaybe<TOrderStatusConfigurationInput>;
  resizeHandles?: InputMaybe<Array<Scalars['String']>>;
  resourcesNumbersConfiguration?: InputMaybe<TResourcesNumbersConfigurationInput>;
  salesPerformanceConfiguration?: InputMaybe<TSalesPerformanceConfigurationInput>;
  topProductsConfiguration?: InputMaybe<TTopProductsConfigurationInput>;
  totalOrdersConfiguration?: InputMaybe<TTotalOrdersConfigurationInput>;
  totalSalesConfiguration?: InputMaybe<TTotalSalesConfigurationInput>;
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
  MaxHeightAsc = 'maxHeight_ASC',
  MaxHeightDesc = 'maxHeight_DESC',
  MaxWidthAsc = 'maxWidth_ASC',
  MaxWidthDesc = 'maxWidth_DESC',
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
  YPositionDesc = 'yPosition_DESC',
}

export type TLayoutCardWhereInput = {
  AND?: InputMaybe<Array<TLayoutCardWhereInput>>;
  NOT?: InputMaybe<Array<TLayoutCardWhereInput>>;
  OR?: InputMaybe<Array<TLayoutCardWhereInput>>;
  averageOrderValueConfiguration?: InputMaybe<TAverageOrderValueConfigurationWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  height?: InputMaybe<Scalars['Int']>;
  height_gt?: InputMaybe<Scalars['Int']>;
  height_gte?: InputMaybe<Scalars['Int']>;
  height_in?: InputMaybe<Array<Scalars['Int']>>;
  height_lt?: InputMaybe<Scalars['Int']>;
  height_lte?: InputMaybe<Scalars['Int']>;
  height_not?: InputMaybe<Scalars['Int']>;
  height_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<TMetricCardType>;
  key_in?: InputMaybe<Array<TMetricCardType>>;
  key_not?: InputMaybe<TMetricCardType>;
  key_not_in?: InputMaybe<Array<TMetricCardType>>;
  maxHeight?: InputMaybe<Scalars['Int']>;
  maxHeight_gt?: InputMaybe<Scalars['Int']>;
  maxHeight_gte?: InputMaybe<Scalars['Int']>;
  maxHeight_in?: InputMaybe<Array<Scalars['Int']>>;
  maxHeight_lt?: InputMaybe<Scalars['Int']>;
  maxHeight_lte?: InputMaybe<Scalars['Int']>;
  maxHeight_not?: InputMaybe<Scalars['Int']>;
  maxHeight_not_in?: InputMaybe<Array<Scalars['Int']>>;
  maxWidth?: InputMaybe<Scalars['Int']>;
  maxWidth_gt?: InputMaybe<Scalars['Int']>;
  maxWidth_gte?: InputMaybe<Scalars['Int']>;
  maxWidth_in?: InputMaybe<Array<Scalars['Int']>>;
  maxWidth_lt?: InputMaybe<Scalars['Int']>;
  maxWidth_lte?: InputMaybe<Scalars['Int']>;
  maxWidth_not?: InputMaybe<Scalars['Int']>;
  maxWidth_not_in?: InputMaybe<Array<Scalars['Int']>>;
  minHeight?: InputMaybe<Scalars['Int']>;
  minHeight_gt?: InputMaybe<Scalars['Int']>;
  minHeight_gte?: InputMaybe<Scalars['Int']>;
  minHeight_in?: InputMaybe<Array<Scalars['Int']>>;
  minHeight_lt?: InputMaybe<Scalars['Int']>;
  minHeight_lte?: InputMaybe<Scalars['Int']>;
  minHeight_not?: InputMaybe<Scalars['Int']>;
  minHeight_not_in?: InputMaybe<Array<Scalars['Int']>>;
  minWidth?: InputMaybe<Scalars['Int']>;
  minWidth_gt?: InputMaybe<Scalars['Int']>;
  minWidth_gte?: InputMaybe<Scalars['Int']>;
  minWidth_in?: InputMaybe<Array<Scalars['Int']>>;
  minWidth_lt?: InputMaybe<Scalars['Int']>;
  minWidth_lte?: InputMaybe<Scalars['Int']>;
  minWidth_not?: InputMaybe<Scalars['Int']>;
  minWidth_not_in?: InputMaybe<Array<Scalars['Int']>>;
  nameAllLocales_every?: InputMaybe<TLocalizedFieldWhereInput>;
  nameAllLocales_none?: InputMaybe<TLocalizedFieldWhereInput>;
  nameAllLocales_some?: InputMaybe<TLocalizedFieldWhereInput>;
  orderStatusConfiguration?: InputMaybe<TOrderStatusConfigurationWhereInput>;
  resourcesNumbersConfiguration?: InputMaybe<TResourcesNumbersConfigurationWhereInput>;
  salesPerformanceConfiguration?: InputMaybe<TSalesPerformanceConfigurationWhereInput>;
  topProductsConfiguration?: InputMaybe<TTopProductsConfigurationWhereInput>;
  totalOrdersConfiguration?: InputMaybe<TTotalOrdersConfigurationWhereInput>;
  totalSalesConfiguration?: InputMaybe<TTotalSalesConfigurationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  width?: InputMaybe<Scalars['Int']>;
  width_gt?: InputMaybe<Scalars['Int']>;
  width_gte?: InputMaybe<Scalars['Int']>;
  width_in?: InputMaybe<Array<Scalars['Int']>>;
  width_lt?: InputMaybe<Scalars['Int']>;
  width_lte?: InputMaybe<Scalars['Int']>;
  width_not?: InputMaybe<Scalars['Int']>;
  width_not_in?: InputMaybe<Array<Scalars['Int']>>;
  xPosition?: InputMaybe<Scalars['Int']>;
  xPosition_gt?: InputMaybe<Scalars['Int']>;
  xPosition_gte?: InputMaybe<Scalars['Int']>;
  xPosition_in?: InputMaybe<Array<Scalars['Int']>>;
  xPosition_lt?: InputMaybe<Scalars['Int']>;
  xPosition_lte?: InputMaybe<Scalars['Int']>;
  xPosition_not?: InputMaybe<Scalars['Int']>;
  xPosition_not_in?: InputMaybe<Array<Scalars['Int']>>;
  yPosition?: InputMaybe<Scalars['Int']>;
  yPosition_gt?: InputMaybe<Scalars['Int']>;
  yPosition_gte?: InputMaybe<Scalars['Int']>;
  yPosition_in?: InputMaybe<Array<Scalars['Int']>>;
  yPosition_lt?: InputMaybe<Scalars['Int']>;
  yPosition_lte?: InputMaybe<Scalars['Int']>;
  yPosition_not?: InputMaybe<Scalars['Int']>;
  yPosition_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export type TLegacyCustomApplication = {
  __typename?: 'LegacyCustomApplication';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  navbarMenu?: Maybe<TNavbarMenu>;
  oAuthScopes: Array<Scalars['String']>;
  project: TProjectExtension;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TLegacyCustomApplicationQueryInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<TLegacyCustomApplicationQueryWhereInput>;
};

export type TLegacyCustomApplicationQueryWhereInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  projectKey?: InputMaybe<Scalars['String']>;
  uriPath?: InputMaybe<Scalars['String']>;
};

export type TLegacyCustomApplicationsMigrationReport = {
  __typename?: 'LegacyCustomApplicationsMigrationReport';
  applications: Array<TApplicationInfoForLegacyCustomApplicationsMigrationReport>;
  organizationExtensionId?: Maybe<Scalars['ID']>;
  organizationId: Scalars['String'];
  organizationName?: Maybe<Scalars['String']>;
  projects: Array<TProjectInfoForLegacyCustomApplicationsMigrationReport>;
};

export type TLegacyCustomApplicationsPagedQueryResult = {
  __typename?: 'LegacyCustomApplicationsPagedQueryResult';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<TLegacyCustomApplication>;
  total: Scalars['Int'];
};

export type TLocalizedField = {
  __typename?: 'LocalizedField';
  locale: Scalars['String'];
  value: Scalars['String'];
};

export type TLocalizedFieldCreateInput = {
  id?: InputMaybe<Scalars['ID']>;
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
  ValueDesc = 'value_DESC',
}

export type TLocalizedFieldWhereInput = {
  AND?: InputMaybe<Array<TLocalizedFieldWhereInput>>;
  NOT?: InputMaybe<Array<TLocalizedFieldWhereInput>>;
  OR?: InputMaybe<Array<TLocalizedFieldWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  locale_contains?: InputMaybe<Scalars['String']>;
  locale_ends_with?: InputMaybe<Scalars['String']>;
  locale_gt?: InputMaybe<Scalars['String']>;
  locale_gte?: InputMaybe<Scalars['String']>;
  locale_in?: InputMaybe<Array<Scalars['String']>>;
  locale_lt?: InputMaybe<Scalars['String']>;
  locale_lte?: InputMaybe<Scalars['String']>;
  locale_not?: InputMaybe<Scalars['String']>;
  locale_not_contains?: InputMaybe<Scalars['String']>;
  locale_not_ends_with?: InputMaybe<Scalars['String']>;
  locale_not_in?: InputMaybe<Array<Scalars['String']>>;
  locale_not_starts_with?: InputMaybe<Scalars['String']>;
  locale_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  value?: InputMaybe<Scalars['String']>;
  value_contains?: InputMaybe<Scalars['String']>;
  value_ends_with?: InputMaybe<Scalars['String']>;
  value_gt?: InputMaybe<Scalars['String']>;
  value_gte?: InputMaybe<Scalars['String']>;
  value_in?: InputMaybe<Array<Scalars['String']>>;
  value_lt?: InputMaybe<Scalars['String']>;
  value_lte?: InputMaybe<Scalars['String']>;
  value_not?: InputMaybe<Scalars['String']>;
  value_not_contains?: InputMaybe<Scalars['String']>;
  value_not_ends_with?: InputMaybe<Scalars['String']>;
  value_not_in?: InputMaybe<Array<Scalars['String']>>;
  value_not_starts_with?: InputMaybe<Scalars['String']>;
  value_starts_with?: InputMaybe<Scalars['String']>;
};

export enum TMetricCardType {
  AverageOrderValue = 'AVERAGE_ORDER_VALUE',
  OrderStatus = 'ORDER_STATUS',
  ProductTopVariants = 'PRODUCT_TOP_VARIANTS',
  ResourcesNumbers = 'RESOURCES_NUMBERS',
  SalesPerformance = 'SALES_PERFORMANCE',
  TotalOrders = 'TOTAL_ORDERS',
  TotalSales = 'TOTAL_SALES',
}

export type TMigrationMatchingScore = {
  __typename?: 'MigrationMatchingScore';
  matchFrom: Scalars['String'];
  matchTo: Scalars['String'];
  score: Scalars['Float'];
};

export type TMigrationResult = {
  __typename?: 'MigrationResult';
  failed: Scalars['Int'];
  failedIds?: Maybe<Array<Scalars['ID']>>;
  skipped: Scalars['Int'];
  succeeded: Scalars['Int'];
};

export type TMutation = {
  __typename?: 'Mutation';
  activateCartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  activateCustomersListView?: Maybe<TCustomersListView>;
  activateDashboardView?: Maybe<TDashboardView>;
  activateDiscountCodesCustomView?: Maybe<TDiscountsCustomView>;
  activateOrdersListView?: Maybe<TOrdersListView>;
  activateOrganizationExtensionOidcSsoConfig?: Maybe<TOrganizationExtension>;
  activatePimSearchListView?: Maybe<TPimSearchListView>;
  activateProductDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  activateProductTypeAttributesView?: Maybe<TProductTypeAttributesView>;
  activateProjectExtensionApplication?: Maybe<TProjectExtension>;
  changeCustomApplicationStatus?: Maybe<TRestrictedCustomApplicationForOrganization>;
  createCartDiscountsCustomView: TDiscountsCustomView;
  createCustomApplication?: Maybe<TRestrictedCustomApplicationForOrganization>;
  createCustomersListView: TCustomersListView;
  createDashboardView: TDashboardView;
  createDiscountCodesCustomView: TDiscountsCustomView;
  createOrdersListView: TOrdersListView;
  createPimSearchListView: TPimSearchListView;
  createProductDiscountsCustomView: TDiscountsCustomView;
  createProductTypeAttributesView: TProductTypeAttributesView;
  createVariantPricesListView?: Maybe<TVariantPricesListView>;
  deactivateCartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  deactivateCustomersListView?: Maybe<TOrdersListView>;
  deactivateDashboardView?: Maybe<TDashboardView>;
  deactivateDiscountCodesCustomView?: Maybe<TDiscountsCustomView>;
  deactivateOrdersListView?: Maybe<TOrdersListView>;
  deactivateOrganizationExtensionOidcSsoConfig?: Maybe<TOrganizationExtension>;
  deactivatePimSearchListView?: Maybe<TPimSearchListView>;
  deactivateProductDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  deactivateProductTypeAttributesView?: Maybe<TProductTypeAttributesView>;
  deactivateProjectExtensionApplication?: Maybe<TProjectExtension>;
  deleteAllDashboardViews: Array<TDashboardView>;
  deleteAllOrdersListViews: Array<TOrdersListView>;
  deleteCartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  deleteCustomApplication?: Maybe<TRestrictedCustomApplicationForOrganization>;
  deleteCustomersListView?: Maybe<TCustomersListView>;
  deleteDashboardView?: Maybe<TDashboardView>;
  deleteDiscountCodesCustomView?: Maybe<TDiscountsCustomView>;
  deleteOrdersListView?: Maybe<TOrdersListView>;
  deletePimSearchListView?: Maybe<TPimSearchListView>;
  deleteProductDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  deleteProductTypeAttributesView?: Maybe<TProductTypeAttributesView>;
  deleteProjectExtensionApplication?: Maybe<TProjectExtension>;
  installCustomApplication?: Maybe<TRestrictedCustomApplicationInstallationForOrganization>;
  /** @deprecated Experimental feature - For internal usage only */
  migrateCustomersListViews?: Maybe<TMigrationResult>;
  /** @deprecated Experimental feature - For internal usage only */
  migrateDashboardViews?: Maybe<TMigrationResult>;
  /** @deprecated Experimental feature - For internal usage only */
  migrateDiscountsListViews?: Maybe<TMigrationResult>;
  /** @deprecated Experimental feature - For internal usage only */
  migrateOrdersListViews?: Maybe<TMigrationResult>;
  /** @deprecated Experimental feature - For internal usage only */
  migrateOrganizationExtensionsOidcSsoConfig: TMigrationResult;
  /** @deprecated Experimental feature - For internal usage only */
  migratePimSearchListViews?: Maybe<TMigrationResult>;
  /** @deprecated Experimental feature - For internal usage only */
  migrateProductTypeAttributesViews?: Maybe<TMigrationResult>;
  /** @deprecated Experimental feature - For internal usage only */
  migrateProjectExtensions: TMigrationResult;
  /** @deprecated Experimental feature - For internal usage only */
  migrateRuleBuilderQuickSelectionValues?: Maybe<TMigrationResult>;
  /** @deprecated Experimental feature - For internal usage only */
  migrateVariantPricesListViews?: Maybe<TMigrationResult>;
  /** @deprecated Experimental feature - For internal usage only */
  revertCustomersListViewsMigration: TReversionResult;
  /** @deprecated Experimental feature - For internal usage only */
  revertDashboardViewsMigration: TReversionResult;
  /** @deprecated Experimental feature - For internal usage only */
  revertDiscountsListViewsMigration: TReversionResult;
  /** @deprecated Experimental feature - For internal usage only */
  revertOrdersListViewsMigration: TReversionResult;
  /** @deprecated Experimental feature - For internal usage only */
  revertPimSearchListViewsMigration: TReversionResult;
  /** @deprecated Experimental feature - For internal usage only */
  revertProductTypeAttributesViewsMigration: TReversionResult;
  /** @deprecated Experimental feature - For internal usage only */
  revertRuleBuilderQuickSelectionValuesMigration: TReversionResult;
  /** @deprecated Experimental feature - For internal usage only */
  revertVariantPricesListViewsMigration: TReversionResult;
  sendLinkToVerifyCustomApplicationsMaintainerContactEmail?: Maybe<TCustomApplicationsMaintainerContactEmailVerificationRequest>;
  setCustomApplicationsMaintainerContactInformation?: Maybe<TOrganizationExtension>;
  setOrganizationExtensionOidcSsoConfig?: Maybe<TOrganizationExtension>;
  setProjectExtensionCategoryRecommendation?: Maybe<TProjectExtension>;
  setProjectExtensionImageRegex?: Maybe<TProjectExtension>;
  setProjectExtensionOrderStatesVisibility?: Maybe<TProjectExtension>;
  uninstallCustomApplication?: Maybe<TRestrictedCustomApplicationInstallationForOrganization>;
  updateCartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  updateCustomApplication?: Maybe<TRestrictedCustomApplicationForOrganization>;
  updateCustomApplicationProjectsInstallation?: Maybe<TRestrictedCustomApplicationInstallationForOrganization>;
  updateCustomersListView?: Maybe<TCustomersListView>;
  updateDashboardView?: Maybe<TDashboardView>;
  updateDiscountCodesCustomView?: Maybe<TDiscountsCustomView>;
  updateOrdersListView?: Maybe<TOrdersListView>;
  updatePimSearchListView?: Maybe<TPimSearchListView>;
  updateProductDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  updateProductTypeAttributesView: TProductTypeAttributesView;
  updateProjectExtensionApplication?: Maybe<TProjectExtension>;
  updateRuleBuilderQuickSelectionValues?: Maybe<TRuleBuilderQuickSelectionValues>;
  updateVariantPricesListView?: Maybe<TVariantPricesListView>;
  verifyCustomApplicationsMaintainerContactEmail?: Maybe<TCustomApplicationsMaintainerContactEmailVerificationConfirmation>;
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

export type TMutation_CreateOrdersListViewArgs = {
  data: TOrdersListViewInput;
};

export type TMutation_CreatePimSearchListViewArgs = {
  data: TPimSearchListViewInput;
};

export type TMutation_CreateProductDiscountsCustomViewArgs = {
  data: TDiscountsCustomViewInput;
};

export type TMutation_CreateProductTypeAttributesViewArgs = {
  data: TProductTypeAttributesViewInput;
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
  projectKeys?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TMutation_MigrateCustomersListViewsArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_MigrateDashboardViewsArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_MigrateDiscountsListViewsArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_MigrateOrdersListViewsArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_MigrateOrganizationExtensionsOidcSsoConfigArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_MigratePimSearchListViewsArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_MigrateProductTypeAttributesViewsArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_MigrateProjectExtensionsArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_MigrateRuleBuilderQuickSelectionValuesArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_MigrateVariantPricesListViewsArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_RevertCustomersListViewsMigrationArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_RevertDashboardViewsMigrationArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_RevertDiscountsListViewsMigrationArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_RevertOrdersListViewsMigrationArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_RevertPimSearchListViewsMigrationArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_RevertProductTypeAttributesViewsMigrationArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_RevertRuleBuilderQuickSelectionValuesMigrationArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_RevertVariantPricesListViewsMigrationArgs = {
  dryRun?: InputMaybe<Scalars['Boolean']>;
  projectKeys?: InputMaybe<Array<Scalars['String']>>;
  userEmail: Scalars['String'];
};

export type TMutation_SendLinkToVerifyCustomApplicationsMaintainerContactEmailArgs =
  {
    organizationId: Scalars['String'];
  };

export type TMutation_SetCustomApplicationsMaintainerContactInformationArgs = {
  data?: InputMaybe<TContactInformationDataInput>;
  organizationId: Scalars['String'];
};

export type TMutation_SetOrganizationExtensionOidcSsoConfigArgs = {
  data: TOidcSsoConfigDataInput;
  organizationId: Scalars['String'];
};

export type TMutation_SetProjectExtensionCategoryRecommendationArgs = {
  data?: InputMaybe<TCategoryRecommendationSettingsDataInput>;
};

export type TMutation_SetProjectExtensionImageRegexArgs = {
  data?: InputMaybe<TImageRegexDataInput>;
};

export type TMutation_SetProjectExtensionOrderStatesVisibilityArgs = {
  data?: InputMaybe<Array<InputMaybe<TOrderStatesVisibility>>>;
};

export type TMutation_UninstallCustomApplicationArgs = {
  installedApplicationId: Scalars['ID'];
  organizationId: Scalars['String'];
};

export type TMutation_UpdateCartDiscountsCustomViewArgs = {
  data: TDiscountsCustomViewInput;
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
  projectKeys?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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
  id?: InputMaybe<Scalars['ID']>;
};

export type TMutation_UpdateVariantPricesListViewArgs = {
  data: TVariantPricesListViewInput;
  id: Scalars['ID'];
};

export type TMutation_VerifyCustomApplicationsMaintainerContactEmailArgs = {
  token: Scalars['String'];
};

export type TMyCustomApplication = {
  __typename?: 'MyCustomApplication';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  mainMenuLink: TCustomApplicationMenuLink;
  name: Scalars['String'];
  organizationId: Scalars['String'];
  organizationName: Scalars['String'];
  permissions: Array<TCustomApplicationPermission>;
  status: TCustomApplicationStatus;
  submenuLinks: Array<TCustomApplicationSubmenuLink>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TMyCustomApplicationQueryInput = {
  where?: InputMaybe<TMyCustomApplicationQueryWhereInput>;
};

export type TMyCustomApplicationQueryWhereInput = {
  status?: InputMaybe<TCustomApplicationStatus>;
};

export type TNavbarMenu = {
  __typename?: 'NavbarMenu';
  createdAt: Scalars['DateTime'];
  featureToggle?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  id: Scalars['ID'];
  key: Scalars['String'];
  labelAllLocales?: Maybe<Array<TLocalizedField>>;
  permissions: Array<TOAuthScope>;
  submenu?: Maybe<Array<TNavbarSubmenu>>;
  updatedAt: Scalars['DateTime'];
  uriPath: Scalars['String'];
};

export type TNavbarMenu_LabelAllLocalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLocalizedFieldOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLocalizedFieldWhereInput>;
};

export type TNavbarMenu_SubmenuArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TNavbarSubmenuOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TNavbarSubmenuWhereInput>;
};

export type TNavbarSubmenu = {
  __typename?: 'NavbarSubmenu';
  createdAt: Scalars['DateTime'];
  featureToggle?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  key: Scalars['String'];
  labelAllLocales?: Maybe<Array<TLocalizedField>>;
  permissions: Array<TOAuthScope>;
  updatedAt: Scalars['DateTime'];
  uriPath: Scalars['String'];
};

export type TNavbarSubmenu_LabelAllLocalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLocalizedFieldOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLocalizedFieldWhereInput>;
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
  UriPathDesc = 'uriPath_DESC',
}

export type TNavbarSubmenuWhereInput = {
  AND?: InputMaybe<Array<TNavbarSubmenuWhereInput>>;
  NOT?: InputMaybe<Array<TNavbarSubmenuWhereInput>>;
  OR?: InputMaybe<Array<TNavbarSubmenuWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  featureToggle?: InputMaybe<Scalars['String']>;
  featureToggle_contains?: InputMaybe<Scalars['String']>;
  featureToggle_ends_with?: InputMaybe<Scalars['String']>;
  featureToggle_gt?: InputMaybe<Scalars['String']>;
  featureToggle_gte?: InputMaybe<Scalars['String']>;
  featureToggle_in?: InputMaybe<Array<Scalars['String']>>;
  featureToggle_lt?: InputMaybe<Scalars['String']>;
  featureToggle_lte?: InputMaybe<Scalars['String']>;
  featureToggle_not?: InputMaybe<Scalars['String']>;
  featureToggle_not_contains?: InputMaybe<Scalars['String']>;
  featureToggle_not_ends_with?: InputMaybe<Scalars['String']>;
  featureToggle_not_in?: InputMaybe<Array<Scalars['String']>>;
  featureToggle_not_starts_with?: InputMaybe<Scalars['String']>;
  featureToggle_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  key_contains?: InputMaybe<Scalars['String']>;
  key_ends_with?: InputMaybe<Scalars['String']>;
  key_gt?: InputMaybe<Scalars['String']>;
  key_gte?: InputMaybe<Scalars['String']>;
  key_in?: InputMaybe<Array<Scalars['String']>>;
  key_lt?: InputMaybe<Scalars['String']>;
  key_lte?: InputMaybe<Scalars['String']>;
  key_not?: InputMaybe<Scalars['String']>;
  key_not_contains?: InputMaybe<Scalars['String']>;
  key_not_ends_with?: InputMaybe<Scalars['String']>;
  key_not_in?: InputMaybe<Array<Scalars['String']>>;
  key_not_starts_with?: InputMaybe<Scalars['String']>;
  key_starts_with?: InputMaybe<Scalars['String']>;
  labelAllLocales_every?: InputMaybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none?: InputMaybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some?: InputMaybe<TLocalizedFieldWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  uriPath?: InputMaybe<Scalars['String']>;
  uriPath_contains?: InputMaybe<Scalars['String']>;
  uriPath_ends_with?: InputMaybe<Scalars['String']>;
  uriPath_gt?: InputMaybe<Scalars['String']>;
  uriPath_gte?: InputMaybe<Scalars['String']>;
  uriPath_in?: InputMaybe<Array<Scalars['String']>>;
  uriPath_lt?: InputMaybe<Scalars['String']>;
  uriPath_lte?: InputMaybe<Scalars['String']>;
  uriPath_not?: InputMaybe<Scalars['String']>;
  uriPath_not_contains?: InputMaybe<Scalars['String']>;
  uriPath_not_ends_with?: InputMaybe<Scalars['String']>;
  uriPath_not_in?: InputMaybe<Array<Scalars['String']>>;
  uriPath_not_starts_with?: InputMaybe<Scalars['String']>;
  uriPath_starts_with?: InputMaybe<Scalars['String']>;
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
  ViewProjectSettings = 'ViewProjectSettings',
}

export type TOidcSsoConfig = {
  __typename?: 'OidcSsoConfig';
  authorityUrl: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  logoutUrl?: Maybe<Scalars['String']>;
  teamIdForNewUsers: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TOidcSsoConfigDataInput = {
  authorityUrl: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret?: InputMaybe<Scalars['String']>;
  logoutUrl?: InputMaybe<Scalars['String']>;
  teamIdForNewUsers: Scalars['String'];
};

export enum TOrderStatesVisibility {
  HideOrderState = 'HideOrderState',
  HidePaymentState = 'HidePaymentState',
  HideShipmentState = 'HideShipmentState',
}

export type TOrderStatusConfiguration = {
  __typename?: 'OrderStatusConfiguration';
  createdAt: Scalars['DateTime'];
  dateFilterType: TDateFilterType;
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  productId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TOrderStatusConfigurationInput = {
  dateFilterType: TDateFilterType;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  productId?: InputMaybe<Scalars['String']>;
};

export type TOrderStatusConfigurationWhereInput = {
  AND?: InputMaybe<Array<TOrderStatusConfigurationWhereInput>>;
  NOT?: InputMaybe<Array<TOrderStatusConfigurationWhereInput>>;
  OR?: InputMaybe<Array<TOrderStatusConfigurationWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateFilterType?: InputMaybe<TDateFilterType>;
  dateFilterType_in?: InputMaybe<Array<TDateFilterType>>;
  dateFilterType_not?: InputMaybe<TDateFilterType>;
  dateFilterType_not_in?: InputMaybe<Array<TDateFilterType>>;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateFrom_gt?: InputMaybe<Scalars['DateTime']>;
  dateFrom_gte?: InputMaybe<Scalars['DateTime']>;
  dateFrom_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateFrom_lt?: InputMaybe<Scalars['DateTime']>;
  dateFrom_lte?: InputMaybe<Scalars['DateTime']>;
  dateFrom_not?: InputMaybe<Scalars['DateTime']>;
  dateFrom_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  dateTo_gt?: InputMaybe<Scalars['DateTime']>;
  dateTo_gte?: InputMaybe<Scalars['DateTime']>;
  dateTo_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateTo_lt?: InputMaybe<Scalars['DateTime']>;
  dateTo_lte?: InputMaybe<Scalars['DateTime']>;
  dateTo_not?: InputMaybe<Scalars['DateTime']>;
  dateTo_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  productId?: InputMaybe<Scalars['String']>;
  productId_contains?: InputMaybe<Scalars['String']>;
  productId_ends_with?: InputMaybe<Scalars['String']>;
  productId_gt?: InputMaybe<Scalars['String']>;
  productId_gte?: InputMaybe<Scalars['String']>;
  productId_in?: InputMaybe<Array<Scalars['String']>>;
  productId_lt?: InputMaybe<Scalars['String']>;
  productId_lte?: InputMaybe<Scalars['String']>;
  productId_not?: InputMaybe<Scalars['String']>;
  productId_not_contains?: InputMaybe<Scalars['String']>;
  productId_not_ends_with?: InputMaybe<Scalars['String']>;
  productId_not_in?: InputMaybe<Array<Scalars['String']>>;
  productId_not_starts_with?: InputMaybe<Scalars['String']>;
  productId_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type TOrdersListView = {
  __typename?: 'OrdersListView';
  createdAt: Scalars['DateTime'];
  filters?: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  migratedById?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  searchParams?: Maybe<Scalars['Json']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type TOrdersListView_FiltersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TFilterValuesOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TFilterValuesWhereInput>;
};

export type TOrdersListView_NameAllLocalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLocalizedFieldOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLocalizedFieldWhereInput>;
};

export type TOrdersListViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search?: InputMaybe<Scalars['String']>;
  searchParams?: InputMaybe<Scalars['Json']>;
  sort: TSortCreateInput;
  table?: InputMaybe<TOrdersListViewTableInput>;
};

export type TOrdersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TOrganizationExtension = {
  __typename?: 'OrganizationExtension';
  applicationsMaintainerContactInformation?: Maybe<TContactInformation>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installedApplications?: Maybe<
    Array<TRestrictedCustomApplicationInstallationForOrganization>
  >;
  oidcSsoConfig?: Maybe<TOidcSsoConfig>;
  organizationId: Scalars['String'];
  registeredApplications?: Maybe<
    Array<TRestrictedCustomApplicationForOrganization>
  >;
  updatedAt: Scalars['DateTime'];
};

export type TOrganizationExtensionForCustomApplication = {
  __typename?: 'OrganizationExtensionForCustomApplication';
  application: TRestrictedCustomApplicationForOrganization;
  id: Scalars['ID'];
  organizationId: Scalars['String'];
  organizationName?: Maybe<Scalars['String']>;
};

export type TPimSearchListView = {
  __typename?: 'PimSearchListView';
  createdAt: Scalars['DateTime'];
  filters?: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  migratedById?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type TPimSearchListView_FiltersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TFilterValuesOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TFilterValuesWhereInput>;
};

export type TPimSearchListView_NameAllLocalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLocalizedFieldOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLocalizedFieldWhereInput>;
};

export type TPimSearchListViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search?: InputMaybe<Scalars['String']>;
  sort: TSortCreateInput;
  table?: InputMaybe<TPimSearchListViewTableInput>;
};

export type TPimSearchListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TProductTypeAttributesView = {
  __typename?: 'ProductTypeAttributesView';
  createdAt: Scalars['DateTime'];
  existence?: Maybe<TExistence>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isVariant?: Maybe<Scalars['Boolean']>;
  migratedById?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  pinnedAttributes: Array<Scalars['String']>;
  productTypeId: Scalars['String'];
  projectKey: Scalars['String'];
  searchTerm?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type TProductTypeAttributesView_NameAllLocalesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TLocalizedFieldOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TLocalizedFieldWhereInput>;
};

export type TProductTypeAttributesViewInput = {
  existence?: InputMaybe<TExistence>;
  isVariant?: InputMaybe<Scalars['Boolean']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  pinnedAttributes: Array<Scalars['String']>;
  productTypeId: Scalars['String'];
  searchTerm?: InputMaybe<Scalars['String']>;
};

export type TProductTypeAttributesViewUpdateInput = {
  existence?: InputMaybe<TExistence>;
  isVariant?: InputMaybe<Scalars['Boolean']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  pinnedAttributes: Array<Scalars['String']>;
  searchTerm?: InputMaybe<Scalars['String']>;
};

export type TProjectExtension = {
  __typename?: 'ProjectExtension';
  applications?: Maybe<Array<TApplicationExtension>>;
  categoryRecommendationSettings?: Maybe<TCategoryRecommendationSettings>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageRegex?: Maybe<TImageRegex>;
  installedApplications?: Maybe<
    Array<TRestrictedCustomApplicationInstallationForProject>
  >;
  orderStatesVisibility: Array<TOrderStatesVisibility>;
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TProjectExtension_ApplicationsArgs = {
  where?: InputMaybe<TRestrictedApplicationExtensionWhereInput>;
};

export type TProjectInfoForLegacyCustomApplicationsMigrationReport = {
  __typename?: 'ProjectInfoForLegacyCustomApplicationsMigrationReport';
  applicationExtensions: Array<TApplicationExtensionInfoForLegacyCustomApplicationsMigrationReport>;
  projectExtensionId: Scalars['ID'];
  projectKey: Scalars['String'];
};

export type TQuery = {
  __typename?: 'Query';
  activeCartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  activeCustomersListView?: Maybe<TCustomersListView>;
  activeDashboardView?: Maybe<TDashboardView>;
  activeDiscountCodesCustomView?: Maybe<TDiscountsCustomView>;
  activeOrdersListView?: Maybe<TOrdersListView>;
  activePimSearchListView?: Maybe<TPimSearchListView>;
  activeProductDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  activeProductTypeAttributesView?: Maybe<TProductTypeAttributesView>;
  /** @deprecated Experimental feature - For internal usage only */
  allAppliedCustomApplicationPermissions: Array<TCustomApplicationInstallationPermission>;
  /** @deprecated Experimental feature - For internal usage only */
  allCustomApplications: TCustomApplicationsPagedQueryResult;
  /** @deprecated Experimental feature - For internal usage only */
  allLegacyCustomApplications: TLegacyCustomApplicationsPagedQueryResult;
  /** @deprecated Experimental feature - For internal usage only */
  allOrganizationExtensions: Array<TOrganizationExtension>;
  allProjectExtensions: Array<TProjectExtension>;
  cartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  cartDiscountsCustomViews: Array<Maybe<TDiscountsCustomView>>;
  /** @deprecated Experimental feature - For internal usage only */
  customApplication?: Maybe<TCustomApplication>;
  customersListView?: Maybe<TCustomersListView>;
  customersListViews: Array<Maybe<TCustomersListView>>;
  dashboardView?: Maybe<TDashboardView>;
  dashboardViews: Array<Maybe<TDashboardView>>;
  discountCodesCustomView?: Maybe<TDiscountsCustomView>;
  discountCodesCustomViews: Array<Maybe<TDiscountsCustomView>>;
  /** @deprecated Experimental feature - For internal usage only */
  globalOrganizationExtension?: Maybe<TOrganizationExtension>;
  /** @deprecated Experimental feature - For internal usage only */
  legacyCustomApplication?: Maybe<TLegacyCustomApplication>;
  /** @deprecated Experimental feature - For internal usage only */
  legacyCustomApplicationsMigrationReport: Array<TLegacyCustomApplicationsMigrationReport>;
  myCustomApplications: Array<TMyCustomApplication>;
  ordersListView?: Maybe<TOrdersListView>;
  ordersListViews: Array<Maybe<TOrdersListView>>;
  organizationExtension?: Maybe<TOrganizationExtension>;
  organizationExtensionForCustomApplication?: Maybe<TOrganizationExtensionForCustomApplication>;
  pimSearchListView?: Maybe<TPimSearchListView>;
  pimSearchListViews: Array<Maybe<TPimSearchListView>>;
  productDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  productDiscountsCustomViews: Array<Maybe<TDiscountsCustomView>>;
  productTypeAttributesView?: Maybe<TProductTypeAttributesView>;
  productTypeAttributesViews?: Maybe<Array<Maybe<TProductTypeAttributesView>>>;
  projectExtension?: Maybe<TProjectExtension>;
  ruleBuilderQuickSelectionValues?: Maybe<
    Array<Maybe<TRuleBuilderQuickSelectionValues>>
  >;
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

export type TQuery_AllCustomApplicationsArgs = {
  params?: InputMaybe<TCustomApplicationQueryInput>;
};

export type TQuery_AllLegacyCustomApplicationsArgs = {
  params?: InputMaybe<TLegacyCustomApplicationQueryInput>;
};

export type TQuery_AllOrganizationExtensionsArgs = {
  organizationIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TQuery_CartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};

export type TQuery_CustomApplicationArgs = {
  applicationId: Scalars['ID'];
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

export type TQuery_LegacyCustomApplicationArgs = {
  applicationId: Scalars['ID'];
};

export type TQuery_MyCustomApplicationsArgs = {
  params?: InputMaybe<TMyCustomApplicationQueryInput>;
};

export type TQuery_OrdersListViewArgs = {
  id: Scalars['ID'];
};

export type TQuery_OrganizationExtensionArgs = {
  organizationId: Scalars['String'];
};

export type TQuery_OrganizationExtensionForCustomApplicationArgs = {
  entryPointUriPath: Scalars['String'];
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
  UnpublishedProducts = 'UNPUBLISHED_PRODUCTS',
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
  AND?: InputMaybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  NOT?: InputMaybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  OR?: InputMaybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type TRestrictedApplicationExtensionWhereInput = {
  id?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type TRestrictedCustomApplicationForOrganization = {
  __typename?: 'RestrictedCustomApplicationForOrganization';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  mainMenuLink: TCustomApplicationMenuLink;
  name: Scalars['String'];
  permissions: Array<TCustomApplicationPermission>;
  status: TCustomApplicationStatus;
  submenuLinks: Array<TCustomApplicationSubmenuLink>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TRestrictedCustomApplicationForProject = {
  __typename?: 'RestrictedCustomApplicationForProject';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  mainMenuLink: TCustomApplicationMenuLink;
  /** @deprecated This field has been renamed to mainMenuLink field. The nested submenuLinks is also now a top level field. */
  menuLinks?: Maybe<TCustomApplicationMenuLink>;
  name: Scalars['String'];
  permissions: Array<TCustomApplicationPermission>;
  status?: Maybe<TCustomApplicationStatus>;
  submenuLinks: Array<TCustomApplicationSubmenuLink>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TRestrictedCustomApplicationInstallationForOrganization = {
  __typename?: 'RestrictedCustomApplicationInstallationForOrganization';
  acceptedPermissions: Array<TCustomApplicationInstallationPermission>;
  application: TRestrictedCustomApplicationForProject;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installInAllProjects: Scalars['Boolean'];
  projects?: Maybe<Array<TProjectExtension>>;
  updatedAt: Scalars['DateTime'];
};

export type TRestrictedCustomApplicationInstallationForProject = {
  __typename?: 'RestrictedCustomApplicationInstallationForProject';
  acceptedPermissions: Array<TCustomApplicationInstallationPermission>;
  application: TRestrictedCustomApplicationForProject;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installInAllProjects: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type TReversionResult = {
  __typename?: 'ReversionResult';
  revertedIds?: Maybe<Array<Scalars['ID']>>;
  skipped?: Maybe<Scalars['Int']>;
};

export type TRuleBuilderQuickSelectCreatefunctionsInput = {
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type TRuleBuilderQuickSelectCreatepredicatesInput = {
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type TRuleBuilderQuickSelectionInput = {
  functions?: InputMaybe<TRuleBuilderQuickSelectCreatepredicatesInput>;
  predicates?: InputMaybe<TRuleBuilderQuickSelectCreatefunctionsInput>;
  ruleBuilderType: TRuleBuilderType;
};

export type TRuleBuilderQuickSelectionValues = {
  __typename?: 'RuleBuilderQuickSelectionValues';
  createdAt: Scalars['DateTime'];
  functions: Array<Scalars['String']>;
  id: Scalars['ID'];
  migratedById?: Maybe<Scalars['String']>;
  predicates: Array<Scalars['String']>;
  projectKey: Scalars['String'];
  ruleBuilderType: TRuleBuilderType;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export enum TRuleBuilderType {
  CartDiscount = 'CartDiscount',
  CartTargetDiscount = 'CartTargetDiscount',
  ProductDiscount = 'ProductDiscount',
}

export type TSalesPerformanceConfiguration = {
  __typename?: 'SalesPerformanceConfiguration';
  createdAt: Scalars['DateTime'];
  dateFilterType: TDateFilterType;
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  showPreviousTimeframe: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type TSalesPerformanceConfigurationInput = {
  dateFilterType: TDateFilterType;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TSalesPerformanceConfigurationWhereInput = {
  AND?: InputMaybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  NOT?: InputMaybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  OR?: InputMaybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateFilterType?: InputMaybe<TDateFilterType>;
  dateFilterType_in?: InputMaybe<Array<TDateFilterType>>;
  dateFilterType_not?: InputMaybe<TDateFilterType>;
  dateFilterType_not_in?: InputMaybe<Array<TDateFilterType>>;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateFrom_gt?: InputMaybe<Scalars['DateTime']>;
  dateFrom_gte?: InputMaybe<Scalars['DateTime']>;
  dateFrom_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateFrom_lt?: InputMaybe<Scalars['DateTime']>;
  dateFrom_lte?: InputMaybe<Scalars['DateTime']>;
  dateFrom_not?: InputMaybe<Scalars['DateTime']>;
  dateFrom_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  dateTo_gt?: InputMaybe<Scalars['DateTime']>;
  dateTo_gte?: InputMaybe<Scalars['DateTime']>;
  dateTo_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateTo_lt?: InputMaybe<Scalars['DateTime']>;
  dateTo_lte?: InputMaybe<Scalars['DateTime']>;
  dateTo_not?: InputMaybe<Scalars['DateTime']>;
  dateTo_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  showPreviousTimeframe?: InputMaybe<Scalars['Boolean']>;
  showPreviousTimeframe_not?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
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
  id?: InputMaybe<Scalars['ID']>;
  key: Scalars['String'];
  order: TSortOrder;
};

export enum TSortOrder {
  Asc = 'Asc',
  Desc = 'Desc',
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
  bestSellingLimit?: InputMaybe<TBestSellingLimit>;
};

export type TTopProductsConfigurationWhereInput = {
  AND?: InputMaybe<Array<TTopProductsConfigurationWhereInput>>;
  NOT?: InputMaybe<Array<TTopProductsConfigurationWhereInput>>;
  OR?: InputMaybe<Array<TTopProductsConfigurationWhereInput>>;
  bestSellingLimit?: InputMaybe<TBestSellingLimit>;
  bestSellingLimit_in?: InputMaybe<Array<TBestSellingLimit>>;
  bestSellingLimit_not?: InputMaybe<TBestSellingLimit>;
  bestSellingLimit_not_in?: InputMaybe<Array<TBestSellingLimit>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type TTotalOrdersConfiguration = {
  __typename?: 'TotalOrdersConfiguration';
  createdAt: Scalars['DateTime'];
  dateFilterType: TDateFilterType;
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  productId?: Maybe<Scalars['String']>;
  showPreviousTimeframe: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type TTotalOrdersConfigurationInput = {
  dateFilterType: TDateFilterType;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  productId?: InputMaybe<Scalars['String']>;
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TTotalOrdersConfigurationWhereInput = {
  AND?: InputMaybe<Array<TTotalOrdersConfigurationWhereInput>>;
  NOT?: InputMaybe<Array<TTotalOrdersConfigurationWhereInput>>;
  OR?: InputMaybe<Array<TTotalOrdersConfigurationWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateFilterType?: InputMaybe<TDateFilterType>;
  dateFilterType_in?: InputMaybe<Array<TDateFilterType>>;
  dateFilterType_not?: InputMaybe<TDateFilterType>;
  dateFilterType_not_in?: InputMaybe<Array<TDateFilterType>>;
  dateFrom?: InputMaybe<Scalars['DateTime']>;
  dateFrom_gt?: InputMaybe<Scalars['DateTime']>;
  dateFrom_gte?: InputMaybe<Scalars['DateTime']>;
  dateFrom_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateFrom_lt?: InputMaybe<Scalars['DateTime']>;
  dateFrom_lte?: InputMaybe<Scalars['DateTime']>;
  dateFrom_not?: InputMaybe<Scalars['DateTime']>;
  dateFrom_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateTo?: InputMaybe<Scalars['DateTime']>;
  dateTo_gt?: InputMaybe<Scalars['DateTime']>;
  dateTo_gte?: InputMaybe<Scalars['DateTime']>;
  dateTo_in?: InputMaybe<Array<Scalars['DateTime']>>;
  dateTo_lt?: InputMaybe<Scalars['DateTime']>;
  dateTo_lte?: InputMaybe<Scalars['DateTime']>;
  dateTo_not?: InputMaybe<Scalars['DateTime']>;
  dateTo_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  productId?: InputMaybe<Scalars['String']>;
  productId_contains?: InputMaybe<Scalars['String']>;
  productId_ends_with?: InputMaybe<Scalars['String']>;
  productId_gt?: InputMaybe<Scalars['String']>;
  productId_gte?: InputMaybe<Scalars['String']>;
  productId_in?: InputMaybe<Array<Scalars['String']>>;
  productId_lt?: InputMaybe<Scalars['String']>;
  productId_lte?: InputMaybe<Scalars['String']>;
  productId_not?: InputMaybe<Scalars['String']>;
  productId_not_contains?: InputMaybe<Scalars['String']>;
  productId_not_ends_with?: InputMaybe<Scalars['String']>;
  productId_not_in?: InputMaybe<Array<Scalars['String']>>;
  productId_not_starts_with?: InputMaybe<Scalars['String']>;
  productId_starts_with?: InputMaybe<Scalars['String']>;
  showPreviousTimeframe?: InputMaybe<Scalars['Boolean']>;
  showPreviousTimeframe_not?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type TTotalSalesConfiguration = {
  __typename?: 'TotalSalesConfiguration';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  productId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TTotalSalesConfigurationInput = {
  productId?: InputMaybe<Scalars['String']>;
};

export type TTotalSalesConfigurationWhereInput = {
  AND?: InputMaybe<Array<TTotalSalesConfigurationWhereInput>>;
  NOT?: InputMaybe<Array<TTotalSalesConfigurationWhereInput>>;
  OR?: InputMaybe<Array<TTotalSalesConfigurationWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  productId?: InputMaybe<Scalars['String']>;
  productId_contains?: InputMaybe<Scalars['String']>;
  productId_ends_with?: InputMaybe<Scalars['String']>;
  productId_gt?: InputMaybe<Scalars['String']>;
  productId_gte?: InputMaybe<Scalars['String']>;
  productId_in?: InputMaybe<Array<Scalars['String']>>;
  productId_lt?: InputMaybe<Scalars['String']>;
  productId_lte?: InputMaybe<Scalars['String']>;
  productId_not?: InputMaybe<Scalars['String']>;
  productId_not_contains?: InputMaybe<Scalars['String']>;
  productId_not_ends_with?: InputMaybe<Scalars['String']>;
  productId_not_in?: InputMaybe<Array<Scalars['String']>>;
  productId_not_starts_with?: InputMaybe<Scalars['String']>;
  productId_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type TVariantPricesListView = {
  __typename?: 'VariantPricesListView';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  migratedById?: Maybe<Scalars['String']>;
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  visibleColumns: Array<Scalars['String']>;
};

export type TVariantPricesListViewInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TFetchProjectExtensionImageRegexQueryVariables = Exact<{
  [key: string]: never;
}>;

export type TFetchProjectExtensionImageRegexQuery = {
  __typename?: 'Query';
  projectExtension?: {
    __typename?: 'ProjectExtension';
    id: string;
    imageRegex?: {
      __typename?: 'ImageRegex';
      thumb?: {
        __typename?: 'ImageRegexOptions';
        flag?: string | null;
        search: string;
        replace: string;
      } | null;
      small?: {
        __typename?: 'ImageRegexOptions';
        flag?: string | null;
        search: string;
        replace: string;
      } | null;
    } | null;
  } | null;
};

export type TImageRegexFragment = {
  __typename?: 'ImageRegexOptions';
  flag?: string | null;
  search: string;
  replace: string;
};

export type TFetchProjectExtensionsNavbarQueryVariables = Exact<{
  [key: string]: never;
}>;

export type TFetchProjectExtensionsNavbarQuery = {
  __typename?: 'Query';
  projectExtension?: {
    __typename?: 'ProjectExtension';
    id: string;
    applications?: Array<{
      __typename?: 'ApplicationExtension';
      id: string;
      navbarMenu?: {
        __typename?: 'NavbarMenu';
        id: string;
        key: string;
        uriPath: string;
        icon: string;
        featureToggle?: string | null;
        permissions: Array<TOAuthScope>;
        labelAllLocales?: Array<{
          __typename?: 'LocalizedField';
          locale: string;
          value: string;
        }> | null;
        submenu?: Array<{
          __typename?: 'NavbarSubmenu';
          id: string;
          key: string;
          uriPath: string;
          permissions: Array<TOAuthScope>;
          featureToggle?: string | null;
          labelAllLocales?: Array<{
            __typename?: 'LocalizedField';
            locale: string;
            value: string;
          }> | null;
        }> | null;
      } | null;
    }> | null;
    installedApplications?: Array<{
      __typename?: 'RestrictedCustomApplicationInstallationForProject';
      application: {
        __typename?: 'RestrictedCustomApplicationForProject';
        id: string;
        entryPointUriPath: string;
        icon: string;
        mainMenuLink: {
          __typename?: 'CustomApplicationMenuLink';
          id: string;
          permissions: Array<string>;
          defaultLabel: string;
          labelAllLocales: Array<{
            __typename?: 'LocalizedField';
            locale: string;
            value: string;
          }>;
        };
        submenuLinks: Array<{
          __typename?: 'CustomApplicationSubmenuLink';
          id: string;
          uriPath: string;
          permissions: Array<string>;
          defaultLabel: string;
          labelAllLocales: Array<{
            __typename?: 'LocalizedField';
            locale: string;
            value: string;
          }>;
        }>;
      };
    }> | null;
  } | null;
};

export type TCreateCustomApplicationFromCliMutationVariables = Exact<{
  organizationId: Scalars['String'];
  data: TCustomApplicationDraftDataInput;
}>;

export type TCreateCustomApplicationFromCliMutation = {
  __typename?: 'Mutation';
  createCustomApplication?: {
    __typename?: 'RestrictedCustomApplicationForOrganization';
    id: string;
  } | null;
};

export type TFetchCustomApplicationFromCliQueryVariables = Exact<{
  entryPointUriPath: Scalars['String'];
}>;

export type TFetchCustomApplicationFromCliQuery = {
  __typename?: 'Query';
  organizationExtensionForCustomApplication?: {
    __typename?: 'OrganizationExtensionForCustomApplication';
    organizationId: string;
    application: {
      __typename?: 'RestrictedCustomApplicationForOrganization';
      id: string;
      entryPointUriPath: string;
      name: string;
      description?: string | null;
      url: string;
      icon: string;
      permissions: Array<{
        __typename?: 'CustomApplicationPermission';
        name: string;
        oAuthScopes: Array<string>;
      }>;
      mainMenuLink: {
        __typename?: 'CustomApplicationMenuLink';
        defaultLabel: string;
        permissions: Array<string>;
        labelAllLocales: Array<{
          __typename?: 'LocalizedField';
          locale: string;
          value: string;
        }>;
      };
      submenuLinks: Array<{
        __typename?: 'CustomApplicationSubmenuLink';
        uriPath: string;
        defaultLabel: string;
        permissions: Array<string>;
        labelAllLocales: Array<{
          __typename?: 'LocalizedField';
          locale: string;
          value: string;
        }>;
      }>;
    };
  } | null;
};

export type TUpdateCustomApplicationFromCliMutationVariables = Exact<{
  organizationId: Scalars['String'];
  data: TCustomApplicationDraftDataInput;
  applicationId: Scalars['ID'];
}>;

export type TUpdateCustomApplicationFromCliMutation = {
  __typename?: 'Mutation';
  updateCustomApplication?: {
    __typename?: 'RestrictedCustomApplicationForOrganization';
    id: string;
  } | null;
};
