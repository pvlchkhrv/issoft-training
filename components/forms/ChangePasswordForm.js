import { modal } from "../Modal.js";
import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";
import { Form } from "./Form.js";
import { handleMessageSpan } from "../../utils/handleMessageSpan.js";

const getTemplate = (user) => {
  const $form = document.createElement("form");
  $form.classList.add("form", "change-password-form", "hidden");
  $form.id = "change-password-form";
  $form.insertAdjacentHTML(
    "afterbegin",
    `
    <h2 class="form__title">Change password for ${user.email}</h2>
    <fieldset class="form__fieldset">
      <label class="form__item">
        <span class="form__label">Old password</span>
        <input class="form__input" id="edit-user-form__old-password" type="password" placeholder="To change password enter old password" required data-error='Invalid password' value='' name="old-password" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$">
        <span class="form__input__message"></span>
      </label>

      <label class="form__item">
        <span class="form__label">New Password</span>
        <input class="form__input" id="edit-user-form__new-password" type="password" placeholder="Enter new password" required data-error='Invalid password' name="new-password" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$">
        <span class="form__input__message"></span>
      </label>

      <label class="form__item">
        <span class="form__label">Confirm Password</span>
        <input class="form__input" id="edit-user-form__password-confirmation" type="password" placeholder="Enter password" required data-error='Invalid password' name="confirm-password" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$">
        <span class="form__input__message"></span>
      </label>

    </fieldset>

    <div class="form__item form__item--actions">
      <button class="form__btn form__btn--primary" type="submit">Set changes</button>
    </div>
`
  );
  return $form;
};

export class ChangePasswordForm extends Form {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.updatedUser = {
      ...this.user,
    };
    this.$component = getTemplate(this.user);
    this.$oldPassword = this.$component[1];
    this.$newPassword = this.$component[2];
    this.$passwordConfirmation = this.$component[3];
    super.listen(this.$component);
  }

  checkPassword() {
    const messageSpan = this.$oldPassword.nextElementSibling;
    const message = "Wrong old password";
    const condition = this.user.password !== this.$oldPassword.value;
    return handleMessageSpan(condition, messageSpan, message);
  }

  validatePasswordConfirmation() {
    const messageSpan = this.$passwordConfirmation.nextElementSibling;
    const message = "Confirmation failed";
    const condition =
      this.$newPassword.value !== this.$passwordConfirmation.value;
    return handleMessageSpan(condition, messageSpan, message);
  }

  updateUserPassword() {
    this.updatedUser.password = this.$newPassword.value;
    userStorageAdapter.updateUser(this.user.email, this.updatedUser);
  }

  submit(e) {
    e.preventDefault();
    if (this.checkPassword() && this.validatePasswordConfirmation()) {
      this.updateUserPassword();
      modal.close();
    }
  }
}
