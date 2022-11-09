import errors from '../constants/errors';

class BaseController {
  static getError = (err) => {
    switch (err.message) {
      case errors.UserAlreadyExist:
        return {
          code: 400,
          message: errors.UserAlreadyExist,
        };
      case errors.IncompleteInput:
        return {
          code: 400,
          message: errors.IncompleteInput,
        };
      case errors.NameAlreadyExists:
        return {
          code: 400,
          message: errors.NameAlreadyExists,
        };
      case errors.InvalidCurrency:
        return {
          code: 400,
          message: errors.InvalidCurrency,
        };
      case errors.DataNotFound:
        return {
          code: 400,
          message: errors.DataNotFound,
        };
      default:
        return {
          code: 500,
          message: 'Internal server error',
        };
    }
  };

  static reponseSuccess = (data = null, message = null) => {
    const response = {
      status: 'success',
      code: 200,
    };

    if (data !== null) {
      response.data = data;
    }

    if (message !== null) {
      response.message = message;
    }

    return response;
  };
}

export default BaseController;
