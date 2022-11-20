import { Op } from 'sequelize';
import { Wallet, Currency } from '../models';

class WalletService {
  static getWallets = async (id) => Wallet.findAll({
    where: {
      user_id: id,
    },
    include: [{
      model: Currency,
      as: 'currencies',
      attributes: ['code'],
    }],
  });

  static getWalletByID = async (userId, id) => Wallet.findOne({
    where: {
      user_id: userId,
      [Op.and]: { id },
    },
    include: [{
      model: Currency,
      as: 'currencies',
      attributes: ['code'],
    }],
  });

  static addWallet = async ({
    name,
    balance,
    currencyId,
    userId,
  }) => {
    Wallet.create({
      name,
      balance,
      currency_id: currencyId,
      user_id: userId,
      created_at: Date.now(),
    });
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

  static deleteWallet = async (wallet) => {
    wallet.destroy();
  };
}

export default WalletService;
