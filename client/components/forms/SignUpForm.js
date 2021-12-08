import {Form} from "./Form.js";
import {modal} from "../modal/Modal.js";
import {handleMessageSpan} from "../../utils/handleMessageSpan.js";
import {authAPI} from "../../api/authAPI.js";

const getTemplate = () => {
  const $form = document.createElement("form");
  $form.classList.add("form", "auth-form", "hidden");
  $form.id = "sign-up";

  $form.insertAdjacentHTML(
    "afterbegin",
    `
    <h2 class="form__title">Sign Up</h2>
    <fieldset class="form__fieldset">
      <label class="form__item">
        <span class="form__label">Email</span>
        <input class="form__input" id="sign-up__email" type="email" name="email" placeholder="Enter email" required data-error='Invalid email' pattern="^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$"> 
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Password</span>
        <input class="form__input" id="sign-up__password" type="password" name="password" placeholder="Enter password" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$" required data-error='Invalid password'>
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Confirm password</span>
        <input class="form__input" id="sign-up__password-confirmation" type="password" name="confirmation" placeholder="Confirm password" pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$" required data-error='Invalid password confirmation'>
        <span class="form__input__message"></span>
      </label>
    </fieldset>
    <div class="form__item form__item--actions">
      <button class="form__btn form__btn--primary" type="submit">Sign Up</button>
    </div>
`
  );
  return $form;
};

export class SignUpForm extends Form {
  constructor() {
    super();
    this.$component = getTemplate();
    this.$email = this.$component[1];
    this.$password = this.$component[2];
    this.$passwordConfirmation = this.$component[3];
    super.listen(this.$component);
  }

  // checkIsUnique() {
  //   const user = userStorageAdapter.getUser(this.$email.value);
  //   const messageSpan = this.$email.nextElementSibling;
  //   const message = "User has been registered already";
  //   return handleMessageSpan(user, messageSpan, message);
  // }

  validatePasswordConfirmation() {
    const messageSpan = this.$passwordConfirmation.nextElementSibling;
    const message = "Confirmation failed";
    const condition = this.$password.value !== this.$passwordConfirmation.value;
    return handleMessageSpan(condition, messageSpan, message);
  }

  async submit(e) {
    super.submit(e);
    if (this.validatePasswordConfirmation()) {
      const formData = this.getFormData(this.$component);
      try {
        const data = await authAPI.register(formData);
        console.log(data);
      } catch (e) {
        console.log(e.message);
      }
    }
    this.$component.remove();
    modal.close();
  }
}
