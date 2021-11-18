import { Form } from "./Form.js";
import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { modal } from "../modal/Modal.js";

const getTemplate = () => {
  const $form = document.createElement("form");
  $form.classList.add("form", "auth-form", "hidden");
  $form.id = "sign-up";

  $form.insertAdjacentHTML(
    "afterbegin",
    `
    <h2 class="form__title">Sign Up</h2>
    <fieldset class="form__fieldset">
      <label class="form__item">
        <span class="form__label">Email</span>
        <input class="form__input" id="sign-up__email" type="email" placeholder="Enter email" required data-error='Invalid email'> 
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Password</span>
        <input class="form__input" id="sign-up__password" type="password" placeholder="Enter password" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$" required data-error='Invalid password'>
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Confirm password</span>
        <input class="form__input" id="sign-up__password-confirmation" type="password" placeholder="Confirm password" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$" required data-error='Invalid password confirmation'>
        <span class="form__input__message"></span>
      </label>
    </fieldset>
    <div class="form__item form__item--actions">
      <button class="form__btn form__btn--primary" type="submit">Sign Up</button>
    </div>
`
  );
  return $form;
};

export class SignUpForm extends Form {
  constructor() {
    super();
    debugger;
    this.$form = getTemplate();
    this.$email = this.$form[1];
    this.$password = this.$form[2];
    this.$passwordConfirmation = this.$form[3];
    super.listen(this.$form);
    this.#listen();
  }

  #listen() {
    this.$form.addEventListener("submit", (e) => {
      this.submit(e);
    });
  }

  validate() {
    super.validate(this.$form);
  }

  checkIsUnique() {
    const user = userStorageAdapter.getUser(this.$email.value);
    const messageSpan = this.$email.nextElementSibling;
    if (user) {
      messageSpan.style.color = "red";
      messageSpan.innerText = "User has been already registered";
      console.log("User has been already registered");
      return false;
    }
    messageSpan.innerText = "";
    return true;
  }

  validatePasswordConfirmation() {
    const messageSpan = this.$passwordConfirmation.nextElementSibling;
    if (this.$password.value !== this.$passwordConfirmation.value) {
      messageSpan.style.color = "red";
      messageSpan.innerText = "Confirmation failed";
      return false;
    }
    messageSpan.innerText = "";
    return true;
  }

  submit(e) {
    super.submit(e);
    if (this.checkIsUnique() && this.validatePasswordConfirmation()) {
      userStorageAdapter.setUser({
        email: this.$email.value,
        password: this.$password.value,
      });
      this.$form.remove();
      modal.close();
    }
    return;
  }
}
