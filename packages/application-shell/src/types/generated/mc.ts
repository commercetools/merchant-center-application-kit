export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};





export type TAppliedActionRight = {
   __typename?: 'AppliedActionRight',
  name: Scalars['String'],
  group: Scalars['String'],
  value: Scalars['Boolean'],
};

export type TAppliedDataFence = TStoreDataFence;

export type TAppliedMenuVisibilities = {
   __typename?: 'AppliedMenuVisibilities',
  name: Scalars['String'],
  value: Scalars['Boolean'],
};

export type TAppliedPermission = {
   __typename?: 'AppliedPermission',
  name: Scalars['String'],
  value: Scalars['Boolean'],
};

export type TCartClassificationValue = {
   __typename?: 'CartClassificationValue',
  key: Scalars['String'],
  allLocaleLabels: Array<Maybe<TLocalizedField>>,
};

export type TChangeUserLanguage = {
  language: Scalars['String'],
};

/** NOTE: This is _not_ a username it is the user's name. */
export type TChangeUserName = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
};

export type TChangeUserNumberFormat = {
  numberFormat: Scalars['String'],
};

export type TChangeUserPassword = {
  password: Scalars['String'],
};

export type TDataFence = {
  type: Scalars['String'],
};

export type TDeleteAccountRequest = {
   __typename?: 'DeleteAccountRequest',
  jwt: Maybe<Scalars['String']>,
};

export type TDeletedUser = {
   __typename?: 'DeletedUser',
  id: Scalars['String'],
};

export type TInvitationInput = {
  emails: Array<Scalars['String']>,
  organization: TInvitationOrganizationInput,
  team: TInvitationTeamInput,
};

export type TInvitationOrganizationInput = {
  id: Scalars['ID'],
  version: Scalars['Int'],
};

/** 
 * Note: you can not brute-force fetch user information
 * by trying emails. Only information about the membership itself.
 **/
export type TInvitationQueryResult = {
   __typename?: 'InvitationQueryResult',
  version: Scalars['Int'],
  isAlreadyAMemberOfTeam: Scalars['Boolean'],
  isKnownUser: Scalars['Boolean'],
  hasValidEmail: Scalars['Boolean'],
  gravatarHash: Maybe<Scalars['String']>,
};

export type TInvitationResult = {
   __typename?: 'InvitationResult',
  status: TInvitationStatus,
  email: Scalars['String'],
  jwt: Maybe<Scalars['String']>,
};

export enum TInvitationStatus {
  InvitationFailure = 'InvitationFailure',
  InvitationSent = 'InvitationSent',
  PendingRegistration = 'PendingRegistration'
}

export type TInvitationTeamInput = {
  id: Scalars['ID'],
};

export type TInvitationWhereInput = {
  email: Scalars['String'],
  organizationId: Scalars['ID'],
  teamId: Scalars['ID'],
};

export type TLocalizedField = {
   __typename?: 'LocalizedField',
  locale: Scalars['String'],
  value: Scalars['String'],
};

export type TMetaData = {
  id: Scalars['ID'],
  version: Maybe<Scalars['Int']>,
  createdAt: Scalars['String'],
  lastModifiedAt: Scalars['String'],
};

export type TMutation = {
   __typename?: 'Mutation',
  random: Scalars['String'],
  updateUser: TUser,
  invite: Maybe<Array<TInvitationResult>>,
  importSampleData: Maybe<Scalars['Boolean']>,
  createMyProject: Maybe<TProjectPendingCreation>,
  createMyOrganization: Maybe<TOrganizationCreated>,
  sendLinkToResetPassword: Maybe<TResetPasswordRequest>,
  resetPassword: TUser,
  sendLinkToSignUp: Maybe<TSignUpRequest>,
  signUp: TUser,
  sendLinkToDeleteAccount: Maybe<TDeleteAccountRequest>,
  deleteAccount: TDeletedUser,
  createOAuthClient: TOAuthClient,
  deleteOAuthClient: TOAuthClient,
};


export type TMutation_RandomArgs = {
  byteLength: Scalars['Int']
};


export type TMutation_UpdateUserArgs = {
  version: Scalars['Int'],
  actions: Array<TUserUpdateAction>
};


export type TMutation_InviteArgs = {
  draft: TInvitationInput,
  origin: Maybe<Scalars['String']>
};


