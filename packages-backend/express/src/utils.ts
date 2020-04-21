const getFirstOrThrow = (
  value: string | string[] | undefined,
  errorMessage: string
) => {
  if (!value) {
    throw new Error(errorMessage);
  }
  return Array.isArray(value) ? value[0] : value;
};

export { getFirstOrThrow };
