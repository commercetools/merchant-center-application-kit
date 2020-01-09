export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Long: number,
  DateTime: string,
  Country: string,
  Locale: string,
  Date: string,
  Json: { [key: string]: unknown },
  Currency: string,
  KeyReferenceInput: string,
  SearchFilter: string,
  SearchSort: string,
  YearMonth: string,
  BigDecimal: string,
  Time: string,
};

export type TAbsoluteDiscountValue = TCartDiscountValue & TProductDiscountValue & {
   __typename?: 'AbsoluteDiscountValue',
  money: Array<TMoney>,
  type: Scalars['String'],
};

export type TAbsoluteDiscountValueInput = {
  money: Array<TMoneyInput>,
};

/** A field to access the active cart. */
export type TActiveCartInterface = {
  activeCart: Maybe<TCart>,
};

export type TAddAttributeDefinition = {
  attributeDefinition: TAttributeDefinitionDraft,
};

export type TAddCartCustomLineItem = {
  shippingDetails: Maybe<TItemShippingDetailsDraft>,
  custom: Maybe<TCustomFieldsDraft>,
  quantity: Maybe<Scalars['Long']>,
  externalTaxRate: Maybe<TExternalTaxRateDraft>,
  taxCategory: Maybe<TResourceIdentifierInput>,
  slug: Scalars['String'],
  money: TBaseMoneyInput,
  name: Array<TLocalizedStringItemInputType>,
};

export type TAddCartDiscountCode = {
  code: Scalars['String'],
  validateDuplicates: Maybe<Scalars['Boolean']>,
};

export type TAddCartItemShippingAddress = {
  address: TAddressInput,
};

export type TAddCartLineItem = {
  shippingDetails: Maybe<TItemShippingDetailsDraft>,
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>,
  externalPrice: Maybe<TBaseMoneyInput>,
  externalTaxRate: Maybe<TExternalTaxRateDraft>,
  custom: Maybe<TCustomFieldsDraft>,
  catalog: Maybe<TReferenceInput>,
  distributionChannel: Maybe<TResourceIdentifierInput>,
  supplyChannel: Maybe<TResourceIdentifierInput>,
  variantId: Maybe<Scalars['Int']>,
  quantity: Maybe<Scalars['Long']>,
  sku: Maybe<Scalars['String']>,
  productId: Maybe<Scalars['String']>,
};

export type TAddCartPayment = {
  payment: TResourceIdentifierInput,
};

export type TAddCartShoppingList = {
  shoppingList: TResourceIdentifierInput,
  supplyChannel: Maybe<TResourceIdentifierInput>,
  distributionChannel: Maybe<TResourceIdentifierInput>,
};

export type TAddCategoryAsset = {
  position: Maybe<Scalars['Int']>,
  asset: TAssetDraftInput,
};

export type TAddChannelRoles = {
  roles: Array<TChannelRole>,
};

export type TAddCustomerAddress = {
  address: TAddressInput,
};

export type TAddCustomerBillingAddressId = {
  addressId: Scalars['String'],
};

export type TAddCustomerShippingAddressId = {
  addressId: Scalars['String'],
};

export type TAddCustomerStore = {
  store: TResourceIdentifierInput,
};

export type TAddInventoryEntryQuantity = {
  quantity: Scalars['Long'],
};

export type TAddLocalizedEnumValue = {
  attributeName: Scalars['String'],
  value: TLocalizedEnumValueDraft,
};

export type TAddMyCartLineItem = {
  shippingDetails: Maybe<TItemShippingDetailsDraft>,
  custom: Maybe<TCustomFieldsDraft>,
  catalog: Maybe<TReferenceInput>,
  distributionChannel: Maybe<TResourceIdentifierInput>,
  supplyChannel: Maybe<TResourceIdentifierInput>,
  variantId: Maybe<Scalars['Int']>,
  quantity: Maybe<Scalars['Long']>,
  sku: Maybe<Scalars['String']>,
  productId: Maybe<Scalars['String']>,
};

export type TAddOrderDelivery = {
  items: Maybe<Array<TDeliveryItemDraftType>>,
  parcels: Maybe<Array<TDeliveryItemDraftType>>,
  address: Maybe<TAddressInput>,
};

export type TAddOrderItemShippingAddress = {
  address: TAddressInput,
};

export type TAddOrderParcelToDelivery = {
  deliveryId: Scalars['String'],
  measurements: Maybe<TParcelMeasurementsDraftType>,
  trackingData: Maybe<TTrackingDataDraftType>,
  items: Maybe<Array<TDeliveryItemDraftType>>,
};

export type TAddOrderPayment = {
  payment: TResourceIdentifierInput,
};

export type TAddOrderReturnInfo = {
  items: Array<TReturnItemDraftType>,
  returnDate: Maybe<Scalars['DateTime']>,
  returnTrackingId: Maybe<Scalars['String']>,
};

export type TAddPlainEnumValue = {
  attributeName: Scalars['String'],
  value: TPlainEnumValueDraft,
};

export type TAddProductAsset = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  position: Maybe<Scalars['Int']>,
  asset: TAssetDraftInput,
};

export type TAddProductExternalImage = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  image: TImageInput,
  staged: Maybe<Scalars['Boolean']>,
};

