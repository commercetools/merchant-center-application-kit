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
  id: Scalars['String'];
  name: Scalars['String'];
  scope: Scalars['String'];
  createdAt: Maybe<Scalars['DateTime']>;
  lastUsedAt: Maybe<Scalars['Date']>;
  secret: Scalars['String'];
};

/** API Clients can be used to obtain OAuth 2 access tokens */
export type TApiClientWithoutSecret = {
  __typename?: 'APIClientWithoutSecret';
  id: Scalars['String'];
  name: Scalars['String'];
  scope: Scalars['String'];
  createdAt: Maybe<Scalars['DateTime']>;
  lastUsedAt: Maybe<Scalars['Date']>;
};

export type TApiClientWithoutSecretQueryResult = {
  __typename?: 'APIClientWithoutSecretQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TApiClientWithoutSecret>;
};

export type TAwsLambdaDestination = TExtensionDestination & {
  __typename?: 'AWSLambdaDestination';
  arn: Scalars['String'];
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
  type: Scalars['String'];
};

export type TAwsLambdaDestinationInput = {
  arn: Scalars['String'];
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
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
  Update = 'Update',
  Create = 'Create'
}

/** A field to access the active cart. */
export type TActiveCartInterface = {
  activeCart: Maybe<TCart>;
};

export type TAddCartCustomLineItem = {
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  custom: Maybe<TCustomFieldsDraft>;
  quantity: Maybe<Scalars['Long']>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  taxCategory: Maybe<TResourceIdentifierInput>;
  slug: Scalars['String'];
  money: TBaseMoneyInput;
  name: Array<TLocalizedStringItemInputType>;
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
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  custom: Maybe<TCustomFieldsDraft>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  variantId: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['Long']>;
  sku: Maybe<Scalars['String']>;
  productId: Maybe<Scalars['String']>;
};

export type TAddCartPayment = {
  payment: TResourceIdentifierInput;
};

export type TAddCartShoppingList = {
  shoppingList: TResourceIdentifierInput;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
};

export type TAddCategoryAsset = {
  position: Maybe<Scalars['Int']>;
  asset: TAssetDraftInput;
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
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  custom: Maybe<TCustomFieldsDraft>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  variantId: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['Long']>;
  sku: Maybe<Scalars['String']>;
  productId: Maybe<Scalars['String']>;
};

export type TAddMyPaymentTransaction = {
  transaction: TMyTransactionDraft;
};

export type TAddOrderDelivery = {
  items: Maybe<Array<TDeliveryItemDraftType>>;
  parcels: Maybe<Array<TParcelDataDraftType>>;
  address: Maybe<TAddressInput>;
};

export type TAddOrderEditStagedAction = {
  stagedAction: TStagedOrderUpdateAction;
};

export type TAddOrderItemShippingAddress = {
  address: TAddressInput;
};

export type TAddOrderParcelToDelivery = {
  deliveryId: Scalars['String'];
  measurements: Maybe<TParcelMeasurementsDraftType>;
  trackingData: Maybe<TTrackingDataDraftType>;
  items: Maybe<Array<TDeliveryItemDraftType>>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TAddPaymentTransaction = {
  transaction: TTransactionDraft;
};

export type TAddProductAsset = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  position: Maybe<Scalars['Int']>;
  asset: TAssetDraftInput;
};

export type TAddProductExternalImage = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  image: TImageInput;
  staged: Maybe<Scalars['Boolean']>;
};

export type TAddProductPrice = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  price: TProductPriceDataInput;
  staged: Maybe<Scalars['Boolean']>;
};

export type TAddProductSelectionProduct = {
  product: TResourceIdentifierInput;
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
  prices: Maybe<Array<TProductPriceDataInput>>;
  key: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TAddShippingMethodShippingRate = {
  zone: TResourceIdentifierInput;
  shippingRate: TShippingRateDraft;
};

export type TAddShippingMethodZone = {
  zone: TResourceIdentifierInput;
};

export type TAddShoppingListLineItem = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  quantity: Maybe<Scalars['Int']>;
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  productId: Maybe<Scalars['String']>;
};

export type TAddShoppingListTextLineItem = {
  addedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsDraft>;
  quantity: Maybe<Scalars['Int']>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  name: Array<TLocalizedStringItemInputType>;
};

export type TAddStagedOrderCustomLineItem = {
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
  custom: Maybe<TCustomFieldsDraft>;
  quantity: Maybe<Scalars['Long']>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  taxCategory: Maybe<TResourceIdentifierInput>;
  slug: Scalars['String'];
  money: TBaseMoneyInput;
  name: Array<TLocalizedStringItemInputType>;
};

export type TAddStagedOrderCustomLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderCustomLineItemOutput';
  type: Scalars['String'];
  draft: TCustomLineItemDraftOutput;
};

export type TAddStagedOrderDelivery = {
  items: Maybe<Array<TDeliveryItemDraftType>>;
  parcels: Maybe<Array<TParcelDataDraftType>>;
  address: Maybe<TAddressInput>;
};

export type TAddStagedOrderDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderDeliveryOutput';
  type: Scalars['String'];
  items: Array<TDeliveryItem>;
  parcels: Array<TParcelData>;
  address: Maybe<TAddressDraft>;
};

export type TAddStagedOrderDiscountCode = {
  code: Scalars['String'];
  validateDuplicates: Maybe<Scalars['Boolean']>;
};

export type TAddStagedOrderDiscountCodeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderDiscountCodeOutput';
  type: Scalars['String'];
  code: Scalars['String'];
  validateDuplicates: Scalars['Boolean'];
};

export type TAddStagedOrderItemShippingAddress = {
  address: TAddressInput;
};

export type TAddStagedOrderItemShippingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderItemShippingAddressOutput';
  type: Scalars['String'];
  address: TAddressDraft;
};

export type TAddStagedOrderLineItem = {
  addedAt: Maybe<Scalars['DateTime']>;
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  custom: Maybe<TCustomFieldsDraft>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  variantId: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['Long']>;
  sku: Maybe<Scalars['String']>;
  productId: Maybe<Scalars['String']>;
};

export type TAddStagedOrderLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderLineItemOutput';
  type: Scalars['String'];
  draft: TLineItemDraftOutput;
};

export type TAddStagedOrderParcelToDelivery = {
  deliveryId: Scalars['String'];
  measurements: Maybe<TParcelMeasurementsDraftType>;
  trackingData: Maybe<TTrackingDataDraftType>;
  items: Maybe<Array<TDeliveryItemDraftType>>;
};

export type TAddStagedOrderParcelToDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderParcelToDeliveryOutput';
  type: Scalars['String'];
  deliveryId: Scalars['String'];
  measurements: Maybe<TParcelMeasurements>;
  trackingData: Maybe<TTrackingData>;
  items: Array<TDeliveryItem>;
};

export type TAddStagedOrderPayment = {
  payment: TResourceIdentifierInput;
};

export type TAddStagedOrderPaymentOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderPaymentOutput';
  type: Scalars['String'];
  paymentResId: TResourceIdentifier;
};

export type TAddStagedOrderReturnInfo = {
  items: Array<TReturnItemDraftType>;
  returnDate: Maybe<Scalars['DateTime']>;
  returnTrackingId: Maybe<Scalars['String']>;
};

export type TAddStagedOrderReturnInfoOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderReturnInfoOutput';
  type: Scalars['String'];
  items: Array<TReturnItemDraftTypeOutput>;
  returnDate: Maybe<Scalars['DateTime']>;
  returnTrackingId: Maybe<Scalars['String']>;
};

export type TAddStagedOrderShoppingList = {
  shoppingList: TResourceIdentifierInput;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
};

export type TAddStagedOrderShoppingListOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'AddStagedOrderShoppingListOutput';
  type: Scalars['String'];
  shoppingListResId: TResourceIdentifier;
  supplyChannelResId: Maybe<TChannelReferenceIdentifier>;
  distributionChannelResId: Maybe<TChannelReferenceIdentifier>;
};

export type TAddStateRoles = {
  roles: Array<TStateRole>;
};

export type TAddStoreDistributionChannel = {
  distributionChannel: TResourceIdentifierInput;
};

export type TAddStoreProductSelection = {
  productSelection: TResourceIdentifierInput;
  active: Maybe<Scalars['Boolean']>;
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
  id: Maybe<Scalars['String']>;
  streetName: Maybe<Scalars['String']>;
  streetNumber: Maybe<Scalars['String']>;
  additionalStreetInfo: Maybe<Scalars['String']>;
  postalCode: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  region: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  country: Scalars['Country'];
  company: Maybe<Scalars['String']>;
  department: Maybe<Scalars['String']>;
  building: Maybe<Scalars['String']>;
  apartment: Maybe<Scalars['String']>;
  pOBox: Maybe<Scalars['String']>;
  additionalAddressInfo: Maybe<Scalars['String']>;
  externalId: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  /** @deprecated This field has been removed and will return a HTTP code 400 with X-DEPRECATION-NOTICE when used. Field 'contactInfo' is deprecated. Instead of using e.g. 'contactInfo.email' use 'email' directly. */
  contactInfo: Maybe<TAddressContactInfo>;
  phone: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  fax: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  salutation: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsType>;
};

export type TAddressContactInfo = {
  __typename?: 'AddressContactInfo';
  phone: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  fax: Maybe<Scalars['String']>;
};

export type TAddressDraft = {
  __typename?: 'AddressDraft';
  id: Maybe<Scalars['String']>;
  streetName: Maybe<Scalars['String']>;
  streetNumber: Maybe<Scalars['String']>;
  additionalStreetInfo: Maybe<Scalars['String']>;
  postalCode: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  region: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  country: Scalars['Country'];
  company: Maybe<Scalars['String']>;
  department: Maybe<Scalars['String']>;
  building: Maybe<Scalars['String']>;
  apartment: Maybe<Scalars['String']>;
  pOBox: Maybe<Scalars['String']>;
  additionalAddressInfo: Maybe<Scalars['String']>;
  externalId: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsCommand>;
  phone: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  fax: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  salutation: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
};

export type TAddressInput = {
  id: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  salutation: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  streetName: Maybe<Scalars['String']>;
  streetNumber: Maybe<Scalars['String']>;
  additionalStreetInfo: Maybe<Scalars['String']>;
  postalCode: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  region: Maybe<Scalars['String']>;
  state: Maybe<Scalars['String']>;
  country: Scalars['Country'];
  company: Maybe<Scalars['String']>;
  department: Maybe<Scalars['String']>;
  building: Maybe<Scalars['String']>;
  apartment: Maybe<Scalars['String']>;
  pOBox: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  mobile: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  fax: Maybe<Scalars['String']>;
  additionalAddressInfo: Maybe<Scalars['String']>;
  externalId: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
};

export enum TAnonymousCartSignInMode {
  /** The anonymous cart is used as new active customer cart. No `LineItem`s get merged. */
  UseAsNewActiveCustomerCart = 'UseAsNewActiveCustomerCart',
  /**
   * `LineItem`s of the anonymous cart will be copied to the customer’s active cart that has been modified most recently.
   *
   * The `CartState` of the anonymous cart gets changed to `Merged` while the `CartState` of the customer’s cart remains `Active`.
   *
   * `CustomLineItems` and `CustomFields` of the anonymous cart will not be copied to the customers cart.
   *
   * If a `LineItem` in the anonymous cart matches an existing line item in the customer’s cart (same product ID and variant ID), the maximum quantity of both LineItems is used as the new quantity. In that case `CustomFields` on the `LineItem` of the anonymous cart will not be in the resulting `LineItem`.
   */
  MergeWithExistingCustomerCart = 'MergeWithExistingCustomerCart'
}

export type TApplied = TOrderEditResult & {
  __typename?: 'Applied';
  appliedAt: Scalars['DateTime'];
  excerptBeforeEdit: TOrderExcerpt;
  excerptAfterEdit: TOrderExcerpt;
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
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  sources: Array<TAssetSource>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  tags: Array<Scalars['String']>;
  custom: Maybe<TCustomFieldsType>;
};


export type TAsset_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TAsset_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TAssetDimensions = {
  __typename?: 'AssetDimensions';
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type TAssetDimensionsInput = {
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type TAssetDraftInput = {
  key: Maybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  custom: Maybe<TCustomFieldsDraft>;
  sources: Maybe<Array<TAssetSourceInput>>;
  tags: Maybe<Array<Scalars['String']>>;
  type: Maybe<TResourceIdentifierInput>;
};

export type TAssetSource = {
  __typename?: 'AssetSource';
  uri: Scalars['String'];
  key: Maybe<Scalars['String']>;
  dimensions: Maybe<TAssetDimensions>;
  contentType: Maybe<Scalars['String']>;
};

export type TAssetSourceInput = {
  uri: Scalars['String'];
  key: Maybe<Scalars['String']>;
  dimensions: Maybe<TAssetDimensionsInput>;
  contentType: Maybe<Scalars['String']>;
};

export type TAttribute = {
  name: Scalars['String'];
};

export enum TAttributeConstraint {
  /** No constraints are applied to the attribute */
  None = 'None',
  /** Attribute value should be different in each variant */
  Unique = 'Unique',
  /** A set of attributes, that have this constraint, should have different combinations in each variant */
  CombinationUnique = 'CombinationUnique',
  /** Attribute value should be the same in all variants */
  SameForAll = 'SameForAll'
}

export type TAttributeDefinition = {
  __typename?: 'AttributeDefinition';
  type: TAttributeDefinitionType;
  name: Scalars['String'];
  label: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  attributeConstraint: TAttributeConstraint;
  inputTip: Maybe<Scalars['String']>;
  inputHint: TTextInputHint;
  isSearchable: Scalars['Boolean'];
  labelAllLocales: Array<TLocalizedString>;
  inputTipAllLocales: Maybe<Array<TLocalizedString>>;
};


export type TAttributeDefinition_LabelArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TAttributeDefinition_InputTipArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TAttributeDefinitionDraft = {
  type: TAttributeTypeDraft;
  name: Scalars['String'];
  label: Array<TLocalizedStringItemInputType>;
  isRequired: Scalars['Boolean'];
  attributeConstraint: Maybe<TAttributeConstraint>;
  inputTip: Maybe<Array<TLocalizedStringItemInputType>>;
  inputHint: Maybe<TTextInputHint>;
  isSearchable: Scalars['Boolean'];
};

export type TAttributeDefinitionResult = {
  __typename?: 'AttributeDefinitionResult';
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
  results: Array<TAttributeDefinition>;
};

/** (https://docs.commercetools.com/api/projects/productTypes#attributetype)[https://docs.commercetools.com/api/projects/productTypes#attributetype] */
export type TAttributeDefinitionType = {
  name: Scalars['String'];
};

export type TAttributeSetElementTypeDraft = {
  text: Maybe<TSimpleAttributeTypeDraft>;
  number: Maybe<TSimpleAttributeTypeDraft>;
  money: Maybe<TSimpleAttributeTypeDraft>;
  date: Maybe<TSimpleAttributeTypeDraft>;
  time: Maybe<TSimpleAttributeTypeDraft>;
  datetime: Maybe<TSimpleAttributeTypeDraft>;
  boolean: Maybe<TSimpleAttributeTypeDraft>;
  reference: Maybe<TReferenceTypeDefinitionDraft>;
  enum: Maybe<TEnumTypeDraft>;
  lenum: Maybe<TLocalizableEnumTypeDraft>;
  ltext: Maybe<TSimpleAttributeTypeDraft>;
};

export type TAttributeSetTypeDraft = {
  elementType: TAttributeSetElementTypeDraft;
};

export type TAttributeTypeDraft = {
  set: Maybe<TAttributeSetTypeDraft>;
  text: Maybe<TSimpleAttributeTypeDraft>;
  number: Maybe<TSimpleAttributeTypeDraft>;
  money: Maybe<TSimpleAttributeTypeDraft>;
  date: Maybe<TSimpleAttributeTypeDraft>;
  time: Maybe<TSimpleAttributeTypeDraft>;
  datetime: Maybe<TSimpleAttributeTypeDraft>;
  boolean: Maybe<TSimpleAttributeTypeDraft>;
  reference: Maybe<TReferenceTypeDefinitionDraft>;
  enum: Maybe<TEnumTypeDraft>;
  lenum: Maybe<TLocalizableEnumTypeDraft>;
  ltext: Maybe<TSimpleAttributeTypeDraft>;
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
  type: Scalars['String'];
  currencyCode: Scalars['Currency'];
  centAmount: Scalars['Long'];
  fractionDigits: Scalars['Int'];
};

export type TBaseMoneyInput = {
  centPrecision: Maybe<TMoneyInput>;
  highPrecision: Maybe<THighPrecisionMoneyInput>;
};

export type TBaseSearchKeywordInput = {
  whitespace: Maybe<TWhitespaceSuggestTokenizerInput>;
  custom: Maybe<TCustomSuggestTokenizerInput>;
};


export type TBooleanAttribute = TAttribute & {
  __typename?: 'BooleanAttribute';
  value: Scalars['Boolean'];
  name: Scalars['String'];
};

export type TBooleanAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'BooleanAttributeDefinitionType';
  name: Scalars['String'];
};

export type TBooleanField = TCustomField & {
  __typename?: 'BooleanField';
  value: Scalars['Boolean'];
  name: Scalars['String'];
};

export type TBooleanType = TFieldType & {
  __typename?: 'BooleanType';
  name: Scalars['String'];
};

/** A shopping cart holds product variants and can be ordered. Each cart either belongs to a registered customer or is an anonymous cart. */
export type TCart = TVersioned & {
  __typename?: 'Cart';
  customerId: Maybe<Scalars['String']>;
  customer: Maybe<TCustomer>;
  customerEmail: Maybe<Scalars['String']>;
  anonymousId: Maybe<Scalars['String']>;
  lineItems: Array<TLineItem>;
  customLineItems: Array<TCustomLineItem>;
  totalPrice: TMoney;
  taxedPrice: Maybe<TTaxedPrice>;
  shippingAddress: Maybe<TAddress>;
  billingAddress: Maybe<TAddress>;
  inventoryMode: TInventoryMode;
  taxMode: TTaxMode;
  taxRoundingMode: TRoundingMode;
  taxCalculationMode: TTaxCalculationMode;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  country: Maybe<Scalars['Country']>;
  shippingInfo: Maybe<TShippingInfo>;
  discountCodes: Array<TDiscountCodeInfo>;
  refusedGifts: Array<TCartDiscount>;
  refusedGiftsRefs: Array<TReference>;
  paymentInfo: Maybe<TPaymentInfo>;
  locale: Maybe<Scalars['Locale']>;
  shippingRateInput: Maybe<TShippingRateInput>;
  origin: TCartOrigin;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  storeRef: Maybe<TKeyReference>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  store: Maybe<TStore>;
  itemShippingAddresses: Array<TAddress>;
  cartState: TCartState;
  key: Maybe<Scalars['String']>;
  /**
   * This field contains non-typed data. Consider using `customFields` as a typed alternative.
   * @deprecated This field has been removed and will return a HTTP code 400 with X-DEPRECATION-NOTICE when used. Please use 'custom.customFieldsRaw'
   */
  customFieldsRaw: Maybe<Array<TRawCustomField>>;
  custom: Maybe<TCustomFieldsType>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


/** A shopping cart holds product variants and can be ordered. Each cart either belongs to a registered customer or is an anonymous cart. */
export type TCart_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>;
  excludeNames: Maybe<Array<Scalars['String']>>;
};

export type TCartClassificationInput = {
  values: Array<TLocalizedEnumValueInput>;
};

export type TCartClassificationType = TShippingRateInputType & {
  __typename?: 'CartClassificationType';
  values: Array<TShippingRateInputLocalizedEnumValue>;
  type: Scalars['String'];
};

export type TCartCreated = TMessagePayload & {
  __typename?: 'CartCreated';
  totalPrice: TMoney;
  lineItemCount: Scalars['Int'];
  discountCodesRefs: Array<TReference>;
  type: Scalars['String'];
};

/**
 * Cart discounts are recalculated every time LineItems or CustomLineItems are added or removed from the Cart or an order is created from the cart.
 *
 * The number of active cart discounts that do not require a discount code (isActive=true and requiresDiscountCode=false) is limited to 100.
 */
export type TCartDiscount = TVersioned & {
  __typename?: 'CartDiscount';
  cartPredicate: Scalars['String'];
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  stackingMode: TStackingMode;
  isActive: Scalars['Boolean'];
  requiresDiscountCode: Scalars['Boolean'];
  sortOrder: Scalars['String'];
  key: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  referenceRefs: Array<TReference>;
  /**
   * This field would contain type data
   * @deprecated This field has been removed and will return a HTTP code 400 with X-DEPRECATION-NOTICE when used. Please use 'custom.customFieldsRaw'
   */
  customFields: Maybe<TType>;
  custom: Maybe<TCustomFieldsType>;
  value: TCartDiscountValue;
  target: Maybe<TCartDiscountTarget>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


/**
 * Cart discounts are recalculated every time LineItems or CustomLineItems are added or removed from the Cart or an order is created from the cart.
 *
 * The number of active cart discounts that do not require a discount code (isActive=true and requiresDiscountCode=false) is limited to 100.
 */
export type TCartDiscount_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


/**
 * Cart discounts are recalculated every time LineItems or CustomLineItems are added or removed from the Cart or an order is created from the cart.
 *
 * The number of active cart discounts that do not require a discount code (isActive=true and requiresDiscountCode=false) is limited to 100.
 */
export type TCartDiscount_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TCartDiscountDraft = {
  value: TCartDiscountValueInput;
  cartPredicate: Scalars['String'];
  target: Maybe<TCartDiscountTargetInput>;
  sortOrder: Scalars['String'];
  name: Array<TLocalizedStringItemInputType>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  stackingMode: Maybe<TStackingMode>;
  requiresDiscountCode: Maybe<Scalars['Boolean']>;
  isActive: Maybe<Scalars['Boolean']>;
  custom: Maybe<TCustomFieldsDraft>;
  key: Maybe<Scalars['String']>;
};

export type TCartDiscountLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CartDiscountLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TCartDiscountLimitsProjection = {
  __typename?: 'CartDiscountLimitsProjection';
  totalActiveWithoutDiscountCodes: TCartDiscountLimitWithCurrent;
};

export type TCartDiscountQueryResult = {
  __typename?: 'CartDiscountQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TCartDiscount>;
};

export type TCartDiscountTarget = {
  type: Scalars['String'];
};

export type TCartDiscountTargetInput = {
  lineItems: Maybe<TLineItemsTargetInput>;
  customLineItems: Maybe<TCustomLineItemsTargetInput>;
  shipping: Maybe<TShippingTargetInput>;
  multiBuyLineItems: Maybe<TMultiBuyLineItemsTargetInput>;
  multiBuyCustomLineItems: Maybe<TMultiBuyCustomLineItemsTargetInput>;
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
  relative: Maybe<TRelativeDiscountValueInput>;
  absolute: Maybe<TAbsoluteDiscountValueInput>;
  fixed: Maybe<TFixedPriceDiscountValueInput>;
  giftLineItem: Maybe<TGiftLineItemValueInput>;
};

export type TCartDraft = {
  currency: Scalars['Currency'];
  country: Maybe<Scalars['Country']>;
  inventoryMode: Maybe<TInventoryMode>;
  custom: Maybe<TCustomFieldsDraft>;
  customerEmail: Maybe<Scalars['String']>;
  shippingAddress: Maybe<TAddressInput>;
  billingAddress: Maybe<TAddressInput>;
  shippingMethod: Maybe<TResourceIdentifierInput>;
  taxMode: Maybe<TTaxMode>;
  locale: Maybe<Scalars['Locale']>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  itemShippingAddresses: Maybe<Array<TAddressInput>>;
  discountCodes: Maybe<Array<Scalars['String']>>;
  store: Maybe<TResourceIdentifierInput>;
  key: Maybe<Scalars['String']>;
  lineItems: Maybe<Array<TLineItemDraft>>;
  customLineItems: Maybe<Array<TCustomLineItemDraft>>;
  customerId: Maybe<Scalars['String']>;
  externalTaxRateForShippingMethod: Maybe<TExternalTaxRateDraft>;
  anonymousId: Maybe<Scalars['String']>;
  taxRoundingMode: Maybe<TRoundingMode>;
  taxCalculationMode: Maybe<TTaxCalculationMode>;
  customerGroup: Maybe<TResourceIdentifierInput>;
  shippingRateInput: Maybe<TShippingRateInputDraft>;
  origin: Maybe<TCartOrigin>;
};

export type TCartLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CartLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TCartLimitsProjection = {
  __typename?: 'CartLimitsProjection';
  total: TCartLimitWithCurrent;
};

export enum TCartOrigin {
  /** The cart was created by the merchant on behalf of the customer */
  Merchant = 'Merchant',
  /** The cart was created by the customer. This is the default value */
  Customer = 'Customer'
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
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TCartQueryResult = {
  __typename?: 'CartQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TCart>;
};

export type TCartScoreInput = {
  dummy: Maybe<Scalars['String']>;
};

export type TCartScoreType = TShippingRateInputType & {
  __typename?: 'CartScoreType';
  type: Scalars['String'];
};

export enum TCartState {
  /** The cart was ordered. No further operations on the cart are allowed. */
  Ordered = 'Ordered',
  /** Anonymous cart whose content was merged into a customers cart on signin. No further operations on the cart are allowed. */
  Merged = 'Merged',
  /** The cart can be updated and ordered. It is the default state. */
  Active = 'Active'
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
  setKey: Maybe<TSetCartKey>;
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
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  allowAddingUnpublishedProducts: Scalars['Boolean'];
  countryTaxRateFallbackEnabled: Scalars['Boolean'];
};

export type TCartsConfigurationInput = {
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
};

export type TCategory = TVersioned & {
  __typename?: 'Category';
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  ancestorsRef: Array<TReference>;
  ancestors: Array<TCategory>;
  parentRef: Maybe<TReference>;
  parent: Maybe<TCategory>;
  orderHint: Scalars['String'];
  externalId: Maybe<Scalars['String']>;
  metaTitle: Maybe<Scalars['String']>;
  metaTitleAllLocales: Maybe<Array<TLocalizedString>>;
  metaKeywords: Maybe<Scalars['String']>;
  metaKeywordsAllLocales: Maybe<Array<TLocalizedString>>;
  metaDescription: Maybe<Scalars['String']>;
  metaDescriptionAllLocales: Maybe<Array<TLocalizedString>>;
  /** Number of staged products in the category subtree. */
  stagedProductCount: Scalars['Int'];
  /** Number of direct child categories. */
  childCount: Scalars['Int'];
  /** Direct child categories. */
  children: Maybe<Array<TCategory>>;
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  assets: Array<TAsset>;
  custom: Maybe<TCustomFieldsType>;
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


export type TCategory_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TCategory_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TCategory_SlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TCategory_MetaTitleArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TCategory_MetaKeywordsArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TCategory_MetaDescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TCategoryCreated = TMessagePayload & {
  __typename?: 'CategoryCreated';
  category: TCategory;
  type: Scalars['String'];
};

export type TCategoryDraft = {
  key: Maybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  custom: Maybe<TCustomFieldsDraft>;
  slug: Array<TLocalizedStringItemInputType>;
  externalId: Maybe<Scalars['String']>;
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>;
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>;
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>;
  orderHint: Maybe<Scalars['String']>;
  parent: Maybe<TResourceIdentifierInput>;
  assets: Maybe<Array<TAssetDraftInput>>;
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
  uuid: Scalars['String'];
  orderHint: Scalars['String'];
};

export type TCategoryQueryResult = {
  __typename?: 'CategoryQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TCategory>;
};

export type TCategorySearch = {
  __typename?: 'CategorySearch';
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  ancestorsRef: Array<TReference>;
  ancestors: Array<TCategorySearch>;
  parentRef: Maybe<TReference>;
  parent: Maybe<TCategorySearch>;
  externalId: Maybe<Scalars['String']>;
  stagedProductCount: Scalars['Int'];
  childCount: Scalars['Int'];
  productTypeNames: Array<Scalars['String']>;
  /** Direct child categories. */
  children: Array<TCategorySearch>;
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  orderHint: Scalars['String'];
  assets: Array<TAsset>;
  custom: Maybe<TCustomFieldsType>;
};


export type TCategorySearch_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TCategorySearch_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TCategorySearch_SlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TCategorySearchResult = {
  __typename?: 'CategorySearchResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Int'];
  results: Array<TCategorySearch>;
};

export type TCategorySlugChanged = TMessagePayload & {
  __typename?: 'CategorySlugChanged';
  slug: Maybe<Scalars['String']>;
  oldSlug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  oldSlugAllLocales: Maybe<Array<TLocalizedString>>;
  type: Scalars['String'];
};


export type TCategorySlugChanged_SlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TCategorySlugChanged_OldSlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TCategoryUpdateAction = {
  addAsset: Maybe<TAddCategoryAsset>;
  changeAssetName: Maybe<TChangeCategoryAssetName>;
  changeAssetOrder: Maybe<TChangeCategoryAssetOrder>;
  changeName: Maybe<TChangeCategoryName>;
  changeOrderHint: Maybe<TChangeCategoryOrderHint>;
  changeSlug: Maybe<TChangeCategorySlug>;
  changeParent: Maybe<TChangeCategoryParent>;
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
  setKey: Maybe<TSetCategoryKey>;
  setMetaDescription: Maybe<TSetCategoryMetaDescription>;
  setMetaKeywords: Maybe<TSetCategoryMetaKeywords>;
  setMetaTitle: Maybe<TSetCategoryMetaTitle>;
  setExternalId: Maybe<TSetCategoryExternalId>;
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
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
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
  name: Array<TLocalizedStringItemInputType>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
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
  addressId: Maybe<Scalars['String']>;
  addressKey: Maybe<Scalars['String']>;
  address: TAddressInput;
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
  transactionId: Scalars['String'];
  interactionId: Scalars['String'];
};

export type TChangePaymentTransactionState = {
  transactionId: Scalars['String'];
  state: TTransactionState;
};

export type TChangePaymentTransactionTimestamp = {
  transactionId: Scalars['String'];
  timestamp: Scalars['DateTime'];
};

export type TChangeProductAssetName = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  name: Array<TLocalizedStringItemInputType>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TChangeProductAssetOrder = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  assetOrder: Array<Scalars['String']>;
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
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  label: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TChangeProductMasterVariant = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TChangeProductName = {
  name: Array<TLocalizedStringItemInputType>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TChangeProductPrice = {
  priceId: Maybe<Scalars['String']>;
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  price: TProductPriceDataInput;
  staged: Maybe<Scalars['Boolean']>;
};

export type TChangeProductSelectionName = {
  name: Array<TLocalizedStringItemInputType>;
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
  textLineItemId: Scalars['String'];
  name: Array<TLocalizedStringItemInputType>;
};

export type TChangeShoppingListTextLineItemQuantity = {
  textLineItemId: Scalars['String'];
  quantity: Scalars['Int'];
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
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  money: TBaseMoney;
};

export type TChangeStagedOrderCustomLineItemQuantity = {
  customLineItemId: Scalars['String'];
  quantity: Scalars['Long'];
};

export type TChangeStagedOrderCustomLineItemQuantityOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderCustomLineItemQuantityOutput';
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  quantity: Scalars['Long'];
};

export type TChangeStagedOrderLineItemQuantity = {
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
};

export type TChangeStagedOrderLineItemQuantityOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderLineItemQuantityOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  externalPrice: Maybe<TBaseMoney>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPrice>;
};

export type TChangeStagedOrderOrderState = {
  orderState: TOrderState;
};

export type TChangeStagedOrderOrderStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderOrderStateOutput';
  type: Scalars['String'];
  orderState: TOrderState;
};

export type TChangeStagedOrderPaymentState = {
  paymentState: TPaymentState;
};

export type TChangeStagedOrderPaymentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderPaymentStateOutput';
  type: Scalars['String'];
  paymentState: TPaymentState;
};

