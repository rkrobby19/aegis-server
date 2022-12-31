import constants from '../constants';
import Errors from '../constants/errors';

class BaseController {
  static getError = (err) => {
    switch (err.message) {
      case err.message:
        return {
          message: err.message,
        };
      default:
        return {
          message: Errors.InternalServerError,
        };
    }
  };

  static reponseSuccess = (message = null) => {
    const response = {
      message: constants.Success,
    };

    if (message !== null) {
      response.message = message;
    }

    return response;
  };
}

export default BaseController;