export type TAddProductPrice = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  price: TProductPriceDataInput,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TAddProductToCategory = {
  category: TResourceIdentifierInput,
  orderHint: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TAddProductVariant = {
  assets: Maybe<Array<TAssetDraftInput>>,
  attributes: Maybe<Array<TProductAttributeInput>>,
  images: Maybe<Array<TImageInput>>,
  prices: Maybe<Array<TProductPriceDataInput>>,
  key: Maybe<Scalars['String']>,
  sku: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

/** An address represents a postal address. */
export type TAddress = {
   __typename?: 'Address',
  id: Maybe<Scalars['String']>,
  title: Maybe<Scalars['String']>,
  salutation: Maybe<Scalars['String']>,
  firstName: Maybe<Scalars['String']>,
  lastName: Maybe<Scalars['String']>,
  streetName: Maybe<Scalars['String']>,
  streetNumber: Maybe<Scalars['String']>,
  additionalStreetInfo: Maybe<Scalars['String']>,
  postalCode: Maybe<Scalars['String']>,
  city: Maybe<Scalars['String']>,
  region: Maybe<Scalars['String']>,
  state: Maybe<Scalars['String']>,
  country: Scalars['Country'],
  company: Maybe<Scalars['String']>,
  department: Maybe<Scalars['String']>,
  building: Maybe<Scalars['String']>,
  apartment: Maybe<Scalars['String']>,
  pOBox: Maybe<Scalars['String']>,
  contactInfo: TAddressContactInfo,
  additionalAddressInfo: Maybe<Scalars['String']>,
  externalId: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
};

export type TAddressContactInfo = {
   __typename?: 'AddressContactInfo',
  phone: Maybe<Scalars['String']>,
  mobile: Maybe<Scalars['String']>,
  email: Maybe<Scalars['String']>,
  fax: Maybe<Scalars['String']>,
};

export type TAddressInput = {
  id: Maybe<Scalars['String']>,
  title: Maybe<Scalars['String']>,
  salutation: Maybe<Scalars['String']>,
  firstName: Maybe<Scalars['String']>,
  lastName: Maybe<Scalars['String']>,
  streetName: Maybe<Scalars['String']>,
  streetNumber: Maybe<Scalars['String']>,
  additionalStreetInfo: Maybe<Scalars['String']>,
  postalCode: Maybe<Scalars['String']>,
  city: Maybe<Scalars['String']>,
  region: Maybe<Scalars['String']>,
  state: Maybe<Scalars['String']>,
  country: Scalars['Country'],
  company: Maybe<Scalars['String']>,
  department: Maybe<Scalars['String']>,
  building: Maybe<Scalars['String']>,
  apartment: Maybe<Scalars['String']>,
  pOBox: Maybe<Scalars['String']>,
  phone: Maybe<Scalars['String']>,
  mobile: Maybe<Scalars['String']>,
  email: Maybe<Scalars['String']>,
  fax: Maybe<Scalars['String']>,
  additionalAddressInfo: Maybe<Scalars['String']>,
  externalId: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
};

export type TAddShippingMethodShippingRate = {
  zone: TResourceIdentifierInput,
  shippingRate: TShippingRateDraft,
};

export type TAddShippingMethodZone = {
  zone: TResourceIdentifierInput,
};

export type TAddShoppingListLineItem = {
  addedAt: Maybe<Scalars['DateTime']>,
  custom: Maybe<TCustomFieldsDraft>,
  quantity: Maybe<Scalars['Int']>,
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  productId: Maybe<Scalars['String']>,
};

export type TAddShoppingListTextLineItem = {
  addedAt: Maybe<Scalars['DateTime']>,
  custom: Maybe<TCustomFieldsDraft>,
  quantity: Maybe<Scalars['Int']>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  name: Array<TLocalizedStringItemInputType>,
};

export type TAddZoneLocation = {
  location: TZoneLocation,
};

/** there was once a monkey that drank gas */
export type TAlmoProductType = TProductType & {
   __typename?: 'almoProductType',
  productTypeId: Scalars['String'],
};

export enum TAnonymousCartSignInMode {
  /** The anonymous cart is used as new active customer cart. No `LineItem`s get merged. */
  UseAsNewActiveCustomerCart = 'UseAsNewActiveCustomerCart',
  /** 
 * `LineItem`s of the anonymous cart will be copied to the customer’s active cart that has been modified most recently.
   * 
   * The `CartState` of the anonymous cart gets changed to `Merged` while the
   * `CartState` of the customer’s cart remains `Active`.
   * 
   * `CustomLineItems` and `CustomFields` of the anonymous cart will not be copied to the customers cart.
   * 
   * If a `LineItem` in the anonymous cart matches an existing line item in the
   * customer’s cart (same product ID and variant ID), the maximum quantity of both
   * LineItems is used as the new quantity. In that case `CustomFields` on the
   * `LineItem` of the anonymous cart will not be in the resulting `LineItem`.
 */
  MergeWithExistingCustomerCart = 'MergeWithExistingCustomerCart'
}

/** API Clients can be used to obtain OAuth 2 access tokens */
export type TApiClientWithoutSecret = {
   __typename?: 'APIClientWithoutSecret',
  id: Scalars['String'],
  name: Scalars['String'],
  scope: Scalars['String'],
  createdAt: Maybe<Scalars['DateTime']>,
  lastUsedAt: Maybe<Scalars['Date']>,
};

export type TApiClientWithoutSecretQueryResult = {
   __typename?: 'APIClientWithoutSecretQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TApiClientWithoutSecret>,
};

/** 
 * API Clients can be used to obtain OAuth 2 access tokens. The secret is only
 * shown once in the response of creating the API Client.
 */
export type TApiClientWithSecret = {
   __typename?: 'APIClientWithSecret',
  id: Scalars['String'],
  name: Scalars['String'],
  scope: Scalars['String'],
  createdAt: Maybe<Scalars['DateTime']>,
  lastUsedAt: Maybe<Scalars['Date']>,
  secret: Scalars['String'],
};

export type TApplyCartDeltaToCustomLineItemShippingDetailsTargets = {
  customLineItemId: Scalars['String'],
  targetsDelta: Array<TShippingTargetDraft>,
};

export type TApplyCartDeltaToLineItemShippingDetailsTargets = {
  lineItemId: Scalars['String'],
  targetsDelta: Array<TShippingTargetDraft>,
};

export type TAsset = {
   __typename?: 'Asset',
  id: Scalars['String'],
  key: Maybe<Scalars['String']>,
  sources: Array<TAssetSource>,
  name: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  description: Maybe<Scalars['String']>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  tags: Array<Scalars['String']>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


export type TAsset_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TAsset_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TAsset_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


export type TAsset_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TAssetDimensions = {
   __typename?: 'AssetDimensions',
  width: Scalars['Int'],
  height: Scalars['Int'],
};

export type TAssetDimensionsInput = {
  width: Scalars['Int'],
  height: Scalars['Int'],
};

export type TAssetDraftInput = {
  key: Maybe<Scalars['String']>,
  name: Array<TLocalizedStringItemInputType>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  custom: Maybe<TCustomFieldsDraft>,
  sources: Maybe<Array<TAssetSourceInput>>,
  tags: Maybe<Array<Scalars['String']>>,
  type: Maybe<TResourceIdentifierInput>,
};

export type TAssetSource = {
   __typename?: 'AssetSource',
  uri: Scalars['String'],
  key: Maybe<Scalars['String']>,
  dimensions: Maybe<TAssetDimensions>,
  contentType: Maybe<Scalars['String']>,
};

export type TAssetSourceInput = {
  uri: Scalars['String'],
  key: Maybe<Scalars['String']>,
  dimensions: Maybe<TAssetDimensionsInput>,
  contentType: Maybe<Scalars['String']>,
};

export type TAttribute = {
  name: Scalars['String'],
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
   __typename?: 'AttributeDefinition',
  type: TAttributeDefinitionType,
  name: Scalars['String'],
  label: Maybe<Scalars['String']>,
  isRequired: Scalars['Boolean'],
  attributeConstraint: TAttributeConstraint,
  inputTip: Maybe<Scalars['String']>,
  inputHint: TTextInputHint,
  isSearchable: Scalars['Boolean'],
  labelAllLocales: Array<TLocalizedString>,
  inputTipAllLocales: Maybe<Array<TLocalizedString>>,
};


export type TAttributeDefinition_LabelArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TAttributeDefinition_InputTipArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TAttributeDefinitionDraft = {
  type: TAttributeTypeDraft,
  name: Scalars['String'],
  label: Array<TLocalizedStringItemInputType>,
  isRequired: Scalars['Boolean'],
  attributeConstraint: Maybe<TAttributeConstraint>,
  inputTip: Maybe<Array<TLocalizedStringItemInputType>>,
  inputHint: Maybe<TTextInputHint>,
  isSearchable: Scalars['Boolean'],
};

export type TAttributeDefinitionResult = {
   __typename?: 'AttributeDefinitionResult',
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>,
  total: Scalars['Int'],
  results: Array<TAttributeDefinition>,
};

/** (https://dev.commercetools.com/http-api-projects-productTypes.html#attributetype)[https://dev.commercetools.com/http-api-projects-productTypes.html#attributetype] */
export type TAttributeDefinitionType = {
  name: Scalars['String'],
};

export type TAttributeSetElementTypeDraft = {
  text: Maybe<TSimpleAttributeTypeDraft>,
  number: Maybe<TSimpleAttributeTypeDraft>,
  money: Maybe<TSimpleAttributeTypeDraft>,
  date: Maybe<TSimpleAttributeTypeDraft>,
  time: Maybe<TSimpleAttributeTypeDraft>,
  datetime: Maybe<TSimpleAttributeTypeDraft>,
  boolean: Maybe<TSimpleAttributeTypeDraft>,
  reference: Maybe<TReferenceTypeDefinitionDraft>,
  enum: Maybe<TEnumTypeDraft>,
  lenum: Maybe<TLocalizableEnumTypeDraft>,
  ltext: Maybe<TSimpleAttributeTypeDraft>,
};

export type TAttributeSetTypeDraft = {
  elementType: TAttributeSetElementTypeDraft,
};

export type TAttributeTypeDraft = {
  set: Maybe<TAttributeSetTypeDraft>,
  text: Maybe<TSimpleAttributeTypeDraft>,
  number: Maybe<TSimpleAttributeTypeDraft>,
  money: Maybe<TSimpleAttributeTypeDraft>,
  date: Maybe<TSimpleAttributeTypeDraft>,
  time: Maybe<TSimpleAttributeTypeDraft>,
  datetime: Maybe<TSimpleAttributeTypeDraft>,
  boolean: Maybe<TSimpleAttributeTypeDraft>,
  reference: Maybe<TReferenceTypeDefinitionDraft>,
  enum: Maybe<TEnumTypeDraft>,
  lenum: Maybe<TLocalizableEnumTypeDraft>,
  ltext: Maybe<TSimpleAttributeTypeDraft>,
};

export type TBaseMoney = {
  type: Scalars['String'],
  currencyCode: Scalars['Currency'],
  centAmount: Scalars['Long'],
  fractionDigits: Scalars['Int'],
};

export type TBaseMoneyInput = {
  centPrecision: Maybe<TMoneyInput>,
  highPrecision: Maybe<THighPrecisionMoneyInput>,
};

export type TBaseSearchKeywordInput = {
  whitespace: Maybe<TWhitespaceSuggestTokenizerInput>,
  custom: Maybe<TCustomSuggestTokenizerInput>,
};


export type TBooleanAttribute = TAttribute & {
   __typename?: 'BooleanAttribute',
  value: Scalars['Boolean'],
  name: Scalars['String'],
};

export type TBooleanAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'BooleanAttributeDefinitionType',
  name: Scalars['String'],
};

export type TBooleanField = TCustomField & {
   __typename?: 'BooleanField',
  value: Scalars['Boolean'],
  name: Scalars['String'],
};

export type TBooleanType = TFieldType & {
   __typename?: 'BooleanType',
  name: Scalars['String'],
};

/** 
 * A shopping cart holds product variants and can be ordered. Each cart either
 * belongs to a registered customer or is an anonymous cart.
 */
export type TCart = TVersioned & {
   __typename?: 'Cart',
  customerId: Maybe<Scalars['String']>,
  customer: Maybe<TCustomer>,
  customerEmail: Maybe<Scalars['String']>,
  anonymousId: Maybe<Scalars['String']>,
  lineItems: Array<TLineItem>,
  customLineItems: Array<TCustomLineItem>,
  totalPrice: TMoney,
  taxedPrice: Maybe<TTaxedPrice>,
  shippingAddress: Maybe<TAddress>,
  billingAddress: Maybe<TAddress>,
  inventoryMode: TInventoryMode,
  taxMode: TTaxMode,
  taxRoundingMode: TRoundingMode,
  taxCalculationMode: TTaxCalculationMode,
  customerGroup: Maybe<TCustomerGroup>,
  customerGroupRef: Maybe<TReference>,
  country: Maybe<Scalars['Country']>,
  shippingInfo: Maybe<TShippingInfo>,
  discountCodes: Array<TDiscountCodeInfo>,
  refusedGifts: Array<TCartDiscount>,
  refusedGiftsRefs: Array<TReference>,
  paymentInfo: Maybe<TPaymentInfo>,
  locale: Maybe<Scalars['Locale']>,
  shippingRateInput: Maybe<TShippingRateInput>,
  origin: TCartOrigin,
  storeRef: Maybe<TKeyReference>,
  store: Maybe<TStore>,
  itemShippingAddresses: Array<TAddress>,
  cartState: TCartState,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


/** 
 * A shopping cart holds product variants and can be ordered. Each cart either
 * belongs to a registered customer or is an anonymous cart.
 */
export type TCart_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


/** 
 * A shopping cart holds product variants and can be ordered. Each cart either
 * belongs to a registered customer or is an anonymous cart.
 */
export type TCart_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TCartClassificationInput = {
  values: Array<TLocalizedEnumValueInput>,
};

export type TCartClassificationType = TShippingRateInputType & {
   __typename?: 'CartClassificationType',
  values: Array<TShippingRateInputLocalizedEnumValue>,
  type: Scalars['String'],
};

/** 
 * Cart discounts are recalculated every time LineItems or CustomLineItems are
 * added or removed from the Cart or an order is created from the cart.
 * 
 * The number of active cart discounts that do not require a discount code
 * (isActive=true and requiresDiscountCode=false) is limited to 100.
 */
export type TCartDiscount = TVersioned & {
   __typename?: 'CartDiscount',
  cartPredicate: Scalars['String'],
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
  stackingMode: TStackingMode,
  isActive: Scalars['Boolean'],
  requiresDiscountCode: Scalars['Boolean'],
  sortOrder: Scalars['String'],
  key: Maybe<Scalars['String']>,
  name: Maybe<Scalars['String']>,
  description: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  value: TCartDiscountValue,
  target: Maybe<TCartDiscountTarget>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


/** 
 * Cart discounts are recalculated every time LineItems or CustomLineItems are
 * added or removed from the Cart or an order is created from the cart.
 * 
 * The number of active cart discounts that do not require a discount code
 * (isActive=true and requiresDiscountCode=false) is limited to 100.
 */
export type TCartDiscount_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


/** 
 * Cart discounts are recalculated every time LineItems or CustomLineItems are
 * added or removed from the Cart or an order is created from the cart.
 * 
 * The number of active cart discounts that do not require a discount code
 * (isActive=true and requiresDiscountCode=false) is limited to 100.
 */
export type TCartDiscount_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


/** 
 * Cart discounts are recalculated every time LineItems or CustomLineItems are
 * added or removed from the Cart or an order is created from the cart.
 * 
 * The number of active cart discounts that do not require a discount code
 * (isActive=true and requiresDiscountCode=false) is limited to 100.
 */
export type TCartDiscount_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


/** 
 * Cart discounts are recalculated every time LineItems or CustomLineItems are
 * added or removed from the Cart or an order is created from the cart.
 * 
 * The number of active cart discounts that do not require a discount code
 * (isActive=true and requiresDiscountCode=false) is limited to 100.
 */
export type TCartDiscount_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TCartDiscountDraft = {
  value: TCartDiscountValueInput,
  cartPredicate: Scalars['String'],
  target: Maybe<TCartDiscountTargetInput>,
  sortOrder: Scalars['String'],
  name: Array<TLocalizedStringItemInputType>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
  stackingMode: Maybe<TStackingMode>,
  requiresDiscountCode: Maybe<Scalars['Boolean']>,
  isActive: Maybe<Scalars['Boolean']>,
  custom: Maybe<TCustomFieldsDraft>,
  key: Maybe<Scalars['String']>,
};

export type TCartDiscountQueryResult = {
   __typename?: 'CartDiscountQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TCartDiscount>,
};

export type TCartDiscountTarget = {
  type: Scalars['String'],
};

export type TCartDiscountTargetInput = {
  lineItems: Maybe<TLineItemsTargetInput>,
  customLineItems: Maybe<TCustomLineItemsTargetInput>,
  shipping: Maybe<TShippingTargetInput>,
  multiBuyLineItems: Maybe<TMultiBuyLineItemsTargetInput>,
  multiBuyCustomLineItems: Maybe<TMultiBuyCustomLineItemsTargetInput>,
};

export type TCartDiscountUpdateAction = {
  changeCartPredicate: Maybe<TChangeCartDiscountCartPredicate>,
  changeIsActive: Maybe<TChangeCartDiscountIsActive>,
  changeName: Maybe<TChangeCartDiscountName>,
  changeRequiresDiscountCode: Maybe<TChangeCartDiscountRequiresDiscountCode>,
  changeSortOrder: Maybe<TChangeCartDiscountSortOrder>,
  changeStackingMode: Maybe<TChangeCartDiscountStackingMode>,
  changeTarget: Maybe<TChangeCartDiscountTarget>,
  changeValue: Maybe<TChangeCartDiscountValue>,
  setCustomField: Maybe<TSetCartDiscountCustomField>,
  setCustomType: Maybe<TSetCartDiscountCustomType>,
  setDescription: Maybe<TSetCartDiscountDescription>,
  setKey: Maybe<TSetCartDiscountKey>,
  setValidFrom: Maybe<TSetCartDiscountValidFrom>,
  setValidFromAndUntil: Maybe<TSetCartDiscountValidFromAndUntil>,
  setValidUntil: Maybe<TSetCartDiscountValidUntil>,
};

export type TCartDiscountValue = {
  type: Scalars['String'],
};

export type TCartDiscountValueInput = {
  relative: Maybe<TRelativeDiscountValueInput>,
  absolute: Maybe<TAbsoluteDiscountValueInput>,
  giftLineItem: Maybe<TGiftLineItemValueInput>,
};

export type TCartDraft = {
  currency: Scalars['Currency'],
  country: Maybe<Scalars['Country']>,
  inventoryMode: Maybe<TInventoryMode>,
  custom: Maybe<TCustomFieldsDraft>,
  customerEmail: Maybe<Scalars['String']>,
  shippingAddress: Maybe<TAddressInput>,
  billingAddress: Maybe<TAddressInput>,
  shippingMethod: Maybe<TResourceIdentifierInput>,
  taxMode: Maybe<TTaxMode>,
  locale: Maybe<Scalars['Locale']>,
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
  itemShippingAddresses: Maybe<Array<TAddressInput>>,
  discountCodes: Maybe<Array<Scalars['String']>>,
  lineItems: Maybe<Array<TLineItemDraft>>,
  customLineItems: Maybe<Array<TCustomLineItemDraft>>,
  customerId: Maybe<Scalars['String']>,
  externalTaxRateForShippingMethod: Maybe<TExternalTaxRateDraft>,
  anonymousId: Maybe<Scalars['String']>,
  taxRoundingMode: Maybe<TRoundingMode>,
  taxCalculationMode: Maybe<TTaxCalculationMode>,
  customerGroup: Maybe<TResourceIdentifierInput>,
  shippingRateInput: Maybe<TShippingRateInputDraft>,
  origin: Maybe<TCartOrigin>,
  store: Maybe<TResourceIdentifierInput>,
};

export enum TCartOrigin {
  /** The cart was created by the merchant on behalf of the customer */
  Merchant = 'Merchant',
  /** The cart was created by the customer. This is the default value */
  Customer = 'Customer'
}

/** Fields to access carts. Includes direct access to a single cart and searching for carts. */
export type TCartQueryInterface = {
  cart: Maybe<TCart>,
  carts: TCartQueryResult,
};


/** Fields to access carts. Includes direct access to a single cart and searching for carts. */
export type TCartQueryInterface_CartArgs = {
  id: Scalars['String']
};


/** Fields to access carts. Includes direct access to a single cart and searching for carts. */
export type TCartQueryInterface_CartsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TCartQueryResult = {
   __typename?: 'CartQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TCart>,
};

export type TCartsConfiguration = {
   __typename?: 'CartsConfiguration',
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
};

export type TCartsConfigurationInput = {
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
};

export type TCartScoreInput = {
  dummy: Maybe<Scalars['String']>,
};

export type TCartScoreType = TShippingRateInputType & {
   __typename?: 'CartScoreType',
  type: Scalars['String'],
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
  addCustomLineItem: Maybe<TAddCartCustomLineItem>,
  addDiscountCode: Maybe<TAddCartDiscountCode>,
  addItemShippingAddress: Maybe<TAddCartItemShippingAddress>,
  addLineItem: Maybe<TAddCartLineItem>,
  addPayment: Maybe<TAddCartPayment>,
  addShoppingList: Maybe<TAddCartShoppingList>,
  applyDeltaToCustomLineItemShippingDetailsTargets: Maybe<TApplyCartDeltaToCustomLineItemShippingDetailsTargets>,
  applyDeltaToLineItemShippingDetailsTargets: Maybe<TApplyCartDeltaToLineItemShippingDetailsTargets>,
  changeCustomLineItemMoney: Maybe<TChangeCartCustomLineItemMoney>,
  changeCustomLineItemQuantity: Maybe<TChangeCartCustomLineItemQuantity>,
  changeLineItemQuantity: Maybe<TChangeCartLineItemQuantity>,
  changeTaxCalculationMode: Maybe<TChangeCartTaxCalculationMode>,
  changeTaxMode: Maybe<TChangeCartTaxMode>,
  changeTaxRoundingMode: Maybe<TChangeCartTaxRoundingMode>,
  recalculate: Maybe<TRecalculateCart>,
  removeCustomLineItem: Maybe<TRemoveCartCustomLineItem>,
  removeDiscountCode: Maybe<TRemoveCartDiscountCode>,
  removeItemShippingAddress: Maybe<TRemoveCartItemShippingAddress>,
  removeLineItem: Maybe<TRemoveCartLineItem>,
  removePayment: Maybe<TRemoveCartPayment>,
  setAnonymousId: Maybe<TSetCartAnonymousId>,
  setBillingAddress: Maybe<TSetCartBillingAddress>,
  setCartTotalTax: Maybe<TSetCartTotalTax>,
  setCountry: Maybe<TSetCartCountry>,
  setCustomField: Maybe<TSetCartCustomField>,
  setCustomLineItemCustomField: Maybe<TSetCartCustomLineItemCustomField>,
  setCustomLineItemCustomType: Maybe<TSetCartCustomLineItemCustomType>,
  setCustomLineItemShippingDetails: Maybe<TSetCartCustomLineItemShippingDetails>,
  setCustomLineItemTaxAmount: Maybe<TSetCartCustomLineItemTaxAmount>,
  setCustomLineItemTaxRate: Maybe<TSetCartCustomLineItemTaxRate>,
  setCustomShippingMethod: Maybe<TSetCartCustomShippingMethod>,
  setCustomType: Maybe<TSetCartCustomType>,
  setCustomerEmail: Maybe<TSetCartCustomerEmail>,
  setCustomerGroup: Maybe<TSetCartCustomerGroup>,
  setCustomerId: Maybe<TSetCartCustomerId>,
  setDeleteDaysAfterLastModification: Maybe<TSetCartDeleteDaysAfterLastModification>,
  setLineItemCustomField: Maybe<TSetCartLineItemCustomField>,
  setLineItemCustomType: Maybe<TSetCartLineItemCustomType>,
  setLineItemPrice: Maybe<TSetCartLineItemPrice>,
  setLineItemShippingDetails: Maybe<TSetCartLineItemShippingDetails>,
  setLineItemTaxAmount: Maybe<TSetCartLineItemTaxAmount>,
  setLineItemTaxRate: Maybe<TSetCartLineItemTaxRate>,
  setLineItemTotalPrice: Maybe<TSetCartLineItemTotalPrice>,
  setLocale: Maybe<TSetCartLocale>,
  setShippingAddress: Maybe<TSetCartShippingAddress>,
  setShippingMethod: Maybe<TSetCartShippingMethod>,
  setShippingMethodTaxAmount: Maybe<TSetCartShippingMethodTaxAmount>,
  setShippingMethodTaxRate: Maybe<TSetCartShippingMethodTaxRate>,
  setShippingRateInput: Maybe<TSetCartShippingRateInput>,
  updateItemShippingAddress: Maybe<TUpdateCartItemShippingAddress>,
};

export type TCartValueInput = {
  dummy: Maybe<Scalars['String']>,
};

export type TCartValueType = TShippingRateInputType & {
   __typename?: 'CartValueType',
  type: Scalars['String'],
};

export type TCategory = TVersioned & {
   __typename?: 'Category',
  id: Scalars['String'],
  key: Maybe<Scalars['String']>,
  version: Scalars['Long'],
  name: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  description: Maybe<Scalars['String']>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  slug: Maybe<Scalars['String']>,
  slugAllLocales: Array<TLocalizedString>,
  ancestorsRef: Array<TReference>,
  ancestors: Array<TCategory>,
  parentRef: Maybe<TReference>,
  parent: Maybe<TCategory>,
  orderHint: Scalars['String'],
  externalId: Maybe<Scalars['String']>,
  metaTitle: Maybe<Scalars['String']>,
  metaKeywords: Maybe<Scalars['String']>,
  metaDescription: Maybe<Scalars['String']>,
  /** Number of a products in the category subtree. */
  productCount: Scalars['Int'],
  /** Number of staged products in the category subtree. */
  stagedProductCount: Scalars['Int'],
  /** Number of direct child categories. */
  childCount: Scalars['Int'],
  /** Direct child categories. */
  children: Maybe<Array<TCategory>>,
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  assets: Array<TAsset>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


export type TCategory_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TCategory_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TCategory_SlugArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TCategory_MetaTitleArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TCategory_MetaKeywordsArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TCategory_MetaDescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TCategory_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


export type TCategory_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TCategoryDraft = {
  key: Maybe<Scalars['String']>,
  name: Array<TLocalizedStringItemInputType>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  custom: Maybe<TCustomFieldsDraft>,
  slug: Array<TLocalizedStringItemInputType>,
  externalId: Maybe<Scalars['String']>,
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>,
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>,
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>,
  orderHint: Maybe<Scalars['String']>,
  parent: Maybe<TResourceIdentifierInput>,
  assets: Maybe<Array<TAssetDraftInput>>,
};

export type TCategoryOrderHint = {
   __typename?: 'CategoryOrderHint',
  categoryId: Scalars['String'],
  orderHint: Scalars['String'],
};

export type TCategoryOrderHintInput = {
  uuid: Scalars['String'],
  orderHint: Scalars['String'],
};

export type TCategoryQueryResult = {
   __typename?: 'CategoryQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TCategory>,
};

export type TCategorySearch = {
   __typename?: 'CategorySearch',
  id: Scalars['String'],
  key: Maybe<Scalars['String']>,
  version: Scalars['Long'],
  name: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  description: Maybe<Scalars['String']>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  slug: Maybe<Scalars['String']>,
  slugAllLocales: Array<TLocalizedString>,
  ancestorsRef: Array<TReference>,
  ancestors: Array<TCategorySearch>,
  parentRef: Maybe<TReference>,
  parent: Maybe<TCategorySearch>,
  externalId: Maybe<Scalars['String']>,
  productCount: Scalars['Int'],
  stagedProductCount: Scalars['Int'],
  childCount: Scalars['Int'],
  productTypeNames: Array<Scalars['String']>,
  /** Direct child categories. */
  children: Array<TCategorySearch>,
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  orderHint: Scalars['String'],
  assets: Array<TAsset>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


export type TCategorySearch_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TCategorySearch_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TCategorySearch_SlugArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TCategorySearch_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


export type TCategorySearch_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TCategorySearchResult = {
   __typename?: 'CategorySearchResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Int'],
  results: Array<TCategorySearch>,
};

export type TCategoryUpdateAction = {
  addAsset: Maybe<TAddCategoryAsset>,
  changeAssetName: Maybe<TChangeCategoryAssetName>,
  changeAssetOrder: Maybe<TChangeCategoryAssetOrder>,
  changeName: Maybe<TChangeCategoryName>,
  changeOrderHint: Maybe<TChangeCategoryOrderHint>,
  changeSlug: Maybe<TChangeCategorySlug>,
  changeParent: Maybe<TChangeCategoryParent>,
  removeAsset: Maybe<TRemoveCategoryAsset>,
  setAssetCustomField: Maybe<TSetCategoryAssetCustomField>,
  setAssetCustomType: Maybe<TSetCategoryAssetCustomType>,
  setAssetDescription: Maybe<TSetCategoryAssetDescription>,
  setAssetKey: Maybe<TSetCategoryAssetKey>,
  setAssetSources: Maybe<TSetCategoryAssetSources>,
  setAssetTags: Maybe<TSetCategoryAssetTags>,
  setCustomField: Maybe<TSetCategoryCustomField>,
  setCustomType: Maybe<TSetCategoryCustomType>,
  setDescription: Maybe<TSetCategoryDescription>,
  setKey: Maybe<TSetCategoryKey>,
  setMetaDescription: Maybe<TSetCategoryMetaDescription>,
  setMetaKeywords: Maybe<TSetCategoryMetaKeywords>,
  setMetaTitle: Maybe<TSetCategoryMetaTitle>,
  setExternalId: Maybe<TSetCategoryExternalId>,
};

export type TChangeAttributeName = {
  attributeName: Scalars['String'],
  newAttributeName: Scalars['String'],
};

export type TChangeAttributeOrder = {
  attributeDefinitions: Array<TAttributeDefinitionDraft>,
};

export type TChangeAttributeOrderByName = {
  attributeNames: Array<Scalars['String']>,
};

export type TChangeCartCustomLineItemMoney = {
  customLineItemId: Scalars['String'],
  money: TBaseMoneyInput,
};

export type TChangeCartCustomLineItemQuantity = {
  customLineItemId: Scalars['String'],
  quantity: Scalars['Long'],
};

export type TChangeCartDiscountCartPredicate = {
  cartPredicate: Scalars['String'],
};

export type TChangeCartDiscountIsActive = {
  isActive: Scalars['Boolean'],
};

export type TChangeCartDiscountName = {
  name: Array<TLocalizedStringItemInputType>,
};

export type TChangeCartDiscountRequiresDiscountCode = {
  requiresDiscountCode: Scalars['Boolean'],
};

export type TChangeCartDiscountSortOrder = {
  sortOrder: Scalars['String'],
};

export type TChangeCartDiscountStackingMode = {
  stackingMode: TStackingMode,
};

export type TChangeCartDiscountTarget = {
  target: TCartDiscountTargetInput,
};

export type TChangeCartDiscountValue = {
  value: TCartDiscountValueInput,
};

export type TChangeCartLineItemQuantity = {
  lineItemId: Scalars['String'],
  quantity: Scalars['Long'],
  externalPrice: Maybe<TBaseMoneyInput>,
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>,
};

export type TChangeCartTaxCalculationMode = {
  taxCalculationMode: TTaxCalculationMode,
};

export type TChangeCartTaxMode = {
  taxMode: TTaxMode,
};

export type TChangeCartTaxRoundingMode = {
  taxRoundingMode: TRoundingMode,
};

export type TChangeCategoryAssetName = {
  name: Array<TLocalizedStringItemInputType>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TChangeCategoryAssetOrder = {
  assetOrder: Array<Scalars['String']>,
};

export type TChangeCategoryName = {
  name: Array<TLocalizedStringItemInputType>,
};

export type TChangeCategoryOrderHint = {
  orderHint: Scalars['String'],
};

export type TChangeCategoryParent = {
  parent: TResourceIdentifierInput,
};

export type TChangeCategorySlug = {
  slug: Array<TLocalizedStringItemInputType>,
};

export type TChangeChannelDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TChangeChannelKey = {
  key: Scalars['String'],
};

export type TChangeChannelName = {
  name: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TChangeCustomerAddress = {
  addressId: Scalars['String'],
  address: TAddressInput,
};

export type TChangeCustomerEmail = {
  email: Scalars['String'],
};

export type TChangeCustomerGroupName = {
  name: Scalars['String'],
};

export type TChangeDescription = {
  description: Scalars['String'],
};

export type TChangeDiscountCodeCartDiscounts = {
  cartDiscounts: Array<TReferenceInput>,
};

export type TChangeDiscountCodeGroups = {
  groups: Array<Scalars['String']>,
};

export type TChangeDiscountCodeIsActive = {
  isActive: Scalars['Boolean'],
};

export type TChangeEnumKey = {
  attributeName: Scalars['String'],
  key: Scalars['String'],
  newKey: Scalars['String'],
};

export type TChangeInputHint = {
  attributeName: Scalars['String'],
  newValue: TTextInputHint,
};

export type TChangeInventoryEntryQuantity = {
  quantity: Scalars['Long'],
};

export type TChangeIsSearchable = {
  attributeName: Scalars['String'],
  isSearchable: Scalars['Boolean'],
};

export type TChangeLabel = {
  attributeName: Scalars['String'],
  label: Array<TLocalizedStringItemInputType>,
};

export type TChangeLocalizedEnumValueLabel = {
  attributeName: Scalars['String'],
  newValue: TLocalizedEnumValueDraft,
};

export type TChangeLocalizedEnumValueOrder = {
  attributeName: Scalars['String'],
  values: Array<TLocalizedEnumValueDraft>,
};

export type TChangeMyCartTaxMode = {
  taxMode: TTaxMode,
};

export type TChangeName = {
  name: Scalars['String'],
};

export type TChangeOrderPaymentState = {
  paymentState: TPaymentState,
};

export type TChangeOrderShipmentState = {
  shipmentState: TShipmentState,
};

export type TChangeOrderState = {
  orderState: TOrderState,
};

export type TChangePlainEnumValueLabel = {
  attributeName: Scalars['String'],
  newValue: TPlainEnumValueDraft,
};

export type TChangePlainEnumValueOrder = {
  attributeName: Scalars['String'],
  values: Array<TPlainEnumValueDraft>,
};

export type TChangeProductAssetName = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  name: Array<TLocalizedStringItemInputType>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TChangeProductAssetOrder = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  assetOrder: Array<Scalars['String']>,
};

export type TChangeProductDiscountIsActive = {
  isActive: Scalars['Boolean'],
};

export type TChangeProductDiscountName = {
  name: Array<TLocalizedStringItemInputType>,
};

export type TChangeProductDiscountPredicate = {
  predicate: Scalars['String'],
};

export type TChangeProductDiscountSortOrder = {
  sortOrder: Scalars['String'],
};

export type TChangeProductDiscountValue = {
  value: TProductDiscountValueInput,
};

export type TChangeProductImageLabel = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  imageUrl: Scalars['String'],
  label: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TChangeProductMasterVariant = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TChangeProductName = {
  name: Array<TLocalizedStringItemInputType>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TChangeProductPrice = {
  priceId: Maybe<Scalars['String']>,
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  price: TProductPriceDataInput,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TChangeProductSlug = {
  slug: Array<TLocalizedStringItemInputType>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TChangeProjectSettingsCartsConfiguration = {
  cartsConfiguration: TCartsConfigurationInput,
};

export type TChangeProjectSettingsCountries = {
  countries: Array<Scalars['Country']>,
};

export type TChangeProjectSettingsCurrencies = {
  currencies: Array<Scalars['Currency']>,
};

export type TChangeProjectSettingsLanguages = {
  languages: Array<Scalars['Locale']>,
};

export type TChangeProjectSettingsMessagesConfiguration = {
  messagesConfiguration: TMessagesConfigurationDraft,
};

export type TChangeProjectSettingsMessagesEnabled = {
  messagesEnabled: Scalars['Boolean'],
};

export type TChangeProjectSettingsName = {
  name: Scalars['String'],
};

export type TChangeProjectSettingsShoppingListsConfiguration = {
  shoppingListsConfiguration: TShoppingListsConfigurationInput,
};

export type TChangeShippingMethodIsDefault = {
  isDefault: Scalars['Boolean'],
};

export type TChangeShippingMethodName = {
  name: Scalars['String'],
};

export type TChangeShippingMethodTaxCategory = {
  taxCategory: TResourceIdentifierInput,
};

export type TChangeShoppingListLineItemQuantity = {
  lineItemId: Scalars['String'],
  quantity: Scalars['Int'],
};

export type TChangeShoppingListLineItemsOrder = {
  lineItemOrder: Array<Scalars['String']>,
};

export type TChangeShoppingListName = {
  name: Array<TLocalizedStringItemInputType>,
};

export type TChangeShoppingListTextLineItemName = {
  textLineItemId: Scalars['String'],
  name: Array<TLocalizedStringItemInputType>,
};

export type TChangeShoppingListTextLineItemQuantity = {
  textLineItemId: Scalars['String'],
  quantity: Scalars['Int'],
};

export type TChangeShoppingListTextLineItemsOrder = {
  textLineItemOrder: Array<Scalars['String']>,
};

export type TChangeZoneName = {
  name: Scalars['String'],
};

export type TChannel = TVersioned & {
   __typename?: 'Channel',
  id: Scalars['String'],
  version: Scalars['Long'],
  key: Scalars['String'],
  roles: Array<TChannelRole>,
  name: Maybe<Scalars['String']>,
  nameAllLocales: Maybe<Array<TLocalizedString>>,
  description: Maybe<Scalars['String']>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  address: Maybe<TAddress>,
  geoLocation: Maybe<TGeometry>,
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  reviewRatingStatistics: Maybe<TReviewRatingStatistics>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};


export type TChannel_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TChannel_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TChannel_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TChannelDraft = {
  key: Scalars['String'],
  roles: Array<TChannelRole>,
  name: Maybe<Array<TLocalizedStringItemInputType>>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  custom: Maybe<TCustomFieldsDraft>,
  address: Maybe<TAddressInput>,
  geoLocation: Maybe<TGeometryInput>,
};

export type TChannelQueryResult = {
   __typename?: 'ChannelQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TChannel>,
};

export type TChannelReferenceIdentifier = {
   __typename?: 'ChannelReferenceIdentifier',
  typeId: Scalars['String'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
};

export enum TChannelRole {
  /** Role tells that this channel can be used to track inventory entries.Channels with this role can be treated as warehouses */
  InventorySupply = 'InventorySupply',
  /** 
 * Role tells that this channel can be used to expose products to a specific
   * distribution channel. It can be used by the cart to select a product price.
 */
  ProductDistribution = 'ProductDistribution',
  /** Role tells that this channel can be used to track order export activities. */
  OrderExport = 'OrderExport',
  /** Role tells that this channel can be used to track order import activities. */
  OrderImport = 'OrderImport',
  /** 
 * This role can be combined with some other roles (e.g. with `InventorySupply`)
   * to represent the fact that this particular channel is the primary/master
   * channel among the channels of the same type.
 */
  Primary = 'Primary'
}

export type TChannelUpdateAction = {
  addRoles: Maybe<TAddChannelRoles>,
  changeDescription: Maybe<TChangeChannelDescription>,
  changeKey: Maybe<TChangeChannelKey>,
  changeName: Maybe<TChangeChannelName>,
  removeRoles: Maybe<TRemoveChannelRoles>,
  setAddress: Maybe<TSetChannelAddress>,
  setCustomField: Maybe<TSetChannelCustomField>,
  setCustomType: Maybe<TSetChannelCustomType>,
  setGeoLocation: Maybe<TSetChannelGeoLocation>,
  setRoles: Maybe<TSetChannelRoles>,
};

export type TClassificationShippingRateInput = TShippingRateInput & {
   __typename?: 'ClassificationShippingRateInput',
  key: Scalars['String'],
  type: Scalars['String'],
  labelAllLocales: Array<TLocalizedString>,
  label: Maybe<Scalars['String']>,
};


export type TClassificationShippingRateInput_LabelArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TClassificationShippingRateInputDraft = {
  key: Scalars['String'],
};


export type TCreateApiClient = {
  name: Scalars['String'],
  scope: Scalars['String'],
};

export type TCreateStore = {
  key: Scalars['String'],
  name: Maybe<Array<TLocalizedStringItemInputType>>,
  languages: Maybe<Array<Scalars['Locale']>>,
};

export type TCreateZone = {
  name: Scalars['String'],
  key: Maybe<Scalars['String']>,
  description: Maybe<Scalars['String']>,
  locations: Maybe<Array<TZoneLocation>>,
};


/** A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer. */
export type TCustomer = TVersioned & {
   __typename?: 'Customer',
  customerNumber: Maybe<Scalars['String']>,
  email: Scalars['String'],
  password: Scalars['String'],
  addresses: Array<TAddress>,
  defaultShippingAddressId: Maybe<Scalars['String']>,
  defaultBillingAddressId: Maybe<Scalars['String']>,
  shippingAddressIds: Array<Scalars['String']>,
  billingAddressIds: Array<Scalars['String']>,
  isEmailVerified: Scalars['Boolean'],
  customerGroupRef: Maybe<TReference>,
  externalId: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
  firstName: Maybe<Scalars['String']>,
  lastName: Maybe<Scalars['String']>,
  middleName: Maybe<Scalars['String']>,
  title: Maybe<Scalars['String']>,
  locale: Maybe<Scalars['Locale']>,
  salutation: Maybe<Scalars['String']>,
  dateOfBirth: Maybe<Scalars['Date']>,
  companyName: Maybe<Scalars['String']>,
  vatId: Maybe<Scalars['String']>,
  customerGroup: Maybe<TCustomerGroup>,
  defaultShippingAddress: Maybe<TAddress>,
  defaultBillingAddress: Maybe<TAddress>,
  shippingAddresses: Array<TAddress>,
  billingAddresses: Array<TAddress>,
  storesRef: Array<TKeyReference>,
  stores: Array<TStore>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


/** A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer. */
export type TCustomer_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


/** A customer is a person purchasing products. Carts, Orders and Reviews can be associated to a customer. */
export type TCustomer_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

/** A field to access a customer's active cart. */
export type TCustomerActiveCartInterface = {
  customerActiveCart: Maybe<TCart>,
};


/** A field to access a customer's active cart. */
export type TCustomerActiveCartInterface_CustomerActiveCartArgs = {
  customerId: Scalars['String']
};

/** 
 * A customer can be a member in a customer group (e.g. reseller, gold member). A
 * customer group can be used in price calculations with special prices being
 * assigned to certain customer groups.
 */
export type TCustomerGroup = TVersioned & {
   __typename?: 'CustomerGroup',
  id: Scalars['String'],
  version: Scalars['Long'],
  name: Scalars['String'],
  key: Maybe<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


/** 
 * A customer can be a member in a customer group (e.g. reseller, gold member). A
 * customer group can be used in price calculations with special prices being
 * assigned to certain customer groups.
 */
export type TCustomerGroup_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


/** 
 * A customer can be a member in a customer group (e.g. reseller, gold member). A
 * customer group can be used in price calculations with special prices being
 * assigned to certain customer groups.
 */
export type TCustomerGroup_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TCustomerGroupDraft = {
  groupName: Scalars['String'],
  key: Maybe<Scalars['String']>,
  custom: Maybe<TCustomFieldsDraft>,
};

export type TCustomerGroupQueryResult = {
   __typename?: 'CustomerGroupQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TCustomerGroup>,
};

export type TCustomerGroupUpdateAction = {
  changeName: Maybe<TChangeCustomerGroupName>,
  setKey: Maybe<TSetCustomerGroupKey>,
  setCustomType: Maybe<TSetCustomerGroupCustomType>,
  setCustomField: Maybe<TSetCustomerGroupCustomField>,
};

/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface = {
  customer: Maybe<TCustomer>,
  customers: TCustomerQueryResult,
};


/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface_CustomerArgs = {
  emailToken: Maybe<Scalars['String']>,
  passwordToken: Maybe<Scalars['String']>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


/** Fields to access customer accounts. Includes direct access to a single customer and searching for customers. */
export type TCustomerQueryInterface_CustomersArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TCustomerQueryResult = {
   __typename?: 'CustomerQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TCustomer>,
};

export type TCustomerSignInDraft = {
  email: Scalars['String'],
  password: Scalars['String'],
  anonymousCartId: Maybe<Scalars['String']>,
  anonymousCartSignInMode: Maybe<TAnonymousCartSignInMode>,
  anonymousId: Maybe<Scalars['String']>,
  updateProductData: Maybe<Scalars['Boolean']>,
};

export type TCustomerSignInResult = {
   __typename?: 'CustomerSignInResult',
  customer: TCustomer,
  cart: Maybe<TCart>,
};

export type TCustomerSignMeInDraft = {
  email: Scalars['String'],
  password: Scalars['String'],
  activeCartSignInMode: Maybe<TAnonymousCartSignInMode>,
  updateProductData: Maybe<Scalars['Boolean']>,
};

export type TCustomerSignMeUpDraft = {
  email: Scalars['String'],
  password: Scalars['String'],
  firstName: Maybe<Scalars['String']>,
  lastName: Maybe<Scalars['String']>,
  middleName: Maybe<Scalars['String']>,
  title: Maybe<Scalars['String']>,
  dateOfBirth: Maybe<Scalars['Date']>,
  companyName: Maybe<Scalars['String']>,
  vatId: Maybe<Scalars['String']>,
  addresses: Maybe<Array<TAddressInput>>,
  /** 
 * The index of the address in the `addresses` list. The
   * `defaultBillingAddressId` of the customer will be set to the ID of that address.
 */
  defaultBillingAddress: Maybe<Scalars['Int']>,
  /** 
 * The index of the address in the `addresses` list. The
   * `defaultShippingAddressId` of the customer will be set to the ID of that address.
 */
  defaultShippingAddress: Maybe<Scalars['Int']>,
  /** 
 * The indices of the shipping addresses in the `addresses` list. The
   * `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses.
 */
  shippingAddresses: Maybe<Array<Scalars['Int']>>,
  /** 
 * The indices of the billing addresses in the `addresses` list. The
   * `billingAddressIds` of the customer will be set to the IDs of that addresses.
 */
  billingAddresses: Maybe<Array<Scalars['Int']>>,
  custom: Maybe<TCustomFieldsDraft>,
  locale: Maybe<Scalars['Locale']>,
  salutation: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
  stores: Maybe<Array<TResourceIdentifierInput>>,
};

export type TCustomerSignUpDraft = {
  email: Scalars['String'],
  password: Scalars['String'],
  firstName: Maybe<Scalars['String']>,
  lastName: Maybe<Scalars['String']>,
  middleName: Maybe<Scalars['String']>,
  title: Maybe<Scalars['String']>,
  dateOfBirth: Maybe<Scalars['Date']>,
  companyName: Maybe<Scalars['String']>,
  vatId: Maybe<Scalars['String']>,
  addresses: Maybe<Array<TAddressInput>>,
  /** 
 * The index of the address in the `addresses` list. The
   * `defaultBillingAddressId` of the customer will be set to the ID of that address.
 */
  defaultBillingAddress: Maybe<Scalars['Int']>,
  /** 
 * The index of the address in the `addresses` list. The
   * `defaultShippingAddressId` of the customer will be set to the ID of that address.
 */
  defaultShippingAddress: Maybe<Scalars['Int']>,
  /** 
 * The indices of the shipping addresses in the `addresses` list. The
   * `shippingAddressIds` of the `Customer` will be set to the IDs of that addresses.
 */
  shippingAddresses: Maybe<Array<Scalars['Int']>>,
  /** 
 * The indices of the billing addresses in the `addresses` list. The
   * `billingAddressIds` of the customer will be set to the IDs of that addresses.
 */
  billingAddresses: Maybe<Array<Scalars['Int']>>,
  custom: Maybe<TCustomFieldsDraft>,
  locale: Maybe<Scalars['Locale']>,
  salutation: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
  stores: Maybe<Array<TResourceIdentifierInput>>,
  customerNumber: Maybe<Scalars['String']>,
  anonymousCartId: Maybe<Scalars['String']>,
  externalId: Maybe<Scalars['String']>,
  customerGroup: Maybe<TResourceIdentifierInput>,
  isEmailVerified: Maybe<Scalars['Boolean']>,
  anonymousId: Maybe<Scalars['String']>,
};

export type TCustomerToken = {
   __typename?: 'CustomerToken',
  id: Scalars['String'],
  customerId: Scalars['String'],
  createdAt: Scalars['DateTime'],
  expiresAt: Scalars['DateTime'],
  value: Scalars['String'],
};

export type TCustomerUpdateAction = {
  addAddress: Maybe<TAddCustomerAddress>,
  addBillingAddressId: Maybe<TAddCustomerBillingAddressId>,
  addShippingAddressId: Maybe<TAddCustomerShippingAddressId>,
  addStore: Maybe<TAddCustomerStore>,
  changeAddress: Maybe<TChangeCustomerAddress>,
  changeEmail: Maybe<TChangeCustomerEmail>,
  removeAddress: Maybe<TRemoveCustomerAddress>,
  removeBillingAddressId: Maybe<TRemoveCustomerBillingAddressId>,
  removeShippingAddressId: Maybe<TRemoveCustomerShippingAddressId>,
  removeStore: Maybe<TRemoveCustomerStore>,
  setCompanyName: Maybe<TSetCustomerCompanyName>,
  setCustomField: Maybe<TSetCustomerCustomField>,
  setCustomType: Maybe<TSetCustomerCustomType>,
  setCustomerGroup: Maybe<TSetCustomerGroup>,
  setKey: Maybe<TSetCustomerKey>,
  setLocale: Maybe<TSetCustomerLocale>,
  setCustomerNumber: Maybe<TSetCustomerNumber>,
  setDateOfBirth: Maybe<TSetCustomerDateOfBirth>,
  setDefaultBillingAddress: Maybe<TSetCustomerDefaultBillingAddress>,
  setDefaultShippingAddress: Maybe<TSetCustomerDefaultShippingAddress>,
  setExternalId: Maybe<TSetCustomerExternalId>,
  setFirstName: Maybe<TSetCustomerFirstName>,
  setLastName: Maybe<TSetCustomerLastName>,
  setMiddleName: Maybe<TSetCustomerMiddleName>,
  setSalutation: Maybe<TSetCustomerSalutation>,
  setStores: Maybe<TSetCustomerStores>,
  setTitle: Maybe<TSetCustomerTitle>,
  setVatId: Maybe<TSetCustomerVatId>,
};

export type TCustomField = {
  name: Scalars['String'],
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
  name: Scalars['String'],
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
  value: Scalars['String'],
};

export type TCustomFieldsDraft = {
  typeId: Maybe<Scalars['String']>,
  typeKey: Maybe<Scalars['String']>,
  type: Maybe<TResourceIdentifierInput>,
  fields: Maybe<Array<TCustomFieldInput>>,
};

export type TCustomFieldsType = {
   __typename?: 'CustomFieldsType',
  typeRef: TReference,
  type: Maybe<TTypeDefinition>,
  /** This field contains non-typed data. For a typed alternative, have a look at `customFields`. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: TType,
};


export type TCustomFieldsType_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

/** 
 * A custom line item is a generic item that can be added to the cart but is not
 * bound to a product. You can use it for discounts (negative money), vouchers,
 * complex cart rules, additional services or fees. You control the lifecycle of this item.
 */
export type TCustomLineItem = {
   __typename?: 'CustomLineItem',
  id: Scalars['String'],
  name: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  money: TBaseMoney,
  totalPrice: TMoney,
  slug: Scalars['String'],
  quantity: Scalars['Long'],
  state: Array<TItemState>,
  taxCategory: Maybe<TTaxCategory>,
  taxCategoryRef: Maybe<TReference>,
  taxRate: Maybe<TTaxRate>,
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  shippingDetails: Maybe<TItemShippingDetails>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


/** 
 * A custom line item is a generic item that can be added to the cart but is not
 * bound to a product. You can use it for discounts (negative money), vouchers,
 * complex cart rules, additional services or fees. You control the lifecycle of this item.
 */
export type TCustomLineItem_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


/** 
 * A custom line item is a generic item that can be added to the cart but is not
 * bound to a product. You can use it for discounts (negative money), vouchers,
 * complex cart rules, additional services or fees. You control the lifecycle of this item.
 */
export type TCustomLineItem_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


/** 
 * A custom line item is a generic item that can be added to the cart but is not
 * bound to a product. You can use it for discounts (negative money), vouchers,
 * complex cart rules, additional services or fees. You control the lifecycle of this item.
 */
export type TCustomLineItem_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TCustomLineItemDraft = {
  name: Array<TLocalizedStringItemInputType>,
  money: TBaseMoneyInput,
  slug: Scalars['String'],
  taxCategory: Maybe<TReferenceInput>,
  externalTaxRate: Maybe<TExternalTaxRateDraft>,
  quantity: Maybe<Scalars['Long']>,
  custom: Maybe<TCustomFieldsDraft>,
  shippingDetails: Maybe<TItemShippingDetailsDraft>,
};

export type TCustomLineItemReturnItem = TReturnItem & {
   __typename?: 'CustomLineItemReturnItem',
  type: Scalars['String'],
  customLineItemId: Scalars['String'],
  id: Scalars['String'],
  quantity: Scalars['Long'],
  comment: Maybe<Scalars['String']>,
  shipmentState: TReturnShipmentState,
  paymentState: TReturnPaymentState,
  lastModifiedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
};

export type TCustomLineItemsTarget = TCartDiscountTarget & {
   __typename?: 'CustomLineItemsTarget',
  predicate: Scalars['String'],
  type: Scalars['String'],
};

export type TCustomLineItemsTargetInput = {
  predicate: Scalars['String'],
};

export type TCustomSuggestTokenizerInput = {
  text: Scalars['String'],
  suggestTokenizer: Maybe<TBaseSearchKeywordInput>,
};


export type TDateAttribute = TAttribute & {
   __typename?: 'DateAttribute',
  value: Scalars['Date'],
  name: Scalars['String'],
};

export type TDateAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'DateAttributeDefinitionType',
  name: Scalars['String'],
};

export type TDateField = TCustomField & {
   __typename?: 'DateField',
  value: Scalars['Date'],
  name: Scalars['String'],
};


export type TDateTimeAttribute = TAttribute & {
   __typename?: 'DateTimeAttribute',
  value: Scalars['DateTime'],
  name: Scalars['String'],
};

export type TDateTimeAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'DateTimeAttributeDefinitionType',
  name: Scalars['String'],
};

export type TDateTimeField = TCustomField & {
   __typename?: 'DateTimeField',
  value: Scalars['DateTime'],
  name: Scalars['String'],
};

export type TDateTimeType = TFieldType & {
   __typename?: 'DateTimeType',
  name: Scalars['String'],
};

export type TDateType = TFieldType & {
   __typename?: 'DateType',
  name: Scalars['String'],
};

/** Test */
export type TDeleteProductType = TProductType & {
   __typename?: 'DeleteProductType',
  productTypeId: Scalars['String'],
};

export type TDelivery = {
   __typename?: 'Delivery',
  id: Scalars['String'],
  createdAt: Scalars['DateTime'],
  items: Array<TDeliveryItem>,
  parcels: Array<TParcel>,
  address: Maybe<TAddress>,
};

export type TDeliveryItem = {
   __typename?: 'DeliveryItem',
  id: Scalars['String'],
  quantity: Scalars['Long'],
};

export type TDeliveryItemDraftType = {
  id: Scalars['String'],
  quantity: Scalars['Long'],
};

export type TDimensions = {
   __typename?: 'Dimensions',
  width: Scalars['Int'],
  height: Scalars['Int'],
};

export type TDimensionsInput = {
  width: Scalars['Int'],
  height: Scalars['Int'],
};

/** 
 * With discount codes it is possible to give specific cart discounts to an
 * eligible amount of users. They are defined by a string value which can be added
 * to a cart so that specific cart discounts can be applied to the cart.
 */
export type TDiscountCode = TVersioned & {
   __typename?: 'DiscountCode',
  code: Scalars['String'],
  isActive: Scalars['Boolean'],
  maxApplications: Maybe<Scalars['Long']>,
  maxApplicationsPerCustomer: Maybe<Scalars['Long']>,
  cartPredicate: Maybe<Scalars['String']>,
  applicationVersion: Maybe<Scalars['Long']>,
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
  groups: Array<Scalars['String']>,
  name: Maybe<Scalars['String']>,
  description: Maybe<Scalars['String']>,
  cartDiscounts: Array<TCartDiscount>,
  nameAllLocales: Maybe<Array<TLocalizedString>>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  /** How many times this discount code was applied (only applications that were part of a successful checkout are considered) */
  applicationCount: Scalars['Long'],
  cartDiscountRefs: Array<TReference>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


/** 
 * With discount codes it is possible to give specific cart discounts to an
 * eligible amount of users. They are defined by a string value which can be added
 * to a cart so that specific cart discounts can be applied to the cart.
 */
export type TDiscountCode_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


/** 
 * With discount codes it is possible to give specific cart discounts to an
 * eligible amount of users. They are defined by a string value which can be added
 * to a cart so that specific cart discounts can be applied to the cart.
 */
export type TDiscountCode_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


/** 
 * With discount codes it is possible to give specific cart discounts to an
 * eligible amount of users. They are defined by a string value which can be added
 * to a cart so that specific cart discounts can be applied to the cart.
 */
export type TDiscountCode_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


/** 
 * With discount codes it is possible to give specific cart discounts to an
 * eligible amount of users. They are defined by a string value which can be added
 * to a cart so that specific cart discounts can be applied to the cart.
 */
export type TDiscountCode_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TDiscountCodeDraft = {
  code: Scalars['String'],
  name: Maybe<Array<TLocalizedStringItemInputType>>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  cartDiscounts: Array<TReferenceInput>,
  isActive: Maybe<Scalars['Boolean']>,
  maxApplications: Maybe<Scalars['Long']>,
  maxApplicationsPerCustomer: Maybe<Scalars['Long']>,
  cartPredicate: Maybe<Scalars['String']>,
  custom: Maybe<TCustomFieldsDraft>,
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
  groups: Maybe<Array<Scalars['String']>>,
};

export type TDiscountCodeInfo = {
   __typename?: 'DiscountCodeInfo',
  discountCodeRef: TReference,
  state: Maybe<TDiscountCodeState>,
  discountCode: Maybe<TDiscountCode>,
};

export type TDiscountCodeQueryResult = {
   __typename?: 'DiscountCodeQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TDiscountCode>,
};

export enum TDiscountCodeState {
  /** 
 * The discount code is active and none of the discounts were applied because the
   * discount application was stopped by one discount that has the StackingMode of
   * StopAfterThisDiscount defined
 */
  ApplicationStoppedByPreviousDiscount = 'ApplicationStoppedByPreviousDiscount',
  /** 
 * The discount code is not valid or it does not contain any valid cart
   * discounts. Validity is determined based on the validFrom and validUntil dates
 */
  NotValid = 'NotValid',
  /** maxApplications or maxApplicationsPerCustomer for discountCode has been reached. */
  MaxApplicationReached = 'MaxApplicationReached',
  /** 
 * The discount code is active and it contains at least one active and valid
   * CartDiscount. The discount code cartPredicate matches the cart and at least
   * one of the contained active discount’s cart predicates matches the cart.
 */
  MatchesCart = 'MatchesCart',
  /** 
 * The discount code is active and it contains at least one active and valid
   * CartDiscount. But its cart predicate does not match the cart or none of the
   * contained active discount’s cart predicates match the cart
 */
  DoesNotMatchCart = 'DoesNotMatchCart',
  /** The discount code is not active or it does not contain any active cart discounts. */
  NotActive = 'NotActive'
}

export type TDiscountCodeUpdateAction = {
  changeCartDiscounts: Maybe<TChangeDiscountCodeCartDiscounts>,
  changeGroups: Maybe<TChangeDiscountCodeGroups>,
  changeIsActive: Maybe<TChangeDiscountCodeIsActive>,
  setCartPredicate: Maybe<TSetDiscountCodeCartPredicate>,
  setCustomField: Maybe<TSetDiscountCodeCustomField>,
  setCustomType: Maybe<TSetDiscountCodeCustomType>,
  setDescription: Maybe<TSetDiscountCodeDescription>,
  setMaxApplications: Maybe<TSetDiscountCodeMaxApplications>,
  setMaxApplicationsPerCustomer: Maybe<TSetDiscountCodeMaxApplicationsPerCustomer>,
  setName: Maybe<TSetDiscountCodeName>,
  setValidFrom: Maybe<TSetDiscountCodeValidFrom>,
  setValidFromAndUntil: Maybe<TSetDiscountCodeValidFromAndUntil>,
  setValidUntil: Maybe<TSetDiscountCodeValidUntil>,
};

export type TDiscountedLineItemPortion = {
   __typename?: 'DiscountedLineItemPortion',
  discount: Maybe<TCartDiscount>,
  discountRef: TReference,
  discountedAmount: TBaseMoney,
};

export type TDiscountedLineItemPrice = {
   __typename?: 'DiscountedLineItemPrice',
  value: TBaseMoney,
  includedDiscounts: Array<TDiscountedLineItemPortion>,
};

export type TDiscountedLineItemPriceForQuantity = {
   __typename?: 'DiscountedLineItemPriceForQuantity',
  quantity: Scalars['Long'],
  discountedPrice: TDiscountedLineItemPrice,
};

export type TDiscountedProductPriceValue = {
   __typename?: 'DiscountedProductPriceValue',
  value: TBaseMoney,
  discountRef: TReference,
  discount: Maybe<TProductDiscount>,
  /** Temporal. Will be renamed some time in the future. Please use 'discount'. */
  discountRel: Maybe<TProductDiscount>,
};

export type TDiscountedProductPriceValueInput = {
  value: TBaseMoneyInput,
  discount: TReferenceInput,
};

/** dss */
export type TDsdProductType = TProductType & {
   __typename?: 'dsdProductType',
  productTypeId: Scalars['String'],
};

/** All techi stuff with power cables */
export type TElectronicsProductType = TProductType & {
   __typename?: 'ElectronicsProductType',
  productTypeId: Scalars['String'],
  afsefewafewa: Maybe<Array<TLocalizedStringAttribute>>,
  filip: Maybe<TLocalizedStringAttribute>,
  filip2: Maybe<Array<TLocalizedStringAttribute>>,
};

export type TEnumAttribute = TAttribute & {
   __typename?: 'EnumAttribute',
  key: Scalars['String'],
  label: Scalars['String'],
  name: Scalars['String'],
};

export type TEnumAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'EnumAttributeDefinitionType',
  values: TPlainEnumValueResult,
  name: Scalars['String'],
};


export type TEnumAttributeDefinitionType_ValuesArgs = {
  includeKeys: Maybe<Array<Scalars['String']>>,
  excludeKeys: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>,
  sort: Maybe<Array<Scalars['String']>>
};

export type TEnumField = TCustomField & {
   __typename?: 'EnumField',
  key: Scalars['String'],
  name: Scalars['String'],
};

export type TEnumType = TFieldType & {
   __typename?: 'EnumType',
  values: Array<TEnumValue>,
  name: Scalars['String'],
};

export type TEnumTypeDraft = {
  values: Array<TPlainEnumValueDraft>,
};

export type TEnumValue = {
   __typename?: 'EnumValue',
  key: Scalars['String'],
  label: Scalars['String'],
};

/** ew */
export type TEweProductType = TProductType & {
   __typename?: 'eweProductType',
  productTypeId: Scalars['String'],
};

export type TExternalDiscountValue = TProductDiscountValue & {
   __typename?: 'ExternalDiscountValue',
  type: Scalars['String'],
};

export type TExternalDiscountValueInput = {
  dummy: Maybe<Scalars['String']>,
};

export type TExternalLineItemTotalPriceDraft = {
  price: TBaseMoneyInput,
  totalPrice: TMoneyInput,
};

export type TExternalOAuth = {
   __typename?: 'ExternalOAuth',
  url: Scalars['String'],
  authorizationHeader: Scalars['String'],
};

export type TExternalOAuthDraft = {
  url: Scalars['String'],
  authorizationHeader: Scalars['String'],
};

export type TExternalTaxAmountDraft = {
  totalGross: TMoneyInput,
  taxRate: TExternalTaxRateDraft,
};

export type TExternalTaxRateDraft = {
  name: Scalars['String'],
  amount: Scalars['Float'],
  country: Scalars['Country'],
  state: Maybe<Scalars['String']>,
  subRates: Maybe<Array<TSubRateDraft>>,
  includedInPrice: Maybe<Scalars['Boolean']>,
};

/** Field definitions describe custom fields and allow you to define some meta-information associated with the field. */
export type TFieldDefinition = {
   __typename?: 'FieldDefinition',
  name: Scalars['String'],
  required: Scalars['Boolean'],
  inputHint: TTextInputHint,
  label: Maybe<Scalars['String']>,
  labelAllLocales: Array<TLocalizedString>,
  type: TFieldType,
};


/** Field definitions describe custom fields and allow you to define some meta-information associated with the field. */
export type TFieldDefinition_LabelArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TFieldType = {
  name: Scalars['String'],
};

export type TGeometry = {
  type: Scalars['String'],
};

export type TGeometryInput = {
  type: Scalars['String'],
  coordinates: Maybe<Array<Scalars['Float']>>,
};

export type TGiftLineItemValue = TCartDiscountValue & {
   __typename?: 'GiftLineItemValue',
  type: Scalars['String'],
  variantId: Scalars['Int'],
  productRef: TProductReferenceIdentifier,
  distributionChannelRef: Maybe<TChannelReferenceIdentifier>,
  supplyChannelRef: Maybe<TChannelReferenceIdentifier>,
};

export type TGiftLineItemValueInput = {
  product: TResourceIdentifierInput,
  variantId: Scalars['Int'],
  distributionChannel: Maybe<TResourceIdentifierInput>,
  supplyChannel: Maybe<TResourceIdentifierInput>,
};

export type THighPrecisionMoney = TBaseMoney & {
   __typename?: 'HighPrecisionMoney',
  type: Scalars['String'],
  currencyCode: Scalars['Currency'],
  preciseAmount: Scalars['Long'],
  centAmount: Scalars['Long'],
  fractionDigits: Scalars['Int'],
};

export type THighPrecisionMoneyInput = {
  currencyCode: Scalars['Currency'],
  preciseAmount: Scalars['Long'],
  fractionDigits: Scalars['Int'],
  centAmount: Maybe<Scalars['Long']>,
};

export type TImage = {
   __typename?: 'Image',
  url: Scalars['String'],
  dimensions: TDimensions,
  label: Maybe<Scalars['String']>,
};

export type TImageInput = {
  url: Scalars['String'],
  label: Maybe<Scalars['String']>,
  dimensions: TDimensionsInput,
};

export type TImportOrderCustomLineItemState = {
  customLineItemId: Scalars['String'],
  state: Array<TItemStateDraftType>,
};

export type TImportOrderLineItemState = {
  lineItemId: Scalars['String'],
  state: Array<TItemStateDraftType>,
};

export type TInitiator = {
   __typename?: 'Initiator',
  isPlatformClient: Maybe<Scalars['Boolean']>,
  user: Maybe<TReference>,
  externalUserId: Maybe<Scalars['String']>,
  customer: Maybe<TReference>,
  anonymousId: Maybe<Scalars['String']>,
  clientId: Maybe<Scalars['String']>,
};

export type TInStore = TCartQueryInterface & TCustomerActiveCartInterface & TOrderQueryInterface & TCustomerQueryInterface & TShippingMethodsByCartInterface & TMeFieldInterface & {
   __typename?: 'InStore',
  /** 
 * This field can only be used with an access token created with the password flow or with an anonymous session.
   * 
   * It gives access to the data that is specific to the customer or the anonymous session linked to the access token.
 */
  me: TInStoreMe,
  shippingMethodsByCart: Array<TShippingMethod>,
  customer: Maybe<TCustomer>,
  customers: TCustomerQueryResult,
  cart: Maybe<TCart>,
  carts: TCartQueryResult,
  customerActiveCart: Maybe<TCart>,
  order: Maybe<TOrder>,
  orders: TOrderQueryResult,
};


export type TInStore_ShippingMethodsByCartArgs = {
  id: Scalars['String']
};


export type TInStore_CustomerArgs = {
  emailToken: Maybe<Scalars['String']>,
  passwordToken: Maybe<Scalars['String']>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TInStore_CustomersArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TInStore_CartArgs = {
  id: Scalars['String']
};


export type TInStore_CartsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TInStore_CustomerActiveCartArgs = {
  customerId: Scalars['String']
};


export type TInStore_OrderArgs = {
  id: Maybe<Scalars['String']>,
  orderNumber: Maybe<Scalars['String']>
};


export type TInStore_OrdersArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TInStoreMe = TMeQueryInterface & {
   __typename?: 'InStoreMe',
  customer: Maybe<TCustomer>,
  cart: Maybe<TCart>,
  carts: TCartQueryResult,
  activeCart: Maybe<TCart>,
  order: Maybe<TOrder>,
  orders: TOrderQueryResult,
  shoppingList: Maybe<TShoppingList>,
  shoppingLists: TShoppingListQueryResult,
};


export type TInStoreMe_CartArgs = {
  id: Scalars['String']
};


export type TInStoreMe_CartsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TInStoreMe_OrderArgs = {
  id: Maybe<Scalars['String']>,
  orderNumber: Maybe<Scalars['String']>
};


export type TInStoreMe_OrdersArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TInStoreMe_ShoppingListArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TInStoreMe_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TInterfaceInteractionsRaw = {
   __typename?: 'InterfaceInteractionsRaw',
  typeRef: TReference,
  type: Maybe<TTypeDefinition>,
  fields: Array<TRawCustomField>,
};


export type TInterfaceInteractionsRaw_FieldsArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TInterfaceInteractionsRawResult = {
   __typename?: 'InterfaceInteractionsRawResult',
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>,
  total: Scalars['Int'],
  results: Array<TInterfaceInteractionsRaw>,
};

/** Inventory allows you to track stock quantity per SKU and optionally per supply channel */
export type TInventoryEntry = TVersioned & {
   __typename?: 'InventoryEntry',
  sku: Scalars['String'],
  supplyChannel: Maybe<TReference>,
  quantityOnStock: Scalars['Long'],
  availableQuantity: Scalars['Long'],
  restockableInDays: Maybe<Scalars['Int']>,
  expectedDelivery: Maybe<Scalars['DateTime']>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


/** Inventory allows you to track stock quantity per SKU and optionally per supply channel */
export type TInventoryEntry_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


/** Inventory allows you to track stock quantity per SKU and optionally per supply channel */
export type TInventoryEntry_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TInventoryEntryDraft = {
  sku: Scalars['String'],
  quantityOnStock: Maybe<Scalars['Long']>,
  restockableInDays: Maybe<Scalars['Int']>,
  expectedDelivery: Maybe<Scalars['DateTime']>,
  supplyChannel: Maybe<TResourceIdentifierInput>,
  custom: Maybe<TCustomFieldsDraft>,
};

export type TInventoryEntryQueryResult = {
   __typename?: 'InventoryEntryQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TInventoryEntry>,
};

export type TInventoryEntryUpdateAction = {
  addQuantity: Maybe<TAddInventoryEntryQuantity>,
  changeQuantity: Maybe<TChangeInventoryEntryQuantity>,
  removeQuantity: Maybe<TRemoveInventoryEntryQuantity>,
  setRestockableInDays: Maybe<TSetInventoryEntryRestockableInDays>,
  setExpectedDelivery: Maybe<TSetInventoryEntryExpectedDelivery>,
  setSupplyChannel: Maybe<TSetInventoryEntrySupplyChannel>,
  setCustomType: Maybe<TSetInventoryEntryCustomType>,
  setCustomField: Maybe<TSetInventoryEntryCustomField>,
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
   __typename?: 'ItemShippingDetails',
  targets: Array<TItemShippingTarget>,
  valid: Scalars['Boolean'],
};

export type TItemShippingDetailsDraft = {
  targets: Array<TShippingTargetDraft>,
};

export type TItemShippingDetailsDraftType = {
  targets: Array<TShippingTargetDraftType>,
};

export type TItemShippingTarget = {
   __typename?: 'ItemShippingTarget',
  addressKey: Scalars['String'],
  quantity: Scalars['Long'],
};

export type TItemState = {
   __typename?: 'ItemState',
  quantity: Scalars['Long'],
  stateRef: TReference,
  state: Maybe<TState>,
};

export type TItemStateDraftType = {
  quantity: Scalars['Long'],
  state: TReferenceInput,
};


export type TKeyReference = {
   __typename?: 'KeyReference',
  typeId: Scalars['String'],
  key: Scalars['String'],
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
 * Please also note that creating an order is impossible if the product or product
 * variant a line item relates to has been deleted.
 */
export type TLineItem = {
   __typename?: 'LineItem',
  id: Scalars['String'],
  productId: Scalars['String'],
  name: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  productSlug: Maybe<Scalars['String']>,
  productType: Maybe<TProductTypeDefinition>,
  productTypeRef: Maybe<TReference>,
  variant: Maybe<TProductVariant>,
  price: TProductPrice,
  taxedPrice: Maybe<TTaxedItemPrice>,
  totalPrice: Maybe<TMoney>,
  quantity: Scalars['Long'],
  state: Array<TItemState>,
  taxRate: Maybe<TTaxRate>,
  supplyChannel: Maybe<TChannel>,
  supplyChannelRef: Maybe<TReference>,
  distributionChannel: Maybe<TChannel>,
  distributionChannelRef: Maybe<TReference>,
  discountedPricePerQuantity: Array<TDiscountedLineItemPriceForQuantity>,
  lineItemMode: TLineItemMode,
  priceMode: TLineItemPriceMode,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  shippingDetails: Maybe<TItemShippingDetails>,
  inventoryMode: Maybe<TItemShippingDetails>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
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
 * Please also note that creating an order is impossible if the product or product
 * variant a line item relates to has been deleted.
 */
export type TLineItem_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
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
 * Please also note that creating an order is impossible if the product or product
 * variant a line item relates to has been deleted.
 */
export type TLineItem_ProductSlugArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
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
 * Please also note that creating an order is impossible if the product or product
 * variant a line item relates to has been deleted.
 */
export type TLineItem_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
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
 * Please also note that creating an order is impossible if the product or product
 * variant a line item relates to has been deleted.
 */
export type TLineItem_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TLineItemDraft = {
  productId: Maybe<Scalars['String']>,
  sku: Maybe<Scalars['String']>,
  quantity: Maybe<Scalars['Long']>,
  variantId: Maybe<Scalars['Int']>,
  supplyChannel: Maybe<TResourceIdentifierInput>,
  distributionChannel: Maybe<TResourceIdentifierInput>,
  custom: Maybe<TCustomFieldsDraft>,
  shippingDetails: Maybe<TItemShippingDetailsDraft>,
  externalTaxRate: Maybe<TExternalTaxRateDraft>,
  externalPrice: Maybe<TBaseMoneyInput>,
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>,
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
  /** 
 * The line item price was set externally. Cart discounts can apply to line items
   * with this price mode. All update actions that change the quantity of a line
   * item with this price mode require the externalPrice field to be given.
 */
  ExternalPrice = 'ExternalPrice',
  /** The line item price with the total was set externally. */
  ExternalTotal = 'ExternalTotal'
}

export type TLineItemReturnItem = TReturnItem & {
   __typename?: 'LineItemReturnItem',
  type: Scalars['String'],
  lineItemId: Scalars['String'],
  id: Scalars['String'],
  quantity: Scalars['Long'],
  comment: Maybe<Scalars['String']>,
  shipmentState: TReturnShipmentState,
  paymentState: TReturnPaymentState,
  lastModifiedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
};

export type TLineItemsTarget = TCartDiscountTarget & {
   __typename?: 'LineItemsTarget',
  predicate: Scalars['String'],
  type: Scalars['String'],
};

export type TLineItemsTargetInput = {
  predicate: Scalars['String'],
};


export type TLocalizableEnumAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'LocalizableEnumAttributeDefinitionType',
  values: TLocalizableEnumValueTypeResult,
  name: Scalars['String'],
};


export type TLocalizableEnumAttributeDefinitionType_ValuesArgs = {
  includeKeys: Maybe<Array<Scalars['String']>>,
  excludeKeys: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>,
  sort: Maybe<Array<Scalars['String']>>
};

export type TLocalizableEnumTypeDraft = {
  values: Array<TLocalizedEnumValueDraft>,
};

export type TLocalizableEnumValueType = {
   __typename?: 'LocalizableEnumValueType',
  key: Scalars['String'],
  label: Maybe<Scalars['String']>,
  labelAllLocales: Array<TLocalizedString>,
};


export type TLocalizableEnumValueType_LabelArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TLocalizableEnumValueTypeResult = {
   __typename?: 'LocalizableEnumValueTypeResult',
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>,
  total: Scalars['Int'],
  results: Array<TLocalizableEnumValueType>,
};

export type TLocalizableTextAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'LocalizableTextAttributeDefinitionType',
  name: Scalars['String'],
};

export type TLocalizedEnumAttribute = TAttribute & {
   __typename?: 'LocalizedEnumAttribute',
  key: Scalars['String'],
  label: Maybe<Scalars['String']>,
  name: Scalars['String'],
};


export type TLocalizedEnumAttribute_LabelArgs = {
  locale: Scalars['Locale']
};

export type TLocalizedEnumField = TCustomField & {
   __typename?: 'LocalizedEnumField',
  key: Scalars['String'],
  label: Maybe<Scalars['String']>,
  name: Scalars['String'],
};


export type TLocalizedEnumField_LabelArgs = {
  locale: Scalars['Locale']
};

export type TLocalizedEnumType = TFieldType & {
   __typename?: 'LocalizedEnumType',
  values: Array<TLocalizedEnumValue>,
  name: Scalars['String'],
};

export type TLocalizedEnumValue = {
   __typename?: 'LocalizedEnumValue',
  key: Scalars['String'],
  label: Maybe<Scalars['String']>,
  labelAllLocales: Array<TLocalizedString>,
};


export type TLocalizedEnumValue_LabelArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TLocalizedEnumValueDraft = {
  key: Scalars['String'],
  label: Array<TLocalizedStringItemInputType>,
};

export type TLocalizedEnumValueInput = {
  key: Scalars['String'],
  label: Array<TLocalizedStringItemInputType>,
};

export type TLocalizedString = {
   __typename?: 'LocalizedString',
  locale: Scalars['Locale'],
  value: Scalars['String'],
};

export type TLocalizedStringAttribute = TAttribute & {
   __typename?: 'LocalizedStringAttribute',
  value: Maybe<Scalars['String']>,
  name: Scalars['String'],
};


export type TLocalizedStringAttribute_ValueArgs = {
  locale: Scalars['Locale']
};

export type TLocalizedStringField = TCustomField & {
   __typename?: 'LocalizedStringField',
  value: Maybe<Scalars['String']>,
  name: Scalars['String'],
};


export type TLocalizedStringField_ValueArgs = {
  locale: Scalars['Locale']
};

export type TLocalizedStringItemInputType = {
  locale: Scalars['Locale'],
  value: Scalars['String'],
};

export type TLocalizedStringType = TFieldType & {
   __typename?: 'LocalizedStringType',
  name: Scalars['String'],
};

export type TLocalizedText = {
  text: Scalars['String'],
  locale: Scalars['Locale'],
};

export type TLocation = {
   __typename?: 'Location',
  country: Scalars['Country'],
  state: Maybe<Scalars['String']>,
};


export type TMe = TMeQueryInterface & {
   __typename?: 'Me',
  customer: Maybe<TCustomer>,
  cart: Maybe<TCart>,
  carts: TCartQueryResult,
  activeCart: Maybe<TCart>,
  order: Maybe<TOrder>,
  orders: TOrderQueryResult,
  shoppingList: Maybe<TShoppingList>,
  shoppingLists: TShoppingListQueryResult,
};


export type TMe_CartArgs = {
  id: Scalars['String']
};


export type TMe_CartsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TMe_OrderArgs = {
  id: Maybe<Scalars['String']>,
  orderNumber: Maybe<Scalars['String']>
};


export type TMe_OrdersArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TMe_ShoppingListArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMe_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

/** The me field gives access to the data that is specific to the customer or anonymous session linked to the access token. */
export type TMeFieldInterface = {
  me: TMeQueryInterface,
};

export type TMeQueryInterface = {
  cart: Maybe<TCart>,
  carts: TCartQueryResult,
  activeCart: Maybe<TCart>,
  order: Maybe<TOrder>,
  orders: TOrderQueryResult,
  shoppingList: Maybe<TShoppingList>,
  shoppingLists: TShoppingListQueryResult,
};


export type TMeQueryInterface_CartArgs = {
  id: Scalars['String']
};


export type TMeQueryInterface_CartsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TMeQueryInterface_OrderArgs = {
  id: Maybe<Scalars['String']>,
  orderNumber: Maybe<Scalars['String']>
};


export type TMeQueryInterface_OrdersArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TMeQueryInterface_ShoppingListArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMeQueryInterface_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TMessagesConfiguration = {
   __typename?: 'MessagesConfiguration',
  enabled: Scalars['Boolean'],
  deleteDaysAfterCreation: Maybe<Scalars['Int']>,
};

export type TMessagesConfigurationDraft = {
  enabled: Scalars['Boolean'],
  deleteDaysAfterCreation: Scalars['Int'],
};

export type TMoney = TBaseMoney & {
   __typename?: 'Money',
  type: Scalars['String'],
  currencyCode: Scalars['Currency'],
  centAmount: Scalars['Long'],
  /** For the `Money` it equals to the default number of fraction digits used with the currency. */
  fractionDigits: Scalars['Int'],
};

export type TMoneyAttribute = TAttribute & {
   __typename?: 'MoneyAttribute',
  centAmount: Scalars['Long'],
  currencyCode: Scalars['Currency'],
  name: Scalars['String'],
};

export type TMoneyAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'MoneyAttributeDefinitionType',
  name: Scalars['String'],
};

export type TMoneyDraft = {
  currencyCode: Scalars['Currency'],
  centAmount: Scalars['Long'],
};

export type TMoneyField = TCustomField & {
   __typename?: 'MoneyField',
  centAmount: Scalars['Long'],
  currencyCode: Scalars['Currency'],
  name: Scalars['String'],
};

export type TMoneyInput = {
  currencyCode: Scalars['Currency'],
  centAmount: Scalars['Long'],
};

export type TMoneyType = TFieldType & {
   __typename?: 'MoneyType',
  name: Scalars['String'],
};

export type TMoveProductImageToPosition = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  imageUrl: Scalars['String'],
  position: Scalars['Int'],
  staged: Maybe<Scalars['Boolean']>,
};

export type TMultiBuyCustomLineItemsTarget = TCartDiscountTarget & {
   __typename?: 'MultiBuyCustomLineItemsTarget',
  predicate: Scalars['String'],
  triggerQuantity: Scalars['Long'],
  discountedQuantity: Scalars['Long'],
  maxOccurrence: Maybe<Scalars['Int']>,
  selectionMode: TSelectionMode,
  type: Scalars['String'],
};

export type TMultiBuyCustomLineItemsTargetInput = {
  predicate: Scalars['String'],
  triggerQuantity: Scalars['Long'],
  discountedQuantity: Scalars['Long'],
  maxOccurrence: Maybe<Scalars['Int']>,
  selectionMode: Maybe<TSelectionMode>,
};

export type TMultiBuyLineItemsTarget = TCartDiscountTarget & {
   __typename?: 'MultiBuyLineItemsTarget',
  predicate: Scalars['String'],
  triggerQuantity: Scalars['Long'],
  discountedQuantity: Scalars['Long'],
  maxOccurrence: Maybe<Scalars['Int']>,
  selectionMode: TSelectionMode,
  type: Scalars['String'],
};

export type TMultiBuyLineItemsTargetInput = {
  predicate: Scalars['String'],
  triggerQuantity: Scalars['Long'],
  discountedQuantity: Scalars['Long'],
  maxOccurrence: Maybe<Scalars['Int']>,
  selectionMode: Maybe<TSelectionMode>,
};

export type TMutation = {
   __typename?: 'Mutation',
  createCustomerGroup: Maybe<TCustomerGroup>,
  updateCustomerGroup: Maybe<TCustomerGroup>,
  deleteCustomerGroup: Maybe<TCustomerGroup>,
  createCategory: Maybe<TCategory>,
  updateCategory: Maybe<TCategory>,
  deleteCategory: Maybe<TCategory>,
  createChannel: Maybe<TChannel>,
  updateChannel: Maybe<TChannel>,
  deleteChannel: Maybe<TChannel>,
  createProductType: Maybe<TProductTypeDefinition>,
  updateProductType: Maybe<TProductTypeDefinition>,
  deleteProductType: Maybe<TProductTypeDefinition>,
  createShippingMethod: Maybe<TShippingMethod>,
  updateShippingMethod: Maybe<TShippingMethod>,
  deleteShippingMethod: Maybe<TShippingMethod>,
  createZone: Maybe<TZone>,
  updateZone: Maybe<TZone>,
  deleteZone: Maybe<TZone>,
  createTaxCategory: Maybe<TTaxCategory>,
  updateTaxCategory: Maybe<TTaxCategory>,
  deleteTaxCategory: Maybe<TTaxCategory>,
  createDiscountCode: Maybe<TDiscountCode>,
  updateDiscountCode: Maybe<TDiscountCode>,
  deleteDiscountCode: Maybe<TDiscountCode>,
  createCartDiscount: Maybe<TCartDiscount>,
  updateCartDiscount: Maybe<TCartDiscount>,
  deleteCartDiscount: Maybe<TCartDiscount>,
  createProductDiscount: Maybe<TProductDiscount>,
  updateProductDiscount: Maybe<TProductDiscount>,
  deleteProductDiscount: Maybe<TProductDiscount>,
  createProduct: Maybe<TProduct>,
  updateProduct: Maybe<TProduct>,
  deleteProduct: Maybe<TProduct>,
  /** 
 * Creates a customer. If an anonymous cart is given then the cart is assigned to
   * the created customer and the version number of the Cart will increase. If the
   * id of an anonymous session is given, all carts and orders will be assigned to
   * the created customer.
 */
  customerSignUp: TCustomerSignInResult,
  /** 
 * Retrieves the authenticated customer (a customer that matches the given email/password pair).
   * 
   * There may be carts and orders created before the sign in that should be
   * assigned to the customer account. With the `anonymousCartId`, a single
   * anonymous cart can be assigned. With the `anonymousId`, all orders and carts
   * that have this `anonymousId` set will be assigned to the customer.
   * If both `anonymousCartId` and `anonymousId` are given, the anonymous cart must have the `anonymousId`.
   * 
   * Additionally, there might also exist one or more active customer carts from an
   * earlier session. On customer sign in there are several ways how to proceed
   * with this cart and the cart referenced by the `anonymousCartId`.
   * 
   * * If the customer does not have a cart yet, the anonymous cart becomes the customer's cart.
   * * If the customer already has one or more carts, the content of the anonymous
   * cart will be copied to the customer's active cart that has been modified most recently.
   * 
   *   In this case the `CartState` of the anonymous cart gets changed to `Merged`
   * while the customer's cart remains the `Active` cart.
   * 
   *   If a `LineItem` in the anonymous cart matches an existing line item, or a
   * `CustomLineItem` matches an existing custom line item in the customer's cart,
   * the maximum quantity of both line items is used as the new quantity.
   * 
   *   `ItemShippingDetails` are copied from the item with the highest quantity.
   * 
   *   If `itemShippingAddresses` are different in the two carts, the resulting cart
   * contains the addresses of both the customer cart and the anonymous cart.
   * 
   *   Note, that it is not possible to merge carts that differ in their currency (set during creation of the cart).
   * 
   * If a cart is is returned as part of the `CustomerSignInResult`, it has been
   * recalculated (it will have up-to-date prices, taxes and discounts, and invalid
   * line items have been removed).
 */
  customerSignIn: TCustomerSignInResult,
  updateCustomer: Maybe<TCustomer>,
  deleteCustomer: Maybe<TCustomer>,
  customerChangePassword: Maybe<TCustomer>,
  /** 
 * The following workflow can be used to reset the customer’s password:
   * 
   * 1. Create a password reset token and send it embedded in a link to the customer.
   * 2. When the customer clicks on the link, you may optionally retrieve customer by password token.
   * 3. When the customer entered new password, use reset customer’s password to reset the password.
 */
  customerResetPassword: Maybe<TCustomer>,
  /** Verifies customer's email using a token. */
  customerConfirmEmail: Maybe<TCustomer>,
  /** 
 * The token value is used to reset the password of the customer with the given
   * email. The token is valid only for 10 minutes.
 */
  customerCreatePasswordResetToken: Maybe<TCustomerToken>,
  customerCreateEmailVerificationToken: TCustomerToken,
  /** 
 * If used with an access token for Anonymous Sessions, all orders and carts
   * belonging to the anonymousId will be assigned to the newly created customer.
 */
  customerSignMeUp: TCustomerSignInResult,
  /** 
 * Retrieves the authenticated customer (a customer that matches the given email/password pair).
   * 
   * If used with an access token for Anonymous Sessions, all orders and carts
   * belonging to the `anonymousId` will be assigned to the newly created customer.
   * 
   * * If the customer does not have a cart yet, the anonymous cart that was
   * modified most recently becomes the customer's cart.
   * * If the customer already has a cart, the most recently modified anonymous
   * cart will be handled according to the `AnonymousCartSignInMode`.
   * 
   * If a cart is is returned as part of the `CustomerSignInResult`, it has been
   * recalculated (it will have up-to-date prices, taxes and discounts, and invalid
   * line items have been removed).
 */
  customerSignMeIn: TCustomerSignInResult,
  updateMyCustomer: Maybe<TCustomer>,
  deleteMyCustomer: Maybe<TCustomer>,
  customerChangeMyPassword: Maybe<TCustomer>,
  customerConfirmMyEmail: Maybe<TCustomer>,
  customerResetMyPassword: Maybe<TCustomer>,
  createInventoryEntry: Maybe<TInventoryEntry>,
  updateInventoryEntry: Maybe<TInventoryEntry>,
  deleteInventoryEntry: Maybe<TInventoryEntry>,
  createCart: Maybe<TCart>,
  updateCart: Maybe<TCart>,
  deleteCart: Maybe<TCart>,
  replicateCart: Maybe<TCart>,
  createMyCart: Maybe<TCart>,
  updateMyCart: Maybe<TCart>,
  deleteMyCart: Maybe<TCart>,
  createOrderFromCart: Maybe<TOrder>,
  updateOrder: Maybe<TOrder>,
  deleteOrder: Maybe<TOrder>,
  createMyOrderFromCart: Maybe<TOrder>,
  createShoppingList: Maybe<TShoppingList>,
  updateShoppingList: Maybe<TShoppingList>,
  deleteShoppingList: Maybe<TShoppingList>,
  createMyShoppingList: Maybe<TShoppingList>,
  updateMyShoppingList: Maybe<TShoppingList>,
  deleteMyShoppingList: Maybe<TShoppingList>,
  updateProject: Maybe<TProjectProjection>,
  createStore: Maybe<TStore>,
  updateStore: Maybe<TStore>,
  deleteStore: Maybe<TStore>,
  createApiClient: Maybe<TApiClientWithSecret>,
  deleteApiClient: Maybe<TApiClientWithoutSecret>,
};


export type TMutation_CreateCustomerGroupArgs = {
  draft: TCustomerGroupDraft
};


export type TMutation_UpdateCustomerGroupArgs = {
  version: Scalars['Long'],
  actions: Array<TCustomerGroupUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteCustomerGroupArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateCategoryArgs = {
  draft: TCategoryDraft
};


export type TMutation_UpdateCategoryArgs = {
  version: Scalars['Long'],
  actions: Array<TCategoryUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteCategoryArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateChannelArgs = {
  draft: TChannelDraft
};


export type TMutation_UpdateChannelArgs = {
  id: Scalars['String'],
  version: Scalars['Long'],
  actions: Array<TChannelUpdateAction>
};


export type TMutation_DeleteChannelArgs = {
  id: Scalars['String'],
  version: Scalars['Long']
};


export type TMutation_CreateProductTypeArgs = {
  draft: TProductTypeDraft
};


export type TMutation_UpdateProductTypeArgs = {
  version: Scalars['Long'],
  actions: Array<TProductTypeUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteProductTypeArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateShippingMethodArgs = {
  draft: TShippingMethodDraft
};


export type TMutation_UpdateShippingMethodArgs = {
  version: Scalars['Long'],
  actions: Array<TShippingMethodUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteShippingMethodArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateZoneArgs = {
  draft: TCreateZone
};


export type TMutation_UpdateZoneArgs = {
  version: Scalars['Long'],
  actions: Array<TZoneUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteZoneArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateTaxCategoryArgs = {
  draft: TTaxCategoryDraft
};


export type TMutation_UpdateTaxCategoryArgs = {
  version: Scalars['Long'],
  actions: Array<TTaxCategoryUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteTaxCategoryArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateDiscountCodeArgs = {
  draft: TDiscountCodeDraft
};


export type TMutation_UpdateDiscountCodeArgs = {
  id: Scalars['String'],
  version: Scalars['Long'],
  actions: Array<TDiscountCodeUpdateAction>
};


export type TMutation_DeleteDiscountCodeArgs = {
  id: Scalars['String'],
  version: Scalars['Long']
};


export type TMutation_CreateCartDiscountArgs = {
  draft: TCartDiscountDraft
};


export type TMutation_UpdateCartDiscountArgs = {
  version: Scalars['Long'],
  actions: Array<TCartDiscountUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteCartDiscountArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateProductDiscountArgs = {
  draft: TProductDiscountDraft
};


export type TMutation_UpdateProductDiscountArgs = {
  version: Scalars['Long'],
  actions: Array<TProductDiscountUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteProductDiscountArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateProductArgs = {
  draft: TProductDraft
};


export type TMutation_UpdateProductArgs = {
  version: Scalars['Long'],
  actions: Array<TProductUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteProductArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CustomerSignUpArgs = {
  draft: TCustomerSignUpDraft,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerSignInArgs = {
  draft: TCustomerSignInDraft,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_UpdateCustomerArgs = {
  version: Scalars['Long'],
  actions: Array<TCustomerUpdateAction>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteCustomerArgs = {
  version: Scalars['Long'],
  personalDataErasure?: Maybe<Scalars['Boolean']>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CustomerChangePasswordArgs = {
  id: Scalars['String'],
  version: Scalars['Long'],
  currentPassword: Scalars['String'],
  newPassword: Scalars['String'],
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerResetPasswordArgs = {
  version: Maybe<Scalars['Long']>,
  tokenValue: Scalars['String'],
  newPassword: Scalars['String'],
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerConfirmEmailArgs = {
  version: Maybe<Scalars['Long']>,
  tokenValue: Scalars['String'],
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerCreatePasswordResetTokenArgs = {
  email: Scalars['String'],
  ttlMinutes: Maybe<Scalars['Int']>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerCreateEmailVerificationTokenArgs = {
  id: Scalars['String'],
  version: Maybe<Scalars['Long']>,
  ttlMinutes: Scalars['Int'],
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerSignMeUpArgs = {
  draft: TCustomerSignMeUpDraft,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerSignMeInArgs = {
  draft: TCustomerSignMeInDraft,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_UpdateMyCustomerArgs = {
  version: Scalars['Long'],
  actions: Array<TMyCustomerUpdateAction>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_DeleteMyCustomerArgs = {
  version: Scalars['Long'],
  personalDataErasure?: Maybe<Scalars['Boolean']>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerChangeMyPasswordArgs = {
  version: Scalars['Long'],
  currentPassword: Scalars['String'],
  newPassword: Scalars['String'],
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerConfirmMyEmailArgs = {
  tokenValue: Scalars['String'],
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CustomerResetMyPasswordArgs = {
  tokenValue: Scalars['String'],
  newPassword: Scalars['String'],
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CreateInventoryEntryArgs = {
  draft: TInventoryEntryDraft
};


export type TMutation_UpdateInventoryEntryArgs = {
  id: Scalars['String'],
  version: Scalars['Long'],
  actions: Array<TInventoryEntryUpdateAction>
};


export type TMutation_DeleteInventoryEntryArgs = {
  id: Scalars['String'],
  version: Scalars['Long']
};


export type TMutation_CreateCartArgs = {
  draft: TCartDraft,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_UpdateCartArgs = {
  id: Scalars['String'],
  version: Scalars['Long'],
  actions: Array<TCartUpdateAction>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_DeleteCartArgs = {
  id: Scalars['String'],
  version: Scalars['Long'],
  personalDataErasure?: Maybe<Scalars['Boolean']>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_ReplicateCartArgs = {
  reference: TReferenceInput
};


export type TMutation_CreateMyCartArgs = {
  draft: TMyCartDraft,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_UpdateMyCartArgs = {
  id: Scalars['String'],
  version: Scalars['Long'],
  actions: Array<TMyCartUpdateAction>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_DeleteMyCartArgs = {
  id: Scalars['String'],
  version: Scalars['Long'],
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CreateOrderFromCartArgs = {
  draft: TOrderCartCommand,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_UpdateOrderArgs = {
  version: Scalars['Long'],
  actions: Array<TOrderUpdateAction>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>,
  id: Maybe<Scalars['String']>,
  orderNumber: Maybe<Scalars['String']>
};


export type TMutation_DeleteOrderArgs = {
  version: Scalars['Long'],
  personalDataErasure?: Maybe<Scalars['Boolean']>,
  storeKey: Maybe<Scalars['KeyReferenceInput']>,
  id: Maybe<Scalars['String']>,
  orderNumber: Maybe<Scalars['String']>
};


export type TMutation_CreateMyOrderFromCartArgs = {
  draft: TOrderMyCartCommand,
  storeKey: Maybe<Scalars['KeyReferenceInput']>
};


export type TMutation_CreateShoppingListArgs = {
  draft: TShoppingListDraft
};


export type TMutation_UpdateShoppingListArgs = {
  version: Scalars['Long'],
  actions: Array<TShoppingListUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteShoppingListArgs = {
  version: Scalars['Long'],
  personalDataErasure?: Maybe<Scalars['Boolean']>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateMyShoppingListArgs = {
  draft: TMyShoppingListDraft
};


export type TMutation_UpdateMyShoppingListArgs = {
  id: Scalars['String'],
  version: Scalars['Long'],
  actions: Array<TMyShoppingListUpdateAction>
};


export type TMutation_DeleteMyShoppingListArgs = {
  id: Scalars['String'],
  version: Scalars['Long']
};


export type TMutation_UpdateProjectArgs = {
  version: Scalars['Long'],
  actions: Array<TProjectSettingsUpdateAction>
};


export type TMutation_CreateStoreArgs = {
  draft: TCreateStore
};


export type TMutation_UpdateStoreArgs = {
  version: Scalars['Long'],
  actions: Array<TStoreUpdateAction>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_DeleteStoreArgs = {
  version: Scalars['Long'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TMutation_CreateApiClientArgs = {
  draft: TCreateApiClient
};


export type TMutation_DeleteApiClientArgs = {
  id: Scalars['String']
};

export type TMyCartDraft = {
  currency: Scalars['Currency'],
  country: Maybe<Scalars['Country']>,
  inventoryMode: Maybe<TInventoryMode>,
  custom: Maybe<TCustomFieldsDraft>,
  customerEmail: Maybe<Scalars['String']>,
  shippingAddress: Maybe<TAddressInput>,
  billingAddress: Maybe<TAddressInput>,
  shippingMethod: Maybe<TResourceIdentifierInput>,
  taxMode: Maybe<TTaxMode>,
  locale: Maybe<Scalars['Locale']>,
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
  itemShippingAddresses: Maybe<Array<TAddressInput>>,
  discountCodes: Maybe<Array<Scalars['String']>>,
  lineItems: Maybe<Array<TMyLineItemDraft>>,
};

export type TMyCartUpdateAction = {
  addDiscountCode: Maybe<TAddCartDiscountCode>,
  addItemShippingAddress: Maybe<TAddCartItemShippingAddress>,
  addLineItem: Maybe<TAddMyCartLineItem>,
  addPayment: Maybe<TAddCartPayment>,
  addShoppingList: Maybe<TAddCartShoppingList>,
  applyDeltaToLineItemShippingDetailsTargets: Maybe<TApplyCartDeltaToLineItemShippingDetailsTargets>,
  changeLineItemQuantity: Maybe<TChangeCartLineItemQuantity>,
  changeTaxMode: Maybe<TChangeMyCartTaxMode>,
  recalculate: Maybe<TRecalculateCart>,
  removeDiscountCode: Maybe<TRemoveCartDiscountCode>,
  removeItemShippingAddress: Maybe<TRemoveCartItemShippingAddress>,
  removeLineItem: Maybe<TRemoveCartLineItem>,
  removePayment: Maybe<TRemoveCartPayment>,
  setBillingAddress: Maybe<TSetCartBillingAddress>,
  setCountry: Maybe<TSetCartCountry>,
  setCustomField: Maybe<TSetCartCustomField>,
  setCustomType: Maybe<TSetCartCustomType>,
  setCustomerEmail: Maybe<TSetCartCustomerEmail>,
  setDeleteDaysAfterLastModification: Maybe<TSetCartDeleteDaysAfterLastModification>,
  setLineItemCustomField: Maybe<TSetCartLineItemCustomField>,
  setLineItemCustomType: Maybe<TSetCartLineItemCustomType>,
  setLineItemShippingDetails: Maybe<TSetCartLineItemShippingDetails>,
  setLocale: Maybe<TSetCartLocale>,
  setShippingMethod: Maybe<TSetMyCartShippingMethod>,
  setShippingAddress: Maybe<TSetCartShippingAddress>,
  updateItemShippingAddress: Maybe<TUpdateCartItemShippingAddress>,
};

export type TMyCustomerUpdateAction = {
  addAddress: Maybe<TAddCustomerAddress>,
  addBillingAddressId: Maybe<TAddCustomerBillingAddressId>,
  addShippingAddressId: Maybe<TAddCustomerShippingAddressId>,
  changeAddress: Maybe<TChangeCustomerAddress>,
  changeEmail: Maybe<TChangeCustomerEmail>,
  removeAddress: Maybe<TRemoveCustomerAddress>,
  removeBillingAddressId: Maybe<TRemoveCustomerBillingAddressId>,
  removeShippingAddressId: Maybe<TRemoveCustomerShippingAddressId>,
  setCompanyName: Maybe<TSetCustomerCompanyName>,
  setCustomField: Maybe<TSetCustomerCustomField>,
  setCustomType: Maybe<TSetCustomerCustomType>,
  setLocale: Maybe<TSetCustomerLocale>,
  setDateOfBirth: Maybe<TSetCustomerDateOfBirth>,
  setDefaultBillingAddress: Maybe<TSetCustomerDefaultBillingAddress>,
  setDefaultShippingAddress: Maybe<TSetCustomerDefaultShippingAddress>,
  setFirstName: Maybe<TSetCustomerFirstName>,
  setLastName: Maybe<TSetCustomerLastName>,
  setMiddleName: Maybe<TSetCustomerMiddleName>,
  setSalutation: Maybe<TSetCustomerSalutation>,
  setTitle: Maybe<TSetCustomerTitle>,
  setVatId: Maybe<TSetCustomerVatId>,
};

export type TMyLineItemDraft = {
  productId: Maybe<Scalars['String']>,
  sku: Maybe<Scalars['String']>,
  quantity: Maybe<Scalars['Long']>,
  variantId: Maybe<Scalars['Int']>,
  supplyChannel: Maybe<TResourceIdentifierInput>,
  distributionChannel: Maybe<TResourceIdentifierInput>,
  custom: Maybe<TCustomFieldsDraft>,
  shippingDetails: Maybe<TItemShippingDetailsDraft>,
};

export type TMyShoppingListDraft = {
  name: Array<TLocalizedStringItemInputType>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  lineItems: Maybe<Array<TShoppingListLineItemDraft>>,
  textLineItems: Maybe<Array<TTextLineItemDraft>>,
  custom: Maybe<TCustomFieldsDraft>,
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
};

export type TMyShoppingListUpdateAction = {
  addLineItem: Maybe<TAddShoppingListLineItem>,
  addTextLineItem: Maybe<TAddShoppingListTextLineItem>,
  changeLineItemQuantity: Maybe<TChangeShoppingListLineItemQuantity>,
  changeLineItemsOrder: Maybe<TChangeShoppingListLineItemsOrder>,
  changeName: Maybe<TChangeShoppingListName>,
  changeTextLineItemName: Maybe<TChangeShoppingListTextLineItemName>,
  changeTextLineItemQuantity: Maybe<TChangeShoppingListTextLineItemQuantity>,
  changeTextLineItemsOrder: Maybe<TChangeShoppingListTextLineItemsOrder>,
  removeLineItem: Maybe<TRemoveShoppingListLineItem>,
  removeTextLineItem: Maybe<TRemoveShoppingListTextLineItem>,
  setCustomField: Maybe<TSetShoppingListCustomField>,
  setCustomType: Maybe<TSetShoppingListCustomType>,
  setDeleteDaysAfterLastModification: Maybe<TSetShoppingListDeleteDaysAfterLastModification>,
  setDescription: Maybe<TSetShoppingListDescription>,
  setLineItemCustomField: Maybe<TSetShoppingListLineItemCustomField>,
  setLineItemCustomType: Maybe<TSetShoppingListLineItemCustomType>,
  setTextLineItemCustomField: Maybe<TSetShoppingListTextLineItemCustomField>,
  setTextLineItemCustomType: Maybe<TSetShoppingListTextLineItemCustomType>,
  setTextLineItemDescription: Maybe<TSetShoppingListTextLineItemDescription>,
};

export type TNestedAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'NestedAttributeDefinitionType',
  typeReference: TReference,
  name: Scalars['String'],
};

export type TNumberAttribute = TAttribute & {
   __typename?: 'NumberAttribute',
  value: Scalars['BigDecimal'],
  name: Scalars['String'],
};

export type TNumberAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'NumberAttributeDefinitionType',
  name: Scalars['String'],
};

export type TNumberField = TCustomField & {
   __typename?: 'NumberField',
  value: Scalars['BigDecimal'],
  name: Scalars['String'],
};

export type TNumberType = TFieldType & {
   __typename?: 'NumberType',
  name: Scalars['String'],
};

/** 
 * An order can be created from a cart, usually after a checkout process has been completed.
 * [documentation](https://docs.commercetools.com/http-api-projects-orders.html)
 */
export type TOrder = TVersioned & {
   __typename?: 'Order',
  customerId: Maybe<Scalars['String']>,
  customer: Maybe<TCustomer>,
  customerEmail: Maybe<Scalars['String']>,
  anonymousId: Maybe<Scalars['String']>,
  lineItems: Array<TLineItem>,
  customLineItems: Array<TCustomLineItem>,
  totalPrice: TMoney,
  taxedPrice: Maybe<TTaxedPrice>,
  shippingAddress: Maybe<TAddress>,
  billingAddress: Maybe<TAddress>,
  inventoryMode: TInventoryMode,
  taxMode: TTaxMode,
  taxRoundingMode: TRoundingMode,
  taxCalculationMode: TTaxCalculationMode,
  customerGroup: Maybe<TCustomerGroup>,
  customerGroupRef: Maybe<TReference>,
  country: Maybe<Scalars['Country']>,
  shippingInfo: Maybe<TShippingInfo>,
  discountCodes: Array<TDiscountCodeInfo>,
  refusedGifts: Array<TCartDiscount>,
  refusedGiftsRefs: Array<TReference>,
  paymentInfo: Maybe<TPaymentInfo>,
  locale: Maybe<Scalars['Locale']>,
  shippingRateInput: Maybe<TShippingRateInput>,
  origin: TCartOrigin,
  storeRef: Maybe<TKeyReference>,
  store: Maybe<TStore>,
  itemShippingAddresses: Array<TAddress>,
  completedAt: Maybe<Scalars['DateTime']>,
  orderNumber: Maybe<Scalars['String']>,
  orderState: TOrderState,
  stateRef: Maybe<TReference>,
  state: Maybe<TState>,
  shipmentState: Maybe<TShipmentState>,
  paymentState: Maybe<TPaymentState>,
  syncInfo: Array<TSyncInfo>,
  returnInfo: Array<TReturnInfo>,
  lastMessageSequenceNumber: Scalars['Long'],
  cartRef: Maybe<TReference>,
  cart: Maybe<TCart>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


/** 
 * An order can be created from a cart, usually after a checkout process has been completed.
 * [documentation](https://docs.commercetools.com/http-api-projects-orders.html)
 */
export type TOrder_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


/** 
 * An order can be created from a cart, usually after a checkout process has been completed.
 * [documentation](https://docs.commercetools.com/http-api-projects-orders.html)
 */
export type TOrder_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TOrderCartCommand = {
  id: Scalars['String'],
  version: Scalars['Long'],
  paymentState: Maybe<TPaymentState>,
  orderState: Maybe<TOrderState>,
  state: Maybe<TReferenceInput>,
  shipmentState: Maybe<TShipmentState>,
  orderNumber: Maybe<Scalars['String']>,
};

export type TOrderMyCartCommand = {
  id: Scalars['String'],
  version: Scalars['Long'],
};

/** Fields to access orders. Includes direct access to a single order and searching for orders. */
export type TOrderQueryInterface = {
  order: Maybe<TOrder>,
  orders: TOrderQueryResult,
};


/** Fields to access orders. Includes direct access to a single order and searching for orders. */
export type TOrderQueryInterface_OrderArgs = {
  id: Maybe<Scalars['String']>,
  orderNumber: Maybe<Scalars['String']>
};


/** Fields to access orders. Includes direct access to a single order and searching for orders. */
export type TOrderQueryInterface_OrdersArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TOrderQueryResult = {
   __typename?: 'OrderQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TOrder>,
};

export enum TOrderState {
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
  Complete = 'Complete',
  Open = 'Open'
}

export type TOrderUpdateAction = {
  addDelivery: Maybe<TAddOrderDelivery>,
  addItemShippingAddress: Maybe<TAddOrderItemShippingAddress>,
  addParcelToDelivery: Maybe<TAddOrderParcelToDelivery>,
  addPayment: Maybe<TAddOrderPayment>,
  addReturnInfo: Maybe<TAddOrderReturnInfo>,
  changeOrderState: Maybe<TChangeOrderState>,
  changePaymentState: Maybe<TChangeOrderPaymentState>,
  changeShipmentState: Maybe<TChangeOrderShipmentState>,
  importCustomLineItemState: Maybe<TImportOrderCustomLineItemState>,
  importLineItemState: Maybe<TImportOrderLineItemState>,
  removeDelivery: Maybe<TRemoveOrderDelivery>,
  removeItemShippingAddress: Maybe<TRemoveOrderItemShippingAddress>,
  removeParcelFromDelivery: Maybe<TRemoveOrderParcelFromDelivery>,
  removePayment: Maybe<TRemoveOrderPayment>,
  setBillingAddress: Maybe<TSetOrderBillingAddress>,
  setCustomField: Maybe<TSetOrderCustomField>,
  setCustomLineItemCustomField: Maybe<TSetOrderCustomLineItemCustomField>,
  setCustomLineItemCustomType: Maybe<TSetOrderCustomLineItemCustomType>,
  setCustomLineItemShippingDetails: Maybe<TSetOrderCustomLineItemShippingDetails>,
  setCustomType: Maybe<TSetOrderCustomType>,
  setCustomerEmail: Maybe<TSetOrderCustomerEmail>,
  setCustomerId: Maybe<TSetOrderCustomerId>,
  setDeliveryAddress: Maybe<TSetOrderDeliveryAddress>,
  setDeliveryItems: Maybe<TSetOrderDeliveryItems>,
  setLineItemCustomField: Maybe<TSetOrderLineItemCustomField>,
  setLineItemCustomType: Maybe<TSetOrderLineItemCustomType>,
  setLineItemShippingDetails: Maybe<TSetOrderLineItemShippingDetails>,
  setLocale: Maybe<TSetOrderLocale>,
  setOrderNumber: Maybe<TSetOrderNumber>,
  setParcelItems: Maybe<TSetOrderParcelItems>,
  setParcelMeasurements: Maybe<TSetOrderParcelMeasurements>,
  setParcelTrackingData: Maybe<TSetOrderParcelTrackingData>,
  setReturnPaymentState: Maybe<TSetOrderReturnPaymentState>,
  setReturnShipmentState: Maybe<TSetOrderReturnShipmentState>,
  setShippingAddress: Maybe<TSetOrderShippingAddress>,
  transitionCustomLineItemState: Maybe<TTransitionOrderCustomLineItemState>,
  transitionLineItemState: Maybe<TTransitionOrderLineItemState>,
  transitionState: Maybe<TTransitionOrderState>,
  updateItemShippingAddress: Maybe<TUpdateOrderItemShippingAddress>,
  updateSyncInfo: Maybe<TUpdateOrderSyncInfo>,
};

export type TParcel = {
   __typename?: 'Parcel',
  id: Scalars['String'],
  createdAt: Scalars['DateTime'],
  measurements: Maybe<TParcelMeasurements>,
  trackingData: Maybe<TTrackingData>,
  items: Array<TDeliveryItem>,
};

export type TParcelMeasurements = {
   __typename?: 'ParcelMeasurements',
  heightInMillimeter: Maybe<Scalars['Int']>,
  lengthInMillimeter: Maybe<Scalars['Int']>,
  widthInMillimeter: Maybe<Scalars['Int']>,
  weightInGram: Maybe<Scalars['Int']>,
};

export type TParcelMeasurementsDraftType = {
  heightInMillimeter: Maybe<Scalars['Int']>,
  lengthInMillimeter: Maybe<Scalars['Int']>,
  widthInMillimeter: Maybe<Scalars['Int']>,
  weightInGram: Maybe<Scalars['Int']>,
};

/** 
 * Payments hold information about the current state of receiving and/or refunding money.
 * [documentation](https://docs.commercetools.com/http-api-projects-payments)
 */
export type TPayment = TVersioned & {
   __typename?: 'Payment',
  key: Maybe<Scalars['String']>,
  customerRef: Maybe<TReference>,
  customer: Maybe<TCustomer>,
  anonymousId: Maybe<Scalars['String']>,
  interfaceId: Maybe<Scalars['String']>,
  amountPlanned: TMoney,
  amountAuthorized: Maybe<TMoney>,
  authorizedUntil: Maybe<Scalars['DateTime']>,
  amountPaid: Maybe<TMoney>,
  amountRefunded: Maybe<TMoney>,
  paymentMethodInfo: TPaymentMethodInfo,
  paymentStatus: TPaymentStatus,
  transactions: Array<TTransaction>,
  interfaceInteractionsRaw: TInterfaceInteractionsRawResult,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


/** 
 * Payments hold information about the current state of receiving and/or refunding money.
 * [documentation](https://docs.commercetools.com/http-api-projects-payments)
 */
export type TPayment_InterfaceInteractionsRawArgs = {
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


/** 
 * Payments hold information about the current state of receiving and/or refunding money.
 * [documentation](https://docs.commercetools.com/http-api-projects-payments)
 */
export type TPayment_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


/** 
 * Payments hold information about the current state of receiving and/or refunding money.
 * [documentation](https://docs.commercetools.com/http-api-projects-payments)
 */
export type TPayment_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TPaymentInfo = {
   __typename?: 'PaymentInfo',
  payments: Array<TPayment>,
  paymentRefs: Array<TReference>,
};

export type TPaymentMethodInfo = {
   __typename?: 'PaymentMethodInfo',
  paymentInterface: Maybe<Scalars['String']>,
  method: Maybe<Scalars['String']>,
  name: Maybe<Scalars['String']>,
  nameAllLocales: Maybe<Array<TLocalizedString>>,
};


export type TPaymentMethodInfo_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TPaymentQueryResult = {
   __typename?: 'PaymentQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TPayment>,
};

export enum TPaymentState {
  Paid = 'Paid',
  CreditOwed = 'CreditOwed',
  Pending = 'Pending',
  Failed = 'Failed',
  BalanceDue = 'BalanceDue'
}

export type TPaymentStatus = {
   __typename?: 'PaymentStatus',
  interfaceCode: Maybe<Scalars['String']>,
  interfaceText: Maybe<Scalars['String']>,
  stateRef: Maybe<TReference>,
  state: Maybe<TState>,
};

/** 2ww */
export type TPensProductType = TProductType & {
   __typename?: 'pensProductType',
  productTypeId: Scalars['String'],
};

export type TPlainEnumValue = {
   __typename?: 'PlainEnumValue',
  key: Scalars['String'],
  label: Scalars['String'],
};

export type TPlainEnumValueDraft = {
  key: Scalars['String'],
  label: Scalars['String'],
};

export type TPlainEnumValueResult = {
   __typename?: 'PlainEnumValueResult',
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>,
  total: Scalars['Int'],
  results: Array<TPlainEnumValue>,
};

export type TPoint = TGeometry & {
   __typename?: 'Point',
  coordinates: Array<Scalars['Float']>,
  type: Scalars['String'],
};

export type TPriceFunction = {
   __typename?: 'PriceFunction',
  function: Scalars['String'],
  currencyCode: Scalars['Currency'],
};

export type TPriceFunctionDraft = {
  function: Scalars['String'],
  currencyCode: Scalars['Currency'],
};

export type TProduct = TVersioned & {
   __typename?: 'Product',
  id: Scalars['String'],
  key: Maybe<Scalars['String']>,
  version: Scalars['Long'],
  productTypeRef: TReference,
  productType: Maybe<TProductTypeDefinition>,
  masterData: TProductCatalogData,
  catalogData: Maybe<TProductCatalogData>,
  skus: Array<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  stateRef: Maybe<TReference>,
  state: Maybe<TState>,
  taxCategoryRef: Maybe<TReference>,
  taxCategory: Maybe<TTaxCategory>,
  reviewRatingStatistics: Maybe<TReviewRatingStatistics>,
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};


export type TProduct_CatalogDataArgs = {
  id: Scalars['String']
};

export type TProductAttributeInput = {
  name: Scalars['String'],
  value: Scalars['String'],
};

export type TProductCatalogData = {
   __typename?: 'ProductCatalogData',
  current: Maybe<TProductData>,
  staged: Maybe<TProductData>,
  published: Scalars['Boolean'],
  hasStagedChanges: Scalars['Boolean'],
};

export type TProductData = {
   __typename?: 'ProductData',
  name: Maybe<Scalars['String']>,
  description: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  slug: Maybe<Scalars['String']>,
  categoryOrderHint: Maybe<Scalars['String']>,
  categoryOrderHints: Array<TCategoryOrderHint>,
  categoriesRef: Array<TReference>,
  categories: Array<TCategory>,
  searchKeyword: Maybe<Array<TSearchKeyword>>,
  searchKeywords: Array<TSearchKeywords>,
  metaTitle: Maybe<Scalars['String']>,
  metaKeywords: Maybe<Scalars['String']>,
  metaDescription: Maybe<Scalars['String']>,
  masterVariant: TProductVariant,
  variants: Array<TProductVariant>,
  allVariants: Array<TProductVariant>,
  variant: Maybe<TProductVariant>,
  skus: Array<Scalars['String']>,
};


export type TProductData_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TProductData_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TProductData_SlugArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TProductData_CategoryOrderHintArgs = {
  categoryId: Scalars['String']
};


export type TProductData_SearchKeywordArgs = {
  locale: Scalars['Locale']
};


export type TProductData_MetaTitleArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TProductData_MetaKeywordsArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TProductData_MetaDescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TProductData_VariantsArgs = {
  skus: Maybe<Array<Scalars['String']>>,
  isOnStock: Maybe<Scalars['Boolean']>,
  stockChannelIds: Maybe<Array<Scalars['String']>>,
  hasImages: Maybe<Scalars['Boolean']>
};


export type TProductData_AllVariantsArgs = {
  skus: Maybe<Array<Scalars['String']>>,
  isOnStock: Maybe<Scalars['Boolean']>,
  stockChannelIds: Maybe<Array<Scalars['String']>>,
  hasImages: Maybe<Scalars['Boolean']>
};


export type TProductData_VariantArgs = {
  sku: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};

/** 
 * A product price can be discounted in two ways:
 * 
 * * with a relative or an absolute product discount, which will be automatically
 * applied to all prices in a product that match a discount predicate.
 *   A relative discount reduces the matching price by a fraction (for example 10 %
 * off). An absolute discount reduces the matching price by a fixed amount (for
 * example 10€ off). If more than one product discount matches a price, the
 * discount sort order determines which one will be applied.
 * * with an external product discount, which can then be used to explicitly set a
 * discounted value on a particular product price.
 * 
 * The discounted price is stored in the discounted field of the Product Price.
 * 
 * Note that when a discount is created, updated or removed it can take up to 15
 * minutes to update all the prices with the discounts.
 * 
 * The maximum number of ProductDiscounts that can be active at the same time is **200**.
 */
export type TProductDiscount = TVersioned & {
   __typename?: 'ProductDiscount',
  predicate: Scalars['String'],
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
  isActive: Scalars['Boolean'],
  isValid: Scalars['Boolean'],
  sortOrder: Scalars['String'],
  key: Maybe<Scalars['String']>,
  name: Maybe<Scalars['String']>,
  description: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  value: TProductDiscountValue,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};


/** 
 * A product price can be discounted in two ways:
 * 
 * * with a relative or an absolute product discount, which will be automatically
 * applied to all prices in a product that match a discount predicate.
 *   A relative discount reduces the matching price by a fraction (for example 10 %
 * off). An absolute discount reduces the matching price by a fixed amount (for
 * example 10€ off). If more than one product discount matches a price, the
 * discount sort order determines which one will be applied.
 * * with an external product discount, which can then be used to explicitly set a
 * discounted value on a particular product price.
 * 
 * The discounted price is stored in the discounted field of the Product Price.
 * 
 * Note that when a discount is created, updated or removed it can take up to 15
 * minutes to update all the prices with the discounts.
 * 
 * The maximum number of ProductDiscounts that can be active at the same time is **200**.
 */
export type TProductDiscount_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


/** 
 * A product price can be discounted in two ways:
 * 
 * * with a relative or an absolute product discount, which will be automatically
 * applied to all prices in a product that match a discount predicate.
 *   A relative discount reduces the matching price by a fraction (for example 10 %
 * off). An absolute discount reduces the matching price by a fixed amount (for
 * example 10€ off). If more than one product discount matches a price, the
 * discount sort order determines which one will be applied.
 * * with an external product discount, which can then be used to explicitly set a
 * discounted value on a particular product price.
 * 
 * The discounted price is stored in the discounted field of the Product Price.
 * 
 * Note that when a discount is created, updated or removed it can take up to 15
 * minutes to update all the prices with the discounts.
 * 
 * The maximum number of ProductDiscounts that can be active at the same time is **200**.
 */
export type TProductDiscount_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TProductDiscountDraft = {
  value: TProductDiscountValueInput,
  predicate: Scalars['String'],
  sortOrder: Scalars['String'],
  name: Array<TLocalizedStringItemInputType>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
  isActive: Maybe<Scalars['Boolean']>,
  key: Maybe<Scalars['String']>,
};

export type TProductDiscountQueryResult = {
   __typename?: 'ProductDiscountQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TProductDiscount>,
};

export type TProductDiscountUpdateAction = {
  changeIsActive: Maybe<TChangeProductDiscountIsActive>,
  changeName: Maybe<TChangeProductDiscountName>,
  changePredicate: Maybe<TChangeProductDiscountPredicate>,
  changeSortOrder: Maybe<TChangeProductDiscountSortOrder>,
  changeValue: Maybe<TChangeProductDiscountValue>,
  setDescription: Maybe<TSetProductDiscountDescription>,
  setKey: Maybe<TSetProductDiscountKey>,
  setValidFrom: Maybe<TSetProductDiscountValidFrom>,
  setValidFromAndUntil: Maybe<TSetProductDiscountValidFromAndUntil>,
  setValidUntil: Maybe<TSetProductDiscountValidUntil>,
};

export type TProductDiscountValue = {
  type: Scalars['String'],
};

export type TProductDiscountValueInput = {
  relative: Maybe<TRelativeDiscountValueInput>,
  absolute: Maybe<TAbsoluteDiscountValueInput>,
  external: Maybe<TExternalDiscountValueInput>,
};

export type TProductDraft = {
  name: Array<TLocalizedStringItemInputType>,
  productType: TResourceIdentifierInput,
  slug: Array<TLocalizedStringItemInputType>,
  key: Maybe<Scalars['String']>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  categories: Maybe<Array<TResourceIdentifierInput>>,
  categoryOrderHints: Maybe<Array<TCategoryOrderHintInput>>,
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>,
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>,
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>,
  masterVariant: Maybe<TProductVariantInput>,
  variants: Maybe<Array<TProductVariantInput>>,
  taxCategory: Maybe<TResourceIdentifierInput>,
  state: Maybe<TResourceIdentifierInput>,
  searchKeywords: Maybe<Array<TSearchKeywordInput>>,
  publish: Maybe<Scalars['Boolean']>,
};

export type TProductPrice = {
   __typename?: 'ProductPrice',
  id: Maybe<Scalars['String']>,
  value: TBaseMoney,
  country: Maybe<Scalars['Country']>,
  customerGroup: Maybe<TReference>,
  channel: Maybe<TReference>,
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
  discounted: Maybe<TDiscountedProductPriceValue>,
  tiers: Maybe<Array<TProductPriceTier>>,
  /** This field contains non-typed data. Consider using `customFields` as a typed alternative. */
  customFieldsRaw: Maybe<Array<TRawCustomField>>,
  /** This field would contain type data */
  customFields: Maybe<TType>,
  custom: Maybe<TCustomFieldsType>,
  /** Custom fields are returned as a list instead of an object structure. */
  customFieldList: Maybe<Array<TCustomField>>,
};


export type TProductPrice_CustomFieldsRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


export type TProductPrice_CustomFieldListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TProductPriceDataInput = {
  value: TBaseMoneyInput,
  country: Maybe<Scalars['Country']>,
  customerGroup: Maybe<TReferenceInput>,
  channel: Maybe<TResourceIdentifierInput>,
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
  tiers: Maybe<Array<TProductPriceTierInput>>,
  custom: Maybe<TCustomFieldsDraft>,
};

export type TProductPriceTier = {
   __typename?: 'ProductPriceTier',
  minimumQuantity: Scalars['Int'],
  value: TBaseMoney,
};

export type TProductPriceTierInput = {
  minimumQuantity: Scalars['Int'],
  value: TBaseMoneyInput,
};

export type TProductQueryResult = {
   __typename?: 'ProductQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TProduct>,
};

export type TProductReferenceIdentifier = {
   __typename?: 'ProductReferenceIdentifier',
  typeId: Scalars['String'],
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
};

export type TProductType = {
  productTypeId: Scalars['String'],
};

export type TProductTypeDefinition = TVersioned & {
   __typename?: 'ProductTypeDefinition',
  key: Maybe<Scalars['String']>,
  name: Scalars['String'],
  description: Scalars['String'],
  attributeDefinitions: TAttributeDefinitionResult,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};


export type TProductTypeDefinition_AttributeDefinitionsArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>,
  sort: Maybe<Array<Scalars['String']>>
};

export type TProductTypeDefinitionQueryResult = {
   __typename?: 'ProductTypeDefinitionQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TProductTypeDefinition>,
};

export type TProductTypeDraft = {
  name: Scalars['String'],
  description: Scalars['String'],
  key: Maybe<Scalars['String']>,
  attributeDefinitions: Maybe<Array<TAttributeDefinitionDraft>>,
};

export type TProductTypeUpdateAction = {
  setKey: Maybe<TSetKey>,
  changeName: Maybe<TChangeName>,
  changeDescription: Maybe<TChangeDescription>,
  removeAttributeDefinition: Maybe<TRemoveAttributeDefinition>,
  changeLabel: Maybe<TChangeLabel>,
  setInputTip: Maybe<TSetInputTip>,
  changeIsSearchable: Maybe<TChangeIsSearchable>,
  changeInputHint: Maybe<TChangeInputHint>,
  addAttributeDefinition: Maybe<TAddAttributeDefinition>,
  changeAttributeOrder: Maybe<TChangeAttributeOrder>,
  changeAttributeOrderByName: Maybe<TChangeAttributeOrderByName>,
  removeEnumValues: Maybe<TRemoveEnumValues>,
  addPlainEnumValue: Maybe<TAddPlainEnumValue>,
  changePlainEnumValueLabel: Maybe<TChangePlainEnumValueLabel>,
  changePlainEnumValueOrder: Maybe<TChangePlainEnumValueOrder>,
  addLocalizedEnumValue: Maybe<TAddLocalizedEnumValue>,
  changeLocalizedEnumValueLabel: Maybe<TChangeLocalizedEnumValueLabel>,
  changeLocalizedEnumValueOrder: Maybe<TChangeLocalizedEnumValueOrder>,
  changeAttributeName: Maybe<TChangeAttributeName>,
  changeEnumKey: Maybe<TChangeEnumKey>,
};

export type TProductUpdateAction = {
  moveImageToPosition: Maybe<TMoveProductImageToPosition>,
  setSearchKeywords: Maybe<TSetSearchKeywords>,
  revertStagedChanges: Maybe<TRevertStagedChanges>,
  revertStagedVariantChanges: Maybe<TRevertStagedVariantChanges>,
  publish: Maybe<TPublishProduct>,
  unpublish: Maybe<TUnpublishProduct>,
  transitionState: Maybe<TTransitionProductState>,
  addAsset: Maybe<TAddProductAsset>,
  addExternalImage: Maybe<TAddProductExternalImage>,
  addPrice: Maybe<TAddProductPrice>,
  addToCategory: Maybe<TAddProductToCategory>,
  addVariant: Maybe<TAddProductVariant>,
  changeAssetName: Maybe<TChangeProductAssetName>,
  changeAssetOrder: Maybe<TChangeProductAssetOrder>,
  changeMasterVariant: Maybe<TChangeProductMasterVariant>,
  changeImageLabel: Maybe<TChangeProductImageLabel>,
  changeName: Maybe<TChangeProductName>,
  changePrice: Maybe<TChangeProductPrice>,
  changeSlug: Maybe<TChangeProductSlug>,
  removeAsset: Maybe<TRemoveProductAsset>,
  removeFromCategory: Maybe<TRemoveProductFromCategory>,
  removeImage: Maybe<TRemoveProductImage>,
  removePrice: Maybe<TRemoveProductPrice>,
  removeVariant: Maybe<TRemoveProductVariant>,
  setAssetCustomField: Maybe<TSetProductAssetCustomField>,
  setAssetCustomType: Maybe<TSetProductAssetCustomType>,
  setAssetDescription: Maybe<TSetProductAssetDescription>,
  setAssetKey: Maybe<TSetProductAssetKey>,
  setAssetSources: Maybe<TSetProductAssetSources>,
  setAssetTags: Maybe<TSetProductAssetTags>,
  setCategoryOrderHint: Maybe<TSetProductCategoryOrderHint>,
  setDiscountedPrice: Maybe<TSetProductDiscountedPrice>,
  setAttribute: Maybe<TSetProductAttribute>,
  setAttributeInAllVariants: Maybe<TSetProductAttributeInAllVariants>,
  setDescription: Maybe<TSetProductDescription>,
  setImageLabel: Maybe<TSetProductImageLabel>,
  setKey: Maybe<TSetProductKey>,
  setMetaAttributes: Maybe<TSetProductMetaAttributes>,
  setMetaDescription: Maybe<TSetProductMetaDescription>,
  setMetaKeywords: Maybe<TSetProductMetaKeywords>,
  setMetaTitle: Maybe<TSetProductMetaTitle>,
  setProductPriceCustomField: Maybe<TSetProductPriceCustomField>,
  setProductPriceCustomType: Maybe<TSetProductPriceCustomType>,
  setPrices: Maybe<TSetProductPrices>,
  setSku: Maybe<TSetProductSku>,
  setTaxCategory: Maybe<TSetProductTaxCategory>,
  setProductVariantKey: Maybe<TSetProductVariantKey>,
};

export type TProductVariant = {
   __typename?: 'ProductVariant',
  id: Scalars['Int'],
  key: Maybe<Scalars['String']>,
  sku: Maybe<Scalars['String']>,
  prices: Maybe<Array<TProductPrice>>,
  /** Returns a single price based on the price selection rules. */
  price: Maybe<TProductPrice>,
  images: Array<TImage>,
  assets: Array<TAsset>,
  availability: Maybe<TProductVariantAvailabilityWithChannels>,
  /** This field contains non-typed data. Consider using `attributes` as a typed alternative. */
  attributesRaw: Array<TRawProductAttribute>,
  /** Product attributes */
  attributes: TProductType,
  /** Product attributes are returned as a list instead of an object structure. */
  attributeList: Array<TAttribute>,
};


export type TProductVariant_PriceArgs = {
  currency: Scalars['Currency'],
  country: Maybe<Scalars['Country']>,
  customerGroupId: Maybe<Scalars['String']>,
  channelId: Maybe<Scalars['String']>,
  date: Maybe<Scalars['DateTime']>
};


export type TProductVariant_AttributesRawArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};


export type TProductVariant_AttributeListArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

/** Product variant availabilities */
export type TProductVariantAvailabilitiesResult = {
   __typename?: 'ProductVariantAvailabilitiesResult',
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>,
  total: Scalars['Int'],
  results: Array<TProductVariantAvailabilityWithChannel>,
};

/** Product variant availability */
export type TProductVariantAvailability = {
   __typename?: 'ProductVariantAvailability',
  isOnStock: Scalars['Boolean'],
  restockableInDays: Maybe<Scalars['Int']>,
  availableQuantity: Maybe<Scalars['Long']>,
};

export type TProductVariantAvailabilityWithChannel = {
   __typename?: 'ProductVariantAvailabilityWithChannel',
  channelRef: TReference,
  channel: Maybe<TChannel>,
  availability: TProductVariantAvailability,
};

export type TProductVariantAvailabilityWithChannels = {
   __typename?: 'ProductVariantAvailabilityWithChannels',
  noChannel: Maybe<TProductVariantAvailability>,
  channels: TProductVariantAvailabilitiesResult,
};


export type TProductVariantAvailabilityWithChannels_ChannelsArgs = {
  includeChannelIds: Maybe<Array<Scalars['String']>>,
  excludeChannelIds: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TProductVariantInput = {
  sku: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
  prices: Maybe<Array<TProductPriceDataInput>>,
  images: Maybe<Array<TImageInput>>,
  attributes: Maybe<Array<TProductAttributeInput>>,
  assets: Maybe<Array<TAssetDraftInput>>,
};

/** Project contains information about project. */
export type TProjectProjection = {
   __typename?: 'ProjectProjection',
  key: Scalars['String'],
  name: Scalars['String'],
  languages: Array<Scalars['Locale']>,
  createdAt: Scalars['DateTime'],
  trialUntil: Maybe<Scalars['YearMonth']>,
  carts: TCartsConfiguration,
  shoppingLists: TShoppingListsConfiguration,
  version: Scalars['Long'],
  externalOAuth: Maybe<TExternalOAuth>,
  messages: TMessagesConfiguration,
  countries: Array<Scalars['Country']>,
  currencies: Array<Scalars['Currency']>,
  shippingRateInputType: Maybe<TShippingRateInputType>,
};

export type TProjectSettingsUpdateAction = {
  changeCartsConfiguration: Maybe<TChangeProjectSettingsCartsConfiguration>,
  changeCountries: Maybe<TChangeProjectSettingsCountries>,
  changeCurrencies: Maybe<TChangeProjectSettingsCurrencies>,
  changeLanguages: Maybe<TChangeProjectSettingsLanguages>,
  changeMessagesConfiguration: Maybe<TChangeProjectSettingsMessagesConfiguration>,
  changeMessagesEnabled: Maybe<TChangeProjectSettingsMessagesEnabled>,
  changeName: Maybe<TChangeProjectSettingsName>,
  changeShoppingListsConfiguration: Maybe<TChangeProjectSettingsShoppingListsConfiguration>,
  setExternalOAuth: Maybe<TSetProjectSettingsExternalOAuth>,
  setShippingRateInputType: Maybe<TSetProjectSettingsShippingRateInputType>,
};

export type TPublishProduct = {
  scope: Maybe<TPublishScope>,
};

export enum TPublishScope {
  /** Publishes the complete staged projection */
  All = 'All',
  /** Publishes only prices on the staged projection */
  Prices = 'Prices'
}

export type TQuery = TCartQueryInterface & TCustomerActiveCartInterface & TOrderQueryInterface & TCustomerQueryInterface & TShoppingListQueryInterface & TShippingMethodsByCartInterface & TMeFieldInterface & {
   __typename?: 'Query',
  /** 
 * This field can only be used with an access token created with the password flow or with an anonymous session.
   * 
   * It gives access to the data that is specific to the customer or the anonymous session linked to the access token.
 */
  me: TMe,
  /** This field gives access to the resources (such as carts) that are inside the given store. */
  inStore: TInStore,
  /** This field gives access to the resources (such as carts) that are inside one of the given stores. */
  inStores: TInStore,
  customerGroup: Maybe<TCustomerGroup>,
  customerGroups: TCustomerGroupQueryResult,
  category: Maybe<TCategory>,
  categories: TCategoryQueryResult,
  /** Autocomplete the categories based on category fields like name, description, etc. */
  categoryAutocomplete: TCategorySearchResult,
  /** Search the categories using full-text search, filtering and sorting */
  categorySearch: TCategorySearchResult,
  channel: Maybe<TChannel>,
  channels: TChannelQueryResult,
  productType: Maybe<TProductTypeDefinition>,
  productTypes: TProductTypeDefinitionQueryResult,
  typeDefinition: Maybe<TTypeDefinition>,
  typeDefinitions: TTypeDefinitionQueryResult,
  shippingMethod: Maybe<TShippingMethod>,
  shippingMethods: TShippingMethodQueryResult,
  shippingMethodsByCart: Array<TShippingMethod>,
  shippingMethodsByLocation: Array<TShippingMethod>,
  zone: Maybe<TZone>,
  zones: TZoneQueryResult,
  taxCategory: Maybe<TTaxCategory>,
  taxCategories: TTaxCategoryQueryResult,
  discountCode: Maybe<TDiscountCode>,
  discountCodes: TDiscountCodeQueryResult,
  cartDiscount: Maybe<TCartDiscount>,
  cartDiscounts: TCartDiscountQueryResult,
  productDiscount: Maybe<TProductDiscount>,
  productDiscounts: TProductDiscountQueryResult,
  product: Maybe<TProduct>,
  products: TProductQueryResult,
  state: Maybe<TState>,
  states: TStateQueryResult,
  customer: Maybe<TCustomer>,
  customers: TCustomerQueryResult,
  inventoryEntry: Maybe<TInventoryEntry>,
  inventoryEntries: TInventoryEntryQueryResult,
  cart: Maybe<TCart>,
  carts: TCartQueryResult,
  customerActiveCart: Maybe<TCart>,
  order: Maybe<TOrder>,
  orders: TOrderQueryResult,
  shoppingList: Maybe<TShoppingList>,
  shoppingLists: TShoppingListQueryResult,
  payment: Maybe<TPayment>,
  payments: TPaymentQueryResult,
  project: TProjectProjection,
  store: Maybe<TStore>,
  stores: TStoreQueryResult,
  apiClient: Maybe<TApiClientWithoutSecret>,
  apiClients: TApiClientWithoutSecretQueryResult,
};


export type TQuery_InStoreArgs = {
  key: Scalars['KeyReferenceInput']
};


export type TQuery_InStoresArgs = {
  keys: Array<Scalars['KeyReferenceInput']>
};


export type TQuery_CustomerGroupArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_CustomerGroupsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_CategoryArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_CategoriesArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_CategoryAutocompleteArgs = {
  locale: Scalars['Locale'],
  text: Scalars['String'],
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  filters: Maybe<Array<Scalars['SearchFilter']>>
};


export type TQuery_CategorySearchArgs = {
  fulltext: Maybe<TLocalizedText>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  queryFilters: Maybe<Array<Scalars['SearchFilter']>>,
  filters: Maybe<Array<Scalars['SearchFilter']>>,
  sorts: Maybe<Array<Scalars['SearchSort']>>
};


export type TQuery_ChannelArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_ChannelsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_ProductTypeArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_ProductTypesArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_TypeDefinitionArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_TypeDefinitionsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_ShippingMethodArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_ShippingMethodsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_ShippingMethodsByCartArgs = {
  id: Scalars['String']
};


export type TQuery_ShippingMethodsByLocationArgs = {
  country: Scalars['Country'],
  state: Maybe<Scalars['String']>,
  currency: Maybe<Scalars['Currency']>
};


export type TQuery_ZoneArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_ZonesArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_TaxCategoryArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_TaxCategoriesArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_DiscountCodeArgs = {
  id: Scalars['String']
};


export type TQuery_DiscountCodesArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_CartDiscountArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_CartDiscountsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_ProductDiscountArgs = {
  id: Scalars['String']
};


export type TQuery_ProductDiscountsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_ProductArgs = {
  sku: Maybe<Scalars['String']>,
  variantKey: Maybe<Scalars['String']>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_ProductsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>,
  skus: Maybe<Array<Scalars['String']>>
};


export type TQuery_StateArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_StatesArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_CustomerArgs = {
  emailToken: Maybe<Scalars['String']>,
  passwordToken: Maybe<Scalars['String']>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_CustomersArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_InventoryEntryArgs = {
  id: Scalars['String']
};


export type TQuery_InventoryEntriesArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_CartArgs = {
  id: Scalars['String']
};


export type TQuery_CartsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_CustomerActiveCartArgs = {
  customerId: Scalars['String']
};


export type TQuery_OrderArgs = {
  id: Maybe<Scalars['String']>,
  orderNumber: Maybe<Scalars['String']>
};


export type TQuery_OrdersArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_ShoppingListArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_PaymentArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_PaymentsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_StoreArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


export type TQuery_StoresArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};


export type TQuery_ApiClientArgs = {
  id: Scalars['String']
};


export type TQuery_ApiClientsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TRawCustomField = {
   __typename?: 'RawCustomField',
  name: Scalars['String'],
  value: Scalars['Json'],
};

export type TRawProductAttribute = {
   __typename?: 'RawProductAttribute',
  name: Scalars['String'],
  value: Scalars['Json'],
  attributeDefinition: Maybe<TAttributeDefinition>,
};

export type TRecalculateCart = {
  updateProductData: Maybe<Scalars['Boolean']>,
};

export type TReference = {
   __typename?: 'Reference',
  typeId: Scalars['String'],
  id: Scalars['String'],
};

export type TReferenceAttribute = TAttribute & {
   __typename?: 'ReferenceAttribute',
  typeId: Scalars['String'],
  id: Scalars['String'],
  name: Scalars['String'],
};

export type TReferenceAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'ReferenceAttributeDefinitionType',
  referenceTypeId: Scalars['String'],
  name: Scalars['String'],
};

export type TReferenceField = TCustomField & {
   __typename?: 'ReferenceField',
  typeId: Scalars['String'],
  id: Scalars['String'],
  name: Scalars['String'],
};

export type TReferenceInput = {
  typeId: Scalars['String'],
  id: Scalars['String'],
};

export type TReferenceType = TFieldType & {
   __typename?: 'ReferenceType',
  referenceTypeId: Scalars['String'],
  name: Scalars['String'],
};

export type TReferenceTypeDefinitionDraft = {
  referenceTypeId: Scalars['String'],
};

export type TRelativeDiscountValue = TCartDiscountValue & TProductDiscountValue & {
   __typename?: 'RelativeDiscountValue',
  permyriad: Scalars['Int'],
  type: Scalars['String'],
};

export type TRelativeDiscountValueInput = {
  permyriad: Scalars['Int'],
};

export type TRemoveAttributeDefinition = {
  name: Scalars['String'],
};

export type TRemoveCartCustomLineItem = {
  customLineItemId: Scalars['String'],
};

export type TRemoveCartDiscountCode = {
  discountCode: TReferenceInput,
};

export type TRemoveCartItemShippingAddress = {
  addressKey: Scalars['String'],
};

export type TRemoveCartLineItem = {
  lineItemId: Scalars['String'],
  quantity: Maybe<Scalars['Long']>,
  externalPrice: Maybe<TBaseMoneyInput>,
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>,
  shippingDetailsToRemove: Maybe<TItemShippingDetailsDraft>,
};

export type TRemoveCartPayment = {
  payment: TResourceIdentifierInput,
};

export type TRemoveCategoryAsset = {
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TRemoveChannelRoles = {
  roles: Array<TChannelRole>,
};

export type TRemoveCustomerAddress = {
  addressId: Scalars['String'],
};

export type TRemoveCustomerBillingAddressId = {
  addressId: Scalars['String'],
};

export type TRemoveCustomerShippingAddressId = {
  addressId: Scalars['String'],
};

export type TRemoveCustomerStore = {
  store: TResourceIdentifierInput,
};

export type TRemoveEnumValues = {
  attributeName: Scalars['String'],
  keys: Array<Scalars['String']>,
};

export type TRemoveInventoryEntryQuantity = {
  quantity: Scalars['Long'],
};

export type TRemoveOrderDelivery = {
  deliveryId: Scalars['String'],
};

export type TRemoveOrderItemShippingAddress = {
  addressKey: Scalars['String'],
};

export type TRemoveOrderParcelFromDelivery = {
  parcelId: Scalars['String'],
};

export type TRemoveOrderPayment = {
  payment: TResourceIdentifierInput,
};

export type TRemoveProductAsset = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TRemoveProductFromCategory = {
  category: TResourceIdentifierInput,
  staged: Maybe<Scalars['Boolean']>,
};

export type TRemoveProductImage = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  imageUrl: Scalars['String'],
  staged: Maybe<Scalars['Boolean']>,
};

export type TRemoveProductPrice = {
  priceId: Maybe<Scalars['String']>,
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  price: Maybe<TProductPriceDataInput>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TRemoveProductVariant = {
  id: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TRemoveShippingMethodShippingRate = {
  zone: TResourceIdentifierInput,
  shippingRate: TShippingRateDraft,
};

export type TRemoveShippingMethodZone = {
  zone: TResourceIdentifierInput,
};

export type TRemoveShoppingListLineItem = {
  lineItemId: Scalars['String'],
  quantity: Maybe<Scalars['Int']>,
};

export type TRemoveShoppingListTextLineItem = {
  textLineItemId: Scalars['String'],
  quantity: Maybe<Scalars['Int']>,
};

export type TRemoveZoneLocation = {
  location: TZoneLocation,
};

export type TResourceIdentifierInput = {
  typeId: Maybe<Scalars['String']>,
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
};

/** Stores information about returns connected to this order. */
export type TReturnInfo = {
   __typename?: 'ReturnInfo',
  items: Array<TReturnItem>,
  returnTrackingId: Maybe<Scalars['String']>,
  returnDate: Maybe<Scalars['DateTime']>,
};

export type TReturnItem = {
  type: Scalars['String'],
  id: Scalars['String'],
  quantity: Scalars['Long'],
  comment: Maybe<Scalars['String']>,
  shipmentState: TReturnShipmentState,
  paymentState: TReturnPaymentState,
  lastModifiedAt: Scalars['DateTime'],
  createdAt: Scalars['DateTime'],
};

export type TReturnItemDraftType = {
  quantity: Scalars['Long'],
  lineItemId: Maybe<Scalars['String']>,
  customLineItemId: Maybe<Scalars['String']>,
  comment: Maybe<Scalars['String']>,
  shipmentState: TReturnShipmentState,
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
  dummy: Maybe<Scalars['String']>,
};

export type TRevertStagedVariantChanges = {
  variantId: Scalars['Int'],
};

export type TReviewRatingStatistics = {
   __typename?: 'ReviewRatingStatistics',
  averageRating: Scalars['Float'],
  highestRating: Scalars['Int'],
  lowestRating: Scalars['Int'],
  count: Scalars['Long'],
  ratingsDistribution: Scalars['Json'],
};

export enum TRoundingMode {
  /** 
 * [Round half down](https://en.wikipedia.org/wiki/Rounding#Round_half_down).
   * Rounding mode used by, e.g., [Avalara Sales TaxII](https://help.avalara.com/kb/001/How_does_Rounding_with_SalesTaxII_work%3F)
 */
  HalfDown = 'HalfDown',
  /** [Round half up](https://en.wikipedia.org/wiki/Rounding#Round_half_up) */
  HalfUp = 'HalfUp',
  /** 
 * [Round half to even](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even).
   * Default rounding mode as used in IEEE 754 computing functions and operators.
 */
  HalfEven = 'HalfEven'
}

/** A demo product type */
export type TSample_Product_Type_ProductType = TProductType & {
   __typename?: 'Sample_Product_Type_ProductType',
  productTypeId: Scalars['String'],
  custom_attribute: Maybe<TStringAttribute>,
  size: Maybe<TLocalizedEnumAttribute>,
  common_attribute_sfa_1: Maybe<TStringAttribute>,
  attribute_enum_1: Maybe<TEnumAttribute>,
  attribute_set_lenum_1: Maybe<Array<TLocalizedEnumAttribute>>,
  attribute_ltext_1: Maybe<TLocalizedStringAttribute>,
  attribute_ltext_sfa_1: Maybe<TLocalizedStringAttribute>,
  Number: Maybe<TNumberAttribute>,
};

export type TScoreShippingRateInput = TShippingRateInput & {
   __typename?: 'ScoreShippingRateInput',
  score: Scalars['Int'],
  type: Scalars['String'],
};

export type TScoreShippingRateInputDraft = {
  score: Scalars['Int'],
};

/** sdf */
export type TSdfProductType = TProductType & {
   __typename?: 'sdfProductType',
  productTypeId: Scalars['String'],
};


export type TSearchKeyword = {
   __typename?: 'SearchKeyword',
  text: Scalars['String'],
};

export type TSearchKeywordInput = {
  locale: Scalars['Locale'],
  keywords: Array<TCustomSuggestTokenizerInput>,
};

export type TSearchKeywords = {
   __typename?: 'SearchKeywords',
  locale: Scalars['Locale'],
  searchKeywords: Array<TSearchKeyword>,
};


/** In order to decide which of the matching items will actually be discounted */
export enum TSelectionMode {
  MostExpensive = 'MostExpensive',
  Cheapest = 'Cheapest'
}

export type TSetAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'SetAttributeDefinitionType',
  elementType: TAttributeDefinitionType,
  name: Scalars['String'],
};

export type TSetCartAnonymousId = {
  anonymousId: Maybe<Scalars['String']>,
};

export type TSetCartBillingAddress = {
  address: Maybe<TAddressInput>,
};

export type TSetCartCountry = {
  country: Maybe<Scalars['Country']>,
};

export type TSetCartCustomerEmail = {
  email: Maybe<Scalars['String']>,
};

export type TSetCartCustomerGroup = {
  customerGroup: Maybe<TResourceIdentifierInput>,
};

export type TSetCartCustomerId = {
  customerId: Maybe<Scalars['String']>,
};

export type TSetCartCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetCartCustomLineItemCustomField = {
  customLineItemId: Scalars['String'],
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetCartCustomLineItemCustomType = {
  customLineItemId: Scalars['String'],
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetCartCustomLineItemShippingDetails = {
  customLineItemId: Scalars['String'],
  shippingDetails: Maybe<TItemShippingDetailsDraft>,
};

export type TSetCartCustomLineItemTaxAmount = {
  customLineItemId: Scalars['String'],
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>,
};

export type TSetCartCustomLineItemTaxRate = {
  customLineItemId: Scalars['String'],
  externalTaxRate: Maybe<TExternalTaxRateDraft>,
};

export type TSetCartCustomShippingMethod = {
  shippingMethodName: Scalars['String'],
  shippingRate: TShippingRateDraft,
  taxCategory: Maybe<TResourceIdentifierInput>,
  externalTaxRate: Maybe<TExternalTaxRateDraft>,
};

export type TSetCartCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetCartDeleteDaysAfterLastModification = {
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
};

export type TSetCartDiscountCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetCartDiscountCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetCartDiscountDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetCartDiscountKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetCartDiscountValidFrom = {
  validFrom: Maybe<Scalars['DateTime']>,
};

export type TSetCartDiscountValidFromAndUntil = {
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
};

export type TSetCartDiscountValidUntil = {
  validUntil: Maybe<Scalars['DateTime']>,
};

export type TSetCartLineItemCustomField = {
  lineItemId: Scalars['String'],
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetCartLineItemCustomType = {
  lineItemId: Scalars['String'],
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetCartLineItemPrice = {
  lineItemId: Scalars['String'],
  externalPrice: Maybe<TBaseMoneyInput>,
};

export type TSetCartLineItemShippingDetails = {
  lineItemId: Scalars['String'],
  shippingDetails: Maybe<TItemShippingDetailsDraft>,
};

export type TSetCartLineItemTaxAmount = {
  lineItemId: Scalars['String'],
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>,
};

export type TSetCartLineItemTaxRate = {
  lineItemId: Scalars['String'],
  externalTaxRate: Maybe<TExternalTaxRateDraft>,
};

export type TSetCartLineItemTotalPrice = {
  lineItemId: Scalars['String'],
  externalTotalPrice: Maybe<TExternalLineItemTotalPriceDraft>,
};

export type TSetCartLocale = {
  locale: Maybe<Scalars['Locale']>,
};

export type TSetCartShippingAddress = {
  address: Maybe<TAddressInput>,
};

export type TSetCartShippingMethod = {
  shippingMethod: Maybe<TResourceIdentifierInput>,
  externalTaxRate: Maybe<TExternalTaxRateDraft>,
};

export type TSetCartShippingMethodTaxAmount = {
  externalTaxAmount: Maybe<TExternalTaxAmountDraft>,
};

export type TSetCartShippingMethodTaxRate = {
  externalTaxRate: Maybe<TExternalTaxRateDraft>,
};

export type TSetCartShippingRateInput = {
  shippingRateInput: Maybe<TShippingRateInputDraft>,
};

export type TSetCartTotalTax = {
  externalTotalGross: Maybe<TMoneyInput>,
  externalTaxPortions: Maybe<Array<TTaxPortionDraft>>,
};

export type TSetCategoryAssetCustomField = {
  value: Maybe<Scalars['String']>,
  name: Scalars['String'],
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetCategoryAssetCustomType = {
  typeId: Maybe<Scalars['String']>,
  typeKey: Maybe<Scalars['String']>,
  type: Maybe<TResourceIdentifierInput>,
  fields: Maybe<Array<TCustomFieldInput>>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetCategoryAssetDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetCategoryAssetKey = {
  assetKey: Maybe<Scalars['String']>,
  assetId: Scalars['String'],
};

export type TSetCategoryAssetSources = {
  sources: Maybe<Array<TAssetSourceInput>>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetCategoryAssetTags = {
  tags: Maybe<Array<Scalars['String']>>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetCategoryCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetCategoryCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetCategoryDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetCategoryExternalId = {
  externalId: Maybe<Scalars['String']>,
};

export type TSetCategoryKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetCategoryMetaDescription = {
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetCategoryMetaKeywords = {
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetCategoryMetaTitle = {
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetChannelAddress = {
  address: Maybe<TAddressInput>,
};

export type TSetChannelCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetChannelCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetChannelGeoLocation = {
  geoLocation: Maybe<TGeometryInput>,
};

export type TSetChannelRoles = {
  roles: Array<TChannelRole>,
};

export type TSetCustomerCompanyName = {
  companyName: Maybe<Scalars['String']>,
};

export type TSetCustomerCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetCustomerCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetCustomerDateOfBirth = {
  dateOfBirth: Maybe<Scalars['Date']>,
};

export type TSetCustomerDefaultBillingAddress = {
  addressId: Maybe<Scalars['String']>,
};

export type TSetCustomerDefaultShippingAddress = {
  addressId: Maybe<Scalars['String']>,
};

export type TSetCustomerExternalId = {
  externalId: Maybe<Scalars['String']>,
};

export type TSetCustomerFirstName = {
  firstName: Maybe<Scalars['String']>,
};

export type TSetCustomerGroup = {
  customerGroup: Maybe<TResourceIdentifierInput>,
};

export type TSetCustomerGroupCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetCustomerGroupCustomType = {
  typeId: Maybe<Scalars['String']>,
  typeKey: Maybe<Scalars['String']>,
  type: Maybe<TResourceIdentifierInput>,
  fields: Maybe<Array<TCustomFieldInput>>,
};

export type TSetCustomerGroupKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetCustomerKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetCustomerLastName = {
  lastName: Maybe<Scalars['String']>,
};

export type TSetCustomerLocale = {
  locale: Maybe<Scalars['Locale']>,
};

export type TSetCustomerMiddleName = {
  middleName: Maybe<Scalars['String']>,
};

export type TSetCustomerNumber = {
  customerNumber: Maybe<Scalars['String']>,
};

export type TSetCustomerSalutation = {
  salutation: Maybe<Scalars['String']>,
};

export type TSetCustomerStores = {
  stores: Array<TResourceIdentifierInput>,
};

export type TSetCustomerTitle = {
  title: Maybe<Scalars['String']>,
};

export type TSetCustomerVatId = {
  vatId: Maybe<Scalars['String']>,
};

export type TSetDiscountCodeCartPredicate = {
  cartPredicate: Maybe<Scalars['String']>,
};

export type TSetDiscountCodeCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetDiscountCodeCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetDiscountCodeDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetDiscountCodeMaxApplications = {
  maxApplications: Maybe<Scalars['Long']>,
};

export type TSetDiscountCodeMaxApplicationsPerCustomer = {
  maxApplicationsPerCustomer: Maybe<Scalars['Long']>,
};

export type TSetDiscountCodeName = {
  name: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetDiscountCodeValidFrom = {
  validFrom: Maybe<Scalars['DateTime']>,
};

export type TSetDiscountCodeValidFromAndUntil = {
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
};

export type TSetDiscountCodeValidUntil = {
  validUntil: Maybe<Scalars['DateTime']>,
};

export type TSetInputTip = {
  attributeName: Scalars['String'],
  inputTip: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetInventoryEntryCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetInventoryEntryCustomType = {
  typeId: Maybe<Scalars['String']>,
  typeKey: Maybe<Scalars['String']>,
  type: Maybe<TResourceIdentifierInput>,
  fields: Maybe<Array<TCustomFieldInput>>,
};

export type TSetInventoryEntryExpectedDelivery = {
  expectedDelivery: Maybe<Scalars['DateTime']>,
};

export type TSetInventoryEntryRestockableInDays = {
  restockableInDays: Maybe<Scalars['Int']>,
};

export type TSetInventoryEntrySupplyChannel = {
  supplyChannel: Maybe<TResourceIdentifierInput>,
};

export type TSetKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetMyCartShippingMethod = {
  shippingMethod: Maybe<TResourceIdentifierInput>,
};

export type TSetOrderBillingAddress = {
  address: Maybe<TAddressInput>,
};

export type TSetOrderCustomerEmail = {
  email: Maybe<Scalars['String']>,
};

export type TSetOrderCustomerId = {
  customerId: Maybe<Scalars['String']>,
};

export type TSetOrderCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetOrderCustomLineItemCustomField = {
  customLineItemId: Scalars['String'],
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetOrderCustomLineItemCustomType = {
  customLineItemId: Scalars['String'],
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetOrderCustomLineItemShippingDetails = {
  customLineItemId: Scalars['String'],
  shippingDetails: Maybe<TItemShippingDetailsDraftType>,
};

export type TSetOrderCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetOrderDeliveryAddress = {
  deliveryId: Scalars['String'],
  address: Maybe<TAddressInput>,
};

export type TSetOrderDeliveryItems = {
  deliveryId: Scalars['String'],
  items: Array<TDeliveryItemDraftType>,
};

export type TSetOrderLineItemCustomField = {
  lineItemId: Scalars['String'],
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetOrderLineItemCustomType = {
  lineItemId: Scalars['String'],
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetOrderLineItemShippingDetails = {
  lineItemId: Scalars['String'],
  shippingDetails: Maybe<TItemShippingDetailsDraftType>,
};

export type TSetOrderLocale = {
  locale: Maybe<Scalars['Locale']>,
};

export type TSetOrderNumber = {
  orderNumber: Maybe<Scalars['String']>,
};

export type TSetOrderParcelItems = {
  parcelId: Scalars['String'],
  items: Array<TDeliveryItemDraftType>,
};

export type TSetOrderParcelMeasurements = {
  parcelId: Scalars['String'],
  measurements: Maybe<TParcelMeasurementsDraftType>,
};

export type TSetOrderParcelTrackingData = {
  parcelId: Scalars['String'],
  trackingData: Maybe<TTrackingDataDraftType>,
};

export type TSetOrderReturnPaymentState = {
  returnItemId: Scalars['String'],
  paymentState: TReturnPaymentState,
};

export type TSetOrderReturnShipmentState = {
  returnItemId: Scalars['String'],
  shipmentState: TReturnShipmentState,
};

export type TSetOrderShippingAddress = {
  address: Maybe<TAddressInput>,
};

export type TSetProductAssetCustomField = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  value: Maybe<Scalars['String']>,
  name: Scalars['String'],
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetProductAssetCustomType = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  typeId: Maybe<Scalars['String']>,
  typeKey: Maybe<Scalars['String']>,
  type: Maybe<TResourceIdentifierInput>,
  fields: Maybe<Array<TCustomFieldInput>>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetProductAssetDescription = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetProductAssetKey = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Scalars['String'],
};

export type TSetProductAssetSources = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  sources: Maybe<Array<TAssetSourceInput>>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetProductAssetTags = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  tags: Maybe<Array<Scalars['String']>>,
  assetKey: Maybe<Scalars['String']>,
  assetId: Maybe<Scalars['String']>,
};

export type TSetProductAttribute = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductAttributeInAllVariants = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductCategoryOrderHint = {
  categoryId: Scalars['String'],
  orderHint: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductDiscountDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetProductDiscountedPrice = {
  priceId: Scalars['String'],
  discounted: Maybe<TDiscountedProductPriceValueInput>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductDiscountKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetProductDiscountValidFrom = {
  validFrom: Maybe<Scalars['DateTime']>,
};

export type TSetProductDiscountValidFromAndUntil = {
  validFrom: Maybe<Scalars['DateTime']>,
  validUntil: Maybe<Scalars['DateTime']>,
};

export type TSetProductDiscountValidUntil = {
  validUntil: Maybe<Scalars['DateTime']>,
};

export type TSetProductImageLabel = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  imageUrl: Scalars['String'],
  label: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetProductMetaAttributes = {
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>,
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>,
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductMetaDescription = {
  metaDescription: Maybe<Array<TLocalizedStringItemInputType>>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductMetaKeywords = {
  metaKeywords: Maybe<Array<TLocalizedStringItemInputType>>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductMetaTitle = {
  metaTitle: Maybe<Array<TLocalizedStringItemInputType>>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductPriceCustomField = {
  priceId: Scalars['String'],
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetProductPriceCustomType = {
  priceId: Scalars['String'],
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetProductPrices = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  prices: Array<TProductPriceDataInput>,
  catalog: Maybe<TReferenceInput>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductSku = {
  variantId: Scalars['Int'],
  sku: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProductTaxCategory = {
  taxCategory: Maybe<TResourceIdentifierInput>,
};

export type TSetProductVariantKey = {
  variantId: Maybe<Scalars['Int']>,
  sku: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetProjectSettingsExternalOAuth = {
  externalOAuth: Maybe<TExternalOAuthDraft>,
};

export type TSetProjectSettingsShippingRateInputType = {
  shippingRateInputType: Maybe<TShippingRateInputTypeInput>,
};

export type TSetSearchKeywords = {
  searchKeywords: Array<TSearchKeywordInput>,
  staged: Maybe<Scalars['Boolean']>,
};

export type TSetShippingMethodDescription = {
  description: Maybe<Scalars['String']>,
};

export type TSetShippingMethodKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetShippingMethodPredicate = {
  predicate: Maybe<Scalars['String']>,
};

export type TSetShoppingListAnonymousId = {
  anonymousId: Maybe<Scalars['String']>,
};

export type TSetShoppingListCustomer = {
  customer: Maybe<TResourceIdentifierInput>,
};

export type TSetShoppingListCustomField = {
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetShoppingListCustomType = {
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetShoppingListDeleteDaysAfterLastModification = {
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
};

export type TSetShoppingListDescription = {
  description: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetShoppingListKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetShoppingListLineItemCustomField = {
  lineItemId: Scalars['String'],
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetShoppingListLineItemCustomType = {
  lineItemId: Scalars['String'],
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetShoppingListSlug = {
  slug: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetShoppingListTextLineItemCustomField = {
  textLineItemId: Scalars['String'],
  name: Scalars['String'],
  value: Maybe<Scalars['String']>,
};

export type TSetShoppingListTextLineItemCustomType = {
  textLineItemId: Scalars['String'],
  fields: Maybe<Array<TCustomFieldInput>>,
  type: Maybe<TResourceIdentifierInput>,
  typeKey: Maybe<Scalars['String']>,
  typeId: Maybe<Scalars['String']>,
};

export type TSetShoppingListTextLineItemDescription = {
  textLineItemId: Scalars['String'],
  description: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetStoreLanguages = {
  languages: Maybe<Array<Scalars['Locale']>>,
};

export type TSetStoreName = {
  name: Maybe<Array<TLocalizedStringItemInputType>>,
};

export type TSetTaxCategoryKey = {
  key: Maybe<Scalars['String']>,
};

export type TSetType = TFieldType & {
   __typename?: 'SetType',
  elementType: TFieldType,
  name: Scalars['String'],
};

export type TSetZoneDescription = {
  description: Maybe<Scalars['String']>,
};

export type TSetZoneKey = {
  key: Maybe<Scalars['String']>,
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
   __typename?: 'ShippingInfo',
  shippingMethodName: Scalars['String'],
  price: TMoney,
  shippingRate: TShippingRate,
  taxRate: Maybe<TTaxRate>,
  taxCategory: Maybe<TReference>,
  deliveries: Array<TDelivery>,
  discountedPrice: Maybe<TDiscountedLineItemPrice>,
  taxedPrice: Maybe<TTaxedItemPrice>,
  shippingMethodState: TShippingMethodState,
  shippingMethod: Maybe<TShippingMethod>,
  shippingMethodRef: Maybe<TReference>,
};

export type TShippingMethod = TVersioned & {
   __typename?: 'ShippingMethod',
  id: Scalars['String'],
  version: Scalars['Long'],
  name: Scalars['String'],
  description: Maybe<Scalars['String']>,
  zoneRates: Array<TZoneRate>,
  isDefault: Scalars['Boolean'],
  predicate: Maybe<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  key: Maybe<Scalars['String']>,
  lastModifiedBy: Maybe<TInitiator>,
  createdBy: Maybe<TInitiator>,
  taxCategoryRef: Maybe<TReference>,
  taxCategory: Maybe<TTaxCategory>,
};

export type TShippingMethodDraft = {
  name: Scalars['String'],
  description: Maybe<Scalars['String']>,
  taxCategory: TResourceIdentifierInput,
  zoneRates: Maybe<Array<TZoneRateDraft>>,
  isDefault: Scalars['Boolean'],
  predicate: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>,
};

export type TShippingMethodQueryResult = {
   __typename?: 'ShippingMethodQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TShippingMethod>,
};

/** A field to retrieve available shipping methods for a cart. */
export type TShippingMethodsByCartInterface = {
  shippingMethodsByCart: Array<TShippingMethod>,
};


/** A field to retrieve available shipping methods for a cart. */
export type TShippingMethodsByCartInterface_ShippingMethodsByCartArgs = {
  id: Scalars['String']
};

export enum TShippingMethodState {
  /** Either there is no predicate defined for the ShippingMethod or the given predicate matches the cart */
  MatchesCart = 'MatchesCart',
  /** 
 * The ShippingMethod predicate does not match the cart. Ordering this cart will
   * fail with error ShippingMethodDoesNotMatchCart
 */
  DoesNotMatchCart = 'DoesNotMatchCart'
}

export type TShippingMethodUpdateAction = {
  addShippingRate: Maybe<TAddShippingMethodShippingRate>,
  addZone: Maybe<TAddShippingMethodZone>,
  changeIsDefault: Maybe<TChangeShippingMethodIsDefault>,
  changeName: Maybe<TChangeShippingMethodName>,
  changeTaxCategory: Maybe<TChangeShippingMethodTaxCategory>,
  removeShippingRate: Maybe<TRemoveShippingMethodShippingRate>,
  removeZone: Maybe<TRemoveShippingMethodZone>,
  setDescription: Maybe<TSetShippingMethodDescription>,
  setKey: Maybe<TSetShippingMethodKey>,
  setPredicate: Maybe<TSetShippingMethodPredicate>,
};

/** Shipping Rate */
export type TShippingRate = {
   __typename?: 'ShippingRate',
  price: TMoney,
  freeAbove: Maybe<TMoney>,
  isMatching: Maybe<Scalars['Boolean']>,
  tiers: Array<TShippingRatePriceTier>,
};

export type TShippingRateCartClassificationPriceTier = TShippingRatePriceTier & {
   __typename?: 'ShippingRateCartClassificationPriceTier',
  value: Scalars['String'],
  price: TMoney,
  isMatching: Maybe<Scalars['Boolean']>,
  type: Scalars['String'],
};

export type TShippingRateCartScorePriceTier = TShippingRatePriceTier & {
   __typename?: 'ShippingRateCartScorePriceTier',
  score: Scalars['Int'],
  price: Maybe<TMoney>,
  priceFunction: Maybe<TPriceFunction>,
  isMatching: Maybe<Scalars['Boolean']>,
  type: Scalars['String'],
};

export type TShippingRateCartValuePriceTier = TShippingRatePriceTier & {
   __typename?: 'ShippingRateCartValuePriceTier',
  minimumCentAmount: Scalars['Int'],
  price: TMoney,
  isMatching: Maybe<Scalars['Boolean']>,
  type: Scalars['String'],
};

export type TShippingRateDraft = {
  price: TMoneyDraft,
  freeAbove: Maybe<TMoneyDraft>,
  tiers: Maybe<Array<TShippingRatePriceTierDraft>>,
};

export type TShippingRateInput = {
  type: Scalars['String'],
};

export type TShippingRateInputDraft = {
  Classification: Maybe<TClassificationShippingRateInputDraft>,
  Score: Maybe<TScoreShippingRateInputDraft>,
};

export type TShippingRateInputLocalizedEnumValue = {
   __typename?: 'ShippingRateInputLocalizedEnumValue',
  key: Scalars['String'],
  label: Maybe<Scalars['String']>,
  labelAllLocales: Array<TLocalizedString>,
};


export type TShippingRateInputLocalizedEnumValue_LabelArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TShippingRateInputType = {
  type: Scalars['String'],
};

export type TShippingRateInputTypeInput = {
  CartValue: Maybe<TCartValueInput>,
  CartClassification: Maybe<TCartClassificationInput>,
  CartScore: Maybe<TCartScoreInput>,
};

export type TShippingRatePriceTier = {
  type: Scalars['String'],
};

export type TShippingRatePriceTierCartClassificationDraft = {
  value: Scalars['String'],
  price: TMoneyDraft,
};

export type TShippingRatePriceTierCartScoreDraft = {
  score: Scalars['Int'],
  price: Maybe<TMoneyDraft>,
  priceFunction: Maybe<TPriceFunctionDraft>,
};

export type TShippingRatePriceTierCartValueDraft = {
  minimumCentAmount: Scalars['Int'],
  price: TMoneyDraft,
};

export type TShippingRatePriceTierDraft = {
  CartValue: Maybe<TShippingRatePriceTierCartValueDraft>,
  CartClassification: Maybe<TShippingRatePriceTierCartClassificationDraft>,
  CartScore: Maybe<TShippingRatePriceTierCartScoreDraft>,
};

export type TShippingTarget = TCartDiscountTarget & {
   __typename?: 'ShippingTarget',
  type: Scalars['String'],
};

export type TShippingTargetDraft = {
  addressKey: Scalars['String'],
  quantity: Scalars['Long'],
};

export type TShippingTargetDraftType = {
  addressKey: Scalars['String'],
  quantity: Scalars['Long'],
};

export type TShippingTargetInput = {
  dummy: Maybe<Scalars['String']>,
};

export type TShoppingList = TVersioned & {
   __typename?: 'ShoppingList',
  key: Maybe<Scalars['String']>,
  name: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  description: Maybe<Scalars['String']>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  slug: Maybe<Scalars['String']>,
  slugAllLocales: Maybe<Array<TLocalizedString>>,
  customerRef: Maybe<TReference>,
  customer: Maybe<TCustomer>,
  anonymousId: Maybe<Scalars['String']>,
  lineItems: Array<TShoppingListLineItem>,
  textLineItems: Array<TTextLineItem>,
  custom: Maybe<TCustomFieldsType>,
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};


export type TShoppingList_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TShoppingList_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TShoppingList_SlugArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TShoppingListDraft = {
  name: Array<TLocalizedStringItemInputType>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  lineItems: Maybe<Array<TShoppingListLineItemDraft>>,
  textLineItems: Maybe<Array<TTextLineItemDraft>>,
  custom: Maybe<TCustomFieldsDraft>,
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
  key: Maybe<Scalars['String']>,
  customer: Maybe<TResourceIdentifierInput>,
  slug: Maybe<Array<TLocalizedStringItemInputType>>,
  anonymousId: Maybe<Scalars['String']>,
};

export type TShoppingListLineItem = {
   __typename?: 'ShoppingListLineItem',
  id: Scalars['String'],
  productId: Scalars['String'],
  variantId: Maybe<Scalars['Int']>,
  productTypeRef: TReference,
  productType: TProductTypeDefinition,
  quantity: Scalars['Int'],
  addedAt: Scalars['DateTime'],
  name: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  deactivatedAt: Maybe<Scalars['DateTime']>,
  custom: Maybe<TCustomFieldsType>,
  productSlug: Maybe<Scalars['String']>,
  variant: Maybe<TProductVariant>,
};


export type TShoppingListLineItem_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TShoppingListLineItem_ProductSlugArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TShoppingListLineItemDraft = {
  productId: Maybe<Scalars['String']>,
  sku: Maybe<Scalars['String']>,
  variantId: Maybe<Scalars['Int']>,
  quantity: Maybe<Scalars['Int']>,
  custom: Maybe<TCustomFieldsDraft>,
  addedAt: Maybe<Scalars['DateTime']>,
};

/** Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists. */
export type TShoppingListQueryInterface = {
  shoppingList: Maybe<TShoppingList>,
  shoppingLists: TShoppingListQueryResult,
};


/** Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists. */
export type TShoppingListQueryInterface_ShoppingListArgs = {
  id: Maybe<Scalars['String']>,
  key: Maybe<Scalars['String']>
};


/** Fields to access shopping lists. Includes direct access to a single list and searching for shopping lists. */
export type TShoppingListQueryInterface_ShoppingListsArgs = {
  where: Maybe<Scalars['String']>,
  sort: Maybe<Array<Scalars['String']>>,
  limit: Maybe<Scalars['Int']>,
  offset: Maybe<Scalars['Int']>
};

export type TShoppingListQueryResult = {
   __typename?: 'ShoppingListQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TShoppingList>,
};

export type TShoppingListsConfiguration = {
   __typename?: 'ShoppingListsConfiguration',
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
};

export type TShoppingListsConfigurationInput = {
  deleteDaysAfterLastModification: Maybe<Scalars['Int']>,
};

export type TShoppingListUpdateAction = {
  addLineItem: Maybe<TAddShoppingListLineItem>,
  addTextLineItem: Maybe<TAddShoppingListTextLineItem>,
  changeLineItemQuantity: Maybe<TChangeShoppingListLineItemQuantity>,
  changeLineItemsOrder: Maybe<TChangeShoppingListLineItemsOrder>,
  changeName: Maybe<TChangeShoppingListName>,
  changeTextLineItemName: Maybe<TChangeShoppingListTextLineItemName>,
  changeTextLineItemQuantity: Maybe<TChangeShoppingListTextLineItemQuantity>,
  changeTextLineItemsOrder: Maybe<TChangeShoppingListTextLineItemsOrder>,
  removeLineItem: Maybe<TRemoveShoppingListLineItem>,
  removeTextLineItem: Maybe<TRemoveShoppingListTextLineItem>,
  setAnonymousId: Maybe<TSetShoppingListAnonymousId>,
  setCustomField: Maybe<TSetShoppingListCustomField>,
  setCustomType: Maybe<TSetShoppingListCustomType>,
  setCustomer: Maybe<TSetShoppingListCustomer>,
  setDeleteDaysAfterLastModification: Maybe<TSetShoppingListDeleteDaysAfterLastModification>,
  setDescription: Maybe<TSetShoppingListDescription>,
  setKey: Maybe<TSetShoppingListKey>,
  setLineItemCustomField: Maybe<TSetShoppingListLineItemCustomField>,
  setLineItemCustomType: Maybe<TSetShoppingListLineItemCustomType>,
  setSlug: Maybe<TSetShoppingListSlug>,
  setTextLineItemCustomField: Maybe<TSetShoppingListTextLineItemCustomField>,
  setTextLineItemCustomType: Maybe<TSetShoppingListTextLineItemCustomType>,
  setTextLineItemDescription: Maybe<TSetShoppingListTextLineItemDescription>,
};

export type TSimpleAttributeTypeDraft = {
  dummy: Maybe<Scalars['String']>,
};

/** ww */
export type TSs_129bddac_67f5_4b68_B6e6_A0b6d1bba660ProductType = TProductType & {
   __typename?: 'ss_129bddac_67f5_4b68_b6e6_a0b6d1bba660ProductType',
  productTypeId: Scalars['String'],
};

/** ss */
export type TSs_D71aa0c5_Db6c_4d65_B58a_Fe8f8e37a70dProductType = TProductType & {
   __typename?: 'ss_d71aa0c5_db6c_4d65_b58a_fe8f8e37a70dProductType',
  productTypeId: Scalars['String'],
};

/** Describes how this discount interacts with other discounts */
export enum TStackingMode {
  /** Don’t apply any more matching discounts after this one. */
  StopAfterThisDiscount = 'StopAfterThisDiscount',
  /** Default. Continue applying other matching discounts after applying this one. */
  Stacking = 'Stacking'
}

/** [State](http://dev.commercetools.com/http-api-projects-states.html) */
export type TState = TVersioned & {
   __typename?: 'State',
  id: Scalars['String'],
  version: Scalars['Long'],
  key: Maybe<Scalars['String']>,
  type: TStateType,
  roles: Array<TStateRole>,
  name: Maybe<Scalars['String']>,
  nameAllLocales: Maybe<Array<TLocalizedString>>,
  description: Maybe<Scalars['String']>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  builtIn: Scalars['Boolean'],
  transitionsRef: Maybe<Array<TReference>>,
  transitions: Maybe<Array<TState>>,
  initial: Scalars['Boolean'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};


/** [State](http://dev.commercetools.com/http-api-projects-states.html) */
export type TState_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


/** [State](http://dev.commercetools.com/http-api-projects-states.html) */
export type TState_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TStateQueryResult = {
   __typename?: 'StateQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TState>,
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

/** [BETA] Stores allow defining different contexts for a project. */
export type TStore = TVersioned & {
   __typename?: 'Store',
  id: Scalars['String'],
  version: Scalars['Long'],
  key: Scalars['String'],
  name: Maybe<Scalars['String']>,
  nameAllLocales: Maybe<Array<TLocalizedString>>,
  languages: Maybe<Array<Scalars['Locale']>>,
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};


/** [BETA] Stores allow defining different contexts for a project. */
export type TStore_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TStoreQueryResult = {
   __typename?: 'StoreQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TStore>,
};

export type TStoreUpdateAction = {
  setLanguages: Maybe<TSetStoreLanguages>,
  setName: Maybe<TSetStoreName>,
};

export type TStringAttribute = TAttribute & {
   __typename?: 'StringAttribute',
  value: Scalars['String'],
  name: Scalars['String'],
};

export type TStringField = TCustomField & {
   __typename?: 'StringField',
  value: Scalars['String'],
  name: Scalars['String'],
};

export type TStringType = TFieldType & {
   __typename?: 'StringType',
  name: Scalars['String'],
};

export type TSubRate = {
   __typename?: 'SubRate',
  name: Scalars['String'],
  amount: Scalars['Float'],
};

export type TSubRateDraft = {
  name: Scalars['String'],
  amount: Scalars['Float'],
};

/** Test Producttype */
export type TSven_TestsProductType = TProductType & {
   __typename?: 'Sven_TestsProductType',
  productTypeId: Scalars['String'],
};

/** Stores information about order synchronization activities (like export or import). */
export type TSyncInfo = {
   __typename?: 'SyncInfo',
  channelRef: TReference,
  channel: Maybe<TChannel>,
  externalId: Maybe<Scalars['String']>,
  syncedAt: Scalars['DateTime'],
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
   __typename?: 'TaxCategory',
  name: Scalars['String'],
  description: Maybe<Scalars['String']>,
  rates: Array<TTaxRate>,
  key: Maybe<Scalars['String']>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};

export type TTaxCategoryAddTaxRate = {
  taxRate: TTaxRateDraft,
};

export type TTaxCategoryChangeName = {
  name: Scalars['String'],
};

export type TTaxCategoryDraft = {
  name: Scalars['String'],
  description: Maybe<Scalars['String']>,
  rates: Maybe<Array<TTaxRateDraft>>,
  key: Maybe<Scalars['String']>,
};

export type TTaxCategoryQueryResult = {
   __typename?: 'TaxCategoryQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TTaxCategory>,
};

export type TTaxCategoryRemoveTaxRate = {
  taxRateId: Scalars['String'],
};

export type TTaxCategoryReplaceTaxRate = {
  taxRateId: Scalars['String'],
  taxRate: TTaxRateDraft,
};

export type TTaxCategorySetDescription = {
  description: Maybe<Scalars['String']>,
};

export type TTaxCategoryUpdateAction = {
  changeName: Maybe<TTaxCategoryChangeName>,
  setDescription: Maybe<TTaxCategorySetDescription>,
  addTaxRate: Maybe<TTaxCategoryAddTaxRate>,
  replaceTaxRate: Maybe<TTaxCategoryReplaceTaxRate>,
  removeTaxRate: Maybe<TTaxCategoryRemoveTaxRate>,
  setKey: Maybe<TSetTaxCategoryKey>,
};

export type TTaxedItemPrice = {
   __typename?: 'TaxedItemPrice',
  totalNet: TMoney,
  totalGross: TMoney,
};

export type TTaxedPrice = {
   __typename?: 'TaxedPrice',
  totalNet: TMoney,
  totalGross: TMoney,
  taxPortions: Array<TTaxPortion>,
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
   __typename?: 'TaxPortion',
  rate: Scalars['Float'],
  amount: TMoney,
  name: Maybe<Scalars['String']>,
};

export type TTaxPortionDraft = {
  name: Maybe<Scalars['String']>,
  rate: Scalars['Float'],
  amount: TMoneyInput,
};

export type TTaxRate = {
   __typename?: 'TaxRate',
  name: Scalars['String'],
  amount: Scalars['Float'],
  includedInPrice: Scalars['Boolean'],
  country: Scalars['Country'],
  state: Maybe<Scalars['String']>,
  id: Maybe<Scalars['String']>,
  subRates: Array<TSubRate>,
};

export type TTaxRateDraft = {
  name: Scalars['String'],
  amount: Maybe<Scalars['Float']>,
  includedInPrice: Scalars['Boolean'],
  country: Scalars['Country'],
  state: Maybe<Scalars['String']>,
  subRates: Maybe<Array<TSubRateDraft>>,
};

/** Test */
export type TTestProductType = TProductType & {
   __typename?: 'TestProductType',
  productTypeId: Scalars['String'],
};

export type TTextAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'TextAttributeDefinitionType',
  name: Scalars['String'],
};

/** UI hint telling what kind of edit control should be displayed for a text attribute. */
export enum TTextInputHint {
  MultiLine = 'MultiLine',
  SingleLine = 'SingleLine'
}

export type TTextLineItem = {
   __typename?: 'TextLineItem',
  id: Scalars['String'],
  name: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  description: Maybe<Scalars['String']>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  quantity: Scalars['Int'],
  custom: Maybe<TCustomFieldsType>,
  addedAt: Scalars['DateTime'],
};


export type TTextLineItem_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


export type TTextLineItem_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};

export type TTextLineItemDraft = {
  name: Array<TLocalizedStringItemInputType>,
  description: Maybe<Array<TLocalizedStringItemInputType>>,
  quantity: Maybe<Scalars['Int']>,
  custom: Maybe<TCustomFieldsDraft>,
  addedAt: Maybe<Scalars['DateTime']>,
};


export type TTimeAttribute = TAttribute & {
   __typename?: 'TimeAttribute',
  value: Scalars['Time'],
  name: Scalars['String'],
};

export type TTimeAttributeDefinitionType = TAttributeDefinitionType & {
   __typename?: 'TimeAttributeDefinitionType',
  name: Scalars['String'],
};

export type TTimeField = TCustomField & {
   __typename?: 'TimeField',
  value: Scalars['Time'],
  name: Scalars['String'],
};

export type TTimeType = TFieldType & {
   __typename?: 'TimeType',
  name: Scalars['String'],
};

/** boy and girl toys */
export type TToysProductType = TProductType & {
   __typename?: 'ToysProductType',
  productTypeId: Scalars['String'],
  danger: Maybe<TBooleanAttribute>,
  description: Maybe<TStringAttribute>,
  Age: Maybe<TEnumAttribute>,
  common_attribute_sfa_1: Maybe<TStringAttribute>,
  attribute_enum_1: Maybe<TEnumAttribute>,
  attribute_set_lenum_1: Maybe<Array<TLocalizedEnumAttribute>>,
  attribute_ltext_1: Maybe<TLocalizedStringAttribute>,
  attribute_ltext_sfa_1: Maybe<TLocalizedStringAttribute>,
  ltext_set: Maybe<Array<TLocalizedStringAttribute>>,
  multi_line_set: Maybe<Array<TStringAttribute>>,
  SLTMLSFA: Maybe<Array<TLocalizedStringAttribute>>,
  size: Maybe<TLocalizedEnumAttribute>,
  date: Maybe<TDateAttribute>,
  time: Maybe<TTimeAttribute>,
  datetime: Maybe<TDateTimeAttribute>,
  date_set: Maybe<Array<TDateAttribute>>,
  boolean_set: Maybe<Array<TBooleanAttribute>>,
};

export type TTrackingData = {
   __typename?: 'TrackingData',
  trackingId: Maybe<Scalars['String']>,
  carrier: Maybe<Scalars['String']>,
  provider: Maybe<Scalars['String']>,
  providerTransaction: Maybe<Scalars['String']>,
  isReturn: Scalars['Boolean'],
};

export type TTrackingDataDraftType = {
  trackingId: Maybe<Scalars['String']>,
  carrier: Maybe<Scalars['String']>,
  provider: Maybe<Scalars['String']>,
  providerTransaction: Maybe<Scalars['String']>,
  isReturn: Maybe<Scalars['Boolean']>,
};

export type TTransaction = {
   __typename?: 'Transaction',
  id: Scalars['String'],
  timestamp: Maybe<Scalars['DateTime']>,
  type: Maybe<TTransactionType>,
  amount: TMoney,
  interactionId: Maybe<Scalars['String']>,
  state: TTransactionState,
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
  customLineItemId: Scalars['String'],
  quantity: Scalars['Long'],
  fromState: TResourceIdentifierInput,
  toState: TResourceIdentifierInput,
  actualTransitionDate: Maybe<Scalars['DateTime']>,
};

export type TTransitionOrderLineItemState = {
  lineItemId: Scalars['String'],
  quantity: Scalars['Long'],
  fromState: TResourceIdentifierInput,
  toState: TResourceIdentifierInput,
  actualTransitionDate: Maybe<Scalars['DateTime']>,
};

export type TTransitionOrderState = {
  state: TResourceIdentifierInput,
  force: Maybe<Scalars['Boolean']>,
};

export type TTransitionProductState = {
  state: TReferenceInput,
  force: Maybe<Scalars['Boolean']>,
};

export type TType = {
  typeRef: TReference,
  type: Maybe<TTypeDefinition>,
};

/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition = TVersioned & {
   __typename?: 'TypeDefinition',
  key: Scalars['String'],
  name: Maybe<Scalars['String']>,
  description: Maybe<Scalars['String']>,
  nameAllLocales: Array<TLocalizedString>,
  descriptionAllLocales: Maybe<Array<TLocalizedString>>,
  resourceTypeIds: Array<Scalars['String']>,
  fieldDefinitions: Array<TFieldDefinition>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};


/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition_NameArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition_DescriptionArgs = {
  locale: Maybe<Scalars['Locale']>,
  acceptLanguage: Maybe<Array<Scalars['Locale']>>
};


/** Types define the structure of custom fields which can be attached to different entities throughout the platform. */
export type TTypeDefinition_FieldDefinitionsArgs = {
  includeNames: Maybe<Array<Scalars['String']>>,
  excludeNames: Maybe<Array<Scalars['String']>>
};

export type TTypeDefinitionQueryResult = {
   __typename?: 'TypeDefinitionQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TTypeDefinition>,
};

export type TUnpublishProduct = {
  dummy: Maybe<Scalars['String']>,
};

export type TUpdateCartItemShippingAddress = {
  address: TAddressInput,
};

export type TUpdateOrderItemShippingAddress = {
  address: TAddressInput,
};

export type TUpdateOrderSyncInfo = {
  channel: TResourceIdentifierInput,
  syncedAt: Maybe<Scalars['DateTime']>,
  externalId: Maybe<Scalars['String']>,
};

/** Versioned object have an ID and version and modification. Every update of this object changes it's version. */
export type TVersioned = {
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};

export type TWhitespaceSuggestTokenizerInput = {
  dummy: Maybe<Scalars['String']>,
};

/** ww */
export type TWwProductType = TProductType & {
   __typename?: 'wwProductType',
  productTypeId: Scalars['String'],
};


/** Zones allow defining ShippingRates for specific Locations. */
export type TZone = TVersioned & {
   __typename?: 'Zone',
  name: Scalars['String'],
  key: Maybe<Scalars['String']>,
  description: Maybe<Scalars['String']>,
  locations: Array<TLocation>,
  id: Scalars['String'],
  version: Scalars['Long'],
  createdAt: Scalars['DateTime'],
  lastModifiedAt: Scalars['DateTime'],
  createdBy: Maybe<TInitiator>,
  lastModifiedBy: Maybe<TInitiator>,
};

export type TZoneLocation = {
  country: Scalars['Country'],
  state: Maybe<Scalars['String']>,
};

export type TZoneQueryResult = {
   __typename?: 'ZoneQueryResult',
  offset: Scalars['Int'],
  count: Scalars['Int'],
  total: Scalars['Long'],
  results: Array<TZone>,
};

export type TZoneRate = {
   __typename?: 'ZoneRate',
  shippingRates: Array<TShippingRate>,
  zoneRef: Maybe<TReference>,
  zone: Maybe<TZone>,
};

export type TZoneRateDraft = {
  zone: TResourceIdentifierInput,
  shippingRates: Maybe<Array<TShippingRateDraft>>,
};

export type TZoneUpdateAction = {
  addLocation: Maybe<TAddZoneLocation>,
  changeName: Maybe<TChangeZoneName>,
  removeLocation: Maybe<TRemoveZoneLocation>,
  setDescription: Maybe<TSetZoneDescription>,
  setKey: Maybe<TSetZoneKey>,
};

export type TQuickAccessProductQueryVariables = {
  productId: Scalars['String']
};


export type TQuickAccessProductQuery = (
  { __typename?: 'Query' }
  & { product: Maybe<(
    { __typename?: 'Product' }
    & Pick<TProduct, 'id'>
    & { masterData: (
      { __typename?: 'ProductCatalogData' }
      & { staged: Maybe<(
        { __typename?: 'ProductData' }
        & { allVariants: Array<(
          { __typename?: 'ProductVariant' }
          & Pick<TProductVariant, 'id' | 'key' | 'sku'>
        )> }
      )> }
    ) }
  )> }
);

export type TQuickAccessQueryVariables = {
  searchText: Scalars['String'],
  canViewProducts: Scalars['Boolean'],
  productsWhereClause: Maybe<Scalars['String']>,
  includeProductsByIds: Scalars['Boolean']
};


export type TQuickAccessQuery = (
  { __typename?: 'Query' }
  & { productsByIds: (
    { __typename?: 'ProductQueryResult' }
    & { results: Array<(
      { __typename?: 'Product' }
      & Pick<TProduct, 'id'>
      & { masterData: (
        { __typename?: 'ProductCatalogData' }
        & { staged: Maybe<(
          { __typename?: 'ProductData' }
          & { nameAllLocales: Array<(
            { __typename?: 'LocalizedString' }
            & Pick<TLocalizedString, 'locale' | 'value'>
          )> }
        )> }
      ) }
    )> }
  ), productById: Maybe<(
    { __typename?: 'Product' }
    & Pick<TProduct, 'key' | 'id'>
    & { masterData: (
      { __typename?: 'ProductCatalogData' }
      & { staged: Maybe<(
        { __typename?: 'ProductData' }
        & { nameAllLocales: Array<(
          { __typename?: 'LocalizedString' }
          & Pick<TLocalizedString, 'locale' | 'value'>
        )> }
      )> }
    ) }
  )>, productByKey: Maybe<(
    { __typename?: 'Product' }
    & Pick<TProduct, 'key' | 'id'>
    & { masterData: (
      { __typename?: 'ProductCatalogData' }
      & { staged: Maybe<(
        { __typename?: 'ProductData' }
        & { nameAllLocales: Array<(
          { __typename?: 'LocalizedString' }
          & Pick<TLocalizedString, 'locale' | 'value'>
        )> }
      )> }
    ) }
  )>, productByVariantSku: Maybe<(
    { __typename?: 'Product' }
    & Pick<TProduct, 'id'>
    & { masterData: (
      { __typename?: 'ProductCatalogData' }
      & { staged: Maybe<(
        { __typename?: 'ProductData' }
        & { nameAllLocales: Array<(
          { __typename?: 'LocalizedString' }
          & Pick<TLocalizedString, 'locale' | 'value'>
        )>, variant: Maybe<(
          { __typename?: 'ProductVariant' }
          & Pick<TProductVariant, 'sku' | 'key' | 'id'>
        )> }
      )> }
    ) }
  )>, productByVariantKey: Maybe<(
    { __typename?: 'Product' }
    & Pick<TProduct, 'id'>
    & { masterData: (
      { __typename?: 'ProductCatalogData' }
      & { staged: Maybe<(
        { __typename?: 'ProductData' }
        & { nameAllLocales: Array<(
          { __typename?: 'LocalizedString' }
          & Pick<TLocalizedString, 'locale' | 'value'>
        )>, variant: Maybe<(
          { __typename?: 'ProductVariant' }
          & Pick<TProductVariant, 'sku' | 'key' | 'id'>
        )> }
      )> }
    ) }
  )> }
);
