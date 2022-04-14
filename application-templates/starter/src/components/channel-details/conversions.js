import LocalizedTextInput from '@commercetools-uikit/localized-text-input';

export const docToFormValues = (channel, languages) => ({
  ...channel,
  name: LocalizedTextInput.createLocalizedString(languages, channel.name),
});

export const formValuesToDoc = (formValues) => ({
  ...formValues,
  name: LocalizedTextInput.isEmpty(formValues.name)
    ? undefined
    : LocalizedTextInput.omitEmptyTranslations(formValues.name),
});
