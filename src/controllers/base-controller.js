import errors from '../constants/errors';

class BaseController {
  static getError = (err) => {
    switch (err.message) {
      case errors.UserAlreadyExist:
        return {
          code: 400,
          message: 'User is already exist',
        };
      case errors.IncompleteInput:
        return {
          code: 400,
          message: 'Please fill in all fields.',
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
