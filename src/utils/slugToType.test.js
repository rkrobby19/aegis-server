import slugToType from './slugToType';

describe('transform slug to type', () => {
  it('should return expense when slug is expense', () => {
    const result = slugToType('expense');

    expect(result).toBe('expense');
  });

  it('should return income when slug is income', () => {
    const result = slugToType('income');

    expect(result).toBe('income');
  });

  it('should return transfer when slug is transfer', () => {
    const result = slugToType('transfer');

    expect(result).toBe('transfer');
  });

  it('should return expense when slug is payment', () => {
    const result = slugToType('payment');

    expect(result).toBe('expense');
  });
});
