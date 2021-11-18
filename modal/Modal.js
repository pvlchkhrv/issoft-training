const getTemplate = () => `
  <div class="modal__content">
    <button class="close-modal" id="close-modal">&times;</button>
  </div>
`;

export class Modal {
  static instance = null;

  constructor() {
    if (Modal.instance) {
      return Modal.instance;
    }
    Modal.instance = this;
    this.$modal = document.createElement("div");
    this.$modal.classList.add("modal");
  }

  #listen() {
    const modalCloseButton = this.$modal.firstElementChild.firstElementChild;
    modalCloseButton.addEventListener("click", () => {
      this.close();
    });
  }

  open(form) {
    this.$modal.innerHTML = getTemplate();
    this.$modal.firstElementChild.append(form);
    document.body.append(this.$modal);

    form.classList.remove("hidden");
    this.$modal.classList.add("active");
    this.$modal.firstElementChild.classList.add("active");
    this.#listen();
  }

  close() {
    const form = this.$modal.firstElementChild.lastElementChild;
    form.classList.add("hidden");
    this.$modal.remove();
  }
}

export const modal = new Modal();
