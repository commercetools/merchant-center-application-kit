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

export type TAdditionalUserInfo = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

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
  businessRole?: InputMaybe<Scalars['String']>;
};

export type TChangeUserLanguage = {
  language: Scalars['String'];
};

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

export type TIdTokenUserInfo = {
  __typename?: 'IdTokenUserInfo';
  additionalClaims?: Maybe<Scalars['String']>;
  aud: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  exp: Scalars['Float'];
  iat?: Maybe<Scalars['Float']>;
  iss: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  sub: Scalars['String'];
};

export type TImportResponse = {
  __typename?: 'ImportResponse';
  hasImportedSampleData?: Maybe<Scalars['Boolean']>;
  importedSampleData?: Maybe<Scalars['String']>;
  projectKey?: Maybe<Scalars['String']>;
};

export type TInvitationInput = {
  emails: Array<Scalars['String']>;
  organization: TInvitationOrganizationInput;
  team: TInvitationTeamInput;
};

export type TInvitationOrganizationInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  version: Scalars['Int'];
};

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
  importSampleData: TImportResponse;
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
};


export type TMutation_DeleteOAuthClientArgs = {
  id: Scalars['ID'];
};


export type TMutation_ImportSampleDataArgs = {
  projectKey: Scalars['String'];
};


export type TMutation_InviteArgs = {
  draft: TInvitationInput;
  origin?: InputMaybe<Scalars['String']>;
};


export type TMutation_RandomArgs = {
  byteLength: Scalars['Int'];
};


export type TMutation_ResetPasswordArgs = {
  draft: TResetPasswordDraft;
  jwt: Scalars['String'];
};


export type TMutation_SendLinkToResetPasswordArgs = {
  email: Scalars['String'];
};


export type TMutation_SendLinkToSignUpArgs = {
  additionalInfo?: InputMaybe<TAdditionalUserInfo>;
  email: Scalars['String'];
  language?: InputMaybe<Scalars['String']>;
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
  oAuthScopes: Array<Scalars['String']>;
};

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

export type TOrganizationTeamsCreated = {
  __typename?: 'OrganizationTeamsCreated';
  id: Scalars['String'];
  name: Scalars['String'];
};

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
  sampleDataImportDataset?: Maybe<Scalars['String']>;
  shippingRateInputType?: Maybe<TShippingRateInputType>;
  suspension: TProjectSuspension;
  version?: Maybe<Scalars['Int']>;
};

export type TProjectDraftType = {
  countries: Array<Scalars['String']>;
  currencies: Array<Scalars['String']>;
  deleteDaysAfterCreation?: InputMaybe<Scalars['Int']>;
  key: Scalars['String'];
  languages: Array<Scalars['String']>;
  messagesEnabled?: InputMaybe<Scalars['Boolean']>;
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
  key: Scalars['String'];
  projectKey?: Maybe<Scalars['String']>;
  storeKey?: Maybe<Scalars['String']>;
};

export type TProjectPermissionInput = {
  key: Scalars['String'];
  projectKey?: InputMaybe<Scalars['String']>;
  storeKey?: InputMaybe<Scalars['String']>;
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
  storeOAuthScopes: Array<Scalars['String']>;
};


export type TQuery_AllImpliedOAuthScopesArgs = {
  onlyConfiguredOnTrustedClient?: InputMaybe<Scalars['Boolean']>;
  resourceAccessPermissions: Array<Scalars['String']>;
};


export type TQuery_InvitationArgs = {
  where?: InputMaybe<TInvitationWhereInput>;
};


export type TQuery_OAuthClientArgs = {
  id: Scalars['String'];
};


export type TQuery_OAuthClientsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
};


export type TQuery_ProjectArgs = {
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ReleasesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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
  timeZone?: InputMaybe<Scalars['String']>;
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
  idTokenUserInfo?: Maybe<TIdTokenUserInfo>;
  language: Scalars['String'];
  lastModifiedAt: Scalars['String'];
  lastName: Scalars['String'];
  launchdarklyTrackingCloudEnvironment: Scalars['String'];
  launchdarklyTrackingGroup: Scalars['String'];
  launchdarklyTrackingId: Scalars['String'];
  launchdarklyTrackingSubgroup?: Maybe<Scalars['String']>;
  launchdarklyTrackingTeam?: Maybe<Array<Scalars['String']>>;
  launchdarklyTrackingTenant: Scalars['String'];
  numberFormat: Scalars['String'];
  projects: TProjectQueryResult;
  timeZone?: Maybe<Scalars['String']>;
  /** @deprecated This field is not used anymore. */
  verificationStatus: TVerificationStatus;
  version?: Maybe<Scalars['Int']>;
};

