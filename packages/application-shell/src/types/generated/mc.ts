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

export type TAdditionalUserInfo = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type TAppliedActionRight = {
  __typename?: 'AppliedActionRight';
  name: Scalars['String'];
  group: Scalars['String'];
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
  key: Scalars['String'];
  allLocaleLabels: Array<Maybe<TLocalizedField>>;
};

export type TChangeUserBusinessRole = {
  businessRole: Maybe<Scalars['String']>;
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
  jwt: Maybe<Scalars['String']>;
};

export type TDeletedUser = {
  __typename?: 'DeletedUser';
  id: Scalars['String'];
};

export type TFeature = {
  __typename?: 'Feature';
  name: Scalars['String'];
  value: Scalars['Boolean'];
};

export type TInvitationInput = {
  emails: Array<Scalars['String']>;
  organization: TInvitationOrganizationInput;
  team: TInvitationTeamInput;
};

export type TInvitationOrganizationInput = {
  id: Scalars['ID'];
  version: Scalars['Int'];
  name: Maybe<Scalars['String']>;
};

/**
 * Note: you can not brute-force fetch user information
 * by trying emails. Only information about the membership itself.
 */
export type TInvitationQueryResult = {
  __typename?: 'InvitationQueryResult';
  version: Scalars['Int'];
  isAlreadyAMemberOfTeam: Scalars['Boolean'];
  isKnownUser: Scalars['Boolean'];
  hasValidEmail: Scalars['Boolean'];
  gravatarHash: Maybe<Scalars['String']>;
};

export type TInvitationResult = {
  __typename?: 'InvitationResult';
  status: TInvitationStatus;
  email: Scalars['String'];
  jwt: Maybe<Scalars['String']>;
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
  version: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  lastModifiedAt: Scalars['String'];
};

export type TMutation = {
  __typename?: 'Mutation';
  random: Scalars['String'];
  updateUser: TUser;
  invite: Array<TInvitationResult>;
  createMyProject: Maybe<TProjectPendingCreation>;
  createMyOrganization: Maybe<TOrganizationCreated>;
  sendLinkToResetPassword: Maybe<TResetPasswordRequest>;
  resetPassword: TResetUser;
  sendLinkToSignUp: Maybe<TSignUpRequest>;
  signUp: TSignedUpUser;
  sendLinkToDeleteAccount: Maybe<TDeleteAccountRequest>;
  deleteAccount: TDeletedUser;
  createOAuthClient: TOAuthClient;
  deleteOAuthClient: TOAuthClient;
};


export type TMutation_RandomArgs = {
  byteLength: Scalars['Int'];
};


export type TMutation_UpdateUserArgs = {
  version: Scalars['Int'];
  actions: Array<TUserUpdateAction>;
};


export type TMutation_InviteArgs = {
  draft: TInvitationInput;
  origin: Maybe<Scalars['String']>;
};


export type TMutation_CreateMyProjectArgs = {
  draft: TProjectDraftType;
  myPermission: TMyPermissionInitializationInput;
};


export type TMutation_CreateMyOrganizationArgs = {
  draft: TOrganizationDraftType;
};


export type TMutation_SendLinkToResetPasswordArgs = {
  email: Scalars['String'];
  origin: Maybe<Scalars['String']>;
};


export type TMutation_ResetPasswordArgs = {
  jwt: Scalars['String'];
  draft: TResetPasswordDraft;
  origin: Maybe<Scalars['String']>;
};


export type TMutation_SendLinkToSignUpArgs = {
  email: Scalars['String'];
  language: Maybe<Scalars['String']>;
  origin: Maybe<Scalars['String']>;
  additionalInfo: Maybe<TAdditionalUserInfo>;
};


export type TMutation_SignUpArgs = {
  jwt: Scalars['String'];
  draft: TUserDraft;
  trackingConfigs: Maybe<Array<TTrackingConfig>>;
};


