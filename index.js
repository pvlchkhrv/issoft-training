import { SignInForm } from "./SignInForm.js";
import { SignUpForm } from "./SignUpForm.js";

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

// work with modals
const signInOpenButton = document.querySelector(".auth-buttons__sign-in");
const signUpOpenButton = document.querySelector(".auth-buttons__sign-up");
const signInCloseButton = document.querySelector("#close-sign-in");
const signUpCloseButton = document.querySelector("#close-sign-up");
export const signInModal = document.querySelector("#sign-in-modal");
export const signUpModal = document.querySelector("#sign-up-modal");

const openModal = (modal) => {
  if (modal === null) return;
  modal.classList.add("active");
  modal.firstElementChild.classList.add("active");
};

export const closeModal = (modal) => {
  if (modal === null) return;
  modal.classList.remove("active");
};

signInOpenButton.addEventListener("click", () => openModal(signInModal));
signUpOpenButton.addEventListener("click", () => openModal(signUpModal));
signInCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(signInModal);
});
signUpCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal(signUpModal);
});

//sign in
const signInFormElement = document.querySelector("#sign-in");
const signInEmailInputElement = document.querySelector("#sign-in__email");
const signInPasswordInputElement = document.querySelector("#sign-in__password");
//sign up
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

signInForm.form.addEventListener("submit", (e) => {
  e.preventDefault();
  signInForm.onSubmit(signInForm.email.value, signInForm.password.value);
});

const signUpForm = new SignUpForm(
  signUpFormElement,
  signUpEmailInputElement,
  signUpPasswordInputElement,
  signUpPasswordConfirmationInputElement
);

signUpForm.form.addEventListener("submit", (e) => {
  e.preventDefault();
  signUpForm.onSubmit(
    signUpForm.email.value,
    signUpForm.password.value,
    signUpForm.passwordConfirmation.value
  );
});
