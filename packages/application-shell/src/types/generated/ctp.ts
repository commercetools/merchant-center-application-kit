export type Maybe<T> = T | undefined;
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
  /** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
  BigDecimal: string;
  /** [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) country code. */
  Country: string;
  /** Represents a currency. Currencies are identified by their [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) currency codes. */
  Currency: string;
  /** DateTime is a scalar value that represents an ISO8601 formatted date. */
  Date: string;
  /** DateTime is a scalar value that represents an ISO8601 formatted date and time. */
  DateTime: string;
  /** Raw JSON value */
  Json: { [key: string]: unknown };
  /** A key that references a resource. */
  KeyReferenceInput: string;
  /** Locale is a scalar value represented as a string language tag. */
  Locale: string;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: number;
  /** Search filter. It is represented as a string and has th same format as in REST API: "field:filter_criteria" */
  SearchFilter: string;
  /** Search sort */
  SearchSort: string;
  /** A set. */
  Set: unknown[];
  /** Time is a scalar value that represents an ISO8601 formatted time. */
  Time: string;
  /** YearMonth is a scalar value that represents an ISO8601 formatted year and month. */
  YearMonth: string;
};

/** API Clients can be used to obtain OAuth 2 access tokens. The secret is only shown once in the response of creating the API Client. */
export type TApiClientWithSecret = {
  __typename?: 'APIClientWithSecret';
  createdAt: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  lastUsedAt: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  scope: Scalars['String'];
  secret: Scalars['String'];
};

/** API Clients can be used to obtain OAuth 2 access tokens */
export type TApiClientWithoutSecret = {
  __typename?: 'APIClientWithoutSecret';
  createdAt: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  lastUsedAt: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  scope: Scalars['String'];
};

export type TApiClientWithoutSecretQueryResult = {
  __typename?: 'APIClientWithoutSecretQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
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
  activeCart: Maybe<TCart>;
};

export type TAddCartCustomLineItem = {
  custom: Maybe<TCustomFieldsDraft>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  money: TBaseMoneyInput;
  name: Array<TLocalizedStringItemInputType>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  slug: Scalars['String'];
  taxCategory: Maybe<TResourceIdentifierInput>;
};

export type TAddCartDiscountCode = {
  code: Scalars['String'];
  validateDuplicates: Maybe<Scalars['Boolean']>;
};

export type TAddCartItemShippingAddress = {
  address: TAddressInput;
};

export type TAddCartLineItem = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  productId: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  sku: Maybe<Scalars['String']>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  variantId: Maybe<Scalars['Int']>;
};

export type TAddCartPayment = {
  payment: TResourceIdentifierInput;
};

export type TAddCartShoppingList = {
  distributionChannel: Maybe<TResourceIdentifierInput>;
  shoppingList: TResourceIdentifierInput;
  supplyChannel: Maybe<TResourceIdentifierInput>;
};

export type TAddCategoryAsset = {
  asset: TAssetDraftInput;
  position: Maybe<Scalars['Int']>;
};

export type TAddChannelRoles = {
  roles: Array<TChannelRole>;
};

export type TAddCustomerAddress = {
  address: TAddressInput;
};

export type TAddCustomerBillingAddressId = {
  addressId: Maybe<Scalars['String']>;
  addressKey: Maybe<Scalars['String']>;
};

export type TAddCustomerShippingAddressId = {
  addressId: Maybe<Scalars['String']>;
  addressKey: Maybe<Scalars['String']>;
};

export type TAddCustomerStore = {
  store: TResourceIdentifierInput;
};

export type TAddInventoryEntryQuantity = {
  quantity: Scalars['Long'];
};

export type TAddMyCartLineItem = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  productId: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  sku: Maybe<Scalars['String']>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  variantId: Maybe<Scalars['Int']>;
};

export type TAddMyPaymentTransaction = {
  transaction: TMyTransactionDraft;
};

export type TAddOrderDelivery = {
  address: Maybe<TAddressInput>;
  items: Maybe<Array<TDeliveryItemDraftType>>;
  parcels: Maybe<Array<TParcelDataDraftType>>;
};

export type TAddOrderEditStagedAction = {
  stagedAction: TStagedOrderUpdateAction;
};

export type TAddOrderItemShippingAddress = {
  address: TAddressInput;
};

export type TAddOrderParcelToDelivery = {
  deliveryId: Scalars['String'];
  items: Maybe<Array<TDeliveryItemDraftType>>;
  measurements: Maybe<TParcelMeasurementsDraftType>;
  trackingData: Maybe<TTrackingDataDraftType>;
};

export type TAddOrderPayment = {
  payment: TResourceIdentifierInput;
};

export type TAddOrderReturnInfo = {
  items: Array<TReturnItemDraftType>;
  returnDate: Maybe<Scalars['DateTime']>;
  returnTrackingId: Maybe<Scalars['String']>;
};

export type TAddPaymentInterfaceInteraction = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TAddPaymentTransaction = {
  transaction: TTransactionDraft;
};

export type TAddProductAsset = {
  asset: TAssetDraftInput;
  position: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TAddProductExternalImage = {
  image: TImageInput;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TAddProductPrice = {
  price: TProductPriceDataInput;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TAddProductToCategory = {
  category: TResourceIdentifierInput;
  orderHint: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TAddProductVariant = {
  assets: Maybe<Array<TAssetDraftInput>>;
  attributes: Maybe<Array<TProductAttributeInput>>;
  images: Maybe<Array<TImageInput>>;
  key: Maybe<Scalars['String']>;
  prices: Maybe<Array<TProductPriceDataInput>>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TAddShippingMethodShippingRate = {
  shippingRate: TShippingRateDraft;
  zone: TResourceIdentifierInput;
};

export type TAddShippingMethodZone = {
  zone: TResourceIdentifierInput;
};

export type TAddShoppingListLineItem = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  productId: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TAddShoppingListTextLineItem = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  name: Array<TLocalizedStringItemInputType>;
  quantity: Maybe<Scalars['Int']>;
};

export type TAddStagedOrderCustomLineItem = {
  custom: Maybe<TCustomFieldsDraft>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  money: TBaseMoneyInput;
  name: Array<TLocalizedStringItemInputType>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
  slug: Scalars['String'];
  taxCategory: Maybe<TResourceIdentifierInput>;
};

export type TAddStagedOrderCustomLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderCustomLineItemOutput';
  draft: TCustomLineItemDraftOutput;
  type: Scalars['String'];
};

export type TAddStagedOrderDelivery = {
  address: Maybe<TAddressInput>;
  items: Maybe<Array<TDeliveryItemDraftType>>;
  parcels: Maybe<Array<TParcelDataDraftType>>;
};

export type TAddStagedOrderDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderDeliveryOutput';
  address: Maybe<TAddressDraft>;
  items: Array<TDeliveryItem>;
  parcels: Array<TParcelData>;
  type: Scalars['String'];
};

export type TAddStagedOrderDiscountCode = {
  code: Scalars['String'];
  validateDuplicates: Maybe<Scalars['Boolean']>;
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
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  productId: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
  sku: Maybe<Scalars['String']>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  variantId: Maybe<Scalars['Int']>;
};

export type TAddStagedOrderLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderLineItemOutput';
  draft: TLineItemDraftOutput;
  type: Scalars['String'];
};

export type TAddStagedOrderParcelToDelivery = {
  deliveryId: Scalars['String'];
  items: Maybe<Array<TDeliveryItemDraftType>>;
  measurements: Maybe<TParcelMeasurementsDraftType>;
  trackingData: Maybe<TTrackingDataDraftType>;
};

export type TAddStagedOrderParcelToDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderParcelToDeliveryOutput';
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItem>;
  measurements: Maybe<TParcelMeasurements>;
  trackingData: Maybe<TTrackingData>;
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
  returnDate: Maybe<Scalars['DateTime']>;
  returnTrackingId: Maybe<Scalars['String']>;
};

export type TAddStagedOrderReturnInfoOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderReturnInfoOutput';
  items: Array<TReturnItemDraftTypeOutput>;
  returnDate: Maybe<Scalars['DateTime']>;
  returnTrackingId: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TAddStagedOrderShoppingList = {
  distributionChannel: Maybe<TResourceIdentifierInput>;
  shoppingList: TResourceIdentifierInput;
  supplyChannel: Maybe<TResourceIdentifierInput>;
};

export type TAddStagedOrderShoppingListOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderShoppingListOutput';
  distributionChannelResId: Maybe<TChannelReferenceIdentifier>;
  shoppingListResId: TResourceIdentifier;
  supplyChannelResId: Maybe<TChannelReferenceIdentifier>;
  type: Scalars['String'];
};

export type TAddStateRoles = {
  roles: Array<TStateRole>;
};

export type TAddStoreDistributionChannel = {
  distributionChannel: TResourceIdentifierInput;
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
  additionalAddressInfo: Maybe<Scalars['String']>;
  additionalStreetInfo: Maybe<Scalars['String']>;
  apartment: Maybe<Scalars['String']>;
  building: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  company: Maybe<Scalars['String']>;
  country: Scalars['Country'];
  custom: Maybe<TCustomFieldsType>;
  department: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  externalId: Maybe<Scalars['String']>;
  fax: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  pOBox: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  postalCode: Maybe<Scalars['String']>;
  region: Maybe<Scalars['String']>;
  salutation: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  streetName: Maybe<Scalars['String']>;
  streetNumber: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type TAddressDraft = {
  __typename?: 'AddressDraft';
  additionalAddressInfo: Maybe<Scalars['String']>;
  additionalStreetInfo: Maybe<Scalars['String']>;
  apartment: Maybe<Scalars['String']>;
  building: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  company: Maybe<Scalars['String']>;
  country: Scalars['Country'];
  custom: Maybe<TCustomFieldsCommand>;
  department: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  externalId: Maybe<Scalars['String']>;
  fax: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  pOBox: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  postalCode: Maybe<Scalars['String']>;
  region: Maybe<Scalars['String']>;
  salutation: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  streetName: Maybe<Scalars['String']>;
  streetNumber: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

export type TAddressInput = {
  additionalAddressInfo: Maybe<Scalars['String']>;
  additionalStreetInfo: Maybe<Scalars['String']>;
  apartment: Maybe<Scalars['String']>;
  building: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  company: Maybe<Scalars['String']>;
  country: Scalars['Country'];
  custom: Maybe<TCustomFieldsDraft>;
  department: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  externalId: Maybe<Scalars['String']>;
  fax: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  pOBox: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  postalCode: Maybe<Scalars['String']>;
  region: Maybe<Scalars['String']>;
  salutation: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  streetName: Maybe<Scalars['String']>;
  streetNumber: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
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
  customLineItemId: Scalars['String'];
  targetsDelta: Array<TShippingTargetDraft>;
};

export type TApplyCartDeltaToLineItemShippingDetailsTargets = {
  lineItemId: Scalars['String'];
  targetsDelta: Array<TShippingTargetDraft>;
};

export type TAsset = {
  __typename?: 'Asset';
  custom: Maybe<TCustomFieldsType>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  sources: Array<TAssetSource>;
  tags: Array<Scalars['String']>;
};


export type TAsset_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TAsset_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
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
  custom: Maybe<TCustomFieldsDraft>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  key: Maybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  sources: Maybe<Array<TAssetSourceInput>>;
  tags: Maybe<Array<Scalars['String']>>;
  type: Maybe<TResourceIdentifierInput>;
};

export type TAssetSource = {
  __typename?: 'AssetSource';
  contentType: Maybe<Scalars['String']>;
  dimensions: Maybe<TAssetDimensions>;
  key: Maybe<Scalars['String']>;
  uri: Scalars['String'];
};

export type TAssetSourceInput = {
  contentType: Maybe<Scalars['String']>;
  dimensions: Maybe<TAssetDimensionsInput>;
  key: Maybe<Scalars['String']>;
  uri: Scalars['String'];
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
  inputTip: Maybe<Scalars['String']>;
  inputTipAllLocales: Maybe<Array<TLocalizedString>>;
  isRequired: Scalars['Boolean'];
  isSearchable: Scalars['Boolean'];
  label: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
  name: Scalars['String'];
  type: TAttributeDefinitionType;
};


export type TAttributeDefinition_InputTipArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TAttributeDefinition_LabelArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TAttributeDefinitionDraft = {
  attributeConstraint: Maybe<TAttributeConstraint>;
  inputHint: Maybe<TTextInputHint>;
  inputTip: Maybe<Array<TLocalizedStringItemInputType>>;
  isRequired: Scalars['Boolean'];
  isSearchable: Scalars['Boolean'];
  label: Array<TLocalizedStringItemInputType>;
  name: Scalars['String'];
  type: TAttributeTypeDraft;
};

export type TAttributeDefinitionResult = {
  __typename?: 'AttributeDefinitionResult';
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  results: Array<TAttributeDefinition>;
  total: Scalars['Int'];
};

/** (https://docs.commercetools.com/api/projects/productTypes#attributetype)[https://docs.commercetools.com/api/projects/productTypes#attributetype] */
export type TAttributeDefinitionType = {
  name: Scalars['String'];
};

export type TAttributeSetElementTypeDraft = {
  boolean: Maybe<TSimpleAttributeTypeDraft>;
  date: Maybe<TSimpleAttributeTypeDraft>;
  datetime: Maybe<TSimpleAttributeTypeDraft>;
  enum: Maybe<TEnumTypeDraft>;
  lenum: Maybe<TLocalizableEnumTypeDraft>;
  ltext: Maybe<TSimpleAttributeTypeDraft>;
  money: Maybe<TSimpleAttributeTypeDraft>;
  number: Maybe<TSimpleAttributeTypeDraft>;
  reference: Maybe<TReferenceTypeDefinitionDraft>;
  text: Maybe<TSimpleAttributeTypeDraft>;
  time: Maybe<TSimpleAttributeTypeDraft>;
};

export type TAttributeSetTypeDraft = {
  elementType: TAttributeSetElementTypeDraft;
};

export type TAttributeTypeDraft = {
  boolean: Maybe<TSimpleAttributeTypeDraft>;
  date: Maybe<TSimpleAttributeTypeDraft>;
  datetime: Maybe<TSimpleAttributeTypeDraft>;
  enum: Maybe<TEnumTypeDraft>;
  lenum: Maybe<TLocalizableEnumTypeDraft>;
  ltext: Maybe<TSimpleAttributeTypeDraft>;
  money: Maybe<TSimpleAttributeTypeDraft>;
  number: Maybe<TSimpleAttributeTypeDraft>;
  reference: Maybe<TReferenceTypeDefinitionDraft>;
  set: Maybe<TAttributeSetTypeDraft>;
  text: Maybe<TSimpleAttributeTypeDraft>;
  time: Maybe<TSimpleAttributeTypeDraft>;
};

export type TAuthorizationHeader = THttpDestinationAuthentication & {
  __typename?: 'AuthorizationHeader';
  headerValue: Scalars['String'];
  type: Scalars['String'];
};

export type TAuthorizationHeaderInput = {
  headerValue: Scalars['String'];
};

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
  centPrecision: Maybe<TMoneyInput>;
  highPrecision: Maybe<THighPrecisionMoneyInput>;
};

