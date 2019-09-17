export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: string,
  Json: { [key: string]: unknown },
};


export type TApplicationExtension = {
   __typename?: 'ApplicationExtension',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  isActive?: Maybe<Scalars['Boolean']>,
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  url: Scalars['String'],
  navbarMenu?: Maybe<TNavbarMenu>,
};

export type TApplicationExtensionDataInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  url: Scalars['String'],
  navbarMenu: TApplicationExtensionNavbarMenuDataInput,
};

export type TApplicationExtensionNavbarMenuDataInput = {
  key: Scalars['String'],
  uriPath: Scalars['String'],
  featureToggle?: Maybe<Scalars['String']>,
  icon: Scalars['String'],
  permissions: Array<TOAuthScope>,
  labelAllLocales: Array<TLocalizedFieldDataInput>,
  submenu: Array<TApplicationExtensionNavbarSubmenuDataInput>,
};

export type TApplicationExtensionNavbarSubmenuDataInput = {
  key: Scalars['String'],
  uriPath: Scalars['String'],
  featureToggle?: Maybe<Scalars['String']>,
  permissions: Array<TOAuthScope>,
  labelAllLocales: Array<TLocalizedFieldDataInput>,
};

export enum TApplicationExtensionOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type TApplicationExtensionWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  isActive?: Maybe<Scalars['Boolean']>,
  isActive_not?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
  name_not?: Maybe<Scalars['String']>,
  name_in?: Maybe<Array<Scalars['String']>>,
  name_not_in?: Maybe<Array<Scalars['String']>>,
  name_lt?: Maybe<Scalars['String']>,
  name_lte?: Maybe<Scalars['String']>,
  name_gt?: Maybe<Scalars['String']>,
  name_gte?: Maybe<Scalars['String']>,
  name_contains?: Maybe<Scalars['String']>,
  name_not_contains?: Maybe<Scalars['String']>,
  name_starts_with?: Maybe<Scalars['String']>,
  name_not_starts_with?: Maybe<Scalars['String']>,
  name_ends_with?: Maybe<Scalars['String']>,
  name_not_ends_with?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  description_not?: Maybe<Scalars['String']>,
  description_in?: Maybe<Array<Scalars['String']>>,
  description_not_in?: Maybe<Array<Scalars['String']>>,
  description_lt?: Maybe<Scalars['String']>,
  description_lte?: Maybe<Scalars['String']>,
  description_gt?: Maybe<Scalars['String']>,
  description_gte?: Maybe<Scalars['String']>,
  description_contains?: Maybe<Scalars['String']>,
  description_not_contains?: Maybe<Scalars['String']>,
  description_starts_with?: Maybe<Scalars['String']>,
  description_not_starts_with?: Maybe<Scalars['String']>,
  description_ends_with?: Maybe<Scalars['String']>,
  description_not_ends_with?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  url_not?: Maybe<Scalars['String']>,
  url_in?: Maybe<Array<Scalars['String']>>,
  url_not_in?: Maybe<Array<Scalars['String']>>,
  url_lt?: Maybe<Scalars['String']>,
  url_lte?: Maybe<Scalars['String']>,
  url_gt?: Maybe<Scalars['String']>,
  url_gte?: Maybe<Scalars['String']>,
  url_contains?: Maybe<Scalars['String']>,
  url_not_contains?: Maybe<Scalars['String']>,
  url_starts_with?: Maybe<Scalars['String']>,
  url_not_starts_with?: Maybe<Scalars['String']>,
  url_ends_with?: Maybe<Scalars['String']>,
  url_not_ends_with?: Maybe<Scalars['String']>,
  navbarMenu?: Maybe<TNavbarMenuWhereInput>,
  AND?: Maybe<Array<TApplicationExtensionWhereInput>>,
  OR?: Maybe<Array<TApplicationExtensionWhereInput>>,
  NOT?: Maybe<Array<TApplicationExtensionWhereInput>>,
};

export enum TCategoryRecommendationSearchProperty {
  Attribute = 'Attribute',
  MachineLearning = 'MachineLearning',
  ProductType = 'ProductType'
}

export type TCategoryRecommendationSettings = {
   __typename?: 'CategoryRecommendationSettings',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  searchProperty: TCategoryRecommendationSearchProperty,
  attributeName?: Maybe<Scalars['String']>,
};

export type TCategoryRecommendationSettingsDataInput = {
  searchProperty: TCategoryRecommendationSearchProperty,
  attributeName?: Maybe<Scalars['String']>,
};

