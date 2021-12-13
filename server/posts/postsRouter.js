import Router from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import postsController from "./postsController.js";

const router = new Router();

router.post('/', authMiddleware, postsController.create);

export default router;
