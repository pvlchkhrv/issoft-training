import {Component} from "../Component.js";
import {Post} from './Post.js'
import {modal} from "../modal/Modal.js";

const getTemplate = () => {
  const $posts = document.createElement('div');
  $posts.classList.add('posts');
  return $posts;
}

export class Posts extends Component{
  constructor(props) {
    super(props);
    this.$component = getTemplate();
    this.posts = props.posts || [];
    this.renderChildren();
    this.#listen();
  }

  #listen() {
    this.$component.addEventListener('click', (e) => {
      const $post = e.target.closest('.post');
      if ($post) {
        const clone = $post.cloneNode(true);
        modal.open(clone); // on close deletes !!! fix!
      }
    })
  }

  renderChildren() {
    this.posts.forEach(post => {
      const $post = new Post({post}).html;
      this.$component.append($post);
    })
  }
}