export type TMutation_ImportSampleDataArgs = {
  key: Scalars['String']
};


export type TMutation_CreateMyProjectArgs = {
  draft: TProjectDraftType,
  myPermission: Maybe<TMyPermissionInitializationInput>
};


export type TMutation_CreateMyOrganizationArgs = {
  draft: TOrganizationDraftType,
  myPermission: Maybe<TMyPermissionInitializationInput>
};


export type TMutation_SendLinkToResetPasswordArgs = {
  email: Scalars['String'],
  origin: Maybe<Scalars['String']>
};


export type TMutation_ResetPasswordArgs = {
  jwt: Scalars['String'],
  draft: TResetPasswordDraft
};


export type TMutation_SendLinkToSignUpArgs = {
  email: Scalars['String'],
  language: Maybe<Scalars['String']>,
  origin: Maybe<Scalars['String']>
};


export type TMutation_SignUpArgs = {
  jwt: Scalars['String'],
  draft: TUserDraft,
  trackingConfigs: Maybe<Array<TTrackingConfig>>
};


export type TMutation_SendLinkToDeleteAccountArgs = {
  origin: Maybe<Scalars['String']>
};


export type TMutation_DeleteAccountArgs = {
  jwt: Scalars['String'],
  origin: Maybe<Scalars['String']>
};


export type TMutation_CreateOAuthClientArgs = {
  draft: TOAuthClientCreationInput
};


export type TMutation_DeleteOAuthClientArgs = {
  id: Scalars['ID']
};

export type TMyPermissionInitializationInput = {
  isEnabled: Maybe<Scalars['Boolean']>,
  teamId: Maybe<Scalars['String']>,
};

export type TOAuthClient = {
   __typename?: 'OAuthClient',
  id: Scalars['ID'],
  name: Scalars['String'],
  createdAt: Maybe<Scalars['String']>,
  lastUsedAt: Maybe<Scalars['String']>,
  secret: Scalars['String'],
  ownerId: Scalars['ID'],
  permissions: Array<TProjectPermission>,
};

export type TOAuthClientCreationInput = {
  name: Scalars['String'],
  ownerId: Scalars['ID'],
  permissions: Array<TProjectPermissionInput>,
};

export type TOAuthClientQueryResult = TQueryResult & {
   __typename?: 'OAuthClientQueryResult',
  count: Scalars['Int'],
  offset: Scalars['Int'],
  total: Scalars['Int'],
  results: Array<TOAuthClient>,
};

export type TOAuthClientTemplate = {
   __typename?: 'OAuthClientTemplate',
  key: Scalars['String'],
  oAuthScopes: Array<TPermissionScope>,
};

export type TOrganization = TMetaData & {
   __typename?: 'Organization',
  id: Scalars['ID'],
  version: Maybe<Scalars['Int']>,
  createdAt: Scalars['String'],
  lastModifiedAt: Scalars['String'],
  name: Scalars['String'],
  teams: TTeamQueryResult,
  teamsCount: Scalars['Int'],
};

export type TOrganizationCreated = {
   __typename?: 'OrganizationCreated',
  id: Scalars['String'],
  name: Scalars['String'],
  teams: Array<TOrganizationTeamsCreated>,
};

export type TOrganizationDraftType = {
  name: Scalars['String'],
  ownerId: Scalars['String'],
};

export type TOrganizationQueryResult = TQueryResult & {
   __typename?: 'OrganizationQueryResult',
  count: Scalars['Int'],
  offset: Scalars['Int'],
  total: Scalars['Int'],
  results: Array<TOrganization>,
};

/** 
 * Note:
 *   This is not a `Organization` type as in the future MC schema will not support
 * e.g. expanding on team members on its internal schema.
 **/
export type TOrganizationTeamsCreated = {
   __typename?: 'OrganizationTeamsCreated',
  id: Scalars['String'],
  name: Scalars['String'],
};

export enum TPermissionScope {
  CreateAnonymousToken = 'create_anonymous_token',
  GetPermissionForAnyProject = 'get_permission_for_any_project',
  IntrospectOauthTokens = 'introspect_oauth_tokens',
  ManageApiClients = 'manage_api_clients',
  ManageCustomers = 'manage_customers',
  ManageExtensions = 'manage_extensions',
  ManageGlobalSubscriptions = 'manage_global_subscriptions',
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
  ViewApiClients = 'view_api_clients',
  ViewCustomers = 'view_customers',
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
  ViewTypes = 'view_types'
}

