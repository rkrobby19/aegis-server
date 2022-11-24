class BaseController {
  static getError = (err) => {
    switch (err.message) {
      case err.message:
        return {
          code: 400,
          message: err.message,
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
      code: 200,
      message: 'success',
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
