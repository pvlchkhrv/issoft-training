import {Page} from "./Page.js";
import {postsAPI} from "../api/postsAPI.js";
import {Posts} from "../components/posts/Posts.js";
import {PostForm} from "../components/forms/PostForm.js";
import {modal} from "../components/modal/Modal.js";
import {storage} from "../storage/Storage.js";

const getTemplate = () => {
  const $main = document.createElement("main");
  $main.classList.add("content");
  $main.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="column-1">
      </div>
      <div class="column-2"></div>
      <div class="column-3"></div>
    `
  );
  return $main;
};

export class PostsPage extends Page {
  constructor(props) {
    super(props);
    this.user = storage.getItem('currentUser');
    this.$component = getTemplate();
    this.posts = [];
    this.renderChildren();
  }

  async getPosts(userId) {
    try {
      const posts = await postsAPI.getPosts(userId);
      this.posts = posts;
      console.log(posts)
    } catch (e) {
      console.log(e);
    }
  }

  onCreateClick() {
    const $postForm = new PostForm().html;
    modal.open($postForm);
  }

  #listen() {
    const $getPostsButton = this.$component.firstElementChild.firstElementChild;
    const $createPostButton = this.$component.firstElementChild.lastElementChild;
    $getPostsButton.addEventListener('click', () => {
      this.renderPosts(this.posts);
      console.log(this.$component.firstElementChild.firstElementChild)
    });
    $createPostButton.addEventListener('click', () => {
      this.onCreateClick();
      console.log(this.$component.firstElementChild.lastElementChild)
    });
  }

  renderPosts(posts) {
    if (posts.length) {
      const $centerColumn = this.$component.firstElementChild.nextElementSibling;
      if ($centerColumn.firstChild) $centerColumn.firstChild.remove();
      $centerColumn.append(new Posts({posts: this.posts}).html);
    }
  }

  async renderChildren() {
    const $firstColumn = this.$component.firstElementChild;

    const $getPostsButton = this.createElement('button', '', 'Show posts');
    $getPostsButton.id = 'get-posts-button';
    $firstColumn.append($getPostsButton);
    await this.getPosts(this.user._id);

    const $createPostButton = this.createElement('button', '', 'Create post');
    $createPostButton.id = 'create-post-button';
    $firstColumn.append($createPostButton);
    this.#listen();
  }
}
