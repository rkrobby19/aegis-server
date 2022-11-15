import AccountService from '../services/account-service';
import BaseController from './base-controller';

class AccountController extends BaseController {
  static getAccounts = async (req, res) => {
    try {
      const owner = req.decoded.id;

      const accounts = await AccountService.getAccounts(owner);

      return res.send(this.reponseSuccess(accounts));
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };

  static addAccount = async (req, res) => {
    try {
      const { name, balance, currency } = req.body;
      const { id: userId } = req.decoded;

      const account = await AccountService.addAccount({
        name,
        balance,
        currency,
        userId,
      });

      return res.send(this.reponseSuccess(account));
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };

  static deleteAccount = async (req, res) => {
    try {
      const { id } = req.params;
      await AccountService.deleteAccount(id);

      return res.send(this.reponseSuccess());
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };
}
export default AccountController;
