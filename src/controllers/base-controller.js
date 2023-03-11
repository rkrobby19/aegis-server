import constants from '../constants';
import Errors from '../constants/errors';

class BaseController {
  static getError = (err) => {
    switch (err.message) {
      case Errors.FailedToSignIn:
      case Errors.EmailEmpty:
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
      case Errors.FailedToRegister:
      case Errors.FailedToCreateCashFlow:
      case Errors.FailedToCreateWallet:
      case Errors.UserAlreadyExist:
      case Errors.UnableToDeleteWallet:
      case Errors.NotAllowedByCORS:
      case Errors.InvalidTypeTransaction:
      case Errors.MissingSecretKey:
        return this.reponseFail(err.message, 400);

      case Errors.DataNotFound:
      case Errors.EmailNotFound:
      case Errors.DestinationWalletNotFound:
      case Errors.TransactionNotFound:
      case Errors.UserNotFound:
      case Errors.WalletNotFound:
        return this.reponseFail(err.message, 404);

      default:
        return this.reponseFail(Errors.InternalServerError);
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

  static reponseFail = (message, code) => {
    const response = {
      message: '',
      code: 500,
    };

    if (message !== null) {
      response.message = message;
    }

    if (code !== null) {
      response.code = code;
    }

    return response;
  };
}

export default BaseController;
