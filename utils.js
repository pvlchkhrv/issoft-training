const createErrorSpan = (selector, Id, errorMessage) => {
  if (!document.querySelector(`${selector}`)) {
    const errorSpan = document.createElement("span");
    errorSpan.innerText = errorMessage;
    errorSpan.id = selector;
    errorSpan.style.color = "red";
    this.email.before(spanEmailError);
  }
};

module.exports = {
  createErrorSpan,
};
