export const setValidationError = (condition, message, messageElement) => {
  if (condition) {
    messageElement.style.color = "red";
    messageSpan.innerText = message;
    return false;
  }
  messageElement.innerText = "";
  return true;
};
