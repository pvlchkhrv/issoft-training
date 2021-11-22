import { modal } from "../Modal";
import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";
import { SignUpForm } from "./SignUpForm.js";


const getTemplate = (user) => {
  const $form = document.createElement("form");
  $form.classList.add("form", "edit-user-form", "hidden");
  $form.id = "edit-user-form";

  $form.insertAdjacentHTML(
    "afterbegin",
    `
    <h2 class="form__title">Edit ${user.email} information</h2>
    <fieldset class="form__fieldset">
      <label class="form__item">
        <span class="form__label">Name</span>
        <input class="form__input" id="edit-user-form__user-name" type="text" placeholder="Enter name" required name="user-name" value=${
          user.name || ""
        } > 
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Password</span>
        <input class="form__input" id="edit-user-form__password" type="password" placeholder="Enter password" required data-error='Invalid password' value=${
          user.password
        } name="password">
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Confirm Password</span>
        <input class="form__input" id="edit-user-form__password-confirmation" type="password" placeholder="Enter password" required data-error='Invalid password' value=${
          user.password
        } name="confirm-password">
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Date of birth</span>
        <input class="form__input" id="edit-user-form__date-of-birth" type="date" name="date" value=${
          user.dateOfBirth || ""
        } >
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Sex</span>
        <select class="form__input" id="edit-user-form__sex" required form="edit-user-form" name="sex" value=${
          user.sex || ""
        } >
          <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Smoker</span>
        <input type="checkbox" class="form__input" id="edit-user-form__smoker" name="smoker" >
        <span class="form__input__message"></span>
      </label>
    </fieldset>
    <div class="form__item form__item--actions">
      <button class="form__btn form__btn--primary" type="submit">Set changes</button>
    </div>
`
  );
  return $form;
};

export class EditUserForm extends SignUpForm {
  constructor(user) {
    super();
    this.user = user;
    this.updatedUser = {
      ...this.user,
    };
    this.$form = getTemplate(this.user);
    // this.#listen();
  }

  #listen() {
    this.$form.addEventListener("submit", (e) => {
      this.submit(e);
    });
  }

  getInputs() {
    return Array.from(this.$form).filter(
      (child) => child.tagName === "INPUT" || child.tagName === "SELECT"
    );
  }

  updateUserInfo() {
    const inputs = this.getInputs();

    inputs.forEach((input) => {
      switch (input.name) {
        case "user-name":
          this.updatedUser.name = input.value;
          break;
        case "password":
          this.updatedUser.password = input.value;
          break;
        case "date":
          this.updatedUser.dateOfBirth = input.value;
          break;
        case "sex":
          this.updatedUser.sex = input.options[input.selectedIndex].value;
          break;
        case "smoker":
          this.updatedUser.isSmoker = input.checked;
          break;
        default:
          return;
      }
    });
  }

  submit(e) {
    this.updateUserInfo();
    userStorageAdapter.updateUser(this.user.email, this.updatedUser);
    this.$form.remove();
    modal.close();
  }
}