export type TBaseSearchKeywordInput = {
  custom: Maybe<TCustomSuggestTokenizerInput>;
  whitespace: Maybe<TWhitespaceSuggestTokenizerInput>;
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

/** A shopping cart holds product variants and can be ordered. Each cart either belongs to a registered customer or is an anonymous cart. */
export type TCart = TVersioned & {
  __typename?: 'Cart';
  anonymousId: Maybe<Scalars['String']>;
  billingAddress: Maybe<TAddress>;
  cartState: TCartState;
  country: Maybe<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  customLineItems: Array<TCustomLineItem>;
  customer: Maybe<TCustomer>;
  customerEmail: Maybe<Scalars['String']>;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  customerId: Maybe<Scalars['String']>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  discountCodes: Array<TDiscountCodeInfo>;
  id: Scalars['String'];
  inventoryMode: TInventoryMode;
  itemShippingAddresses: Array<TAddress>;
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  lineItems: Array<TLineItem>;
  locale: Maybe<Scalars['Locale']>;
  origin: TCartOrigin;
  paymentInfo: Maybe<TPaymentInfo>;
  refusedGifts: Array<TCartDiscount>;
  refusedGiftsRefs: Array<TReference>;
  shippingAddress: Maybe<TAddress>;
  shippingInfo: Maybe<TShippingInfo>;
  shippingRateInput: Maybe<TShippingRateInput>;
  store: Maybe<TStore>;
  storeRef: Maybe<TKeyReference>;
  taxCalculationMode: TTaxCalculationMode;
  taxMode: TTaxMode;
  taxRoundingMode: TRoundingMode;
  taxedPrice: Maybe<TTaxedPrice>;
  totalPrice: TMoney;
  version: Scalars['Long'];
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
export type TCartDiscount = TVersioned & {
  __typename?: 'CartDiscount';
  cartPredicate: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  referenceRefs: Array<TReference>;
  requiresDiscountCode: Scalars['Boolean'];
  sortOrder: Scalars['String'];
  stackingMode: TStackingMode;
  target: Maybe<TCartDiscountTarget>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
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
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


/**
 *
 * Cart discounts are recalculated every time LineItems or CustomLineItems are added or removed from the Cart or an order is created from the cart.
 *
 * The number of active cart discounts that do not require a discount code (isActive=true and requiresDiscountCode=false) is limited to 100.
 *
 */
export type TCartDiscount_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TCartDiscountDraft = {
  cartPredicate: Scalars['String'];
  custom: Maybe<TCustomFieldsDraft>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  isActive: Maybe<Scalars['Boolean']>;
  key: Maybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  requiresDiscountCode: Maybe<Scalars['Boolean']>;
  sortOrder: Scalars['String'];
  stackingMode: Maybe<TStackingMode>;
  target: Maybe<TCartDiscountTargetInput>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  value: TCartDiscountValueInput;
};

export type TCartDiscountLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CartDiscountLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TCartDiscountLimitsProjection = {
  __typename?: 'CartDiscountLimitsProjection';
  totalActiveWithoutDiscountCodes: TCartDiscountLimitWithCurrent;
};

export type TCartDiscountQueryResult = {
  __typename?: 'CartDiscountQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCartDiscount>;
  total: Scalars['Long'];
};

export type TCartDiscountTarget = {
  type: Scalars['String'];
};

export type TCartDiscountTargetInput = {
  customLineItems: Maybe<TCustomLineItemsTargetInput>;
  lineItems: Maybe<TLineItemsTargetInput>;
  multiBuyCustomLineItems: Maybe<TMultiBuyCustomLineItemsTargetInput>;
  multiBuyLineItems: Maybe<TMultiBuyLineItemsTargetInput>;
  shipping: Maybe<TShippingTargetInput>;
};

export type TCartDiscountUpdateAction = {
  changeCartPredicate: Maybe<TChangeCartDiscountCartPredicate>;
  changeIsActive: Maybe<TChangeCartDiscountIsActive>;
  changeName: Maybe<TChangeCartDiscountName>;
  changeRequiresDiscountCode: Maybe<TChangeCartDiscountRequiresDiscountCode>;
  changeSortOrder: Maybe<TChangeCartDiscountSortOrder>;
  changeStackingMode: Maybe<TChangeCartDiscountStackingMode>;
  changeTarget: Maybe<TChangeCartDiscountTarget>;
  changeValue: Maybe<TChangeCartDiscountValue>;
  setCustomField: Maybe<TSetCartDiscountCustomField>;
  setCustomType: Maybe<TSetCartDiscountCustomType>;
  setDescription: Maybe<TSetCartDiscountDescription>;
  setKey: Maybe<TSetCartDiscountKey>;
  setValidFrom: Maybe<TSetCartDiscountValidFrom>;
  setValidFromAndUntil: Maybe<TSetCartDiscountValidFromAndUntil>;
  setValidUntil: Maybe<TSetCartDiscountValidUntil>;
};

export type TCartDiscountValue = {
  type: Scalars['String'];
};

export type TCartDiscountValueInput = {
  absolute: Maybe<TAbsoluteDiscountValueInput>;
  fixed: Maybe<TFixedPriceDiscountValueInput>;
  giftLineItem: Maybe<TGiftLineItemValueInput>;
  relative: Maybe<TRelativeDiscountValueInput>;
};

export type TCartDraft = {
  anonymousId: Maybe<Scalars['String']>;
  billingAddress: Maybe<TAddressInput>;
  country: Maybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  custom: Maybe<TCustomFieldsDraft>;
  customLineItems: Maybe<Array<TCustomLineItemDraft>>;
  customerEmail: Maybe<Scalars['String']>;
  customerGroup: Maybe<TResourceIdentifierInput>;
  customerId: Maybe<Scalars['String']>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  discountCodes: Maybe<Array<Scalars['String']>>;
  externalTaxRateForShippingMethod: Maybe<TExternalTaxRateDraft>;
  inventoryMode: Maybe<TInventoryMode>;
  itemShippingAddresses: Maybe<Array<TAddressInput>>;
  key: Maybe<Scalars['String']>;
  lineItems: Maybe<Array<TLineItemDraft>>;
  locale: Maybe<Scalars['Locale']>;
  origin: Maybe<TCartOrigin>;
  shippingAddress: Maybe<TAddressInput>;
  shippingMethod: Maybe<TResourceIdentifierInput>;
  shippingRateInput: Maybe<TShippingRateInputDraft>;
  store: Maybe<TResourceIdentifierInput>;
  taxCalculationMode: Maybe<TTaxCalculationMode>;
  taxMode: Maybe<TTaxMode>;
  taxRoundingMode: Maybe<TRoundingMode>;
};

export type TCartLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CartLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TCartLimitsProjection = {
  __typename?: 'CartLimitsProjection';
  total: TCartLimitWithCurrent;
};

export enum TCartOrigin {
  /** The cart was created by the customer. This is the default value */
  Customer = 'Customer',
  /** The cart was created by the merchant on behalf of the customer */
  Merchant = 'Merchant'
}

/** Fields to access carts. Includes direct access to a single cart and searching for carts. */
export type TCartQueryInterface = {
  cart: Maybe<TCart>;
  carts: TCartQueryResult;
};


/** Fields to access carts. Includes direct access to a single cart and searching for carts. */
export type TCartQueryInterface_CartArgs = {
  id: Scalars['String'];
};


/** Fields to access carts. Includes direct access to a single cart and searching for carts. */
export type TCartQueryInterface_CartsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};

export type TCartQueryResult = {
  __typename?: 'CartQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCart>;
  total: Scalars['Long'];
};

export type TCartScoreInput = {
  dummy: Maybe<Scalars['String']>;
};

export type TCartScoreType = TShippingRateInputType & {
  __typename?: 'CartScoreType';
  type: Scalars['String'];
};

export enum TCartState {
  /** The cart can be updated and ordered. It is the default state. */
  Active = 'Active',
  /** Anonymous cart whose content was merged into a customers cart on signin. No further operations on the cart are allowed. */
  Merged = 'Merged',
  /** The cart was ordered. No further operations on the cart are allowed. */
  Ordered = 'Ordered'
}

export type TCartUpdateAction = {
  addCustomLineItem: Maybe<TAddCartCustomLineItem>;
  addDiscountCode: Maybe<TAddCartDiscountCode>;
  addItemShippingAddress: Maybe<TAddCartItemShippingAddress>;
  addLineItem: Maybe<TAddCartLineItem>;
  addPayment: Maybe<TAddCartPayment>;
  addShoppingList: Maybe<TAddCartShoppingList>;
  applyDeltaToCustomLineItemShippingDetailsTargets: Maybe<TApplyCartDeltaToCustomLineItemShippingDetailsTargets>;
  applyDeltaToLineItemShippingDetailsTargets: Maybe<TApplyCartDeltaToLineItemShippingDetailsTargets>;
  changeCustomLineItemMoney: Maybe<TChangeCartCustomLineItemMoney>;
  changeCustomLineItemQuantity: Maybe<TChangeCartCustomLineItemQuantity>;
  changeLineItemQuantity: Maybe<TChangeCartLineItemQuantity>;
  changeTaxCalculationMode: Maybe<TChangeCartTaxCalculationMode>;
  changeTaxMode: Maybe<TChangeCartTaxMode>;
  changeTaxRoundingMode: Maybe<TChangeCartTaxRoundingMode>;
  recalculate: Maybe<TRecalculateCart>;
  removeCustomLineItem: Maybe<TRemoveCartCustomLineItem>;
  removeDiscountCode: Maybe<TRemoveCartDiscountCode>;
  removeItemShippingAddress: Maybe<TRemoveCartItemShippingAddress>;
  removeLineItem: Maybe<TRemoveCartLineItem>;
  removePayment: Maybe<TRemoveCartPayment>;
  setAnonymousId: Maybe<TSetCartAnonymousId>;
  setBillingAddress: Maybe<TSetCartBillingAddress>;
  setBillingAddressCustomField: Maybe<TSetCartBillingAddressCustomField>;
  setBillingAddressCustomType: Maybe<TSetCartBillingAddressCustomType>;
  setCartTotalTax: Maybe<TSetCartTotalTax>;
  setCountry: Maybe<TSetCartCountry>;
  setCustomField: Maybe<TSetCartCustomField>;
  setCustomLineItemCustomField: Maybe<TSetCartCustomLineItemCustomField>;
  setCustomLineItemCustomType: Maybe<TSetCartCustomLineItemCustomType>;
  setCustomLineItemShippingDetails: Maybe<TSetCartCustomLineItemShippingDetails>;
  setCustomLineItemTaxAmount: Maybe<TSetCartCustomLineItemTaxAmount>;
  setCustomLineItemTaxRate: Maybe<TSetCartCustomLineItemTaxRate>;
  setCustomShippingMethod: Maybe<TSetCartCustomShippingMethod>;
  setCustomType: Maybe<TSetCartCustomType>;
  setCustomerEmail: Maybe<TSetCartCustomerEmail>;
  setCustomerGroup: Maybe<TSetCartCustomerGroup>;
  setCustomerId: Maybe<TSetCartCustomerId>;
  setDeleteDaysAfterLastModification: Maybe<TSetCartDeleteDaysAfterLastModification>;
  setItemShippingAddressCustomField: Maybe<TSetCartItemShippingAddressCustomField>;
  setItemShippingAddressCustomType: Maybe<TSetCartItemShippingAddressCustomType>;
  setKey: Maybe<TSetCartKey>;
  setLineItemCustomField: Maybe<TSetCartLineItemCustomField>;
  setLineItemCustomType: Maybe<TSetCartLineItemCustomType>;
  setLineItemDistributionChannel: Maybe<TSetCartLineItemDistributionChannel>;
  setLineItemPrice: Maybe<TSetCartLineItemPrice>;
  setLineItemShippingDetails: Maybe<TSetCartLineItemShippingDetails>;
  setLineItemTaxAmount: Maybe<TSetCartLineItemTaxAmount>;
  setLineItemTaxRate: Maybe<TSetCartLineItemTaxRate>;
  setLineItemTotalPrice: Maybe<TSetCartLineItemTotalPrice>;
  setLocale: Maybe<TSetCartLocale>;
  setShippingAddress: Maybe<TSetCartShippingAddress>;
  setShippingAddressCustomField: Maybe<TSetCartShippingAddressCustomField>;
  setShippingAddressCustomType: Maybe<TSetCartShippingAddressCustomType>;
  setShippingMethod: Maybe<TSetCartShippingMethod>;
  setShippingMethodTaxAmount: Maybe<TSetCartShippingMethodTaxAmount>;
  setShippingMethodTaxRate: Maybe<TSetCartShippingMethodTaxRate>;
  setShippingRateInput: Maybe<TSetCartShippingRateInput>;
  updateItemShippingAddress: Maybe<TUpdateCartItemShippingAddress>;
};

export type TCartValueInput = {
  dummy: Maybe<Scalars['String']>;
};

export type TCartValueType = TShippingRateInputType & {
  __typename?: 'CartValueType';
  type: Scalars['String'];
};

export type TCartsConfiguration = {
  __typename?: 'CartsConfiguration';
  allowAddingUnpublishedProducts: Scalars['Boolean'];
  countryTaxRateFallbackEnabled: Scalars['Boolean'];
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
};

export type TCartsConfigurationInput = {
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
};

export type TCategory = TVersioned & {
  __typename?: 'Category';
  ancestors: Array<TCategory>;
  ancestorsRef: Array<TReference>;
  assets: Array<TAsset>;
  /** Number of direct child categories. */
  childCount: Scalars['Int'];
  /** Direct child categories. */
  children: Maybe<Array<TCategory>>;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  externalId: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  metaDescription: Maybe<Scalars['String']>;
  metaDescriptionAllLocales: Maybe<Array<TLocalizedString>>;
  metaKeywords: Maybe<Scalars['String']>;
  metaKeywordsAllLocales: Maybe<Array<TLocalizedString>>;
  metaTitle: Maybe<Scalars['String']>;
  metaTitleAllLocales: Maybe<Array<TLocalizedString>>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  orderHint: Scalars['String'];
  parent: Maybe<TCategory>;
  parentRef: Maybe<TReference>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  /** Number of staged products in the category subtree. */
  stagedProductCount: Scalars['Int'];
  version: Scalars['Long'];
};


export type TCategory_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TCategory_MetaDescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TCategory_MetaKeywordsArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TCategory_MetaTitleArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TCategory_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TCategory_SlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TCategoryCreated = TMessagePayload & {
  __typename?: 'CategoryCreated';
  category: TCategory;
  type: Scalars['String'];
};

export type TCategoryDraft = {
  assets: Maybe<Array<TAssetDraftInput>>;
  custom: Maybe<TCustomFieldsDraft>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  externalId: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>;
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>;
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>;
  name: Array<TLocalizedStringItemInputType>;
  orderHint: Maybe<Scalars['String']>;
  parent: Maybe<TResourceIdentifierInput>;
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
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
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
  custom: Maybe<TCustomFieldsType>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  externalId: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  orderHint: Scalars['String'];
  parent: Maybe<TCategorySearch>;
  parentRef: Maybe<TReference>;
  productTypeNames: Array<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  stagedProductCount: Scalars['Int'];
  version: Scalars['Long'];
};


export type TCategorySearch_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TCategorySearch_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TCategorySearch_SlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
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
  oldSlug: Maybe<Scalars['String']>;
  oldSlugAllLocales: Maybe<Array<TLocalizedString>>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  type: Scalars['String'];
};


export type TCategorySlugChanged_OldSlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TCategorySlugChanged_SlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TCategoryUpdateAction = {
  addAsset: Maybe<TAddCategoryAsset>;
  changeAssetName: Maybe<TChangeCategoryAssetName>;
  changeAssetOrder: Maybe<TChangeCategoryAssetOrder>;
  changeName: Maybe<TChangeCategoryName>;
  changeOrderHint: Maybe<TChangeCategoryOrderHint>;
  changeParent: Maybe<TChangeCategoryParent>;
  changeSlug: Maybe<TChangeCategorySlug>;
  removeAsset: Maybe<TRemoveCategoryAsset>;
  setAssetCustomField: Maybe<TSetCategoryAssetCustomField>;
  setAssetCustomType: Maybe<TSetCategoryAssetCustomType>;
  setAssetDescription: Maybe<TSetCategoryAssetDescription>;
  setAssetKey: Maybe<TSetCategoryAssetKey>;
  setAssetSources: Maybe<TSetCategoryAssetSources>;
  setAssetTags: Maybe<TSetCategoryAssetTags>;
  setCustomField: Maybe<TSetCategoryCustomField>;
  setCustomType: Maybe<TSetCategoryCustomType>;
  setDescription: Maybe<TSetCategoryDescription>;
  setExternalId: Maybe<TSetCategoryExternalId>;
  setKey: Maybe<TSetCategoryKey>;
  setMetaDescription: Maybe<TSetCategoryMetaDescription>;
  setMetaKeywords: Maybe<TSetCategoryMetaKeywords>;
  setMetaTitle: Maybe<TSetCategoryMetaTitle>;
};

export type TChangeCartCustomLineItemMoney = {
  customLineItemId: Scalars['String'];
  money: TBaseMoneyInput;
};

export type TChangeCartCustomLineItemQuantity = {
  customLineItemId: Scalars['String'];
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
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  lineItemId: Scalars['String'];
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
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
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
  description: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TChangeChannelKey = {
  key: Scalars['String'];
};

export type TChangeChannelName = {
  name: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TChangeCustomerAddress = {
  address: TAddressInput;
  addressId: Maybe<Scalars['String']>;
  addressKey: Maybe<Scalars['String']>;
};

export type TChangeCustomerEmail = {
  email: Scalars['String'];
};

export type TChangeCustomerGroupName = {
  name: Scalars['String'];
};

export type TChangeDiscountCodeCartDiscounts = {
  cartDiscounts: Array<TReferenceInput>;
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

export type TChangeMyCartTaxMode = {
  taxMode: TTaxMode;
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
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TChangeProductAssetOrder = {
  assetOrder: Array<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
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
  label: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TChangeProductMasterVariant = {
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TChangeProductName = {
  name: Array<TLocalizedStringItemInputType>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TChangeProductPrice = {
  price: TProductPriceDataInput;
  priceId: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TChangeProductSlug = {
  slug: Array<TLocalizedStringItemInputType>;
  staged: Maybe<Scalars['Boolean']>;
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

export type TChangeProjectSettingsLanguages = {
  languages: Array<Scalars['Locale']>;
};

export type TChangeProjectSettingsMessagesConfiguration = {
  messagesConfiguration: TMessagesConfigurationDraft;
};

export type TChangeProjectSettingsMessagesEnabled = {
  messagesEnabled: Scalars['Boolean'];
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
  lineItemId: Scalars['String'];
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
  textLineItemId: Scalars['String'];
};

export type TChangeShoppingListTextLineItemQuantity = {
  quantity: Scalars['Int'];
  textLineItemId: Scalars['String'];
};

export type TChangeShoppingListTextLineItemsOrder = {
  textLineItemOrder: Array<Scalars['String']>;
};

export type TChangeStagedOrderCustomLineItemMoney = {
  customLineItemId: Scalars['String'];
  money: TBaseMoneyInput;
};

export type TChangeStagedOrderCustomLineItemMoneyOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderCustomLineItemMoneyOutput';
  customLineItemId: Scalars['String'];
  money: TBaseMoney;
  type: Scalars['String'];
};

export type TChangeStagedOrderCustomLineItemQuantity = {
  customLineItemId: Scalars['String'];
  quantity: Scalars['Long'];
};

export type TChangeStagedOrderCustomLineItemQuantityOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderCustomLineItemQuantityOutput';
  customLineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TChangeStagedOrderLineItemQuantity = {
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
};

export type TChangeStagedOrderLineItemQuantityOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderLineItemQuantityOutput';
  externalPrice: Maybe<TBaseMoney>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPrice>;
  lineItemId: Scalars['String'];
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

export type TChangeStateInitial = {
  initial: Scalars['Boolean'];
};

export type TChangeStateKey = {
  key: Scalars['String'];
};

export type TChangeStateType = {
  type: TStateType;
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

export type TChannel = TReviewTarget & TVersioned & {
  __typename?: 'Channel';
  address: Maybe<TAddress>;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  geoLocation: Maybe<TGeometry>;
  id: Scalars['String'];
  key: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  reviewRatingStatistics: Maybe<TReviewRatingStatistics>;
  roles: Array<TChannelRole>;
  version: Scalars['Long'];
};


export type TChannel_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TChannel_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TChannelDraft = {
  address: Maybe<TAddressInput>;
  custom: Maybe<TCustomFieldsDraft>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  geoLocation: Maybe<TGeometryInput>;
  key: Scalars['String'];
  name: Maybe<Array<TLocalizedStringItemInputType>>;
  roles: Array<TChannelRole>;
};

export type TChannelQueryResult = {
  __typename?: 'ChannelQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TChannel>;
  total: Scalars['Long'];
};

export type TChannelReferenceIdentifier = {
  __typename?: 'ChannelReferenceIdentifier';
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
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
  addRoles: Maybe<TAddChannelRoles>;
  changeDescription: Maybe<TChangeChannelDescription>;
  changeKey: Maybe<TChangeChannelKey>;
  changeName: Maybe<TChangeChannelName>;
  removeRoles: Maybe<TRemoveChannelRoles>;
  setAddress: Maybe<TSetChannelAddress>;
  setAddressCustomField: Maybe<TSetChannelAddressCustomField>;
  setAddressCustomType: Maybe<TSetChannelAddressCustomType>;
  setCustomField: Maybe<TSetChannelCustomField>;
  setCustomType: Maybe<TSetChannelCustomType>;
  setGeoLocation: Maybe<TSetChannelGeoLocation>;
  setRoles: Maybe<TSetChannelRoles>;
};

export type TClassificationShippingRateInput = TShippingRateInput & {
  __typename?: 'ClassificationShippingRateInput';
  key: Scalars['String'];
  label: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
  type: Scalars['String'];
};


export type TClassificationShippingRateInput_LabelArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
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
  createdBy: Maybe<TInitiator>;
  destination: TDestination;
  format: TNotificationFormat;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  messages: Array<TMessageSubscription>;
  status: TSubscriptionHealthStatus;
  version: Scalars['Long'];
};

export type TCommercetoolsSubscriptionQueryResult = {
  __typename?: 'CommercetoolsSubscriptionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCommercetoolsSubscription>;
  total: Scalars['Long'];
};

export type TCreateApiClient = {
  name: Scalars['String'];
  scope: Scalars['String'];
};

export type TCreateStore = {
  custom: Maybe<TCustomFieldsDraft>;
  distributionChannels: Maybe<Array<TResourceIdentifierInput>>;
  key: Scalars['String'];
  languages: Maybe<Array<Scalars['Locale']>>;
  name: Maybe<Array<TLocalizedStringItemInputType>>;
  supplyChannels: Maybe<Array<TResourceIdentifierInput>>;
};

export type TCreateZone = {
  description: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  locations: Maybe<Array<TZoneLocation>>;
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
 * Examples for `value`:
 *
 * * FieldType `String`: `"\"This is a string\""`
 * * FieldType `DateTimeType`: `"\"2018-10-12T14:00:00.000Z\""`
 * * FieldType `Number`: `"4"`
 * * FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"`
 * * FieldType `Reference`: `"{\"id\", \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\", \"product\"}"`
 */
export type TCustomFieldInput = {
  name: Scalars['String'];
  /**
   * The value of this custom field consists of escaped JSON based on the FieldDefinition of the Type.
   *
   * Examples for `value`:
   *
   * * FieldType `String`: `"\"This is a string\""`
   * * FieldType `DateTimeType`: `"\"2018-10-12T14:00:00.000Z\""`
   * * FieldType `Number`: `"4"`
   * * FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"`
   * * FieldType `Reference`: `"{\"id\", \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\", \"product\"}"`
   */
  value: Scalars['String'];
};

export type TCustomFieldsCommand = {
  __typename?: 'CustomFieldsCommand';
  fields: Scalars['Json'];
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
  typeResId: Maybe<TResourceIdentifier>;
};

export type TCustomFieldsDraft = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TCustomFieldsType = {
  __typename?: 'CustomFieldsType';
  /** This field contains non-typed data. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>;
  type: Maybe<TTypeDefinition>;
  typeRef: TReference;
};


export type TCustomFieldsType_CustomFieldsRawArgs = {
  excludeNames: Maybe<Array<Scalars['String']>>;
  includeNames: Maybe<Array<Scalars['String']>>;
};

/** A custom line item is a generic item that can be added to the cart but is not bound to a product. You can use it for discounts (negative money), vouchers, complex cart rules, additional services or fees. You control the lifecycle of this item. */
export type TCustomLineItem = {
  __typename?: 'CustomLineItem';
  custom: Maybe<TCustomFieldsType>;
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  id: Scalars['String'];
  money: TBaseMoney;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  quantity: Scalars['Long'];
  shippingDetails: Maybe<TItemShippingDetails>;
  slug: Scalars['String'];
  state: Array<TItemState>;
  taxCategory: Maybe<TTaxCategory>;
  taxCategoryRef: Maybe<TReference>;
  taxRate: Maybe<TTaxRate>;
  taxedPrice: Maybe<TTaxedItemPrice>;
  totalPrice: TMoney;
};


/** A custom line item is a generic item that can be added to the cart but is not bound to a product. You can use it for discounts (negative money), vouchers, complex cart rules, additional services or fees. You control the lifecycle of this item. */
export type TCustomLineItem_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TCustomLineItemDraft = {
  custom: Maybe<TCustomFieldsDraft>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  money: TBaseMoneyInput;
  name: Array<TLocalizedStringItemInputType>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  slug: Scalars['String'];
  taxCategory: Maybe<TReferenceInput>;
};

export type TCustomLineItemDraftOutput = {
  __typename?: 'CustomLineItemDraftOutput';
  custom: Maybe<TCustomFieldsCommand>;
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  money: TBaseMoney;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraftOutput>;
  slug: Scalars['String'];
  taxCategoryResId: Maybe<TResourceIdentifier>;
};


export type TCustomLineItemDraftOutput_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TCustomLineItemReturnItem = TReturnItem & {
  __typename?: 'CustomLineItemReturnItem';
  comment: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  customLineItemId: Scalars['String'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  paymentState: TReturnPaymentState;
  quantity: Scalars['Long'];
  shipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TCustomLineItemStateTransition = TMessagePayload & {
  __typename?: 'CustomLineItemStateTransition';
  customLineItemId: Scalars['String'];
  fromState: Maybe<TState>;
  fromStateRef: TReference;
  quantity: Scalars['Long'];
  toState: Maybe<TState>;
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

export type TCustomObject = TVersioned & {
  __typename?: 'CustomObject';
  container: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  id: Scalars['String'];
  key: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  value: Scalars['Json'];
  version: Scalars['Long'];
};

export type TCustomObjectDraft = {
  container: Scalars['String'];
  key: Scalars['String'];
  /** The value should be passed in a form of escaped JSON */
  value: Scalars['String'];
  version: Maybe<Scalars['Long']>;
};

export type TCustomObjectLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CustomObjectLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TCustomObjectLimitsProjection = {
  __typename?: 'CustomObjectLimitsProjection';
  total: TCustomObjectLimitWithCurrent;
};

export type TCustomObjectQueryResult = {
  __typename?: 'CustomObjectQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCustomObject>;
  total: Scalars['Long'];
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
export type TCustomer = TVersioned & {
  __typename?: 'Customer';
  addresses: Array<TAddress>;
  billingAddressIds: Array<Scalars['String']>;
  billingAddresses: Array<TAddress>;
  companyName: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  customerNumber: Maybe<Scalars['String']>;
  dateOfBirth: Maybe<Scalars['Date']>;
  defaultBillingAddress: Maybe<TAddress>;
  defaultBillingAddressId: Maybe<Scalars['String']>;
  defaultShippingAddress: Maybe<TAddress>;
  defaultShippingAddressId: Maybe<Scalars['String']>;
  email: Scalars['String'];
  externalId: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isEmailVerified: Scalars['Boolean'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  lastName: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['Locale']>;
  middleName: Maybe<Scalars['String']>;
  password: Scalars['String'];
  salutation: Maybe<Scalars['String']>;
  shippingAddressIds: Array<Scalars['String']>;
  shippingAddresses: Array<TAddress>;
  stores: Array<TStore>;
  storesRef: Array<TKeyReference>;
  title: Maybe<Scalars['String']>;
  vatId: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};

/** A field to access a customer's active cart. */
export type TCustomerActiveCartInterface = {
  customerActiveCart: Maybe<TCart>;
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

export type TCustomerAddressRemoved = TMessagePayload & {
  __typename?: 'CustomerAddressRemoved';
  address: TAddress;
  type: Scalars['String'];
};

export type TCustomerCompanyNameSet = TMessagePayload & {
  __typename?: 'CustomerCompanyNameSet';
  companyName: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomerCreated = TMessagePayload & {
  __typename?: 'CustomerCreated';
  customer: TCustomer;
  type: Scalars['String'];
};

export type TCustomerDateOfBirthSet = TMessagePayload & {
  __typename?: 'CustomerDateOfBirthSet';
  dateOfBirth: Maybe<Scalars['Date']>;
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
  createdBy: Maybe<TInitiator>;
  customerId: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  value: Scalars['String'];
  version: Scalars['Long'];
};

export type TCustomerEmailVerified = TMessagePayload & {
  __typename?: 'CustomerEmailVerified';
  type: Scalars['String'];
};

/** A customer can be a member in a customer group (e.g. reseller, gold member). A customer group can be used in price calculations with special prices being assigned to certain customer groups. */
export type TCustomerGroup = TVersioned & {
  __typename?: 'CustomerGroup';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  name: Scalars['String'];
  version: Scalars['Long'];
};

export type TCustomerGroupDraft = {
  custom: Maybe<TCustomFieldsDraft>;
  groupName: Scalars['String'];
  key: Maybe<Scalars['String']>;
};

export type TCustomerGroupLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CustomerGroupLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TCustomerGroupLimitsProjection = {
  __typename?: 'CustomerGroupLimitsProjection';
  total: TCustomerGroupLimitWithCurrent;
};

export type TCustomerGroupQueryResult = {
  __typename?: 'CustomerGroupQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCustomerGroup>;
  total: Scalars['Long'];
};

export type TCustomerGroupReferenceIdentifier = {
  __typename?: 'CustomerGroupReferenceIdentifier';
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  typeId: Scalars['String'];
};

export type TCustomerGroupSet = TMessagePayload & {
  __typename?: 'CustomerGroupSet';
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TCustomerGroupUpdateAction = {
  changeName: Maybe<TChangeCustomerGroupName>;
  setCustomField: Maybe<TSetCustomerGroupCustomField>;
  setCustomType: Maybe<TSetCustomerGroupCustomType>;
  setKey: Maybe<TSetCustomerGroupKey>;
};

export type TCustomerLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CustomerLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TCustomerLimitsProjection = {
  __typename?: 'CustomerLimitsProjection';
  total: TCustomerLimitWithCurrent;
};

export type TCustomerPasswordToken = TVersioned & {
  __typename?: 'CustomerPasswordToken';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  customerId: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  value: Scalars['String'];
  version: Scalars['Long'];
};

export type TCustomerPasswordUpdated = TMessagePayload & {
  __typename?: 'CustomerPasswordUpdated';
  reset: Scalars['Boolean'];
  type: Scalars['String'];
};

/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface = {
  customer: Maybe<TCustomer>;
  customers: TCustomerQueryResult;
};


/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface_CustomerArgs = {
  emailToken: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  passwordToken: Maybe<Scalars['String']>;
};


/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface_CustomersArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};

export type TCustomerQueryResult = {
  __typename?: 'CustomerQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TCustomer>;
  total: Scalars['Long'];
};

export type TCustomerSignInDraft = {
  anonymousCart: Maybe<TResourceIdentifierInput>;
  /** This field will be deprecated in favour of anonymousCart.id. */
  anonymousCartId: Maybe<Scalars['String']>;
  anonymousCartSignInMode: Maybe<TAnonymousCartSignInMode>;
  anonymousId: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  updateProductData: Maybe<Scalars['Boolean']>;
};

export type TCustomerSignInResult = {
  __typename?: 'CustomerSignInResult';
  cart: Maybe<TCart>;
  customer: TCustomer;
};

export type TCustomerSignMeInDraft = {
  activeCartSignInMode: Maybe<TAnonymousCartSignInMode>;
  email: Scalars['String'];
  password: Scalars['String'];
  updateProductData: Maybe<Scalars['Boolean']>;
};

export type TCustomerSignMeUpDraft = {
  addresses: Maybe<Array<TAddressInput>>;
  /** The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses. */
  billingAddresses: Maybe<Array<Scalars['Int']>>;
  companyName: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
  dateOfBirth: Maybe<Scalars['Date']>;
  /** The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address. */
  defaultBillingAddress: Maybe<Scalars['Int']>;
  /** The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address. */
  defaultShippingAddress: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  firstName: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['Locale']>;
  middleName: Maybe<Scalars['String']>;
  password: Scalars['String'];
  salutation: Maybe<Scalars['String']>;
  /** The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses. */
  shippingAddresses: Maybe<Array<Scalars['Int']>>;
  stores: Maybe<Array<TResourceIdentifierInput>>;
  title: Maybe<Scalars['String']>;
  vatId: Maybe<Scalars['String']>;
};

export type TCustomerSignUpDraft = {
  addresses: Maybe<Array<TAddressInput>>;
  anonymousCart: Maybe<TResourceIdentifierInput>;
  /** This field will be deprecated in favour of anonymousCart.id. */
  anonymousCartId: Maybe<Scalars['String']>;
  anonymousId: Maybe<Scalars['String']>;
  /** The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses. */
  billingAddresses: Maybe<Array<Scalars['Int']>>;
  companyName: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
  customerGroup: Maybe<TResourceIdentifierInput>;
  customerNumber: Maybe<Scalars['String']>;
  dateOfBirth: Maybe<Scalars['Date']>;
  /** The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address. */
  defaultBillingAddress: Maybe<Scalars['Int']>;
  /** The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address. */
  defaultShippingAddress: Maybe<Scalars['Int']>;
  email: Scalars['String'];
  externalId: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  isEmailVerified: Maybe<Scalars['Boolean']>;
  key: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['Locale']>;
  middleName: Maybe<Scalars['String']>;
  password: Scalars['String'];
  salutation: Maybe<Scalars['String']>;
  /** The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses. */
  shippingAddresses: Maybe<Array<Scalars['Int']>>;
  stores: Maybe<Array<TResourceIdentifierInput>>;
  title: Maybe<Scalars['String']>;
  vatId: Maybe<Scalars['String']>;
};

export type TCustomerUpdateAction = {
  addAddress: Maybe<TAddCustomerAddress>;
  addBillingAddressId: Maybe<TAddCustomerBillingAddressId>;
  addShippingAddressId: Maybe<TAddCustomerShippingAddressId>;
  addStore: Maybe<TAddCustomerStore>;
  changeAddress: Maybe<TChangeCustomerAddress>;
  changeEmail: Maybe<TChangeCustomerEmail>;
  removeAddress: Maybe<TRemoveCustomerAddress>;
  removeBillingAddressId: Maybe<TRemoveCustomerBillingAddressId>;
  removeShippingAddressId: Maybe<TRemoveCustomerShippingAddressId>;
  removeStore: Maybe<TRemoveCustomerStore>;
  setAddressCustomField: Maybe<TSetCustomerAddressCustomField>;
  setAddressCustomType: Maybe<TSetCustomerAddressCustomType>;
  setCompanyName: Maybe<TSetCustomerCompanyName>;
  setCustomField: Maybe<TSetCustomerCustomField>;
  setCustomType: Maybe<TSetCustomerCustomType>;
  setCustomerGroup: Maybe<TSetCustomerGroup>;
  setCustomerNumber: Maybe<TSetCustomerNumber>;
  setDateOfBirth: Maybe<TSetCustomerDateOfBirth>;
  setDefaultBillingAddress: Maybe<TSetCustomerDefaultBillingAddress>;
  setDefaultShippingAddress: Maybe<TSetCustomerDefaultShippingAddress>;
  setExternalId: Maybe<TSetCustomerExternalId>;
  setFirstName: Maybe<TSetCustomerFirstName>;
  setKey: Maybe<TSetCustomerKey>;
  setLastName: Maybe<TSetCustomerLastName>;
  setLocale: Maybe<TSetCustomerLocale>;
  setMiddleName: Maybe<TSetCustomerMiddleName>;
  setSalutation: Maybe<TSetCustomerSalutation>;
  setStores: Maybe<TSetCustomerStores>;
  setTitle: Maybe<TSetCustomerTitle>;
  setVatId: Maybe<TSetCustomerVatId>;
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
  address: Maybe<TAddress>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  items: Array<TDeliveryItem>;
  parcels: Array<TParcel>;
};

export type TDeliveryAdded = TMessagePayload & {
  __typename?: 'DeliveryAdded';
  delivery: TDelivery;
  type: Scalars['String'];
};

export type TDeliveryAddressSet = TMessagePayload & {
  __typename?: 'DeliveryAddressSet';
  address: Maybe<TAddress>;
  deliveryId: Scalars['String'];
  oldAddress: Maybe<TAddress>;
  type: Scalars['String'];
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

export type TDeliveryItemsUpdated = TMessagePayload & {
  __typename?: 'DeliveryItemsUpdated';
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItem>;
  oldItems: Array<TDeliveryItem>;
  type: Scalars['String'];
};

export type TDeliveryRemoved = TMessagePayload & {
  __typename?: 'DeliveryRemoved';
  delivery: TDelivery;
  type: Scalars['String'];
};

export type TDestination = {
  type: Scalars['String'];
};

export type TDestinationInput = {
  AzureServiceBus: Maybe<TAzureServiceBusDestinationInput>;
  EventGrid: Maybe<TEventGridDestinationInput>;
  GoogleCloudPubSub: Maybe<TGoogleCloudPubSubDestinationInput>;
  SNS: Maybe<TSnsDestinationInput>;
  SQS: Maybe<TSqsDestinationInput>;
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

/** With discount codes it is possible to give specific cart discounts to an eligible amount of users. They are defined by a string value which can be added to a cart so that specific cart discounts can be applied to the cart. */
export type TDiscountCode = TVersioned & {
  __typename?: 'DiscountCode';
  /** How many times this discount code was applied (only applications that were part of a successful checkout are considered) */
  applicationCount: Scalars['Long'];
  applicationVersion: Maybe<Scalars['Long']>;
  cartDiscountRefs: Array<TReference>;
  cartDiscounts: Array<TCartDiscount>;
  cartPredicate: Maybe<Scalars['String']>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  groups: Array<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  maxApplications: Maybe<Scalars['Long']>;
  maxApplicationsPerCustomer: Maybe<Scalars['Long']>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  referenceRefs: Array<TReference>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  version: Scalars['Long'];
};


/** With discount codes it is possible to give specific cart discounts to an eligible amount of users. They are defined by a string value which can be added to a cart so that specific cart discounts can be applied to the cart. */
export type TDiscountCode_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


/** With discount codes it is possible to give specific cart discounts to an eligible amount of users. They are defined by a string value which can be added to a cart so that specific cart discounts can be applied to the cart. */
export type TDiscountCode_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TDiscountCodeDraft = {
  cartDiscounts: Array<TReferenceInput>;
  cartPredicate: Maybe<Scalars['String']>;
  code: Scalars['String'];
  custom: Maybe<TCustomFieldsDraft>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  groups: Maybe<Array<Scalars['String']>>;
  isActive: Maybe<Scalars['Boolean']>;
  maxApplications: Maybe<Scalars['Long']>;
  maxApplicationsPerCustomer: Maybe<Scalars['Long']>;
  name: Maybe<Array<TLocalizedStringItemInputType>>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
};

export type TDiscountCodeInfo = {
  __typename?: 'DiscountCodeInfo';
  discountCode: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  state: Maybe<TDiscountCodeState>;
};

export type TDiscountCodeQueryResult = {
  __typename?: 'DiscountCodeQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
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
  changeCartDiscounts: Maybe<TChangeDiscountCodeCartDiscounts>;
  changeGroups: Maybe<TChangeDiscountCodeGroups>;
  changeIsActive: Maybe<TChangeDiscountCodeIsActive>;
  setCartPredicate: Maybe<TSetDiscountCodeCartPredicate>;
  setCustomField: Maybe<TSetDiscountCodeCustomField>;
  setCustomType: Maybe<TSetDiscountCodeCustomType>;
  setDescription: Maybe<TSetDiscountCodeDescription>;
  setMaxApplications: Maybe<TSetDiscountCodeMaxApplications>;
  setMaxApplicationsPerCustomer: Maybe<TSetDiscountCodeMaxApplicationsPerCustomer>;
  setName: Maybe<TSetDiscountCodeName>;
  setValidFrom: Maybe<TSetDiscountCodeValidFrom>;
  setValidFromAndUntil: Maybe<TSetDiscountCodeValidFromAndUntil>;
  setValidUntil: Maybe<TSetDiscountCodeValidUntil>;
};

export type TDiscountedLineItemPortion = {
  __typename?: 'DiscountedLineItemPortion';
  discount: Maybe<TCartDiscount>;
  discountRef: TReference;
  discountedAmount: TBaseMoney;
};

export type TDiscountedLineItemPrice = {
  __typename?: 'DiscountedLineItemPrice';
  includedDiscounts: Array<TDiscountedLineItemPortion>;
  value: TBaseMoney;
};

export type TDiscountedLineItemPriceForQuantity = {
  __typename?: 'DiscountedLineItemPriceForQuantity';
  discountedPrice: TDiscountedLineItemPrice;
  quantity: Scalars['Long'];
};

export type TDiscountedProductPriceValue = {
  __typename?: 'DiscountedProductPriceValue';
  discount: Maybe<TProductDiscount>;
  discountRef: TReference;
  value: TBaseMoney;
};

export type TDiscountedProductPriceValueInput = {
  discount: TReferenceInput;
  value: TBaseMoneyInput;
};

export type TDiscountedProductSearchPriceValue = {
  __typename?: 'DiscountedProductSearchPriceValue';
  discount: Maybe<TProductDiscount>;
  discountRef: TReference;
  value: TBaseMoney;
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
  excludeKeys: Maybe<Array<Scalars['String']>>;
  includeKeys: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
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

export type TExistsFilterInput = {
  path: Scalars['String'];
};

export type TExtension = TVersioned & {
  __typename?: 'Extension';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  destination: TExtensionDestination;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  timeoutInMs: Maybe<Scalars['Int']>;
  triggers: Array<TTrigger>;
  version: Scalars['Long'];
};

export type TExtensionDestination = {
  type: Scalars['String'];
};

export type TExtensionDestinationInput = {
  AWSLambda: Maybe<TAwsLambdaDestinationInput>;
  HTTP: Maybe<THttpDestinationInput>;
};

export type TExtensionDraft = {
  destination: TExtensionDestinationInput;
  key: Maybe<Scalars['String']>;
  timeoutInMs: Maybe<Scalars['Int']>;
  triggers: Array<TTriggerInput>;
};

export type TExtensionLimitsProjection = {
  __typename?: 'ExtensionLimitsProjection';
  timeoutInMs: TLimit;
};

export type TExtensionQueryResult = {
  __typename?: 'ExtensionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TExtension>;
  total: Scalars['Long'];
};

export type TExtensionUpdateAction = {
  changeDestination: Maybe<TChangeExtensionDestination>;
  changeTriggers: Maybe<TChangeExtensionTriggers>;
  setKey: Maybe<TSetExtensionKey>;
  setTimeoutInMs: Maybe<TSetExtensionTimeoutInMs>;
};

export type TExternalDiscountValue = TProductDiscountValue & {
  __typename?: 'ExternalDiscountValue';
  type: Scalars['String'];
};

export type TExternalDiscountValueInput = {
  dummy: Maybe<Scalars['String']>;
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
  includedInPrice: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  state: Maybe<Scalars['String']>;
  subRates: Maybe<Array<TSubRateDraft>>;
};

export type TExternalTaxRateDraftOutput = {
  __typename?: 'ExternalTaxRateDraftOutput';
  amount: Maybe<Scalars['Float']>;
  country: Scalars['Country'];
  includedInPrice: Scalars['Boolean'];
  name: Scalars['String'];
  state: Maybe<Scalars['String']>;
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
  label: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
  name: Scalars['String'];
  required: Scalars['Boolean'];
  type: TFieldType;
};


/** Field definitions describe custom fields and allow you to define some meta-information associated with the field. */
export type TFieldDefinition_LabelArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
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
  Boolean: Maybe<TSimpleFieldTypeDraft>;
  Date: Maybe<TSimpleFieldTypeDraft>;
  DateTime: Maybe<TSimpleFieldTypeDraft>;
  Enum: Maybe<TFieldTypeEnumTypeDraft>;
  LocalizedEnum: Maybe<TFieldTypeLocalizedEnumTypeDraft>;
  LocalizedString: Maybe<TSimpleFieldTypeDraft>;
  Money: Maybe<TSimpleFieldTypeDraft>;
  Number: Maybe<TSimpleFieldTypeDraft>;
  Reference: Maybe<TFieldTypeReferenceTypeDraft>;
  Set: Maybe<TFieldTypeSetTypeDraft>;
  String: Maybe<TSimpleFieldTypeDraft>;
  Time: Maybe<TSimpleFieldTypeDraft>;
};

export type TFieldTypeLocalizedEnumTypeDraft = {
  values: Array<TLocalizedEnumValueInput>;
};

export type TFieldTypeReferenceTypeDraft = {
  referenceTypeId: Scalars['String'];
};

export type TFieldTypeSetElementTypeDraft = {
  Boolean: Maybe<TSimpleFieldTypeDraft>;
  Date: Maybe<TSimpleFieldTypeDraft>;
  DateTime: Maybe<TSimpleFieldTypeDraft>;
  Enum: Maybe<TFieldTypeEnumTypeDraft>;
  LocalizedEnum: Maybe<TFieldTypeLocalizedEnumTypeDraft>;
  LocalizedString: Maybe<TSimpleFieldTypeDraft>;
  Money: Maybe<TSimpleFieldTypeDraft>;
  Number: Maybe<TSimpleFieldTypeDraft>;
  Reference: Maybe<TFieldTypeReferenceTypeDraft>;
  String: Maybe<TSimpleFieldTypeDraft>;
  Time: Maybe<TSimpleFieldTypeDraft>;
};

export type TFieldTypeSetTypeDraft = {
  elementType: TFieldTypeSetElementTypeDraft;
};

export type TFixedPriceDiscountValue = TCartDiscountValue & {
  __typename?: 'FixedPriceDiscountValue';
  money: Array<TMoney>;
  type: Scalars['String'];
};

export type TFixedPriceDiscountValueInput = {
  money: Array<TMoneyInput>;
};

export type TGeometry = {
  type: Scalars['String'];
};

export type TGeometryInput = {
  coordinates: Maybe<Array<Scalars['Float']>>;
  type: Scalars['String'];
};

export type TGiftLineItemValue = TCartDiscountValue & {
  __typename?: 'GiftLineItemValue';
  distributionChannelRef: Maybe<TChannelReferenceIdentifier>;
  productRef: TProductReferenceIdentifier;
  supplyChannelRef: Maybe<TChannelReferenceIdentifier>;
  type: Scalars['String'];
  variantId: Scalars['Int'];
};

export type TGiftLineItemValueInput = {
  distributionChannel: Maybe<TResourceIdentifierInput>;
  product: TResourceIdentifierInput;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  variantId: Scalars['Int'];
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
  centAmount: Maybe<Scalars['Long']>;
  currencyCode: Scalars['Currency'];
  fractionDigits: Scalars['Int'];
  preciseAmount: Scalars['Long'];
};

export type THttpDestination = TExtensionDestination & {
  __typename?: 'HttpDestination';
  authentication: Maybe<THttpDestinationAuthentication>;
  type: Scalars['String'];
  url: Scalars['String'];
};

export type THttpDestinationAuthentication = {
  type: Scalars['String'];
};

export type THttpDestinationAuthenticationInput = {
  AuthorizationHeader: Maybe<TAuthorizationHeaderInput>;
  AzureFunctions: Maybe<TAzureFunctionsAuthenticationInput>;
};

export type THttpDestinationInput = {
  authentication: Maybe<THttpDestinationAuthenticationInput>;
  url: Scalars['String'];
};

export type TImage = {
  __typename?: 'Image';
  dimensions: TDimensions;
  label: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type TImageInput = {
  dimensions: TDimensionsInput;
  label: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type TImageProductSearch = {
  __typename?: 'ImageProductSearch';
  dimensions: TDimensionsProductSearch;
  label: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type TImportOrderCustomLineItemState = {
  customLineItemId: Scalars['String'];
  state: Array<TItemStateDraftType>;
};

export type TImportOrderLineItemState = {
  lineItemId: Scalars['String'];
  state: Array<TItemStateDraftType>;
};

export type TImportStagedOrderCustomLineItemState = {
  customLineItemId: Scalars['String'];
  state: Array<TItemStateDraftType>;
};

export type TImportStagedOrderCustomLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ImportStagedOrderCustomLineItemStateOutput';
  customLineItemId: Scalars['String'];
  state: Scalars['Set'];
  type: Scalars['String'];
};

export type TImportStagedOrderLineItemState = {
  lineItemId: Scalars['String'];
  state: Array<TItemStateDraftType>;
};

export type TImportStagedOrderLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ImportStagedOrderLineItemStateOutput';
  lineItemId: Scalars['String'];
  state: Scalars['Set'];
  type: Scalars['String'];
};

export type TInStore = TCartQueryInterface & TCustomerActiveCartInterface & TCustomerQueryInterface & TMeFieldInterface & TOrderQueryInterface & TShippingMethodsByCartInterface & {
  __typename?: 'InStore';
  cart: Maybe<TCart>;
  carts: TCartQueryResult;
  customer: Maybe<TCustomer>;
  customerActiveCart: Maybe<TCart>;
  customers: TCustomerQueryResult;
  /**
   * This field can only be used with an access token created with the password flow or with an anonymous session.
   *
   * It gives access to the data that is specific to the customer or the anonymous session linked to the access token.
   */
  me: TInStoreMe;
  order: Maybe<TOrder>;
  orders: TOrderQueryResult;
  shippingMethodsByCart: Array<TShippingMethod>;
  shoppingList: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
};


export type TInStore_CartArgs = {
  id: Scalars['String'];
};


export type TInStore_CartsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TInStore_CustomerArgs = {
  emailToken: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  passwordToken: Maybe<Scalars['String']>;
};


export type TInStore_CustomerActiveCartArgs = {
  customerId: Scalars['String'];
};


export type TInStore_CustomersArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TInStore_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TInStore_OrdersArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TInStore_ShippingMethodsByCartArgs = {
  id: Scalars['String'];
};


export type TInStore_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TInStore_ShoppingListsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};

export type TInStoreMe = TActiveCartInterface & TCartQueryInterface & TMeQueryInterface & TOrderQueryInterface & TShoppingListQueryInterface & {
  __typename?: 'InStoreMe';
  activeCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  cart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  carts: TCartQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customer: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  order: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  orders: TOrderQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  shoppingList: Maybe<TShoppingList>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  shoppingLists: TShoppingListQueryResult;
};


export type TInStoreMe_CartArgs = {
  id: Scalars['String'];
};


export type TInStoreMe_CartsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TInStoreMe_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TInStoreMe_OrdersArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TInStoreMe_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TInStoreMe_ShoppingListsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};

export type TInitiator = {
  __typename?: 'Initiator';
  anonymousId: Maybe<Scalars['String']>;
  clientId: Maybe<Scalars['String']>;
  customerRef: Maybe<TReference>;
  externalUserId: Maybe<Scalars['String']>;
  isPlatformClient: Maybe<Scalars['Boolean']>;
  userRef: Maybe<TReference>;
};

export type TInterfaceInteractionsRaw = {
  __typename?: 'InterfaceInteractionsRaw';
  fields: Array<TRawCustomField>;
  type: Maybe<TTypeDefinition>;
  typeRef: TReference;
};


export type TInterfaceInteractionsRaw_FieldsArgs = {
  excludeNames: Maybe<Array<Scalars['String']>>;
  includeNames: Maybe<Array<Scalars['String']>>;
};

export type TInterfaceInteractionsRawResult = {
  __typename?: 'InterfaceInteractionsRawResult';
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  results: Array<TInterfaceInteractionsRaw>;
  total: Scalars['Int'];
};

/** Inventory allows you to track stock quantity per SKU and optionally per supply channel */
export type TInventoryEntry = TVersioned & {
  __typename?: 'InventoryEntry';
  availableQuantity: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  expectedDelivery: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  quantityOnStock: Scalars['Long'];
  restockableInDays: Maybe<Scalars['Int']>;
  sku: Scalars['String'];
  supplyChannel: Maybe<TChannel>;
  supplyChannelRef: Maybe<TReference>;
  version: Scalars['Long'];
};

export type TInventoryEntryCreated = TMessagePayload & {
  __typename?: 'InventoryEntryCreated';
  inventoryEntry: TInventoryEntryCreatedContent;
  type: Scalars['String'];
};

export type TInventoryEntryCreatedContent = {
  __typename?: 'InventoryEntryCreatedContent';
  custom: Maybe<TCustomFieldsType>;
  expectedDelivery: Maybe<Scalars['DateTime']>;
  inventoryEntryId: Scalars['String'];
  key: Maybe<Scalars['String']>;
  messageId: Maybe<TMessageId>;
  quantityOnStock: Scalars['Long'];
  restockableInDays: Maybe<Scalars['Int']>;
  sku: Scalars['String'];
  supplyChannel: Maybe<TChannel>;
  supplyChannelRef: Maybe<TReference>;
};

export type TInventoryEntryDeleted = TMessagePayload & {
  __typename?: 'InventoryEntryDeleted';
  sku: Scalars['String'];
  supplyChannel: Maybe<TChannel>;
  supplyChannelRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TInventoryEntryDraft = {
  custom: Maybe<TCustomFieldsDraft>;
  expectedDelivery: Maybe<Scalars['DateTime']>;
  key: Maybe<Scalars['String']>;
  quantityOnStock: Maybe<Scalars['Long']>;
  restockableInDays: Maybe<Scalars['Int']>;
  sku: Scalars['String'];
  supplyChannel: Maybe<TResourceIdentifierInput>;
};

export type TInventoryEntryQuantitySet = TMessagePayload & {
  __typename?: 'InventoryEntryQuantitySet';
  newAvailableQuantity: Scalars['Long'];
  newQuantityOnStock: Scalars['Long'];
  oldAvailableQuantity: Scalars['Long'];
  oldQuantityOnStock: Scalars['Long'];
  type: Scalars['String'];
};

export type TInventoryEntryQueryResult = {
  __typename?: 'InventoryEntryQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TInventoryEntry>;
  total: Scalars['Long'];
};

export type TInventoryEntryUpdateAction = {
  addQuantity: Maybe<TAddInventoryEntryQuantity>;
  changeQuantity: Maybe<TChangeInventoryEntryQuantity>;
  removeQuantity: Maybe<TRemoveInventoryEntryQuantity>;
  setCustomField: Maybe<TSetInventoryEntryCustomField>;
  setCustomType: Maybe<TSetInventoryEntryCustomType>;
  setExpectedDelivery: Maybe<TSetInventoryEntryExpectedDelivery>;
  setRestockableInDays: Maybe<TSetInventoryEntryRestockableInDays>;
  setSupplyChannel: Maybe<TSetInventoryEntrySupplyChannel>;
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
};

export type TItemState = {
  __typename?: 'ItemState';
  quantity: Scalars['Long'];
  state: Maybe<TState>;
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
  limit: Maybe<Scalars['Long']>;
};

export type TLimitWithCurrent = {
  current: Maybe<Scalars['Long']>;
  limit: Maybe<Scalars['Long']>;
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
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsType>;
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  distributionChannel: Maybe<TChannel>;
  distributionChannelRef: Maybe<TReference>;
  id: Scalars['String'];
  inventoryMode: Maybe<TItemShippingDetails>;
  lastModifiedAt: Maybe<Scalars['DateTime']>;
  lineItemMode: TLineItemMode;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  price: TProductPrice;
  priceMode: TLineItemPriceMode;
  productId: Scalars['String'];
  productSlug: Maybe<Scalars['String']>;
  productSlugAllLocales: Maybe<Array<TLocalizedString>>;
  productType: Maybe<TProductTypeDefinition>;
  productTypeRef: Maybe<TReference>;
  quantity: Scalars['Long'];
  shippingDetails: Maybe<TItemShippingDetails>;
  state: Array<TItemState>;
  supplyChannel: Maybe<TChannel>;
  supplyChannelRef: Maybe<TReference>;
  taxRate: Maybe<TTaxRate>;
  taxedPrice: Maybe<TTaxedItemPrice>;
  totalPrice: Maybe<TMoney>;
  variant: Maybe<TProductVariant>;
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
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
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
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TLineItemDraft = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  productId: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  sku: Maybe<Scalars['String']>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  variantId: Maybe<Scalars['Int']>;
};

export type TLineItemDraftOutput = {
  __typename?: 'LineItemDraftOutput';
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsCommand>;
  distributionChannelResId: Maybe<TResourceIdentifier>;
  externalPrice: Maybe<TBaseMoney>;
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPrice>;
  productId: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraftOutput>;
  sku: Maybe<Scalars['String']>;
  supplyChannelResId: Maybe<TResourceIdentifier>;
  variantId: Maybe<Scalars['Int']>;
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
  comment: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lineItemId: Scalars['String'];
  paymentState: TReturnPaymentState;
  quantity: Scalars['Long'];
  shipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TLineItemStateTransition = TMessagePayload & {
  __typename?: 'LineItemStateTransition';
  fromState: Maybe<TState>;
  fromStateRef: TReference;
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  toState: Maybe<TState>;
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
  excludeKeys: Maybe<Array<Scalars['String']>>;
  includeKeys: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
};

export type TLocalizableEnumTypeDraft = {
  values: Array<TLocalizedEnumValueDraft>;
};

export type TLocalizableEnumValueType = {
  __typename?: 'LocalizableEnumValueType';
  key: Scalars['String'];
  label: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
};


export type TLocalizableEnumValueType_LabelArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TLocalizableEnumValueTypeResult = {
  __typename?: 'LocalizableEnumValueTypeResult';
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
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
  label: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type TLocalizedEnumAttribute_LabelArgs = {
  locale: Scalars['Locale'];
};

export type TLocalizedEnumField = TCustomField & {
  __typename?: 'LocalizedEnumField';
  key: Scalars['String'];
  label: Maybe<Scalars['String']>;
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
  label: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
};


export type TLocalizedEnumValue_LabelArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
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
  value: Maybe<Scalars['String']>;
};


export type TLocalizedStringAttribute_ValueArgs = {
  locale: Scalars['Locale'];
};

export type TLocalizedStringField = TCustomField & {
  __typename?: 'LocalizedStringField';
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
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
  state: Maybe<Scalars['String']>;
};

export type TMe = TActiveCartInterface & TCartQueryInterface & TMeQueryInterface & TOrderQueryInterface & TShoppingListQueryInterface & {
  __typename?: 'Me';
  activeCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  cart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  carts: TCartQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customer: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  order: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  orders: TOrderQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  payment: Maybe<TMyPayment>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  payments: TMyPaymentQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  shoppingList: Maybe<TShoppingList>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  shoppingLists: TShoppingListQueryResult;
};


export type TMe_CartArgs = {
  id: Scalars['String'];
};


export type TMe_CartsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TMe_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TMe_OrdersArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TMe_PaymentArgs = {
  id: Scalars['String'];
};


export type TMe_PaymentsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TMe_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMe_ShoppingListsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};

/** The me field gives access to the data that is specific to the customer or anonymous session linked to the access token. */
export type TMeFieldInterface = {
  me: TMeQueryInterface;
};

export type TMeQueryInterface = {
  activeCart: Maybe<TCart>;
  cart: Maybe<TCart>;
  carts: TCartQueryResult;
  order: Maybe<TOrder>;
  orders: TOrderQueryResult;
  shoppingList: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
};


export type TMeQueryInterface_CartArgs = {
  id: Scalars['String'];
};


export type TMeQueryInterface_CartsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TMeQueryInterface_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TMeQueryInterface_OrdersArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TMeQueryInterface_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMeQueryInterface_ShoppingListsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};

export type TMessage = TVersioned & {
  __typename?: 'Message';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  payload: TMessagePayload;
  resourceRef: TReference;
  resourceVersion: Scalars['Long'];
  sequenceNumber: Scalars['Long'];
  type: Scalars['String'];
  userProvidedIdentifiers: Maybe<TUserProvidedIdentifiers>;
  version: Scalars['Long'];
};

export type TMessageId = {
  __typename?: 'MessageId';
  id: Scalars['String'];
  sequenceNumber: Scalars['Long'];
};

export type TMessagePayload = {
  type: Scalars['String'];
};

export type TMessageQueryResult = {
  __typename?: 'MessageQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
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
  types: Maybe<Array<Scalars['String']>>;
};

export type TMessagesConfiguration = {
  __typename?: 'MessagesConfiguration';
  deleteDaysAfterCreation: Maybe<Scalars['Int']>;
  enabled: Scalars['Boolean'];
};

export type TMessagesConfigurationDraft = {
  deleteDaysAfterCreation: Scalars['Int'];
  enabled: Scalars['Boolean'];
};

export type TMissingFacetInput = {
  alias: Maybe<Scalars['String']>;
  path: Scalars['String'];
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
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TMultiBuyCustomLineItemsTarget = TCartDiscountTarget & {
  __typename?: 'MultiBuyCustomLineItemsTarget';
  discountedQuantity: Scalars['Long'];
  maxOccurrence: Maybe<Scalars['Int']>;
  predicate: Scalars['String'];
  selectionMode: TSelectionMode;
  triggerQuantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TMultiBuyCustomLineItemsTargetInput = {
  discountedQuantity: Scalars['Long'];
  maxOccurrence: Maybe<Scalars['Int']>;
  predicate: Scalars['String'];
  selectionMode: Maybe<TSelectionMode>;
  triggerQuantity: Scalars['Long'];
};

export type TMultiBuyLineItemsTarget = TCartDiscountTarget & {
  __typename?: 'MultiBuyLineItemsTarget';
  discountedQuantity: Scalars['Long'];
  maxOccurrence: Maybe<Scalars['Int']>;
  predicate: Scalars['String'];
  selectionMode: TSelectionMode;
  triggerQuantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TMultiBuyLineItemsTargetInput = {
  discountedQuantity: Scalars['Long'];
  maxOccurrence: Maybe<Scalars['Int']>;
  predicate: Scalars['String'];
  selectionMode: Maybe<TSelectionMode>;
  triggerQuantity: Scalars['Long'];
};

export type TMutation = {
  __typename?: 'Mutation';
  createApiClient: Maybe<TApiClientWithSecret>;
  createCart: Maybe<TCart>;
  createCartDiscount: Maybe<TCartDiscount>;
  createCategory: Maybe<TCategory>;
  createChannel: Maybe<TChannel>;
  createCustomerGroup: Maybe<TCustomerGroup>;
  createDiscountCode: Maybe<TDiscountCode>;
  createExtension: Maybe<TExtension>;
  createInventoryEntry: Maybe<TInventoryEntry>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  createMyCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  createMyOrderFromCart: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  createMyPayment: Maybe<TMyPayment>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  createMyShoppingList: Maybe<TShoppingList>;
  createOrUpdateCustomObject: Maybe<TCustomObject>;
  createOrderEdit: Maybe<TOrderEdit>;
  createOrderFromCart: Maybe<TOrder>;
  createPayment: Maybe<TPayment>;
  createProduct: Maybe<TProduct>;
  createProductDiscount: Maybe<TProductDiscount>;
  createProductType: Maybe<TProductTypeDefinition>;
  createReview: Maybe<TReview>;
  createShippingMethod: Maybe<TShippingMethod>;
  createShoppingList: Maybe<TShoppingList>;
  createState: Maybe<TState>;
  createStore: Maybe<TStore>;
  createSubscription: Maybe<TCommercetoolsSubscription>;
  createTaxCategory: Maybe<TTaxCategory>;
  createTypeDefinition: Maybe<TTypeDefinition>;
  createZone: Maybe<TZone>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customerChangeMyPassword: Maybe<TCustomer>;
  customerChangePassword: Maybe<TCustomer>;
  /** Verifies customer's email using a token. */
  customerConfirmEmail: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customerConfirmMyEmail: Maybe<TCustomer>;
  customerCreateEmailVerificationToken: TCustomerEmailToken;
  /** The token value is used to reset the password of the customer with the given email. The token is valid only for 10 minutes. */
  customerCreatePasswordResetToken: Maybe<TCustomerPasswordToken>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customerResetMyPassword: Maybe<TCustomer>;
  /**
   * The following workflow can be used to reset the customer’s password:
   *
   * 1. Create a password reset token and send it embedded in a link to the customer.
   * 2. When the customer clicks on the link, you may optionally retrieve customer by password token.
   * 3. When the customer entered new password, use reset customer’s password to reset the password.
   */
  customerResetPassword: Maybe<TCustomer>;
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
   * BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features
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
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features If used with an access token for Anonymous Sessions, all orders and carts belonging to the anonymousId will be assigned to the newly created customer. */
  customerSignMeUp: TCustomerSignInResult;
  /** Creates a customer. If an anonymous cart is given then the cart is assigned to the created customer and the version number of the Cart will increase. If the id of an anonymous session is given, all carts and orders will be assigned to the created customer. */
  customerSignUp: TCustomerSignInResult;
  deleteApiClient: Maybe<TApiClientWithoutSecret>;
  deleteCart: Maybe<TCart>;
  deleteCartDiscount: Maybe<TCartDiscount>;
  deleteCategory: Maybe<TCategory>;
  deleteChannel: Maybe<TChannel>;
  deleteCustomObject: Maybe<TCustomObject>;
  deleteCustomer: Maybe<TCustomer>;
  deleteCustomerGroup: Maybe<TCustomerGroup>;
  deleteDiscountCode: Maybe<TDiscountCode>;
  deleteExtension: Maybe<TExtension>;
  deleteInventoryEntry: Maybe<TInventoryEntry>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  deleteMyCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  deleteMyCustomer: Maybe<TCustomer>;
  deleteMyPayment: Maybe<TMyPayment>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  deleteMyShoppingList: Maybe<TShoppingList>;
  deleteOrder: Maybe<TOrder>;
  deleteOrderEdit: Maybe<TOrderEdit>;
  deletePayment: Maybe<TPayment>;
  deleteProduct: Maybe<TProduct>;
  deleteProductDiscount: Maybe<TProductDiscount>;
  deleteProductType: Maybe<TProductTypeDefinition>;
  deleteReview: Maybe<TReview>;
  deleteShippingMethod: Maybe<TShippingMethod>;
  deleteShoppingList: Maybe<TShoppingList>;
  deleteState: Maybe<TState>;
  deleteStore: Maybe<TStore>;
  deleteSubscription: Maybe<TCommercetoolsSubscription>;
  deleteTaxCategory: Maybe<TTaxCategory>;
  deleteTypeDefinition: Maybe<TTypeDefinition>;
  deleteZone: Maybe<TZone>;
  replicateCart: Maybe<TCart>;
  updateCart: Maybe<TCart>;
  updateCartDiscount: Maybe<TCartDiscount>;
  updateCategory: Maybe<TCategory>;
  updateChannel: Maybe<TChannel>;
  updateCustomer: Maybe<TCustomer>;
  updateCustomerGroup: Maybe<TCustomerGroup>;
  updateDiscountCode: Maybe<TDiscountCode>;
  updateExtension: Maybe<TExtension>;
  updateInventoryEntry: Maybe<TInventoryEntry>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  updateMyCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  updateMyCustomer: Maybe<TCustomer>;
  updateMyPayment: Maybe<TMyPayment>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  updateMyShoppingList: Maybe<TShoppingList>;
  updateOrder: Maybe<TOrder>;
  updateOrderEdit: Maybe<TOrderEdit>;
  updatePayment: Maybe<TPayment>;
  updateProduct: Maybe<TProduct>;
  updateProductDiscount: Maybe<TProductDiscount>;
  updateProductType: Maybe<TProductTypeDefinition>;
  updateProject: Maybe<TProjectProjection>;
  updateReview: Maybe<TReview>;
  updateShippingMethod: Maybe<TShippingMethod>;
  updateShoppingList: Maybe<TShoppingList>;
  updateState: Maybe<TState>;
  updateStore: Maybe<TStore>;
  updateSubscription: Maybe<TCommercetoolsSubscription>;
  updateTaxCategory: Maybe<TTaxCategory>;
  updateTypeDefinition: Maybe<TTypeDefinition>;
  updateZone: Maybe<TZone>;
};


export type TMutation_CreateApiClientArgs = {
  draft: TCreateApiClient;
};


export type TMutation_CreateCartArgs = {
  draft: TCartDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateCartDiscountArgs = {
  draft: TCartDiscountDraft;
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


export type TMutation_CreateMyCartArgs = {
  draft: TMyCartDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateMyOrderFromCartArgs = {
  draft: TOrderMyCartCommand;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateMyPaymentArgs = {
  draft: TMyPaymentDraft;
};


export type TMutation_CreateMyShoppingListArgs = {
  draft: TMyShoppingListDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateOrUpdateCustomObjectArgs = {
  draft: TCustomObjectDraft;
};


export type TMutation_CreateOrderEditArgs = {
  draft: TOrderEditDraft;
};


export type TMutation_CreateOrderFromCartArgs = {
  draft: TOrderCartCommand;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
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


export type TMutation_CreateProductTypeArgs = {
  draft: TProductTypeDraft;
};


export type TMutation_CreateReviewArgs = {
  draft: TReviewDraft;
};


export type TMutation_CreateShippingMethodArgs = {
  draft: TShippingMethodDraft;
};


export type TMutation_CreateShoppingListArgs = {
  draft: TShoppingListDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
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
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_CustomerChangePasswordArgs = {
  currentPassword: Scalars['String'];
  id: Scalars['String'];
  newPassword: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_CustomerConfirmEmailArgs = {
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  tokenValue: Scalars['String'];
  version: Maybe<Scalars['Long']>;
};


export type TMutation_CustomerConfirmMyEmailArgs = {
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  tokenValue: Scalars['String'];
};


export type TMutation_CustomerCreateEmailVerificationTokenArgs = {
  id: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  ttlMinutes: Scalars['Int'];
  version: Maybe<Scalars['Long']>;
};


export type TMutation_CustomerCreatePasswordResetTokenArgs = {
  email: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  ttlMinutes: Maybe<Scalars['Int']>;
};


export type TMutation_CustomerResetMyPasswordArgs = {
  newPassword: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  tokenValue: Scalars['String'];
};


export type TMutation_CustomerResetPasswordArgs = {
  newPassword: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  tokenValue: Scalars['String'];
  version: Maybe<Scalars['Long']>;
};


export type TMutation_CustomerSignInArgs = {
  draft: TCustomerSignInDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerSignMeInArgs = {
  draft: TCustomerSignMeInDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerSignMeUpArgs = {
  draft: TCustomerSignMeUpDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerSignUpArgs = {
  draft: TCustomerSignUpDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_DeleteApiClientArgs = {
  id: Scalars['String'];
};


export type TMutation_DeleteCartArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteCartDiscountArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteCategoryArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteChannelArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_DeleteCustomObjectArgs = {
  container: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  version: Maybe<Scalars['Long']>;
};


export type TMutation_DeleteCustomerArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteCustomerGroupArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteDiscountCodeArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_DeleteExtensionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteInventoryEntryArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_DeleteMyCartArgs = {
  id: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteMyCustomerArgs = {
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteMyPaymentArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_DeleteMyShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteOrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteOrderEditArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeletePaymentArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteProductArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteProductDiscountArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteProductTypeArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteReviewArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteShippingMethodArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteStateArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteStoreArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteSubscriptionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteTaxCategoryArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteTypeDefinitionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_DeleteZoneArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_ReplicateCartArgs = {
  key: Maybe<Scalars['String']>;
  reference: TReferenceInput;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_UpdateCartArgs = {
  actions: Array<TCartUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateCartDiscountArgs = {
  actions: Array<TCartDiscountUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateCategoryArgs = {
  actions: Array<TCategoryUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateChannelArgs = {
  actions: Array<TChannelUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_UpdateCustomerArgs = {
  actions: Array<TCustomerUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateCustomerGroupArgs = {
  actions: Array<TCustomerGroupUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateDiscountCodeArgs = {
  actions: Array<TDiscountCodeUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_UpdateExtensionArgs = {
  actions: Array<TExtensionUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateInventoryEntryArgs = {
  actions: Array<TInventoryEntryUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_UpdateMyCartArgs = {
  actions: Array<TMyCartUpdateAction>;
  id: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateMyCustomerArgs = {
  actions: Array<TMyCustomerUpdateAction>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateMyPaymentArgs = {
  actions: Array<TMyPaymentUpdateAction>;
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_UpdateMyShoppingListArgs = {
  actions: Array<TMyShoppingListUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateOrderArgs = {
  actions: Array<TOrderUpdateAction>;
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateOrderEditArgs = {
  actions: Array<TOrderEditUpdateAction>;
  dryRun?: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdatePaymentArgs = {
  actions: Array<TPaymentUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateProductArgs = {
  actions: Array<TProductUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateProductDiscountArgs = {
  actions: Array<TProductDiscountUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateProductTypeArgs = {
  actions: Array<TProductTypeUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateProjectArgs = {
  actions: Array<TProjectSettingsUpdateAction>;
  version: Scalars['Long'];
};


export type TMutation_UpdateReviewArgs = {
  actions: Array<TReviewUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateShippingMethodArgs = {
  actions: Array<TShippingMethodUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateShoppingListArgs = {
  actions: Array<TShoppingListUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateStateArgs = {
  actions: Array<TStateUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateStoreArgs = {
  actions: Array<TStoreUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateSubscriptionArgs = {
  actions: Array<TSubscriptionUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateTaxCategoryArgs = {
  actions: Array<TTaxCategoryUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateTypeDefinitionArgs = {
  actions: Array<TTypeUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};


export type TMutation_UpdateZoneArgs = {
  actions: Array<TZoneUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};

export type TMyCartDraft = {
  billingAddress: Maybe<TAddressInput>;
  country: Maybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  custom: Maybe<TCustomFieldsDraft>;
  customerEmail: Maybe<Scalars['String']>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  discountCodes: Maybe<Array<Scalars['String']>>;
  inventoryMode: Maybe<TInventoryMode>;
  itemShippingAddresses: Maybe<Array<TAddressInput>>;
  lineItems: Maybe<Array<TMyLineItemDraft>>;
  locale: Maybe<Scalars['Locale']>;
  shippingAddress: Maybe<TAddressInput>;
  shippingMethod: Maybe<TResourceIdentifierInput>;
  store: Maybe<TResourceIdentifierInput>;
  taxMode: Maybe<TTaxMode>;
};

export type TMyCartUpdateAction = {
  addDiscountCode: Maybe<TAddCartDiscountCode>;
  addItemShippingAddress: Maybe<TAddCartItemShippingAddress>;
  addLineItem: Maybe<TAddMyCartLineItem>;
  addPayment: Maybe<TAddCartPayment>;
  addShoppingList: Maybe<TAddCartShoppingList>;
  applyDeltaToLineItemShippingDetailsTargets: Maybe<TApplyCartDeltaToLineItemShippingDetailsTargets>;
  changeLineItemQuantity: Maybe<TChangeCartLineItemQuantity>;
  changeTaxMode: Maybe<TChangeMyCartTaxMode>;
  recalculate: Maybe<TRecalculateCart>;
  removeDiscountCode: Maybe<TRemoveCartDiscountCode>;
  removeItemShippingAddress: Maybe<TRemoveCartItemShippingAddress>;
  removeLineItem: Maybe<TRemoveCartLineItem>;
  removePayment: Maybe<TRemoveCartPayment>;
  setBillingAddress: Maybe<TSetCartBillingAddress>;
  setBillingAddressCustomField: Maybe<TSetCartBillingAddressCustomField>;
  setBillingAddressCustomType: Maybe<TSetCartBillingAddressCustomType>;
  setCountry: Maybe<TSetCartCountry>;
  setCustomField: Maybe<TSetCartCustomField>;
  setCustomType: Maybe<TSetCartCustomType>;
  setCustomerEmail: Maybe<TSetCartCustomerEmail>;
  setDeleteDaysAfterLastModification: Maybe<TSetCartDeleteDaysAfterLastModification>;
  setItemShippingAddressCustomField: Maybe<TSetCartItemShippingAddressCustomField>;
  setItemShippingAddressCustomType: Maybe<TSetCartItemShippingAddressCustomType>;
  setLineItemCustomField: Maybe<TSetCartLineItemCustomField>;
  setLineItemCustomType: Maybe<TSetCartLineItemCustomType>;
  setLineItemDistributionChannel: Maybe<TSetCartLineItemDistributionChannel>;
  setLineItemShippingDetails: Maybe<TSetCartLineItemShippingDetails>;
  setLocale: Maybe<TSetCartLocale>;
  setShippingAddress: Maybe<TSetCartShippingAddress>;
  setShippingAddressCustomField: Maybe<TSetCartShippingAddressCustomField>;
  setShippingAddressCustomType: Maybe<TSetCartShippingAddressCustomType>;
  setShippingMethod: Maybe<TSetMyCartShippingMethod>;
  updateItemShippingAddress: Maybe<TUpdateCartItemShippingAddress>;
};

export type TMyCustomerUpdateAction = {
  addAddress: Maybe<TAddCustomerAddress>;
  addBillingAddressId: Maybe<TAddCustomerBillingAddressId>;
  addShippingAddressId: Maybe<TAddCustomerShippingAddressId>;
  changeAddress: Maybe<TChangeCustomerAddress>;
  changeEmail: Maybe<TChangeCustomerEmail>;
  removeAddress: Maybe<TRemoveCustomerAddress>;
  removeBillingAddressId: Maybe<TRemoveCustomerBillingAddressId>;
  removeShippingAddressId: Maybe<TRemoveCustomerShippingAddressId>;
  setAddressCustomField: Maybe<TSetCustomerAddressCustomField>;
  setAddressCustomType: Maybe<TSetCustomerAddressCustomType>;
  setCompanyName: Maybe<TSetCustomerCompanyName>;
  setCustomField: Maybe<TSetCustomerCustomField>;
  setCustomType: Maybe<TSetCustomerCustomType>;
  setDateOfBirth: Maybe<TSetCustomerDateOfBirth>;
  setDefaultBillingAddress: Maybe<TSetCustomerDefaultBillingAddress>;
  setDefaultShippingAddress: Maybe<TSetCustomerDefaultShippingAddress>;
  setFirstName: Maybe<TSetCustomerFirstName>;
  setLastName: Maybe<TSetCustomerLastName>;
  setLocale: Maybe<TSetCustomerLocale>;
  setMiddleName: Maybe<TSetCustomerMiddleName>;
  setSalutation: Maybe<TSetCustomerSalutation>;
  setTitle: Maybe<TSetCustomerTitle>;
  setVatId: Maybe<TSetCustomerVatId>;
};

export type TMyLineItemDraft = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  productId: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  sku: Maybe<Scalars['String']>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  variantId: Maybe<Scalars['Int']>;
};

/**
 * My Payments endpoint provides access to payments scoped to a specific user.
 * [documentation](https://docs.commercetools.com/http-api-projects-me-payments#mypayment)
 */
export type TMyPayment = {
  __typename?: 'MyPayment';
  amountPlanned: TMoney;
  anonymousId: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsType>;
  customer: Maybe<TCustomer>;
  customerRef: Maybe<TReference>;
  id: Scalars['String'];
  paymentMethodInfo: TPaymentMethodInfo;
  transactions: Array<TTransaction>;
  version: Scalars['Long'];
};

export type TMyPaymentDraft = {
  amountPlanned: TMoneyInput;
  custom: Maybe<TCustomFieldsDraft>;
  paymentMethodInfo: Maybe<TPaymentMethodInfoInput>;
  transaction: Maybe<TMyTransactionDraft>;
};

export type TMyPaymentQueryResult = {
  __typename?: 'MyPaymentQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TMyPayment>;
  total: Scalars['Long'];
};

export type TMyPaymentUpdateAction = {
  addTransaction: Maybe<TAddMyPaymentTransaction>;
  changeAmountPlanned: Maybe<TChangePaymentAmountPlanned>;
  setCustomField: Maybe<TSetPaymentCustomField>;
  setMethodInfoInterface: Maybe<TSetPaymentMethodInfoInterface>;
  setMethodInfoMethod: Maybe<TSetPaymentMethodInfoMethod>;
  setMethodInfoName: Maybe<TSetPaymentMethodInfoName>;
};

export type TMyShoppingListDraft = {
  custom: Maybe<TCustomFieldsDraft>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  lineItems: Maybe<Array<TShoppingListLineItemDraft>>;
  name: Array<TLocalizedStringItemInputType>;
  textLineItems: Maybe<Array<TTextLineItemDraft>>;
};

export type TMyShoppingListUpdateAction = {
  addLineItem: Maybe<TAddShoppingListLineItem>;
  addTextLineItem: Maybe<TAddShoppingListTextLineItem>;
  changeLineItemQuantity: Maybe<TChangeShoppingListLineItemQuantity>;
  changeLineItemsOrder: Maybe<TChangeShoppingListLineItemsOrder>;
  changeName: Maybe<TChangeShoppingListName>;
  changeTextLineItemName: Maybe<TChangeShoppingListTextLineItemName>;
  changeTextLineItemQuantity: Maybe<TChangeShoppingListTextLineItemQuantity>;
  changeTextLineItemsOrder: Maybe<TChangeShoppingListTextLineItemsOrder>;
  removeLineItem: Maybe<TRemoveShoppingListLineItem>;
  removeTextLineItem: Maybe<TRemoveShoppingListTextLineItem>;
  setCustomField: Maybe<TSetShoppingListCustomField>;
  setCustomType: Maybe<TSetShoppingListCustomType>;
  setDeleteDaysAfterLastModification: Maybe<TSetShoppingListDeleteDaysAfterLastModification>;
  setDescription: Maybe<TSetShoppingListDescription>;
  setLineItemCustomField: Maybe<TSetShoppingListLineItemCustomField>;
  setLineItemCustomType: Maybe<TSetShoppingListLineItemCustomType>;
  setStore: Maybe<TSetShoppingListStore>;
  setTextLineItemCustomField: Maybe<TSetShoppingListTextLineItemCustomField>;
  setTextLineItemCustomType: Maybe<TSetShoppingListTextLineItemCustomType>;
  setTextLineItemDescription: Maybe<TSetShoppingListTextLineItemDescription>;
};

export type TMyTransactionDraft = {
  amount: TMoneyInput;
  interactionId: Maybe<Scalars['String']>;
  timestamp: Maybe<Scalars['DateTime']>;
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
 * [documentation](https://docs.commercetools.com/http-api-projects-orders.html)
 */
export type TOrder = TVersioned & {
  __typename?: 'Order';
  anonymousId: Maybe<Scalars['String']>;
  billingAddress: Maybe<TAddress>;
  cart: Maybe<TCart>;
  cartRef: Maybe<TReference>;
  completedAt: Maybe<Scalars['DateTime']>;
  country: Maybe<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  customLineItems: Array<TCustomLineItem>;
  customer: Maybe<TCustomer>;
  customerEmail: Maybe<Scalars['String']>;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  customerId: Maybe<Scalars['String']>;
  discountCodes: Array<TDiscountCodeInfo>;
  id: Scalars['String'];
  inventoryMode: TInventoryMode;
  itemShippingAddresses: Array<TAddress>;
  lastMessageSequenceNumber: Scalars['Long'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  lineItems: Array<TLineItem>;
  locale: Maybe<Scalars['Locale']>;
  orderNumber: Maybe<Scalars['String']>;
  orderState: TOrderState;
  origin: TCartOrigin;
  paymentInfo: Maybe<TPaymentInfo>;
  paymentState: Maybe<TPaymentState>;
  refusedGifts: Array<TCartDiscount>;
  refusedGiftsRefs: Array<TReference>;
  returnInfo: Array<TReturnInfo>;
  shipmentState: Maybe<TShipmentState>;
  shippingAddress: Maybe<TAddress>;
  shippingInfo: Maybe<TShippingInfo>;
  shippingRateInput: Maybe<TShippingRateInput>;
  state: Maybe<TState>;
  stateRef: Maybe<TReference>;
  store: Maybe<TStore>;
  storeRef: Maybe<TKeyReference>;
  syncInfo: Array<TSyncInfo>;
  taxCalculationMode: TTaxCalculationMode;
  taxMode: TTaxMode;
  taxRoundingMode: TRoundingMode;
  taxedPrice: Maybe<TTaxedPrice>;
  totalPrice: TMoney;
  version: Scalars['Long'];
};

export type TOrderBillingAddressSet = TMessagePayload & {
  __typename?: 'OrderBillingAddressSet';
  address: Maybe<TAddress>;
  oldAddress: Maybe<TAddress>;
  type: Scalars['String'];
};

export type TOrderCartCommand = {
  cart: Maybe<TResourceIdentifierInput>;
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
  orderState: Maybe<TOrderState>;
  paymentState: Maybe<TPaymentState>;
  shipmentState: Maybe<TShipmentState>;
  state: Maybe<TReferenceInput>;
  version: Scalars['Long'];
};

export type TOrderCreated = TMessagePayload & {
  __typename?: 'OrderCreated';
  order: TOrder;
  type: Scalars['String'];
};

export type TOrderCustomLineItemAdded = TMessagePayload & {
  __typename?: 'OrderCustomLineItemAdded';
  customLineItem: TCustomLineItem;
  type: Scalars['String'];
};

export type TOrderCustomLineItemDiscountSet = TMessagePayload & {
  __typename?: 'OrderCustomLineItemDiscountSet';
  customLineItemId: Scalars['String'];
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  taxedPrice: Maybe<TTaxedItemPrice>;
  type: Scalars['String'];
};

export type TOrderCustomLineItemQuantityChanged = TMessagePayload & {
  __typename?: 'OrderCustomLineItemQuantityChanged';
  customLineItemId: Scalars['String'];
  oldQuantity: Maybe<Scalars['Long']>;
  quantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TOrderCustomLineItemRemoved = TMessagePayload & {
  __typename?: 'OrderCustomLineItemRemoved';
  customLineItem: Maybe<TCustomLineItem>;
  customLineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TOrderCustomerEmailSet = TMessagePayload & {
  __typename?: 'OrderCustomerEmailSet';
  email: Maybe<Scalars['String']>;
  oldEmail: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TOrderCustomerGroupSet = TMessagePayload & {
  __typename?: 'OrderCustomerGroupSet';
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  oldCustomerGroup: Maybe<TCustomerGroup>;
  oldCustomerGroupRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TOrderCustomerSet = TMessagePayload & {
  __typename?: 'OrderCustomerSet';
  customer: Maybe<TCustomer>;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  customerRef: Maybe<TReference>;
  oldCustomer: Maybe<TCustomer>;
  oldCustomerGroup: Maybe<TCustomerGroup>;
  oldCustomerGroupRef: Maybe<TReference>;
  oldCustomerRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TOrderDeleted = TMessagePayload & {
  __typename?: 'OrderDeleted';
  order: Maybe<TOrder>;
  type: Scalars['String'];
};

export type TOrderDiscountCodeAdded = TMessagePayload & {
  __typename?: 'OrderDiscountCodeAdded';
  discountCode: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  type: Scalars['String'];
};

export type TOrderDiscountCodeRemoved = TMessagePayload & {
  __typename?: 'OrderDiscountCodeRemoved';
  discountCode: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  type: Scalars['String'];
};

export type TOrderDiscountCodeStateSet = TMessagePayload & {
  __typename?: 'OrderDiscountCodeStateSet';
  discountCode: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  oldState: Maybe<TDiscountCodeState>;
  state: TDiscountCodeState;
  type: Scalars['String'];
};

export type TOrderEdit = TVersioned & {
  __typename?: 'OrderEdit';
  comment: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  resource: Maybe<TOrder>;
  resourceRef: TReference;
  result: TOrderEditResult;
  stagedActions: Array<TStagedOrderUpdateActionOutput>;
  version: Scalars['Long'];
};

export type TOrderEditApplied = TMessagePayload & {
  __typename?: 'OrderEditApplied';
  edit: Maybe<TOrderEdit>;
  editRef: TReference;
  result: TApplied;
  type: Scalars['String'];
};

export type TOrderEditDraft = {
  comment: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
  dryRun: Maybe<Scalars['Boolean']>;
  key: Maybe<Scalars['String']>;
  resource: TReferenceInput;
  stagedActions: Array<TStagedOrderUpdateAction>;
};

export type TOrderEditLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'OrderEditLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TOrderEditLimitsProjection = {
  __typename?: 'OrderEditLimitsProjection';
  total: TOrderEditLimitWithCurrent;
};

export type TOrderEditQueryResult = {
  __typename?: 'OrderEditQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TOrderEdit>;
  total: Scalars['Long'];
};

export type TOrderEditResult = {
  type: Scalars['String'];
};

export type TOrderEditUpdateAction = {
  addStagedAction: Maybe<TAddOrderEditStagedAction>;
  setComment: Maybe<TSetOrderEditComment>;
  setCustomField: Maybe<TSetOrderEditCustomField>;
  setCustomType: Maybe<TSetOrderEditCustomType>;
  setKey: Maybe<TSetOrderEditKey>;
  setStagedActions: Maybe<TSetOrderEditStagedActions>;
};

export type TOrderExcerpt = {
  __typename?: 'OrderExcerpt';
  taxedPrice: Maybe<TTaxedPrice>;
  totalPrice: TMoney;
  version: Maybe<Scalars['Long']>;
};

export type TOrderImported = TMessagePayload & {
  __typename?: 'OrderImported';
  order: TOrder;
  type: Scalars['String'];
};

export type TOrderLineItemAdded = TMessagePayload & {
  __typename?: 'OrderLineItemAdded';
  addedQuantity: Scalars['Long'];
  lineItem: TLineItem;
  type: Scalars['String'];
};

export type TOrderLineItemDiscountSet = TMessagePayload & {
  __typename?: 'OrderLineItemDiscountSet';
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  lineItemId: Scalars['String'];
  taxedPrice: Maybe<TTaxedItemPrice>;
  totalPrice: TMoney;
  type: Scalars['String'];
};

export type TOrderLineItemDistributionChannelSet = TMessagePayload & {
  __typename?: 'OrderLineItemDistributionChannelSet';
  distributionChannel: Maybe<TChannel>;
  distributionChannelRef: Maybe<TReference>;
  lineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TOrderLineItemRemoved = TMessagePayload & {
  __typename?: 'OrderLineItemRemoved';
  lineItemId: Scalars['String'];
  newPrice: Maybe<TProductPrice>;
  newQuantity: Scalars['Long'];
  newShippingDetails: Maybe<TItemShippingDetails>;
  newState: Scalars['Set'];
  newTaxedPrice: Maybe<TTaxedItemPrice>;
  newTotalPrice: TMoney;
  removedQuantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TOrderMyCartCommand = {
  id: Scalars['String'];
  version: Scalars['Long'];
};

export type TOrderPaymentAdded = TMessagePayload & {
  __typename?: 'OrderPaymentAdded';
  paymentRef: TReference;
  type: Scalars['String'];
};

export type TOrderPaymentRemoved = TMessagePayload & {
  __typename?: 'OrderPaymentRemoved';
  paymentRef: TReference;
  removedPaymentInfo: Scalars['Boolean'];
  type: Scalars['String'];
};

export type TOrderPaymentStateChanged = TMessagePayload & {
  __typename?: 'OrderPaymentStateChanged';
  oldPaymentState: Maybe<TPaymentState>;
  paymentState: TPaymentState;
  type: Scalars['String'];
};

/** Fields to access orders. Includes direct access to a single order and searching for orders. */
export type TOrderQueryInterface = {
  order: Maybe<TOrder>;
  orders: TOrderQueryResult;
};


/** Fields to access orders. Includes direct access to a single order and searching for orders. */
export type TOrderQueryInterface_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


/** Fields to access orders. Includes direct access to a single order and searching for orders. */
export type TOrderQueryInterface_OrdersArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};

export type TOrderQueryResult = {
  __typename?: 'OrderQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TOrder>;
  total: Scalars['Long'];
};

export type TOrderReturnShipmentStateChanged = TMessagePayload & {
  __typename?: 'OrderReturnShipmentStateChanged';
  returnItemId: Scalars['String'];
  returnShipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TOrderSearchConfiguration = {
  __typename?: 'OrderSearchConfiguration';
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  status: TOrderSearchStatus;
};

export enum TOrderSearchStatus {
  Activated = 'Activated',
  Deactivated = 'Deactivated'
}

export type TOrderShipmentStateChanged = TMessagePayload & {
  __typename?: 'OrderShipmentStateChanged';
  oldShipmentState: Maybe<TShipmentState>;
  shipmentState: TShipmentState;
  type: Scalars['String'];
};

export type TOrderShippingAddressSet = TMessagePayload & {
  __typename?: 'OrderShippingAddressSet';
  address: Maybe<TAddress>;
  oldAddress: Maybe<TAddress>;
  type: Scalars['String'];
};

export type TOrderShippingInfoSet = TMessagePayload & {
  __typename?: 'OrderShippingInfoSet';
  oldShippingInfo: Maybe<TShippingInfo>;
  shippingInfo: Maybe<TShippingInfo>;
  type: Scalars['String'];
};

export type TOrderShippingRateInputSet = TMessagePayload & {
  __typename?: 'OrderShippingRateInputSet';
  oldShippingRateInput: Maybe<TShippingRateInput>;
  shippingRateInput: Maybe<TShippingRateInput>;
  type: Scalars['String'];
};

export enum TOrderState {
  Cancelled = 'Cancelled',
  Complete = 'Complete',
  Confirmed = 'Confirmed',
  Open = 'Open'
}

export type TOrderStateChanged = TMessagePayload & {
  __typename?: 'OrderStateChanged';
  oldOrderState: Maybe<TOrderState>;
  orderId: Scalars['String'];
  orderState: TOrderState;
  type: Scalars['String'];
};

export type TOrderStateTransition = TMessagePayload & {
  __typename?: 'OrderStateTransition';
  force: Scalars['Boolean'];
  oldState: Maybe<TState>;
  oldStateRef: Maybe<TReference>;
  state: Maybe<TState>;
  stateRef: TReference;
  type: Scalars['String'];
};

export type TOrderStoreSet = TMessagePayload & {
  __typename?: 'OrderStoreSet';
  oldStore: Maybe<TStore>;
  oldStoreRef: Maybe<TKeyReference>;
  store: Maybe<TStore>;
  storeRef: Maybe<TKeyReference>;
  type: Scalars['String'];
};

export type TOrderUpdateAction = {
  addDelivery: Maybe<TAddOrderDelivery>;
  addItemShippingAddress: Maybe<TAddOrderItemShippingAddress>;
  addParcelToDelivery: Maybe<TAddOrderParcelToDelivery>;
  addPayment: Maybe<TAddOrderPayment>;
  addReturnInfo: Maybe<TAddOrderReturnInfo>;
  changeOrderState: Maybe<TChangeOrderState>;
  changePaymentState: Maybe<TChangeOrderPaymentState>;
  changeShipmentState: Maybe<TChangeOrderShipmentState>;
  importCustomLineItemState: Maybe<TImportOrderCustomLineItemState>;
  importLineItemState: Maybe<TImportOrderLineItemState>;
  removeDelivery: Maybe<TRemoveOrderDelivery>;
  removeItemShippingAddress: Maybe<TRemoveOrderItemShippingAddress>;
  removeParcelFromDelivery: Maybe<TRemoveOrderParcelFromDelivery>;
  removePayment: Maybe<TRemoveOrderPayment>;
  setBillingAddress: Maybe<TSetOrderBillingAddress>;
  setBillingAddressCustomField: Maybe<TSetOrderBillingAddressCustomField>;
  setBillingAddressCustomType: Maybe<TSetOrderBillingAddressCustomType>;
  setCustomField: Maybe<TSetOrderCustomField>;
  setCustomLineItemCustomField: Maybe<TSetOrderCustomLineItemCustomField>;
  setCustomLineItemCustomType: Maybe<TSetOrderCustomLineItemCustomType>;
  setCustomLineItemShippingDetails: Maybe<TSetOrderCustomLineItemShippingDetails>;
  setCustomType: Maybe<TSetOrderCustomType>;
  setCustomerEmail: Maybe<TSetOrderCustomerEmail>;
  setCustomerId: Maybe<TSetOrderCustomerId>;
  setDeliveryAddress: Maybe<TSetOrderDeliveryAddress>;
  setDeliveryAddressCustomField: Maybe<TSetOrderDeliveryAddressCustomField>;
  setDeliveryAddressCustomType: Maybe<TSetOrderDeliveryAddressCustomType>;
  setDeliveryItems: Maybe<TSetOrderDeliveryItems>;
  setItemShippingAddressCustomField: Maybe<TSetOrderItemShippingAddressCustomField>;
  setItemShippingAddressCustomType: Maybe<TSetOrderItemShippingAddressCustomType>;
  setLineItemCustomField: Maybe<TSetOrderLineItemCustomField>;
  setLineItemCustomType: Maybe<TSetOrderLineItemCustomType>;
  setLineItemShippingDetails: Maybe<TSetOrderLineItemShippingDetails>;
  setLocale: Maybe<TSetOrderLocale>;
  setOrderNumber: Maybe<TSetOrderNumber>;
  setParcelItems: Maybe<TSetOrderParcelItems>;
  setParcelMeasurements: Maybe<TSetOrderParcelMeasurements>;
  setParcelTrackingData: Maybe<TSetOrderParcelTrackingData>;
  setReturnInfo: Maybe<TSetOrderReturnInfo>;
  setReturnPaymentState: Maybe<TSetOrderReturnPaymentState>;
  setReturnShipmentState: Maybe<TSetOrderReturnShipmentState>;
  setShippingAddress: Maybe<TSetOrderShippingAddress>;
  setShippingAddressCustomField: Maybe<TSetOrderShippingAddressCustomField>;
  setShippingAddressCustomType: Maybe<TSetOrderShippingAddressCustomType>;
  setStore: Maybe<TSetOrderStore>;
  transitionCustomLineItemState: Maybe<TTransitionOrderCustomLineItemState>;
  transitionLineItemState: Maybe<TTransitionOrderLineItemState>;
  transitionState: Maybe<TTransitionOrderState>;
  updateItemShippingAddress: Maybe<TUpdateOrderItemShippingAddress>;
  updateSyncInfo: Maybe<TUpdateOrderSyncInfo>;
};

export type TParcel = {
  __typename?: 'Parcel';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  items: Array<TDeliveryItem>;
  measurements: Maybe<TParcelMeasurements>;
  trackingData: Maybe<TTrackingData>;
};

export type TParcelAddedToDelivery = TMessagePayload & {
  __typename?: 'ParcelAddedToDelivery';
  delivery: TDelivery;
  parcel: TParcel;
  type: Scalars['String'];
};

export type TParcelData = {
  __typename?: 'ParcelData';
  items: Array<TDeliveryItem>;
  measurements: Maybe<TParcelMeasurements>;
  trackingData: Maybe<TTrackingData>;
};

export type TParcelDataDraftType = {
  items: Maybe<Array<TDeliveryItemDraftType>>;
  measurements: Maybe<TParcelMeasurementsDraftType>;
  trackingData: Maybe<TTrackingDataDraftType>;
};

export type TParcelItemsUpdated = TMessagePayload & {
  __typename?: 'ParcelItemsUpdated';
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItem>;
  oldItems: Array<TDeliveryItem>;
  parcelId: Scalars['String'];
  type: Scalars['String'];
};

export type TParcelMeasurements = {
  __typename?: 'ParcelMeasurements';
  heightInMillimeter: Maybe<Scalars['Int']>;
  lengthInMillimeter: Maybe<Scalars['Int']>;
  weightInGram: Maybe<Scalars['Int']>;
  widthInMillimeter: Maybe<Scalars['Int']>;
};

export type TParcelMeasurementsDraftType = {
  heightInMillimeter: Maybe<Scalars['Int']>;
  lengthInMillimeter: Maybe<Scalars['Int']>;
  weightInGram: Maybe<Scalars['Int']>;
  widthInMillimeter: Maybe<Scalars['Int']>;
};

export type TParcelMeasurementsUpdated = TMessagePayload & {
  __typename?: 'ParcelMeasurementsUpdated';
  deliveryId: Scalars['String'];
  measurements: Maybe<TParcelMeasurements>;
  parcelId: Scalars['String'];
  type: Scalars['String'];
};

export type TParcelRemovedFromDelivery = TMessagePayload & {
  __typename?: 'ParcelRemovedFromDelivery';
  deliveryId: Scalars['String'];
  parcel: TParcel;
  type: Scalars['String'];
};

export type TParcelTrackingDataUpdated = TMessagePayload & {
  __typename?: 'ParcelTrackingDataUpdated';
  deliveryId: Scalars['String'];
  parcelId: Scalars['String'];
  trackingData: Maybe<TTrackingData>;
  type: Scalars['String'];
};

/**
 * Payments hold information about the current state of receiving and/or refunding money.
 * [documentation](https://docs.commercetools.com/http-api-projects-payments)
 */
export type TPayment = TVersioned & {
  __typename?: 'Payment';
  amountPlanned: TMoney;
  anonymousId: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  customer: Maybe<TCustomer>;
  customerRef: Maybe<TReference>;
  id: Scalars['String'];
  interfaceId: Maybe<Scalars['String']>;
  interfaceInteractionsRaw: TInterfaceInteractionsRawResult;
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  paymentMethodInfo: TPaymentMethodInfo;
  paymentStatus: TPaymentStatus;
  transactions: Array<TTransaction>;
  version: Scalars['Long'];
};


/**
 * Payments hold information about the current state of receiving and/or refunding money.
 * [documentation](https://docs.commercetools.com/http-api-projects-payments)
 */
export type TPayment_InterfaceInteractionsRawArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TPaymentCreated = TMessagePayload & {
  __typename?: 'PaymentCreated';
  payment: TPayment;
  type: Scalars['String'];
};

export type TPaymentDraft = {
  amountPlanned: TMoneyInput;
  anonymousId: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
  customer: Maybe<TResourceIdentifierInput>;
  interfaceId: Maybe<Scalars['String']>;
  interfaceInteractions: Maybe<Array<TCustomFieldsDraft>>;
  key: Maybe<Scalars['String']>;
  paymentMethodInfo: Maybe<TPaymentMethodInfoInput>;
  paymentStatus: Maybe<TPaymentStatusInput>;
  transactions: Maybe<Array<TTransactionDraft>>;
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
  method: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  paymentInterface: Maybe<Scalars['String']>;
};


export type TPaymentMethodInfo_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TPaymentMethodInfoInput = {
  method: Maybe<Scalars['String']>;
  name: Maybe<Array<TLocalizedStringItemInputType>>;
  paymentInterface: Maybe<Scalars['String']>;
};

export type TPaymentQueryResult = {
  __typename?: 'PaymentQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
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
  interfaceCode: Maybe<Scalars['String']>;
  interfaceText: Maybe<Scalars['String']>;
  state: Maybe<TState>;
  stateRef: Maybe<TReference>;
};

export type TPaymentStatusInput = {
  interfaceCode: Maybe<Scalars['String']>;
  interfaceText: Maybe<Scalars['String']>;
  state: Maybe<TReferenceInput>;
};

export type TPaymentStatusInterfaceCodeSet = TMessagePayload & {
  __typename?: 'PaymentStatusInterfaceCodeSet';
  interfaceCode: Maybe<Scalars['String']>;
  paymentId: Scalars['String'];
  type: Scalars['String'];
};

export type TPaymentStatusStateTransition = TMessagePayload & {
  __typename?: 'PaymentStatusStateTransition';
  force: Scalars['Boolean'];
  state: Maybe<TState>;
  stateRef: Maybe<TReference>;
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
  addInterfaceInteraction: Maybe<TAddPaymentInterfaceInteraction>;
  addTransaction: Maybe<TAddPaymentTransaction>;
  changeAmountPlanned: Maybe<TChangePaymentAmountPlanned>;
  changeTransactionInteractionId: Maybe<TChangePaymentTransactionInteractionId>;
  changeTransactionState: Maybe<TChangePaymentTransactionState>;
  changeTransactionTimestamp: Maybe<TChangePaymentTransactionTimestamp>;
  setAmountPaid: Maybe<TSetPaymentAmountPaid>;
  setAmountRefunded: Maybe<TSetPaymentAmountRefunded>;
  setAnonymousId: Maybe<TSetPaymentAnonymousId>;
  setAuthorization: Maybe<TSetPaymentAuthorization>;
  setCustomField: Maybe<TSetPaymentCustomField>;
  setCustomType: Maybe<TSetPaymentCustomType>;
  setCustomer: Maybe<TSetPaymentCustomer>;
  setExternalId: Maybe<TSetPaymentExternalId>;
  setInterfaceId: Maybe<TSetPaymentInterfaceId>;
  setKey: Maybe<TSetPaymentKey>;
  setMethodInfoInterface: Maybe<TSetPaymentMethodInfoInterface>;
  setMethodInfoMethod: Maybe<TSetPaymentMethodInfoMethod>;
  setMethodInfoName: Maybe<TSetPaymentMethodInfoName>;
  setStatusInterfaceCode: Maybe<TSetPaymentStatusInterfaceCode>;
  setStatusInterfaceText: Maybe<TSetPaymentStatusInterfaceText>;
  transitionState: Maybe<TTransitionPaymentState>;
};

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
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  results: Array<TPlainEnumValue>;
  total: Scalars['Int'];
};

export type TPlatformFormat = TNotificationFormat & {
  __typename?: 'PlatformFormat';
  type: Scalars['String'];
};

export type TPlatformFormatInput = {
  dummy: Maybe<Scalars['String']>;
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

export type TPriceSelectorInput = {
  channel: Maybe<TReferenceInput>;
  country: Maybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  customerGroup: Maybe<TReferenceInput>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  date: Scalars['DateTime'];
};

export type TProduct = TReviewTarget & TVersioned & {
  __typename?: 'Product';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  masterData: TProductCatalogData;
  productType: Maybe<TProductTypeDefinition>;
  productTypeRef: TReference;
  reviewRatingStatistics: Maybe<TReviewRatingStatistics>;
  skus: Array<Scalars['String']>;
  state: Maybe<TState>;
  stateRef: Maybe<TReference>;
  taxCategory: Maybe<TTaxCategory>;
  taxCategoryRef: Maybe<TReference>;
  version: Scalars['Long'];
};

export type TProductAddedToCategory = TMessagePayload & {
  __typename?: 'ProductAddedToCategory';
  category: TReferenceId;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
};

export type TProductAttributeInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type TProductCatalogData = {
  __typename?: 'ProductCatalogData';
  current: Maybe<TProductData>;
  hasStagedChanges: Scalars['Boolean'];
  published: Scalars['Boolean'];
  staged: Maybe<TProductData>;
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
  categoryOrderHint: Maybe<Scalars['String']>;
  categoryOrderHints: Array<TCategoryOrderHint>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  masterVariant: TProductVariant;
  metaDescription: Maybe<Scalars['String']>;
  metaDescriptionAllLocales: Maybe<Array<TLocalizedString>>;
  metaKeywords: Maybe<Scalars['String']>;
  metaKeywordsAllLocales: Maybe<Array<TLocalizedString>>;
  metaTitle: Maybe<Scalars['String']>;
  metaTitleAllLocales: Maybe<Array<TLocalizedString>>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  searchKeyword: Maybe<Array<TSearchKeyword>>;
  searchKeywords: Array<TSearchKeywords>;
  skus: Array<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  variant: Maybe<TProductVariant>;
  variants: Array<TProductVariant>;
};


export type TProductData_AllVariantsArgs = {
  hasImages: Maybe<Scalars['Boolean']>;
  isOnStock: Maybe<Scalars['Boolean']>;
  skus: Maybe<Array<Scalars['String']>>;
  stockChannelIds: Maybe<Array<Scalars['String']>>;
};


export type TProductData_CategoryOrderHintArgs = {
  categoryId: Scalars['String'];
};


export type TProductData_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductData_MetaDescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductData_MetaKeywordsArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductData_MetaTitleArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductData_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductData_SearchKeywordArgs = {
  locale: Scalars['Locale'];
};


export type TProductData_SlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductData_VariantArgs = {
  key: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
};


export type TProductData_VariantsArgs = {
  hasImages: Maybe<Scalars['Boolean']>;
  isOnStock: Maybe<Scalars['Boolean']>;
  skus: Maybe<Array<Scalars['String']>>;
  stockChannelIds: Maybe<Array<Scalars['String']>>;
};

export type TProductDeleted = TMessagePayload & {
  __typename?: 'ProductDeleted';
  currentProjection: Maybe<TProductProjectionMessagePayload>;
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
export type TProductDiscount = TVersioned & {
  __typename?: 'ProductDiscount';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isValid: Scalars['Boolean'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  predicate: Scalars['String'];
  referenceRefs: Array<TReference>;
  sortOrder: Scalars['String'];
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
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
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
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
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TProductDiscountDraft = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  isActive: Maybe<Scalars['Boolean']>;
  key: Maybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  predicate: Scalars['String'];
  sortOrder: Scalars['String'];
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  value: TProductDiscountValueInput;
};

export type TProductDiscountLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ProductDiscountLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TProductDiscountLimitsProjection = {
  __typename?: 'ProductDiscountLimitsProjection';
  totalActive: TProductDiscountLimitWithCurrent;
};

export type TProductDiscountQueryResult = {
  __typename?: 'ProductDiscountQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProductDiscount>;
  total: Scalars['Long'];
};

export type TProductDiscountUpdateAction = {
  changeIsActive: Maybe<TChangeProductDiscountIsActive>;
  changeName: Maybe<TChangeProductDiscountName>;
  changePredicate: Maybe<TChangeProductDiscountPredicate>;
  changeSortOrder: Maybe<TChangeProductDiscountSortOrder>;
  changeValue: Maybe<TChangeProductDiscountValue>;
  setDescription: Maybe<TSetProductDiscountDescription>;
  setKey: Maybe<TSetProductDiscountKey>;
  setValidFrom: Maybe<TSetProductDiscountValidFrom>;
  setValidFromAndUntil: Maybe<TSetProductDiscountValidFromAndUntil>;
  setValidUntil: Maybe<TSetProductDiscountValidUntil>;
};

export type TProductDiscountValue = {
  type: Scalars['String'];
};

export type TProductDiscountValueInput = {
  absolute: Maybe<TAbsoluteDiscountValueInput>;
  external: Maybe<TExternalDiscountValueInput>;
  relative: Maybe<TRelativeDiscountValueInput>;
};

export type TProductDraft = {
  categories: Maybe<Array<TResourceIdentifierInput>>;
  categoryOrderHints: Maybe<Array<TCategoryOrderHintInput>>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  key: Maybe<Scalars['String']>;
  masterVariant: Maybe<TProductVariantInput>;
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>;
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>;
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>;
  name: Array<TLocalizedStringItemInputType>;
  productType: TResourceIdentifierInput;
  publish: Maybe<Scalars['Boolean']>;
  searchKeywords: Maybe<Array<TSearchKeywordInput>>;
  slug: Array<TLocalizedStringItemInputType>;
  state: Maybe<TResourceIdentifierInput>;
  taxCategory: Maybe<TResourceIdentifierInput>;
  variants: Maybe<Array<TProductVariantInput>>;
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

export type TProductPrice = {
  __typename?: 'ProductPrice';
  channel: Maybe<TChannel>;
  channelRef: Maybe<TReference>;
  country: Maybe<Scalars['Country']>;
  custom: Maybe<TCustomFieldsType>;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  discounted: Maybe<TDiscountedProductPriceValue>;
  id: Maybe<Scalars['String']>;
  tiers: Maybe<Array<TProductPriceTier>>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  value: TBaseMoney;
};

export type TProductPriceDataInput = {
  channel: Maybe<TResourceIdentifierInput>;
  country: Maybe<Scalars['Country']>;
  custom: Maybe<TCustomFieldsDraft>;
  customerGroup: Maybe<TReferenceInput>;
  tiers: Maybe<Array<TProductPriceTierInput>>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  value: TBaseMoneyInput;
};

export type TProductPriceDiscountUpdateMessagePayload = {
  __typename?: 'ProductPriceDiscountUpdateMessagePayload';
  discounted: Maybe<TDiscountedProductPriceValue>;
  priceId: Scalars['String'];
  sku: Maybe<Scalars['String']>;
  staged: Scalars['Boolean'];
  variantId: Scalars['Int'];
  variantKey: Maybe<Scalars['String']>;
};

export type TProductPriceDiscountsSet = TMessagePayload & {
  __typename?: 'ProductPriceDiscountsSet';
  type: Scalars['String'];
  updatedPrices: Array<TProductPriceDiscountUpdateMessagePayload>;
};

export type TProductPriceExternalDiscountSet = TMessagePayload & {
  __typename?: 'ProductPriceExternalDiscountSet';
  discounted: Maybe<TDiscountedProductPriceValue>;
  priceId: Scalars['String'];
  sku: Maybe<Scalars['String']>;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
  variantId: Scalars['Int'];
  variantKey: Maybe<Scalars['String']>;
};

export type TProductPriceSearch = {
  __typename?: 'ProductPriceSearch';
  channel: Maybe<TChannel>;
  channelRef: Maybe<TReference>;
  country: Maybe<Scalars['Country']>;
  custom: Maybe<TCustomFieldsType>;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  discounted: Maybe<TDiscountedProductSearchPriceValue>;
  id: Maybe<Scalars['String']>;
  tiers: Maybe<Array<TProductSearchPriceTier>>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
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

export type TProductProjection = {
  __typename?: 'ProductProjection';
  categories: Array<TCategory>;
  categoriesRef: Array<TReference>;
  categoryOrderHints: Array<TCategoryOrderHintProductSearch>;
  createdAt: Scalars['DateTime'];
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  hasStagedChanges: Scalars['Boolean'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  masterVariant: TProductSearchVariant;
  metaDescription: Maybe<Scalars['String']>;
  metaDescriptionAllLocales: Maybe<Array<TLocalizedString>>;
  metaKeywords: Maybe<Scalars['String']>;
  metaKeywordsAllLocales: Maybe<Array<TLocalizedString>>;
  metaTitle: Maybe<Scalars['String']>;
  metaTitleAllLocales: Maybe<Array<TLocalizedString>>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  productType: Maybe<TProductTypeDefinition>;
  productTypeRef: TReference;
  published: Scalars['Boolean'];
  reviewRatingStatistics: Maybe<TReviewRatingStatistics>;
  searchKeywords: Array<TSearchKeywordsProductSearch>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  state: Maybe<TState>;
  stateRef: Maybe<TReference>;
  taxCategory: Maybe<TTaxCategory>;
  taxCategoryRef: Maybe<TReference>;
  variants: Array<TProductSearchVariant>;
  version: Scalars['Long'];
};


export type TProductProjection_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjection_MetaDescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjection_MetaKeywordsArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjection_MetaTitleArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjection_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjection_SlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TProductProjectionMessagePayload = {
  __typename?: 'ProductProjectionMessagePayload';
  categories: Array<TCategory>;
  categoriesRef: Array<TReference>;
  categoryOrderHints: Array<TCategoryOrderHint>;
  createdAt: Scalars['DateTime'];
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  hasStagedChanges: Scalars['Boolean'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  masterVariant: TProductVariant;
  metaDescription: Maybe<Scalars['String']>;
  metaDescriptionAllLocales: Maybe<Array<TLocalizedString>>;
  metaKeywords: Maybe<Scalars['String']>;
  metaKeywordsAllLocales: Maybe<Array<TLocalizedString>>;
  metaTitle: Maybe<Scalars['String']>;
  metaTitleAllLocales: Maybe<Array<TLocalizedString>>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  productType: Maybe<TProductTypeDefinition>;
  productTypeRef: TReference;
  published: Scalars['Boolean'];
  reviewRatingStatistics: Maybe<TReviewRatingStatistics>;
  searchKeywords: Array<TSearchKeywords>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  state: Maybe<TState>;
  stateRef: Maybe<TReference>;
  taxCategory: Maybe<TTaxCategory>;
  taxCategoryRef: Maybe<TReference>;
  variants: Array<TProductVariant>;
  version: Scalars['Long'];
};


export type TProductProjectionMessagePayload_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_MetaDescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_MetaKeywordsArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_MetaTitleArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductProjectionMessagePayload_SlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
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
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProduct>;
  total: Scalars['Long'];
};

export type TProductReferenceIdentifier = {
  __typename?: 'ProductReferenceIdentifier';
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
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
  availability: Maybe<TProductSearchVariantAvailabilityWithChannels>;
  id: Scalars['Int'];
  images: Array<TImageProductSearch>;
  key: Maybe<Scalars['String']>;
  /** Returns a single price based on the price selection rules. */
  price: Maybe<TProductPriceSearch>;
  prices: Maybe<Array<TProductPriceSearch>>;
  sku: Maybe<Scalars['String']>;
};


export type TProductSearchVariant_AttributesRawArgs = {
  excludeNames: Maybe<Array<Scalars['String']>>;
  includeNames: Maybe<Array<Scalars['String']>>;
};


export type TProductSearchVariant_PriceArgs = {
  channelId: Maybe<Scalars['String']>;
  country: Maybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  customerGroupId: Maybe<Scalars['String']>;
  date: Maybe<Scalars['DateTime']>;
};

/** Product variant availabilities */
export type TProductSearchVariantAvailabilitiesResult = {
  __typename?: 'ProductSearchVariantAvailabilitiesResult';
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  results: Array<TProductSearchVariantAvailabilityWithChannel>;
  total: Scalars['Int'];
};

/** Product variant availability */
export type TProductSearchVariantAvailability = {
  __typename?: 'ProductSearchVariantAvailability';
  availableQuantity: Maybe<Scalars['Long']>;
  id: Maybe<Scalars['String']>;
  isOnStock: Scalars['Boolean'];
  restockableInDays: Maybe<Scalars['Int']>;
  version: Maybe<Scalars['Long']>;
};

export type TProductSearchVariantAvailabilityWithChannel = {
  __typename?: 'ProductSearchVariantAvailabilityWithChannel';
  availability: TProductSearchVariantAvailability;
  channel: Maybe<TChannel>;
  channelRef: TReference;
};

export type TProductSearchVariantAvailabilityWithChannels = {
  __typename?: 'ProductSearchVariantAvailabilityWithChannels';
  channels: TProductSearchVariantAvailabilitiesResult;
  noChannel: Maybe<TProductSearchVariantAvailability>;
};


export type TProductSearchVariantAvailabilityWithChannels_ChannelsArgs = {
  excludeChannelIds: Maybe<Array<Scalars['String']>>;
  includeChannelIds: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TProductSlugChanged = TMessagePayload & {
  __typename?: 'ProductSlugChanged';
  oldSlug: Maybe<Scalars['String']>;
  oldSlugAllLocales: Maybe<Array<TLocalizedString>>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  type: Scalars['String'];
};


export type TProductSlugChanged_OldSlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TProductSlugChanged_SlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TProductStateTransition = TMessagePayload & {
  __typename?: 'ProductStateTransition';
  force: Scalars['Boolean'];
  state: Maybe<TState>;
  stateRef: TReference;
  type: Scalars['String'];
};

export type TProductTypeDefinition = TVersioned & {
  __typename?: 'ProductTypeDefinition';
  attributeDefinitions: TAttributeDefinitionResult;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  description: Scalars['String'];
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  name: Scalars['String'];
  version: Scalars['Long'];
};


export type TProductTypeDefinition_AttributeDefinitionsArgs = {
  excludeNames: Maybe<Array<Scalars['String']>>;
  includeNames: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
};

export type TProductTypeDefinitionQueryResult = {
  __typename?: 'ProductTypeDefinitionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TProductTypeDefinition>;
  total: Scalars['Long'];
};

export type TProductTypeDraft = {
  attributeDefinitions: Maybe<Array<TAttributeDefinitionDraft>>;
  description: Scalars['String'];
  key: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type TProductTypeLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ProductTypeLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TProductTypeLimitsProjection = {
  __typename?: 'ProductTypeLimitsProjection';
  total: TProductTypeLimitWithCurrent;
};

export type TProductTypeUpdateAction = {
  addAttributeDefinition: Maybe<TAddAttributeDefinition>;
  addLocalizedEnumValue: Maybe<TAddLocalizedEnumValue>;
  addPlainEnumValue: Maybe<TAddPlainEnumValue>;
  changeAttributeName: Maybe<TChangeAttributeName>;
  changeAttributeOrder: Maybe<TChangeAttributeOrder>;
  changeAttributeOrderByName: Maybe<TChangeAttributeOrderByName>;
  changeDescription: Maybe<TChangeDescription>;
  changeEnumKey: Maybe<TChangeEnumKey>;
  changeInputHint: Maybe<TChangeInputHint>;
  changeIsSearchable: Maybe<TChangeIsSearchable>;
  changeLabel: Maybe<TChangeLabel>;
  changeLocalizedEnumValueLabel: Maybe<TChangeLocalizedEnumValueLabel>;
  changeLocalizedEnumValueOrder: Maybe<TChangeLocalizedEnumValueOrder>;
  changeName: Maybe<TChangeName>;
  changePlainEnumValueLabel: Maybe<TChangePlainEnumValueLabel>;
  changePlainEnumValueOrder: Maybe<TChangePlainEnumValueOrder>;
  removeAttributeDefinition: Maybe<TRemoveAttributeDefinition>;
  removeEnumValues: Maybe<TRemoveEnumValues>;
  setInputTip: Maybe<TSetInputTip>;
  setKey: Maybe<TSetKey>;
};

export type TProductUnpublished = TMessagePayload & {
  __typename?: 'ProductUnpublished';
  type: Scalars['String'];
};

export type TProductUpdateAction = {
  addAsset: Maybe<TAddProductAsset>;
  addExternalImage: Maybe<TAddProductExternalImage>;
  addPrice: Maybe<TAddProductPrice>;
  addToCategory: Maybe<TAddProductToCategory>;
  addVariant: Maybe<TAddProductVariant>;
  changeAssetName: Maybe<TChangeProductAssetName>;
  changeAssetOrder: Maybe<TChangeProductAssetOrder>;
  changeImageLabel: Maybe<TChangeProductImageLabel>;
  changeMasterVariant: Maybe<TChangeProductMasterVariant>;
  changeName: Maybe<TChangeProductName>;
  changePrice: Maybe<TChangeProductPrice>;
  changeSlug: Maybe<TChangeProductSlug>;
  moveImageToPosition: Maybe<TMoveProductImageToPosition>;
  publish: Maybe<TPublishProduct>;
  removeAsset: Maybe<TRemoveProductAsset>;
  removeFromCategory: Maybe<TRemoveProductFromCategory>;
  removeImage: Maybe<TRemoveProductImage>;
  removePrice: Maybe<TRemoveProductPrice>;
  removeVariant: Maybe<TRemoveProductVariant>;
  revertStagedChanges: Maybe<TRevertStagedChanges>;
  revertStagedVariantChanges: Maybe<TRevertStagedVariantChanges>;
  setAssetCustomField: Maybe<TSetProductAssetCustomField>;
  setAssetCustomType: Maybe<TSetProductAssetCustomType>;
  setAssetDescription: Maybe<TSetProductAssetDescription>;
  setAssetKey: Maybe<TSetProductAssetKey>;
  setAssetSources: Maybe<TSetProductAssetSources>;
  setAssetTags: Maybe<TSetProductAssetTags>;
  setAttribute: Maybe<TSetProductAttribute>;
  setAttributeInAllVariants: Maybe<TSetProductAttributeInAllVariants>;
  setCategoryOrderHint: Maybe<TSetProductCategoryOrderHint>;
  setDescription: Maybe<TSetProductDescription>;
  setDiscountedPrice: Maybe<TSetProductDiscountedPrice>;
  setImageLabel: Maybe<TSetProductImageLabel>;
  setKey: Maybe<TSetProductKey>;
  setMetaAttributes: Maybe<TSetProductMetaAttributes>;
  setMetaDescription: Maybe<TSetProductMetaDescription>;
  setMetaKeywords: Maybe<TSetProductMetaKeywords>;
  setMetaTitle: Maybe<TSetProductMetaTitle>;
  setPrices: Maybe<TSetProductPrices>;
  setProductPriceCustomField: Maybe<TSetProductPriceCustomField>;
  setProductPriceCustomType: Maybe<TSetProductPriceCustomType>;
  setProductVariantKey: Maybe<TSetProductVariantKey>;
  setSearchKeywords: Maybe<TSetSearchKeywords>;
  setSku: Maybe<TSetProductSku>;
  setTaxCategory: Maybe<TSetProductTaxCategory>;
  transitionState: Maybe<TTransitionProductState>;
  unpublish: Maybe<TUnpublishProduct>;
};

export type TProductVariant = {
  __typename?: 'ProductVariant';
  assets: Array<TAsset>;
  /** This field contains raw attributes data */
  attributesRaw: Array<TRawProductAttribute>;
  availability: Maybe<TProductVariantAvailabilityWithChannels>;
  id: Scalars['Int'];
  images: Array<TImage>;
  key: Maybe<Scalars['String']>;
  /** Returns a single price based on the price selection rules. */
  price: Maybe<TProductPrice>;
  prices: Maybe<Array<TProductPrice>>;
  sku: Maybe<Scalars['String']>;
};


export type TProductVariant_AttributesRawArgs = {
  excludeNames: Maybe<Array<Scalars['String']>>;
  includeNames: Maybe<Array<Scalars['String']>>;
};


export type TProductVariant_PriceArgs = {
  channelId: Maybe<Scalars['String']>;
  country: Maybe<Scalars['Country']>;
  currency: Scalars['Currency'];
  customerGroupId: Maybe<Scalars['String']>;
  date: Maybe<Scalars['DateTime']>;
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
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  results: Array<TProductVariantAvailabilityWithChannel>;
  total: Scalars['Int'];
};

/** Product variant availability */
export type TProductVariantAvailability = {
  __typename?: 'ProductVariantAvailability';
  availableQuantity: Maybe<Scalars['Long']>;
  id: Maybe<Scalars['String']>;
  isOnStock: Scalars['Boolean'];
  restockableInDays: Maybe<Scalars['Int']>;
  version: Maybe<Scalars['Long']>;
};

export type TProductVariantAvailabilityWithChannel = {
  __typename?: 'ProductVariantAvailabilityWithChannel';
  availability: TProductVariantAvailability;
  channel: Maybe<TChannel>;
  channelRef: TReference;
};

export type TProductVariantAvailabilityWithChannels = {
  __typename?: 'ProductVariantAvailabilityWithChannels';
  channels: TProductVariantAvailabilitiesResult;
  noChannel: Maybe<TProductVariantAvailability>;
};


export type TProductVariantAvailabilityWithChannels_ChannelsArgs = {
  excludeChannelIds: Maybe<Array<Scalars['String']>>;
  includeChannelIds: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TProductVariantDeleted = TMessagePayload & {
  __typename?: 'ProductVariantDeleted';
  removedImageUrls: Scalars['Set'];
  type: Scalars['String'];
  variant: Maybe<TProductVariant>;
};

export type TProductVariantInput = {
  assets: Maybe<Array<TAssetDraftInput>>;
  attributes: Maybe<Array<TProductAttributeInput>>;
  images: Maybe<Array<TImageInput>>;
  key: Maybe<Scalars['String']>;
  prices: Maybe<Array<TProductPriceDataInput>>;
  sku: Maybe<Scalars['String']>;
};

/** Contains information about the limits of your project. */
export type TProjectCustomLimitsProjection = {
  __typename?: 'ProjectCustomLimitsProjection';
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
  taxCategories: TTaxCategoryLimitsProjection;
  zones: TZoneLimitsProjection;
};

/** Project contains information about project. */
export type TProjectProjection = {
  __typename?: 'ProjectProjection';
  carts: TCartsConfiguration;
  countries: Array<Scalars['Country']>;
  createdAt: Scalars['DateTime'];
  currencies: Array<Scalars['Currency']>;
  externalOAuth: Maybe<TExternalOAuth>;
  key: Scalars['String'];
  languages: Array<Scalars['Locale']>;
  messages: TMessagesConfiguration;
  name: Scalars['String'];
  searchIndexing: Maybe<TSearchIndexingConfiguration>;
  shippingRateInputType: Maybe<TShippingRateInputType>;
  shoppingLists: TShoppingListsConfiguration;
  trialUntil: Maybe<Scalars['YearMonth']>;
  version: Scalars['Long'];
};

export type TProjectSettingsUpdateAction = {
  changeCartsConfiguration: Maybe<TChangeProjectSettingsCartsConfiguration>;
  changeCountries: Maybe<TChangeProjectSettingsCountries>;
  changeCountryTaxRateFallbackEnabled: Maybe<TChangeProjectSettingsCountryTaxRateFallbackEnabled>;
  changeCurrencies: Maybe<TChangeProjectSettingsCurrencies>;
  changeLanguages: Maybe<TChangeProjectSettingsLanguages>;
  changeMessagesConfiguration: Maybe<TChangeProjectSettingsMessagesConfiguration>;
  changeMessagesEnabled: Maybe<TChangeProjectSettingsMessagesEnabled>;
  changeName: Maybe<TChangeProjectSettingsName>;
  changeOrderSearchStatus: Maybe<TChangeProjectSettingsOrderSearchStatus>;
  changeProductSearchIndexingEnabled: Maybe<TChangeProjectSettingsProductSearchIndexingEnabled>;
  changeShoppingListsConfiguration: Maybe<TChangeProjectSettingsShoppingListsConfiguration>;
  setExternalOAuth: Maybe<TSetProjectSettingsExternalOAuth>;
  setShippingRateInputType: Maybe<TSetProjectSettingsShippingRateInputType>;
};

export type TPublishProduct = {
  scope: Maybe<TPublishScope>;
};

export enum TPublishScope {
  /** Publishes the complete staged projection */
  All = 'All',
  /** Publishes only prices on the staged projection */
  Prices = 'Prices'
}

export type TQuery = TCartQueryInterface & TCustomerActiveCartInterface & TCustomerQueryInterface & TMeFieldInterface & TOrderQueryInterface & TShippingMethodsByCartInterface & TShoppingListQueryInterface & {
  __typename?: 'Query';
  apiClient: Maybe<TApiClientWithoutSecret>;
  apiClients: TApiClientWithoutSecretQueryResult;
  cart: Maybe<TCart>;
  cartDiscount: Maybe<TCartDiscount>;
  cartDiscounts: TCartDiscountQueryResult;
  carts: TCartQueryResult;
  categories: TCategoryQueryResult;
  category: Maybe<TCategory>;
  /** Autocomplete the categories based on category fields like name, description, etc. */
  categoryAutocomplete: TCategorySearchResult;
  /** Search the categories using full-text search, filtering and sorting */
  categorySearch: TCategorySearchResult;
  channel: Maybe<TChannel>;
  channels: TChannelQueryResult;
  customObject: Maybe<TCustomObject>;
  customObjects: TCustomObjectQueryResult;
  customer: Maybe<TCustomer>;
  customerActiveCart: Maybe<TCart>;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroups: TCustomerGroupQueryResult;
  customers: TCustomerQueryResult;
  discountCode: Maybe<TDiscountCode>;
  discountCodes: TDiscountCodeQueryResult;
  extension: Maybe<TExtension>;
  extensions: TExtensionQueryResult;
  /** This field gives access to the resources (such as carts) that are inside the given store. Currently in beta. */
  inStore: TInStore;
  /** This field gives access to the resources (such as carts) that are inside one of the given stores. Currently in beta. */
  inStores: TInStore;
  inventoryEntries: TInventoryEntryQueryResult;
  inventoryEntry: Maybe<TInventoryEntry>;
  limits: TProjectCustomLimitsProjection;
  /**
   * This field can only be used with an access token created with the password flow or with an anonymous session.
   *
   * It gives access to the data that is specific to the customer or the anonymous session linked to the access token.
   */
  me: TMe;
  message: Maybe<TMessage>;
  messages: TMessageQueryResult;
  order: Maybe<TOrder>;
  orderEdit: Maybe<TOrderEdit>;
  orderEdits: TOrderEditQueryResult;
  orders: TOrderQueryResult;
  payment: Maybe<TPayment>;
  payments: TPaymentQueryResult;
  product: Maybe<TProduct>;
  productDiscount: Maybe<TProductDiscount>;
  productDiscounts: TProductDiscountQueryResult;
  productProjectionSearch: TProductProjectionSearchResult;
  productProjectionsSuggest: TSuggestResult;
  productType: Maybe<TProductTypeDefinition>;
  productTypes: TProductTypeDefinitionQueryResult;
  products: TProductQueryResult;
  project: TProjectProjection;
  review: Maybe<TReview>;
  reviews: TReviewQueryResult;
  shippingMethod: Maybe<TShippingMethod>;
  shippingMethods: TShippingMethodQueryResult;
  shippingMethodsByCart: Array<TShippingMethod>;
  shippingMethodsByLocation: Array<TShippingMethod>;
  shoppingList: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
  state: Maybe<TState>;
  states: TStateQueryResult;
  store: Maybe<TStore>;
  stores: TStoreQueryResult;
  subscription: Maybe<TCommercetoolsSubscription>;
  subscriptions: TCommercetoolsSubscriptionQueryResult;
  taxCategories: TTaxCategoryQueryResult;
  taxCategory: Maybe<TTaxCategory>;
  typeDefinition: Maybe<TTypeDefinition>;
  typeDefinitions: TTypeDefinitionQueryResult;
  zone: Maybe<TZone>;
  zones: TZoneQueryResult;
};


export type TQuery_ApiClientArgs = {
  id: Scalars['String'];
};


export type TQuery_ApiClientsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_CartArgs = {
  id: Scalars['String'];
};


export type TQuery_CartDiscountArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_CartDiscountsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_CartsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_CategoriesArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_CategoryArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_CategoryAutocompleteArgs = {
  filters: Maybe<Array<Scalars['SearchFilter']>>;
  limit?: Maybe<Scalars['Int']>;
  locale: Scalars['Locale'];
  offset?: Maybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type TQuery_CategorySearchArgs = {
  filters: Maybe<Array<Scalars['SearchFilter']>>;
  fulltext: Maybe<TLocalizedText>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  queryFilters: Maybe<Array<Scalars['SearchFilter']>>;
  sorts: Maybe<Array<Scalars['SearchSort']>>;
};


export type TQuery_ChannelArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ChannelsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_CustomObjectArgs = {
  container: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_CustomObjectsArgs = {
  container: Scalars['String'];
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_CustomerArgs = {
  emailToken: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  passwordToken: Maybe<Scalars['String']>;
};


export type TQuery_CustomerActiveCartArgs = {
  customerId: Scalars['String'];
};


export type TQuery_CustomerGroupArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_CustomerGroupsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_CustomersArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_DiscountCodeArgs = {
  id: Scalars['String'];
};


export type TQuery_DiscountCodesArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_ExtensionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ExtensionsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_InStoreArgs = {
  key: Scalars['KeyReferenceInput'];
};


export type TQuery_InStoresArgs = {
  keys: Array<Scalars['KeyReferenceInput']>;
};


export type TQuery_InventoryEntriesArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_InventoryEntryArgs = {
  id: Scalars['String'];
};


export type TQuery_MessageArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_MessagesArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TQuery_OrderEditArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_OrderEditsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_OrdersArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_PaymentArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_PaymentsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_ProductArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  variantKey: Maybe<Scalars['String']>;
};


export type TQuery_ProductDiscountArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ProductDiscountsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_ProductProjectionSearchArgs = {
  facetFilters?: Maybe<Array<TSearchFilterInput>>;
  facets?: Maybe<Array<TSearchFacetInput>>;
  filters?: Maybe<Array<TSearchFilterInput>>;
  fuzzy?: Maybe<Scalars['Boolean']>;
  fuzzyLevel: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  locale: Maybe<Scalars['Locale']>;
  localeProjection: Maybe<Array<Scalars['Locale']>>;
  markMatchingVariant?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  priceSelector: Maybe<TPriceSelectorInput>;
  queryFilters?: Maybe<Array<TSearchFilterInput>>;
  sorts?: Maybe<Array<Scalars['String']>>;
  staged?: Maybe<Scalars['Boolean']>;
  storeProjection: Maybe<Scalars['String']>;
  text: Maybe<Scalars['String']>;
};


export type TQuery_ProductProjectionsSuggestArgs = {
  fuzzy: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  searchKeywords: Array<TSearchKeywordArgument>;
  staged?: Maybe<Scalars['Boolean']>;
};


export type TQuery_ProductTypeArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ProductTypesArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_ProductsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  skus: Maybe<Array<Scalars['String']>>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_ReviewArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ReviewsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_ShippingMethodArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ShippingMethodsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_ShippingMethodsByCartArgs = {
  id: Scalars['String'];
};


export type TQuery_ShippingMethodsByLocationArgs = {
  country: Scalars['Country'];
  currency: Maybe<Scalars['Currency']>;
  state: Maybe<Scalars['String']>;
};


export type TQuery_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ShoppingListsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_StateArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_StatesArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_StoreArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_StoresArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_SubscriptionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_SubscriptionsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_TaxCategoriesArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_TaxCategoryArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_TypeDefinitionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_TypeDefinitionsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};


export type TQuery_ZoneArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ZonesArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};

export type TQueryLimitsProjection = {
  __typename?: 'QueryLimitsProjection';
  offset: TLimit;
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
  productCount: Maybe<Scalars['Int']>;
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
  productCount: Maybe<Scalars['Int']>;
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
  alias: Maybe<Scalars['String']>;
  countProducts: Scalars['Boolean'];
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
  value: Scalars['Json'];
};

export type TRawProductAttribute = {
  __typename?: 'RawProductAttribute';
  attributeDefinition: Maybe<TAttributeDefinition>;
  name: Scalars['String'];
  value: Scalars['Json'];
};

export type TRawProductSearchAttribute = {
  __typename?: 'RawProductSearchAttribute';
  name: Scalars['String'];
  value: Scalars['Json'];
};

export type TRecalculateCart = {
  updateProductData: Maybe<Scalars['Boolean']>;
};

export type TRecalculateStagedOrder = {
  updateProductData: Maybe<Scalars['Boolean']>;
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
  limit: Maybe<Scalars['Long']>;
};

export type TRefreshTokenLimitsProjection = {
  __typename?: 'RefreshTokenLimitsProjection';
  total: TRefreshTokenLimitWithCurrent;
};

export type TRelativeDiscountValue = TCartDiscountValue & TProductDiscountValue & {
  __typename?: 'RelativeDiscountValue';
  permyriad: Scalars['Int'];
  type: Scalars['String'];
};

export type TRelativeDiscountValueInput = {
  permyriad: Scalars['Int'];
};

export type TRemoveCartCustomLineItem = {
  customLineItemId: Scalars['String'];
};

export type TRemoveCartDiscountCode = {
  discountCode: TReferenceInput;
};

export type TRemoveCartItemShippingAddress = {
  addressKey: Scalars['String'];
};

export type TRemoveCartLineItem = {
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  lineItemId: Scalars['String'];
  quantity: Maybe<Scalars['Long']>;
  shippingDetailsToRemove: Maybe<TItemShippingDetailsDraft>;
};

export type TRemoveCartPayment = {
  payment: TResourceIdentifierInput;
};

export type TRemoveCategoryAsset = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
};

export type TRemoveChannelRoles = {
  roles: Array<TChannelRole>;
};

export type TRemoveCustomerAddress = {
  addressId: Maybe<Scalars['String']>;
  addressKey: Maybe<Scalars['String']>;
};

export type TRemoveCustomerBillingAddressId = {
  addressId: Maybe<Scalars['String']>;
  addressKey: Maybe<Scalars['String']>;
};

export type TRemoveCustomerShippingAddressId = {
  addressId: Maybe<Scalars['String']>;
  addressKey: Maybe<Scalars['String']>;
};

export type TRemoveCustomerStore = {
  store: TResourceIdentifierInput;
};

export type TRemoveInventoryEntryQuantity = {
  quantity: Scalars['Long'];
};

export type TRemoveOrderDelivery = {
  deliveryId: Scalars['String'];
};

export type TRemoveOrderItemShippingAddress = {
  addressKey: Scalars['String'];
};

export type TRemoveOrderParcelFromDelivery = {
  parcelId: Scalars['String'];
};

export type TRemoveOrderPayment = {
  payment: TResourceIdentifierInput;
};

export type TRemoveProductAsset = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TRemoveProductFromCategory = {
  category: TResourceIdentifierInput;
  staged: Maybe<Scalars['Boolean']>;
};

export type TRemoveProductImage = {
  imageUrl: Scalars['String'];
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TRemoveProductPrice = {
  price: Maybe<TProductPriceDataInput>;
  priceId: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TRemoveProductVariant = {
  id: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TRemoveShippingMethodShippingRate = {
  shippingRate: TShippingRateDraft;
  zone: TResourceIdentifierInput;
};

export type TRemoveShippingMethodZone = {
  zone: TResourceIdentifierInput;
};

export type TRemoveShoppingListLineItem = {
  lineItemId: Scalars['String'];
  quantity: Maybe<Scalars['Int']>;
};

export type TRemoveShoppingListTextLineItem = {
  quantity: Maybe<Scalars['Int']>;
  textLineItemId: Scalars['String'];
};

export type TRemoveStagedOrderCustomLineItem = {
  customLineItemId: Scalars['String'];
};

export type TRemoveStagedOrderCustomLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderCustomLineItemOutput';
  customLineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TRemoveStagedOrderDelivery = {
  deliveryId: Scalars['String'];
};

export type TRemoveStagedOrderDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderDeliveryOutput';
  deliveryId: Scalars['String'];
  type: Scalars['String'];
};

export type TRemoveStagedOrderDiscountCode = {
  discountCode: TReferenceInput;
};

export type TRemoveStagedOrderDiscountCodeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderDiscountCodeOutput';
  discountCode: Maybe<TDiscountCode>;
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
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  lineItemId: Scalars['String'];
  quantity: Maybe<Scalars['Long']>;
  shippingDetailsToRemove: Maybe<TItemShippingDetailsDraftType>;
};

export type TRemoveStagedOrderLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderLineItemOutput';
  externalPrice: Maybe<TBaseMoney>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPrice>;
  lineItemId: Scalars['String'];
  quantity: Maybe<Scalars['Long']>;
  shippingDetailsToRemove: Maybe<TItemShippingDetailsDraftOutput>;
  type: Scalars['String'];
};

export type TRemoveStagedOrderParcelFromDelivery = {
  parcelId: Scalars['String'];
};

export type TRemoveStagedOrderParcelFromDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderParcelFromDeliveryOutput';
  parcelId: Scalars['String'];
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

export type TRemoveStateRoles = {
  roles: Array<TStateRole>;
};

export type TRemoveStoreDistributionChannel = {
  distributionChannel: TResourceIdentifierInput;
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

export type TResourceIdentifier = {
  __typename?: 'ResourceIdentifier';
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  typeId: Scalars['String'];
};

export type TResourceIdentifierInput = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

/** Stores information about returns connected to this order. */
export type TReturnInfo = {
  __typename?: 'ReturnInfo';
  items: Array<TReturnItem>;
  returnDate: Maybe<Scalars['DateTime']>;
  returnTrackingId: Maybe<Scalars['String']>;
};

export type TReturnInfoAdded = TMessagePayload & {
  __typename?: 'ReturnInfoAdded';
  returnInfo: TReturnInfo;
  type: Scalars['String'];
};

export type TReturnInfoDraftType = {
  items: Array<TReturnItemDraftType>;
  returnDate: Maybe<Scalars['DateTime']>;
  returnTrackingId: Maybe<Scalars['String']>;
};

export type TReturnInfoDraftTypeOutput = {
  __typename?: 'ReturnInfoDraftTypeOutput';
  items: Array<TReturnItemDraftTypeOutput>;
  returnDate: Maybe<Scalars['DateTime']>;
  returnTrackingId: Maybe<Scalars['String']>;
};

export type TReturnInfoSet = TMessagePayload & {
  __typename?: 'ReturnInfoSet';
  returnInfo: Array<TReturnInfo>;
  type: Scalars['String'];
};

export type TReturnItem = {
  comment: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  paymentState: TReturnPaymentState;
  quantity: Scalars['Long'];
  shipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TReturnItemDraftType = {
  comment: Maybe<Scalars['String']>;
  customLineItemId: Maybe<Scalars['String']>;
  lineItemId: Maybe<Scalars['String']>;
  quantity: Scalars['Long'];
  shipmentState: TReturnShipmentState;
};

export type TReturnItemDraftTypeOutput = {
  __typename?: 'ReturnItemDraftTypeOutput';
  comment: Maybe<Scalars['String']>;
  customLineItemId: Maybe<Scalars['String']>;
  lineItemId: Maybe<Scalars['String']>;
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
  dummy: Maybe<Scalars['String']>;
};

export type TRevertStagedVariantChanges = {
  variantId: Scalars['Int'];
};

export type TReview = TVersioned & {
  __typename?: 'Review';
  authorName: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  customer: Maybe<TCustomer>;
  customerRef: Maybe<TReference>;
  id: Scalars['String'];
  includedInStatistics: Scalars['Boolean'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  locale: Maybe<Scalars['Locale']>;
  rating: Maybe<Scalars['Int']>;
  state: Maybe<TState>;
  stateRef: Maybe<TReference>;
  target: Maybe<TReviewTarget>;
  targetRef: Maybe<TReference>;
  text: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  uniquenessValue: Maybe<Scalars['String']>;
  version: Scalars['Long'];
};

export type TReviewCreated = TMessagePayload & {
  __typename?: 'ReviewCreated';
  review: TReview;
  type: Scalars['String'];
};

export type TReviewDraft = {
  authorName: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
  customer: Maybe<TResourceIdentifierInput>;
  key: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['Locale']>;
  rating: Maybe<Scalars['Int']>;
  state: Maybe<TResourceIdentifierInput>;
  target: Maybe<TTargetReferenceInput>;
  text: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  uniquenessValue: Maybe<Scalars['String']>;
};

export type TReviewQueryResult = {
  __typename?: 'ReviewQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TReview>;
  total: Scalars['Long'];
};

export type TReviewRatingSet = TMessagePayload & {
  __typename?: 'ReviewRatingSet';
  includedInStatistics: Scalars['Boolean'];
  newRating: Maybe<Scalars['Int']>;
  oldRating: Maybe<Scalars['Int']>;
  target: Maybe<TReviewTarget>;
  targetRef: Maybe<TReference>;
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
  newState: Maybe<TState>;
  newStateRef: TReference;
  oldIncludedInStatistics: Scalars['Boolean'];
  oldState: Maybe<TState>;
  oldStateRef: Maybe<TReference>;
  target: Maybe<TReviewTarget>;
  targetRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TReviewTarget = {
  id: Scalars['String'];
};

export type TReviewUpdateAction = {
  setAuthorName: Maybe<TSetReviewAuthorName>;
  setCustomField: Maybe<TSetReviewCustomField>;
  setCustomType: Maybe<TSetReviewCustomType>;
  setCustomer: Maybe<TSetReviewCustomer>;
  setKey: Maybe<TSetReviewKey>;
  setLocale: Maybe<TSetReviewLocale>;
  setRating: Maybe<TSetReviewRating>;
  setTarget: Maybe<TSetReviewTarget>;
  setText: Maybe<TSetReviewText>;
  setTitle: Maybe<TSetReviewTitle>;
  transitionState: Maybe<TTransitionReviewState>;
};

export enum TRoundingMode {
  /** [Round half down](https://en.wikipedia.org/wiki/Rounding#Round_half_down). Rounding mode used by, e.g., [Avalara Sales TaxII](https://help.avalara.com/kb/001/How_does_Rounding_with_SalesTaxII_work%3F) */
  HalfDown = 'HalfDown',
  /** [Round half to even](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even). Default rounding mode as used in IEEE 754 computing functions and operators. */
  HalfEven = 'HalfEven',
  /** [Round half up](https://en.wikipedia.org/wiki/Rounding#Round_half_up) */
  HalfUp = 'HalfUp'
}

export type TSnsDestination = TDestination & {
  __typename?: 'SNSDestination';
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
  topicArn: Scalars['String'];
  type: Scalars['String'];
};

export type TSnsDestinationInput = {
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
  topicArn: Scalars['String'];
};

export type TSqsDestination = TDestination & {
  __typename?: 'SQSDestination';
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
  queueUrl: Scalars['String'];
  region: Scalars['String'];
  type: Scalars['String'];
};

export type TSqsDestinationInput = {
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
  queueUrl: Scalars['String'];
  region: Scalars['String'];
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
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  model: Maybe<TSearchFacetModelInput>;
  string: Maybe<Scalars['String']>;
};

export type TSearchFacetModelInput = {
  missing: Maybe<TMissingFacetInput>;
  range: Maybe<TRangeFacetInput>;
  terms: Maybe<TTermsFacetInput>;
  tree: Maybe<TTreeFacetInput>;
  value: Maybe<TValueFacetInput>;
  valueCount: Maybe<TValueCountFacetInput>;
};

export type TSearchFilterInput = {
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  model: Maybe<TSearchFilterModelInput>;
  string: Maybe<Scalars['String']>;
};

export type TSearchFilterModelInput = {
  exists: Maybe<TExistsFilterInput>;
  missing: Maybe<TMissingFilterInput>;
  range: Maybe<TRangeFilterInput>;
  tree: Maybe<TTreeFilterInput>;
  value: Maybe<TValueFilterInput>;
};

export type TSearchIndexingConfiguration = {
  __typename?: 'SearchIndexingConfiguration';
  orders: Maybe<TOrderSearchConfiguration>;
  products: Maybe<TSearchIndexingConfigurationValues>;
};

export type TSearchIndexingConfigurationValues = {
  __typename?: 'SearchIndexingConfigurationValues';
  lastModifiedAt: Maybe<Scalars['DateTime']>;
  lastModifiedBy: Maybe<TInitiator>;
  status: Maybe<TSearchIndexingStatus>;
};

export enum TSearchIndexingStatus {
  Activated = 'Activated',
  Deactivated = 'Deactivated',
  Indexing = 'Indexing'
}

export type TSearchKeyword = {
  __typename?: 'SearchKeyword';
  suggestTokenizer: Maybe<TSuggestTokenizer>;
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
  suggestTokenizer: Maybe<TBaseSearchKeywordInput>;
  text: Scalars['String'];
};

export type TSearchKeywordProductSearch = {
  __typename?: 'SearchKeywordProductSearch';
  suggestTokenizer: Maybe<TSuggestTokenizerProductSearch>;
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

export type TSetAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'SetAttributeDefinitionType';
  elementType: TAttributeDefinitionType;
  name: Scalars['String'];
};

export type TSetCartAnonymousId = {
  anonymousId: Maybe<Scalars['String']>;
};

export type TSetCartBillingAddress = {
  address: Maybe<TAddressInput>;
};

export type TSetCartBillingAddressCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCartBillingAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCartCountry = {
  country: Maybe<Scalars['Country']>;
};

export type TSetCartCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCartCustomLineItemCustomField = {
  customLineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCartCustomLineItemCustomType = {
  customLineItemId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCartCustomLineItemShippingDetails = {
  customLineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
};

export type TSetCartCustomLineItemTaxAmount = {
  customLineItemId: Scalars['String'];
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
};

export type TSetCartCustomLineItemTaxRate = {
  customLineItemId: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetCartCustomShippingMethod = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  taxCategory: Maybe<TResourceIdentifierInput>;
};

export type TSetCartCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCartCustomerEmail = {
  email: Maybe<Scalars['String']>;
};

export type TSetCartCustomerGroup = {
  customerGroup: Maybe<TResourceIdentifierInput>;
};

export type TSetCartCustomerId = {
  customerId: Maybe<Scalars['String']>;
};

export type TSetCartDeleteDaysAfterLastModification = {
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
};

export type TSetCartDiscountCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCartDiscountCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCartDiscountDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCartDiscountKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetCartDiscountValidFrom = {
  validFrom: Maybe<Scalars['DateTime']>;
};

export type TSetCartDiscountValidFromAndUntil = {
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
};

export type TSetCartDiscountValidUntil = {
  validUntil: Maybe<Scalars['DateTime']>;
};

export type TSetCartItemShippingAddressCustomField = {
  addressKey: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCartItemShippingAddressCustomType = {
  addressKey: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCartKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetCartLineItemCustomField = {
  lineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCartLineItemCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  lineItemId: Scalars['String'];
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCartLineItemDistributionChannel = {
  distributionChannel: Maybe<TResourceIdentifierInput>;
  lineItemId: Scalars['String'];
};

export type TSetCartLineItemPrice = {
  externalPrice: Maybe<TBaseMoneyInput>;
  lineItemId: Scalars['String'];
};

export type TSetCartLineItemShippingDetails = {
  lineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
};

export type TSetCartLineItemTaxAmount = {
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
  lineItemId: Scalars['String'];
};

export type TSetCartLineItemTaxRate = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  lineItemId: Scalars['String'];
};

export type TSetCartLineItemTotalPrice = {
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  lineItemId: Scalars['String'];
};

export type TSetCartLocale = {
  locale: Maybe<Scalars['Locale']>;
};

export type TSetCartShippingAddress = {
  address: Maybe<TAddressInput>;
};

export type TSetCartShippingAddressCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCartShippingAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCartShippingMethod = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  shippingMethod: Maybe<TResourceIdentifierInput>;
};

export type TSetCartShippingMethodTaxAmount = {
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
};

export type TSetCartShippingMethodTaxRate = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetCartShippingRateInput = {
  shippingRateInput: Maybe<TShippingRateInputDraft>;
};

export type TSetCartTotalTax = {
  externalTaxPortions: Maybe<Array<TTaxPortionDraft>>;
  externalTotalGross: Maybe<TMoneyInput>;
};

export type TSetCategoryAssetCustomField = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCategoryAssetCustomType = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCategoryAssetDescription = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCategoryAssetKey = {
  assetId: Scalars['String'];
  assetKey: Maybe<Scalars['String']>;
};

export type TSetCategoryAssetSources = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  sources: Maybe<Array<TAssetSourceInput>>;
};

export type TSetCategoryAssetTags = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  tags: Maybe<Array<Scalars['String']>>;
};

export type TSetCategoryCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCategoryCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCategoryDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCategoryExternalId = {
  externalId: Maybe<Scalars['String']>;
};

export type TSetCategoryKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetCategoryMetaDescription = {
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCategoryMetaKeywords = {
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetCategoryMetaTitle = {
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetChannelAddress = {
  address: Maybe<TAddressInput>;
};

export type TSetChannelAddressCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetChannelAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetChannelCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetChannelCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetChannelGeoLocation = {
  geoLocation: Maybe<TGeometryInput>;
};

export type TSetChannelRoles = {
  roles: Array<TChannelRole>;
};

export type TSetCustomerAddressCustomField = {
  addressId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCustomerAddressCustomType = {
  addressId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCustomerCompanyName = {
  companyName: Maybe<Scalars['String']>;
};

export type TSetCustomerCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCustomerCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCustomerDateOfBirth = {
  dateOfBirth: Maybe<Scalars['Date']>;
};

export type TSetCustomerDefaultBillingAddress = {
  addressId: Maybe<Scalars['String']>;
  addressKey: Maybe<Scalars['String']>;
};

export type TSetCustomerDefaultShippingAddress = {
  addressId: Maybe<Scalars['String']>;
  addressKey: Maybe<Scalars['String']>;
};

export type TSetCustomerExternalId = {
  externalId: Maybe<Scalars['String']>;
};

export type TSetCustomerFirstName = {
  firstName: Maybe<Scalars['String']>;
};

export type TSetCustomerGroup = {
  customerGroup: Maybe<TResourceIdentifierInput>;
};

export type TSetCustomerGroupCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCustomerGroupCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetCustomerGroupKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetCustomerKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetCustomerLastName = {
  lastName: Maybe<Scalars['String']>;
};

export type TSetCustomerLocale = {
  locale: Maybe<Scalars['Locale']>;
};

export type TSetCustomerMiddleName = {
  middleName: Maybe<Scalars['String']>;
};

export type TSetCustomerNumber = {
  customerNumber: Maybe<Scalars['String']>;
};

export type TSetCustomerSalutation = {
  salutation: Maybe<Scalars['String']>;
};

export type TSetCustomerStores = {
  stores: Array<TResourceIdentifierInput>;
};

export type TSetCustomerTitle = {
  title: Maybe<Scalars['String']>;
};

export type TSetCustomerVatId = {
  vatId: Maybe<Scalars['String']>;
};

export type TSetDiscountCodeCartPredicate = {
  cartPredicate: Maybe<Scalars['String']>;
};

export type TSetDiscountCodeCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetDiscountCodeCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetDiscountCodeDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetDiscountCodeMaxApplications = {
  maxApplications: Maybe<Scalars['Long']>;
};

export type TSetDiscountCodeMaxApplicationsPerCustomer = {
  maxApplicationsPerCustomer: Maybe<Scalars['Long']>;
};

export type TSetDiscountCodeName = {
  name: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetDiscountCodeValidFrom = {
  validFrom: Maybe<Scalars['DateTime']>;
};

export type TSetDiscountCodeValidFromAndUntil = {
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
};

export type TSetDiscountCodeValidUntil = {
  validUntil: Maybe<Scalars['DateTime']>;
};

export type TSetExtensionKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetExtensionTimeoutInMs = {
  timeoutInMs: Maybe<Scalars['Int']>;
};

export type TSetInventoryEntryCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetInventoryEntryCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetInventoryEntryExpectedDelivery = {
  expectedDelivery: Maybe<Scalars['DateTime']>;
};

export type TSetInventoryEntryRestockableInDays = {
  restockableInDays: Maybe<Scalars['Int']>;
};

export type TSetInventoryEntrySupplyChannel = {
  supplyChannel: Maybe<TResourceIdentifierInput>;
};

export type TSetMyCartShippingMethod = {
  shippingMethod: Maybe<TResourceIdentifierInput>;
};

export type TSetOrderBillingAddress = {
  address: Maybe<TAddressInput>;
};

export type TSetOrderBillingAddressCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetOrderBillingAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetOrderCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetOrderCustomLineItemCustomField = {
  customLineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetOrderCustomLineItemCustomType = {
  customLineItemId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetOrderCustomLineItemShippingDetails = {
  customLineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
};

export type TSetOrderCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetOrderCustomerEmail = {
  email: Maybe<Scalars['String']>;
};

export type TSetOrderCustomerId = {
  customerId: Maybe<Scalars['String']>;
};

export type TSetOrderDeliveryAddress = {
  address: Maybe<TAddressInput>;
  deliveryId: Scalars['String'];
};

export type TSetOrderDeliveryAddressCustomField = {
  deliveryId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetOrderDeliveryAddressCustomType = {
  deliveryId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetOrderDeliveryItems = {
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItemDraftType>;
};

export type TSetOrderEditComment = {
  comment: Maybe<Scalars['String']>;
};

export type TSetOrderEditCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetOrderEditCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetOrderEditKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetOrderEditStagedActions = {
  stagedActions: Array<TStagedOrderUpdateAction>;
};

export type TSetOrderItemShippingAddressCustomField = {
  addressKey: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetOrderItemShippingAddressCustomType = {
  addressKey: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetOrderLineItemCustomField = {
  lineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetOrderLineItemCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  lineItemId: Scalars['String'];
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetOrderLineItemShippingDetails = {
  lineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
};

export type TSetOrderLocale = {
  locale: Maybe<Scalars['Locale']>;
};

export type TSetOrderNumber = {
  orderNumber: Maybe<Scalars['String']>;
};

export type TSetOrderParcelItems = {
  items: Array<TDeliveryItemDraftType>;
  parcelId: Scalars['String'];
};

export type TSetOrderParcelMeasurements = {
  measurements: Maybe<TParcelMeasurementsDraftType>;
  parcelId: Scalars['String'];
};

export type TSetOrderParcelTrackingData = {
  parcelId: Scalars['String'];
  trackingData: Maybe<TTrackingDataDraftType>;
};

export type TSetOrderReturnInfo = {
  items: Array<TReturnInfoDraftType>;
};

export type TSetOrderReturnPaymentState = {
  paymentState: TReturnPaymentState;
  returnItemId: Scalars['String'];
};

export type TSetOrderReturnShipmentState = {
  returnItemId: Scalars['String'];
  shipmentState: TReturnShipmentState;
};

export type TSetOrderShippingAddress = {
  address: Maybe<TAddressInput>;
};

export type TSetOrderShippingAddressCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetOrderShippingAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetOrderStore = {
  store: Maybe<TResourceIdentifierInput>;
};

export type TSetPaymentAmountPaid = {
  amount: Maybe<TMoneyInput>;
};

export type TSetPaymentAmountRefunded = {
  amount: Maybe<TMoneyInput>;
};

export type TSetPaymentAnonymousId = {
  anonymousId: Maybe<Scalars['String']>;
};

export type TSetPaymentAuthorization = {
  amount: Maybe<TMoneyInput>;
  until: Maybe<Scalars['DateTime']>;
};

export type TSetPaymentCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetPaymentCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetPaymentCustomer = {
  customer: Maybe<TReferenceInput>;
};

export type TSetPaymentExternalId = {
  externalId: Maybe<Scalars['String']>;
};

export type TSetPaymentInterfaceId = {
  interfaceId: Maybe<Scalars['String']>;
};

export type TSetPaymentKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetPaymentMethodInfoInterface = {
  interface: Scalars['String'];
};

export type TSetPaymentMethodInfoMethod = {
  method: Maybe<Scalars['String']>;
};

export type TSetPaymentMethodInfoName = {
  name: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetPaymentStatusInterfaceCode = {
  interfaceCode: Maybe<Scalars['String']>;
};

export type TSetPaymentStatusInterfaceText = {
  interfaceText: Maybe<Scalars['String']>;
};

export type TSetProductAssetCustomField = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  name: Scalars['String'];
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  value: Maybe<Scalars['String']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProductAssetCustomType = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  fields: Maybe<Array<TCustomFieldInput>>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProductAssetDescription = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProductAssetKey = {
  assetId: Scalars['String'];
  assetKey: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProductAssetSources = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  sources: Maybe<Array<TAssetSourceInput>>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProductAssetTags = {
  assetId: Maybe<Scalars['String']>;
  assetKey: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  tags: Maybe<Array<Scalars['String']>>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProductAttribute = {
  name: Scalars['String'];
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  value: Maybe<Scalars['String']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProductAttributeInAllVariants = {
  name: Scalars['String'];
  staged: Maybe<Scalars['Boolean']>;
  value: Maybe<Scalars['String']>;
};

export type TSetProductCategoryOrderHint = {
  categoryId: Scalars['String'];
  orderHint: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductDiscountDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetProductDiscountKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetProductDiscountValidFrom = {
  validFrom: Maybe<Scalars['DateTime']>;
};

export type TSetProductDiscountValidFromAndUntil = {
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
};

export type TSetProductDiscountValidUntil = {
  validUntil: Maybe<Scalars['DateTime']>;
};

export type TSetProductDiscountedPrice = {
  discounted: Maybe<TDiscountedProductPriceValueInput>;
  priceId: Scalars['String'];
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductImageLabel = {
  imageUrl: Scalars['String'];
  label: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProductKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetProductMetaAttributes = {
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>;
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>;
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductMetaDescription = {
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductMetaKeywords = {
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductMetaTitle = {
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductPriceCustomField = {
  name: Scalars['String'];
  priceId: Scalars['String'];
  staged: Maybe<Scalars['Boolean']>;
  value: Maybe<Scalars['String']>;
};

export type TSetProductPriceCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  priceId: Scalars['String'];
  staged: Maybe<Scalars['Boolean']>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetProductPrices = {
  prices: Array<TProductPriceDataInput>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProductSku = {
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Scalars['Int'];
};

export type TSetProductTaxCategory = {
  taxCategory: Maybe<TResourceIdentifierInput>;
};

export type TSetProductVariantKey = {
  key: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  variantId: Maybe<Scalars['Int']>;
};

export type TSetProjectSettingsExternalOAuth = {
  externalOAuth: Maybe<TExternalOAuthDraft>;
};

export type TSetProjectSettingsShippingRateInputType = {
  shippingRateInputType: Maybe<TShippingRateInputTypeInput>;
};

export type TSetReviewAuthorName = {
  authorName: Maybe<Scalars['String']>;
};

export type TSetReviewCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetReviewCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetReviewCustomer = {
  customer: Maybe<TResourceIdentifierInput>;
};

export type TSetReviewKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetReviewLocale = {
  locale: Maybe<Scalars['Locale']>;
};

export type TSetReviewRating = {
  rating: Maybe<Scalars['Int']>;
};

export type TSetReviewTarget = {
  target: Maybe<TTargetReferenceInput>;
};

export type TSetReviewText = {
  text: Maybe<Scalars['String']>;
};

export type TSetReviewTitle = {
  title: Maybe<Scalars['String']>;
};

export type TSetSearchKeywords = {
  searchKeywords: Array<TSearchKeywordInput>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetShippingMethodCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetShippingMethodCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetShippingMethodDescription = {
  description: Maybe<Scalars['String']>;
};

export type TSetShippingMethodKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetShippingMethodLocalizedDescription = {
  localizedDescription: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetShippingMethodLocalizedName = {
  localizedName: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetShippingMethodPredicate = {
  predicate: Maybe<Scalars['String']>;
};

export type TSetShoppingListAnonymousId = {
  anonymousId: Maybe<Scalars['String']>;
};

export type TSetShoppingListCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetShoppingListCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetShoppingListCustomer = {
  customer: Maybe<TResourceIdentifierInput>;
};

export type TSetShoppingListDeleteDaysAfterLastModification = {
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
};

export type TSetShoppingListDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetShoppingListKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetShoppingListLineItemCustomField = {
  lineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetShoppingListLineItemCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  lineItemId: Scalars['String'];
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetShoppingListSlug = {
  slug: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetShoppingListStore = {
  store: Maybe<TResourceIdentifierInput>;
};

export type TSetShoppingListTextLineItemCustomField = {
  name: Scalars['String'];
  textLineItemId: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetShoppingListTextLineItemCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  textLineItemId: Scalars['String'];
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetShoppingListTextLineItemDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  textLineItemId: Scalars['String'];
};

export type TSetStagedOrderBillingAddress = {
  address: Maybe<TAddressInput>;
};

export type TSetStagedOrderBillingAddressCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderBillingAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderBillingAddressCustomFieldOutput';
  name: Scalars['String'];
  type: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderBillingAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetStagedOrderBillingAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderBillingAddressCustomTypeOutput';
  custom: TCustomFieldsCommand;
  type: Scalars['String'];
};

export type TSetStagedOrderBillingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderBillingAddressOutput';
  address: Maybe<TAddressDraft>;
  type: Scalars['String'];
};

export type TSetStagedOrderCountry = {
  country: Maybe<Scalars['Country']>;
};

export type TSetStagedOrderCountryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCountryOutput';
  country: Maybe<Scalars['Country']>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomFieldOutput';
  name: Scalars['String'];
  type: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderCustomLineItemCustomField = {
  customLineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomLineItemCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemCustomFieldOutput';
  customLineItemId: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderCustomLineItemCustomType = {
  customLineItemId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomLineItemCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemCustomTypeOutput';
  custom: TCustomFieldsCommand;
  customLineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderCustomLineItemShippingDetails = {
  customLineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
};

export type TSetStagedOrderCustomLineItemShippingDetailsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemShippingDetailsOutput';
  customLineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomLineItemTaxAmount = {
  customLineItemId: Scalars['String'];
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
};

export type TSetStagedOrderCustomLineItemTaxAmountOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemTaxAmountOutput';
  customLineItemId: Scalars['String'];
  externalTaxAmount: Maybe<TExternalTaxAmountDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomLineItemTaxRate = {
  customLineItemId: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetStagedOrderCustomLineItemTaxRateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemTaxRateOutput';
  customLineItemId: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomShippingMethod = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  taxCategory: Maybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderCustomShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomShippingMethodOutput';
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRate;
  taxCategoryResId: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomTypeOutput';
  custom: TCustomFieldsCommand;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomerEmail = {
  email: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomerEmailOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomerEmailOutput';
  email: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomerGroup = {
  customerGroup: Maybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderCustomerGroupOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomerGroupOutput';
  customerGroupResId: Maybe<TCustomerGroupReferenceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderCustomerId = {
  customerId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomerIdOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomerIdOutput';
  customerId: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderDeliveryAddress = {
  address: Maybe<TAddressInput>;
  deliveryId: Scalars['String'];
};

export type TSetStagedOrderDeliveryAddressCustomField = {
  deliveryId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryAddressCustomFieldOutput';
  deliveryId: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderDeliveryAddressCustomType = {
  deliveryId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryAddressCustomTypeOutput';
  custom: TCustomFieldsCommand;
  deliveryId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderDeliveryAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryAddressOutput';
  address: Maybe<TAddressDraft>;
  deliveryId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderDeliveryItems = {
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItemDraftType>;
};

export type TSetStagedOrderDeliveryItemsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryItemsOutput';
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItem>;
  type: Scalars['String'];
};

export type TSetStagedOrderItemShippingAddressCustomField = {
  addressKey: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderItemShippingAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderItemShippingAddressCustomFieldOutput';
  addressKey: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderItemShippingAddressCustomType = {
  addressKey: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetStagedOrderItemShippingAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderItemShippingAddressCustomTypeOutput';
  addressKey: Scalars['String'];
  custom: TCustomFieldsCommand;
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemCustomField = {
  lineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemCustomFieldOutput';
  lineItemId: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderLineItemCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  lineItemId: Scalars['String'];
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemCustomTypeOutput';
  custom: TCustomFieldsCommand;
  lineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemDistributionChannel = {
  distributionChannel: Maybe<TResourceIdentifierInput>;
  lineItemId: Scalars['String'];
};

export type TSetStagedOrderLineItemDistributionChannelOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemDistributionChannelOutput';
  distributionChannelResId: Maybe<TChannelReferenceIdentifier>;
  lineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemPrice = {
  externalPrice: Maybe<TBaseMoneyInput>;
  lineItemId: Scalars['String'];
};

export type TSetStagedOrderLineItemPriceOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemPriceOutput';
  externalPrice: Maybe<TBaseMoney>;
  lineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemShippingDetails = {
  lineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
};

export type TSetStagedOrderLineItemShippingDetailsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemShippingDetailsOutput';
  lineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemTaxAmount = {
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
  lineItemId: Scalars['String'];
};

export type TSetStagedOrderLineItemTaxAmountOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemTaxAmountOutput';
  externalTaxAmount: Maybe<TExternalTaxAmountDraftOutput>;
  lineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemTaxRate = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  lineItemId: Scalars['String'];
};

export type TSetStagedOrderLineItemTaxRateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemTaxRateOutput';
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  lineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderLineItemTotalPrice = {
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  lineItemId: Scalars['String'];
};

export type TSetStagedOrderLineItemTotalPriceOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemTotalPriceOutput';
  externalTotalPrice: Maybe<TExternalLineItemTotalPrice>;
  lineItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderLocale = {
  locale: Maybe<Scalars['Locale']>;
};

export type TSetStagedOrderLocaleOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLocaleOutput';
  locale: Maybe<Scalars['Locale']>;
  type: Scalars['String'];
};

export type TSetStagedOrderOrderNumber = {
  orderNumber: Maybe<Scalars['String']>;
};

export type TSetStagedOrderOrderNumberOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderOrderNumberOutput';
  orderNumber: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type TSetStagedOrderOrderTotalTax = {
  externalTaxPortions: Maybe<Array<TTaxPortionDraft>>;
  externalTotalGross: Maybe<TMoneyInput>;
};

export type TSetStagedOrderOrderTotalTaxOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderOrderTotalTaxOutput';
  externalTaxPortions: Array<TTaxPortion>;
  externalTotalGross: Maybe<TMoney>;
  type: Scalars['String'];
};

export type TSetStagedOrderParcelItems = {
  items: Array<TDeliveryItemDraftType>;
  parcelId: Scalars['String'];
};

export type TSetStagedOrderParcelItemsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelItemsOutput';
  items: Array<TDeliveryItem>;
  parcelId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderParcelMeasurements = {
  measurements: Maybe<TParcelMeasurementsDraftType>;
  parcelId: Scalars['String'];
};

export type TSetStagedOrderParcelMeasurementsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelMeasurementsOutput';
  measurements: Maybe<TParcelMeasurements>;
  parcelId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderParcelTrackingData = {
  parcelId: Scalars['String'];
  trackingData: Maybe<TTrackingDataDraftType>;
};

export type TSetStagedOrderParcelTrackingDataOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelTrackingDataOutput';
  parcelId: Scalars['String'];
  trackingData: Maybe<TTrackingData>;
  type: Scalars['String'];
};

export type TSetStagedOrderReturnInfo = {
  items: Array<TReturnInfoDraftType>;
};

export type TSetStagedOrderReturnInfoOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnInfoOutput';
  items: Array<TReturnInfoDraftTypeOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderReturnPaymentState = {
  paymentState: TReturnPaymentState;
  returnItemId: Scalars['String'];
};

export type TSetStagedOrderReturnPaymentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnPaymentStateOutput';
  paymentState: TReturnPaymentState;
  returnItemId: Scalars['String'];
  type: Scalars['String'];
};

export type TSetStagedOrderReturnShipmentState = {
  returnItemId: Scalars['String'];
  shipmentState: TReturnShipmentState;
};

export type TSetStagedOrderReturnShipmentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnShipmentStateOutput';
  returnItemId: Scalars['String'];
  shipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingAddress = {
  address: Maybe<TAddressInput>;
};

export type TSetStagedOrderShippingAddressAndCustomShippingMethod = {
  address: TAddressInput;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  taxCategory: Maybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderShippingAddressAndCustomShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressAndCustomShippingMethodOutput';
  address: TAddressDraft;
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRate;
  taxCategoryResId: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingAddressAndShippingMethod = {
  address: TAddressInput;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  shippingMethod: Maybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderShippingAddressAndShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressAndShippingMethodOutput';
  address: TAddressDraft;
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  shippingMethodResId: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingAddressCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderShippingAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressCustomFieldOutput';
  name: Scalars['String'];
  type: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderShippingAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetStagedOrderShippingAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressCustomTypeOutput';
  custom: TCustomFieldsCommand;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressOutput';
  address: Maybe<TAddressDraft>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingMethod = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  shippingMethod: Maybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingMethodOutput';
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  shippingMethodResId: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingMethodTaxAmount = {
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
};

export type TSetStagedOrderShippingMethodTaxAmountOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingMethodTaxAmountOutput';
  externalTaxAmount: Maybe<TExternalTaxAmountDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingMethodTaxRate = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetStagedOrderShippingMethodTaxRateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingMethodTaxRateOutput';
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderShippingRateInput = {
  shippingRateInput: Maybe<TShippingRateInputDraft>;
};

export type TSetStagedOrderShippingRateInputOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingRateInputOutput';
  shippingRateInput: Maybe<TShippingRateInputDraftOutput>;
  type: Scalars['String'];
};

export type TSetStagedOrderStore = {
  store: Maybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderStoreOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderStoreOutput';
  storeResId: Maybe<TResourceIdentifier>;
  type: Scalars['String'];
};

export type TSetStateDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetStateName = {
  name: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetStateRoles = {
  roles: Array<TStateRole>;
};

export type TSetStateTransitions = {
  transitions: Maybe<Array<TResourceIdentifierInput>>;
};

export type TSetStoreCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStoreCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
};

export type TSetStoreDistributionChannels = {
  distributionChannels: Maybe<Array<TResourceIdentifierInput>>;
};

export type TSetStoreLanguages = {
  languages: Maybe<Array<Scalars['Locale']>>;
};

export type TSetStoreName = {
  name: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetStoreSupplyChannels = {
  supplyChannels: Maybe<Array<TResourceIdentifierInput>>;
};

export type TSetSubscriptionChanges = {
  changes: Array<TChangeSubscriptionInput>;
};

export type TSetSubscriptionKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetSubscriptionMessages = {
  messages: Array<TMessageSubscriptionInput>;
};

export type TSetTaxCategoryKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetType = TFieldType & {
  __typename?: 'SetType';
  elementType: TFieldType;
  name: Scalars['String'];
};

export type TSetTypeDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetZoneDescription = {
  description: Maybe<Scalars['String']>;
};

export type TSetZoneKey = {
  key: Maybe<Scalars['String']>;
};

export enum TShipmentState {
  Backorder = 'Backorder',
  Delayed = 'Delayed',
  Partial = 'Partial',
  Pending = 'Pending',
  Ready = 'Ready',
  Shipped = 'Shipped'
}

export type TShippingInfo = {
  __typename?: 'ShippingInfo';
  deliveries: Array<TDelivery>;
  discountedPrice: Maybe<TDiscountedLineItemPrice>;
  price: TMoney;
  shippingMethod: Maybe<TShippingMethod>;
  shippingMethodName: Scalars['String'];
  shippingMethodRef: Maybe<TReference>;
  shippingMethodState: TShippingMethodState;
  shippingRate: TShippingRate;
  taxCategory: Maybe<TTaxCategory>;
  taxCategoryRef: Maybe<TReference>;
  taxRate: Maybe<TTaxRate>;
  taxedPrice: Maybe<TTaxedItemPrice>;
};

export type TShippingMethod = TVersioned & {
  __typename?: 'ShippingMethod';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  isDefault: Scalars['Boolean'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  localizedDescription: Maybe<Scalars['String']>;
  localizedDescriptionAllLocales: Maybe<Array<TLocalizedString>>;
  localizedName: Maybe<Scalars['String']>;
  localizedNameAllLocales: Maybe<Array<TLocalizedString>>;
  name: Scalars['String'];
  predicate: Maybe<Scalars['String']>;
  taxCategory: Maybe<TTaxCategory>;
  taxCategoryRef: Maybe<TReference>;
  version: Scalars['Long'];
  zoneRates: Array<TZoneRate>;
};


export type TShippingMethod_LocalizedDescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TShippingMethod_LocalizedNameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TShippingMethodDraft = {
  custom: Maybe<TCustomFieldsDraft>;
  description: Maybe<Scalars['String']>;
  isDefault: Scalars['Boolean'];
  key: Maybe<Scalars['String']>;
  localizedDescription: Maybe<Array<TLocalizedStringItemInputType>>;
  localizedName: Maybe<Array<TLocalizedStringItemInputType>>;
  name: Scalars['String'];
  predicate: Maybe<Scalars['String']>;
  taxCategory: TResourceIdentifierInput;
  zoneRates: Maybe<Array<TZoneRateDraft>>;
};

export type TShippingMethodLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ShippingMethodLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TShippingMethodLimitsProjection = {
  __typename?: 'ShippingMethodLimitsProjection';
  total: TShippingMethodLimitWithCurrent;
};

export type TShippingMethodQueryResult = {
  __typename?: 'ShippingMethodQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
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
  addShippingRate: Maybe<TAddShippingMethodShippingRate>;
  addZone: Maybe<TAddShippingMethodZone>;
  changeIsDefault: Maybe<TChangeShippingMethodIsDefault>;
  changeName: Maybe<TChangeShippingMethodName>;
  changeTaxCategory: Maybe<TChangeShippingMethodTaxCategory>;
  removeShippingRate: Maybe<TRemoveShippingMethodShippingRate>;
  removeZone: Maybe<TRemoveShippingMethodZone>;
  setCustomField: Maybe<TSetShippingMethodCustomField>;
  setCustomType: Maybe<TSetShippingMethodCustomType>;
  setDescription: Maybe<TSetShippingMethodDescription>;
  setKey: Maybe<TSetShippingMethodKey>;
  setLocalizedDescription: Maybe<TSetShippingMethodLocalizedDescription>;
  setLocalizedName: Maybe<TSetShippingMethodLocalizedName>;
  setPredicate: Maybe<TSetShippingMethodPredicate>;
};

/** A field to retrieve available shipping methods for a cart. */
export type TShippingMethodsByCartInterface = {
  shippingMethodsByCart: Array<TShippingMethod>;
};


/** A field to retrieve available shipping methods for a cart. */
export type TShippingMethodsByCartInterface_ShippingMethodsByCartArgs = {
  id: Scalars['String'];
};

/** Shipping Rate */
export type TShippingRate = {
  __typename?: 'ShippingRate';
  freeAbove: Maybe<TMoney>;
  isMatching: Maybe<Scalars['Boolean']>;
  price: TMoney;
  tiers: Array<TShippingRatePriceTier>;
};

export type TShippingRateCartClassificationPriceTier = TShippingRatePriceTier & {
  __typename?: 'ShippingRateCartClassificationPriceTier';
  isMatching: Maybe<Scalars['Boolean']>;
  price: TMoney;
  type: Scalars['String'];
  value: Scalars['String'];
};

export type TShippingRateCartScorePriceTier = TShippingRatePriceTier & {
  __typename?: 'ShippingRateCartScorePriceTier';
  isMatching: Maybe<Scalars['Boolean']>;
  price: Maybe<TMoney>;
  priceFunction: Maybe<TPriceFunction>;
  score: Scalars['Int'];
  type: Scalars['String'];
};

export type TShippingRateCartValuePriceTier = TShippingRatePriceTier & {
  __typename?: 'ShippingRateCartValuePriceTier';
  isMatching: Maybe<Scalars['Boolean']>;
  minimumCentAmount: Scalars['Int'];
  price: TMoney;
  type: Scalars['String'];
};

export type TShippingRateDraft = {
  freeAbove: Maybe<TMoneyDraft>;
  price: TMoneyDraft;
  tiers: Maybe<Array<TShippingRatePriceTierDraft>>;
};

export type TShippingRateInput = {
  type: Scalars['String'];
};

export type TShippingRateInputDraft = {
  Classification: Maybe<TClassificationShippingRateInputDraft>;
  Score: Maybe<TScoreShippingRateInputDraft>;
};

export type TShippingRateInputDraftOutput = {
  type: Scalars['String'];
};

export type TShippingRateInputLocalizedEnumValue = {
  __typename?: 'ShippingRateInputLocalizedEnumValue';
  key: Scalars['String'];
  label: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
};


export type TShippingRateInputLocalizedEnumValue_LabelArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TShippingRateInputType = {
  type: Scalars['String'];
};

export type TShippingRateInputTypeInput = {
  CartClassification: Maybe<TCartClassificationInput>;
  CartScore: Maybe<TCartScoreInput>;
  CartValue: Maybe<TCartValueInput>;
};

export type TShippingRatePriceTier = {
  type: Scalars['String'];
};

export type TShippingRatePriceTierCartClassificationDraft = {
  price: TMoneyDraft;
  value: Scalars['String'];
};

export type TShippingRatePriceTierCartScoreDraft = {
  price: Maybe<TMoneyDraft>;
  priceFunction: Maybe<TPriceFunctionDraft>;
  score: Scalars['Int'];
};

export type TShippingRatePriceTierCartValueDraft = {
  minimumCentAmount: Scalars['Int'];
  price: TMoneyDraft;
};

export type TShippingRatePriceTierDraft = {
  CartClassification: Maybe<TShippingRatePriceTierCartClassificationDraft>;
  CartScore: Maybe<TShippingRatePriceTierCartScoreDraft>;
  CartValue: Maybe<TShippingRatePriceTierCartValueDraft>;
};

export type TShippingTarget = TCartDiscountTarget & {
  __typename?: 'ShippingTarget';
  type: Scalars['String'];
};

export type TShippingTargetDraft = {
  addressKey: Scalars['String'];
  quantity: Scalars['Long'];
};

export type TShippingTargetDraftType = {
  addressKey: Scalars['String'];
  quantity: Scalars['Long'];
};

export type TShippingTargetInput = {
  dummy: Maybe<Scalars['String']>;
};

export type TShoppingList = TVersioned & {
  __typename?: 'ShoppingList';
  anonymousId: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  customer: Maybe<TCustomer>;
  customerRef: Maybe<TReference>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  lineItems: Array<TShoppingListLineItem>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Maybe<Array<TLocalizedString>>;
  store: Maybe<TStore>;
  storeRef: Maybe<TKeyReference>;
  textLineItems: Array<TTextLineItem>;
  version: Scalars['Long'];
};


export type TShoppingList_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TShoppingList_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TShoppingList_SlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TShoppingListDraft = {
  anonymousId: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
  customer: Maybe<TResourceIdentifierInput>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  key: Maybe<Scalars['String']>;
  lineItems: Maybe<Array<TShoppingListLineItemDraft>>;
  name: Array<TLocalizedStringItemInputType>;
  slug: Maybe<Array<TLocalizedStringItemInputType>>;
  textLineItems: Maybe<Array<TTextLineItemDraft>>;
};

export type TShoppingListLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ShoppingListLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
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
  custom: Maybe<TCustomFieldsType>;
  deactivatedAt: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  productId: Scalars['String'];
  productSlug: Maybe<Scalars['String']>;
  productSlugAllLocales: Maybe<Array<TLocalizedString>>;
  productType: TProductTypeDefinition;
  productTypeRef: TReference;
  quantity: Scalars['Int'];
  variant: Maybe<TProductVariant>;
  variantId: Maybe<Scalars['Int']>;
};


export type TShoppingListLineItem_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TShoppingListLineItem_ProductSlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TShoppingListLineItemDraft = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  productId: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  variantId: Maybe<Scalars['Int']>;
};

/** Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists. */
export type TShoppingListQueryInterface = {
  shoppingList: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
};


/** Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists. */
export type TShoppingListQueryInterface_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


/** Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists. */
export type TShoppingListQueryInterface_ShoppingListsArgs = {
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
  where: Maybe<Scalars['String']>;
};

export type TShoppingListQueryResult = {
  __typename?: 'ShoppingListQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TShoppingList>;
  total: Scalars['Long'];
};

export type TShoppingListUpdateAction = {
  addLineItem: Maybe<TAddShoppingListLineItem>;
  addTextLineItem: Maybe<TAddShoppingListTextLineItem>;
  changeLineItemQuantity: Maybe<TChangeShoppingListLineItemQuantity>;
  changeLineItemsOrder: Maybe<TChangeShoppingListLineItemsOrder>;
  changeName: Maybe<TChangeShoppingListName>;
  changeTextLineItemName: Maybe<TChangeShoppingListTextLineItemName>;
  changeTextLineItemQuantity: Maybe<TChangeShoppingListTextLineItemQuantity>;
  changeTextLineItemsOrder: Maybe<TChangeShoppingListTextLineItemsOrder>;
  removeLineItem: Maybe<TRemoveShoppingListLineItem>;
  removeTextLineItem: Maybe<TRemoveShoppingListTextLineItem>;
  setAnonymousId: Maybe<TSetShoppingListAnonymousId>;
  setCustomField: Maybe<TSetShoppingListCustomField>;
  setCustomType: Maybe<TSetShoppingListCustomType>;
  setCustomer: Maybe<TSetShoppingListCustomer>;
  setDeleteDaysAfterLastModification: Maybe<TSetShoppingListDeleteDaysAfterLastModification>;
  setDescription: Maybe<TSetShoppingListDescription>;
  setKey: Maybe<TSetShoppingListKey>;
  setLineItemCustomField: Maybe<TSetShoppingListLineItemCustomField>;
  setLineItemCustomType: Maybe<TSetShoppingListLineItemCustomType>;
  setSlug: Maybe<TSetShoppingListSlug>;
  setStore: Maybe<TSetShoppingListStore>;
  setTextLineItemCustomField: Maybe<TSetShoppingListTextLineItemCustomField>;
  setTextLineItemCustomType: Maybe<TSetShoppingListTextLineItemCustomType>;
  setTextLineItemDescription: Maybe<TSetShoppingListTextLineItemDescription>;
};

export type TShoppingListsConfiguration = {
  __typename?: 'ShoppingListsConfiguration';
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
};

export type TShoppingListsConfigurationInput = {
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
};

export type TSimpleAttributeTypeDraft = {
  dummy: Maybe<Scalars['String']>;
};

export type TSimpleFieldTypeDraft = {
  dummy: Maybe<Scalars['String']>;
};

/** Describes how this discount interacts with other discounts */
export enum TStackingMode {
  /** Default. Continue applying other matching discounts after applying this one. */
  Stacking = 'Stacking',
  /** Don’t apply any more matching discounts after this one. */
  StopAfterThisDiscount = 'StopAfterThisDiscount'
}

export type TStagedOrderUpdateAction = {
  addCustomLineItem: Maybe<TAddStagedOrderCustomLineItem>;
  addDelivery: Maybe<TAddStagedOrderDelivery>;
  addDiscountCode: Maybe<TAddStagedOrderDiscountCode>;
  addItemShippingAddress: Maybe<TAddStagedOrderItemShippingAddress>;
  addLineItem: Maybe<TAddStagedOrderLineItem>;
  addParcelToDelivery: Maybe<TAddStagedOrderParcelToDelivery>;
  addPayment: Maybe<TAddStagedOrderPayment>;
  addReturnInfo: Maybe<TAddStagedOrderReturnInfo>;
  addShoppingList: Maybe<TAddStagedOrderShoppingList>;
  changeCustomLineItemMoney: Maybe<TChangeStagedOrderCustomLineItemMoney>;
  changeCustomLineItemQuantity: Maybe<TChangeStagedOrderCustomLineItemQuantity>;
  changeLineItemQuantity: Maybe<TChangeStagedOrderLineItemQuantity>;
  changeOrderState: Maybe<TChangeStagedOrderOrderState>;
  changePaymentState: Maybe<TChangeStagedOrderPaymentState>;
  changeShipmentState: Maybe<TChangeStagedOrderShipmentState>;
  changeTaxCalculationMode: Maybe<TChangeStagedOrderTaxCalculationMode>;
  changeTaxMode: Maybe<TChangeStagedOrderTaxMode>;
  changeTaxRoundingMode: Maybe<TChangeStagedOrderTaxRoundingMode>;
  importCustomLineItemState: Maybe<TImportStagedOrderCustomLineItemState>;
  importLineItemState: Maybe<TImportStagedOrderLineItemState>;
  recalculate: Maybe<TRecalculateStagedOrder>;
  removeCustomLineItem: Maybe<TRemoveStagedOrderCustomLineItem>;
  removeDelivery: Maybe<TRemoveStagedOrderDelivery>;
  removeDiscountCode: Maybe<TRemoveStagedOrderDiscountCode>;
  removeItemShippingAddress: Maybe<TRemoveStagedOrderItemShippingAddress>;
  removeLineItem: Maybe<TRemoveStagedOrderLineItem>;
  removeParcelFromDelivery: Maybe<TRemoveStagedOrderParcelFromDelivery>;
  removePayment: Maybe<TRemoveStagedOrderPayment>;
  setBillingAddress: Maybe<TSetStagedOrderBillingAddress>;
  setBillingAddressCustomField: Maybe<TSetStagedOrderBillingAddressCustomField>;
  setBillingAddressCustomType: Maybe<TSetStagedOrderBillingAddressCustomType>;
  setCountry: Maybe<TSetStagedOrderCountry>;
  setCustomField: Maybe<TSetStagedOrderCustomField>;
  setCustomLineItemCustomField: Maybe<TSetStagedOrderCustomLineItemCustomField>;
  setCustomLineItemCustomType: Maybe<TSetStagedOrderCustomLineItemCustomType>;
  setCustomLineItemShippingDetails: Maybe<TSetStagedOrderCustomLineItemShippingDetails>;
  setCustomLineItemTaxAmount: Maybe<TSetStagedOrderCustomLineItemTaxAmount>;
  setCustomLineItemTaxRate: Maybe<TSetStagedOrderCustomLineItemTaxRate>;
  setCustomShippingMethod: Maybe<TSetStagedOrderCustomShippingMethod>;
  setCustomType: Maybe<TSetStagedOrderCustomType>;
  setCustomerEmail: Maybe<TSetStagedOrderCustomerEmail>;
  setCustomerGroup: Maybe<TSetStagedOrderCustomerGroup>;
  setCustomerId: Maybe<TSetStagedOrderCustomerId>;
  setDeliveryAddress: Maybe<TSetStagedOrderDeliveryAddress>;
  setDeliveryAddressCustomField: Maybe<TSetStagedOrderDeliveryAddressCustomField>;
  setDeliveryAddressCustomType: Maybe<TSetStagedOrderDeliveryAddressCustomType>;
  setDeliveryItems: Maybe<TSetStagedOrderDeliveryItems>;
  setItemShippingAddressCustomField: Maybe<TSetStagedOrderItemShippingAddressCustomField>;
  setItemShippingAddressCustomType: Maybe<TSetStagedOrderItemShippingAddressCustomType>;
  setLineItemCustomField: Maybe<TSetStagedOrderLineItemCustomField>;
  setLineItemCustomType: Maybe<TSetStagedOrderLineItemCustomType>;
  setLineItemDistributionChannel: Maybe<TSetStagedOrderLineItemDistributionChannel>;
  setLineItemPrice: Maybe<TSetStagedOrderLineItemPrice>;
  setLineItemShippingDetails: Maybe<TSetStagedOrderLineItemShippingDetails>;
  setLineItemTaxAmount: Maybe<TSetStagedOrderLineItemTaxAmount>;
  setLineItemTaxRate: Maybe<TSetStagedOrderLineItemTaxRate>;
  setLineItemTotalPrice: Maybe<TSetStagedOrderLineItemTotalPrice>;
  setLocale: Maybe<TSetStagedOrderLocale>;
  setOrderNumber: Maybe<TSetStagedOrderOrderNumber>;
  setOrderTotalTax: Maybe<TSetStagedOrderOrderTotalTax>;
  setParcelItems: Maybe<TSetStagedOrderParcelItems>;
  setParcelMeasurements: Maybe<TSetStagedOrderParcelMeasurements>;
  setParcelTrackingData: Maybe<TSetStagedOrderParcelTrackingData>;
  setReturnInfo: Maybe<TSetStagedOrderReturnInfo>;
  setReturnPaymentState: Maybe<TSetStagedOrderReturnPaymentState>;
  setReturnShipmentState: Maybe<TSetStagedOrderReturnShipmentState>;
  setShippingAddress: Maybe<TSetStagedOrderShippingAddress>;
  setShippingAddressAndCustomShippingMethod: Maybe<TSetStagedOrderShippingAddressAndCustomShippingMethod>;
  setShippingAddressAndShippingMethod: Maybe<TSetStagedOrderShippingAddressAndShippingMethod>;
  setShippingAddressCustomField: Maybe<TSetStagedOrderShippingAddressCustomField>;
  setShippingAddressCustomType: Maybe<TSetStagedOrderShippingAddressCustomType>;
  setShippingMethod: Maybe<TSetStagedOrderShippingMethod>;
  setShippingMethodTaxAmount: Maybe<TSetStagedOrderShippingMethodTaxAmount>;
  setShippingMethodTaxRate: Maybe<TSetStagedOrderShippingMethodTaxRate>;
  setShippingRateInput: Maybe<TSetStagedOrderShippingRateInput>;
  setStore: Maybe<TSetStagedOrderStore>;
  transitionCustomLineItemState: Maybe<TTransitionStagedOrderCustomLineItemState>;
  transitionLineItemState: Maybe<TTransitionStagedOrderLineItemState>;
  transitionState: Maybe<TTransitionStagedOrderState>;
  updateItemShippingAddress: Maybe<TUpdateStagedOrderItemShippingAddress>;
  updateSyncInfo: Maybe<TUpdateStagedOrderSyncInfo>;
};

export type TStagedOrderUpdateActionOutput = {
  type: Scalars['String'];
};

/** [State](https://docs.commercetools.com/api/projects/states) */
export type TState = TVersioned & {
  __typename?: 'State';
  builtIn: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  initial: Scalars['Boolean'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  roles: Array<TStateRole>;
  transitions: Maybe<Array<TState>>;
  transitionsRef: Maybe<Array<TReference>>;
  type: TStateType;
  version: Scalars['Long'];
};


/** [State](https://docs.commercetools.com/api/projects/states) */
export type TState_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


/** [State](https://docs.commercetools.com/api/projects/states) */
export type TState_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TStateDraft = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  initial: Maybe<Scalars['Boolean']>;
  key: Scalars['String'];
  name: Maybe<Array<TLocalizedStringItemInputType>>;
  roles: Maybe<Array<TStateRole>>;
  transitions: Maybe<Array<TReferenceInput>>;
  type: TStateType;
};

export type TStateQueryResult = {
  __typename?: 'StateQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
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
  ReviewState = 'ReviewState'
}

export type TStateUpdateAction = {
  addRoles: Maybe<TAddStateRoles>;
  changeInitial: Maybe<TChangeStateInitial>;
  changeKey: Maybe<TChangeStateKey>;
  changeType: Maybe<TChangeStateType>;
  removeRoles: Maybe<TRemoveStateRoles>;
  setDescription: Maybe<TSetStateDescription>;
  setName: Maybe<TSetStateName>;
  setRoles: Maybe<TSetStateRoles>;
  setTransitions: Maybe<TSetStateTransitions>;
};

/** Stores allow defining different contexts for a project. */
export type TStore = TVersioned & {
  __typename?: 'Store';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  custom: Maybe<TCustomFieldsType>;
  distributionChannels: Array<TChannel>;
  distributionChannelsRef: Array<TReference>;
  id: Scalars['String'];
  key: Scalars['String'];
  languages: Maybe<Array<Scalars['Locale']>>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  supplyChannels: Array<TChannel>;
  supplyChannelsRef: Array<TReference>;
  version: Scalars['Long'];
};


/** Stores allow defining different contexts for a project. */
export type TStore_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TStoreCreated = TMessagePayload & {
  __typename?: 'StoreCreated';
  custom: Maybe<TCustomFieldsType>;
  distributionChannels: Array<TChannel>;
  distributionChannelsRef: Array<TReference>;
  languages: Array<Scalars['Locale']>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  supplyChannels: Array<TChannel>;
  supplyChannelsRef: Array<TReference>;
  type: Scalars['String'];
};


export type TStoreCreated_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TStoreDeleted = TMessagePayload & {
  __typename?: 'StoreDeleted';
  type: Scalars['String'];
};

export type TStoreLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'StoreLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TStoreLimitsProjection = {
  __typename?: 'StoreLimitsProjection';
  inventorySupplyChannels: TLimit;
  productDistributionChannels: TLimit;
  total: TStoreLimitWithCurrent;
};

export type TStoreQueryResult = {
  __typename?: 'StoreQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TStore>;
  total: Scalars['Long'];
};

export type TStoreUpdateAction = {
  addDistributionChannel: Maybe<TAddStoreDistributionChannel>;
  addSupplyChannel: Maybe<TAddStoreSupplyChannel>;
  removeDistributionChannel: Maybe<TRemoveStoreDistributionChannel>;
  removeSupplyChannel: Maybe<TRemoveStoreSupplyChannel>;
  setCustomField: Maybe<TSetStoreCustomField>;
  setCustomType: Maybe<TSetStoreCustomType>;
  setDistributionChannels: Maybe<TSetStoreDistributionChannels>;
  setLanguages: Maybe<TSetStoreLanguages>;
  setName: Maybe<TSetStoreName>;
  setSupplyChannels: Maybe<TSetStoreSupplyChannels>;
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
  changes: Maybe<Array<TChangeSubscriptionInput>>;
  destination: TDestinationInput;
  format: Maybe<TSubscriptionFormatInput>;
  key: Maybe<Scalars['String']>;
  messages: Maybe<Array<TMessageSubscriptionInput>>;
};

export type TSubscriptionFormatInput = {
  CloudEvents: Maybe<TCloudEventsSubscriptionsFormatInput>;
  Platform: Maybe<TPlatformFormatInput>;
};

export enum TSubscriptionHealthStatus {
  ConfigurationError = 'ConfigurationError',
  ConfigurationErrorDeliveryStopped = 'ConfigurationErrorDeliveryStopped',
  Healthy = 'Healthy',
  TemporaryError = 'TemporaryError'
}

export type TSubscriptionUpdateAction = {
  changeDestination: Maybe<TChangeSubscriptionDestination>;
  setChanges: Maybe<TSetSubscriptionChanges>;
  setKey: Maybe<TSetSubscriptionKey>;
  setMessages: Maybe<TSetSubscriptionMessages>;
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
  channel: Maybe<TChannel>;
  channelRef: TReference;
  externalId: Maybe<Scalars['String']>;
  syncedAt: Scalars['DateTime'];
};

export type TTargetReferenceInput = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
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
export type TTaxCategory = TVersioned & {
  __typename?: 'TaxCategory';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  description: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
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
  description: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  name: Scalars['String'];
  rates: Maybe<Array<TTaxRateDraft>>;
};

export type TTaxCategoryLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'TaxCategoryLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TTaxCategoryLimitsProjection = {
  __typename?: 'TaxCategoryLimitsProjection';
  total: TTaxCategoryLimitWithCurrent;
};

export type TTaxCategoryQueryResult = {
  __typename?: 'TaxCategoryQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TTaxCategory>;
  total: Scalars['Long'];
};

export type TTaxCategoryRemoveTaxRate = {
  taxRateId: Scalars['String'];
};

export type TTaxCategoryReplaceTaxRate = {
  taxRate: TTaxRateDraft;
  taxRateId: Scalars['String'];
};

export type TTaxCategorySetDescription = {
  description: Maybe<Scalars['String']>;
};

export type TTaxCategoryUpdateAction = {
  addTaxRate: Maybe<TTaxCategoryAddTaxRate>;
  changeName: Maybe<TTaxCategoryChangeName>;
  removeTaxRate: Maybe<TTaxCategoryRemoveTaxRate>;
  replaceTaxRate: Maybe<TTaxCategoryReplaceTaxRate>;
  setDescription: Maybe<TTaxCategorySetDescription>;
  setKey: Maybe<TSetTaxCategoryKey>;
};

export enum TTaxMode {
  /** No taxes are added to the cart. */
  Disabled = 'Disabled',
  /**
   * The tax rates are set externally per ExternalTaxRateDraft. A cart with this tax mode can only be ordered if all
   * line items, all custom line items and the shipping method have an external tax rate set. The totalNet and
   * totalGross as well as the taxPortions fields are calculated by the platform according to the taxRoundingMode.
   */
  External = 'External',
  /**
   * The tax amounts and the tax rates as well as the tax portions are set externally per ExternalTaxAmountDraft.
   * A cart with this tax mode can only be ordered if the cart itself and all line items, all custom line items and
   * the shipping method have an external tax amount and rate set
   */
  ExternalAmount = 'ExternalAmount',
  /**
   * The tax rates are selected by the platform from the TaxCategories based on the cart shipping address.
   * The totalNet and totalGross as well as the taxPortions fields are calculated by the platform according to the
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
  name: Maybe<Scalars['String']>;
  rate: Scalars['Float'];
};

export type TTaxPortionDraft = {
  amount: TMoneyInput;
  name: Maybe<Scalars['String']>;
  rate: Scalars['Float'];
};

export type TTaxRate = {
  __typename?: 'TaxRate';
  amount: Scalars['Float'];
  country: Scalars['Country'];
  id: Maybe<Scalars['String']>;
  includedInPrice: Scalars['Boolean'];
  name: Scalars['String'];
  state: Maybe<Scalars['String']>;
  subRates: Array<TSubRate>;
};

export type TTaxRateDraft = {
  amount: Maybe<Scalars['Float']>;
  country: Scalars['Country'];
  includedInPrice: Scalars['Boolean'];
  name: Scalars['String'];
  state: Maybe<Scalars['String']>;
  subRates: Maybe<Array<TSubRateDraft>>;
};

export type TTaxedItemPrice = {
  __typename?: 'TaxedItemPrice';
  totalGross: TMoney;
  totalNet: TMoney;
};

export type TTaxedPrice = {
  __typename?: 'TaxedPrice';
  taxPortions: Array<TTaxPortion>;
  totalGross: TMoney;
  totalNet: TMoney;
};

export type TTermCount = {
  __typename?: 'TermCount';
  count: Scalars['Int'];
  productCount: Maybe<Scalars['Int']>;
  term: Scalars['String'];
};

export type TTermsFacetInput = {
  alias: Maybe<Scalars['String']>;
  countProducts: Scalars['Boolean'];
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
  custom: Maybe<TCustomFieldsType>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  id: Scalars['String'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  quantity: Scalars['Int'];
};


export type TTextLineItem_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


export type TTextLineItem_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TTextLineItemDraft = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  name: Array<TLocalizedStringItemInputType>;
  quantity: Maybe<Scalars['Int']>;
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
  carrier: Maybe<Scalars['String']>;
  isReturn: Scalars['Boolean'];
  provider: Maybe<Scalars['String']>;
  providerTransaction: Maybe<Scalars['String']>;
  trackingId: Maybe<Scalars['String']>;
};

export type TTrackingDataDraftType = {
  carrier: Maybe<Scalars['String']>;
  isReturn: Maybe<Scalars['Boolean']>;
  provider: Maybe<Scalars['String']>;
  providerTransaction: Maybe<Scalars['String']>;
  trackingId: Maybe<Scalars['String']>;
};

export type TTransaction = {
  __typename?: 'Transaction';
  amount: TMoney;
  id: Scalars['String'];
  interactionId: Maybe<Scalars['String']>;
  state: TTransactionState;
  timestamp: Maybe<Scalars['DateTime']>;
  type: Maybe<TTransactionType>;
};

export type TTransactionDraft = {
  amount: TMoneyInput;
  interactionId: Maybe<Scalars['String']>;
  state: Maybe<TTransactionState>;
  timestamp: Maybe<Scalars['DateTime']>;
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
  actualTransitionDate: Maybe<Scalars['DateTime']>;
  customLineItemId: Scalars['String'];
  fromState: TResourceIdentifierInput;
  quantity: Scalars['Long'];
  toState: TResourceIdentifierInput;
};

export type TTransitionOrderLineItemState = {
  actualTransitionDate: Maybe<Scalars['DateTime']>;
  fromState: TResourceIdentifierInput;
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  toState: TResourceIdentifierInput;
};

export type TTransitionOrderState = {
  force: Maybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionPaymentState = {
  force: Maybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionProductState = {
  force: Maybe<Scalars['Boolean']>;
  state: TReferenceInput;
};

export type TTransitionReviewState = {
  force: Maybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionStagedOrderCustomLineItemState = {
  actualTransitionDate: Maybe<Scalars['DateTime']>;
  customLineItemId: Scalars['String'];
  fromState: TResourceIdentifierInput;
  quantity: Scalars['Long'];
  toState: TResourceIdentifierInput;
};

export type TTransitionStagedOrderCustomLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'TransitionStagedOrderCustomLineItemStateOutput';
  actualTransitionDate: Maybe<Scalars['DateTime']>;
  customLineItemId: Scalars['String'];
  fromStateResId: TResourceIdentifier;
  quantity: Scalars['Long'];
  toStateResId: TResourceIdentifier;
  type: Scalars['String'];
};

export type TTransitionStagedOrderLineItemState = {
  actualTransitionDate: Maybe<Scalars['DateTime']>;
  fromState: TResourceIdentifierInput;
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  toState: TResourceIdentifierInput;
};

export type TTransitionStagedOrderLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'TransitionStagedOrderLineItemStateOutput';
  actualTransitionDate: Maybe<Scalars['DateTime']>;
  fromStateResId: TResourceIdentifier;
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  toStateResId: TResourceIdentifier;
  type: Scalars['String'];
};

export type TTransitionStagedOrderState = {
  force: Maybe<Scalars['Boolean']>;
  state: TResourceIdentifierInput;
};

export type TTransitionStagedOrderStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'TransitionStagedOrderStateOutput';
  force: Scalars['Boolean'];
  stateResId: TResourceIdentifier;
  type: Scalars['String'];
};

export type TTreeFacetInput = {
  alias: Maybe<Scalars['String']>;
  countProducts: Scalars['Boolean'];
  path: Scalars['String'];
  rootValues: Array<Scalars['String']>;
  subTreeValues: Array<Scalars['String']>;
};

export type TTreeFilterInput = {
  path: Scalars['String'];
  rootValues: Array<Scalars['String']>;
  subTreeValues: Array<Scalars['String']>;
};

export type TTrigger = {
  __typename?: 'Trigger';
  actions: Array<TActionType>;
  resourceTypeId: Scalars['String'];
};

export type TTriggerInput = {
  actions: Maybe<Array<TActionType>>;
  resourceTypeId: Scalars['String'];
};

/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition = TVersioned & {
  __typename?: 'TypeDefinition';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  fieldDefinitions: Array<TFieldDefinition>;
  id: Scalars['String'];
  key: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  resourceTypeIds: Array<Scalars['String']>;
  version: Scalars['Long'];
};


/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition_DescriptionArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};


/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition_FieldDefinitionsArgs = {
  excludeNames: Maybe<Array<Scalars['String']>>;
  includeNames: Maybe<Array<Scalars['String']>>;
};


/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition_NameArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TTypeDefinitionDraft = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  fieldDefinitions: Maybe<Array<TFieldDefinitionInput>>;
  key: Scalars['String'];
  name: Array<TLocalizedStringItemInputType>;
  resourceTypeIds: Array<Scalars['String']>;
};

export type TTypeDefinitionQueryResult = {
  __typename?: 'TypeDefinitionQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TTypeDefinition>;
  total: Scalars['Long'];
};

export type TTypeUpdateAction = {
  addEnumValue: Maybe<TAddTypeEnumValue>;
  addFieldDefinition: Maybe<TAddTypeFieldDefinition>;
  addLocalizedEnumValue: Maybe<TAddTypeLocalizedEnumValue>;
  changeEnumValueLabel: Maybe<TChangeTypeEnumValueLabel>;
  changeEnumValueOrder: Maybe<TChangeTypeEnumValueOrder>;
  changeFieldDefinitionOrder: Maybe<TChangeTypeFieldDefinitionOrder>;
  changeInputHint: Maybe<TChangeTypeInputHint>;
  changeKey: Maybe<TChangeTypeKey>;
  changeLabel: Maybe<TChangeTypeLabel>;
  changeLocalizedEnumValueLabel: Maybe<TChangeTypeLocalizedEnumValueLabel>;
  changeLocalizedEnumValueOrder: Maybe<TChangeTypeLocalizedEnumValueOrder>;
  changeName: Maybe<TChangeTypeName>;
  removeFieldDefinition: Maybe<TRemoveTypeFieldDefinition>;
  setDescription: Maybe<TSetTypeDescription>;
};

export type TUnpublishProduct = {
  dummy: Maybe<Scalars['String']>;
};

export type TUpdateCartItemShippingAddress = {
  address: TAddressInput;
};

export type TUpdateOrderItemShippingAddress = {
  address: TAddressInput;
};

export type TUpdateOrderSyncInfo = {
  channel: TResourceIdentifierInput;
  externalId: Maybe<Scalars['String']>;
  syncedAt: Maybe<Scalars['DateTime']>;
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
  externalId: Maybe<Scalars['String']>;
  syncedAt: Maybe<Scalars['DateTime']>;
};

export type TUpdateStagedOrderSyncInfoOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'UpdateStagedOrderSyncInfoOutput';
  channelResId: TChannelReferenceIdentifier;
  externalId: Maybe<Scalars['String']>;
  syncedAt: Maybe<Scalars['DateTime']>;
  type: Scalars['String'];
};

export type TUserProvidedIdentifiers = {
  __typename?: 'UserProvidedIdentifiers';
  customerNumber: Maybe<Scalars['String']>;
  externalId: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Maybe<Array<TLocalizedString>>;
};


export type TUserProvidedIdentifiers_SlugArgs = {
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
  locale: Maybe<Scalars['Locale']>;
};

export type TValueCountFacetInput = {
  alias: Maybe<Scalars['String']>;
  path: Scalars['String'];
};

export type TValueFacetInput = {
  alias: Maybe<Scalars['String']>;
  countProducts: Scalars['Boolean'];
  path: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type TValueFacetResult = TFacetResult & {
  __typename?: 'ValueFacetResult';
  count: Scalars['Int'];
  productCount: Maybe<Scalars['Int']>;
  type: Scalars['String'];
};

export type TValueFilterInput = {
  path: Scalars['String'];
  values: Array<Scalars['String']>;
};

/** Versioned object have an ID and version and modification. Every update of this object changes it's version. */
export type TVersioned = {
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  id: Scalars['String'];
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  version: Scalars['Long'];
};

export type TWhitespaceSuggestTokenizer = TSuggestTokenizer & {
  __typename?: 'WhitespaceSuggestTokenizer';
  type: Scalars['String'];
};

export type TWhitespaceSuggestTokenizerInput = {
  dummy: Maybe<Scalars['String']>;
};

export type TWhitespaceSuggestTokenizerProductSearch = TSuggestTokenizerProductSearch & {
  __typename?: 'WhitespaceSuggestTokenizerProductSearch';
  type: Scalars['String'];
};

/** Zones allow defining ShippingRates for specific Locations. */
export type TZone = TVersioned & {
  __typename?: 'Zone';
  createdAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  description: Maybe<Scalars['String']>;
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
  locations: Array<TLocation>;
  name: Scalars['String'];
  version: Scalars['Long'];
};

export type TZoneLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ZoneLimitWithCurrent';
  current: Scalars['Long'];
  limit: Maybe<Scalars['Long']>;
};

export type TZoneLimitsProjection = {
  __typename?: 'ZoneLimitsProjection';
  total: TZoneLimitWithCurrent;
};

export type TZoneLocation = {
  country: Scalars['Country'];
  state: Maybe<Scalars['String']>;
};

export type TZoneQueryResult = {
  __typename?: 'ZoneQueryResult';
  count: Scalars['Int'];
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  exists: Scalars['Boolean'];
  offset: Scalars['Int'];
  results: Array<TZone>;
  total: Scalars['Long'];
};

export type TZoneRate = {
  __typename?: 'ZoneRate';
  shippingRates: Array<TShippingRate>;
  zone: Maybe<TZone>;
  zoneRef: Maybe<TReference>;
};

export type TZoneRateDraft = {
  shippingRates: Maybe<Array<TShippingRateDraft>>;
  zone: TResourceIdentifierInput;
};

export type TZoneUpdateAction = {
  addLocation: Maybe<TAddZoneLocation>;
  changeName: Maybe<TChangeZoneName>;
  removeLocation: Maybe<TRemoveZoneLocation>;
  setDescription: Maybe<TSetZoneDescription>;
  setKey: Maybe<TSetZoneKey>;
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
  inputTip: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetKey = {
  key: Maybe<Scalars['String']>;
};

export type TFetchChannelsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  sort: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type TFetchChannelsQuery = { __typename?: 'Query', channels: { __typename?: 'ChannelQueryResult', total: number, count: number, offset: number, results: Array<{ __typename?: 'Channel', id: string, key: string, roles: Array<TChannelRole>, nameAllLocales: Maybe<Array<{ __typename?: 'LocalizedString', locale: string, value: string }>> }> } };

export type TQuickAccessProductQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type TQuickAccessProductQuery = { __typename?: 'Query', product: Maybe<{ __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged: Maybe<{ __typename?: 'ProductData', allVariants: Array<{ __typename?: 'ProductVariant', id: number, key: Maybe<string>, sku: Maybe<string> }> }> } }> };

export type TQuickAccessQueryVariables = Exact<{
  searchText: Scalars['String'];
  canViewProducts: Scalars['Boolean'];
  productsWhereClause: Maybe<Scalars['String']>;
  includeProductsByIds: Scalars['Boolean'];
}>;


export type TQuickAccessQuery = { __typename?: 'Query', productsByIds: Maybe<{ __typename?: 'ProductQueryResult', results: Array<{ __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged: Maybe<{ __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }> }> } }> }>, productById: Maybe<{ __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged: Maybe<{ __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }> }> } }>, productByKey: Maybe<{ __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged: Maybe<{ __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }> }> } }>, productByVariantSku: Maybe<{ __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged: Maybe<{ __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }>, variant: Maybe<{ __typename?: 'ProductVariant', sku: Maybe<string>, key: Maybe<string>, id: number }> }> } }>, productByVariantKey: Maybe<{ __typename?: 'Product', id: string, masterData: { __typename?: 'ProductCatalogData', staged: Maybe<{ __typename?: 'ProductData', nameAllLocales: Array<{ __typename?: 'LocalizedString', locale: string, value: string }>, variant: Maybe<{ __typename?: 'ProductVariant', sku: Maybe<string>, key: Maybe<string>, id: number }> }> } }> };

export type TFetchStateQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type TFetchStateQuery = { __typename?: 'Query', state: Maybe<{ __typename?: 'State', id: string, key: Maybe<string>, type: TStateType, initial: boolean, builtIn: boolean, nameAllLocales: Maybe<Array<{ __typename?: 'LocalizedString', locale: string, value: string }>> }> };

export type TFetchStatesQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  sort: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type TFetchStatesQuery = { __typename?: 'Query', states: { __typename?: 'StateQueryResult', total: number, count: number, offset: number, results: Array<{ __typename?: 'State', id: string, key: Maybe<string>, nameAllLocales: Maybe<Array<{ __typename?: 'LocalizedString', locale: string, value: string }>> }> } };
