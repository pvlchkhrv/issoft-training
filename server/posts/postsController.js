import postsService from "./postsService.js";
import User from '../models/User.js';
import fileService from '../files/FileService.js';


class PostsController {
  async create(req, res) {
    try {
      const post = req.body;
      const files = req.files;
      await postsService.createPost(post, files);
      res.json('Ok')
    } catch (e) {
      console.log(e);
      res.status(400).json({message: e.message});
    }
  }

  async createPost(req, res) {

  }
}

export default new PostsController();
