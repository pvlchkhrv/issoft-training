import { AuthForm } from "./AuthForm.js";
import { closeModal, signInModal } from "./index.js";

export class SignInForm extends AuthForm {
  constructor(form, email, password) {
    super(form, email, password);
  }

  onSubmit(email, password) {
    if (this.validateEmail(email) && this.validatePassword(password)) {
      // get span in header to show authorization result
      const authResultSpan = document.querySelector(".auth-result");

      //get user from LS
      const user = JSON.parse(localStorage.getItem("users")).find(
        (u) => u.email === email
      );

      if (!user) {
        // no user with that email -> create span with error
        const spanEmailError = document.createElement("span");
        spanEmailError.innerText = "No user with this email";
        spanEmailError.id = "email-error";
        spanEmailError.style.color = "red";
        !document.querySelector("#email-error") &&
          this.email.before(spanEmailError);
        return false;
      } else if (user && user.password === password) {
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
