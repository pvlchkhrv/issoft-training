import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { Form } from "./Form.js";

const getTemplate = (user) => `
      <h2 class="form__title">Edit ${user.email} information</h2>
      <fieldset class="form__fieldset">
        <label class="form__item">
          <span class="form__label">Name</span>
          <input class="form__input" id="edit-user-form__name" type="text" placeholder="Enter name" required value=${user.name}> 
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Password</span>
          <input class="form__input" id="edit-user-form__password" type="password" placeholder="Enter password" pattern="(?=^.{4,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required data-error='Invalid password' value=${user.password}>
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Confirm Password</span>
          <input class="form__input" id="edit-user-form__password-confirmation" type="password" placeholder="Enter password" pattern="(?=^.{4,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required data-error='Invalid password' value=${user.password}>
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Date of birth</span>
          <input class="form__input" id="edit-user-form__date-of-birth" type="date" value=${user.dateOfBirth}>
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Sex</span>
          <select name="edit-user-form__sex" class="form__input" id="edit-user-form__sex" required form="edit-user-form" value=${user.sex}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <span class="form__input__message"></span>
        </label>
        <label class="form__item">
          <span class="form__label">Smoker</span>
          <input type="checkbox" class="form__input" id="edit-user-form__smoker" checked=${user.isSmoker}>
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
    this.$form = document.createElement("form");
    this.$form.classList.add("form", "edit-user-form", "hidden");
    this.$form.id = "edit-user-form";
    this.#render();
  }

  #render() {
    this.$form.innerHTML = getTemplate(this.user);
    document.body.append(this.$form);
  }

  get html() {
    return this.$form;
  }

  readUsers;

  submit() {
    // super.submit(e);
    userStorageAdapter.updateUser(user.email);
    this.$form.remove();
  }
}
