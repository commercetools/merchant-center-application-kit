// Source: https://gist.github.com/mathewbyrne/1280286/731b33268f7d8aea972a5aeef2c345496e8e5b18

export default text =>
  text
    .toString()
    .toLowerCase()
    .replace(/(\w)\'/g, '$1') // Special case for apostrophes
    .replace(/[^a-z0-9_\-]+/g, '-') // Replace all non-word chars with -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