export type TCustomersListView = {
   __typename?: 'CustomersListView',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  userId: Scalars['String'],
  projectKey: Scalars['String'],
  nameAllLocales?: Maybe<Array<TLocalizedField>>,
  isActive?: Maybe<Scalars['Boolean']>,
  search?: Maybe<Scalars['String']>,
  table?: Maybe<TTable>,
  sort?: Maybe<TSort>,
  filters?: Maybe<Array<TFilterValues>>,
};


export type TCustomersListView_NameAllLocalesArgs = {
  where?: Maybe<TLocalizedFieldWhereInput>,
  orderBy?: Maybe<TLocalizedFieldOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type TCustomersListView_FiltersArgs = {
  where?: Maybe<TFilterValuesWhereInput>,
  orderBy?: Maybe<TFilterValuesOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TCustomersListViewInput = {
  search?: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedFieldCreateInput>,
  table?: Maybe<TCustomersListViewTableInput>,
  sort: TSortCreateInput,
  filters: Array<TFilterValuesCreateInput>,
};

export type TCustomersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>,
};


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
  Range = 'Range'
}

export type TFilterValues = {
   __typename?: 'FilterValues',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  target: Scalars['String'],
  type: TFilterType,
  json: Scalars['Json'],
};

export type TFilterValuesCreateInput = {
  id?: Maybe<Scalars['ID']>,
  target: Scalars['String'],
  type: TFilterType,
  json: Scalars['Json'],
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
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  target?: Maybe<Scalars['String']>,
  target_not?: Maybe<Scalars['String']>,
  target_in?: Maybe<Array<Scalars['String']>>,
  target_not_in?: Maybe<Array<Scalars['String']>>,
  target_lt?: Maybe<Scalars['String']>,
  target_lte?: Maybe<Scalars['String']>,
  target_gt?: Maybe<Scalars['String']>,
  target_gte?: Maybe<Scalars['String']>,
  target_contains?: Maybe<Scalars['String']>,
  target_not_contains?: Maybe<Scalars['String']>,
  target_starts_with?: Maybe<Scalars['String']>,
  target_not_starts_with?: Maybe<Scalars['String']>,
  target_ends_with?: Maybe<Scalars['String']>,
  target_not_ends_with?: Maybe<Scalars['String']>,
  type?: Maybe<TFilterType>,
  type_not?: Maybe<TFilterType>,
  type_in?: Maybe<Array<TFilterType>>,
  type_not_in?: Maybe<Array<TFilterType>>,
  AND?: Maybe<Array<TFilterValuesWhereInput>>,
  OR?: Maybe<Array<TFilterValuesWhereInput>>,
  NOT?: Maybe<Array<TFilterValuesWhereInput>>,
};

export type TImageRegex = {
   __typename?: 'ImageRegex',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  small?: Maybe<TImageRegexOptions>,
  thumb?: Maybe<TImageRegexOptions>,
};

export type TImageRegexDataInput = {
  small?: Maybe<TImageRegexOptionsInput>,
  thumb?: Maybe<TImageRegexOptionsInput>,
};

export type TImageRegexOptions = {
   __typename?: 'ImageRegexOptions',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  flag: Scalars['String'],
  search: Scalars['String'],
  replace: Scalars['String'],
};

export type TImageRegexOptionsInput = {
  flag: Scalars['String'],
  search: Scalars['String'],
  replace: Scalars['String'],
};


export type TLocalizedField = {
   __typename?: 'LocalizedField',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  locale: Scalars['String'],
  value: Scalars['String'],
};

export type TLocalizedFieldCreateInput = {
  id?: Maybe<Scalars['ID']>,
  locale: Scalars['String'],
  value: Scalars['String'],
};

export type TLocalizedFieldDataInput = {
  locale: Scalars['String'],
  value: Scalars['String'],
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
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  locale?: Maybe<Scalars['String']>,
  locale_not?: Maybe<Scalars['String']>,
  locale_in?: Maybe<Array<Scalars['String']>>,
  locale_not_in?: Maybe<Array<Scalars['String']>>,
  locale_lt?: Maybe<Scalars['String']>,
  locale_lte?: Maybe<Scalars['String']>,
  locale_gt?: Maybe<Scalars['String']>,
  locale_gte?: Maybe<Scalars['String']>,
  locale_contains?: Maybe<Scalars['String']>,
  locale_not_contains?: Maybe<Scalars['String']>,
  locale_starts_with?: Maybe<Scalars['String']>,
  locale_not_starts_with?: Maybe<Scalars['String']>,
  locale_ends_with?: Maybe<Scalars['String']>,
  locale_not_ends_with?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['String']>,
  value_not?: Maybe<Scalars['String']>,
  value_in?: Maybe<Array<Scalars['String']>>,
  value_not_in?: Maybe<Array<Scalars['String']>>,
  value_lt?: Maybe<Scalars['String']>,
  value_lte?: Maybe<Scalars['String']>,
  value_gt?: Maybe<Scalars['String']>,
  value_gte?: Maybe<Scalars['String']>,
  value_contains?: Maybe<Scalars['String']>,
  value_not_contains?: Maybe<Scalars['String']>,
  value_starts_with?: Maybe<Scalars['String']>,
  value_not_starts_with?: Maybe<Scalars['String']>,
  value_ends_with?: Maybe<Scalars['String']>,
  value_not_ends_with?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<TLocalizedFieldWhereInput>>,
  OR?: Maybe<Array<TLocalizedFieldWhereInput>>,
  NOT?: Maybe<Array<TLocalizedFieldWhereInput>>,
};

