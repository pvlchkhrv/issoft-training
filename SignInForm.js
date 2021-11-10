import { Form } from "./Form.js";
import { userStorageAdapter } from "./data-access/adapters/UserAdapter.js";

export class SignInForm extends Form {
  constructor(form, email, password) {
    super(form);
    this.email = email;
    this.password = password;
  }

  submit(e) {
    debugger;
    super.submit(e);
    const authResultSpan = document.querySelector(".auth-result");
    const user = userStorageAdapter.getUser(this.email);

    if (!user) {
      authResultSpan.style.color = "red";
      authResultSpan.innerText = "User with pointed email doesn't exist";
    } else if (user.password === password) {
      authResultSpan.style.color = "black";
      authResultSpan.innerText = email;
    } else {
      authResultSpan.style.color = "red";
      authResultSpan.innerText = "Authorization failed";
    }
  }
}
