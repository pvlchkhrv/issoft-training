import postsService from "./postsService.js";

class PostsController {
  async create(req, res) {
    try {
      const post = req.body;
      const files = req.files;
      console.log(post)
      console.log(files)
      await postsService.createPost(post, files);
      res.status(200).json('Ok')
    } catch (e) {
      console.log(e);
      res.status(400).json({message: e.message});
    }
  }

  async getPosts(req, res){
    try {
      const {_id} = req.query;
      console.log(_id)
      const posts = await postsService.getPosts(_id)
      res.status(200).json(posts);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(req, res) {
    try {
      const {_id} = req.body;
      res.status(200).json('Post was deleted')
    } catch (e) {
      console.log(e)
    }
  }
}

export default new PostsController();
