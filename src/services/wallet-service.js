import { Op } from 'sequelize';
import { Income, Expense, Transfer } from '../constants';
import { Wallet, CashFlow } from '../models';
import slugToType from '../utils/slugToType';

class WalletService {
  static getWallets = async (id) => Wallet.findAll({
    where: {
      user_id: id,
    },
    attributes: { exclude: ['cash_flow_id', 'user_id'] },
  });

  static getWalletByID = async (userId, id) => Wallet.findOne({
    where: {
      user_id: userId,
      [Op.and]: { id },
    },
    attributes: { exclude: ['user_id'] },
    include: [
      {
        model: CashFlow,
        as: 'total',
        attributes: ['income', 'expense'],
      },
    ],
  });

  static getOtherWallets = async (
    userId,
    walletId,
  ) => Wallet.findAll({
    where: {
      user_id: userId,
      id: {
        [Op.not]: walletId,
      },
    },
    attributes: { exclude: ['user_id', 'balance', 'currency', 'created_at'] },
  });

  static addWallet = async ({
    name,
    balance,
    currency,
    userID,
    cashFlowID,
  }) => Wallet.create({
    name,
    balance,
    currency,
    user_id: userID,
    cash_flow_id: cashFlowID,
  });

  static updateWalletBalance = async ({
    walletID, toWalletID, amount, slug,
  }) => {
    const type = slugToType(slug);

    let balanceUpdate;
    if (type === Expense) {
      balanceUpdate = await Wallet.decrement({ balance: amount }, { where: { id: walletID } });
    } else if (type === Income) {
      balanceUpdate = await Wallet.increment({ balance: amount }, { where: { id: walletID } });
    } else if (type === Transfer) {
      balanceUpdate = await Wallet.increment({ balance: amount }, { where: { id: toWalletID } });
      balanceUpdate = await Wallet.decrement({ balance: amount }, { where: { id: walletID } });
    }

    return balanceUpdate;
  };

  static revertWalletBalance = async ({
    walletId, toWalletId, amount, type,
  }) => {
    let balanceUpdate;
    if (type === Expense) {
      balanceUpdate = await Wallet.increment({ balance: amount }, { where: { id: walletId } });
    } else if (type === Income) {
      balanceUpdate = await Wallet.decrement({ balance: amount }, { where: { id: walletId } });
    } else if (type === Transfer) {
      balanceUpdate = await Wallet.decrement({ balance: amount }, { where: { id: toWalletId } });
      balanceUpdate = await Wallet.increment({ balance: amount }, { where: { id: walletId } });
    }

    return balanceUpdate;
  };

  static deleteWallet = async (wallet) => {
    wallet.destroy();
  };

  static updateWallet = async (id, {
    name,
    status,
    balance,
    currency,
  }) => Wallet.update(
    {
      name,
      status,
      balance,
      currency,
    },
    {
      where: { id },
    },
  );

  static updateCashFlowWallet = async (
    id,
    cashFlowID,
  ) => {
    const wallet = Wallet.update(
      {
        cash_flow_id: cashFlowID,
      },
      {
        where: { id },
      },
    );

    return wallet;
  };
}

export default WalletService;