export type TMutation_SendLinkToDeleteAccountArgs = {
  origin: Maybe<Scalars['String']>;
};


export type TMutation_DeleteAccountArgs = {
  jwt: Scalars['String'];
  origin: Maybe<Scalars['String']>;
};


export type TMutation_CreateOAuthClientArgs = {
  draft: TOAuthClientCreationInput;
};


export type TMutation_DeleteOAuthClientArgs = {
  id: Scalars['ID'];
};

export type TMyPermissionInitializationInput = {
  teamId: Scalars['String'];
};

export type TOAuthClient = {
  __typename?: 'OAuthClient';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Maybe<Scalars['String']>;
  lastUsedAt: Maybe<Scalars['String']>;
  secret: Scalars['String'];
  ownerId: Scalars['ID'];
  permissions: Array<TProjectPermission>;
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
  total: Scalars['Int'];
  results: Array<TOAuthClient>;
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
  id: Scalars['ID'];
  /** @deprecated This field will be removed in the future. */
  createdAt: Scalars['String'];
  /** @deprecated This field will be removed in the future. */
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
 *   This is not a `Organization` type as in the future MC schema will not support
 * e.g. expanding on team members on its internal schema.
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
  ManageCustomers = 'manage_customers',
  ManageDiscountCodes = 'manage_discount_codes',
  ManageExtensions = 'manage_extensions',
  ManageGlobalSubscriptions = 'manage_global_subscriptions',
  ManageImportSinks = 'manage_import_sinks',
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
  ManageShoppingLists = 'manage_shopping_lists',
  ManageStates = 'manage_states',
  ManageStores = 'manage_stores',
  ManageSubscriptions = 'manage_subscriptions',
  ManageTypes = 'manage_types',
  ManageCustomerGroups = 'manage_customer_groups',
  ManageCartDiscounts = 'manage_cart_discounts',
  ManageShippingMethods = 'manage_shipping_methods',
  ManageTaxCategories = 'manage_tax_categories',
  ViewApiClients = 'view_api_clients',
  ViewCustomers = 'view_customers',
  ViewDiscountCodes = 'view_discount_codes',
  ViewImportSinks = 'view_import_sinks',
  ViewMessages = 'view_messages',
  ViewOrderEdits = 'view_order_edits',
  ViewOrders = 'view_orders',
  ViewPayments = 'view_payments',
  ViewProducts = 'view_products',
  ViewPublishedProducts = 'view_published_products',
  ViewProjectSettings = 'view_project_settings',
  ViewProjects = 'view_projects',
  ViewShoppingLists = 'view_shopping_lists',
  ViewStates = 'view_states',
  ViewStores = 'view_stores',
  ViewTypes = 'view_types',
  ViewCustomerGroups = 'view_customer_groups',
  ViewCartDiscounts = 'view_cart_discounts',
  ViewShippingMethods = 'view_shipping_methods',
  ViewTaxCategories = 'view_tax_categories',
  ManageCategories = 'manage_categories',
  ViewCategories = 'view_categories'
}

export type TProject = TMetaData & {
  __typename?: 'Project';
  version: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  lastModifiedAt: Scalars['String'];
  apiVersion: Scalars['String'];
  countries: Array<Scalars['String']>;
  currencies: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  isProductionProject: Scalars['Boolean'];
  initialized: Scalars['Boolean'];
  plan: Scalars['String'];
  key: Scalars['String'];
  name: Scalars['String'];
  owner: TOrganization;
  suspension: TProjectSuspension;
  expiry: TProjectExpiry;
  settings: Maybe<TProjectSetting>;
  shippingRateInputType: Maybe<TShippingRateInputType>;
  allAppliedPermissions: Array<TAppliedPermission>;
  allAppliedDataFences: Array<TAppliedDataFence>;
  allAppliedActionRights: Array<TAppliedActionRight>;
  allAppliedMenuVisibilities: Array<TAppliedMenuVisibilities>;
};

