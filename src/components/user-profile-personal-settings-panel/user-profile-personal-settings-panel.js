import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
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

export const UserProfilePersonalSettingsPanel = ({
  isSubmitting,
  values,
  intl,
  onChangeFieldValue,
  onBlurField,
  timeZones,
}) => (
  <CollapsiblePanel label={intl.formatMessage(messages.title)}>
    <FormBox>
      <LabelField
        title={intl.formatMessage(messages.language)}
        isRequired={true}
      />
      <Select
        name="language"
        value={values.language}
        onChange={option => {
          onChangeFieldValue('language', option.value);
          onBlurField('language');
        }}
        onBlur={() => {
          onBlurField('language');
        }}
        options={[{ value: 'en', label: 'EN' }, { value: 'de', label: 'DE' }]}
        clearable={false}
        searchable={false}
        parse={
          /* transform react select option to form value */
          ({ value }) => value
        }
        disabled={isSubmitting}
      />
    </FormBox>
    <FormBox>
      <LabelField title={intl.formatMessage(messages.timeZone)} />
      <Select
        name="timeZone"
        value={values.timeZone}
        onChange={option => {
          onChangeFieldValue('timeZone', option ? option.value : null);
          onBlurField('timeZone');
        }}
        onBlur={() => {
          onBlurField('timeZone');
        }}
        options={timeZonesToOptions(timeZones)}
        clearable={true}
        searchable={true}
        parse={
          /* transform react select option to form value */
          option => (option ? option.value : null)
        }
        disabled={isSubmitting}
      />
    </FormBox>
  </CollapsiblePanel>
);
UserProfilePersonalSettingsPanel.displayName =
  'UserProfilePersonalSettingsPanel';
UserProfilePersonalSettingsPanel.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    language: PropTypes.string.isRequired,
    timeZone: PropTypes.string,
  }),
  onChangeFieldValue: PropTypes.func.isRequired,
  onBlurField: PropTypes.func.isRequired,
  // HoC
  timeZones: timeZonesShape,
  intl: intlShape.isRequired,
  user: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  withUser,
  withTimeZones(ownProps => ownProps.user.locale),
  injectIntl
)(UserProfilePersonalSettingsPanel);
