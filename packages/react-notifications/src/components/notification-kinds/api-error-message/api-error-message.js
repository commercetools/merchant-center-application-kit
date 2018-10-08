import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import has from 'lodash.has';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import messages from './messages';

const regexInvalidOperationRequiredAttribute = /Required attribute '(.*)' cannot be removed/;

export const ApiErrorMessage = props => {
  if (props.error.localizedMessage) {
    const localizedMessage = props.error.localizedMessage[props.intl.locale];

    return localizedMessage || props.error.message;
  }

  if (!props.error.code || props.error.code === 'InvalidInput')
    return <FormattedMessage {...messages.General} />;

  // The following three checks are from the API Error Extension Scope
  // https://docs.commercetools.com/http-api-projects-api-extensions.html#error-cases
  if (props.error.code === 'ExtensionNoResponse')
    return <FormattedMessage {...messages.ExtensionNoResponse} />;

  if (props.error.code === 'ExtensionBadResponse')
    return <FormattedMessage {...messages.ExtensionBadResponse} />;

  if (props.error.code === 'ExtensionUpdateActionsFailed')
    return <FormattedMessage {...messages.ExtensionUpdateActionsFailed} />;

  // TODO: this is a temporary solution until we have proper pages about 403
  if (props.error.code === 'insufficient_scope')
    return <FormattedMessage {...messages.Forbidden} />;

  if (props.error.code === 'DuplicateField' && props.error.field === 'slug')
    return (
      <FormattedMessage
        {...messages.DuplicateSlug}
        values={{ slugValue: props.error.duplicateValue }}
      />
    );

  // Try to match the error with a custom error message
  if (
    has(props.error, 'invalidValue') &&
    has(props.error.invalidValue, 'overlappingPrices')
  )
    return <FormattedMessage {...messages.OverlappingPrices} />;

  if (
    props.error.code === 'InvalidOperation' &&
    props.error.message.includes('validFrom') &&
    props.error.message.includes('validUntil')
  ) {
    return (
      <FormattedMessage
        {...messages.InvalidDateRange}
        values={{ field: 'validFrom' }}
      />
    );
  }

  if (
    props.error.code === 'InvalidOperation' &&
    props.error.message.includes('Duplicate tax rate for')
  ) {
    return <FormattedMessage {...messages.TaxCategoryDuplicateCountry} />;
  }

  if (
    props.error.code === 'InvalidOperation' &&
    regexInvalidOperationRequiredAttribute.test(props.error.message)
  ) {
    const attrName = props.error.message.replace(
      regexInvalidOperationRequiredAttribute,
      '$1'
    );

    return (
      <FormattedMessage
        {...messages.RequiredField}
        values={{ field: attrName }}
      />
    );
  }

  // TODO: A concern has be raised that we can't accurately distinguish
  // this error (invalid start / end dates with prices) from other price
  // errors. We should investigate this further.
  if (
    props.error.code === 'InvalidField' &&
    props.error.field === 'price' &&
    ('validFrom' in props.error.invalidValue &&
      'validUntil' in props.error.invalidValue &&
      Object.keys(props.error.invalidValue).length === 2)
  )
    return (
      <FormattedMessage
        {...messages.InvalidDateRange}
        values={{ field: props.error.field }}
      />
    );

  const message = messages[props.error.code];
  if (!message) {
    // This error is not mapped / translated yet,
    // we log / report it and show the original error.
    // NOTE this is a side-effect within the render function, which is bad!
    // This should be moved to componentDidMount
    reportErrorToSentry(new Error('Unmapped error'), { extra: props.error });

    return (
      <div>
        <span>{props.error.message}</span>
        {props.error.detailedErrorMessage ? (
          <span>{` (${props.error.detailedErrorMessage})`}</span>
        ) : null}
      </div>
    );
  }

  // TODO: ensure to correctly pass / parse extra fields
  // for specific errors.
  const messageValues =
    props.error.code === 'DuplicateAttributeValue'
      ? { name: props.error.attribute.name }
      : props.error;

  // The `error` object might contain extra
  // fields for the specific `code`.
  return <FormattedMessage {...message} values={messageValues} />;
};
ApiErrorMessage.displayName = 'ApiErrorMessage';
ApiErrorMessage.propTypes = {
  error: PropTypes.oneOfType([
    // DuplicateAttributeValue error (https://docs.commercetools.com/http-api-errors.html#400-bad-request-2)
    PropTypes.shape({
      code: PropTypes.string,
      message: PropTypes.string,
      detailedErrorMessage: PropTypes.string,
      attribute: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    // InvalidField error (https://docs.commercetools.com/http-api-errors.html#400-bad-request-1)
    PropTypes.shape({
      code: PropTypes.string,
      message: PropTypes.string,
      detailedErrorMessage: PropTypes.string,
      field: PropTypes.string,
      invalidValue: PropTypes.objectOf(PropTypes.string),
    }),
    // DuplicateField error (https://docs.commercetools.com/http-api-errors.html#400-bad-request-1)
    PropTypes.shape({
      code: PropTypes.string,
      message: PropTypes.string,
      detailedErrorMessage: PropTypes.string,
      field: PropTypes.string,
      duplicateValue: PropTypes.string,
    }),
    // General error
    PropTypes.shape({
      code: PropTypes.string,
      message: PropTypes.string,
      detailedErrorMessage: PropTypes.string,
    }),
    // Error extension
    PropTypes.shape({
      code: PropTypes.string,
      errorByExtension: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
      localizedMessage: PropTypes.object.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ]).isRequired,

  // Intl
  intl: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }),
};

export default injectIntl(ApiErrorMessage);
