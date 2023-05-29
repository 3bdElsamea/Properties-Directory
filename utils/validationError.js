class validationError extends Error {
  constructor(errors) {
    super("Invalid Request");
    this.isValidationError = true;
    this.statusCode = 403;
    this.status = 'fail';
    this.errors = errors;
  }
}

export default validationError;
