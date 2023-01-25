import { compareSync, hashSync } from 'bcrypt';
import { or } from 'sequelize';
import errors from '../constants/errors';
import { User } from '../models';
import Jwt from '../utils/jwt';

class UserService {
  static getUsers = () => User.findAll();

  static getUserByUsernameOrEmail = async ({ username, email }) => {
    const user = await User.findOne({
      where: or({ username }, { email }),
    });

    return user;
  };

  static getUserByUsername = async ({ username }) => {
    const user = await User.findOne({
      where: { username },
    });

    return user;
  };

  static registerUser = async ({
    username, email, password, refresh_token,
  }) => User.create({
    username,
    email,
    password: hashSync(password, 10),
    refresh_token,
  });

  static loginUser = async ({ user, password }) => {
    if (!user || !compareSync(password, user.password)) {
      throw new Error(errors.FailedToSignIn);
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = Jwt.sign(payload);

    return token;
  };
}

export default UserService;
