export class Form {
  constructor(form) {
    this.form = form;
    this.#listen();
  }

  #listen() {
    const inputs = this.getInputs();
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validate();
      });
    });
  }

  getInputs() {
    return Array.from(this.form).filter((child) => child.tagName === "INPUT");
  }

  validate() {
    const inputs = this.getInputs();
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
