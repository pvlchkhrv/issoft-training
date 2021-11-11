import { Form } from "./Form.js";
import { userStorageAdapter } from "./storage/adapters/UserAdapter.js";

export class SignInForm extends Form {
  constructor(form, emailInput, passwordInput) {
    super(form);
    this.email = emailInput;
    this.password = passwordInput;
  }

  submit(e) {
    super.submit(e);
    const authResultSpan = document.querySelector(".auth-result");
    const user = userStorageAdapter.getUser(this.email.value);

    if (!user) {
      authResultSpan.style.color = "red";
      authResultSpan.innerText = "User with pointed email doesn't exist";
    } else if (user.password === this.password.value) {
      authResultSpan.style.color = "black";
      authResultSpan.innerText = this.email.value;
    } else {
      authResultSpan.style.color = "red";
      authResultSpan.innerText = "Authorization failed";
    }
  }
}