export type TMutation = {
   __typename?: 'Mutation',
  createProjectExtensionApplication?: Maybe<TProjectExtension>,
  updateProjectExtensionApplication?: Maybe<TProjectExtension>,
  deleteProjectExtensionApplication?: Maybe<TProjectExtension>,
  activateProjectExtensionApplication?: Maybe<TProjectExtension>,
  deactivateProjectExtensionApplication?: Maybe<TProjectExtension>,
  setProjectExtensionImageRegex?: Maybe<TProjectExtension>,
  setProjectExtensionCategoryRecommendation?: Maybe<TProjectExtension>,
  setProjectExtensionOrderStatesVisibility?: Maybe<TProjectExtension>,
  setOrganizationExtensionOidcSsoConfig?: Maybe<TOrganizationExtension>,
  activateOrganizationExtensionOidcSsoConfig?: Maybe<TOrganizationExtension>,
  deactivateOrganizationExtensionOidcSsoConfig?: Maybe<TOrganizationExtension>,
  createOrdersListView: TOrdersListView,
  updateOrdersListView?: Maybe<TOrdersListView>,
  deleteOrdersListView?: Maybe<TOrdersListView>,
  activateOrdersListView?: Maybe<TOrdersListView>,
  deactivateOrdersListView?: Maybe<TOrdersListView>,
  createPimSearchListView: TPimSearchListView,
  updatePimSearchListView?: Maybe<TPimSearchListView>,
  deletePimSearchListView?: Maybe<TPimSearchListView>,
  activatePimSearchListView?: Maybe<TPimSearchListView>,
  deactivatePimSearchListView?: Maybe<TPimSearchListView>,
  createProductTypeAttributesView: TProductTypeAttributesView,
  updateProductTypeAttributesView: TProductTypeAttributesView,
  deleteProductTypeAttributesView?: Maybe<TProductTypeAttributesView>,
  activateProductTypeAttributesView?: Maybe<TProductTypeAttributesView>,
  deactivateProductTypeAttributesView?: Maybe<TProductTypeAttributesView>,
  createCustomersListView: TCustomersListView,
  updateCustomersListView?: Maybe<TCustomersListView>,
  updateVariantPricesListView?: Maybe<TVariantPricesListView>,
  createVariantPricesListView?: Maybe<TVariantPricesListView>,
  deleteCustomersListView?: Maybe<TCustomersListView>,
  activateCustomersListView?: Maybe<TCustomersListView>,
  deactivateCustomersListView?: Maybe<TOrdersListView>,
  updateRuleBuilderQuickSelectionValues?: Maybe<TRuleBuilderQuickSelectionValues>,
};


export type TMutation_CreateProjectExtensionApplicationArgs = {
  data: TApplicationExtensionDataInput
};


export type TMutation_UpdateProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID'],
  data: TApplicationExtensionDataInput
};


export type TMutation_DeleteProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID']
};


export type TMutation_ActivateProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID']
};


export type TMutation_DeactivateProjectExtensionApplicationArgs = {
  applicationId: Scalars['ID']
};


export type TMutation_SetProjectExtensionImageRegexArgs = {
  data?: Maybe<TImageRegexDataInput>
};


export type TMutation_SetProjectExtensionCategoryRecommendationArgs = {
  data?: Maybe<TCategoryRecommendationSettingsDataInput>
};


export type TMutation_SetProjectExtensionOrderStatesVisibilityArgs = {
  data?: Maybe<Array<Maybe<TOrderStatesVisibility>>>
};


export type TMutation_SetOrganizationExtensionOidcSsoConfigArgs = {
  organizationId: Scalars['String'],
  data: TOidcSsoConfigDataInput
};


