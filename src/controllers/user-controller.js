import cookie from 'cookie';
import UserService from '../services/user-service';
import BaseController from './base-controller';

class UserController extends BaseController {
  static getUsers = async (req, res) => {
    try {
      const users = await UserService.getUsers();

      return res.send(this.reponseSuccess(users));
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error);
    }
  };

  static registerUser = async (req, res) => {
    try {
      const {
        username, email, password,
      } = req.body;

      const user = await UserService.registerUser({
        username,
        email,
        password,
      });

      return res.send(this.reponseSuccess(user));
    } catch (err) {
      const error = this.getError(err);
      return res.status(error.code).json({
        error_message: error.message,
      });
    }
  };

  static login = async (req, res) => {
    try {
      const { username, password } = req.body;

      const token = await UserService.loginUser({
        username,
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
      return res.status(error.code).json({
        error_message: error.message,
      });
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
      console.log(err);
      return null;
    }
  };
}

export default UserController;
