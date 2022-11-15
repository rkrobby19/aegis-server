import Errors from '../constants/errors';
import { Wallet } from '../models';

class WalletService {
  static getWallets = async (id) => Wallet.findAll({
    where: {
      user_id: id,
    },
  });

  static addWallet = async ({
    name,
    balance,
    currency,
    userId,
  }) => {
    const wallet = await Wallet.create({
      name,
      balance,
      currency,
      user_id: userId,
      created_at: Date.now(),
    });

    return wallet;
  };

  static updateWalletBalance = async ({
    walletId, toWalletId, amount, type,
  }) => {
    let balanceUpdate;
    if (type === 'expense') {
      balanceUpdate = await Wallet.decrement({ balance: amount }, { where: { id: walletId } });
    } else if (type === 'income') {
      balanceUpdate = await Wallet.increment({ balance: amount }, { where: { id: walletId } });
    } else if (type === 'transfer') {
      balanceUpdate = await Wallet.increment({ balance: amount }, { where: { id: toWalletId } });
      balanceUpdate = await Wallet.decrement({ balance: amount }, { where: { id: walletId } });
    }

    return balanceUpdate;
  };

  static deleteWallet = async (id) => {
    const wallet = await Wallet.findOne({
      where: { id },
    });

    if (!wallet) {
      throw new Error(Errors.DataNotFound);
    }

    return wallet.destroy();
  };
}

export default WalletService;
