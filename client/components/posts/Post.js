import {Component} from "../Component.js";

const getTemplate = (post) => {
  const $post = document.createElement('div');
  $post.classList.add("post");
  $post.insertAdjacentHTML("afterbegin", `
    <div class="post__header">${post.title || '' }</div>
    <div class="post__content">
      <div class="post__image">
      
        <img src="data:image/png;base64,${post.images[0]}" alt="post image"/>
      </div>
      <div class="post__text">${post.text || ''}</div>
    </div>
  `)
  return $post;
};

export class Post extends Component {
  constructor(props) {
    super(props);
    this.post = props.post;
    this.$component = getTemplate(props.post);
  }
}
