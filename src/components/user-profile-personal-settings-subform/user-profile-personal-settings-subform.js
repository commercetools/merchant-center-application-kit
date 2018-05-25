import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import { defaultMemoize } from 'reselect';
import Select from 'react-select';
import {
  withTimeZones,
  timeZonesShape,
} from '@commercetools-local/l10n/time-zone-information';
import {
  withLanguages,
  languagesShape,
} from '@commercetools-local/l10n/language-information';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import ValidationError from '@commercetools-local/core/components/validation-error';
import ErrorMessage from '@commercetools-local/ui-kit/messages/error-message';
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';
import FormBox from '@commercetools-local/core/components/form-box';
import LabelField from '@commercetools-local/core/components/fields/label-field';
import { messages as validationMessages } from '@commercetools-local/utils/validation';
import { withUser } from '../fetch-user';
import messages from './messages';

export const timeZonesToOptions = defaultMemoize(timeZones =>
  Object.entries(timeZones).map(([code, value]) => ({
    value: code,
    // E.g. `Europe/Berlin - CEST (+02:00)`
    label: `${code} - ${value.abbr} (${value.offset})`,
  }))
);

/* 
 * We are going to display now locales(<language-code>-<country-code>) instead of just languages, 
 * but we still need to define only the ones with the language 'en' or 'de'.
 * So 'en-GB' is a valid option but not 'es-PR'. 
 */
export const mapLocalesToOptions = defaultMemoize(locales =>
  Object.entries(locales)
    .filter(([locale]) => locale.startsWith('en') || locale.startsWith('de'))
    .map(([locale, value]) => ({
      value: locale,
      label: value.country
        ? `${value.language} (${value.country}) (${locale})`
        : `${value.language} (${locale})`,
    }))
);

export const UserProfilePersonalSettingsSubform = props => (
  <CollapsiblePanel label={<FormattedMessage {...messages.title} />}>
    <FormBox>
      <LabelField
        title={<FormattedMessage {...messages.language} />}
        isRequired={true}
      />
      <Spacings.Stack>
        <Select
          name="language"
          value={props.formik.values.language}
          onChange={option => {
            props.formik.setFieldValue('language', option.value);
            props.formik.setFieldTouched('language');
          }}
          onBlur={() => {
            props.formik.setFieldTouched('language');
          }}
          options={mapLocalesToOptions(props.languages)}
          clearable={false}
          searchable={false}
          parse={
            /* transform react select option to form value */
            ({ value }) => value
          }
          disabled={props.formik.isSubmitting}
        />
        <ValidationError.Switch
          errors={props.formik.errors.language}
          isTouched={props.formik.touched.language}
        >
          <ValidationError.Match rule="required">
            <ErrorMessage>
              <FormattedMessage {...validationMessages.required} />
            </ErrorMessage>
          </ValidationError.Match>
        </ValidationError.Switch>
      </Spacings.Stack>
    </FormBox>
    <FormBox>
      <LabelField title={<FormattedMessage {...messages.timeZone} />} />
      <Select
        name="timeZone"
        value={props.formik.values.timeZone}
        onChange={option => {
          props.formik.setFieldValue('timeZone', option ? option.value : null);
          props.formik.setFieldTouched('timeZone');
        }}
        onBlur={() => {
          props.formik.setFieldTouched('timeZone');
        }}
        options={timeZonesToOptions(props.timeZones)}
        clearable={true}
        searchable={true}
        parse={
          /* transform react select option to form value */
          option => (option ? option.value : null)
        }
        disabled={props.formik.isSubmitting}
      />
    </FormBox>
  </CollapsiblePanel>
);
UserProfilePersonalSettingsSubform.displayName =
  'UserProfilePersonalSettingsSubform';
UserProfilePersonalSettingsSubform.propTypes = {
  formik: PropTypes.shape({
    isSubmitting: PropTypes.bool.isRequired,
    values: PropTypes.shape({
      language: PropTypes.string.isRequired,
      timeZone: PropTypes.string,
    }),
    errors: PropTypes.shape({
      language: PropTypes.shape({
        required: PropTypes.bool.isRequired,
      }),
    }),
    touched: PropTypes.shape({
      language: PropTypes.bool,
    }),
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }),

  // HoC
  timeZones: timeZonesShape,
  languages: languagesShape,
  user: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  withUser(userData => ({
    user: { locale: userData.user && userData.user.language },
  })),
  withTimeZones(ownProps => ownProps.user.locale),
  withLanguages(ownProps => ownProps.user.locale)
)(UserProfilePersonalSettingsSubform);
