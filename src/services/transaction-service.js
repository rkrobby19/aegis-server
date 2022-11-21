import { Op } from 'sequelize';
import { Transaction } from '../models';

class TransactionService {
  static getTransactions = async (id) => Transaction.findAll({
    where: {
      [Op.or]: [
        { to_wallet_id: id },
        { wallet_id: id },
      ],
    },
  });

  static addTransaction = async ({
    walletId,
    toWalletId,
    currency,
    type,
    note,
    amount,
  }) => Transaction.create({
    type,
    note,
    amount,
    currency,
    wallet_id: walletId,
    to_wallet_id: toWalletId,
  });
}

export default TransactionService;
