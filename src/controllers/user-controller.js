import UserService from '../services/user-service';
import BaseController from './base-controller';

const jwt = require('jsonwebtoken');
const { hashSync, compareSync } = require('bcrypt');
const { User } = require('../models');

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

  static registerUser = async (req, res) => {
    try {
      const {
        username, fullname, email, password,
      } = req.body;

      const data = await User.create({
        username,
        fullname,
        email,
        password: hashSync(password, 10),
      });

      res.status(200).send({
        message: 'success',
        data: {
          id: data.id,
          username: data.username,
          email: data.email,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(422).send({
        message: 'Failed to create user',
      });
    }
  };

  static login = async (req, res) => {
    const { username, password } = req.body;

    // find user data
    const data = await User.findOne({
      where: {
        username,
      },
    });

    // user not exist
    if (!data) {
      return res.status(404).send({
        message: 'data tidak ditemukan',
      });
    }

    // user exit but wrong password
    if (!compareSync(password, data.password)) {
      return res.status(401).send({
        message: 'Incorrect Password',
      });
    }

    // oke
    const secret = process.env.SECRET;
    const payload = {
      id: data.id,
      username: data.username,
      email: data.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return res.status(200).send({
      message: 'success',
      token: `Bearer ${token}`,
    });
  };
}
export default UserController;
