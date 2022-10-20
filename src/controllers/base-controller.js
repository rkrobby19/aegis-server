import ERRORS from '../configs/errors';

class BaseController {
  static getError = (err) => {
    switch (err.message) {
      case ERRORS.USER_EMAIL_EXIST:
        return {
          code: 400,
          message: 'User email is already exist',
        };
      case ERRORS.USER_ID_NOT_EXIST:
        return {
          code: 400,
          message: 'User id is not exist',
        };
      case ERRORS.USERNAME_NOT_EXIST:
        return {
          code: 400,
          message: 'Username is not exist',
        };
      case ERRORS.PASSOWRD_NOT_MATCH:
        return {
          code: 400,
          message: 'Password is wrong',
        };
      case ERRORS.BAD_REQUEST:
        return {
          code: 400,
          message: 'Bad request',
        };
      case ERRORS.NOT_FOUND:
        return {
          code: 400,
          message: 'Not found',
        };
      case ERRORS.NOT_COMPLETED:
        return {
          code: 400,
          message: 'Please fill the form',
        };
      default:
        return {
          code: 500,
          message: 'Internal server error',
        };
    }
  };
}

export default BaseController;
