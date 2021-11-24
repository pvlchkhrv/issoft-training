// import { router } from "./router/Router.js";
export class App {
  constructor() {
    this.$app = document.querySelector("#app");
  }

  setTitle(title) {
    document.title = title;
  }

  init(...components) {
    components.forEach((component) => {
      this.$app.append(component);
    });
  }
}
