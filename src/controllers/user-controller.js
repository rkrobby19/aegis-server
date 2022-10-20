import UserService from '../services/user-service';
import BaseController from './base-controller';

class UserController extends BaseController {
  static getUsers = async (req, res) => {
    try {
      const users = await UserService.getUsers();

      return res.status(200).json(users);
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error);
    }
  };
}
export default UserController;
