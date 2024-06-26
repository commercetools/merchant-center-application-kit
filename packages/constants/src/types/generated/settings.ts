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

export type TAllPublicCustomApplicationsDevelopedByCommercetoolsQueryInput = {
  organizationId?: InputMaybe<Scalars['String']>;
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

export enum TAuthPermission {
  AccessToProject = 'accessToProject',
  LoggedInUser = 'loggedInUser',
  ManageMyOrganizations = 'manageMyOrganizations',
  ManageProjectSettings = 'manageProjectSettings',
  PerformDataCleanups = 'performDataCleanups',
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
  deployments: Array<TCustomApplicationDeploymentPreview>;
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

export type TCustomApplication_DeploymentsArgs = {
  params?: InputMaybe<TCustomApplicationDeploymentPreviewsQueryInput>;
};

export type TCustomApplicationDeploymentPreview = {
  __typename?: 'CustomApplicationDeploymentPreview';
  alias?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TCustomApplicationDeploymentPreviewCreateInput = {
  alias?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type TCustomApplicationDeploymentPreviewUpdateInput = {
  url: Scalars['String'];
};

export type TCustomApplicationDeploymentPreviewsQueryInput = {
  sort?: InputMaybe<Scalars['String']>;
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

export type TCustomView = {
  __typename?: 'CustomView';
  createdAt: Scalars['DateTime'];
  defaultLabel: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  installedBy: Array<TCustomViewInstallation>;
  labelAllLocales: Scalars['Json'];
  locators: Array<Scalars['String']>;
  owner: TOrganizationExtension;
  ownerId: Scalars['String'];
  permissions: Array<TCustomViewPermission>;
  status: TCustomViewStatus;
  type: TCustomViewType;
  typeSettings?: Maybe<TCustomViewTypeSettings>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type TCustomViewDraftDataInput = {
  defaultLabel: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  labelAllLocales: Scalars['Json'];
  locators: Array<Scalars['String']>;
  permissions: Array<TCustomViewPermissionDataInput>;
  type: TCustomViewType;
  /**
   * The value of this property depends on the value of the 'type' property value.
   * In case the `type` value is `CustomPanel`, you are supposed to provide it's size.
   */
  typeSettings?: InputMaybe<TCustomViewTypeSettingsInput>;
  url: Scalars['String'];
};

export type TCustomViewInstallation = {
  __typename?: 'CustomViewInstallation';
  acceptedPermissions: Array<TCustomViewInstallationPermission>;
  createdAt: Scalars['DateTime'];
  customView: TCustomView;
  customViewId: Scalars['String'];
  id: Scalars['ID'];
  installInAllProjects: Scalars['Boolean'];
  owner: TOrganizationExtension;
  ownerId: Scalars['String'];
  projects: Array<TProjectExtension>;
  updatedAt: Scalars['DateTime'];
};

export type TCustomViewInstallationPermission = {
  __typename?: 'CustomViewInstallationPermission';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  installedCustomView: TCustomViewInstallation;
  installedCustomViewId: Scalars['String'];
  name: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TCustomViewPermission = {
  __typename?: 'CustomViewPermission';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type TCustomViewPermissionDataInput = {
  name: Scalars['String'];
  oAuthScopes: Array<Scalars['String']>;
};

export enum TCustomViewSize {
  Large = 'LARGE',
  Small = 'SMALL',
}

export enum TCustomViewStatus {
  Draft = 'DRAFT',
  PrivateUsage = 'PRIVATE_USAGE',
}

export enum TCustomViewType {
  CustomPanel = 'CustomPanel',
}

export type TCustomViewTypeSettings = {
  __typename?: 'CustomViewTypeSettings';
  size?: Maybe<TCustomViewSize>;
};

export type TCustomViewTypeSettingsInput = {
  size?: InputMaybe<TCustomViewSize>;
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
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  timeZone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
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
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  type: TDiscountType;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
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

export type TFeature = {
  __typename?: 'Feature';
  name: Scalars['String'];
  reason?: Maybe<Scalars['String']>;
  value: Scalars['Boolean'];
};

export type TFeatureQueryInput = {
  organizationId?: InputMaybe<Scalars['String']>;
  projectKey?: InputMaybe<Scalars['String']>;
};

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
  activateProjectSettingsStoresView?: Maybe<TProjectSettingsStoresView>;
  changeCustomApplicationStatus?: Maybe<TRestrictedCustomApplicationForOrganization>;
  changeCustomViewStatus?: Maybe<TCustomView>;
  createCartDiscountsCustomView: TDiscountsCustomView;
  createCustomApplication?: Maybe<TRestrictedCustomApplicationForOrganization>;
  createCustomApplicationDeploymentPreview: TCustomApplicationDeploymentPreview;
  createCustomView?: Maybe<TCustomView>;
  createCustomersListView: TCustomersListView;
  createDashboardView: TDashboardView;
  createDiscountCodesCustomView: TDiscountsCustomView;
  createOrdersListView: TOrdersListView;
  createPimSearchListView: TPimSearchListView;
  createProductDiscountsCustomView: TDiscountsCustomView;
  createProductTypeAttributesView: TProductTypeAttributesView;
  createProjectSettingsStoresView: TProjectSettingsStoresView;
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
  deactivateProjectSettingsStoresView?: Maybe<TProjectSettingsStoresView>;
  deleteAllDashboardViews: Array<TDashboardView>;
  deleteAllOrdersListViews: Array<TOrdersListView>;
  deleteCartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  deleteCustomApplication?: Maybe<TRestrictedCustomApplicationForOrganization>;
  deleteCustomApplicationDeploymentPreview: TCustomApplicationDeploymentPreview;
  deleteCustomersListView?: Maybe<TCustomersListView>;
  deleteDashboardView?: Maybe<TDashboardView>;
  deleteDiscountCodesCustomView?: Maybe<TDiscountsCustomView>;
  deleteOrdersListView?: Maybe<TOrdersListView>;
  deletePimSearchListView?: Maybe<TPimSearchListView>;
  deleteProductDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  deleteProductTypeAttributesView?: Maybe<TProductTypeAttributesView>;
  deleteProjectSettingsStoresView?: Maybe<TProjectSettingsStoresView>;
  installCustomApplication?: Maybe<TRestrictedCustomApplicationInstallationForOrganization>;
  installCustomView?: Maybe<TRestrictedCustomViewInstallationForOrganization>;
  random: Scalars['String'];
  sendLinkToVerifyCustomApplicationsMaintainerContactEmail?: Maybe<TCustomApplicationsMaintainerContactEmailVerificationRequest>;
  setCustomApplicationsMaintainerContactInformation?: Maybe<TOrganizationExtension>;
  setOrganizationExtensionOidcSsoConfig?: Maybe<TOrganizationExtension>;
  setProjectExtensionCategoryRecommendation?: Maybe<TProjectExtension>;
  setProjectExtensionImageRegex?: Maybe<TProjectExtension>;
  setProjectExtensionImportSampleDataset?: Maybe<TProjectExtension>;
  setProjectExtensionOrderStatesVisibility?: Maybe<TProjectExtension>;
  setProjectExtensionRichTextEditorSettings?: Maybe<TProjectExtension>;
  uninstallCustomApplication?: Maybe<TRestrictedCustomApplicationInstallationForOrganization>;
  uninstallCustomView?: Maybe<TRestrictedCustomViewInstallationForOrganization>;
  updateCartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  updateCustomApplication?: Maybe<TRestrictedCustomApplicationForOrganization>;
  updateCustomApplicationDeploymentPreview: TCustomApplicationDeploymentPreview;
  updateCustomApplicationProjectsInstallation?: Maybe<TRestrictedCustomApplicationInstallationForOrganization>;
  updateCustomView?: Maybe<TCustomView>;
  updateCustomViewProjectsInstallation?: Maybe<TRestrictedCustomViewInstallationForOrganization>;
  updateCustomersListView?: Maybe<TCustomersListView>;
  updateDashboardView?: Maybe<TDashboardView>;
  updateDiscountCodesCustomView?: Maybe<TDiscountsCustomView>;
  updateOrdersListView?: Maybe<TOrdersListView>;
  updatePimSearchListView?: Maybe<TPimSearchListView>;
  updateProductDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  updateProductTypeAttributesView: TProductTypeAttributesView;
  updateProjectSettingsStoresView?: Maybe<TProjectSettingsStoresView>;
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

export type TMutation_ActivateProjectSettingsStoresViewArgs = {
  id: Scalars['ID'];
};

export type TMutation_ChangeCustomApplicationStatusArgs = {
  applicationId: Scalars['ID'];
  organizationId: Scalars['String'];
  status: TCustomApplicationStatus;
};

export type TMutation_ChangeCustomViewStatusArgs = {
  customViewId: Scalars['ID'];
  organizationId: Scalars['String'];
  status: TCustomViewStatus;
};

export type TMutation_CreateCartDiscountsCustomViewArgs = {
  data: TDiscountsCustomViewInput;
};

export type TMutation_CreateCustomApplicationArgs = {
  data: TCustomApplicationDraftDataInput;
  organizationId: Scalars['String'];
};

export type TMutation_CreateCustomApplicationDeploymentPreviewArgs = {
  applicationId: Scalars['ID'];
  data: TCustomApplicationDeploymentPreviewCreateInput;
  organizationId: Scalars['String'];
};

export type TMutation_CreateCustomViewArgs = {
  data: TCustomViewDraftDataInput;
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

export type TMutation_CreateProjectSettingsStoresViewArgs = {
  data: TProjectSettingsStoresViewInput;
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

export type TMutation_DeactivateProjectSettingsStoresViewArgs = {
  id: Scalars['ID'];
};

export type TMutation_DeleteCartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};

export type TMutation_DeleteCustomApplicationArgs = {
  applicationId: Scalars['ID'];
  organizationId: Scalars['String'];
};

export type TMutation_DeleteCustomApplicationDeploymentPreviewArgs = {
  deploymentId: Scalars['ID'];
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

export type TMutation_DeleteProjectSettingsStoresViewArgs = {
  id: Scalars['ID'];
};

export type TMutation_InstallCustomApplicationArgs = {
  applicationId: Scalars['ID'];
  organizationId: Scalars['String'];
  projectKeys?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TMutation_InstallCustomViewArgs = {
  customViewId: Scalars['ID'];
  organizationId: Scalars['String'];
  projectKeys?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TMutation_RandomArgs = {
  byteLength: Scalars['Int'];
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

export type TMutation_SetProjectExtensionImportSampleDatasetArgs = {
  data?: InputMaybe<TSampleDatasets>;
};

export type TMutation_SetProjectExtensionOrderStatesVisibilityArgs = {
  data?: InputMaybe<Array<InputMaybe<TOrderStatesVisibility>>>;
};

export type TMutation_SetProjectExtensionRichTextEditorSettingsArgs = {
  data?: InputMaybe<TRichTextEditorSettingsInput>;
};

export type TMutation_UninstallCustomApplicationArgs = {
  installedApplicationId: Scalars['ID'];
  organizationId: Scalars['String'];
};

export type TMutation_UninstallCustomViewArgs = {
  installedCustomViewId: Scalars['ID'];
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

export type TMutation_UpdateCustomApplicationDeploymentPreviewArgs = {
  data: TCustomApplicationDeploymentPreviewUpdateInput;
  deploymentId: Scalars['ID'];
  organizationId: Scalars['String'];
};

export type TMutation_UpdateCustomApplicationProjectsInstallationArgs = {
  installedApplicationId: Scalars['ID'];
  organizationId: Scalars['String'];
  projectKeys?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TMutation_UpdateCustomViewArgs = {
  customViewId: Scalars['String'];
  data: TCustomViewDraftDataInput;
  organizationId: Scalars['String'];
};

export type TMutation_UpdateCustomViewProjectsInstallationArgs = {
  installedCustomViewId: Scalars['ID'];
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

export type TMutation_UpdateProjectSettingsStoresViewArgs = {
  data: TProjectSettingsStoresViewInput;
  id: Scalars['ID'];
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
  labelAllLocales: Array<TLocalizedField>;
  permissions: Array<TOAuthScope>;
  submenu: Array<TNavbarSubmenu>;
  updatedAt: Scalars['DateTime'];
  uriPath: Scalars['String'];
};

export type TNavbarSubmenu = {
  __typename?: 'NavbarSubmenu';
  createdAt: Scalars['DateTime'];
  featureToggle?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  key: Scalars['String'];
  labelAllLocales: Array<TLocalizedField>;
  permissions: Array<TOAuthScope>;
  updatedAt: Scalars['DateTime'];
  uriPath: Scalars['String'];
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
  sessionTokenExpTimeSeconds?: Maybe<Scalars['Int']>;
  teamIdForNewUsers: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TOidcSsoConfigDataInput = {
  authorityUrl: Scalars['String'];
  clientId: Scalars['String'];
  clientSecret?: InputMaybe<Scalars['String']>;
  logoutUrl?: InputMaybe<Scalars['String']>;
  sessionTokenExpTimeSeconds?: InputMaybe<Scalars['Int']>;
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

export type TOrdersListView = {
  __typename?: 'OrdersListView';
  createdAt: Scalars['DateTime'];
  filters?: Maybe<Array<TFilterValues>>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  searchParams?: Maybe<Scalars['Json']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
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
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
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
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  pinnedAttributes: Array<Scalars['String']>;
  productTypeId: Scalars['String'];
  projectKey: Scalars['String'];
  searchTerm?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
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
  /** @deprecated Feature not available anymore */
  applications?: Maybe<Array<TApplicationExtension>>;
  categoryRecommendationSettings?: Maybe<TCategoryRecommendationSettings>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imageRegex?: Maybe<TImageRegex>;
  installedApplications?: Maybe<
    Array<TRestrictedCustomApplicationInstallationForProject>
  >;
  isRichTextEditorEnabled: Scalars['Boolean'];
  orderStatesVisibility: Array<TOrderStatesVisibility>;
  projectKey: Scalars['String'];
  sampleDataImport?: Maybe<TSampleDataImportMetadata>;
  updatedAt: Scalars['DateTime'];
};

export type TProjectExtension_ApplicationsArgs = {
  where?: InputMaybe<TRestrictedApplicationExtensionWhereInput>;
};

export type TProjectExtension_InstalledApplicationsArgs = {
  where?: InputMaybe<TRestrictedCustomApplicationInstallationForProjectWhereInput>;
};

export type TProjectSettingsStoresView = {
  __typename?: 'ProjectSettingsStoresView';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  nameAllLocales?: Maybe<Array<TLocalizedField>>;
  projectKey: Scalars['String'];
  sort?: Maybe<TSort>;
  table?: Maybe<TTable>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type TProjectSettingsStoresViewInput = {
  nameAllLocales: Array<TLocalizedFieldCreateInput>;
  sort: TSortCreateInput;
  table?: InputMaybe<TProjectSettingsStoresViewTableInput>;
};

export type TProjectSettingsStoresViewTableInput = {
  visibleColumns: Array<Scalars['String']>;
};

export type TPublicCustomApplicationDevelopedByCommercetools = {
  __typename?: 'PublicCustomApplicationDevelopedByCommercetools';
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
  allCustomViewInstallationByOrganization?: Maybe<TCustomViewInstallation>;
  allCustomViewsByOrganization: Array<Maybe<TCustomView>>;
  allFeatures: Array<TFeature>;
  /** @deprecated Experimental feature - For internal usage only */
  allOrganizationExtensions: Array<TOrganizationExtension>;
  allProjectExtensions: Array<TProjectExtension>;
  allPublicCustomApplicationsDevelopedByCommercetools: Array<TPublicCustomApplicationDevelopedByCommercetools>;
  cartDiscountsCustomView?: Maybe<TDiscountsCustomView>;
  cartDiscountsCustomViews: Array<Maybe<TDiscountsCustomView>>;
  /** @deprecated Experimental feature - For internal usage only */
  customApplication?: Maybe<TCustomApplication>;
  customView?: Maybe<TCustomView>;
  customViewInstallation?: Maybe<TCustomViewInstallation>;
  customersListView?: Maybe<TCustomersListView>;
  customersListViews: Array<Maybe<TCustomersListView>>;
  dashboardView?: Maybe<TDashboardView>;
  dashboardViews: Array<Maybe<TDashboardView>>;
  discountCodesCustomView?: Maybe<TDiscountsCustomView>;
  discountCodesCustomViews: Array<Maybe<TDiscountsCustomView>>;
  /** @deprecated Experimental feature - For internal usage only */
  globalOrganizationExtension?: Maybe<TOrganizationExtension>;
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
  release?: Maybe<Scalars['String']>;
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

export type TQuery_AllCustomViewInstallationByOrganizationArgs = {
  organizationId: Scalars['ID'];
};

export type TQuery_AllCustomViewsByOrganizationArgs = {
  organizationId: Scalars['ID'];
};

export type TQuery_AllFeaturesArgs = {
  params?: InputMaybe<TFeatureQueryInput>;
};

export type TQuery_AllOrganizationExtensionsArgs = {
  organizationIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TQuery_AllPublicCustomApplicationsDevelopedByCommercetoolsArgs = {
  params?: InputMaybe<TAllPublicCustomApplicationsDevelopedByCommercetoolsQueryInput>;
};

export type TQuery_CartDiscountsCustomViewArgs = {
  id: Scalars['ID'];
};

export type TQuery_CustomApplicationArgs = {
  applicationId: Scalars['ID'];
};

export type TQuery_CustomViewArgs = {
  customViewId: Scalars['ID'];
};

export type TQuery_CustomViewInstallationArgs = {
  customViewInstallationId: Scalars['ID'];
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

export type TRestrictedApplicationExtensionWhereInput = {
  id?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type TRestrictedCustomApplicationForOrganization = {
  __typename?: 'RestrictedCustomApplicationForOrganization';
  createdAt: Scalars['DateTime'];
  deployments: Array<TCustomApplicationDeploymentPreview>;
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

export type TRestrictedCustomApplicationForOrganization_DeploymentsArgs = {
  params?: InputMaybe<TCustomApplicationDeploymentPreviewsQueryInput>;
};

export type TRestrictedCustomApplicationForProject = {
  __typename?: 'RestrictedCustomApplicationForProject';
  createdAt: Scalars['DateTime'];
  deployments: Array<TCustomApplicationDeploymentPreview>;
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

export type TRestrictedCustomApplicationForProject_DeploymentsArgs = {
  params?: InputMaybe<TCustomApplicationDeploymentPreviewsQueryInput>;
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

export type TRestrictedCustomApplicationInstallationForProjectWhereInput = {
  entryPointUriPath?: InputMaybe<Scalars['String']>;
};

export type TRestrictedCustomViewInstallationForOrganization = {
  __typename?: 'RestrictedCustomViewInstallationForOrganization';
  acceptedPermissions: Array<TCustomViewInstallationPermission>;
  createdAt: Scalars['DateTime'];
  customView: TCustomView;
  id: Scalars['ID'];
  installInAllProjects: Scalars['Boolean'];
  projects?: Maybe<Array<TProjectExtension>>;
  updatedAt: Scalars['DateTime'];
};

export type TRichTextEditorSettingsInput = {
  isRichTextEditorEnabled: Scalars['Boolean'];
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

export type TSampleDataImportMetadata = {
  __typename?: 'SampleDataImportMetadata';
  completed: Scalars['Boolean'];
  dataset?: Maybe<TSampleDatasets>;
};

export enum TSampleDatasets {
  Fashion = 'FASHION',
}

export type TSort = {
  __typename?: 'Sort';
  key: Scalars['String'];
  order: TSortOrder;
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
