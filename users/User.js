import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { modal } from "../components/Modal.js";
import { EditUserForm } from "../components/forms/EditUserForm.js";
import { Component } from "../components/Component.js";

const getTemplate = (user) => {
  const $user = document.createElement("tr");
  $user.id = "user";
  $user.insertAdjacentHTML(
    "afterbegin",
    `
      <td id="user__user">${user.email || ""}</td>
      <td id="user__name">${user.name || ""}</td>
      <td id="user__date-of-birth">${user.dateOfBirth || ""}</td>
      <td id="user__sex">${user.sex || ""}</td>
      <td id="user__isSmoker">${user.isSmoker || ""}</td>
      <td>
        <button class='open-modal' id='edit-user-button'>Edit</button>
        <button id='delete-user-button'>Delete</button>
      </td>
    `
  );
  return $user;
};

export class User extends Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.$component = getTemplate(props.user);
    this.currentUser = userStorageAdapter.getCurrentUser();
    console.log(props);
    this.#listen();
  }

  #listen() {
    const $editButton = this.$component.lastElementChild.firstElementChild;
    const $deleteButton = this.$component.lastElementChild.lastElementChild;
    $editButton.addEventListener("click", () => this.onEditClick(this.user));
    $deleteButton.addEventListener("click", () =>
      this.onDeleteClick(this.user.email)
    );
  }

  onEditClick(user) {
    const $editUserForm = new EditUserForm({ user }).html;
    modal.open($editUserForm);
  }

  onDeleteClick(email) {
    const currentUser = userStorageAdapter.getCurrentUser();
    if (email === currentUser) {
      alert("You can not delete yourself");
    } else {
      userStorageAdapter.deleteUser(email);
      alert("User has been deleted");
    }
  }
}
