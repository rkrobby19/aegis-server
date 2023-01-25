/* eslint-disable implicit-arrow-linebreak */
import jwt from 'jsonwebtoken';

class Jwt {
  static OPTIONS = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  static REFRESH_OPTIONS = {
    expiresIn: 60,
    algorithm: 'HS256',
  };

  static sign = (payload) =>
    jwt.sign(payload, process.env.SECRET, this.OPTIONS);

  static signRefreshToken = (payload) =>
    jwt.sign(payload, process.env.REFRESH_SECRET, this.REFRESH_OPTIONS);

  static verify = (token) =>
    jwt.verify(token, process.env.SECRET, this.OPTIONS);
}

export default Jwt;
