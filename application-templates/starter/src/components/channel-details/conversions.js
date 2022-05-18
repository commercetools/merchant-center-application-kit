import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';

export const docToFormValues = (channel, languages) => ({
  key: channel?.key ?? '',
  roles: channel?.roles ?? [],
  name: LocalizedTextInput.createLocalizedString(
    languages,
    transformLocalizedFieldToLocalizedString(channel?.nameAllLocales ?? [])
  ),
});

export const formValuesToDoc = (formValues) => ({
  key: formValues.key,
  roles: formValues.roles,
  name: LocalizedTextInput.omitEmptyTranslations(formValues.name),
});
