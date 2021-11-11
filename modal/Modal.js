export class Modal {
  constructor(modal) {
    this.modal = modal;
  }
  open() {
    if (this.modal === null) return;
    this.modal.classList.add("active");
    this.modal.firstElementChild.classList.add("active");
  }

  close() {
    if (this.modal === null) return;
    this.modal.classList.remove("active");
  }
}
