import constants from '../constants';
import Errors from '../constants/errors';
import UserService from '../services/user-service';
import WalletService from '../services/wallet-service';
import BaseController from './base-controller';

class UserController extends BaseController {
  static getUsers = async (req, res) => {
    try {
      const users = await UserService.getUsers();

      return res.send({
        users,
      });
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send({ message: error.message });
    }
  };

  static registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const getUser = await UserService.getUserByUsernameOrEmail({
        username,
        email,
      });

      if (getUser) {
        throw new Error(Errors.UserAlreadyExist);
      }

      const user = await UserService.registerUser({
        username,
        email,
        password,
      });

      await WalletService.addWallet({
        name: constants.DummyNameWallet,
        userId: user.dataValues.id,
      });

      return res.send(this.reponseSuccess());
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send({ message: error.message });
    }
  };

  static login = async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await UserService.getUserByUsername({ username });

      if (!user) {
        throw new Error(Errors.FailedToSignIn);
      }

      const token = await UserService.loginUser({
        user,
        password,
      });

      const wallet = await WalletService.getWallets(user.dataValues.id);

      return res.send({
        message: constants.Success,
        wallet,
        token,
      });
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send({ message: error.message });
    }
  };
}

export default UserController;