export type TMutation_ActivateOrganizationExtensionOidcSsoConfigArgs = {
  organizationId: Scalars['String']
};


export type TMutation_DeactivateOrganizationExtensionOidcSsoConfigArgs = {
  organizationId: Scalars['String']
};


export type TMutation_CreateOrdersListViewArgs = {
  data: TOrdersListViewInput
};


export type TMutation_UpdateOrdersListViewArgs = {
  id: Scalars['ID'],
  data: TOrdersListViewInput
};


export type TMutation_DeleteOrdersListViewArgs = {
  id: Scalars['ID']
};


export type TMutation_ActivateOrdersListViewArgs = {
  id: Scalars['ID']
};


export type TMutation_DeactivateOrdersListViewArgs = {
  id: Scalars['ID']
};


export type TMutation_CreatePimSearchListViewArgs = {
  data: TPimSearchListViewInput
};


export type TMutation_UpdatePimSearchListViewArgs = {
  id: Scalars['ID'],
  data: TPimSearchListViewInput
};


export type TMutation_DeletePimSearchListViewArgs = {
  id: Scalars['ID']
};


export type TMutation_ActivatePimSearchListViewArgs = {
  id: Scalars['ID']
};


export type TMutation_DeactivatePimSearchListViewArgs = {
  id: Scalars['ID']
};


export type TMutation_CreateProductTypeAttributesViewArgs = {
  data: TProductTypeAttributesViewInput
};


export type TMutation_UpdateProductTypeAttributesViewArgs = {
  id: Scalars['ID'],
  data: TProductTypeAttributesViewUpdateInput
};


export type TMutation_DeleteProductTypeAttributesViewArgs = {
  id: Scalars['ID']
};


export type TMutation_ActivateProductTypeAttributesViewArgs = {
  id: Scalars['ID'],
  productTypeId: Scalars['String'],
  isVariant: Scalars['Boolean']
};


export type TMutation_DeactivateProductTypeAttributesViewArgs = {
  id: Scalars['ID']
};


export type TMutation_CreateCustomersListViewArgs = {
  data: TCustomersListViewInput
};


export type TMutation_UpdateCustomersListViewArgs = {
  id: Scalars['ID'],
  data: TCustomersListViewInput
};


export type TMutation_UpdateVariantPricesListViewArgs = {
  id: Scalars['ID'],
  data: TVariantPricesListViewInput
};


export type TMutation_CreateVariantPricesListViewArgs = {
  data: TVariantPricesListViewInput
};


export type TMutation_DeleteCustomersListViewArgs = {
  id: Scalars['ID']
};


export type TMutation_ActivateCustomersListViewArgs = {
  id: Scalars['ID']
};


export type TMutation_DeactivateCustomersListViewArgs = {
  id: Scalars['ID']
};


export type TMutation_UpdateRuleBuilderQuickSelectionValuesArgs = {
  id?: Maybe<Scalars['ID']>,
  data: TRuleBuilderQuickSelectionInput
};

export type TNavbarMenu = {
   __typename?: 'NavbarMenu',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  key: Scalars['String'],
  uriPath: Scalars['String'],
  labelAllLocales?: Maybe<Array<TLocalizedField>>,
  featureToggle?: Maybe<Scalars['String']>,
  permissions: Array<TOAuthScope>,
  icon: Scalars['String'],
  submenu?: Maybe<Array<TNavbarSubmenu>>,
};


