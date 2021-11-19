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
};

export type TAdditionalUserInfo = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

/** Only used by the navbar menu component in ApplicationShell. */
export type TAllPermissionsForAllApplications = {
  __typename?: 'AllPermissionsForAllApplications';
  allAppliedActionRights: Array<TAppliedActionRight>;
  allAppliedDataFences: Array<TAppliedDataFence>;
  allAppliedMenuVisibilities: Array<TAppliedMenuVisibilities>;
  allAppliedPermissions: Array<TAppliedPermission>;
};

export type TAppliedActionRight = {
  __typename?: 'AppliedActionRight';
  group: Scalars['String'];
  name: Scalars['String'];
  value: Scalars['Boolean'];
};

export type TAppliedDataFence = TStoreDataFence;

export type TAppliedMenuVisibilities = {
  __typename?: 'AppliedMenuVisibilities';
  name: Scalars['String'];
  value: Scalars['Boolean'];
};

export type TAppliedPermission = {
  __typename?: 'AppliedPermission';
  name: Scalars['String'];
  value: Scalars['Boolean'];
};

export type TCartClassificationValue = {
  __typename?: 'CartClassificationValue';
  allLocaleLabels: Array<Maybe<TLocalizedField>>;
  key: Scalars['String'];
};

export type TChangeUserBusinessRole = {
  businessRole?: Maybe<Scalars['String']>;
};

export type TChangeUserLanguage = {
  language: Scalars['String'];
};

/** NOTE: This is _not_ a username it is the user's name. */
export type TChangeUserName = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type TChangeUserNumberFormat = {
  numberFormat: Scalars['String'];
};

export type TChangeUserPassword = {
  password: Scalars['String'];
};

export type TDataFence = {
  type: Scalars['String'];
};

export type TDeleteAccountRequest = {
  __typename?: 'DeleteAccountRequest';
  jwt?: Maybe<Scalars['String']>;
};

export type TDeletedUser = {
  __typename?: 'DeletedUser';
  id: Scalars['String'];
};

export type TFeature = {
  __typename?: 'Feature';
  name: Scalars['String'];
  reason?: Maybe<Scalars['String']>;
  value: Scalars['Boolean'];
};

export type TInvitationInput = {
  emails: Array<Scalars['String']>;
  organization: TInvitationOrganizationInput;
  team: TInvitationTeamInput;
};

export type TInvitationOrganizationInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  version: Scalars['Int'];
};

/**
 * Note: you can not brute-force fetch user information
 * by trying emails. Only information about the membership itself.
 */
export type TInvitationQueryResult = {
  __typename?: 'InvitationQueryResult';
  gravatarHash?: Maybe<Scalars['String']>;
  hasValidEmail: Scalars['Boolean'];
  isAlreadyAMemberOfTeam: Scalars['Boolean'];
  isKnownUser: Scalars['Boolean'];
  version: Scalars['Int'];
};

export type TInvitationResult = {
  __typename?: 'InvitationResult';
  email: Scalars['String'];
  jwt?: Maybe<Scalars['String']>;
  status: TInvitationStatus;
};

export enum TInvitationStatus {
  InvitationFailure = 'InvitationFailure',
  InvitationSent = 'InvitationSent',
  PendingRegistration = 'PendingRegistration'
}

export type TInvitationTeamInput = {
  id: Scalars['ID'];
};

export type TInvitationWhereInput = {
  email: Scalars['String'];
  organizationId: Scalars['ID'];
  teamId: Scalars['ID'];
};

export type TLocalizedField = {
  __typename?: 'LocalizedField';
  locale: Scalars['String'];
  value: Scalars['String'];
};

export type TMetaData = {
  createdAt: Scalars['String'];
  lastModifiedAt: Scalars['String'];
  version?: Maybe<Scalars['Int']>;
};

export type TMutation = {
  __typename?: 'Mutation';
  createMyOrganization?: Maybe<TOrganizationCreated>;
  createMyProject?: Maybe<TProjectPendingCreation>;
  createOAuthClient: TOAuthClient;
  deleteAccount: TDeletedUser;
  deleteOAuthClient: TOAuthClient;
  invite: Array<TInvitationResult>;
  random: Scalars['String'];
  resetPassword: TResetUser;
  sendLinkToDeleteAccount?: Maybe<TDeleteAccountRequest>;
  sendLinkToResetPassword?: Maybe<TResetPasswordRequest>;
  sendLinkToSignUp?: Maybe<TSignUpRequest>;
  signUp: TSignedUpUser;
  updateUser: TUser;
};


