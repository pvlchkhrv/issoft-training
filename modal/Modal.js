export class Modal {
  static instance = null;

  constructor() {
    if (Modal.instance) {
      return Modal.instance;
    }
    Modal.instance = this;
  }

  createModal() {
    // const modal = document.createElement("div");
    // modal.className = "modal";
    // const modalContent = document.createElement("div");
    // modalContent.className = "modal__content";
    // const modalCloseButton = document.createElement("button");
    // modalCloseButton.innerHTML = "&times;";
    // modalCloseButton.className = "close-modal";
  }

  open(form) {
    const modal = document.createElement("div");
    modal.className = "modal";

    const modalContent = document.createElement("div");
    modalContent.className = "modal__content";

    const modalCloseButton = document.createElement("button");
    modalCloseButton.innerHTML = "&times;";
    modalCloseButton.className = "close-modal";

    modalContent.append(modalCloseButton);
    modalContent.append(form);
    modal.append(modalContent);
    document.body.append(modal);
    form.classList.remove("hidden");
    modal.classList.add("active");
    modal.firstElementChild.classList.add("active");
  }

  close() {
    const modal = document.querySelector(".modal");
    const form = modal.firstElementChild.lastElementChild;
    form.classList.add("hidden");
    document.body.append(form);
    modal.remove();
  }
}
