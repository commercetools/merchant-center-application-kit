export type Maybe<T> = T | null;
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
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  navbarMenu: TApplicationExtensionNavbarMenuDataInput;
  oAuthScopes?: Maybe<Array<Scalars['String']>>;
  url: Scalars['String'];
};

export type TApplicationExtensionNavbarMenuDataInput = {
  featureToggle?: Maybe<Scalars['String']>;
  icon: Scalars['String'];
  key: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<TOAuthScope>;
  submenu: Array<TApplicationExtensionNavbarSubmenuDataInput>;
  uriPath: Scalars['String'];
};

export type TApplicationExtensionNavbarSubmenuDataInput = {
  featureToggle?: Maybe<Scalars['String']>;
  key: Scalars['String'];
  labelAllLocales: Array<TLocalizedFieldDataInput>;
  permissions: Array<TOAuthScope>;
  uriPath: Scalars['String'];
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
  ViewSomeDiscounts = 'viewSomeDiscounts',
  ViewUsersAndOrganizations = 'viewUsersAndOrganizations'
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
  AND?: Maybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  NOT?: Maybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  OR?: Maybe<Array<TAverageOrderValueConfigurationWhereInput>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  showPreviousTimeframe?: Maybe<Scalars['Boolean']>;
  showPreviousTimeframe_not?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
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
  attributeName?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  searchProperty: TCategoryRecommendationSearchProperty;
  updatedAt: Scalars['DateTime'];
};

export type TCategoryRecommendationSettingsDataInput = {
  attributeName?: Maybe<Scalars['String']>;
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

export type TCustomApplicationDraftDataInput = {
  description?: Maybe<Scalars['String']>;
  entryPointUriPath: Scalars['String'];
  icon: Scalars['String'];
  mainMenuLink: TCustomApplicationMenuLinkDraftDataInput;
  name: Scalars['String'];
  permissions: Array<TCustomApplicationPermissionDataInput>;
  submenuLinks: Array<TCustomApplicationSubmenuLinkDraftDataInput>;
  url: Scalars['String'];
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

export enum TCustomApplicationStatus {
  Draft = 'DRAFT',
  PrivateUsage = 'PRIVATE_USAGE'
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

export type TCustomApplicationsMaintainerContactEmailVerificationConfirmation = {
  __typename?: 'CustomApplicationsMaintainerContactEmailVerificationConfirmation';
  organizationId: Scalars['ID'];
};

export type TCustomApplicationsMaintainerContactEmailVerificationRequest = {
  __typename?: 'CustomApplicationsMaintainerContactEmailVerificationRequest';
  token?: Maybe<Scalars['String']>;
};

export type TCustomersListView = {
  __typename?: 'CustomersListView';
  createdAt: Scalars['DateTime'];
  filters?: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TCustomersListView_FiltersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TFilterValuesOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TFilterValuesWhereInput>;
};


export type TCustomersListView_NameAllLocalesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLocalizedFieldOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLocalizedFieldWhereInput>;
};

export type TCustomersListViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search?: Maybe<Scalars['String']>;
  sort: TSortCreateInput;
  table?: Maybe<TCustomersListViewTableInput>;
};

export type TCustomersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TDashboardView = {
  __typename?: 'DashboardView';
  createdAt: Scalars['DateTime'];
  currencyCode: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  layout?: Maybe<Array<TLayoutCard>>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TDashboardView_LayoutArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLayoutCardOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLayoutCardWhereInput>;
};


export type TDashboardView_NameAllLocalesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLocalizedFieldOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLocalizedFieldWhereInput>;
};

export type TDashboardViewInput = {
  currencyCode?: Maybe<Scalars['String']>;
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
  filters?: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
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
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TFilterValuesOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TFilterValuesWhereInput>;
};


export type TDiscountsCustomView_NameAllLocalesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLocalizedFieldOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLocalizedFieldWhereInput>;
};

export type TDiscountsCustomViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search?: Maybe<Scalars['String']>;
  sort: TSortCreateInput;
  table?: Maybe<TOrdersListViewTableInput>;
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
  id?: Maybe<Scalars['ID']>;
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
  AND?: Maybe<Array<TFilterValuesWhereInput>>;
  NOT?: Maybe<Array<TFilterValuesWhereInput>>;
  OR?: Maybe<Array<TFilterValuesWhereInput>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  target?: Maybe<Scalars['String']>;
  target_contains?: Maybe<Scalars['String']>;
  target_ends_with?: Maybe<Scalars['String']>;
  target_gt?: Maybe<Scalars['String']>;
  target_gte?: Maybe<Scalars['String']>;
  target_in?: Maybe<Array<Scalars['String']>>;
  target_lt?: Maybe<Scalars['String']>;
  target_lte?: Maybe<Scalars['String']>;
  target_not?: Maybe<Scalars['String']>;
  target_not_contains?: Maybe<Scalars['String']>;
  target_not_ends_with?: Maybe<Scalars['String']>;
  target_not_in?: Maybe<Array<Scalars['String']>>;
  target_not_starts_with?: Maybe<Scalars['String']>;
  target_starts_with?: Maybe<Scalars['String']>;
  type?: Maybe<TFilterType>;
  type_in?: Maybe<Array<TFilterType>>;
  type_not?: Maybe<TFilterType>;
  type_not_in?: Maybe<Array<TFilterType>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
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
  small?: Maybe<TImageRegexOptionsInput>;
  thumb?: Maybe<TImageRegexOptionsInput>;
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
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLocalizedFieldOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLocalizedFieldWhereInput>;
};

