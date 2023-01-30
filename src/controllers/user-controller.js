import constants from '../constants';
import Errors from '../constants/errors';
import CashFlowService from '../services/cash-flow-service';
import UserService from '../services/user-service';
import WalletService from '../services/wallet-service';
import Jwt from '../utils/jwt';
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

      const refresh_token = await UserService.generateRefreshToken(user);

      await UserService.updateToken(username, refresh_token);

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

      let { refresh_token } = user.dataValues;

      const verify = Jwt.verifyRefreshToken(refresh_token);

      if (
        !refresh_token
        || !verify.username
        || verify.token_version !== user.dataValues.token_version
      ) {
        const newToken = await UserService.generateRefreshToken(user);

        await UserService.updateToken(username, newToken);

        refresh_token = newToken;
      }

      const wallets = await WalletService.getWallets(user.dataValues.id);

      return res
        .cookie('refresh_token', refresh_token, {
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
      const { username, token_version } = req.decoded;

      const user = await UserService.getUserByUsername({ username });

      if (token_version !== user.token_version) {
        return res
          .status(401)
          .send({ status: 'error', message: 'Token version not valid' });
      }

      const access_token = await UserService.generateAccessToken(user);

      return res.send({
        access_token,
      });
    } catch (error) {
      return res.status(error.code).send({ message: error.message });
    }
  };

  static logout = async (req, res) => {
    try {
      const { username, token_version } = req.decoded;

      const newVersion = token_version + 1;

      await UserService.updateTokenVersion(username, newVersion);

      res
        .cookie('refresh_token', '', {
          maxAge: 0,
          overwrite: true,
        })
        .clearCookie('refresh_token')
        .send({
          status: 'success',
          message: 'User Logout',
        });
    } catch (error) {
      res.send(error.message);
    }
  };
}

export default UserController;
