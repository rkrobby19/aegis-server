import { Income, Transfer } from '../constants';
import rupiah from './formatRupiah';

function createNotificationMessage(slug, amount, sourceWallet, destinationWallet, name) {
  const formatRupiah = rupiah(amount);
  const sourceWalletName = sourceWallet.dataValues.name;

  let message;
  if (slug === Income) {
    message = `You have received ${formatRupiah} from ${name}`;
  } else if (slug === Transfer) {
    const destinationWalletName = destinationWallet.dataValues.name;
    message = `You have transfered ${formatRupiah} from ${sourceWalletName} to ${destinationWalletName} for ${name}`;
  } else {
    message = `You have spent ${formatRupiah} for ${name}`;
  }

  return message;
}

export default createNotificationMessage;
