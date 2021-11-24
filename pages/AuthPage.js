import { Page } from "./Page.js";

const getTemplate = () => {
  const $main = document.createElement("main");
  $main.classList.add("content");
  $main.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="column-1"></div>
      <div class="column-2">Auth</div>
      <div class="column-3"></div>
    `
  );
  return $main;
};

export class AuthPage extends Page {
  constructor(props, children) {
    super(props, children);
    this.$component = getTemplate();
  }
}

export const authPage = new AuthPage();
