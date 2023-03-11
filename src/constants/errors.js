const Errors = {
  BadRequest: 'Bad request',
  DataNotFound: 'Data not found',
  FailedToSignIn: 'Username or password is incorrect',
  IncompleteInput: 'Please fill in all fields',
  InternalServerError: 'Internal server error',
  NotAllowedByCORS: 'Not allowed by CORS',
  Unauthorized: 'Unauthorized',

  EmailEmpty: 'Email cannot be empty',
  EmailNotFound: 'Email not found',
  LengthPassword: 'Password must have at least 8 characters',
  InvalidEmail: 'Invalid email',
  PasswordEmpty: 'Password cannot be empty',
  UserAlreadyExist: 'User already exist',
  UsernameAlreadyExist: 'Username already exist',
  UserNotFound: 'User not found',
  UsernameEmpty: 'Username cannot be empty',
  FailedToRegister: 'Failed to register user',

  InvalidCurrency: 'Currency must be IDR',
  InvalidId: 'Invalid ID',
  NameEmpty: 'Name cannot be empty',
  NameOnlyLetters: 'Name contains only letters',
  NameAlreadyExists: 'Name already exists',
  BalanceEmpty: 'Balance cannot be empty',
  WalletNotFound: 'Wallet not found',
  DestinationWalletEmpty: 'Destination transfer cannot be empty',
  DestinationWalletNotFound: 'Destination transfer not found',
  UnableToDeleteWallet: 'Unable to delete a wallet',
  FailedToCreateWallet: 'Failed to create a wallet',

  InvalidTypeTransaction:
    'Transaction must be either both expense, payment, income, and transfer',
  FailedToCreateTransaction: 'Failed to create a transaction',
  TransactionNotFound: 'Transaction not found',
  NameTransactionEmpty: 'Name of transaction cannot be empty',

  FailedToCreateCashFlow: 'Failed to create a cash flow',

  NoTokenProvided: 'No token provided',
  TokenVersionNotValid: 'Token version not valid',
  NotJwtToken: 'Token is not JsonWebToken string',
};

export default Errors;
