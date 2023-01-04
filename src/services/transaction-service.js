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

  static getTransactionByID = async (id) => Transaction.findOne({
    where: {
      id,
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

  static updateTransaction = async (id, {
    walletId,
    toWalletId,
    note,
    amount,
    currency,
    type,
  }) => Transaction.update(
    {
      wallet_id: walletId,
      to_wallet_id: toWalletId,
      note,
      amount,
      currency,
      type,
    },
    {
      where: { id },
    },
  );

  static getTransactionsByType = async (typeTransaction, id) => Transaction.findAll({
    where: {
      type: typeTransaction,
      [Op.and]: { wallet_id: id },
    },
  });

  static getTotalAmountOfTransactions = async (transactions) => {
    let total = 0;
    transactions.forEach((element) => {
      total += element.dataValues.amount;
    });

    return total;
  };

  static deleteTransaction = async (transaction) => {
    transaction.destroy();
  };
}

export default TransactionService;
