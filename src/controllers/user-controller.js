import cookie from 'cookie';
import Errors from '../constants/errors';
import UserService from '../services/user-service';
import BaseController from './base-controller';

class UserController extends BaseController {
  static getUsers = async (req, res) => {
    try {
      const users = await UserService.getUsers();

      return res.send(this.reponseSuccess(users));
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
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

      return res.send(this.reponseSuccess(user));
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };

  static login = async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await UserService.getUserByUsername({ username });

      const token = await UserService.loginUser({
        user,
        password,
      });

      const setCookie = cookie.serialize('token', token);

      res.setHeader('Set-Cookie', setCookie, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });

      return res.send(this.reponseSuccess());
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };

  static logout = async (req, res) => {
    try {
      const setCookie = cookie.serialize('token', null);

      res.setHeader('Set-Cookie', setCookie, {
        httpOnly: true,
        maxAge: -1,
      });

      return res.send(this.reponseSuccess());
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).send(error);
    }
  };
}

export default UserController;
