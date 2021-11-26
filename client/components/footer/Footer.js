import { Component } from "../Component.js";

const getTemplate = () => {
  return document.createElement("footer");
};

export class Footer extends Component {
  constructor(props, children) {
    super(props, children);
    this.$component = getTemplate();
  }

  render() {
    super.render();
  }
}

export const footer = new Footer();
