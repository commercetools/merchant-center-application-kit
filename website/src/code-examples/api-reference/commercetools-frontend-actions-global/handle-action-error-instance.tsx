class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}
const error = new CustomError('error');
dispatch(handleActionError(error)); // dispatch method from Redux store
