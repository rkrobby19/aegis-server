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
      const { id } = req.params;
      await WalletService.deleteWallet(id);

      return res.send(this.reponseSuccess());
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };
}

export default WalletController;
