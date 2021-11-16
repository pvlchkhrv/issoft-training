import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { User } from "./User.js";

const getTemplate = () => `
<table class="users">
<tr>
  <th>User</th>
  <th>Name</th>
  <th>Date of Birth</th>
  <th>Sex</th>
  <th>Smoker</th>
  <th>Actions</th>
</tr>
</table>`;

export class Users {
  constructor() {
    this.users = userStorageAdapter.getUsers();
    this.$users = document.createElement("table");
    this.$users.classList.add("users");
    this.currentUser = userStorageAdapter.getCurrentUser();
    this.#render(this.users);
  }

  #render(users) {
    const $column = document.querySelector(".column-2");
    this.$users.innerHTML = getTemplate();
    $column.append(this.$users);
    for (let key in users) {
      const $user = new User(users[key]).$user;
      this.$users.append($user);
    }
  }
}
