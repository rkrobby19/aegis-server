import Errors from '../constants/errors';
import CurrencyService from '../services/currency-service';
import WalletService from '../services/wallet-service';
import BaseController from './base-controller';

class WalletController extends BaseController {
  static getWallets = async (req, res) => {
    try {
      const owner = req.decoded.id;

      const wallets = await WalletService.getWallets(owner);

      return res.send(this.reponseSuccess(wallets));
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };

  static getWalletByID = async (req, res) => {
    try {
      const userId = req.decoded.id;
      const { id } = req.params;

      const wallet = await WalletService.getWalletByID(userId, id);

      if (!wallet) {
        throw new Error(Errors.DataNotFound);
      }

      return res.send(this.reponseSuccess(wallet));
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };

  static addWallet = async (req, res) => {
    try {
      const { name, balance, currency_id: currencyId } = req.body;
      const { id: userId } = req.decoded;

      const currency = await CurrencyService.getCurrencyByID(currencyId);
      console.log(currency);

      if (!currency) {
        throw new Error(Errors.DataNotFound);
      }

      const wallet = await WalletService.addWallet({
        name,
        balance,
        currencyId,
        userId,
      });

      return res.send(this.reponseSuccess(wallet));
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };

  static deleteWallet = async (req, res) => {
    try {
      const userId = req.decoded.id;
      const { id } = req.params;

      const wallet = await WalletService.getWalletByID(userId, id);
      await WalletService.deleteWallet(wallet);

      return res.send(this.reponseSuccess());
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };
}

export default WalletController;
