import flatMap from 'lodash.flatmap';

// copied from @commercetools-local/utils/query-string
export const sanitize = param => {
  if (typeof param === 'string')
    return (
      param
        // Replace all \ with \\ (to prevent generate escape characters)
        .replace(/\\/g, '\\\\')
        // Replace all " with \"
        .replace(/"/g, '\\"')
    );

  return param;
};

export const flattenResults = results =>
  flatMap(results, result =>
    result.subCommands
      ? [result, ...flattenResults(result.subCommands)]
      : result
  );

// Once ui-kit exposes its fallback mechanism, we can use the same one here
export const translate = (nameAllLocales, projectDataLocale) => {
  const matchedTranslation = nameAllLocales.find(
    translation => translation.locale === projectDataLocale && translation.value
  );
  if (matchedTranslation) return matchedTranslation.value;

  const fallback = nameAllLocales.find(translation => translation.value);
  return fallback.value;
};
