import { Page } from "./Page.js";
import { fetchPicture } from "../api/fetch.js";

const getTemplate = () => {
  const $main = document.createElement("main");
  $main.classList.add("content");
  $main.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="column-1"></div>
      <div class="column-2">Auth</div>
      <div class="column-3"> 
        <form method="post" enctype="multipart/form-data" id="send-file">
          <div>
            <label for="file">Choose file to upload</label>
            <input type="file" id="file" name="file" multiple>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    `
  );
  return $main;
};

export class AuthPage extends Page {
  constructor(props, children) {
    super(props, children);
    this.$component = getTemplate();
  }
  listen() {
    const form = document.querySelector("#send-file");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.target.id = "send-file" && fetchPicture();
      console.log("is sent");
    });
  }
}

export const authPage = new AuthPage();
