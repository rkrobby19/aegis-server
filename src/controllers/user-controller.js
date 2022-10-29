import UserService from '../services/user-service';
import BaseController from './base-controller';

const jwt = require('jsonwebtoken');
const cookie = require('cookie');
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
        created_at: Date.now(),
      });

      res.status(200).send({
        message: 'Success',
        data: {
          id: data.id,
          username: data.username,
          email: data.email,
          created_at: data.created_at,
        },
      });
    } catch (error) {
      console.log(error.message);
      res.status(422).send({
        message: 'Failed to create user',
      });
    }
  };

  static login = async (req, res) => {
    const { username, password } = req.body;

    const data = await User.findOne({
      where: {
        username,
      },
    });

    if (!data) {
      return res.status(404).send({
        message: 'Data not found',
      });
    }

    if (!compareSync(password, data.password)) {
      return res.status(401).send({
        message: 'Incorrect Password',
      });
    }

    const secret = process.env.SECRET;
    const payload = {
      id: data.id,
      username: data.username,
      email: data.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 * 7 });
    const setCookie = cookie.serialize('token', token);

    res.setHeader('Set-Cookie', setCookie, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return res.status(200).send({
      message: 'Success',
    });
  };
}
export default UserController;