export type TMutation_CreateMyOrganizationArgs = {
  draft: TOrganizationDraftType;
};


export type TMutation_CreateMyProjectArgs = {
  draft: TProjectDraftType;
  myPermission: TMyPermissionInitializationInput;
};


export type TMutation_CreateOAuthClientArgs = {
  draft: TOAuthClientCreationInput;
};


export type TMutation_DeleteAccountArgs = {
  jwt: Scalars['String'];
  origin?: Maybe<Scalars['String']>;
};


export type TMutation_DeleteOAuthClientArgs = {
  id: Scalars['ID'];
};


export type TMutation_InviteArgs = {
  draft: TInvitationInput;
  origin?: Maybe<Scalars['String']>;
};


export type TMutation_RandomArgs = {
  byteLength: Scalars['Int'];
};


export type TMutation_ResetPasswordArgs = {
  draft: TResetPasswordDraft;
  jwt: Scalars['String'];
  origin?: Maybe<Scalars['String']>;
};


export type TMutation_SendLinkToDeleteAccountArgs = {
  origin?: Maybe<Scalars['String']>;
};


export type TMutation_SendLinkToResetPasswordArgs = {
  email: Scalars['String'];
  origin?: Maybe<Scalars['String']>;
};


export type TMutation_SendLinkToSignUpArgs = {
  additionalInfo?: Maybe<TAdditionalUserInfo>;
  email: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  origin?: Maybe<Scalars['String']>;
};


export type TMutation_SignUpArgs = {
  draft: TUserDraft;
  jwt: Scalars['String'];
};


export type TMutation_UpdateUserArgs = {
  actions: Array<TUserUpdateAction>;
  version: Scalars['Int'];
};

export type TMyPermissionInitializationInput = {
  teamId: Scalars['String'];
};

export type TOAuthClient = {
  __typename?: 'OAuthClient';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastUsedAt?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  ownerId: Scalars['ID'];
  permissions: Array<TProjectPermission>;
  secret: Scalars['String'];
};

export type TOAuthClientCreationInput = {
  name: Scalars['String'];
  ownerId: Scalars['ID'];
  permissions: Array<TProjectPermissionInput>;
};

export type TOAuthClientQueryResult = TQueryResult & {
  __typename?: 'OAuthClientQueryResult';
  count: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<TOAuthClient>;
  total: Scalars['Int'];
};

export type TOAuthClientTemplate = {
  __typename?: 'OAuthClientTemplate';
  key: Scalars['String'];
  oAuthScopes: Array<TPermissionScope>;
};

/**
 * TODO: use `Reference` instead once there is no more usage of the following fields:
 * - name
 * - createdAt
 */
