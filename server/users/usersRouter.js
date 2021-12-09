import Router from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import {usersController} from "./usersController.js";

const router = new Router();

router.get('/', authMiddleware, usersController.getUsers);
router.get('/:id', authMiddleware, usersController.getUser);
router.put('/', authMiddleware, usersController.updateUser);
router.patch('/', authMiddleware, usersController.updateUserPassword);
router.delete('/', authMiddleware, usersController.deleteUser);

export default router;