export type TNavbarMenu_LabelAllLocalesArgs = {
  where?: Maybe<TLocalizedFieldWhereInput>,
  orderBy?: Maybe<TLocalizedFieldOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type TNavbarMenu_SubmenuArgs = {
  where?: Maybe<TNavbarSubmenuWhereInput>,
  orderBy?: Maybe<TNavbarSubmenuOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TNavbarMenuWhereInput = {
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  key?: Maybe<Scalars['String']>,
  key_not?: Maybe<Scalars['String']>,
  key_in?: Maybe<Array<Scalars['String']>>,
  key_not_in?: Maybe<Array<Scalars['String']>>,
  key_lt?: Maybe<Scalars['String']>,
  key_lte?: Maybe<Scalars['String']>,
  key_gt?: Maybe<Scalars['String']>,
  key_gte?: Maybe<Scalars['String']>,
  key_contains?: Maybe<Scalars['String']>,
  key_not_contains?: Maybe<Scalars['String']>,
  key_starts_with?: Maybe<Scalars['String']>,
  key_not_starts_with?: Maybe<Scalars['String']>,
  key_ends_with?: Maybe<Scalars['String']>,
  key_not_ends_with?: Maybe<Scalars['String']>,
  uriPath?: Maybe<Scalars['String']>,
  uriPath_not?: Maybe<Scalars['String']>,
  uriPath_in?: Maybe<Array<Scalars['String']>>,
  uriPath_not_in?: Maybe<Array<Scalars['String']>>,
  uriPath_lt?: Maybe<Scalars['String']>,
  uriPath_lte?: Maybe<Scalars['String']>,
  uriPath_gt?: Maybe<Scalars['String']>,
  uriPath_gte?: Maybe<Scalars['String']>,
  uriPath_contains?: Maybe<Scalars['String']>,
  uriPath_not_contains?: Maybe<Scalars['String']>,
  uriPath_starts_with?: Maybe<Scalars['String']>,
  uriPath_not_starts_with?: Maybe<Scalars['String']>,
  uriPath_ends_with?: Maybe<Scalars['String']>,
  uriPath_not_ends_with?: Maybe<Scalars['String']>,
  labelAllLocales_every?: Maybe<TLocalizedFieldWhereInput>,
  labelAllLocales_some?: Maybe<TLocalizedFieldWhereInput>,
  labelAllLocales_none?: Maybe<TLocalizedFieldWhereInput>,
  featureToggle?: Maybe<Scalars['String']>,
  featureToggle_not?: Maybe<Scalars['String']>,
  featureToggle_in?: Maybe<Array<Scalars['String']>>,
  featureToggle_not_in?: Maybe<Array<Scalars['String']>>,
  featureToggle_lt?: Maybe<Scalars['String']>,
  featureToggle_lte?: Maybe<Scalars['String']>,
  featureToggle_gt?: Maybe<Scalars['String']>,
  featureToggle_gte?: Maybe<Scalars['String']>,
  featureToggle_contains?: Maybe<Scalars['String']>,
  featureToggle_not_contains?: Maybe<Scalars['String']>,
  featureToggle_starts_with?: Maybe<Scalars['String']>,
  featureToggle_not_starts_with?: Maybe<Scalars['String']>,
  featureToggle_ends_with?: Maybe<Scalars['String']>,
  featureToggle_not_ends_with?: Maybe<Scalars['String']>,
  icon?: Maybe<Scalars['String']>,
  icon_not?: Maybe<Scalars['String']>,
  icon_in?: Maybe<Array<Scalars['String']>>,
  icon_not_in?: Maybe<Array<Scalars['String']>>,
  icon_lt?: Maybe<Scalars['String']>,
  icon_lte?: Maybe<Scalars['String']>,
  icon_gt?: Maybe<Scalars['String']>,
  icon_gte?: Maybe<Scalars['String']>,
  icon_contains?: Maybe<Scalars['String']>,
  icon_not_contains?: Maybe<Scalars['String']>,
  icon_starts_with?: Maybe<Scalars['String']>,
  icon_not_starts_with?: Maybe<Scalars['String']>,
  icon_ends_with?: Maybe<Scalars['String']>,
  icon_not_ends_with?: Maybe<Scalars['String']>,
  submenu_every?: Maybe<TNavbarSubmenuWhereInput>,
  submenu_some?: Maybe<TNavbarSubmenuWhereInput>,
  submenu_none?: Maybe<TNavbarSubmenuWhereInput>,
  AND?: Maybe<Array<TNavbarMenuWhereInput>>,
  OR?: Maybe<Array<TNavbarMenuWhereInput>>,
  NOT?: Maybe<Array<TNavbarMenuWhereInput>>,
};

export type TNavbarSubmenu = {
   __typename?: 'NavbarSubmenu',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  key: Scalars['String'],
  uriPath: Scalars['String'],
  labelAllLocales?: Maybe<Array<TLocalizedField>>,
  featureToggle?: Maybe<Scalars['String']>,
  permissions: Array<TOAuthScope>,
};


export type TNavbarSubmenu_LabelAllLocalesArgs = {
  where?: Maybe<TLocalizedFieldWhereInput>,
  orderBy?: Maybe<TLocalizedFieldOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
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
  id?: Maybe<Scalars['ID']>,
  id_not?: Maybe<Scalars['ID']>,
  id_in?: Maybe<Array<Scalars['ID']>>,
  id_not_in?: Maybe<Array<Scalars['ID']>>,
  id_lt?: Maybe<Scalars['ID']>,
  id_lte?: Maybe<Scalars['ID']>,
  id_gt?: Maybe<Scalars['ID']>,
  id_gte?: Maybe<Scalars['ID']>,
  id_contains?: Maybe<Scalars['ID']>,
  id_not_contains?: Maybe<Scalars['ID']>,
  id_starts_with?: Maybe<Scalars['ID']>,
  id_not_starts_with?: Maybe<Scalars['ID']>,
  id_ends_with?: Maybe<Scalars['ID']>,
  id_not_ends_with?: Maybe<Scalars['ID']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  createdAt_not?: Maybe<Scalars['DateTime']>,
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  createdAt_lt?: Maybe<Scalars['DateTime']>,
  createdAt_lte?: Maybe<Scalars['DateTime']>,
  createdAt_gt?: Maybe<Scalars['DateTime']>,
  createdAt_gte?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  updatedAt_not?: Maybe<Scalars['DateTime']>,
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>,
  updatedAt_lt?: Maybe<Scalars['DateTime']>,
  updatedAt_lte?: Maybe<Scalars['DateTime']>,
  updatedAt_gt?: Maybe<Scalars['DateTime']>,
  updatedAt_gte?: Maybe<Scalars['DateTime']>,
  key?: Maybe<Scalars['String']>,
  key_not?: Maybe<Scalars['String']>,
  key_in?: Maybe<Array<Scalars['String']>>,
  key_not_in?: Maybe<Array<Scalars['String']>>,
  key_lt?: Maybe<Scalars['String']>,
  key_lte?: Maybe<Scalars['String']>,
  key_gt?: Maybe<Scalars['String']>,
  key_gte?: Maybe<Scalars['String']>,
  key_contains?: Maybe<Scalars['String']>,
  key_not_contains?: Maybe<Scalars['String']>,
  key_starts_with?: Maybe<Scalars['String']>,
  key_not_starts_with?: Maybe<Scalars['String']>,
  key_ends_with?: Maybe<Scalars['String']>,
  key_not_ends_with?: Maybe<Scalars['String']>,
  uriPath?: Maybe<Scalars['String']>,
  uriPath_not?: Maybe<Scalars['String']>,
  uriPath_in?: Maybe<Array<Scalars['String']>>,
  uriPath_not_in?: Maybe<Array<Scalars['String']>>,
  uriPath_lt?: Maybe<Scalars['String']>,
  uriPath_lte?: Maybe<Scalars['String']>,
  uriPath_gt?: Maybe<Scalars['String']>,
  uriPath_gte?: Maybe<Scalars['String']>,
  uriPath_contains?: Maybe<Scalars['String']>,
  uriPath_not_contains?: Maybe<Scalars['String']>,
  uriPath_starts_with?: Maybe<Scalars['String']>,
  uriPath_not_starts_with?: Maybe<Scalars['String']>,
  uriPath_ends_with?: Maybe<Scalars['String']>,
  uriPath_not_ends_with?: Maybe<Scalars['String']>,
  labelAllLocales_every?: Maybe<TLocalizedFieldWhereInput>,
  labelAllLocales_some?: Maybe<TLocalizedFieldWhereInput>,
  labelAllLocales_none?: Maybe<TLocalizedFieldWhereInput>,
  featureToggle?: Maybe<Scalars['String']>,
  featureToggle_not?: Maybe<Scalars['String']>,
  featureToggle_in?: Maybe<Array<Scalars['String']>>,
  featureToggle_not_in?: Maybe<Array<Scalars['String']>>,
  featureToggle_lt?: Maybe<Scalars['String']>,
  featureToggle_lte?: Maybe<Scalars['String']>,
  featureToggle_gt?: Maybe<Scalars['String']>,
  featureToggle_gte?: Maybe<Scalars['String']>,
  featureToggle_contains?: Maybe<Scalars['String']>,
  featureToggle_not_contains?: Maybe<Scalars['String']>,
  featureToggle_starts_with?: Maybe<Scalars['String']>,
  featureToggle_not_starts_with?: Maybe<Scalars['String']>,
  featureToggle_ends_with?: Maybe<Scalars['String']>,
  featureToggle_not_ends_with?: Maybe<Scalars['String']>,
  AND?: Maybe<Array<TNavbarSubmenuWhereInput>>,
  OR?: Maybe<Array<TNavbarSubmenuWhereInput>>,
  NOT?: Maybe<Array<TNavbarSubmenuWhereInput>>,
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
   __typename?: 'OidcSsoConfig',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  isActive?: Maybe<Scalars['Boolean']>,
  authorityUrl: Scalars['String'],
  clientId: Scalars['String'],
  clientSecret?: Maybe<Scalars['String']>,
  teamIdForNewUsers?: Maybe<Scalars['String']>,
  logoutUrl?: Maybe<Scalars['String']>,
};

export type TOidcSsoConfigDataInput = {
  authorityUrl: Scalars['String'],
  clientId: Scalars['String'],
  clientSecret?: Maybe<Scalars['String']>,
  teamIdForNewUsers?: Maybe<Scalars['String']>,
  logoutUrl?: Maybe<Scalars['String']>,
};

export type TOrdersListView = {
   __typename?: 'OrdersListView',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  userId: Scalars['String'],
  projectKey: Scalars['String'],
  nameAllLocales?: Maybe<Array<TLocalizedField>>,
  isActive?: Maybe<Scalars['Boolean']>,
  search?: Maybe<Scalars['String']>,
  table?: Maybe<TTable>,
  sort?: Maybe<TSort>,
  filters?: Maybe<Array<TFilterValues>>,
};


export type TOrdersListView_NameAllLocalesArgs = {
  where?: Maybe<TLocalizedFieldWhereInput>,
  orderBy?: Maybe<TLocalizedFieldOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type TOrdersListView_FiltersArgs = {
  where?: Maybe<TFilterValuesWhereInput>,
  orderBy?: Maybe<TFilterValuesOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TOrdersListViewInput = {
  search?: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedFieldCreateInput>,
  table?: Maybe<TOrdersListViewTableInput>,
  sort: TSortCreateInput,
  filters: Array<TFilterValuesCreateInput>,
};

export type TOrdersListViewTableInput = {
  visibleColumns: Array<Scalars['String']>,
};

export enum TOrderStatesVisibility {
  HidePaymentState = 'HidePaymentState',
  HideShipmentState = 'HideShipmentState',
  HideOrderState = 'HideOrderState'
}

export type TOrganizationExtension = {
   __typename?: 'OrganizationExtension',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  organizationId: Scalars['String'],
  oidcSsoConfig?: Maybe<TOidcSsoConfig>,
};

export type TPimSearchListView = {
   __typename?: 'PimSearchListView',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  userId: Scalars['String'],
  projectKey: Scalars['String'],
  nameAllLocales?: Maybe<Array<TLocalizedField>>,
  isActive?: Maybe<Scalars['Boolean']>,
  search?: Maybe<Scalars['String']>,
  table?: Maybe<TTable>,
  sort?: Maybe<TSort>,
  filters?: Maybe<Array<TFilterValues>>,
};


export type TPimSearchListView_NameAllLocalesArgs = {
  where?: Maybe<TLocalizedFieldWhereInput>,
  orderBy?: Maybe<TLocalizedFieldOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type TPimSearchListView_FiltersArgs = {
  where?: Maybe<TFilterValuesWhereInput>,
  orderBy?: Maybe<TFilterValuesOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TPimSearchListViewInput = {
  search?: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedFieldCreateInput>,
  table?: Maybe<TPimSearchListViewTableInput>,
  sort: TSortCreateInput,
  filters: Array<TFilterValuesCreateInput>,
};

export type TPimSearchListViewTableInput = {
  visibleColumns: Array<Scalars['String']>,
};

export type TProductTypeAttributesView = {
   __typename?: 'ProductTypeAttributesView',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  userId: Scalars['String'],
  projectKey: Scalars['String'],
  nameAllLocales?: Maybe<Array<TLocalizedField>>,
  productTypeId: Scalars['String'],
  isActive: Scalars['Boolean'],
  isVariant?: Maybe<Scalars['Boolean']>,
  pinnedAttributes: Array<Scalars['String']>,
  searchTerm?: Maybe<Scalars['String']>,
  existence?: Maybe<TExistence>,
};


export type TProductTypeAttributesView_NameAllLocalesArgs = {
  where?: Maybe<TLocalizedFieldWhereInput>,
  orderBy?: Maybe<TLocalizedFieldOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TProductTypeAttributesViewInput = {
  nameAllLocales: Array<TLocalizedFieldCreateInput>,
  productTypeId: Scalars['String'],
  pinnedAttributes: Array<Scalars['String']>,
  isVariant?: Maybe<Scalars['Boolean']>,
  searchTerm?: Maybe<Scalars['String']>,
  existence?: Maybe<TExistence>,
};

export type TProductTypeAttributesViewUpdateInput = {
  nameAllLocales: Array<TLocalizedFieldCreateInput>,
  isVariant?: Maybe<Scalars['Boolean']>,
  pinnedAttributes: Array<Scalars['String']>,
  searchTerm?: Maybe<Scalars['String']>,
  existence?: Maybe<TExistence>,
};

export type TProjectExtension = {
   __typename?: 'ProjectExtension',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  projectKey: Scalars['String'],
  applications?: Maybe<Array<TApplicationExtension>>,
  imageRegex?: Maybe<TImageRegex>,
  orderStatesVisibility: Array<TOrderStatesVisibility>,
  categoryRecommendationSettings?: Maybe<TCategoryRecommendationSettings>,
};


export type TProjectExtension_ApplicationsArgs = {
  where?: Maybe<TApplicationExtensionWhereInput>,
  orderBy?: Maybe<TApplicationExtensionOrderByInput>,
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type TQuery = {
   __typename?: 'Query',
  projectExtension?: Maybe<TProjectExtension>,
  organizationExtension?: Maybe<TOrganizationExtension>,
  ordersListViews: Array<Maybe<TOrdersListView>>,
  ordersListView?: Maybe<TOrdersListView>,
  activeOrdersListView?: Maybe<TOrdersListView>,
  pimSearchListViews: Array<Maybe<TPimSearchListView>>,
  pimSearchListView?: Maybe<TPimSearchListView>,
  activePimSearchListView?: Maybe<TPimSearchListView>,
  productTypeAttributesViews?: Maybe<Array<Maybe<TProductTypeAttributesView>>>,
  productTypeAttributesView?: Maybe<TProductTypeAttributesView>,
  activeProductTypeAttributesView?: Maybe<TProductTypeAttributesView>,
  ruleBuilderQuickSelectionValues?: Maybe<Array<Maybe<TRuleBuilderQuickSelectionValues>>>,
  variantPricesListViews: Array<Maybe<TVariantPricesListView>>,
  customersListViews: Array<Maybe<TCustomersListView>>,
  customersListView?: Maybe<TCustomersListView>,
  activeCustomersListView?: Maybe<TCustomersListView>,
};


export type TQuery_OrganizationExtensionArgs = {
  organizationId: Scalars['String']
};


export type TQuery_OrdersListViewArgs = {
  id: Scalars['ID']
};


export type TQuery_PimSearchListViewArgs = {
  id: Scalars['ID']
};


export type TQuery_ProductTypeAttributesViewsArgs = {
  productTypeId: Scalars['String'],
  isVariant: Scalars['Boolean']
};


export type TQuery_ProductTypeAttributesViewArgs = {
  id: Scalars['ID']
};


export type TQuery_ActiveProductTypeAttributesViewArgs = {
  productTypeId: Scalars['String'],
  isVariant: Scalars['Boolean']
};


export type TQuery_RuleBuilderQuickSelectionValuesArgs = {
  ruleBuilderType: TRuleBuilderType
};


export type TQuery_CustomersListViewArgs = {
  id: Scalars['ID']
};

export type TRuleBuilderQuickSelectCreatefunctionsInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type TRuleBuilderQuickSelectCreatepredicatesInput = {
  set?: Maybe<Array<Scalars['String']>>,
};

export type TRuleBuilderQuickSelectionInput = {
  ruleBuilderType: TRuleBuilderType,
  predicates?: Maybe<TRuleBuilderQuickSelectCreatefunctionsInput>,
  functions?: Maybe<TRuleBuilderQuickSelectCreatepredicatesInput>,
};

export type TRuleBuilderQuickSelectionValues = {
   __typename?: 'RuleBuilderQuickSelectionValues',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  userId: Scalars['String'],
  projectKey: Scalars['String'],
  ruleBuilderType: TRuleBuilderType,
  functions: Array<Scalars['String']>,
  predicates: Array<Scalars['String']>,
};

export enum TRuleBuilderType {
  ProductDiscount = 'ProductDiscount',
  CartDiscount = 'CartDiscount',
  CartTargetDiscount = 'CartTargetDiscount'
}

export type TSort = {
   __typename?: 'Sort',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  key: Scalars['String'],
  order: TSortOrder,
};

export type TSortCreateInput = {
  id?: Maybe<Scalars['ID']>,
  key: Scalars['String'],
  order: TSortOrder,
};

export enum TSortOrder {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type TTable = {
   __typename?: 'Table',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  visibleColumns: Array<Scalars['String']>,
};

export type TVariantPricesListView = {
   __typename?: 'VariantPricesListView',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  userId: Scalars['String'],
  projectKey: Scalars['String'],
  visibleColumns: Array<Scalars['String']>,
};

export type TVariantPricesListViewInput = {
  visibleColumns: Array<Scalars['String']>,
};
export type TFetchProjectExtensionsNavbarQueryQueryVariables = {};


export type TFetchProjectExtensionsNavbarQueryQuery = (
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