export type TLayoutCardInput = {
  averageOrderValueConfiguration?: Maybe<TAverageOrderValueConfigurationInput>;
  height: Scalars['Int'];
  key: TMetricCardType;
  maxHeight?: Maybe<Scalars['Int']>;
  maxWidth?: Maybe<Scalars['Int']>;
  minHeight?: Maybe<Scalars['Int']>;
  minWidth?: Maybe<Scalars['Int']>;
  nameAllLocales?: Maybe<Array<TLocalizedFieldCreateInput>>;
  orderStatusConfiguration?: Maybe<TOrderStatusConfigurationInput>;
  resizeHandles?: Maybe<Array<Scalars['String']>>;
  resourcesNumbersConfiguration?: Maybe<TResourcesNumbersConfigurationInput>;
  salesPerformanceConfiguration?: Maybe<TSalesPerformanceConfigurationInput>;
  topProductsConfiguration?: Maybe<TTopProductsConfigurationInput>;
  totalOrdersConfiguration?: Maybe<TTotalOrdersConfigurationInput>;
  totalSalesConfiguration?: Maybe<TTotalSalesConfigurationInput>;
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
  YPositionDesc = 'yPosition_DESC'
}

export type TLayoutCardWhereInput = {
  AND?: Maybe<Array<TLayoutCardWhereInput>>;
  NOT?: Maybe<Array<TLayoutCardWhereInput>>;
  OR?: Maybe<Array<TLayoutCardWhereInput>>;
  averageOrderValueConfiguration?: Maybe<TAverageOrderValueConfigurationWhereInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  height?: Maybe<Scalars['Int']>;
  height_gt?: Maybe<Scalars['Int']>;
  height_gte?: Maybe<Scalars['Int']>;
  height_in?: Maybe<Array<Scalars['Int']>>;
  height_lt?: Maybe<Scalars['Int']>;
  height_lte?: Maybe<Scalars['Int']>;
  height_not?: Maybe<Scalars['Int']>;
  height_not_in?: Maybe<Array<Scalars['Int']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  key?: Maybe<TMetricCardType>;
  key_in?: Maybe<Array<TMetricCardType>>;
  key_not?: Maybe<TMetricCardType>;
  key_not_in?: Maybe<Array<TMetricCardType>>;
  maxHeight?: Maybe<Scalars['Int']>;
  maxHeight_gt?: Maybe<Scalars['Int']>;
  maxHeight_gte?: Maybe<Scalars['Int']>;
  maxHeight_in?: Maybe<Array<Scalars['Int']>>;
  maxHeight_lt?: Maybe<Scalars['Int']>;
  maxHeight_lte?: Maybe<Scalars['Int']>;
  maxHeight_not?: Maybe<Scalars['Int']>;
  maxHeight_not_in?: Maybe<Array<Scalars['Int']>>;
  maxWidth?: Maybe<Scalars['Int']>;
  maxWidth_gt?: Maybe<Scalars['Int']>;
  maxWidth_gte?: Maybe<Scalars['Int']>;
  maxWidth_in?: Maybe<Array<Scalars['Int']>>;
  maxWidth_lt?: Maybe<Scalars['Int']>;
  maxWidth_lte?: Maybe<Scalars['Int']>;
  maxWidth_not?: Maybe<Scalars['Int']>;
  maxWidth_not_in?: Maybe<Array<Scalars['Int']>>;
  minHeight?: Maybe<Scalars['Int']>;
  minHeight_gt?: Maybe<Scalars['Int']>;
  minHeight_gte?: Maybe<Scalars['Int']>;
  minHeight_in?: Maybe<Array<Scalars['Int']>>;
  minHeight_lt?: Maybe<Scalars['Int']>;
  minHeight_lte?: Maybe<Scalars['Int']>;
  minHeight_not?: Maybe<Scalars['Int']>;
  minHeight_not_in?: Maybe<Array<Scalars['Int']>>;
  minWidth?: Maybe<Scalars['Int']>;
  minWidth_gt?: Maybe<Scalars['Int']>;
  minWidth_gte?: Maybe<Scalars['Int']>;
  minWidth_in?: Maybe<Array<Scalars['Int']>>;
  minWidth_lt?: Maybe<Scalars['Int']>;
  minWidth_lte?: Maybe<Scalars['Int']>;
  minWidth_not?: Maybe<Scalars['Int']>;
  minWidth_not_in?: Maybe<Array<Scalars['Int']>>;
  nameAllLocales_every?: Maybe<TLocalizedFieldWhereInput>;
  nameAllLocales_none?: Maybe<TLocalizedFieldWhereInput>;
  nameAllLocales_some?: Maybe<TLocalizedFieldWhereInput>;
  orderStatusConfiguration?: Maybe<TOrderStatusConfigurationWhereInput>;
  resourcesNumbersConfiguration?: Maybe<TResourcesNumbersConfigurationWhereInput>;
  salesPerformanceConfiguration?: Maybe<TSalesPerformanceConfigurationWhereInput>;
  topProductsConfiguration?: Maybe<TTopProductsConfigurationWhereInput>;
  totalOrdersConfiguration?: Maybe<TTotalOrdersConfigurationWhereInput>;
  totalSalesConfiguration?: Maybe<TTotalSalesConfigurationWhereInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  width?: Maybe<Scalars['Int']>;
  width_gt?: Maybe<Scalars['Int']>;
  width_gte?: Maybe<Scalars['Int']>;
  width_in?: Maybe<Array<Scalars['Int']>>;
  width_lt?: Maybe<Scalars['Int']>;
  width_lte?: Maybe<Scalars['Int']>;
  width_not?: Maybe<Scalars['Int']>;
  width_not_in?: Maybe<Array<Scalars['Int']>>;
  xPosition?: Maybe<Scalars['Int']>;
  xPosition_gt?: Maybe<Scalars['Int']>;
  xPosition_gte?: Maybe<Scalars['Int']>;
  xPosition_in?: Maybe<Array<Scalars['Int']>>;
  xPosition_lt?: Maybe<Scalars['Int']>;
  xPosition_lte?: Maybe<Scalars['Int']>;
  xPosition_not?: Maybe<Scalars['Int']>;
  xPosition_not_in?: Maybe<Array<Scalars['Int']>>;
  yPosition?: Maybe<Scalars['Int']>;
  yPosition_gt?: Maybe<Scalars['Int']>;
  yPosition_gte?: Maybe<Scalars['Int']>;
  yPosition_in?: Maybe<Array<Scalars['Int']>>;
  yPosition_lt?: Maybe<Scalars['Int']>;
  yPosition_lte?: Maybe<Scalars['Int']>;
  yPosition_not?: Maybe<Scalars['Int']>;
  yPosition_not_in?: Maybe<Array<Scalars['Int']>>;
};

