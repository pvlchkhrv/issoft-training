export class Form {
  constructor(form) {
    this.form = form;
  }

  getInputs() {
    return Array.from(this.form).filter((child) => child.tagName === "INPUT");
  }

  validate() {
    const inputs = this.getInputs();

    inputs.forEach((input) => {
      if (input.value !== "" && input.validity.patternMismatch) {
        const messageSpan = child.nextElementSibling;
        const errorMessage = child.getAttribute("data-error");

        messageSpan.style.color = "red";
        messageSpan.innerText = errorMessage;
        messageSpan.style.display = "inline";
      } else {
        const messageSpan = child.nextElementSibling;
        messageSpan.innerText = "";
        // const successMessage = child.getAttribute("data-success");
        // messageSpan.style.color = "green";
        // messageSpan.innerText = successMessage;
        // messageSpan.style.display = "inline";
      }
    });
  }

  submit(e) {
    e.preventDefault();
  }
}
