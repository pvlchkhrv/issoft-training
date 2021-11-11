import { Form } from "./Form.js";
import { userStorageAdapter } from "../storage/adapters/UserAdapter.js";

export class SignInForm extends Form {
  constructor(form, emailInput, passwordInput) {
    super(form);
    this.email = emailInput;
    this.password = passwordInput;
  }

  checkIsRegistered() {
    const messageSpan = this.email.nextElementSibling;
    const user = userStorageAdapter.getUser(this.email.value);
    if (!user) {
      messageSpan.style.color = "red";
      messageSpan.innerText = "User hasn't been registered";
      return false;
    }
    messageSpan.innerText = "";
    return true;
  }

  checkPassword() {
    const messageSpan = this.password.nextElementSibling;
    const user = userStorageAdapter.getUser(this.email.value);
    if (user.password !== this.password.value) {
      messageSpan.style.color = "red";
      messageSpan.innerText = "Wrong password";
      return false;
    }
    messageSpan.innerText = "";
    return true;
  }

  submit(e) {
    super.submit(e);
    const authResultSpan = document.querySelector(".auth-result");
    const user = userStorageAdapter.getUser(this.email.value);

    if (this.checkIsRegistered() && this.checkPassword()) {
      authResultSpan.style.color = "black";
      authResultSpan.innerText = this.email.value;
    }
  }
}