export type TLocalizedField = {
  __typename?: 'LocalizedField';
  locale: Scalars['String'];
  value: Scalars['String'];
};

export type TLocalizedFieldCreateInput = {
  id?: Maybe<Scalars['ID']>;
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
  AND?: Maybe<Array<TLocalizedFieldWhereInput>>;
  NOT?: Maybe<Array<TLocalizedFieldWhereInput>>;
  OR?: Maybe<Array<TLocalizedFieldWhereInput>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  locale?: Maybe<Scalars['String']>;
  locale_contains?: Maybe<Scalars['String']>;
  locale_ends_with?: Maybe<Scalars['String']>;
  locale_gt?: Maybe<Scalars['String']>;
  locale_gte?: Maybe<Scalars['String']>;
  locale_in?: Maybe<Array<Scalars['String']>>;
  locale_lt?: Maybe<Scalars['String']>;
  locale_lte?: Maybe<Scalars['String']>;
  locale_not?: Maybe<Scalars['String']>;
  locale_not_contains?: Maybe<Scalars['String']>;
  locale_not_ends_with?: Maybe<Scalars['String']>;
  locale_not_in?: Maybe<Array<Scalars['String']>>;
  locale_not_starts_with?: Maybe<Scalars['String']>;
  locale_starts_with?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  value?: Maybe<Scalars['String']>;
  value_contains?: Maybe<Scalars['String']>;
  value_ends_with?: Maybe<Scalars['String']>;
  value_gt?: Maybe<Scalars['String']>;
  value_gte?: Maybe<Scalars['String']>;
  value_in?: Maybe<Array<Scalars['String']>>;
  value_lt?: Maybe<Scalars['String']>;
  value_lte?: Maybe<Scalars['String']>;
  value_not?: Maybe<Scalars['String']>;
  value_not_contains?: Maybe<Scalars['String']>;
  value_not_ends_with?: Maybe<Scalars['String']>;
  value_not_in?: Maybe<Array<Scalars['String']>>;
  value_not_starts_with?: Maybe<Scalars['String']>;
  value_starts_with?: Maybe<Scalars['String']>;
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
  createCartDiscountsListView?: Maybe<TCartDiscountsListView>;
  createCustomApplication?: Maybe<TRestrictedCustomApplicationForOrganization>;
  createCustomersListView: TCustomersListView;
  createDashboardView: TDashboardView;
  createDiscountCodesCustomView: TDiscountsCustomView;
  createDiscountCodesListView?: Maybe<TDiscountCodesListView>;
  createOrdersListView: TOrdersListView;
  createPimSearchListView: TPimSearchListView;
  createProductDiscountsCustomView: TDiscountsCustomView;
  createProductDiscountsListView?: Maybe<TProductDiscountsListView>;
  createProductTypeAttributesView: TProductTypeAttributesView;
  createProjectExtensionApplication?: Maybe<TProjectExtension>;
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
  sendLinkToVerifyCustomApplicationsMaintainerContactEmail?: Maybe<TCustomApplicationsMaintainerContactEmailVerificationRequest>;
  setCustomApplicationsMaintainerContactInformation?: Maybe<TOrganizationExtension>;
  setOrganizationExtensionOidcSsoConfig?: Maybe<TOrganizationExtension>;
  setProjectExtensionCategoryRecommendation?: Maybe<TProjectExtension>;
  setProjectExtensionImageRegex?: Maybe<TProjectExtension>;
  setProjectExtensionOrderStatesVisibility?: Maybe<TProjectExtension>;
  uninstallCustomApplication?: Maybe<TRestrictedCustomApplicationInstallationForOrganization>;
  updateCartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  updateCartDiscountsListView?: Maybe<TCartDiscountsListView>;
  updateCustomApplication?: Maybe<TRestrictedCustomApplicationForOrganization>;
  updateCustomApplicationProjectsInstallation?: Maybe<TRestrictedCustomApplicationInstallationForOrganization>;
  updateCustomersListView?: Maybe<TCustomersListView>;
  updateDashboardView?: Maybe<TDashboardView>;
  updateDiscountCodesCustomView?: Maybe<TDiscountsCustomView>;
  updateDiscountCodesListView?: Maybe<TDiscountCodesListView>;
  updateOrdersListView?: Maybe<TOrdersListView>;
  updatePimSearchListView?: Maybe<TPimSearchListView>;
  updateProductDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  updateProductDiscountsListView?: Maybe<TProductDiscountsListView>;
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
  projectKeys?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type TMutation_SendLinkToVerifyCustomApplicationsMaintainerContactEmailArgs = {
  organizationId: Scalars['String'];
};


export type TMutation_SetCustomApplicationsMaintainerContactInformationArgs = {
  data?: Maybe<TContactInformationDataInput>;
  organizationId: Scalars['String'];
};


export type TMutation_SetOrganizationExtensionOidcSsoConfigArgs = {
  data: TOidcSsoConfigDataInput;
  organizationId: Scalars['String'];
};


export type TMutation_SetProjectExtensionCategoryRecommendationArgs = {
  data?: Maybe<TCategoryRecommendationSettingsDataInput>;
};


export type TMutation_SetProjectExtensionImageRegexArgs = {
  data?: Maybe<TImageRegexDataInput>;
};


export type TMutation_SetProjectExtensionOrderStatesVisibilityArgs = {
  data?: Maybe<Array<Maybe<TOrderStatesVisibility>>>;
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
  projectKeys?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  id?: Maybe<Scalars['ID']>;
};


export type TMutation_UpdateVariantPricesListViewArgs = {
  data: TVariantPricesListViewInput;
  id: Scalars['ID'];
};


export type TMutation_VerifyCustomApplicationsMaintainerContactEmailArgs = {
  token: Scalars['String'];
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
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLocalizedFieldOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLocalizedFieldWhereInput>;
};


export type TNavbarMenu_SubmenuArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TNavbarSubmenuOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TNavbarSubmenuWhereInput>;
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
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLocalizedFieldOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLocalizedFieldWhereInput>;
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
  AND?: Maybe<Array<TNavbarSubmenuWhereInput>>;
  NOT?: Maybe<Array<TNavbarSubmenuWhereInput>>;
  OR?: Maybe<Array<TNavbarSubmenuWhereInput>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  featureToggle?: Maybe<Scalars['String']>;
  featureToggle_contains?: Maybe<Scalars['String']>;
  featureToggle_ends_with?: Maybe<Scalars['String']>;
  featureToggle_gt?: Maybe<Scalars['String']>;
  featureToggle_gte?: Maybe<Scalars['String']>;
  featureToggle_in?: Maybe<Array<Scalars['String']>>;
  featureToggle_lt?: Maybe<Scalars['String']>;
  featureToggle_lte?: Maybe<Scalars['String']>;
  featureToggle_not?: Maybe<Scalars['String']>;
  featureToggle_not_contains?: Maybe<Scalars['String']>;
  featureToggle_not_ends_with?: Maybe<Scalars['String']>;
  featureToggle_not_in?: Maybe<Array<Scalars['String']>>;
  featureToggle_not_starts_with?: Maybe<Scalars['String']>;
  featureToggle_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  key?: Maybe<Scalars['String']>;
  key_contains?: Maybe<Scalars['String']>;
  key_ends_with?: Maybe<Scalars['String']>;
  key_gt?: Maybe<Scalars['String']>;
  key_gte?: Maybe<Scalars['String']>;
  key_in?: Maybe<Array<Scalars['String']>>;
  key_lt?: Maybe<Scalars['String']>;
  key_lte?: Maybe<Scalars['String']>;
  key_not?: Maybe<Scalars['String']>;
  key_not_contains?: Maybe<Scalars['String']>;
  key_not_ends_with?: Maybe<Scalars['String']>;
  key_not_in?: Maybe<Array<Scalars['String']>>;
  key_not_starts_with?: Maybe<Scalars['String']>;
  key_starts_with?: Maybe<Scalars['String']>;
  labelAllLocales_every?: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_none?: Maybe<TLocalizedFieldWhereInput>;
  labelAllLocales_some?: Maybe<TLocalizedFieldWhereInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  uriPath?: Maybe<Scalars['String']>;
  uriPath_contains?: Maybe<Scalars['String']>;
  uriPath_ends_with?: Maybe<Scalars['String']>;
  uriPath_gt?: Maybe<Scalars['String']>;
  uriPath_gte?: Maybe<Scalars['String']>;
  uriPath_in?: Maybe<Array<Scalars['String']>>;
  uriPath_lt?: Maybe<Scalars['String']>;
  uriPath_lte?: Maybe<Scalars['String']>;
  uriPath_not?: Maybe<Scalars['String']>;
  uriPath_not_contains?: Maybe<Scalars['String']>;
  uriPath_not_ends_with?: Maybe<Scalars['String']>;
  uriPath_not_in?: Maybe<Array<Scalars['String']>>;
  uriPath_not_starts_with?: Maybe<Scalars['String']>;
  uriPath_starts_with?: Maybe<Scalars['String']>;
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
  clientSecret?: Maybe<Scalars['String']>;
  logoutUrl?: Maybe<Scalars['String']>;
  teamIdForNewUsers: Scalars['String'];
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
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  productId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TOrderStatusConfigurationInput = {
  dateFilterType: TDateFilterType;
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  productId?: Maybe<Scalars['String']>;
};

export type TOrderStatusConfigurationWhereInput = {
  AND?: Maybe<Array<TOrderStatusConfigurationWhereInput>>;
  NOT?: Maybe<Array<TOrderStatusConfigurationWhereInput>>;
  OR?: Maybe<Array<TOrderStatusConfigurationWhereInput>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  dateFilterType?: Maybe<TDateFilterType>;
  dateFilterType_in?: Maybe<Array<TDateFilterType>>;
  dateFilterType_not?: Maybe<TDateFilterType>;
  dateFilterType_not_in?: Maybe<Array<TDateFilterType>>;
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateFrom_gt?: Maybe<Scalars['DateTime']>;
  dateFrom_gte?: Maybe<Scalars['DateTime']>;
  dateFrom_in?: Maybe<Array<Scalars['DateTime']>>;
  dateFrom_lt?: Maybe<Scalars['DateTime']>;
  dateFrom_lte?: Maybe<Scalars['DateTime']>;
  dateFrom_not?: Maybe<Scalars['DateTime']>;
  dateFrom_not_in?: Maybe<Array<Scalars['DateTime']>>;
  dateTo?: Maybe<Scalars['DateTime']>;
  dateTo_gt?: Maybe<Scalars['DateTime']>;
  dateTo_gte?: Maybe<Scalars['DateTime']>;
  dateTo_in?: Maybe<Array<Scalars['DateTime']>>;
  dateTo_lt?: Maybe<Scalars['DateTime']>;
  dateTo_lte?: Maybe<Scalars['DateTime']>;
  dateTo_not?: Maybe<Scalars['DateTime']>;
  dateTo_not_in?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  productId?: Maybe<Scalars['String']>;
  productId_contains?: Maybe<Scalars['String']>;
  productId_ends_with?: Maybe<Scalars['String']>;
  productId_gt?: Maybe<Scalars['String']>;
  productId_gte?: Maybe<Scalars['String']>;
  productId_in?: Maybe<Array<Scalars['String']>>;
  productId_lt?: Maybe<Scalars['String']>;
  productId_lte?: Maybe<Scalars['String']>;
  productId_not?: Maybe<Scalars['String']>;
  productId_not_contains?: Maybe<Scalars['String']>;
  productId_not_ends_with?: Maybe<Scalars['String']>;
  productId_not_in?: Maybe<Array<Scalars['String']>>;
  productId_not_starts_with?: Maybe<Scalars['String']>;
  productId_starts_with?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
};

export type TOrdersListView = {
  __typename?: 'OrdersListView';
  createdAt: Scalars['DateTime'];
  filters?: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TOrdersListView_FiltersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TFilterValuesOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TFilterValuesWhereInput>;
};


export type TOrdersListView_NameAllLocalesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLocalizedFieldOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLocalizedFieldWhereInput>;
};

