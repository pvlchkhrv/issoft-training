import { Component } from "../Component.js";
import { header } from "../header/Header.js";
import { footer } from "../footer/Footer.js";

const getTemplate = () => {
  const $container = document.createElement("div");
  $container.classList.add("container");
  return $container;
};

export class Container extends Component {
  constructor(props, children) {
    super(props, children);
    this.$component = getTemplate();
    this.renderChildren();
  }
}

const children = [header.html, footer.html];

export const container = new Container({}, children);
