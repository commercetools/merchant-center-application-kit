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
  Country: any;
  Currency: any;
  DateTime: any;
  DateTimeZone: any;
  Locale: any;
  Long: any;
};

export type TAddTeam = {
  members?: InputMaybe<Array<TReferenceInput>>;
  name: Scalars['String'];
  permissions?: InputMaybe<Scalars['String']>;
};

export type TAddTeamMembership = {
  teamId: Scalars['String'];
  user: TReferenceInput;
};

export type TAttributeGroupLimits = {
  __typename?: 'AttributeGroupLimits';
  maxTotalAttributeGroups?: Maybe<Scalars['Int']>;
};

/** AWS S3 container config */
export type TAwsContainer = {
  __typename?: 'AwsContainer';
  /** Public bucket url, without the project part */
  bucketUrl: Scalars['String'];
  /** Project part of the object path on s3 */
  projectPrefix: Scalars['String'];
};

export enum TBusinessRole {
  /** Architect role. */
  Architect = 'Architect',
  /** Customer Service role. */
  CustomerService = 'CustomerService',
  /** Engineer role. */
  Engineer = 'Engineer',
  /** Executive Management role. */
  ExecutiveManagement = 'ExecutiveManagement',
  /** Marketing role. */
  Marketing = 'Marketing',
  /** Other role. */
  Other = 'Other',
  /** ProductProjectManagerOrOwner role. */
  ProductProjectManagerOrOwner = 'ProductProjectManagerOrOwner',
  /** SalesAndECommerceManager role. */
  SalesAndECommerceManager = 'SalesAndECommerceManager',
}

export type TCartClassificationType = TShippingRateInputType & {
  __typename?: 'CartClassificationType';
  type: Scalars['String'];
  values: Array<TShippingRateInputLocalizedEnumValue>;
};

export type TCartDiscountLimits = {
  __typename?: 'CartDiscountLimits';
  withoutDiscountCodeLimit?: Maybe<Scalars['Long']>;
};

export type TCartLimits = {
  __typename?: 'CartLimits';
  maxCarts?: Maybe<Scalars['Long']>;
};

export type TCartScoreType = TShippingRateInputType & {
  __typename?: 'CartScoreType';
  type: Scalars['String'];
};

export type TCartValueType = TShippingRateInputType & {
  __typename?: 'CartValueType';
  type: Scalars['String'];
};

export type TCategoryLimits = {
  __typename?: 'CategoryLimits';
  maxTotalCategories?: Maybe<Scalars['Int']>;
};

export type TCdnContainerConfiguration = {
  __typename?: 'CdnContainerConfiguration';
  enabled: Scalars['Boolean'];
};

export type TChangeName = {
  name: Scalars['String'];
};

export type TChangeTeamName = {
  name: Scalars['String'];
  teamId: Scalars['String'];
};

export type TClustersConfig = {
  __typename?: 'ClustersConfig';
  db?: Maybe<TDbClustersConfig>;
  elasticsearch?: Maybe<TEsCluster>;
};

export type TClustersConfigInput = {
  db?: InputMaybe<TDbClustersConfigInput>;
  elasticsearch?: InputMaybe<TEsClusterInput>;
};

export type TCreateOrganizationCommand = {
  defaultClusters?: InputMaybe<TClustersConfigInput>;
  name: Scalars['String'];
  owner: TReferenceInput;
};

export type TCreatePermissionCommand = {
  actionRightPermissions?: InputMaybe<Array<Scalars['String']>>;
  dataFences?: InputMaybe<Array<TDataFenceDraft>>;
  group: Scalars['String'];
  hiddenMenuItems?: InputMaybe<Array<Scalars['String']>>;
  owner: TReferenceInput;
  resourceAccessPermissions?: InputMaybe<Array<Scalars['String']>>;
  team: TReferenceInput;
};

export type TCustomObjectLimits = {
  __typename?: 'CustomObjectLimits';
  maxCustomObjects?: Maybe<Scalars['Long']>;
};

