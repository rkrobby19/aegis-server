import express from 'express';

import UserController from '../../controllers/user-controller';

const router = express.Router();

router.post('/register', UserController.registerUser);

router.post('/login', UserController.login);

router.get('/users', UserController.getUsers);

export default router;