export type TProjectDraftType = {
  key: Scalars['String'];
  name: Scalars['String'];
  countries: Array<Scalars['String']>;
  languages: Array<Scalars['String']>;
  currencies: Array<Scalars['String']>;
  ownerId: Scalars['String'];
  messagesEnabled: Maybe<Scalars['Boolean']>;
  deleteDaysAfterCreation: Maybe<Scalars['Int']>;
};

export type TProjectExpiry = {
  __typename?: 'ProjectExpiry';
  isActive: Scalars['Boolean'];
  daysLeft: Maybe<Scalars['Int']>;
};

export type TProjectPendingCreation = {
  __typename?: 'ProjectPendingCreation';
  id: Scalars['String'];
  key: Scalars['String'];
  version: Scalars['Int'];
  name: Scalars['String'];
};

export type TProjectPermission = {
  __typename?: 'ProjectPermission';
  key: TPermissionScope;
  projectKey: Maybe<Scalars['String']>;
  storeKey: Maybe<Scalars['String']>;
};

export type TProjectPermissionInput = {
  key: TPermissionScope;
  projectKey: Maybe<Scalars['String']>;
  storeKey: Maybe<Scalars['String']>;
};

export type TProjectQueryResult = TQueryResult & {
  __typename?: 'ProjectQueryResult';
  count: Scalars['Int'];
  offset: Scalars['Int'];
  total: Scalars['Int'];
  results: Array<TProject>;
};

export type TProjectSetting = TMetaData & {
  __typename?: 'ProjectSetting';
  id: Scalars['ID'];
  version: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  lastModifiedAt: Scalars['String'];
  projectId: Scalars['String'];
  projectKey: Scalars['String'];
  user: Scalars['String'];
  active: Scalars['String'];
  productSettings: Array<Maybe<Scalars['String']>>;
  currentProductSettings: Maybe<Scalars['String']>;
};

export type TProjectSuspension = {
  __typename?: 'ProjectSuspension';
  isActive: Scalars['Boolean'];
  reason: Maybe<TProjectSuspensionReason>;
};

export enum TProjectSuspensionReason {
  Other = 'Other',
  Payment = 'Payment',
  TemporaryMaintenance = 'TemporaryMaintenance'
}

export type TQuery = {
  __typename?: 'Query';
  release: Maybe<Scalars['String']>;
  amILoggedIn: Scalars['Boolean'];
  me: Maybe<TUser>;
  project: Maybe<TProject>;
  invitation: Maybe<TInvitationQueryResult>;
  allSupportedResources: Maybe<Array<TSupportedResource>>;
  allSupportedActionRights: Maybe<Array<TSupportedActionRight>>;
  allSupportedStoreScopes: Maybe<Array<TSupportedStoreScope>>;
  allSupportedMenuVisibilities: Maybe<Array<TSupportedMenuVisibility>>;
  allSupportedOAuthScopes: Array<Scalars['String']>;
  allImpliedOAuthScopes: Array<Scalars['String']>;
  releases: Maybe<TReleaseHistory>;
  oAuthClient: Maybe<TOAuthClient>;
  oAuthClients: TOAuthClientQueryResult;
  oAuthScopes: Array<TPermissionScope>;
  storeOAuthScopes: Array<TPermissionScope>;
  oAuthClientTemplates: Array<TOAuthClientTemplate>;
  allFeatures: Array<TFeature>;
};


export type TQuery_ProjectArgs = {
  key: Maybe<Scalars['String']>;
};


export type TQuery_InvitationArgs = {
  where: Maybe<TInvitationWhereInput>;
};


export type TQuery_AllImpliedOAuthScopesArgs = {
  resourceAccessPermissions: Array<Scalars['String']>;
};


