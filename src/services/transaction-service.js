/* eslint-disable no-param-reassign */
import { Op } from 'sequelize';
import {
  Income, Expense, Transfer, Payment,
} from '../constants';
import { Transaction } from '../models';

class TransactionService {
  static getTransactions = async (id, {
    limit,
    page,
    start_date: startDate,
    end_date: endDate,
  }) => {
    const where = {};
    let offset = 0;

    if (!limit) {
      limit = 15;
    }

    if (id) {
      Object.assign(where, {
        [Op.or]: [
          { to_wallet_id: id },
          { wallet_id: id },
        ],
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      });
    }

    if (page) {
      offset = (page - 1) * limit;
    }

    const { count, rows } = await Transaction.findAndCountAll({
      where,
      limit,
      offset,
    });

    rows.forEach((transaction) => {
      if (transaction.dataValues.slug !== Income) {
        transaction.dataValues.amount *= -1;
      }
    });

    return { rows, count };
  };

  static getTransactionByID = async (id) => Transaction.findOne({
    where: {
      id,
    },
  });

  static addTransaction = async ({
    walletId,
    toWalletId,
    slug,
    currency,
    name,
    amount,
  }) => {
    let type;
    if (slug === Payment) {
      type = Expense;
    } else {
      type = slug;
    }

    const transaction = Transaction.create({
      type,
      slug,
      name,
      amount,
      currency,
      wallet_id: walletId,
      to_wallet_id: toWalletId,
    });

    return transaction;
  };

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

  static getTotalTransactionsByType = async (walletID, transactions) => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      const { amount } = transaction.dataValues;
      if (transaction.dataValues.type === Income) {
        income += amount;
      } else if (transaction.dataValues.type === Expense) {
        expense += amount;
      } else if (transaction.dataValues.type === Transfer) {
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
