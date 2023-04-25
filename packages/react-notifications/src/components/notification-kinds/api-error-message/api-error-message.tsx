import { useEffect } from 'react';
import has from 'lodash/has';
import type { IntlShape } from 'react-intl';

import { useIntl } from 'react-intl';
import type { TAppNotificationApiError } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import messages from './messages';

const regexInvalidOperationRequiredAttribute =
  /Required attribute '(.*)' cannot be removed/;

type ExtraErrorFields = {
  errorByExtension?: {
    id: string;
    key?: string;
  };
  localizedMessage?: { [locale: string]: string };
  field?: string;
  duplicateValue?: string;
  invalidValue?:
    | string
    | { overlappingPrices: string }
    | {
        validFrom: string;
        validUntil: string;
      };
  detailedErrorMessage?: string;
  attribute?: {
    name: string;
  };
  referencedBy?: string;
};
type Props = {
  error: TAppNotificationApiError<ExtraErrorFields>;
};

// The values passed to the Intl message must be a map of scalar values.
// Some of the message values are already mapped in the `getSpecialFormattedMessageByErrorCode`
// function. Here we map other possible error properties that can be
// used in the message.
const mapErrorFieldsToMessageValues = (error: Props['error']) => {
  if (error.field) return { field: error.field };
  if (error.referencedBy) return { referencedBy: error.referencedBy };
  return {};
};

// Type-guard validation for error code to be included in the message object keys.
const hasErrorCodeAMatchingMessage = (
  errorCode: string
): errorCode is keyof typeof messages => errorCode in messages;

const FormattedErrorMessage = (props: Props) => {
  const intl = useIntl();
  // Attempt to map the error by code
  const extensionErrorCode = props.error.extensions?.code ?? props.error.code;

  const messageCode =
    extensionErrorCode && hasErrorCodeAMatchingMessage(extensionErrorCode)
      ? messages[extensionErrorCode]
      : undefined;

  useEffect(() => {
    if (!messageCode) {
      // This error is not mapped / translated yet,
      // we log, report it to sentry and show the original error, unless `error.code` is `invalid_scope`
      // which an error code emitted for expired project(s)
      if (
        extensionErrorCode !== 'invalid_scope' &&
        !props.error.message.includes('has expired')
      ) {
        reportErrorToSentry(new Error('Unmapped error'), {
          extra: props.error,
        });
      }
    }
  }, [extensionErrorCode, messageCode, props.error]);

  if (messageCode) {
    // The `error` object might contain extra fields for the specific `code`.
    return (
      <>
        {intl.formatMessage(
          messageCode,
          mapErrorFieldsToMessageValues(props.error)
        )}
      </>
    );
  }

  return (
    <>
      {[
        props.error.message,
        props.error.detailedErrorMessage &&
          `(${props.error.detailedErrorMessage})`,
      ]
        .filter(Boolean)
        .join(' ')}
    </>
  );
};
FormattedErrorMessage.displayName = 'FormattedErrorMessage';

const ApiErrorMessage = (props: Props) => {
  const intl = useIntl();

  // Attempt to map the error to a specific error message
  const specialFormattedMessage = getSpecialFormattedMessageByErrorCode(
    props.error,
    intl
  );
  if (specialFormattedMessage) {
    return <>{specialFormattedMessage}</>;
  }

  return <FormattedErrorMessage {...props} />;
};
ApiErrorMessage.displayName = 'ApiErrorMessage';

export default ApiErrorMessage;

function getSpecialFormattedMessageByErrorCode(
  error: Props['error'],
  intl: IntlShape
) {
  const extensionErrorCode = error.extensions?.code ?? error.code;

  if (error.errorByExtension) {
    let extensionMessage;
    if (error.localizedMessage) {
      extensionMessage = error.localizedMessage[intl.locale];
    }
    return extensionMessage || error.message;
  }

  if (!extensionErrorCode || extensionErrorCode === 'InvalidInput')
    return intl.formatMessage(messages.General);

  // TODO: this is a temporary solution until we have proper pages about 403
  if (extensionErrorCode === 'insufficient_scope')
    return intl.formatMessage(messages.Forbidden);

  if (extensionErrorCode === 'DuplicateField') {
    if (error.field === 'slug')
      return intl.formatMessage(messages.DuplicateSlug, {
        slugValue: error.duplicateValue,
      });
    else
      return intl.formatMessage(messages.DuplicateField, {
        field: error.field,
      });
  }

  // Try to match the error with a custom error message
  if (
    has(error, 'invalidValue') &&
    has(error.invalidValue, 'overlappingPrices')
  )
    return intl.formatMessage(messages.OverlappingPrices);

  if (
    extensionErrorCode === 'InvalidOperation' &&
    error.message.includes('validFrom') &&
    error.message.includes('validUntil')
  ) {
    return intl.formatMessage(messages.InvalidDateRange, {
      field: 'validFrom',
    });
  }

  if (
    extensionErrorCode === 'InvalidOperation' &&
    error.message.includes('Duplicate tax rate for')
  ) {
    return intl.formatMessage(messages.TaxCategoryDuplicateCountry);
  }

  if (
    extensionErrorCode === 'InvalidOperation' &&
    regexInvalidOperationRequiredAttribute.test(error.message)
  ) {
    const attrName = error.message.replace(
      regexInvalidOperationRequiredAttribute,
      '$1'
    );

    return intl.formatMessage(messages.RequiredField, { field: attrName });
  }

  // TODO: A concern has be raised that we can't accurately distinguish
  // this error (invalid start / end dates with prices) from other price
  // errors. We should investigate this further.
  if (
    extensionErrorCode === 'InvalidField' &&
    error.field === 'price' &&
    has(error, 'invalidValue') &&
    has(error.invalidValue, 'validFrom') &&
    has(error.invalidValue, 'validUntil')
  )
    return intl.formatMessage(messages.InvalidDateRange, {
      field: error.field,
    });

  if (extensionErrorCode === 'DuplicateAttributeValue' && error.attribute) {
    return intl.formatMessage(messages.DuplicateAttributeValue, {
      name: error.attribute.name,
    });
  }

  if (extensionErrorCode === 'MaxResourceLimitExceeded') {
    return intl.formatMessage(messages.MaxResourceLimitExceeded);
  }

  return;
}
