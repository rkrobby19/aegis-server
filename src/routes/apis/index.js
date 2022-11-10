import express from 'express';
import UserController from '../../controllers/user-controller';
import Routes from '../../constants/routes';
import Services from '../../constants/services';
import Middleware from '../../middlewares';

const router = express.Router();
const { validate, validationRules } = require('../../middlewares/validator');

router.post(Routes.Register, [
  validationRules(Services.RegisterUser), validate,
], UserController.registerUser);
router.post(Routes.Login, [
  validationRules(Services.Login), validate, Middleware.Guest,
], UserController.login);
router.post(Routes.Logout, UserController.logout);

router.get(Routes.Users, [Middleware.Auth], UserController.getUsers);

export default router;
