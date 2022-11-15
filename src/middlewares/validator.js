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
        body(Request.Email, Errors.InvalidEmail).exists().isEmail(),
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
        body(Request.Balance, Errors.BalanceEmpty).notEmpty(),
      ];
    }

    case Services.DeleteWallet: {
      return [
        param(Request.Id, Errors.DataNotFound).isUUID(),
      ];
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
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validationRules,
  validate,
};
