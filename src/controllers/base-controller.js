import constants from '../constants';
import Errors from '../constants/errors';

class BaseController {
  static getError = (err) => {
    switch (err.message) {
      case Errors.FailedToSignIn:
      case Errors.EmailEmpty:
      case Errors.UserAlreadyExist:
      case Errors.IncompleteInput:
      case Errors.LengthPassword:
      case Errors.InvalidEmail:
      case Errors.PasswordEmpty:
      case Errors.UsernameAlreadyExist:
      case Errors.InvalidCurrency:
      case Errors.InvalidId:
      case Errors.NameEmpty:
      case Errors.NameOnlyLetters:
      case Errors.NameAlreadyExists:
      case Errors.BalanceEmpty:
      case Errors.DestinationWalletEmpty:
      case Errors.FailedToCreateTransaction:
      case Errors.UnableToDeleteWallet:
      case Errors.NotAllowedByCORS:
      case Errors.InvalidTypeTransaction:
        return {
          message: err.message,
        };
      case Errors.DataNotFound:
      case Errors.EmailNotFound:
      case Errors.DestinationWalletNotFound:
      case Errors.TransactionNotFound:
      case Errors.UserNotFound:
      case Errors.WalletNotFound:
        return {
          code: 404,
          message: err.message,
        };
      default:
        return {
          code: 500,
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
