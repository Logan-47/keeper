import { validationResult } from 'express-validator';
import responseWrapper from './responseWrapper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ValidateRequestErrors(): any {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return responseWrapper.errorResponse(res, 400, 'invalid request parameters', {}, errors.array());
    }
    next();
  };
}

export default ValidateRequestErrors;