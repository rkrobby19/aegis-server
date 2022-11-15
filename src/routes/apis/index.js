import express from 'express';
import UserController from '../../controllers/user-controller';
import Routes from '../../constants/routes';
import Services from '../../constants/services';
import Middleware from '../../middlewares';
import AccountController from '../../controllers/account-controller';
import EntryController from '../../controllers/entry-controller';
import TransferController from '../../controllers/transfer-controller';

const router = express.Router();
const { validate, validationRules } = require('../../middlewares/validator');

router.post(Routes.Register, [
  validationRules(Services.RegisterUser), validate, Middleware.Guest], UserController.registerUser);
router.post(Routes.Login, [
  validationRules(Services.Login), validate, Middleware.Guest], UserController.login);
router.post(Routes.Logout, UserController.logout);
router.get(Routes.Users, [Middleware.Auth], UserController.getUsers);

router.post(Routes.Account, [
  validationRules(Services.AddAccount), validate, Middleware.Auth], AccountController.addAccount);
router.get(Routes.Accounts, [Middleware.Auth], AccountController.getAccounts);
router.delete(Routes.AccountId, [
  validationRules(Services.DeleteAccount), validate, Middleware.Auth,
], AccountController.deleteAccount);

router.post('/entry', [Middleware.Auth], EntryController.addEntry);
router.get('/entries', [Middleware.Auth], EntryController.getEntries);

router.post('/transfer', [Middleware.Auth], TransferController.addTransfer);
router.get('/transfers', [Middleware.Auth], TransferController.getTransfers);

export default router;
