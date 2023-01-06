import { CashFlow } from '../models';

class CashFlowService {
  static addCashFlow = async () => CashFlow.create({
    income: 0,
    expense: 0,
  });

  static getCashFlowByID = async (id) => {
    await CashFlow.findOne({
      where: {
        id,
      },
    });
  };

  static updateCashFlow = async (id, income, expense) => {
    await CashFlow.update(
      {
        income,
        expense,
      },
      {
        where: {
          id,
        },
      },
    );
  };
}

export default CashFlowService;
