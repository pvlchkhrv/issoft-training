import { modal } from "../modal/Modal.js";
import { EditUserForm } from "../forms/EditUserForm.js";
import { Component } from "../Component.js";
import {storage} from "../../storage/Storage.js";
import {usersAPI} from "../../api/usersAPI.js";

const getTemplate = (user) => {
  const $user = document.createElement("tr");
  $user.classList.add = "user";
  $user.insertAdjacentHTML(
    "afterbegin",
    `
      <td id="user__user">${user.email || ""}</td>
      <td id="user__name">${user.name || ""}</td>
      <td id="user__date-of-birth">${user.birthDate || ""}</td>
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
    this.currentUser = storage.getItem('currentUser');
    this.#listen();
  }

  #listen() {
    const $editButton = this.$component.lastElementChild.firstElementChild;
    const $deleteButton = this.$component.lastElementChild.lastElementChild;
    $editButton.addEventListener("click", () => this.onEditClick(this.user));
    $deleteButton.addEventListener("click", () =>
      this.onDeleteClick(this.user._id)
    );
  }

  onEditClick(user) {
    const $editUserForm = new EditUserForm({ user }).html;
    modal.open($editUserForm);
  }

  async onDeleteClick(_id) {
    if (_id === this.currentUser._id) {
      alert("You can not delete yourself");
    } else {
      await usersAPI.deleteUser({_id});
      alert("User has been deleted");
    }
  }
}
