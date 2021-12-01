import {Form} from "../forms/Form.js";
import {makeRequest} from "../../api/makeRequest.js";
import {bytesToSize} from "../../utils/bytesToSize.js";

const getTemplate = () => {
  const $form = document.createElement("form");
  $form.classList.add("fileUploader");
  $form.setAttribute("enctype", "form-data");

  $form.insertAdjacentHTML(
    "afterbegin",
    `
    <input type="file" id="file-input" multiple accept="image/*">
    <div class="preview"></div>
    <button class="button" id="file-choose-button">Open file</button>
    <button type="submit" class="button" id="file-upload-button">Send file</button>
  `
  );
  return $form;
};

export class FileUploader extends Form {
  constructor(props) {
    super(props);
    this.$component = getTemplate(props);
    this.$input = this.$component[0];
    this.files = [];
    this.$preview = this.$input.nextElementSibling;
    this.#listen();
  }

  triggerInput() {
    const $chooseFileBtn = this.$input.nextElementSibling.nextElementSibling;
    $chooseFileBtn.addEventListener('click', () => this.$input.click());
  }

  removeHandler(e) {
    if (!e.target.dataset.name) return;
    const {name} = e.target.dataset;
    this.files = this.files.filter(file => file.name !== name);

    if(!this.files.length) {
      const uploadBtn = document.querySelector("#file-upload-button");
      uploadBtn.style.display = 'none';
    }

    const imageBlock = document.querySelector(`[data-name="${name}"]`).closest('.preview__image');
    imageBlock.remove();
  }

  changeHandler(e) {
    if (!e.target.files.length) return;

    this.files = Array.from(this.$input.files);

    this.$preview.innerHTML = '';
    const uploadBtn = document.querySelector("#file-upload-button");
    uploadBtn.style.display = 'inline-block';
    this.files.forEach(file => {
      if (!file.type.match('image')) return;

      const reader = new FileReader();

      reader.onload = e => {
        const src = e.target.result;
        this.$preview.insertAdjacentHTML("afterbegin", `      
          <div class="preview__image">
            <div class="preview__image-remove" data-name="${file.name}">&times;</div>
              <img src="${src}" alt="${file.name}"/>
              <div class="preview__info">
                <span>${file.name}</span>
                ${bytesToSize(file.size)}
              </div>
          </div>
        `)
      }

      reader.readAsDataURL(file); // async operation
    })


  }

  #listen() {

    this.triggerInput();
    this.$preview.addEventListener('click', (e) => this.removeHandler(e));
    this.$input.addEventListener("change", (e) => this.changeHandler(e));
    this.$component.addEventListener("submit",(e) => this.submit(e));
  }

  async submit(e) {
    super.submit(e);
    const formData = new FormData();
    this.files.forEach(file => {
      formData.append("image", file);
    });
    const response = await makeRequest("POST", "/images", formData);
    console.log(response);
  }
}
