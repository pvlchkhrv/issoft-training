import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";
import { User } from "./User.js";
import { Component } from "../../components/Component.js";

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

export class Users extends Component {
  constructor(props) {
    super(props);
    this.$component = getTemplate();
    this.users = userStorageAdapter.getUsers();
    this.render();
  }

  render() {
    for (let email in this.users) {
      const $user = new User({ user: this.users[email] }).html;
      this.$component.append($user);
    }
  }
}
