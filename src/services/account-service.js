import Errors from '../constants/errors';
import { Account } from '../models';

class AccountService {
  static getAccounts = async (id) => Account.findAll({
    where: {
      user_id: id,
    },
  });

  static addAccount = async ({
    name,
    balance,
    currency,
    userId,
  }) => {
    const [account, success] = await Account.findOrCreate({
      where: { name },
      defaults: {
        name,
        balance,
        currency,
        user_id: userId,
        created_at: Date.now(),
      },
    });

    if (!success) throw new Error(Errors.NameAlreadyExists);
    return account;
  };

  static updateAccountBalance = async ({
    accountId, fromAccountId, toAccountId, amount, type,
  }) => {
    let balanceUpdate;
    if (type === 'Expense') {
      balanceUpdate = await Account.decrement({ balance: amount }, { where: { id: accountId } });
    } else if (type === 'Income') {
      balanceUpdate = await Account.increment({ balance: amount }, { where: { id: accountId } });
    } else if (type === 'Transfer') {
      balanceUpdate = await Account.increment({ balance: amount }, { where: { id: toAccountId } });
      balanceUpdate = await Account.decrement(
        { balance: amount },
        { where: { id: fromAccountId } },
      );
    }

    return balanceUpdate;
  };

  static deleteAccount = async (id) => {
    const account = await Account.findOne({
      where: { id },
    });

    if (!account) {
      throw new Error(Errors.DataNotFound);
    }

    return account.destroy();
  };
}

export default AccountService;