export type TQuery_ReleasesArgs = {
  origin: TReleaseOrigin;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_OAuthClientArgs = {
  id: Scalars['String'];
};


export type TQuery_OAuthClientsArgs = {
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TQueryResult = {
  count: Scalars['Int'];
  offset: Scalars['Int'];
  total: Scalars['Int'];
};

export type TReference = {
  __typename?: 'Reference';
  typeId: Scalars['String'];
  id: Scalars['String'];
};

export type TReferenceInput = {
  typeId: Scalars['String'];
  id: Scalars['ID'];
};

export type TReleaseEntry = {
  __typename?: 'ReleaseEntry';
  guid: Scalars['String'];
  releasedAt: Scalars['String'];
  title: Scalars['String'];
  link: Scalars['String'];
  description: Scalars['String'];
};

export type TReleaseHistory = {
  __typename?: 'ReleaseHistory';
  title: Scalars['String'];
  description: Scalars['String'];
  link: Scalars['String'];
  entries: TReleaseQueryResult;
};


export type TReleaseHistory_EntriesArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export enum TReleaseOrigin {
  Ctp = 'ctp',
  Mc = 'mc'
}

export type TReleaseQueryResult = TQueryResult & {
  __typename?: 'ReleaseQueryResult';
  count: Scalars['Int'];
  offset: Scalars['Int'];
  total: Scalars['Int'];
  results: Array<TReleaseEntry>;
};

export type TResetPasswordDraft = {
  password: Scalars['String'];
};

export type TResetPasswordRequest = {
  __typename?: 'ResetPasswordRequest';
  jwt: Maybe<Scalars['String']>;
};

export type TResetUser = {
  __typename?: 'ResetUser';
  id: Scalars['String'];
};

export type TSetUserTimeZone = {
  /** NOTE: This is optional as not passing it unsets the timezone. */
  timeZone: Maybe<Scalars['String']>;
};

export type TShippingRateInputType = {
  __typename?: 'ShippingRateInputType';
  type: TShippingRateType;
  values: Maybe<Array<Maybe<TCartClassificationValue>>>;
};

export enum TShippingRateType {
  CartClassification = 'CartClassification',
  CartScore = 'CartScore',
  CartValue = 'CartValue'
}

export type TSignedUpUser = {
  __typename?: 'SignedUpUser';
  id: Scalars['String'];
};

export type TSignUpRequest = {
  __typename?: 'SignUpRequest';
  jwt: Maybe<Scalars['String']>;
};

export type TStoreDataFence = TDataFence & {
  __typename?: 'StoreDataFence';
  value: Scalars['String'];
  name: Scalars['String'];
  group: Scalars['String'];
  type: Scalars['String'];
};

export type TSupportedActionRight = {
  __typename?: 'SupportedActionRight';
  name: Scalars['String'];
  group: Scalars['String'];
};

export type TSupportedMenuVisibility = {
  __typename?: 'SupportedMenuVisibility';
  name: Scalars['String'];
  group: Scalars['String'];
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

export type TTrackingConfig = {
  provider: TTrackingProvider;
  context: Scalars['String'];
};

export enum TTrackingProvider {
  HubSpot = 'HubSpot'
}

export type TUser = TMetaData & {
  __typename?: 'User';
  id: Scalars['ID'];
  version: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  lastModifiedAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  language: Scalars['String'];
  numberFormat: Scalars['String'];
  timeZone: Maybe<Scalars['String']>;
  launchdarklyTrackingId: Scalars['String'];
  launchdarklyTrackingGroup: Scalars['String'];
  launchdarklyTrackingSubgroup: Maybe<Scalars['String']>;
  launchdarklyTrackingTeam: Maybe<Array<Scalars['String']>>;
  launchdarklyTrackingTenant: Scalars['String'];
  gravatarHash: Scalars['String'];
  defaultProjectKey: Maybe<Scalars['String']>;
  projects: TProjectQueryResult;
  businessRole: Maybe<Scalars['String']>;
};

export type TUserDraft = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  businessRole: Maybe<Scalars['String']>;
};

export type TUserUpdateAction = {
  changeName: Maybe<TChangeUserName>;
  changePassword: Maybe<TChangeUserPassword>;
  changeLanguage: Maybe<TChangeUserLanguage>;
  changeNumberFormat: Maybe<TChangeUserNumberFormat>;
  setTimeZone: Maybe<TSetUserTimeZone>;
  changeBusinessRole: Maybe<TChangeUserBusinessRole>;
};

export type TAmILoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type TAmILoggedInQuery = (
  { __typename?: 'Query' }
  & Pick<TQuery, 'amILoggedIn'>
);

export type TFetchProjectQueryVariables = Exact<{
  projectKey: Scalars['String'];
}>;


export type TFetchProjectQuery = (
  { __typename?: 'Query' }
  & { project: Maybe<(
    { __typename?: 'Project' }
    & Pick<TProject, 'key' | 'version' | 'name' | 'countries' | 'currencies' | 'languages' | 'initialized'>
    & { expiry: (
      { __typename?: 'ProjectExpiry' }
      & Pick<TProjectExpiry, 'isActive' | 'daysLeft'>
    ), suspension: (
      { __typename?: 'ProjectSuspension' }
      & Pick<TProjectSuspension, 'isActive' | 'reason'>
    ), allAppliedPermissions: Array<(
      { __typename?: 'AppliedPermission' }
      & Pick<TAppliedPermission, 'name' | 'value'>
    )>, allAppliedActionRights: Array<(
      { __typename?: 'AppliedActionRight' }
      & Pick<TAppliedActionRight, 'group' | 'name' | 'value'>
    )>, allAppliedMenuVisibilities: Array<(
      { __typename?: 'AppliedMenuVisibilities' }
      & Pick<TAppliedMenuVisibilities, 'name' | 'value'>
    )>, allAppliedDataFences: Array<(
      { __typename: 'StoreDataFence' }
      & Pick<TStoreDataFence, 'type' | 'name' | 'value' | 'group'>
    )>, owner: (
      { __typename?: 'Organization' }
      & Pick<TOrganization, 'id' | 'name'>
    ) }
  )> }
);

export type TFetchLoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchLoggedInUserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<TUser, 'id' | 'email' | 'gravatarHash' | 'firstName' | 'lastName' | 'language' | 'numberFormat' | 'timeZone' | 'launchdarklyTrackingId' | 'launchdarklyTrackingGroup' | 'launchdarklyTrackingSubgroup' | 'launchdarklyTrackingTeam' | 'launchdarklyTrackingTenant' | 'defaultProjectKey' | 'businessRole'>
    & { projects: (
      { __typename?: 'ProjectQueryResult' }
      & Pick<TProjectQueryResult, 'total'>
      & { results: Array<(
        { __typename?: 'Project' }
        & Pick<TProject, 'name' | 'key'>
        & { suspension: (
          { __typename?: 'ProjectSuspension' }
          & Pick<TProjectSuspension, 'isActive'>
        ), expiry: (
          { __typename?: 'ProjectExpiry' }
          & Pick<TProjectExpiry, 'isActive'>
        ) }
      )> }
    ) }
  )> }
);

export type TFetchUserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchUserProjectsQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<TUser, 'id'>
    & { projects: (
      { __typename?: 'ProjectQueryResult' }
      & { results: Array<(
        { __typename?: 'Project' }
        & Pick<TProject, 'name' | 'key'>
        & { suspension: (
          { __typename?: 'ProjectSuspension' }
          & Pick<TProjectSuspension, 'isActive'>
        ), expiry: (
          { __typename?: 'ProjectExpiry' }
          & Pick<TProjectExpiry, 'isActive'>
        ) }
      )> }
    ) }
  )> }
);

export type TFetchUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchUserIdQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<TUser, 'id'>
  )> }
);