export type TChangeStagedOrderShipmentState = {
  shipmentState: TShipmentState;
};

export type TChangeStagedOrderShipmentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderShipmentStateOutput';
  type: Scalars['String'];
  shipmentState: TShipmentState;
};

export type TChangeStagedOrderTaxCalculationMode = {
  taxCalculationMode: TTaxCalculationMode;
};

export type TChangeStagedOrderTaxCalculationModeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderTaxCalculationModeOutput';
  type: Scalars['String'];
  taxCalculationMode: TTaxCalculationMode;
};

export type TChangeStagedOrderTaxMode = {
  taxMode: TTaxMode;
};

export type TChangeStagedOrderTaxModeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderTaxModeOutput';
  type: Scalars['String'];
  taxMode: TTaxMode;
};

export type TChangeStagedOrderTaxRoundingMode = {
  taxRoundingMode: TRoundingMode;
};

export type TChangeStagedOrderTaxRoundingModeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ChangeStagedOrderTaxRoundingModeOutput';
  type: Scalars['String'];
  taxRoundingMode: TRoundingMode;
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
  productSelection: TResourceIdentifierInput;
  active: Scalars['Boolean'];
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

export type TChannel = TVersioned & TReviewTarget & {
  __typename?: 'Channel';
  id: Scalars['String'];
  version: Scalars['Long'];
  key: Scalars['String'];
  roles: Array<TChannelRole>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  address: Maybe<TAddress>;
  geoLocation: Maybe<TGeometry>;
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  reviewRatingStatistics: Maybe<TReviewRatingStatistics>;
  custom: Maybe<TCustomFieldsType>;
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


export type TChannel_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TChannel_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TChannelDraft = {
  key: Scalars['String'];
  roles: Array<TChannelRole>;
  name: Maybe<Array<TLocalizedStringItemInputType>>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  custom: Maybe<TCustomFieldsDraft>;
  address: Maybe<TAddressInput>;
  geoLocation: Maybe<TGeometryInput>;
};

export type TChannelQueryResult = {
  __typename?: 'ChannelQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TChannel>;
};

export type TChannelReferenceIdentifier = {
  __typename?: 'ChannelReferenceIdentifier';
  typeId: Scalars['String'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};

export enum TChannelRole {
  /** Role tells that this channel can be used to track inventory entries.Channels with this role can be treated as warehouses */
  InventorySupply = 'InventorySupply',
  /** Role tells that this channel can be used to expose products to a specific distribution channel. It can be used by the cart to select a product price. */
  ProductDistribution = 'ProductDistribution',
  /** Role tells that this channel can be used to track order export activities. */
  OrderExport = 'OrderExport',
  /** Role tells that this channel can be used to track order import activities. */
  OrderImport = 'OrderImport',
  /** This role can be combined with some other roles (e.g. with `InventorySupply`) to represent the fact that this particular channel is the primary/master channel among the channels of the same type. */
  Primary = 'Primary'
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
  type: Scalars['String'];
  labelAllLocales: Array<TLocalizedString>;
  label: Maybe<Scalars['String']>;
};


export type TClassificationShippingRateInput_LabelArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
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
  type: Scalars['String'];
  cloudEventsVersion: Scalars['String'];
};

export type TCloudEventsSubscriptionsFormatInput = {
  cloudEventsVersion: Scalars['String'];
};

export type TCommercetoolsSubscription = TVersioned & {
  __typename?: 'CommercetoolsSubscription';
  key: Maybe<Scalars['String']>;
  destination: TDestination;
  messages: Array<TMessageSubscription>;
  changes: Array<TChangeSubscription>;
  format: TNotificationFormat;
  status: TSubscriptionHealthStatus;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TCommercetoolsSubscriptionQueryResult = {
  __typename?: 'CommercetoolsSubscriptionQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TCommercetoolsSubscription>;
};


export type TCreateApiClient = {
  name: Scalars['String'];
  scope: Scalars['String'];
};

export type TCreateProductSelectionDraft = {
  key: Maybe<Scalars['String']>;
  name: Array<TLocalizedStringItemInputType>;
};

export type TCreateStore = {
  key: Scalars['String'];
  name: Maybe<Array<TLocalizedStringItemInputType>>;
  languages: Maybe<Array<Scalars['Locale']>>;
  distributionChannels: Maybe<Array<TResourceIdentifierInput>>;
  supplyChannels: Maybe<Array<TResourceIdentifierInput>>;
  productSelections: Maybe<Array<TProductSelectionSettingDraft>>;
  custom: Maybe<TCustomFieldsDraft>;
};

export type TCreateZone = {
  name: Scalars['String'];
  key: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  locations: Maybe<Array<TZoneLocation>>;
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
 * * FieldType `DateTimeType`: `"\"2001-09-11T14:00:00.000Z\""`
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
   * * FieldType `DateTimeType`: `"\"2001-09-11T14:00:00.000Z\""`
   * * FieldType `Number`: `"4"`
   * * FieldType `Set` with an elementType of `String`: `"[\"This is a string\", \"This is another string\"]"`
   * * FieldType `Reference`: `"{\"id\", \"b911b62d-353a-4388-93ee-8d488d9af962\", \"typeId\", \"product\"}"`
   */
  value: Scalars['String'];
};

export type TCustomFieldsCommand = {
  __typename?: 'CustomFieldsCommand';
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
  fields: Scalars['Json'];
  typeResId: Maybe<TResourceIdentifier>;
};

export type TCustomFieldsDraft = {
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
  type: Maybe<TResourceIdentifierInput>;
  fields: Maybe<Array<TCustomFieldInput>>;
};

export type TCustomFieldsType = {
  __typename?: 'CustomFieldsType';
  typeRef: TReference;
  type: Maybe<TTypeDefinition>;
  /** This field contains non-typed data. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>;
  /**
   * This field would contain type data
   * @deprecated This field has been removed and will return a HTTP code 400 with X-DEPRECATION-NOTICE when used. Typed custom fields are no longer supported, please use customFieldsRaw instead.
   */
  customFields: TType;
};


export type TCustomFieldsType_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>;
  excludeNames: Maybe<Array<Scalars['String']>>;
};

/** A custom line item is a generic item that can be added to the cart but is not bound to a product. You can use it for discounts (negative money), vouchers, complex cart rules, additional services or fees. You control the lifecycle of this item. */
export type TCustomLineItem = {
  __typename?: 'CustomLineItem';
  id: Scalars['String'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  money: TBaseMoney;
  totalPrice: TMoney;
  slug: Scalars['String'];
  quantity: Scalars['Long'];
  state: Array<TItemState>;
  taxCategory: Maybe<TTaxCategory>;
  taxCategoryRef: Maybe<TReference>;
  taxRate: Maybe<TTaxRate>;
  taxedPrice: Maybe<TTaxedItemPrice>;
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  custom: Maybe<TCustomFieldsType>;
  shippingDetails: Maybe<TItemShippingDetails>;
};


/** A custom line item is a generic item that can be added to the cart but is not bound to a product. You can use it for discounts (negative money), vouchers, complex cart rules, additional services or fees. You control the lifecycle of this item. */
export type TCustomLineItem_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TCustomLineItemDraft = {
  name: Array<TLocalizedStringItemInputType>;
  money: TBaseMoneyInput;
  slug: Scalars['String'];
  taxCategory: Maybe<TReferenceInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  quantity: Maybe<Scalars['Long']>;
  custom: Maybe<TCustomFieldsDraft>;
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
};

export type TCustomLineItemDraftOutput = {
  __typename?: 'CustomLineItemDraftOutput';
  money: TBaseMoney;
  slug: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  quantity: Maybe<Scalars['Long']>;
  custom: Maybe<TCustomFieldsCommand>;
  shippingDetails: Maybe<TItemShippingDetailsDraftOutput>;
  name: Maybe<Scalars['String']>;
  taxCategoryResId: Maybe<TResourceIdentifier>;
  nameAllLocales: Array<TLocalizedString>;
};


export type TCustomLineItemDraftOutput_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TCustomLineItemReturnItem = TReturnItem & {
  __typename?: 'CustomLineItemReturnItem';
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  id: Scalars['String'];
  quantity: Scalars['Long'];
  comment: Maybe<Scalars['String']>;
  shipmentState: TReturnShipmentState;
  paymentState: TReturnPaymentState;
  lastModifiedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export type TCustomLineItemStateTransition = TMessagePayload & {
  __typename?: 'CustomLineItemStateTransition';
  customLineItemId: Scalars['String'];
  transitionDate: Scalars['DateTime'];
  quantity: Scalars['Long'];
  fromState: Maybe<TState>;
  toState: Maybe<TState>;
  fromStateRef: TReference;
  toStateRef: TReference;
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
  key: Scalars['String'];
  value: Scalars['Json'];
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TCustomObjectDraft = {
  key: Scalars['String'];
  container: Scalars['String'];
  /** The value should be passed in a form of escaped JSON */
  value: Scalars['String'];
  version: Maybe<Scalars['Long']>;
};

export type TCustomObjectLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CustomObjectLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TCustomObjectLimitsProjection = {
  __typename?: 'CustomObjectLimitsProjection';
  total: TCustomObjectLimitWithCurrent;
};

export type TCustomObjectQueryResult = {
  __typename?: 'CustomObjectQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TCustomObject>;
};

export type TCustomSuggestTokenizer = TSuggestTokenizer & {
  __typename?: 'CustomSuggestTokenizer';
  inputs: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type TCustomSuggestTokenizerInput = {
  inputs: Array<Scalars['String']>;
};

/** A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer. */
export type TCustomer = TVersioned & {
  __typename?: 'Customer';
  customerNumber: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  addresses: Array<TAddress>;
  defaultShippingAddressId: Maybe<Scalars['String']>;
  defaultBillingAddressId: Maybe<Scalars['String']>;
  shippingAddressIds: Array<Scalars['String']>;
  billingAddressIds: Array<Scalars['String']>;
  isEmailVerified: Scalars['Boolean'];
  customerGroupRef: Maybe<TReference>;
  externalId: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  middleName: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['Locale']>;
  salutation: Maybe<Scalars['String']>;
  dateOfBirth: Maybe<Scalars['Date']>;
  companyName: Maybe<Scalars['String']>;
  vatId: Maybe<Scalars['String']>;
  customerGroup: Maybe<TCustomerGroup>;
  defaultShippingAddress: Maybe<TAddress>;
  defaultBillingAddress: Maybe<TAddress>;
  shippingAddresses: Array<TAddress>;
  billingAddresses: Array<TAddress>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  storesRef: Array<TKeyReference>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  stores: Array<TStore>;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
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

export type TCustomerEmailChanged = TMessagePayload & {
  __typename?: 'CustomerEmailChanged';
  email: Scalars['String'];
  type: Scalars['String'];
};

export type TCustomerEmailToken = TVersioned & {
  __typename?: 'CustomerEmailToken';
  customerId: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  value: Scalars['String'];
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TCustomerEmailVerified = TMessagePayload & {
  __typename?: 'CustomerEmailVerified';
  type: Scalars['String'];
};

/** A customer can be a member in a customer group (e.g. reseller, gold member). A customer group can be used in price calculations with special prices being assigned to certain customer groups. */
export type TCustomerGroup = TVersioned & {
  __typename?: 'CustomerGroup';
  id: Scalars['String'];
  version: Scalars['Long'];
  name: Scalars['String'];
  key: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  custom: Maybe<TCustomFieldsType>;
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TCustomerGroupDraft = {
  groupName: Scalars['String'];
  key: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
};

export type TCustomerGroupLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CustomerGroupLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TCustomerGroupLimitsProjection = {
  __typename?: 'CustomerGroupLimitsProjection';
  total: TCustomerGroupLimitWithCurrent;
};

export type TCustomerGroupQueryResult = {
  __typename?: 'CustomerGroupQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TCustomerGroup>;
};

export type TCustomerGroupReferenceIdentifier = {
  __typename?: 'CustomerGroupReferenceIdentifier';
  typeId: Scalars['String'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};

export type TCustomerGroupSet = TMessagePayload & {
  __typename?: 'CustomerGroupSet';
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TCustomerGroupUpdateAction = {
  changeName: Maybe<TChangeCustomerGroupName>;
  setKey: Maybe<TSetCustomerGroupKey>;
  setCustomType: Maybe<TSetCustomerGroupCustomType>;
  setCustomField: Maybe<TSetCustomerGroupCustomField>;
};

export type TCustomerLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'CustomerLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TCustomerLimitsProjection = {
  __typename?: 'CustomerLimitsProjection';
  total: TCustomerLimitWithCurrent;
};

export type TCustomerPasswordToken = TVersioned & {
  __typename?: 'CustomerPasswordToken';
  customerId: Scalars['String'];
  expiresAt: Scalars['DateTime'];
  value: Scalars['String'];
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
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
  passwordToken: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface_CustomersArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TCustomerQueryResult = {
  __typename?: 'CustomerQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TCustomer>;
};

export type TCustomerSignInDraft = {
  email: Scalars['String'];
  password: Scalars['String'];
  /** This field will be deprecated in favour of anonymousCart.id. */
  anonymousCartId: Maybe<Scalars['String']>;
  anonymousCart: Maybe<TResourceIdentifierInput>;
  anonymousCartSignInMode: Maybe<TAnonymousCartSignInMode>;
  anonymousId: Maybe<Scalars['String']>;
  updateProductData: Maybe<Scalars['Boolean']>;
};

export type TCustomerSignInResult = {
  __typename?: 'CustomerSignInResult';
  customer: TCustomer;
  cart: Maybe<TCart>;
};

export type TCustomerSignMeInDraft = {
  email: Scalars['String'];
  password: Scalars['String'];
  activeCartSignInMode: Maybe<TAnonymousCartSignInMode>;
  updateProductData: Maybe<Scalars['Boolean']>;
};

export type TCustomerSignMeUpDraft = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  middleName: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  dateOfBirth: Maybe<Scalars['Date']>;
  companyName: Maybe<Scalars['String']>;
  vatId: Maybe<Scalars['String']>;
  addresses: Maybe<Array<TAddressInput>>;
  /** The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address. */
  defaultBillingAddress: Maybe<Scalars['Int']>;
  /** The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address. */
  defaultShippingAddress: Maybe<Scalars['Int']>;
  /** The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses. */
  shippingAddresses: Maybe<Array<Scalars['Int']>>;
  /** The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses. */
  billingAddresses: Maybe<Array<Scalars['Int']>>;
  custom: Maybe<TCustomFieldsDraft>;
  locale: Maybe<Scalars['Locale']>;
  salutation: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  stores: Maybe<Array<TResourceIdentifierInput>>;
};

export type TCustomerSignUpDraft = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  middleName: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  dateOfBirth: Maybe<Scalars['Date']>;
  companyName: Maybe<Scalars['String']>;
  vatId: Maybe<Scalars['String']>;
  addresses: Maybe<Array<TAddressInput>>;
  /** The index of the address in the `addresses` list. The `defaultBillingAddressId` of the customer will be set to the ID of that address. */
  defaultBillingAddress: Maybe<Scalars['Int']>;
  /** The index of the address in the `addresses` list. The `defaultShippingAddressId` of the customer will be set to the ID of that address. */
  defaultShippingAddress: Maybe<Scalars['Int']>;
  /** The indices of the shipping addresses in the `addresses` list. The `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses. */
  shippingAddresses: Maybe<Array<Scalars['Int']>>;
  /** The indices of the billing addresses in the `addresses` list. The `billingAddressIds` of the customer will be set to the IDs of that addresses. */
  billingAddresses: Maybe<Array<Scalars['Int']>>;
  custom: Maybe<TCustomFieldsDraft>;
  locale: Maybe<Scalars['Locale']>;
  salutation: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  stores: Maybe<Array<TResourceIdentifierInput>>;
  customerNumber: Maybe<Scalars['String']>;
  /** This field will be deprecated in favour of anonymousCart.id. */
  anonymousCartId: Maybe<Scalars['String']>;
  anonymousCart: Maybe<TResourceIdentifierInput>;
  externalId: Maybe<Scalars['String']>;
  customerGroup: Maybe<TResourceIdentifierInput>;
  isEmailVerified: Maybe<Scalars['Boolean']>;
  anonymousId: Maybe<Scalars['String']>;
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
  setCompanyName: Maybe<TSetCustomerCompanyName>;
  setAddressCustomField: Maybe<TSetCustomerAddressCustomField>;
  setAddressCustomType: Maybe<TSetCustomerAddressCustomType>;
  setCustomField: Maybe<TSetCustomerCustomField>;
  setCustomType: Maybe<TSetCustomerCustomType>;
  setCustomerGroup: Maybe<TSetCustomerGroup>;
  setKey: Maybe<TSetCustomerKey>;
  setLocale: Maybe<TSetCustomerLocale>;
  setCustomerNumber: Maybe<TSetCustomerNumber>;
  setDateOfBirth: Maybe<TSetCustomerDateOfBirth>;
  setDefaultBillingAddress: Maybe<TSetCustomerDefaultBillingAddress>;
  setDefaultShippingAddress: Maybe<TSetCustomerDefaultShippingAddress>;
  setExternalId: Maybe<TSetCustomerExternalId>;
  setFirstName: Maybe<TSetCustomerFirstName>;
  setLastName: Maybe<TSetCustomerLastName>;
  setMiddleName: Maybe<TSetCustomerMiddleName>;
  setSalutation: Maybe<TSetCustomerSalutation>;
  setStores: Maybe<TSetCustomerStores>;
  setTitle: Maybe<TSetCustomerTitle>;
  setVatId: Maybe<TSetCustomerVatId>;
};


export type TDateAttribute = TAttribute & {
  __typename?: 'DateAttribute';
  value: Scalars['Date'];
  name: Scalars['String'];
};

export type TDateAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'DateAttributeDefinitionType';
  name: Scalars['String'];
};

export type TDateField = TCustomField & {
  __typename?: 'DateField';
  value: Scalars['Date'];
  name: Scalars['String'];
};


export type TDateTimeAttribute = TAttribute & {
  __typename?: 'DateTimeAttribute';
  value: Scalars['DateTime'];
  name: Scalars['String'];
};

export type TDateTimeAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'DateTimeAttributeDefinitionType';
  name: Scalars['String'];
};

export type TDateTimeField = TCustomField & {
  __typename?: 'DateTimeField';
  value: Scalars['DateTime'];
  name: Scalars['String'];
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
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  items: Array<TDeliveryItem>;
  parcels: Array<TParcel>;
  address: Maybe<TAddress>;
};

export type TDeliveryAdded = TMessagePayload & {
  __typename?: 'DeliveryAdded';
  delivery: TDelivery;
  type: Scalars['String'];
};

export type TDeliveryAddressSet = TMessagePayload & {
  __typename?: 'DeliveryAddressSet';
  deliveryId: Scalars['String'];
  address: Maybe<TAddress>;
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
  SQS: Maybe<TSqsDestinationInput>;
  SNS: Maybe<TSnsDestinationInput>;
  AzureServiceBus: Maybe<TAzureServiceBusDestinationInput>;
  EventGrid: Maybe<TEventGridDestinationInput>;
  GoogleCloudPubSub: Maybe<TGoogleCloudPubSubDestinationInput>;
};

export type TDimensions = {
  __typename?: 'Dimensions';
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type TDimensionsInput = {
  width: Scalars['Int'];
  height: Scalars['Int'];
};

/** With discount codes it is possible to give specific cart discounts to an eligible amount of users. They are defined by a string value which can be added to a cart so that specific cart discounts can be applied to the cart. */
export type TDiscountCode = TVersioned & {
  __typename?: 'DiscountCode';
  code: Scalars['String'];
  isActive: Scalars['Boolean'];
  maxApplications: Maybe<Scalars['Long']>;
  maxApplicationsPerCustomer: Maybe<Scalars['Long']>;
  cartPredicate: Maybe<Scalars['String']>;
  applicationVersion: Maybe<Scalars['Long']>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  groups: Array<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  cartDiscounts: Array<TCartDiscount>;
  referenceRefs: Array<TReference>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  custom: Maybe<TCustomFieldsType>;
  /** How many times this discount code was applied (only applications that were part of a successful checkout are considered) */
  applicationCount: Scalars['Long'];
  cartDiscountRefs: Array<TReference>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


/** With discount codes it is possible to give specific cart discounts to an eligible amount of users. They are defined by a string value which can be added to a cart so that specific cart discounts can be applied to the cart. */
export type TDiscountCode_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


/** With discount codes it is possible to give specific cart discounts to an eligible amount of users. They are defined by a string value which can be added to a cart so that specific cart discounts can be applied to the cart. */
export type TDiscountCode_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TDiscountCodeDraft = {
  code: Scalars['String'];
  name: Maybe<Array<TLocalizedStringItemInputType>>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  cartDiscounts: Array<TReferenceInput>;
  isActive: Maybe<Scalars['Boolean']>;
  maxApplications: Maybe<Scalars['Long']>;
  maxApplicationsPerCustomer: Maybe<Scalars['Long']>;
  cartPredicate: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  groups: Maybe<Array<Scalars['String']>>;
};

export type TDiscountCodeInfo = {
  __typename?: 'DiscountCodeInfo';
  discountCodeRef: TReference;
  state: Maybe<TDiscountCodeState>;
  discountCode: Maybe<TDiscountCode>;
};

export type TDiscountCodeQueryResult = {
  __typename?: 'DiscountCodeQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TDiscountCode>;
};

export enum TDiscountCodeState {
  /** The discount code is active and none of the discounts were applied because the discount application was stopped by one discount that has the StackingMode of StopAfterThisDiscount defined */
  ApplicationStoppedByPreviousDiscount = 'ApplicationStoppedByPreviousDiscount',
  /** The discount code is not valid or it does not contain any valid cart discounts. Validity is determined based on the validFrom and validUntil dates */
  NotValid = 'NotValid',
  /** maxApplications or maxApplicationsPerCustomer for discountCode has been reached. */
  MaxApplicationReached = 'MaxApplicationReached',
  /** The discount code is active and it contains at least one active and valid CartDiscount. The discount code cartPredicate matches the cart and at least one of the contained active discount’s cart predicates matches the cart. */
  MatchesCart = 'MatchesCart',
  /** The discount code is active and it contains at least one active and valid CartDiscount. But its cart predicate does not match the cart or none of the contained active discount’s cart predicates match the cart */
  DoesNotMatchCart = 'DoesNotMatchCart',
  /** The discount code is not active or it does not contain any active cart discounts. */
  NotActive = 'NotActive'
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
  value: TBaseMoney;
  includedDiscounts: Array<TDiscountedLineItemPortion>;
};

export type TDiscountedLineItemPriceForQuantity = {
  __typename?: 'DiscountedLineItemPriceForQuantity';
  quantity: Scalars['Long'];
  discountedPrice: TDiscountedLineItemPrice;
};

export type TDiscountedProductPriceValue = {
  __typename?: 'DiscountedProductPriceValue';
  value: TBaseMoney;
  discountRef: TReference;
  discount: Maybe<TProductDiscount>;
};

export type TDiscountedProductPriceValueInput = {
  value: TBaseMoneyInput;
  discount: TReferenceInput;
};

export type TEnumAttribute = TAttribute & {
  __typename?: 'EnumAttribute';
  key: Scalars['String'];
  label: Scalars['String'];
  name: Scalars['String'];
};

export type TEnumAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'EnumAttributeDefinitionType';
  values: TPlainEnumValueResult;
  name: Scalars['String'];
};


export type TEnumAttributeDefinitionType_ValuesArgs = {
  includeKeys: Maybe<Array<Scalars['String']>>;
  excludeKeys: Maybe<Array<Scalars['String']>>;
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
  values: Array<TEnumValue>;
  name: Scalars['String'];
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

export type TErasureReport = {
  __typename?: 'ErasureReport';
  nbrDeletedProductSelectionCommits: Scalars['Long'];
  nbrTruncatedStoreCommits: Scalars['Long'];
};

export type TEventGridDestination = TDestination & {
  __typename?: 'EventGridDestination';
  uri: Scalars['String'];
  accessKey: Scalars['String'];
  type: Scalars['String'];
};

export type TEventGridDestinationInput = {
  uri: Scalars['String'];
  accessKey: Scalars['String'];
};

export type TExtension = TVersioned & {
  __typename?: 'Extension';
  key: Maybe<Scalars['String']>;
  destination: TExtensionDestination;
  triggers: Array<TTrigger>;
  timeoutInMs: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TExtensionDestination = {
  type: Scalars['String'];
};

export type TExtensionDestinationInput = {
  HTTP: Maybe<THttpDestinationInput>;
  AWSLambda: Maybe<TAwsLambdaDestinationInput>;
};

export type TExtensionDraft = {
  key: Maybe<Scalars['String']>;
  destination: TExtensionDestinationInput;
  triggers: Array<TTriggerInput>;
  timeoutInMs: Maybe<Scalars['Int']>;
};

export type TExtensionLimitsProjection = {
  __typename?: 'ExtensionLimitsProjection';
  timeoutInMs: TLimit;
};

export type TExtensionQueryResult = {
  __typename?: 'ExtensionQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TExtension>;
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
  url: Scalars['String'];
  authorizationHeader: Scalars['String'];
};

export type TExternalOAuthDraft = {
  url: Scalars['String'];
  authorizationHeader: Scalars['String'];
};

export type TExternalTaxAmountDraft = {
  totalGross: TMoneyInput;
  taxRate: TExternalTaxRateDraft;
};

export type TExternalTaxAmountDraftOutput = {
  __typename?: 'ExternalTaxAmountDraftOutput';
  totalGross: TMoney;
  taxRate: TExternalTaxRateDraftOutput;
};

export type TExternalTaxRateDraft = {
  name: Scalars['String'];
  amount: Scalars['Float'];
  country: Scalars['Country'];
  state: Maybe<Scalars['String']>;
  subRates: Maybe<Array<TSubRateDraft>>;
  includedInPrice: Maybe<Scalars['Boolean']>;
};

export type TExternalTaxRateDraftOutput = {
  __typename?: 'ExternalTaxRateDraftOutput';
  name: Scalars['String'];
  amount: Maybe<Scalars['Float']>;
  country: Scalars['Country'];
  state: Maybe<Scalars['String']>;
  subRates: Array<TSubRate>;
  includedInPrice: Scalars['Boolean'];
};

/** Field definitions describe custom fields and allow you to define some meta-information associated with the field. */
export type TFieldDefinition = {
  __typename?: 'FieldDefinition';
  name: Scalars['String'];
  required: Scalars['Boolean'];
  inputHint: TTextInputHint;
  label: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
  type: TFieldType;
};


/** Field definitions describe custom fields and allow you to define some meta-information associated with the field. */
export type TFieldDefinition_LabelArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TFieldDefinitionInput = {
  type: TFieldTypeInput;
  name: Scalars['String'];
  label: Array<TLocalizedStringItemInputType>;
  required: Scalars['Boolean'];
  inputHint: TTextInputHint;
};

export type TFieldType = {
  name: Scalars['String'];
};

export type TFieldTypeEnumTypeDraft = {
  values: Array<TEnumValueInput>;
};

export type TFieldTypeInput = {
  Set: Maybe<TFieldTypeSetTypeDraft>;
  String: Maybe<TSimpleFieldTypeDraft>;
  LocalizedString: Maybe<TSimpleFieldTypeDraft>;
  Number: Maybe<TSimpleFieldTypeDraft>;
  Money: Maybe<TSimpleFieldTypeDraft>;
  Date: Maybe<TSimpleFieldTypeDraft>;
  Time: Maybe<TSimpleFieldTypeDraft>;
  DateTime: Maybe<TSimpleFieldTypeDraft>;
  Boolean: Maybe<TSimpleFieldTypeDraft>;
  Enum: Maybe<TFieldTypeEnumTypeDraft>;
  LocalizedEnum: Maybe<TFieldTypeLocalizedEnumTypeDraft>;
  Reference: Maybe<TFieldTypeReferenceTypeDraft>;
};

export type TFieldTypeLocalizedEnumTypeDraft = {
  values: Array<TLocalizedEnumValueInput>;
};

export type TFieldTypeReferenceTypeDraft = {
  referenceTypeId: Scalars['String'];
};

export type TFieldTypeSetElementTypeDraft = {
  String: Maybe<TSimpleFieldTypeDraft>;
  LocalizedString: Maybe<TSimpleFieldTypeDraft>;
  Number: Maybe<TSimpleFieldTypeDraft>;
  Money: Maybe<TSimpleFieldTypeDraft>;
  Date: Maybe<TSimpleFieldTypeDraft>;
  Time: Maybe<TSimpleFieldTypeDraft>;
  DateTime: Maybe<TSimpleFieldTypeDraft>;
  Boolean: Maybe<TSimpleFieldTypeDraft>;
  Enum: Maybe<TFieldTypeEnumTypeDraft>;
  LocalizedEnum: Maybe<TFieldTypeLocalizedEnumTypeDraft>;
  Reference: Maybe<TFieldTypeReferenceTypeDraft>;
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
  type: Scalars['String'];
  coordinates: Maybe<Array<Scalars['Float']>>;
};

export type TGiftLineItemValue = TCartDiscountValue & {
  __typename?: 'GiftLineItemValue';
  type: Scalars['String'];
  variantId: Scalars['Int'];
  productRef: TProductReferenceIdentifier;
  distributionChannelRef: Maybe<TChannelReferenceIdentifier>;
  supplyChannelRef: Maybe<TChannelReferenceIdentifier>;
};

export type TGiftLineItemValueInput = {
  product: TResourceIdentifierInput;
  variantId: Scalars['Int'];
  distributionChannel: Maybe<TResourceIdentifierInput>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
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
  type: Scalars['String'];
  currencyCode: Scalars['Currency'];
  preciseAmount: Scalars['Long'];
  centAmount: Scalars['Long'];
  fractionDigits: Scalars['Int'];
};

export type THighPrecisionMoneyInput = {
  currencyCode: Scalars['Currency'];
  preciseAmount: Scalars['Long'];
  fractionDigits: Scalars['Int'];
  centAmount: Maybe<Scalars['Long']>;
};

export type THttpDestination = TExtensionDestination & {
  __typename?: 'HttpDestination';
  type: Scalars['String'];
  url: Scalars['String'];
  authentication: Maybe<THttpDestinationAuthentication>;
};

export type THttpDestinationAuthentication = {
  type: Scalars['String'];
};

export type THttpDestinationAuthenticationInput = {
  AuthorizationHeader: Maybe<TAuthorizationHeaderInput>;
  AzureFunctions: Maybe<TAzureFunctionsAuthenticationInput>;
};

export type THttpDestinationInput = {
  url: Scalars['String'];
  authentication: Maybe<THttpDestinationAuthenticationInput>;
};

export type TImage = {
  __typename?: 'Image';
  url: Scalars['String'];
  dimensions: TDimensions;
  label: Maybe<Scalars['String']>;
};

export type TImageInput = {
  url: Scalars['String'];
  label: Maybe<Scalars['String']>;
  dimensions: TDimensionsInput;
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
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  state: Scalars['Set'];
};

export type TImportStagedOrderLineItemState = {
  lineItemId: Scalars['String'];
  state: Array<TItemStateDraftType>;
};

export type TImportStagedOrderLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'ImportStagedOrderLineItemStateOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  state: Scalars['Set'];
};

export type TInStore = TCartQueryInterface & TCustomerActiveCartInterface & TOrderQueryInterface & TCustomerQueryInterface & TShippingMethodsByCartInterface & TMeFieldInterface & {
  __typename?: 'InStore';
  /**
   * This field can only be used with an access token created with the password flow or with an anonymous session.
   *
   * It gives access to the data that is specific to the customer or the anonymous session linked to the access token.
   */
  me: TInStoreMe;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  shippingMethodsByCart: Array<TShippingMethod>;
  product: Maybe<TProduct>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customer: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customers: TCustomerQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  cart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  carts: TCartQueryResult;
  customerActiveCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  order: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  orders: TOrderQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  shoppingList: Maybe<TShoppingList>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  shoppingLists: TShoppingListQueryResult;
};


export type TInStore_ShippingMethodsByCartArgs = {
  id: Scalars['String'];
};


export type TInStore_ProductArgs = {
  sku: Maybe<Scalars['String']>;
  variantKey: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TInStore_CustomerArgs = {
  emailToken: Maybe<Scalars['String']>;
  passwordToken: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TInStore_CustomersArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TInStore_CartArgs = {
  id: Scalars['String'];
};


export type TInStore_CartsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TInStore_CustomerActiveCartArgs = {
  customerId: Scalars['String'];
};


export type TInStore_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TInStore_OrdersArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TInStore_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TInStore_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TInStoreMe = TMeQueryInterface & TCartQueryInterface & TActiveCartInterface & TOrderQueryInterface & TShoppingListQueryInterface & {
  __typename?: 'InStoreMe';
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customer: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  cart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  carts: TCartQueryResult;
  activeCart: Maybe<TCart>;
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
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TInStoreMe_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TInStoreMe_OrdersArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TInStoreMe_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TInStoreMe_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TInitiator = {
  __typename?: 'Initiator';
  isPlatformClient: Maybe<Scalars['Boolean']>;
  externalUserId: Maybe<Scalars['String']>;
  anonymousId: Maybe<Scalars['String']>;
  clientId: Maybe<Scalars['String']>;
  customerRef: Maybe<TReference>;
  /** @deprecated This field has been removed and will return a HTTP code 400 with X-DEPRECATION-NOTICE when used. Use 'userRef' to fetch the reference. */
  user: Maybe<TReference>;
  userRef: Maybe<TReference>;
};

export type TInterfaceInteractionsRaw = {
  __typename?: 'InterfaceInteractionsRaw';
  typeRef: TReference;
  type: Maybe<TTypeDefinition>;
  fields: Array<TRawCustomField>;
};


export type TInterfaceInteractionsRaw_FieldsArgs = {
  includeNames: Maybe<Array<Scalars['String']>>;
  excludeNames: Maybe<Array<Scalars['String']>>;
};

export type TInterfaceInteractionsRawResult = {
  __typename?: 'InterfaceInteractionsRawResult';
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
  results: Array<TInterfaceInteractionsRaw>;
};

/** Inventory allows you to track stock quantity per SKU and optionally per supply channel */
export type TInventoryEntry = TVersioned & {
  __typename?: 'InventoryEntry';
  sku: Scalars['String'];
  quantityOnStock: Scalars['Long'];
  availableQuantity: Scalars['Long'];
  key: Maybe<Scalars['String']>;
  restockableInDays: Maybe<Scalars['Int']>;
  expectedDelivery: Maybe<Scalars['DateTime']>;
  supplyChannel: Maybe<TChannel>;
  supplyChannelRef: Maybe<TReference>;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TInventoryEntryCreated = TMessagePayload & {
  __typename?: 'InventoryEntryCreated';
  inventoryEntry: TInventoryEntryCreatedContent;
  type: Scalars['String'];
};

export type TInventoryEntryCreatedContent = {
  __typename?: 'InventoryEntryCreatedContent';
  inventoryEntryId: Scalars['String'];
  sku: Scalars['String'];
  quantityOnStock: Scalars['Long'];
  key: Maybe<Scalars['String']>;
  restockableInDays: Maybe<Scalars['Int']>;
  expectedDelivery: Maybe<Scalars['DateTime']>;
  messageId: Maybe<TMessageId>;
  supplyChannel: Maybe<TChannel>;
  supplyChannelRef: Maybe<TReference>;
  custom: Maybe<TCustomFieldsType>;
};

export type TInventoryEntryDeleted = TMessagePayload & {
  __typename?: 'InventoryEntryDeleted';
  sku: Scalars['String'];
  supplyChannel: Maybe<TChannel>;
  supplyChannelRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TInventoryEntryDraft = {
  sku: Scalars['String'];
  key: Maybe<Scalars['String']>;
  quantityOnStock: Maybe<Scalars['Long']>;
  restockableInDays: Maybe<Scalars['Int']>;
  expectedDelivery: Maybe<Scalars['DateTime']>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  custom: Maybe<TCustomFieldsDraft>;
};

export type TInventoryEntryQuantitySet = TMessagePayload & {
  __typename?: 'InventoryEntryQuantitySet';
  oldQuantityOnStock: Scalars['Long'];
  newQuantityOnStock: Scalars['Long'];
  oldAvailableQuantity: Scalars['Long'];
  newAvailableQuantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TInventoryEntryQueryResult = {
  __typename?: 'InventoryEntryQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TInventoryEntry>;
};

export type TInventoryEntryUpdateAction = {
  addQuantity: Maybe<TAddInventoryEntryQuantity>;
  changeQuantity: Maybe<TChangeInventoryEntryQuantity>;
  removeQuantity: Maybe<TRemoveInventoryEntryQuantity>;
  setRestockableInDays: Maybe<TSetInventoryEntryRestockableInDays>;
  setExpectedDelivery: Maybe<TSetInventoryEntryExpectedDelivery>;
  setSupplyChannel: Maybe<TSetInventoryEntrySupplyChannel>;
  setCustomType: Maybe<TSetInventoryEntryCustomType>;
  setCustomField: Maybe<TSetInventoryEntryCustomField>;
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
  stateRef: TReference;
  state: Maybe<TState>;
};

export type TItemStateDraftType = {
  quantity: Scalars['Long'];
  state: TReferenceInput;
};


export type TKeyReference = {
  __typename?: 'KeyReference';
  typeId: Scalars['String'];
  key: Scalars['String'];
};


export type TLimit = {
  __typename?: 'Limit';
  limit: Maybe<Scalars['Long']>;
};

export type TLimitWithCurrent = {
  limit: Maybe<Scalars['Long']>;
  current: Maybe<Scalars['Long']>;
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
  id: Scalars['String'];
  productId: Scalars['String'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  productSlug: Maybe<Scalars['String']>;
  productSlugAllLocales: Maybe<Array<TLocalizedString>>;
  productType: Maybe<TProductTypeDefinition>;
  productTypeRef: Maybe<TReference>;
  variant: Maybe<TProductVariant>;
  price: TProductPrice;
  taxedPrice: Maybe<TTaxedItemPrice>;
  totalPrice: Maybe<TMoney>;
  quantity: Scalars['Long'];
  addedAt: Maybe<Scalars['DateTime']>;
  lastModifiedAt: Maybe<Scalars['DateTime']>;
  state: Array<TItemState>;
  taxRate: Maybe<TTaxRate>;
  supplyChannel: Maybe<TChannel>;
  supplyChannelRef: Maybe<TReference>;
  distributionChannel: Maybe<TChannel>;
  distributionChannelRef: Maybe<TReference>;
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  lineItemMode: TLineItemMode;
  priceMode: TLineItemPriceMode;
  custom: Maybe<TCustomFieldsType>;
  shippingDetails: Maybe<TItemShippingDetails>;
  inventoryMode: Maybe<TItemShippingDetails>;
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
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
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
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TLineItemDraft = {
  productId: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
  variantId: Maybe<Scalars['Int']>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  custom: Maybe<TCustomFieldsDraft>;
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  addedAt: Maybe<Scalars['DateTime']>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
};

export type TLineItemDraftOutput = {
  __typename?: 'LineItemDraftOutput';
  productId: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
  variantId: Maybe<Scalars['Int']>;
  custom: Maybe<TCustomFieldsCommand>;
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
  externalPrice: Maybe<TBaseMoney>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPrice>;
  shippingDetails: Maybe<TItemShippingDetailsDraftOutput>;
  addedAt: Maybe<Scalars['DateTime']>;
  distributionChannelResId: Maybe<TResourceIdentifier>;
  supplyChannelResId: Maybe<TResourceIdentifier>;
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
  /** The price is selected form the product variant. This is the default mode. */
  Platform = 'Platform',
  /** The line item price was set externally. Cart discounts can apply to line items with this price mode. All update actions that change the quantity of a line item with this price mode require the externalPrice field to be given. */
  ExternalPrice = 'ExternalPrice',
  /** The line item price with the total was set externally. */
  ExternalTotal = 'ExternalTotal'
}

export type TLineItemReturnItem = TReturnItem & {
  __typename?: 'LineItemReturnItem';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  id: Scalars['String'];
  quantity: Scalars['Long'];
  comment: Maybe<Scalars['String']>;
  shipmentState: TReturnShipmentState;
  paymentState: TReturnPaymentState;
  lastModifiedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export type TLineItemStateTransition = TMessagePayload & {
  __typename?: 'LineItemStateTransition';
  lineItemId: Scalars['String'];
  transitionDate: Scalars['DateTime'];
  quantity: Scalars['Long'];
  fromState: Maybe<TState>;
  toState: Maybe<TState>;
  fromStateRef: TReference;
  toStateRef: TReference;
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
  values: TLocalizableEnumValueTypeResult;
  name: Scalars['String'];
};


export type TLocalizableEnumAttributeDefinitionType_ValuesArgs = {
  includeKeys: Maybe<Array<Scalars['String']>>;
  excludeKeys: Maybe<Array<Scalars['String']>>;
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
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TLocalizableEnumValueTypeResult = {
  __typename?: 'LocalizableEnumValueTypeResult';
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
  results: Array<TLocalizableEnumValueType>;
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
  values: Array<TLocalizedEnumValue>;
  name: Scalars['String'];
};

export type TLocalizedEnumValue = {
  __typename?: 'LocalizedEnumValue';
  key: Scalars['String'];
  label: Maybe<Scalars['String']>;
  labelAllLocales: Array<TLocalizedString>;
};


export type TLocalizedEnumValue_LabelArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
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
  value: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type TLocalizedStringAttribute_ValueArgs = {
  locale: Scalars['Locale'];
};

export type TLocalizedStringField = TCustomField & {
  __typename?: 'LocalizedStringField';
  value: Maybe<Scalars['String']>;
  name: Scalars['String'];
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
  text: Scalars['String'];
  locale: Scalars['Locale'];
};

export type TLocation = {
  __typename?: 'Location';
  country: Scalars['Country'];
  state: Maybe<Scalars['String']>;
};


export type TMe = TMeQueryInterface & TCartQueryInterface & TActiveCartInterface & TOrderQueryInterface & TShoppingListQueryInterface & {
  __typename?: 'Me';
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customer: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  cart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  carts: TCartQueryResult;
  activeCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  order: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  orders: TOrderQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  shoppingList: Maybe<TShoppingList>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  shoppingLists: TShoppingListQueryResult;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  payment: Maybe<TMyPayment>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  payments: TMyPaymentQueryResult;
};


export type TMe_CartArgs = {
  id: Scalars['String'];
};


export type TMe_CartsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TMe_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TMe_OrdersArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TMe_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMe_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TMe_PaymentArgs = {
  id: Scalars['String'];
};


export type TMe_PaymentsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

/** The me field gives access to the data that is specific to the customer or anonymous session linked to the access token. */
export type TMeFieldInterface = {
  me: TMeQueryInterface;
};

export type TMeQueryInterface = {
  cart: Maybe<TCart>;
  carts: TCartQueryResult;
  activeCart: Maybe<TCart>;
  order: Maybe<TOrder>;
  orders: TOrderQueryResult;
  shoppingList: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
};


export type TMeQueryInterface_CartArgs = {
  id: Scalars['String'];
};


export type TMeQueryInterface_CartsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TMeQueryInterface_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TMeQueryInterface_OrdersArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TMeQueryInterface_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMeQueryInterface_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TMessage = TVersioned & {
  __typename?: 'Message';
  id: Scalars['String'];
  type: Scalars['String'];
  sequenceNumber: Scalars['Long'];
  resourceRef: TReference;
  resourceVersion: Scalars['Long'];
  userProvidedIdentifiers: Maybe<TUserProvidedIdentifiers>;
  payload: TMessagePayload;
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
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
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TMessage>;
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
  enabled: Scalars['Boolean'];
  deleteDaysAfterCreation: Maybe<Scalars['Int']>;
};

export type TMessagesConfigurationDraft = {
  enabled: Scalars['Boolean'];
  deleteDaysAfterCreation: Scalars['Int'];
};

export type TMoney = TBaseMoney & {
  __typename?: 'Money';
  type: Scalars['String'];
  currencyCode: Scalars['Currency'];
  centAmount: Scalars['Long'];
  /** For the `Money` it equals to the default number of fraction digits used with the currency. */
  fractionDigits: Scalars['Int'];
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
  currencyCode: Scalars['Currency'];
  centAmount: Scalars['Long'];
};

export type TMoneyField = TCustomField & {
  __typename?: 'MoneyField';
  centAmount: Scalars['Long'];
  currencyCode: Scalars['Currency'];
  name: Scalars['String'];
};

export type TMoneyInput = {
  currencyCode: Scalars['Currency'];
  centAmount: Scalars['Long'];
};

export type TMoneyType = TFieldType & {
  __typename?: 'MoneyType';
  name: Scalars['String'];
};

export type TMoveProductImageToPosition = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  position: Scalars['Int'];
  staged: Maybe<Scalars['Boolean']>;
};

export type TMultiBuyCustomLineItemsTarget = TCartDiscountTarget & {
  __typename?: 'MultiBuyCustomLineItemsTarget';
  predicate: Scalars['String'];
  triggerQuantity: Scalars['Long'];
  discountedQuantity: Scalars['Long'];
  maxOccurrence: Maybe<Scalars['Int']>;
  selectionMode: TSelectionMode;
  type: Scalars['String'];
};

export type TMultiBuyCustomLineItemsTargetInput = {
  predicate: Scalars['String'];
  triggerQuantity: Scalars['Long'];
  discountedQuantity: Scalars['Long'];
  maxOccurrence: Maybe<Scalars['Int']>;
  selectionMode: Maybe<TSelectionMode>;
};

export type TMultiBuyLineItemsTarget = TCartDiscountTarget & {
  __typename?: 'MultiBuyLineItemsTarget';
  predicate: Scalars['String'];
  triggerQuantity: Scalars['Long'];
  discountedQuantity: Scalars['Long'];
  maxOccurrence: Maybe<Scalars['Int']>;
  selectionMode: TSelectionMode;
  type: Scalars['String'];
};

export type TMultiBuyLineItemsTargetInput = {
  predicate: Scalars['String'];
  triggerQuantity: Scalars['Long'];
  discountedQuantity: Scalars['Long'];
  maxOccurrence: Maybe<Scalars['Int']>;
  selectionMode: Maybe<TSelectionMode>;
};

export type TMutation = {
  __typename?: 'Mutation';
  createCustomerGroup: Maybe<TCustomerGroup>;
  updateCustomerGroup: Maybe<TCustomerGroup>;
  deleteCustomerGroup: Maybe<TCustomerGroup>;
  createCategory: Maybe<TCategory>;
  updateCategory: Maybe<TCategory>;
  deleteCategory: Maybe<TCategory>;
  createChannel: Maybe<TChannel>;
  updateChannel: Maybe<TChannel>;
  deleteChannel: Maybe<TChannel>;
  createOrUpdateCustomObject: Maybe<TCustomObject>;
  deleteCustomObject: Maybe<TCustomObject>;
  createProductType: Maybe<TProductTypeDefinition>;
  updateProductType: Maybe<TProductTypeDefinition>;
  deleteProductType: Maybe<TProductTypeDefinition>;
  createTypeDefinition: Maybe<TTypeDefinition>;
  updateTypeDefinition: Maybe<TTypeDefinition>;
  deleteTypeDefinition: Maybe<TTypeDefinition>;
  createShippingMethod: Maybe<TShippingMethod>;
  updateShippingMethod: Maybe<TShippingMethod>;
  deleteShippingMethod: Maybe<TShippingMethod>;
  createZone: Maybe<TZone>;
  updateZone: Maybe<TZone>;
  deleteZone: Maybe<TZone>;
  createTaxCategory: Maybe<TTaxCategory>;
  updateTaxCategory: Maybe<TTaxCategory>;
  deleteTaxCategory: Maybe<TTaxCategory>;
  createDiscountCode: Maybe<TDiscountCode>;
  updateDiscountCode: Maybe<TDiscountCode>;
  deleteDiscountCode: Maybe<TDiscountCode>;
  createCartDiscount: Maybe<TCartDiscount>;
  updateCartDiscount: Maybe<TCartDiscount>;
  deleteCartDiscount: Maybe<TCartDiscount>;
  createProductDiscount: Maybe<TProductDiscount>;
  updateProductDiscount: Maybe<TProductDiscount>;
  deleteProductDiscount: Maybe<TProductDiscount>;
  createProduct: Maybe<TProduct>;
  updateProduct: Maybe<TProduct>;
  deleteProduct: Maybe<TProduct>;
  createState: Maybe<TState>;
  updateState: Maybe<TState>;
  deleteState: Maybe<TState>;
  /** Creates a customer. If an anonymous cart is given then the cart is assigned to the created customer and the version number of the Cart will increase. If the id of an anonymous session is given, all carts and orders will be assigned to the created customer. */
  customerSignUp: TCustomerSignInResult;
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
  updateCustomer: Maybe<TCustomer>;
  deleteCustomer: Maybe<TCustomer>;
  customerChangePassword: Maybe<TCustomer>;
  /**
   * The following workflow can be used to reset the customer’s password:
   *
   * 1. Create a password reset token and send it embedded in a link to the customer.
   * 2. When the customer clicks on the link, you may optionally retrieve customer by password token.
   * 3. When the customer entered new password, use reset customer’s password to reset the password.
   */
  customerResetPassword: Maybe<TCustomer>;
  /** Verifies customer's email using a token. */
  customerConfirmEmail: Maybe<TCustomer>;
  /** The token value is used to reset the password of the customer with the given email. The token is valid only for 10 minutes. */
  customerCreatePasswordResetToken: Maybe<TCustomerPasswordToken>;
  customerCreateEmailVerificationToken: TCustomerEmailToken;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features If used with an access token for Anonymous Sessions, all orders and carts belonging to the anonymousId will be assigned to the newly created customer. */
  customerSignMeUp: TCustomerSignInResult;
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
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  updateMyCustomer: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  deleteMyCustomer: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customerChangeMyPassword: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customerConfirmMyEmail: Maybe<TCustomer>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  customerResetMyPassword: Maybe<TCustomer>;
  createInventoryEntry: Maybe<TInventoryEntry>;
  updateInventoryEntry: Maybe<TInventoryEntry>;
  deleteInventoryEntry: Maybe<TInventoryEntry>;
  createCart: Maybe<TCart>;
  updateCart: Maybe<TCart>;
  deleteCart: Maybe<TCart>;
  replicateCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  createMyCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  updateMyCart: Maybe<TCart>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  deleteMyCart: Maybe<TCart>;
  createOrderFromCart: Maybe<TOrder>;
  updateOrder: Maybe<TOrder>;
  deleteOrder: Maybe<TOrder>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  createMyOrderFromCart: Maybe<TOrder>;
  createOrderEdit: Maybe<TOrderEdit>;
  updateOrderEdit: Maybe<TOrderEdit>;
  deleteOrderEdit: Maybe<TOrderEdit>;
  createShoppingList: Maybe<TShoppingList>;
  updateShoppingList: Maybe<TShoppingList>;
  deleteShoppingList: Maybe<TShoppingList>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  createMyShoppingList: Maybe<TShoppingList>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  updateMyShoppingList: Maybe<TShoppingList>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  deleteMyShoppingList: Maybe<TShoppingList>;
  createPayment: Maybe<TPayment>;
  updatePayment: Maybe<TPayment>;
  deletePayment: Maybe<TPayment>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  createMyPayment: Maybe<TMyPayment>;
  updateMyPayment: Maybe<TMyPayment>;
  deleteMyPayment: Maybe<TMyPayment>;
  createProductSelection: Maybe<TProductSelection>;
  updateProductSelection: Maybe<TProductSelection>;
  deleteProductSelection: Maybe<TProductSelection>;
  eraseAllProductSelectionData: TErasureReport;
  updateProject: Maybe<TProjectProjection>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  createStore: Maybe<TStore>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  updateStore: Maybe<TStore>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  deleteStore: Maybe<TStore>;
  createReview: Maybe<TReview>;
  updateReview: Maybe<TReview>;
  deleteReview: Maybe<TReview>;
  createSubscription: Maybe<TCommercetoolsSubscription>;
  updateSubscription: Maybe<TCommercetoolsSubscription>;
  deleteSubscription: Maybe<TCommercetoolsSubscription>;
  createExtension: Maybe<TExtension>;
  updateExtension: Maybe<TExtension>;
  deleteExtension: Maybe<TExtension>;
  createApiClient: Maybe<TApiClientWithSecret>;
  deleteApiClient: Maybe<TApiClientWithoutSecret>;
};


export type TMutation_CreateCustomerGroupArgs = {
  draft: TCustomerGroupDraft;
};


export type TMutation_UpdateCustomerGroupArgs = {
  version: Scalars['Long'];
  actions: Array<TCustomerGroupUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteCustomerGroupArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateCategoryArgs = {
  draft: TCategoryDraft;
};


export type TMutation_UpdateCategoryArgs = {
  version: Scalars['Long'];
  actions: Array<TCategoryUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteCategoryArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateChannelArgs = {
  draft: TChannelDraft;
};


export type TMutation_UpdateChannelArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
  actions: Array<TChannelUpdateAction>;
};


export type TMutation_DeleteChannelArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_CreateOrUpdateCustomObjectArgs = {
  draft: TCustomObjectDraft;
};


export type TMutation_DeleteCustomObjectArgs = {
  version: Maybe<Scalars['Long']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  container: Maybe<Scalars['String']>;
  personalDataErasure?: Maybe<Scalars['Boolean']>;
};


export type TMutation_CreateProductTypeArgs = {
  draft: TProductTypeDraft;
};


export type TMutation_UpdateProductTypeArgs = {
  version: Scalars['Long'];
  actions: Array<TProductTypeUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteProductTypeArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateTypeDefinitionArgs = {
  draft: TTypeDefinitionDraft;
};


export type TMutation_UpdateTypeDefinitionArgs = {
  version: Scalars['Long'];
  actions: Array<TTypeUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteTypeDefinitionArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateShippingMethodArgs = {
  draft: TShippingMethodDraft;
};


export type TMutation_UpdateShippingMethodArgs = {
  version: Scalars['Long'];
  actions: Array<TShippingMethodUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteShippingMethodArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateZoneArgs = {
  draft: TCreateZone;
};


export type TMutation_UpdateZoneArgs = {
  version: Scalars['Long'];
  actions: Array<TZoneUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteZoneArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateTaxCategoryArgs = {
  draft: TTaxCategoryDraft;
};


export type TMutation_UpdateTaxCategoryArgs = {
  version: Scalars['Long'];
  actions: Array<TTaxCategoryUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteTaxCategoryArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateDiscountCodeArgs = {
  draft: TDiscountCodeDraft;
};


export type TMutation_UpdateDiscountCodeArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
  actions: Array<TDiscountCodeUpdateAction>;
};


export type TMutation_DeleteDiscountCodeArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_CreateCartDiscountArgs = {
  draft: TCartDiscountDraft;
};


export type TMutation_UpdateCartDiscountArgs = {
  version: Scalars['Long'];
  actions: Array<TCartDiscountUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteCartDiscountArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateProductDiscountArgs = {
  draft: TProductDiscountDraft;
};


export type TMutation_UpdateProductDiscountArgs = {
  version: Scalars['Long'];
  actions: Array<TProductDiscountUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteProductDiscountArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateProductArgs = {
  draft: TProductDraft;
};


export type TMutation_UpdateProductArgs = {
  version: Scalars['Long'];
  actions: Array<TProductUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteProductArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateStateArgs = {
  draft: TStateDraft;
};


export type TMutation_UpdateStateArgs = {
  version: Scalars['Long'];
  actions: Array<TStateUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteStateArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CustomerSignUpArgs = {
  draft: TCustomerSignUpDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerSignInArgs = {
  draft: TCustomerSignInDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_UpdateCustomerArgs = {
  version: Scalars['Long'];
  actions: Array<TCustomerUpdateAction>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteCustomerArgs = {
  version: Scalars['Long'];
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CustomerChangePasswordArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerResetPasswordArgs = {
  version: Maybe<Scalars['Long']>;
  tokenValue: Scalars['String'];
  newPassword: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerConfirmEmailArgs = {
  version: Maybe<Scalars['Long']>;
  tokenValue: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerCreatePasswordResetTokenArgs = {
  email: Scalars['String'];
  ttlMinutes: Maybe<Scalars['Int']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerCreateEmailVerificationTokenArgs = {
  id: Scalars['String'];
  version: Maybe<Scalars['Long']>;
  ttlMinutes: Scalars['Int'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerSignMeUpArgs = {
  draft: TCustomerSignMeUpDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerSignMeInArgs = {
  draft: TCustomerSignMeInDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_UpdateMyCustomerArgs = {
  version: Scalars['Long'];
  actions: Array<TMyCustomerUpdateAction>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_DeleteMyCustomerArgs = {
  version: Scalars['Long'];
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerChangeMyPasswordArgs = {
  version: Scalars['Long'];
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerConfirmMyEmailArgs = {
  tokenValue: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CustomerResetMyPasswordArgs = {
  tokenValue: Scalars['String'];
  newPassword: Scalars['String'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateInventoryEntryArgs = {
  draft: TInventoryEntryDraft;
};


export type TMutation_UpdateInventoryEntryArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
  actions: Array<TInventoryEntryUpdateAction>;
};


export type TMutation_DeleteInventoryEntryArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_CreateCartArgs = {
  draft: TCartDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_UpdateCartArgs = {
  version: Scalars['Long'];
  actions: Array<TCartUpdateAction>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteCartArgs = {
  version: Scalars['Long'];
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_ReplicateCartArgs = {
  reference: TReferenceInput;
  key: Maybe<Scalars['String']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateMyCartArgs = {
  draft: TMyCartDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_UpdateMyCartArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
  actions: Array<TMyCartUpdateAction>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_DeleteMyCartArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateOrderFromCartArgs = {
  draft: TOrderCartCommand;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_UpdateOrderArgs = {
  version: Scalars['Long'];
  actions: Array<TOrderUpdateAction>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TMutation_DeleteOrderArgs = {
  version: Scalars['Long'];
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TMutation_CreateMyOrderFromCartArgs = {
  draft: TOrderMyCartCommand;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_CreateOrderEditArgs = {
  draft: TOrderEditDraft;
};


export type TMutation_UpdateOrderEditArgs = {
  version: Scalars['Long'];
  actions: Array<TOrderEditUpdateAction>;
  dryRun?: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteOrderEditArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateShoppingListArgs = {
  draft: TShoppingListDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_UpdateShoppingListArgs = {
  version: Scalars['Long'];
  actions: Array<TShoppingListUpdateAction>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteShoppingListArgs = {
  version: Scalars['Long'];
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateMyShoppingListArgs = {
  draft: TMyShoppingListDraft;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
};


export type TMutation_UpdateMyShoppingListArgs = {
  version: Scalars['Long'];
  actions: Array<TMyShoppingListUpdateAction>;
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteMyShoppingListArgs = {
  version: Scalars['Long'];
  storeKey: Maybe<Scalars['KeyReferenceInput']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreatePaymentArgs = {
  draft: TPaymentDraft;
};


export type TMutation_UpdatePaymentArgs = {
  version: Scalars['Long'];
  actions: Array<TPaymentUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeletePaymentArgs = {
  version: Scalars['Long'];
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateMyPaymentArgs = {
  draft: TMyPaymentDraft;
};


export type TMutation_UpdateMyPaymentArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
  actions: Array<TMyPaymentUpdateAction>;
};


export type TMutation_DeleteMyPaymentArgs = {
  id: Scalars['String'];
  version: Scalars['Long'];
};


export type TMutation_CreateProductSelectionArgs = {
  draft: TCreateProductSelectionDraft;
};


export type TMutation_UpdateProductSelectionArgs = {
  version: Scalars['Long'];
  actions: Array<TProductSelectionUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteProductSelectionArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_UpdateProjectArgs = {
  version: Scalars['Long'];
  actions: Array<TProjectSettingsUpdateAction>;
};


export type TMutation_CreateStoreArgs = {
  draft: TCreateStore;
};


export type TMutation_UpdateStoreArgs = {
  version: Scalars['Long'];
  actions: Array<TStoreUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteStoreArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateReviewArgs = {
  draft: TReviewDraft;
};


export type TMutation_UpdateReviewArgs = {
  version: Scalars['Long'];
  actions: Array<TReviewUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteReviewArgs = {
  version: Scalars['Long'];
  personalDataErasure?: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateSubscriptionArgs = {
  draft: TSubscriptionDraft;
};


export type TMutation_UpdateSubscriptionArgs = {
  version: Scalars['Long'];
  actions: Array<TSubscriptionUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteSubscriptionArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateExtensionArgs = {
  draft: TExtensionDraft;
};


export type TMutation_UpdateExtensionArgs = {
  version: Scalars['Long'];
  actions: Array<TExtensionUpdateAction>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_DeleteExtensionArgs = {
  version: Scalars['Long'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TMutation_CreateApiClientArgs = {
  draft: TCreateApiClient;
};


export type TMutation_DeleteApiClientArgs = {
  id: Scalars['String'];
};

export type TMyCartDraft = {
  currency: Scalars['Currency'];
  country: Maybe<Scalars['Country']>;
  inventoryMode: Maybe<TInventoryMode>;
  custom: Maybe<TCustomFieldsDraft>;
  customerEmail: Maybe<Scalars['String']>;
  shippingAddress: Maybe<TAddressInput>;
  billingAddress: Maybe<TAddressInput>;
  shippingMethod: Maybe<TResourceIdentifierInput>;
  taxMode: Maybe<TTaxMode>;
  locale: Maybe<Scalars['Locale']>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  itemShippingAddresses: Maybe<Array<TAddressInput>>;
  discountCodes: Maybe<Array<Scalars['String']>>;
  store: Maybe<TResourceIdentifierInput>;
  lineItems: Maybe<Array<TMyLineItemDraft>>;
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
  setShippingMethod: Maybe<TSetMyCartShippingMethod>;
  setShippingAddress: Maybe<TSetCartShippingAddress>;
  setShippingAddressCustomField: Maybe<TSetCartShippingAddressCustomField>;
  setShippingAddressCustomType: Maybe<TSetCartShippingAddressCustomType>;
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
  setCompanyName: Maybe<TSetCustomerCompanyName>;
  setAddressCustomField: Maybe<TSetCustomerAddressCustomField>;
  setAddressCustomType: Maybe<TSetCustomerAddressCustomType>;
  setCustomField: Maybe<TSetCustomerCustomField>;
  setCustomType: Maybe<TSetCustomerCustomType>;
  setLocale: Maybe<TSetCustomerLocale>;
  setDateOfBirth: Maybe<TSetCustomerDateOfBirth>;
  setDefaultBillingAddress: Maybe<TSetCustomerDefaultBillingAddress>;
  setDefaultShippingAddress: Maybe<TSetCustomerDefaultShippingAddress>;
  setFirstName: Maybe<TSetCustomerFirstName>;
  setLastName: Maybe<TSetCustomerLastName>;
  setMiddleName: Maybe<TSetCustomerMiddleName>;
  setSalutation: Maybe<TSetCustomerSalutation>;
  setTitle: Maybe<TSetCustomerTitle>;
  setVatId: Maybe<TSetCustomerVatId>;
};

export type TMyLineItemDraft = {
  productId: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  quantity: Maybe<Scalars['Long']>;
  variantId: Maybe<Scalars['Int']>;
  supplyChannel: Maybe<TResourceIdentifierInput>;
  distributionChannel: Maybe<TResourceIdentifierInput>;
  custom: Maybe<TCustomFieldsDraft>;
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
  addedAt: Maybe<Scalars['DateTime']>;
};

/**
 * My Payments endpoint provides access to payments scoped to a specific user.
 * [documentation](https://docs.commercetools.com/http-api-projects-me-payments#mypayment)
 */
export type TMyPayment = {
  __typename?: 'MyPayment';
  id: Scalars['String'];
  version: Scalars['Long'];
  customerRef: Maybe<TReference>;
  customer: Maybe<TCustomer>;
  anonymousId: Maybe<Scalars['String']>;
  paymentMethodInfo: TPaymentMethodInfo;
  amountPlanned: TMoney;
  transactions: Array<TTransaction>;
  custom: Maybe<TCustomFieldsType>;
};

export type TMyPaymentDraft = {
  amountPlanned: TMoneyInput;
  paymentMethodInfo: Maybe<TPaymentMethodInfoInput>;
  custom: Maybe<TCustomFieldsDraft>;
  transaction: Maybe<TMyTransactionDraft>;
};

export type TMyPaymentQueryResult = {
  __typename?: 'MyPaymentQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TMyPayment>;
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
  name: Array<TLocalizedStringItemInputType>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  lineItems: Maybe<Array<TShoppingListLineItemDraft>>;
  textLineItems: Maybe<Array<TTextLineItemDraft>>;
  custom: Maybe<TCustomFieldsDraft>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
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
  timestamp: Maybe<Scalars['DateTime']>;
  type: TTransactionType;
  amount: TMoneyInput;
  interactionId: Maybe<Scalars['String']>;
};

export type TNestedAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'NestedAttributeDefinitionType';
  typeRef: TReference;
  name: Scalars['String'];
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
  value: Scalars['BigDecimal'];
  name: Scalars['String'];
};

export type TNumberAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'NumberAttributeDefinitionType';
  name: Scalars['String'];
};

export type TNumberField = TCustomField & {
  __typename?: 'NumberField';
  value: Scalars['BigDecimal'];
  name: Scalars['String'];
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
  customerId: Maybe<Scalars['String']>;
  customer: Maybe<TCustomer>;
  customerEmail: Maybe<Scalars['String']>;
  anonymousId: Maybe<Scalars['String']>;
  lineItems: Array<TLineItem>;
  customLineItems: Array<TCustomLineItem>;
  totalPrice: TMoney;
  taxedPrice: Maybe<TTaxedPrice>;
  shippingAddress: Maybe<TAddress>;
  billingAddress: Maybe<TAddress>;
  inventoryMode: TInventoryMode;
  taxMode: TTaxMode;
  taxRoundingMode: TRoundingMode;
  taxCalculationMode: TTaxCalculationMode;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  country: Maybe<Scalars['Country']>;
  shippingInfo: Maybe<TShippingInfo>;
  discountCodes: Array<TDiscountCodeInfo>;
  refusedGifts: Array<TCartDiscount>;
  refusedGiftsRefs: Array<TReference>;
  paymentInfo: Maybe<TPaymentInfo>;
  locale: Maybe<Scalars['Locale']>;
  shippingRateInput: Maybe<TShippingRateInput>;
  origin: TCartOrigin;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  storeRef: Maybe<TKeyReference>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  store: Maybe<TStore>;
  itemShippingAddresses: Array<TAddress>;
  completedAt: Maybe<Scalars['DateTime']>;
  orderNumber: Maybe<Scalars['String']>;
  orderState: TOrderState;
  stateRef: Maybe<TReference>;
  state: Maybe<TState>;
  shipmentState: Maybe<TShipmentState>;
  paymentState: Maybe<TPaymentState>;
  syncInfo: Array<TSyncInfo>;
  returnInfo: Array<TReturnInfo>;
  lastMessageSequenceNumber: Scalars['Long'];
  cartRef: Maybe<TReference>;
  cart: Maybe<TCart>;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TOrderBillingAddressSet = TMessagePayload & {
  __typename?: 'OrderBillingAddressSet';
  address: Maybe<TAddress>;
  oldAddress: Maybe<TAddress>;
  type: Scalars['String'];
};

export type TOrderCartCommand = {
  id: Maybe<Scalars['String']>;
  cart: Maybe<TResourceIdentifierInput>;
  version: Scalars['Long'];
  paymentState: Maybe<TPaymentState>;
  orderState: Maybe<TOrderState>;
  state: Maybe<TReferenceInput>;
  shipmentState: Maybe<TShipmentState>;
  orderNumber: Maybe<Scalars['String']>;
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
  quantity: Scalars['Long'];
  oldQuantity: Maybe<Scalars['Long']>;
  type: Scalars['String'];
};

export type TOrderCustomLineItemRemoved = TMessagePayload & {
  __typename?: 'OrderCustomLineItemRemoved';
  customLineItemId: Scalars['String'];
  customLineItem: Maybe<TCustomLineItem>;
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
  oldCustomerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  oldCustomerGroupRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TOrderCustomerSet = TMessagePayload & {
  __typename?: 'OrderCustomerSet';
  customer: Maybe<TCustomer>;
  oldCustomer: Maybe<TCustomer>;
  customerGroup: Maybe<TCustomerGroup>;
  oldCustomerGroup: Maybe<TCustomerGroup>;
  customerRef: Maybe<TReference>;
  oldCustomerRef: Maybe<TReference>;
  customerGroupRef: Maybe<TReference>;
  oldCustomerGroupRef: Maybe<TReference>;
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
  state: TDiscountCodeState;
  oldState: Maybe<TDiscountCodeState>;
  discountCode: Maybe<TDiscountCode>;
  discountCodeRef: TReference;
  type: Scalars['String'];
};

export type TOrderEdit = TVersioned & {
  __typename?: 'OrderEdit';
  key: Maybe<Scalars['String']>;
  resourceRef: TReference;
  resource: Maybe<TOrder>;
  stagedActions: Array<TStagedOrderUpdateActionOutput>;
  result: TOrderEditResult;
  comment: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TOrderEditApplied = TMessagePayload & {
  __typename?: 'OrderEditApplied';
  result: TApplied;
  edit: Maybe<TOrderEdit>;
  editRef: TReference;
  type: Scalars['String'];
};

export type TOrderEditDraft = {
  key: Maybe<Scalars['String']>;
  resource: TReferenceInput;
  stagedActions: Array<TStagedOrderUpdateAction>;
  custom: Maybe<TCustomFieldsDraft>;
  comment: Maybe<Scalars['String']>;
  dryRun: Maybe<Scalars['Boolean']>;
};

export type TOrderEditLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'OrderEditLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TOrderEditLimitsProjection = {
  __typename?: 'OrderEditLimitsProjection';
  total: TOrderEditLimitWithCurrent;
};

export type TOrderEditQueryResult = {
  __typename?: 'OrderEditQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TOrderEdit>;
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
  totalPrice: TMoney;
  taxedPrice: Maybe<TTaxedPrice>;
  version: Maybe<Scalars['Long']>;
};

export type TOrderImported = TMessagePayload & {
  __typename?: 'OrderImported';
  order: TOrder;
  type: Scalars['String'];
};

export type TOrderLineItemAdded = TMessagePayload & {
  __typename?: 'OrderLineItemAdded';
  lineItem: TLineItem;
  addedQuantity: Scalars['Long'];
  type: Scalars['String'];
};

export type TOrderLineItemDiscountSet = TMessagePayload & {
  __typename?: 'OrderLineItemDiscountSet';
  lineItemId: Scalars['String'];
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>;
  totalPrice: TMoney;
  taxedPrice: Maybe<TTaxedItemPrice>;
  type: Scalars['String'];
};

export type TOrderLineItemDistributionChannelSet = TMessagePayload & {
  __typename?: 'OrderLineItemDistributionChannelSet';
  lineItemId: Scalars['String'];
  distributionChannel: Maybe<TChannel>;
  distributionChannelRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TOrderLineItemRemoved = TMessagePayload & {
  __typename?: 'OrderLineItemRemoved';
  lineItemId: Scalars['String'];
  removedQuantity: Scalars['Long'];
  newQuantity: Scalars['Long'];
  newState: Scalars['Set'];
  newTotalPrice: TMoney;
  newTaxedPrice: Maybe<TTaxedItemPrice>;
  newPrice: Maybe<TProductPrice>;
  newShippingDetails: Maybe<TItemShippingDetails>;
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
  paymentState: TPaymentState;
  oldPaymentState: Maybe<TPaymentState>;
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
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TOrderQueryResult = {
  __typename?: 'OrderQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TOrder>;
};

export type TOrderReturnShipmentStateChanged = TMessagePayload & {
  __typename?: 'OrderReturnShipmentStateChanged';
  returnItemId: Scalars['String'];
  returnShipmentState: TReturnShipmentState;
  type: Scalars['String'];
};

export type TOrderSearchConfiguration = {
  __typename?: 'OrderSearchConfiguration';
  status: TOrderSearchStatus;
  lastModifiedAt: Scalars['DateTime'];
  lastModifiedBy: Maybe<TInitiator>;
};

export enum TOrderSearchStatus {
  Activated = 'Activated',
  Deactivated = 'Deactivated'
}

export type TOrderShipmentStateChanged = TMessagePayload & {
  __typename?: 'OrderShipmentStateChanged';
  shipmentState: TShipmentState;
  oldShipmentState: Maybe<TShipmentState>;
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
  shippingInfo: Maybe<TShippingInfo>;
  oldShippingInfo: Maybe<TShippingInfo>;
  type: Scalars['String'];
};

export type TOrderShippingRateInputSet = TMessagePayload & {
  __typename?: 'OrderShippingRateInputSet';
  shippingRateInput: Maybe<TShippingRateInput>;
  oldShippingRateInput: Maybe<TShippingRateInput>;
  type: Scalars['String'];
};

export enum TOrderState {
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
  Complete = 'Complete',
  Open = 'Open'
}

export type TOrderStateChanged = TMessagePayload & {
  __typename?: 'OrderStateChanged';
  orderId: Scalars['String'];
  orderState: TOrderState;
  oldOrderState: Maybe<TOrderState>;
  type: Scalars['String'];
};

export type TOrderStateTransition = TMessagePayload & {
  __typename?: 'OrderStateTransition';
  force: Scalars['Boolean'];
  state: Maybe<TState>;
  oldState: Maybe<TState>;
  stateRef: TReference;
  oldStateRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TOrderStoreSet = TMessagePayload & {
  __typename?: 'OrderStoreSet';
  store: Maybe<TStore>;
  oldStore: Maybe<TStore>;
  storeRef: Maybe<TKeyReference>;
  oldStoreRef: Maybe<TKeyReference>;
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
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  measurements: Maybe<TParcelMeasurements>;
  trackingData: Maybe<TTrackingData>;
  items: Array<TDeliveryItem>;
};

export type TParcelAddedToDelivery = TMessagePayload & {
  __typename?: 'ParcelAddedToDelivery';
  delivery: TDelivery;
  parcel: TParcel;
  type: Scalars['String'];
};

export type TParcelData = {
  __typename?: 'ParcelData';
  measurements: Maybe<TParcelMeasurements>;
  trackingData: Maybe<TTrackingData>;
  items: Array<TDeliveryItem>;
};

export type TParcelDataDraftType = {
  measurements: Maybe<TParcelMeasurementsDraftType>;
  trackingData: Maybe<TTrackingDataDraftType>;
  items: Maybe<Array<TDeliveryItemDraftType>>;
};

export type TParcelItemsUpdated = TMessagePayload & {
  __typename?: 'ParcelItemsUpdated';
  deliveryId: Scalars['String'];
  parcelId: Scalars['String'];
  items: Array<TDeliveryItem>;
  oldItems: Array<TDeliveryItem>;
  type: Scalars['String'];
};

export type TParcelMeasurements = {
  __typename?: 'ParcelMeasurements';
  heightInMillimeter: Maybe<Scalars['Int']>;
  lengthInMillimeter: Maybe<Scalars['Int']>;
  widthInMillimeter: Maybe<Scalars['Int']>;
  weightInGram: Maybe<Scalars['Int']>;
};

export type TParcelMeasurementsDraftType = {
  heightInMillimeter: Maybe<Scalars['Int']>;
  lengthInMillimeter: Maybe<Scalars['Int']>;
  widthInMillimeter: Maybe<Scalars['Int']>;
  weightInGram: Maybe<Scalars['Int']>;
};

export type TParcelMeasurementsUpdated = TMessagePayload & {
  __typename?: 'ParcelMeasurementsUpdated';
  deliveryId: Scalars['String'];
  parcelId: Scalars['String'];
  measurements: Maybe<TParcelMeasurements>;
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
  key: Maybe<Scalars['String']>;
  customerRef: Maybe<TReference>;
  customer: Maybe<TCustomer>;
  anonymousId: Maybe<Scalars['String']>;
  interfaceId: Maybe<Scalars['String']>;
  amountPlanned: TMoney;
  paymentMethodInfo: TPaymentMethodInfo;
  paymentStatus: TPaymentStatus;
  transactions: Array<TTransaction>;
  interfaceInteractionsRaw: TInterfaceInteractionsRawResult;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
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
  paymentMethodInfo: Maybe<TPaymentMethodInfoInput>;
  custom: Maybe<TCustomFieldsDraft>;
  key: Maybe<Scalars['String']>;
  customer: Maybe<TResourceIdentifierInput>;
  anonymousId: Maybe<Scalars['String']>;
  interfaceId: Maybe<Scalars['String']>;
  paymentStatus: Maybe<TPaymentStatusInput>;
  transactions: Maybe<Array<TTransactionDraft>>;
  interfaceInteractions: Maybe<Array<TCustomFieldsDraft>>;
};

export type TPaymentInfo = {
  __typename?: 'PaymentInfo';
  payments: Array<TPayment>;
  paymentRefs: Array<TReference>;
};

export type TPaymentInteractionAdded = TMessagePayload & {
  __typename?: 'PaymentInteractionAdded';
  interaction: TCustomFieldsType;
  type: Scalars['String'];
};

export type TPaymentMethodInfo = {
  __typename?: 'PaymentMethodInfo';
  paymentInterface: Maybe<Scalars['String']>;
  method: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
};


export type TPaymentMethodInfo_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TPaymentMethodInfoInput = {
  paymentInterface: Maybe<Scalars['String']>;
  method: Maybe<Scalars['String']>;
  name: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TPaymentQueryResult = {
  __typename?: 'PaymentQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TPayment>;
};

export enum TPaymentState {
  Paid = 'Paid',
  CreditOwed = 'CreditOwed',
  Pending = 'Pending',
  Failed = 'Failed',
  BalanceDue = 'BalanceDue'
}

export type TPaymentStatus = {
  __typename?: 'PaymentStatus';
  interfaceCode: Maybe<Scalars['String']>;
  interfaceText: Maybe<Scalars['String']>;
  stateRef: Maybe<TReference>;
  state: Maybe<TState>;
};

export type TPaymentStatusInput = {
  interfaceCode: Maybe<Scalars['String']>;
  interfaceText: Maybe<Scalars['String']>;
  state: Maybe<TReferenceInput>;
};

export type TPaymentStatusInterfaceCodeSet = TMessagePayload & {
  __typename?: 'PaymentStatusInterfaceCodeSet';
  paymentId: Scalars['String'];
  interfaceCode: Maybe<Scalars['String']>;
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
  transactionId: Scalars['String'];
  state: TTransactionState;
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
  total: Scalars['Int'];
  results: Array<TPlainEnumValue>;
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
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type TPreviewFailure = TOrderEditResult & {
  __typename?: 'PreviewFailure';
  type: Scalars['String'];
  errors: Array<Scalars['Json']>;
};

export type TPreviewSuccess = TOrderEditResult & {
  __typename?: 'PreviewSuccess';
  type: Scalars['String'];
  preview: TOrder;
};

export type TPriceFunction = {
  __typename?: 'PriceFunction';
  function: Scalars['String'];
  currencyCode: Scalars['Currency'];
};

export type TPriceFunctionDraft = {
  function: Scalars['String'];
  currencyCode: Scalars['Currency'];
};

export type TProduct = TVersioned & TReviewTarget & {
  __typename?: 'Product';
  id: Scalars['String'];
  key: Maybe<Scalars['String']>;
  version: Scalars['Long'];
  productTypeRef: TReference;
  productType: Maybe<TProductTypeDefinition>;
  masterData: TProductCatalogData;
  skus: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  stateRef: Maybe<TReference>;
  state: Maybe<TState>;
  taxCategoryRef: Maybe<TReference>;
  taxCategory: Maybe<TTaxCategory>;
  reviewRatingStatistics: Maybe<TReviewRatingStatistics>;
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
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
  staged: Maybe<TProductData>;
  published: Scalars['Boolean'];
  hasStagedChanges: Scalars['Boolean'];
};

export type TProductCreated = TMessagePayload & {
  __typename?: 'ProductCreated';
  productProjection: TProductProjectionMessagePayload;
  type: Scalars['String'];
};

export type TProductData = {
  __typename?: 'ProductData';
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  categoryOrderHint: Maybe<Scalars['String']>;
  categoryOrderHints: Array<TCategoryOrderHint>;
  categoriesRef: Array<TReference>;
  categories: Array<TCategory>;
  searchKeyword: Maybe<Array<TSearchKeyword>>;
  searchKeywords: Array<TSearchKeywords>;
  metaTitle: Maybe<Scalars['String']>;
  metaTitleAllLocales: Maybe<Array<TLocalizedString>>;
  metaKeywords: Maybe<Scalars['String']>;
  metaKeywordsAllLocales: Maybe<Array<TLocalizedString>>;
  metaDescription: Maybe<Scalars['String']>;
  metaDescriptionAllLocales: Maybe<Array<TLocalizedString>>;
  masterVariant: TProductVariant;
  variants: Array<TProductVariant>;
  allVariants: Array<TProductVariant>;
  variant: Maybe<TProductVariant>;
  skus: Array<Scalars['String']>;
};


export type TProductData_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductData_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductData_SlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductData_CategoryOrderHintArgs = {
  categoryId: Scalars['String'];
};


export type TProductData_SearchKeywordArgs = {
  locale: Scalars['Locale'];
};


export type TProductData_MetaTitleArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductData_MetaKeywordsArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductData_MetaDescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductData_VariantsArgs = {
  skus: Maybe<Array<Scalars['String']>>;
  isOnStock: Maybe<Scalars['Boolean']>;
  stockChannelIds: Maybe<Array<Scalars['String']>>;
  hasImages: Maybe<Scalars['Boolean']>;
};


export type TProductData_AllVariantsArgs = {
  skus: Maybe<Array<Scalars['String']>>;
  isOnStock: Maybe<Scalars['Boolean']>;
  stockChannelIds: Maybe<Array<Scalars['String']>>;
  hasImages: Maybe<Scalars['Boolean']>;
};


export type TProductData_VariantArgs = {
  sku: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};

export type TProductDeleted = TMessagePayload & {
  __typename?: 'ProductDeleted';
  removedImageUrls: Scalars['Set'];
  currentProjection: Maybe<TProductProjectionMessagePayload>;
  type: Scalars['String'];
};

/**
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
 */
export type TProductDiscount = TVersioned & {
  __typename?: 'ProductDiscount';
  predicate: Scalars['String'];
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  isActive: Scalars['Boolean'];
  isValid: Scalars['Boolean'];
  sortOrder: Scalars['String'];
  key: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  referenceRefs: Array<TReference>;
  nameAllLocales: Array<TLocalizedString>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  value: TProductDiscountValue;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


/**
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
 */
export type TProductDiscount_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


/**
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
 */
export type TProductDiscount_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TProductDiscountDraft = {
  value: TProductDiscountValueInput;
  predicate: Scalars['String'];
  sortOrder: Scalars['String'];
  name: Array<TLocalizedStringItemInputType>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  isActive: Maybe<Scalars['Boolean']>;
  key: Maybe<Scalars['String']>;
};

export type TProductDiscountLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ProductDiscountLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TProductDiscountLimitsProjection = {
  __typename?: 'ProductDiscountLimitsProjection';
  totalActive: TProductDiscountLimitWithCurrent;
};

export type TProductDiscountQueryResult = {
  __typename?: 'ProductDiscountQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TProductDiscount>;
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
  relative: Maybe<TRelativeDiscountValueInput>;
  absolute: Maybe<TAbsoluteDiscountValueInput>;
  external: Maybe<TExternalDiscountValueInput>;
};

export type TProductDraft = {
  name: Array<TLocalizedStringItemInputType>;
  productType: TResourceIdentifierInput;
  slug: Array<TLocalizedStringItemInputType>;
  key: Maybe<Scalars['String']>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  categories: Maybe<Array<TResourceIdentifierInput>>;
  categoryOrderHints: Maybe<Array<TCategoryOrderHintInput>>;
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>;
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>;
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>;
  masterVariant: Maybe<TProductVariantInput>;
  variants: Maybe<Array<TProductVariantInput>>;
  taxCategory: Maybe<TResourceIdentifierInput>;
  state: Maybe<TResourceIdentifierInput>;
  searchKeywords: Maybe<Array<TSearchKeywordInput>>;
  publish: Maybe<Scalars['Boolean']>;
};

export type TProductImageAdded = TMessagePayload & {
  __typename?: 'ProductImageAdded';
  variantId: Scalars['Int'];
  image: TImage;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
};

export type TProductLimitsProjection = {
  __typename?: 'ProductLimitsProjection';
  pricesPerVariant: TLimit;
  variants: TLimit;
};

export type TProductOfSelection = {
  __typename?: 'ProductOfSelection';
  productRef: TReference;
  product: Maybe<TProduct>;
};

export type TProductOfSelectionQueryResult = {
  __typename?: 'ProductOfSelectionQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TProductOfSelection>;
};

export type TProductPrice = {
  __typename?: 'ProductPrice';
  id: Maybe<Scalars['String']>;
  value: TBaseMoney;
  country: Maybe<Scalars['Country']>;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroupRef: Maybe<TReference>;
  channel: Maybe<TChannel>;
  channelRef: Maybe<TReference>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  discounted: Maybe<TDiscountedProductPriceValue>;
  tiers: Maybe<Array<TProductPriceTier>>;
  custom: Maybe<TCustomFieldsType>;
};

export type TProductPriceDataInput = {
  value: TBaseMoneyInput;
  country: Maybe<Scalars['Country']>;
  customerGroup: Maybe<TReferenceInput>;
  channel: Maybe<TResourceIdentifierInput>;
  validFrom: Maybe<Scalars['DateTime']>;
  validUntil: Maybe<Scalars['DateTime']>;
  tiers: Maybe<Array<TProductPriceTierInput>>;
  custom: Maybe<TCustomFieldsDraft>;
};

export type TProductPriceDiscountUpdateMessagePayload = {
  __typename?: 'ProductPriceDiscountUpdateMessagePayload';
  variantId: Scalars['Int'];
  variantKey: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  priceId: Scalars['String'];
  discounted: Maybe<TDiscountedProductPriceValue>;
  staged: Scalars['Boolean'];
};

export type TProductPriceDiscountsSet = TMessagePayload & {
  __typename?: 'ProductPriceDiscountsSet';
  updatedPrices: Array<TProductPriceDiscountUpdateMessagePayload>;
  type: Scalars['String'];
};

export type TProductPriceExternalDiscountSet = TMessagePayload & {
  __typename?: 'ProductPriceExternalDiscountSet';
  variantId: Scalars['Int'];
  variantKey: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  priceId: Scalars['String'];
  discounted: Maybe<TDiscountedProductPriceValue>;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
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

export type TProductProjectionMessagePayload = {
  __typename?: 'ProductProjectionMessagePayload';
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  productTypeRef: TReference;
  productType: Maybe<TProductTypeDefinition>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  categoryOrderHints: Array<TCategoryOrderHint>;
  categoriesRef: Array<TReference>;
  categories: Array<TCategory>;
  searchKeywords: Array<TSearchKeywords>;
  metaTitle: Maybe<Scalars['String']>;
  metaTitleAllLocales: Maybe<Array<TLocalizedString>>;
  metaKeywords: Maybe<Scalars['String']>;
  metaKeywordsAllLocales: Maybe<Array<TLocalizedString>>;
  metaDescription: Maybe<Scalars['String']>;
  metaDescriptionAllLocales: Maybe<Array<TLocalizedString>>;
  hasStagedChanges: Scalars['Boolean'];
  published: Scalars['Boolean'];
  /** @deprecated This field has been removed and will return a HTTP code 400 with X-DEPRECATION-NOTICE when used. Please use 'masterVariant' */
  masterData: TProductVariant;
  masterVariant: TProductVariant;
  variants: Array<TProductVariant>;
  taxCategoryRef: Maybe<TReference>;
  taxCategory: Maybe<TTaxCategory>;
  stateRef: Maybe<TReference>;
  state: Maybe<TState>;
  reviewRatingStatistics: Maybe<TReviewRatingStatistics>;
};


export type TProductProjectionMessagePayload_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductProjectionMessagePayload_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductProjectionMessagePayload_SlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductProjectionMessagePayload_MetaTitleArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductProjectionMessagePayload_MetaKeywordsArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductProjectionMessagePayload_MetaDescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
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
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TProduct>;
};

export type TProductReferenceIdentifier = {
  __typename?: 'ProductReferenceIdentifier';
  typeId: Scalars['String'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
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

export type TProductSelection = TVersioned & {
  __typename?: 'ProductSelection';
  key: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  assignedProductRefs: TProductOfSelectionQueryResult;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


export type TProductSelection_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductSelection_AssignedProductRefsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TProductSelectionCreated = TMessagePayload & {
  __typename?: 'ProductSelectionCreated';
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  type: Scalars['String'];
};


export type TProductSelectionCreated_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TProductSelectionDeleted = TMessagePayload & {
  __typename?: 'ProductSelectionDeleted';
  type: Scalars['String'];
};

export type TProductSelectionProductAdded = TMessagePayload & {
  __typename?: 'ProductSelectionProductAdded';
  product: Maybe<TProduct>;
  productRef: TReference;
  type: Scalars['String'];
};

export type TProductSelectionProductRemoved = TMessagePayload & {
  __typename?: 'ProductSelectionProductRemoved';
  product: Maybe<TProduct>;
  productRef: TReference;
  type: Scalars['String'];
};

export type TProductSelectionQueryResult = {
  __typename?: 'ProductSelectionQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TProductSelection>;
};

export type TProductSelectionSetting = {
  __typename?: 'ProductSelectionSetting';
  productSelectionRef: TReference;
  productSelection: Maybe<TProductSelection>;
  active: Maybe<Scalars['Boolean']>;
};

export type TProductSelectionSettingDraft = {
  productSelection: TResourceIdentifierInput;
  active: Scalars['Boolean'];
};

export type TProductSelectionSettingInActionInput = {
  productSelection: TResourceIdentifierInput;
  active: Maybe<Scalars['Boolean']>;
};

export type TProductSelectionUpdateAction = {
  addProduct: Maybe<TAddProductSelectionProduct>;
  changeName: Maybe<TChangeProductSelectionName>;
  removeProduct: Maybe<TRemoveProductSelectionProduct>;
  setKey: Maybe<TSetProductSelectionKey>;
};

export type TProductSlugChanged = TMessagePayload & {
  __typename?: 'ProductSlugChanged';
  slug: Maybe<Scalars['String']>;
  oldSlug: Maybe<Scalars['String']>;
  slugAllLocales: Array<TLocalizedString>;
  oldSlugAllLocales: Maybe<Array<TLocalizedString>>;
  type: Scalars['String'];
};


export type TProductSlugChanged_SlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TProductSlugChanged_OldSlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
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
  key: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description: Scalars['String'];
  attributeDefinitions: TAttributeDefinitionResult;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


export type TProductTypeDefinition_AttributeDefinitionsArgs = {
  includeNames: Maybe<Array<Scalars['String']>>;
  excludeNames: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  sort: Maybe<Array<Scalars['String']>>;
};

export type TProductTypeDefinitionQueryResult = {
  __typename?: 'ProductTypeDefinitionQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TProductTypeDefinition>;
};

export type TProductTypeDraft = {
  name: Scalars['String'];
  description: Scalars['String'];
  key: Maybe<Scalars['String']>;
  attributeDefinitions: Maybe<Array<TAttributeDefinitionDraft>>;
};

export type TProductTypeLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ProductTypeLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TProductTypeLimitsProjection = {
  __typename?: 'ProductTypeLimitsProjection';
  total: TProductTypeLimitWithCurrent;
};

export type TProductTypeUpdateAction = {
  setKey: Maybe<TSetKey>;
  changeName: Maybe<TChangeName>;
  changeDescription: Maybe<TChangeDescription>;
  removeAttributeDefinition: Maybe<TRemoveAttributeDefinition>;
  changeLabel: Maybe<TChangeLabel>;
  setInputTip: Maybe<TSetInputTip>;
  changeIsSearchable: Maybe<TChangeIsSearchable>;
  changeInputHint: Maybe<TChangeInputHint>;
  addAttributeDefinition: Maybe<TAddAttributeDefinition>;
  changeAttributeOrder: Maybe<TChangeAttributeOrder>;
  changeAttributeOrderByName: Maybe<TChangeAttributeOrderByName>;
  removeEnumValues: Maybe<TRemoveEnumValues>;
  addPlainEnumValue: Maybe<TAddPlainEnumValue>;
  changePlainEnumValueLabel: Maybe<TChangePlainEnumValueLabel>;
  changePlainEnumValueOrder: Maybe<TChangePlainEnumValueOrder>;
  addLocalizedEnumValue: Maybe<TAddLocalizedEnumValue>;
  changeLocalizedEnumValueLabel: Maybe<TChangeLocalizedEnumValueLabel>;
  changeLocalizedEnumValueOrder: Maybe<TChangeLocalizedEnumValueOrder>;
  changeAttributeName: Maybe<TChangeAttributeName>;
  changeEnumKey: Maybe<TChangeEnumKey>;
};

export type TProductUnpublished = TMessagePayload & {
  __typename?: 'ProductUnpublished';
  type: Scalars['String'];
};

export type TProductUpdateAction = {
  moveImageToPosition: Maybe<TMoveProductImageToPosition>;
  setSearchKeywords: Maybe<TSetSearchKeywords>;
  revertStagedChanges: Maybe<TRevertStagedChanges>;
  revertStagedVariantChanges: Maybe<TRevertStagedVariantChanges>;
  publish: Maybe<TPublishProduct>;
  unpublish: Maybe<TUnpublishProduct>;
  transitionState: Maybe<TTransitionProductState>;
  addAsset: Maybe<TAddProductAsset>;
  addExternalImage: Maybe<TAddProductExternalImage>;
  addPrice: Maybe<TAddProductPrice>;
  addToCategory: Maybe<TAddProductToCategory>;
  addVariant: Maybe<TAddProductVariant>;
  changeAssetName: Maybe<TChangeProductAssetName>;
  changeAssetOrder: Maybe<TChangeProductAssetOrder>;
  changeMasterVariant: Maybe<TChangeProductMasterVariant>;
  changeImageLabel: Maybe<TChangeProductImageLabel>;
  changeName: Maybe<TChangeProductName>;
  changePrice: Maybe<TChangeProductPrice>;
  changeSlug: Maybe<TChangeProductSlug>;
  removeAsset: Maybe<TRemoveProductAsset>;
  removeFromCategory: Maybe<TRemoveProductFromCategory>;
  removeImage: Maybe<TRemoveProductImage>;
  removePrice: Maybe<TRemoveProductPrice>;
  removeVariant: Maybe<TRemoveProductVariant>;
  setAssetCustomField: Maybe<TSetProductAssetCustomField>;
  setAssetCustomType: Maybe<TSetProductAssetCustomType>;
  setAssetDescription: Maybe<TSetProductAssetDescription>;
  setAssetKey: Maybe<TSetProductAssetKey>;
  setAssetSources: Maybe<TSetProductAssetSources>;
  setAssetTags: Maybe<TSetProductAssetTags>;
  setCategoryOrderHint: Maybe<TSetProductCategoryOrderHint>;
  setDiscountedPrice: Maybe<TSetProductDiscountedPrice>;
  setAttribute: Maybe<TSetProductAttribute>;
  setAttributeInAllVariants: Maybe<TSetProductAttributeInAllVariants>;
  setDescription: Maybe<TSetProductDescription>;
  setImageLabel: Maybe<TSetProductImageLabel>;
  setKey: Maybe<TSetProductKey>;
  setMetaAttributes: Maybe<TSetProductMetaAttributes>;
  setMetaDescription: Maybe<TSetProductMetaDescription>;
  setMetaKeywords: Maybe<TSetProductMetaKeywords>;
  setMetaTitle: Maybe<TSetProductMetaTitle>;
  setProductPriceCustomField: Maybe<TSetProductPriceCustomField>;
  setProductPriceCustomType: Maybe<TSetProductPriceCustomType>;
  setPrices: Maybe<TSetProductPrices>;
  setSku: Maybe<TSetProductSku>;
  setTaxCategory: Maybe<TSetProductTaxCategory>;
  setProductVariantKey: Maybe<TSetProductVariantKey>;
};

export type TProductVariant = {
  __typename?: 'ProductVariant';
  id: Scalars['Int'];
  key: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  prices: Maybe<Array<TProductPrice>>;
  /** Returns a single price based on the price selection rules. */
  price: Maybe<TProductPrice>;
  images: Array<TImage>;
  assets: Array<TAsset>;
  availability: Maybe<TProductVariantAvailabilityWithChannels>;
  /** This field contains raw attributes data */
  attributesRaw: Array<TRawProductAttribute>;
};


export type TProductVariant_PriceArgs = {
  currency: Scalars['Currency'];
  country: Maybe<Scalars['Country']>;
  customerGroupId: Maybe<Scalars['String']>;
  channelId: Maybe<Scalars['String']>;
  date: Maybe<Scalars['DateTime']>;
};


export type TProductVariant_AttributesRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>;
  excludeNames: Maybe<Array<Scalars['String']>>;
};

export type TProductVariantAdded = TMessagePayload & {
  __typename?: 'ProductVariantAdded';
  variant: TProductVariant;
  staged: Scalars['Boolean'];
  type: Scalars['String'];
};

/** Product variant availabilities */
export type TProductVariantAvailabilitiesResult = {
  __typename?: 'ProductVariantAvailabilitiesResult';
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  total: Scalars['Int'];
  results: Array<TProductVariantAvailabilityWithChannel>;
};

/** Product variant availability */
export type TProductVariantAvailability = {
  __typename?: 'ProductVariantAvailability';
  isOnStock: Scalars['Boolean'];
  restockableInDays: Maybe<Scalars['Int']>;
  availableQuantity: Maybe<Scalars['Long']>;
};

export type TProductVariantAvailabilityWithChannel = {
  __typename?: 'ProductVariantAvailabilityWithChannel';
  channelRef: TReference;
  channel: Maybe<TChannel>;
  availability: TProductVariantAvailability;
};

export type TProductVariantAvailabilityWithChannels = {
  __typename?: 'ProductVariantAvailabilityWithChannels';
  noChannel: Maybe<TProductVariantAvailability>;
  channels: TProductVariantAvailabilitiesResult;
};


export type TProductVariantAvailabilityWithChannels_ChannelsArgs = {
  includeChannelIds: Maybe<Array<Scalars['String']>>;
  excludeChannelIds: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TProductVariantDeleted = TMessagePayload & {
  __typename?: 'ProductVariantDeleted';
  removedImageUrls: Scalars['Set'];
  variant: Maybe<TProductVariant>;
  type: Scalars['String'];
};

export type TProductVariantInput = {
  sku: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  prices: Maybe<Array<TProductPriceDataInput>>;
  images: Maybe<Array<TImageInput>>;
  attributes: Maybe<Array<TProductAttributeInput>>;
  assets: Maybe<Array<TAssetDraftInput>>;
};

/** Contains information about the limits of your project. */
export type TProjectCustomLimitsProjection = {
  __typename?: 'ProjectCustomLimitsProjection';
  query: TQueryLimitsProjection;
  products: TProductLimitsProjection;
  shoppingLists: TShoppingListLimitsProjection;
  extensions: TExtensionLimitsProjection;
  productDiscounts: TProductDiscountLimitsProjection;
  cartDiscounts: TCartDiscountLimitsProjection;
  orderEdits: TOrderEditLimitsProjection;
  stores: TStoreLimitsProjection;
  customers: TCustomerLimitsProjection;
  customerGroups: TCustomerGroupLimitsProjection;
  zones: TZoneLimitsProjection;
  taxCategories: TTaxCategoryLimitsProjection;
  refreshTokens: TRefreshTokenLimitsProjection;
  shippingMethods: TShippingMethodLimitsProjection;
  carts: TCartLimitsProjection;
  customObjects: TCustomObjectLimitsProjection;
  search: TSearchLimitsProjection;
  category: TCategoryLimitsProjection;
  productType: TProductTypeLimitsProjection;
};

/** Project contains information about project. */
export type TProjectProjection = {
  __typename?: 'ProjectProjection';
  key: Scalars['String'];
  name: Scalars['String'];
  languages: Array<Scalars['Locale']>;
  createdAt: Scalars['DateTime'];
  trialUntil: Maybe<Scalars['YearMonth']>;
  carts: TCartsConfiguration;
  shoppingLists: TShoppingListsConfiguration;
  version: Scalars['Long'];
  externalOAuth: Maybe<TExternalOAuth>;
  searchIndexing: Maybe<TSearchIndexingConfiguration>;
  messages: TMessagesConfiguration;
  countries: Array<Scalars['Country']>;
  currencies: Array<Scalars['Currency']>;
  shippingRateInputType: Maybe<TShippingRateInputType>;
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

export type TQuery = TCartQueryInterface & TCustomerActiveCartInterface & TOrderQueryInterface & TCustomerQueryInterface & TShoppingListQueryInterface & TShippingMethodsByCartInterface & TMeFieldInterface & {
  __typename?: 'Query';
  /**
   * This field can only be used with an access token created with the password flow or with an anonymous session.
   *
   * It gives access to the data that is specific to the customer or the anonymous session linked to the access token.
   */
  me: TMe;
  /** This field gives access to the resources (such as carts) that are inside the given store. Currently in beta. */
  inStore: TInStore;
  /** This field gives access to the resources (such as carts) that are inside one of the given stores. Currently in beta. */
  inStores: TInStore;
  customerGroup: Maybe<TCustomerGroup>;
  customerGroups: TCustomerGroupQueryResult;
  category: Maybe<TCategory>;
  categories: TCategoryQueryResult;
  /** Autocomplete the categories based on category fields like name, description, etc. */
  categoryAutocomplete: TCategorySearchResult;
  /** Search the categories using full-text search, filtering and sorting */
  categorySearch: TCategorySearchResult;
  channel: Maybe<TChannel>;
  channels: TChannelQueryResult;
  customObject: Maybe<TCustomObject>;
  customObjects: TCustomObjectQueryResult;
  productType: Maybe<TProductTypeDefinition>;
  productTypes: TProductTypeDefinitionQueryResult;
  typeDefinition: Maybe<TTypeDefinition>;
  typeDefinitions: TTypeDefinitionQueryResult;
  shippingMethod: Maybe<TShippingMethod>;
  shippingMethods: TShippingMethodQueryResult;
  shippingMethodsByCart: Array<TShippingMethod>;
  shippingMethodsByLocation: Array<TShippingMethod>;
  zone: Maybe<TZone>;
  zones: TZoneQueryResult;
  taxCategory: Maybe<TTaxCategory>;
  taxCategories: TTaxCategoryQueryResult;
  discountCode: Maybe<TDiscountCode>;
  discountCodes: TDiscountCodeQueryResult;
  cartDiscount: Maybe<TCartDiscount>;
  cartDiscounts: TCartDiscountQueryResult;
  productDiscount: Maybe<TProductDiscount>;
  productDiscounts: TProductDiscountQueryResult;
  product: Maybe<TProduct>;
  products: TProductQueryResult;
  state: Maybe<TState>;
  states: TStateQueryResult;
  customer: Maybe<TCustomer>;
  customers: TCustomerQueryResult;
  inventoryEntry: Maybe<TInventoryEntry>;
  inventoryEntries: TInventoryEntryQueryResult;
  cart: Maybe<TCart>;
  carts: TCartQueryResult;
  customerActiveCart: Maybe<TCart>;
  message: Maybe<TMessage>;
  messages: TMessageQueryResult;
  order: Maybe<TOrder>;
  orders: TOrderQueryResult;
  orderEdit: Maybe<TOrderEdit>;
  orderEdits: TOrderEditQueryResult;
  shoppingList: Maybe<TShoppingList>;
  shoppingLists: TShoppingListQueryResult;
  payment: Maybe<TPayment>;
  payments: TPaymentQueryResult;
  productSelection: Maybe<TProductSelection>;
  productSelections: TProductSelectionQueryResult;
  productProjectionsSuggest: TSuggestResult;
  project: TProjectProjection;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  store: Maybe<TStore>;
  /** BETA: This feature can be subject to change and should be used carefully in production. https://docs.commercetools.com/api/contract#beta-features */
  stores: TStoreQueryResult;
  review: Maybe<TReview>;
  reviews: TReviewQueryResult;
  subscription: Maybe<TCommercetoolsSubscription>;
  subscriptions: TCommercetoolsSubscriptionQueryResult;
  extension: Maybe<TExtension>;
  extensions: TExtensionQueryResult;
  apiClient: Maybe<TApiClientWithoutSecret>;
  apiClients: TApiClientWithoutSecretQueryResult;
  limits: TProjectCustomLimitsProjection;
};


export type TQuery_InStoreArgs = {
  key: Scalars['KeyReferenceInput'];
};


export type TQuery_InStoresArgs = {
  keys: Array<Scalars['KeyReferenceInput']>;
};


export type TQuery_CustomerGroupArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_CustomerGroupsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_CategoryArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_CategoriesArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_CategoryAutocompleteArgs = {
  locale: Scalars['Locale'];
  text: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  filters: Maybe<Array<Scalars['SearchFilter']>>;
};


export type TQuery_CategorySearchArgs = {
  fulltext: Maybe<TLocalizedText>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  queryFilters: Maybe<Array<Scalars['SearchFilter']>>;
  filters: Maybe<Array<Scalars['SearchFilter']>>;
  sorts: Maybe<Array<Scalars['SearchSort']>>;
};


export type TQuery_ChannelArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ChannelsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_CustomObjectArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  container: Maybe<Scalars['String']>;
};


export type TQuery_CustomObjectsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  container: Scalars['String'];
};


export type TQuery_ProductTypeArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ProductTypesArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_TypeDefinitionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_TypeDefinitionsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ShippingMethodArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ShippingMethodsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ShippingMethodsByCartArgs = {
  id: Scalars['String'];
};


export type TQuery_ShippingMethodsByLocationArgs = {
  country: Scalars['Country'];
  state: Maybe<Scalars['String']>;
  currency: Maybe<Scalars['Currency']>;
};


export type TQuery_ZoneArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ZonesArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_TaxCategoryArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_TaxCategoriesArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_DiscountCodeArgs = {
  id: Scalars['String'];
};


export type TQuery_DiscountCodesArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_CartDiscountArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_CartDiscountsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ProductDiscountArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ProductDiscountsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ProductArgs = {
  sku: Maybe<Scalars['String']>;
  variantKey: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ProductsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
  skus: Maybe<Array<Scalars['String']>>;
};


export type TQuery_StateArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_StatesArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_CustomerArgs = {
  emailToken: Maybe<Scalars['String']>;
  passwordToken: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_CustomersArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_InventoryEntryArgs = {
  id: Scalars['String'];
};


export type TQuery_InventoryEntriesArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_CartArgs = {
  id: Scalars['String'];
};


export type TQuery_CartsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_CustomerActiveCartArgs = {
  customerId: Scalars['String'];
};


export type TQuery_MessageArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_MessagesArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_OrderArgs = {
  id: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
};


export type TQuery_OrdersArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_OrderEditArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_OrderEditsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ShoppingListArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_PaymentArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_PaymentsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ProductSelectionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ProductSelectionsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ProductProjectionsSuggestArgs = {
  searchKeywords: Array<TSearchKeywordArgument>;
  fuzzy: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
  staged?: Maybe<Scalars['Boolean']>;
};


export type TQuery_StoreArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_StoresArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ReviewArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ReviewsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_SubscriptionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_SubscriptionsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ExtensionArgs = {
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};


export type TQuery_ExtensionsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};


export type TQuery_ApiClientArgs = {
  id: Scalars['String'];
};


export type TQuery_ApiClientsArgs = {
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TQueryLimitsProjection = {
  __typename?: 'QueryLimitsProjection';
  offset: TLimit;
};

export type TRawCustomField = {
  __typename?: 'RawCustomField';
  name: Scalars['String'];
  value: Scalars['Json'];
};

export type TRawProductAttribute = {
  __typename?: 'RawProductAttribute';
  name: Scalars['String'];
  value: Scalars['Json'];
  attributeDefinition: Maybe<TAttributeDefinition>;
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
  typeId: Scalars['String'];
  id: Scalars['String'];
};

export type TReferenceAttribute = TAttribute & {
  __typename?: 'ReferenceAttribute';
  typeId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type TReferenceAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'ReferenceAttributeDefinitionType';
  referenceTypeId: Scalars['String'];
  name: Scalars['String'];
};

export type TReferenceField = TCustomField & {
  __typename?: 'ReferenceField';
  typeId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type TReferenceId = {
  __typename?: 'ReferenceId';
  typeId: Scalars['String'];
  id: Scalars['String'];
};

export type TReferenceInput = {
  typeId: Scalars['String'];
  id: Scalars['String'];
};

export type TReferenceType = TFieldType & {
  __typename?: 'ReferenceType';
  referenceTypeId: Scalars['String'];
  name: Scalars['String'];
};

export type TReferenceTypeDefinitionDraft = {
  referenceTypeId: Scalars['String'];
};

export type TRefreshTokenLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'RefreshTokenLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
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
  lineItemId: Scalars['String'];
  quantity: Maybe<Scalars['Long']>;
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  shippingDetailsToRemove: Maybe<TItemShippingDetailsDraft>;
};

export type TRemoveCartPayment = {
  payment: TResourceIdentifierInput;
};

export type TRemoveCategoryAsset = {
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
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
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TRemoveProductFromCategory = {
  category: TResourceIdentifierInput;
  staged: Maybe<Scalars['Boolean']>;
};

export type TRemoveProductImage = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  staged: Maybe<Scalars['Boolean']>;
};

export type TRemoveProductPrice = {
  priceId: Maybe<Scalars['String']>;
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  price: Maybe<TProductPriceDataInput>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TRemoveProductSelectionProduct = {
  product: TResourceIdentifierInput;
};

export type TRemoveProductVariant = {
  id: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TRemoveShippingMethodShippingRate = {
  zone: TResourceIdentifierInput;
  shippingRate: TShippingRateDraft;
};

export type TRemoveShippingMethodZone = {
  zone: TResourceIdentifierInput;
};

export type TRemoveShoppingListLineItem = {
  lineItemId: Scalars['String'];
  quantity: Maybe<Scalars['Int']>;
};

export type TRemoveShoppingListTextLineItem = {
  textLineItemId: Scalars['String'];
  quantity: Maybe<Scalars['Int']>;
};

export type TRemoveStagedOrderCustomLineItem = {
  customLineItemId: Scalars['String'];
};

export type TRemoveStagedOrderCustomLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderCustomLineItemOutput';
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
};

export type TRemoveStagedOrderDelivery = {
  deliveryId: Scalars['String'];
};

export type TRemoveStagedOrderDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderDeliveryOutput';
  type: Scalars['String'];
  deliveryId: Scalars['String'];
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
  type: Scalars['String'];
  addressKey: Scalars['String'];
};

export type TRemoveStagedOrderLineItem = {
  lineItemId: Scalars['String'];
  quantity: Maybe<Scalars['Long']>;
  externalPrice: Maybe<TBaseMoneyInput>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
  shippingDetailsToRemove: Maybe<TItemShippingDetailsDraftType>;
};

export type TRemoveStagedOrderLineItemOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderLineItemOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  quantity: Maybe<Scalars['Long']>;
  externalPrice: Maybe<TBaseMoney>;
  externalTotalPrice: Maybe<TExternalLineItemTotalPrice>;
  shippingDetailsToRemove: Maybe<TItemShippingDetailsDraftOutput>;
};

export type TRemoveStagedOrderParcelFromDelivery = {
  parcelId: Scalars['String'];
};

export type TRemoveStagedOrderParcelFromDeliveryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderParcelFromDeliveryOutput';
  type: Scalars['String'];
  parcelId: Scalars['String'];
};

export type TRemoveStagedOrderPayment = {
  payment: TResourceIdentifierInput;
};

export type TRemoveStagedOrderPaymentOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'RemoveStagedOrderPaymentOutput';
  type: Scalars['String'];
  paymentResId: TResourceIdentifier;
};

export type TRemoveStateRoles = {
  roles: Array<TStateRole>;
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

export type TResourceIdentifier = {
  __typename?: 'ResourceIdentifier';
  typeId: Scalars['String'];
  key: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
};

export type TResourceIdentifierInput = {
  typeId: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};

/** Stores information about returns connected to this order. */
export type TReturnInfo = {
  __typename?: 'ReturnInfo';
  items: Array<TReturnItem>;
  returnTrackingId: Maybe<Scalars['String']>;
  returnDate: Maybe<Scalars['DateTime']>;
};

export type TReturnInfoAdded = TMessagePayload & {
  __typename?: 'ReturnInfoAdded';
  returnInfo: TReturnInfo;
  type: Scalars['String'];
};

export type TReturnItem = {
  type: Scalars['String'];
  id: Scalars['String'];
  quantity: Scalars['Long'];
  comment: Maybe<Scalars['String']>;
  shipmentState: TReturnShipmentState;
  paymentState: TReturnPaymentState;
  lastModifiedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
};

export type TReturnItemDraftType = {
  quantity: Scalars['Long'];
  lineItemId: Maybe<Scalars['String']>;
  customLineItemId: Maybe<Scalars['String']>;
  comment: Maybe<Scalars['String']>;
  shipmentState: TReturnShipmentState;
};

export type TReturnItemDraftTypeOutput = {
  __typename?: 'ReturnItemDraftTypeOutput';
  quantity: Scalars['Long'];
  lineItemId: Maybe<Scalars['String']>;
  customLineItemId: Maybe<Scalars['String']>;
  comment: Maybe<Scalars['String']>;
  shipmentState: TReturnShipmentState;
};

export enum TReturnPaymentState {
  NotRefunded = 'NotRefunded',
  Refunded = 'Refunded',
  Initial = 'Initial',
  NonRefundable = 'NonRefundable'
}

export enum TReturnShipmentState {
  Unusable = 'Unusable',
  BackInStock = 'BackInStock',
  Returned = 'Returned',
  Advised = 'Advised'
}

export type TRevertStagedChanges = {
  dummy: Maybe<Scalars['String']>;
};

export type TRevertStagedVariantChanges = {
  variantId: Scalars['Int'];
};

export type TReview = TVersioned & {
  __typename?: 'Review';
  key: Maybe<Scalars['String']>;
  uniquenessValue: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['Locale']>;
  authorName: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  text: Maybe<Scalars['String']>;
  targetRef: Maybe<TReference>;
  target: Maybe<TReviewTarget>;
  rating: Maybe<Scalars['Int']>;
  stateRef: Maybe<TReference>;
  state: Maybe<TState>;
  includedInStatistics: Scalars['Boolean'];
  customerRef: Maybe<TReference>;
  customer: Maybe<TCustomer>;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TReviewCreated = TMessagePayload & {
  __typename?: 'ReviewCreated';
  review: TReview;
  type: Scalars['String'];
};

export type TReviewDraft = {
  key: Maybe<Scalars['String']>;
  uniquenessValue: Maybe<Scalars['String']>;
  locale: Maybe<Scalars['Locale']>;
  authorName: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  text: Maybe<Scalars['String']>;
  target: Maybe<TTargetReferenceInput>;
  state: Maybe<TResourceIdentifierInput>;
  rating: Maybe<Scalars['Int']>;
  customer: Maybe<TResourceIdentifierInput>;
  custom: Maybe<TCustomFieldsDraft>;
};

export type TReviewQueryResult = {
  __typename?: 'ReviewQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TReview>;
};

export type TReviewRatingSet = TMessagePayload & {
  __typename?: 'ReviewRatingSet';
  oldRating: Maybe<Scalars['Int']>;
  newRating: Maybe<Scalars['Int']>;
  includedInStatistics: Scalars['Boolean'];
  target: Maybe<TReviewTarget>;
  targetRef: Maybe<TReference>;
  type: Scalars['String'];
};

export type TReviewRatingStatistics = {
  __typename?: 'ReviewRatingStatistics';
  averageRating: Scalars['Float'];
  highestRating: Scalars['Int'];
  lowestRating: Scalars['Int'];
  count: Scalars['Long'];
  ratingsDistribution: Scalars['Json'];
};

export type TReviewStateTransition = TMessagePayload & {
  __typename?: 'ReviewStateTransition';
  oldIncludedInStatistics: Scalars['Boolean'];
  newIncludedInStatistics: Scalars['Boolean'];
  force: Scalars['Boolean'];
  target: Maybe<TReviewTarget>;
  oldState: Maybe<TState>;
  newState: Maybe<TState>;
  targetRef: Maybe<TReference>;
  oldStateRef: Maybe<TReference>;
  newStateRef: TReference;
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
  /** [Round half up](https://en.wikipedia.org/wiki/Rounding#Round_half_up) */
  HalfUp = 'HalfUp',
  /** [Round half to even](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even). Default rounding mode as used in IEEE 754 computing functions and operators. */
  HalfEven = 'HalfEven'
}

export type TSnsDestination = TDestination & {
  __typename?: 'SNSDestination';
  topicArn: Scalars['String'];
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
  type: Scalars['String'];
};

export type TSnsDestinationInput = {
  topicArn: Scalars['String'];
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
};

export type TSqsDestination = TDestination & {
  __typename?: 'SQSDestination';
  queueUrl: Scalars['String'];
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
  region: Scalars['String'];
  type: Scalars['String'];
};

export type TSqsDestinationInput = {
  queueUrl: Scalars['String'];
  accessKey: Scalars['String'];
  accessSecret: Scalars['String'];
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


export type TSearchIndexingConfiguration = {
  __typename?: 'SearchIndexingConfiguration';
  products: Maybe<TSearchIndexingConfigurationValues>;
  orders: Maybe<TOrderSearchConfiguration>;
};

export type TSearchIndexingConfigurationValues = {
  __typename?: 'SearchIndexingConfigurationValues';
  status: Maybe<TSearchIndexingStatus>;
  lastModifiedAt: Maybe<Scalars['DateTime']>;
  lastModifiedBy: Maybe<TInitiator>;
};

export enum TSearchIndexingStatus {
  Activated = 'Activated',
  Indexing = 'Indexing',
  Deactivated = 'Deactivated'
}

export type TSearchKeyword = {
  __typename?: 'SearchKeyword';
  text: Scalars['String'];
  suggestTokenizer: Maybe<TSuggestTokenizer>;
};

export type TSearchKeywordArgument = {
  searchKeyword: Scalars['String'];
  locale: Scalars['Locale'];
};

export type TSearchKeywordInput = {
  locale: Scalars['Locale'];
  keywords: Array<TSearchKeywordItemInput>;
};

export type TSearchKeywordItemInput = {
  text: Scalars['String'];
  suggestTokenizer: Maybe<TBaseSearchKeywordInput>;
};

export type TSearchKeywords = {
  __typename?: 'SearchKeywords';
  locale: Scalars['Locale'];
  searchKeywords: Array<TSearchKeyword>;
};

export type TSearchLimitsProjection = {
  __typename?: 'SearchLimitsProjection';
  maxTextSize: TLimit;
};


/** In order to decide which of the matching items will actually be discounted */
export enum TSelectionMode {
  MostExpensive = 'MostExpensive',
  Cheapest = 'Cheapest'
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  taxCategory: Maybe<TResourceIdentifierInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetCartCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  lineItemId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetCartLineItemDistributionChannel = {
  lineItemId: Scalars['String'];
  distributionChannel: Maybe<TResourceIdentifierInput>;
};

export type TSetCartLineItemPrice = {
  lineItemId: Scalars['String'];
  externalPrice: Maybe<TBaseMoneyInput>;
};

export type TSetCartLineItemShippingDetails = {
  lineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraft>;
};

export type TSetCartLineItemTaxAmount = {
  lineItemId: Scalars['String'];
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
};

export type TSetCartLineItemTaxRate = {
  lineItemId: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetCartLineItemTotalPrice = {
  lineItemId: Scalars['String'];
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetCartShippingMethod = {
  shippingMethod: Maybe<TResourceIdentifierInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
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
  externalTotalGross: Maybe<TMoneyInput>;
  externalTaxPortions: Maybe<Array<TTaxPortionDraft>>;
};

export type TSetCategoryAssetCustomField = {
  value: Maybe<Scalars['String']>;
  name: Scalars['String'];
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetCategoryAssetCustomType = {
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
  type: Maybe<TResourceIdentifierInput>;
  fields: Maybe<Array<TCustomFieldInput>>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetCategoryAssetDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetCategoryAssetKey = {
  assetKey: Maybe<Scalars['String']>;
  assetId: Scalars['String'];
};

export type TSetCategoryAssetSources = {
  sources: Maybe<Array<TAssetSourceInput>>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetCategoryAssetTags = {
  tags: Maybe<Array<Scalars['String']>>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetCategoryCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetCategoryCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetChannelCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetChannelCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetChannelGeoLocation = {
  geoLocation: Maybe<TGeometryInput>;
};

export type TSetChannelRoles = {
  roles: Array<TChannelRole>;
};

export type TSetCustomerAddressCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
  addressId: Scalars['String'];
};

export type TSetCustomerAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
  addressId: Scalars['String'];
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
  type: Maybe<TResourceIdentifierInput>;
  fields: Maybe<Array<TCustomFieldInput>>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
  type: Maybe<TResourceIdentifierInput>;
  fields: Maybe<Array<TCustomFieldInput>>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetOrderCustomLineItemShippingDetails = {
  customLineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
};

export type TSetOrderCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetOrderCustomerEmail = {
  email: Maybe<Scalars['String']>;
};

export type TSetOrderCustomerId = {
  customerId: Maybe<Scalars['String']>;
};

export type TSetOrderDeliveryAddress = {
  deliveryId: Scalars['String'];
  address: Maybe<TAddressInput>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetOrderLineItemCustomField = {
  lineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetOrderLineItemCustomType = {
  lineItemId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  parcelId: Scalars['String'];
  items: Array<TDeliveryItemDraftType>;
};

export type TSetOrderParcelMeasurements = {
  parcelId: Scalars['String'];
  measurements: Maybe<TParcelMeasurementsDraftType>;
};

export type TSetOrderParcelTrackingData = {
  parcelId: Scalars['String'];
  trackingData: Maybe<TTrackingDataDraftType>;
};

export type TSetOrderReturnPaymentState = {
  returnItemId: Scalars['String'];
  paymentState: TReturnPaymentState;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  value: Maybe<Scalars['String']>;
  name: Scalars['String'];
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetProductAssetCustomType = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  typeId: Maybe<Scalars['String']>;
  typeKey: Maybe<Scalars['String']>;
  type: Maybe<TResourceIdentifierInput>;
  fields: Maybe<Array<TCustomFieldInput>>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetProductAssetDescription = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetProductAssetKey = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Scalars['String'];
};

export type TSetProductAssetSources = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  sources: Maybe<Array<TAssetSourceInput>>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetProductAssetTags = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
  tags: Maybe<Array<Scalars['String']>>;
  assetKey: Maybe<Scalars['String']>;
  assetId: Maybe<Scalars['String']>;
};

export type TSetProductAttribute = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductAttributeInAllVariants = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
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
  priceId: Scalars['String'];
  discounted: Maybe<TDiscountedProductPriceValueInput>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductImageLabel = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
  label: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
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
  priceId: Scalars['String'];
  staged: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetProductPriceCustomType = {
  priceId: Scalars['String'];
  staged: Maybe<Scalars['Boolean']>;
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetProductPrices = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  prices: Array<TProductPriceDataInput>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductSelectionKey = {
  key: Maybe<Scalars['String']>;
};

export type TSetProductSku = {
  variantId: Scalars['Int'];
  sku: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
};

export type TSetProductTaxCategory = {
  taxCategory: Maybe<TResourceIdentifierInput>;
};

export type TSetProductVariantKey = {
  variantId: Maybe<Scalars['Int']>;
  sku: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  staged: Maybe<Scalars['Boolean']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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
  lineItemId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetShoppingListSlug = {
  slug: Maybe<Array<TLocalizedStringItemInputType>>;
};

export type TSetShoppingListStore = {
  store: Maybe<TResourceIdentifierInput>;
};

export type TSetShoppingListTextLineItemCustomField = {
  textLineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetShoppingListTextLineItemCustomType = {
  textLineItemId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetShoppingListTextLineItemDescription = {
  textLineItemId: Scalars['String'];
  description: Maybe<Array<TLocalizedStringItemInputType>>;
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
  type: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderBillingAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderBillingAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderBillingAddressCustomTypeOutput';
  type: Scalars['String'];
  custom: TCustomFieldsCommand;
};

export type TSetStagedOrderBillingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderBillingAddressOutput';
  type: Scalars['String'];
  address: Maybe<TAddressDraft>;
};

export type TSetStagedOrderCountry = {
  country: Maybe<Scalars['Country']>;
};

export type TSetStagedOrderCountryOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCountryOutput';
  type: Scalars['String'];
  country: Maybe<Scalars['Country']>;
};

export type TSetStagedOrderCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomFieldOutput';
  type: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderCustomLineItemCustomField = {
  customLineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomLineItemCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemCustomFieldOutput';
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderCustomLineItemCustomType = {
  customLineItemId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomLineItemCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemCustomTypeOutput';
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  custom: TCustomFieldsCommand;
};

export type TSetStagedOrderCustomLineItemShippingDetails = {
  customLineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
};

export type TSetStagedOrderCustomLineItemShippingDetailsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemShippingDetailsOutput';
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftOutput>;
};

export type TSetStagedOrderCustomLineItemTaxAmount = {
  customLineItemId: Scalars['String'];
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
};

export type TSetStagedOrderCustomLineItemTaxAmountOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemTaxAmountOutput';
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  externalTaxAmount: Maybe<TExternalTaxAmountDraftOutput>;
};

export type TSetStagedOrderCustomLineItemTaxRate = {
  customLineItemId: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetStagedOrderCustomLineItemTaxRateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomLineItemTaxRateOutput';
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
};

export type TSetStagedOrderCustomShippingMethod = {
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  taxCategory: Maybe<TResourceIdentifierInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetStagedOrderCustomShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomShippingMethodOutput';
  type: Scalars['String'];
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRate;
  taxCategoryResId: Maybe<TResourceIdentifier>;
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
};

export type TSetStagedOrderCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomTypeOutput';
  type: Scalars['String'];
  custom: TCustomFieldsCommand;
};

export type TSetStagedOrderCustomerEmail = {
  email: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomerEmailOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomerEmailOutput';
  type: Scalars['String'];
  email: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomerGroup = {
  customerGroup: Maybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderCustomerGroupOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomerGroupOutput';
  type: Scalars['String'];
  customerGroupResId: Maybe<TCustomerGroupReferenceIdentifier>;
};

export type TSetStagedOrderCustomerId = {
  customerId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderCustomerIdOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderCustomerIdOutput';
  type: Scalars['String'];
  customerId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryAddress = {
  deliveryId: Scalars['String'];
  address: Maybe<TAddressInput>;
};

export type TSetStagedOrderDeliveryAddressCustomField = {
  deliveryId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryAddressCustomFieldOutput';
  type: Scalars['String'];
  deliveryId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderDeliveryAddressCustomType = {
  deliveryId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderDeliveryAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryAddressCustomTypeOutput';
  type: Scalars['String'];
  deliveryId: Scalars['String'];
  custom: TCustomFieldsCommand;
};

export type TSetStagedOrderDeliveryAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryAddressOutput';
  type: Scalars['String'];
  deliveryId: Scalars['String'];
  address: Maybe<TAddressDraft>;
};

export type TSetStagedOrderDeliveryItems = {
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItemDraftType>;
};

export type TSetStagedOrderDeliveryItemsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderDeliveryItemsOutput';
  type: Scalars['String'];
  deliveryId: Scalars['String'];
  items: Array<TDeliveryItem>;
};

export type TSetStagedOrderItemShippingAddressCustomField = {
  addressKey: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderItemShippingAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderItemShippingAddressCustomFieldOutput';
  type: Scalars['String'];
  addressKey: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderItemShippingAddressCustomType = {
  addressKey: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderItemShippingAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderItemShippingAddressCustomTypeOutput';
  type: Scalars['String'];
  addressKey: Scalars['String'];
  custom: TCustomFieldsCommand;
};

export type TSetStagedOrderLineItemCustomField = {
  lineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemCustomFieldOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderLineItemCustomType = {
  lineItemId: Scalars['String'];
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderLineItemCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemCustomTypeOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  custom: TCustomFieldsCommand;
};

export type TSetStagedOrderLineItemDistributionChannel = {
  lineItemId: Scalars['String'];
  distributionChannel: Maybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderLineItemDistributionChannelOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemDistributionChannelOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  distributionChannelResId: Maybe<TChannelReferenceIdentifier>;
};

export type TSetStagedOrderLineItemPrice = {
  lineItemId: Scalars['String'];
  externalPrice: Maybe<TBaseMoneyInput>;
};

export type TSetStagedOrderLineItemPriceOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemPriceOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  externalPrice: Maybe<TBaseMoney>;
};

export type TSetStagedOrderLineItemShippingDetails = {
  lineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftType>;
};

export type TSetStagedOrderLineItemShippingDetailsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemShippingDetailsOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  shippingDetails: Maybe<TItemShippingDetailsDraftOutput>;
};

export type TSetStagedOrderLineItemTaxAmount = {
  lineItemId: Scalars['String'];
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
};

export type TSetStagedOrderLineItemTaxAmountOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemTaxAmountOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  externalTaxAmount: Maybe<TExternalTaxAmountDraftOutput>;
};

export type TSetStagedOrderLineItemTaxRate = {
  lineItemId: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetStagedOrderLineItemTaxRateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemTaxRateOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
};

export type TSetStagedOrderLineItemTotalPrice = {
  lineItemId: Scalars['String'];
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>;
};

export type TSetStagedOrderLineItemTotalPriceOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLineItemTotalPriceOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  externalTotalPrice: Maybe<TExternalLineItemTotalPrice>;
};

export type TSetStagedOrderLocale = {
  locale: Maybe<Scalars['Locale']>;
};

export type TSetStagedOrderLocaleOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderLocaleOutput';
  type: Scalars['String'];
  locale: Maybe<Scalars['Locale']>;
};

export type TSetStagedOrderOrderNumber = {
  orderNumber: Maybe<Scalars['String']>;
};

export type TSetStagedOrderOrderNumberOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderOrderNumberOutput';
  type: Scalars['String'];
  orderNumber: Maybe<Scalars['String']>;
};

export type TSetStagedOrderOrderTotalTax = {
  externalTotalGross: Maybe<TMoneyInput>;
  externalTaxPortions: Maybe<Array<TTaxPortionDraft>>;
};

export type TSetStagedOrderOrderTotalTaxOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderOrderTotalTaxOutput';
  type: Scalars['String'];
  externalTotalGross: Maybe<TMoney>;
  externalTaxPortions: Array<TTaxPortion>;
};

export type TSetStagedOrderParcelItems = {
  parcelId: Scalars['String'];
  items: Array<TDeliveryItemDraftType>;
};

export type TSetStagedOrderParcelItemsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelItemsOutput';
  type: Scalars['String'];
  parcelId: Scalars['String'];
  items: Array<TDeliveryItem>;
};

export type TSetStagedOrderParcelMeasurements = {
  parcelId: Scalars['String'];
  measurements: Maybe<TParcelMeasurementsDraftType>;
};

export type TSetStagedOrderParcelMeasurementsOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelMeasurementsOutput';
  type: Scalars['String'];
  parcelId: Scalars['String'];
  measurements: Maybe<TParcelMeasurements>;
};

export type TSetStagedOrderParcelTrackingData = {
  parcelId: Scalars['String'];
  trackingData: Maybe<TTrackingDataDraftType>;
};

export type TSetStagedOrderParcelTrackingDataOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderParcelTrackingDataOutput';
  type: Scalars['String'];
  parcelId: Scalars['String'];
  trackingData: Maybe<TTrackingData>;
};

export type TSetStagedOrderReturnPaymentState = {
  returnItemId: Scalars['String'];
  paymentState: TReturnPaymentState;
};

export type TSetStagedOrderReturnPaymentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnPaymentStateOutput';
  type: Scalars['String'];
  returnItemId: Scalars['String'];
  paymentState: TReturnPaymentState;
};

export type TSetStagedOrderReturnShipmentState = {
  returnItemId: Scalars['String'];
  shipmentState: TReturnShipmentState;
};

export type TSetStagedOrderReturnShipmentStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderReturnShipmentStateOutput';
  type: Scalars['String'];
  returnItemId: Scalars['String'];
  shipmentState: TReturnShipmentState;
};

export type TSetStagedOrderShippingAddress = {
  address: Maybe<TAddressInput>;
};

export type TSetStagedOrderShippingAddressAndCustomShippingMethod = {
  address: TAddressInput;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRateDraft;
  taxCategory: Maybe<TResourceIdentifierInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetStagedOrderShippingAddressAndCustomShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressAndCustomShippingMethodOutput';
  type: Scalars['String'];
  address: TAddressDraft;
  shippingMethodName: Scalars['String'];
  shippingRate: TShippingRate;
  taxCategoryResId: Maybe<TResourceIdentifier>;
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
};

export type TSetStagedOrderShippingAddressAndShippingMethod = {
  address: TAddressInput;
  shippingMethod: Maybe<TResourceIdentifierInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetStagedOrderShippingAddressAndShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressAndShippingMethodOutput';
  type: Scalars['String'];
  address: TAddressDraft;
  shippingMethodResId: Maybe<TResourceIdentifier>;
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
};

export type TSetStagedOrderShippingAddressCustomField = {
  name: Scalars['String'];
  value: Maybe<Scalars['String']>;
};

export type TSetStagedOrderShippingAddressCustomFieldOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressCustomFieldOutput';
  type: Scalars['String'];
  name: Scalars['String'];
  value: Maybe<Scalars['Json']>;
};

export type TSetStagedOrderShippingAddressCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>;
  type: Maybe<TResourceIdentifierInput>;
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
};

export type TSetStagedOrderShippingAddressCustomTypeOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressCustomTypeOutput';
  type: Scalars['String'];
  custom: TCustomFieldsCommand;
};

export type TSetStagedOrderShippingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingAddressOutput';
  type: Scalars['String'];
  address: Maybe<TAddressDraft>;
};

export type TSetStagedOrderShippingMethod = {
  shippingMethod: Maybe<TResourceIdentifierInput>;
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetStagedOrderShippingMethodOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingMethodOutput';
  type: Scalars['String'];
  shippingMethodResId: Maybe<TResourceIdentifier>;
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
};

export type TSetStagedOrderShippingMethodTaxAmount = {
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>;
};

export type TSetStagedOrderShippingMethodTaxAmountOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingMethodTaxAmountOutput';
  type: Scalars['String'];
  externalTaxAmount: Maybe<TExternalTaxAmountDraftOutput>;
};

export type TSetStagedOrderShippingMethodTaxRate = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>;
};

export type TSetStagedOrderShippingMethodTaxRateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingMethodTaxRateOutput';
  type: Scalars['String'];
  externalTaxRate: Maybe<TExternalTaxRateDraftOutput>;
};

export type TSetStagedOrderShippingRateInput = {
  shippingRateInput: Maybe<TShippingRateInputDraft>;
};

export type TSetStagedOrderShippingRateInputOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderShippingRateInputOutput';
  type: Scalars['String'];
  shippingRateInput: Maybe<TShippingRateInputDraftOutput>;
};

export type TSetStagedOrderStore = {
  store: Maybe<TResourceIdentifierInput>;
};

export type TSetStagedOrderStoreOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'SetStagedOrderStoreOutput';
  type: Scalars['String'];
  storeResId: Maybe<TResourceIdentifier>;
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
  typeKey: Maybe<Scalars['String']>;
  typeId: Maybe<Scalars['String']>;
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

export type TSetStoreProductSelections = {
  productSelections: Maybe<Array<TProductSelectionSettingInActionInput>>;
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
  Delayed = 'Delayed',
  Backorder = 'Backorder',
  Partial = 'Partial',
  Pending = 'Pending',
  Ready = 'Ready',
  Shipped = 'Shipped'
}

export type TShippingInfo = {
  __typename?: 'ShippingInfo';
  shippingMethodName: Scalars['String'];
  price: TMoney;
  shippingRate: TShippingRate;
  taxRate: Maybe<TTaxRate>;
  deliveries: Array<TDelivery>;
  discountedPrice: Maybe<TDiscountedLineItemPrice>;
  taxedPrice: Maybe<TTaxedItemPrice>;
  shippingMethodState: TShippingMethodState;
  shippingMethod: Maybe<TShippingMethod>;
  shippingMethodRef: Maybe<TReference>;
  taxCategory: Maybe<TTaxCategory>;
  taxCategoryRef: Maybe<TReference>;
};

export type TShippingMethod = TVersioned & {
  __typename?: 'ShippingMethod';
  name: Scalars['String'];
  zoneRates: Array<TZoneRate>;
  isDefault: Scalars['Boolean'];
  predicate: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  taxCategoryRef: Maybe<TReference>;
  localizedDescriptionAllLocales: Maybe<Array<TLocalizedString>>;
  localizedDescription: Maybe<Scalars['String']>;
  taxCategory: Maybe<TTaxCategory>;
  custom: Maybe<TCustomFieldsType>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


export type TShippingMethod_LocalizedDescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TShippingMethodDraft = {
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  localizedDescription: Maybe<Array<TLocalizedStringItemInputType>>;
  taxCategory: TResourceIdentifierInput;
  zoneRates: Maybe<Array<TZoneRateDraft>>;
  isDefault: Scalars['Boolean'];
  predicate: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
  custom: Maybe<TCustomFieldsDraft>;
};

export type TShippingMethodLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ShippingMethodLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TShippingMethodLimitsProjection = {
  __typename?: 'ShippingMethodLimitsProjection';
  total: TShippingMethodLimitWithCurrent;
};

export type TShippingMethodQueryResult = {
  __typename?: 'ShippingMethodQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TShippingMethod>;
};

export enum TShippingMethodState {
  /** Either there is no predicate defined for the ShippingMethod or the given predicate matches the cart */
  MatchesCart = 'MatchesCart',
  /** The ShippingMethod predicate does not match the cart. Ordering this cart will fail with error ShippingMethodDoesNotMatchCart */
  DoesNotMatchCart = 'DoesNotMatchCart'
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
  price: TMoney;
  freeAbove: Maybe<TMoney>;
  isMatching: Maybe<Scalars['Boolean']>;
  tiers: Array<TShippingRatePriceTier>;
};

export type TShippingRateCartClassificationPriceTier = TShippingRatePriceTier & {
  __typename?: 'ShippingRateCartClassificationPriceTier';
  value: Scalars['String'];
  price: TMoney;
  isMatching: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
};

export type TShippingRateCartScorePriceTier = TShippingRatePriceTier & {
  __typename?: 'ShippingRateCartScorePriceTier';
  score: Scalars['Int'];
  price: Maybe<TMoney>;
  priceFunction: Maybe<TPriceFunction>;
  isMatching: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
};

export type TShippingRateCartValuePriceTier = TShippingRatePriceTier & {
  __typename?: 'ShippingRateCartValuePriceTier';
  minimumCentAmount: Scalars['Int'];
  price: TMoney;
  isMatching: Maybe<Scalars['Boolean']>;
  type: Scalars['String'];
};

export type TShippingRateDraft = {
  price: TMoneyDraft;
  freeAbove: Maybe<TMoneyDraft>;
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
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TShippingRateInputType = {
  type: Scalars['String'];
};

export type TShippingRateInputTypeInput = {
  CartValue: Maybe<TCartValueInput>;
  CartClassification: Maybe<TCartClassificationInput>;
  CartScore: Maybe<TCartScoreInput>;
};

export type TShippingRatePriceTier = {
  type: Scalars['String'];
};

export type TShippingRatePriceTierCartClassificationDraft = {
  value: Scalars['String'];
  price: TMoneyDraft;
};

export type TShippingRatePriceTierCartScoreDraft = {
  score: Scalars['Int'];
  price: Maybe<TMoneyDraft>;
  priceFunction: Maybe<TPriceFunctionDraft>;
};

export type TShippingRatePriceTierCartValueDraft = {
  minimumCentAmount: Scalars['Int'];
  price: TMoneyDraft;
};

export type TShippingRatePriceTierDraft = {
  CartValue: Maybe<TShippingRatePriceTierCartValueDraft>;
  CartClassification: Maybe<TShippingRatePriceTierCartClassificationDraft>;
  CartScore: Maybe<TShippingRatePriceTierCartScoreDraft>;
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
  key: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Maybe<Array<TLocalizedString>>;
  customerRef: Maybe<TReference>;
  customer: Maybe<TCustomer>;
  storeRef: Maybe<TKeyReference>;
  store: Maybe<TStore>;
  anonymousId: Maybe<Scalars['String']>;
  lineItems: Array<TShoppingListLineItem>;
  textLineItems: Array<TTextLineItem>;
  custom: Maybe<TCustomFieldsType>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


export type TShoppingList_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TShoppingList_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TShoppingList_SlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TShoppingListDraft = {
  name: Array<TLocalizedStringItemInputType>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  lineItems: Maybe<Array<TShoppingListLineItemDraft>>;
  textLineItems: Maybe<Array<TTextLineItemDraft>>;
  custom: Maybe<TCustomFieldsDraft>;
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>;
  key: Maybe<Scalars['String']>;
  customer: Maybe<TResourceIdentifierInput>;
  slug: Maybe<Array<TLocalizedStringItemInputType>>;
  anonymousId: Maybe<Scalars['String']>;
};

export type TShoppingListLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ShoppingListLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TShoppingListLimitsProjection = {
  __typename?: 'ShoppingListLimitsProjection';
  lineItems: TLimit;
  textLineItems: TLimit;
  total: TShoppingListLimitWithCurrent;
};

export type TShoppingListLineItem = {
  __typename?: 'ShoppingListLineItem';
  id: Scalars['String'];
  productId: Scalars['String'];
  variantId: Maybe<Scalars['Int']>;
  productTypeRef: TReference;
  productType: TProductTypeDefinition;
  quantity: Scalars['Int'];
  addedAt: Scalars['DateTime'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  deactivatedAt: Maybe<Scalars['DateTime']>;
  custom: Maybe<TCustomFieldsType>;
  productSlug: Maybe<Scalars['String']>;
  productSlugAllLocales: Maybe<Array<TLocalizedString>>;
  variant: Maybe<TProductVariant>;
};


export type TShoppingListLineItem_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TShoppingListLineItem_ProductSlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TShoppingListLineItemDraft = {
  productId: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  variantId: Maybe<Scalars['Int']>;
  quantity: Maybe<Scalars['Int']>;
  custom: Maybe<TCustomFieldsDraft>;
  addedAt: Maybe<Scalars['DateTime']>;
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
  where: Maybe<Scalars['String']>;
  sort: Maybe<Array<Scalars['String']>>;
  limit: Maybe<Scalars['Int']>;
  offset: Maybe<Scalars['Int']>;
};

export type TShoppingListQueryResult = {
  __typename?: 'ShoppingListQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TShoppingList>;
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
  /** Don’t apply any more matching discounts after this one. */
  StopAfterThisDiscount = 'StopAfterThisDiscount',
  /** Default. Continue applying other matching discounts after applying this one. */
  Stacking = 'Stacking'
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
  id: Scalars['String'];
  version: Scalars['Long'];
  key: Maybe<Scalars['String']>;
  type: TStateType;
  roles: Array<TStateRole>;
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  builtIn: Scalars['Boolean'];
  transitionsRef: Maybe<Array<TReference>>;
  transitions: Maybe<Array<TState>>;
  initial: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


/** [State](https://docs.commercetools.com/api/projects/states) */
export type TState_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


/** [State](https://docs.commercetools.com/api/projects/states) */
export type TState_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TStateDraft = {
  key: Scalars['String'];
  type: TStateType;
  name: Maybe<Array<TLocalizedStringItemInputType>>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  initial: Maybe<Scalars['Boolean']>;
  roles: Maybe<Array<TStateRole>>;
  transitions: Maybe<Array<TReferenceInput>>;
};

export type TStateQueryResult = {
  __typename?: 'StateQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TState>;
};

export enum TStateRole {
  Return = 'Return',
  ReviewIncludedInStatistics = 'ReviewIncludedInStatistics'
}

export enum TStateType {
  OrderState = 'OrderState',
  ProductState = 'ProductState',
  ReviewState = 'ReviewState',
  PaymentState = 'PaymentState',
  LineItemState = 'LineItemState'
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

/** [BETA] Stores allow defining different contexts for a project. */
export type TStore = TVersioned & {
  __typename?: 'Store';
  id: Scalars['String'];
  version: Scalars['Long'];
  key: Scalars['String'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  languages: Maybe<Array<Scalars['Locale']>>;
  distributionChannelsRef: Array<TReference>;
  distributionChannels: Array<TChannel>;
  supplyChannelsRef: Array<TReference>;
  supplyChannels: Array<TChannel>;
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  custom: Maybe<TCustomFieldsType>;
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
  productSelections: Array<TProductSelectionSetting>;
};


/** [BETA] Stores allow defining different contexts for a project. */
export type TStore_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TStoreCreated = TMessagePayload & {
  __typename?: 'StoreCreated';
  languages: Array<Scalars['Locale']>;
  custom: Maybe<TCustomFieldsType>;
  name: Maybe<Scalars['String']>;
  productSelections: Array<TProductSelectionSetting>;
  distributionChannels: Array<TChannel>;
  supplyChannels: Array<TChannel>;
  distributionChannelsRef: Array<TReference>;
  supplyChannelsRef: Array<TReference>;
  productSelectionsRef: Array<TReference>;
  nameAllLocales: Maybe<Array<TLocalizedString>>;
  type: Scalars['String'];
};


export type TStoreCreated_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TStoreDeleted = TMessagePayload & {
  __typename?: 'StoreDeleted';
  type: Scalars['String'];
};

export type TStoreLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'StoreLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TStoreLimitsProjection = {
  __typename?: 'StoreLimitsProjection';
  total: TStoreLimitWithCurrent;
};

export type TStoreProductSelectionsChanged = TMessagePayload & {
  __typename?: 'StoreProductSelectionsChanged';
  active: Array<TProductSelection>;
  inactive: Array<TProductSelection>;
  activeRefs: Array<TReference>;
  inactiveRefs: Array<TReference>;
  type: Scalars['String'];
};

export type TStoreQueryResult = {
  __typename?: 'StoreQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TStore>;
};

export type TStoreUpdateAction = {
  addProductSelection: Maybe<TAddStoreProductSelection>;
  addDistributionChannel: Maybe<TAddStoreDistributionChannel>;
  addSupplyChannel: Maybe<TAddStoreSupplyChannel>;
  changeProductSelectionActive: Maybe<TChangeStoreProductSelectionActive>;
  removeProductSelection: Maybe<TRemoveStoreProductSelection>;
  removeDistributionChannel: Maybe<TRemoveStoreDistributionChannel>;
  removeSupplyChannel: Maybe<TRemoveStoreSupplyChannel>;
  setProductSelections: Maybe<TSetStoreProductSelections>;
  setCustomField: Maybe<TSetStoreCustomField>;
  setCustomType: Maybe<TSetStoreCustomType>;
  setDistributionChannels: Maybe<TSetStoreDistributionChannels>;
  setLanguages: Maybe<TSetStoreLanguages>;
  setName: Maybe<TSetStoreName>;
  setSupplyChannels: Maybe<TSetStoreSupplyChannels>;
};

export type TStringAttribute = TAttribute & {
  __typename?: 'StringAttribute';
  value: Scalars['String'];
  name: Scalars['String'];
};

export type TStringField = TCustomField & {
  __typename?: 'StringField';
  value: Scalars['String'];
  name: Scalars['String'];
};

export type TStringType = TFieldType & {
  __typename?: 'StringType';
  name: Scalars['String'];
};

export type TSubRate = {
  __typename?: 'SubRate';
  name: Scalars['String'];
  amount: Scalars['Float'];
};

export type TSubRateDraft = {
  name: Scalars['String'];
  amount: Scalars['Float'];
};

export type TSubscriptionDraft = {
  key: Maybe<Scalars['String']>;
  destination: TDestinationInput;
  messages: Maybe<Array<TMessageSubscriptionInput>>;
  changes: Maybe<Array<TChangeSubscriptionInput>>;
  format: Maybe<TSubscriptionFormatInput>;
};

export type TSubscriptionFormatInput = {
  Platform: Maybe<TPlatformFormatInput>;
  CloudEvents: Maybe<TCloudEventsSubscriptionsFormatInput>;
};

export enum TSubscriptionHealthStatus {
  TemporaryError = 'TemporaryError',
  ConfigurationErrorDeliveryStopped = 'ConfigurationErrorDeliveryStopped',
  ConfigurationError = 'ConfigurationError',
  Healthy = 'Healthy'
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

export type TSuggestion = {
  __typename?: 'Suggestion';
  text: Scalars['String'];
};

/** Stores information about order synchronization activities (like export or import). */
export type TSyncInfo = {
  __typename?: 'SyncInfo';
  channelRef: TReference;
  channel: Maybe<TChannel>;
  externalId: Maybe<Scalars['String']>;
  syncedAt: Scalars['DateTime'];
};

export type TTargetReferenceInput = {
  typeId: Scalars['String'];
  id: Maybe<Scalars['String']>;
  key: Maybe<Scalars['String']>;
};

export enum TTaxCalculationMode {
  /**
   * This calculation mode calculates the taxes on the unit price before multiplying with the quantity.
   * E.g. `($1.08 * 1.19 = $1.2852 -> $1.29 rounded) * 3 = $3.87`
   */
  UnitPriceLevel = 'UnitPriceLevel',
  /**
   * Default. This calculation mode calculates the taxes after the unit price is multiplied with the quantity.
   * E.g. `($1.08 * 3 = $3.24) * 1.19 = $3.8556 -> $3.86 rounded`
   */
  LineItemLevel = 'LineItemLevel'
}

/** Tax Categories define how products are to be taxed in different countries. */
export type TTaxCategory = TVersioned & {
  __typename?: 'TaxCategory';
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  rates: Array<TTaxRate>;
  key: Maybe<Scalars['String']>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TTaxCategoryAddTaxRate = {
  taxRate: TTaxRateDraft;
};

export type TTaxCategoryChangeName = {
  name: Scalars['String'];
};

export type TTaxCategoryDraft = {
  name: Scalars['String'];
  description: Maybe<Scalars['String']>;
  rates: Maybe<Array<TTaxRateDraft>>;
  key: Maybe<Scalars['String']>;
};

export type TTaxCategoryLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'TaxCategoryLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
};

export type TTaxCategoryLimitsProjection = {
  __typename?: 'TaxCategoryLimitsProjection';
  total: TTaxCategoryLimitWithCurrent;
};

export type TTaxCategoryQueryResult = {
  __typename?: 'TaxCategoryQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TTaxCategory>;
};

export type TTaxCategoryRemoveTaxRate = {
  taxRateId: Scalars['String'];
};

export type TTaxCategoryReplaceTaxRate = {
  taxRateId: Scalars['String'];
  taxRate: TTaxRateDraft;
};

export type TTaxCategorySetDescription = {
  description: Maybe<Scalars['String']>;
};

export type TTaxCategoryUpdateAction = {
  changeName: Maybe<TTaxCategoryChangeName>;
  setDescription: Maybe<TTaxCategorySetDescription>;
  addTaxRate: Maybe<TTaxCategoryAddTaxRate>;
  replaceTaxRate: Maybe<TTaxCategoryReplaceTaxRate>;
  removeTaxRate: Maybe<TTaxCategoryRemoveTaxRate>;
  setKey: Maybe<TSetTaxCategoryKey>;
};

export enum TTaxMode {
  /** No taxes are added to the cart. */
  Disabled = 'Disabled',
  /**
   * The tax amounts and the tax rates as well as the tax portions are set externally per ExternalTaxAmountDraft.
   * A cart with this tax mode can only be ordered if the cart itself and all line items, all custom line items and
   * the shipping method have an external tax amount and rate set
   */
  ExternalAmount = 'ExternalAmount',
  /**
   * The tax rates are set externally per ExternalTaxRateDraft. A cart with this tax mode can only be ordered if all
   * line items, all custom line items and the shipping method have an external tax rate set. The totalNet and
   * totalGross as well as the taxPortions fields are calculated by the platform according to the taxRoundingMode.
   */
  External = 'External',
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
  rate: Scalars['Float'];
  amount: TMoney;
  name: Maybe<Scalars['String']>;
};

export type TTaxPortionDraft = {
  name: Maybe<Scalars['String']>;
  rate: Scalars['Float'];
  amount: TMoneyInput;
};

export type TTaxRate = {
  __typename?: 'TaxRate';
  name: Scalars['String'];
  amount: Scalars['Float'];
  includedInPrice: Scalars['Boolean'];
  country: Scalars['Country'];
  state: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  subRates: Array<TSubRate>;
};

export type TTaxRateDraft = {
  name: Scalars['String'];
  amount: Maybe<Scalars['Float']>;
  includedInPrice: Scalars['Boolean'];
  country: Scalars['Country'];
  state: Maybe<Scalars['String']>;
  subRates: Maybe<Array<TSubRateDraft>>;
};

export type TTaxedItemPrice = {
  __typename?: 'TaxedItemPrice';
  totalNet: TMoney;
  totalGross: TMoney;
};

export type TTaxedPrice = {
  __typename?: 'TaxedPrice';
  totalNet: TMoney;
  totalGross: TMoney;
  taxPortions: Array<TTaxPortion>;
};

export type TTextAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'TextAttributeDefinitionType';
  name: Scalars['String'];
};

/** UI hint telling what kind of edit control should be displayed for a text attribute. */
export enum TTextInputHint {
  SingleLine = 'SingleLine',
  MultiLine = 'MultiLine'
}

export type TTextLineItem = {
  __typename?: 'TextLineItem';
  id: Scalars['String'];
  name: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  description: Maybe<Scalars['String']>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  quantity: Scalars['Int'];
  custom: Maybe<TCustomFieldsType>;
  addedAt: Scalars['DateTime'];
};


export type TTextLineItem_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


export type TTextLineItem_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

export type TTextLineItemDraft = {
  name: Array<TLocalizedStringItemInputType>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  quantity: Maybe<Scalars['Int']>;
  custom: Maybe<TCustomFieldsDraft>;
  addedAt: Maybe<Scalars['DateTime']>;
};


export type TTimeAttribute = TAttribute & {
  __typename?: 'TimeAttribute';
  value: Scalars['Time'];
  name: Scalars['String'];
};

export type TTimeAttributeDefinitionType = TAttributeDefinitionType & {
  __typename?: 'TimeAttributeDefinitionType';
  name: Scalars['String'];
};

export type TTimeField = TCustomField & {
  __typename?: 'TimeField';
  value: Scalars['Time'];
  name: Scalars['String'];
};

export type TTimeType = TFieldType & {
  __typename?: 'TimeType';
  name: Scalars['String'];
};

export type TTrackingData = {
  __typename?: 'TrackingData';
  trackingId: Maybe<Scalars['String']>;
  carrier: Maybe<Scalars['String']>;
  provider: Maybe<Scalars['String']>;
  providerTransaction: Maybe<Scalars['String']>;
  isReturn: Scalars['Boolean'];
};

export type TTrackingDataDraftType = {
  trackingId: Maybe<Scalars['String']>;
  carrier: Maybe<Scalars['String']>;
  provider: Maybe<Scalars['String']>;
  providerTransaction: Maybe<Scalars['String']>;
  isReturn: Maybe<Scalars['Boolean']>;
};

export type TTransaction = {
  __typename?: 'Transaction';
  id: Scalars['String'];
  timestamp: Maybe<Scalars['DateTime']>;
  type: Maybe<TTransactionType>;
  amount: TMoney;
  interactionId: Maybe<Scalars['String']>;
  state: TTransactionState;
};

export type TTransactionDraft = {
  timestamp: Maybe<Scalars['DateTime']>;
  type: TTransactionType;
  amount: TMoneyInput;
  interactionId: Maybe<Scalars['String']>;
  state: Maybe<TTransactionState>;
};

export enum TTransactionState {
  Failure = 'Failure',
  Success = 'Success',
  Pending = 'Pending',
  Initial = 'Initial'
}

export enum TTransactionType {
  Chargeback = 'Chargeback',
  Refund = 'Refund',
  Charge = 'Charge',
  CancelAuthorization = 'CancelAuthorization',
  Authorization = 'Authorization'
}

export type TTransitionOrderCustomLineItemState = {
  customLineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  fromState: TResourceIdentifierInput;
  toState: TResourceIdentifierInput;
  actualTransitionDate: Maybe<Scalars['DateTime']>;
};

export type TTransitionOrderLineItemState = {
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  fromState: TResourceIdentifierInput;
  toState: TResourceIdentifierInput;
  actualTransitionDate: Maybe<Scalars['DateTime']>;
};

export type TTransitionOrderState = {
  state: TResourceIdentifierInput;
  force: Maybe<Scalars['Boolean']>;
};

export type TTransitionPaymentState = {
  state: TResourceIdentifierInput;
  force: Maybe<Scalars['Boolean']>;
};

export type TTransitionProductState = {
  state: TReferenceInput;
  force: Maybe<Scalars['Boolean']>;
};

export type TTransitionReviewState = {
  state: TResourceIdentifierInput;
  force: Maybe<Scalars['Boolean']>;
};

export type TTransitionStagedOrderCustomLineItemState = {
  customLineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  fromState: TResourceIdentifierInput;
  toState: TResourceIdentifierInput;
  actualTransitionDate: Maybe<Scalars['DateTime']>;
};

export type TTransitionStagedOrderCustomLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'TransitionStagedOrderCustomLineItemStateOutput';
  type: Scalars['String'];
  customLineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  fromStateResId: TResourceIdentifier;
  toStateResId: TResourceIdentifier;
  actualTransitionDate: Maybe<Scalars['DateTime']>;
};

export type TTransitionStagedOrderLineItemState = {
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  fromState: TResourceIdentifierInput;
  toState: TResourceIdentifierInput;
  actualTransitionDate: Maybe<Scalars['DateTime']>;
};

export type TTransitionStagedOrderLineItemStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'TransitionStagedOrderLineItemStateOutput';
  type: Scalars['String'];
  lineItemId: Scalars['String'];
  quantity: Scalars['Long'];
  fromStateResId: TResourceIdentifier;
  toStateResId: TResourceIdentifier;
  actualTransitionDate: Maybe<Scalars['DateTime']>;
};

export type TTransitionStagedOrderState = {
  state: TResourceIdentifierInput;
  force: Maybe<Scalars['Boolean']>;
};

export type TTransitionStagedOrderStateOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'TransitionStagedOrderStateOutput';
  type: Scalars['String'];
  stateResId: TResourceIdentifier;
  force: Scalars['Boolean'];
};

export type TTrigger = {
  __typename?: 'Trigger';
  resourceTypeId: Scalars['String'];
  actions: Array<TActionType>;
};

export type TTriggerInput = {
  resourceTypeId: Scalars['String'];
  actions: Maybe<Array<TActionType>>;
};

export type TType = {
  typeRef: TReference;
  type: Maybe<TTypeDefinition>;
};

/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition = TVersioned & {
  __typename?: 'TypeDefinition';
  key: Scalars['String'];
  name: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  nameAllLocales: Array<TLocalizedString>;
  descriptionAllLocales: Maybe<Array<TLocalizedString>>;
  resourceTypeIds: Array<Scalars['String']>;
  fieldDefinitions: Array<TFieldDefinition>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};


/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition_NameArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};


/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition_FieldDefinitionsArgs = {
  includeNames: Maybe<Array<Scalars['String']>>;
  excludeNames: Maybe<Array<Scalars['String']>>;
};

export type TTypeDefinitionDraft = {
  key: Scalars['String'];
  name: Array<TLocalizedStringItemInputType>;
  description: Maybe<Array<TLocalizedStringItemInputType>>;
  resourceTypeIds: Array<Scalars['String']>;
  fieldDefinitions: Maybe<Array<TFieldDefinitionInput>>;
};

export type TTypeDefinitionQueryResult = {
  __typename?: 'TypeDefinitionQueryResult';
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TTypeDefinition>;
};

export type TTypeUpdateAction = {
  addEnumValue: Maybe<TAddTypeEnumValue>;
  addFieldDefinition: Maybe<TAddTypeFieldDefinition>;
  addLocalizedEnumValue: Maybe<TAddTypeLocalizedEnumValue>;
  changeEnumValueLabel: Maybe<TChangeTypeEnumValueLabel>;
  changeEnumValueOrder: Maybe<TChangeTypeEnumValueOrder>;
  changeLabel: Maybe<TChangeTypeLabel>;
  changeFieldDefinitionOrder: Maybe<TChangeTypeFieldDefinitionOrder>;
  changeInputHint: Maybe<TChangeTypeInputHint>;
  changeLocalizedEnumValueLabel: Maybe<TChangeTypeLocalizedEnumValueLabel>;
  changeLocalizedEnumValueOrder: Maybe<TChangeTypeLocalizedEnumValueOrder>;
  changeKey: Maybe<TChangeTypeKey>;
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
  syncedAt: Maybe<Scalars['DateTime']>;
  externalId: Maybe<Scalars['String']>;
};

export type TUpdateStagedOrderItemShippingAddress = {
  address: TAddressInput;
};

export type TUpdateStagedOrderItemShippingAddressOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'UpdateStagedOrderItemShippingAddressOutput';
  type: Scalars['String'];
  address: TAddressDraft;
};

export type TUpdateStagedOrderSyncInfo = {
  channel: TResourceIdentifierInput;
  syncedAt: Maybe<Scalars['DateTime']>;
  externalId: Maybe<Scalars['String']>;
};

export type TUpdateStagedOrderSyncInfoOutput = TStagedOrderUpdateActionOutput & {
  __typename?: 'UpdateStagedOrderSyncInfoOutput';
  type: Scalars['String'];
  channelResId: TChannelReferenceIdentifier;
  syncedAt: Maybe<Scalars['DateTime']>;
  externalId: Maybe<Scalars['String']>;
};

export type TUserProvidedIdentifiers = {
  __typename?: 'UserProvidedIdentifiers';
  key: Maybe<Scalars['String']>;
  orderNumber: Maybe<Scalars['String']>;
  customerNumber: Maybe<Scalars['String']>;
  externalId: Maybe<Scalars['String']>;
  sku: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  slugAllLocales: Maybe<Array<TLocalizedString>>;
};


export type TUserProvidedIdentifiers_SlugArgs = {
  locale: Maybe<Scalars['Locale']>;
  acceptLanguage: Maybe<Array<Scalars['Locale']>>;
};

/** Versioned object have an ID and version and modification. Every update of this object changes it's version. */
export type TVersioned = {
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TWhitespaceSuggestTokenizer = TSuggestTokenizer & {
  __typename?: 'WhitespaceSuggestTokenizer';
  type: Scalars['String'];
};

export type TWhitespaceSuggestTokenizerInput = {
  dummy: Maybe<Scalars['String']>;
};


/** Zones allow defining ShippingRates for specific Locations. */
export type TZone = TVersioned & {
  __typename?: 'Zone';
  name: Scalars['String'];
  key: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  locations: Array<TLocation>;
  id: Scalars['String'];
  version: Scalars['Long'];
  createdAt: Scalars['DateTime'];
  lastModifiedAt: Scalars['DateTime'];
  createdBy: Maybe<TInitiator>;
  lastModifiedBy: Maybe<TInitiator>;
};

export type TZoneLimitWithCurrent = TLimitWithCurrent & {
  __typename?: 'ZoneLimitWithCurrent';
  limit: Maybe<Scalars['Long']>;
  current: Scalars['Long'];
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
  offset: Scalars['Int'];
  count: Scalars['Int'];
  total: Scalars['Long'];
  results: Array<TZone>;
};

export type TZoneRate = {
  __typename?: 'ZoneRate';
  shippingRates: Array<TShippingRate>;
  zoneRef: Maybe<TReference>;
  zone: Maybe<TZone>;
};

export type TZoneRateDraft = {
  zone: TResourceIdentifierInput;
  shippingRates: Maybe<Array<TShippingRateDraft>>;
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