export type TOrdersListViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search?: Maybe<Scalars['String']>;
  sort: TSortCreateInput;
  table?: Maybe<TOrdersListViewTableInput>;
};

export type TOrdersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TOrganizationExtension = {
  __typename?: 'OrganizationExtension';
  applicationsMaintainerContactInformation?: Maybe<TContactInformation>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installedApplications?: Maybe<Array<TRestrictedCustomApplicationInstallationForOrganization>>;
  oidcSsoConfig?: Maybe<TOidcSsoConfig>;
  organizationId: Scalars['String'];
  registeredApplications?: Maybe<Array<TRestrictedCustomApplicationForOrganization>>;
  updatedAt: Scalars['DateTime'];
};

export type TPimSearchListView = {
  __typename?: 'PimSearchListView';
  createdAt: Scalars['DateTime'];
  filters?: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TPimSearchListView_FiltersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TFilterValuesOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TFilterValuesWhereInput>;
};


export type TPimSearchListView_NameAllLocalesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLocalizedFieldOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLocalizedFieldWhereInput>;
};

export type TPimSearchListViewInput = {
  filters: Array<TFilterValuesCreateInput>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  search?: Maybe<Scalars['String']>;
  sort: TSortCreateInput;
  table?: Maybe<TPimSearchListViewTableInput>;
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
  existence?: Maybe<TExistence>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isVariant?: Maybe<Scalars['Boolean']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  pinnedAttributes: Array<Scalars['String']>;
  productTypeId: Scalars['String'];
  projectKey: Scalars['String'];
  searchTerm?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type TProductTypeAttributesView_NameAllLocalesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TLocalizedFieldOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TLocalizedFieldWhereInput>;
};