export type TOrganization = {
  __typename?: 'Organization';
  /** @deprecated This field will be removed in the future. */
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TOrganizationCreated = {
  __typename?: 'OrganizationCreated';
  id: Scalars['String'];
  name: Scalars['String'];
  teams: Array<TOrganizationTeamsCreated>;
};

export type TOrganizationDraftType = {
  name: Scalars['String'];
  ownerId: Scalars['String'];
};

/**
 * Note:
 *   This is not a `Organization` type as in the future MC schema will not support e.g. expanding on team members on its internal schema.
 */
export type TOrganizationTeamsCreated = {
  __typename?: 'OrganizationTeamsCreated';
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum TPermissionScope {
  CreateAnonymousToken = 'create_anonymous_token',
  GetPermissionForAnyProject = 'get_permission_for_any_project',
  IntrospectOauthTokens = 'introspect_oauth_tokens',
  ManageApiClients = 'manage_api_clients',
  ManageAuditLog = 'manage_audit_log',
  ManageCartDiscounts = 'manage_cart_discounts',
  ManageCategories = 'manage_categories',
  ManageChangeHistory = 'manage_change_history',
  ManageCustomerGroups = 'manage_customer_groups',
  ManageCustomers = 'manage_customers',
  ManageDiscountCodes = 'manage_discount_codes',
  ManageExtensions = 'manage_extensions',
  ManageGlobalSubscriptions = 'manage_global_subscriptions',
  ManageImportContainers = 'manage_import_containers',
  ManageImportSinks = 'manage_import_sinks',
  ManageKeyValueDocuments = 'manage_key_value_documents',
  ManageMyOrders = 'manage_my_orders',
  ManageMyPayments = 'manage_my_payments',
  ManageMyProfile = 'manage_my_profile',
  ManageMyShoppingLists = 'manage_my_shopping_lists',
  ManageOrderEdits = 'manage_order_edits',
  ManageOrders = 'manage_orders',
  ManagePayments = 'manage_payments',
  ManageProducts = 'manage_products',
  ManageProject = 'manage_project',
  ManageProjectSettings = 'manage_project_settings',
  ManageShippingMethods = 'manage_shipping_methods',
  ManageShoppingLists = 'manage_shopping_lists',
  ManageStates = 'manage_states',
  ManageStores = 'manage_stores',
  ManageSubscriptions = 'manage_subscriptions',
  ManageTaxCategories = 'manage_tax_categories',
  ManageTypes = 'manage_types',
  ViewApiClients = 'view_api_clients',
  ViewAuditLog = 'view_audit_log',
  ViewCartDiscounts = 'view_cart_discounts',
  ViewCategories = 'view_categories',
  ViewChangeHistory = 'view_change_history',
  ViewCustomerGroups = 'view_customer_groups',
  ViewCustomers = 'view_customers',
  ViewDiscountCodes = 'view_discount_codes',
  ViewImportContainers = 'view_import_containers',
  ViewImportSinks = 'view_import_sinks',
  ViewKeyValueDocuments = 'view_key_value_documents',
  ViewMessages = 'view_messages',
  ViewOrderEdits = 'view_order_edits',
  ViewOrders = 'view_orders',
  ViewPayments = 'view_payments',
  ViewProducts = 'view_products',
  ViewProjectSettings = 'view_project_settings',
  ViewProjects = 'view_projects',
  ViewPublishedProducts = 'view_published_products',
  ViewShippingMethods = 'view_shipping_methods',
  ViewShoppingLists = 'view_shopping_lists',
  ViewStates = 'view_states',
  ViewStores = 'view_stores',
  ViewTaxCategories = 'view_tax_categories',
  ViewTypes = 'view_types'
}

export type TProject = TMetaData & {
  __typename?: 'Project';
  allAppliedActionRights: Array<TAppliedActionRight>;
  allAppliedDataFences: Array<TAppliedDataFence>;
  /** @deprecated This field has been moved into the menuPermissionsForAllApplications field. */
  allAppliedMenuVisibilities: Array<TAppliedMenuVisibilities>;
  allAppliedPermissions: Array<TAppliedPermission>;
  allPermissionsForAllApplications: TAllPermissionsForAllApplications;
  apiVersion: Scalars['String'];
  countries: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  currencies: Array<Scalars['String']>;
  expiry: TProjectExpiry;
  initialized: Scalars['Boolean'];
  isProductionProject: Scalars['Boolean'];
  key: Scalars['String'];
  languages: Array<Scalars['String']>;
  lastModifiedAt: Scalars['String'];
  name: Scalars['String'];
  owner: TOrganization;
  plan: Scalars['String'];
  shippingRateInputType?: Maybe<TShippingRateInputType>;
  suspension: TProjectSuspension;
  version?: Maybe<Scalars['Int']>;
};

export type TProjectDraftType = {
  countries: Array<Scalars['String']>;
  currencies: Array<Scalars['String']>;
  deleteDaysAfterCreation?: Maybe<Scalars['Int']>;
  key: Scalars['String'];
  languages: Array<Scalars['String']>;
  messagesEnabled?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  ownerId: Scalars['String'];
};

export type TProjectExpiry = {
  __typename?: 'ProjectExpiry';
  daysLeft?: Maybe<Scalars['Int']>;
  isActive: Scalars['Boolean'];
};

export type TProjectPendingCreation = {
  __typename?: 'ProjectPendingCreation';
  id: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  version: Scalars['Int'];
};

export type TProjectPermission = {
  __typename?: 'ProjectPermission';
  key: TPermissionScope;
  projectKey?: Maybe<Scalars['String']>;
  storeKey?: Maybe<Scalars['String']>;
};

export type TProjectPermissionInput = {
  key: TPermissionScope;
  projectKey?: Maybe<Scalars['String']>;
  storeKey?: Maybe<Scalars['String']>;
};

export type TProjectQueryResult = TQueryResult & {
  __typename?: 'ProjectQueryResult';
  count: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<TProject>;
  total: Scalars['Int'];
};

export type TProjectSuspension = {
  __typename?: 'ProjectSuspension';
  isActive: Scalars['Boolean'];
  reason?: Maybe<TProjectSuspensionReason>;
};

export enum TProjectSuspensionReason {
  Other = 'Other',
  Payment = 'Payment',
  TemporaryMaintenance = 'TemporaryMaintenance'
}

export type TQuery = {
  __typename?: 'Query';
  allFeatures: Array<TFeature>;
  allImpliedOAuthScopes: Array<Scalars['String']>;
  allSupportedActionRights?: Maybe<Array<TSupportedActionRight>>;
  allSupportedMenuVisibilities?: Maybe<Array<TSupportedMenuVisibility>>;
  allSupportedOAuthScopes: Array<Scalars['String']>;
  allSupportedOAuthScopesForOAuthClients: Array<TSupportedOAuthScopeForOAuthClient>;
  allSupportedResources?: Maybe<Array<TSupportedResource>>;
  allSupportedStoreScopes?: Maybe<Array<TSupportedStoreScope>>;
  amILoggedIn: Scalars['Boolean'];
  invitation?: Maybe<TInvitationQueryResult>;
  me?: Maybe<TUser>;
  oAuthClient?: Maybe<TOAuthClient>;
  oAuthClientTemplates: Array<TOAuthClientTemplate>;
  oAuthClients: TOAuthClientQueryResult;
  project?: Maybe<TProject>;
  release?: Maybe<Scalars['String']>;
  releases?: Maybe<TReleaseHistory>;
  storeOAuthScopes: Array<TPermissionScope>;
};


export type TQuery_AllImpliedOAuthScopesArgs = {
  onlyConfiguredOnTrustedClient?: Maybe<Scalars['Boolean']>;
  resourceAccessPermissions: Array<Scalars['String']>;
};


export type TQuery_InvitationArgs = {
  where?: Maybe<TInvitationWhereInput>;
};


export type TQuery_OAuthClientArgs = {
  id: Scalars['String'];
};


export type TQuery_OAuthClientsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Scalars['String']>>;
};


export type TQuery_ProjectArgs = {
  key?: Maybe<Scalars['String']>;
};


export type TQuery_ReleasesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  origin: TReleaseOrigin;
};