export type TCustomerGroupLimits = {
  __typename?: 'CustomerGroupLimits';
  maxCustomerGroups?: Maybe<Scalars['Long']>;
};

export type TCustomerLimits = {
  __typename?: 'CustomerLimits';
  maxCustomers?: Maybe<Scalars['Long']>;
};

export type TDbClusterConfig = {
  __typename?: 'DBClusterConfig';
  dbClusterKey: TDbClusterKey;
  sharded: Scalars['Boolean'];
};

export type TDbClusterConfigInput = {
  dbClusterKey: TDbClusterKeyInput;
  sharded: Scalars['Boolean'];
};

export type TDbClusterKey = {
  __typename?: 'DBClusterKey';
  name: Scalars['String'];
};

export type TDbClusterKeyInput = {
  name: Scalars['String'];
};

export type TDbClustersConfig = {
  __typename?: 'DBClustersConfig';
  carts?: Maybe<TDbClusterConfig>;
  commits?: Maybe<TDbClusterConfig>;
  default: TDbClusterKey;
  orders?: Maybe<TDbClusterConfig>;
};

export type TDbClustersConfigInput = {
  carts?: InputMaybe<TDbClusterConfigInput>;
  commits?: InputMaybe<TDbClusterConfigInput>;
  default: TDbClusterKeyInput;
  orders?: InputMaybe<TDbClusterConfigInput>;
};

export type TDataFence = {
  type: Scalars['String'];
};

export type TDataFenceDraft = {
  store: TDataFenceStoreDraftType;
};

export type TDataFenceStoreDraftType = {
  storeKeys: Array<Scalars['String']>;
};

export type TEsAlternativeComparisonConfig = {
  __typename?: 'ESAlternativeComparisonConfig';
  comparisonProbability: Scalars['Float'];
  logComparisonResults: Scalars['Boolean'];
  versioning?: Maybe<Scalars['Boolean']>;
};

export type TEsAlternativeComparisonConfigInput = {
  comparisonProbability: Scalars['Float'];
  logComparisonResults: Scalars['Boolean'];
  versioning?: InputMaybe<Scalars['Boolean']>;
};

export type TEsCluster = {
  __typename?: 'ESCluster';
  categoriesShardConfig?: Maybe<TEsClusterShardConfig>;
  categoryComparison?: Maybe<TEsAlternativeComparisonConfig>;
  clusterKey: Scalars['String'];
  productComparison?: Maybe<TEsAlternativeComparisonConfig>;
  productsShardConfig?: Maybe<TEsClusterShardConfig>;
  replicateToClusterKey?: Maybe<Scalars['String']>;
};

export type TEsClusterInput = {
  categoriesShardConfig?: InputMaybe<TEsClusterShardConfigInput>;
  categoryComparison?: InputMaybe<TEsAlternativeComparisonConfigInput>;
  clusterKey: Scalars['String'];
  productComparison?: InputMaybe<TEsAlternativeComparisonConfigInput>;
  productsShardConfig?: InputMaybe<TEsClusterShardConfigInput>;
  replicateToClusterKey?: InputMaybe<Scalars['String']>;
};

export type TEsClusterShardConfig = {
  __typename?: 'ESClusterShardConfig';
  numberOfReplicas?: Maybe<Scalars['Int']>;
  numberOfShards?: Maybe<Scalars['Int']>;
  refreshIntervalSeconds?: Maybe<Scalars['Int']>;
  versioning?: Maybe<Scalars['Boolean']>;
};

export type TEsClusterShardConfigInput = {
  numberOfReplicas?: InputMaybe<Scalars['Int']>;
  numberOfShards?: InputMaybe<Scalars['Int']>;
  refreshIntervalSeconds?: InputMaybe<Scalars['Int']>;
  versioning?: InputMaybe<Scalars['Boolean']>;
};

export type TExtensionLimits = {
  __typename?: 'ExtensionLimits';
  maxTimeoutInMs?: Maybe<Scalars['Int']>;
};

export type TExternalOAuthInput = {
  authorizationHeader: Scalars['String'];
  url: Scalars['String'];
};