export type TProject = TMetaData & {
   __typename?: 'Project',
  id: Scalars['ID'],
  version: Maybe<Scalars['Int']>,
  createdAt: Scalars['String'],
  lastModifiedAt: Scalars['String'],
  apiVersion: Scalars['String'],
  countries: Array<Maybe<Scalars['String']>>,
  currencies: Array<Maybe<Scalars['String']>>,
  languages: Array<Maybe<Scalars['String']>>,
  isProductionProject: Scalars['Boolean'],
  initialized: Scalars['Boolean'],
  plan: Scalars['String'],
  key: Scalars['String'],
  name: Scalars['String'],
  owner: TOrganization,
  suspension: TProjectSuspension,
  expiry: TProjectExpiry,
  permissions: TProjectPermissions,
  settings: Maybe<TProjectSetting>,
  shippingRateInputType: Maybe<TShippingRateInputType>,
  allAppliedPermissions: Array<Maybe<TAppliedPermission>>,
  allAppliedDataFences: Array<Maybe<TAppliedDataFence>>,
  allAppliedActionRights: Array<Maybe<TAppliedActionRight>>,
  allAppliedMenuVisibilities: Array<Maybe<TAppliedMenuVisibilities>>,
};

export type TProjectDraftType = {
  key: Scalars['String'],
  name: Scalars['String'],
  countries: Array<Scalars['String']>,
  languages: Array<Scalars['String']>,
  currencies: Array<Scalars['String']>,
  ownerId: Scalars['String'],
  messagesEnabled: Maybe<Scalars['Boolean']>,
  deleteDaysAfterCreation: Maybe<Scalars['Int']>,
};

export type TProjectExpiry = {
   __typename?: 'ProjectExpiry',
  isActive: Scalars['Boolean'],
  daysLeft: Maybe<Scalars['Int']>,
};

export type TProjectPendingCreation = {
   __typename?: 'ProjectPendingCreation',
  id: Scalars['String'],
  key: Scalars['String'],
  version: Scalars['Int'],
  name: Scalars['String'],
};

export type TProjectPermission = {
   __typename?: 'ProjectPermission',
  key: TPermissionScope,
  projectKey: Maybe<Scalars['String']>,
  storeKey: Maybe<Scalars['String']>,
};

export type TProjectPermissionInput = {
  key: TPermissionScope,
  projectKey: Maybe<Scalars['String']>,
  storeKey: Maybe<Scalars['String']>,
};

export type TProjectPermissions = {
   __typename?: 'ProjectPermissions',
  canAddCategories: Scalars['Boolean'],
  canAddCustomerGroups: Scalars['Boolean'],
  canAddCustomers: Scalars['Boolean'],
  canAddDiscountCodes: Scalars['Boolean'],
  canAddOrders: Scalars['Boolean'],
  canAddPrices: Scalars['Boolean'],
  canAddProducts: Scalars['Boolean'],
  canCreateAnonymousToken: Scalars['Boolean'],
  canDeletePrices: Scalars['Boolean'],
  canDeleteProducts: Scalars['Boolean'],
  canEditPrices: Scalars['Boolean'],
  canIntrospectOauthTokens: Scalars['Boolean'],
  canManageApiClients: Scalars['Boolean'],
  canManageCustomers: Scalars['Boolean'],
  canManageExtensions: Scalars['Boolean'],
  canManageMyOrders: Scalars['Boolean'],
  canManageMyPayments: Scalars['Boolean'],
  canManageMyProfile: Scalars['Boolean'],
  canManageMyShoppingLists: Scalars['Boolean'],
  canManageOrderEdits: Scalars['Boolean'],
  canManageOrders: Scalars['Boolean'],
  canManageOrganization: Scalars['Boolean'],
  canManagePayments: Scalars['Boolean'],
  canManageProducts: Scalars['Boolean'],
  canManageProject: Scalars['Boolean'],
  canManageShoppingLists: Scalars['Boolean'],
  canManageStates: Scalars['Boolean'],
  canManageSubscriptions: Scalars['Boolean'],
  canManageTypes: Scalars['Boolean'],
  canPublishProducts: Scalars['Boolean'],
  canUnpublishProducts: Scalars['Boolean'],
  canViewApiClients: Scalars['Boolean'],
  canViewCartDiscounts: Scalars['Boolean'],
  canViewCategories: Scalars['Boolean'],
  canViewCategoriesList: Scalars['Boolean'],
  canViewCategoriesSearch: Scalars['Boolean'],
  canViewCustomApplications: Scalars['Boolean'],
  canViewCustomerGroups: Scalars['Boolean'],
  canViewCustomers: Scalars['Boolean'],
  canViewCustomersList: Scalars['Boolean'],
  canViewDashboard: Scalars['Boolean'],
  canViewDeveloperSettings: Scalars['Boolean'],
  canViewDirectAccess: Scalars['Boolean'],
  canViewDiscountCodes: Scalars['Boolean'],
  canViewDiscounts: Scalars['Boolean'],
  canViewDiscountsList: Scalars['Boolean'],
  canViewMessages: Scalars['Boolean'],
  canViewModifiedProducts: Scalars['Boolean'],
  canViewOrderEdits: Scalars['Boolean'],
  canViewOrders: Scalars['Boolean'],
  canViewOrdersList: Scalars['Boolean'],
  canViewPayments: Scalars['Boolean'],
  canViewPimSearch: Scalars['Boolean'],
  canViewProductDiscounts: Scalars['Boolean'],
  canViewProducts: Scalars['Boolean'],
  canViewProductsList: Scalars['Boolean'],
  canViewProductTypes: Scalars['Boolean'],
  canViewProjectSettings: Scalars['Boolean'],
  canViewProjectSettingsMisc: Scalars['Boolean'],
  canViewSettings: Scalars['Boolean'],
  canViewShoppingLists: Scalars['Boolean'],
  canViewStates: Scalars['Boolean'],
  canViewTypes: Scalars['Boolean'],
  canViewShippingLists: Scalars['Boolean'],
  canManageShippingLists: Scalars['Boolean'],
};

