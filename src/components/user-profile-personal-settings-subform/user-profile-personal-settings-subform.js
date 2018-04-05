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
import CollapsiblePanel from '@commercetools-local/ui-kit/panels/collapsible-panel';
import FormBox from '@commercetools-local/core/components/form-box';
import LabelField from '@commercetools-local/core/components/fields/label-field';
import { withUser } from '../fetch-user';
import messages from './messages';

export const timeZonesToOptions = defaultMemoize(timeZones =>
  Object.entries(timeZones).map(([code, value]) => ({
    value: code,
    // E.g. `Europe/Berlin - CEST (+02:00)`
    label: `${code} - ${value.abbr} (${value.offset})`,
  }))
);

export const UserProfilePersonalSettingsSubform = props => (
  <CollapsiblePanel label={<FormattedMessage {...messages.title} />}>
    <FormBox>
      <LabelField
        title={<FormattedMessage {...messages.language} />}
        isRequired={true}
      />
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
        options={[{ value: 'en', label: 'EN' }, { value: 'de', label: 'DE' }]}
        clearable={false}
        searchable={false}
        parse={
          /* transform react select option to form value */
          ({ value }) => value
        }
        disabled={props.formik.isSubmitting}
      />
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
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
  }),

  // HoC
  timeZones: timeZonesShape,
  user: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  withUser(userData => ({
    user: { locale: userData.user && userData.user.language },
  })),
  withTimeZones(ownProps => ownProps.user.locale)
)(UserProfilePersonalSettingsSubform);