export type TInitiator = {
  __typename?: 'Initiator';
  anonymousId?: Maybe<Scalars['String']>;
  associateRef?: Maybe<TReference>;
  clientId?: Maybe<Scalars['String']>;
  customerRef?: Maybe<TReference>;
  externalUserId?: Maybe<Scalars['String']>;
  isPlatformClient?: Maybe<Scalars['Boolean']>;
  userRef?: Maybe<TReference>;
};

export type TLocalizedString = {
  __typename?: 'LocalizedString';
  locale: Scalars['Locale'];
  value: Scalars['String'];
};

export type TMediaContainer = TAwsContainer | TPublicContainer;

export type TMessagesConfiguration = {
  __typename?: 'MessagesConfiguration';
  deleteDaysAfterCreation?: Maybe<Scalars['Int']>;
  enabled: Scalars['Boolean'];
};

export type TMutation = {
  __typename?: 'Mutation';
  createMyOrganization?: Maybe<TOrganization>;
  createMyPermission?: Maybe<TPermission>;
  createMyProject?: Maybe<TProject>;
  createPermission?: Maybe<TPermission>;
  deleteMyOrganization?: Maybe<TOrganization>;
  deleteMyPermission?: Maybe<TPermission>;
  deleteMyProject?: Maybe<TProject>;
  deletePermission?: Maybe<TPermission>;
  revokeAccessTokensByGroup?: Maybe<TRevokedTokens>;
  revokeAccessTokensByTeam?: Maybe<TRevokedTokens>;
  updateMyOrganization?: Maybe<TOrganization>;
  updateMyPermission?: Maybe<TPermission>;
  updatePermission?: Maybe<TPermission>;
};

export type TMutation_CreateMyOrganizationArgs = {
  draft: TCreateOrganizationCommand;
};

export type TMutation_CreateMyPermissionArgs = {
  draft: TCreatePermissionCommand;
};

export type TMutation_CreateMyProjectArgs = {
  draft: TProjectDraftType;
};

export type TMutation_CreatePermissionArgs = {
  draft: TCreatePermissionCommand;
};

export type TMutation_DeleteMyOrganizationArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};

export type TMutation_DeleteMyPermissionArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};

export type TMutation_DeleteMyProjectArgs = {
  key: Scalars['String'];
  version: Scalars['Long'];
};

export type TMutation_DeletePermissionArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};

export type TMutation_RevokeAccessTokensByGroupArgs = {
  owner: TReferenceInput;
  permissionGroup: Scalars['String'];
};

export type TMutation_RevokeAccessTokensByTeamArgs = {
  owner: TReferenceInput;
  teamId: Scalars['String'];
};

export type TMutation_UpdateMyOrganizationArgs = {
  actions: Array<TOrganizationUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};

export type TMutation_UpdateMyPermissionArgs = {
  actions: Array<TPermissionUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};

export type TMutation_UpdatePermissionArgs = {
  actions: Array<TPermissionUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};

export type TOrderEditLimits = {
  __typename?: 'OrderEditLimits';
  maxOrderEdits?: Maybe<Scalars['Long']>;
};

export type TOrganization = TVersioned & {
  __typename?: 'Organization';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  defaultClusters?: Maybe<TClustersConfig>;
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name: Scalars['String'];
  teams: Array<TTeam>;
  version: Scalars['Long'];
};

export type TOrganizationQueryResult = {
  __typename?: 'OrganizationQueryResult';
  count: Scalars['Int'];
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TOrganization>;
  total: Scalars['Long'];
};

export type TOrganizationUpdateAction = {
  addTeam?: InputMaybe<TAddTeam>;
  addTeamMembership?: InputMaybe<TAddTeamMembership>;
  changeName?: InputMaybe<TChangeName>;
  changeTeamName?: InputMaybe<TChangeTeamName>;
  removeTeam?: InputMaybe<TRemoveTeam>;
  removeTeamMembership?: InputMaybe<TRemoveTeamMembership>;
};

