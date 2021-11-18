export class Form {
  listen(form) {
    const inputs = this.getInputs(form);
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        console.log("blur");
        this.validate(form);
      });
    });
  }

  getInputs(form) {
    return Array.from(form).filter((child) => child.tagName === "INPUT");
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
