import Router from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import postsController from "./postsController.js";

const router = new Router();

router.post('/', postsController.create);
router.get('/', authMiddleware, postsController.getPosts);

export default router;
