function rupiah(number) {
  const format = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    maximumSignificantDigits: 2,
    currency: 'IDR',
  }).format(number);

  return format;
}

export default rupiah;
