import { Modal } from "./Modal.js";
import { SignInForm } from "./SignInForm.js";
import { SignUpForm } from "./SignUpForm.js";

// if (!localStorage.getItem("users")) {
//   localStorage.setItem("users", JSON.stringify({}));
// }

// work with modals
const signInOpenButton = document.querySelector(".auth-buttons__sign-in");
const signUpOpenButton = document.querySelector(".auth-buttons__sign-up");
const signInCloseButton = document.querySelector("#close-sign-in");
const signUpCloseButton = document.querySelector("#close-sign-up");

export const signInModal = new Modal(document.querySelector("#sign-in-modal"));
export const signUpModal = new Modal(document.querySelector("#sign-up-modal"));

signInOpenButton.addEventListener("click", () => signInModal.open());
signUpOpenButton.addEventListener("click", () => signUpModal.open());
signInCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  signInModal.close();
});
signUpCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  signUpModal.close();
});

// work with forms
const signInFormElement = document.querySelector("#sign-in");
const signInEmailInputElement = document.querySelector("#sign-in__email");
const signInPasswordInputElement = document.querySelector("#sign-in__password");

const signUpFormElement = document.querySelector("#sign-up");
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
  signInForm.submit(e);
});

signUpForm.form.addEventListener("submit", (e) => {
  signUpForm.submit(e);
  console.log("CLICK");
});
