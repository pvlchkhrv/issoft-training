import { Component } from "../Component.js";

const getTemplate = () => {
  const $modal = document.createElement("div");
  $modal.classList.add("modal");
  $modal.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="modal__content">
        <button id="close-modal-button" class="close-modal" >&times;</button>
      </div>
    `
  );
  return $modal;
};

let instance;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.$component = getTemplate();
    if (!instance) instance = this;
    return instance;
  }

  #listen() {
    const listener = (event) => {
      event.target.classList.contains("close-modal") && this.close();
    };
    this.$component.addEventListener("click", listener);
  }

  open(form) {
    document.body.append(this.$component);
    this.$component.firstElementChild.append(form);
    setTimeout(() => {
      this.$component.classList.add("active");
      this.$component.firstElementChild.classList.add("active");
    }, 100);
    this.#listen();
  }

  close() {
    const $form = this.$component.firstElementChild.children[1];
    $form && $form.remove();
    this.$component.classList.remove("active");
    this.$component.firstElementChild.classList.remove("active");
    this.$component.remove();
  }
}

export const modal = new Modal();
