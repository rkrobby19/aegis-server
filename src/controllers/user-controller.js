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

      const payload = {
        username,
        email,
        token_version: 0,
      };

      const refresh_token = Jwt.signRefreshToken(payload);

      user = await UserService.registerUser({
        username,
        email,
        password,
        refresh_token,
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

      // ! Refresh token check

      let { refresh_token } = user.dataValues;

      const verify = Jwt.verifyRefreshToken(refresh_token);

      // * Token doesnt exist & token exp or error

      if (!refresh_token || verify.status === 'error') {
        const payload = {
          username: user.dataValues.username,
          email: user.dataValues.email,
          token_version: user.dataValues.token_version,
        };

        const newToken = Jwt.signRefreshToken(payload);

        await UserService.updateToken(username, newToken);

        refresh_token = newToken;
      }

      const access_token = await UserService.loginUser({
        user,
        password,
      });

      const wallets = await WalletService.getWallets(user.dataValues.id);

      return res
        .cookie('refresh_token', refresh_token, {
          maxAges: 1000 * 60 * 60 * 24 * 7,
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
      const token = req.cookies.refresh_token;
      const decode = Jwt.decodeToken(token);
      const { username } = decode;

      // * Find user data
      const user = await UserService.getUserByUsername({ username });

      // ! Comparing token_version

      // * Generate new access token
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const access_token = Jwt.sign(payload);

      return res.send({
        access_token,
      });
    } catch (error) {
      return res.status(error.code).send({ message: error.message });
    }
  };
}

export default UserController;