export type TProductTypeAttributesViewInput = {
  existence?: Maybe<TExistence>;
  isVariant?: Maybe<Scalars['Boolean']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  pinnedAttributes: Array<Scalars['String']>;
  productTypeId: Scalars['String'];
  searchTerm?: Maybe<Scalars['String']>;
};

export type TProductTypeAttributesViewUpdateInput = {
  existence?: Maybe<TExistence>;
  isVariant?: Maybe<Scalars['Boolean']>;
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  pinnedAttributes: Array<Scalars['String']>;
  searchTerm?: Maybe<Scalars['String']>;
};

export type TProjectExtension = {
  __typename?: 'ProjectExtension';
  applications?: Maybe<Array<TApplicationExtension>>;
  categoryRecommendationSettings?: Maybe<TCategoryRecommendationSettings>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageRegex?: Maybe<TImageRegex>;
  installedApplications?: Maybe<Array<TRestrictedCustomApplicationInstallationForProject>>;
  orderStatesVisibility: Array<TOrderStatesVisibility>;
  projectKey: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type TProjectExtension_ApplicationsArgs = {
  where?: Maybe<TRestrictedApplicationExtensionWhereInput>;
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
  allOrganizationExtensions: Array<TOrganizationExtension>;
  allProjectExtensions: Array<TProjectExtension>;
  cartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  cartDiscountsCustomViews: Array<Maybe<TDiscountsCustomView>>;
  cartDiscountsListView?: Maybe<TCartDiscountsListView>;
  customersListView?: Maybe<TCustomersListView>;
  customersListViews: Array<Maybe<TCustomersListView>>;
  dashboardView?: Maybe<TDashboardView>;
  dashboardViews: Array<Maybe<TDashboardView>>;
  discountCodesCustomView?: Maybe<TDiscountsCustomView>;
  discountCodesCustomViews: Array<Maybe<TDiscountsCustomView>>;
  discountCodesListView?: Maybe<TDiscountCodesListView>;
  /** @deprecated Experimental feature - For internal usage only */
  globalOrganizationExtension?: Maybe<TOrganizationExtension>;
  ordersListView?: Maybe<TOrdersListView>;
  ordersListViews: Array<Maybe<TOrdersListView>>;
  organizationExtension?: Maybe<TOrganizationExtension>;
  pimSearchListView?: Maybe<TPimSearchListView>;
  pimSearchListViews: Array<Maybe<TPimSearchListView>>;
  productDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  productDiscountsCustomViews: Array<Maybe<TDiscountsCustomView>>;
  productDiscountsListView?: Maybe<TProductDiscountsListView>;
  productTypeAttributesView?: Maybe<TProductTypeAttributesView>;
  productTypeAttributesViews?: Maybe<Array<Maybe<TProductTypeAttributesView>>>;
  projectExtension?: Maybe<TProjectExtension>;
  ruleBuilderQuickSelectionValues?: Maybe<Array<Maybe<TRuleBuilderQuickSelectionValues>>>;
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


export type TQuery_AllOrganizationExtensionsArgs = {
  organizationIds?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  AND?: Maybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  NOT?: Maybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  OR?: Maybe<Array<TResourcesNumbersConfigurationWhereInput>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
};

export type TRestrictedApplicationExtensionWhereInput = {
  id?: Maybe<Scalars['ID']>;
  isActive?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
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

export type TRuleBuilderQuickSelectCreatefunctionsInput = {
  set?: Maybe<Array<Scalars['String']>>;
};

export type TRuleBuilderQuickSelectCreatepredicatesInput = {
  set?: Maybe<Array<Scalars['String']>>;
};

export type TRuleBuilderQuickSelectionInput = {
  functions?: Maybe<TRuleBuilderQuickSelectCreatepredicatesInput>;
  predicates?: Maybe<TRuleBuilderQuickSelectCreatefunctionsInput>;
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
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  showPreviousTimeframe: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type TSalesPerformanceConfigurationInput = {
  dateFilterType: TDateFilterType;
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TSalesPerformanceConfigurationWhereInput = {
  AND?: Maybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  NOT?: Maybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  OR?: Maybe<Array<TSalesPerformanceConfigurationWhereInput>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  dateFilterType?: Maybe<TDateFilterType>;
  dateFilterType_in?: Maybe<Array<TDateFilterType>>;
  dateFilterType_not?: Maybe<TDateFilterType>;
  dateFilterType_not_in?: Maybe<Array<TDateFilterType>>;
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateFrom_gt?: Maybe<Scalars['DateTime']>;
  dateFrom_gte?: Maybe<Scalars['DateTime']>;
  dateFrom_in?: Maybe<Array<Scalars['DateTime']>>;
  dateFrom_lt?: Maybe<Scalars['DateTime']>;
  dateFrom_lte?: Maybe<Scalars['DateTime']>;
  dateFrom_not?: Maybe<Scalars['DateTime']>;
  dateFrom_not_in?: Maybe<Array<Scalars['DateTime']>>;
  dateTo?: Maybe<Scalars['DateTime']>;
  dateTo_gt?: Maybe<Scalars['DateTime']>;
  dateTo_gte?: Maybe<Scalars['DateTime']>;
  dateTo_in?: Maybe<Array<Scalars['DateTime']>>;
  dateTo_lt?: Maybe<Scalars['DateTime']>;
  dateTo_lte?: Maybe<Scalars['DateTime']>;
  dateTo_not?: Maybe<Scalars['DateTime']>;
  dateTo_not_in?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  showPreviousTimeframe?: Maybe<Scalars['Boolean']>;
  showPreviousTimeframe_not?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
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
  id?: Maybe<Scalars['ID']>;
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
  bestSellingLimit?: Maybe<TBestSellingLimit>;
};

export type TTopProductsConfigurationWhereInput = {
  AND?: Maybe<Array<TTopProductsConfigurationWhereInput>>;
  NOT?: Maybe<Array<TTopProductsConfigurationWhereInput>>;
  OR?: Maybe<Array<TTopProductsConfigurationWhereInput>>;
  bestSellingLimit?: Maybe<TBestSellingLimit>;
  bestSellingLimit_in?: Maybe<Array<TBestSellingLimit>>;
  bestSellingLimit_not?: Maybe<TBestSellingLimit>;
  bestSellingLimit_not_in?: Maybe<Array<TBestSellingLimit>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
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
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateTo?: Maybe<Scalars['DateTime']>;
  productId?: Maybe<Scalars['String']>;
  showPreviousTimeframe: Scalars['Boolean'];
};

export type TTotalOrdersConfigurationWhereInput = {
  AND?: Maybe<Array<TTotalOrdersConfigurationWhereInput>>;
  NOT?: Maybe<Array<TTotalOrdersConfigurationWhereInput>>;
  OR?: Maybe<Array<TTotalOrdersConfigurationWhereInput>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  dateFilterType?: Maybe<TDateFilterType>;
  dateFilterType_in?: Maybe<Array<TDateFilterType>>;
  dateFilterType_not?: Maybe<TDateFilterType>;
  dateFilterType_not_in?: Maybe<Array<TDateFilterType>>;
  dateFrom?: Maybe<Scalars['DateTime']>;
  dateFrom_gt?: Maybe<Scalars['DateTime']>;
  dateFrom_gte?: Maybe<Scalars['DateTime']>;
  dateFrom_in?: Maybe<Array<Scalars['DateTime']>>;
  dateFrom_lt?: Maybe<Scalars['DateTime']>;
  dateFrom_lte?: Maybe<Scalars['DateTime']>;
  dateFrom_not?: Maybe<Scalars['DateTime']>;
  dateFrom_not_in?: Maybe<Array<Scalars['DateTime']>>;
  dateTo?: Maybe<Scalars['DateTime']>;
  dateTo_gt?: Maybe<Scalars['DateTime']>;
  dateTo_gte?: Maybe<Scalars['DateTime']>;
  dateTo_in?: Maybe<Array<Scalars['DateTime']>>;
  dateTo_lt?: Maybe<Scalars['DateTime']>;
  dateTo_lte?: Maybe<Scalars['DateTime']>;
  dateTo_not?: Maybe<Scalars['DateTime']>;
  dateTo_not_in?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  productId?: Maybe<Scalars['String']>;
  productId_contains?: Maybe<Scalars['String']>;
  productId_ends_with?: Maybe<Scalars['String']>;
  productId_gt?: Maybe<Scalars['String']>;
  productId_gte?: Maybe<Scalars['String']>;
  productId_in?: Maybe<Array<Scalars['String']>>;
  productId_lt?: Maybe<Scalars['String']>;
  productId_lte?: Maybe<Scalars['String']>;
  productId_not?: Maybe<Scalars['String']>;
  productId_not_contains?: Maybe<Scalars['String']>;
  productId_not_ends_with?: Maybe<Scalars['String']>;
  productId_not_in?: Maybe<Array<Scalars['String']>>;
  productId_not_starts_with?: Maybe<Scalars['String']>;
  productId_starts_with?: Maybe<Scalars['String']>;
  showPreviousTimeframe?: Maybe<Scalars['Boolean']>;
  showPreviousTimeframe_not?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
};

export type TTotalSalesConfiguration = {
  __typename?: 'TotalSalesConfiguration';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  productId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TTotalSalesConfigurationInput = {
  productId?: Maybe<Scalars['String']>;
};

export type TTotalSalesConfigurationWhereInput = {
  AND?: Maybe<Array<TTotalSalesConfigurationWhereInput>>;
  NOT?: Maybe<Array<TTotalSalesConfigurationWhereInput>>;
  OR?: Maybe<Array<TTotalSalesConfigurationWhereInput>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_gt?: Maybe<Scalars['DateTime']>;
  createdAt_gte?: Maybe<Scalars['DateTime']>;
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: Maybe<Scalars['DateTime']>;
  createdAt_lte?: Maybe<Scalars['DateTime']>;
  createdAt_not?: Maybe<Scalars['DateTime']>;
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
  id?: Maybe<Scalars['ID']>;
  id_contains?: Maybe<Scalars['ID']>;
  id_ends_with?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_contains?: Maybe<Scalars['ID']>;
  id_not_ends_with?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  id_not_starts_with?: Maybe<Scalars['ID']>;
  id_starts_with?: Maybe<Scalars['ID']>;
  productId?: Maybe<Scalars['String']>;
  productId_contains?: Maybe<Scalars['String']>;
  productId_ends_with?: Maybe<Scalars['String']>;
  productId_gt?: Maybe<Scalars['String']>;
  productId_gte?: Maybe<Scalars['String']>;
  productId_in?: Maybe<Array<Scalars['String']>>;
  productId_lt?: Maybe<Scalars['String']>;
  productId_lte?: Maybe<Scalars['String']>;
  productId_not?: Maybe<Scalars['String']>;
  productId_not_contains?: Maybe<Scalars['String']>;
  productId_not_ends_with?: Maybe<Scalars['String']>;
  productId_not_in?: Maybe<Array<Scalars['String']>>;
  productId_not_starts_with?: Maybe<Scalars['String']>;
  productId_starts_with?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedAt_gt?: Maybe<Scalars['DateTime']>;
  updatedAt_gte?: Maybe<Scalars['DateTime']>;
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: Maybe<Scalars['DateTime']>;
  updatedAt_lte?: Maybe<Scalars['DateTime']>;
  updatedAt_not?: Maybe<Scalars['DateTime']>;
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>;
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


export type TFetchProjectExtensionImageRegexQuery = { __typename?: 'Query', projectExtension?: { __typename?: 'ProjectExtension', id: string, imageRegex?: { __typename?: 'ImageRegex', thumb?: { __typename?: 'ImageRegexOptions', flag: string, search: string, replace: string } | null | undefined, small?: { __typename?: 'ImageRegexOptions', flag: string, search: string, replace: string } | null | undefined } | null | undefined } | null | undefined };

export type TImageRegexFragment = { __typename?: 'ImageRegexOptions', flag: string, search: string, replace: string };

export type TFetchProjectExtensionsNavbarQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchProjectExtensionsNavbarQuery = { __typename?: 'Query', projectExtension?: { __typename?: 'ProjectExtension', id: string, applications?: Array<{ __typename?: 'ApplicationExtension', id: string, navbarMenu?: { __typename?: 'NavbarMenu', id: string, key: string, uriPath: string, icon: string, featureToggle?: string | null | undefined, permissions: Array<TOAuthScope>, labelAllLocales?: Array<{ __typename?: 'LocalizedField', locale: string, value: string }> | null | undefined, submenu?: Array<{ __typename?: 'NavbarSubmenu', id: string, key: string, uriPath: string, permissions: Array<TOAuthScope>, featureToggle?: string | null | undefined, labelAllLocales?: Array<{ __typename?: 'LocalizedField', locale: string, value: string }> | null | undefined }> | null | undefined } | null | undefined }> | null | undefined, installedApplications?: Array<{ __typename?: 'RestrictedCustomApplicationInstallationForProject', application: { __typename?: 'RestrictedCustomApplicationForProject', id: string, entryPointUriPath: string, menuLinks?: { __typename?: 'CustomApplicationMenuLink', id: string, icon: string, permissions: Array<string>, defaultLabel: string, labelAllLocales: Array<{ __typename?: 'LocalizedField', locale: string, value: string }>, submenuLinks: Array<{ __typename?: 'CustomApplicationSubmenuLink', id: string, uriPath: string, permissions: Array<string>, defaultLabel: string, labelAllLocales: Array<{ __typename?: 'LocalizedField', locale: string, value: string }> }> } | null | undefined } }> | null | undefined } | null | undefined };
