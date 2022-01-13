import {Users} from "../components/users/Users.js";
import {Page} from "./Page.js";
import {usersAPI} from "../api/usersAPI.js";

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

export class UsersPage extends Page {
  constructor(props) {
    super(props);
    this.$component = getTemplate();
    this.users = [];
    this.renderChildren();
    this.#listen();
  }

  async getUsers() {
    try {
      const users = await usersAPI.getUsers();
      this.users = users;
    } catch(e) {
      console.log(e);
    }
  }

  #listen() {
    this.$component.firstElementChild.firstElementChild.addEventListener('click', () => {
      this.renderUsers(this.users);
    });
  }

  renderUsers(users) {
    const $centerColumn = this.$component.firstElementChild.nextElementSibling;
    if($centerColumn.firstElementChild) $centerColumn.firstElementChild.remove();
    $centerColumn.append(new Users({users: this.users}).html);
  }

  async renderChildren() {
    const getUsersButton = this.createElement('button', '', 'Get users');
    getUsersButton.id = 'get-user-button';
    const $firstColumn = this.$component.firstElementChild;
    $firstColumn.append(getUsersButton);
    await this.getUsers();
  }
}
