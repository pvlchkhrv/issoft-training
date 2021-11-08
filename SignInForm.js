import { AuthForm } from "./AuthForm.js";
import { closeModal, signInModal } from "./index.js";

export class SignInForm extends AuthForm {
  constructor(form, email, password) {
    super(form, email, password);
  }

  onSubmit(email, password) {
    debugger;
    if (this.validateEmail(email) && this.validatePassword(password)) {
      const authResultSpan = document.querySelector(".auth-result");

      const user = JSON.parse(localStorage.getItem("users")).find(
        (u) => u.email === email
      );

      if (user && user.password === password) {
        authResultSpan.innerText = email;
      } else {
        authResultSpan.style.color = "red";
        authResultSpan.innerText = "Authorization failed";
      }
      closeModal(signInModal);
    }
  }
  return;
}
