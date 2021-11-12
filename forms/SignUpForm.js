import { Form } from "./Form.js";
import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";

export class SignUpForm extends Form {
  constructor(form, emailInput, passwordInput, passwordConfirmationInput) {
    super(form);
    this.email = emailInput;
    this.password = passwordInput;
    this.passwordConfirmation = passwordConfirmationInput;
  }

  checkIsUnique() {
    const user = userStorageAdapter.getUser(this.email.value);
    const messageSpan = this.email.nextElementSibling;
    if (user) {
      messageSpan.style.color = "red";
      messageSpan.innerText = "User has been already registered";
      return false;
    }
    messageSpan.innerText = "";
    return true;
  }

  validatePasswordConfirmation() {
    const messageSpan = this.passwordConfirmation.nextElementSibling;
    if (this.password.value !== this.passwordConfirmation.value) {
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
        email: this.email.value,
        password: this.password.value,
      });
      return true;
    }
    return false;
  }
}
