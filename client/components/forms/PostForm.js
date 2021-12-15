import {Form} from "./Form.js";
import {FileUploader} from "../file-uploader/FileUploader.js";

const getTemplate = () => {
  const $postForm = document.createElement('div');
  $postForm.classList.add("form", "post-form");
  $postForm.id = "post-form";
  return $postForm;
}

export class PostForm extends Form{
  constructor() {
    super();
    this.$component = getTemplate();
    this.fileUploader = new FileUploader().html;
    this.renderChildren();
  }

  renderChildren() {
    this.$component.append(this.fileUploader);
  }
}
