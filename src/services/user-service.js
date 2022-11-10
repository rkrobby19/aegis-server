import { compareSync, hashSync } from 'bcrypt';
import { or } from 'sequelize';
import errors from '../constants/errors';
import { User } from '../models';
import Jwt from '../utils/jwt';

class UserService {
  static getUsers = () => User.findAll();

  static registerUser = async ({
    username,
    email,
    password,
  }) => {
    const oldUser = await User.findOne({
      where: or({ email }, { username }),
    });

    if (oldUser) {
      throw new Error(errors.UserAlreadyExist);
    }

    const user = await User.create({
      username,
      email,
      password: hashSync(password, 10),
      created_at: Date.now(),
    });

    return user;
  };

  static loginUser = async ({
    username,
    password,
  }) => {
    const user = await User.findOne({
      where: {
        username,
      },
    });

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
