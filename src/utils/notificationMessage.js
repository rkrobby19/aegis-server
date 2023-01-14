import { Income, Transfer } from '../constants';
import rupiah from './formatRupiah';

function createNotificationMessage(slug, amount, walletID, toWalletID, name) {
  const formatRupiah = rupiah(amount);

  let message;
  if (slug === Income) {
    message = `You have received ${formatRupiah} from ${name}`;
  } else if (slug === Transfer) {
    message = `You have transfered ${formatRupiah} from ${walletID} to ${toWalletID} for ${name}`;
  } else {
    message = `You have spent ${formatRupiah} for ${name}`;
  }

  return message;
}

export default createNotificationMessage;
