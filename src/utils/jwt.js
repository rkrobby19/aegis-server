import jwt from 'jsonwebtoken';

class Jwt {
  static OPTIONS = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  static sign = (payload) => jwt.sign(payload, process.env.SECRET, this.OPTIONS);

  static verify = (token) => jwt.verify(token, process.env.SECRET, this.OPTIONS);
}

export default Jwt;