export type TPermission = TVersioned & {
  __typename?: 'Permission';
  actionRightPermissions: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  dataFences: Array<TDataFence>;
  group: Scalars['String'];
  hiddenMenuItems: Array<Scalars['String']>;
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  ownerRef: TReference;
  resourceAccessPermissions: Array<Scalars['String']>;
  teamRef: TReference;
  version: Scalars['Long'];
};

export type TPermissionQueryResult = {
  __typename?: 'PermissionQueryResult';
  count: Scalars['Int'];
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TPermission>;
  total: Scalars['Long'];
};

export type TPermissionUpdateAction = {
  setActionRightPermissions?: InputMaybe<TSetPermissionActionRightPermissions>;
  setDataFences?: InputMaybe<TSetPermissionDataFences>;
  setHiddenMenuItems?: InputMaybe<TSetPermissionHiddenMenuItems>;
  setResourceAccessPermissions?: InputMaybe<TSetPermissionResourceAccessPermissions>;
};

export type TProductDiscountLimits = {
  __typename?: 'ProductDiscountLimits';
  activeLimit?: Maybe<Scalars['Long']>;
};

export type TProductLimits = {
  __typename?: 'ProductLimits';
  pricesLimitPerVariant?: Maybe<Scalars['Int']>;
  variantLimit?: Maybe<Scalars['Int']>;
};

export type TProductTypeLimits = {
  __typename?: 'ProductTypeLimits';
  maxTotalProductTypes?: Maybe<Scalars['Int']>;
};

export type TProject = TVersioned & {
  __typename?: 'Project';
  billingInfo?: Maybe<TProjectBillingInfo>;
  cdnContainer?: Maybe<TMediaContainer>;
  cdnContainerConfiguration: TCdnContainerConfiguration;
  countries: Array<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  currencies: Array<Scalars['Currency']>;
  customLimits?: Maybe<TProjectCustomLimits>;
  id: Scalars['String'];
  initialized: Scalars['Boolean'];
  isProductionProject?: Maybe<Scalars['Boolean']>;
  key: Scalars['String'];
  languages: Array<Scalars['Locale']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  messages: TMessagesConfiguration;
  name: Scalars['String'];
  owner?: Maybe<TOrganization>;
  ownerRef?: Maybe<TReference>;
  participations: Array<TOrganization>;
  participationsRef: Array<TReference>;
  plan: Scalars['String'];
  shippingRateInputType?: Maybe<TShippingRateInputType>;
  suspended?: Maybe<TProjectSuspendData>;
  trialUntil?: Maybe<Scalars['DateTime']>;
  version: Scalars['Long'];
};

export type TProjectBillingInfo = {
  __typename?: 'ProjectBillingInfo';
  accountId?: Maybe<Scalars['String']>;
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  contractNumber?: Maybe<Scalars['String']>;
};

export type TProjectCustomLimits = {
  __typename?: 'ProjectCustomLimits';
  attributeGroupLimits?: Maybe<TAttributeGroupLimits>;
  cartDiscounts?: Maybe<TCartDiscountLimits>;
  carts?: Maybe<TCartLimits>;
  categoryLimits?: Maybe<TCategoryLimits>;
  customObjects?: Maybe<TCustomObjectLimits>;
  customerGroups?: Maybe<TCustomerGroupLimits>;
  customers?: Maybe<TCustomerLimits>;
  extensions?: Maybe<TExtensionLimits>;
  orderEdits?: Maybe<TOrderEditLimits>;
  productDiscounts?: Maybe<TProductDiscountLimits>;
  productTypeLimits?: Maybe<TProductTypeLimits>;
  products?: Maybe<TProductLimits>;
  queryLimits?: Maybe<TQueryLimits>;
  refreshTokens?: Maybe<TRefreshTokenLimits>;
  searchLimits?: Maybe<TSearchLimits>;
  shippingMethods?: Maybe<TShippingMethodLimit>;
  shoppingLists?: Maybe<TShoppingListLimits>;
  stores?: Maybe<TStoreLimits>;
  subscriptions?: Maybe<TSubscriptionsLimits>;
  taxCategories?: Maybe<TTaxCategoryLimit>;
  termFacetSize?: Maybe<Scalars['Int']>;
  zones?: Maybe<TZoneLimits>;
};

