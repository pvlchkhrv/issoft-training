import User from "../models/User.js";
import Post from "../models/Post.js";
import fileService from '../files/FileService.js';

class PostsService {
  async createPost(post, files) {
    const fileNames = [];
    for (let file in files) {
      const fileName = fileService.writeFile(post.userId, files[file]);
      fileNames.push(fileName);
    }
    const newPost = new Post({
      ...post,
      images: [...fileNames]
    });
    await newPost.save();
    const user = await User.findById({_id: post.userId});
    user.posts = await this.getPosts(post.userId);
    user.save();
  }

  async getPosts(userId) {
    const posts = await Post.find({userId});
    if (!posts) {
      throw new Error('No posts have been found');
    }
    return posts.map(post => {
      const fileName = post.images[0];
      post.images[0] = fileService.getFile(userId, fileName);
      return post;
    });
  }

  async deletePost(_id) {
    const res = await Post.deleteOne({_id});
    if (res.deletedCount === 0) {
      throw new Error('Post deletion went wrong!')
    }
    return {message: 'Post successfully deleted!'}
  }
}


export default new PostsService();
