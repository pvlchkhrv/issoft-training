import {Component} from "../Component.js";

export class Form extends Component {
  constructor(props, children) {
    super(props, children);
  }

  listen(form) {
    const inputs = this.getInputs(form);
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validate(form);
      });
    });
    form.addEventListener("submit", (e) => {
      this.submit(e);
    });
  }

  getInputs(form) {
    return Array.from(form).filter((child) => child.tagName === "INPUT");
  }

  getFormData(form) {
    const inputs = this.getInputs(form);
    const formData = new FormData();
    inputs.forEach((input) => {
      if (input.name === 'confirmation') return;
      formData.append(input.name, input.value);
    });
    return formData;
  }

  validate(form) {
    const inputs = this.getInputs(form);
    inputs.forEach((input) => {
      const messageSpan = input.nextElementSibling;
      if (input.value !== "" && input.validity.patternMismatch) {
        const errorMessage = input.getAttribute("data-error");

        messageSpan.style.color = "red";
        messageSpan.innerText = errorMessage;
      } else {
        messageSpan.innerText = "";
      }
    });
  }

  submit(e) {
    e.preventDefault();
  }
}
