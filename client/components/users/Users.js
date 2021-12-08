import { User } from "./User.js";
import { Component } from "../Component.js";

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
    this.users = props.users || [];
    this.renderChildren();
  }

  renderChildren() {
    console.log(this.users)
    this.users.forEach(user => {
      const $user = new User({ user }).html;
      this.$component.append($user);
    });
  }
}
