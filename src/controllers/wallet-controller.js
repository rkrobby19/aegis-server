import Errors from '../constants/errors';
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
        throw new Error(Errors.WalletNotFound);
      }

      return res.send(this.reponseSuccess(wallet));
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };

  static addWallet = async (req, res) => {
    try {
      const { name, balance, currency } = req.body;
      const { id: userId } = req.decoded;

      const wallet = await WalletService.addWallet({
        name,
        balance,
        currency,
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
      if (!wallet) {
        throw new Error(Errors.WalletNotFound);
      }

      const wallets = await WalletService.getWallets(userId);
      if (wallets.length <= 1) {
        throw new Error(Errors.UnableToDeleteWallet);
      }

      await WalletService.deleteWallet(wallet);

      return res.send(this.reponseSuccess());
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };

  static updateWallet = async (req, res) => {
    try {
      const { name, balance, currency } = req.body;
      const { id } = req.params;
      const userId = req.decoded.id;

      const currentWallet = await WalletService.getWalletByID(userId, id);
      if (!currentWallet) {
        throw new Error(Errors.WalletNotFound);
      }

      await WalletService.updateWallet(id, {
        name,
        balance,
        currency,
      });

      return res.send(this.reponseSuccess());
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };
}

export default WalletController;
