import { body, param, validationResult } from 'express-validator';
import Services from '../constants/services';
import Errors from '../constants/errors';
import Request from '../constants/requests';

const validationRules = (service) => {
  switch (service) {
    case Services.RegisterUser: {
      return [
        body(Request.Username, Errors.UsernameEmpty).exists().notEmpty(),
        body(Request.Email, Errors.EmailEmpty).exists().notEmpty(),
        body(Request.Email, Errors.InvalidEmail).isEmail(),
        body(Request.Password, Errors.PasswordEmpty).exists(),
        body(Request.Password, Errors.LengthPassword).isLength({ min: 8 }),
      ];
    }

    case Services.Login: {
      return [
        body(Request.Username, Errors.UsernameEmpty).exists().notEmpty(),
        body(Request.Password, Errors.PasswordEmpty).exists().notEmpty(),
      ];
    }

    case Services.AddWallet: {
      return [
        body(Request.Name, Errors.NameEmpty).exists().notEmpty(),
        body(Request.Currency, Errors.InvalidCurrency).isIn('IDR'),
      ];
    }

    case Services.DeleteWallet: {
      return [param(Request.Id, Errors.WalletNotFound).isUUID()];
    }

    case Services.AddTransaction: {
      return [body(Request.TypeTransaction, Errors.InvalidTypeTransaction).isIn('expense', 'income', 'transfer')];
    }

    default: {
      return null;
    }
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ code: 400, message: err.msg }));

  return res.status(400).send(
    extractedErrors[0],
  );
};

module.exports = {
  validationRules,
  validate,
};
