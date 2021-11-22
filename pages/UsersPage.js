import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { Users } from "../users/Users.js";
import { Page } from "./Page.js";

const getTemplate = () => {
  const $main = document.createElement("main");
  $main.classList.add("content");
  $main.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="column-1"></div>
      <div class="column-2"></div>
      <div class="column-3"></div>
    `
  );
  return $main;
};
export class UsersPage extends Page {
  constructor(props, children) {
    super(props, children);
    this.$component = getTemplate();
    this.renderChildren();
  }

  renderChildren() {
    const $centerColumn = this.$component.firstElementChild.nextElementSibling;
    $centerColumn.append(...children);
  }
}

const children = [new Users().html];

export const usersPage = new UsersPage({}, children);
