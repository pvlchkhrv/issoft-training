import { AuthForm } from "./AuthForm.js";
import { closeModal, signUpModal } from "./index.js";

export class SignUpForm extends AuthForm {
  constructor(form, email, password, passwordConfirmation) {
    super(form, email, password);
    this.passwordConfirmation = passwordConfirmation;
  }

  validatePasswordConfirmation(password, passwordConfirmation) {
    if (password !== passwordConfirmation) {
      // create span with error
      const spanPasswordConfirmationError = document.createElement("span");
      spanPasswordConfirmationError.innerText =
        "Check the password confirmation";
      spanPasswordConfirmationError.id = "password-confirmation-error";
      spanPasswordConfirmationError.style.color = "red";
      !document.querySelector("#password-confirmation-error") &&
        this.passwordConfirmation.before(spanPasswordConfirmationError);
    }
    return true;
  }

  onSubmit(email, password, passwordConfirmation) {
    if (
      this.validateEmail(email) &&
      this.validatePassword(password) &&
      this.validatePasswordConfirmation(password, passwordConfirmation)
    ) {
      const users = JSON.parse(localStorage.getItem("users"));
      const isRegisteredUser = users.find((user) => user.email === email);
      if (isRegisteredUser) {
        //create span with error
        const spanEmailError = document.createElement("span");
        spanEmailError.innerText = "Email has been already registered";
        spanEmailError.id = "email-error";
        spanEmailError.style.color = "red";
        !document.querySelector("#email-error") &&
          this.email.before(spanEmailError);
      } else {
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        //create span in header to show auth result
        const authResultSpan = document.querySelector(".auth-result");
        authResultSpan.innerText = "Registered successfuly";
        closeModal(signUpModal);
      }
    }
  }
  return;
}
