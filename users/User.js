import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { Modal } from "../modal/Modal.js";
import { EditUserForm } from "../forms/EditUserForm.js";

const getTemplate = (user) => `
<tr id="user">
  <td id="user__user">${user.email}</td>
  <td id="user__name">${user.name}</td>
  <td id="user__date-of-birth">${user.dateOfBirth}</td>
  <td id="user__sex">${user.sex}</td>
  <td id="user__isSmoker">${user.isSmoker}</td>
  <td>
    <button class='open-modal' id='edit-user-button'>Edit</button>
    <button id='delete-user-button'>Delete</button>
  </td>
</tr>`;

export class User {
  constructor(user) {
    this.user = user;
    this.$user = document.createElement("tr");
    this.currentUser = userStorageAdapter.getCurrentUser();
    this.#render(this.user);
    this.#listen();
  }

  #listen() {
    const $editButton = this.$user.lastElementChild.firstElementChild;
    const $deleteButton = this.$user.lastElementChild.lastElementChild;
    console.dir($deleteButton);
    console.dir($editButton);
    $editButton.addEventListener("click", () => this.onEditClick(this.user));
    $deleteButton.addEventListener("click", () =>
      this.onDeleteClick(this.user.email)
    );
  }

  #render(user) {
    this.$user.innerHTML = getTemplate(user);
  }

  onEditClick(user) {
    const $modal = new Modal();
    const $editUserForm = new EditUserForm(user).$form;
    $modal.open($editUserForm);
  }

  onDeleteClick(email) {
    debugger;
    const currentUser = userStorageAdapter.getCurrentUser();
    if (email === currentUser) {
      alert("You can not delete yourself");
    } else {
      userStorageAdapter.deleteUser(email);
      alert("User has benn deleted");
    }
  }
}
