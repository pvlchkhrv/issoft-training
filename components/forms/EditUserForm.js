import { modal } from "../Modal.js";
import { userStorageAdapter } from "../../storage/adapters/UserAdapter.js";
import { Form } from "./Form.js";
import { ChangePasswordForm } from "./ChangePasswordForm.js";

const getTemplate = (user) => {
  debugger;
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
        <span class="form__label">Date of birth</span>
        <input class="form__input" id="edit-user-form__date-of-birth" type="date" name="date" value=${
          user.dateOfBirth || ""
        } >
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Sex</span>
        <select class="form__input" id="edit-user-form__sex" required form="edit-user-form" name="sex" value=${
          user.sex
        } >
          <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <span class="form__input__message"></span>
      </label>
      <label class="form__item">
        <span class="form__label">Smoker</span>
        <input type="checkbox" class="form__input" id="edit-user-form__smoker" name="smoker">
        <span class="form__input__message"></span>
      </label>
    </fieldset>

    <div class="form__item">
        <a href="#" class="form__change-password-link">Change email or password</a> 
    </div>
        
    <div class="form__item form__item--actions">
      <button class="form__btn form__btn--primary" type="submit">Set changes</button>
    </div>
`
  );
  return $form;
};

export class EditUserForm extends Form {
  constructor(props) {
    debugger;
    super(props);
    this.user = props.user;
    this.updatedUser = {
      ...this.user,
    };
    this.$component = getTemplate(this.user);
    this.#listen();
  }

  #listen() {
    this.$component.addEventListener("submit", (e) => {
      this.submit(e);
    });

    this.$component.addEventListener("click", (e) => {
      if (e.target.classList.contains("form__change-password-link")) {
        e.preventDefault();
        modal.close();
        const $changePasswordForm = new ChangePasswordForm({ user: this.user });
        modal.open($changePasswordForm.html);
      }
    });
  }

  getFields() {
    return Array.from(this.$component).filter(
      (child) => child.tagName === "INPUT" || child.tagName === "SELECT"
    );
  }

  updateUserInfo() {
    const inputs = this.getFields();

    inputs.forEach((input) => {
      switch (input.name) {
        case "user-name":
          this.updatedUser.name = input.value;
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
    super.submit(e);
    this.updateUserInfo();
    userStorageAdapter.updateUser(this.user.email, this.updatedUser);
    modal.close();
  }
}
