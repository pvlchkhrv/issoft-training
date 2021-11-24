import { Component } from "./Component.js";
import { modal } from "./Modal.js";
import { SignUpForm } from "./forms/SignUpForm.js";
import { SignInForm } from "./forms/SignInForm.js";

const getTemplate = (title) => {
  const $header = document.createElement("header");
  $header.insertAdjacentHTML(
    "afterbegin",
    `
    <h1>${title}</h1>
    <span class="auth-result"></span>
    <div class="auth-buttons">
      <button class="open-modal" id="auth-buttons__sign-in">Sign In</button>
      <button class="open-modal" id="auth-buttons__sign-up">Sign Up</button>
    </div>
  `
  );
  return $header;
};

export class Header extends Component {
  constructor(props, children) {
    super(props, children);
    this.$component = getTemplate(props.title);
    this.#listen();
  }

  #listen() {
    this.$component.addEventListener("click", (event) => {
      const buttonId = event.target.id;
      switch (buttonId) {
        case "auth-buttons__sign-in":
          const signInForm = new SignInForm();
          modal.open(signInForm.html);
          break;
        case "auth-buttons__sign-up":
          const signUpForm = new SignUpForm();
          modal.open(signUpForm.html);
          break;
        case "logout-button":
          this.$component = getTemplate(props.title);
          window.history.back();
        default:
          return;
      }
    });
  }
}

const props = { title: "ISSoft", isAuth: false };

export const header = new Header(props);
