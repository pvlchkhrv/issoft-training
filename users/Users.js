import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { User } from "./User.js";

const getTemplate = () => {
  const $users = document.createElement("table");
  $users.classList.add("users");
  $users.insertAdjacentHTML(
    "afterbegin",
    `
      <tr>
        <th>User</th>
        <th>Name</th>
        <th>Date of Birth</th>
        <th>Sex</th>
        <th>Smoker</th>
        <th>Actions</th>
      </tr>
  `
  );
  return $users;
};

export class Users {
  constructor() {
    this.$users = getTemplate();
    this.users = userStorageAdapter.getUsers();
    this.currentUser = userStorageAdapter.getCurrentUser();
    this.#render(this.users);
  }

  #render(users) {
    const $column = document.querySelector(".column-2");
    $column.append(this.$users);
    for (let email in users) {
      const $user = new User(users[email]).$user;
      this.$users.append($user);
    }
  }
}
