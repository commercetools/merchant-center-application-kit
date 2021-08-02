class MissingOrInvalidConfigError extends Error {
  constructor(message: string) {
    super(message);

    Object.defineProperty(this, 'name', {
      value: 'MissingOrInvalidConfigError',
    });
  }
}

export { MissingOrInvalidConfigError };
