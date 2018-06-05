import { defineMessages } from 'react-intl';

export default defineMessages({
  General: {
    id: 'ApiError.General',
    description:
      'A general error message, usually because of internal application problems. The user should not know the details of the error.',
    defaultMessage:
      'Sorry, but there seems to be something wrong. Please try again. If you are seeing this message for the second time, please contact our support team.',
  },

  // Custom API Error messages (without a matching error.code)
  OverlappingPrices: {
    id: 'ApiError.OverlappingPrices',
    description: '',
    defaultMessage:
      'Sorry, but a price with these details already exists. Please amend the price details so that they do not overlap with another price before saving.',
  },
  ConcurrentModificationBulkEdit: {
    id: 'ApiError.ConcurrentModificationBulkEdit',
    description:
      'User does a bulk update but someone else has saved changes for that element',
    defaultMessage:
      'Sorry, but we were unable to save your changes as someone else made changes to this same resource while you were editing.',
  },

  // API errors
  ConcurrentModification: {
    id: 'ApiError.ConcurrentModification',
    description:
      'User edits form and clicks Save but someone else has saved changes for this element while they were editing',
    defaultMessage:
      'Sorry, but we were unable to save your changes as someone else made changes to this same resource while you were editing. Please refresh the page and re-enter your changes.',
  },
  DuplicateAttributeValue: {
    id: 'ApiError.DuplicateAttributeValue',
    description:
      'User tries to enter the same attribute value for an attribute with the Unique constraint',
    defaultMessage:
      'This value has already been used for another variant. The "{name}" value must be unique for all variants for this product. Please enter a different value.',
  },
  DuplicateAttributeValues: {
    id: 'ApiError.DuplicateAttributeValues',
    description:
      'User tries to enter existing attribute values for a combination of attributes with the CombinationUnique constraint',
    defaultMessage:
      'This combination has already been used for another variant. The combination of these attributes must be unique across all variants. Please enter a different version.',
  },
  DuplicateField: {
    id: 'ApiError.DuplicateField',
    description: 'The given field must be unique across the project',
    defaultMessage:
      'The value for the field "{field}" has already been used. Please choose another value for this field.',
  },
  DuplicateSlug: {
    id: 'ApiError.DuplicateSlug',
    description:
      'User tries to create a resource with an already existing slug',
    defaultMessage:
      '"{slugValue}" is already in use. Please enter a new slug value for this product.',
  },
  DuplicatePriceScope: {
    id: 'ApiError.DuplicatePriceScope',
    description:
      'User tries to create a price with the exact same values as for an already existing price',
    defaultMessage:
      'The same price already exists for this product variant. Please enter different values for the price fields.',
  },
  DuplicateVariantValues: {
    id: 'ApiError.DuplicateVariantValues',
    description:
      'User tries to generate a variant with the same SKU or attribute values',
    defaultMessage:
      'The same variant already exists for this product. Please enter different values for the fields.',
  },
  InvalidDateRange: {
    id: 'ApiError.InvalidDateRange',
    description: 'User tries to input an invalid date range',
    defaultMessage:
      'The value entered for the field {field} is invalid. The start date must be before the end date',
  },
  InvalidField: {
    id: 'ApiError.InvalidField',
    description: 'User enters an invalid value for a field.',
    defaultMessage: 'The value entered is not valid for the field "{field}".',
  },
  InvalidSlug: {
    id: 'ApiError.InvalidSlug',
    description: 'User enters an invalid value for the product slug',
    defaultMessage:
      'Slugs may only contain alphanumeric (0-9A-Z) characters, underscores and hyphens and must have a length between 2 and 256 characters.',
  },
  PendingOperation: {
    id: 'ApiError.PendingOperation',
    description:
      'User tries to start a new process when one is already underway',
    defaultMessage:
      'Sorry, but we are still processing the previous request. Please try again once it is complete.',
  },
  ResourceNotFound: {
    id: 'ApiError.ResourceNotFound',
    description:
      'System cannot find the functionality or screen that the user is trying to access.',
    defaultMessage: 'Sorry, but we cannot find what you are looking for.',
  },
  ReferenceExists: {
    id: 'ApiError.ReferenceExists',
    description:
      'User tries to delete an element that has an existing reference to it from another element',
    defaultMessage:
      'Can not delete a resource while it is referenced from at least one "{referencedBy}".',
  },
  RequiredField: {
    id: 'ApiError.RequiredField',
    description: 'User does not enter a required field',
    defaultMessage: '"{field}" is a required field. Please enter a value.',
  },
  RequiredFields: {
    // Client side validation
    id: 'ApiError.RequiredFields',
    description:
      'User submits a form without having completed all mandatory fields',
    defaultMessage:
      'Please enter values for the following required fields: {fields}',
  },
  SemanticError: {
    id: 'ApiError.SemanticError',
    description:
      'User enters a predicate query that throws a system semantic error',
    defaultMessage:
      'Semantic error: the given Predicate is not valid. Please read the documentation to define a correct predicate.',
  },
  SyntaxError: {
    id: 'ApiError.SyntaxError',
    description:
      'User enters a predicate query that throws a system syntax error',
    defaultMessage:
      'Syntax error: the given Predicate is not valid. Please read the documentation to define a correct predicate.',
  },
  Unauthorized: {
    id: 'ApiError.Unauthorized',
    description:
      'The access token is not valid anymore, or the user does not have a valid one',
    defaultMessage: 'Sorry, but you are not authorized to access this feature.',
  },
  Forbidden: {
    id: 'ApiError.Forbidden',
    description:
      'User tries to access a view that they do not have permission for',
    defaultMessage:
      'You are not authorized to access this feature. Please contact your system administrator with any further questions.',
  },
  ExtensionNoResponse: {
    id: 'ApiError.ExtensionNoResponse',
    description:
      'User tries to access a view that they do not have permission for',
    defaultMessage:
      'Sorry, we could not perform the requested action due to an API extension not responding.',
  },
  ExtensionBadResponse: {
    id: 'ApiError.ExtensionBadResponse',
    description:
      'User tries to access a view that they do not have permission for',
    defaultMessage:
      'Sorry, we could not perform the requested action due to failed processing of an API extension response.',
  },
  ExtensionUpdateActionsFailed: {
    id: 'ApiError.ExtensionUpdateActionsFailed',
    description:
      'User tries to access a view that they do not have permission for',
    defaultMessage:
      'Sorry, we could not perform the requested action. It is not possible to perform the update actions as instructed by the API extension.',
  },
});