export type TProjectQueryResult = TQueryResult & {
   __typename?: 'ProjectQueryResult',
  count: Scalars['Int'],
  offset: Scalars['Int'],
  total: Scalars['Int'],
  results: Array<TProject>,
};

export type TProjectSetting = TMetaData & {
   __typename?: 'ProjectSetting',
  id: Scalars['ID'],
  version: Maybe<Scalars['Int']>,
  createdAt: Scalars['String'],
  lastModifiedAt: Scalars['String'],
  projectId: Scalars['String'],
  projectKey: Scalars['String'],
  user: Scalars['String'],
  active: Scalars['String'],
  productSettings: Array<Maybe<Scalars['String']>>,
  currentProductSettings: Maybe<Scalars['String']>,
};

export type TProjectSuspension = {
   __typename?: 'ProjectSuspension',
  isActive: Scalars['Boolean'],
  reason: Maybe<TProjectSuspensionReason>,
};

export enum TProjectSuspensionReason {
  Other = 'Other',
  Payment = 'Payment',
  TemporaryMaintenance = 'TemporaryMaintenance'
}

export type TQuery = {
   __typename?: 'Query',
  release: Maybe<Scalars['String']>,
  amILoggedIn: Scalars['Boolean'],
  me: Maybe<TUser>,
  project: Maybe<TProject>,
  organization: Maybe<TOrganization>,
  /** 
 * Note: A `team` query exists as we do not always want to load
   * all teams of an organization just to retrieve all their members
   * to display them.
 **/
  team: Maybe<TTeam>,
  invitation: Maybe<TInvitationQueryResult>,
  allSupportedResources: Maybe<Array<TSupportedResource>>,
  allSupportedActionRights: Maybe<Array<TSupportedActionRight>>,
  allSupportedMenuVisibilities: Maybe<Array<TSupportedMenuVisibility>>,
  allImpliedOAuthScopes: Array<Scalars['String']>,
  releases: Maybe<TReleaseHistory>,
  oAuthClient: Maybe<TOAuthClient>,
  oAuthClients: TOAuthClientQueryResult,
  oAuthScopes: Array<TPermissionScope>,
  oAuthClientTemplates: Array<TOAuthClientTemplate>,
};


export type TQuery_ProjectArgs = {
  key: Maybe<Scalars['String']>
};


export type TQuery_OrganizationArgs = {
  id: Scalars['ID']
};


export type TQuery_TeamArgs = {
  organizationId: Scalars['ID'],
  teamId: Scalars['ID']
};


