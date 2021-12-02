import Router from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import {usersController} from "./usersController.js";

const router = new Router();

router.get('/', authMiddleware, usersController.getUsers);

export default router;