export type TQueryResult = {
  count: Scalars['Int'];
  offset: Scalars['Int'];
  total: Scalars['Int'];
};

export type TReference = {
  __typename?: 'Reference';
  id: Scalars['String'];
  typeId: Scalars['String'];
};

export type TReferenceInput = {
  id: Scalars['ID'];
  typeId: Scalars['String'];
};

export type TReleaseEntry = {
  __typename?: 'ReleaseEntry';
  description: Scalars['String'];
  guid: Scalars['String'];
  link: Scalars['String'];
  releasedAt: Scalars['String'];
  title: Scalars['String'];
};

export type TReleaseHistory = {
  __typename?: 'ReleaseHistory';
  description: Scalars['String'];
  entries: TReleaseQueryResult;
  link: Scalars['String'];
  title: Scalars['String'];
};


export type TReleaseHistory_EntriesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum TReleaseOrigin {
  Ctp = 'ctp',
  Mc = 'mc'
}

export type TReleaseQueryResult = TQueryResult & {
  __typename?: 'ReleaseQueryResult';
  count: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<TReleaseEntry>;
  total: Scalars['Int'];
};

export type TResetPasswordDraft = {
  password: Scalars['String'];
};

export type TResetPasswordRequest = {
  __typename?: 'ResetPasswordRequest';
  jwt?: Maybe<Scalars['String']>;
};

export type TResetUser = {
  __typename?: 'ResetUser';
  id: Scalars['String'];
};

export type TSetUserTimeZone = {
  /** NOTE: This is optional as not passing it unsets the timezone. */
  timeZone?: Maybe<Scalars['String']>;
};

export type TShippingRateInputType = {
  __typename?: 'ShippingRateInputType';
  type: TShippingRateType;
  values?: Maybe<Array<Maybe<TCartClassificationValue>>>;
};

export enum TShippingRateType {
  CartClassification = 'CartClassification',
  CartScore = 'CartScore',
  CartValue = 'CartValue'
}

export type TSignUpRequest = {
  __typename?: 'SignUpRequest';
  jwt?: Maybe<Scalars['String']>;
};

export type TSignedUpUser = {
  __typename?: 'SignedUpUser';
  id: Scalars['String'];
};

