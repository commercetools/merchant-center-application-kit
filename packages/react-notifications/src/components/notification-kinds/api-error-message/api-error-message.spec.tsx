import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import ApiErrorMessage from './api-error-message';

const renderMessage = (ui: React.ReactElement) =>
  render(<IntlProvider locale="en">{ui}</IntlProvider>);

describe('render', () => {
  it('should show message for InvalidInput', () => {
    const error = { code: 'InvalidInput', message: 'message-content' };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(/Sorry, but there seems to be something wrong/i)
    ).toBeInTheDocument();
  });
  it('should show message for OverlappingPrices', () => {
    const error = {
      code: 'unnecessary code',
      message: 'message-content',
      invalidValue: { overlappingPrices: 'overlappingPricesContent' },
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(
        /Sorry, but a price with these details already exists/i
      )
    ).toBeInTheDocument();
  });
  it('should show message for InvalidOperation', () => {
    const error = {
      code: 'InvalidOperation',
      message: "Required attribute 'foo' cannot be removed",
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(/"foo" is a required field/i)
    ).toBeInTheDocument();
  });
  it('should show message for InvalidDateRange', () => {
    const error = {
      code: 'InvalidField',
      message: 'message-content',
      field: 'price',
      invalidValue: {
        validFrom: 'foo',
        validUntil: 'bar',
      },
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(/The value entered for the field price is invalid/i)
    ).toBeInTheDocument();
  });
  it('should show message for unmapped error and report to sentry', async () => {
    console.warn = jest.fn();
    const error = {
      code: 'unmapped error message foo 123',
      message: 'message-content',
      detailedErrorMessage: 'detailed-error-message-content',
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText('message-content (detailed-error-message-content)')
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(console.warn).toHaveBeenCalledTimes(1);
    });
  });
  it('should show message for unmapped error and not report to sentry for project expired', async () => {
    console.warn = jest.fn();
    const error = {
      code: 'invalid_scope',
      message: 'has expired',
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(rendered.getByText('has expired')).toBeInTheDocument();
    await waitFor(() => {
      expect(console.warn).not.toHaveBeenCalled();
    });
  });
  it('should show message for DuplicateSlug', () => {
    const error = {
      code: 'DuplicateField',
      message: 'message-content',
      field: 'slug',
      duplicateValue: 'duplicateValueContent',
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(/"duplicateValueContent" is already in use/i)
    ).toBeInTheDocument();
  });
  it('should show message for DuplicateAttributeValue', () => {
    const error = {
      code: 'DuplicateAttributeValue',
      message: 'message-content',
      attribute: {
        name: 'attribute-name',
      },
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(
        /The "attribute-name" value must be unique for all variants for this product/i
      )
    ).toBeInTheDocument();
  });
  it('should show message for Unauthorized', () => {
    const error = {
      code: 'Unauthorized',
      message: 'message-content',
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(
        /Sorry, but you are not authorized to access this feature/i
      )
    ).toBeInTheDocument();
  });
  it('should show message for Forbidden', () => {
    const error = {
      code: 'insufficient_scope',
      message: 'message-content',
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(
        /You are not authorized to access this feature\. Please contact your system administrator with any further questions/i
      )
    ).toBeInTheDocument();
  });
  it('should show translated message for API Error extensions', () => {
    const error = {
      code: 'InvalidField',
      message: 'Default message',
      errorByExtension: {
        id: 'some-id',
      },
      localizedMessage: {
        en: 'Custom Message',
        es: 'Mensaje personal',
      },
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(rendered.getByText(/Custom Message/i)).toBeInTheDocument();
  });
  it('should show "untranslated" message for API Error extensions', () => {
    const error = {
      code: 'InvalidField',
      message: 'Default message',
      errorByExtension: {
        id: 'some-id',
      },
      localizedMessage: {
        es: 'Mensaje personal',
      },
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(rendered.getByText(/Default message/i)).toBeInTheDocument();
  });
  it('should show message for ExtensionNoResponse', () => {
    const error = {
      code: 'ExtensionNoResponse',
      message: 'message-content',
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(
        /Sorry, we could not perform the requested action due to an API extension not responding/i
      )
    ).toBeInTheDocument();
  });
  it('should show message for ExtensionBadResponse', () => {
    const error = {
      code: 'ExtensionBadResponse',
      message: 'message-content',
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(
        /Sorry, we could not perform the requested action due to failed processing of an API extension response/i
      )
    ).toBeInTheDocument();
  });
  it('should show message for ExtensionUpdateActionsFailed', () => {
    const error = {
      code: 'ExtensionUpdateActionsFailed',
      message: 'message-content',
    };
    const rendered = renderMessage(<ApiErrorMessage error={error} />);
    expect(
      rendered.getByText(
        /Sorry, we could not perform the requested action\. It is not possible to perform the update actions as instructed by the API extension/i
      )
    ).toBeInTheDocument();
  });
});
