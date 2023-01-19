import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import constants from '../constants';
import Errors from '../constants/errors';
import CashFlowService from '../services/cash-flow-service';
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

      let user = await UserService.getUserByUsernameOrEmail({
        username,
        email,
      });
      if (user) {
        throw new Error(Errors.UserAlreadyExist);
      }

      user = await UserService.registerUser({
        username,
        email,
        password,
      });
      if (!user) {
        throw new Error(Errors.FailedToRegister);
      }

      const cashFlow = await CashFlowService.addCashFlow();
      if (!cashFlow) {
        throw new Error(Errors.FailedToCreateCashFlow);
      }

      const wallet = await WalletService.addWallet({
        name: constants.DummyNameWallet,
        userID: user.dataValues.id,
        cashFlowID: cashFlow.dataValues.id,
      });
      if (!wallet) {
        throw new Error(Errors.FailedToCreateWallet);
      }

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

      const access_token = await UserService.loginUser({
        user,
        password,
      });

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const refresh_token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256',
      });

      const wallets = await WalletService.getWallets(user.dataValues.id);

      return res
        .cookie('refresh', refresh_token, {
          maxAges: 1000 * 60 * 60 * 24,
          httpOnly: true,
        })
        .send({
          message: constants.Success,
          wallet: wallets[0],
          access_token,
        });
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send({ message: error.message });
    }
  };

  static refreshToken = async (req, res) => {
    try {
      const token = req.cookies.refresh;
      const decode = jwt_decode(token);
      const { username } = decode;

      // * Find user data
      const user = await UserService.getUserByUsername({ username });

      // ! Comparing token_version

      // * Generate new token
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const access_token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1h',
        algorithm: 'HS256',
      });

      const refresh_token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1d',
        algorithm: 'HS256',
      });

      return res
        .cookie('refresh', refresh_token, {
          maxAges: 1000 * 60 * 60 * 24,
          httpOnly: true,
        })
        .send({
          access_token,
        });
    } catch (error) {
      return res.send(error.message);
    }
  };
}

export default UserController;