export type TQuery_InvitationArgs = {
  where: Maybe<TInvitationWhereInput>
};


export type TQuery_AllImpliedOAuthScopesArgs = {
  resourceAccessPermissions: Array<Scalars['String']>
};


export type TQuery_ReleasesArgs = {
  origin: TReleaseOrigin,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_OAuthClientArgs = {
  id: Scalars['String']
};


export type TQuery_OAuthClientsArgs = {
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TQueryResult = {
  count: Scalars['Int'],
  offset: Scalars['Int'],
  total: Scalars['Int'],
};

export type TReferenceInput = {
  typeId: Scalars['String'],
  id: Scalars['ID'],
};

export type TReleaseEntry = {
   __typename?: 'ReleaseEntry',
  guid: Scalars['String'],
  releasedAt: Scalars['String'],
  title: Scalars['String'],
  link: Scalars['String'],
  description: Scalars['String'],
};

export type TReleaseHistory = {
   __typename?: 'ReleaseHistory',
  title: Scalars['String'],
  description: Scalars['String'],
  link: Scalars['String'],
  entries: TReleaseQueryResult,
};


export type TReleaseHistory_EntriesArgs = {
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export enum TReleaseOrigin {
  Ctp = 'ctp',
  Mc = 'mc'
}

export type TReleaseQueryResult = TQueryResult & {
   __typename?: 'ReleaseQueryResult',
  count: Scalars['Int'],
  offset: Scalars['Int'],
  total: Scalars['Int'],
  results: Array<TReleaseEntry>,
};

export type TResetPasswordDraft = {
  password: Scalars['String'],
};

export type TResetPasswordRequest = {
   __typename?: 'ResetPasswordRequest',
  jwt: Maybe<Scalars['String']>,
};

export type TSetUserTimeZone = {
  /** NOTE: This is optional as not passing it unsets the timezone. */
  timeZone: Maybe<Scalars['String']>,
};

export type TShippingRateInputType = {
   __typename?: 'ShippingRateInputType',
  type: TShippingRateType,
  values: Maybe<Array<Maybe<TCartClassificationValue>>>,
};

export enum TShippingRateType {
  CartClassification = 'CartClassification',
  CartScore = 'CartScore',
  CartValue = 'CartValue'
}

export type TSignUpRequest = {
   __typename?: 'SignUpRequest',
  jwt: Maybe<Scalars['String']>,
};

export type TStoreDataFence = TDataFence & {
   __typename?: 'StoreDataFence',
  value: Scalars['String'],
  name: Scalars['String'],
  group: Scalars['String'],
  type: Scalars['String'],
};

export type TSupportedActionRight = {
   __typename?: 'SupportedActionRight',
  name: Scalars['String'],
  group: Scalars['String'],
};

export type TSupportedMenuVisibility = {
   __typename?: 'SupportedMenuVisibility',
  name: Scalars['String'],
  group: Scalars['String'],
};

export type TSupportedResource = {
   __typename?: 'SupportedResource',
  name: Scalars['String'],
};

export type TTeam = {
   __typename?: 'Team',
  id: Scalars['ID'],
  name: Scalars['String'],
  members: TTeamMemberQueryResult,
  permissions: Maybe<Array<TTeamPermission>>,
};

export type TTeamMember = TMetaData & {
   __typename?: 'TeamMember',
  id: Scalars['ID'],
  version: Maybe<Scalars['Int']>,
  createdAt: Scalars['String'],
  lastModifiedAt: Scalars['String'],
  email: Scalars['String'],
  gravatarHash: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  language: Scalars['String'],
  numberFormat: Scalars['String'],
};

export type TTeamMemberQueryResult = TQueryResult & {
   __typename?: 'TeamMemberQueryResult',
  count: Scalars['Int'],
  offset: Scalars['Int'],
  total: Scalars['Int'],
  results: Array<TTeamMember>,
};

export type TTeamPermission = {
   __typename?: 'TeamPermission',
  project: TProject,
  permission: Scalars['String'],
};

export type TTeamQueryResult = TQueryResult & {
   __typename?: 'TeamQueryResult',
  count: Scalars['Int'],
  offset: Scalars['Int'],
  total: Scalars['Int'],
  results: Array<TTeam>,
};

export type TTrackingConfig = {
  provider: TTrackingProvider,
  context: Scalars['String'],
};

export enum TTrackingProvider {
  HubSpot = 'HubSpot'
}

export type TUser = TMetaData & {
   __typename?: 'User',
  id: Scalars['ID'],
  version: Maybe<Scalars['Int']>,
  createdAt: Scalars['String'],
  lastModifiedAt: Scalars['String'],
  email: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  language: Scalars['String'],
  numberFormat: Scalars['String'],
  timeZone: Maybe<Scalars['String']>,
  launchdarklyTrackingId: Scalars['String'],
  launchdarklyTrackingGroup: Scalars['String'],
  launchdarklyTrackingTeam: Maybe<Array<Scalars['String']>>,
  launchdarklyTrackingTenant: Scalars['String'],
  gravatarHash: Scalars['String'],
  defaultProjectKey: Maybe<Scalars['String']>,
  organizations: TOrganizationQueryResult,
  projects: TProjectQueryResult,
  permissions: TUserPermissions,
};


export type TUser_PermissionsArgs = {
  organizationId: Maybe<Scalars['ID']>
};

export type TUserDraft = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  password: Scalars['String'],
};

export type TUserPermissions = {
   __typename?: 'UserPermissions',
  canManageOrganization: Scalars['Boolean'],
};

export type TUserUpdateAction = {
  changeName: Maybe<TChangeUserName>,
  changePassword: Maybe<TChangeUserPassword>,
  changeLanguage: Maybe<TChangeUserLanguage>,
  changeNumberFormat: Maybe<TChangeUserNumberFormat>,
  setTimeZone: Maybe<TSetUserTimeZone>,
};
export type TAmILoggedInQueryVariables = {};


export type TAmILoggedInQuery = (
  { __typename?: 'Query' }
  & Pick<TQuery, 'amILoggedIn'>
);

export type TFetchProjectQueryVariables = {
  projectKey: Scalars['String']
};


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
      & Pick<TProjectSuspension, 'isActive'>
    ), allAppliedPermissions: Array<Maybe<(
      { __typename?: 'AppliedPermission' }
      & Pick<TAppliedPermission, 'name' | 'value'>
    )>>, allAppliedActionRights: Array<Maybe<(
      { __typename?: 'AppliedActionRight' }
      & Pick<TAppliedActionRight, 'group' | 'name' | 'value'>
    )>>, allAppliedMenuVisibilities: Array<Maybe<(
      { __typename?: 'AppliedMenuVisibilities' }
      & Pick<TAppliedMenuVisibilities, 'name' | 'value'>
    )>>, allAppliedDataFences: Array<Maybe<(
      { __typename: 'StoreDataFence' }
      & Pick<TStoreDataFence, 'type' | 'name' | 'value' | 'group'>
    )>>, owner: (
      { __typename?: 'Organization' }
      & Pick<TOrganization, 'id'>
    ) }
  )> }
);

