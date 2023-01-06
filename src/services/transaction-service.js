import { Op } from 'sequelize';
import constants from '../constants';
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

  static getTransactionByWalletID = async (id) => Transaction.findAll({
    where: {
      wallet_id: id,
    },
  });

  static getTotalTransactionsByType = async (walletID, transactions) => {
    let income = 0;
    let expense = 0;
    transactions.forEach((transaction) => {
      const { amount } = transaction.dataValues;
      if (transaction.dataValues.type === constants.Income) {
        income += amount;
      } else if (transaction.dataValues.type === constants.Expense) {
        expense += amount;
      } else if (transaction.dataValues.type === constants.Transfer) {
        if (transaction.dataValues.wallet_id === walletID) {
          expense += amount;
        } else if (transaction.dataValues.to_wallet_id === walletID) {
          income += amount;
        }
      }
    });

    return { income, expense };
  };

  static deleteTransaction = async (transaction) => {
    transaction.destroy();
  };
}

export default TransactionService;
