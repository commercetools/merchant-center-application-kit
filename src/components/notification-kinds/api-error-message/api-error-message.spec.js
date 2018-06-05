import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import { reportErrorToSentry } from '@commercetools-local/sentry';
import { ApiErrorMessage } from './api-error-message';

jest.mock('@commercetools-local/sentry');

const createTestProps = custom => ({
  error: {
    code: 'InvalidInput',
  },
  intl: {
    locale: 'en',
  },
  ...custom,
});

describe('render', () => {
  let props;
  let wrapper;

  describe('InvalidInput', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show General message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.General'
      );
    });
  });

  describe('unnecessary code', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'unnecessary code',
          invalidValue: {
            overlappingPrices: 'overlappingPricesContent',
          },
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show OverlappingPrices message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.OverlappingPrices'
      );
    });
  });

  describe('RequiredField', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'InvalidOperation',
          message: "Required attribute 'foo' cannot be removed",
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show RequiredField message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.RequiredField'
      );
    });

    it('should pass the missing field foo', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp('values', {
        field: 'foo',
      });
    });
  });

  describe('InvalidField', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'InvalidField',
          field: 'price',
          invalidValue: {
            validFrom: 'foo',
            validUntil: 'bar',
          },
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show InvalidDateRange message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.InvalidDateRange'
      );
    });

    it('should pass the invalid value', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp('values', {
        field: 'price',
      });
    });
  });

  describe('unmapped error', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'unmapped error message foo 123',
          message: 'messageContent',
          detailedErrorMessage: 'detailedErrorMessageContent',
        },
      });
      reportErrorToSentry.mockReset();
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show unmapped error message', () => {
      expect(wrapper).toIncludeText('messageContent');
    });

    it('should show unmapped detailed error message', () => {
      expect(wrapper).toIncludeText('detailedErrorMessageContent');
    });

    it('should report the error', () => {
      expect(reportErrorToSentry).toHaveBeenCalledTimes(1);
    });
  });

  describe('DuplicateSlug', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'DuplicateField',
          field: 'slug',
          duplicateValue: 'duplicateValueContent',
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show DuplicateSlug message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.DuplicateSlug'
      );
    });

    it('should pass the slugValue', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp('values', {
        slugValue: 'duplicateValueContent',
      });
    });
  });

  describe('DuplicateAttributeValue error message', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'DuplicateAttributeValue',
          message: 'messageContent',
          attribute: {
            name: 'attribute-name',
          },
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show DuplicateAttributeValue message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.DuplicateAttributeValue'
      );
    });

    it('should have the attribute name as the value', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp('values', {
        name: 'attribute-name',
      });
    });
  });

  describe('Mappped error message', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'Unauthorized',
          message: 'messageContent',
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show Unauthorized message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.Unauthorized'
      );
    });

    it('should pass the error as the value', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp('values', {
        code: 'Unauthorized',
        message: 'messageContent',
      });
    });
  });

  describe('Forbidden', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'insufficient_scope',
          message: 'messageContent',
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show Forbidden message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.Forbidden'
      );
    });
  });

  describe('API Error extensions', () => {
    describe('if there is a localized message for the current locale', () => {
      beforeEach(() => {
        props = createTestProps({
          error: {
            code: 'InvalidField',
            message: 'Default message',
            errorByExtension: {
              id: 'some-id',
            },
            localizedMessage: {
              en: 'Custom Message',
              es: 'Mensaje personal',
            },
          },
        });
        wrapper = shallow(<ApiErrorMessage {...props} />);
      });

      it('should show custom message in english', () => {
        expect(wrapper).toHaveText('Custom Message');
      });
    });

    describe('if there is no localized message for the current locale', () => {
      beforeEach(() => {
        props = createTestProps({
          error: {
            code: 'InvalidField',
            message: 'Default message',
            errorByExtension: {
              id: 'some-id',
            },
            localizedMessage: {
              es: 'Mensaje personal',
            },
          },
        });
        wrapper = shallow(<ApiErrorMessage {...props} />);
      });

      it('should show default message', () => {
        expect(wrapper).toHaveText('Default message');
      });
    });
  });

  describe('ExtensionNoResponse', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'ExtensionNoResponse',
          message: 'messageContent',
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show ExtensionNoResponse message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.ExtensionNoResponse'
      );
    });
  });

  describe('ExtensionBadResponse', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'ExtensionBadResponse',
          message: 'messageContent',
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show ExtensionBadResponse message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.ExtensionBadResponse'
      );
    });
  });

  describe('ExtensionUpdateActionsFailed', () => {
    beforeEach(() => {
      props = createTestProps({
        error: {
          code: 'ExtensionUpdateActionsFailed',
        },
      });
      wrapper = shallow(<ApiErrorMessage {...props} />);
    });

    it('should show ExtensionUpdateActionsFailed message', () => {
      expect(wrapper.find(FormattedMessage)).toHaveProp(
        'id',
        'ApiError.ExtensionUpdateActionsFailed'
      );
    });
  });
});