export type TFetchLoggedInUserQueryVariables = {};


export type TFetchLoggedInUserQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<TUser, 'id' | 'email' | 'gravatarHash' | 'firstName' | 'lastName' | 'language' | 'numberFormat' | 'timeZone' | 'launchdarklyTrackingId' | 'launchdarklyTrackingGroup' | 'launchdarklyTrackingTeam' | 'launchdarklyTrackingTenant' | 'defaultProjectKey'>
    & { projects: (
      { __typename?: 'ProjectQueryResult' }
      & Pick<TProjectQueryResult, 'total'>
      & { results: Array<{ __typename?: 'Project' }
        & TProjectFragmentFragment
      > }
    ) }
  )> }
);

export type TProjectFragmentFragment = (
  { __typename?: 'Project' }
  & Pick<TProject, 'name' | 'key'>
  & { suspension: (
    { __typename?: 'ProjectSuspension' }
    & Pick<TProjectSuspension, 'isActive'>
  ), expiry: (
    { __typename?: 'ProjectExpiry' }
    & Pick<TProjectExpiry, 'isActive'>
  ) }
);

export type TFetchUserProjectsQueryVariables = {};


export type TFetchUserProjectsQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<TUser, 'id'>
    & { projects: (
      { __typename?: 'ProjectQueryResult' }
      & { results: Array<{ __typename?: 'Project' }
        & TProjectFragmentFragment
      > }
    ) }
  )> }
);

export type TFetchUserIdQueryVariables = {};


export type TFetchUserIdQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<TUser, 'id'>
  )> }
);
