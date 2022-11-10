import errors from '../constants/errors';
import Jwt from '../utils/jwt';

const AuthMiddleware = (req, res, next) => {
  const { headers: { token = req.cookies.token } } = req;

  const unauthorized = () => res.status(401).json({ message: errors.Unauthorized });

  if (!token) return unauthorized();

  try {
    req.decoded = Jwt.verify(token);

    return next();
  } catch (err) {
    return unauthorized();
  }
};

export default AuthMiddleware;
