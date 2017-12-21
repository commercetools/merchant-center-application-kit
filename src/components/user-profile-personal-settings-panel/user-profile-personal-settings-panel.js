import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { defaultMemoize } from 'reselect';
import Select from 'react-select';
import { Field, formValueSelector } from 'redux-form';
import {
  withTimeZones,
  timeZonesShape,
} from '@commercetools-local/l10n/time-zone-information';
import wrapInputForReduxForm from '@commercetools-local/core/components/input-wrapper';
import CollapsiblePanel from '@commercetools-local/core/components/toggles/collapsible-panel';
import FormBox from '@commercetools-local/core/components/form-box';
import LabelField from '@commercetools-local/core/components/fields/label-field';
import { USER_PROFILE_FORM_NAME } from '../../constants';
import messages from './messages';

const RFSelect = wrapInputForReduxForm(Select);

export const timeZonesToOptions = defaultMemoize(timeZones =>
  Object.entries(timeZones).map(([code, value]) => ({
    value: code,
    // E.g. `Europe/Berlin - CEST (+02:00)`
    label: `${code} - ${value.abbr} (${value.offset})`,
  }))
);

export const UserProfilePersonalSettingsPanel = props => (
  <CollapsiblePanel label={props.intl.formatMessage(messages.title)}>
    <FormBox>
      <LabelField
        title={props.intl.formatMessage(messages.language)}
        isRequired={true}
      />
      <Field
        name="language"
        component={RFSelect}
        options={[{ value: 'en', label: 'EN' }, { value: 'de', label: 'DE' }]}
        clearable={false}
        searchable={false}
        parse={
          /* transform react select option to form value */
          ({ value }) => value
        }
      />
    </FormBox>
    <FormBox>
      <LabelField title={props.intl.formatMessage(messages.timeZone)} />
      <Field
        name="timeZone"
        component={RFSelect}
        options={timeZonesToOptions(props.timeZones)}
        clearable={true}
        searchable={true}
        parse={
          /* transform react select option to form value */
          option => (option ? option.value : null)
        }
      />
    </FormBox>
  </CollapsiblePanel>
);
UserProfilePersonalSettingsPanel.displayName =
  'UserProfilePersonalSettingsPanel';
UserProfilePersonalSettingsPanel.propTypes = {
  hasSubmitFailed: PropTypes.bool,
  // HoC
  timeZones: timeZonesShape,
  intl: intlShape.isRequired,
};

const valueSelector = formValueSelector(USER_PROFILE_FORM_NAME);

export default compose(
  connect(state => ({ locale: valueSelector(state, 'language') })),
  withTimeZones(ownProps => ownProps.locale),
  injectIntl
)(UserProfilePersonalSettingsPanel);