export type TStoreDataFence = TDataFence & {
  __typename?: 'StoreDataFence';
  group: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export type TSupportedActionRight = {
  __typename?: 'SupportedActionRight';
  group: Scalars['String'];
  name: Scalars['String'];
};

export type TSupportedMenuVisibility = {
  __typename?: 'SupportedMenuVisibility';
  group: Scalars['String'];
  name: Scalars['String'];
};

export type TSupportedOAuthScopeForOAuthClient = {
  __typename?: 'SupportedOAuthScopeForOAuthClient';
  name: Scalars['String'];
};

export type TSupportedResource = {
  __typename?: 'SupportedResource';
  name: Scalars['String'];
};

export type TSupportedStoreScope = {
  __typename?: 'SupportedStoreScope';
  group: Scalars['String'];
  name: Scalars['String'];
};

export type TUser = TMetaData & {
  __typename?: 'User';
  businessRole?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  defaultProjectKey?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gravatarHash: Scalars['String'];
  id: Scalars['ID'];
  language: Scalars['String'];
  lastModifiedAt: Scalars['String'];
  lastName: Scalars['String'];
  launchdarklyTrackingGroup: Scalars['String'];
  launchdarklyTrackingId: Scalars['String'];
  launchdarklyTrackingSubgroup?: Maybe<Scalars['String']>;
  launchdarklyTrackingTeam?: Maybe<Array<Scalars['String']>>;
  launchdarklyTrackingTenant: Scalars['String'];
  numberFormat: Scalars['String'];
  projects: TProjectQueryResult;
  timeZone?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

export type TUserDraft = {
  businessRole?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type TUserUpdateAction = {
  changeBusinessRole?: Maybe<TChangeUserBusinessRole>;
  changeLanguage?: Maybe<TChangeUserLanguage>;
  changeName?: Maybe<TChangeUserName>;
  changeNumberFormat?: Maybe<TChangeUserNumberFormat>;
  changePassword?: Maybe<TChangeUserPassword>;
  setTimeZone?: Maybe<TSetUserTimeZone>;
};

export type TAmILoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type TAmILoggedInQuery = { __typename?: 'Query', amILoggedIn: boolean };

export type TFetchProjectQueryVariables = Exact<{
  projectKey: Scalars['String'];
}>;


export type TFetchProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', key: string, version?: number | null | undefined, name: string, countries: Array<string>, currencies: Array<string>, languages: Array<string>, initialized: boolean, expiry: { __typename?: 'ProjectExpiry', isActive: boolean, daysLeft?: number | null | undefined }, suspension: { __typename?: 'ProjectSuspension', isActive: boolean, reason?: TProjectSuspensionReason | null | undefined }, allAppliedPermissions: Array<{ __typename?: 'AppliedPermission', name: string, value: boolean }>, allAppliedActionRights: Array<{ __typename?: 'AppliedActionRight', group: string, name: string, value: boolean }>, allAppliedDataFences: Array<{ __typename: 'StoreDataFence', type: string, name: string, value: string, group: string }>, allPermissionsForAllApplications: { __typename?: 'AllPermissionsForAllApplications', allAppliedPermissions: Array<{ __typename?: 'AppliedPermission', name: string, value: boolean }>, allAppliedActionRights: Array<{ __typename?: 'AppliedActionRight', group: string, name: string, value: boolean }>, allAppliedMenuVisibilities: Array<{ __typename?: 'AppliedMenuVisibilities', name: string, value: boolean }>, allAppliedDataFences: Array<{ __typename: 'StoreDataFence', type: string, name: string, value: string, group: string }> }, owner: { __typename?: 'Organization', id: string, name: string } } | null | undefined };

export type TFetchLoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchLoggedInUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, gravatarHash: string, firstName: string, lastName: string, language: string, numberFormat: string, timeZone?: string | null | undefined, launchdarklyTrackingId: string, launchdarklyTrackingGroup: string, launchdarklyTrackingSubgroup?: string | null | undefined, launchdarklyTrackingTeam?: Array<string> | null | undefined, launchdarklyTrackingTenant: string, defaultProjectKey?: string | null | undefined, businessRole?: string | null | undefined, projects: { __typename?: 'ProjectQueryResult', total: number, results: Array<{ __typename?: 'Project', name: string, key: string, suspension: { __typename?: 'ProjectSuspension', isActive: boolean }, expiry: { __typename?: 'ProjectExpiry', isActive: boolean } }> } } | null | undefined };

export type TFetchUserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchUserProjectsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, projects: { __typename?: 'ProjectQueryResult', results: Array<{ __typename?: 'Project', name: string, key: string, suspension: { __typename?: 'ProjectSuspension', isActive: boolean }, expiry: { __typename?: 'ProjectExpiry', isActive: boolean } }> } } | null | undefined };

export type TAllFeaturesQueryVariables = Exact<{ [key: string]: never; }>;


export type TAllFeaturesQuery = { __typename?: 'Query', allFeatures: Array<{ __typename?: 'Feature', name: string, value: boolean, reason?: string | null | undefined }> };

export type TFetchUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchUserIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string } | null | undefined };
