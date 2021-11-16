import { Modal } from "../modal/Modal.js";
import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { Form } from "./Form.js";
const pattern =
  "(?=^.{4,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$";
const getTemplate = (user) => `
      <h2 class="form__title">Edit ${user.email} information</h2>
      <fieldset class="form__fieldset">
        <label class="form__item">
          <span class="form__label">Name</span>
          <input class="form__input" id="edit-user-form__user-name" type="text" placeholder="Enter name" required value=${user.name} name="user-name"> 
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Password</span>
          <input class="form__input" id="edit-user-form__password" type="password" placeholder="Enter password" required data-error='Invalid password' value=${user.password} name="password">
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Confirm Password</span>
          <input class="form__input" id="edit-user-form__password-confirmation" type="password" placeholder="Enter password" required data-error='Invalid password' value=${user.password} nmae="confirm-password">
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Date of birth</span>
          <input class="form__input" id="edit-user-form__date-of-birth" type="date" value=${user.dateOfBirth} name="date">
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Sex</span>
          <select class="form__input" id="edit-user-form__sex" required form="edit-user-form" value=${user.sex} name="sex">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Smoker</span>
          <input type="checkbox" class="form__input" id="edit-user-form__smoker" name="smoker">
          <span class="form__input__message"></span>
        </label>
      </fieldset>
      <div class="form__item form__item--actions">
        <button class="form__btn form__btn--primary" type="submit">Set changes</button>
      </div>
`;

export class EditUserForm {
  constructor(user) {
    this.user = user;
    this.updatedUser = {
      ...this.user,
      name: null,
      dateOfBirth: null,
      sex: null,
      isSmoker: false,
    };
    this.$form = document.createElement("form");
    this.$form.classList.add("form", "edit-user-form", "hidden");
    this.$form.id = "edit-user-form";
    this.#render();
    this.#listen();
  }

  #listen() {
    this.$form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  #render() {
    this.$form.innerHTML = getTemplate(this.user);
  }

  getInputs() {
    return Array.from(this.$form).filter(
      (child) => child.tagName === "INPUT" || child.tagName === "SELECT"
    );
  }

  updateUserInfo() {
    const inputs = this.getInputs();

    inputs.forEach((input) => {
      switch (input.name) {
        case "user-name":
          this.updatedUser.name = input.value;
          break;
        case "password":
          this.updatedUser.password = input.value;
          break;
        case "date":
          this.updatedUser.dateOfBirth = input.value;
          break;
        case "sex":
          this.updatedUser.sex = input.options[input.selectedIndex].value;
          break;
        case "smoker":
          this.updatedUser.isSmoker = input.checked;
          console.dir(input);
          break;
        default:
          return;
      }
    });
  }

  submit() {
    const $modal = new Modal();
    debugger;
    this.updateUserInfo();
    userStorageAdapter.updateUser(this.user.email, this.updatedUser);
    this.$form.remove();
    $modal.close();
  }
}
