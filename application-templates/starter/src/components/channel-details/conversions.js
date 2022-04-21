import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import {
  transformLocalizedFieldToLocalizedString,
  transformLocalizedStringToLocalizedField,
} from '@commercetools-frontend/l10n';

export const docToFormValues = (channel, languages) => ({
  ...channel,
  name: LocalizedTextInput.createLocalizedString(
    languages,
    transformLocalizedFieldToLocalizedString(channel?.nameAllLocales ?? [])
  ),
});

export const formValuesToDoc = (formValues) => ({
  key: formValues.key,
  roles: formValues.roles,
  nameAllLocales: transformLocalizedStringToLocalizedField(
    LocalizedTextInput.omitEmptyTranslations(formValues.name)
  ),
});