export type TProjectDraftType = {
  asyncInitialization?: InputMaybe<Scalars['Boolean']>;
  cdnContainerEnabled?: InputMaybe<Scalars['Boolean']>;
  countries?: Array<Scalars['Country']>;
  currencies: Array<Scalars['Currency']>;
  dbClustersConfig?: InputMaybe<TDbClustersConfigInput>;
  deleteDaysAfterCreation?: InputMaybe<Scalars['Int']>;
  esCluster?: InputMaybe<TEsClusterInput>;
  externalOAuth?: InputMaybe<TExternalOAuthInput>;
  key: Scalars['String'];
  languages: Array<Scalars['Locale']>;
  messagesEnabled?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  owner: TReferenceInput;
  plan: TProjectPlan;
  searchIndexing?: InputMaybe<TSearchIndexingConfigurationInput>;
  trialUntil?: InputMaybe<Scalars['DateTime']>;
};

export enum TProjectPlan {
  Standard = 'Standard',
  Unlimited = 'Unlimited',
}

export type TProjectQueryResult = {
  __typename?: 'ProjectQueryResult';
  count: Scalars['Int'];
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProject>;
  total: Scalars['Long'];
};

export type TProjectSuspendData = {
  __typename?: 'ProjectSuspendData';
  description?: Maybe<Scalars['String']>;
  reason: TProjectSuspensionReason;
};

export enum TProjectSuspensionReason {
  /** A database migration is running. */
  DbMigration = 'DbMigration',
  /** Other reasons like copy project. */
  Other = 'Other',
  /** The usage of the project is not paid. */
  Payment = 'Payment',
}

/** Rackspace Cloud Files container config */
export type TPublicContainer = {
  __typename?: 'PublicContainer';
  httpUri: Scalars['String'];
  httpsUri: Scalars['String'];
  iosUri: Scalars['String'];
  name: Scalars['String'];
  streamingUri: Scalars['String'];
};

export type TQuery = {
  __typename?: 'Query';
  /**
   * Fetch projects that `me` can access (but maybe not be able to manage).
   * @deprecated beta feature
   */
  myAccessibleProjects: TProjectQueryResult;
  /** Fetch organizations that `me` can manage. */
  myOrganizations: TOrganizationQueryResult;
  /**
   * Fetch permissions `me` is allowed to see:
   *  - if `owner` = `organization`: filter on organizations `me` can manage
   *  - if `owner` = `project`: filter on projects belonging to organizations `me` can manage
   * Currently in beta.
   *
   */
  myPermissions: TPermissionQueryResult;
  /** Fetch projects that `me` can manage. */
  myProjects: TProjectQueryResult;
  permissions: TPermissionQueryResult;
  /** All permissions for a given user and a given owner (organization or project). Currently in beta. */
  permissionsForUser: TPermissionQueryResult;
  projects: TProjectQueryResult;
};

export type TQuery_MyAccessibleProjectsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TQuery_MyOrganizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TQuery_MyPermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  owner: TReferenceInput;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TQuery_MyProjectsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TQuery_PermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TQuery_PermissionsForUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  owner: TReferenceInput;
  sort?: InputMaybe<Array<Scalars['String']>>;
  userId: Scalars['String'];
  where?: InputMaybe<Scalars['String']>;
};

export type TQuery_ProjectsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TQueryLimits = {
  __typename?: 'QueryLimits';
  maxOffset: Scalars['Int'];
};

export type TReference = {
  __typename?: 'Reference';
  id: Scalars['String'];
  typeId: Scalars['String'];
};

export type TReferenceInput = {
  id: Scalars['String'];
  typeId: Scalars['String'];
};

export type TRefreshTokenLimits = {
  __typename?: 'RefreshTokenLimits';
  maxRefreshTokens?: Maybe<Scalars['Long']>;
};

export type TRemoveTeam = {
  teamId: Scalars['String'];
};

