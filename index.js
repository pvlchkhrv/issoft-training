import { Modal } from "./modal/Modal.js";
import { SignInForm } from "./forms/SignInForm.js";
import { SignUpForm } from "./forms/SignUpForm.js";

// work with forms
const signInFormElement = document.querySelector("#sign-in");
const signInEmailInputElement = document.querySelector("#sign-in__email");
const signInPasswordInputElement = document.querySelector("#sign-in__password");
const signInOpenButton = document.querySelector(".auth-buttons__sign-in");

const signUpFormElement = document.querySelector("#sign-up");
const signUpOpenButton = document.querySelector(".auth-buttons__sign-up");
const signUpEmailInputElement = document.querySelector("#sign-up__email");
const signUpPasswordInputElement = document.querySelector("#sign-up__password");
const signUpPasswordConfirmationInputElement = document.querySelector(
  "#sign-up__password-confirmation"
);

const signInForm = new SignInForm(
  signInFormElement,
  signInEmailInputElement,
  signInPasswordInputElement
);
const signUpForm = new SignUpForm(
  signUpFormElement,
  signUpEmailInputElement,
  signUpPasswordInputElement,
  signUpPasswordConfirmationInputElement
);

const modal = new Modal();

signInOpenButton.addEventListener("click", () => modal.open(signInFormElement));
signUpOpenButton.addEventListener("click", () => modal.open(signUpFormElement));

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-modal")) {
    const form = e.target.nextElementSibling;
    modal.close(form);
  }
});

signInForm.getInputs().forEach((input) => {
  input.addEventListener("blur", () => {
    signInForm.validate();
  });
});

signUpForm.getInputs().forEach((input) => {
  input.addEventListener("blur", () => {
    signUpForm.validate();
  });
});

signInForm.form.addEventListener("submit", (e) => {
  signInForm.submit(e) && modal.close();
});

signUpForm.form.addEventListener("submit", (e) => {
  signUpForm.submit(e) && modal.close();
});
