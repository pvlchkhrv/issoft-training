import { Component } from "./Component.js";
import { header } from "./Header.js";
import { footer } from "./Footer.js";
import { authPage } from "../pages/AuthPage.js";
import { UsersPage } from "../pages/UsersPage.js";

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

const children = [header.html, new UsersPage().html, footer.html];

export const container = new Container({}, children);