export type TRemoveTeamMembership = {
  teamId: Scalars['String'];
  user: TReferenceInput;
};

export type TRevokedTokens = {
  __typename?: 'RevokedTokens';
  owner: TReference;
  revoked: Scalars['Long'];
  teams: Array<Scalars['String']>;
};

export type TSearchIndexingConfigurationInput = {
  products?: InputMaybe<TSearchIndexingConfigurationValuesInput>;
};

export type TSearchIndexingConfigurationValuesInput = {
  status?: InputMaybe<Scalars['String']>;
};

export type TSearchLimits = {
  __typename?: 'SearchLimits';
  maxTextSize?: Maybe<Scalars['Int']>;
};

export type TSetPermissionActionRightPermissions = {
  actionRightPermissions: Array<Scalars['String']>;
};

export type TSetPermissionDataFences = {
  dataFences: Array<TDataFenceDraft>;
};

export type TSetPermissionHiddenMenuItems = {
  hiddenMenuItems: Array<Scalars['String']>;
};

export type TSetPermissionResourceAccessPermissions = {
  resourceAccessPermissions: Array<Scalars['String']>;
};

export type TShippingMethodLimit = {
  __typename?: 'ShippingMethodLimit';
  maxShippingMethods?: Maybe<Scalars['Long']>;
};

export type TShippingRateInputLocalizedEnumValue = {
  __typename?: 'ShippingRateInputLocalizedEnumValue';
  key: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
};

export type TShippingRateInputLocalizedEnumValue_LabelArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TShippingRateInputType = {
  type: Scalars['String'];
};

export type TShoppingListLimits = {
  __typename?: 'ShoppingListLimits';
  maxLineItems?: Maybe<Scalars['Int']>;
  maxShoppingLists?: Maybe<Scalars['Long']>;
  maxTextLineItems?: Maybe<Scalars['Int']>;
};

export type TStoreDataFence = TDataFence & {
  __typename?: 'StoreDataFence';
  storeKeys: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type TStoreLimits = {
  __typename?: 'StoreLimits';
  maxInventorySupplyChannelsPerStore?: Maybe<Scalars['Long']>;
  maxProductDistributionChannelsPerStore?: Maybe<Scalars['Long']>;
  maxProductSelectionsPerStore?: Maybe<Scalars['Long']>;
  maxStores?: Maybe<Scalars['Long']>;
};

export type TSubscriptionsLimits = {
  __typename?: 'SubscriptionsLimits';
  maxSubscriptions?: Maybe<Scalars['Int']>;
};

export type TTaxCategoryLimit = {
  __typename?: 'TaxCategoryLimit';
  maxTaxCategories?: Maybe<Scalars['Long']>;
};

export type TTeam = {
  __typename?: 'Team';
  id: Scalars['String'];
  members: Array<TUser>;
  membersRef: Array<TReference>;
  name: Scalars['String'];
};

export type TUser = TVersioned & {
  __typename?: 'User';
  businessRole?: Maybe<TBusinessRole>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  language: Scalars['Locale'];
  lastLoginAt?: Maybe<Scalars['DateTime']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  lastName: Scalars['String'];
  locked: Scalars['Boolean'];
  lowercaseEmail: Scalars['String'];
  numberFormat: Scalars['Locale'];
  timeZone?: Maybe<Scalars['DateTimeZone']>;
  version: Scalars['Long'];
};

/** Versioned object have an ID and version and modification. Every update of this object changes it's version. */
export type TVersioned = {
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  version: Scalars['Long'];
};

export type TZoneLimits = {
  __typename?: 'ZoneLimits';
  maxZones?: Maybe<Scalars['Long']>;
};

export type TFetchMyOrganizationsFromCliQueryVariables = Exact<{
  [key: string]: never;
}>;

export type TFetchMyOrganizationsFromCliQuery = {
  __typename?: 'Query';
  myOrganizations: {
    __typename?: 'OrganizationQueryResult';
    total: any;
    results: Array<{ __typename?: 'Organization'; id: string; name: string }>;
  };
};
