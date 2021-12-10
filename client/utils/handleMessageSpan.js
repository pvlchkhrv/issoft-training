export const handleMessageSpan = (condition, messageSpan, message) => {
  if (!condition) {
    messageSpan.style.color = "red";
    messageSpan.innerText = message;
    return false;
  }
  messageSpan.innerText = "";
  return true;
};
