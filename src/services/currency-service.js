import axios from 'axios';
import { Currency } from '../models';
import { baseURLExchangeRates } from '../configs';

class CurrencyService {
  static getCurrencyByID = async (id) => Currency.findOne({
    where: {
      id,
    },
  });

  static getCodeFromCurrencyByID = async (id) => {
    const codeCurrency = await Currency.findOne({
      where: {
        id,
      },
    });

    return codeCurrency.dataValues.code;
  };

  static exchangeRates = async (baseCodeCurrency, conversionCodeCurrency) => {
    const response = await axios(`${baseURLExchangeRates}/${baseCodeCurrency}`);
    const conversionRate = response.data.conversion_rates[conversionCodeCurrency];

    return conversionRate;
  };
}

export default CurrencyService;
