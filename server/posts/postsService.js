import * as fs from 'fs';
import config from '../config.js';
import * as path from 'path';
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
    const user = await User.findById({_id: post.userId});
    const newPost = new Post({
      ...post,
      images: [...fileNames]
    });
    await newPost.save();
    user.posts = await this.getPosts(post.userId);
    user.save();
  }

  savePostToUser(userId) {

  }

  async getPosts(userId) {
    const posts = await Post.find({userId});
    return posts;
  }
}


export default new PostsService();
