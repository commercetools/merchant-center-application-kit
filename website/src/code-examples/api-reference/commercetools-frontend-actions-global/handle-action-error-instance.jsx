class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}
const error = new CustomError('error');
dispatch(handleActionError(error)); // dispatch method from Redux store
