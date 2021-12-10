import Router from 'express';
import {authController} from './authController.js';

const router = new Router();

router.post('/registration', authController.register);
router.post('/login', authController.login);

export default router;
