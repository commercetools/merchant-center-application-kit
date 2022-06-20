import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedStringToLocalizedField } from '@commercetools-frontend/l10n';

export const formValuesToDoc = (formValues) => ({
  name: transformLocalizedStringToLocalizedField(
    LocalizedTextInput.omitEmptyTranslations(formValues.name)
  ),
  // ...
})
