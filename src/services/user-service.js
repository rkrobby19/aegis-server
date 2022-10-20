// eslint-disable-next-line import/named
import { User } from '../models';

class UserService {
  static getUsers = () => User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
}

export default UserService;
