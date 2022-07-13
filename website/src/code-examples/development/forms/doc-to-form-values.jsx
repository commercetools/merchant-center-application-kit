import LocalizedTextInput from '@commercetools-uikit/localized-text-input';

export const docToFormValues = (doc, languages) => ({
  name: LocalizedTextInput.createLocalizedString(languages, doc?.name),
})
