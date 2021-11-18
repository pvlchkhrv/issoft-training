import { modal } from "./modal/Modal.js";
import { SignInForm } from "./forms/SignInForm.js";
import { SignUpForm } from "./forms/SignUpForm.js";

const signInOpenButton = document.querySelector(".auth-buttons__sign-in");
const signUpOpenButton = document.querySelector(".auth-buttons__sign-up");

const signInForm = new SignInForm();
const signUpForm = new SignUpForm();

signInOpenButton.addEventListener("click", () => modal.open(signInForm.$form));
signUpOpenButton.addEventListener("click", () => modal.open(signUpForm.$form));
