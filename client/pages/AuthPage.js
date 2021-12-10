import {Page} from "./Page.js";
import {FileUploader} from "../components/file-uploader/FileUploader.js";

const getTemplate = () => {
  const $main = document.createElement("main");
  $main.classList.add("content");
  $main.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="column-1"></div>
      <div class="column-2"></div>
      <div class="column-3"> 
<!--        <form method="post" enctype="multipart/form-data" id="send-file">-->
<!--          <div>-->
<!--            <label for="file">Choose file to upload</label>-->
<!--            <input type="file" id="file" name="file" multiple>-->
<!--          </div>-->
<!--          <div>-->
<!--            <button>Submit</button>-->
<!--          </div>-->
<!--        </form>-->
      </div>
    `
  );
  return $main;
};

export class AuthPage extends Page {
  constructor(props, children) {
    super(props, children);
    this.$component = getTemplate();
    this.addFileUploader();
  }
  listen() {
    const form = document.querySelector("#send-file");
    const input = document.querySelector("#file");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", input.files[0]);
      console.log(input.files);
    });
  }


  addFileUploader() {
    const $column1 = this.$component.firstElementChild;
    $column1.append(new FileUploader().html);
  }
}

export const authPage = new AuthPage();
