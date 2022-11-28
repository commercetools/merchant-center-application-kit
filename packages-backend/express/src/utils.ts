const getHeaderByCaseInsensitiveKey = (
  headers: Record<string, string | string[] | undefined>,
  headerKey: string
): string | undefined => {
  const matchingHeader = Object.entries(headers).find(
    ([key]) => headerKey.toLowerCase() === key.toLowerCase()
  );
  if (matchingHeader && matchingHeader.length > 0) {
    const [, headerValue] = matchingHeader;
    return Array.isArray(headerValue) ? headerValue[0] : headerValue;
  }
  return undefined;
};

const getFirstHeaderValueOrThrow = (
  headers: Record<string, string | string[] | undefined>,
  headerKey: string,
  errorMessage: string
): string => {
  const headerValue = getHeaderByCaseInsensitiveKey(headers, headerKey);
  if (!headerValue) {
    throw new Error(errorMessage);
  }
  return headerValue;
};

export { getHeaderByCaseInsensitiveKey, getFirstHeaderValueOrThrow };
