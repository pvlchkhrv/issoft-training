import { Form } from "./Form.js";
import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";
import { modal } from "../modal/Modal.js";

const getTemplate = () => {
  const $form = document.createElement("form");
  $form.classList.add("form", "auth-form", "hidden");
  $form.id = "sign-in";

  $form.insertAdjacentHTML(
    "afterbegin",
    `
    <h2 class="form__title">Sign In</h2>
    <fieldset class="form__fieldset">
      <label class="form__item">
        <span class="form__label">Email</span>
        <input class="form__input" id="sign-in__email" type="email" placeholder="Enter email" required data-error='Invalid email' data-success='success'> 
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Password</span>
        <input class="form__input" id="sign-in__password" type="password" placeholder="Enter password" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$" data-error='Invalid password' data-success='password ok'>
        <span class="form__input__message"></span>
      </label>
    </fieldset>
    <div class="form__item form__item--actions">
      <button class="form__btn form__btn--primary" type="submit">Sign In</button>
    </div>
`
  );
  return $form;
};

const getLogoutButton = () => {
  const logoutButton = document.createElement("button");
  logoutButton.id = "logout-button";
  logoutButton.innerHTML = "Logout";
  return logoutButton;
};

export class SignInForm extends Form {
  constructor() {
    super();
    this.$form = getTemplate();
    this.$email = this.$form[1];
    this.$password = this.$form[2];
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

  checkIsRegistered() {
    const messageSpan = this.$email.nextElementSibling;
    const user = userStorageAdapter.getUser(this.$email.value);
    if (!user) {
      messageSpan.style.color = "red";
      messageSpan.innerText = "User hasn't been registered";
      return false;
    }
    messageSpan.innerText = "";
    return true;
  }

  checkPassword() {
    const messageSpan = this.$password.nextElementSibling;
    const user = userStorageAdapter.getUser(this.$email.value);
    if (user.password !== this.$password.value) {
      messageSpan.style.color = "red";
      messageSpan.innerText = "Wrong password";
      return false;
    }
    messageSpan.innerText = "";
    return true;
  }

  submit(e) {
    super.submit(e);
    const $authResult = document.querySelector(".auth-result");
    const $authButtons = document.querySelector(".auth-buttons");
    const modalButtons = document.querySelectorAll(".open-modal");

    if (this.checkIsRegistered() && this.checkPassword()) {
      const $logoutButton = getLogoutButton();
      $authResult.style.color = "black";
      $authResult.innerText = this.$email.value;
      $authButtons.append($logoutButton);
      modalButtons.forEach((button) => button.remove());
      modal.close();
    }
  }
}
