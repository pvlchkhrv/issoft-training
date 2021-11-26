import { Component } from "../components/Component.js";

export class Page extends Component {
  constructor(props, children) {
    super(props, children);
  }

  setTitle(title) {
    document.title = title;
  }
}
