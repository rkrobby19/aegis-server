const Errors = {
  BadRequest: 'Bad request',
  Unauthorized: 'Unauthorized',
  FailedToSignIn: 'Username or password is incorrect.',
  IncompleteInput: 'Please fill in all fields.',

  DataNotFound: 'Data not found.',
  EmailEmpty: 'Email cannot be empty.',
  EmailNotFound: 'Email not found.',
  LengthPassword: 'Password must have at least 8 characters',
  InvalidEmail: 'Invalid email',
  PasswordEmpty: 'Password cannot be empty.',
  UserAlreadyExist: 'User already exist.',
  UsernameAlreadyExist: 'Username already exist.',
  UsernameNotFound: 'Username not found.',
  UsernameEmpty: 'Username cannot be empty.',

  InvalidCurrency: 'Currency must be either both IDR and USD.',
  InvalidId: 'Invalid ID.',
  NameEmpty: 'Name cannot be empty.',
  NameOnlyLetters: 'Name contains only letters.',
  NameAlreadyExists: 'Name already exists.',
  BalanceEmpty: 'Balance cannot be empty.',
};

export default Errors;
