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
  BigDecimal: string;
  Country: string;
  Currency: string;
  Date: string;
  DateTime: string;
  Json: { [key: string]: unknown };
  KeyReferenceInput: string;
  Locale: string;
  Long: number;
  SearchFilter: string;
  SearchSort: string;
  Set: unknown[];
  Time: string;
  YearMonth: string;
};

/** API Clients can be used to obtain OAuth 2 access tokens. The secret is only shown once in the response of creating the API Client. */
export type TApiClientWithSecret = {
  __typename?: 'APIClientWithSecret';
  accessTokenValiditySeconds?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleteAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  lastUsedAt?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  refreshTokenValiditySeconds?: Maybe<Scalars['Int']>;
  scope: Scalars['String'];
  secret: Scalars['String'];
};

/** API Clients can be used to obtain OAuth 2 access tokens */
export type TApiClientWithoutSecret = {
  __typename?: 'APIClientWithoutSecret';
  accessTokenValiditySeconds?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  deleteAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  lastUsedAt?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  refreshTokenValiditySeconds?: Maybe<Scalars['Int']>;
  scope: Scalars['String'];
};

export type TApiClientWithoutSecretQueryResult = {
  __typename?: 'APIClientWithoutSecretQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TApiClientWithoutSecret>;
  total: Scalars['Long'];
};

export type TAwsLambdaDestination = TExtensionDestination & {
  __typename?: 'AWSLambdaDestination';
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
  arn: Scalars['String'];
  type: Scalars['String'];
};

export type TAwsLambdaDestinationInput = {
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
  arn: Scalars['String'];
};

export type TAbsoluteDiscountValue = TCartDiscountValue & TProductDiscountValue & {
  __typename?: 'AbsoluteDiscountValue';
  money: Array<TMoney>;
  type: Scalars['String'];
};

export type TAbsoluteDiscountValueInput = {
  money: Array<TMoneyInput>;
};

export enum TActionType {
  Create = 'Create',
  Update = 'Update'
}

/** A field to access the active cart. */
export type TActiveCartInterface = {
  activeCart?: Maybe<TCart>;
};

export type TAddAssociateRolePermission = {
  permission: TPermission;
};

export type TAddAttributeGroupAttribute = {
  attribute: TAttributeReferenceInput;
};

export type TAddBusinessUnitAddress = {
  address: TAddressInput;
};

export type TAddBusinessUnitAssociate = {
  associate: TAssociateDraft;
};

export type TAddBusinessUnitBillingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TAddBusinessUnitShippingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TAddBusinessUnitStore = {
  store: TResourceIdentifierInput;
};

export type TAddCartCustomLineItem = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  key?: InputMaybe<Scalars['String']>;
  money: TBaseMoneyInput;
  name: Array<TLocalizedStringItemInputType>;
  priceMode?: InputMaybe<TCustomLineItemPriceMode>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
  slug: Scalars['String'];
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
};

export type TAddCartCustomShippingMethod = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  deliveries?: InputMaybe<Array<TDeliveryDraft>>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingAddress: TAddressInput;
  shippingKey: Scalars['String'];
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  shippingRateInput?: InputMaybe<TShippingRateInputDraft>;
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
};

export type TAddCartDiscountCode = {
  code: Scalars['String'];
  validateDuplicates?: InputMaybe<Scalars['Boolean']>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TAddCartDiscountStore = {
  store: TResourceIdentifierInput;
};

export type TAddCartItemShippingAddress = {
  address: TAddressInput;
};

export type TAddCartLineItem = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  externalPrice?: InputMaybe<TBaseMoneyInput>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  externalTotalPrice?: InputMaybe<TExternalLineItemTotalPriceDraft>;
  inventoryMode?: InputMaybe<TInventoryMode>;
  key?: InputMaybe<Scalars['String']>;
  perMethodExternalTaxRate?: InputMaybe<Array<TMethodExternalTaxRateDraft>>;
  productId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
  sku?: InputMaybe<Scalars['String']>;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TAddCartPayment = {
  payment: TResourceIdentifierInput;
};

export type TAddCartShippingMethod = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  deliveries?: InputMaybe<Array<TDeliveryDraft>>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingAddress: TAddressInput;
  shippingKey: Scalars['String'];
  shippingMethod: TResourceIdentifierInput;
  shippingRateInput?: InputMaybe<TShippingRateInputDraft>;
};

export type TAddCartShoppingList = {
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  shoppingList: TResourceIdentifierInput;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
};

export type TAddCategoryAsset = {
  asset: TAssetDraftInput;
  position?: InputMaybe<Scalars['Int']>;
};

export type TAddChannelRoles = {
  roles: Array<TChannelRole>;
};

export type TAddCustomerAddress = {
  address: TAddressInput;
};

export type TAddCustomerBillingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TAddCustomerShippingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TAddCustomerStore = {
  store: TResourceIdentifierInput;
};

export type TAddInventoryEntryQuantity = {
  quantity: Scalars['Long'];
};

export type TAddMyBusinessUnitAddress = {
  address: TAddressInput;
};

export type TAddMyBusinessUnitBillingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TAddMyBusinessUnitShippingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TAddMyCartLineItem = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  key?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
  sku?: InputMaybe<Scalars['String']>;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TAddMyPaymentTransaction = {
  transaction: TMyTransactionDraft;
};

export type TAddOrderDelivery = {
  address?: InputMaybe<TAddressInput>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<TDeliveryItemDraftType>>;
  parcels?: InputMaybe<Array<TParcelDataDraftType>>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TAddOrderEditStagedAction = {
  stagedAction: TStagedOrderUpdateAction;
};

export type TAddOrderItemShippingAddress = {
  address: TAddressInput;
};

export type TAddOrderParcelToDelivery = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<TDeliveryItemDraftType>>;
  measurements?: InputMaybe<TParcelMeasurementsDraftType>;
  parcelKey?: InputMaybe<Scalars['String']>;
  trackingData?: InputMaybe<TTrackingDataDraftType>;
};

export type TAddOrderPayment = {
  payment: TResourceIdentifierInput;
};

export type TAddOrderReturnInfo = {
  items: Array<TReturnItemDraftType>;
  returnDate?: InputMaybe<Scalars['DateTime']>;
  returnTrackingId?: InputMaybe<Scalars['String']>;
};

export type TAddPaymentInterfaceInteraction = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TAddPaymentTransaction = {
  transaction: TTransactionDraft;
};

export type TAddProductAsset = {
  asset: TAssetDraftInput;
  position?: InputMaybe<Scalars['Int']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TAddProductExternalImage = {
  image: TImageInput;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TAddProductPrice = {
  price: TProductPriceDataInput;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TAddProductSelectionProduct = {
  product: TResourceIdentifierInput;
  variantSelection?: InputMaybe<TProductVariantSelectionDraft>;
};

export type TAddProductToCategory = {
  category: TResourceIdentifierInput;
  orderHint?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TAddProductVariant = {
  assets?: InputMaybe<Array<TAssetDraftInput>>;
  attributes?: InputMaybe<Array<TProductAttributeInput>>;
  images?: InputMaybe<Array<TImageInput>>;
  key?: InputMaybe<Scalars['String']>;
  prices?: InputMaybe<Array<TProductPriceDataInput>>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TAddShippingMethodShippingRate = {
  shippingRate: TShippingRateDraft;
  zone: TResourceIdentifierInput;
};

export type TAddShippingMethodZone = {
  zone: TResourceIdentifierInput;
};

export type TAddShoppingListLineItem = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  key?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  sku?: InputMaybe<Scalars['String']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TAddShoppingListTextLineItem = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  key?: InputMaybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type TAddStagedOrderCustomLineItem = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  key?: InputMaybe<Scalars['String']>;
  money: TBaseMoneyInput;
  name: Array<TLocalizedStringItemInputType>;
  priceMode?: InputMaybe<TCustomLineItemPriceMode>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraftType>;
  slug: Scalars['String'];
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
};

export type TAddStagedOrderCustomLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderCustomLineItemOutput';
  draft: TCustomLineItemDraftOutput;
  type: Scalars['String'];
};

export type TAddStagedOrderDelivery = {
  address?: InputMaybe<TAddressInput>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<TDeliveryItemDraftType>>;
  parcels?: InputMaybe<Array<TParcelDataDraftType>>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TAddStagedOrderDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderDeliveryOutput';
  address?: Maybe<TAddressDraft>;
  custom?: Maybe<TCustomFieldsCommand>;
  deliveryKey?: Maybe<Scalars['String']>;
  items: Array<TDeliveryItem>;
  parcels: Array<TParcelData>;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TAddStagedOrderDiscountCode = {
  code: Scalars['String'];
  validateDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TAddStagedOrderDiscountCodeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderDiscountCodeOutput';
  code: Scalars['String'];
  type: Scalars['String'];
  validateDuplicates: Scalars['Boolean'];
};

export type TAddStagedOrderItemShippingAddress = {
  address: TAddressInput;
};

export type TAddStagedOrderItemShippingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderItemShippingAddressOutput';
  address: TAddressDraft;
  type: Scalars['String'];
};

export type TAddStagedOrderLineItem = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  externalPrice?: InputMaybe<TBaseMoneyInput>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  externalTotalPrice?: InputMaybe<TExternalLineItemTotalPriceDraft>;
  inventoryMode?: InputMaybe<TInventoryMode>;
  key?: InputMaybe<Scalars['String']>;
  perMethodExternalTaxRate?: InputMaybe<Array<TMethodExternalTaxRateDraft>>;
  productId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraftType>;
  sku?: InputMaybe<Scalars['String']>;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TAddStagedOrderLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderLineItemOutput';
  draft: TLineItemDraftOutput;
  type: Scalars['String'];
};

export type TAddStagedOrderParcelToDelivery = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<TDeliveryItemDraftType>>;
  measurements?: InputMaybe<TParcelMeasurementsDraftType>;
  parcelKey?: InputMaybe<Scalars['String']>;
  trackingData?: InputMaybe<TTrackingDataDraftType>;
};

export type TAddStagedOrderParcelToDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderParcelToDeliveryOutput';
  custom?: Maybe<TCustomFieldsCommand>;
  deliveryId?: Maybe<Scalars['String']>;
  deliveryKey?: Maybe<Scalars['String']>;
  items: Array<TDeliveryItem>;
  measurements?: Maybe<TParcelMeasurements>;
  parcelKey?: Maybe<Scalars['String']>;
  trackingData?: Maybe<TTrackingData>;
  type: Scalars['String'];
};

export type TAddStagedOrderPayment = {
  payment: TResourceIdentifierInput;
};

export type TAddStagedOrderPaymentOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderPaymentOutput';
  paymentResId: TResourceIdentifier;
  type: Scalars['String'];
};

export type TAddStagedOrderReturnInfo = {
  items: Array<TReturnItemDraftType>;
  returnDate?: InputMaybe<Scalars['DateTime']>;
  returnTrackingId?: InputMaybe<Scalars['String']>;
};

export type TAddStagedOrderReturnInfoOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderReturnInfoOutput';
  items: Array<TReturnItemDraftTypeOutput>;
  returnDate?: Maybe<Scalars['DateTime']>;
  returnTrackingId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TAddStagedOrderShoppingList = {
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  shoppingList: TResourceIdentifierInput;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
};

export type TAddStagedOrderShoppingListOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderShoppingListOutput';
  distributionChannelResId?: Maybe<TChannelReferenceIdentifier>;
  shoppingListResId: TResourceIdentifier;
  supplyChannelResId?: Maybe<TChannelReferenceIdentifier>;
  type: Scalars['String'];
};

export type TAddStandalonePriceTier = {
  tier: TProductPriceTierInput;
};

export type TAddStateRoles = {
  roles: Array<TStateRole>;
};

export type TAddStoreCountry = {
  country: TStoreCountryInput;
};

export type TAddStoreDistributionChannel = {
  distributionChannel: TResourceIdentifierInput;
};

export type TAddStoreProductSelection = {
  active?: InputMaybe<Scalars['Boolean']>;
  productSelection: TResourceIdentifierInput;
};

export type TAddStoreSupplyChannel = {
  supplyChannel: TResourceIdentifierInput;
};

export type TAddTypeEnumValue = {
  fieldName: Scalars['String'];
  value: TEnumValueInput;
};

export type TAddTypeFieldDefinition = {
  fieldDefinition: TFieldDefinitionInput;
};

export type TAddTypeLocalizedEnumValue = {
  fieldName: Scalars['String'];
  value: TLocalizedEnumValueInput;
};

export type TAddZoneLocation = {
  location: TZoneLocation;
};

/** An address represents a postal address. */
export type TAddress = {
  __typename?: 'Address';
  additionalAddressInfo?: Maybe<Scalars['String']>;
  additionalStreetInfo?: Maybe<Scalars['String']>;
  apartment?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country: Scalars['Country'];
  custom?: Maybe<TCustomFieldsType>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  pOBox?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  salutation?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  streetName?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type TAddressDraft = {
  __typename?: 'AddressDraft';
  additionalAddressInfo?: Maybe<Scalars['String']>;
  additionalStreetInfo?: Maybe<Scalars['String']>;
  apartment?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  country: Scalars['Country'];
  custom?: Maybe<TCustomFieldsCommand>;
  department?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  fax?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  pOBox?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  salutation?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  streetName?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type TAddressInput = {
  additionalAddressInfo?: InputMaybe<Scalars['String']>;
  additionalStreetInfo?: InputMaybe<Scalars['String']>;
  apartment?: InputMaybe<Scalars['String']>;
  building?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  country: Scalars['Country'];
  custom?: InputMaybe<TCustomFieldsDraft>;
  department?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
  fax?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  mobile?: InputMaybe<Scalars['String']>;
  pOBox?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  salutation?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export enum TAnonymousCartSignInMode {
  /**
   * `LineItem`s of the anonymous cart will be copied to the customer’s active cart that has been modified most recently.
   *
   * The `CartState` of the anonymous cart gets changed to `Merged` while the `CartState` of the customer’s cart remains `Active`.
   *
   * `CustomLineItems` and `CustomFields` of the anonymous cart will not be copied to the customers cart.
   *
   * If a `LineItem` in the anonymous cart matches an existing line item in the customer’s cart (same product ID and variant ID), the maximum quantity of both LineItems is used as the new quantity. In that case `CustomFields` on the `LineItem` of the anonymous cart will not be in the resulting `LineItem`.
   */
  MergeWithExistingCustomerCart = 'MergeWithExistingCustomerCart',
  /** The anonymous cart is used as new active customer cart. No `LineItem`s get merged. */
  UseAsNewActiveCustomerCart = 'UseAsNewActiveCustomerCart'
}

export type TApplied = TOrderEditResult & {
  __typename?: 'Applied';
  appliedAt: Scalars['DateTime'];
  excerptAfterEdit: TOrderExcerpt;
  excerptBeforeEdit: TOrderExcerpt;
  type: Scalars['String'];
};

export type TApplyCartDeltaToCustomLineItemShippingDetailsTargets = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  targetsDelta: Array<TShippingTargetDraft>;
};

export type TApplyCartDeltaToLineItemShippingDetailsTargets = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  targetsDelta: Array<TShippingTargetDraft>;
};

export type TApplyStagedChanges = {
  dummy?: InputMaybe<Scalars['String']>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalFlow = TVersioned & {
  __typename?: 'ApprovalFlow';
  approvals: Array<TApprovalFlowApproval>;
  businessUnit: TBusinessUnit;
  businessUnitRef: TKeyReference;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  currentTierPendingApprovers: Array<TRuleApprover>;
  eligibleApprovers: Array<TRuleApprover>;
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  order?: Maybe<TOrder>;
  orderRef: TReference;
  pendingApprovers: Array<TRuleApprover>;
  rejection?: Maybe<TApprovalFlowRejection>;
  rules: Array<TApprovalRule>;
  status: Scalars['String'];
  version: Scalars['Long'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalFlowApproval = {
  __typename?: 'ApprovalFlowApproval';
  approvedAt: Scalars['DateTime'];
  approver: TAssociate;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalFlowApproved = TMessagePayload & {
  __typename?: 'ApprovalFlowApproved';
  associate?: Maybe<TCustomer>;
  associateRef?: Maybe<TReference>;
  order?: Maybe<TOrder>;
  orderRef?: Maybe<TReference>;
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalFlowCompleted = TMessagePayload & {
  __typename?: 'ApprovalFlowCompleted';
  order?: Maybe<TOrder>;
  orderRef?: Maybe<TReference>;
  status: Scalars['String'];
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalFlowCreated = TMessagePayload & {
  __typename?: 'ApprovalFlowCreated';
  approvalFlow: TApprovalFlow;
  type: Scalars['String'];
};

export type TApprovalFlowQueryResult = {
  __typename?: 'ApprovalFlowQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TApprovalFlow>;
  total: Scalars['Long'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalFlowRejected = TMessagePayload & {
  __typename?: 'ApprovalFlowRejected';
  associate?: Maybe<TCustomer>;
  associateRef?: Maybe<TReference>;
  order?: Maybe<TOrder>;
  orderRef?: Maybe<TReference>;
  rejectionReason?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalFlowRejection = {
  __typename?: 'ApprovalFlowRejection';
  reason?: Maybe<Scalars['String']>;
  rejectedAt: Scalars['DateTime'];
  rejecter: TAssociate;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalFlowUpdateAction = {
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  approve?: InputMaybe<TApproveApprovalFlow>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  reject?: InputMaybe<TRejectApprovalFlow>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRule = TVersioned & {
  __typename?: 'ApprovalRule';
  approvers: TApproverHierarchy;
  businessUnit: TBusinessUnit;
  businessUnitRef: TKeyReference;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name: Scalars['String'];
  predicate: Scalars['String'];
  requesters: Array<TRuleRequester>;
  status: TApprovalRuleStatus;
  version: Scalars['Long'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRuleApproversSet = TMessagePayload & {
  __typename?: 'ApprovalRuleApproversSet';
  approvers: TApproverHierarchy;
  oldApprovers: TApproverHierarchy;
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRuleCreated = TMessagePayload & {
  __typename?: 'ApprovalRuleCreated';
  approvalRule: TApprovalRule;
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRuleDescriptionSet = TMessagePayload & {
  __typename?: 'ApprovalRuleDescriptionSet';
  description?: Maybe<Scalars['String']>;
  oldDescription?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRuleDraft = {
  approvers: TApproverHierarchyDraft;
  description?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  predicate: Scalars['String'];
  requesters: Array<TRuleRequesterDraft>;
  status: TApprovalRuleStatus;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRuleKeySet = TMessagePayload & {
  __typename?: 'ApprovalRuleKeySet';
  key?: Maybe<Scalars['String']>;
  oldKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRuleNameSet = TMessagePayload & {
  __typename?: 'ApprovalRuleNameSet';
  name: Scalars['String'];
  oldName: Scalars['String'];
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRulePredicateSet = TMessagePayload & {
  __typename?: 'ApprovalRulePredicateSet';
  oldPredicate: Scalars['String'];
  predicate: Scalars['String'];
  type: Scalars['String'];
};

export type TApprovalRuleQueryResult = {
  __typename?: 'ApprovalRuleQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TApprovalRule>;
  total: Scalars['Long'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRuleRequestersSet = TMessagePayload & {
  __typename?: 'ApprovalRuleRequestersSet';
  oldRequesters: Array<TRuleRequester>;
  requesters: Array<TRuleRequester>;
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export enum TApprovalRuleStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRuleStatusSet = TMessagePayload & {
  __typename?: 'ApprovalRuleStatusSet';
  oldStatus: TApprovalRuleStatus;
  status: TApprovalRuleStatus;
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApprovalRuleUpdateAction = {
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setApprovers?: InputMaybe<TSetApprovalRuleApprovers>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setDescription?: InputMaybe<TSetApprovalRuleDescription>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setKey?: InputMaybe<TSetApprovalRuleKey>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setName?: InputMaybe<TSetApprovalRuleName>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setPredicate?: InputMaybe<TSetApprovalRulePredicate>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setRequesters?: InputMaybe<TSetApprovalRuleRequesters>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setStatus?: InputMaybe<TSetApprovalRuleStatus>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApproveApprovalFlow = {
  dummy?: InputMaybe<Scalars['String']>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApproverConjunction = {
  __typename?: 'ApproverConjunction';
  and: Array<TApproverDisjunction>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApproverConjunctionDraft = {
  and: Array<TApproverDisjunctionDraft>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApproverDisjunction = {
  __typename?: 'ApproverDisjunction';
  or: Array<TRuleApprover>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApproverDisjunctionDraft = {
  or: Array<TRuleApproverDraft>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApproverHierarchy = {
  __typename?: 'ApproverHierarchy';
  tiers: Array<TApproverConjunction>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TApproverHierarchyDraft = {
  tiers: Array<TApproverConjunctionDraft>;
};

export type TAsAssociate = TCartQueryInterface & TOrderQueryInterface & TQuoteQueryInterface & TQuoteRequestQueryInterface & {
  __typename?: 'AsAssociate';
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  approvalFlow?: Maybe<TApprovalFlow>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  approvalFlows: TApprovalFlowQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  approvalRule?: Maybe<TApprovalRule>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  approvalRules: TApprovalRuleQueryResult;
  businessUnit?: Maybe<TBusinessUnit>;
  businessUnits: TBusinessUnitQueryResult;
  cart?: Maybe<TCart>;
  carts: TCartQueryResult;
  order?: Maybe<TOrder>;
  orders: TOrderQueryResult;
  quote?: Maybe<TQuote>;
  quoteRequest?: Maybe<TQuoteRequest>;
  quoteRequests: TQuoteRequestQueryResult;
  quotes: TQuoteQueryResult;
};


export type TAsAssociate_ApprovalFlowArgs = {
  id: Scalars['String'];
};


export type TAsAssociate_ApprovalFlowsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_ApprovalRuleArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_ApprovalRulesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_BusinessUnitArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_BusinessUnitsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_CartArgs = {
  id: Scalars['String'];
};


export type TAsAssociate_CartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_OrderArgs = {
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_OrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_QuoteArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_QuoteRequestArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_QuoteRequestsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TAsAssociate_QuotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TAsAssociateArgument = {
  associateId: Scalars['String'];
  businessUnitKey: Scalars['KeyReferenceInput'];
};

export type TAsset = {
  __typename?: 'Asset';
  custom?: Maybe<TCustomFieldsType>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  sources: Array<TAssetSource>;
  tags: Array<Scalars['String']>;
};


export type TAsset_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TAsset_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TAssetDimensions = {
  __typename?: 'AssetDimensions';
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type TAssetDimensionsInput = {
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type TAssetDraftInput = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  key?: InputMaybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  sources?: InputMaybe<Array<TAssetSourceInput>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<TResourceIdentifierInput>;
};

export type TAssetSource = {
  __typename?: 'AssetSource';
  contentType?: Maybe<Scalars['String']>;
  dimensions?: Maybe<TAssetDimensions>;
  key?: Maybe<Scalars['String']>;
  uri: Scalars['String'];
};

export type TAssetSourceInput = {
  contentType?: InputMaybe<Scalars['String']>;
  dimensions?: InputMaybe<TAssetDimensionsInput>;
  key?: InputMaybe<Scalars['String']>;
  uri: Scalars['String'];
};

export type TAssociate = {
  __typename?: 'Associate';
  associateRoleAssignments: Array<TAssociateRoleAssignment>;
  customer?: Maybe<TCustomer>;
  customerRef?: Maybe<TReference>;
};

export type TAssociateDraft = {
  associateRoleAssignments?: InputMaybe<Array<TAssociateRoleAssignmentDraft>>;
  customer: TResourceIdentifierInput;
};

export enum TAssociateInheritanceMode {
  Disabled = 'Disabled',
  Enabled = 'Enabled'
}

export type TAssociateRole = TVersioned & {
  __typename?: 'AssociateRole';
  buyerAssignable: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  key: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name?: Maybe<Scalars['String']>;
  permissions: Array<TPermission>;
  version: Scalars['Long'];
};

export type TAssociateRoleAssignment = {
  __typename?: 'AssociateRoleAssignment';
  associateRole: TAssociateRole;
  associateRoleRef?: Maybe<TKeyReference>;
  inheritance: TAssociateInheritanceMode;
};

export type TAssociateRoleAssignmentDraft = {
  associateRole: TResourceIdentifierInput;
  inheritance?: InputMaybe<TAssociateInheritanceMode>;
};

export type TAssociateRoleBuyerAssignableChanged = TMessagePayload & {
  __typename?: 'AssociateRoleBuyerAssignableChanged';
  buyerAssignable: Scalars['Boolean'];
  type: Scalars['String'];
};

export type TAssociateRoleCreated = TMessagePayload & {
  __typename?: 'AssociateRoleCreated';
  associateRole: TAssociateRole;
  type: Scalars['String'];
};

export type TAssociateRoleDeleted = TMessagePayload & {
  __typename?: 'AssociateRoleDeleted';
  type: Scalars['String'];
};

export type TAssociateRoleDraft = {
  buyerAssignable: Scalars['Boolean'];
  custom?: InputMaybe<TCustomFieldsDraft>;
  key: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<TPermission>>;
};

export type TAssociateRoleNameSet = TMessagePayload & {
  __typename?: 'AssociateRoleNameSet';
  name?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TAssociateRolePermissionAdded = TMessagePayload & {
  __typename?: 'AssociateRolePermissionAdded';
  permission: TPermission;
  type: Scalars['String'];
};

export type TAssociateRolePermissionRemoved = TMessagePayload & {
  __typename?: 'AssociateRolePermissionRemoved';
  permission: TPermission;
  type: Scalars['String'];
};

export type TAssociateRolePermissionsSet = TMessagePayload & {
  __typename?: 'AssociateRolePermissionsSet';
  permissions?: Maybe<Array<TPermission>>;
  type: Scalars['String'];
};

export type TAssociateRoleQueryResult = {
  __typename?: 'AssociateRoleQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TAssociateRole>;
  total: Scalars['Long'];
};

export type TAssociateRoleUpdateAction = {
  addPermission?: InputMaybe<TAddAssociateRolePermission>;
  changeBuyerAssignable?: InputMaybe<TChangeAssociateRoleBuyerAssignable>;
  removePermission?: InputMaybe<TRemoveAssociateRolePermission>;
  setCustomField?: InputMaybe<TSetAssociateRoleCustomField>;
  setCustomType?: InputMaybe<TSetAssociateRoleCustomType>;
  setName?: InputMaybe<TSetAssociateRoleName>;
  setPermissions?: InputMaybe<TSetAssociateRolePermissions>;
};

export type TAttribute = {
  name: Scalars['String'];
};

export enum TAttributeConstraint {
  /** A set of attributes, that have this constraint, should have different combinations in each variant */
  CombinationUnique = 'CombinationUnique',
  /** No constraints are applied to the attribute */
  None = 'None',
  /** Attribute value should be the same in all variants */
  SameForAll = 'SameForAll',
  /** Attribute value should be different in each variant */
  Unique = 'Unique'
}

export type TAttributeDefinition = {
  __typename?: 'AttributeDefinition';
  attributeConstraint: TAttributeConstraint;
  inputHint: TTextInputHint;
  inputTip?: Maybe<Scalars['String']>;
  inputTipAllLocales?: Maybe<Array<TLocalizedString>>;
  isRequired: Scalars['Boolean'];
  isSearchable: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
  name: Scalars['String'];
  type: TAttributeDefinitionType;
};


export type TAttributeDefinition_InputTipArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TAttributeDefinition_LabelArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TAttributeDefinitionDraft = {
  attributeConstraint?: InputMaybe<TAttributeConstraint>;
  inputHint?: InputMaybe<TTextInputHint>;
  inputTip?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  isRequired: Scalars['Boolean'];
  isSearchable: Scalars['Boolean'];
  label: Array<TLocalizedStringItemInputType>;
  name: Scalars['String'];
  type: TAttributeTypeDraft;
};

export type TAttributeDefinitionResult = {
  __typename?: 'AttributeDefinitionResult';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  results: Array<TAttributeDefinition>;
  total: Scalars['Int'];
};

/** (https://docs.commercetools.com/api/projects/productTypes#attributetype)[https://docs.commercetools.com/api/projects/productTypes#attributetype] */
export type TAttributeDefinitionType = {
  name: Scalars['String'];
};

export type TAttributeGroup = TVersioned & {
  __typename?: 'AttributeGroup';
  attributes: Array<TAttributeReference>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  version: Scalars['Long'];
};


export type TAttributeGroup_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TAttributeGroup_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TAttributeGroupDraft = {
  attributes: Array<TAttributeReferenceInput>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  key?: InputMaybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
};

export type TAttributeGroupLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'AttributeGroupLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TAttributeGroupLimitsProjection = {
  __typename?: 'AttributeGroupLimitsProjection';
  total: TAttributeGroupLimitWithCurrent;
};

export type TAttributeGroupQueryResult = {
  __typename?: 'AttributeGroupQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TAttributeGroup>;
  total: Scalars['Long'];
};

export type TAttributeGroupUpdateAction = {
  addAttribute?: InputMaybe<TAddAttributeGroupAttribute>;
  changeName?: InputMaybe<TChangeAttributeGroupName>;
  removeAttribute?: InputMaybe<TRemoveAttributeGroupAttribute>;
  setAttributes?: InputMaybe<TSetAttributeGroupAttributes>;
  setDescription?: InputMaybe<TSetAttributeGroupDescription>;
  setKey?: InputMaybe<TSetAttributeGroupKey>;
};

export type TAttributeReference = {
  __typename?: 'AttributeReference';
  key: Scalars['String'];
};

export type TAttributeReferenceInput = {
  key: Scalars['String'];
};

export type TAttributeSetElementTypeDraft = {
  boolean?: InputMaybe<TSimpleAttributeTypeDraft>;
  date?: InputMaybe<TSimpleAttributeTypeDraft>;
  datetime?: InputMaybe<TSimpleAttributeTypeDraft>;
  enum?: InputMaybe<TEnumTypeDraft>;
  lenum?: InputMaybe<TLocalizableEnumTypeDraft>;
  ltext?: InputMaybe<TSimpleAttributeTypeDraft>;
  money?: InputMaybe<TSimpleAttributeTypeDraft>;
  number?: InputMaybe<TSimpleAttributeTypeDraft>;
  reference?: InputMaybe<TReferenceTypeDefinitionDraft>;
  text?: InputMaybe<TSimpleAttributeTypeDraft>;
  time?: InputMaybe<TSimpleAttributeTypeDraft>;
};

export type TAttributeSetTypeDraft = {
  elementType: TAttributeSetElementTypeDraft;
};

export type TAttributeTypeDraft = {
  boolean?: InputMaybe<TSimpleAttributeTypeDraft>;
  date?: InputMaybe<TSimpleAttributeTypeDraft>;
  datetime?: InputMaybe<TSimpleAttributeTypeDraft>;
  enum?: InputMaybe<TEnumTypeDraft>;
  lenum?: InputMaybe<TLocalizableEnumTypeDraft>;
  ltext?: InputMaybe<TSimpleAttributeTypeDraft>;
  money?: InputMaybe<TSimpleAttributeTypeDraft>;
  number?: InputMaybe<TSimpleAttributeTypeDraft>;
  reference?: InputMaybe<TReferenceTypeDefinitionDraft>;
  set?: InputMaybe<TAttributeSetTypeDraft>;
  text?: InputMaybe<TSimpleAttributeTypeDraft>;
  time?: InputMaybe<TSimpleAttributeTypeDraft>;
};

/** AuthenticationMode values. BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export enum TAuthenticationMode {
  ExternalAuth = 'ExternalAuth',
  Password = 'Password'
}

export type TAuthorizationHeader = THttpDestinationAuthentication & {
  __typename?: 'AuthorizationHeader';
  headerValue: Scalars['String'];
  type: Scalars['String'];
};

export type TAuthorizationHeaderInput = {
  headerValue: Scalars['String'];
};

export enum TAwsAuthenticationMode {
  Credentials = 'Credentials',
  Iam = 'IAM'
}

export type TAzureFunctionsAuthentication = THttpDestinationAuthentication & {
  __typename?: 'AzureFunctionsAuthentication';
  key: Scalars['String'];
  type: Scalars['String'];
};

export type TAzureFunctionsAuthenticationInput = {
  key: Scalars['String'];
};

export type TAzureServiceBusDestination = TDestination & {
  __typename?: 'AzureServiceBusDestination';
  connectionString: Scalars['String'];
  type: Scalars['String'];
};

export type TAzureServiceBusDestinationInput = {
  connectionString: Scalars['String'];
};

export type TBaseMoney = {
  centAmount: Scalars['Long'];
  currencyCode: Scalars['Currency'];
  fractionDigits: Scalars['Int'];
  type: Scalars['String'];
};

export type TBaseMoneyInput = {
  centPrecision?: InputMaybe<TMoneyInput>;
  highPrecision?: InputMaybe<THighPrecisionMoneyInput>;
};

export type TBaseSearchKeywordInput = {
  custom?: InputMaybe<TCustomSuggestTokenizerInput>;
  whitespace?: InputMaybe<TWhitespaceSuggestTokenizerInput>;
};

export type TBooleanAttribute = TAttribute & {
  __typename?: 'BooleanAttribute';
  name: Scalars['String'];
  value: Scalars['Boolean'];
};

export type TBooleanAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'BooleanAttributeDefinitionType';
  name: Scalars['String'];
};

export type TBooleanField = TCustomField & {
  __typename?: 'BooleanField';
  name: Scalars['String'];
  value: Scalars['Boolean'];
};

export type TBooleanType = TFieldType & {
  __typename?: 'BooleanType';
  name: Scalars['String'];
};

export type TBusinessUnit = TVersioned & {
  __typename?: 'BusinessUnit';
  addresses: Array<TAddress>;
  /** This field contains the BusinessUnits KeyReferences from the Company to the parent Division of this BusinessUnit in that order. */
  ancestors: Array<TBusinessUnit>;
  associateMode: TBusinessUnitAssociateMode;
  associates: Array<TAssociate>;
  billingAddressIds: Array<Scalars['String']>;
  billingAddresses: Array<TAddress>;
  contactEmail?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  defaultBillingAddress?: Maybe<TAddress>;
  defaultBillingAddressId?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<TAddress>;
  defaultShippingAddressId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  inheritedAssociates?: Maybe<Array<TInheritedAssociate>>;
  /** This field contains the inherited stores from its parentUnit if storeMode is set to FromParent. */
  inheritedStores?: Maybe<Array<TInheritedStore>>;
  key: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name: Scalars['String'];
  parentUnit?: Maybe<TBusinessUnit>;
  parentUnitRef?: Maybe<TKeyReference>;
  shippingAddressIds: Array<Scalars['String']>;
  shippingAddresses: Array<TAddress>;
  status: TBusinessUnitStatus;
  storeMode?: Maybe<Scalars['String']>;
  stores?: Maybe<Array<TStore>>;
  storesRef?: Maybe<Array<TKeyReference>>;
  topLevelUnit: TBusinessUnit;
  topLevelUnitRef?: Maybe<TKeyReference>;
  unitType: TBusinessUnitType;
  version: Scalars['Long'];
};

export type TBusinessUnitAddressAdded = TMessagePayload & {
  __typename?: 'BusinessUnitAddressAdded';
  address: TAddress;
  type: Scalars['String'];
};

export type TBusinessUnitAddressChanged = TMessagePayload & {
  __typename?: 'BusinessUnitAddressChanged';
  address: TAddress;
  type: Scalars['String'];
};

export type TBusinessUnitAddressCustomFieldAdded = TMessagePayload & {
  __typename?: 'BusinessUnitAddressCustomFieldAdded';
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TBusinessUnitAddressCustomFieldChanged = TMessagePayload & {
  __typename?: 'BusinessUnitAddressCustomFieldChanged';
  name: Scalars['String'];
  oldValue?: Maybe<Scalars['Json']>;
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TBusinessUnitAddressCustomFieldRemoved = TMessagePayload & {
  __typename?: 'BusinessUnitAddressCustomFieldRemoved';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TBusinessUnitAddressCustomTypeRemoved = TMessagePayload & {
  __typename?: 'BusinessUnitAddressCustomTypeRemoved';
  oldTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TBusinessUnitAddressCustomTypeSet = TMessagePayload & {
  __typename?: 'BusinessUnitAddressCustomTypeSet';
  customFields: TCustomFieldsType;
  oldTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TBusinessUnitAddressRemoved = TMessagePayload & {
  __typename?: 'BusinessUnitAddressRemoved';
  address: TAddress;
  type: Scalars['String'];
};

export type TBusinessUnitAssociateAdded = TMessagePayload & {
  __typename?: 'BusinessUnitAssociateAdded';
  associate: TAssociate;
  type: Scalars['String'];
};

export type TBusinessUnitAssociateChanged = TMessagePayload & {
  __typename?: 'BusinessUnitAssociateChanged';
  associate: TAssociate;
  type: Scalars['String'];
};

export enum TBusinessUnitAssociateMode {
  Explicit = 'Explicit',
  ExplicitAndFromParent = 'ExplicitAndFromParent'
}

export type TBusinessUnitAssociateModeChanged = TMessagePayload & {
  __typename?: 'BusinessUnitAssociateModeChanged';
  associateMode: TBusinessUnitAssociateMode;
  oldAssociateMode?: Maybe<TBusinessUnitAssociateMode>;
  type: Scalars['String'];
};

export type TBusinessUnitAssociateRemoved = TMessagePayload & {
  __typename?: 'BusinessUnitAssociateRemoved';
  associate: TAssociate;
  type: Scalars['String'];
};

export type TBusinessUnitAssociatesSet = TMessagePayload & {
  __typename?: 'BusinessUnitAssociatesSet';
  associates: Array<TAssociate>;
  type: Scalars['String'];
};

export type TBusinessUnitBillingAddressAdded = TMessagePayload & {
  __typename?: 'BusinessUnitBillingAddressAdded';
  address: TAddress;
  type: Scalars['String'];
};

export type TBusinessUnitBillingAddressRemoved = TMessagePayload & {
  __typename?: 'BusinessUnitBillingAddressRemoved';
  address: TAddress;
  type: Scalars['String'];
};

export type TBusinessUnitConfiguration = {
  __typename?: 'BusinessUnitConfiguration';
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  myBusinessUnitAssociateRoleOnCreation?: Maybe<TAssociateRole>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  myBusinessUnitAssociateRoleOnCreationRef?: Maybe<TKeyReference>;
  myBusinessUnitStatusOnCreation: TBusinessUnitConfigurationStatus;
};

export enum TBusinessUnitConfigurationStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

export type TBusinessUnitContactEmailSet = TMessagePayload & {
  __typename?: 'BusinessUnitContactEmailSet';
  contactEmail?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TBusinessUnitCreated = TMessagePayload & {
  __typename?: 'BusinessUnitCreated';
  businessUnit: TBusinessUnit;
  type: Scalars['String'];
};

export type TBusinessUnitCustomFieldAdded = TMessagePayload & {
  __typename?: 'BusinessUnitCustomFieldAdded';
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TBusinessUnitCustomFieldChanged = TMessagePayload & {
  __typename?: 'BusinessUnitCustomFieldChanged';
  name: Scalars['String'];
  oldValue?: Maybe<Scalars['Json']>;
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TBusinessUnitCustomFieldRemoved = TMessagePayload & {
  __typename?: 'BusinessUnitCustomFieldRemoved';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TBusinessUnitCustomTypeRemoved = TMessagePayload & {
  __typename?: 'BusinessUnitCustomTypeRemoved';
  oldTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TBusinessUnitCustomTypeSet = TMessagePayload & {
  __typename?: 'BusinessUnitCustomTypeSet';
  customFields: TCustomFieldsType;
  oldTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TBusinessUnitDefaultBillingAddressSet = TMessagePayload & {
  __typename?: 'BusinessUnitDefaultBillingAddressSet';
  address?: Maybe<TAddress>;
  type: Scalars['String'];
};

export type TBusinessUnitDefaultShippingAddressSet = TMessagePayload & {
  __typename?: 'BusinessUnitDefaultShippingAddressSet';
  address?: Maybe<TAddress>;
  type: Scalars['String'];
};

export type TBusinessUnitDeleted = TMessagePayload & {
  __typename?: 'BusinessUnitDeleted';
  type: Scalars['String'];
};

export type TBusinessUnitDraft = {
  addresses?: InputMaybe<Array<TAddressInput>>;
  associateMode?: InputMaybe<TBusinessUnitAssociateMode>;
  associates?: InputMaybe<Array<TAssociateDraft>>;
  /** The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses. */
  billingAddresses?: InputMaybe<Array<Scalars['Int']>>;
  contactEmail?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  /** The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address. */
  defaultBillingAddress?: InputMaybe<Scalars['Int']>;
  /** The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address. */
  defaultShippingAddress?: InputMaybe<Scalars['Int']>;
  key: Scalars['String'];
  name: Scalars['String'];
  parentUnit?: InputMaybe<TResourceIdentifierInput>;
  /** The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses. */
  shippingAddresses?: InputMaybe<Array<Scalars['Int']>>;
  storeMode?: InputMaybe<Scalars['String']>;
  stores?: InputMaybe<Array<TResourceIdentifierInput>>;
  unitType: TBusinessUnitType;
};

export type TBusinessUnitNameChanged = TMessagePayload & {
  __typename?: 'BusinessUnitNameChanged';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TBusinessUnitParentChanged = TMessagePayload & {
  __typename?: 'BusinessUnitParentChanged';
  newParentUnit?: Maybe<TBusinessUnit>;
  newParentUnitRef?: Maybe<TKeyReference>;
  oldParentUnit?: Maybe<TBusinessUnit>;
  oldParentUnitRef?: Maybe<TKeyReference>;
  type: Scalars['String'];
};

export type TBusinessUnitQueryResult = {
  __typename?: 'BusinessUnitQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TBusinessUnit>;
  total: Scalars['Long'];
};

export type TBusinessUnitShippingAddressAdded = TMessagePayload & {
  __typename?: 'BusinessUnitShippingAddressAdded';
  address: TAddress;
  type: Scalars['String'];
};

export type TBusinessUnitShippingAddressRemoved = TMessagePayload & {
  __typename?: 'BusinessUnitShippingAddressRemoved';
  address: TAddress;
  type: Scalars['String'];
};

export enum TBusinessUnitStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

export type TBusinessUnitStatusChanged = TMessagePayload & {
  __typename?: 'BusinessUnitStatusChanged';
  status: TBusinessUnitStatus;
  type: Scalars['String'];
};

export type TBusinessUnitStoreAdded = TMessagePayload & {
  __typename?: 'BusinessUnitStoreAdded';
  store: TStore;
  storeRef: TKeyReference;
  type: Scalars['String'];
};

export type TBusinessUnitStoreModeChanged = TMessagePayload & {
  __typename?: 'BusinessUnitStoreModeChanged';
  oldStoreMode: Scalars['String'];
  oldStores?: Maybe<Array<TStore>>;
  oldStoresRef?: Maybe<Array<TKeyReference>>;
  storeMode: Scalars['String'];
  stores?: Maybe<Array<TStore>>;
  storesRef?: Maybe<Array<TKeyReference>>;
  type: Scalars['String'];
};

export type TBusinessUnitStoreRemoved = TMessagePayload & {
  __typename?: 'BusinessUnitStoreRemoved';
  store: TStore;
  storeRef: TKeyReference;
  type: Scalars['String'];
};

export type TBusinessUnitStoresSet = TMessagePayload & {
  __typename?: 'BusinessUnitStoresSet';
  stores: Array<TStore>;
  storesRef: Array<TKeyReference>;
  type: Scalars['String'];
};

export enum TBusinessUnitType {
  Company = 'Company',
  Division = 'Division'
}

export type TBusinessUnitUpdateAction = {
  addAddress?: InputMaybe<TAddBusinessUnitAddress>;
  addAssociate?: InputMaybe<TAddBusinessUnitAssociate>;
  addBillingAddressId?: InputMaybe<TAddBusinessUnitBillingAddressId>;
  addShippingAddressId?: InputMaybe<TAddBusinessUnitShippingAddressId>;
  addStore?: InputMaybe<TAddBusinessUnitStore>;
  changeAddress?: InputMaybe<TChangeBusinessUnitAddress>;
  changeAssociate?: InputMaybe<TChangeBusinessUnitAssociate>;
  changeAssociateMode?: InputMaybe<TChangeBusinessUnitAssociateMode>;
  changeName?: InputMaybe<TChangeBusinessUnitName>;
  changeParentUnit?: InputMaybe<TChangeBusinessUnitParentUnit>;
  changeStatus?: InputMaybe<TChangeBusinessUnitStatus>;
  removeAddress?: InputMaybe<TRemoveBusinessUnitAddress>;
  removeAssociate?: InputMaybe<TRemoveBusinessUnitAssociate>;
  removeBillingAddressId?: InputMaybe<TRemoveBusinessUnitBillingAddressId>;
  removeShippingAddressId?: InputMaybe<TRemoveBusinessUnitShippingAddressId>;
  removeStore?: InputMaybe<TRemoveBusinessUnitStore>;
  setAddressCustomField?: InputMaybe<TSetBusinessUnitAddressCustomField>;
  setAddressCustomType?: InputMaybe<TSetBusinessUnitAddressCustomType>;
  setAssociates?: InputMaybe<TSetBusinessUnitAssociates>;
  setContactEmail?: InputMaybe<TSetBusinessUnitContactEmail>;
  setCustomField?: InputMaybe<TSetBusinessUnitCustomField>;
  setCustomType?: InputMaybe<TSetBusinessUnitCustomType>;
  setDefaultBillingAddress?: InputMaybe<TSetBusinessUnitDefaultBillingAddress>;
  setDefaultShippingAddress?: InputMaybe<TSetBusinessUnitDefaultShippingAddress>;
  setStoreMode?: InputMaybe<TSetBusinessUnitStoreMode>;
  setStores?: InputMaybe<TSetBusinessUnitStores>;
};

export type TCancelQuoteRequest = {
  dummy?: InputMaybe<Scalars['String']>;
};

/** A shopping cart holds product variants and can be ordered. Each cart either belongs to a registered customer or is an anonymous cart. */
export type TCart = TReferenceExpandable & TVersioned & {
  __typename?: 'Cart';
  anonymousId?: Maybe<Scalars['String']>;
  billingAddress?: Maybe<TAddress>;
  businessUnit?: Maybe<TBusinessUnit>;
  businessUnitRef?: Maybe<TKeyReference>;
  cartState: TCartState;
  country?: Maybe<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customLineItems: Array<TCustomLineItem>;
  customer?: Maybe<TCustomer>;
  customerEmail?: Maybe<Scalars['String']>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  customerId?: Maybe<Scalars['String']>;
  deleteDaysAfterLastModification?: Maybe<Scalars['Int']>;
  directDiscounts: Array<TDirectDiscount>;
  discountCodes: Array<TDiscountCodeInfo>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  discountOnTotalPrice?: Maybe<TDiscountOnTotalPrice>;
  id: Scalars['String'];
  inventoryMode: TInventoryMode;
  itemShippingAddresses: Array<TAddress>;
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  lineItems: Array<TLineItem>;
  locale?: Maybe<Scalars['Locale']>;
  origin: TCartOrigin;
  paymentInfo?: Maybe<TPaymentInfo>;
  refusedGifts: Array<TCartDiscount>;
  refusedGiftsRefs: Array<TReference>;
  shipping: Array<TShipping>;
  shippingAddress?: Maybe<TAddress>;
  shippingCustomFields?: Maybe<TCustomFieldsType>;
  shippingInfo?: Maybe<TShippingInfo>;
  shippingKey?: Maybe<Scalars['String']>;
  shippingMode: TShippingMode;
  shippingRateInput?: Maybe<TShippingRateInput>;
  store?: Maybe<TStore>;
  storeRef?: Maybe<TKeyReference>;
  taxCalculationMode: TTaxCalculationMode;
  taxMode: TTaxMode;
  taxRoundingMode: TRoundingMode;
  taxedPrice?: Maybe<TTaxedPrice>;
  taxedShippingPrice?: Maybe<TTaxedPrice>;
  totalLineItemQuantity?: Maybe<Scalars['Long']>;
  totalPrice: TMoney;
  version: Scalars['Long'];
};


/** A shopping cart holds product variants and can be ordered. Each cart either belongs to a registered customer or is an anonymous cart. */
export type TCart_LineItemsArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type TCartClassificationInput = {
  values: Array<TLocalizedEnumValueInput>;
};

export type TCartClassificationType = TShippingRateInputType & {
  __typename?: 'CartClassificationType';
  type: Scalars['String'];
  values: Array<TShippingRateInputLocalizedEnumValue>;
};

export type TCartCreated = TMessagePayload & {
  __typename?: 'CartCreated';
  discountCodesRefs: Array<TReference>;
  lineItemCount: Scalars['Int'];
  totalPrice: TMoney;
  type: Scalars['String'];
};

/**
 *
 * Cart discounts are recalculated every time LineItems or CustomLineItems are added or removed from the Cart or an order is created from the cart.
 *
 * The number of active cart discounts that do not require a discount code (isActive=true and requiresDiscountCode=false) is limited to 100.
 *
 */
export type TCartDiscount = TReferenceExpandable & TVersioned & {
  __typename?: 'CartDiscount';
  cartPredicate: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  referenceRefs: Array<TReference>;
  requiresDiscountCode: Scalars['Boolean'];
  sortOrder: Scalars['String'];
  stackingMode: TStackingMode;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  stores: Array<TStore>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  storesRef: Array<TKeyReference>;
  target?: Maybe<TCartDiscountTarget>;
  validFrom?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
  value: TCartDiscountValue;
  version: Scalars['Long'];
};


/**
 *
 * Cart discounts are recalculated every time LineItems or CustomLineItems are added or removed from the Cart or an order is created from the cart.
 *
 * The number of active cart discounts that do not require a discount code (isActive=true and requiresDiscountCode=false) is limited to 100.
 *
 */
export type TCartDiscount_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


/**
 *
 * Cart discounts are recalculated every time LineItems or CustomLineItems are added or removed from the Cart or an order is created from the cart.
 *
 * The number of active cart discounts that do not require a discount code (isActive=true and requiresDiscountCode=false) is limited to 100.
 *
 */
export type TCartDiscount_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TCartDiscountDraft = {
  cartPredicate: Scalars['String'];
  custom?: InputMaybe<TCustomFieldsDraft>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  key?: InputMaybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  requiresDiscountCode?: InputMaybe<Scalars['Boolean']>;
  sortOrder: Scalars['String'];
  stackingMode?: InputMaybe<TStackingMode>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  stores?: InputMaybe<Array<TResourceIdentifierInput>>;
  target?: InputMaybe<TCartDiscountTargetInput>;
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
  value: TCartDiscountValueInput;
};

export type TCartDiscountLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CartDiscountLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TCartDiscountLimitsProjection = {
  __typename?: 'CartDiscountLimitsProjection';
  totalActiveWithoutDiscountCodes: TCartDiscountLimitWithCurrent;
};

/** Fields to access cartDiscounts. Includes direct access to a single cartDiscount and searching for cartDiscounts. */
export type TCartDiscountQueryInterface = {
  cartDiscount?: Maybe<TCartDiscount>;
  cartDiscounts: TCartDiscountQueryResult;
};


/** Fields to access cartDiscounts. Includes direct access to a single cartDiscount and searching for cartDiscounts. */
export type TCartDiscountQueryInterface_CartDiscountArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


/** Fields to access cartDiscounts. Includes direct access to a single cartDiscount and searching for cartDiscounts. */
export type TCartDiscountQueryInterface_CartDiscountsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TCartDiscountQueryResult = {
  __typename?: 'CartDiscountQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCartDiscount>;
  total: Scalars['Long'];
};

export type TCartDiscountTarget = {
  type: Scalars['String'];
};

export type TCartDiscountTargetInput = {
  customLineItems?: InputMaybe<TCustomLineItemsTargetInput>;
  lineItems?: InputMaybe<TLineItemsTargetInput>;
  multiBuyCustomLineItems?: InputMaybe<TMultiBuyCustomLineItemsTargetInput>;
  multiBuyLineItems?: InputMaybe<TMultiBuyLineItemsTargetInput>;
  shipping?: InputMaybe<TShippingTargetInput>;
  totalPrice?: InputMaybe<TCartDiscountTotalPriceTargetInput>;
};

export type TCartDiscountTotalPriceTarget = TCartDiscountTarget & {
  __typename?: 'CartDiscountTotalPriceTarget';
  type: Scalars['String'];
};

export type TCartDiscountTotalPriceTargetInput = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TCartDiscountUpdateAction = {
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  addStore?: InputMaybe<TAddCartDiscountStore>;
  changeCartPredicate?: InputMaybe<TChangeCartDiscountCartPredicate>;
  changeIsActive?: InputMaybe<TChangeCartDiscountIsActive>;
  changeName?: InputMaybe<TChangeCartDiscountName>;
  changeRequiresDiscountCode?: InputMaybe<TChangeCartDiscountRequiresDiscountCode>;
  changeSortOrder?: InputMaybe<TChangeCartDiscountSortOrder>;
  changeStackingMode?: InputMaybe<TChangeCartDiscountStackingMode>;
  changeTarget?: InputMaybe<TChangeCartDiscountTarget>;
  changeValue?: InputMaybe<TChangeCartDiscountValue>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  removeStore?: InputMaybe<TRemoveCartDiscountStore>;
  setCustomField?: InputMaybe<TSetCartDiscountCustomField>;
  setCustomType?: InputMaybe<TSetCartDiscountCustomType>;
  setDescription?: InputMaybe<TSetCartDiscountDescription>;
  setKey?: InputMaybe<TSetCartDiscountKey>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setStores?: InputMaybe<TSetCartDiscountStores>;
  setValidFrom?: InputMaybe<TSetCartDiscountValidFrom>;
  setValidFromAndUntil?: InputMaybe<TSetCartDiscountValidFromAndUntil>;
  setValidUntil?: InputMaybe<TSetCartDiscountValidUntil>;
};

export type TCartDiscountValue = {
  type: Scalars['String'];
};

export type TCartDiscountValueBaseMoneyInput = {
  /** CurrencyCode and centAmount are deprecated. Please use `Money`(centPrecision) or `HighPrecisionMoney`(highPrecision). */
  centAmount?: InputMaybe<Scalars['Long']>;
  centPrecision?: InputMaybe<TMoneyInput>;
  /** CurrencyCode and centAmount are deprecated. Please use `Money`(centPrecision) or `HighPrecisionMoney`(highPrecision). */
  currencyCode?: InputMaybe<Scalars['Currency']>;
  highPrecision?: InputMaybe<THighPrecisionMoneyInput>;
};

export type TCartDiscountValueInput = {
  absolute?: InputMaybe<TAbsoluteDiscountValueInput>;
  fixed?: InputMaybe<TFixedPriceDiscountValueInput>;
  giftLineItem?: InputMaybe<TGiftLineItemValueInput>;
  relative?: InputMaybe<TRelativeDiscountValueInput>;
};

export type TCartDraft = {
  anonymousId?: InputMaybe<Scalars['String']>;
  billingAddress?: InputMaybe<TAddressInput>;
  businessUnit?: InputMaybe<TResourceIdentifierInput>;
  country?: InputMaybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  custom?: InputMaybe<TCustomFieldsDraft>;
  customLineItems?: InputMaybe<Array<TCustomLineItemDraft>>;
  customShipping?: InputMaybe<Array<TCustomShippingDraft>>;
  customerEmail?: InputMaybe<Scalars['String']>;
  customerGroup?: InputMaybe<TResourceIdentifierInput>;
  customerId?: InputMaybe<Scalars['String']>;
  deleteDaysAfterLastModification?: InputMaybe<Scalars['Int']>;
  discountCodes?: InputMaybe<Array<Scalars['String']>>;
  externalTaxRateForShippingMethod?: InputMaybe<TExternalTaxRateDraft>;
  inventoryMode?: InputMaybe<TInventoryMode>;
  itemShippingAddresses?: InputMaybe<Array<TAddressInput>>;
  key?: InputMaybe<Scalars['String']>;
  lineItems?: InputMaybe<Array<TLineItemDraft>>;
  locale?: InputMaybe<Scalars['Locale']>;
  origin?: InputMaybe<TCartOrigin>;
  shipping?: InputMaybe<Array<TShippingDraft>>;
  shippingAddress?: InputMaybe<TAddressInput>;
  shippingMethod?: InputMaybe<TResourceIdentifierInput>;
  shippingMode?: InputMaybe<TShippingMode>;
  shippingRateInput?: InputMaybe<TShippingRateInputDraft>;
  store?: InputMaybe<TResourceIdentifierInput>;
  taxCalculationMode?: InputMaybe<TTaxCalculationMode>;
  taxMode?: InputMaybe<TTaxMode>;
  taxRoundingMode?: InputMaybe<TRoundingMode>;
};

export type TCartLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CartLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TCartLimitsProjection = {
  __typename?: 'CartLimitsProjection';
  total: TCartLimitWithCurrent;
};

export enum TCartOrigin {
  /** The cart was created by the customer. This is the default value */
  Customer = 'Customer',
  /** The cart was created by the merchant on behalf of the customer */
  Merchant = 'Merchant',
  /** The cart was created by our platform and belongs to a Quote. */
  Quote = 'Quote'
}

/** Fields to access carts. Includes direct access to a single cart and searching for carts. */
export type TCartQueryInterface = {
  cart?: Maybe<TCart>;
  carts: TCartQueryResult;
};


/** Fields to access carts. Includes direct access to a single cart and searching for carts. */
export type TCartQueryInterface_CartArgs = {
  id: Scalars['String'];
};


/** Fields to access carts. Includes direct access to a single cart and searching for carts. */
export type TCartQueryInterface_CartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TCartQueryResult = {
  __typename?: 'CartQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCart>;
  total: Scalars['Long'];
};

export type TCartScoreInput = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TCartScoreType = TShippingRateInputType & {
  __typename?: 'CartScoreType';
  type: Scalars['String'];
};

export enum TCartState {
  /** The cart can be updated and ordered. It is the default state. */
  Active = 'Active',
  /** The cart is frozen. The cart is ready for checkout and a few update actions are not allowed. */
  Frozen = 'Frozen',
  /** Anonymous cart whose content was merged into a customers cart on signin. No further operations on the cart are allowed. */
  Merged = 'Merged',
  /** The cart was ordered. No further operations on the cart are allowed. */
  Ordered = 'Ordered'
}

export type TCartUpdateAction = {
  addCustomLineItem?: InputMaybe<TAddCartCustomLineItem>;
  addCustomShippingMethod?: InputMaybe<TAddCartCustomShippingMethod>;
  addDiscountCode?: InputMaybe<TAddCartDiscountCode>;
  addItemShippingAddress?: InputMaybe<TAddCartItemShippingAddress>;
  addLineItem?: InputMaybe<TAddCartLineItem>;
  addPayment?: InputMaybe<TAddCartPayment>;
  addShippingMethod?: InputMaybe<TAddCartShippingMethod>;
  addShoppingList?: InputMaybe<TAddCartShoppingList>;
  applyDeltaToCustomLineItemShippingDetailsTargets?: InputMaybe<TApplyCartDeltaToCustomLineItemShippingDetailsTargets>;
  applyDeltaToLineItemShippingDetailsTargets?: InputMaybe<TApplyCartDeltaToLineItemShippingDetailsTargets>;
  changeCustomLineItemMoney?: InputMaybe<TChangeCartCustomLineItemMoney>;
  changeCustomLineItemPriceMode?: InputMaybe<TChangeCartCustomLineItemPriceMode>;
  changeCustomLineItemQuantity?: InputMaybe<TChangeCartCustomLineItemQuantity>;
  changeLineItemQuantity?: InputMaybe<TChangeCartLineItemQuantity>;
  changeTaxCalculationMode?: InputMaybe<TChangeCartTaxCalculationMode>;
  changeTaxMode?: InputMaybe<TChangeCartTaxMode>;
  changeTaxRoundingMode?: InputMaybe<TChangeCartTaxRoundingMode>;
  freezeCart?: InputMaybe<TFreezeCart>;
  recalculate?: InputMaybe<TRecalculateCart>;
  removeCustomLineItem?: InputMaybe<TRemoveCartCustomLineItem>;
  removeDiscountCode?: InputMaybe<TRemoveCartDiscountCode>;
  removeItemShippingAddress?: InputMaybe<TRemoveCartItemShippingAddress>;
  removeLineItem?: InputMaybe<TRemoveCartLineItem>;
  removePayment?: InputMaybe<TRemoveCartPayment>;
  removeShippingMethod?: InputMaybe<TRemoveCartShippingMethod>;
  setAnonymousId?: InputMaybe<TSetCartAnonymousId>;
  setBillingAddress?: InputMaybe<TSetCartBillingAddress>;
  setBillingAddressCustomField?: InputMaybe<TSetCartBillingAddressCustomField>;
  setBillingAddressCustomType?: InputMaybe<TSetCartBillingAddressCustomType>;
  setBusinessUnit?: InputMaybe<TSetCartBusinessUnit>;
  setCartTotalTax?: InputMaybe<TSetCartTotalTax>;
  setCountry?: InputMaybe<TSetCartCountry>;
  setCustomField?: InputMaybe<TSetCartCustomField>;
  setCustomLineItemCustomField?: InputMaybe<TSetCartCustomLineItemCustomField>;
  setCustomLineItemCustomType?: InputMaybe<TSetCartCustomLineItemCustomType>;
  setCustomLineItemShippingDetails?: InputMaybe<TSetCartCustomLineItemShippingDetails>;
  setCustomLineItemTaxAmount?: InputMaybe<TSetCartCustomLineItemTaxAmount>;
  setCustomLineItemTaxRate?: InputMaybe<TSetCartCustomLineItemTaxRate>;
  setCustomShippingMethod?: InputMaybe<TSetCartCustomShippingMethod>;
  setCustomType?: InputMaybe<TSetCartCustomType>;
  setCustomerEmail?: InputMaybe<TSetCartCustomerEmail>;
  setCustomerGroup?: InputMaybe<TSetCartCustomerGroup>;
  setCustomerId?: InputMaybe<TSetCartCustomerId>;
  setDeleteDaysAfterLastModification?: InputMaybe<TSetCartDeleteDaysAfterLastModification>;
  setDirectDiscounts?: InputMaybe<TSetCartDirectDiscounts>;
  setItemShippingAddressCustomField?: InputMaybe<TSetCartItemShippingAddressCustomField>;
  setItemShippingAddressCustomType?: InputMaybe<TSetCartItemShippingAddressCustomType>;
  setKey?: InputMaybe<TSetCartKey>;
  setLineItemCustomField?: InputMaybe<TSetCartLineItemCustomField>;
  setLineItemCustomType?: InputMaybe<TSetCartLineItemCustomType>;
  setLineItemDistributionChannel?: InputMaybe<TSetCartLineItemDistributionChannel>;
  setLineItemInventoryMode?: InputMaybe<TSetCartLineItemInventoryMode>;
  setLineItemPrice?: InputMaybe<TSetCartLineItemPrice>;
  setLineItemShippingDetails?: InputMaybe<TSetCartLineItemShippingDetails>;
  setLineItemSupplyChannel?: InputMaybe<TSetCartLineItemSupplyChannel>;
  setLineItemTaxAmount?: InputMaybe<TSetCartLineItemTaxAmount>;
  setLineItemTaxRate?: InputMaybe<TSetCartLineItemTaxRate>;
  setLineItemTotalPrice?: InputMaybe<TSetCartLineItemTotalPrice>;
  setLocale?: InputMaybe<TSetCartLocale>;
  setShippingAddress?: InputMaybe<TSetCartShippingAddress>;
  setShippingAddressCustomField?: InputMaybe<TSetCartShippingAddressCustomField>;
  setShippingAddressCustomType?: InputMaybe<TSetCartShippingAddressCustomType>;
  setShippingCustomField?: InputMaybe<TSetCartShippingCustomField>;
  setShippingCustomType?: InputMaybe<TSetCartShippingCustomType>;
  setShippingMethod?: InputMaybe<TSetCartShippingMethod>;
  setShippingMethodTaxAmount?: InputMaybe<TSetCartShippingMethodTaxAmount>;
  setShippingMethodTaxRate?: InputMaybe<TSetCartShippingMethodTaxRate>;
  setShippingRateInput?: InputMaybe<TSetCartShippingRateInput>;
  unfreezeCart?: InputMaybe<TUnfreezeCart>;
  updateItemShippingAddress?: InputMaybe<TUpdateCartItemShippingAddress>;
};

export type TCartValueInput = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TCartValueType = TShippingRateInputType & {
  __typename?: 'CartValueType';
  type: Scalars['String'];
};

export type TCartsConfiguration = {
  __typename?: 'CartsConfiguration';
  allowAddingUnpublishedProducts: Scalars['Boolean'];
  countryTaxRateFallbackEnabled: Scalars['Boolean'];
  deleteDaysAfterLastModification?: Maybe<Scalars['Int']>;
};

export type TCartsConfigurationInput = {
  deleteDaysAfterLastModification?: InputMaybe<Scalars['Int']>;
};

export type TCategory = TReferenceExpandable & TVersioned & {
  __typename?: 'Category';
  ancestors: Array<TCategory>;
  ancestorsRef: Array<TReference>;
  assets: Array<TAsset>;
  /** Number of direct child categories. */
  childCount: Scalars['Int'];
  /** Direct child categories. */
  children?: Maybe<Array<TCategory>>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  metaDescription?: Maybe<Scalars['String']>;
  metaDescriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  metaKeywords?: Maybe<Scalars['String']>;
  metaKeywordsAllLocales?: Maybe<Array<TLocalizedString>>;
  metaTitle?: Maybe<Scalars['String']>;
  metaTitleAllLocales?: Maybe<Array<TLocalizedString>>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  orderHint: Scalars['String'];
  parent?: Maybe<TCategory>;
  parentRef?: Maybe<TReference>;
  slug?: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  /** Number of staged products in the category subtree. */
  stagedProductCount: Scalars['Int'];
  version: Scalars['Long'];
};


export type TCategory_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TCategory_MetaDescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TCategory_MetaKeywordsArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TCategory_MetaTitleArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TCategory_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TCategory_SlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TCategoryCreated = TMessagePayload & {
  __typename?: 'CategoryCreated';
  category: TCategory;
  type: Scalars['String'];
};

export type TCategoryDraft = {
  assets?: InputMaybe<Array<TAssetDraftInput>>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  externalId?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  metaDescription?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  metaKeywords?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  metaTitle?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  name: Array<TLocalizedStringItemInputType>;
  orderHint?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<TResourceIdentifierInput>;
  slug: Array<TLocalizedStringItemInputType>;
};

export type TCategoryLimitsProjection = {
  __typename?: 'CategoryLimitsProjection';
  maxCategories: TLimit;
};

export type TCategoryOrderHint = {
  __typename?: 'CategoryOrderHint';
  categoryId: Scalars['String'];
  orderHint: Scalars['String'];
};

export type TCategoryOrderHintInput = {
  orderHint: Scalars['String'];
  uuid: Scalars['String'];
};

export type TCategoryOrderHintProductSearch = {
  __typename?: 'CategoryOrderHintProductSearch';
  categoryId: Scalars['String'];
  orderHint: Scalars['String'];
};

export type TCategoryQueryResult = {
  __typename?: 'CategoryQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCategory>;
  total: Scalars['Long'];
};

export type TCategorySearch = {
  __typename?: 'CategorySearch';
  ancestors: Array<TCategorySearch>;
  ancestorsRef: Array<TReference>;
  assets: Array<TAsset>;
  childCount: Scalars['Int'];
  /** Direct child categories. */
  children: Array<TCategorySearch>;
  createdAt: Scalars['DateTime'];
  custom?: Maybe<TCustomFieldsType>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  orderHint: Scalars['String'];
  parent?: Maybe<TCategorySearch>;
  parentRef?: Maybe<TReference>;
  productTypeNames: Array<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  stagedProductCount: Scalars['Int'];
  version: Scalars['Long'];
};


export type TCategorySearch_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TCategorySearch_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TCategorySearch_SlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TCategorySearchResult = {
  __typename?: 'CategorySearchResult';
  count: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<TCategorySearch>;
  total: Scalars['Int'];
};

export type TCategorySlugChanged = TMessagePayload & {
  __typename?: 'CategorySlugChanged';
  oldSlug?: Maybe<Scalars['String']>;
  oldSlugAllLocales?: Maybe<Array<TLocalizedString>>;
  slug?: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  type: Scalars['String'];
};


export type TCategorySlugChanged_OldSlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TCategorySlugChanged_SlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TCategoryUpdateAction = {
  addAsset?: InputMaybe<TAddCategoryAsset>;
  changeAssetName?: InputMaybe<TChangeCategoryAssetName>;
  changeAssetOrder?: InputMaybe<TChangeCategoryAssetOrder>;
  changeName?: InputMaybe<TChangeCategoryName>;
  changeOrderHint?: InputMaybe<TChangeCategoryOrderHint>;
  changeParent?: InputMaybe<TChangeCategoryParent>;
  changeSlug?: InputMaybe<TChangeCategorySlug>;
  removeAsset?: InputMaybe<TRemoveCategoryAsset>;
  setAssetCustomField?: InputMaybe<TSetCategoryAssetCustomField>;
  setAssetCustomType?: InputMaybe<TSetCategoryAssetCustomType>;
  setAssetDescription?: InputMaybe<TSetCategoryAssetDescription>;
  setAssetKey?: InputMaybe<TSetCategoryAssetKey>;
  setAssetSources?: InputMaybe<TSetCategoryAssetSources>;
  setAssetTags?: InputMaybe<TSetCategoryAssetTags>;
  setCustomField?: InputMaybe<TSetCategoryCustomField>;
  setCustomType?: InputMaybe<TSetCategoryCustomType>;
  setDescription?: InputMaybe<TSetCategoryDescription>;
  setExternalId?: InputMaybe<TSetCategoryExternalId>;
  setKey?: InputMaybe<TSetCategoryKey>;
  setMetaDescription?: InputMaybe<TSetCategoryMetaDescription>;
  setMetaKeywords?: InputMaybe<TSetCategoryMetaKeywords>;
  setMetaTitle?: InputMaybe<TSetCategoryMetaTitle>;
};

export type TChangeAssociateRoleBuyerAssignable = {
  buyerAssignable: Scalars['Boolean'];
};

export type TChangeAttributeGroupName = {
  name: Array<TLocalizedStringItemInputType>;
};

export type TChangeBusinessUnitAddress = {
  address: TAddressInput;
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TChangeBusinessUnitAssociate = {
  associate: TAssociateDraft;
};

export type TChangeBusinessUnitAssociateMode = {
  associateMode: TBusinessUnitAssociateMode;
};

export type TChangeBusinessUnitName = {
  name: Scalars['String'];
};

export type TChangeBusinessUnitParentUnit = {
  parentUnit: TResourceIdentifierInput;
};

export type TChangeBusinessUnitStatus = {
  status: TBusinessUnitStatus;
};

export type TChangeCartCustomLineItemMoney = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  money: TBaseMoneyInput;
};

export type TChangeCartCustomLineItemPriceMode = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  mode: TCustomLineItemPriceMode;
};

export type TChangeCartCustomLineItemQuantity = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Long'];
};

export type TChangeCartDiscountCartPredicate = {
  cartPredicate: Scalars['String'];
};

export type TChangeCartDiscountIsActive = {
  isActive: Scalars['Boolean'];
};

export type TChangeCartDiscountName = {
  name: Array<TLocalizedStringItemInputType>;
};

export type TChangeCartDiscountRequiresDiscountCode = {
  requiresDiscountCode: Scalars['Boolean'];
};

export type TChangeCartDiscountSortOrder = {
  sortOrder: Scalars['String'];
};

export type TChangeCartDiscountStackingMode = {
  stackingMode: TStackingMode;
};

export type TChangeCartDiscountTarget = {
  target: TCartDiscountTargetInput;
};

export type TChangeCartDiscountValue = {
  value: TCartDiscountValueInput;
};

export type TChangeCartLineItemQuantity = {
  /** Only valid for the general Carts API. Ignored for the My Carts API. */
  externalPrice?: InputMaybe<TBaseMoneyInput>;
  /** Only valid for the general Carts API. Ignored for the My Carts API. */
  externalTotalPrice?: InputMaybe<TExternalLineItemTotalPriceDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Long'];
};

export type TChangeCartTaxCalculationMode = {
  taxCalculationMode: TTaxCalculationMode;
};

export type TChangeCartTaxMode = {
  taxMode: TTaxMode;
};

export type TChangeCartTaxRoundingMode = {
  taxRoundingMode: TRoundingMode;
};

export type TChangeCategoryAssetName = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
};

export type TChangeCategoryAssetOrder = {
  assetOrder: Array<Scalars['String']>;
};

export type TChangeCategoryName = {
  name: Array<TLocalizedStringItemInputType>;
};

export type TChangeCategoryOrderHint = {
  orderHint: Scalars['String'];
};

export type TChangeCategoryParent = {
  parent: TResourceIdentifierInput;
};

export type TChangeCategorySlug = {
  slug: Array<TLocalizedStringItemInputType>;
};

export type TChangeChannelDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TChangeChannelKey = {
  key: Scalars['String'];
};

export type TChangeChannelName = {
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TChangeCustomerAddress = {
  address: TAddressInput;
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TChangeCustomerEmail = {
  email: Scalars['String'];
};

export type TChangeCustomerGroupName = {
  name: Scalars['String'];
};

export type TChangeDiscountCodeCartDiscounts = {
  cartDiscounts: Array<TResourceIdentifierInput>;
};

export type TChangeDiscountCodeGroups = {
  groups: Array<Scalars['String']>;
};

export type TChangeDiscountCodeIsActive = {
  isActive: Scalars['Boolean'];
};

export type TChangeExtensionDestination = {
  destination: TExtensionDestinationInput;
};

export type TChangeExtensionTriggers = {
  triggers: Array<TTriggerInput>;
};

export type TChangeInventoryEntryQuantity = {
  quantity: Scalars['Long'];
};

export type TChangeMyBusinessUnitAddress = {
  address: TAddressInput;
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TChangeMyBusinessUnitAssociate = {
  associate: TAssociateDraft;
};

export type TChangeMyBusinessUnitName = {
  name: Scalars['String'];
};

export type TChangeMyBusinessUnitParentUnit = {
  parentUnit: TResourceIdentifierInput;
};

export type TChangeMyCartTaxMode = {
  taxMode: TTaxMode;
};

export type TChangeMyQuoteMyQuoteState = {
  quoteState: TMyQuoteState;
};

export type TChangeOrderPaymentState = {
  paymentState: TPaymentState;
};

export type TChangeOrderShipmentState = {
  shipmentState: TShipmentState;
};

export type TChangeOrderState = {
  orderState: TOrderState;
};

export type TChangePaymentAmountPlanned = {
  amount: TMoneyInput;
};

export type TChangePaymentTransactionInteractionId = {
  interactionId: Scalars['String'];
  transactionId: Scalars['String'];
};

export type TChangePaymentTransactionState = {
  state: TTransactionState;
  transactionId: Scalars['String'];
};

export type TChangePaymentTransactionTimestamp = {
  timestamp: Scalars['DateTime'];
  transactionId: Scalars['String'];
};

export type TChangeProductAssetName = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TChangeProductAssetOrder = {
  assetOrder: Array<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TChangeProductDiscountIsActive = {
  isActive: Scalars['Boolean'];
};

export type TChangeProductDiscountName = {
  name: Array<TLocalizedStringItemInputType>;
};

export type TChangeProductDiscountPredicate = {
  predicate: Scalars['String'];
};

export type TChangeProductDiscountSortOrder = {
  sortOrder: Scalars['String'];
};

export type TChangeProductDiscountValue = {
  value: TProductDiscountValueInput;
};

export type TChangeProductImageLabel = {
  imageUrl: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TChangeProductMasterVariant = {
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TChangeProductName = {
  name: Array<TLocalizedStringItemInputType>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TChangeProductPrice = {
  price: TProductPriceDataInput;
  priceId?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TChangeProductSelectionName = {
  name: Array<TLocalizedStringItemInputType>;
};

export type TChangeProductSlug = {
  slug: Array<TLocalizedStringItemInputType>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TChangeProjectSettingsCartsConfiguration = {
  cartsConfiguration: TCartsConfigurationInput;
};

export type TChangeProjectSettingsCountries = {
  countries: Array<Scalars['Country']>;
};

export type TChangeProjectSettingsCountryTaxRateFallbackEnabled = {
  countryTaxRateFallbackEnabled: Scalars['Boolean'];
};

export type TChangeProjectSettingsCurrencies = {
  currencies: Array<Scalars['Currency']>;
};

/** CLOSED BETA: This feature is subject to change and should not be used in production. https://docs.commercetools.com/api/contract#closed-beta */
export type TChangeProjectSettingsCustomerSearchStatus = {
  status: TCustomerSearchStatus;
};

export type TChangeProjectSettingsLanguages = {
  languages: Array<Scalars['Locale']>;
};

export type TChangeProjectSettingsMessagesConfiguration = {
  messagesConfiguration: TMessagesConfigurationDraft;
};

export type TChangeProjectSettingsMessagesEnabled = {
  messagesEnabled: Scalars['Boolean'];
};

export type TChangeProjectSettingsMyBusinessUnitStatusOnCreation = {
  status: TBusinessUnitConfigurationStatus;
};

export type TChangeProjectSettingsName = {
  name: Scalars['String'];
};

export type TChangeProjectSettingsOrderSearchStatus = {
  status: TOrderSearchStatus;
};

export type TChangeProjectSettingsProductSearchIndexingEnabled = {
  enabled: Scalars['Boolean'];
};

export type TChangeProjectSettingsShoppingListsConfiguration = {
  shoppingListsConfiguration: TShoppingListsConfigurationInput;
};

export type TChangeProjectSettingsStandalonePriceSearchIndexingEnabled = {
  enabled: Scalars['Boolean'];
};

export type TChangeQuoteCustomer = {
  customer: TResourceIdentifierInput;
};

export type TChangeQuoteRequestCustomer = {
  customer: TResourceIdentifierInput;
};

export type TChangeQuoteRequestState = {
  quoteRequestState: TQuoteRequestState;
};

export type TChangeQuoteState = {
  quoteState: TQuoteState;
};

export type TChangeShippingMethodIsDefault = {
  isDefault: Scalars['Boolean'];
};

export type TChangeShippingMethodName = {
  name: Scalars['String'];
};

export type TChangeShippingMethodTaxCategory = {
  taxCategory: TResourceIdentifierInput;
};

export type TChangeShoppingListLineItemQuantity = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Int'];
};

export type TChangeShoppingListLineItemsOrder = {
  lineItemOrder: Array<Scalars['String']>;
};

export type TChangeShoppingListName = {
  name: Array<TLocalizedStringItemInputType>;
};

export type TChangeShoppingListTextLineItemName = {
  name: Array<TLocalizedStringItemInputType>;
  textLineItemId?: InputMaybe<Scalars['String']>;
  textLineItemKey?: InputMaybe<Scalars['String']>;
};

export type TChangeShoppingListTextLineItemQuantity = {
  quantity: Scalars['Int'];
  textLineItemId?: InputMaybe<Scalars['String']>;
  textLineItemKey?: InputMaybe<Scalars['String']>;
};

export type TChangeShoppingListTextLineItemsOrder = {
  textLineItemOrder: Array<Scalars['String']>;
};

export type TChangeStagedOrderCustomLineItemMoney = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  money: TBaseMoneyInput;
};

export type TChangeStagedOrderCustomLineItemMoneyOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderCustomLineItemMoneyOutput';
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  money: TBaseMoney;
  type: Scalars['String'];
};

export type TChangeStagedOrderCustomLineItemQuantity = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Long'];
};

export type TChangeStagedOrderCustomLineItemQuantityOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderCustomLineItemQuantityOutput';
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  quantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TChangeStagedOrderLineItemQuantity = {
  externalPrice?: InputMaybe<TBaseMoneyInput>;
  externalTotalPrice?: InputMaybe<TExternalLineItemTotalPriceDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Long'];
};

export type TChangeStagedOrderLineItemQuantityOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderLineItemQuantityOutput';
  externalPrice?: Maybe<TBaseMoney>;
  externalTotalPrice?: Maybe<TExternalLineItemTotalPrice>;
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  quantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TChangeStagedOrderOrderState = {
  orderState: TOrderState;
};

export type TChangeStagedOrderOrderStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderOrderStateOutput';
  orderState: TOrderState;
  type: Scalars['String'];
};

export type TChangeStagedOrderPaymentState = {
  paymentState: TPaymentState;
};

export type TChangeStagedOrderPaymentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderPaymentStateOutput';
  paymentState: TPaymentState;
  type: Scalars['String'];
};

export type TChangeStagedOrderShipmentState = {
  shipmentState: TShipmentState;
};

export type TChangeStagedOrderShipmentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderShipmentStateOutput';
  shipmentState: TShipmentState;
  type: Scalars['String'];
};

export type TChangeStagedOrderTaxCalculationMode = {
  taxCalculationMode: TTaxCalculationMode;
};

export type TChangeStagedOrderTaxCalculationModeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderTaxCalculationModeOutput';
  taxCalculationMode: TTaxCalculationMode;
  type: Scalars['String'];
};

export type TChangeStagedOrderTaxMode = {
  taxMode: TTaxMode;
};

export type TChangeStagedOrderTaxModeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderTaxModeOutput';
  taxMode: TTaxMode;
  type: Scalars['String'];
};

export type TChangeStagedOrderTaxRoundingMode = {
  taxRoundingMode: TRoundingMode;
};

export type TChangeStagedOrderTaxRoundingModeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderTaxRoundingModeOutput';
  taxRoundingMode: TRoundingMode;
  type: Scalars['String'];
};

export type TChangeStagedQuoteState = {
  stagedQuoteState: TStagedQuoteState;
};

export type TChangeStandalonePriceActive = {
  active: Scalars['Boolean'];
};

export type TChangeStandalonePriceValue = {
  /** default is `false` */
  staged?: InputMaybe<Scalars['Boolean']>;
  value: TBaseMoneyInput;
};

export type TChangeStateInitial = {
  initial: Scalars['Boolean'];
};

export type TChangeStateKey = {
  key: Scalars['String'];
};

export type TChangeStateType = {
  type: TStateType;
};

export type TChangeStoreProductSelectionActive = {
  active: Scalars['Boolean'];
  productSelection: TResourceIdentifierInput;
};

export type TChangeSubscription = {
  __typename?: 'ChangeSubscription';
  resourceTypeId: Scalars['String'];
};

export type TChangeSubscriptionDestination = {
  destination: TDestinationInput;
};

export type TChangeSubscriptionInput = {
  resourceTypeId: Scalars['String'];
};

export type TChangeTypeEnumValueLabel = {
  fieldName: Scalars['String'];
  value: TEnumValueInput;
};

export type TChangeTypeEnumValueOrder = {
  fieldName: Scalars['String'];
  keys: Array<Scalars['String']>;
};

export type TChangeTypeFieldDefinitionOrder = {
  fieldNames: Array<Scalars['String']>;
};

export type TChangeTypeInputHint = {
  fieldName: Scalars['String'];
  inputHint: TTextInputHint;
};

export type TChangeTypeKey = {
  key: Scalars['String'];
};

export type TChangeTypeLabel = {
  fieldName: Scalars['String'];
  label: Array<TLocalizedStringItemInputType>;
};

export type TChangeTypeLocalizedEnumValueLabel = {
  fieldName: Scalars['String'];
  value: TLocalizedEnumValueInput;
};

export type TChangeTypeLocalizedEnumValueOrder = {
  fieldName: Scalars['String'];
  keys: Array<Scalars['String']>;
};

export type TChangeTypeName = {
  name: Array<TLocalizedStringItemInputType>;
};

export type TChangeZoneName = {
  name: Scalars['String'];
};

export type TChannel = TReferenceExpandable & TReviewTarget & TVersioned & {
  __typename?: 'Channel';
  address?: Maybe<TAddress>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  geoLocation?: Maybe<TGeometry>;
  id: Scalars['String'];
  key: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedString>>;
  reviewRatingStatistics?: Maybe<TReviewRatingStatistics>;
  roles: Array<TChannelRole>;
  version: Scalars['Long'];
};


export type TChannel_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TChannel_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TChannelDraft = {
  address?: InputMaybe<TAddressInput>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  geoLocation?: InputMaybe<TGeometryInput>;
  key: Scalars['String'];
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  roles: Array<TChannelRole>;
};

export type TChannelQueryResult = {
  __typename?: 'ChannelQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TChannel>;
  total: Scalars['Long'];
};

export type TChannelReferenceIdentifier = {
  __typename?: 'ChannelReferenceIdentifier';
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  typeId: Scalars['String'];
};

export enum TChannelRole {
  /** Role tells that this channel can be used to track inventory entries.Channels with this role can be treated as warehouses */
  InventorySupply = 'InventorySupply',
  /** Role tells that this channel can be used to track order export activities. */
  OrderExport = 'OrderExport',
  /** Role tells that this channel can be used to track order import activities. */
  OrderImport = 'OrderImport',
  /** This role can be combined with some other roles (e.g. with `InventorySupply`) to represent the fact that this particular channel is the primary/master channel among the channels of the same type. */
  Primary = 'Primary',
  /** Role tells that this channel can be used to expose products to a specific distribution channel. It can be used by the cart to select a product price. */
  ProductDistribution = 'ProductDistribution'
}

export type TChannelUpdateAction = {
  addRoles?: InputMaybe<TAddChannelRoles>;
  changeDescription?: InputMaybe<TChangeChannelDescription>;
  changeKey?: InputMaybe<TChangeChannelKey>;
  changeName?: InputMaybe<TChangeChannelName>;
  removeRoles?: InputMaybe<TRemoveChannelRoles>;
  setAddress?: InputMaybe<TSetChannelAddress>;
  setAddressCustomField?: InputMaybe<TSetChannelAddressCustomField>;
  setAddressCustomType?: InputMaybe<TSetChannelAddressCustomType>;
  setCustomField?: InputMaybe<TSetChannelCustomField>;
  setCustomType?: InputMaybe<TSetChannelCustomType>;
  setGeoLocation?: InputMaybe<TSetChannelGeoLocation>;
  setRoles?: InputMaybe<TSetChannelRoles>;
};

export type TClassificationShippingRateInput = TShippingRateInput & {
  __typename?: 'ClassificationShippingRateInput';
  key: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
  type: Scalars['String'];
};


export type TClassificationShippingRateInput_LabelArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TClassificationShippingRateInputDraft = {
  key: Scalars['String'];
};

export type TClassificationShippingRateInputDraftOutput = TShippingRateInputDraftOutput & {
  __typename?: 'ClassificationShippingRateInputDraftOutput';
  key: Scalars['String'];
  type: Scalars['String'];
};

export type TCloudEventsSubscriptionsFormat = TNotificationFormat & {
  __typename?: 'CloudEventsSubscriptionsFormat';
  cloudEventsVersion: Scalars['String'];
  type: Scalars['String'];
};

export type TCloudEventsSubscriptionsFormatInput = {
  cloudEventsVersion: Scalars['String'];
};

export type TCommercetoolsSubscription = TVersioned & {
  __typename?: 'CommercetoolsSubscription';
  changes: Array<TChangeSubscription>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  destination: TDestination;
  format: TNotificationFormat;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  messages: Array<TMessageSubscription>;
  status: TSubscriptionHealthStatus;
  version: Scalars['Long'];
};

export type TCommercetoolsSubscriptionQueryResult = {
  __typename?: 'CommercetoolsSubscriptionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCommercetoolsSubscription>;
  total: Scalars['Long'];
};

export type TConfluentCloudDestination = TDestination & {
  __typename?: 'ConfluentCloudDestination';
  acks: Scalars['String'];
  apiKey: Scalars['String'];
  apiSecret: Scalars['String'];
  bootstrapServer: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  topic: Scalars['String'];
  type: Scalars['String'];
};

export type TConfluentCloudDestinationInput = {
  acks: Scalars['String'];
  apiKey: Scalars['String'];
  apiSecret: Scalars['String'];
  bootstrapServer: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
  topic: Scalars['String'];
};

export type TCreateApiClient = {
  accessTokenValiditySeconds?: InputMaybe<Scalars['Int']>;
  deleteDaysAfterCreation?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  refreshTokenValiditySeconds?: InputMaybe<Scalars['Int']>;
  scope: Scalars['String'];
};

export type TCreateProductSelectionDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  key?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<TProductSelectionMode>;
  name: Array<TLocalizedStringItemInputType>;
};

export type TCreateStandalonePrice = {
  active?: Scalars['Boolean'];
  channel?: InputMaybe<TResourceIdentifierInput>;
  country?: InputMaybe<Scalars['Country']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  customerGroup?: InputMaybe<TResourceIdentifierInput>;
  discounted?: InputMaybe<TDiscountedProductPriceValueInput>;
  key?: InputMaybe<Scalars['String']>;
  sku: Scalars['String'];
  staged?: InputMaybe<TStagedPriceDraft>;
  tiers?: InputMaybe<Array<TProductPriceTierInput>>;
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
  value: TBaseMoneyInput;
};

export type TCreateStore = {
  countries?: InputMaybe<Array<TStoreCountryInput>>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  distributionChannels?: InputMaybe<Array<TResourceIdentifierInput>>;
  key: Scalars['String'];
  languages?: InputMaybe<Array<Scalars['Locale']>>;
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  productSelections?: InputMaybe<Array<TProductSelectionSettingDraft>>;
  supplyChannels?: InputMaybe<Array<TResourceIdentifierInput>>;
};

export type TCreateZone = {
  description?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  locations?: InputMaybe<Array<TZoneLocation>>;
  name: Scalars['String'];
};

export type TCustomField = {
  name: Scalars['String'];
};

/**
 * A key-value pair representing the field name and value of one single custom field.
 *
 * The value of this custom field consists of escaped JSON based on the FieldDefinition of the Type.
 *
 *
 * Examples for `value`:
 *
 * * FieldType `String`: `"\"This is a string\""`
 * * FieldType `DateTimeType`: `"\"2018-10-12T14:00:00.000Z\""`
 * * FieldType `Number`: `"4"`
 * * FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"`
 * * FieldType `Reference`: `"{\"id\": \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\": \"product\"}"`
 */
export type TCustomFieldInput = {
  name: Scalars['String'];
  /**
   * The value of this custom field consists of escaped JSON based on the FieldDefinition of the Type.
   *
   *
   * Examples for `value`:
   *
   * * FieldType `String`: `"\"This is a string\""`
   * * FieldType `DateTimeType`: `"\"2018-10-12T14:00:00.000Z\""`
   * * FieldType `Number`: `"4"`
   * * FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"`
   * * FieldType `Reference`: `"{\"id\": \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\": \"product\"}"`
   */
  value: Scalars['String'];
};

export type TCustomFieldsCommand = {
  __typename?: 'CustomFieldsCommand';
  fields: Scalars['Json'];
  typeId?: Maybe<Scalars['String']>;
  typeKey?: Maybe<Scalars['String']>;
  typeResId?: Maybe<TResourceIdentifier>;
};

export type TCustomFieldsDraft = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TCustomFieldsType = {
  __typename?: 'CustomFieldsType';
  /** This field contains non-typed data. */
  customFieldsRaw?: Maybe<Array<TRawCustomField>>;
  type?: Maybe<TTypeDefinition>;
  typeRef: TReference;
};


export type TCustomFieldsType_CustomFieldsRawArgs = {
  excludeNames?: InputMaybe<Array<Scalars['String']>>;
  includeNames?: InputMaybe<Array<Scalars['String']>>;
};

/** A custom line item is a generic item that can be added to the cart but is not bound to a product. You can use it for discounts (negative money), vouchers, complex cart rules, additional services or fees. You control the lifecycle of this item. */
export type TCustomLineItem = {
  __typename?: 'CustomLineItem';
  custom?: Maybe<TCustomFieldsType>;
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  money: TBaseMoney;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  perMethodTaxRate: Array<TMethodTaxRate>;
  priceMode: TCustomLineItemPriceMode;
  quantity: Scalars['Long'];
  shippingDetails?: Maybe<TItemShippingDetails>;
  slug: Scalars['String'];
  state: Array<TItemState>;
  taxCategory?: Maybe<TTaxCategory>;
  taxCategoryRef?: Maybe<TReference>;
  taxRate?: Maybe<TTaxRate>;
  taxedPrice?: Maybe<TTaxedItemPrice>;
  taxedPricePortions: Array<TMethodTaxedPrice>;
  totalPrice: TMoney;
};


/** A custom line item is a generic item that can be added to the cart but is not bound to a product. You can use it for discounts (negative money), vouchers, complex cart rules, additional services or fees. You control the lifecycle of this item. */
export type TCustomLineItem_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TCustomLineItemDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  key?: InputMaybe<Scalars['String']>;
  money: TBaseMoneyInput;
  name: Array<TLocalizedStringItemInputType>;
  priceMode?: InputMaybe<TCustomLineItemPriceMode>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
  slug: Scalars['String'];
  taxCategory?: InputMaybe<TReferenceInput>;
};

export type TCustomLineItemDraftOutput = {
  __typename?: 'CustomLineItemDraftOutput';
  custom?: Maybe<TCustomFieldsCommand>;
  externalTaxRate?: Maybe<TExternalTaxRateDraftOutput>;
  key?: Maybe<Scalars['String']>;
  money: TBaseMoney;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  priceMode: TCustomLineItemPriceMode;
  quantity?: Maybe<Scalars['Long']>;
  shippingDetails?: Maybe<TItemShippingDetailsDraftOutput>;
  slug: Scalars['String'];
  taxCategoryResId?: Maybe<TResourceIdentifier>;
};


export type TCustomLineItemDraftOutput_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TCustomLineItemImportDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  key?: InputMaybe<Scalars['String']>;
  money: TBaseMoneyInput;
  name: Array<TLocalizedStringItemInputType>;
  priceMode?: InputMaybe<TCustomLineItemPriceMode>;
  quantity: Scalars['Long'];
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
  slug: Scalars['String'];
  state?: InputMaybe<Array<TItemStateDraftType>>;
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
  taxRate?: InputMaybe<TTaxRateInput>;
};

export enum TCustomLineItemPriceMode {
  /** Cart discounts are deactivated for the custom line items with this price mode. */
  External = 'External',
  /** This is the default mode. */
  Standard = 'Standard'
}

export type TCustomLineItemReturnItem = TReturnItem & {
  __typename?: 'CustomLineItemReturnItem';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  custom?: Maybe<TCustomFieldsType>;
  customLineItemId: Scalars['String'];
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  paymentState: TReturnPaymentState;
  quantity: Scalars['Long'];
  shipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TCustomLineItemStateTransition = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'CustomLineItemStateTransition';
  customLineItemId: Scalars['String'];
  customLineItemKey?: Maybe<Scalars['String']>;
  fromState?: Maybe<TState>;
  fromStateRef: TReference;
  quantity: Scalars['Long'];
  toState?: Maybe<TState>;
  toStateRef: TReference;
  transitionDate: Scalars['DateTime'];
  type: Scalars['String'];
};

export type TCustomLineItemsTarget = TCartDiscountTarget & {
  __typename?: 'CustomLineItemsTarget';
  predicate: Scalars['String'];
  type: Scalars['String'];
};

export type TCustomLineItemsTargetInput = {
  predicate: Scalars['String'];
};

export type TCustomObject = TReferenceExpandable & TVersioned & {
  __typename?: 'CustomObject';
  container: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  id: Scalars['String'];
  key: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  value: Scalars['Json'];
  version: Scalars['Long'];
};

/**
 * An input object used to create a new, or update an existing Custom Object.
 *
 * The value should be passed in a form of escaped JSON.
 *
 * Example for `value` field:
 *
 * ```
 * "{ \"stringField\": \"myVal\", \"numberField\": 123, \"boolField\": false, \"nestedObject\": { \"nestedObjectKey\": \"anotherValue\" }, \"dateField\": \"2018-10-12T14:00:00.000Z\" }"
 * ```
 */
export type TCustomObjectDraft = {
  container: Scalars['String'];
  key: Scalars['String'];
  /**
   * The value should be passed in a form of escaped JSON.
   *
   * Example for `value` field:
   *
   * ```
   * "{ \"stringField\": \"myVal\", \"numberField\": 123, \"boolField\": false, \"nestedObject\": { \"nestedObjectKey\": \"anotherValue\" }, \"dateField\": \"2018-10-12T14:00:00.000Z\" }"
   * ```
   */
  value: Scalars['String'];
  version?: InputMaybe<Scalars['Long']>;
};

export type TCustomObjectLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CustomObjectLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TCustomObjectLimitsProjection = {
  __typename?: 'CustomObjectLimitsProjection';
  total: TCustomObjectLimitWithCurrent;
};

export type TCustomObjectQueryResult = {
  __typename?: 'CustomObjectQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCustomObject>;
  total: Scalars['Long'];
};

export type TCustomShippingDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  deliveries?: InputMaybe<Array<TDeliveryDraft>>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  key: Scalars['String'];
  shippingAddress: TAddressInput;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  shippingRateInput?: InputMaybe<TShippingRateInputDraft>;
  taxCategory?: InputMaybe<TReferenceInput>;
};

export type TCustomSuggestTokenizer = TSuggestTokenizer & {
  __typename?: 'CustomSuggestTokenizer';
  inputs: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomSuggestTokenizerInput = {
  inputs: Array<Scalars['String']>;
};

export type TCustomSuggestTokenizerProductSearch = TSuggestTokenizerProductSearch & {
  __typename?: 'CustomSuggestTokenizerProductSearch';
  inputs: Array<Scalars['String']>;
  type: Scalars['String'];
};

/** A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer. */
export type TCustomer = TReferenceExpandable & TVersioned & {
  __typename?: 'Customer';
  addresses: Array<TAddress>;
  authenticationMode?: Maybe<TAuthenticationMode>;
  billingAddressIds: Array<Scalars['String']>;
  billingAddresses: Array<TAddress>;
  companyName?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  customerNumber?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  defaultBillingAddress?: Maybe<TAddress>;
  defaultBillingAddressId?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<TAddress>;
  defaultShippingAddressId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  externalId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isEmailVerified: Scalars['Boolean'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  lastName?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['Locale']>;
  middleName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  salutation?: Maybe<Scalars['String']>;
  shippingAddressIds: Array<Scalars['String']>;
  shippingAddresses: Array<TAddress>;
  stores: Array<TStore>;
  storesRef: Array<TKeyReference>;
  title?: Maybe<Scalars['String']>;
  vatId?: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};

/** A field to access a customer's active cart. */
export type TCustomerActiveCartInterface = {
  customerActiveCart?: Maybe<TCart>;
};


/** A field to access a customer's active cart. */
export type TCustomerActiveCartInterface_CustomerActiveCartArgs = {
  customerId: Scalars['String'];
};

export type TCustomerAddressAdded = TMessagePayload & {
  __typename?: 'CustomerAddressAdded';
  address: TAddress;
  type: Scalars['String'];
};

export type TCustomerAddressChanged = TMessagePayload & {
  __typename?: 'CustomerAddressChanged';
  address: TAddress;
  type: Scalars['String'];
};

export type TCustomerAddressCustomFieldAdded = TMessagePayload & {
  __typename?: 'CustomerAddressCustomFieldAdded';
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TCustomerAddressCustomFieldChanged = TMessagePayload & {
  __typename?: 'CustomerAddressCustomFieldChanged';
  name: Scalars['String'];
  previousValue?: Maybe<Scalars['Json']>;
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TCustomerAddressCustomFieldRemoved = TMessagePayload & {
  __typename?: 'CustomerAddressCustomFieldRemoved';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TCustomerAddressCustomTypeRemoved = TMessagePayload & {
  __typename?: 'CustomerAddressCustomTypeRemoved';
  previousTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerAddressCustomTypeSet = TMessagePayload & {
  __typename?: 'CustomerAddressCustomTypeSet';
  customFields: TCustomFieldsType;
  previousTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerAddressRemoved = TMessagePayload & {
  __typename?: 'CustomerAddressRemoved';
  address: TAddress;
  type: Scalars['String'];
};

export type TCustomerCompanyNameSet = TMessagePayload & {
  __typename?: 'CustomerCompanyNameSet';
  companyName?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerCreated = TMessagePayload & {
  __typename?: 'CustomerCreated';
  customer: TCustomer;
  type: Scalars['String'];
};

export type TCustomerCustomFieldAdded = TMessagePayload & {
  __typename?: 'CustomerCustomFieldAdded';
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TCustomerCustomFieldChanged = TMessagePayload & {
  __typename?: 'CustomerCustomFieldChanged';
  name: Scalars['String'];
  previousValue?: Maybe<Scalars['Json']>;
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TCustomerCustomFieldRemoved = TMessagePayload & {
  __typename?: 'CustomerCustomFieldRemoved';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TCustomerCustomTypeRemoved = TMessagePayload & {
  __typename?: 'CustomerCustomTypeRemoved';
  previousTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerCustomTypeSet = TMessagePayload & {
  __typename?: 'CustomerCustomTypeSet';
  customFields: TCustomFieldsType;
  previousTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerDateOfBirthSet = TMessagePayload & {
  __typename?: 'CustomerDateOfBirthSet';
  dateOfBirth?: Maybe<Scalars['Date']>;
  type: Scalars['String'];
};

export type TCustomerDeleted = TMessagePayload & {
  __typename?: 'CustomerDeleted';
  type: Scalars['String'];
};

export type TCustomerEmailChanged = TMessagePayload & {
  __typename?: 'CustomerEmailChanged';
  email: Scalars['String'];
  type: Scalars['String'];
};

export type TCustomerEmailToken = TVersioned & {
  __typename?: 'CustomerEmailToken';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  customerId: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  value: Scalars['String'];
  version: Scalars['Long'];
};

export type TCustomerEmailTokenCreated = TMessagePayload & {
  __typename?: 'CustomerEmailTokenCreated';
  customerId: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  type: Scalars['String'];
};

export type TCustomerEmailVerified = TMessagePayload & {
  __typename?: 'CustomerEmailVerified';
  type: Scalars['String'];
};

export type TCustomerFirstNameSet = TMessagePayload & {
  __typename?: 'CustomerFirstNameSet';
  firstName?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

/** A customer can be a member in a customer group (e.g. reseller, gold member). A customer group can be used in price calculations with special prices being assigned to certain customer groups. */
export type TCustomerGroup = TReferenceExpandable & TVersioned & {
  __typename?: 'CustomerGroup';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name: Scalars['String'];
  version: Scalars['Long'];
};

export type TCustomerGroupCustomFieldAdded = TMessagePayload & {
  __typename?: 'CustomerGroupCustomFieldAdded';
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TCustomerGroupCustomFieldChanged = TMessagePayload & {
  __typename?: 'CustomerGroupCustomFieldChanged';
  name: Scalars['String'];
  oldValue?: Maybe<Scalars['Json']>;
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TCustomerGroupCustomFieldRemoved = TMessagePayload & {
  __typename?: 'CustomerGroupCustomFieldRemoved';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TCustomerGroupCustomTypeRemoved = TMessagePayload & {
  __typename?: 'CustomerGroupCustomTypeRemoved';
  oldTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerGroupCustomTypeSet = TMessagePayload & {
  __typename?: 'CustomerGroupCustomTypeSet';
  customFields: TCustomFieldsType;
  oldTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerGroupDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  groupName: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
};

export type TCustomerGroupLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CustomerGroupLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TCustomerGroupLimitsProjection = {
  __typename?: 'CustomerGroupLimitsProjection';
  total: TCustomerGroupLimitWithCurrent;
};

export type TCustomerGroupQueryResult = {
  __typename?: 'CustomerGroupQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCustomerGroup>;
  total: Scalars['Long'];
};

export type TCustomerGroupReferenceIdentifier = {
  __typename?: 'CustomerGroupReferenceIdentifier';
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  typeId: Scalars['String'];
};

export type TCustomerGroupSet = TMessagePayload & {
  __typename?: 'CustomerGroupSet';
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  type: Scalars['String'];
};

export type TCustomerGroupUpdateAction = {
  changeName?: InputMaybe<TChangeCustomerGroupName>;
  setCustomField?: InputMaybe<TSetCustomerGroupCustomField>;
  setCustomType?: InputMaybe<TSetCustomerGroupCustomType>;
  setKey?: InputMaybe<TSetCustomerGroupKey>;
};

export type TCustomerLastNameSet = TMessagePayload & {
  __typename?: 'CustomerLastNameSet';
  lastName?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CustomerLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TCustomerLimitsProjection = {
  __typename?: 'CustomerLimitsProjection';
  total: TCustomerLimitWithCurrent;
};

export type TCustomerPasswordToken = TVersioned & {
  __typename?: 'CustomerPasswordToken';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  customerId: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  value: Scalars['String'];
  version: Scalars['Long'];
};

export type TCustomerPasswordTokenCreated = TMessagePayload & {
  __typename?: 'CustomerPasswordTokenCreated';
  customerId: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  type: Scalars['String'];
};

export type TCustomerPasswordUpdated = TMessagePayload & {
  __typename?: 'CustomerPasswordUpdated';
  reset: Scalars['Boolean'];
  type: Scalars['String'];
};

/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface = {
  customer?: Maybe<TCustomer>;
  customers: TCustomerQueryResult;
};


/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface_CustomerArgs = {
  emailToken?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  passwordToken?: InputMaybe<Scalars['String']>;
};


/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface_CustomersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TCustomerQueryResult = {
  __typename?: 'CustomerQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCustomer>;
  total: Scalars['Long'];
};

/** CLOSED BETA: This feature is subject to change and should not be used in production. https://docs.commercetools.com/api/contract#closed-beta */
export type TCustomerSearchConfiguration = {
  __typename?: 'CustomerSearchConfiguration';
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  status: TCustomerSearchStatus;
};

/** CLOSED BETA: This feature is subject to change and should not be used in production. https://docs.commercetools.com/api/contract#closed-beta */
export enum TCustomerSearchStatus {
  Activated = 'Activated',
  Deactivated = 'Deactivated'
}

export type TCustomerSignInDraft = {
  anonymousCart?: InputMaybe<TResourceIdentifierInput>;
  /** This field will be deprecated in favour of anonymousCart.id. */
  anonymousCartId?: InputMaybe<Scalars['String']>;
  anonymousCartSignInMode?: InputMaybe<TAnonymousCartSignInMode>;
  anonymousId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  updateProductData?: InputMaybe<Scalars['Boolean']>;
};

export type TCustomerSignInResult = {
  __typename?: 'CustomerSignInResult';
  cart?: Maybe<TCart>;
  customer: TCustomer;
};

export type TCustomerSignMeInDraft = {
  activeCartSignInMode?: InputMaybe<TAnonymousCartSignInMode>;
  email: Scalars['String'];
  password: Scalars['String'];
  updateProductData?: InputMaybe<Scalars['Boolean']>;
};

export type TCustomerSignMeUpDraft = {
  addresses?: InputMaybe<Array<TAddressInput>>;
  /** The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses. */
  billingAddresses?: InputMaybe<Array<Scalars['Int']>>;
  companyName?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  /** The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address. */
  defaultBillingAddress?: InputMaybe<Scalars['Int']>;
  /** The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address. */
  defaultShippingAddress?: InputMaybe<Scalars['Int']>;
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['Locale']>;
  middleName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  salutation?: InputMaybe<Scalars['String']>;
  /** The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses. */
  shippingAddresses?: InputMaybe<Array<Scalars['Int']>>;
  stores?: InputMaybe<Array<TResourceIdentifierInput>>;
  title?: InputMaybe<Scalars['String']>;
  vatId?: InputMaybe<Scalars['String']>;
};

export type TCustomerSignUpDraft = {
  addresses?: InputMaybe<Array<TAddressInput>>;
  anonymousCart?: InputMaybe<TResourceIdentifierInput>;
  /** This field will be deprecated in favour of anonymousCart.id. */
  anonymousCartId?: InputMaybe<Scalars['String']>;
  anonymousId?: InputMaybe<Scalars['String']>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  authenticationMode?: InputMaybe<TAuthenticationMode>;
  /** The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses. */
  billingAddresses?: InputMaybe<Array<Scalars['Int']>>;
  companyName?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  customerGroup?: InputMaybe<TResourceIdentifierInput>;
  customerNumber?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  /** The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address. */
  defaultBillingAddress?: InputMaybe<Scalars['Int']>;
  /** The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address. */
  defaultShippingAddress?: InputMaybe<Scalars['Int']>;
  email: Scalars['String'];
  externalId?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  isEmailVerified?: InputMaybe<Scalars['Boolean']>;
  key?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['Locale']>;
  middleName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  salutation?: InputMaybe<Scalars['String']>;
  /** The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses. */
  shippingAddresses?: InputMaybe<Array<Scalars['Int']>>;
  stores?: InputMaybe<Array<TResourceIdentifierInput>>;
  title?: InputMaybe<Scalars['String']>;
  vatId?: InputMaybe<Scalars['String']>;
};

export type TCustomerTitleSet = TMessagePayload & {
  __typename?: 'CustomerTitleSet';
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerUpdateAction = {
  addAddress?: InputMaybe<TAddCustomerAddress>;
  addBillingAddressId?: InputMaybe<TAddCustomerBillingAddressId>;
  addShippingAddressId?: InputMaybe<TAddCustomerShippingAddressId>;
  addStore?: InputMaybe<TAddCustomerStore>;
  changeAddress?: InputMaybe<TChangeCustomerAddress>;
  changeEmail?: InputMaybe<TChangeCustomerEmail>;
  removeAddress?: InputMaybe<TRemoveCustomerAddress>;
  removeBillingAddressId?: InputMaybe<TRemoveCustomerBillingAddressId>;
  removeShippingAddressId?: InputMaybe<TRemoveCustomerShippingAddressId>;
  removeStore?: InputMaybe<TRemoveCustomerStore>;
  setAddressCustomField?: InputMaybe<TSetCustomerAddressCustomField>;
  setAddressCustomType?: InputMaybe<TSetCustomerAddressCustomType>;
  setAuthenticationMode?: InputMaybe<TSetCustomerAuthenticationMode>;
  setCompanyName?: InputMaybe<TSetCustomerCompanyName>;
  setCustomField?: InputMaybe<TSetCustomerCustomField>;
  setCustomType?: InputMaybe<TSetCustomerCustomType>;
  setCustomerGroup?: InputMaybe<TSetCustomerGroup>;
  setCustomerNumber?: InputMaybe<TSetCustomerNumber>;
  setDateOfBirth?: InputMaybe<TSetCustomerDateOfBirth>;
  setDefaultBillingAddress?: InputMaybe<TSetCustomerDefaultBillingAddress>;
  setDefaultShippingAddress?: InputMaybe<TSetCustomerDefaultShippingAddress>;
  setExternalId?: InputMaybe<TSetCustomerExternalId>;
  setFirstName?: InputMaybe<TSetCustomerFirstName>;
  setKey?: InputMaybe<TSetCustomerKey>;
  setLastName?: InputMaybe<TSetCustomerLastName>;
  setLocale?: InputMaybe<TSetCustomerLocale>;
  setMiddleName?: InputMaybe<TSetCustomerMiddleName>;
  setSalutation?: InputMaybe<TSetCustomerSalutation>;
  setStores?: InputMaybe<TSetCustomerStores>;
  setTitle?: InputMaybe<TSetCustomerTitle>;
  setVatId?: InputMaybe<TSetCustomerVatId>;
};

export type TDateAttribute = TAttribute & {
  __typename?: 'DateAttribute';
  name: Scalars['String'];
  value: Scalars['Date'];
};

export type TDateAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'DateAttributeDefinitionType';
  name: Scalars['String'];
};

export type TDateField = TCustomField & {
  __typename?: 'DateField';
  name: Scalars['String'];
  value: Scalars['Date'];
};

export type TDateTimeAttribute = TAttribute & {
  __typename?: 'DateTimeAttribute';
  name: Scalars['String'];
  value: Scalars['DateTime'];
};

export type TDateTimeAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'DateTimeAttributeDefinitionType';
  name: Scalars['String'];
};

export type TDateTimeField = TCustomField & {
  __typename?: 'DateTimeField';
  name: Scalars['String'];
  value: Scalars['DateTime'];
};

export type TDateTimeType = TFieldType & {
  __typename?: 'DateTimeType';
  name: Scalars['String'];
};

export type TDateType = TFieldType & {
  __typename?: 'DateType';
  name: Scalars['String'];
};

export type TDelivery = {
  __typename?: 'Delivery';
  address?: Maybe<TAddress>;
  createdAt: Scalars['DateTime'];
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  items: Array<TDeliveryItem>;
  key?: Maybe<Scalars['String']>;
  parcels: Array<TParcel>;
};

export type TDeliveryAdded = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'DeliveryAdded';
  delivery: TDelivery;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TDeliveryAddressSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'DeliveryAddressSet';
  address?: Maybe<TAddress>;
  deliveryId: Scalars['String'];
  oldAddress?: Maybe<TAddress>;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TDeliveryDraft = {
  address?: InputMaybe<TAddressInput>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  items: Array<TDeliveryItemDraftType>;
  key?: InputMaybe<Scalars['String']>;
  parcels: Array<TParcelDraft>;
};

export type TDeliveryItem = {
  __typename?: 'DeliveryItem';
  id: Scalars['String'];
  quantity: Scalars['Long'];
};

export type TDeliveryItemDraftType = {
  id: Scalars['String'];
  quantity: Scalars['Long'];
};

export type TDeliveryItemsUpdated = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'DeliveryItemsUpdated';
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItem>;
  oldItems: Array<TDeliveryItem>;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TDeliveryRemoved = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'DeliveryRemoved';
  delivery: TDelivery;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TDestination = {
  type: Scalars['String'];
};

export type TDestinationInput = {
  AzureServiceBus?: InputMaybe<TAzureServiceBusDestinationInput>;
  ConfluentCloud?: InputMaybe<TConfluentCloudDestinationInput>;
  EventBridge?: InputMaybe<TEventBridgeDestinationInput>;
  EventGrid?: InputMaybe<TEventGridDestinationInput>;
  GoogleCloudPubSub?: InputMaybe<TGoogleCloudPubSubDestinationInput>;
  SNS?: InputMaybe<TSnsDestinationInput>;
  SQS?: InputMaybe<TSqsDestinationInput>;
};

export type TDimensions = {
  __typename?: 'Dimensions';
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type TDimensionsInput = {
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type TDimensionsProductSearch = {
  __typename?: 'DimensionsProductSearch';
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type TDirectDiscount = {
  __typename?: 'DirectDiscount';
  id: Scalars['String'];
  target?: Maybe<TCartDiscountTarget>;
  value: TCartDiscountValue;
};

export type TDirectDiscountDraft = {
  target?: InputMaybe<TCartDiscountTargetInput>;
  value: TCartDiscountValueInput;
};

export type TDirectDiscountDraftOutput = {
  __typename?: 'DirectDiscountDraftOutput';
  target?: Maybe<TCartDiscountTarget>;
  value: TCartDiscountValue;
};

/** With discount codes it is possible to give specific cart discounts to an eligible amount of users. They are defined by a string value which can be added to a cart so that specific cart discounts can be applied to the cart. */
export type TDiscountCode = TReferenceExpandable & TVersioned & {
  __typename?: 'DiscountCode';
  /** How many times this discount code was applied (only applications that were part of a successful checkout are considered) */
  applicationCount: Scalars['Long'];
  applicationVersion?: Maybe<Scalars['Long']>;
  cartDiscountRefs: Array<TReference>;
  cartDiscounts: Array<TCartDiscount>;
  cartPredicate?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  groups: Array<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  maxApplications?: Maybe<Scalars['Long']>;
  maxApplicationsPerCustomer?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedString>>;
  referenceRefs: Array<TReference>;
  validFrom?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
  version: Scalars['Long'];
};


/** With discount codes it is possible to give specific cart discounts to an eligible amount of users. They are defined by a string value which can be added to a cart so that specific cart discounts can be applied to the cart. */
export type TDiscountCode_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


/** With discount codes it is possible to give specific cart discounts to an eligible amount of users. They are defined by a string value which can be added to a cart so that specific cart discounts can be applied to the cart. */
export type TDiscountCode_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TDiscountCodeDraft = {
  cartDiscounts: Array<TReferenceInput>;
  cartPredicate?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  custom?: InputMaybe<TCustomFieldsDraft>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  groups?: InputMaybe<Array<Scalars['String']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  maxApplications?: InputMaybe<Scalars['Long']>;
  maxApplicationsPerCustomer?: InputMaybe<Scalars['Long']>;
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type TDiscountCodeInfo = {
  __typename?: 'DiscountCodeInfo';
  discountCode?: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  state?: Maybe<TDiscountCodeState>;
};

export type TDiscountCodeQueryResult = {
  __typename?: 'DiscountCodeQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TDiscountCode>;
  total: Scalars['Long'];
};

export enum TDiscountCodeState {
  /** The discount code is active and none of the discounts were applied because the discount application was stopped by one discount that has the StackingMode of StopAfterThisDiscount defined */
  ApplicationStoppedByPreviousDiscount = 'ApplicationStoppedByPreviousDiscount',
  /** The discount code is active and it contains at least one active and valid CartDiscount. But its cart predicate does not match the cart or none of the contained active discount’s cart predicates match the cart */
  DoesNotMatchCart = 'DoesNotMatchCart',
  /** The discount code is active and it contains at least one active and valid CartDiscount. The discount code cartPredicate matches the cart and at least one of the contained active discount’s cart predicates matches the cart. */
  MatchesCart = 'MatchesCart',
  /** maxApplications or maxApplicationsPerCustomer for discountCode has been reached. */
  MaxApplicationReached = 'MaxApplicationReached',
  /** The discount code is not active or it does not contain any active cart discounts. */
  NotActive = 'NotActive',
  /** The discount code is not valid or it does not contain any valid cart discounts. Validity is determined based on the validFrom and validUntil dates */
  NotValid = 'NotValid'
}

export type TDiscountCodeUpdateAction = {
  changeCartDiscounts?: InputMaybe<TChangeDiscountCodeCartDiscounts>;
  changeGroups?: InputMaybe<TChangeDiscountCodeGroups>;
  changeIsActive?: InputMaybe<TChangeDiscountCodeIsActive>;
  setCartPredicate?: InputMaybe<TSetDiscountCodeCartPredicate>;
  setCustomField?: InputMaybe<TSetDiscountCodeCustomField>;
  setCustomType?: InputMaybe<TSetDiscountCodeCustomType>;
  setDescription?: InputMaybe<TSetDiscountCodeDescription>;
  setMaxApplications?: InputMaybe<TSetDiscountCodeMaxApplications>;
  setMaxApplicationsPerCustomer?: InputMaybe<TSetDiscountCodeMaxApplicationsPerCustomer>;
  setName?: InputMaybe<TSetDiscountCodeName>;
  setValidFrom?: InputMaybe<TSetDiscountCodeValidFrom>;
  setValidFromAndUntil?: InputMaybe<TSetDiscountCodeValidFromAndUntil>;
  setValidUntil?: InputMaybe<TSetDiscountCodeValidUntil>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TDiscountOnTotalPrice = {
  __typename?: 'DiscountOnTotalPrice';
  discountedAmount: TBaseMoney;
  discountedGrossAmount?: Maybe<TBaseMoney>;
  discountedNetAmount?: Maybe<TBaseMoney>;
  includedDiscounts: Array<TDiscountedTotalPricePortion>;
};

export type TDiscountedLineItemPortion = {
  __typename?: 'DiscountedLineItemPortion';
  discount?: Maybe<TCartDiscount>;
  discountRef: TReference;
  discountedAmount: TBaseMoney;
};

export type TDiscountedLineItemPortionDraft = {
  discount: TReferenceInput;
  discountedAmount: TBaseMoneyInput;
};

export type TDiscountedLineItemPrice = {
  __typename?: 'DiscountedLineItemPrice';
  includedDiscounts: Array<TDiscountedLineItemPortion>;
  value: TBaseMoney;
};

export type TDiscountedLineItemPriceDraft = {
  includedDiscounts?: InputMaybe<Array<TDiscountedLineItemPortionDraft>>;
  value: TBaseMoneyInput;
};

export type TDiscountedLineItemPriceForQuantity = {
  __typename?: 'DiscountedLineItemPriceForQuantity';
  discountedPrice: TDiscountedLineItemPrice;
  quantity: Scalars['Long'];
};

export type TDiscountedProductPriceValue = {
  __typename?: 'DiscountedProductPriceValue';
  discount?: Maybe<TProductDiscount>;
  discountRef: TReference;
  value: TBaseMoney;
};

export type TDiscountedProductPriceValueInput = {
  discount: TResourceIdentifierInput;
  value: TBaseMoneyInput;
};

export type TDiscountedProductSearchPriceValue = {
  __typename?: 'DiscountedProductSearchPriceValue';
  discount?: Maybe<TProductDiscount>;
  discountRef: TReference;
  value: TBaseMoney;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TDiscountedTotalPricePortion = {
  __typename?: 'DiscountedTotalPricePortion';
  discount?: Maybe<TCartDiscount>;
  discountRef: TReference;
  discountedAmount: TBaseMoney;
};

export type TEnumAttribute = TAttribute & {
  __typename?: 'EnumAttribute';
  key: Scalars['String'];
  label: Scalars['String'];
  name: Scalars['String'];
};

export type TEnumAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'EnumAttributeDefinitionType';
  name: Scalars['String'];
  values: TPlainEnumValueResult;
};


export type TEnumAttributeDefinitionType_ValuesArgs = {
  excludeKeys?: InputMaybe<Array<Scalars['String']>>;
  includeKeys?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
};

export type TEnumField = TCustomField & {
  __typename?: 'EnumField';
  key: Scalars['String'];
  name: Scalars['String'];
};

export type TEnumType = TFieldType & {
  __typename?: 'EnumType';
  name: Scalars['String'];
  values: Array<TEnumValue>;
};

export type TEnumTypeDraft = {
  values: Array<TPlainEnumValueDraft>;
};

export type TEnumValue = {
  __typename?: 'EnumValue';
  key: Scalars['String'];
  label: Scalars['String'];
};

export type TEnumValueInput = {
  key: Scalars['String'];
  label: Scalars['String'];
};

export type TEventBridgeDestination = TDestination & {
  __typename?: 'EventBridgeDestination';
  accountId: Scalars['String'];
  region: Scalars['String'];
  source: Scalars['String'];
  type: Scalars['String'];
};

export type TEventBridgeDestinationInput = {
  accountId: Scalars['String'];
  region: Scalars['String'];
};

export type TEventGridDestination = TDestination & {
  __typename?: 'EventGridDestination';
  accessKey: Scalars['String'];
  type: Scalars['String'];
  uri: Scalars['String'];
};

export type TEventGridDestinationInput = {
  accessKey: Scalars['String'];
  uri: Scalars['String'];
};

export type TExcludeProductSelectionProduct = {
  product: TResourceIdentifierInput;
  variantExclusion?: InputMaybe<TProductVariantExclusionDraft>;
};

export type TExistsFilterInput = {
  path: Scalars['String'];
};

export type TExtension = TReferenceExpandable & TVersioned & {
  __typename?: 'Extension';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  destination: TExtensionDestination;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  timeoutInMs?: Maybe<Scalars['Int']>;
  triggers: Array<TTrigger>;
  version: Scalars['Long'];
};

export type TExtensionDestination = {
  type: Scalars['String'];
};

export type TExtensionDestinationInput = {
  AWSLambda?: InputMaybe<TAwsLambdaDestinationInput>;
  GoogleCloudFunction?: InputMaybe<TGoogleCloudFunctionDestinationInput>;
  HTTP?: InputMaybe<THttpDestinationInput>;
};

export type TExtensionDraft = {
  destination: TExtensionDestinationInput;
  key?: InputMaybe<Scalars['String']>;
  timeoutInMs?: InputMaybe<Scalars['Int']>;
  triggers: Array<TTriggerInput>;
};

export type TExtensionLimitsProjection = {
  __typename?: 'ExtensionLimitsProjection';
  timeoutInMs: TLimit;
};

export type TExtensionQueryResult = {
  __typename?: 'ExtensionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TExtension>;
  total: Scalars['Long'];
};

export type TExtensionUpdateAction = {
  changeDestination?: InputMaybe<TChangeExtensionDestination>;
  changeTriggers?: InputMaybe<TChangeExtensionTriggers>;
  setKey?: InputMaybe<TSetExtensionKey>;
  setTimeoutInMs?: InputMaybe<TSetExtensionTimeoutInMs>;
};

export type TExternalDiscountValue = TProductDiscountValue & {
  __typename?: 'ExternalDiscountValue';
  type: Scalars['String'];
};

export type TExternalDiscountValueInput = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TExternalLineItemTotalPrice = {
  __typename?: 'ExternalLineItemTotalPrice';
  price: TBaseMoney;
  totalPrice: TMoney;
};

export type TExternalLineItemTotalPriceDraft = {
  price: TBaseMoneyInput;
  totalPrice: TMoneyInput;
};

export type TExternalOAuth = {
  __typename?: 'ExternalOAuth';
  authorizationHeader: Scalars['String'];
  url: Scalars['String'];
};

export type TExternalOAuthDraft = {
  authorizationHeader: Scalars['String'];
  url: Scalars['String'];
};

export type TExternalTaxAmountDraft = {
  taxRate: TExternalTaxRateDraft;
  totalGross: TMoneyInput;
};

export type TExternalTaxAmountDraftOutput = {
  __typename?: 'ExternalTaxAmountDraftOutput';
  taxRate: TExternalTaxRateDraftOutput;
  totalGross: TMoney;
};

export type TExternalTaxRateDraft = {
  amount: Scalars['Float'];
  country: Scalars['Country'];
  includedInPrice?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
  subRates?: InputMaybe<Array<TSubRateDraft>>;
};

export type TExternalTaxRateDraftOutput = {
  __typename?: 'ExternalTaxRateDraftOutput';
  amount?: Maybe<Scalars['Float']>;
  country: Scalars['Country'];
  includedInPrice: Scalars['Boolean'];
  name: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  subRates: Array<TSubRate>;
};

export type TFacetResult = {
  type: Scalars['String'];
};

export type TFacetResultValue = {
  __typename?: 'FacetResultValue';
  facet: Scalars['String'];
  value: TFacetResult;
};

/** Field definitions describe custom fields and allow you to define some meta-information associated with the field. */
export type TFieldDefinition = {
  __typename?: 'FieldDefinition';
  inputHint: TTextInputHint;
  label?: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
  name: Scalars['String'];
  required: Scalars['Boolean'];
  type: TFieldType;
};


/** Field definitions describe custom fields and allow you to define some meta-information associated with the field. */
export type TFieldDefinition_LabelArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TFieldDefinitionInput = {
  inputHint: TTextInputHint;
  label: Array<TLocalizedStringItemInputType>;
  name: Scalars['String'];
  required: Scalars['Boolean'];
  type: TFieldTypeInput;
};

export type TFieldType = {
  name: Scalars['String'];
};

export type TFieldTypeEnumTypeDraft = {
  values: Array<TEnumValueInput>;
};

export type TFieldTypeInput = {
  Boolean?: InputMaybe<TSimpleFieldTypeDraft>;
  Date?: InputMaybe<TSimpleFieldTypeDraft>;
  DateTime?: InputMaybe<TSimpleFieldTypeDraft>;
  Enum?: InputMaybe<TFieldTypeEnumTypeDraft>;
  LocalizedEnum?: InputMaybe<TFieldTypeLocalizedEnumTypeDraft>;
  LocalizedString?: InputMaybe<TSimpleFieldTypeDraft>;
  Money?: InputMaybe<TSimpleFieldTypeDraft>;
  Number?: InputMaybe<TSimpleFieldTypeDraft>;
  Reference?: InputMaybe<TFieldTypeReferenceTypeDraft>;
  Set?: InputMaybe<TFieldTypeSetTypeDraft>;
  String?: InputMaybe<TSimpleFieldTypeDraft>;
  Time?: InputMaybe<TSimpleFieldTypeDraft>;
};

export type TFieldTypeLocalizedEnumTypeDraft = {
  values: Array<TLocalizedEnumValueInput>;
};

export type TFieldTypeReferenceTypeDraft = {
  referenceTypeId: Scalars['String'];
};

export type TFieldTypeSetElementTypeDraft = {
  Boolean?: InputMaybe<TSimpleFieldTypeDraft>;
  Date?: InputMaybe<TSimpleFieldTypeDraft>;
  DateTime?: InputMaybe<TSimpleFieldTypeDraft>;
  Enum?: InputMaybe<TFieldTypeEnumTypeDraft>;
  LocalizedEnum?: InputMaybe<TFieldTypeLocalizedEnumTypeDraft>;
  LocalizedString?: InputMaybe<TSimpleFieldTypeDraft>;
  Money?: InputMaybe<TSimpleFieldTypeDraft>;
  Number?: InputMaybe<TSimpleFieldTypeDraft>;
  Reference?: InputMaybe<TFieldTypeReferenceTypeDraft>;
  String?: InputMaybe<TSimpleFieldTypeDraft>;
  Time?: InputMaybe<TSimpleFieldTypeDraft>;
};

export type TFieldTypeSetTypeDraft = {
  elementType: TFieldTypeSetElementTypeDraft;
};

export type TFixedPriceDiscountValue = TCartDiscountValue & {
  __typename?: 'FixedPriceDiscountValue';
  money: Array<TBaseMoney>;
  type: Scalars['String'];
};

export type TFixedPriceDiscountValueInput = {
  money: Array<TCartDiscountValueBaseMoneyInput>;
};

export type TFreezeCart = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TGeometry = {
  type: Scalars['String'];
};

export type TGeometryInput = {
  coordinates?: InputMaybe<Array<Scalars['Float']>>;
  type: Scalars['String'];
};

export type TGiftLineItemValue = TCartDiscountValue & {
  __typename?: 'GiftLineItemValue';
  distributionChannelRef?: Maybe<TChannelReferenceIdentifier>;
  productRef: TProductReferenceIdentifier;
  supplyChannelRef?: Maybe<TChannelReferenceIdentifier>;
  type: Scalars['String'];
  variantId: Scalars['Int'];
};

export type TGiftLineItemValueInput = {
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  product: TResourceIdentifierInput;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
  variantId: Scalars['Int'];
};

export type TGoogleCloudFunctionDestination = TExtensionDestination & {
  __typename?: 'GoogleCloudFunctionDestination';
  type: Scalars['String'];
  url: Scalars['String'];
};

export type TGoogleCloudFunctionDestinationInput = {
  url: Scalars['String'];
};

export type TGoogleCloudPubSubDestination = TDestination & {
  __typename?: 'GoogleCloudPubSubDestination';
  projectId: Scalars['String'];
  topic: Scalars['String'];
  type: Scalars['String'];
};

export type TGoogleCloudPubSubDestinationInput = {
  projectId: Scalars['String'];
  topic: Scalars['String'];
};

export type THighPrecisionMoney = TBaseMoney & {
  __typename?: 'HighPrecisionMoney';
  centAmount: Scalars['Long'];
  currencyCode: Scalars['Currency'];
  fractionDigits: Scalars['Int'];
  preciseAmount: Scalars['Long'];
  type: Scalars['String'];
};

export type THighPrecisionMoneyInput = {
  centAmount?: InputMaybe<Scalars['Long']>;
  currencyCode: Scalars['Currency'];
  fractionDigits: Scalars['Int'];
  preciseAmount: Scalars['Long'];
};

export type THttpDestination = TExtensionDestination & {
  __typename?: 'HttpDestination';
  authentication?: Maybe<THttpDestinationAuthentication>;
  type: Scalars['String'];
  url: Scalars['String'];
};

export type THttpDestinationAuthentication = {
  type: Scalars['String'];
};

export type THttpDestinationAuthenticationInput = {
  AuthorizationHeader?: InputMaybe<TAuthorizationHeaderInput>;
  AzureFunctions?: InputMaybe<TAzureFunctionsAuthenticationInput>;
};

export type THttpDestinationInput = {
  authentication?: InputMaybe<THttpDestinationAuthenticationInput>;
  url: Scalars['String'];
};

export type TImage = {
  __typename?: 'Image';
  dimensions: TDimensions;
  label?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type TImageInput = {
  dimensions: TDimensionsInput;
  label?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type TImageProductSearch = {
  __typename?: 'ImageProductSearch';
  dimensions: TDimensionsProductSearch;
  label?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type TImportOrderCustomLineItemState = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  state: Array<TItemStateDraftType>;
};

export type TImportOrderDraft = {
  billingAddress?: InputMaybe<TAddressInput>;
  completedAt?: InputMaybe<Scalars['DateTime']>;
  country?: InputMaybe<Scalars['Country']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  customLineItems?: Array<TCustomLineItemImportDraft>;
  customerEmail?: InputMaybe<Scalars['String']>;
  customerGroup?: InputMaybe<TReferenceInput>;
  customerId?: InputMaybe<Scalars['String']>;
  inventoryMode?: InputMaybe<TInventoryMode>;
  itemShippingAddresses?: InputMaybe<Array<TAddressInput>>;
  lineItems?: Array<TLineItemImportDraft>;
  orderNumber?: InputMaybe<Scalars['String']>;
  orderState?: InputMaybe<TOrderState>;
  origin?: InputMaybe<TCartOrigin>;
  paymentInfo?: InputMaybe<TReferenceInput>;
  paymentState?: InputMaybe<TPaymentState>;
  purchaseOrderNumber?: InputMaybe<Scalars['String']>;
  shipmentState?: InputMaybe<TShipmentState>;
  shippingAddress?: InputMaybe<TAddressInput>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
  shippingInfo?: InputMaybe<TShippingInfoImportDraft>;
  state?: InputMaybe<TReferenceInput>;
  store?: InputMaybe<TReferenceInput>;
  taxCalculationMode?: InputMaybe<TTaxCalculationMode>;
  taxedPrice?: InputMaybe<TTaxedPriceDraft>;
  totalPrice: TMoneyInput;
};

export type TImportOrderLineItemState = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  state: Array<TItemStateDraftType>;
};

export type TImportStagedOrderCustomLineItemState = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  state: Array<TItemStateDraftType>;
};

export type TImportStagedOrderCustomLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ImportStagedOrderCustomLineItemStateOutput';
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  state: Scalars['Set'];
  type: Scalars['String'];
};

export type TImportStagedOrderLineItemState = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  state: Array<TItemStateDraftType>;
};

export type TImportStagedOrderLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ImportStagedOrderLineItemStateOutput';
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  state: Scalars['Set'];
  type: Scalars['String'];
};

export type TInStore = TCartDiscountQueryInterface & TCartQueryInterface & TCustomerActiveCartInterface & TCustomerQueryInterface & TMeFieldInterface & TOrderQueryInterface & TShippingMethodsByCartInterface & {
  __typename?: 'InStore';
  cart?: Maybe<TCart>;
  cartDiscount?: Maybe<TCartDiscount>;
  cartDiscounts: TCartDiscountQueryResult;
  carts: TCartQueryResult;
  customer?: Maybe<TCustomer>;
  customerActiveCart?: Maybe<TCart>;
  customers: TCustomerQueryResult;
  /**
   * This field can only be used with an access token created with the password flow or with an anonymous session.
   *
   * It gives access to the data that is specific to the customer or the anonymous session linked to the access token.
   */
  me: TInStoreMe;
  order?: Maybe<TOrder>;
  orders: TOrderQueryResult;
  product?: Maybe<TProduct>;
  productSelectionAssignments: TProductAssignmentQueryResult;
  shippingMethodsByCart: Array<TShippingMethod>;
  shoppingList?: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
};


export type TInStore_CartArgs = {
  id: Scalars['String'];
};


export type TInStore_CartDiscountArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TInStore_CartDiscountsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TInStore_CartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TInStore_CustomerArgs = {
  emailToken?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  passwordToken?: InputMaybe<Scalars['String']>;
};


export type TInStore_CustomerActiveCartArgs = {
  customerId: Scalars['String'];
};


export type TInStore_CustomersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TInStore_OrderArgs = {
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
};


export type TInStore_OrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TInStore_ProductArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  localeProjection?: InputMaybe<Array<Scalars['Locale']>>;
  projectExpandedProducts?: InputMaybe<Scalars['Boolean']>;
  sku?: InputMaybe<Scalars['String']>;
  variantKey?: InputMaybe<Scalars['String']>;
};


export type TInStore_ProductSelectionAssignmentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TInStore_ShippingMethodsByCartArgs = {
  id: Scalars['String'];
};


export type TInStore_ShoppingListArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TInStore_ShoppingListsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TInStoreMe = TActiveCartInterface & TCartQueryInterface & TMeQueryInterface & TOrderQueryInterface & TShoppingListQueryInterface & {
  __typename?: 'InStoreMe';
  activeCart?: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  cart?: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  carts: TCartQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  customer?: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  order?: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  orders: TOrderQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  shoppingList?: Maybe<TShoppingList>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  shoppingLists: TShoppingListQueryResult;
};


export type TInStoreMe_CartArgs = {
  id: Scalars['String'];
};


export type TInStoreMe_CartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TInStoreMe_OrderArgs = {
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
};


export type TInStoreMe_OrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TInStoreMe_ShoppingListArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TInStoreMe_ShoppingListsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TInheritedAssociate = {
  __typename?: 'InheritedAssociate';
  associateRoleAssignments: Array<TInheritedAssociateRoleAssignment>;
  customer?: Maybe<TCustomer>;
  customerRef?: Maybe<TReference>;
};

export type TInheritedAssociateRoleAssignment = {
  __typename?: 'InheritedAssociateRoleAssignment';
  associateRole: TAssociateRole;
  associateRoleRef: TKeyReference;
  source: TBusinessUnit;
  sourceRef: TKeyReference;
};

export type TInheritedStore = {
  __typename?: 'InheritedStore';
  store?: Maybe<TStore>;
  storeRef: TKeyReference;
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

export type TInterfaceInteractionsRaw = {
  __typename?: 'InterfaceInteractionsRaw';
  fields: Array<TRawCustomField>;
  type?: Maybe<TTypeDefinition>;
  typeRef: TReference;
};


export type TInterfaceInteractionsRaw_FieldsArgs = {
  excludeNames?: InputMaybe<Array<Scalars['String']>>;
  includeNames?: InputMaybe<Array<Scalars['String']>>;
};

export type TInterfaceInteractionsRawResult = {
  __typename?: 'InterfaceInteractionsRawResult';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  results: Array<TInterfaceInteractionsRaw>;
  total: Scalars['Int'];
};

/** Inventory allows you to track stock quantity per SKU and optionally per supply channel */
export type TInventoryEntry = TReferenceExpandable & TVersioned & {
  __typename?: 'InventoryEntry';
  availableQuantity: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  expectedDelivery?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  quantityOnStock: Scalars['Long'];
  restockableInDays?: Maybe<Scalars['Int']>;
  sku: Scalars['String'];
  supplyChannel?: Maybe<TChannel>;
  supplyChannelRef?: Maybe<TReference>;
  version: Scalars['Long'];
};

export type TInventoryEntryCreated = TMessagePayload & {
  __typename?: 'InventoryEntryCreated';
  inventoryEntry: TInventoryEntry;
  type: Scalars['String'];
};

export type TInventoryEntryDeleted = TMessagePayload & {
  __typename?: 'InventoryEntryDeleted';
  sku: Scalars['String'];
  supplyChannel?: Maybe<TChannel>;
  supplyChannelRef?: Maybe<TReference>;
  type: Scalars['String'];
};

export type TInventoryEntryDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  expectedDelivery?: InputMaybe<Scalars['DateTime']>;
  key?: InputMaybe<Scalars['String']>;
  quantityOnStock: Scalars['Long'];
  restockableInDays?: InputMaybe<Scalars['Int']>;
  sku: Scalars['String'];
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
};

export type TInventoryEntryQuantitySet = TMessagePayload & {
  __typename?: 'InventoryEntryQuantitySet';
  newAvailableQuantity: Scalars['Long'];
  newQuantityOnStock: Scalars['Long'];
  oldAvailableQuantity: Scalars['Long'];
  oldQuantityOnStock: Scalars['Long'];
  supplyChannel?: Maybe<TChannel>;
  supplyChannelRef?: Maybe<TReference>;
  type: Scalars['String'];
};

export type TInventoryEntryQueryResult = {
  __typename?: 'InventoryEntryQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TInventoryEntry>;
  total: Scalars['Long'];
};

export type TInventoryEntryUpdateAction = {
  addQuantity?: InputMaybe<TAddInventoryEntryQuantity>;
  changeQuantity?: InputMaybe<TChangeInventoryEntryQuantity>;
  removeQuantity?: InputMaybe<TRemoveInventoryEntryQuantity>;
  setCustomField?: InputMaybe<TSetInventoryEntryCustomField>;
  setCustomType?: InputMaybe<TSetInventoryEntryCustomType>;
  setExpectedDelivery?: InputMaybe<TSetInventoryEntryExpectedDelivery>;
  setRestockableInDays?: InputMaybe<TSetInventoryEntryRestockableInDays>;
  setSupplyChannel?: InputMaybe<TSetInventoryEntrySupplyChannel>;
};

export enum TInventoryMode {
  /**
   * Adding items to cart and ordering is independent of inventory. No inventory checks or modifications.
   * This is the default mode for a new cart.
   */
  None = 'None',
  /**
   * Creating an order will fail with an OutOfStock error if an unavailable line item exists. Line items in the cart
   * are only reserved for the duration of the ordering transaction.
   */
  ReserveOnOrder = 'ReserveOnOrder',
  /**
   * Orders are tracked on inventory. That means, ordering a LineItem will decrement the available quantity on the
   * respective InventoryEntry. Creating an order will succeed even if the line item’s available quantity is zero or
   * negative. But creating an order will fail with an OutOfStock error if no matching inventory entry exists for a
   * line item.
   */
  TrackOnly = 'TrackOnly'
}

export type TItemShippingDetails = {
  __typename?: 'ItemShippingDetails';
  targets: Array<TItemShippingTarget>;
  valid: Scalars['Boolean'];
};

export type TItemShippingDetailsDraft = {
  targets: Array<TShippingTargetDraft>;
};

export type TItemShippingDetailsDraftOutput = {
  __typename?: 'ItemShippingDetailsDraftOutput';
  targets: Array<TItemShippingTarget>;
};

export type TItemShippingDetailsDraftType = {
  targets: Array<TShippingTargetDraftType>;
};

export type TItemShippingTarget = {
  __typename?: 'ItemShippingTarget';
  addressKey: Scalars['String'];
  quantity: Scalars['Long'];
  shippingMethodKey?: Maybe<Scalars['String']>;
};

export type TItemState = {
  __typename?: 'ItemState';
  quantity: Scalars['Long'];
  state?: Maybe<TState>;
  stateRef: TReference;
};

export type TItemStateDraftType = {
  quantity: Scalars['Long'];
  state: TReferenceInput;
};

export type TKeyReference = {
  __typename?: 'KeyReference';
  key: Scalars['String'];
  typeId: Scalars['String'];
};

export type TLimit = {
  __typename?: 'Limit';
  limit?: Maybe<Scalars['Long']>;
};

export type TLimitWithCurrent = {
  current?: Maybe<Scalars['Long']>;
  limit?: Maybe<Scalars['Long']>;
};

/**
 * A line item is a snapshot of a product variant at the time it was added to the cart.
 *
 * Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
 * The relation to the Product is kept but the line item will not automatically update if the product variant changes.
 * On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
 * It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
 * non-existent product and the productSlug is left empty.
 *
 * Please also note that creating an order is impossible if the product or product variant a line item relates to has been deleted.
 */
export type TLineItem = {
  __typename?: 'LineItem';
  addedAt?: Maybe<Scalars['DateTime']>;
  custom?: Maybe<TCustomFieldsType>;
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  distributionChannel?: Maybe<TChannel>;
  distributionChannelRef?: Maybe<TReference>;
  id: Scalars['String'];
  inventoryMode?: Maybe<TInventoryMode>;
  key?: Maybe<Scalars['String']>;
  lastModifiedAt?: Maybe<Scalars['DateTime']>;
  lineItemMode: TLineItemMode;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  perMethodTaxRate: Array<TMethodTaxRate>;
  price: TProductPrice;
  priceMode: TLineItemPriceMode;
  productId: Scalars['String'];
  productKey?: Maybe<Scalars['String']>;
  productSlug?: Maybe<Scalars['String']>;
  productSlugAllLocales?: Maybe<Array<TLocalizedString>>;
  productType?: Maybe<TProductTypeDefinition>;
  productTypeRef?: Maybe<TReference>;
  quantity: Scalars['Long'];
  shippingDetails?: Maybe<TItemShippingDetails>;
  state: Array<TItemState>;
  supplyChannel?: Maybe<TChannel>;
  supplyChannelRef?: Maybe<TReference>;
  taxRate?: Maybe<TTaxRate>;
  taxedPrice?: Maybe<TTaxedItemPrice>;
  taxedPricePortions: Array<TMethodTaxedPrice>;
  totalPrice?: Maybe<TMoney>;
  variant?: Maybe<TProductVariant>;
};


/**
 * A line item is a snapshot of a product variant at the time it was added to the cart.
 *
 * Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
 * The relation to the Product is kept but the line item will not automatically update if the product variant changes.
 * On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
 * It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
 * non-existent product and the productSlug is left empty.
 *
 * Please also note that creating an order is impossible if the product or product variant a line item relates to has been deleted.
 */
export type TLineItem_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


/**
 * A line item is a snapshot of a product variant at the time it was added to the cart.
 *
 * Since a product variant may change at any time, the ProductVariant data is copied into the field variant.
 * The relation to the Product is kept but the line item will not automatically update if the product variant changes.
 * On the cart, the line item can be updated manually. The productSlug refers to the current version of the product.
 * It can be used to link to the product. If the product has been deleted, the line item remains but refers to a
 * non-existent product and the productSlug is left empty.
 *
 * Please also note that creating an order is impossible if the product or product variant a line item relates to has been deleted.
 */
export type TLineItem_ProductSlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TLineItemDraft = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  externalPrice?: InputMaybe<TBaseMoneyInput>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  externalTotalPrice?: InputMaybe<TExternalLineItemTotalPriceDraft>;
  inventoryMode?: InputMaybe<TInventoryMode>;
  key?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
  sku?: InputMaybe<Scalars['String']>;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TLineItemDraftOutput = {
  __typename?: 'LineItemDraftOutput';
  addedAt?: Maybe<Scalars['DateTime']>;
  custom?: Maybe<TCustomFieldsCommand>;
  distributionChannelResId?: Maybe<TResourceIdentifier>;
  externalPrice?: Maybe<TBaseMoney>;
  externalTaxRate?: Maybe<TExternalTaxRateDraftOutput>;
  externalTotalPrice?: Maybe<TExternalLineItemTotalPrice>;
  inventoryMode?: Maybe<TInventoryMode>;
  key?: Maybe<Scalars['String']>;
  perMethodExternalTaxRate: Array<TMethodExternalTaxRateDraftOutput>;
  productId?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Long']>;
  shippingDetails?: Maybe<TItemShippingDetailsDraftOutput>;
  sku?: Maybe<Scalars['String']>;
  supplyChannelResId?: Maybe<TResourceIdentifier>;
  variantId?: Maybe<Scalars['Int']>;
};

export type TLineItemImportDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  key?: InputMaybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  price: TProductPriceDataInput;
  productId?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Long'];
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
  state?: InputMaybe<Array<TItemStateDraftType>>;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
  taxRate?: InputMaybe<TTaxRateInput>;
  variant: TProductVariantImportDraft;
};

export enum TLineItemMode {
  /**
   * The line item was added automatically, because a discount has added a free gift to the cart.
   * The quantity can not be increased, and it won’t be merged when the same product variant is added.
   * If the gift is removed, an entry is added to the "refusedGifts" array and the discount won’t be applied again
   * to the cart. The price can not be changed externally.
   * All other updates, such as the ones related to custom fields, can be used.
   */
  GiftLineItem = 'GiftLineItem',
  /**
   * The line item was added during cart creation or with the update action addLineItem. Its quantity can be
   * changed without restrictions.
   */
  Standard = 'Standard'
}

export enum TLineItemPriceMode {
  /** The line item price was set externally. Cart discounts can apply to line items with this price mode. All update actions that change the quantity of a line item with this price mode require the externalPrice field to be given. */
  ExternalPrice = 'ExternalPrice',
  /** The line item price with the total was set externally. */
  ExternalTotal = 'ExternalTotal',
  /** The price is selected form the product variant. This is the default mode. */
  Platform = 'Platform'
}

export type TLineItemReturnItem = TReturnItem & {
  __typename?: 'LineItemReturnItem';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lineItemId: Scalars['String'];
  paymentState: TReturnPaymentState;
  quantity: Scalars['Long'];
  shipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TLineItemStateTransition = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'LineItemStateTransition';
  fromState?: Maybe<TState>;
  fromStateRef: TReference;
  lineItemId: Scalars['String'];
  lineItemKey?: Maybe<Scalars['String']>;
  quantity: Scalars['Long'];
  toState?: Maybe<TState>;
  toStateRef: TReference;
  transitionDate: Scalars['DateTime'];
  type: Scalars['String'];
};

export type TLineItemsTarget = TCartDiscountTarget & {
  __typename?: 'LineItemsTarget';
  predicate: Scalars['String'];
  type: Scalars['String'];
};

export type TLineItemsTargetInput = {
  predicate: Scalars['String'];
};

export type TLocalizableEnumAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'LocalizableEnumAttributeDefinitionType';
  name: Scalars['String'];
  values: TLocalizableEnumValueTypeResult;
};


export type TLocalizableEnumAttributeDefinitionType_ValuesArgs = {
  excludeKeys?: InputMaybe<Array<Scalars['String']>>;
  includeKeys?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
};

export type TLocalizableEnumTypeDraft = {
  values: Array<TLocalizedEnumValueDraft>;
};

export type TLocalizableEnumValueType = {
  __typename?: 'LocalizableEnumValueType';
  key: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
};


export type TLocalizableEnumValueType_LabelArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TLocalizableEnumValueTypeResult = {
  __typename?: 'LocalizableEnumValueTypeResult';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  results: Array<TLocalizableEnumValueType>;
  total: Scalars['Int'];
};

export type TLocalizableTextAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'LocalizableTextAttributeDefinitionType';
  name: Scalars['String'];
};

export type TLocalizedEnumAttribute = TAttribute & {
  __typename?: 'LocalizedEnumAttribute';
  key: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type TLocalizedEnumAttribute_LabelArgs = {
  locale: Scalars['Locale'];
};

export type TLocalizedEnumField = TCustomField & {
  __typename?: 'LocalizedEnumField';
  key: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type TLocalizedEnumField_LabelArgs = {
  locale: Scalars['Locale'];
};

export type TLocalizedEnumType = TFieldType & {
  __typename?: 'LocalizedEnumType';
  name: Scalars['String'];
  values: Array<TLocalizedEnumValue>;
};

export type TLocalizedEnumValue = {
  __typename?: 'LocalizedEnumValue';
  key: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
};


export type TLocalizedEnumValue_LabelArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TLocalizedEnumValueDraft = {
  key: Scalars['String'];
  label: Array<TLocalizedStringItemInputType>;
};

export type TLocalizedEnumValueInput = {
  key: Scalars['String'];
  label: Array<TLocalizedStringItemInputType>;
};

export type TLocalizedString = {
  __typename?: 'LocalizedString';
  locale: Scalars['Locale'];
  value: Scalars['String'];
};

export type TLocalizedStringAttribute = TAttribute & {
  __typename?: 'LocalizedStringAttribute';
  name: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};


export type TLocalizedStringAttribute_ValueArgs = {
  locale: Scalars['Locale'];
};

export type TLocalizedStringField = TCustomField & {
  __typename?: 'LocalizedStringField';
  name: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};


export type TLocalizedStringField_ValueArgs = {
  locale: Scalars['Locale'];
};

export type TLocalizedStringItemInputType = {
  locale: Scalars['Locale'];
  value: Scalars['String'];
};

export type TLocalizedStringType = TFieldType & {
  __typename?: 'LocalizedStringType';
  name: Scalars['String'];
};

export type TLocalizedText = {
  locale: Scalars['Locale'];
  text: Scalars['String'];
};

export type TLocation = {
  __typename?: 'Location';
  country: Scalars['Country'];
  state?: Maybe<Scalars['String']>;
};

export type TMe = TActiveCartInterface & TCartQueryInterface & TMeQueryInterface & TOrderQueryInterface & TShoppingListQueryInterface & {
  __typename?: 'Me';
  activeCart?: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  businessUnit?: Maybe<TBusinessUnit>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  businessUnits: TBusinessUnitQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  cart?: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  carts: TCartQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  customer?: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  order?: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  orders: TOrderQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  payment?: Maybe<TMyPayment>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  payments: TMyPaymentQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  quote?: Maybe<TQuote>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  quoteRequest?: Maybe<TQuoteRequest>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  quoteRequests: TQuoteRequestQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  quotes: TQuoteQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  shoppingList?: Maybe<TShoppingList>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  shoppingLists: TShoppingListQueryResult;
};


export type TMe_BusinessUnitArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TMe_BusinessUnitsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TMe_CartArgs = {
  id: Scalars['String'];
};


export type TMe_CartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TMe_OrderArgs = {
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
};


export type TMe_OrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TMe_PaymentArgs = {
  id: Scalars['String'];
};


export type TMe_PaymentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TMe_QuoteArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TMe_QuoteRequestArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TMe_QuoteRequestsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TMe_QuotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TMe_ShoppingListArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TMe_ShoppingListsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

/** The me field gives access to the data that is specific to the customer or anonymous session linked to the access token. */
export type TMeFieldInterface = {
  me: TMeQueryInterface;
};

export type TMeQueryInterface = {
  activeCart?: Maybe<TCart>;
  cart?: Maybe<TCart>;
  carts: TCartQueryResult;
  order?: Maybe<TOrder>;
  orders: TOrderQueryResult;
  shoppingList?: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
};


export type TMeQueryInterface_CartArgs = {
  id: Scalars['String'];
};


export type TMeQueryInterface_CartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TMeQueryInterface_OrderArgs = {
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
};


export type TMeQueryInterface_OrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TMeQueryInterface_ShoppingListArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TMeQueryInterface_ShoppingListsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TMessage = TReferenceExpandable & TVersioned & {
  __typename?: 'Message';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  payload: TMessagePayload;
  resourceRef: TReference;
  resourceVersion: Scalars['Long'];
  sequenceNumber: Scalars['Long'];
  type: Scalars['String'];
  userProvidedIdentifiers?: Maybe<TUserProvidedIdentifiers>;
  version: Scalars['Long'];
};

export type TMessagePayload = {
  type: Scalars['String'];
};

export type TMessageQueryResult = {
  __typename?: 'MessageQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TMessage>;
  total: Scalars['Long'];
};

export type TMessageSubscription = {
  __typename?: 'MessageSubscription';
  resourceTypeId: Scalars['String'];
  types: Array<Scalars['String']>;
};

export type TMessageSubscriptionInput = {
  resourceTypeId: Scalars['String'];
  types?: InputMaybe<Array<Scalars['String']>>;
};

export type TMessagesConfiguration = {
  __typename?: 'MessagesConfiguration';
  deleteDaysAfterCreation?: Maybe<Scalars['Int']>;
  enabled: Scalars['Boolean'];
};

export type TMessagesConfigurationDraft = {
  deleteDaysAfterCreation: Scalars['Int'];
  enabled: Scalars['Boolean'];
};

export type TMethodExternalTaxRateDraft = {
  shippingMethodKey: Scalars['String'];
  taxRate?: InputMaybe<TExternalTaxRateDraft>;
};

export type TMethodExternalTaxRateDraftOutput = {
  __typename?: 'MethodExternalTaxRateDraftOutput';
  shippingMethodKey: Scalars['String'];
  taxRate?: Maybe<TExternalTaxRateDraftOutput>;
};

export type TMethodTaxRate = {
  __typename?: 'MethodTaxRate';
  shippingMethodKey: Scalars['String'];
  taxRate?: Maybe<TTaxRate>;
};

export type TMethodTaxedPrice = {
  __typename?: 'MethodTaxedPrice';
  shippingMethodKey: Scalars['String'];
  taxedPrice?: Maybe<TTaxedItemPrice>;
};

export type TMissingFilterInput = {
  path: Scalars['String'];
};

export type TMoney = TBaseMoney & {
  __typename?: 'Money';
  centAmount: Scalars['Long'];
  currencyCode: Scalars['Currency'];
  /** For the `Money` it equals to the default number of fraction digits used with the currency. */
  fractionDigits: Scalars['Int'];
  type: Scalars['String'];
};

export type TMoneyAttribute = TAttribute & {
  __typename?: 'MoneyAttribute';
  centAmount: Scalars['Long'];
  currencyCode: Scalars['Currency'];
  name: Scalars['String'];
};

export type TMoneyAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'MoneyAttributeDefinitionType';
  name: Scalars['String'];
};

export type TMoneyDraft = {
  centAmount: Scalars['Long'];
  currencyCode: Scalars['Currency'];
};

export type TMoneyField = TCustomField & {
  __typename?: 'MoneyField';
  centAmount: Scalars['Long'];
  currencyCode: Scalars['Currency'];
  name: Scalars['String'];
};

export type TMoneyInput = {
  centAmount: Scalars['Long'];
  currencyCode: Scalars['Currency'];
};

export type TMoneyType = TFieldType & {
  __typename?: 'MoneyType';
  name: Scalars['String'];
};

export type TMoveProductImageToPosition = {
  imageUrl: Scalars['String'];
  position: Scalars['Int'];
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TMultiBuyCustomLineItemsTarget = TCartDiscountTarget & {
  __typename?: 'MultiBuyCustomLineItemsTarget';
  discountedQuantity: Scalars['Long'];
  maxOccurrence?: Maybe<Scalars['Int']>;
  predicate: Scalars['String'];
  selectionMode: TSelectionMode;
  triggerQuantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TMultiBuyCustomLineItemsTargetInput = {
  discountedQuantity: Scalars['Long'];
  maxOccurrence?: InputMaybe<Scalars['Int']>;
  predicate: Scalars['String'];
  selectionMode?: InputMaybe<TSelectionMode>;
  triggerQuantity: Scalars['Long'];
};

export type TMultiBuyLineItemsTarget = TCartDiscountTarget & {
  __typename?: 'MultiBuyLineItemsTarget';
  discountedQuantity: Scalars['Long'];
  maxOccurrence?: Maybe<Scalars['Int']>;
  predicate: Scalars['String'];
  selectionMode: TSelectionMode;
  triggerQuantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TMultiBuyLineItemsTargetInput = {
  discountedQuantity: Scalars['Long'];
  maxOccurrence?: InputMaybe<Scalars['Int']>;
  predicate: Scalars['String'];
  selectionMode?: InputMaybe<TSelectionMode>;
  triggerQuantity: Scalars['Long'];
};

export type TMutation = {
  __typename?: 'Mutation';
  createApiClient?: Maybe<TApiClientWithSecret>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  createApprovalRule?: Maybe<TApprovalRule>;
  createAssociateRole?: Maybe<TAssociateRole>;
  createAttributeGroup?: Maybe<TAttributeGroup>;
  createBusinessUnit?: Maybe<TBusinessUnit>;
  createCart?: Maybe<TCart>;
  createCartDiscount?: Maybe<TCartDiscount>;
  createCategory?: Maybe<TCategory>;
  createChannel?: Maybe<TChannel>;
  createCustomerGroup?: Maybe<TCustomerGroup>;
  createDiscountCode?: Maybe<TDiscountCode>;
  createExtension?: Maybe<TExtension>;
  createInventoryEntry?: Maybe<TInventoryEntry>;
  createMyBusinessUnit?: Maybe<TBusinessUnit>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  createMyCart?: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  createMyOrderFromCart?: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  createMyOrderFromQuote?: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  createMyPayment?: Maybe<TMyPayment>;
  createMyQuoteRequest?: Maybe<TQuoteRequest>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  createMyShoppingList?: Maybe<TShoppingList>;
  createOrUpdateCustomObject?: Maybe<TCustomObject>;
  createOrderEdit?: Maybe<TOrderEdit>;
  createOrderFromCart?: Maybe<TOrder>;
  createOrderFromQuote?: Maybe<TOrder>;
  createPayment?: Maybe<TPayment>;
  createProduct?: Maybe<TProduct>;
  createProductDiscount?: Maybe<TProductDiscount>;
  createProductSelection?: Maybe<TProductSelection>;
  createProductType?: Maybe<TProductTypeDefinition>;
  createQuote?: Maybe<TQuote>;
  createQuoteRequest?: Maybe<TQuoteRequest>;
  createReview?: Maybe<TReview>;
  createShippingMethod?: Maybe<TShippingMethod>;
  createShoppingList?: Maybe<TShoppingList>;
  createStagedQuote?: Maybe<TStagedQuote>;
  createStandalonePrice?: Maybe<TStandalonePrice>;
  createState?: Maybe<TState>;
  createStore?: Maybe<TStore>;
  createSubscription?: Maybe<TCommercetoolsSubscription>;
  createTaxCategory?: Maybe<TTaxCategory>;
  createTypeDefinition?: Maybe<TTypeDefinition>;
  createZone?: Maybe<TZone>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  customerChangeMyPassword?: Maybe<TCustomer>;
  customerChangePassword?: Maybe<TCustomer>;
  /** Verifies customer's email using a token. */
  customerConfirmEmail?: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  customerConfirmMyEmail?: Maybe<TCustomer>;
  customerCreateEmailVerificationToken: TCustomerEmailToken;
  /** The token value is used to reset the password of the customer with the given email. The token is valid only for 10 minutes. */
  customerCreatePasswordResetToken?: Maybe<TCustomerPasswordToken>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  customerResetMyPassword?: Maybe<TCustomer>;
  /**
   * The following workflow can be used to reset the customer’s password:
   *
   * 1. Create a password reset token and send it embedded in a link to the customer.
   * 2. When the customer clicks on the link, you may optionally retrieve customer by password token.
   * 3. When the customer entered new password, use reset customer’s password to reset the password.
   */
  customerResetPassword?: Maybe<TCustomer>;
  /**
   * Retrieves the authenticated customer (a customer that matches the given email/password pair).
   *
   * There may be carts and orders created before the sign in that should be assigned to the customer account. With the `anonymousCartId`, a single anonymous cart can be assigned. With the `anonymousId`, all orders and carts that have this `anonymousId` set will be assigned to the customer.
   * If both `anonymousCartId` and `anonymousId` are given, the anonymous cart must have the `anonymousId`.
   *
   * Additionally, there might also exist one or more active customer carts from an earlier session. On customer sign in there are several ways how to proceed with this cart and the cart referenced by the `anonymousCartId`.
   *
   * * If the customer does not have a cart yet, the anonymous cart becomes the customer's cart.
   * * If the customer already has one or more carts, the content of the anonymous cart will be copied to the customer's active cart that has been modified most recently.
   *
   *   In this case the `CartState` of the anonymous cart gets changed to `Merged` while the customer's cart remains the `Active` cart.
   *
   *   If a `LineItem` in the anonymous cart matches an existing line item, or a `CustomLineItem` matches an existing custom line item in the customer's cart, the maximum quantity of both line items is used as the new quantity.
   *
   *   `ItemShippingDetails` are copied from the item with the highest quantity.
   *
   *   If `itemShippingAddresses` are different in the two carts, the resulting cart contains the addresses of both the customer cart and the anonymous cart.
   *
   *   Note, that it is not possible to merge carts that differ in their currency (set during creation of the cart).
   *
   * If a cart is is returned as part of the `CustomerSignInResult`, it has been recalculated (it will have up-to-date prices, taxes and discounts, and invalid line items have been removed).
   */
  customerSignIn: TCustomerSignInResult;
  /**
   * BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta
   *
   * Retrieves the authenticated customer (a customer that matches the given email/password pair).
   *
   * If used with an access token for Anonymous Sessions, all orders and carts belonging to the `anonymousId` will be assigned to the newly created customer.
   *
   * * If the customer does not have a cart yet, the anonymous cart that was modified most recently becomes the customer's cart.
   * * If the customer already has a cart, the most recently modified anonymous cart will be handled according to the `AnonymousCartSignInMode`.
   *
   * If a cart is is returned as part of the `CustomerSignInResult`, it has been recalculated (it will have up-to-date prices, taxes and discounts, and invalid line items have been removed).
   */
  customerSignMeIn: TCustomerSignInResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta If used with an access token for Anonymous Sessions, all orders and carts belonging to the anonymousId will be assigned to the newly created customer. */
  customerSignMeUp: TCustomerSignInResult;
  /** Creates a customer. If an anonymous cart is given then the cart is assigned to the created customer and the version number of the Cart will increase. If the id of an anonymous session is given, all carts and orders will be assigned to the created customer. */
  customerSignUp: TCustomerSignInResult;
  deleteApiClient?: Maybe<TApiClientWithoutSecret>;
  deleteAssociateRole?: Maybe<TAssociateRole>;
  deleteAttributeGroup?: Maybe<TAttributeGroup>;
  deleteBusinessUnit?: Maybe<TBusinessUnit>;
  deleteCart?: Maybe<TCart>;
  deleteCartDiscount?: Maybe<TCartDiscount>;
  deleteCategory?: Maybe<TCategory>;
  deleteChannel?: Maybe<TChannel>;
  deleteCustomObject?: Maybe<TCustomObject>;
  deleteCustomer?: Maybe<TCustomer>;
  deleteCustomerGroup?: Maybe<TCustomerGroup>;
  deleteDiscountCode?: Maybe<TDiscountCode>;
  deleteExtension?: Maybe<TExtension>;
  deleteInventoryEntry?: Maybe<TInventoryEntry>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  deleteMyCart?: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  deleteMyCustomer?: Maybe<TCustomer>;
  deleteMyPayment?: Maybe<TMyPayment>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  deleteMyShoppingList?: Maybe<TShoppingList>;
  deleteOrder?: Maybe<TOrder>;
  deleteOrderEdit?: Maybe<TOrderEdit>;
  deletePayment?: Maybe<TPayment>;
  deleteProduct?: Maybe<TProduct>;
  deleteProductDiscount?: Maybe<TProductDiscount>;
  deleteProductSelection?: Maybe<TProductSelection>;
  deleteProductType?: Maybe<TProductTypeDefinition>;
  deleteQuote?: Maybe<TQuote>;
  deleteQuoteRequest?: Maybe<TQuoteRequest>;
  deleteReview?: Maybe<TReview>;
  deleteShippingMethod?: Maybe<TShippingMethod>;
  deleteShoppingList?: Maybe<TShoppingList>;
  deleteStagedQuote?: Maybe<TStagedQuote>;
  deleteStandalonePrice?: Maybe<TStandalonePrice>;
  deleteState?: Maybe<TState>;
  deleteStore?: Maybe<TStore>;
  deleteSubscription?: Maybe<TCommercetoolsSubscription>;
  deleteTaxCategory?: Maybe<TTaxCategory>;
  deleteTypeDefinition?: Maybe<TTypeDefinition>;
  deleteZone?: Maybe<TZone>;
  importOrder?: Maybe<TOrder>;
  replicateCart?: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  replicateMyCart?: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta Signs up a new customer and associates it with the business unit. */
  signUpInMyBusinessUnit: TCustomerSignInResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  updateApprovalFlow?: Maybe<TApprovalFlow>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  updateApprovalRule?: Maybe<TApprovalRule>;
  updateAssociateRole?: Maybe<TAssociateRole>;
  updateAttributeGroup?: Maybe<TAttributeGroup>;
  updateBusinessUnit?: Maybe<TBusinessUnit>;
  updateCart?: Maybe<TCart>;
  updateCartDiscount?: Maybe<TCartDiscount>;
  updateCategory?: Maybe<TCategory>;
  updateChannel?: Maybe<TChannel>;
  updateCustomer?: Maybe<TCustomer>;
  updateCustomerGroup?: Maybe<TCustomerGroup>;
  updateDiscountCode?: Maybe<TDiscountCode>;
  updateExtension?: Maybe<TExtension>;
  updateInventoryEntry?: Maybe<TInventoryEntry>;
  updateMyBusinessUnit?: Maybe<TBusinessUnit>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  updateMyCart?: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  updateMyCustomer?: Maybe<TCustomer>;
  updateMyPayment?: Maybe<TMyPayment>;
  updateMyQuote?: Maybe<TQuote>;
  updateMyQuoteRequest?: Maybe<TQuoteRequest>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  updateMyShoppingList?: Maybe<TShoppingList>;
  updateOrder?: Maybe<TOrder>;
  updateOrderEdit?: Maybe<TOrderEdit>;
  updatePayment?: Maybe<TPayment>;
  updateProduct?: Maybe<TProduct>;
  updateProductDiscount?: Maybe<TProductDiscount>;
  updateProductSelection?: Maybe<TProductSelection>;
  updateProductType?: Maybe<TProductTypeDefinition>;
  updateProject?: Maybe<TProjectProjection>;
  updateQuote?: Maybe<TQuote>;
  updateQuoteRequest?: Maybe<TQuoteRequest>;
  updateReview?: Maybe<TReview>;
  updateShippingMethod?: Maybe<TShippingMethod>;
  updateShoppingList?: Maybe<TShoppingList>;
  updateStagedQuote?: Maybe<TStagedQuote>;
  updateStandalonePrice?: Maybe<TStandalonePrice>;
  updateState?: Maybe<TState>;
  updateStore?: Maybe<TStore>;
  updateSubscription?: Maybe<TCommercetoolsSubscription>;
  updateTaxCategory?: Maybe<TTaxCategory>;
  updateTypeDefinition?: Maybe<TTypeDefinition>;
  updateZone?: Maybe<TZone>;
};


export type TMutation_CreateApiClientArgs = {
  draft: TCreateApiClient;
};


export type TMutation_CreateApprovalRuleArgs = {
  asAssociate: TAsAssociateArgument;
  draft: TApprovalRuleDraft;
};


export type TMutation_CreateAssociateRoleArgs = {
  draft: TAssociateRoleDraft;
};


export type TMutation_CreateAttributeGroupArgs = {
  draft: TAttributeGroupDraft;
};


export type TMutation_CreateBusinessUnitArgs = {
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  draft: TBusinessUnitDraft;
};


export type TMutation_CreateCartArgs = {
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  draft: TCartDraft;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateCartDiscountArgs = {
  draft: TCartDiscountDraft;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateCategoryArgs = {
  draft: TCategoryDraft;
};


export type TMutation_CreateChannelArgs = {
  draft: TChannelDraft;
};


export type TMutation_CreateCustomerGroupArgs = {
  draft: TCustomerGroupDraft;
};


export type TMutation_CreateDiscountCodeArgs = {
  draft: TDiscountCodeDraft;
};


export type TMutation_CreateExtensionArgs = {
  draft: TExtensionDraft;
};


export type TMutation_CreateInventoryEntryArgs = {
  draft: TInventoryEntryDraft;
};


export type TMutation_CreateMyBusinessUnitArgs = {
  draft: TMyBusinessUnitDraft;
};


export type TMutation_CreateMyCartArgs = {
  draft: TMyCartDraft;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateMyOrderFromCartArgs = {
  draft: TOrderMyCartCommand;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateMyOrderFromQuoteArgs = {
  draft: TOrderMyQuoteCommand;
};


export type TMutation_CreateMyPaymentArgs = {
  draft: TMyPaymentDraft;
};


export type TMutation_CreateMyQuoteRequestArgs = {
  draft: TMyQuoteRequestDraft;
};


export type TMutation_CreateMyShoppingListArgs = {
  draft: TMyShoppingListDraft;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateOrUpdateCustomObjectArgs = {
  draft: TCustomObjectDraft;
};


export type TMutation_CreateOrderEditArgs = {
  draft: TOrderEditDraft;
};


export type TMutation_CreateOrderFromCartArgs = {
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  draft: TOrderCartCommand;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateOrderFromQuoteArgs = {
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  draft: TOrderQuoteCommand;
};


export type TMutation_CreatePaymentArgs = {
  draft: TPaymentDraft;
};


export type TMutation_CreateProductArgs = {
  draft: TProductDraft;
};


export type TMutation_CreateProductDiscountArgs = {
  draft: TProductDiscountDraft;
};


export type TMutation_CreateProductSelectionArgs = {
  draft: TCreateProductSelectionDraft;
};


export type TMutation_CreateProductTypeArgs = {
  draft: TProductTypeDraft;
};


export type TMutation_CreateQuoteArgs = {
  draft: TQuoteDraft;
};


export type TMutation_CreateQuoteRequestArgs = {
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  draft: TQuoteRequestDraft;
};


export type TMutation_CreateReviewArgs = {
  draft: TReviewDraft;
};


export type TMutation_CreateShippingMethodArgs = {
  draft: TShippingMethodDraft;
};


export type TMutation_CreateShoppingListArgs = {
  draft: TShoppingListDraft;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateStagedQuoteArgs = {
  draft: TStagedQuoteDraft;
};


export type TMutation_CreateStandalonePriceArgs = {
  draft: TCreateStandalonePrice;
};


export type TMutation_CreateStateArgs = {
  draft: TStateDraft;
};


export type TMutation_CreateStoreArgs = {
  draft: TCreateStore;
};


export type TMutation_CreateSubscriptionArgs = {
  draft: TSubscriptionDraft;
};


export type TMutation_CreateTaxCategoryArgs = {
  draft: TTaxCategoryDraft;
};


export type TMutation_CreateTypeDefinitionArgs = {
  draft: TTypeDefinitionDraft;
};


export type TMutation_CreateZoneArgs = {
  draft: TCreateZone;
};


export type TMutation_CustomerChangeMyPasswordArgs = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_CustomerChangePasswordArgs = {
  currentPassword: Scalars['String'];
  id: Scalars['String'];
  newPassword: Scalars['String'];
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_CustomerConfirmEmailArgs = {
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  tokenValue: Scalars['String'];
  version?: InputMaybe<Scalars['Long']>;
};


export type TMutation_CustomerConfirmMyEmailArgs = {
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  tokenValue: Scalars['String'];
};


export type TMutation_CustomerCreateEmailVerificationTokenArgs = {
  id: Scalars['String'];
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  ttlMinutes: Scalars['Int'];
  version?: InputMaybe<Scalars['Long']>;
};


export type TMutation_CustomerCreatePasswordResetTokenArgs = {
  email: Scalars['String'];
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  ttlMinutes?: InputMaybe<Scalars['Int']>;
};


export type TMutation_CustomerResetMyPasswordArgs = {
  newPassword: Scalars['String'];
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  tokenValue: Scalars['String'];
};


export type TMutation_CustomerResetPasswordArgs = {
  newPassword: Scalars['String'];
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  tokenValue: Scalars['String'];
  version?: InputMaybe<Scalars['Long']>;
};


export type TMutation_CustomerSignInArgs = {
  draft: TCustomerSignInDraft;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerSignMeInArgs = {
  draft: TCustomerSignMeInDraft;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerSignMeUpArgs = {
  draft: TCustomerSignMeUpDraft;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerSignUpArgs = {
  draft: TCustomerSignUpDraft;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_DeleteApiClientArgs = {
  id: Scalars['String'];
};


export type TMutation_DeleteAssociateRoleArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteAttributeGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteBusinessUnitArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteCartArgs = {
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteCartDiscountArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteCategoryArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteChannelArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_DeleteCustomObjectArgs = {
  container?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  version?: InputMaybe<Scalars['Long']>;
};


export type TMutation_DeleteCustomerArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteCustomerGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteDiscountCodeArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_DeleteExtensionArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteInventoryEntryArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteMyCartArgs = {
  id: Scalars['String'];
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteMyCustomerArgs = {
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteMyPaymentArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_DeleteMyShoppingListArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteOrderArgs = {
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteOrderEditArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeletePaymentArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteProductArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteProductDiscountArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteProductSelectionArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteProductTypeArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteQuoteArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteQuoteRequestArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteReviewArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteShippingMethodArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteShoppingListArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteStagedQuoteArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  personalDataErasure?: InputMaybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteStandalonePriceArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteStateArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteStoreArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteSubscriptionArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteTaxCategoryArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteTypeDefinitionArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteZoneArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_ImportOrderArgs = {
  draft: TImportOrderDraft;
};


export type TMutation_ReplicateCartArgs = {
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  key?: InputMaybe<Scalars['String']>;
  reference: TReferenceInput;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_ReplicateMyCartArgs = {
  reference: TReferenceInput;
};


export type TMutation_SignUpInMyBusinessUnitArgs = {
  draft: TSignUpInMyBusinessUnitDraft;
};


export type TMutation_UpdateApprovalFlowArgs = {
  actions: Array<TApprovalFlowUpdateAction>;
  asAssociate: TAsAssociateArgument;
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_UpdateApprovalRuleArgs = {
  actions: Array<TApprovalRuleUpdateAction>;
  asAssociate: TAsAssociateArgument;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateAssociateRoleArgs = {
  actions: Array<TAssociateRoleUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateAttributeGroupArgs = {
  actions: Array<TAttributeGroupUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateBusinessUnitArgs = {
  actions: Array<TBusinessUnitUpdateAction>;
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateCartArgs = {
  actions: Array<TCartUpdateAction>;
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateCartDiscountArgs = {
  actions: Array<TCartDiscountUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateCategoryArgs = {
  actions: Array<TCategoryUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateChannelArgs = {
  actions: Array<TChannelUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_UpdateCustomerArgs = {
  actions: Array<TCustomerUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateCustomerGroupArgs = {
  actions: Array<TCustomerGroupUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateDiscountCodeArgs = {
  actions: Array<TDiscountCodeUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_UpdateExtensionArgs = {
  actions: Array<TExtensionUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateInventoryEntryArgs = {
  actions: Array<TInventoryEntryUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateMyBusinessUnitArgs = {
  actions: Array<TMyBusinessUnitUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateMyCartArgs = {
  actions: Array<TMyCartUpdateAction>;
  id: Scalars['String'];
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateMyCustomerArgs = {
  actions: Array<TMyCustomerUpdateAction>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateMyPaymentArgs = {
  actions: Array<TMyPaymentUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_UpdateMyQuoteArgs = {
  actions: Array<TMyQuoteUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateMyQuoteRequestArgs = {
  actions: Array<TMyQuoteRequestUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateMyShoppingListArgs = {
  actions: Array<TMyShoppingListUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateOrderArgs = {
  actions: Array<TOrderUpdateAction>;
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateOrderEditArgs = {
  actions: Array<TOrderEditUpdateAction>;
  dryRun?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdatePaymentArgs = {
  actions: Array<TPaymentUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateProductArgs = {
  actions: Array<TProductUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateProductDiscountArgs = {
  actions: Array<TProductDiscountUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateProductSelectionArgs = {
  actions: Array<TProductSelectionUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateProductTypeArgs = {
  actions: Array<TProductTypeUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateProjectArgs = {
  actions: Array<TProjectSettingsUpdateAction>;
  version: Scalars['Long'];
};


export type TMutation_UpdateQuoteArgs = {
  actions: Array<TQuoteUpdateAction>;
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateQuoteRequestArgs = {
  actions: Array<TQuoteRequestUpdateAction>;
  asAssociate?: InputMaybe<TAsAssociateArgument>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateReviewArgs = {
  actions: Array<TReviewUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateShippingMethodArgs = {
  actions: Array<TShippingMethodUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateShoppingListArgs = {
  actions: Array<TShoppingListUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  storeKey?: InputMaybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateStagedQuoteArgs = {
  actions: Array<TStagedQuoteUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateStandalonePriceArgs = {
  actions: Array<TStandalonePriceUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateStateArgs = {
  actions: Array<TStateUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateStoreArgs = {
  actions: Array<TStoreUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateSubscriptionArgs = {
  actions: Array<TSubscriptionUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateTaxCategoryArgs = {
  actions: Array<TTaxCategoryUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateTypeDefinitionArgs = {
  actions: Array<TTypeUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateZoneArgs = {
  actions: Array<TZoneUpdateAction>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  version: Scalars['Long'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TMyBusinessUnitDraft = {
  addresses?: InputMaybe<Array<TAddressInput>>;
  /** The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses. */
  billingAddresses?: InputMaybe<Array<Scalars['Int']>>;
  contactEmail?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  /** The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address. */
  defaultBillingAddress?: InputMaybe<Scalars['Int']>;
  /** The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address. */
  defaultShippingAddress?: InputMaybe<Scalars['Int']>;
  key: Scalars['String'];
  name: Scalars['String'];
  parentUnit?: InputMaybe<TResourceIdentifierInput>;
  /** The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses. */
  shippingAddresses?: InputMaybe<Array<Scalars['Int']>>;
  storeMode?: InputMaybe<Scalars['String']>;
  unitType: TBusinessUnitType;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TMyBusinessUnitUpdateAction = {
  addAddress?: InputMaybe<TAddMyBusinessUnitAddress>;
  addBillingAddressId?: InputMaybe<TAddMyBusinessUnitBillingAddressId>;
  addShippingAddressId?: InputMaybe<TAddMyBusinessUnitShippingAddressId>;
  changeAddress?: InputMaybe<TChangeMyBusinessUnitAddress>;
  changeAssociate?: InputMaybe<TChangeMyBusinessUnitAssociate>;
  changeName?: InputMaybe<TChangeMyBusinessUnitName>;
  changeParentUnit?: InputMaybe<TChangeMyBusinessUnitParentUnit>;
  removeAddress?: InputMaybe<TRemoveMyBusinessUnitAddress>;
  removeAssociate?: InputMaybe<TRemoveMyBusinessUnitAssociate>;
  removeBillingAddressId?: InputMaybe<TRemoveMyBusinessUnitBillingAddressId>;
  removeShippingAddressId?: InputMaybe<TRemoveMyBusinessUnitShippingAddressId>;
  setAddressCustomField?: InputMaybe<TSetMyBusinessUnitAddressCustomField>;
  setAddressCustomType?: InputMaybe<TSetMyBusinessUnitAddressCustomType>;
  setContactEmail?: InputMaybe<TSetMyBusinessUnitContactEmail>;
  setCustomField?: InputMaybe<TSetMyBusinessUnitCustomField>;
  setCustomType?: InputMaybe<TSetMyBusinessUnitCustomType>;
  setDefaultBillingAddress?: InputMaybe<TSetMyBusinessUnitDefaultBillingAddress>;
  setDefaultShippingAddress?: InputMaybe<TSetMyBusinessUnitDefaultShippingAddress>;
};

export type TMyCartDraft = {
  billingAddress?: InputMaybe<TAddressInput>;
  businessUnit?: InputMaybe<TResourceIdentifierInput>;
  country?: InputMaybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  custom?: InputMaybe<TCustomFieldsDraft>;
  customShipping?: InputMaybe<Array<TCustomShippingDraft>>;
  customerEmail?: InputMaybe<Scalars['String']>;
  deleteDaysAfterLastModification?: InputMaybe<Scalars['Int']>;
  discountCodes?: InputMaybe<Array<Scalars['String']>>;
  inventoryMode?: InputMaybe<TInventoryMode>;
  itemShippingAddresses?: InputMaybe<Array<TAddressInput>>;
  lineItems?: InputMaybe<Array<TMyLineItemDraft>>;
  locale?: InputMaybe<Scalars['Locale']>;
  shipping?: InputMaybe<Array<TShippingDraft>>;
  shippingAddress?: InputMaybe<TAddressInput>;
  shippingMethod?: InputMaybe<TResourceIdentifierInput>;
  shippingMode?: InputMaybe<TShippingMode>;
  store?: InputMaybe<TResourceIdentifierInput>;
  taxMode?: InputMaybe<TTaxMode>;
};

export type TMyCartUpdateAction = {
  addDiscountCode?: InputMaybe<TAddCartDiscountCode>;
  addItemShippingAddress?: InputMaybe<TAddCartItemShippingAddress>;
  addLineItem?: InputMaybe<TAddMyCartLineItem>;
  addPayment?: InputMaybe<TAddCartPayment>;
  addShoppingList?: InputMaybe<TAddCartShoppingList>;
  applyDeltaToLineItemShippingDetailsTargets?: InputMaybe<TApplyCartDeltaToLineItemShippingDetailsTargets>;
  changeLineItemQuantity?: InputMaybe<TChangeCartLineItemQuantity>;
  changeTaxMode?: InputMaybe<TChangeMyCartTaxMode>;
  recalculate?: InputMaybe<TRecalculateCart>;
  removeDiscountCode?: InputMaybe<TRemoveCartDiscountCode>;
  removeItemShippingAddress?: InputMaybe<TRemoveCartItemShippingAddress>;
  removeLineItem?: InputMaybe<TRemoveCartLineItem>;
  removePayment?: InputMaybe<TRemoveCartPayment>;
  setBillingAddress?: InputMaybe<TSetCartBillingAddress>;
  setBillingAddressCustomField?: InputMaybe<TSetCartBillingAddressCustomField>;
  setBillingAddressCustomType?: InputMaybe<TSetCartBillingAddressCustomType>;
  setBusinessUnit?: InputMaybe<TSetCartBusinessUnit>;
  setCountry?: InputMaybe<TSetCartCountry>;
  setCustomField?: InputMaybe<TSetCartCustomField>;
  setCustomType?: InputMaybe<TSetCartCustomType>;
  setCustomerEmail?: InputMaybe<TSetCartCustomerEmail>;
  setDeleteDaysAfterLastModification?: InputMaybe<TSetCartDeleteDaysAfterLastModification>;
  setItemShippingAddressCustomField?: InputMaybe<TSetCartItemShippingAddressCustomField>;
  setItemShippingAddressCustomType?: InputMaybe<TSetCartItemShippingAddressCustomType>;
  setLineItemCustomField?: InputMaybe<TSetCartLineItemCustomField>;
  setLineItemCustomType?: InputMaybe<TSetCartLineItemCustomType>;
  setLineItemDistributionChannel?: InputMaybe<TSetCartLineItemDistributionChannel>;
  setLineItemShippingDetails?: InputMaybe<TSetCartLineItemShippingDetails>;
  setLineItemSupplyChannel?: InputMaybe<TSetCartLineItemSupplyChannel>;
  setLocale?: InputMaybe<TSetCartLocale>;
  setShippingAddress?: InputMaybe<TSetCartShippingAddress>;
  setShippingAddressCustomField?: InputMaybe<TSetCartShippingAddressCustomField>;
  setShippingAddressCustomType?: InputMaybe<TSetCartShippingAddressCustomType>;
  setShippingCustomField?: InputMaybe<TSetCartShippingCustomField>;
  setShippingCustomType?: InputMaybe<TSetCartShippingCustomType>;
  setShippingMethod?: InputMaybe<TSetMyCartShippingMethod>;
  updateItemShippingAddress?: InputMaybe<TUpdateCartItemShippingAddress>;
};

export type TMyCustomerUpdateAction = {
  addAddress?: InputMaybe<TAddCustomerAddress>;
  addBillingAddressId?: InputMaybe<TAddCustomerBillingAddressId>;
  addShippingAddressId?: InputMaybe<TAddCustomerShippingAddressId>;
  changeAddress?: InputMaybe<TChangeCustomerAddress>;
  changeEmail?: InputMaybe<TChangeCustomerEmail>;
  removeAddress?: InputMaybe<TRemoveCustomerAddress>;
  removeBillingAddressId?: InputMaybe<TRemoveCustomerBillingAddressId>;
  removeShippingAddressId?: InputMaybe<TRemoveCustomerShippingAddressId>;
  setAddressCustomField?: InputMaybe<TSetCustomerAddressCustomField>;
  setAddressCustomType?: InputMaybe<TSetCustomerAddressCustomType>;
  setCompanyName?: InputMaybe<TSetCustomerCompanyName>;
  setCustomField?: InputMaybe<TSetCustomerCustomField>;
  setCustomType?: InputMaybe<TSetCustomerCustomType>;
  setDateOfBirth?: InputMaybe<TSetCustomerDateOfBirth>;
  setDefaultBillingAddress?: InputMaybe<TSetCustomerDefaultBillingAddress>;
  setDefaultShippingAddress?: InputMaybe<TSetCustomerDefaultShippingAddress>;
  setFirstName?: InputMaybe<TSetCustomerFirstName>;
  setLastName?: InputMaybe<TSetCustomerLastName>;
  setLocale?: InputMaybe<TSetCustomerLocale>;
  setMiddleName?: InputMaybe<TSetCustomerMiddleName>;
  setSalutation?: InputMaybe<TSetCustomerSalutation>;
  setTitle?: InputMaybe<TSetCustomerTitle>;
  setVatId?: InputMaybe<TSetCustomerVatId>;
};

export type TMyLineItemDraft = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  key?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
  sku?: InputMaybe<Scalars['String']>;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
  variantId?: InputMaybe<Scalars['Int']>;
};

/**
 * My Payments endpoint provides access to payments scoped to a specific user.
 * [documentation](https://docs.commercetools.com/api/projects/me-payments#mypayment)
 */
export type TMyPayment = {
  __typename?: 'MyPayment';
  amountPlanned: TMoney;
  anonymousId?: Maybe<Scalars['String']>;
  custom?: Maybe<TCustomFieldsType>;
  customer?: Maybe<TCustomer>;
  customerRef?: Maybe<TReference>;
  id: Scalars['String'];
  paymentMethodInfo: TPaymentMethodInfo;
  transactions: Array<TTransaction>;
  version: Scalars['Long'];
};

export type TMyPaymentDraft = {
  amountPlanned: TMoneyInput;
  custom?: InputMaybe<TCustomFieldsDraft>;
  paymentMethodInfo?: InputMaybe<TPaymentMethodInfoInput>;
  transaction?: InputMaybe<TMyTransactionDraft>;
};

export type TMyPaymentQueryResult = {
  __typename?: 'MyPaymentQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TMyPayment>;
  total: Scalars['Long'];
};

export type TMyPaymentUpdateAction = {
  addTransaction?: InputMaybe<TAddMyPaymentTransaction>;
  changeAmountPlanned?: InputMaybe<TChangePaymentAmountPlanned>;
  setCustomField?: InputMaybe<TSetPaymentCustomField>;
  setMethodInfoInterface?: InputMaybe<TSetPaymentMethodInfoInterface>;
  setMethodInfoMethod?: InputMaybe<TSetPaymentMethodInfoMethod>;
  setMethodInfoName?: InputMaybe<TSetPaymentMethodInfoName>;
};

export type TMyQuoteRequestDraft = {
  cartId: Scalars['String'];
  cartVersion: Scalars['Long'];
  comment?: InputMaybe<Scalars['String']>;
};

export type TMyQuoteRequestUpdateAction = {
  cancelQuoteRequest?: InputMaybe<TCancelQuoteRequest>;
  setCustomField?: InputMaybe<TSetMyQuoteRequestCustomField>;
  setCustomType?: InputMaybe<TSetMyQuoteRequestCustomType>;
};

export enum TMyQuoteState {
  Accepted = 'Accepted',
  Declined = 'Declined'
}

export type TMyQuoteUpdateAction = {
  changeMyQuoteState?: InputMaybe<TChangeMyQuoteMyQuoteState>;
  requestQuoteRenegotiation?: InputMaybe<TRequestQuoteRenegotiation>;
  setCustomField?: InputMaybe<TSetQuoteCustomField>;
  setCustomType?: InputMaybe<TSetQuoteCustomType>;
};

export type TMyShoppingListDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  deleteDaysAfterLastModification?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  lineItems?: InputMaybe<Array<TShoppingListLineItemDraft>>;
  name: Array<TLocalizedStringItemInputType>;
  textLineItems?: InputMaybe<Array<TTextLineItemDraft>>;
};

export type TMyShoppingListUpdateAction = {
  addLineItem?: InputMaybe<TAddShoppingListLineItem>;
  addTextLineItem?: InputMaybe<TAddShoppingListTextLineItem>;
  changeLineItemQuantity?: InputMaybe<TChangeShoppingListLineItemQuantity>;
  changeLineItemsOrder?: InputMaybe<TChangeShoppingListLineItemsOrder>;
  changeName?: InputMaybe<TChangeShoppingListName>;
  changeTextLineItemName?: InputMaybe<TChangeShoppingListTextLineItemName>;
  changeTextLineItemQuantity?: InputMaybe<TChangeShoppingListTextLineItemQuantity>;
  changeTextLineItemsOrder?: InputMaybe<TChangeShoppingListTextLineItemsOrder>;
  removeLineItem?: InputMaybe<TRemoveShoppingListLineItem>;
  removeTextLineItem?: InputMaybe<TRemoveShoppingListTextLineItem>;
  setCustomField?: InputMaybe<TSetShoppingListCustomField>;
  setCustomType?: InputMaybe<TSetShoppingListCustomType>;
  setDeleteDaysAfterLastModification?: InputMaybe<TSetShoppingListDeleteDaysAfterLastModification>;
  setDescription?: InputMaybe<TSetShoppingListDescription>;
  setLineItemCustomField?: InputMaybe<TSetShoppingListLineItemCustomField>;
  setLineItemCustomType?: InputMaybe<TSetShoppingListLineItemCustomType>;
  setStore?: InputMaybe<TSetShoppingListStore>;
  setTextLineItemCustomField?: InputMaybe<TSetShoppingListTextLineItemCustomField>;
  setTextLineItemCustomType?: InputMaybe<TSetShoppingListTextLineItemCustomType>;
  setTextLineItemDescription?: InputMaybe<TSetShoppingListTextLineItemDescription>;
};

export type TMyTransactionDraft = {
  amount: TMoneyInput;
  custom?: InputMaybe<TCustomFieldsDraft>;
  interactionId?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['DateTime']>;
  type: TTransactionType;
};

export type TNestedAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'NestedAttributeDefinitionType';
  name: Scalars['String'];
  typeRef: TReference;
};

export type TNotProcessed = TOrderEditResult & {
  __typename?: 'NotProcessed';
  type: Scalars['String'];
};

export type TNotificationFormat = {
  type: Scalars['String'];
};

export type TNumberAttribute = TAttribute & {
  __typename?: 'NumberAttribute';
  name: Scalars['String'];
  value: Scalars['BigDecimal'];
};

export type TNumberAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'NumberAttributeDefinitionType';
  name: Scalars['String'];
};

export type TNumberField = TCustomField & {
  __typename?: 'NumberField';
  name: Scalars['String'];
  value: Scalars['BigDecimal'];
};

export type TNumberType = TFieldType & {
  __typename?: 'NumberType';
  name: Scalars['String'];
};

/**
 * An order can be created from a cart, usually after a checkout process has been completed.
 * [documentation](https://docs.commercetools.com/api/projects/orders)
 */
export type TOrder = TReferenceExpandable & TVersioned & {
  __typename?: 'Order';
  anonymousId?: Maybe<Scalars['String']>;
  billingAddress?: Maybe<TAddress>;
  businessUnit?: Maybe<TBusinessUnit>;
  businessUnitRef?: Maybe<TKeyReference>;
  cart?: Maybe<TCart>;
  cartRef?: Maybe<TReference>;
  completedAt?: Maybe<Scalars['DateTime']>;
  country?: Maybe<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customLineItems: Array<TCustomLineItem>;
  customer?: Maybe<TCustomer>;
  customerEmail?: Maybe<Scalars['String']>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  customerId?: Maybe<Scalars['String']>;
  directDiscounts: Array<TDirectDiscount>;
  discountCodes: Array<TDiscountCodeInfo>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  discountOnTotalPrice?: Maybe<TDiscountOnTotalPrice>;
  id: Scalars['String'];
  inventoryMode: TInventoryMode;
  itemShippingAddresses: Array<TAddress>;
  /** @deprecated An internal field that should not be used in customer logic */
  lastMessageSequenceNumber: Scalars['Long'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  lineItems: Array<TLineItem>;
  locale?: Maybe<Scalars['Locale']>;
  orderNumber?: Maybe<Scalars['String']>;
  orderState: TOrderState;
  origin: TCartOrigin;
  paymentInfo?: Maybe<TPaymentInfo>;
  paymentState?: Maybe<TPaymentState>;
  purchaseOrderNumber?: Maybe<Scalars['String']>;
  quote?: Maybe<TQuote>;
  quoteRef?: Maybe<TReference>;
  refusedGifts: Array<TCartDiscount>;
  refusedGiftsRefs: Array<TReference>;
  returnInfo: Array<TReturnInfo>;
  shipmentState?: Maybe<TShipmentState>;
  shipping: Array<TShipping>;
  shippingAddress?: Maybe<TAddress>;
  shippingCustomFields?: Maybe<TCustomFieldsType>;
  shippingInfo?: Maybe<TShippingInfo>;
  shippingKey?: Maybe<Scalars['String']>;
  shippingMode: TShippingMode;
  shippingRateInput?: Maybe<TShippingRateInput>;
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
  store?: Maybe<TStore>;
  storeRef?: Maybe<TKeyReference>;
  syncInfo: Array<TSyncInfo>;
  taxCalculationMode: TTaxCalculationMode;
  taxMode: TTaxMode;
  taxRoundingMode: TRoundingMode;
  taxedPrice?: Maybe<TTaxedPrice>;
  taxedShippingPrice?: Maybe<TTaxedPrice>;
  totalPrice: TMoney;
  version: Scalars['Long'];
};


/**
 * An order can be created from a cart, usually after a checkout process has been completed.
 * [documentation](https://docs.commercetools.com/api/projects/orders)
 */
export type TOrder_LineItemsArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type TOrderBillingAddressSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderBillingAddressSet';
  address?: Maybe<TAddress>;
  oldAddress?: Maybe<TAddress>;
  type: Scalars['String'];
};

export type TOrderCartCommand = {
  cart?: InputMaybe<TResourceIdentifierInput>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
  orderState?: InputMaybe<TOrderState>;
  paymentState?: InputMaybe<TPaymentState>;
  purchaseOrderNumber?: InputMaybe<Scalars['String']>;
  shipmentState?: InputMaybe<TShipmentState>;
  state?: InputMaybe<TReferenceInput>;
  version: Scalars['Long'];
};

export type TOrderCreated = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCreated';
  order: TOrder;
  type: Scalars['String'];
};

export type TOrderCustomFieldAdded = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomFieldAdded';
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TOrderCustomFieldChanged = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomFieldChanged';
  name: Scalars['String'];
  previousValue?: Maybe<Scalars['Json']>;
  type: Scalars['String'];
  value: Scalars['Json'];
};

export type TOrderCustomFieldRemoved = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomFieldRemoved';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TOrderCustomLineItemAdded = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomLineItemAdded';
  customLineItem: TCustomLineItem;
  type: Scalars['String'];
};

export type TOrderCustomLineItemDiscountSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomLineItemDiscountSet';
  customLineItemId: Scalars['String'];
  customLineItemKey?: Maybe<Scalars['String']>;
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  taxedPrice?: Maybe<TTaxedItemPrice>;
  type: Scalars['String'];
};

export type TOrderCustomLineItemQuantityChanged = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomLineItemQuantityChanged';
  customLineItemId: Scalars['String'];
  customLineItemKey?: Maybe<Scalars['String']>;
  oldQuantity?: Maybe<Scalars['Long']>;
  quantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TOrderCustomLineItemRemoved = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomLineItemRemoved';
  customLineItem?: Maybe<TCustomLineItem>;
  customLineItemId: Scalars['String'];
  customLineItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TOrderCustomTypeRemoved = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomTypeRemoved';
  previousTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TOrderCustomTypeSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomTypeSet';
  customFields: TCustomFieldsType;
  previousTypeId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TOrderCustomerEmailSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomerEmailSet';
  email?: Maybe<Scalars['String']>;
  oldEmail?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TOrderCustomerGroupSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomerGroupSet';
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  oldCustomerGroup?: Maybe<TCustomerGroup>;
  oldCustomerGroupRef?: Maybe<TReference>;
  type: Scalars['String'];
};

export type TOrderCustomerSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderCustomerSet';
  customer?: Maybe<TCustomer>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  customerRef?: Maybe<TReference>;
  oldCustomer?: Maybe<TCustomer>;
  oldCustomerGroup?: Maybe<TCustomerGroup>;
  oldCustomerGroupRef?: Maybe<TReference>;
  oldCustomerRef?: Maybe<TReference>;
  type: Scalars['String'];
};

export type TOrderDeleted = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderDeleted';
  order?: Maybe<TOrder>;
  type: Scalars['String'];
};

export type TOrderDiscountCodeAdded = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderDiscountCodeAdded';
  discountCode?: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  type: Scalars['String'];
};

export type TOrderDiscountCodeRemoved = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderDiscountCodeRemoved';
  discountCode?: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  type: Scalars['String'];
};

export type TOrderDiscountCodeStateSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderDiscountCodeStateSet';
  discountCode?: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  oldState?: Maybe<TDiscountCodeState>;
  state: TDiscountCodeState;
  type: Scalars['String'];
};

export type TOrderEdit = TVersioned & {
  __typename?: 'OrderEdit';
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  resource?: Maybe<TOrder>;
  resourceRef: TReference;
  result: TOrderEditResult;
  stagedActions: Array<TStagedOrderUpdateActionOutput>;
  version: Scalars['Long'];
};

export type TOrderEditApplied = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderEditApplied';
  edit?: Maybe<TOrderEdit>;
  editRef: TReference;
  result: TApplied;
  type: Scalars['String'];
};

export type TOrderEditDraft = {
  comment?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  dryRun?: InputMaybe<Scalars['Boolean']>;
  key?: InputMaybe<Scalars['String']>;
  resource: TReferenceInput;
  stagedActions: Array<TStagedOrderUpdateAction>;
};

export type TOrderEditLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'OrderEditLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TOrderEditLimitsProjection = {
  __typename?: 'OrderEditLimitsProjection';
  total: TOrderEditLimitWithCurrent;
};

export type TOrderEditQueryResult = {
  __typename?: 'OrderEditQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TOrderEdit>;
  total: Scalars['Long'];
};

export type TOrderEditResult = {
  type: Scalars['String'];
};

export type TOrderEditUpdateAction = {
  addStagedAction?: InputMaybe<TAddOrderEditStagedAction>;
  setComment?: InputMaybe<TSetOrderEditComment>;
  setCustomField?: InputMaybe<TSetOrderEditCustomField>;
  setCustomType?: InputMaybe<TSetOrderEditCustomType>;
  setKey?: InputMaybe<TSetOrderEditKey>;
  setStagedActions?: InputMaybe<TSetOrderEditStagedActions>;
};

export type TOrderExcerpt = {
  __typename?: 'OrderExcerpt';
  taxedPrice?: Maybe<TTaxedPrice>;
  totalPrice: TMoney;
  version?: Maybe<Scalars['Long']>;
};

export type TOrderImported = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderImported';
  order: TOrder;
  type: Scalars['String'];
};

export type TOrderLineItemAdded = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderLineItemAdded';
  addedQuantity: Scalars['Long'];
  lineItem: TLineItem;
  type: Scalars['String'];
};

export type TOrderLineItemDiscountSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderLineItemDiscountSet';
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  lineItemId: Scalars['String'];
  lineItemKey?: Maybe<Scalars['String']>;
  taxedPrice?: Maybe<TTaxedItemPrice>;
  taxedPricePortions: Array<TMethodTaxedPrice>;
  totalPrice: TMoney;
  type: Scalars['String'];
};

export type TOrderLineItemDistributionChannelSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderLineItemDistributionChannelSet';
  distributionChannel?: Maybe<TChannel>;
  distributionChannelRef?: Maybe<TReference>;
  lineItemId: Scalars['String'];
  lineItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TOrderLineItemRemoved = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderLineItemRemoved';
  lineItemId: Scalars['String'];
  lineItemKey?: Maybe<Scalars['String']>;
  newPrice?: Maybe<TProductPrice>;
  newQuantity: Scalars['Long'];
  newShippingDetails?: Maybe<TItemShippingDetails>;
  newState: Scalars['Set'];
  newTaxedPrice?: Maybe<TTaxedItemPrice>;
  newTotalPrice: TMoney;
  removedQuantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TOrderMessagePayload = {
  type: Scalars['String'];
};

export type TOrderMyCartCommand = {
  id: Scalars['String'];
  version: Scalars['Long'];
};

export type TOrderMyQuoteCommand = {
  id: Scalars['String'];
  quoteStateToAccepted?: InputMaybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};

export type TOrderPaymentAdded = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderPaymentAdded';
  paymentRef: TReference;
  type: Scalars['String'];
};

export type TOrderPaymentRemoved = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderPaymentRemoved';
  paymentRef: TReference;
  removedPaymentInfo: Scalars['Boolean'];
  type: Scalars['String'];
};

export type TOrderPaymentStateChanged = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderPaymentStateChanged';
  oldPaymentState?: Maybe<TPaymentState>;
  paymentState: TPaymentState;
  type: Scalars['String'];
};

/** Fields to access orders. Includes direct access to a single order and searching for orders. */
export type TOrderQueryInterface = {
  order?: Maybe<TOrder>;
  orders: TOrderQueryResult;
};


/** Fields to access orders. Includes direct access to a single order and searching for orders. */
export type TOrderQueryInterface_OrderArgs = {
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
};


/** Fields to access orders. Includes direct access to a single order and searching for orders. */
export type TOrderQueryInterface_OrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TOrderQueryResult = {
  __typename?: 'OrderQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TOrder>;
  total: Scalars['Long'];
};

export type TOrderQuoteCommand = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  orderNumber?: InputMaybe<Scalars['String']>;
  orderState?: InputMaybe<TOrderState>;
  paymentState?: InputMaybe<TPaymentState>;
  quote?: InputMaybe<TResourceIdentifierInput>;
  quoteStateToAccepted?: InputMaybe<Scalars['Boolean']>;
  shipmentState?: InputMaybe<TShipmentState>;
  state?: InputMaybe<TReferenceInput>;
  version: Scalars['Long'];
};

export type TOrderReturnShipmentStateChanged = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderReturnShipmentStateChanged';
  returnItemId: Scalars['String'];
  returnShipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TOrderSearchConfiguration = {
  __typename?: 'OrderSearchConfiguration';
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  status: TOrderSearchStatus;
};

export enum TOrderSearchStatus {
  Activated = 'Activated',
  Deactivated = 'Deactivated'
}

export type TOrderShipmentStateChanged = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderShipmentStateChanged';
  oldShipmentState?: Maybe<TShipmentState>;
  shipmentState: TShipmentState;
  type: Scalars['String'];
};

export type TOrderShippingAddressSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderShippingAddressSet';
  address?: Maybe<TAddress>;
  oldAddress?: Maybe<TAddress>;
  type: Scalars['String'];
};

export type TOrderShippingInfoSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderShippingInfoSet';
  oldShippingInfo?: Maybe<TShippingInfo>;
  shippingInfo?: Maybe<TShippingInfo>;
  type: Scalars['String'];
};

export type TOrderShippingRateInputSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderShippingRateInputSet';
  oldShippingRateInput?: Maybe<TShippingRateInput>;
  shippingRateInput?: Maybe<TShippingRateInput>;
  type: Scalars['String'];
};

export enum TOrderState {
  Cancelled = 'Cancelled',
  Complete = 'Complete',
  Confirmed = 'Confirmed',
  Open = 'Open'
}

export type TOrderStateChanged = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderStateChanged';
  oldOrderState?: Maybe<TOrderState>;
  orderId: Scalars['String'];
  orderState: TOrderState;
  type: Scalars['String'];
};

export type TOrderStateTransition = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderStateTransition';
  force: Scalars['Boolean'];
  oldState?: Maybe<TState>;
  oldStateRef?: Maybe<TReference>;
  state?: Maybe<TState>;
  stateRef: TReference;
  type: Scalars['String'];
};

export type TOrderStoreSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'OrderStoreSet';
  oldStore?: Maybe<TStore>;
  oldStoreRef?: Maybe<TKeyReference>;
  store?: Maybe<TStore>;
  storeRef?: Maybe<TKeyReference>;
  type: Scalars['String'];
};

export type TOrderUpdateAction = {
  addDelivery?: InputMaybe<TAddOrderDelivery>;
  addItemShippingAddress?: InputMaybe<TAddOrderItemShippingAddress>;
  addParcelToDelivery?: InputMaybe<TAddOrderParcelToDelivery>;
  addPayment?: InputMaybe<TAddOrderPayment>;
  addReturnInfo?: InputMaybe<TAddOrderReturnInfo>;
  changeOrderState?: InputMaybe<TChangeOrderState>;
  changePaymentState?: InputMaybe<TChangeOrderPaymentState>;
  changeShipmentState?: InputMaybe<TChangeOrderShipmentState>;
  importCustomLineItemState?: InputMaybe<TImportOrderCustomLineItemState>;
  importLineItemState?: InputMaybe<TImportOrderLineItemState>;
  removeDelivery?: InputMaybe<TRemoveOrderDelivery>;
  removeItemShippingAddress?: InputMaybe<TRemoveOrderItemShippingAddress>;
  removeParcelFromDelivery?: InputMaybe<TRemoveOrderParcelFromDelivery>;
  removePayment?: InputMaybe<TRemoveOrderPayment>;
  setBillingAddress?: InputMaybe<TSetOrderBillingAddress>;
  setBillingAddressCustomField?: InputMaybe<TSetOrderBillingAddressCustomField>;
  setBillingAddressCustomType?: InputMaybe<TSetOrderBillingAddressCustomType>;
  setCustomField?: InputMaybe<TSetOrderCustomField>;
  setCustomLineItemCustomField?: InputMaybe<TSetOrderCustomLineItemCustomField>;
  setCustomLineItemCustomType?: InputMaybe<TSetOrderCustomLineItemCustomType>;
  setCustomLineItemShippingDetails?: InputMaybe<TSetOrderCustomLineItemShippingDetails>;
  setCustomType?: InputMaybe<TSetOrderCustomType>;
  setCustomerEmail?: InputMaybe<TSetOrderCustomerEmail>;
  setCustomerId?: InputMaybe<TSetOrderCustomerId>;
  setDeliveryAddress?: InputMaybe<TSetOrderDeliveryAddress>;
  setDeliveryAddressCustomField?: InputMaybe<TSetOrderDeliveryAddressCustomField>;
  setDeliveryAddressCustomType?: InputMaybe<TSetOrderDeliveryAddressCustomType>;
  setDeliveryCustomField?: InputMaybe<TSetOrderDeliveryCustomField>;
  setDeliveryCustomType?: InputMaybe<TSetOrderDeliveryCustomType>;
  setDeliveryItems?: InputMaybe<TSetOrderDeliveryItems>;
  setItemShippingAddressCustomField?: InputMaybe<TSetOrderItemShippingAddressCustomField>;
  setItemShippingAddressCustomType?: InputMaybe<TSetOrderItemShippingAddressCustomType>;
  setLineItemCustomField?: InputMaybe<TSetOrderLineItemCustomField>;
  setLineItemCustomType?: InputMaybe<TSetOrderLineItemCustomType>;
  setLineItemShippingDetails?: InputMaybe<TSetOrderLineItemShippingDetails>;
  setLocale?: InputMaybe<TSetOrderLocale>;
  setOrderNumber?: InputMaybe<TSetOrderNumber>;
  setParcelCustomField?: InputMaybe<TSetOrderParcelCustomField>;
  setParcelCustomType?: InputMaybe<TSetOrderParcelCustomType>;
  setParcelItems?: InputMaybe<TSetOrderParcelItems>;
  setParcelMeasurements?: InputMaybe<TSetOrderParcelMeasurements>;
  setParcelTrackingData?: InputMaybe<TSetOrderParcelTrackingData>;
  setPurchaseOrderNumber?: InputMaybe<TSetOrderPurchaseOrderNumber>;
  setReturnInfo?: InputMaybe<TSetOrderReturnInfo>;
  setReturnItemCustomField?: InputMaybe<TSetOrderReturnItemCustomField>;
  setReturnItemCustomType?: InputMaybe<TSetOrderReturnItemCustomType>;
  setReturnPaymentState?: InputMaybe<TSetOrderReturnPaymentState>;
  setReturnShipmentState?: InputMaybe<TSetOrderReturnShipmentState>;
  setShippingAddress?: InputMaybe<TSetOrderShippingAddress>;
  setShippingAddressCustomField?: InputMaybe<TSetOrderShippingAddressCustomField>;
  setShippingAddressCustomType?: InputMaybe<TSetOrderShippingAddressCustomType>;
  setShippingCustomField?: InputMaybe<TSetOrderShippingCustomField>;
  setShippingCustomType?: InputMaybe<TSetOrderShippingCustomType>;
  setStore?: InputMaybe<TSetOrderStore>;
  transitionCustomLineItemState?: InputMaybe<TTransitionOrderCustomLineItemState>;
  transitionLineItemState?: InputMaybe<TTransitionOrderLineItemState>;
  transitionState?: InputMaybe<TTransitionOrderState>;
  updateItemShippingAddress?: InputMaybe<TUpdateOrderItemShippingAddress>;
  updateSyncInfo?: InputMaybe<TUpdateOrderSyncInfo>;
};

export type TParcel = {
  __typename?: 'Parcel';
  createdAt: Scalars['DateTime'];
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  items: Array<TDeliveryItem>;
  key?: Maybe<Scalars['String']>;
  measurements?: Maybe<TParcelMeasurements>;
  trackingData?: Maybe<TTrackingData>;
};

export type TParcelAddedToDelivery = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'ParcelAddedToDelivery';
  delivery: TDelivery;
  parcel: TParcel;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TParcelData = {
  __typename?: 'ParcelData';
  custom?: Maybe<TCustomFieldsCommand>;
  items: Array<TDeliveryItem>;
  key?: Maybe<Scalars['String']>;
  measurements?: Maybe<TParcelMeasurements>;
  trackingData?: Maybe<TTrackingData>;
};

export type TParcelDataDraftType = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  items?: InputMaybe<Array<TDeliveryItemDraftType>>;
  key?: InputMaybe<Scalars['String']>;
  measurements?: InputMaybe<TParcelMeasurementsDraftType>;
  trackingData?: InputMaybe<TTrackingDataDraftType>;
};

export type TParcelDraft = {
  createdAt: Scalars['DateTime'];
  custom?: InputMaybe<TCustomFieldsDraft>;
  id: Scalars['String'];
  items?: InputMaybe<Array<TDeliveryItemDraftType>>;
  key?: InputMaybe<Scalars['String']>;
  measurements?: InputMaybe<TParcelMeasurementsDraftType>;
  trackingData?: InputMaybe<TTrackingDataDraftType>;
};

export type TParcelItemsUpdated = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'ParcelItemsUpdated';
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItem>;
  oldItems: Array<TDeliveryItem>;
  parcelId: Scalars['String'];
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TParcelMeasurements = {
  __typename?: 'ParcelMeasurements';
  heightInMillimeter?: Maybe<Scalars['Int']>;
  lengthInMillimeter?: Maybe<Scalars['Int']>;
  weightInGram?: Maybe<Scalars['Int']>;
  widthInMillimeter?: Maybe<Scalars['Int']>;
};

export type TParcelMeasurementsDraftType = {
  heightInMillimeter?: InputMaybe<Scalars['Int']>;
  lengthInMillimeter?: InputMaybe<Scalars['Int']>;
  weightInGram?: InputMaybe<Scalars['Int']>;
  widthInMillimeter?: InputMaybe<Scalars['Int']>;
};

export type TParcelMeasurementsUpdated = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'ParcelMeasurementsUpdated';
  deliveryId: Scalars['String'];
  measurements?: Maybe<TParcelMeasurements>;
  parcelId: Scalars['String'];
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TParcelRemovedFromDelivery = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'ParcelRemovedFromDelivery';
  deliveryId: Scalars['String'];
  parcel: TParcel;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TParcelTrackingDataUpdated = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'ParcelTrackingDataUpdated';
  deliveryId: Scalars['String'];
  parcelId: Scalars['String'];
  shippingKey?: Maybe<Scalars['String']>;
  trackingData?: Maybe<TTrackingData>;
  type: Scalars['String'];
};

/**
 * Payments hold information about the current state of receiving and/or refunding money.
 * [documentation](https://docs.commercetools.com/api/projects/payments)
 */
export type TPayment = TVersioned & {
  __typename?: 'Payment';
  amountPlanned: TMoney;
  anonymousId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customer?: Maybe<TCustomer>;
  customerRef?: Maybe<TReference>;
  id: Scalars['String'];
  interfaceId?: Maybe<Scalars['String']>;
  interfaceInteractionsRaw: TInterfaceInteractionsRawResult;
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  paymentMethodInfo: TPaymentMethodInfo;
  paymentStatus: TPaymentStatus;
  transactions: Array<TTransaction>;
  version: Scalars['Long'];
};


/**
 * Payments hold information about the current state of receiving and/or refunding money.
 * [documentation](https://docs.commercetools.com/api/projects/payments)
 */
export type TPayment_InterfaceInteractionsRawArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type TPaymentCreated = TMessagePayload & {
  __typename?: 'PaymentCreated';
  payment: TPayment;
  type: Scalars['String'];
};

export type TPaymentDraft = {
  amountPlanned: TMoneyInput;
  anonymousId?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  customer?: InputMaybe<TResourceIdentifierInput>;
  interfaceId?: InputMaybe<Scalars['String']>;
  interfaceInteractions?: InputMaybe<Array<TCustomFieldsDraft>>;
  key?: InputMaybe<Scalars['String']>;
  paymentMethodInfo?: InputMaybe<TPaymentMethodInfoInput>;
  paymentStatus?: InputMaybe<TPaymentStatusInput>;
  transactions?: InputMaybe<Array<TTransactionDraft>>;
};

export type TPaymentInfo = {
  __typename?: 'PaymentInfo';
  paymentRefs: Array<TReference>;
  payments: Array<TPayment>;
};

export type TPaymentInteractionAdded = TMessagePayload & {
  __typename?: 'PaymentInteractionAdded';
  interaction: TCustomFieldsType;
  type: Scalars['String'];
};

export type TPaymentMethodInfo = {
  __typename?: 'PaymentMethodInfo';
  method?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedString>>;
  paymentInterface?: Maybe<Scalars['String']>;
};


export type TPaymentMethodInfo_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TPaymentMethodInfoInput = {
  method?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  paymentInterface?: InputMaybe<Scalars['String']>;
};

export type TPaymentQueryResult = {
  __typename?: 'PaymentQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TPayment>;
  total: Scalars['Long'];
};

export enum TPaymentState {
  BalanceDue = 'BalanceDue',
  CreditOwed = 'CreditOwed',
  Failed = 'Failed',
  Paid = 'Paid',
  Pending = 'Pending'
}

export type TPaymentStatus = {
  __typename?: 'PaymentStatus';
  interfaceCode?: Maybe<Scalars['String']>;
  interfaceText?: Maybe<Scalars['String']>;
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
};

export type TPaymentStatusInput = {
  interfaceCode?: InputMaybe<Scalars['String']>;
  interfaceText?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<TResourceIdentifierInput>;
};

export type TPaymentStatusInterfaceCodeSet = TMessagePayload & {
  __typename?: 'PaymentStatusInterfaceCodeSet';
  interfaceCode?: Maybe<Scalars['String']>;
  paymentId: Scalars['String'];
  type: Scalars['String'];
};

export type TPaymentStatusStateTransition = TMessagePayload & {
  __typename?: 'PaymentStatusStateTransition';
  force: Scalars['Boolean'];
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
  type: Scalars['String'];
};

export type TPaymentTransactionAdded = TMessagePayload & {
  __typename?: 'PaymentTransactionAdded';
  transaction: TTransaction;
  type: Scalars['String'];
};

export type TPaymentTransactionStateChanged = TMessagePayload & {
  __typename?: 'PaymentTransactionStateChanged';
  state: TTransactionState;
  transactionId: Scalars['String'];
  type: Scalars['String'];
};

export type TPaymentUpdateAction = {
  addInterfaceInteraction?: InputMaybe<TAddPaymentInterfaceInteraction>;
  addTransaction?: InputMaybe<TAddPaymentTransaction>;
  changeAmountPlanned?: InputMaybe<TChangePaymentAmountPlanned>;
  changeTransactionInteractionId?: InputMaybe<TChangePaymentTransactionInteractionId>;
  changeTransactionState?: InputMaybe<TChangePaymentTransactionState>;
  changeTransactionTimestamp?: InputMaybe<TChangePaymentTransactionTimestamp>;
  setAmountPaid?: InputMaybe<TSetPaymentAmountPaid>;
  setAmountRefunded?: InputMaybe<TSetPaymentAmountRefunded>;
  setAnonymousId?: InputMaybe<TSetPaymentAnonymousId>;
  setAuthorization?: InputMaybe<TSetPaymentAuthorization>;
  setCustomField?: InputMaybe<TSetPaymentCustomField>;
  setCustomType?: InputMaybe<TSetPaymentCustomType>;
  setCustomer?: InputMaybe<TSetPaymentCustomer>;
  setExternalId?: InputMaybe<TSetPaymentExternalId>;
  setInterfaceId?: InputMaybe<TSetPaymentInterfaceId>;
  setKey?: InputMaybe<TSetPaymentKey>;
  setMethodInfoInterface?: InputMaybe<TSetPaymentMethodInfoInterface>;
  setMethodInfoMethod?: InputMaybe<TSetPaymentMethodInfoMethod>;
  setMethodInfoName?: InputMaybe<TSetPaymentMethodInfoName>;
  setStatusInterfaceCode?: InputMaybe<TSetPaymentStatusInterfaceCode>;
  setStatusInterfaceText?: InputMaybe<TSetPaymentStatusInterfaceText>;
  setTransactionCustomField?: InputMaybe<TSetPaymentTransactionCustomField>;
  setTransactionCustomType?: InputMaybe<TSetPaymentTransactionCustomType>;
  transitionState?: InputMaybe<TTransitionPaymentState>;
};

export enum TPermission {
  AcceptMyQuotes = 'AcceptMyQuotes',
  AcceptOthersQuotes = 'AcceptOthersQuotes',
  AddChildUnits = 'AddChildUnits',
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  CreateApprovalRules = 'CreateApprovalRules',
  CreateMyCarts = 'CreateMyCarts',
  CreateMyOrdersFromMyCarts = 'CreateMyOrdersFromMyCarts',
  CreateMyOrdersFromMyQuotes = 'CreateMyOrdersFromMyQuotes',
  CreateMyQuoteRequestsFromMyCarts = 'CreateMyQuoteRequestsFromMyCarts',
  CreateOrdersFromOthersCarts = 'CreateOrdersFromOthersCarts',
  CreateOrdersFromOthersQuotes = 'CreateOrdersFromOthersQuotes',
  CreateOthersCarts = 'CreateOthersCarts',
  CreateQuoteRequestsFromOthersCarts = 'CreateQuoteRequestsFromOthersCarts',
  DeclineMyQuotes = 'DeclineMyQuotes',
  DeclineOthersQuotes = 'DeclineOthersQuotes',
  DeleteMyCarts = 'DeleteMyCarts',
  DeleteOthersCarts = 'DeleteOthersCarts',
  ReassignMyQuotes = 'ReassignMyQuotes',
  ReassignOthersQuotes = 'ReassignOthersQuotes',
  RenegotiateMyQuotes = 'RenegotiateMyQuotes',
  RenegotiateOthersQuotes = 'RenegotiateOthersQuotes',
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  UpdateApprovalFlows = 'UpdateApprovalFlows',
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  UpdateApprovalRules = 'UpdateApprovalRules',
  UpdateAssociates = 'UpdateAssociates',
  UpdateBusinessUnitDetails = 'UpdateBusinessUnitDetails',
  UpdateMyCarts = 'UpdateMyCarts',
  UpdateMyOrders = 'UpdateMyOrders',
  UpdateMyQuoteRequests = 'UpdateMyQuoteRequests',
  UpdateOthersCarts = 'UpdateOthersCarts',
  UpdateOthersOrders = 'UpdateOthersOrders',
  UpdateOthersQuoteRequests = 'UpdateOthersQuoteRequests',
  UpdateParentUnit = 'UpdateParentUnit',
  ViewMyCarts = 'ViewMyCarts',
  ViewMyOrders = 'ViewMyOrders',
  ViewMyQuoteRequests = 'ViewMyQuoteRequests',
  ViewMyQuotes = 'ViewMyQuotes',
  ViewOthersCarts = 'ViewOthersCarts',
  ViewOthersOrders = 'ViewOthersOrders',
  ViewOthersQuoteRequests = 'ViewOthersQuoteRequests',
  ViewOthersQuotes = 'ViewOthersQuotes'
}

export type TPlainEnumValue = {
  __typename?: 'PlainEnumValue';
  key: Scalars['String'];
  label: Scalars['String'];
};

export type TPlainEnumValueDraft = {
  key: Scalars['String'];
  label: Scalars['String'];
};

export type TPlainEnumValueResult = {
  __typename?: 'PlainEnumValueResult';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  results: Array<TPlainEnumValue>;
  total: Scalars['Int'];
};

export type TPlatformFormat = TNotificationFormat & {
  __typename?: 'PlatformFormat';
  type: Scalars['String'];
};

export type TPlatformFormatInput = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TPoint = TGeometry & {
  __typename?: 'Point';
  coordinates: Array<Scalars['Float']>;
  type: Scalars['String'];
};

export type TPreviewFailure = TOrderEditResult & {
  __typename?: 'PreviewFailure';
  errors: Array<Scalars['Json']>;
  type: Scalars['String'];
};

export type TPreviewSuccess = TOrderEditResult & {
  __typename?: 'PreviewSuccess';
  messagePayloads: Array<TOrderMessagePayload>;
  preview: TOrder;
  type: Scalars['String'];
};

export type TPriceFunction = {
  __typename?: 'PriceFunction';
  currencyCode: Scalars['Currency'];
  function: Scalars['String'];
};

export type TPriceFunctionDraft = {
  currencyCode: Scalars['Currency'];
  function: Scalars['String'];
};

/**
 * This mode determines which type of Prices the system uses for
 * Product Price Selection as well as for LineItem Price selection
 */
export enum TPriceMode {
  /** The system looks up prices from the `prices` field of the ProductVariant inside a Product. */
  Embedded = 'Embedded',
  /** The system looks up prices from Standalone Prices, stored separately from Products. */
  Standalone = 'Standalone'
}

export type TPriceSelectorInput = {
  channel?: InputMaybe<TReferenceInput>;
  country?: InputMaybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  customerGroup?: InputMaybe<TReferenceInput>;
  date?: InputMaybe<Scalars['DateTime']>;
};

export type TProduct = TReferenceExpandable & TReviewTarget & TVersioned & {
  __typename?: 'Product';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  masterData: TProductCatalogData;
  priceMode?: Maybe<TPriceMode>;
  productSelectionRefs: TSelectionOfProductQueryResult;
  productType?: Maybe<TProductTypeDefinition>;
  productTypeRef: TReference;
  reviewRatingStatistics?: Maybe<TReviewRatingStatistics>;
  skus: Array<Scalars['String']>;
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
  taxCategory?: Maybe<TTaxCategory>;
  taxCategoryRef?: Maybe<TReference>;
  version: Scalars['Long'];
};


export type TProduct_ProductSelectionRefsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TProductAddedToCategory = TMessagePayload & {
  __typename?: 'ProductAddedToCategory';
  category: TReferenceId;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
};

export type TProductAssignment = {
  __typename?: 'ProductAssignment';
  product?: Maybe<TProduct>;
  productRef: TReference;
  productSelection?: Maybe<TProductSelection>;
  productSelectionRef: TReference;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  variantExclusion?: Maybe<TProductVariantExclusion>;
  variantSelection?: Maybe<TProductVariantSelection>;
};

export type TProductAssignmentQueryResult = {
  __typename?: 'ProductAssignmentQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProductAssignment>;
  total: Scalars['Long'];
};

/**
 * An input object used to define a ProductAttribute.
 *
 * The value should be passed in a form of escaped JSON.
 *
 *
 * Examples for `value`:
 *
 * * FieldType `String`: `"\"This is a string\""`
 * * FieldType `DateTimeType`: `"\"2018-10-12T14:00:00.000Z\""`
 * * FieldType `Number`: `"4"`
 * * FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"`
 * * FieldType `Reference`: `"{\"id\": \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\": \"product\"}"`
 */
export type TProductAttributeInput = {
  name: Scalars['String'];
  /**
   * The value should be passed in a form of escaped JSON.
   *
   *
   * Examples for `value`:
   *
   * * FieldType `String`: `"\"This is a string\""`
   * * FieldType `DateTimeType`: `"\"2018-10-12T14:00:00.000Z\""`
   * * FieldType `Number`: `"4"`
   * * FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"`
   * * FieldType `Reference`: `"{\"id\": \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\": \"product\"}"`
   */
  value: Scalars['String'];
};

export type TProductCatalogData = {
  __typename?: 'ProductCatalogData';
  current?: Maybe<TProductData>;
  hasStagedChanges: Scalars['Boolean'];
  published: Scalars['Boolean'];
  staged?: Maybe<TProductData>;
};

export type TProductCreated = TMessagePayload & {
  __typename?: 'ProductCreated';
  productProjection: TProductProjectionMessagePayload;
  type: Scalars['String'];
};

export type TProductData = {
  __typename?: 'ProductData';
  allVariants: Array<TProductVariant>;
  categories: Array<TCategory>;
  categoriesRef: Array<TReference>;
  categoryOrderHint?: Maybe<Scalars['String']>;
  categoryOrderHints: Array<TCategoryOrderHint>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  masterVariant: TProductVariant;
  metaDescription?: Maybe<Scalars['String']>;
  metaDescriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  metaKeywords?: Maybe<Scalars['String']>;
  metaKeywordsAllLocales?: Maybe<Array<TLocalizedString>>;
  metaTitle?: Maybe<Scalars['String']>;
  metaTitleAllLocales?: Maybe<Array<TLocalizedString>>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  searchKeyword?: Maybe<Array<TSearchKeyword>>;
  searchKeywords: Array<TSearchKeywords>;
  skus: Array<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  variant?: Maybe<TProductVariant>;
  variants: Array<TProductVariant>;
};


export type TProductData_AllVariantsArgs = {
  hasImages?: InputMaybe<Scalars['Boolean']>;
  isOnStock?: InputMaybe<Scalars['Boolean']>;
  skus?: InputMaybe<Array<Scalars['String']>>;
  stockChannelIds?: InputMaybe<Array<Scalars['String']>>;
};


export type TProductData_CategoryOrderHintArgs = {
  categoryId: Scalars['String'];
};


export type TProductData_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductData_MetaDescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductData_MetaKeywordsArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductData_MetaTitleArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductData_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductData_SearchKeywordArgs = {
  locale: Scalars['Locale'];
};


export type TProductData_SlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductData_VariantArgs = {
  key?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
};


export type TProductData_VariantsArgs = {
  hasImages?: InputMaybe<Scalars['Boolean']>;
  isOnStock?: InputMaybe<Scalars['Boolean']>;
  skus?: InputMaybe<Array<Scalars['String']>>;
  stockChannelIds?: InputMaybe<Array<Scalars['String']>>;
};

export type TProductDeleted = TMessagePayload & {
  __typename?: 'ProductDeleted';
  currentProjection?: Maybe<TProductProjectionMessagePayload>;
  removedImageUrls: Scalars['Set'];
  type: Scalars['String'];
};

/**
 *
 * A product price can be discounted in two ways:
 *
 * * with a relative or an absolute product discount, which will be automatically applied to all prices in a product that match a discount predicate.
 *   A relative discount reduces the matching price by a fraction (for example 10 % off). An absolute discount reduces the matching price by a fixed amount (for example 10€ off). If more than one product discount matches a price, the discount sort order determines which one will be applied.
 * * with an external product discount, which can then be used to explicitly set a discounted value on a particular product price.
 *
 * The discounted price is stored in the discounted field of the Product Price.
 *
 * Note that when a discount is created, updated or removed it can take up to 15 minutes to update all the prices with the discounts.
 *
 * The maximum number of ProductDiscounts that can be active at the same time is **200**.
 *
 */
export type TProductDiscount = TReferenceExpandable & TVersioned & {
  __typename?: 'ProductDiscount';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isValid: Scalars['Boolean'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  predicate: Scalars['String'];
  referenceRefs: Array<TReference>;
  sortOrder: Scalars['String'];
  validFrom?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
  value: TProductDiscountValue;
  version: Scalars['Long'];
};


/**
 *
 * A product price can be discounted in two ways:
 *
 * * with a relative or an absolute product discount, which will be automatically applied to all prices in a product that match a discount predicate.
 *   A relative discount reduces the matching price by a fraction (for example 10 % off). An absolute discount reduces the matching price by a fixed amount (for example 10€ off). If more than one product discount matches a price, the discount sort order determines which one will be applied.
 * * with an external product discount, which can then be used to explicitly set a discounted value on a particular product price.
 *
 * The discounted price is stored in the discounted field of the Product Price.
 *
 * Note that when a discount is created, updated or removed it can take up to 15 minutes to update all the prices with the discounts.
 *
 * The maximum number of ProductDiscounts that can be active at the same time is **200**.
 *
 */
export type TProductDiscount_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


/**
 *
 * A product price can be discounted in two ways:
 *
 * * with a relative or an absolute product discount, which will be automatically applied to all prices in a product that match a discount predicate.
 *   A relative discount reduces the matching price by a fraction (for example 10 % off). An absolute discount reduces the matching price by a fixed amount (for example 10€ off). If more than one product discount matches a price, the discount sort order determines which one will be applied.
 * * with an external product discount, which can then be used to explicitly set a discounted value on a particular product price.
 *
 * The discounted price is stored in the discounted field of the Product Price.
 *
 * Note that when a discount is created, updated or removed it can take up to 15 minutes to update all the prices with the discounts.
 *
 * The maximum number of ProductDiscounts that can be active at the same time is **200**.
 *
 */
export type TProductDiscount_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TProductDiscountDraft = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  key?: InputMaybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  predicate: Scalars['String'];
  sortOrder: Scalars['String'];
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
  value: TProductDiscountValueInput;
};

export type TProductDiscountLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ProductDiscountLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TProductDiscountLimitsProjection = {
  __typename?: 'ProductDiscountLimitsProjection';
  totalActive: TProductDiscountLimitWithCurrent;
};

export type TProductDiscountQueryResult = {
  __typename?: 'ProductDiscountQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProductDiscount>;
  total: Scalars['Long'];
};

export type TProductDiscountUpdateAction = {
  changeIsActive?: InputMaybe<TChangeProductDiscountIsActive>;
  changeName?: InputMaybe<TChangeProductDiscountName>;
  changePredicate?: InputMaybe<TChangeProductDiscountPredicate>;
  changeSortOrder?: InputMaybe<TChangeProductDiscountSortOrder>;
  changeValue?: InputMaybe<TChangeProductDiscountValue>;
  setDescription?: InputMaybe<TSetProductDiscountDescription>;
  setKey?: InputMaybe<TSetProductDiscountKey>;
  setValidFrom?: InputMaybe<TSetProductDiscountValidFrom>;
  setValidFromAndUntil?: InputMaybe<TSetProductDiscountValidFromAndUntil>;
  setValidUntil?: InputMaybe<TSetProductDiscountValidUntil>;
};

export type TProductDiscountValue = {
  type: Scalars['String'];
};

export type TProductDiscountValueInput = {
  absolute?: InputMaybe<TAbsoluteDiscountValueInput>;
  external?: InputMaybe<TExternalDiscountValueInput>;
  relative?: InputMaybe<TRelativeDiscountValueInput>;
};

export type TProductDraft = {
  categories?: InputMaybe<Array<TResourceIdentifierInput>>;
  categoryOrderHints?: InputMaybe<Array<TCategoryOrderHintInput>>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  key?: InputMaybe<Scalars['String']>;
  masterVariant?: InputMaybe<TProductVariantInput>;
  metaDescription?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  metaKeywords?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  metaTitle?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  name: Array<TLocalizedStringItemInputType>;
  priceMode?: InputMaybe<TPriceMode>;
  productType: TResourceIdentifierInput;
  publish?: InputMaybe<Scalars['Boolean']>;
  searchKeywords?: InputMaybe<Array<TSearchKeywordInput>>;
  slug: Array<TLocalizedStringItemInputType>;
  state?: InputMaybe<TResourceIdentifierInput>;
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
  variants?: InputMaybe<Array<TProductVariantInput>>;
};

export type TProductImageAdded = TMessagePayload & {
  __typename?: 'ProductImageAdded';
  image: TImage;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  variantId: Scalars['Int'];
};

export type TProductLimitsProjection = {
  __typename?: 'ProductLimitsProjection';
  pricesPerVariant: TLimit;
  variants: TLimit;
};

export type TProductOfSelection = {
  __typename?: 'ProductOfSelection';
  product?: Maybe<TProduct>;
  productRef: TReference;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  variantExclusion?: Maybe<TProductVariantExclusion>;
  variantSelection?: Maybe<TProductVariantSelection>;
};

export type TProductOfSelectionQueryResult = {
  __typename?: 'ProductOfSelectionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProductOfSelection>;
  total: Scalars['Long'];
};

export type TProductPrice = {
  __typename?: 'ProductPrice';
  channel?: Maybe<TChannel>;
  channelRef?: Maybe<TReference>;
  country?: Maybe<Scalars['Country']>;
  custom?: Maybe<TCustomFieldsType>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  discounted?: Maybe<TDiscountedProductPriceValue>;
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  tiers?: Maybe<Array<TProductPriceTier>>;
  validFrom?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
  value: TBaseMoney;
};

export type TProductPriceAdded = TMessagePayload & {
  __typename?: 'ProductPriceAdded';
  price: TProductPrice;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  variantId: Scalars['Int'];
};

export type TProductPriceChanged = TMessagePayload & {
  __typename?: 'ProductPriceChanged';
  newPrice: TProductPrice;
  oldPrice: TProductPrice;
  oldStagedPrice?: Maybe<TProductPrice>;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  variantId: Scalars['Int'];
};

export type TProductPriceDataInput = {
  channel?: InputMaybe<TResourceIdentifierInput>;
  country?: InputMaybe<Scalars['Country']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  customerGroup?: InputMaybe<TReferenceInput>;
  discounted?: InputMaybe<TDiscountedProductPriceValueInput>;
  key?: InputMaybe<Scalars['String']>;
  tiers?: InputMaybe<Array<TProductPriceTierInput>>;
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
  value: TBaseMoneyInput;
};

export type TProductPriceDiscountUpdateMessagePayload = {
  __typename?: 'ProductPriceDiscountUpdateMessagePayload';
  discounted?: Maybe<TDiscountedProductPriceValue>;
  priceId: Scalars['String'];
  sku?: Maybe<Scalars['String']>;
  staged: Scalars['Boolean'];
  variantId: Scalars['Int'];
  variantKey?: Maybe<Scalars['String']>;
};

export type TProductPriceDiscountsSet = TMessagePayload & {
  __typename?: 'ProductPriceDiscountsSet';
  type: Scalars['String'];
  updatedPrices: Array<TProductPriceDiscountUpdateMessagePayload>;
};

export type TProductPriceExternalDiscountSet = TMessagePayload & {
  __typename?: 'ProductPriceExternalDiscountSet';
  discounted?: Maybe<TDiscountedProductPriceValue>;
  priceId: Scalars['String'];
  sku?: Maybe<Scalars['String']>;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  variantId: Scalars['Int'];
  variantKey?: Maybe<Scalars['String']>;
};

export type TProductPriceKeySet = TMessagePayload & {
  __typename?: 'ProductPriceKeySet';
  key?: Maybe<Scalars['String']>;
  oldKey?: Maybe<Scalars['String']>;
  priceId?: Maybe<Scalars['String']>;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  variantId: Scalars['Int'];
};

export type TProductPriceModeSet = TMessagePayload & {
  __typename?: 'ProductPriceModeSet';
  to?: Maybe<TPriceMode>;
  type: Scalars['String'];
};

export type TProductPriceRemoved = TMessagePayload & {
  __typename?: 'ProductPriceRemoved';
  price: TProductPrice;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  variantId: Scalars['Int'];
};

export type TProductPriceSearch = {
  __typename?: 'ProductPriceSearch';
  channel?: Maybe<TChannel>;
  channelRef?: Maybe<TReference>;
  country?: Maybe<Scalars['Country']>;
  custom?: Maybe<TCustomFieldsType>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  discounted?: Maybe<TDiscountedProductSearchPriceValue>;
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  tiers?: Maybe<Array<TProductSearchPriceTier>>;
  validFrom?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
  value: TBaseMoney;
};

export type TProductPriceTier = {
  __typename?: 'ProductPriceTier';
  minimumQuantity: Scalars['Int'];
  value: TBaseMoney;
};

export type TProductPriceTierInput = {
  minimumQuantity: Scalars['Int'];
  value: TBaseMoneyInput;
};

export type TProductPricesSet = TMessagePayload & {
  __typename?: 'ProductPricesSet';
  prices: Array<TProductPrice>;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  variantId: Scalars['Int'];
};

export type TProductProjection = {
  __typename?: 'ProductProjection';
  categories: Array<TCategory>;
  categoriesRef: Array<TReference>;
  categoryOrderHints: Array<TCategoryOrderHintProductSearch>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  hasStagedChanges: Scalars['Boolean'];
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  masterVariant: TProductSearchVariant;
  metaDescription?: Maybe<Scalars['String']>;
  metaDescriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  metaKeywords?: Maybe<Scalars['String']>;
  metaKeywordsAllLocales?: Maybe<Array<TLocalizedString>>;
  metaTitle?: Maybe<Scalars['String']>;
  metaTitleAllLocales?: Maybe<Array<TLocalizedString>>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  productType?: Maybe<TProductTypeDefinition>;
  productTypeRef: TReference;
  published: Scalars['Boolean'];
  reviewRatingStatistics?: Maybe<TReviewRatingStatistics>;
  searchKeywords: Array<TSearchKeywordsProductSearch>;
  slug?: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
  taxCategory?: Maybe<TTaxCategory>;
  taxCategoryRef?: Maybe<TReference>;
  variants: Array<TProductSearchVariant>;
  version: Scalars['Long'];
};


export type TProductProjection_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjection_MetaDescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjection_MetaKeywordsArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjection_MetaTitleArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjection_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjection_SlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TProductProjectionMessagePayload = {
  __typename?: 'ProductProjectionMessagePayload';
  categories: Array<TCategory>;
  categoriesRef: Array<TReference>;
  categoryOrderHints: Array<TCategoryOrderHint>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  hasStagedChanges: Scalars['Boolean'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  masterVariant: TProductVariant;
  metaDescription?: Maybe<Scalars['String']>;
  metaDescriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  metaKeywords?: Maybe<Scalars['String']>;
  metaKeywordsAllLocales?: Maybe<Array<TLocalizedString>>;
  metaTitle?: Maybe<Scalars['String']>;
  metaTitleAllLocales?: Maybe<Array<TLocalizedString>>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  productType?: Maybe<TProductTypeDefinition>;
  productTypeRef: TReference;
  published: Scalars['Boolean'];
  reviewRatingStatistics?: Maybe<TReviewRatingStatistics>;
  searchKeywords: Array<TSearchKeywords>;
  slug?: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
  taxCategory?: Maybe<TTaxCategory>;
  taxCategoryRef?: Maybe<TReference>;
  variants: Array<TProductVariant>;
  version: Scalars['Long'];
};


export type TProductProjectionMessagePayload_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_MetaDescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_MetaKeywordsArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_MetaTitleArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_SlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TProductProjectionSearchResult = {
  __typename?: 'ProductProjectionSearchResult';
  count: Scalars['Int'];
  facets: Array<TFacetResultValue>;
  offset: Scalars['Int'];
  results: Array<TProductProjection>;
  total: Scalars['Int'];
};

export type TProductPublished = TMessagePayload & {
  __typename?: 'ProductPublished';
  productProjection: TProductProjectionMessagePayload;
  removedImageUrls: Array<Scalars['String']>;
  scope: TPublishScope;
  type: Scalars['String'];
};

export type TProductQueryResult = {
  __typename?: 'ProductQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProduct>;
  total: Scalars['Long'];
};

export type TProductReferenceIdentifier = {
  __typename?: 'ProductReferenceIdentifier';
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  typeId: Scalars['String'];
};

export type TProductRemovedFromCategory = TMessagePayload & {
  __typename?: 'ProductRemovedFromCategory';
  category: TReferenceId;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
};

export type TProductRevertedStagedChanges = TMessagePayload & {
  __typename?: 'ProductRevertedStagedChanges';
  removedImageUrls: Scalars['Set'];
  type: Scalars['String'];
};

export type TProductSearchPriceTier = {
  __typename?: 'ProductSearchPriceTier';
  minimumQuantity: Scalars['Int'];
  value: TBaseMoney;
};

export type TProductSearchVariant = {
  __typename?: 'ProductSearchVariant';
  assets: Array<TAsset>;
  /** This field contains raw attributes data */
  attributesRaw: Array<TRawProductSearchAttribute>;
  availability?: Maybe<TProductSearchVariantAvailabilityWithChannels>;
  id: Scalars['Int'];
  images: Array<TImageProductSearch>;
  isMatchingVariant?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  /** Returns a single price based on the price selection rules. */
  price?: Maybe<TProductPriceSearch>;
  prices?: Maybe<Array<TProductPriceSearch>>;
  scopedPrice?: Maybe<TScopedPrice>;
  scopedPriceDiscounted?: Maybe<Scalars['Boolean']>;
  sku?: Maybe<Scalars['String']>;
};


export type TProductSearchVariant_AttributesRawArgs = {
  excludeNames?: InputMaybe<Array<Scalars['String']>>;
  includeNames?: InputMaybe<Array<Scalars['String']>>;
};


export type TProductSearchVariant_PriceArgs = {
  channelId?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  customerGroupId?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['DateTime']>;
};

/** Product variant availabilities */
export type TProductSearchVariantAvailabilitiesResult = {
  __typename?: 'ProductSearchVariantAvailabilitiesResult';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  results: Array<TProductSearchVariantAvailabilityWithChannel>;
  total: Scalars['Int'];
};

/** Product variant availability */
export type TProductSearchVariantAvailability = {
  __typename?: 'ProductSearchVariantAvailability';
  availableQuantity?: Maybe<Scalars['Long']>;
  id?: Maybe<Scalars['String']>;
  isOnStock: Scalars['Boolean'];
  restockableInDays?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['Long']>;
};

export type TProductSearchVariantAvailabilityWithChannel = {
  __typename?: 'ProductSearchVariantAvailabilityWithChannel';
  availability: TProductSearchVariantAvailability;
  channel?: Maybe<TChannel>;
  channelRef: TReference;
};

export type TProductSearchVariantAvailabilityWithChannels = {
  __typename?: 'ProductSearchVariantAvailabilityWithChannels';
  channels: TProductSearchVariantAvailabilitiesResult;
  noChannel?: Maybe<TProductSearchVariantAvailability>;
};


export type TProductSearchVariantAvailabilityWithChannels_ChannelsArgs = {
  excludeChannelIds?: InputMaybe<Array<Scalars['String']>>;
  includeChannelIds?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type TProductSelection = TVersioned & {
  __typename?: 'ProductSelection';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  mode: TProductSelectionMode;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  productCount: Scalars['Int'];
  productRefs: TProductOfSelectionQueryResult;
  version: Scalars['Long'];
};


export type TProductSelection_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductSelection_ProductRefsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TProductSelectionCreated = TMessagePayload & {
  __typename?: 'ProductSelectionCreated';
  productSelection: TProductSelection;
  type: Scalars['String'];
};

export type TProductSelectionDeleted = TMessagePayload & {
  __typename?: 'ProductSelectionDeleted';
  type: Scalars['String'];
};

export enum TProductSelectionMode {
  /** Mode of Product Selection used to include a specific list of individual Products */
  Individual = 'Individual',
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta. Mode of Product Selection used to exclude a specific list of individual Products */
  IndividualExclusion = 'IndividualExclusion'
}

export type TProductSelectionProductAdded = TMessagePayload & {
  __typename?: 'ProductSelectionProductAdded';
  product?: Maybe<TProduct>;
  productRef: TReference;
  type: Scalars['String'];
  variantSelection?: Maybe<TProductVariantSelection>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TProductSelectionProductExcluded = TMessagePayload & {
  __typename?: 'ProductSelectionProductExcluded';
  product?: Maybe<TProduct>;
  productRef: TReference;
  type: Scalars['String'];
  variantExclusion?: Maybe<TProductVariantExclusion>;
};

export type TProductSelectionProductRemoved = TMessagePayload & {
  __typename?: 'ProductSelectionProductRemoved';
  product?: Maybe<TProduct>;
  productRef: TReference;
  type: Scalars['String'];
};

/** Fields to access product selection assignments. */
export type TProductSelectionQueryInterface = {
  productSelectionAssignments: TProductAssignmentQueryResult;
};


/** Fields to access product selection assignments. */
export type TProductSelectionQueryInterface_ProductSelectionAssignmentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TProductSelectionQueryResult = {
  __typename?: 'ProductSelectionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProductSelection>;
  total: Scalars['Long'];
};

export type TProductSelectionSetting = {
  __typename?: 'ProductSelectionSetting';
  active: Scalars['Boolean'];
  productSelection?: Maybe<TProductSelection>;
  productSelectionRef: TReference;
};

export type TProductSelectionSettingDraft = {
  active: Scalars['Boolean'];
  productSelection: TResourceIdentifierInput;
};

export type TProductSelectionSettingInActionInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  productSelection: TResourceIdentifierInput;
};

export type TProductSelectionUpdateAction = {
  addProduct?: InputMaybe<TAddProductSelectionProduct>;
  changeName?: InputMaybe<TChangeProductSelectionName>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  excludeProduct?: InputMaybe<TExcludeProductSelectionProduct>;
  removeProduct?: InputMaybe<TRemoveProductSelectionProduct>;
  setCustomField?: InputMaybe<TSetProductSelectionCustomField>;
  setCustomType?: InputMaybe<TSetProductSelectionCustomType>;
  setKey?: InputMaybe<TSetProductSelectionKey>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setVariantExclusion?: InputMaybe<TSetProductSelectionVariantExclusion>;
  setVariantSelection?: InputMaybe<TSetProductSelectionVariantSelection>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TProductSelectionVariantExclusionChanged = TMessagePayload & {
  __typename?: 'ProductSelectionVariantExclusionChanged';
  newVariantExclusion?: Maybe<TProductVariantExclusion>;
  oldVariantExclusion?: Maybe<TProductVariantExclusion>;
  product?: Maybe<TProduct>;
  productRef: TReference;
  type: Scalars['String'];
};

export type TProductSelectionVariantSelectionChanged = TMessagePayload & {
  __typename?: 'ProductSelectionVariantSelectionChanged';
  newVariantSelection?: Maybe<TProductVariantSelection>;
  oldVariantSelection?: Maybe<TProductVariantSelection>;
  product?: Maybe<TProduct>;
  productRef: TReference;
  type: Scalars['String'];
};

export type TProductSlugChanged = TMessagePayload & {
  __typename?: 'ProductSlugChanged';
  oldSlug?: Maybe<Scalars['String']>;
  oldSlugAllLocales?: Maybe<Array<TLocalizedString>>;
  slug?: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  type: Scalars['String'];
};


export type TProductSlugChanged_OldSlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TProductSlugChanged_SlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TProductStateTransition = TMessagePayload & {
  __typename?: 'ProductStateTransition';
  force: Scalars['Boolean'];
  state?: Maybe<TState>;
  stateRef: TReference;
  type: Scalars['String'];
};

export type TProductTypeDefinition = TReferenceExpandable & TVersioned & {
  __typename?: 'ProductTypeDefinition';
  attributeDefinitions: TAttributeDefinitionResult;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  description: Scalars['String'];
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name: Scalars['String'];
  version: Scalars['Long'];
};


export type TProductTypeDefinition_AttributeDefinitionsArgs = {
  excludeNames?: InputMaybe<Array<Scalars['String']>>;
  includeNames?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
};

export type TProductTypeDefinitionQueryResult = {
  __typename?: 'ProductTypeDefinitionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProductTypeDefinition>;
  total: Scalars['Long'];
};

export type TProductTypeDraft = {
  attributeDefinitions?: InputMaybe<Array<TAttributeDefinitionDraft>>;
  description: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type TProductTypeLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ProductTypeLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TProductTypeLimitsProjection = {
  __typename?: 'ProductTypeLimitsProjection';
  total: TProductTypeLimitWithCurrent;
};

export type TProductTypeUpdateAction = {
  addAttributeDefinition?: InputMaybe<TAddAttributeDefinition>;
  addLocalizedEnumValue?: InputMaybe<TAddLocalizedEnumValue>;
  addPlainEnumValue?: InputMaybe<TAddPlainEnumValue>;
  changeAttributeName?: InputMaybe<TChangeAttributeName>;
  changeAttributeOrder?: InputMaybe<TChangeAttributeOrder>;
  changeAttributeOrderByName?: InputMaybe<TChangeAttributeOrderByName>;
  changeDescription?: InputMaybe<TChangeDescription>;
  changeEnumKey?: InputMaybe<TChangeEnumKey>;
  changeInputHint?: InputMaybe<TChangeInputHint>;
  changeIsSearchable?: InputMaybe<TChangeIsSearchable>;
  changeLabel?: InputMaybe<TChangeLabel>;
  changeLocalizedEnumValueLabel?: InputMaybe<TChangeLocalizedEnumValueLabel>;
  changeLocalizedEnumValueOrder?: InputMaybe<TChangeLocalizedEnumValueOrder>;
  changeName?: InputMaybe<TChangeName>;
  changePlainEnumValueLabel?: InputMaybe<TChangePlainEnumValueLabel>;
  changePlainEnumValueOrder?: InputMaybe<TChangePlainEnumValueOrder>;
  removeAttributeDefinition?: InputMaybe<TRemoveAttributeDefinition>;
  removeEnumValues?: InputMaybe<TRemoveEnumValues>;
  setInputTip?: InputMaybe<TSetInputTip>;
  setKey?: InputMaybe<TSetKey>;
};

export type TProductUnpublished = TMessagePayload & {
  __typename?: 'ProductUnpublished';
  type: Scalars['String'];
};

export type TProductUpdateAction = {
  addAsset?: InputMaybe<TAddProductAsset>;
  addExternalImage?: InputMaybe<TAddProductExternalImage>;
  addPrice?: InputMaybe<TAddProductPrice>;
  addToCategory?: InputMaybe<TAddProductToCategory>;
  addVariant?: InputMaybe<TAddProductVariant>;
  changeAssetName?: InputMaybe<TChangeProductAssetName>;
  changeAssetOrder?: InputMaybe<TChangeProductAssetOrder>;
  changeImageLabel?: InputMaybe<TChangeProductImageLabel>;
  changeMasterVariant?: InputMaybe<TChangeProductMasterVariant>;
  changeName?: InputMaybe<TChangeProductName>;
  changePrice?: InputMaybe<TChangeProductPrice>;
  changeSlug?: InputMaybe<TChangeProductSlug>;
  moveImageToPosition?: InputMaybe<TMoveProductImageToPosition>;
  publish?: InputMaybe<TPublishProduct>;
  removeAsset?: InputMaybe<TRemoveProductAsset>;
  removeFromCategory?: InputMaybe<TRemoveProductFromCategory>;
  removeImage?: InputMaybe<TRemoveProductImage>;
  removePrice?: InputMaybe<TRemoveProductPrice>;
  removeVariant?: InputMaybe<TRemoveProductVariant>;
  revertStagedChanges?: InputMaybe<TRevertStagedChanges>;
  revertStagedVariantChanges?: InputMaybe<TRevertStagedVariantChanges>;
  setAssetCustomField?: InputMaybe<TSetProductAssetCustomField>;
  setAssetCustomType?: InputMaybe<TSetProductAssetCustomType>;
  setAssetDescription?: InputMaybe<TSetProductAssetDescription>;
  setAssetKey?: InputMaybe<TSetProductAssetKey>;
  setAssetSources?: InputMaybe<TSetProductAssetSources>;
  setAssetTags?: InputMaybe<TSetProductAssetTags>;
  setAttribute?: InputMaybe<TSetProductAttribute>;
  setAttributeInAllVariants?: InputMaybe<TSetProductAttributeInAllVariants>;
  setCategoryOrderHint?: InputMaybe<TSetProductCategoryOrderHint>;
  setDescription?: InputMaybe<TSetProductDescription>;
  setDiscountedPrice?: InputMaybe<TSetProductDiscountedPrice>;
  setImageLabel?: InputMaybe<TSetProductImageLabel>;
  setKey?: InputMaybe<TSetProductKey>;
  setMetaAttributes?: InputMaybe<TSetProductMetaAttributes>;
  setMetaDescription?: InputMaybe<TSetProductMetaDescription>;
  setMetaKeywords?: InputMaybe<TSetProductMetaKeywords>;
  setMetaTitle?: InputMaybe<TSetProductMetaTitle>;
  setPriceKey?: InputMaybe<TSetProductPriceKey>;
  setPriceMode?: InputMaybe<TSetProductPriceMode>;
  setPrices?: InputMaybe<TSetProductPrices>;
  setProductPriceCustomField?: InputMaybe<TSetProductPriceCustomField>;
  setProductPriceCustomType?: InputMaybe<TSetProductPriceCustomType>;
  setProductVariantKey?: InputMaybe<TSetProductVariantKey>;
  setSearchKeywords?: InputMaybe<TSetSearchKeywords>;
  setSku?: InputMaybe<TSetProductSku>;
  setTaxCategory?: InputMaybe<TSetProductTaxCategory>;
  transitionState?: InputMaybe<TTransitionProductState>;
  unpublish?: InputMaybe<TUnpublishProduct>;
};

export type TProductVariant = {
  __typename?: 'ProductVariant';
  assets: Array<TAsset>;
  /** This field contains raw attributes data */
  attributesRaw: Array<TRawProductAttribute>;
  availability?: Maybe<TProductVariantAvailabilityWithChannels>;
  id: Scalars['Int'];
  images: Array<TImage>;
  key?: Maybe<Scalars['String']>;
  /** Returns a single price based on the price selection rules. */
  price?: Maybe<TProductPrice>;
  prices?: Maybe<Array<TProductPrice>>;
  sku?: Maybe<Scalars['String']>;
};


export type TProductVariant_AttributesRawArgs = {
  excludeNames?: InputMaybe<Array<Scalars['String']>>;
  includeNames?: InputMaybe<Array<Scalars['String']>>;
};


export type TProductVariant_PriceArgs = {
  channelId?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  customerGroupId?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['DateTime']>;
};

export type TProductVariantAdded = TMessagePayload & {
  __typename?: 'ProductVariantAdded';
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  variant: TProductVariant;
};

/** Product variant availabilities */
export type TProductVariantAvailabilitiesResult = {
  __typename?: 'ProductVariantAvailabilitiesResult';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  results: Array<TProductVariantAvailabilityWithChannel>;
  total: Scalars['Int'];
};

/** Product variant availability */
export type TProductVariantAvailability = {
  __typename?: 'ProductVariantAvailability';
  availableQuantity?: Maybe<Scalars['Long']>;
  id?: Maybe<Scalars['String']>;
  isOnStock: Scalars['Boolean'];
  restockableInDays?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['Long']>;
};

export type TProductVariantAvailabilityWithChannel = {
  __typename?: 'ProductVariantAvailabilityWithChannel';
  availability: TProductVariantAvailability;
  channel?: Maybe<TChannel>;
  channelRef: TReference;
};

export type TProductVariantAvailabilityWithChannels = {
  __typename?: 'ProductVariantAvailabilityWithChannels';
  channels: TProductVariantAvailabilitiesResult;
  noChannel?: Maybe<TProductVariantAvailability>;
};


export type TProductVariantAvailabilityWithChannels_ChannelsArgs = {
  excludeChannelIds?: InputMaybe<Array<Scalars['String']>>;
  includeChannelIds?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type TProductVariantDeleted = TMessagePayload & {
  __typename?: 'ProductVariantDeleted';
  removedImageUrls: Scalars['Set'];
  staged?: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
  variant?: Maybe<TProductVariant>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TProductVariantExclusion = {
  __typename?: 'ProductVariantExclusion';
  skus: Array<Scalars['String']>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TProductVariantExclusionDraft = {
  skus?: InputMaybe<Array<Scalars['String']>>;
};

export type TProductVariantImportDraft = {
  attributes?: InputMaybe<Array<TProductAttributeInput>>;
  id?: InputMaybe<Scalars['Int']>;
  images?: InputMaybe<Array<TImageInput>>;
  prices?: InputMaybe<Array<TProductPriceDataInput>>;
  sku?: InputMaybe<Scalars['String']>;
};

export type TProductVariantInput = {
  assets?: InputMaybe<Array<TAssetDraftInput>>;
  attributes?: InputMaybe<Array<TProductAttributeInput>>;
  images?: InputMaybe<Array<TImageInput>>;
  key?: InputMaybe<Scalars['String']>;
  prices?: InputMaybe<Array<TProductPriceDataInput>>;
  sku?: InputMaybe<Scalars['String']>;
};

export type TProductVariantSelection = {
  skus: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type TProductVariantSelectionDraft = {
  includeAllExcept?: InputMaybe<Array<Scalars['String']>>;
  includeOnly?: InputMaybe<Array<Scalars['String']>>;
};

export type TProductVariantSelectionIncludeAllExcept = TProductVariantSelection & {
  __typename?: 'ProductVariantSelectionIncludeAllExcept';
  skus: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type TProductVariantSelectionIncludeOnly = TProductVariantSelection & {
  __typename?: 'ProductVariantSelectionIncludeOnly';
  skus: Array<Scalars['String']>;
  type: Scalars['String'];
};

/** Contains information about the limits of your project. */
export type TProjectCustomLimitsProjection = {
  __typename?: 'ProjectCustomLimitsProjection';
  attributeGroups: TAttributeGroupLimitsProjection;
  cartDiscounts: TCartDiscountLimitsProjection;
  carts: TCartLimitsProjection;
  category: TCategoryLimitsProjection;
  customObjects: TCustomObjectLimitsProjection;
  customerGroups: TCustomerGroupLimitsProjection;
  customers: TCustomerLimitsProjection;
  extensions: TExtensionLimitsProjection;
  orderEdits: TOrderEditLimitsProjection;
  productDiscounts: TProductDiscountLimitsProjection;
  productType: TProductTypeLimitsProjection;
  products: TProductLimitsProjection;
  query: TQueryLimitsProjection;
  refreshTokens: TRefreshTokenLimitsProjection;
  search: TSearchLimitsProjection;
  shippingMethods: TShippingMethodLimitsProjection;
  shoppingLists: TShoppingListLimitsProjection;
  stores: TStoreLimitsProjection;
  subscriptions: TSubscriptionsLimitsProjection;
  taxCategories: TTaxCategoryLimitsProjection;
  zones: TZoneLimitsProjection;
};

/** Project contains information about project. */
export type TProjectProjection = {
  __typename?: 'ProjectProjection';
  businessUnits?: Maybe<TBusinessUnitConfiguration>;
  carts: TCartsConfiguration;
  countries: Array<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  currencies: Array<Scalars['Currency']>;
  externalOAuth?: Maybe<TExternalOAuth>;
  key: Scalars['String'];
  languages: Array<Scalars['Locale']>;
  lastModifiedAt?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<TInitiator>;
  messages: TMessagesConfiguration;
  name: Scalars['String'];
  searchIndexing?: Maybe<TSearchIndexingConfiguration>;
  shippingRateInputType?: Maybe<TShippingRateInputType>;
  shoppingLists: TShoppingListsConfiguration;
  trialUntil?: Maybe<Scalars['YearMonth']>;
  version: Scalars['Long'];
};

export type TProjectSettingsUpdateAction = {
  changeCartsConfiguration?: InputMaybe<TChangeProjectSettingsCartsConfiguration>;
  changeCountries?: InputMaybe<TChangeProjectSettingsCountries>;
  changeCountryTaxRateFallbackEnabled?: InputMaybe<TChangeProjectSettingsCountryTaxRateFallbackEnabled>;
  changeCurrencies?: InputMaybe<TChangeProjectSettingsCurrencies>;
  /** CLOSED BETA: This feature is subject to change and should not be used in production. https://docs.commercetools.com/api/contract#closed-beta */
  changeCustomerSearchStatus?: InputMaybe<TChangeProjectSettingsCustomerSearchStatus>;
  changeLanguages?: InputMaybe<TChangeProjectSettingsLanguages>;
  changeMessagesConfiguration?: InputMaybe<TChangeProjectSettingsMessagesConfiguration>;
  changeMessagesEnabled?: InputMaybe<TChangeProjectSettingsMessagesEnabled>;
  changeMyBusinessUnitStatusOnCreation?: InputMaybe<TChangeProjectSettingsMyBusinessUnitStatusOnCreation>;
  changeName?: InputMaybe<TChangeProjectSettingsName>;
  changeOrderSearchStatus?: InputMaybe<TChangeProjectSettingsOrderSearchStatus>;
  changeProductSearchIndexingEnabled?: InputMaybe<TChangeProjectSettingsProductSearchIndexingEnabled>;
  changeShoppingListsConfiguration?: InputMaybe<TChangeProjectSettingsShoppingListsConfiguration>;
  changeStandalonePriceSearchIndexingEnabled?: InputMaybe<TChangeProjectSettingsStandalonePriceSearchIndexingEnabled>;
  setExternalOAuth?: InputMaybe<TSetProjectSettingsExternalOAuth>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  setMyBusinessUnitAssociateRoleOnCreation?: InputMaybe<TSetProjectSettingsMyBusinessUnitAssociateRoleOnCreation>;
  setShippingRateInputType?: InputMaybe<TSetProjectSettingsShippingRateInputType>;
};

export type TPublishProduct = {
  scope?: InputMaybe<TPublishScope>;
};

export enum TPublishScope {
  /** Publishes the complete staged projection */
  All = 'All',
  /** Publishes only prices on the staged projection */
  Prices = 'Prices'
}

export type TPurchaseOrderNumberSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'PurchaseOrderNumberSet';
  oldPurchaseOrderNumber?: Maybe<Scalars['String']>;
  purchaseOrderNumber?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TQuery = TCartQueryInterface & TCustomerActiveCartInterface & TCustomerQueryInterface & TMeFieldInterface & TOrderQueryInterface & TProductSelectionQueryInterface & TShippingMethodsByCartInterface & TShoppingListQueryInterface & {
  __typename?: 'Query';
  apiClient?: Maybe<TApiClientWithoutSecret>;
  apiClients: TApiClientWithoutSecretQueryResult;
  /** This field gives access to the resources (such as carts) as an associate of a given business unit. */
  asAssociate: TAsAssociate;
  associateRole?: Maybe<TAssociateRole>;
  associateRoles: TAssociateRoleQueryResult;
  attributeGroup?: Maybe<TAttributeGroup>;
  attributeGroups: TAttributeGroupQueryResult;
  businessUnit?: Maybe<TBusinessUnit>;
  businessUnits: TBusinessUnitQueryResult;
  cart?: Maybe<TCart>;
  cartDiscount?: Maybe<TCartDiscount>;
  cartDiscounts: TCartDiscountQueryResult;
  carts: TCartQueryResult;
  categories: TCategoryQueryResult;
  category?: Maybe<TCategory>;
  /** Autocomplete the categories based on category fields like name, description, etc. */
  categoryAutocomplete: TCategorySearchResult;
  /** Search the categories using full-text search, filtering and sorting */
  categorySearch: TCategorySearchResult;
  channel?: Maybe<TChannel>;
  channels: TChannelQueryResult;
  customObject?: Maybe<TCustomObject>;
  customObjects: TCustomObjectQueryResult;
  customer?: Maybe<TCustomer>;
  customerActiveCart?: Maybe<TCart>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroups: TCustomerGroupQueryResult;
  customers: TCustomerQueryResult;
  discountCode?: Maybe<TDiscountCode>;
  discountCodes: TDiscountCodeQueryResult;
  extension?: Maybe<TExtension>;
  extensions: TExtensionQueryResult;
  /** This field gives access to the resources (such as carts) that are inside the given store. */
  inStore: TInStore;
  /** This field gives access to the resources (such as carts) that are inside one of the given stores. */
  inStores: TInStore;
  inventoryEntries: TInventoryEntryQueryResult;
  inventoryEntry?: Maybe<TInventoryEntry>;
  limits: TProjectCustomLimitsProjection;
  /**
   * This field can only be used with an access token created with the password flow or with an anonymous session.
   *
   * It gives access to the data that is specific to the customer or the anonymous session linked to the access token.
   */
  me: TMe;
  message?: Maybe<TMessage>;
  messages: TMessageQueryResult;
  order?: Maybe<TOrder>;
  orderEdit?: Maybe<TOrderEdit>;
  orderEdits: TOrderEditQueryResult;
  orders: TOrderQueryResult;
  payment?: Maybe<TPayment>;
  payments: TPaymentQueryResult;
  product?: Maybe<TProduct>;
  productDiscount?: Maybe<TProductDiscount>;
  productDiscounts: TProductDiscountQueryResult;
  productProjectionSearch: TProductProjectionSearchResult;
  productProjectionsSuggest: TSuggestResult;
  productSelection?: Maybe<TProductSelection>;
  productSelectionAssignments: TProductAssignmentQueryResult;
  productSelections: TProductSelectionQueryResult;
  productType?: Maybe<TProductTypeDefinition>;
  productTypes: TProductTypeDefinitionQueryResult;
  products: TProductQueryResult;
  project: TProjectProjection;
  quote?: Maybe<TQuote>;
  quoteRequest?: Maybe<TQuoteRequest>;
  quoteRequests: TQuoteRequestQueryResult;
  quotes: TQuoteQueryResult;
  review?: Maybe<TReview>;
  reviews: TReviewQueryResult;
  shippingMethod?: Maybe<TShippingMethod>;
  shippingMethods: TShippingMethodQueryResult;
  shippingMethodsByCart: Array<TShippingMethod>;
  shippingMethodsByLocation: Array<TShippingMethod>;
  shoppingList?: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
  stagedQuote?: Maybe<TStagedQuote>;
  stagedQuotes: TStagedQuoteQueryResult;
  /**
   * StandalonePrices are managed and queried through the StandalonePrices API
   * and associated to a ProductVariant through the sku field.
   */
  standalonePrice?: Maybe<TStandalonePrice>;
  /**
   * StandalonePrices are managed and queried through the StandalonePrices API
   * and associated to a ProductVariant through the sku field.
   */
  standalonePrices: TStandalonePriceQueryResult;
  state?: Maybe<TState>;
  states: TStateQueryResult;
  store?: Maybe<TStore>;
  stores: TStoreQueryResult;
  subscription?: Maybe<TCommercetoolsSubscription>;
  subscriptions: TCommercetoolsSubscriptionQueryResult;
  taxCategories: TTaxCategoryQueryResult;
  taxCategory?: Maybe<TTaxCategory>;
  typeDefinition?: Maybe<TTypeDefinition>;
  typeDefinitions: TTypeDefinitionQueryResult;
  zone?: Maybe<TZone>;
  zones: TZoneQueryResult;
};


export type TQuery_ApiClientArgs = {
  id: Scalars['String'];
};


export type TQuery_ApiClientsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_AsAssociateArgs = {
  associateId: Scalars['String'];
  businessUnitKey: Scalars['KeyReferenceInput'];
};


export type TQuery_AssociateRoleArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_AssociateRolesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_AttributeGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_AttributeGroupsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_BusinessUnitArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_BusinessUnitsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_CartArgs = {
  id: Scalars['String'];
};


export type TQuery_CartDiscountArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_CartDiscountsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_CartsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_CategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_CategoryArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_CategoryAutocompleteArgs = {
  filters?: InputMaybe<Array<Scalars['SearchFilter']>>;
  limit?: InputMaybe<Scalars['Int']>;
  locale: Scalars['Locale'];
  offset?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type TQuery_CategorySearchArgs = {
  filters?: InputMaybe<Array<Scalars['SearchFilter']>>;
  fulltext?: InputMaybe<TLocalizedText>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  queryFilters?: InputMaybe<Array<Scalars['SearchFilter']>>;
  sorts?: InputMaybe<Array<Scalars['SearchSort']>>;
};


export type TQuery_ChannelArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ChannelsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_CustomObjectArgs = {
  container?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_CustomObjectsArgs = {
  container: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_CustomerArgs = {
  emailToken?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  passwordToken?: InputMaybe<Scalars['String']>;
};


export type TQuery_CustomerActiveCartArgs = {
  customerId: Scalars['String'];
};


export type TQuery_CustomerGroupArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_CustomerGroupsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_CustomersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_DiscountCodeArgs = {
  id: Scalars['String'];
};


export type TQuery_DiscountCodesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ExtensionArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ExtensionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_InStoreArgs = {
  key: Scalars['KeyReferenceInput'];
};


export type TQuery_InStoresArgs = {
  keys: Array<Scalars['KeyReferenceInput']>;
};


export type TQuery_InventoryEntriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_InventoryEntryArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_MessageArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_MessagesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_OrderArgs = {
  id?: InputMaybe<Scalars['String']>;
  orderNumber?: InputMaybe<Scalars['String']>;
};


export type TQuery_OrderEditArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_OrderEditsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_OrdersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_PaymentArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_PaymentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  localeProjection?: InputMaybe<Array<Scalars['Locale']>>;
  projectExpandedProducts?: InputMaybe<Scalars['Boolean']>;
  sku?: InputMaybe<Scalars['String']>;
  variantKey?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductDiscountArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductDiscountsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductProjectionSearchArgs = {
  facetFilters?: InputMaybe<Array<TSearchFilterInput>>;
  facets?: InputMaybe<Array<TSearchFacetInput>>;
  filters?: InputMaybe<Array<TSearchFilterInput>>;
  fuzzy?: InputMaybe<Scalars['Boolean']>;
  fuzzyLevel?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['Locale']>;
  localeProjection?: InputMaybe<Array<Scalars['Locale']>>;
  markMatchingVariant?: InputMaybe<Scalars['Boolean']>;
  markMatchingVariants?: InputMaybe<Scalars['Boolean']>;
  offset?: InputMaybe<Scalars['Int']>;
  priceSelector?: InputMaybe<TPriceSelectorInput>;
  projectExpandedProducts?: InputMaybe<Scalars['Boolean']>;
  queryFilters?: InputMaybe<Array<TSearchFilterInput>>;
  sorts?: InputMaybe<Array<Scalars['String']>>;
  staged?: InputMaybe<Scalars['Boolean']>;
  storeProjection?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductProjectionsSuggestArgs = {
  fuzzy?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchKeywords: Array<TSearchKeywordArgument>;
  staged?: InputMaybe<Scalars['Boolean']>;
};


export type TQuery_ProductSelectionArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductSelectionAssignmentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductSelectionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductTypeArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductTypesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ProductsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  localeProjection?: InputMaybe<Array<Scalars['Locale']>>;
  offset?: InputMaybe<Scalars['Int']>;
  projectExpandedProducts?: InputMaybe<Scalars['Boolean']>;
  skus?: InputMaybe<Array<Scalars['String']>>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_QuoteArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_QuoteRequestArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_QuoteRequestsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_QuotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ReviewArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ShippingMethodArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ShippingMethodsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ShippingMethodsByCartArgs = {
  id: Scalars['String'];
};


export type TQuery_ShippingMethodsByLocationArgs = {
  country: Scalars['Country'];
  currency?: InputMaybe<Scalars['Currency']>;
  state?: InputMaybe<Scalars['String']>;
};


export type TQuery_ShoppingListArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ShoppingListsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_StagedQuoteArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_StagedQuotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_StandalonePriceArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_StandalonePricesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_StateArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_StatesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_StoreArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_StoresArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_SubscriptionArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_SubscriptionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_TaxCategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_TaxCategoryArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_TypeDefinitionArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_TypeDefinitionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};


export type TQuery_ZoneArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


export type TQuery_ZonesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TQueryLimitsProjection = {
  __typename?: 'QueryLimitsProjection';
  offset: TLimit;
};

export type TQuote = TVersioned & {
  __typename?: 'Quote';
  billingAddress?: Maybe<TAddress>;
  businessUnit?: Maybe<TBusinessUnit>;
  businessUnitRef?: Maybe<TKeyReference>;
  buyerComment?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customLineItems: Array<TCustomLineItem>;
  customer?: Maybe<TCustomer>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  customerRef?: Maybe<TReference>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  directDiscounts: Array<TDirectDiscount>;
  id: Scalars['String'];
  inventoryMode: TInventoryMode;
  itemShippingAddresses: Array<TAddress>;
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  lineItems: Array<TLineItem>;
  paymentInfo?: Maybe<TPaymentInfo>;
  purchaseOrderNumber?: Maybe<Scalars['String']>;
  quoteRequest?: Maybe<TQuoteRequest>;
  quoteRequestRef: TReference;
  quoteState: TQuoteState;
  sellerComment?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<TAddress>;
  shippingInfo?: Maybe<TShippingInfo>;
  shippingRateInput?: Maybe<TShippingRateInput>;
  stagedQuote?: Maybe<TStagedQuote>;
  stagedQuoteRef: TReference;
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
  store?: Maybe<TStore>;
  storeRef?: Maybe<TKeyReference>;
  taxCalculationMode: TTaxCalculationMode;
  taxMode: TTaxMode;
  taxRoundingMode: TRoundingMode;
  taxedPrice?: Maybe<TTaxedPrice>;
  totalPrice: TMoney;
  validTo?: Maybe<Scalars['DateTime']>;
  version: Scalars['Long'];
};


export type TQuote_LineItemsArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type TQuoteCreated = TMessagePayload & {
  __typename?: 'QuoteCreated';
  quote: TQuote;
  type: Scalars['String'];
};

export type TQuoteCustomerChanged = TMessagePayload & {
  __typename?: 'QuoteCustomerChanged';
  customer?: Maybe<TCustomer>;
  customerRef: TReference;
  previousCustomer?: Maybe<TCustomer>;
  previousCustomerRef: TReference;
  type: Scalars['String'];
};

export type TQuoteDeleted = TMessagePayload & {
  __typename?: 'QuoteDeleted';
  type: Scalars['String'];
};

export type TQuoteDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  key?: InputMaybe<Scalars['String']>;
  stagedQuote?: InputMaybe<TResourceIdentifierInput>;
  stagedQuoteStateToSent?: InputMaybe<Scalars['Boolean']>;
  stagedQuoteVersion?: InputMaybe<Scalars['Long']>;
  state?: InputMaybe<TReferenceInput>;
};

/** Fields to access Quotes. */
export type TQuoteQueryInterface = {
  quote?: Maybe<TQuote>;
  quotes: TQuoteQueryResult;
};


/** Fields to access Quotes. */
export type TQuoteQueryInterface_QuoteArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


/** Fields to access Quotes. */
export type TQuoteQueryInterface_QuotesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TQuoteQueryResult = {
  __typename?: 'QuoteQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TQuote>;
  total: Scalars['Long'];
};

export type TQuoteRenegotiationRequested = TMessagePayload & {
  __typename?: 'QuoteRenegotiationRequested';
  buyerComment?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TQuoteRequest = TVersioned & {
  __typename?: 'QuoteRequest';
  billingAddress?: Maybe<TAddress>;
  businessUnit?: Maybe<TBusinessUnit>;
  businessUnitRef?: Maybe<TKeyReference>;
  cartRef?: Maybe<TReference>;
  comment?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customLineItems: Array<TCustomLineItem>;
  customer?: Maybe<TCustomer>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  customerRef?: Maybe<TReference>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  directDiscounts: Array<TDirectDiscount>;
  id: Scalars['String'];
  inventoryMode: TInventoryMode;
  itemShippingAddresses: Array<TAddress>;
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  lineItems: Array<TLineItem>;
  paymentInfo?: Maybe<TPaymentInfo>;
  purchaseOrderNumber?: Maybe<Scalars['String']>;
  quoteRequestState: TQuoteRequestState;
  shippingAddress?: Maybe<TAddress>;
  shippingInfo?: Maybe<TShippingInfo>;
  shippingRateInput?: Maybe<TShippingRateInput>;
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
  store?: Maybe<TStore>;
  storeRef?: Maybe<TKeyReference>;
  taxCalculationMode: TTaxCalculationMode;
  taxMode: TTaxMode;
  taxRoundingMode: TRoundingMode;
  taxedPrice?: Maybe<TTaxedPrice>;
  totalPrice: TMoney;
  version: Scalars['Long'];
};


export type TQuoteRequest_LineItemsArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type TQuoteRequestCreated = TMessagePayload & {
  __typename?: 'QuoteRequestCreated';
  quoteRequest: TQuoteRequest;
  type: Scalars['String'];
};

export type TQuoteRequestCustomerChanged = TMessagePayload & {
  __typename?: 'QuoteRequestCustomerChanged';
  customer?: Maybe<TCustomer>;
  customerRef: TReference;
  previousCustomer?: Maybe<TCustomer>;
  previousCustomerRef: TReference;
  type: Scalars['String'];
};

export type TQuoteRequestDeleted = TMessagePayload & {
  __typename?: 'QuoteRequestDeleted';
  type: Scalars['String'];
};

export type TQuoteRequestDraft = {
  cart?: InputMaybe<TResourceIdentifierInput>;
  cartVersion?: InputMaybe<Scalars['Long']>;
  comment?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  key?: InputMaybe<Scalars['String']>;
  purchaseOrderNumber?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<TReferenceInput>;
};

/** Fields to access QuoteRequests. */
export type TQuoteRequestQueryInterface = {
  quoteRequest?: Maybe<TQuoteRequest>;
  quoteRequests: TQuoteRequestQueryResult;
};


/** Fields to access QuoteRequests. */
export type TQuoteRequestQueryInterface_QuoteRequestArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


/** Fields to access QuoteRequests. */
export type TQuoteRequestQueryInterface_QuoteRequestsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TQuoteRequestQueryResult = {
  __typename?: 'QuoteRequestQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TQuoteRequest>;
  total: Scalars['Long'];
};

export enum TQuoteRequestState {
  Accepted = 'Accepted',
  Cancelled = 'Cancelled',
  Closed = 'Closed',
  Rejected = 'Rejected',
  Submitted = 'Submitted',
  UnderReview = 'UnderReview'
}

export type TQuoteRequestStateChanged = TMessagePayload & {
  __typename?: 'QuoteRequestStateChanged';
  oldQuoteRequestState: TQuoteRequestState;
  quoteRequestState: TQuoteRequestState;
  type: Scalars['String'];
};

export type TQuoteRequestStateTransition = TMessagePayload & {
  __typename?: 'QuoteRequestStateTransition';
  force: Scalars['Boolean'];
  oldState?: Maybe<TState>;
  oldStateRef?: Maybe<TReference>;
  state?: Maybe<TState>;
  stateRef: TReference;
  type: Scalars['String'];
};

export type TQuoteRequestUpdateAction = {
  changeCustomer?: InputMaybe<TChangeQuoteRequestCustomer>;
  changeQuoteRequestState?: InputMaybe<TChangeQuoteRequestState>;
  setCustomField?: InputMaybe<TSetQuoteRequestCustomField>;
  setCustomType?: InputMaybe<TSetQuoteRequestCustomType>;
  transitionState?: InputMaybe<TTransitionQuoteRequestState>;
};

export enum TQuoteState {
  Accepted = 'Accepted',
  Declined = 'Declined',
  DeclinedForRenegotiation = 'DeclinedForRenegotiation',
  Pending = 'Pending',
  RenegotiationAddressed = 'RenegotiationAddressed',
  Withdrawn = 'Withdrawn'
}

export type TQuoteStateChanged = TMessagePayload & {
  __typename?: 'QuoteStateChanged';
  oldQuoteState: TQuoteState;
  quoteState: TQuoteState;
  type: Scalars['String'];
};

export type TQuoteStateTransition = TMessagePayload & {
  __typename?: 'QuoteStateTransition';
  force: Scalars['Boolean'];
  oldState?: Maybe<TState>;
  oldStateRef?: Maybe<TReference>;
  state?: Maybe<TState>;
  stateRef: TReference;
  type: Scalars['String'];
};

export type TQuoteUpdateAction = {
  changeCustomer?: InputMaybe<TChangeQuoteCustomer>;
  changeQuoteState?: InputMaybe<TChangeQuoteState>;
  requestQuoteRenegotiation?: InputMaybe<TRequestQuoteRenegotiation>;
  setCustomField?: InputMaybe<TSetQuoteCustomField>;
  setCustomType?: InputMaybe<TSetQuoteCustomType>;
  transitionState?: InputMaybe<TTransitionQuoteState>;
};

export type TRangeCount = {
  type: Scalars['String'];
};

export type TRangeCountDouble = TRangeCount & {
  __typename?: 'RangeCountDouble';
  count: Scalars['Int'];
  from: Scalars['Float'];
  fromStr: Scalars['String'];
  max: Scalars['Float'];
  mean: Scalars['Float'];
  min: Scalars['Float'];
  productCount?: Maybe<Scalars['Int']>;
  to: Scalars['Float'];
  toStr: Scalars['String'];
  total: Scalars['Float'];
  totalCount: Scalars['Int'];
  type: Scalars['String'];
};

export type TRangeCountLong = TRangeCount & {
  __typename?: 'RangeCountLong';
  count: Scalars['Int'];
  from: Scalars['Long'];
  fromStr: Scalars['String'];
  max: Scalars['Long'];
  mean: Scalars['Float'];
  min: Scalars['Long'];
  productCount?: Maybe<Scalars['Int']>;
  to: Scalars['Long'];
  toStr: Scalars['String'];
  total: Scalars['Long'];
  totalCount: Scalars['Int'];
  type: Scalars['String'];
};

export type TRangeElementInput = {
  from: Scalars['String'];
  to: Scalars['String'];
};

export type TRangeFacetInput = {
  alias?: InputMaybe<Scalars['String']>;
  countProducts?: Scalars['Boolean'];
  path: Scalars['String'];
  ranges: Array<TRangeElementInput>;
};

export type TRangeFacetResult = TFacetResult & {
  __typename?: 'RangeFacetResult';
  dataType: Scalars['String'];
  ranges: Array<TRangeCount>;
  type: Scalars['String'];
};

export type TRangeFilterInput = {
  path: Scalars['String'];
  ranges: Array<TRangeElementInput>;
};

export type TRawCustomField = {
  __typename?: 'RawCustomField';
  name: Scalars['String'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  referencedResource?: Maybe<TReferenceExpandable>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  referencedResourceSet: Array<TReferenceExpandable>;
  value: Scalars['Json'];
};

export type TRawProductAttribute = {
  __typename?: 'RawProductAttribute';
  attributeDefinition?: Maybe<TAttributeDefinition>;
  name: Scalars['String'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  referencedResource?: Maybe<TReferenceExpandable>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  referencedResourceSet: Array<TReferenceExpandable>;
  value: Scalars['Json'];
};

export type TRawProductSearchAttribute = {
  __typename?: 'RawProductSearchAttribute';
  name: Scalars['String'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  referencedResource?: Maybe<TReferenceExpandable>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  referencedResourceSet: Array<TReferenceExpandable>;
  value: Scalars['Json'];
};

export type TRecalculateCart = {
  updateProductData?: InputMaybe<Scalars['Boolean']>;
};

export type TRecalculateStagedOrder = {
  updateProductData?: InputMaybe<Scalars['Boolean']>;
};

export type TRecalculateStagedOrderOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RecalculateStagedOrderOutput';
  type: Scalars['String'];
  updateProductData: Scalars['Boolean'];
};

export type TReference = {
  __typename?: 'Reference';
  id: Scalars['String'];
  typeId: Scalars['String'];
};

export type TReferenceAttribute = TAttribute & {
  __typename?: 'ReferenceAttribute';
  id: Scalars['String'];
  name: Scalars['String'];
  typeId: Scalars['String'];
};

export type TReferenceAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'ReferenceAttributeDefinitionType';
  name: Scalars['String'];
  referenceTypeId: Scalars['String'];
};

export type TReferenceExpandable = {
  id: Scalars['String'];
};

export type TReferenceField = TCustomField & {
  __typename?: 'ReferenceField';
  id: Scalars['String'];
  name: Scalars['String'];
  typeId: Scalars['String'];
};

export type TReferenceId = {
  __typename?: 'ReferenceId';
  id: Scalars['String'];
  typeId: Scalars['String'];
};

export type TReferenceInput = {
  id: Scalars['String'];
  typeId: Scalars['String'];
};

export type TReferenceType = TFieldType & {
  __typename?: 'ReferenceType';
  name: Scalars['String'];
  referenceTypeId: Scalars['String'];
};

export type TReferenceTypeDefinitionDraft = {
  referenceTypeId: Scalars['String'];
};

export type TRefreshTokenLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'RefreshTokenLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TRefreshTokenLimitsProjection = {
  __typename?: 'RefreshTokenLimitsProjection';
  total: TRefreshTokenLimitWithCurrent;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TRejectApprovalFlow = {
  reason?: InputMaybe<Scalars['String']>;
};

export type TRelativeDiscountValue = TCartDiscountValue & TProductDiscountValue & {
  __typename?: 'RelativeDiscountValue';
  permyriad: Scalars['Int'];
  type: Scalars['String'];
};

export type TRelativeDiscountValueInput = {
  permyriad: Scalars['Int'];
};

export type TRemoveAssociateRolePermission = {
  permission: TPermission;
};

export type TRemoveAttributeGroupAttribute = {
  attribute: TAttributeReferenceInput;
};

export type TRemoveBusinessUnitAddress = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveBusinessUnitAssociate = {
  customer: TResourceIdentifierInput;
};

export type TRemoveBusinessUnitBillingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveBusinessUnitShippingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveBusinessUnitStore = {
  store: TResourceIdentifierInput;
};

export type TRemoveCartCustomLineItem = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveCartDiscountCode = {
  discountCode: TReferenceInput;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TRemoveCartDiscountStore = {
  store: TResourceIdentifierInput;
};

export type TRemoveCartItemShippingAddress = {
  addressKey: Scalars['String'];
};

export type TRemoveCartLineItem = {
  externalPrice?: InputMaybe<TBaseMoneyInput>;
  externalTotalPrice?: InputMaybe<TExternalLineItemTotalPriceDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetailsToRemove?: InputMaybe<TItemShippingDetailsDraft>;
};

export type TRemoveCartPayment = {
  payment: TResourceIdentifierInput;
};

export type TRemoveCartShippingMethod = {
  shippingKey: Scalars['String'];
};

export type TRemoveCategoryAsset = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveChannelRoles = {
  roles: Array<TChannelRole>;
};

export type TRemoveCustomerAddress = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveCustomerBillingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveCustomerShippingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveCustomerStore = {
  store: TResourceIdentifierInput;
};

export type TRemoveInventoryEntryQuantity = {
  quantity: Scalars['Long'];
};

export type TRemoveMyBusinessUnitAddress = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveMyBusinessUnitAssociate = {
  customer: TResourceIdentifierInput;
};

export type TRemoveMyBusinessUnitBillingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveMyBusinessUnitShippingAddressId = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveOrderDelivery = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveOrderItemShippingAddress = {
  addressKey: Scalars['String'];
};

export type TRemoveOrderParcelFromDelivery = {
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveOrderPayment = {
  payment: TResourceIdentifierInput;
};

export type TRemoveProductAsset = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TRemoveProductFromCategory = {
  category: TResourceIdentifierInput;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TRemoveProductImage = {
  imageUrl: Scalars['String'];
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TRemoveProductPrice = {
  priceId?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TRemoveProductSelectionProduct = {
  product: TResourceIdentifierInput;
};

export type TRemoveProductVariant = {
  id?: InputMaybe<Scalars['Int']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TRemoveShippingMethodShippingRate = {
  shippingRate: TShippingRateDraft;
  zone: TResourceIdentifierInput;
};

export type TRemoveShippingMethodZone = {
  zone: TResourceIdentifierInput;
};

export type TRemoveShoppingListLineItem = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type TRemoveShoppingListTextLineItem = {
  quantity?: InputMaybe<Scalars['Int']>;
  textLineItemId?: InputMaybe<Scalars['String']>;
  textLineItemKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveStagedChanges = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TRemoveStagedOrderCustomLineItem = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveStagedOrderCustomLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderCustomLineItemOutput';
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TRemoveStagedOrderDelivery = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveStagedOrderDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderDeliveryOutput';
  deliveryId?: Maybe<Scalars['String']>;
  deliveryKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TRemoveStagedOrderDiscountCode = {
  discountCode: TReferenceInput;
};

export type TRemoveStagedOrderDiscountCodeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderDiscountCodeOutput';
  discountCode?: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  type: Scalars['String'];
};

export type TRemoveStagedOrderItemShippingAddress = {
  addressKey: Scalars['String'];
};

export type TRemoveStagedOrderItemShippingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderItemShippingAddressOutput';
  addressKey: Scalars['String'];
  type: Scalars['String'];
};

export type TRemoveStagedOrderLineItem = {
  externalPrice?: InputMaybe<TBaseMoneyInput>;
  externalTotalPrice?: InputMaybe<TExternalLineItemTotalPriceDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Long']>;
  shippingDetailsToRemove?: InputMaybe<TItemShippingDetailsDraftType>;
};

export type TRemoveStagedOrderLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderLineItemOutput';
  externalPrice?: Maybe<TBaseMoney>;
  externalTotalPrice?: Maybe<TExternalLineItemTotalPrice>;
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Long']>;
  shippingDetailsToRemove?: Maybe<TItemShippingDetailsDraftOutput>;
  type: Scalars['String'];
};

export type TRemoveStagedOrderParcelFromDelivery = {
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
};

export type TRemoveStagedOrderParcelFromDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderParcelFromDeliveryOutput';
  parcelId?: Maybe<Scalars['String']>;
  parcelKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TRemoveStagedOrderPayment = {
  payment: TResourceIdentifierInput;
};

export type TRemoveStagedOrderPaymentOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderPaymentOutput';
  paymentResId: TResourceIdentifier;
  type: Scalars['String'];
};

export type TRemoveStandalonePriceTier = {
  minimumQuantity: Scalars['Int'];
};

export type TRemoveStateRoles = {
  roles: Array<TStateRole>;
};

export type TRemoveStoreCountry = {
  country: TStoreCountryInput;
};

export type TRemoveStoreDistributionChannel = {
  distributionChannel: TResourceIdentifierInput;
};

export type TRemoveStoreProductSelection = {
  productSelection: TResourceIdentifierInput;
};

export type TRemoveStoreSupplyChannel = {
  supplyChannel: TResourceIdentifierInput;
};

export type TRemoveTypeFieldDefinition = {
  fieldName: Scalars['String'];
};

export type TRemoveZoneLocation = {
  location: TZoneLocation;
};

export type TRequestQuoteRenegotiation = {
  buyerComment?: InputMaybe<Scalars['String']>;
};

export type TResourceIdentifier = {
  __typename?: 'ResourceIdentifier';
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  typeId: Scalars['String'];
};

export type TResourceIdentifierInput = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  typeId?: InputMaybe<Scalars['String']>;
};

/** Stores information about returns connected to this order. */
export type TReturnInfo = {
  __typename?: 'ReturnInfo';
  items: Array<TReturnItem>;
  returnDate?: Maybe<Scalars['DateTime']>;
  returnTrackingId?: Maybe<Scalars['String']>;
};

export type TReturnInfoAdded = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'ReturnInfoAdded';
  returnInfo: TReturnInfo;
  type: Scalars['String'];
};

export type TReturnInfoDraftType = {
  items: Array<TReturnItemDraftType>;
  returnDate?: InputMaybe<Scalars['DateTime']>;
  returnTrackingId?: InputMaybe<Scalars['String']>;
};

export type TReturnInfoDraftTypeOutput = {
  __typename?: 'ReturnInfoDraftTypeOutput';
  items: Array<TReturnItemDraftTypeOutput>;
  returnDate?: Maybe<Scalars['DateTime']>;
  returnTrackingId?: Maybe<Scalars['String']>;
};

export type TReturnInfoSet = TMessagePayload & TOrderMessagePayload & {
  __typename?: 'ReturnInfoSet';
  returnInfo?: Maybe<Array<TReturnInfo>>;
  type: Scalars['String'];
};

export type TReturnItem = {
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  paymentState: TReturnPaymentState;
  quantity: Scalars['Long'];
  shipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TReturnItemDraftType = {
  comment?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  customLineItemId?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  lineItemId?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Long'];
  shipmentState: TReturnShipmentState;
};

export type TReturnItemDraftTypeOutput = {
  __typename?: 'ReturnItemDraftTypeOutput';
  comment?: Maybe<Scalars['String']>;
  custom?: Maybe<TCustomFieldsCommand>;
  customLineItemId?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  lineItemId?: Maybe<Scalars['String']>;
  quantity: Scalars['Long'];
  shipmentState: TReturnShipmentState;
};

export enum TReturnPaymentState {
  Initial = 'Initial',
  NonRefundable = 'NonRefundable',
  NotRefunded = 'NotRefunded',
  Refunded = 'Refunded'
}

export enum TReturnShipmentState {
  Advised = 'Advised',
  BackInStock = 'BackInStock',
  Returned = 'Returned',
  Unusable = 'Unusable'
}

export type TRevertStagedChanges = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TRevertStagedVariantChanges = {
  variantId: Scalars['Int'];
};

export type TReview = TReferenceExpandable & TVersioned & {
  __typename?: 'Review';
  authorName?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customer?: Maybe<TCustomer>;
  customerRef?: Maybe<TReference>;
  id: Scalars['String'];
  includedInStatistics: Scalars['Boolean'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  locale?: Maybe<Scalars['Locale']>;
  rating?: Maybe<Scalars['Int']>;
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
  target?: Maybe<TReviewTarget>;
  targetRef?: Maybe<TReference>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  uniquenessValue?: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};

export type TReviewCreated = TMessagePayload & {
  __typename?: 'ReviewCreated';
  review: TReview;
  type: Scalars['String'];
};

export type TReviewDraft = {
  authorName?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  customer?: InputMaybe<TResourceIdentifierInput>;
  key?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['Locale']>;
  rating?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<TResourceIdentifierInput>;
  target?: InputMaybe<TTargetReferenceInput>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  uniquenessValue?: InputMaybe<Scalars['String']>;
};

export type TReviewQueryResult = {
  __typename?: 'ReviewQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TReview>;
  total: Scalars['Long'];
};

export type TReviewRatingSet = TMessagePayload & {
  __typename?: 'ReviewRatingSet';
  includedInStatistics: Scalars['Boolean'];
  newRating?: Maybe<Scalars['Int']>;
  oldRating?: Maybe<Scalars['Int']>;
  target?: Maybe<TReviewTarget>;
  targetRef?: Maybe<TReference>;
  type: Scalars['String'];
};

export type TReviewRatingStatistics = {
  __typename?: 'ReviewRatingStatistics';
  averageRating: Scalars['Float'];
  count: Scalars['Long'];
  highestRating: Scalars['Int'];
  lowestRating: Scalars['Int'];
  ratingsDistribution: Scalars['Json'];
};

export type TReviewStateTransition = TMessagePayload & {
  __typename?: 'ReviewStateTransition';
  force: Scalars['Boolean'];
  newIncludedInStatistics: Scalars['Boolean'];
  newState?: Maybe<TState>;
  newStateRef: TReference;
  oldIncludedInStatistics: Scalars['Boolean'];
  oldState?: Maybe<TState>;
  oldStateRef?: Maybe<TReference>;
  target?: Maybe<TReviewTarget>;
  targetRef?: Maybe<TReference>;
  type: Scalars['String'];
};

export type TReviewTarget = {
  id: Scalars['String'];
};

export type TReviewUpdateAction = {
  setAuthorName?: InputMaybe<TSetReviewAuthorName>;
  setCustomField?: InputMaybe<TSetReviewCustomField>;
  setCustomType?: InputMaybe<TSetReviewCustomType>;
  setCustomer?: InputMaybe<TSetReviewCustomer>;
  setKey?: InputMaybe<TSetReviewKey>;
  setLocale?: InputMaybe<TSetReviewLocale>;
  setRating?: InputMaybe<TSetReviewRating>;
  setTarget?: InputMaybe<TSetReviewTarget>;
  setText?: InputMaybe<TSetReviewText>;
  setTitle?: InputMaybe<TSetReviewTitle>;
  transitionState?: InputMaybe<TTransitionReviewState>;
};

export enum TRoundingMode {
  /** [Round half down](https://en.wikipedia.org/wiki/Rounding#Round_half_down) */
  HalfDown = 'HalfDown',
  /** [Round half to even](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even). Default rounding mode as used in IEEE 754 computing functions and operators. */
  HalfEven = 'HalfEven',
  /** [Round half up](https://en.wikipedia.org/wiki/Rounding#Round_half_up) */
  HalfUp = 'HalfUp'
}

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TRuleApprover = {
  __typename?: 'RuleApprover';
  associateRole: TAssociateRole;
  associateRoleRef: TKeyReference;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TRuleApproverDraft = {
  associateRole: TResourceIdentifierInput;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TRuleRequester = {
  __typename?: 'RuleRequester';
  associateRole: TAssociateRole;
  associateRoleRef: TKeyReference;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TRuleRequesterDraft = {
  associateRole: TResourceIdentifierInput;
};

export type TSnsDestination = TDestination & {
  __typename?: 'SNSDestination';
  accessKey?: Maybe<Scalars['String']>;
  accessSecret?: Maybe<Scalars['String']>;
  authenticationMode: TAwsAuthenticationMode;
  topicArn: Scalars['String'];
  type: Scalars['String'];
};

export type TSnsDestinationInput = {
  accessKey?: InputMaybe<Scalars['String']>;
  accessSecret?: InputMaybe<Scalars['String']>;
  authenticationMode?: InputMaybe<TAwsAuthenticationMode>;
  topicArn: Scalars['String'];
};

export type TSqsDestination = TDestination & {
  __typename?: 'SQSDestination';
  accessKey?: Maybe<Scalars['String']>;
  accessSecret?: Maybe<Scalars['String']>;
  authenticationMode: TAwsAuthenticationMode;
  queueUrl: Scalars['String'];
  region: Scalars['String'];
  type: Scalars['String'];
};

export type TSqsDestinationInput = {
  accessKey?: InputMaybe<Scalars['String']>;
  accessSecret?: InputMaybe<Scalars['String']>;
  authenticationMode?: InputMaybe<TAwsAuthenticationMode>;
  queueUrl: Scalars['String'];
  region: Scalars['String'];
};

export type TScopedPrice = {
  __typename?: 'ScopedPrice';
  channel?: Maybe<TChannel>;
  channelRef?: Maybe<TReference>;
  country?: Maybe<Scalars['String']>;
  currentValue: TBaseMoney;
  custom?: Maybe<TCustomFieldsType>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  discounted?: Maybe<TDiscountedProductSearchPriceValue>;
  id: Scalars['String'];
  validFrom?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
  value: TBaseMoney;
};

export type TScoreShippingRateInput = TShippingRateInput & {
  __typename?: 'ScoreShippingRateInput';
  score: Scalars['Int'];
  type: Scalars['String'];
};

export type TScoreShippingRateInputDraft = {
  score: Scalars['Int'];
};

export type TScoreShippingRateInputDraftOutput = TShippingRateInputDraftOutput & {
  __typename?: 'ScoreShippingRateInputDraftOutput';
  score: Scalars['Int'];
  type: Scalars['String'];
};

export type TSearchFacetInput = {
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  model?: InputMaybe<TSearchFacetModelInput>;
  string?: InputMaybe<Scalars['String']>;
};

export type TSearchFacetModelInput = {
  range?: InputMaybe<TRangeFacetInput>;
  terms?: InputMaybe<TTermsFacetInput>;
};

export type TSearchFilterInput = {
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  model?: InputMaybe<TSearchFilterModelInput>;
  string?: InputMaybe<Scalars['String']>;
};

export type TSearchFilterModelInput = {
  exists?: InputMaybe<TExistsFilterInput>;
  missing?: InputMaybe<TMissingFilterInput>;
  range?: InputMaybe<TRangeFilterInput>;
  tree?: InputMaybe<TTreeFilterInput>;
  value?: InputMaybe<TValueFilterInput>;
};

export type TSearchIndexingConfiguration = {
  __typename?: 'SearchIndexingConfiguration';
  /** CLOSED BETA: This feature is subject to change and should not be used in production. https://docs.commercetools.com/api/contract#closed-beta */
  customers?: Maybe<TCustomerSearchConfiguration>;
  orders?: Maybe<TOrderSearchConfiguration>;
  products?: Maybe<TSearchIndexingConfigurationValues>;
  standalonePrices?: Maybe<TSearchIndexingConfigurationValues>;
};

export type TSearchIndexingConfigurationValues = {
  __typename?: 'SearchIndexingConfigurationValues';
  lastModifiedAt?: Maybe<Scalars['DateTime']>;
  lastModifiedBy?: Maybe<TInitiator>;
  status?: Maybe<TSearchIndexingStatus>;
};

export enum TSearchIndexingStatus {
  Activated = 'Activated',
  Deactivated = 'Deactivated',
  Indexing = 'Indexing'
}

export type TSearchKeyword = {
  __typename?: 'SearchKeyword';
  suggestTokenizer?: Maybe<TSuggestTokenizer>;
  text: Scalars['String'];
};

export type TSearchKeywordArgument = {
  locale: Scalars['Locale'];
  searchKeyword: Scalars['String'];
};

export type TSearchKeywordInput = {
  keywords: Array<TSearchKeywordItemInput>;
  locale: Scalars['Locale'];
};

export type TSearchKeywordItemInput = {
  suggestTokenizer?: InputMaybe<TBaseSearchKeywordInput>;
  text: Scalars['String'];
};

export type TSearchKeywordProductSearch = {
  __typename?: 'SearchKeywordProductSearch';
  suggestTokenizer?: Maybe<TSuggestTokenizerProductSearch>;
  text: Scalars['String'];
};

export type TSearchKeywords = {
  __typename?: 'SearchKeywords';
  locale: Scalars['Locale'];
  searchKeywords: Array<TSearchKeyword>;
};

export type TSearchKeywordsProductSearch = {
  __typename?: 'SearchKeywordsProductSearch';
  locale: Scalars['Locale'];
  searchKeywords: Array<TSearchKeywordProductSearch>;
};

export type TSearchLimitsProjection = {
  __typename?: 'SearchLimitsProjection';
  maxTextSize: TLimit;
};

/** In order to decide which of the matching items will actually be discounted */
export enum TSelectionMode {
  Cheapest = 'Cheapest',
  MostExpensive = 'MostExpensive'
}

export type TSelectionOfProduct = {
  __typename?: 'SelectionOfProduct';
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  productSelection?: Maybe<TProductSelection>;
  productSelectionRef: TReference;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  variantExclusion?: Maybe<TProductVariantExclusion>;
  variantSelection?: Maybe<TProductVariantSelection>;
};

export type TSelectionOfProductQueryResult = {
  __typename?: 'SelectionOfProductQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TSelectionOfProduct>;
  total: Scalars['Long'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TSetApprovalRuleApprovers = {
  approvers: TApproverHierarchyDraft;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TSetApprovalRuleDescription = {
  description?: InputMaybe<Scalars['String']>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TSetApprovalRuleKey = {
  key?: InputMaybe<Scalars['String']>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TSetApprovalRuleName = {
  name: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TSetApprovalRulePredicate = {
  predicate: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TSetApprovalRuleRequesters = {
  requesters: Array<TRuleRequesterDraft>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TSetApprovalRuleStatus = {
  status: TApprovalRuleStatus;
};

export type TSetAssociateRoleCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetAssociateRoleCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetAssociateRoleName = {
  name?: InputMaybe<Scalars['String']>;
};

export type TSetAssociateRolePermissions = {
  permissions?: InputMaybe<Array<TPermission>>;
};

export type TSetAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'SetAttributeDefinitionType';
  elementType: TAttributeDefinitionType;
  name: Scalars['String'];
};

export type TSetAttributeGroupAttributes = {
  attributes: Array<TAttributeReferenceInput>;
};

export type TSetAttributeGroupDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetAttributeGroupKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetBusinessUnitAddressCustomField = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetBusinessUnitAddressCustomType = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetBusinessUnitAssociates = {
  associates?: InputMaybe<Array<TAssociateDraft>>;
};

export type TSetBusinessUnitContactEmail = {
  contactEmail?: InputMaybe<Scalars['String']>;
};

export type TSetBusinessUnitCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetBusinessUnitCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetBusinessUnitDefaultBillingAddress = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TSetBusinessUnitDefaultShippingAddress = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TSetBusinessUnitStoreMode = {
  storeMode?: InputMaybe<Scalars['String']>;
  stores?: InputMaybe<Array<TResourceIdentifierInput>>;
};

export type TSetBusinessUnitStores = {
  stores: Array<TResourceIdentifierInput>;
};

export type TSetCartAnonymousId = {
  anonymousId?: InputMaybe<Scalars['String']>;
};

export type TSetCartBillingAddress = {
  address?: InputMaybe<TAddressInput>;
};

export type TSetCartBillingAddressCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCartBillingAddressCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartBusinessUnit = {
  businessUnit: TResourceIdentifierInput;
};

export type TSetCartCountry = {
  country?: InputMaybe<Scalars['Country']>;
};

export type TSetCartCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCartCustomLineItemCustomField = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCartCustomLineItemCustomType = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartCustomLineItemShippingDetails = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
};

export type TSetCartCustomLineItemTaxAmount = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  externalTaxAmount?: InputMaybe<TExternalTaxAmountDraft>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartCustomLineItemTaxRate = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartCustomShippingMethod = {
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetCartCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartCustomerEmail = {
  email?: InputMaybe<Scalars['String']>;
};

export type TSetCartCustomerGroup = {
  customerGroup?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetCartCustomerId = {
  customerId?: InputMaybe<Scalars['String']>;
};

export type TSetCartDeleteDaysAfterLastModification = {
  deleteDaysAfterLastModification?: InputMaybe<Scalars['Int']>;
};

export type TSetCartDirectDiscounts = {
  discounts: Array<TDirectDiscountDraft>;
};

export type TSetCartDiscountCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCartDiscountCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartDiscountDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCartDiscountKey = {
  key?: InputMaybe<Scalars['String']>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TSetCartDiscountStores = {
  stores?: InputMaybe<Array<TResourceIdentifierInput>>;
};

export type TSetCartDiscountValidFrom = {
  validFrom?: InputMaybe<Scalars['DateTime']>;
};

export type TSetCartDiscountValidFromAndUntil = {
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type TSetCartDiscountValidUntil = {
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type TSetCartItemShippingAddressCustomField = {
  addressKey: Scalars['String'];
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCartItemShippingAddressCustomType = {
  addressKey: Scalars['String'];
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetCartLineItemCustomField = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCartLineItemCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartLineItemDistributionChannel = {
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartLineItemInventoryMode = {
  inventoryMode?: InputMaybe<TInventoryMode>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartLineItemPrice = {
  externalPrice?: InputMaybe<TBaseMoneyInput>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartLineItemShippingDetails = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraft>;
};

export type TSetCartLineItemSupplyChannel = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetCartLineItemTaxAmount = {
  externalTaxAmount?: InputMaybe<TExternalTaxAmountDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartLineItemTaxRate = {
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartLineItemTotalPrice = {
  externalTotalPrice?: InputMaybe<TExternalLineItemTotalPriceDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartLocale = {
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TSetCartShippingAddress = {
  address?: InputMaybe<TAddressInput>;
};

export type TSetCartShippingAddressCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCartShippingAddressCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartShippingCustomField = {
  name: Scalars['String'];
  shippingKey?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCartShippingCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  shippingKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartShippingMethod = {
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingMethod?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetCartShippingMethodTaxAmount = {
  externalTaxAmount?: InputMaybe<TExternalTaxAmountDraft>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartShippingMethodTaxRate = {
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetCartShippingRateInput = {
  shippingRateInput?: InputMaybe<TShippingRateInputDraft>;
};

export type TSetCartTotalTax = {
  externalTaxPortions?: InputMaybe<Array<TTaxPortionDraft>>;
  externalTotalGross?: InputMaybe<TMoneyInput>;
};

export type TSetCategoryAssetCustomField = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCategoryAssetCustomType = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCategoryAssetDescription = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCategoryAssetKey = {
  assetId: Scalars['String'];
  assetKey?: InputMaybe<Scalars['String']>;
};

export type TSetCategoryAssetSources = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  sources?: InputMaybe<Array<TAssetSourceInput>>;
};

export type TSetCategoryAssetTags = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type TSetCategoryCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCategoryCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCategoryDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCategoryExternalId = {
  externalId?: InputMaybe<Scalars['String']>;
};

export type TSetCategoryKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetCategoryMetaDescription = {
  metaDescription?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCategoryMetaKeywords = {
  metaKeywords?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCategoryMetaTitle = {
  metaTitle?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetChannelAddress = {
  address?: InputMaybe<TAddressInput>;
};

export type TSetChannelAddressCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetChannelAddressCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetChannelCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetChannelCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetChannelGeoLocation = {
  geoLocation?: InputMaybe<TGeometryInput>;
};

export type TSetChannelRoles = {
  roles: Array<TChannelRole>;
};

export type TSetCustomerAddressCustomField = {
  addressId: Scalars['String'];
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerAddressCustomType = {
  addressId: Scalars['String'];
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerAuthenticationMode = {
  authMode: TAuthenticationMode;
  password?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerCompanyName = {
  companyName?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerDateOfBirth = {
  dateOfBirth?: InputMaybe<Scalars['Date']>;
};

export type TSetCustomerDefaultBillingAddress = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerDefaultShippingAddress = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerExternalId = {
  externalId?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerFirstName = {
  firstName?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerGroup = {
  customerGroup?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetCustomerGroupCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerGroupCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerGroupKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerLastName = {
  lastName?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerLocale = {
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TSetCustomerMiddleName = {
  middleName?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerNumber = {
  customerNumber?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerSalutation = {
  salutation?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerStores = {
  stores: Array<TResourceIdentifierInput>;
};

export type TSetCustomerTitle = {
  title?: InputMaybe<Scalars['String']>;
};

export type TSetCustomerVatId = {
  vatId?: InputMaybe<Scalars['String']>;
};

export type TSetDiscountCodeCartPredicate = {
  cartPredicate?: InputMaybe<Scalars['String']>;
};

export type TSetDiscountCodeCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetDiscountCodeCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetDiscountCodeDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetDiscountCodeMaxApplications = {
  maxApplications?: InputMaybe<Scalars['Long']>;
};

export type TSetDiscountCodeMaxApplicationsPerCustomer = {
  maxApplicationsPerCustomer?: InputMaybe<Scalars['Long']>;
};

export type TSetDiscountCodeName = {
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetDiscountCodeValidFrom = {
  validFrom?: InputMaybe<Scalars['DateTime']>;
};

export type TSetDiscountCodeValidFromAndUntil = {
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type TSetDiscountCodeValidUntil = {
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type TSetExtensionKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetExtensionTimeoutInMs = {
  timeoutInMs?: InputMaybe<Scalars['Int']>;
};

export type TSetInventoryEntryCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetInventoryEntryCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetInventoryEntryExpectedDelivery = {
  expectedDelivery?: InputMaybe<Scalars['DateTime']>;
};

export type TSetInventoryEntryRestockableInDays = {
  restockableInDays?: InputMaybe<Scalars['Int']>;
};

export type TSetInventoryEntrySupplyChannel = {
  supplyChannel?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetMyBusinessUnitAddressCustomField = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetMyBusinessUnitAddressCustomType = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetMyBusinessUnitContactEmail = {
  contactEmail?: InputMaybe<Scalars['String']>;
};

export type TSetMyBusinessUnitCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetMyBusinessUnitCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetMyBusinessUnitDefaultBillingAddress = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TSetMyBusinessUnitDefaultShippingAddress = {
  addressId?: InputMaybe<Scalars['String']>;
  addressKey?: InputMaybe<Scalars['String']>;
};

export type TSetMyCartShippingMethod = {
  shippingMethod?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetMyQuoteRequestCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetMyQuoteRequestCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderBillingAddress = {
  address?: InputMaybe<TAddressInput>;
};

export type TSetOrderBillingAddressCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderBillingAddressCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderCustomLineItemCustomField = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderCustomLineItemCustomType = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderCustomLineItemShippingDetails = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraftType>;
};

export type TSetOrderCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderCustomerEmail = {
  email?: InputMaybe<Scalars['String']>;
};

export type TSetOrderCustomerId = {
  customerId?: InputMaybe<Scalars['String']>;
};

export type TSetOrderDeliveryAddress = {
  address?: InputMaybe<TAddressInput>;
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderDeliveryAddressCustomField = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderDeliveryAddressCustomType = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderDeliveryCustomField = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderDeliveryCustomType = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderDeliveryItems = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  items: Array<TDeliveryItemDraftType>;
};

export type TSetOrderEditComment = {
  comment?: InputMaybe<Scalars['String']>;
};

export type TSetOrderEditCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderEditCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderEditKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetOrderEditStagedActions = {
  stagedActions: Array<TStagedOrderUpdateAction>;
};

export type TSetOrderItemShippingAddressCustomField = {
  addressKey: Scalars['String'];
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderItemShippingAddressCustomType = {
  addressKey: Scalars['String'];
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderLineItemCustomField = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderLineItemCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderLineItemShippingDetails = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraftType>;
};

export type TSetOrderLocale = {
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TSetOrderNumber = {
  orderNumber?: InputMaybe<Scalars['String']>;
};

export type TSetOrderParcelCustomField = {
  name: Scalars['String'];
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderParcelCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderParcelItems = {
  items: Array<TDeliveryItemDraftType>;
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderParcelMeasurements = {
  measurements?: InputMaybe<TParcelMeasurementsDraftType>;
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderParcelTrackingData = {
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
  trackingData?: InputMaybe<TTrackingDataDraftType>;
};

export type TSetOrderPurchaseOrderNumber = {
  purchaseOrderNumber?: InputMaybe<Scalars['String']>;
};

export type TSetOrderReturnInfo = {
  items?: InputMaybe<Array<TReturnInfoDraftType>>;
};

export type TSetOrderReturnItemCustomField = {
  name: Scalars['String'];
  returnItemId?: InputMaybe<Scalars['String']>;
  returnItemKey?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderReturnItemCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  returnItemId?: InputMaybe<Scalars['String']>;
  returnItemKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderReturnPaymentState = {
  paymentState: TReturnPaymentState;
  returnItemId?: InputMaybe<Scalars['String']>;
  returnItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderReturnShipmentState = {
  returnItemId?: InputMaybe<Scalars['String']>;
  returnItemKey?: InputMaybe<Scalars['String']>;
  shipmentState: TReturnShipmentState;
};

export type TSetOrderShippingAddress = {
  address?: InputMaybe<TAddressInput>;
};

export type TSetOrderShippingAddressCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderShippingAddressCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderShippingCustomField = {
  name: Scalars['String'];
  shippingKey?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetOrderShippingCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  shippingKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetOrderStore = {
  store?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetPaymentAmountPaid = {
  amount?: InputMaybe<TMoneyInput>;
};

export type TSetPaymentAmountRefunded = {
  amount?: InputMaybe<TMoneyInput>;
};

export type TSetPaymentAnonymousId = {
  anonymousId?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentAuthorization = {
  amount?: InputMaybe<TMoneyInput>;
  until?: InputMaybe<Scalars['DateTime']>;
};

export type TSetPaymentCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentCustomer = {
  customer?: InputMaybe<TReferenceInput>;
};

export type TSetPaymentExternalId = {
  externalId?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentInterfaceId = {
  interfaceId?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentMethodInfoInterface = {
  interface: Scalars['String'];
};

export type TSetPaymentMethodInfoMethod = {
  method?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentMethodInfoName = {
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetPaymentStatusInterfaceCode = {
  interfaceCode?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentStatusInterfaceText = {
  interfaceText?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentTransactionCustomField = {
  name: Scalars['String'];
  transactionId: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetPaymentTransactionCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  transactionId: Scalars['String'];
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetProductAssetCustomField = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  value?: InputMaybe<Scalars['String']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProductAssetCustomType = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProductAssetDescription = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProductAssetKey = {
  assetId: Scalars['String'];
  assetKey?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProductAssetSources = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  sources?: InputMaybe<Array<TAssetSourceInput>>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProductAssetTags = {
  assetId?: InputMaybe<Scalars['String']>;
  assetKey?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProductAttribute = {
  name: Scalars['String'];
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  value?: InputMaybe<Scalars['String']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProductAttributeInAllVariants = {
  name: Scalars['String'];
  staged?: InputMaybe<Scalars['Boolean']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetProductCategoryOrderHint = {
  categoryId: Scalars['String'];
  orderHint?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TSetProductDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TSetProductDiscountDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetProductDiscountKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetProductDiscountValidFrom = {
  validFrom?: InputMaybe<Scalars['DateTime']>;
};

export type TSetProductDiscountValidFromAndUntil = {
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type TSetProductDiscountValidUntil = {
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type TSetProductDiscountedPrice = {
  discounted?: InputMaybe<TDiscountedProductPriceValueInput>;
  priceId: Scalars['String'];
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TSetProductImageLabel = {
  imageUrl: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProductKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetProductMetaAttributes = {
  metaDescription?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  metaKeywords?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  metaTitle?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TSetProductMetaDescription = {
  metaDescription?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TSetProductMetaKeywords = {
  metaKeywords?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TSetProductMetaTitle = {
  metaTitle?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TSetProductPriceCustomField = {
  name: Scalars['String'];
  priceId: Scalars['String'];
  staged?: InputMaybe<Scalars['Boolean']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetProductPriceCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  priceId: Scalars['String'];
  staged?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetProductPriceKey = {
  key?: InputMaybe<Scalars['String']>;
  priceId: Scalars['String'];
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TSetProductPriceMode = {
  priceMode?: InputMaybe<TPriceMode>;
};

export type TSetProductPrices = {
  prices: Array<TProductPriceDataInput>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProductSelectionCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetProductSelectionCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetProductSelectionKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetProductSelectionVariantExclusion = {
  product: TResourceIdentifierInput;
  variantExclusion?: InputMaybe<TProductVariantExclusionDraft>;
};

export type TSetProductSelectionVariantSelection = {
  product: TResourceIdentifierInput;
  variantSelection?: InputMaybe<TProductVariantSelectionDraft>;
};

export type TSetProductSku = {
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId: Scalars['Int'];
};

export type TSetProductTaxCategory = {
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetProductVariantKey = {
  key?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  staged?: InputMaybe<Scalars['Boolean']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

export type TSetProjectSettingsExternalOAuth = {
  externalOAuth?: InputMaybe<TExternalOAuthDraft>;
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TSetProjectSettingsMyBusinessUnitAssociateRoleOnCreation = {
  associateRole?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetProjectSettingsShippingRateInputType = {
  shippingRateInputType?: InputMaybe<TShippingRateInputTypeInput>;
};

export type TSetQuoteCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetQuoteCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetQuoteRequestCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetQuoteRequestCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetReviewAuthorName = {
  authorName?: InputMaybe<Scalars['String']>;
};

export type TSetReviewCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetReviewCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetReviewCustomer = {
  customer?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetReviewKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetReviewLocale = {
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TSetReviewRating = {
  rating?: InputMaybe<Scalars['Int']>;
};

export type TSetReviewTarget = {
  target?: InputMaybe<TTargetReferenceInput>;
};

export type TSetReviewText = {
  text?: InputMaybe<Scalars['String']>;
};

export type TSetReviewTitle = {
  title?: InputMaybe<Scalars['String']>;
};

export type TSetSearchKeywords = {
  searchKeywords: Array<TSearchKeywordInput>;
  staged?: InputMaybe<Scalars['Boolean']>;
};

export type TSetShippingMethodCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetShippingMethodCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetShippingMethodDescription = {
  description?: InputMaybe<Scalars['String']>;
};

export type TSetShippingMethodKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetShippingMethodLocalizedDescription = {
  localizedDescription?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetShippingMethodLocalizedName = {
  localizedName?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetShippingMethodPredicate = {
  predicate?: InputMaybe<Scalars['String']>;
};

export type TSetShoppingListAnonymousId = {
  anonymousId?: InputMaybe<Scalars['String']>;
};

export type TSetShoppingListCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetShoppingListCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetShoppingListCustomer = {
  customer?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetShoppingListDeleteDaysAfterLastModification = {
  deleteDaysAfterLastModification?: InputMaybe<Scalars['Int']>;
};

export type TSetShoppingListDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetShoppingListKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetShoppingListLineItemCustomField = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetShoppingListLineItemCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetShoppingListSlug = {
  slug?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetShoppingListStore = {
  store?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetShoppingListTextLineItemCustomField = {
  name: Scalars['String'];
  textLineItemId?: InputMaybe<Scalars['String']>;
  textLineItemKey?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetShoppingListTextLineItemCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  textLineItemId?: InputMaybe<Scalars['String']>;
  textLineItemKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetShoppingListTextLineItemDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  textLineItemId?: InputMaybe<Scalars['String']>;
  textLineItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderBillingAddress = {
  address?: InputMaybe<TAddressInput>;
};

export type TSetStagedOrderBillingAddressCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderBillingAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderBillingAddressCustomFieldOutput';
  name: Scalars['String'];
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderBillingAddressCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderBillingAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderBillingAddressCustomTypeOutput';
  custom: TCustomFieldsCommand;
  type: Scalars['String'];
};

export type TSetStagedOrderBillingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderBillingAddressOutput';
  address?: Maybe<TAddressDraft>;
  type: Scalars['String'];
};

export type TSetStagedOrderCountry = {
  country?: InputMaybe<Scalars['Country']>;
};

export type TSetStagedOrderCountryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCountryOutput';
  country?: Maybe<Scalars['Country']>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomFieldOutput';
  name: Scalars['String'];
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderCustomLineItemCustomField = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderCustomLineItemCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemCustomFieldOutput';
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderCustomLineItemCustomType = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderCustomLineItemCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemCustomTypeOutput';
  custom: TCustomFieldsCommand;
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomLineItemShippingDetails = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraftType>;
};

export type TSetStagedOrderCustomLineItemShippingDetailsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemShippingDetailsOutput';
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  shippingDetails?: Maybe<TItemShippingDetailsDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomLineItemTaxAmount = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  externalTaxAmount?: InputMaybe<TExternalTaxAmountDraft>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderCustomLineItemTaxAmountOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemTaxAmountOutput';
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  externalTaxAmount?: Maybe<TExternalTaxAmountDraftOutput>;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomLineItemTaxRate = {
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderCustomLineItemTaxRateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemTaxRateOutput';
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  externalTaxRate?: Maybe<TExternalTaxRateDraftOutput>;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomShippingMethod = {
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderCustomShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomShippingMethodOutput';
  externalTaxRate?: Maybe<TExternalTaxRateDraftOutput>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRate;
  taxCategoryResId?: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomTypeOutput';
  custom: TCustomFieldsCommand;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomerEmail = {
  email?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderCustomerEmailOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomerEmailOutput';
  email?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomerGroup = {
  customerGroup?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderCustomerGroupOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomerGroupOutput';
  customerGroupResId?: Maybe<TCustomerGroupReferenceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomerId = {
  customerId?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderCustomerIdOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomerIdOutput';
  customerId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderDeliveryAddress = {
  address?: InputMaybe<TAddressInput>;
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryAddressCustomField = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryAddressCustomFieldOutput';
  deliveryId?: Maybe<Scalars['String']>;
  deliveryKey?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderDeliveryAddressCustomType = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryAddressCustomTypeOutput';
  custom: TCustomFieldsCommand;
  deliveryId?: Maybe<Scalars['String']>;
  deliveryKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderDeliveryAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryAddressOutput';
  address?: Maybe<TAddressDraft>;
  deliveryId?: Maybe<Scalars['String']>;
  deliveryKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderDeliveryCustomField = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryCustomFieldOutput';
  deliveryId?: Maybe<Scalars['String']>;
  deliveryKey?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderDeliveryCustomType = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryCustomTypeOutput';
  custom: TCustomFieldsCommand;
  deliveryId?: Maybe<Scalars['String']>;
  deliveryKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderDeliveryItems = {
  deliveryId?: InputMaybe<Scalars['String']>;
  deliveryKey?: InputMaybe<Scalars['String']>;
  items: Array<TDeliveryItemDraftType>;
};

export type TSetStagedOrderDeliveryItemsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryItemsOutput';
  deliveryId?: Maybe<Scalars['String']>;
  deliveryKey?: Maybe<Scalars['String']>;
  items: Array<TDeliveryItem>;
  type: Scalars['String'];
};

export type TSetStagedOrderDirectDiscounts = {
  discounts: Array<TDirectDiscountDraft>;
};

export type TSetStagedOrderDirectDiscountsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDirectDiscountsOutput';
  discounts: Array<TDirectDiscountDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderItemShippingAddressCustomField = {
  addressKey: Scalars['String'];
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderItemShippingAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderItemShippingAddressCustomFieldOutput';
  addressKey: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderItemShippingAddressCustomType = {
  addressKey: Scalars['String'];
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderItemShippingAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderItemShippingAddressCustomTypeOutput';
  addressKey: Scalars['String'];
  custom: TCustomFieldsCommand;
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemCustomField = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemCustomFieldOutput';
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderLineItemCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemCustomTypeOutput';
  custom: TCustomFieldsCommand;
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemDistributionChannel = {
  distributionChannel?: InputMaybe<TResourceIdentifierInput>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemDistributionChannelOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemDistributionChannelOutput';
  distributionChannelResId?: Maybe<TChannelReferenceIdentifier>;
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemPrice = {
  externalPrice?: InputMaybe<TBaseMoneyInput>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemPriceOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemPriceOutput';
  externalPrice?: Maybe<TBaseMoney>;
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemShippingDetails = {
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  shippingDetails?: InputMaybe<TItemShippingDetailsDraftType>;
};

export type TSetStagedOrderLineItemShippingDetailsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemShippingDetailsOutput';
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  shippingDetails?: Maybe<TItemShippingDetailsDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemTaxAmount = {
  externalTaxAmount?: InputMaybe<TExternalTaxAmountDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemTaxAmountOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemTaxAmountOutput';
  externalTaxAmount?: Maybe<TExternalTaxAmountDraftOutput>;
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemTaxRate = {
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemTaxRateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemTaxRateOutput';
  externalTaxRate?: Maybe<TExternalTaxRateDraftOutput>;
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemTotalPrice = {
  externalTotalPrice?: InputMaybe<TExternalLineItemTotalPriceDraft>;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemTotalPriceOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemTotalPriceOutput';
  externalTotalPrice?: Maybe<TExternalLineItemTotalPrice>;
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderLocale = {
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TSetStagedOrderLocaleOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLocaleOutput';
  locale?: Maybe<Scalars['Locale']>;
  type: Scalars['String'];
};

export type TSetStagedOrderOrderNumber = {
  orderNumber?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderOrderNumberOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderOrderNumberOutput';
  orderNumber?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderOrderTotalTax = {
  externalTaxPortions?: InputMaybe<Array<TTaxPortionDraft>>;
  externalTotalGross?: InputMaybe<TMoneyInput>;
};

export type TSetStagedOrderOrderTotalTaxOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderOrderTotalTaxOutput';
  externalTaxPortions: Array<TTaxPortion>;
  externalTotalGross?: Maybe<TMoney>;
  type: Scalars['String'];
};

export type TSetStagedOrderParcelCustomField = {
  name: Scalars['String'];
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderParcelCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelCustomFieldOutput';
  name: Scalars['String'];
  parcelId?: Maybe<Scalars['String']>;
  parcelKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderParcelCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderParcelCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelCustomTypeOutput';
  custom: TCustomFieldsCommand;
  parcelId?: Maybe<Scalars['String']>;
  parcelKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderParcelItems = {
  items: Array<TDeliveryItemDraftType>;
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderParcelItemsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelItemsOutput';
  items: Array<TDeliveryItem>;
  parcelId?: Maybe<Scalars['String']>;
  parcelKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderParcelMeasurements = {
  measurements?: InputMaybe<TParcelMeasurementsDraftType>;
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderParcelMeasurementsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelMeasurementsOutput';
  measurements?: Maybe<TParcelMeasurements>;
  parcelId?: Maybe<Scalars['String']>;
  parcelKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderParcelTrackingData = {
  parcelId?: InputMaybe<Scalars['String']>;
  parcelKey?: InputMaybe<Scalars['String']>;
  trackingData?: InputMaybe<TTrackingDataDraftType>;
};

export type TSetStagedOrderParcelTrackingDataOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelTrackingDataOutput';
  parcelId?: Maybe<Scalars['String']>;
  parcelKey?: Maybe<Scalars['String']>;
  trackingData?: Maybe<TTrackingData>;
  type: Scalars['String'];
};

export type TSetStagedOrderPurchaseOrderNumber = {
  purchaseOrderNumber?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderPurchaseOrderNumberOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderPurchaseOrderNumberOutput';
  purchaseOrderNumber?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderReturnInfo = {
  items?: InputMaybe<Array<TReturnInfoDraftType>>;
};

export type TSetStagedOrderReturnInfoOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnInfoOutput';
  items: Array<TReturnInfoDraftTypeOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderReturnItemCustomField = {
  name: Scalars['String'];
  returnItemId?: InputMaybe<Scalars['String']>;
  returnItemKey?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderReturnItemCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnItemCustomFieldOutput';
  name: Scalars['String'];
  returnItemId?: Maybe<Scalars['String']>;
  returnItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderReturnItemCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  returnItemId?: InputMaybe<Scalars['String']>;
  returnItemKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderReturnItemCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnItemCustomTypeOutput';
  custom: TCustomFieldsCommand;
  returnItemId?: Maybe<Scalars['String']>;
  returnItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderReturnPaymentState = {
  paymentState: TReturnPaymentState;
  returnItemId?: InputMaybe<Scalars['String']>;
  returnItemKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderReturnPaymentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnPaymentStateOutput';
  paymentState: TReturnPaymentState;
  returnItemId?: Maybe<Scalars['String']>;
  returnItemKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderReturnShipmentState = {
  returnItemId?: InputMaybe<Scalars['String']>;
  returnItemKey?: InputMaybe<Scalars['String']>;
  shipmentState: TReturnShipmentState;
};

export type TSetStagedOrderReturnShipmentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnShipmentStateOutput';
  returnItemId?: Maybe<Scalars['String']>;
  returnItemKey?: Maybe<Scalars['String']>;
  shipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingAddress = {
  address?: InputMaybe<TAddressInput>;
};

export type TSetStagedOrderShippingAddressAndCustomShippingMethod = {
  address: TAddressInput;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderShippingAddressAndCustomShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressAndCustomShippingMethodOutput';
  address: TAddressDraft;
  externalTaxRate?: Maybe<TExternalTaxRateDraftOutput>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRate;
  taxCategoryResId?: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingAddressAndShippingMethod = {
  address: TAddressInput;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingMethod?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderShippingAddressAndShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressAndShippingMethodOutput';
  address: TAddressDraft;
  externalTaxRate?: Maybe<TExternalTaxRateDraftOutput>;
  shippingMethodResId?: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingAddressCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderShippingAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressCustomFieldOutput';
  name: Scalars['String'];
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderShippingAddressCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderShippingAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressCustomTypeOutput';
  custom: TCustomFieldsCommand;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressOutput';
  address?: Maybe<TAddressDraft>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingCustomField = {
  name: Scalars['String'];
  shippingKey?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderShippingCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingCustomFieldOutput';
  name: Scalars['String'];
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  value?: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderShippingCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  shippingKey?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderShippingCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingCustomTypeOutput';
  custom: TCustomFieldsCommand;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingMethod = {
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingMethod?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingMethodOutput';
  externalTaxRate?: Maybe<TExternalTaxRateDraftOutput>;
  shippingMethodResId?: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingMethodTaxAmount = {
  externalTaxAmount?: InputMaybe<TExternalTaxAmountDraft>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderShippingMethodTaxAmountOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingMethodTaxAmountOutput';
  externalTaxAmount?: Maybe<TExternalTaxAmountDraftOutput>;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingMethodTaxRate = {
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  shippingKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedOrderShippingMethodTaxRateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingMethodTaxRateOutput';
  externalTaxRate?: Maybe<TExternalTaxRateDraftOutput>;
  shippingKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingRateInput = {
  shippingRateInput?: InputMaybe<TShippingRateInputDraft>;
};

export type TSetStagedOrderShippingRateInputOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingRateInputOutput';
  shippingRateInput?: Maybe<TShippingRateInputDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderStore = {
  store?: InputMaybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderStoreOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderStoreOutput';
  storeResId?: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedQuoteCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStagedQuoteCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStagedQuoteSellerComment = {
  sellerComment?: InputMaybe<Scalars['String']>;
};

export type TSetStagedQuoteValidTo = {
  validTo?: InputMaybe<Scalars['DateTime']>;
};

export type TSetStandalonePriceCustomFields = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStandalonePriceDiscountedPrice = {
  discounted?: InputMaybe<TDiscountedProductPriceValueInput>;
};

export type TSetStandalonePriceKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetStandalonePriceTiers = {
  tiers: Array<TProductPriceTierInput>;
};

export type TSetStandalonePriceValidFrom = {
  validFrom?: InputMaybe<Scalars['DateTime']>;
};

export type TSetStandalonePriceValidFromAndUntil = {
  validFrom?: InputMaybe<Scalars['DateTime']>;
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type TSetStandalonePriceValidUntil = {
  validUntil?: InputMaybe<Scalars['DateTime']>;
};

export type TSetStateDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetStateName = {
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetStateRoles = {
  roles: Array<TStateRole>;
};

export type TSetStateTransitions = {
  transitions?: InputMaybe<Array<TResourceIdentifierInput>>;
};

export type TSetStoreCountries = {
  countries?: InputMaybe<Array<TStoreCountryInput>>;
};

export type TSetStoreCustomField = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type TSetStoreCustomType = {
  fields?: InputMaybe<Array<TCustomFieldInput>>;
  type?: InputMaybe<TResourceIdentifierInput>;
  typeId?: InputMaybe<Scalars['String']>;
  typeKey?: InputMaybe<Scalars['String']>;
};

export type TSetStoreDistributionChannels = {
  distributionChannels?: InputMaybe<Array<TResourceIdentifierInput>>;
};

export type TSetStoreLanguages = {
  languages?: InputMaybe<Array<Scalars['Locale']>>;
};

export type TSetStoreName = {
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetStoreProductSelections = {
  productSelections?: InputMaybe<Array<TProductSelectionSettingInActionInput>>;
};

export type TSetStoreSupplyChannels = {
  supplyChannels?: InputMaybe<Array<TResourceIdentifierInput>>;
};

export type TSetSubscriptionChanges = {
  changes: Array<TChangeSubscriptionInput>;
};

export type TSetSubscriptionKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetSubscriptionMessages = {
  messages: Array<TMessageSubscriptionInput>;
};

export type TSetTaxCategoryKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TSetType = TFieldType & {
  __typename?: 'SetType';
  elementType: TFieldType;
  name: Scalars['String'];
};

export type TSetTypeDescription = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetZoneDescription = {
  description?: InputMaybe<Scalars['String']>;
};

export type TSetZoneKey = {
  key?: InputMaybe<Scalars['String']>;
};

export enum TShipmentState {
  Backorder = 'Backorder',
  Delayed = 'Delayed',
  Delivered = 'Delivered',
  Partial = 'Partial',
  Pending = 'Pending',
  Ready = 'Ready',
  Shipped = 'Shipped'
}

export type TShipping = {
  __typename?: 'Shipping';
  shippingAddress?: Maybe<TAddress>;
  shippingCustomFields?: Maybe<TCustomFieldsType>;
  shippingInfo?: Maybe<TShippingInfo>;
  shippingKey?: Maybe<Scalars['String']>;
  shippingRateInput?: Maybe<TShippingRateInput>;
};

export type TShippingDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  deliveries?: InputMaybe<Array<TDeliveryDraft>>;
  externalTaxRate?: InputMaybe<TExternalTaxRateDraft>;
  key: Scalars['String'];
  shippingAddress: TAddressInput;
  shippingMethod?: InputMaybe<TResourceIdentifierInput>;
  shippingRateInput?: InputMaybe<TShippingRateInputDraft>;
};

export type TShippingInfo = {
  __typename?: 'ShippingInfo';
  deliveries: Array<TDelivery>;
  discountedPrice?: Maybe<TDiscountedLineItemPrice>;
  price: TMoney;
  shippingMethod?: Maybe<TShippingMethod>;
  shippingMethodName: Scalars['String'];
  shippingMethodRef?: Maybe<TReference>;
  shippingMethodState: TShippingMethodState;
  shippingRate: TShippingRate;
  taxCategory?: Maybe<TTaxCategory>;
  taxCategoryRef?: Maybe<TReference>;
  taxRate?: Maybe<TTaxRate>;
  taxedPrice?: Maybe<TTaxedItemPrice>;
};

export type TShippingInfoImportDraft = {
  deliveries?: Array<TDeliveryDraft>;
  discountedPrice?: InputMaybe<TDiscountedLineItemPriceDraft>;
  price: TMoneyInput;
  shippingMethod?: InputMaybe<TResourceIdentifierInput>;
  shippingMethodName: Scalars['String'];
  shippingMethodState?: TShippingMethodState;
  shippingRate: TShippingRateDraft;
  taxCategory?: InputMaybe<TResourceIdentifierInput>;
  taxRate?: InputMaybe<TTaxRateInput>;
};

export type TShippingMethod = TReferenceExpandable & TVersioned & {
  __typename?: 'ShippingMethod';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  isDefault: Scalars['Boolean'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  localizedDescription?: Maybe<Scalars['String']>;
  localizedDescriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  localizedName?: Maybe<Scalars['String']>;
  localizedNameAllLocales?: Maybe<Array<TLocalizedString>>;
  name: Scalars['String'];
  predicate?: Maybe<Scalars['String']>;
  taxCategory?: Maybe<TTaxCategory>;
  taxCategoryRef?: Maybe<TReference>;
  version: Scalars['Long'];
  zoneRates: Array<TZoneRate>;
};


export type TShippingMethod_LocalizedDescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TShippingMethod_LocalizedNameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TShippingMethodDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  /** The usage of parameter 'description' is deprecated in favor of using 'localizedDescription' */
  description?: InputMaybe<Scalars['String']>;
  isDefault: Scalars['Boolean'];
  key?: InputMaybe<Scalars['String']>;
  localizedDescription?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  localizedName?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  name: Scalars['String'];
  predicate?: InputMaybe<Scalars['String']>;
  taxCategory: TResourceIdentifierInput;
  zoneRates?: InputMaybe<Array<TZoneRateDraft>>;
};

export type TShippingMethodLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ShippingMethodLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TShippingMethodLimitsProjection = {
  __typename?: 'ShippingMethodLimitsProjection';
  total: TShippingMethodLimitWithCurrent;
};

export type TShippingMethodQueryResult = {
  __typename?: 'ShippingMethodQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TShippingMethod>;
  total: Scalars['Long'];
};

export enum TShippingMethodState {
  /** The ShippingMethod predicate does not match the cart. Ordering this cart will fail with error ShippingMethodDoesNotMatchCart */
  DoesNotMatchCart = 'DoesNotMatchCart',
  /** Either there is no predicate defined for the ShippingMethod or the given predicate matches the cart */
  MatchesCart = 'MatchesCart'
}

export type TShippingMethodUpdateAction = {
  addShippingRate?: InputMaybe<TAddShippingMethodShippingRate>;
  addZone?: InputMaybe<TAddShippingMethodZone>;
  changeIsDefault?: InputMaybe<TChangeShippingMethodIsDefault>;
  changeName?: InputMaybe<TChangeShippingMethodName>;
  changeTaxCategory?: InputMaybe<TChangeShippingMethodTaxCategory>;
  removeShippingRate?: InputMaybe<TRemoveShippingMethodShippingRate>;
  removeZone?: InputMaybe<TRemoveShippingMethodZone>;
  setCustomField?: InputMaybe<TSetShippingMethodCustomField>;
  setCustomType?: InputMaybe<TSetShippingMethodCustomType>;
  /** This action is deprecated in favor of using 'setLocalizedDescription' */
  setDescription?: InputMaybe<TSetShippingMethodDescription>;
  setKey?: InputMaybe<TSetShippingMethodKey>;
  setLocalizedDescription?: InputMaybe<TSetShippingMethodLocalizedDescription>;
  setLocalizedName?: InputMaybe<TSetShippingMethodLocalizedName>;
  setPredicate?: InputMaybe<TSetShippingMethodPredicate>;
};

/** A field to retrieve available shipping methods for a cart. */
export type TShippingMethodsByCartInterface = {
  shippingMethodsByCart: Array<TShippingMethod>;
};


/** A field to retrieve available shipping methods for a cart. */
export type TShippingMethodsByCartInterface_ShippingMethodsByCartArgs = {
  id: Scalars['String'];
};

export enum TShippingMode {
  /** Allows multiple shipping methods for the cart with their respective shipping addresses */
  Multiple = 'Multiple',
  /** Allows only one shipping method and shipping address for the cart */
  Single = 'Single'
}

/** Shipping Rate */
export type TShippingRate = {
  __typename?: 'ShippingRate';
  freeAbove?: Maybe<TMoney>;
  isMatching?: Maybe<Scalars['Boolean']>;
  price: TMoney;
  tiers: Array<TShippingRatePriceTier>;
};

export type TShippingRateCartClassificationPriceTier = TShippingRatePriceTier & {
  __typename?: 'ShippingRateCartClassificationPriceTier';
  isMatching?: Maybe<Scalars['Boolean']>;
  price: TMoney;
  type: Scalars['String'];
  value: Scalars['String'];
};

export type TShippingRateCartScorePriceTier = TShippingRatePriceTier & {
  __typename?: 'ShippingRateCartScorePriceTier';
  isMatching?: Maybe<Scalars['Boolean']>;
  price?: Maybe<TMoney>;
  priceFunction?: Maybe<TPriceFunction>;
  score: Scalars['Int'];
  type: Scalars['String'];
};

export type TShippingRateCartValuePriceTier = TShippingRatePriceTier & {
  __typename?: 'ShippingRateCartValuePriceTier';
  isMatching?: Maybe<Scalars['Boolean']>;
  minimumCentAmount: Scalars['Int'];
  price: TMoney;
  type: Scalars['String'];
};

export type TShippingRateDraft = {
  freeAbove?: InputMaybe<TMoneyDraft>;
  price: TMoneyDraft;
  tiers?: InputMaybe<Array<TShippingRatePriceTierDraft>>;
};

export type TShippingRateInput = {
  type: Scalars['String'];
};

export type TShippingRateInputDraft = {
  Classification?: InputMaybe<TClassificationShippingRateInputDraft>;
  Score?: InputMaybe<TScoreShippingRateInputDraft>;
};

export type TShippingRateInputDraftOutput = {
  type: Scalars['String'];
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

export type TShippingRateInputTypeInput = {
  CartClassification?: InputMaybe<TCartClassificationInput>;
  CartScore?: InputMaybe<TCartScoreInput>;
  CartValue?: InputMaybe<TCartValueInput>;
};

export type TShippingRatePriceTier = {
  type: Scalars['String'];
};

export type TShippingRatePriceTierCartClassificationDraft = {
  price: TMoneyDraft;
  value: Scalars['String'];
};

export type TShippingRatePriceTierCartScoreDraft = {
  price?: InputMaybe<TMoneyDraft>;
  priceFunction?: InputMaybe<TPriceFunctionDraft>;
  score: Scalars['Int'];
};

export type TShippingRatePriceTierCartValueDraft = {
  minimumCentAmount: Scalars['Int'];
  price: TMoneyDraft;
};

export type TShippingRatePriceTierDraft = {
  CartClassification?: InputMaybe<TShippingRatePriceTierCartClassificationDraft>;
  CartScore?: InputMaybe<TShippingRatePriceTierCartScoreDraft>;
  CartValue?: InputMaybe<TShippingRatePriceTierCartValueDraft>;
};

export type TShippingTarget = TCartDiscountTarget & {
  __typename?: 'ShippingTarget';
  type: Scalars['String'];
};

export type TShippingTargetDraft = {
  addressKey: Scalars['String'];
  quantity: Scalars['Long'];
  shippingMethodKey?: InputMaybe<Scalars['String']>;
};

export type TShippingTargetDraftType = {
  addressKey: Scalars['String'];
  quantity: Scalars['Long'];
  shippingMethodKey?: InputMaybe<Scalars['String']>;
};

export type TShippingTargetInput = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TShoppingList = TReferenceExpandable & TVersioned & {
  __typename?: 'ShoppingList';
  anonymousId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customer?: Maybe<TCustomer>;
  customerRef?: Maybe<TReference>;
  deleteDaysAfterLastModification?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  lineItems: Array<TShoppingListLineItem>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  slug?: Maybe<Scalars['String']>;
  slugAllLocales?: Maybe<Array<TLocalizedString>>;
  store?: Maybe<TStore>;
  storeRef?: Maybe<TKeyReference>;
  textLineItems: Array<TTextLineItem>;
  version: Scalars['Long'];
};


export type TShoppingList_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TShoppingList_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TShoppingList_SlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TShoppingListDraft = {
  anonymousId?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  customer?: InputMaybe<TResourceIdentifierInput>;
  deleteDaysAfterLastModification?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  key?: InputMaybe<Scalars['String']>;
  lineItems?: InputMaybe<Array<TShoppingListLineItemDraft>>;
  name: Array<TLocalizedStringItemInputType>;
  slug?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  textLineItems?: InputMaybe<Array<TTextLineItemDraft>>;
};

export type TShoppingListLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ShoppingListLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TShoppingListLimitsProjection = {
  __typename?: 'ShoppingListLimitsProjection';
  lineItems: TLimit;
  textLineItems: TLimit;
  total: TShoppingListLimitWithCurrent;
};

export type TShoppingListLineItem = {
  __typename?: 'ShoppingListLineItem';
  addedAt: Scalars['DateTime'];
  custom?: Maybe<TCustomFieldsType>;
  deactivatedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  productId: Scalars['String'];
  productSlug?: Maybe<Scalars['String']>;
  productSlugAllLocales?: Maybe<Array<TLocalizedString>>;
  productType: TProductTypeDefinition;
  productTypeRef: TReference;
  quantity: Scalars['Int'];
  variant?: Maybe<TProductVariant>;
  variantId?: Maybe<Scalars['Int']>;
};


export type TShoppingListLineItem_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TShoppingListLineItem_ProductSlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TShoppingListLineItemDraft = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  key?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  sku?: InputMaybe<Scalars['String']>;
  variantId?: InputMaybe<Scalars['Int']>;
};

/** Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists. */
export type TShoppingListQueryInterface = {
  shoppingList?: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
};


/** Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists. */
export type TShoppingListQueryInterface_ShoppingListArgs = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
};


/** Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists. */
export type TShoppingListQueryInterface_ShoppingListsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<Scalars['String']>>;
  where?: InputMaybe<Scalars['String']>;
};

export type TShoppingListQueryResult = {
  __typename?: 'ShoppingListQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TShoppingList>;
  total: Scalars['Long'];
};

export type TShoppingListUpdateAction = {
  addLineItem?: InputMaybe<TAddShoppingListLineItem>;
  addTextLineItem?: InputMaybe<TAddShoppingListTextLineItem>;
  changeLineItemQuantity?: InputMaybe<TChangeShoppingListLineItemQuantity>;
  changeLineItemsOrder?: InputMaybe<TChangeShoppingListLineItemsOrder>;
  changeName?: InputMaybe<TChangeShoppingListName>;
  changeTextLineItemName?: InputMaybe<TChangeShoppingListTextLineItemName>;
  changeTextLineItemQuantity?: InputMaybe<TChangeShoppingListTextLineItemQuantity>;
  changeTextLineItemsOrder?: InputMaybe<TChangeShoppingListTextLineItemsOrder>;
  removeLineItem?: InputMaybe<TRemoveShoppingListLineItem>;
  removeTextLineItem?: InputMaybe<TRemoveShoppingListTextLineItem>;
  setAnonymousId?: InputMaybe<TSetShoppingListAnonymousId>;
  setCustomField?: InputMaybe<TSetShoppingListCustomField>;
  setCustomType?: InputMaybe<TSetShoppingListCustomType>;
  setCustomer?: InputMaybe<TSetShoppingListCustomer>;
  setDeleteDaysAfterLastModification?: InputMaybe<TSetShoppingListDeleteDaysAfterLastModification>;
  setDescription?: InputMaybe<TSetShoppingListDescription>;
  setKey?: InputMaybe<TSetShoppingListKey>;
  setLineItemCustomField?: InputMaybe<TSetShoppingListLineItemCustomField>;
  setLineItemCustomType?: InputMaybe<TSetShoppingListLineItemCustomType>;
  setSlug?: InputMaybe<TSetShoppingListSlug>;
  setStore?: InputMaybe<TSetShoppingListStore>;
  setTextLineItemCustomField?: InputMaybe<TSetShoppingListTextLineItemCustomField>;
  setTextLineItemCustomType?: InputMaybe<TSetShoppingListTextLineItemCustomType>;
  setTextLineItemDescription?: InputMaybe<TSetShoppingListTextLineItemDescription>;
};

export type TShoppingListsConfiguration = {
  __typename?: 'ShoppingListsConfiguration';
  deleteDaysAfterLastModification?: Maybe<Scalars['Int']>;
};

export type TShoppingListsConfigurationInput = {
  deleteDaysAfterLastModification?: InputMaybe<Scalars['Int']>;
};

export type TSignUpInMyBusinessUnitDraft = {
  associateRoleAssignments: Array<TAssociateRoleAssignmentDraft>;
  businessUnit: TResourceIdentifierInput;
  customer: TCustomerSignUpDraft;
  version: Scalars['Long'];
};

export type TSimpleAttributeTypeDraft = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TSimpleFieldTypeDraft = {
  dummy?: InputMaybe<Scalars['String']>;
};

/** Describes how this discount interacts with other discounts */
export enum TStackingMode {
  /** Default. Continue applying other matching discounts after applying this one. */
  Stacking = 'Stacking',
  /** Don’t apply any more matching discounts after this one. */
  StopAfterThisDiscount = 'StopAfterThisDiscount'
}

export type TStagedOrderUpdateAction = {
  addCustomLineItem?: InputMaybe<TAddStagedOrderCustomLineItem>;
  addDelivery?: InputMaybe<TAddStagedOrderDelivery>;
  addDiscountCode?: InputMaybe<TAddStagedOrderDiscountCode>;
  addItemShippingAddress?: InputMaybe<TAddStagedOrderItemShippingAddress>;
  addLineItem?: InputMaybe<TAddStagedOrderLineItem>;
  addParcelToDelivery?: InputMaybe<TAddStagedOrderParcelToDelivery>;
  addPayment?: InputMaybe<TAddStagedOrderPayment>;
  addReturnInfo?: InputMaybe<TAddStagedOrderReturnInfo>;
  addShoppingList?: InputMaybe<TAddStagedOrderShoppingList>;
  changeCustomLineItemMoney?: InputMaybe<TChangeStagedOrderCustomLineItemMoney>;
  changeCustomLineItemQuantity?: InputMaybe<TChangeStagedOrderCustomLineItemQuantity>;
  changeLineItemQuantity?: InputMaybe<TChangeStagedOrderLineItemQuantity>;
  changeOrderState?: InputMaybe<TChangeStagedOrderOrderState>;
  changePaymentState?: InputMaybe<TChangeStagedOrderPaymentState>;
  changeShipmentState?: InputMaybe<TChangeStagedOrderShipmentState>;
  changeTaxCalculationMode?: InputMaybe<TChangeStagedOrderTaxCalculationMode>;
  changeTaxMode?: InputMaybe<TChangeStagedOrderTaxMode>;
  changeTaxRoundingMode?: InputMaybe<TChangeStagedOrderTaxRoundingMode>;
  importCustomLineItemState?: InputMaybe<TImportStagedOrderCustomLineItemState>;
  importLineItemState?: InputMaybe<TImportStagedOrderLineItemState>;
  recalculate?: InputMaybe<TRecalculateStagedOrder>;
  removeCustomLineItem?: InputMaybe<TRemoveStagedOrderCustomLineItem>;
  removeDelivery?: InputMaybe<TRemoveStagedOrderDelivery>;
  removeDiscountCode?: InputMaybe<TRemoveStagedOrderDiscountCode>;
  removeItemShippingAddress?: InputMaybe<TRemoveStagedOrderItemShippingAddress>;
  removeLineItem?: InputMaybe<TRemoveStagedOrderLineItem>;
  removeParcelFromDelivery?: InputMaybe<TRemoveStagedOrderParcelFromDelivery>;
  removePayment?: InputMaybe<TRemoveStagedOrderPayment>;
  setBillingAddress?: InputMaybe<TSetStagedOrderBillingAddress>;
  setBillingAddressCustomField?: InputMaybe<TSetStagedOrderBillingAddressCustomField>;
  setBillingAddressCustomType?: InputMaybe<TSetStagedOrderBillingAddressCustomType>;
  setCountry?: InputMaybe<TSetStagedOrderCountry>;
  setCustomField?: InputMaybe<TSetStagedOrderCustomField>;
  setCustomLineItemCustomField?: InputMaybe<TSetStagedOrderCustomLineItemCustomField>;
  setCustomLineItemCustomType?: InputMaybe<TSetStagedOrderCustomLineItemCustomType>;
  setCustomLineItemShippingDetails?: InputMaybe<TSetStagedOrderCustomLineItemShippingDetails>;
  setCustomLineItemTaxAmount?: InputMaybe<TSetStagedOrderCustomLineItemTaxAmount>;
  setCustomLineItemTaxRate?: InputMaybe<TSetStagedOrderCustomLineItemTaxRate>;
  setCustomShippingMethod?: InputMaybe<TSetStagedOrderCustomShippingMethod>;
  setCustomType?: InputMaybe<TSetStagedOrderCustomType>;
  setCustomerEmail?: InputMaybe<TSetStagedOrderCustomerEmail>;
  setCustomerGroup?: InputMaybe<TSetStagedOrderCustomerGroup>;
  setCustomerId?: InputMaybe<TSetStagedOrderCustomerId>;
  setDeliveryAddress?: InputMaybe<TSetStagedOrderDeliveryAddress>;
  setDeliveryAddressCustomField?: InputMaybe<TSetStagedOrderDeliveryAddressCustomField>;
  setDeliveryAddressCustomType?: InputMaybe<TSetStagedOrderDeliveryAddressCustomType>;
  setDeliveryCustomField?: InputMaybe<TSetStagedOrderDeliveryCustomField>;
  setDeliveryCustomType?: InputMaybe<TSetStagedOrderDeliveryCustomType>;
  setDeliveryItems?: InputMaybe<TSetStagedOrderDeliveryItems>;
  setDirectDiscounts?: InputMaybe<TSetStagedOrderDirectDiscounts>;
  setItemShippingAddressCustomField?: InputMaybe<TSetStagedOrderItemShippingAddressCustomField>;
  setItemShippingAddressCustomType?: InputMaybe<TSetStagedOrderItemShippingAddressCustomType>;
  setLineItemCustomField?: InputMaybe<TSetStagedOrderLineItemCustomField>;
  setLineItemCustomType?: InputMaybe<TSetStagedOrderLineItemCustomType>;
  setLineItemDistributionChannel?: InputMaybe<TSetStagedOrderLineItemDistributionChannel>;
  setLineItemPrice?: InputMaybe<TSetStagedOrderLineItemPrice>;
  setLineItemShippingDetails?: InputMaybe<TSetStagedOrderLineItemShippingDetails>;
  setLineItemTaxAmount?: InputMaybe<TSetStagedOrderLineItemTaxAmount>;
  setLineItemTaxRate?: InputMaybe<TSetStagedOrderLineItemTaxRate>;
  setLineItemTotalPrice?: InputMaybe<TSetStagedOrderLineItemTotalPrice>;
  setLocale?: InputMaybe<TSetStagedOrderLocale>;
  setOrderNumber?: InputMaybe<TSetStagedOrderOrderNumber>;
  setOrderTotalTax?: InputMaybe<TSetStagedOrderOrderTotalTax>;
  setParcelCustomField?: InputMaybe<TSetStagedOrderParcelCustomField>;
  setParcelCustomType?: InputMaybe<TSetStagedOrderParcelCustomType>;
  setParcelItems?: InputMaybe<TSetStagedOrderParcelItems>;
  setParcelMeasurements?: InputMaybe<TSetStagedOrderParcelMeasurements>;
  setParcelTrackingData?: InputMaybe<TSetStagedOrderParcelTrackingData>;
  setPurchaseOrderNumber?: InputMaybe<TSetStagedOrderPurchaseOrderNumber>;
  setReturnInfo?: InputMaybe<TSetStagedOrderReturnInfo>;
  setReturnItemCustomField?: InputMaybe<TSetStagedOrderReturnItemCustomField>;
  setReturnItemCustomType?: InputMaybe<TSetStagedOrderReturnItemCustomType>;
  setReturnPaymentState?: InputMaybe<TSetStagedOrderReturnPaymentState>;
  setReturnShipmentState?: InputMaybe<TSetStagedOrderReturnShipmentState>;
  setShippingAddress?: InputMaybe<TSetStagedOrderShippingAddress>;
  setShippingAddressAndCustomShippingMethod?: InputMaybe<TSetStagedOrderShippingAddressAndCustomShippingMethod>;
  setShippingAddressAndShippingMethod?: InputMaybe<TSetStagedOrderShippingAddressAndShippingMethod>;
  setShippingAddressCustomField?: InputMaybe<TSetStagedOrderShippingAddressCustomField>;
  setShippingAddressCustomType?: InputMaybe<TSetStagedOrderShippingAddressCustomType>;
  setShippingCustomField?: InputMaybe<TSetStagedOrderShippingCustomField>;
  setShippingCustomType?: InputMaybe<TSetStagedOrderShippingCustomType>;
  setShippingMethod?: InputMaybe<TSetStagedOrderShippingMethod>;
  setShippingMethodTaxAmount?: InputMaybe<TSetStagedOrderShippingMethodTaxAmount>;
  setShippingMethodTaxRate?: InputMaybe<TSetStagedOrderShippingMethodTaxRate>;
  setShippingRateInput?: InputMaybe<TSetStagedOrderShippingRateInput>;
  setStore?: InputMaybe<TSetStagedOrderStore>;
  transitionCustomLineItemState?: InputMaybe<TTransitionStagedOrderCustomLineItemState>;
  transitionLineItemState?: InputMaybe<TTransitionStagedOrderLineItemState>;
  transitionState?: InputMaybe<TTransitionStagedOrderState>;
  updateItemShippingAddress?: InputMaybe<TUpdateStagedOrderItemShippingAddress>;
  updateSyncInfo?: InputMaybe<TUpdateStagedOrderSyncInfo>;
};

export type TStagedOrderUpdateActionOutput = {
  type: Scalars['String'];
};

export type TStagedPriceDraft = {
  value: TBaseMoneyInput;
};

export type TStagedQuote = TVersioned & {
  __typename?: 'StagedQuote';
  businessUnit?: Maybe<TBusinessUnit>;
  businessUnitRef?: Maybe<TKeyReference>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customer?: Maybe<TCustomer>;
  customerRef?: Maybe<TReference>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  purchaseOrderNumber?: Maybe<Scalars['String']>;
  quotationCart?: Maybe<TCart>;
  quotationCartRef: TReference;
  quoteRequest?: Maybe<TQuoteRequest>;
  quoteRequestRef: TReference;
  sellerComment?: Maybe<Scalars['String']>;
  stagedQuoteState: TStagedQuoteState;
  state?: Maybe<TState>;
  stateRef?: Maybe<TReference>;
  validTo?: Maybe<Scalars['DateTime']>;
  version: Scalars['Long'];
};

export type TStagedQuoteCreated = TMessagePayload & {
  __typename?: 'StagedQuoteCreated';
  stagedQuote: TStagedQuote;
  type: Scalars['String'];
};

export type TStagedQuoteDeleted = TMessagePayload & {
  __typename?: 'StagedQuoteDeleted';
  type: Scalars['String'];
};

export type TStagedQuoteDraft = {
  custom?: InputMaybe<TCustomFieldsDraft>;
  key?: InputMaybe<Scalars['String']>;
  quoteRequest?: InputMaybe<TResourceIdentifierInput>;
  quoteRequestStateToAccepted?: InputMaybe<Scalars['Boolean']>;
  quoteRequestVersion?: InputMaybe<Scalars['Long']>;
  state?: InputMaybe<TReferenceInput>;
};

export type TStagedQuoteQueryResult = {
  __typename?: 'StagedQuoteQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TStagedQuote>;
  total: Scalars['Long'];
};

export type TStagedQuoteSellerCommentSet = TMessagePayload & {
  __typename?: 'StagedQuoteSellerCommentSet';
  sellerComment?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export enum TStagedQuoteState {
  Closed = 'Closed',
  InProgress = 'InProgress',
  Sent = 'Sent'
}

export type TStagedQuoteStateChanged = TMessagePayload & {
  __typename?: 'StagedQuoteStateChanged';
  oldStagedQuoteState: TStagedQuoteState;
  stagedQuoteState: TStagedQuoteState;
  type: Scalars['String'];
};

export type TStagedQuoteStateTransition = TMessagePayload & {
  __typename?: 'StagedQuoteStateTransition';
  force: Scalars['Boolean'];
  oldState?: Maybe<TState>;
  oldStateRef?: Maybe<TReference>;
  state?: Maybe<TState>;
  stateRef: TReference;
  type: Scalars['String'];
};

export type TStagedQuoteUpdateAction = {
  changeStagedQuoteState?: InputMaybe<TChangeStagedQuoteState>;
  setCustomField?: InputMaybe<TSetStagedQuoteCustomField>;
  setCustomType?: InputMaybe<TSetStagedQuoteCustomType>;
  setSellerComment?: InputMaybe<TSetStagedQuoteSellerComment>;
  setValidTo?: InputMaybe<TSetStagedQuoteValidTo>;
  transitionState?: InputMaybe<TTransitionStagedQuoteState>;
};

export type TStagedQuoteValidToSet = TMessagePayload & {
  __typename?: 'StagedQuoteValidToSet';
  type: Scalars['String'];
  validTo?: Maybe<Scalars['DateTime']>;
};

export type TStagedStandalonePrice = {
  __typename?: 'StagedStandalonePrice';
  discounted?: Maybe<TDiscountedProductPriceValue>;
  value: TBaseMoney;
};

/**
 * StandalonePrices are managed and queried through the StandalonePrices API
 * and associated to a ProductVariant through the sku field.
 */
export type TStandalonePrice = TVersioned & {
  __typename?: 'StandalonePrice';
  active: Scalars['Boolean'];
  channel?: Maybe<TChannel>;
  channelRef?: Maybe<TReference>;
  country?: Maybe<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  customerGroup?: Maybe<TCustomerGroup>;
  customerGroupRef?: Maybe<TReference>;
  discounted?: Maybe<TDiscountedProductPriceValue>;
  expiresAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  sku: Scalars['String'];
  staged?: Maybe<TStagedStandalonePrice>;
  tiers?: Maybe<Array<TProductPriceTier>>;
  validFrom?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
  value: TBaseMoney;
  version: Scalars['Long'];
};

export type TStandalonePriceActiveChanged = TMessagePayload & {
  __typename?: 'StandalonePriceActiveChanged';
  active: Scalars['Boolean'];
  oldActive: Scalars['Boolean'];
  type: Scalars['String'];
};

export type TStandalonePriceCreated = TMessagePayload & {
  __typename?: 'StandalonePriceCreated';
  standalonePrice: TStandalonePrice;
  type: Scalars['String'];
};

export type TStandalonePriceDeleted = TMessagePayload & {
  __typename?: 'StandalonePriceDeleted';
  sku?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TStandalonePriceDiscountSet = TMessagePayload & {
  __typename?: 'StandalonePriceDiscountSet';
  discounted?: Maybe<TDiscountedProductPriceValue>;
  type: Scalars['String'];
};

/** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
export type TStandalonePriceExpiresAtSet = TMessagePayload & {
  __typename?: 'StandalonePriceExpiresAtSet';
  expiresAt?: Maybe<Scalars['DateTime']>;
  type: Scalars['String'];
};

export type TStandalonePriceExternalDiscountSet = TMessagePayload & {
  __typename?: 'StandalonePriceExternalDiscountSet';
  discounted?: Maybe<TDiscountedProductPriceValue>;
  type: Scalars['String'];
};

export type TStandalonePriceKeySet = TMessagePayload & {
  __typename?: 'StandalonePriceKeySet';
  key?: Maybe<Scalars['String']>;
  oldKey?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TStandalonePriceQueryResult = {
  __typename?: 'StandalonePriceQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TStandalonePrice>;
  total: Scalars['Long'];
};

export type TStandalonePriceStagedChangesApplied = TMessagePayload & {
  __typename?: 'StandalonePriceStagedChangesApplied';
  stagedChanges: TStagedStandalonePrice;
  type: Scalars['String'];
};

export type TStandalonePriceStagedChangesRemoved = TMessagePayload & {
  __typename?: 'StandalonePriceStagedChangesRemoved';
  stagedChanges?: Maybe<TStagedStandalonePrice>;
  type: Scalars['String'];
};

export type TStandalonePriceTierAdded = TMessagePayload & {
  __typename?: 'StandalonePriceTierAdded';
  tier: TProductPriceTier;
  type: Scalars['String'];
};

export type TStandalonePriceTierRemoved = TMessagePayload & {
  __typename?: 'StandalonePriceTierRemoved';
  tier: TProductPriceTier;
  type: Scalars['String'];
};

export type TStandalonePriceTiersSet = TMessagePayload & {
  __typename?: 'StandalonePriceTiersSet';
  previousTiers: Array<TProductPriceTier>;
  tiers: Array<TProductPriceTier>;
  type: Scalars['String'];
};

export type TStandalonePriceUpdateAction = {
  addPriceTier?: InputMaybe<TAddStandalonePriceTier>;
  applyStagedChanges?: InputMaybe<TApplyStagedChanges>;
  changeActive?: InputMaybe<TChangeStandalonePriceActive>;
  changeValue?: InputMaybe<TChangeStandalonePriceValue>;
  removePriceTier?: InputMaybe<TRemoveStandalonePriceTier>;
  removeStagedChanges?: InputMaybe<TRemoveStagedChanges>;
  setCustomField?: InputMaybe<TSetStandalonePriceCustomFields>;
  setCustomType?: InputMaybe<TCustomFieldsDraft>;
  setDiscountedPrice?: InputMaybe<TSetStandalonePriceDiscountedPrice>;
  setKey?: InputMaybe<TSetStandalonePriceKey>;
  setPriceTiers?: InputMaybe<TSetStandalonePriceTiers>;
  setValidFrom?: InputMaybe<TSetStandalonePriceValidFrom>;
  setValidFromAndUntil?: InputMaybe<TSetStandalonePriceValidFromAndUntil>;
  setValidUntil?: InputMaybe<TSetStandalonePriceValidUntil>;
};

export type TStandalonePriceValidFromAndUntilSet = TMessagePayload & {
  __typename?: 'StandalonePriceValidFromAndUntilSet';
  previousValidFrom?: Maybe<Scalars['DateTime']>;
  previousValidUntil?: Maybe<Scalars['DateTime']>;
  type: Scalars['String'];
  validFrom?: Maybe<Scalars['DateTime']>;
  validUntil?: Maybe<Scalars['DateTime']>;
};

export type TStandalonePriceValidFromSet = TMessagePayload & {
  __typename?: 'StandalonePriceValidFromSet';
  previousValidFrom?: Maybe<Scalars['DateTime']>;
  type: Scalars['String'];
  validFrom?: Maybe<Scalars['DateTime']>;
};

export type TStandalonePriceValidUntilSet = TMessagePayload & {
  __typename?: 'StandalonePriceValidUntilSet';
  previousValidUntil?: Maybe<Scalars['DateTime']>;
  type: Scalars['String'];
  validUntil?: Maybe<Scalars['DateTime']>;
};

export type TStandalonePriceValueChanged = TMessagePayload & {
  __typename?: 'StandalonePriceValueChanged';
  oldValue?: Maybe<TBaseMoney>;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  value: TBaseMoney;
};

/** [State](https://docs.commercetools.com/api/projects/states) */
export type TState = TReferenceExpandable & TVersioned & {
  __typename?: 'State';
  builtIn: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  initial: Scalars['Boolean'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedString>>;
  roles: Array<TStateRole>;
  transitions?: Maybe<Array<TState>>;
  transitionsRef?: Maybe<Array<TReference>>;
  type: TStateType;
  version: Scalars['Long'];
};


/** [State](https://docs.commercetools.com/api/projects/states) */
export type TState_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


/** [State](https://docs.commercetools.com/api/projects/states) */
export type TState_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TStateDraft = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  initial?: InputMaybe<Scalars['Boolean']>;
  key: Scalars['String'];
  name?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  roles?: InputMaybe<Array<TStateRole>>;
  transitions?: InputMaybe<Array<TReferenceInput>>;
  type: TStateType;
};

export type TStateQueryResult = {
  __typename?: 'StateQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TState>;
  total: Scalars['Long'];
};

export enum TStateRole {
  Return = 'Return',
  ReviewIncludedInStatistics = 'ReviewIncludedInStatistics'
}

export enum TStateType {
  LineItemState = 'LineItemState',
  OrderState = 'OrderState',
  PaymentState = 'PaymentState',
  ProductState = 'ProductState',
  QuoteRequestState = 'QuoteRequestState',
  QuoteState = 'QuoteState',
  ReviewState = 'ReviewState',
  StagedQuoteState = 'StagedQuoteState'
}

export type TStateUpdateAction = {
  addRoles?: InputMaybe<TAddStateRoles>;
  changeInitial?: InputMaybe<TChangeStateInitial>;
  changeKey?: InputMaybe<TChangeStateKey>;
  changeType?: InputMaybe<TChangeStateType>;
  removeRoles?: InputMaybe<TRemoveStateRoles>;
  setDescription?: InputMaybe<TSetStateDescription>;
  setName?: InputMaybe<TSetStateName>;
  setRoles?: InputMaybe<TSetStateRoles>;
  setTransitions?: InputMaybe<TSetStateTransitions>;
};

/** Stores allow defining different contexts for a project. */
export type TStore = TReferenceExpandable & TVersioned & {
  __typename?: 'Store';
  countries?: Maybe<Array<TStoreCountry>>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  custom?: Maybe<TCustomFieldsType>;
  distributionChannels: Array<TChannel>;
  distributionChannelsRef: Array<TReference>;
  id: Scalars['String'];
  key: Scalars['String'];
  languages?: Maybe<Array<Scalars['Locale']>>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedString>>;
  productSelections: Array<TProductSelectionSetting>;
  supplyChannels: Array<TChannel>;
  supplyChannelsRef: Array<TReference>;
  version: Scalars['Long'];
};


/** Stores allow defining different contexts for a project. */
export type TStore_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TStoreCountriesChanged = TMessagePayload & {
  __typename?: 'StoreCountriesChanged';
  addedCountries?: Maybe<Array<TStoreCountry>>;
  removedCountries?: Maybe<Array<TStoreCountry>>;
  type: Scalars['String'];
};

export type TStoreCountry = {
  __typename?: 'StoreCountry';
  code: Scalars['Country'];
};

export type TStoreCountryInput = {
  code: Scalars['Country'];
};

export type TStoreCreated = TMessagePayload & {
  __typename?: 'StoreCreated';
  countries?: Maybe<Array<TStoreCountry>>;
  custom?: Maybe<TCustomFieldsType>;
  distributionChannels: Array<TChannel>;
  distributionChannelsRef: Array<TReference>;
  languages: Array<Scalars['Locale']>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedString>>;
  productSelections: Array<TProductSelectionSetting>;
  productSelectionsRef: Array<TReference>;
  supplyChannels: Array<TChannel>;
  supplyChannelsRef: Array<TReference>;
  type: Scalars['String'];
};


export type TStoreCreated_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TStoreDeleted = TMessagePayload & {
  __typename?: 'StoreDeleted';
  type: Scalars['String'];
};

export type TStoreDistributionChannelsChanged = TMessagePayload & {
  __typename?: 'StoreDistributionChannelsChanged';
  addedDistributionChannels?: Maybe<Array<TChannel>>;
  addedDistributionChannelsRef?: Maybe<Array<TReference>>;
  removedDistributionChannels?: Maybe<Array<TChannel>>;
  removedDistributionChannelsRef?: Maybe<Array<TReference>>;
  type: Scalars['String'];
};

export type TStoreLanguagesChanged = TMessagePayload & {
  __typename?: 'StoreLanguagesChanged';
  addedLanguages?: Maybe<Array<Scalars['Locale']>>;
  removedLanguages?: Maybe<Array<Scalars['Locale']>>;
  type: Scalars['String'];
};

export type TStoreLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'StoreLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TStoreLimitsProjection = {
  __typename?: 'StoreLimitsProjection';
  inventorySupplyChannels: TLimit;
  productDistributionChannels: TLimit;
  productSelections: TLimit;
  total: TStoreLimitWithCurrent;
};

export type TStoreNameSet = TMessagePayload & {
  __typename?: 'StoreNameSet';
  name?: Maybe<Scalars['String']>;
  nameAllLocales?: Maybe<Array<TLocalizedString>>;
  type: Scalars['String'];
};


export type TStoreNameSet_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TStoreProductSelectionsChanged = TMessagePayload & {
  __typename?: 'StoreProductSelectionsChanged';
  addedProductSelections?: Maybe<Array<TProductSelectionSetting>>;
  removedProductSelections?: Maybe<Array<TProductSelectionSetting>>;
  type: Scalars['String'];
  updatedProductSelections?: Maybe<Array<TProductSelectionSetting>>;
};

export type TStoreQueryResult = {
  __typename?: 'StoreQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TStore>;
  total: Scalars['Long'];
};

export type TStoreSupplyChannelsChanged = TMessagePayload & {
  __typename?: 'StoreSupplyChannelsChanged';
  addedSupplyChannels?: Maybe<Array<TChannel>>;
  addedSupplyChannelsRef?: Maybe<Array<TReference>>;
  removedSupplyChannels?: Maybe<Array<TChannel>>;
  removedSupplyChannelsRef?: Maybe<Array<TReference>>;
  type: Scalars['String'];
};

export type TStoreUpdateAction = {
  addCountry?: InputMaybe<TAddStoreCountry>;
  addDistributionChannel?: InputMaybe<TAddStoreDistributionChannel>;
  addProductSelection?: InputMaybe<TAddStoreProductSelection>;
  addSupplyChannel?: InputMaybe<TAddStoreSupplyChannel>;
  changeProductSelectionActive?: InputMaybe<TChangeStoreProductSelectionActive>;
  removeCountry?: InputMaybe<TRemoveStoreCountry>;
  removeDistributionChannel?: InputMaybe<TRemoveStoreDistributionChannel>;
  removeProductSelection?: InputMaybe<TRemoveStoreProductSelection>;
  removeSupplyChannel?: InputMaybe<TRemoveStoreSupplyChannel>;
  setCountries?: InputMaybe<TSetStoreCountries>;
  setCustomField?: InputMaybe<TSetStoreCustomField>;
  setCustomType?: InputMaybe<TSetStoreCustomType>;
  setDistributionChannels?: InputMaybe<TSetStoreDistributionChannels>;
  setLanguages?: InputMaybe<TSetStoreLanguages>;
  setName?: InputMaybe<TSetStoreName>;
  setProductSelections?: InputMaybe<TSetStoreProductSelections>;
  setSupplyChannels?: InputMaybe<TSetStoreSupplyChannels>;
};

export type TStringAttribute = TAttribute & {
  __typename?: 'StringAttribute';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type TStringField = TCustomField & {
  __typename?: 'StringField';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type TStringType = TFieldType & {
  __typename?: 'StringType';
  name: Scalars['String'];
};

export type TSubRate = {
  __typename?: 'SubRate';
  amount: Scalars['Float'];
  name: Scalars['String'];
};

export type TSubRateDraft = {
  amount: Scalars['Float'];
  name: Scalars['String'];
};

export type TSubscriptionDraft = {
  changes?: InputMaybe<Array<TChangeSubscriptionInput>>;
  destination: TDestinationInput;
  format?: InputMaybe<TSubscriptionFormatInput>;
  key?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<Array<TMessageSubscriptionInput>>;
};

export type TSubscriptionFormatInput = {
  CloudEvents?: InputMaybe<TCloudEventsSubscriptionsFormatInput>;
  Platform?: InputMaybe<TPlatformFormatInput>;
};

export enum TSubscriptionHealthStatus {
  ConfigurationError = 'ConfigurationError',
  ConfigurationErrorDeliveryStopped = 'ConfigurationErrorDeliveryStopped',
  Healthy = 'Healthy',
  TemporaryError = 'TemporaryError'
}

export type TSubscriptionUpdateAction = {
  changeDestination?: InputMaybe<TChangeSubscriptionDestination>;
  setChanges?: InputMaybe<TSetSubscriptionChanges>;
  setKey?: InputMaybe<TSetSubscriptionKey>;
  setMessages?: InputMaybe<TSetSubscriptionMessages>;
};

export type TSubscriptionsLimitsProjection = {
  __typename?: 'SubscriptionsLimitsProjection';
  maxSubscriptions: TLimit;
};

export type TSuggestResult = {
  __typename?: 'SuggestResult';
  searchKeywords: Array<TSuggestResultEntry>;
};

export type TSuggestResultEntry = {
  __typename?: 'SuggestResultEntry';
  locale: Scalars['Locale'];
  suggestions: Array<TSuggestion>;
};

export type TSuggestTokenizer = {
  type: Scalars['String'];
};

export type TSuggestTokenizerProductSearch = {
  type: Scalars['String'];
};

export type TSuggestion = {
  __typename?: 'Suggestion';
  text: Scalars['String'];
};

/** Stores information about order synchronization activities (like export or import). */
export type TSyncInfo = {
  __typename?: 'SyncInfo';
  channel?: Maybe<TChannel>;
  channelRef: TReference;
  externalId?: Maybe<Scalars['String']>;
  syncedAt: Scalars['DateTime'];
};

export type TTargetReferenceInput = {
  id?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  typeId: Scalars['String'];
};

export enum TTaxCalculationMode {
  /**
   * Default. This calculation mode calculates the taxes after the unit price is multiplied with the quantity.
   * E.g. `($1.08 * 3 = $3.24) * 1.19 = $3.8556 -> $3.86 rounded`
   */
  LineItemLevel = 'LineItemLevel',
  /**
   * This calculation mode calculates the taxes on the unit price before multiplying with the quantity.
   * E.g. `($1.08 * 1.19 = $1.2852 -> $1.29 rounded) * 3 = $3.87`
   */
  UnitPriceLevel = 'UnitPriceLevel'
}

/** Tax Categories define how products are to be taxed in different countries. */
export type TTaxCategory = TReferenceExpandable & TVersioned & {
  __typename?: 'TaxCategory';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name: Scalars['String'];
  rates: Array<TTaxRate>;
  version: Scalars['Long'];
};

export type TTaxCategoryAddTaxRate = {
  taxRate: TTaxRateDraft;
};

export type TTaxCategoryChangeName = {
  name: Scalars['String'];
};

export type TTaxCategoryDraft = {
  description?: InputMaybe<Scalars['String']>;
  key?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  rates?: InputMaybe<Array<TTaxRateDraft>>;
};

export type TTaxCategoryLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'TaxCategoryLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TTaxCategoryLimitsProjection = {
  __typename?: 'TaxCategoryLimitsProjection';
  total: TTaxCategoryLimitWithCurrent;
};

export type TTaxCategoryQueryResult = {
  __typename?: 'TaxCategoryQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TTaxCategory>;
  total: Scalars['Long'];
};

export type TTaxCategoryRemoveTaxRate = {
  taxRateId?: InputMaybe<Scalars['String']>;
  taxRateKey?: InputMaybe<Scalars['String']>;
};

export type TTaxCategoryReplaceTaxRate = {
  taxRate: TTaxRateDraft;
  taxRateId?: InputMaybe<Scalars['String']>;
  taxRateKey?: InputMaybe<Scalars['String']>;
};

export type TTaxCategorySetDescription = {
  description?: InputMaybe<Scalars['String']>;
};

export type TTaxCategoryUpdateAction = {
  addTaxRate?: InputMaybe<TTaxCategoryAddTaxRate>;
  changeName?: InputMaybe<TTaxCategoryChangeName>;
  removeTaxRate?: InputMaybe<TTaxCategoryRemoveTaxRate>;
  replaceTaxRate?: InputMaybe<TTaxCategoryReplaceTaxRate>;
  setDescription?: InputMaybe<TTaxCategorySetDescription>;
  setKey?: InputMaybe<TSetTaxCategoryKey>;
};

export enum TTaxMode {
  /** No taxes are added to the cart. */
  Disabled = 'Disabled',
  /**
   * The tax rates are set externally per ExternalTaxRateDraft. A cart with this tax mode can only be ordered if all
   * line items, all custom line items and the shipping method have an external tax rate set. The totalNet and
   * totalGross as well as the taxPortions fields are calculated according to the taxRoundingMode.
   */
  External = 'External',
  /**
   * The tax amounts and the tax rates as well as the tax portions are set externally per ExternalTaxAmountDraft.
   * A cart with this tax mode can only be ordered if the cart itself and all line items, all custom line items and
   * the shipping method have an external tax amount and rate set
   */
  ExternalAmount = 'ExternalAmount',
  /**
   * The tax rates are selected from the TaxCategories based on the cart shipping address.
   * The totalNet and totalGross as well as the taxPortions fields are calculated according to the
   * taxRoundingMode.
   */
  Platform = 'Platform'
}

/**
 * Represents the portions that sum up to the totalGross field of a TaxedPrice. The portions are calculated
 * from the TaxRates. If a tax rate has SubRates, they are used and can be identified by name. Tax portions
 * from line items that have the same rate and name will be accumulated to the same tax portion.
 */
export type TTaxPortion = {
  __typename?: 'TaxPortion';
  amount: TMoney;
  name?: Maybe<Scalars['String']>;
  rate: Scalars['Float'];
};

export type TTaxPortionDraft = {
  amount: TMoneyInput;
  name?: InputMaybe<Scalars['String']>;
  rate: Scalars['Float'];
};

export type TTaxRate = {
  __typename?: 'TaxRate';
  amount: Scalars['Float'];
  country: Scalars['Country'];
  id?: Maybe<Scalars['String']>;
  includedInPrice: Scalars['Boolean'];
  key?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  subRates: Array<TSubRate>;
};

export type TTaxRateDraft = {
  amount?: InputMaybe<Scalars['Float']>;
  country: Scalars['Country'];
  includedInPrice: Scalars['Boolean'];
  key?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
  subRates?: InputMaybe<Array<TSubRateDraft>>;
};

export type TTaxRateInput = {
  amount: Scalars['Float'];
  country: Scalars['Country'];
  id?: InputMaybe<Scalars['String']>;
  includedInPrice: Scalars['Boolean'];
  key?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
  subRates?: InputMaybe<Array<TSubRateDraft>>;
};

export type TTaxedItemPrice = {
  __typename?: 'TaxedItemPrice';
  totalGross: TMoney;
  totalNet: TMoney;
  totalTax?: Maybe<TMoney>;
};

export type TTaxedPrice = {
  __typename?: 'TaxedPrice';
  taxPortions: Array<TTaxPortion>;
  totalGross: TMoney;
  totalNet: TMoney;
  totalTax?: Maybe<TMoney>;
};

export type TTaxedPriceDraft = {
  taxPortions: Array<TTaxPortionDraft>;
  totalGross: TBaseMoneyInput;
  totalNet: TBaseMoneyInput;
  totalTax?: InputMaybe<TBaseMoneyInput>;
};

export type TTermCount = {
  __typename?: 'TermCount';
  count: Scalars['Int'];
  productCount?: Maybe<Scalars['Int']>;
  term: Scalars['String'];
};

export type TTermsFacetInput = {
  alias?: InputMaybe<Scalars['String']>;
  countProducts?: Scalars['Boolean'];
  path: Scalars['String'];
};

export type TTermsFacetResult = TFacetResult & {
  __typename?: 'TermsFacetResult';
  dataType: Scalars['String'];
  missing: Scalars['Int'];
  other: Scalars['Int'];
  terms: Array<TTermCount>;
  total: Scalars['Int'];
  type: Scalars['String'];
};

export type TTextAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'TextAttributeDefinitionType';
  name: Scalars['String'];
};

/** UI hint telling what kind of edit control should be displayed for a text attribute. */
export enum TTextInputHint {
  MultiLine = 'MultiLine',
  SingleLine = 'SingleLine'
}

export type TTextLineItem = {
  __typename?: 'TextLineItem';
  addedAt: Scalars['DateTime'];
  custom?: Maybe<TCustomFieldsType>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  quantity: Scalars['Int'];
};


export type TTextLineItem_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


export type TTextLineItem_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TTextLineItemDraft = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  custom?: InputMaybe<TCustomFieldsDraft>;
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  key?: InputMaybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type TTimeAttribute = TAttribute & {
  __typename?: 'TimeAttribute';
  name: Scalars['String'];
  value: Scalars['Time'];
};

export type TTimeAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'TimeAttributeDefinitionType';
  name: Scalars['String'];
};

export type TTimeField = TCustomField & {
  __typename?: 'TimeField';
  name: Scalars['String'];
  value: Scalars['Time'];
};

export type TTimeType = TFieldType & {
  __typename?: 'TimeType';
  name: Scalars['String'];
};

export type TTrackingData = {
  __typename?: 'TrackingData';
  carrier?: Maybe<Scalars['String']>;
  isReturn: Scalars['Boolean'];
  provider?: Maybe<Scalars['String']>;
  providerTransaction?: Maybe<Scalars['String']>;
  trackingId?: Maybe<Scalars['String']>;
};

export type TTrackingDataDraftType = {
  carrier?: InputMaybe<Scalars['String']>;
  isReturn?: InputMaybe<Scalars['Boolean']>;
  provider?: InputMaybe<Scalars['String']>;
  providerTransaction?: InputMaybe<Scalars['String']>;
  trackingId?: InputMaybe<Scalars['String']>;
};

export type TTransaction = {
  __typename?: 'Transaction';
  amount: TMoney;
  custom?: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  interactionId?: Maybe<Scalars['String']>;
  state: TTransactionState;
  timestamp?: Maybe<Scalars['DateTime']>;
  type?: Maybe<TTransactionType>;
};

export type TTransactionDraft = {
  amount: TMoneyInput;
  custom?: InputMaybe<TCustomFieldsDraft>;
  interactionId?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<TTransactionState>;
  timestamp?: InputMaybe<Scalars['DateTime']>;
  type: TTransactionType;
};

export enum TTransactionState {
  Failure = 'Failure',
  Initial = 'Initial',
  Pending = 'Pending',
  Success = 'Success'
}

export enum TTransactionType {
  Authorization = 'Authorization',
  CancelAuthorization = 'CancelAuthorization',
  Charge = 'Charge',
  Chargeback = 'Chargeback',
  Refund = 'Refund'
}

export type TTransitionOrderCustomLineItemState = {
  actualTransitionDate?: InputMaybe<Scalars['DateTime']>;
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  fromState: TResourceIdentifierInput;
  quantity: Scalars['Long'];
  toState: TResourceIdentifierInput;
};

export type TTransitionOrderLineItemState = {
  actualTransitionDate?: InputMaybe<Scalars['DateTime']>;
  fromState: TResourceIdentifierInput;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Long'];
  toState: TResourceIdentifierInput;
};

export type TTransitionOrderState = {
  force?: InputMaybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionPaymentState = {
  force?: InputMaybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionProductState = {
  force?: InputMaybe<Scalars['Boolean']>;
  state: TReferenceInput;
};

export type TTransitionQuoteRequestState = {
  force?: InputMaybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionQuoteState = {
  force?: InputMaybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionReviewState = {
  force?: InputMaybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionStagedOrderCustomLineItemState = {
  actualTransitionDate?: InputMaybe<Scalars['DateTime']>;
  customLineItemId?: InputMaybe<Scalars['String']>;
  customLineItemKey?: InputMaybe<Scalars['String']>;
  fromState: TResourceIdentifierInput;
  quantity: Scalars['Long'];
  toState: TResourceIdentifierInput;
};

export type TTransitionStagedOrderCustomLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'TransitionStagedOrderCustomLineItemStateOutput';
  actualTransitionDate?: Maybe<Scalars['DateTime']>;
  customLineItemId?: Maybe<Scalars['String']>;
  customLineItemKey?: Maybe<Scalars['String']>;
  fromStateResId: TResourceIdentifier;
  quantity: Scalars['Long'];
  toStateResId: TResourceIdentifier;
  type: Scalars['String'];
};

export type TTransitionStagedOrderLineItemState = {
  actualTransitionDate?: InputMaybe<Scalars['DateTime']>;
  fromState: TResourceIdentifierInput;
  lineItemId?: InputMaybe<Scalars['String']>;
  lineItemKey?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Long'];
  toState: TResourceIdentifierInput;
};

export type TTransitionStagedOrderLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'TransitionStagedOrderLineItemStateOutput';
  actualTransitionDate?: Maybe<Scalars['DateTime']>;
  fromStateResId: TResourceIdentifier;
  lineItemId?: Maybe<Scalars['String']>;
  lineItemKey?: Maybe<Scalars['String']>;
  quantity: Scalars['Long'];
  toStateResId: TResourceIdentifier;
  type: Scalars['String'];
};

export type TTransitionStagedOrderState = {
  force?: InputMaybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionStagedOrderStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'TransitionStagedOrderStateOutput';
  force: Scalars['Boolean'];
  stateResId: TResourceIdentifier;
  type: Scalars['String'];
};

export type TTransitionStagedQuoteState = {
  force?: InputMaybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTreeFilterInput = {
  path: Scalars['String'];
  rootValues: Array<Scalars['String']>;
  subTreeValues: Array<Scalars['String']>;
};

export type TTrigger = {
  __typename?: 'Trigger';
  actions: Array<TActionType>;
  condition?: Maybe<Scalars['String']>;
  resourceTypeId: Scalars['String'];
};

export type TTriggerInput = {
  actions?: InputMaybe<Array<TActionType>>;
  condition?: InputMaybe<Scalars['String']>;
  resourceTypeId: Scalars['String'];
};

/** Types allow you to define additional project-specific fields on resources and data types, so-called Custom Fields. */
export type TTypeDefinition = TReferenceExpandable & TVersioned & {
  __typename?: 'TypeDefinition';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  description?: Maybe<Scalars['String']>;
  descriptionAllLocales?: Maybe<Array<TLocalizedString>>;
  fieldDefinitions: Array<TFieldDefinition>;
  id: Scalars['String'];
  key: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  name?: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  resourceTypeIds: Array<Scalars['String']>;
  version: Scalars['Long'];
};


/** Types allow you to define additional project-specific fields on resources and data types, so-called Custom Fields. */
export type TTypeDefinition_DescriptionArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};


/** Types allow you to define additional project-specific fields on resources and data types, so-called Custom Fields. */
export type TTypeDefinition_FieldDefinitionsArgs = {
  excludeNames?: InputMaybe<Array<Scalars['String']>>;
  includeNames?: InputMaybe<Array<Scalars['String']>>;
};


/** Types allow you to define additional project-specific fields on resources and data types, so-called Custom Fields. */
export type TTypeDefinition_NameArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TTypeDefinitionDraft = {
  description?: InputMaybe<Array<TLocalizedStringItemInputType>>;
  fieldDefinitions?: InputMaybe<Array<TFieldDefinitionInput>>;
  key: Scalars['String'];
  name: Array<TLocalizedStringItemInputType>;
  resourceTypeIds: Array<Scalars['String']>;
};

export type TTypeDefinitionQueryResult = {
  __typename?: 'TypeDefinitionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TTypeDefinition>;
  total: Scalars['Long'];
};

export type TTypeUpdateAction = {
  addEnumValue?: InputMaybe<TAddTypeEnumValue>;
  addFieldDefinition?: InputMaybe<TAddTypeFieldDefinition>;
  addLocalizedEnumValue?: InputMaybe<TAddTypeLocalizedEnumValue>;
  changeEnumValueLabel?: InputMaybe<TChangeTypeEnumValueLabel>;
  changeEnumValueOrder?: InputMaybe<TChangeTypeEnumValueOrder>;
  changeFieldDefinitionOrder?: InputMaybe<TChangeTypeFieldDefinitionOrder>;
  changeInputHint?: InputMaybe<TChangeTypeInputHint>;
  changeKey?: InputMaybe<TChangeTypeKey>;
  changeLabel?: InputMaybe<TChangeTypeLabel>;
  changeLocalizedEnumValueLabel?: InputMaybe<TChangeTypeLocalizedEnumValueLabel>;
  changeLocalizedEnumValueOrder?: InputMaybe<TChangeTypeLocalizedEnumValueOrder>;
  changeName?: InputMaybe<TChangeTypeName>;
  removeFieldDefinition?: InputMaybe<TRemoveTypeFieldDefinition>;
  setDescription?: InputMaybe<TSetTypeDescription>;
};

export type TUnfreezeCart = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TUnpublishProduct = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TUpdateCartItemShippingAddress = {
  address: TAddressInput;
};

export type TUpdateOrderItemShippingAddress = {
  address: TAddressInput;
};

export type TUpdateOrderSyncInfo = {
  channel: TResourceIdentifierInput;
  externalId?: InputMaybe<Scalars['String']>;
  syncedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TUpdateStagedOrderItemShippingAddress = {
  address: TAddressInput;
};

export type TUpdateStagedOrderItemShippingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'UpdateStagedOrderItemShippingAddressOutput';
  address: TAddressDraft;
  type: Scalars['String'];
};

export type TUpdateStagedOrderSyncInfo = {
  channel: TResourceIdentifierInput;
  externalId?: InputMaybe<Scalars['String']>;
  syncedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TUpdateStagedOrderSyncInfoOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'UpdateStagedOrderSyncInfoOutput';
  channelResId: TChannelReferenceIdentifier;
  externalId?: Maybe<Scalars['String']>;
  syncedAt?: Maybe<Scalars['DateTime']>;
  type: Scalars['String'];
};

export type TUserProvidedIdentifiers = {
  __typename?: 'UserProvidedIdentifiers';
  customerNumber?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  orderNumber?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  slugAllLocales?: Maybe<Array<TLocalizedString>>;
};


export type TUserProvidedIdentifiers_SlugArgs = {
  acceptLanguage?: InputMaybe<Array<Scalars['Locale']>>;
  locale?: InputMaybe<Scalars['Locale']>;
};

export type TValueFacetResult = TFacetResult & {
  __typename?: 'ValueFacetResult';
  count: Scalars['Int'];
  productCount?: Maybe<Scalars['Int']>;
  type: Scalars['String'];
};

export type TValueFilterInput = {
  path: Scalars['String'];
  values: Array<Scalars['String']>;
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

export type TWhitespaceSuggestTokenizer = TSuggestTokenizer & {
  __typename?: 'WhitespaceSuggestTokenizer';
  type: Scalars['String'];
};

export type TWhitespaceSuggestTokenizerInput = {
  dummy?: InputMaybe<Scalars['String']>;
};

export type TWhitespaceSuggestTokenizerProductSearch = TSuggestTokenizerProductSearch & {
  __typename?: 'WhitespaceSuggestTokenizerProductSearch';
  type: Scalars['String'];
};

/** Zones allow defining ShippingRates for specific Locations. */
export type TZone = TReferenceExpandable & TVersioned & {
  __typename?: 'Zone';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<TInitiator>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy?: Maybe<TInitiator>;
  locations: Array<TLocation>;
  name: Scalars['String'];
  version: Scalars['Long'];
};

export type TZoneLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ZoneLimitWithCurrent';
  current: Scalars['Long'];
  limit?: Maybe<Scalars['Long']>;
};

export type TZoneLimitsProjection = {
  __typename?: 'ZoneLimitsProjection';
  total: TZoneLimitWithCurrent;
};

export type TZoneLocation = {
  country: Scalars['Country'];
  state?: InputMaybe<Scalars['String']>;
};

export type TZoneQueryResult = {
  __typename?: 'ZoneQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#public-beta */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TZone>;
  total: Scalars['Long'];
};

export type TZoneRate = {
  __typename?: 'ZoneRate';
  shippingRates: Array<TShippingRate>;
  zone?: Maybe<TZone>;
  zoneRef?: Maybe<TReference>;
};

export type TZoneRateDraft = {
  shippingRates?: InputMaybe<Array<TShippingRateDraft>>;
  zone: TResourceIdentifierInput;
};

export type TZoneUpdateAction = {
  addLocation?: InputMaybe<TAddZoneLocation>;
  changeName?: InputMaybe<TChangeZoneName>;
  removeLocation?: InputMaybe<TRemoveZoneLocation>;
  setDescription?: InputMaybe<TSetZoneDescription>;
  setKey?: InputMaybe<TSetZoneKey>;
};

export type TAddAttributeDefinition = {
  attributeDefinition: TAttributeDefinitionDraft;
};

export type TAddLocalizedEnumValue = {
  attributeName: Scalars['String'];
  value: TLocalizedEnumValueDraft;
};

export type TAddPlainEnumValue = {
  attributeName: Scalars['String'];
  value: TPlainEnumValueDraft;
};

export type TChangeAttributeName = {
  attributeName: Scalars['String'];
  newAttributeName: Scalars['String'];
};

export type TChangeAttributeOrder = {
  attributeDefinitions: Array<TAttributeDefinitionDraft>;
};

export type TChangeAttributeOrderByName = {
  attributeNames: Array<Scalars['String']>;
};

export type TChangeDescription = {
  description: Scalars['String'];
};

export type TChangeEnumKey = {
  attributeName: Scalars['String'];
  key: Scalars['String'];
  newKey: Scalars['String'];
};

export type TChangeInputHint = {
  attributeName: Scalars['String'];
  newValue: TTextInputHint;
};

export type TChangeIsSearchable = {
  attributeName: Scalars['String'];
  isSearchable: Scalars['Boolean'];
};

export type TChangeLabel = {
  attributeName: Scalars['String'];
  label: Array<TLocalizedStringItemInputType>;
};

export type TChangeLocalizedEnumValueLabel = {
  attributeName: Scalars['String'];
  newValue: TLocalizedEnumValueDraft;
};

export type TChangeLocalizedEnumValueOrder = {
  attributeName: Scalars['String'];
  values: Array<TLocalizedEnumValueDraft>;
};

export type TChangeName = {
  name: Scalars['String'];
};

export type TChangePlainEnumValueLabel = {
  attributeName: Scalars['String'];
  newValue: TPlainEnumValueDraft;
};

export type TChangePlainEnumValueOrder = {
  attributeName: Scalars['String'];
  values: Array<TPlainEnumValueDraft>;
};

export type TRemoveAttributeDefinition = {
  name: Scalars['String'];
};

export type TRemoveEnumValues = {
  attributeName: Scalars['String'];
  keys: Array<Scalars['String']>;
};

export type TSetInputTip = {
  attributeName: Scalars['String'];
  inputTip?: InputMaybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetKey = {
  key?: InputMaybe<Scalars['String']>;
};

export type TQuickAccessProductQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type TQuickAccessProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged?: { __typename?: 'ProductData', allVariants: Array<{ __typename?: 'ProductVariant', id: number, key?: string | null, sku?: string | null }> } | null } } | null };

export type TQuickAccessQueryVariables = Exact<{
  searchText: Scalars['String'];
  canViewProducts: Scalars['Boolean'];
  productsWhereClause?: InputMaybe<Scalars['String']>;
  includeProductsByIds: Scalars['Boolean'];
}>;


export type TQuickAccessQuery = { __typename?: 'Query', productsByIds: { __typename?: 'ProductQueryResult', results: Array<{ __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged?: { __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }> } | null } }> }, productById?: { __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged?: { __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }> } | null } } | null, productByKey?: { __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged?: { __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }> } | null } } | null, productByVariantSku?: { __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged?: { __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }>, variant?: { __typename?: 'ProductVariant', sku?: string | null, key?: string | null, id: number } | null } | null } } | null, productByVariantKey?: { __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged?: { __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }>, variant?: { __typename?: 'ProductVariant', sku?: string | null, key?: string | null, id: number } | null } | null } } | null };