export type TUserDraft = {
  businessRole?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type TUserUpdateAction = {
  changeBusinessRole?: InputMaybe<TChangeUserBusinessRole>;
  changeLanguage?: InputMaybe<TChangeUserLanguage>;
  changeName?: InputMaybe<TChangeUserName>;
  changeNumberFormat?: InputMaybe<TChangeUserNumberFormat>;
  changePassword?: InputMaybe<TChangeUserPassword>;
  setTimeZone?: InputMaybe<TSetUserTimeZone>;
};

export enum TVerificationStatus {
  Unverified = 'Unverified',
  Verified = 'Verified'
}

export type TFetchUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchUserIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string } | null };

export type TAmILoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type TAmILoggedInQuery = { __typename?: 'Query', amILoggedIn: boolean };

export type TFetchProjectQueryVariables = Exact<{
  projectKey?: InputMaybe<Scalars['String']>;
}>;


export type TFetchProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', key: string, version?: number | null, name: string, countries: Array<string>, currencies: Array<string>, languages: Array<string>, initialized: boolean, isProductionProject: boolean, sampleDataImportDataset?: string | null, expiry: { __typename?: 'ProjectExpiry', isActive: boolean, daysLeft?: number | null }, suspension: { __typename?: 'ProjectSuspension', isActive: boolean, reason?: TProjectSuspensionReason | null }, allAppliedPermissions: Array<{ __typename?: 'AppliedPermission', name: string, value: boolean }>, allAppliedActionRights: Array<{ __typename?: 'AppliedActionRight', group: string, name: string, value: boolean }>, allAppliedDataFences: Array<{ __typename: 'StoreDataFence', type: string, name: string, value: string, group: string }>, allPermissionsForAllApplications: { __typename?: 'AllPermissionsForAllApplications', allAppliedPermissions: Array<{ __typename?: 'AppliedPermission', name: string, value: boolean }>, allAppliedActionRights: Array<{ __typename?: 'AppliedActionRight', group: string, name: string, value: boolean }>, allAppliedMenuVisibilities: Array<{ __typename?: 'AppliedMenuVisibilities', name: string, value: boolean }>, allAppliedDataFences: Array<{ __typename: 'StoreDataFence', type: string, name: string, value: string, group: string }> }, owner: { __typename?: 'Organization', id: string, name: string } } | null };

export type TFetchLoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchLoggedInUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, createdAt: string, gravatarHash: string, firstName: string, lastName: string, language: string, numberFormat: string, timeZone?: string | null, launchdarklyTrackingId: string, launchdarklyTrackingGroup: string, launchdarklyTrackingSubgroup?: string | null, launchdarklyTrackingTeam?: Array<string> | null, launchdarklyTrackingTenant: string, defaultProjectKey?: string | null, businessRole?: string | null, projects: { __typename?: 'ProjectQueryResult', total: number, results: Array<{ __typename?: 'Project', name: string, key: string, isProductionProject: boolean, suspension: { __typename?: 'ProjectSuspension', isActive: boolean }, expiry: { __typename?: 'ProjectExpiry', isActive: boolean } }> }, idTokenUserInfo?: { __typename?: 'IdTokenUserInfo', iss: string, sub: string, aud: string, exp: number, iat?: number | null, email?: string | null, name?: string | null, additionalClaims?: string | null } | null } | null };

export type TFetchUserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type TFetchUserProjectsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, projects: { __typename?: 'ProjectQueryResult', total: number, results: Array<{ __typename?: 'Project', name: string, key: string, isProductionProject: boolean, suspension: { __typename?: 'ProjectSuspension', isActive: boolean }, expiry: { __typename?: 'ProjectExpiry', isActive: boolean } }> } } | null };

export type TAllFeaturesQueryVariables = Exact<{ [key: string]: never; }>;


export type TAllFeaturesQuery = { __typename?: 'Query', allFeatures: Array<{ __typename?: 'Feature', name: string, value: boolean, reason?: string | null }> };
