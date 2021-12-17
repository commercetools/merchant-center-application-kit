import upperFirst from 'lodash/upperFirst';

// The function converts the entryPointUriPath to resourceAccessKey by
// removing special characters except underscore.
// It makes the first character of the string and the next character after a special character an uppercase.
// It replaces hyphen(-) with a forward slash(/) if the hyphen(-) is followed by a number.
// Examples:
// input: foo-bar result: FooBar
// input: foo_bar result: Foo_Bar
// input: foo-1bar result: Foo/1bar
const formatEntryPointUriPathToResourceAccessKey = (
  entryPointUriPath: string
) => {
  return (
    entryPointUriPath
      //Splits the string by underscore.
      .split('_')
      // Uppercase the first character of each word split.
      .map((word) => upperFirst(word))
      // Join the words by an underscore.
      .join('_')
      // Each word is split by a hyphen.
      .split('-')
      .map((word, i) => {
        // Regex below checking if the character is numeric.
        // If the word after the hyphen is numeric, replace the hyphen with a forward slash.
        // If not, omit the hyphen and uppercase the first character
        if (i > 0 && /^-?\d+$/.test(word[0])) {
          return '/' + word;
        }
        return upperFirst(word);
      })
      .join('')
  );
};

export const entryPointUriPathToResourceAccesses = (
  entryPointUriPath: string
) => {
  const convertedEntryPointUriPath =
    formatEntryPointUriPathToResourceAccessKey(entryPointUriPath);
  return {
    view: `view${convertedEntryPointUriPath}`,
    manage: `manage${convertedEntryPointUriPath}`,
  };
};

export const entryPointUriPathToPermissionKeys = (
  entryPointUriPath: string
) => {
  const resourceAccesses =
    entryPointUriPathToResourceAccesses(entryPointUriPath);
  return {
    View: upperFirst(resourceAccesses.view),
    Manage: upperFirst(resourceAccesses.manage),
  };
};
