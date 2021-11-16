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
    this.$userHTML = document.createElement("tr");
    this.currentUser = userStorageAdapter.getCurrentUser();
    this.#render(this.user);
    this.#listen();
  }

  #listen() {
    const $editButton = this.$userHTML.lastElementChild.firstElementChild;
    $editButton.addEventListener("click", () => this.onEditClick(this.user));
  }

  #render(user) {
    this.$userHTML.innerHTML = getTemplate(user);
  }

  getUserHTML() {
    return this.$userHTML;
  }

  onEditClick(user) {
    const $modal = new Modal();
    const $editUserForm = new EditUserForm(user).html;
    $modal.open($editUserForm);
  }
}
