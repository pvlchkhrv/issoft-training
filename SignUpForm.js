import { Form } from "./Form.js";
import { userStorageAdapter } from "./data-access/adapters/UserAdapter.js";

export class SignUpForm extends Form {
  constructor(form, emailInput, passwordInput, passwordConfirmationInput) {
    super(form);
    this.email = emailInput;
    this.password = passwordInput;
    this.passwordConfirmation = passwordConfirmationInput;
  }

  validatePasswordConfirmation() {
    if (this.password.value !== this.passwordConfirmation.value) {
      this.email.nextElementSibling.style.color = "red";
      this.email.nextElementSibling.innerText = "Confirmation failed";
      return false;
    }
    return true;
  }

  submit(e) {
    debugger;
    super.submit(e);
    const authResultSpan = document.querySelector(".auth-result");
    if (this.validatePasswordConfirmation()) {
      const user = userStorageAdapter.getUser(this.email.value);

      if (!user) {
        userStorageAdapter.setUser({
          email: this.email.value,
          password: this.password.value,
        });

        authResultSpan.innerText = "Registered successfuly";
      } else {
        authResultSpan.style.color = "red";
        authResultSpan.innerText =
          "User with pointed email has been already registered";
      }
    }
  }
  return;
}
